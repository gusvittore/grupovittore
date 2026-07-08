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
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const notificationEmail = process.env.LEAD_NOTIFICATION_EMAIL;

  if (
    !host ||
    !Number.isFinite(port) ||
    !user ||
    !pass ||
    !notificationEmail
  ) {
    console.warn("Configuracao de e-mail incompleta. E-mail de lead nao enviado.");
    return null;
  }

  return {
    host,
    port,
    user,
    pass,
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
) {
  const smtpConfig = getSmtpConfig();

  if (!smtpConfig) {
    return;
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

  await transporter.sendMail({
    from: `"Grupo Vittore Leads" <${smtpConfig.user}>`,
    to: smtpConfig.notificationEmail,
    subject: "Novo lead recebido | Grupo Vittore",
    text,
    html,
  });
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

async function sendLeadToClickUp(
  payload: LeadPayload,
  qualification: LeadQualification,
): Promise<ClickUpTaskResult> {
  const config = getClickUpConfig();
  const task = await createClickUpTask(config, payload, qualification);
  const taskId = task.taskId;
  const fieldErrors: string[] = [];

  try {
    await createClickUpTaskComment(config, taskId);
  } catch (error) {
    console.warn("Falha ao criar comentário no ClickUp:", getErrorMessage(error));
  }

  try {
    const fields = await getClickUpFields(config);
    fieldErrors.push(
      ...(await fillClickUpCustomFields(config, taskId, fields, payload)),
    );
  } catch (error) {
    const message = `Falha ao preencher campos personalizados do ClickUp: ${getErrorMessage(error)}`;
    console.warn(message);
    fieldErrors.push(message);
  }

  return { taskId, taskUrl: task.taskUrl, fieldErrors };
}

export async function POST(request: Request) {
  let rawPayload: unknown;

  try {
    rawPayload = await request.json();
  } catch {
    rawPayload = {};
  }

  const payload = sanitizePayload(rawPayload);

  if (!hasRequiredFields(payload)) {
    return Response.json(
      { ok: false, error: "Campos obrigatórios ausentes." },
      { status: 400 },
    );
  }

  const qualification = qualifyLead(payload.faturamento_mensal);
  let supabaseConfig: SupabaseConfig;
  let leadId: string;

  try {
    supabaseConfig = getSupabaseConfig();

    try {
      const duplicateLead = await findRecentDuplicateLead(supabaseConfig, payload);

      if (duplicateLead) {
        return Response.json({
          ok: true,
          duplicate: true,
          savedToSupabase: true,
          sentToClickUp: true,
          leadId: duplicateLead.id ? String(duplicateLead.id) : undefined,
          clickupTaskId: duplicateLead.clickup_task_id ?? undefined,
          redirectTo: qualification.redirectTo,
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
  } catch (error) {
    console.error("Erro ao salvar lead no Supabase:", error);
    return Response.json(
      { ok: false, error: "Não foi possível salvar o lead." },
      { status: 500 },
    );
  }

  try {
    const clickUpResult = await sendLeadToClickUp(payload, qualification);
    const erroClickUp = clickUpResult.fieldErrors.length
      ? clickUpResult.fieldErrors.join(" | ")
      : null;

    try {
      await updateLeadClickUpStatus(supabaseConfig, leadId, {
        enviado_clickup: true,
        clickup_task_id: clickUpResult.taskId,
        erro_clickup: erroClickUp,
      });
    } catch (error) {
      console.error("Erro ao atualizar status do ClickUp no Supabase:", error);
    }

    try {
      await sendLeadNotificationEmail(payload, qualification, {
        clickup_task_id: clickUpResult.taskId,
        clickup_task_url: clickUpResult.taskUrl,
      });
    } catch (emailError) {
      console.warn(
        "Falha ao enviar e-mail de notificação do lead:",
        getErrorMessage(emailError),
      );
    }

    return Response.json({
      ok: true,
      savedToSupabase: true,
      sentToClickUp: true,
      leadId,
      clickupTaskId: clickUpResult.taskId,
      clickupTaskUrl: clickUpResult.taskUrl ?? undefined,
      redirectTo: qualification.redirectTo,
    });
  } catch (error) {
    const erroClickUp = getErrorMessage(error);
    console.error("Erro ao enviar lead para o ClickUp:", error);

    try {
      await updateLeadClickUpStatus(supabaseConfig, leadId, {
        enviado_clickup: false,
        erro_clickup: erroClickUp,
      });
    } catch (updateError) {
      console.error("Erro ao registrar falha do ClickUp no Supabase:", updateError);
    }

    try {
      await sendLeadNotificationEmail(payload, qualification, {
        clickup_task_id: null,
        clickup_task_url: null,
        clickupError: erroClickUp,
      });
    } catch (emailError) {
      console.warn(
        "Falha ao enviar e-mail de notificação do lead:",
        getErrorMessage(emailError),
      );
    }

    return Response.json({
      ok: true,
      savedToSupabase: true,
      sentToClickUp: false,
      leadId,
      redirectTo: qualification.redirectTo,
    });
  }
}
