export const runtime = "nodejs";

const LEAD_ORIGIN = "Landing Page Assessoria Comercial";
const NON_QUALIFIED_REVENUE = "Até 50 mil";
const DEFAULT_CLICKUP_LIST_ID = "901327751514";

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
};

type ClickUpOption = {
  id: string;
  name: string;
};

type ClickUpField = {
  id: string;
  name: string;
  type_config?: {
    options?: ClickUpOption[];
  };
};

type ClickUpTaskResult = {
  taskId: string;
  fieldErrors: string[];
};

const clickUpFieldMapping: Array<{
  names: string[];
  payloadKey: keyof LeadPayload;
}> = [
  { names: ["Nome Completo"], payloadKey: "nome_completo" },
  { names: ["E-mail"], payloadKey: "email" },
  {
    names: ["Whatsapp / Telefone", "WhatsApp / Telefone"],
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

  if (!clickUpApiToken || !clickUpListId) {
    throw new Error("Configuração do ClickUp ausente.");
  }

  return { clickUpApiToken, clickUpListId };
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

function normalizeFieldName(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/\s*\/\s*/g, " / ")
    .replace(/\s+/g, " ")
    .trim();
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
        description: buildClickUpDescription(payload, qualification),
        status: qualification.clickupStatus,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(await readResponseText(response));
  }

  const data = (await response.json()) as { id?: string };

  if (!data.id) {
    throw new Error("ClickUp não retornou o id da tarefa.");
  }

  return data.id;
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

function resolveClickUpFieldValue(field: ClickUpField, value: string) {
  const options = field.type_config?.options;

  if (!options?.length) {
    return value;
  }

  const option = options.find(
    (item) => normalizeFieldName(item.name) === normalizeFieldName(value),
  );

  if (!option) {
    const message = `Campo "${field.name}" pulado: opção "${value}" não encontrada no dropdown.`;
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
    const field = fields.find(
      (item) =>
        names.some(
          (clickUpFieldName) =>
            normalizeFieldName(item.name) === normalizeFieldName(clickUpFieldName),
        ),
    );

    if (!field) {
      const message = `Campo ClickUp não encontrado: ${names.join(" / ")}.`;
      console.warn(message);
      fieldErrors.push(message);
      continue;
    }

    const value = payload[payloadKey];
    const resolvedValue = resolveClickUpFieldValue(field, value);

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

  return fieldErrors;
}

async function sendLeadToClickUp(
  payload: LeadPayload,
  qualification: LeadQualification,
): Promise<ClickUpTaskResult> {
  const config = getClickUpConfig();
  const taskId = await createClickUpTask(config, payload, qualification);
  const fieldErrors: string[] = [];

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

  return { taskId, fieldErrors };
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

    return Response.json({
      ok: true,
      savedToSupabase: true,
      sentToClickUp: true,
      leadId,
      clickupTaskId: clickUpResult.taskId,
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

    return Response.json({
      ok: true,
      savedToSupabase: true,
      sentToClickUp: false,
      leadId,
      redirectTo: qualification.redirectTo,
    });
  }
}
