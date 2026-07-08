import nodemailer from "nodemailer";

export const runtime = "nodejs";

const LEAD_ORIGIN = "Landing Page Assessoria Comercial";
const NON_QUALIFIED_REVENUE = "Até 50 mil";
const DEFAULT_CLICKUP_LIST_ID = "901327751514";
const RECENT_DUPLICATE_WINDOW_MINUTES = 3;

type LeadPayload = {
  nome_completo: string;
  email: string;
  whatsapp: string;
  empresa: string;
  segmento: string;
  faturamento_mensal: string;
  origem_lead: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
};

type LeadQualification = {
  statusQualificacao: "NOVO_LEAD" | "MQL";
  clickupStatus: "NOVO LEAD" | "MQL - LEAD QUALIF. MARKT.";
  redirectTo: "/obrigado" | "/obrigado-qualificado";
};

type SupabaseConfig = {
  supabaseUrl: string;
  serviceRoleKey: string;
};

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

type LeadApiTimings = {
  totalMs: number;
  supabaseMs: number;
  clickupCreateMs: number;
  postTasksMs: number;
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function cleanString(value: unknown) {
  if (value === undefined || value === null) {
    return "";
  }

  return String(value).trim();
}

function sanitizePayload(rawPayload: unknown): LeadPayload {
  const payload = isRecord(rawPayload) ? rawPayload : {};

  return {
    nome_completo: cleanString(payload.nome_completo),
    email: cleanString(payload.email),
    whatsapp: cleanString(payload.whatsapp),
    empresa: cleanString(payload.empresa),
    segmento: cleanString(payload.segmento),
    faturamento_mensal: cleanString(payload.faturamento_mensal),
    origem_lead: cleanString(payload.origem_lead) || LEAD_ORIGIN,
    utm_source: cleanString(payload.utm_source),
    utm_medium: cleanString(payload.utm_medium),
    utm_campaign: cleanString(payload.utm_campaign),
    utm_term: cleanString(payload.utm_term),
    utm_content: cleanString(payload.utm_content),
    gclid: cleanString(payload.gclid),
  };
}

function hasRequiredFields(payload: LeadPayload) {
  return Boolean(
    payload.nome_completo &&
      payload.email &&
      payload.whatsapp &&
      payload.empresa &&
      payload.segmento &&
      payload.faturamento_mensal,
  );
}

function qualifyLead(faturamentoMensal: string): LeadQualification {
  const isNovoLead = faturamentoMensal === NON_QUALIFIED_REVENUE;

  if (isNovoLead) {
    return {
      statusQualificacao: "NOVO_LEAD",
      clickupStatus: "NOVO LEAD",
      redirectTo: "/obrigado",
    };
  }

  return {
    statusQualificacao: "MQL",
    clickupStatus: "MQL - LEAD QUALIF. MARKT.",
    redirectTo: "/obrigado-qualificado",
  };
}

function getSupabaseConfig(): SupabaseConfig {
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Configuração do Supabase ausente.");
  }

  return { supabaseUrl, serviceRoleKey };
}

function getClickUpConfig(): ClickUpConfig {
  const clickUpApiToken = process.env.CLICKUP_API_TOKEN;
  const clickUpListId = process.env.CLICKUP_LIST_ID || DEFAULT_CLICKUP_LIST_ID;
  const assigneeId = process.env.CLICKUP_ASSIGNEE_ID
    ? Number(process.env.CLICKUP_ASSIGNEE_ID)
    : null;

  if (!clickUpApiToken || !clickUpListId) {
    throw new Error("Configuração do ClickUp ausente.");
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

function getSupabaseHeaders(serviceRoleKey: string) {
  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
  };
}

async function readResponseText(response: Response) {
  try {
    return await response.text();
  } catch {
    return "";
  }
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Erro desconhecido.";
}

function getSafeEmailErrorDetails(error: unknown) {
  const errorRecord = isRecord(error) ? error : {};

  return {
    message: error instanceof Error ? error.message : String(error),
    code:
      typeof errorRecord.code === "string" ? errorRecord.code : undefined,
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

async function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  label: string,
): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(
      () => reject(new Error(`${label} timeout after ${ms}ms`)),
      ms,
    );
  });

  try {
    return await Promise.race([promise, timeout]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
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

async function findRecentDuplicateLead(
  config: SupabaseConfig,
  payload: LeadPayload,
) {
  const since = new Date(
    Date.now() - RECENT_DUPLICATE_WINDOW_MINUTES * 60 * 1000,
  ).toISOString();
  const response = await fetch(
    `${config.supabaseUrl}/rest/v1/leads_assessoria?select=id,clickup_task_id&email=eq.${encodeURIComponent(payload.email)}&whatsapp=eq.${encodeURIComponent(payload.whatsapp)}&empresa=eq.${encodeURIComponent(payload.empresa)}&created_at=gte.${encodeURIComponent(since)}&order=created_at.desc&limit=1`,
    {
      method: "GET",
      headers: getSupabaseHeaders(config.serviceRoleKey),
    },
  );

  if (!response.ok) {
    throw new Error(await readResponseText(response));
  }

  const data = (await response.json()) as Array<{
    id?: string | number;
    clickup_task_id?: string | null;
  }>;

  return data[0] ?? null;
}

async function saveLeadToSupabase(
  config: SupabaseConfig,
  payload: LeadPayload,
  qualification: LeadQualification,
  rawPayload: unknown,
) {
  const response = await fetch(`${config.supabaseUrl}/rest/v1/leads_assessoria`, {
    method: "POST",
    headers: {
      ...getSupabaseHeaders(config.serviceRoleKey),
      "Prefer": "return=representation",
    },
    body: JSON.stringify({
      ...payload,
      status_qualificacao: qualification.statusQualificacao,
      clickup_status_destino: qualification.clickupStatus,
      raw_payload: rawPayload,
    }),
  });

  if (!response.ok) {
    throw new Error(await readResponseText(response));
  }

  const data = (await response.json()) as Array<{ id?: string | number }>;
  const leadId = data[0]?.id;

  if (leadId === undefined || leadId === null) {
    throw new Error("Supabase não retornou o id do lead.");
  }

  return String(leadId);
}

async function updateLeadClickUpStatus(
  config: SupabaseConfig,
  leadId: string,
  body: {
    enviado_clickup: boolean;
    clickup_task_id?: string | null;
    erro_clickup: string | null;
  },
) {
  const response = await fetch(
    `${config.supabaseUrl}/rest/v1/leads_assessoria?id=eq.${encodeURIComponent(leadId)}`,
    {
      method: "PATCH",
      headers: getSupabaseHeaders(config.serviceRoleKey),
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    throw new Error(await readResponseText(response));
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
  return normalizeComparison(value)
    .replace(/\/+/g, "/")
    .replace(/\s*\/\s*/g, " / ")
    .replace(/\s+/g, " ")
    .trim();
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

  const normalizedType = normalizeFieldName(field.type ?? "");

  return (
    !normalizedType ||
    normalizedType.includes("text") ||
    normalizedType.includes("phone")
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
    `Status de qualificação: ${qualification.statusQualificacao}`,
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
    throw new Error("ClickUp não retornou o id da tarefa.");
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
    console.warn(
      "Falha ao criar comentário no ClickUp:",
      await readResponseText(response),
    );
  }
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
    const message = `Campo "${fieldName}" pulado: opção "${value}" não encontrada no dropdown.`;
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
          ? "Campo WhatsApp / Telefone não encontrado no ClickUp"
          : `Campo ClickUp não encontrado: ${names.join(" / ")}.`;
      console.warn(message);
      fieldErrors.push(message);
      continue;
    }

    for (const field of matchedFields) {
      if (payloadKey === "whatsapp") {
        console.log(
          "Campo WhatsApp encontrado:",
          field.name,
          field.id,
          field.type,
        );
      }

      const resolvedValue = resolveClickUpFieldValue(field, value, payloadKey);

      if (typeof resolvedValue === "object") {
        fieldErrors.push(resolvedValue.error);
        continue;
      }

      const response = await fetch(
        `https://api.clickup.com/api/v2/task/${taskId}/field/${field.id}`,
        {
          method: "POST",
          headers: {
            Authorization: clickUpApiToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ value: resolvedValue }),
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
  const postClickupTasks = [
    fillClickUpCustomFieldsForTask(config, taskId, payload),
    createClickUpTaskComment(config, taskId),
    sendLeadNotificationEmailWithTimeout(payload, qualification, {
      clickup_task_id: taskId,
      clickup_task_url: taskUrl,
    }),
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

  if (commentResult.status === "rejected") {
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
  };
}

async function sendLeadToClickUp(
  payload: LeadPayload,
  qualification: LeadQualification,
  timings?: {
    onTaskCreated?: (durationMs: number) => void;
    onPostTasksSettled?: (durationMs: number) => void;
  },
): Promise<ClickUpTaskResult> {
  const config = getClickUpConfig();
  const taskStartedAt = Date.now();
  const task = await createClickUpTask(config, payload, qualification);
  const taskId = task.taskId;
  timings?.onTaskCreated?.(Date.now() - taskStartedAt);

  const postTasksStartedAt = Date.now();
  const postTasksResult = await runPostClickUpTasks(
    config,
    taskId,
    task.taskUrl,
    payload,
    qualification,
  );
  timings?.onPostTasksSettled?.(Date.now() - postTasksStartedAt);

  return {
    taskId,
    taskUrl: task.taskUrl,
    fieldErrors: postTasksResult.fieldErrors,
    commentErrors: postTasksResult.commentErrors,
    emailResult: postTasksResult.emailResult,
  };
}

export async function POST(request: Request) {
  const startedAt = Date.now();
  const timings: LeadApiTimings = {
    totalMs: 0,
    supabaseMs: 0,
    clickupCreateMs: 0,
    postTasksMs: 0,
  };
  let emailResult: LeadEmailResult = {
    attempted: false,
    sent: false,
    error: null,
  };

  console.log("Lead API started");

  const createDebug = (savedToSupabase: boolean, sentToClickUp: boolean) => {
    timings.totalMs = Date.now() - startedAt;
    console.log("Tempo total API:", timings.totalMs);

    return {
      savedToSupabase,
      sentToClickUp,
      emailAttempted: emailResult.attempted,
      emailSent: emailResult.sent,
      emailError: emailResult.error ?? null,
      timings: { ...timings },
    };
  };

  let rawPayload: unknown;

  try {
    rawPayload = await request.json();
  } catch {
    rawPayload = {};
  }

  const payload = sanitizePayload(rawPayload);

  if (!hasRequiredFields(payload)) {
    return Response.json(
      {
        ok: false,
        error: "Campos obrigatórios ausentes.",
        debug: createDebug(false, false),
      },
      { status: 400 },
    );
  }

  const qualification = qualifyLead(payload.faturamento_mensal);
  let supabaseConfig: SupabaseConfig;
  let leadId: string;
  const supabaseStartedAt = Date.now();

  try {
    supabaseConfig = getSupabaseConfig();

    try {
      const duplicateLead = await findRecentDuplicateLead(supabaseConfig, payload);

      if (duplicateLead) {
        timings.supabaseMs = Date.now() - supabaseStartedAt;
        console.log("Tempo após Supabase:", Date.now() - startedAt);

        return Response.json({
          ok: true,
          duplicate: true,
          savedToSupabase: true,
          sentToClickUp: true,
          leadId: duplicateLead.id ? String(duplicateLead.id) : undefined,
          clickupTaskId: duplicateLead.clickup_task_id ?? undefined,
          redirectTo: qualification.redirectTo,
          debug: createDebug(true, true),
        });
      }
    } catch (duplicateError) {
      console.warn(
        "Falha ao verificar duplicidade recente no Supabase:",
        duplicateError,
      );
    }

    leadId = await saveLeadToSupabase(
      supabaseConfig,
      payload,
      qualification,
      rawPayload,
    );
    timings.supabaseMs = Date.now() - supabaseStartedAt;
    console.log("Tempo após Supabase:", Date.now() - startedAt);
  } catch (error) {
    timings.supabaseMs = Date.now() - supabaseStartedAt;
    console.error("Erro ao salvar lead no Supabase:", error);
    return Response.json(
      {
        ok: false,
        error: "Não foi possível salvar o lead.",
        debug: createDebug(false, false),
      },
      { status: 500 },
    );
  }

  const clickupStartedAt = Date.now();

  try {
    const clickUpResult = await sendLeadToClickUp(payload, qualification, {
      onTaskCreated: (durationMs) => {
        timings.clickupCreateMs = durationMs;
        console.log("Tempo após ClickUp task:", Date.now() - startedAt);
      },
      onPostTasksSettled: (durationMs) => {
        timings.postTasksMs = durationMs;
      },
    });
    emailResult = clickUpResult.emailResult;
    const clickUpErrors = [
      ...clickUpResult.fieldErrors,
      ...clickUpResult.commentErrors,
    ];
    const erroClickUp = clickUpErrors.length ? clickUpErrors.join(" | ") : null;

    try {
      await updateLeadClickUpStatus(supabaseConfig, leadId, {
        enviado_clickup: true,
        clickup_task_id: clickUpResult.taskId,
        erro_clickup: erroClickUp,
      });
    } catch (error) {
      console.error("Erro ao atualizar status do ClickUp no Supabase:", error);
    }

    return Response.json({
      ok: true,
      savedToSupabase: true,
      sentToClickUp: true,
      leadId,
      clickupTaskId: clickUpResult.taskId,
      clickupTaskUrl: clickUpResult.taskUrl ?? undefined,
      redirectTo: qualification.redirectTo,
      debug: createDebug(true, true),
    });
  } catch (error) {
    const erroClickUp = getErrorMessage(error);
    const postTasksStartedAt = Date.now();

    if (!timings.clickupCreateMs) {
      timings.clickupCreateMs = Date.now() - clickupStartedAt;
      console.log("Tempo após ClickUp task:", Date.now() - startedAt);
    }

    console.error("Erro ao enviar lead para o ClickUp:", error);

    const failureTasks = [
      updateLeadClickUpStatus(supabaseConfig, leadId, {
        enviado_clickup: false,
        erro_clickup: erroClickUp,
      }),
      sendLeadNotificationEmailWithTimeout(payload, qualification, {
        clickup_task_id: null,
        clickup_task_url: null,
        clickupError: erroClickUp,
      }),
    ] as const;
    const [updateResult, emailSettledResult] =
      await Promise.allSettled(failureTasks);

    timings.postTasksMs = Date.now() - postTasksStartedAt;

    if (updateResult.status === "rejected") {
      console.error(
        "Erro ao registrar falha do ClickUp no Supabase:",
        updateResult.reason,
      );
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

    return Response.json({
      ok: true,
      savedToSupabase: true,
      sentToClickUp: false,
      leadId,
      redirectTo: qualification.redirectTo,
      debug: createDebug(true, false),
    });
  }
}
