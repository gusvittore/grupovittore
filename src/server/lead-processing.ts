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
import {
  buildLeadTrackingDescription,
  resolveLeadTrackingClickUpCustomFields,
  type ClickUpCustomFieldResolution,
} from "./lead-tracking-clickup";

const DEFAULT_CLICKUP_LIST_ID = "901327751514";
const CLICKUP_FIELD_CACHE_TTL_MS = 10 * 60 * 1000;
const WHATSAPP_CLICKUP_FIELD_NAME = "Whatsapp / Telefone";
const clickUpFieldCache = new Map<
  string,
  { expiresAt: number; fieldsPromise: Promise<ClickUpField[]> }
>();

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

type ClickUpCustomFieldAttempt = Omit<ClickUpCustomFieldResolution, "status"> & {
  status: "success" | "failed" | "not_found" | "invalid_value";
  httpStatus?: number;
};

type ClickUpCustomFieldsDiagnostic = {
  listId: string;
  totalAvailable: number;
  availableNames: string[];
  resolutions: ClickUpCustomFieldResolution[];
  attempts?: ClickUpCustomFieldAttempt[];
  lookupError?: string;
};

type ClickUpScalarLeadPayloadKey = Exclude<keyof LeadPayload, "tracking">;

const clickUpFieldMapping: Array<{
  names: string[];
  payloadKey: ClickUpScalarLeadPayloadKey;
}> = [
  { names: ["Nome Completo"], payloadKey: "nome_completo" },
  { names: ["E-mail"], payloadKey: "email" },
  {
    names: [WHATSAPP_CLICKUP_FIELD_NAME],
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

  console.log("Tentando enviar e-mail de lead.");

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
  payloadKey: ClickUpScalarLeadPayloadKey,
) {
  if (payloadKey === "whatsapp") {
    return fields.filter(
      (field) =>
        normalizeFieldName(field.name) ===
          normalizeFieldName(WHATSAPP_CLICKUP_FIELD_NAME) &&
        isTextLikeClickUpField(field),
    );
  }

  return findClickUpFieldsByName(fields, names);
}

function findClickUpFieldsByName(fields: ClickUpField[], names: string[]) {
  const field = fields.find((item) =>
    names.some(
      (clickUpFieldName) =>
        normalizeFieldName(item.name) === normalizeFieldName(clickUpFieldName),
    ),
  );

  return field ? [field] : [];
}

function buildWhatsAppFieldResolutionError(matchedFieldsCount: number) {
  return `Campo WhatsApp / Telefone nao encontrado no ClickUp: esperado exatamente um campo text-like com nome "${WHATSAPP_CLICKUP_FIELD_NAME}", encontrados ${matchedFieldsCount}.`;
}

function formatClickUpDiagnosticValue(
  value: string | number | string[] | null | undefined,
) {
  if (value === undefined || value === null) return "não enviado";
  const text = Array.isArray(value) ? value.join(", ") : String(value);
  return text.replace(/\r?\n/g, " → ").slice(0, 1000);
}

function buildClickUpCustomFieldsDiagnostic(
  diagnostic: ClickUpCustomFieldsDiagnostic,
) {
  const found = diagnostic.resolutions.filter(
    (resolution) => resolution.fieldId,
  );
  const missing = diagnostic.resolutions.filter(
    (resolution) => resolution.status === "not_found",
  );
  const attempts = diagnostic.attempts ?? [];
  const failures = attempts.filter((attempt) => attempt.status !== "success");
  const preflightFailures = diagnostic.resolutions.filter(
    (resolution) => resolution.status !== "ready",
  );
  const lines = [
    "DIAGNÓSTICO CLICKUP CUSTOM FIELDS",
    "",
    `List ID usado: ${diagnostic.listId}`,
    `Campos retornados pelo ClickUp: ${diagnostic.totalAvailable}`,
    "",
    "Nomes dos campos retornados:",
    ...(diagnostic.availableNames.length
      ? diagnostic.availableNames.map((name) => `- ${name}`)
      : ["- Nenhum campo retornado"]),
    "",
    "Campos esperados encontrados:",
    ...(found.length
      ? found.map(
          (resolution) =>
            `- ${resolution.expectedName}: encontrado como "${resolution.actualName}", tipo ${resolution.fieldType}, id ${resolution.fieldId}`,
        )
      : ["- Nenhum"]),
    "",
    "Campos esperados não encontrados:",
    ...(missing.length
      ? missing.map((resolution) => `- ${resolution.expectedName}`)
      : ["- Nenhum"]),
    "",
    "Tentativas de preenchimento:",
    ...(attempts.length
      ? attempts.map(
          (attempt) =>
            `- ${attempt.expectedName}: ${attempt.status}; campo "${attempt.actualName || "não encontrado"}"; id ${attempt.fieldId || "não encontrado"}; tipo ${attempt.fieldType || "desconhecido"}; valor ${formatClickUpDiagnosticValue(attempt.resolvedValue ?? attempt.attemptedValue)}${attempt.httpStatus ? `; HTTP ${attempt.httpStatus}` : ""}${attempt.error ? `; erro ${attempt.error.slice(0, 1000)}` : ""}`,
        )
      : ["- Aguardando tentativas após a criação da task"]),
    "",
    "Falhas:",
  ];

  if (diagnostic.lookupError) {
    lines.push(`- Falha ao buscar custom fields: ${diagnostic.lookupError.slice(0, 1000)}`);
  }

  for (const failure of attempts.length ? failures : preflightFailures) {
    lines.push(`- ${failure.expectedName}: ${failure.error || failure.status}`);
  }

  if (
    !diagnostic.lookupError &&
    attempts.length > 0 &&
    failures.length === 0 &&
    attempts.length === diagnostic.resolutions.length
  ) {
    lines.push("- Todos os campos personalizados foram preenchidos com sucesso.");
  } else if (!diagnostic.lookupError && failures.length === 0 && preflightFailures.length === 0) {
    lines.push("- Nenhuma falha de mapeamento detectada antes do preenchimento.");
  } else if (
    lines.at(-1) === "Falhas:"
  ) {
    lines.push("- Nenhuma falha registrada.");
  }

  return lines.join("\n");
}

function buildClickUpDescription(
  payload: LeadPayload,
  qualification: LeadQualification,
  customFieldsDiagnostic?: string,
) {
  const sections = [
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
    "",
    buildLeadTrackingDescription(payload.tracking),
  ];

  if (customFieldsDiagnostic) {
    sections.push("", customFieldsDiagnostic);
  }

  return sections.join("\n");
}

async function createClickUpTask(
  config: ClickUpConfig,
  payload: LeadPayload,
  qualification: LeadQualification,
  customFieldsDiagnostic: string,
) {
  const { clickUpListId } = config;
  const assigneeId = config.assigneeId;
  const response = await fetch(
    `https://api.clickup.com/api/v2/list/${clickUpListId}/task`,
    {
      method: "POST",
      headers: {
        Authorization: config.clickUpApiToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: payload.empresa
          ? `${payload.empresa} - ${payload.nome_completo}`
          : payload.nome_completo,
        description: buildClickUpDescription(
          payload,
          qualification,
          customFieldsDiagnostic,
        ),
        status: qualification.clickupStatus,
        notify_all: true,
        ...(assigneeId !== null ? { assignees: [assigneeId] } : {}),
      }),
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
    fieldErrors: [],
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
  const cached = clickUpFieldCache.get(clickUpListId);

  if (cached && cached.expiresAt > Date.now()) {
    return cached.fieldsPromise;
  }

  const fieldsPromise = fetch(
    `https://api.clickup.com/api/v2/list/${clickUpListId}/field`,
    {
      method: "GET",
      headers: {
        Authorization: config.clickUpApiToken,
      },
    },
  ).then(async (response) => {
    if (!response.ok) {
      throw new Error(await readResponseText(response));
    }

    const data = (await response.json()) as { fields?: ClickUpField[] };
    return data.fields ?? [];
  });

  clickUpFieldCache.set(clickUpListId, {
    expiresAt: Date.now() + CLICKUP_FIELD_CACHE_TTL_MS,
    fieldsPromise,
  });

  try {
    return await fieldsPromise;
  } catch (error) {
    clickUpFieldCache.delete(clickUpListId);
    throw error;
  }
}

function resolveClickUpFieldValue(
  field: ClickUpField,
  value: string,
  payloadKey: ClickUpScalarLeadPayloadKey,
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

function logClickUpCustomFieldAttempt(attempt: ClickUpCustomFieldAttempt) {
  const logEntry = {
    expectedName: attempt.expectedName,
    actualName: attempt.actualName,
    fieldId: attempt.fieldId,
    fieldType: attempt.fieldType,
    attemptedValue: attempt.resolvedValue ?? attempt.attemptedValue,
    status: attempt.status,
    ...(attempt.httpStatus ? { httpStatus: attempt.httpStatus } : {}),
    ...(attempt.error ? { error: attempt.error } : {}),
  };

  if (attempt.status === "success") {
    console.log("ClickUp custom field attempt:", logEntry);
  } else {
    console.warn("ClickUp custom field attempt:", logEntry);
  }
}

async function fillClickUpCustomFields(
  config: ClickUpConfig,
  taskId: string,
  fields: ClickUpField[],
  payload: LeadPayload,
  trackingResolutions: ClickUpCustomFieldResolution[],
) {
  const { clickUpApiToken } = config;
  const fieldErrors: string[] = [];
  const trackingAttempts: ClickUpCustomFieldAttempt[] = [];

  for (const { names, payloadKey } of clickUpFieldMapping) {
    const value = payload[payloadKey];

    if (payloadKey === "whatsapp" && !value) {
      continue;
    }

    const matchedFields = findClickUpFields(fields, names, payloadKey);

    if (payloadKey === "whatsapp" && matchedFields.length !== 1) {
      const message = buildWhatsAppFieldResolutionError(matchedFields.length);
      console.warn(message);
      fieldErrors.push(message);
      continue;
    }

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
      try {
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
      } catch (error) {
        const message = `Falha ao preencher campo "${field.name}": ${getErrorMessage(error)}`;
        console.warn(message);
        fieldErrors.push(message);
      }
    }
  }

  for (const resolution of trackingResolutions) {
    if (
      resolution.status !== "ready" ||
      !resolution.fieldId ||
      resolution.resolvedValue === undefined
    ) {
      const attempt: ClickUpCustomFieldAttempt = {
        ...resolution,
        status:
          resolution.status === "not_found" ? "not_found" : "invalid_value",
      };
      trackingAttempts.push(attempt);
      logClickUpCustomFieldAttempt(attempt);
      continue;
    }

    try {
      const response = await fetch(
        `https://api.clickup.com/api/v2/task/${taskId}/field/${resolution.fieldId}`,
        {
          method: "POST",
          headers: {
            Authorization: clickUpApiToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ value: resolution.resolvedValue }),
        },
      );

      if (!response.ok) {
        const error = await readResponseText(response);
        const message = `Falha ao preencher campo de jornada "${resolution.actualName}" (${resolution.fieldId}), HTTP ${response.status}: ${error}`;
        const attempt: ClickUpCustomFieldAttempt = {
          ...resolution,
          status: "failed",
          httpStatus: response.status,
          error,
        };
        console.warn(message);
        fieldErrors.push(message);
        trackingAttempts.push(attempt);
        logClickUpCustomFieldAttempt(attempt);
      } else {
        const attempt: ClickUpCustomFieldAttempt = {
          ...resolution,
          status: "success",
          httpStatus: response.status,
        };
        trackingAttempts.push(attempt);
        logClickUpCustomFieldAttempt(attempt);
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      const message = `Falha ao preencher campo de jornada "${resolution.actualName}" (${resolution.fieldId}): ${errorMessage}`;
      const attempt: ClickUpCustomFieldAttempt = {
        ...resolution,
        status: "failed",
        error: errorMessage,
      };
      console.warn(message);
      fieldErrors.push(message);
      trackingAttempts.push(attempt);
      logClickUpCustomFieldAttempt(attempt);
    }
  }

  return { fieldErrors, trackingAttempts };
}

async function fillClickUpCustomFieldsForTask(
  config: ClickUpConfig,
  taskId: string,
  payload: LeadPayload,
  qualification: LeadQualification,
  fields: ClickUpField[],
  diagnostic: ClickUpCustomFieldsDiagnostic,
) {
  const result = await fillClickUpCustomFields(
    config,
    taskId,
    fields,
    payload,
    diagnostic.resolutions,
  );
  const finalDiagnostic = buildClickUpCustomFieldsDiagnostic({
    ...diagnostic,
    attempts: result.trackingAttempts,
  });
  const response = await fetch(`https://api.clickup.com/api/v2/task/${taskId}`, {
    method: "PUT",
    headers: {
      Authorization: config.clickUpApiToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description: buildClickUpDescription(
        payload,
        qualification,
        finalDiagnostic,
      ),
    }),
  });

  if (!response.ok) {
    const message = `Falha ao anexar diagnostico de custom fields na task, HTTP ${response.status}: ${await readResponseText(response)}`;
    console.warn(message);
    result.fieldErrors.push(message);
  } else {
    console.log("ClickUp custom fields diagnostic appended:", {
      taskId,
      listId: config.clickUpListId,
    });
  }

  return result.fieldErrors;
}

async function runPostClickUpTasks(
  config: ClickUpConfig,
  taskId: string,
  taskUrl: string | null | undefined,
  payload: LeadPayload,
  qualification: LeadQualification,
  fields: ClickUpField[],
  diagnostic: ClickUpCustomFieldsDiagnostic,
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
    fillClickUpCustomFieldsForTask(
      config,
      taskId,
      payload,
      qualification,
      fields,
      diagnostic,
    ),
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
  const preTaskFieldErrors: string[] = [];
  let fields: ClickUpField[] = [];
  let lookupError: string | undefined;
  let resolvedTrackingFields = resolveLeadTrackingClickUpCustomFields(
    payload.tracking,
    fields,
  );

  try {
    fields = await getClickUpFields(config);
    resolvedTrackingFields = resolveLeadTrackingClickUpCustomFields(
      payload.tracking,
      fields,
    );
    preTaskFieldErrors.push(...resolvedTrackingFields.errors);
  } catch (error) {
    const message = `Falha ao resolver campos de jornada do ClickUp: ${getErrorMessage(error)}`;
    lookupError = message;
    console.warn(message);
    preTaskFieldErrors.push(message);
  }

  const diagnostic: ClickUpCustomFieldsDiagnostic = {
    listId: config.clickUpListId,
    totalAvailable: fields.length,
    availableNames: fields.map((field) => field.name),
    resolutions: resolvedTrackingFields.resolutions,
    lookupError,
  };
  console.log("ClickUp custom fields diagnostic:", {
    listIdForTask: config.clickUpListId,
    listIdForFields: config.clickUpListId,
    totalAvailable: diagnostic.totalAvailable,
    availableNames: diagnostic.availableNames,
  });

  const task = await createClickUpTask(
    config,
    payload,
    qualification,
    buildClickUpCustomFieldsDiagnostic(diagnostic),
  );
  const taskId = task.taskId;
  console.log("ClickUp task created:", {
    listId: config.clickUpListId,
    taskId,
  });
  const postTasksResult = await runPostClickUpTasks(
    config,
    taskId,
    task.taskUrl,
    payload,
    qualification,
    fields,
    diagnostic,
  );

  return {
    taskId,
    taskUrl: task.taskUrl,
    fieldErrors: [
      ...preTaskFieldErrors,
      ...task.fieldErrors,
      ...postTasksResult.fieldErrors,
    ],
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
