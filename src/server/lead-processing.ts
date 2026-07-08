import nodemailer from "nodemailer";

import {
  getErrorMessage,
  getLeadFromSupabase,
  getSupabaseConfig,
  isRecord,
  qualifyLead,
  readResponseText,
  updateLeadClickUpStatus,
  withTimeout,
  type LeadPayload,
  type LeadQualification,
} from "./lead-core";

const DEFAULT_CLICKUP_LIST_ID = "901327751514";

type ClickUpConfig = {
  clickUpApiToken: string;
  clickUpListId: string;
  assigneeId: number | null;
};

type SmtpConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  notificationEmail: string;
};

type LeadEmailNotificationOptions = {
  clickup_task_id?: string | null;
  clickup_task_url?: string | null;
  clickupError?: string | null;
};

type LeadEmailResult = {
  attempted: boolean;
  sent: boolean;
  messageId?: string | null;
  error?: string | null;
};

type ClickUpOption = {
  id: string;
  name: string;
};

type ClickUpField = {
  id: string;
  name: string;
  type?: string;
  type_config?: {
    options?: ClickUpOption[];
  };
};

type ClickUpTaskResult = {
  taskId: string;
  taskUrl?: string | null;
  fieldErrors: string[];
  commentErrors: string[];
  emailResult: LeadEmailResult;
  emailMs: number;
};

const clickUpFieldMapping: Array<{
  names: string[];
  payloadKey: keyof LeadPayload;
}> = [
  { names: ["Nome Completo"], payloadKey: "nome_completo" },
  { names: ["E-mail"], payloadKey: "email" },
  {
    names: [
      "Whatsapp / Telefone",
      "WhatsApp / Telefone",
      "Telefone / WhatsApp",
      "Telefone",
      "WhatsApp",
      "Phone",
    ],
    payloadKey: "whatsapp",
  },
  { names: ["Empresa"], payloadKey: "empresa" },
  { names: ["Segmento"], payloadKey: "segmento" },
  { names: ["Faturamento mensal"], payloadKey: "faturamento_mensal" },
  { names: ["Origem do Lead"], payloadKey: "origem_lead" },
  { names: ["UTM Source"], payloadKey: "utm_source" },
  { names: ["UTM Medium"], payloadKey: "utm_medium" },
  { names: ["UTM Campaign"], payloadKey: "utm_campaign" },
  { names: ["UTM Term"], payloadKey: "utm_term" },
  { names: ["UTM Content"], payloadKey: "utm_content" },
  { names: ["GCLID"], payloadKey: "gclid" },
];

function getClickUpConfig(): ClickUpConfig {
  const clickUpApiToken = process.env.CLICKUP_API_TOKEN;
  const clickUpListId = process.env.CLICKUP_LIST_ID || DEFAULT_CLICKUP_LIST_ID;
  const assigneeId = process.env.CLICKUP_ASSIGNEE_ID
    ? Number(process.env.CLICKUP_ASSIGNEE_ID)
    : null;

  if (!clickUpApiToken || !clickUpListId) {
    throw new Error("Configuracao do ClickUp ausente.");
  }

  return {
    clickUpApiToken,
    clickUpListId,
    assigneeId:
      assigneeId !== null && Number.isFinite(assigneeId) ? assigneeId : null,
  };
}

function getSmtpConfig(): SmtpConfig | null {
  console.log("Email SMTP config:", {
    hasHost: Boolean(process.env.SMTP_HOST),
    hasPort: Boolean(process.env.SMTP_PORT),
    hasUser: Boolean(process.env.SMTP_USER),
    hasPass: Boolean(process.env.SMTP_PASS),
    hasNotificationEmail: Boolean(process.env.LEAD_NOTIFICATION_EMAIL),
    notificationEmail: process.env.LEAD_NOTIFICATION_EMAIL,
  });

  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS?.replace(/\s/g, "");
  const notificationEmail = process.env.LEAD_NOTIFICATION_EMAIL;

  if (!user) {
    console.warn("SMTP_USER ausente. E-mail de lead nao enviado.");
    return null;
  }

  if (!smtpPass) {
    console.warn("SMTP_PASS ausente. E-mail de lead nao enviado.");
    return null;
  }

  if (!notificationEmail) {
    console.warn("LEAD_NOTIFICATION_EMAIL ausente. E-mail de lead nao enviado.");
    return null;
  }

  if (!Number.isFinite(port)) {
    console.warn("SMTP_PORT invalido. E-mail de lead nao enviado.");
    return null;
  }

  return {
    host,
    port,
    user,
    pass: smtpPass,
    notificationEmail,
  };
}

function getSafeEmailErrorDetails(error: unknown) {
  const errorRecord = isRecord(error) ? error : {};

  return {
    message: error instanceof Error ? error.message : String(error),
    code: typeof errorRecord.code === "string" ? errorRecord.code : undefined,
    command:
      typeof errorRecord.command === "string"
        ? errorRecord.command
        : undefined,
    response:
      typeof errorRecord.response === "string"
        ? errorRecord.response
        : undefined,
  };
}

function formatEmailValue(value: string | null | undefined) {
  return value || "Nao informado";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildLeadNotificationEmailBody(
  payload: LeadPayload,
  qualification: LeadQualification,
  options: LeadEmailNotificationOptions,
) {
  const clickup_task_id = formatEmailValue(options.clickup_task_id);
  const clickup_task_url = formatEmailValue(options.clickup_task_url);
  const clickupError = options.clickupError || "Nao houve erro registrado.";
  const rows = [
    ["Nome", payload.nome_completo],
    ["Empresa", payload.empresa],
    ["WhatsApp / Telefone", payload.whatsapp],
    ["E-mail", payload.email],
    ["Segmento", payload.segmento],
    ["Faturamento mensal", payload.faturamento_mensal],
    ["Status enviado para o ClickUp", qualification.clickupStatus],
    ["Origem", payload.origem_lead],
    ["UTM Source", payload.utm_source],
    ["UTM Medium", payload.utm_medium],
    ["UTM Campaign", payload.utm_campaign],
    ["UTM Term", payload.utm_term],
    ["UTM Content", payload.utm_content],
    ["GCLID", payload.gclid],
    ["clickup_task_id", clickup_task_id],
    ["clickup_task_url", clickup_task_url],
    ["Erro ClickUp", clickupError],
  ];

  const text = [
    "Novo lead recebido pela landing page do Grupo Vittore.",
    "",
    ...rows.flatMap(([label, value]) => [
      `${label}:`,
      formatEmailValue(value),
      "",
    ]),
  ].join("\n");

  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;border:1px solid #e7e0d4;font-weight:700;">${escapeHtml(label)}</td>
          <td style="padding:8px 12px;border:1px solid #e7e0d4;">${escapeHtml(formatEmailValue(value))}</td>
        </tr>`,
    )
    .join("");
  const html = `
    <div style="font-family:Arial,sans-serif;color:#090E1F;line-height:1.5;">
      <h2>Novo lead recebido pela landing page do Grupo Vittore.</h2>
      <table style="border-collapse:collapse;width:100%;max-width:720px;">
        <tbody>${htmlRows}</tbody>
      </table>
    </div>`;

  return { text, html };
}

async function sendLeadNotificationEmail(
  payload: LeadPayload,
  qualification: LeadQualification,
  options: LeadEmailNotificationOptions,
): Promise<LeadEmailResult> {
  const smtpConfig = getSmtpConfig();

  if (!smtpConfig) {
    return {
      attempted: false,
      sent: false,
      error: "Configuracao SMTP incompleta.",
    };
  }

  const transporter = nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.port === 465,
    auth: {
      user: smtpConfig.user,
      pass: smtpConfig.pass,
    },
  });
  const { text, html } = buildLeadNotificationEmailBody(
    payload,
    qualification,
    options,
  );

  console.log(
    "Tentando enviar e-mail de lead para:",
    process.env.LEAD_NOTIFICATION_EMAIL,
  );

  try {
    const info = await transporter.sendMail({
      from: `"Grupo Vittore Leads" <${process.env.SMTP_USER}>`,
      to: process.env.LEAD_NOTIFICATION_EMAIL,
      subject: "Novo lead recebido | Grupo Vittore",
      text,
      html,
    });

    console.log("E-mail de lead enviado:", info.messageId);

    return {
      attempted: true,
      sent: true,
      messageId: info.messageId,
      error: null,
    };
  } catch (error) {
    const details = getSafeEmailErrorDetails(error);

    console.warn("Falha ao enviar e-mail de lead:", details);

    return {
      attempted: true,
      sent: false,
      error: details.message,
    };
  }
}

async function sendLeadNotificationEmailWithTimeout(
  payload: LeadPayload,
  qualification: LeadQualification,
  options: LeadEmailNotificationOptions,
) {
  try {
    return await withTimeout(
      sendLeadNotificationEmail(payload, qualification, options),
      3000,
      "sendLeadNotificationEmail",
    );
  } catch (error) {
    const details = getSafeEmailErrorDetails(error);

    console.warn("Falha ao enviar e-mail de lead:", details);

    return {
      attempted: true,
      sent: false,
      error: details.message,
    };
  }
}

function normalizeComparison(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function normalizeFieldName(value: string) {
  return normalizeComparison(value).replace(/\s+/g, " ").trim();
}

function normalizeFieldType(value: string) {
  return normalizeFieldName(value).replace(/_/g, " ");
}

function isWhatsAppFieldName(fieldName: string) {
  const normalizedName = normalizeFieldName(fieldName);

  return (
    normalizedName.includes("whatsapp") ||
    normalizedName.includes("telefone") ||
    normalizedName.includes("phone")
  );
}

function isTextLikeClickUpField(field: ClickUpField) {
  if (field.type_config?.options?.length) {
    return false;
  }

  const normalizedType = normalizeFieldType(field.type ?? "");

  return (
    !normalizedType ||
    normalizedType.includes("text") ||
    normalizedType.includes("short text") ||
    normalizedType.includes("phone") ||
    normalizedType.includes("email")
  );
}

function findClickUpFields(
  fields: ClickUpField[],
  names: string[],
  payloadKey: keyof LeadPayload,
) {
  if (payloadKey === "whatsapp") {
    return fields.filter(
      (field) => isWhatsAppFieldName(field.name) && isTextLikeClickUpField(field),
    );
  }

  const field = fields.find((item) =>
    names.some(
      (clickUpFieldName) =>
        normalizeFieldName(item.name) === normalizeFieldName(clickUpFieldName),
    ),
  );

  return field ? [field] : [];
}

function buildClickUpDescription(
  payload: LeadPayload,
  qualification: LeadQualification,
) {
  return [
    `Nome completo: ${payload.nome_completo}`,
    `E-mail: ${payload.email}`,
    `WhatsApp / Telefone: ${payload.whatsapp}`,
    `Empresa: ${payload.empresa}`,
    `Segmento: ${payload.segmento}`,
    `Faturamento mensal: ${payload.faturamento_mensal}`,
    `Origem do lead: ${payload.origem_lead}`,
    `Status de qualificacao: ${qualification.statusQualificacao}`,
    `UTM Source: ${payload.utm_source}`,
    `UTM Medium: ${payload.utm_medium}`,
    `UTM Campaign: ${payload.utm_campaign}`,
    `UTM Term: ${payload.utm_term}`,
    `UTM Content: ${payload.utm_content}`,
    `GCLID: ${payload.gclid}`,
  ].join("\n");
}

async function createClickUpTask(
  config: ClickUpConfig,
  payload: LeadPayload,
  qualification: LeadQualification,
) {
  const { clickUpListId } = config;
  const assigneeId = config.assigneeId;
  const taskPayload = {
    name: payload.empresa
      ? `${payload.empresa} - ${payload.nome_completo}`
      : payload.nome_completo,
    description: buildClickUpDescription(payload, qualification),
    status: qualification.clickupStatus,
    notify_all: true,
    ...(assigneeId !== null ? { assignees: [assigneeId] } : {}),
  };
  const response = await fetch(
    `https://api.clickup.com/api/v2/list/${clickUpListId}/task`,
    {
      method: "POST",
      headers: {
        Authorization: config.clickUpApiToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskPayload),
    },
  );

  if (!response.ok) {
    throw new Error(await readResponseText(response));
  }

  const data = (await response.json()) as { id?: string; url?: string };

  if (!data.id) {
    throw new Error("ClickUp nao retornou o id da tarefa.");
  }

  return {
    taskId: data.id,
    taskUrl: data.url ?? null,
  };
}

async function createClickUpTaskComment(
  config: ClickUpConfig,
  taskId: string,
) {
  const response = await fetch(
    `https://api.clickup.com/api/v2/task/${taskId}/comment`,
    {
      method: "POST",
      headers: {
        Authorization: config.clickUpApiToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment_text: "Novo lead recebido pela landing page do Grupo Vittore.",
        notify_all: true,
      }),
    },
  );

  if (!response.ok) {
    const message = `Falha ao criar comentario no ClickUp: ${await readResponseText(response)}`;
    console.warn(message);
    return [message];
  }

  return [];
}

async function getClickUpFields(config: ClickUpConfig) {
  const { clickUpListId } = config;
  const response = await fetch(
    `https://api.clickup.com/api/v2/list/${clickUpListId}/field`,
    {
      method: "GET",
      headers: {
        Authorization: config.clickUpApiToken,
      },
    },
  );

  if (!response.ok) {
    throw new Error(await readResponseText(response));
  }

  const data = (await response.json()) as { fields?: ClickUpField[] };
  return data.fields ?? [];
}

function resolveClickUpFieldValue(
  field: ClickUpField,
  value: string,
  payloadKey: keyof LeadPayload,
) {
  if (payloadKey === "whatsapp" && isTextLikeClickUpField(field)) {
    return value;
  }

  const options = field.type_config?.options;

  if (!options?.length) {
    return value;
  }

  const normalizedValue = normalizeComparison(value);
  const option = options.find(
    (item) => normalizeComparison(item.name) === normalizedValue,
  );

  if (!option) {
    const fieldName = payloadKey === "segmento" ? "Segmento" : field.name;
    const message = `Campo "${fieldName}" pulado: opcao "${value}" nao encontrada no dropdown.`;
    console.warn(message);
    return { error: message };
  }

  return option.id;
}

async function fillClickUpCustomFields(
  config: ClickUpConfig,
  taskId: string,
  fields: ClickUpField[],
  payload: LeadPayload,
) {
  const { clickUpApiToken } = config;
  const fieldErrors: string[] = [];

  for (const { names, payloadKey } of clickUpFieldMapping) {
    const value = payload[payloadKey];

    if (payloadKey === "whatsapp" && !value) {
      continue;
    }

    const matchedFields = findClickUpFields(fields, names, payloadKey);

    if (!matchedFields.length) {
      const message =
        payloadKey === "whatsapp"
          ? "Campo WhatsApp / Telefone nao encontrado no ClickUp"
          : `Campo ClickUp nao encontrado: ${names.join(" / ")}.`;
      console.warn(message);
      fieldErrors.push(message);
      continue;
    }

    for (const field of matchedFields) {
      if (payloadKey === "whatsapp") {
        console.log("Campo WhatsApp encontrado:", field.name, field.type);
      }

      const resolvedValue = resolveClickUpFieldValue(field, value, payloadKey);

      if (typeof resolvedValue === "object") {
        fieldErrors.push(resolvedValue.error);
        continue;
      }

      const customFieldPayload = {
        id: field.id,
        value: resolvedValue,
      };
      const response = await fetch(
        `https://api.clickup.com/api/v2/task/${taskId}/field/${field.id}`,
        {
          method: "POST",
          headers: {
            Authorization: clickUpApiToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ value: customFieldPayload.value }),
        },
      );

      if (!response.ok) {
        const message = `Falha ao preencher campo "${field.name}": ${await readResponseText(response)}`;
        console.warn(message);
        fieldErrors.push(message);
      }
    }
  }

  return fieldErrors;
}

async function fillClickUpCustomFieldsForTask(
  config: ClickUpConfig,
  taskId: string,
  payload: LeadPayload,
) {
  const fields = await getClickUpFields(config);
  return fillClickUpCustomFields(config, taskId, fields, payload);
}

async function runPostClickUpTasks(
  config: ClickUpConfig,
  taskId: string,
  taskUrl: string | null | undefined,
  payload: LeadPayload,
  qualification: LeadQualification,
) {
  let emailMs = 0;
  const emailStartedAt = Date.now();
  const emailTask = sendLeadNotificationEmailWithTimeout(payload, qualification, {
    clickup_task_id: taskId,
    clickup_task_url: taskUrl,
  }).finally(() => {
    emailMs = Date.now() - emailStartedAt;
  });
  const postClickupTasks = [
    fillClickUpCustomFieldsForTask(config, taskId, payload),
    createClickUpTaskComment(config, taskId),
    emailTask,
  ] as const;
  const settled = await Promise.allSettled(postClickupTasks);
  const fieldErrors: string[] = [];
  const commentErrors: string[] = [];
  let emailResult: LeadEmailResult = {
    attempted: true,
    sent: false,
    error: "Resultado do e-mail nao disponivel.",
  };
  const [fieldsResult, commentResult, emailSettledResult] = settled;

  if (fieldsResult.status === "fulfilled") {
    fieldErrors.push(...fieldsResult.value);
  } else {
    const message = `Falha ao preencher campos personalizados do ClickUp: ${getErrorMessage(fieldsResult.reason)}`;
    console.warn(message);
    fieldErrors.push(message);
  }

  if (commentResult.status === "fulfilled") {
    commentErrors.push(...commentResult.value);
  } else {
    const message = `Falha ao criar comentario no ClickUp: ${getErrorMessage(commentResult.reason)}`;
    console.warn(message);
    commentErrors.push(message);
  }

  if (emailSettledResult.status === "fulfilled") {
    emailResult = emailSettledResult.value;
  } else {
    const details = getSafeEmailErrorDetails(emailSettledResult.reason);
    console.warn("Falha ao enviar e-mail de lead:", details);
    emailResult = {
      attempted: true,
      sent: false,
      error: details.message,
    };
  }

  return {
    fieldErrors,
    commentErrors,
    emailResult,
    emailMs,
  };
}

async function sendLeadToClickUp(
  payload: LeadPayload,
  qualification: LeadQualification,
): Promise<ClickUpTaskResult> {
  const config = getClickUpConfig();
  const task = await createClickUpTask(config, payload, qualification);
  const taskId = task.taskId;
  const postTasksResult = await runPostClickUpTasks(
    config,
    taskId,
    task.taskUrl,
    payload,
    qualification,
  );

  return {
    taskId,
    taskUrl: task.taskUrl,
    fieldErrors: postTasksResult.fieldErrors,
    commentErrors: postTasksResult.commentErrors,
    emailResult: postTasksResult.emailResult,
    emailMs: postTasksResult.emailMs,
  };
}

async function safelyUpdateLeadClickUpStatus(
  leadId: string,
  body: {
    enviado_clickup: boolean;
    clickup_task_id?: string | null;
    erro_clickup: string | null;
  },
) {
  try {
    await updateLeadClickUpStatus(getSupabaseConfig(), leadId, body);
  } catch (error) {
    console.error("Erro ao atualizar status do ClickUp no Supabase:", error);
  }
}

export async function processLeadBackgroundJob(leadId: string) {
  const startedAt = Date.now();
  let clickupMs = 0;
  let emailMs = 0;

  try {
    const supabaseConfig = getSupabaseConfig();
    const payload = await getLeadFromSupabase(supabaseConfig, leadId);
    const qualification = qualifyLead(payload.faturamento_mensal);
    const clickupStartedAt = Date.now();

    try {
      const clickUpResult = await sendLeadToClickUp(payload, qualification);
      clickupMs = Date.now() - clickupStartedAt;
      emailMs = clickUpResult.emailMs;
      const clickUpErrors = [
        ...clickUpResult.fieldErrors,
        ...clickUpResult.commentErrors,
      ];
      const erroClickUp = clickUpErrors.length ? clickUpErrors.join(" | ") : null;

      await safelyUpdateLeadClickUpStatus(leadId, {
        enviado_clickup: true,
        clickup_task_id: clickUpResult.taskId,
        erro_clickup: erroClickUp,
      });

      return {
        ok: true,
        taskId: clickUpResult.taskId,
        emailResult: clickUpResult.emailResult,
      };
    } catch (error) {
      clickupMs = Date.now() - clickupStartedAt;
      const erroClickUp = getErrorMessage(error);
      const emailStartedAt = Date.now();

      console.error("Erro ao enviar lead para o ClickUp:", error);

      const emailResult = await sendLeadNotificationEmailWithTimeout(
        payload,
        qualification,
        {
          clickup_task_id: null,
          clickup_task_url: null,
          clickupError: erroClickUp,
        },
      );
      emailMs = Date.now() - emailStartedAt;

      await safelyUpdateLeadClickUpStatus(leadId, {
        enviado_clickup: false,
        erro_clickup: erroClickUp,
      });

      return {
        ok: false,
        error: erroClickUp,
        emailResult,
      };
    }
  } finally {
    console.log("Lead background timing:", {
      totalMs: Date.now() - startedAt,
      clickupMs,
      emailMs,
    });
  }
}
