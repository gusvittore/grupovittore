export const LEAD_ORIGIN = "Landing Page Assessoria Comercial";
export const NON_QUALIFIED_REVENUE = "At\u00e9 50 mil";
export const RECENT_DUPLICATE_WINDOW_MINUTES = 3;

export type LeadPayload = {
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

export type LeadQualification = {
  statusQualificacao: "NOVO_LEAD" | "MQL";
  clickupStatus: "NOVO LEAD" | "MQL - LEAD QUALIF. MARKT.";
  redirectTo: "/obrigado" | "/obrigado-qualificado";
};

export type SupabaseConfig = {
  supabaseUrl: string;
  serviceRoleKey: string;
};

export type LeadApiTimings = {
  totalMs: number;
  supabaseMs: number;
  enqueueMs: number;
};

export type LeadEnqueueResult = {
  queued: boolean;
  status?: number | null;
  error?: string | null;
};

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function cleanString(value: unknown) {
  if (value === undefined || value === null) {
    return "";
  }

  return String(value).trim();
}

export function sanitizePayload(rawPayload: unknown): LeadPayload {
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

export function hasRequiredFields(payload: LeadPayload) {
  return Boolean(
    payload.nome_completo &&
      payload.email &&
      payload.whatsapp &&
      payload.empresa &&
      payload.segmento &&
      payload.faturamento_mensal,
  );
}

export function qualifyLead(faturamentoMensal: string): LeadQualification {
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

export function getSupabaseConfig(): SupabaseConfig {
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Configuracao do Supabase ausente.");
  }

  return { supabaseUrl, serviceRoleKey };
}

export function getSupabaseHeaders(serviceRoleKey: string) {
  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
  };
}

export async function readResponseText(response: Response) {
  try {
    return await response.text();
  } catch {
    return "";
  }
}

export function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Erro desconhecido.";
}

export async function withTimeout<T>(
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

export async function findRecentDuplicateLead(
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

export async function saveLeadToSupabase(
  config: SupabaseConfig,
  payload: LeadPayload,
  qualification: LeadQualification,
  rawPayload: unknown,
) {
  const response = await fetch(`${config.supabaseUrl}/rest/v1/leads_assessoria`, {
    method: "POST",
    headers: {
      ...getSupabaseHeaders(config.serviceRoleKey),
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      ...payload,
      status_qualificacao: qualification.statusQualificacao,
      clickup_status_destino: qualification.clickupStatus,
      enviado_clickup: false,
      erro_clickup: "Processamento em segundo plano pendente.",
      raw_payload: rawPayload,
    }),
  });

  if (!response.ok) {
    throw new Error(await readResponseText(response));
  }

  const data = (await response.json()) as Array<{ id?: string | number }>;
  const leadId = data[0]?.id;

  if (leadId === undefined || leadId === null) {
    throw new Error("Supabase nao retornou o id do lead.");
  }

  return String(leadId);
}

export async function getLeadFromSupabase(
  config: SupabaseConfig,
  leadId: string,
) {
  const response = await fetch(
    `${config.supabaseUrl}/rest/v1/leads_assessoria?select=*&id=eq.${encodeURIComponent(leadId)}&limit=1`,
    {
      method: "GET",
      headers: getSupabaseHeaders(config.serviceRoleKey),
    },
  );

  if (!response.ok) {
    throw new Error(await readResponseText(response));
  }

  const data = (await response.json()) as unknown[];
  const lead = data[0];

  if (!lead) {
    throw new Error("Lead nao encontrado no Supabase.");
  }

  return sanitizePayload(lead);
}

export async function updateLeadClickUpStatus(
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

function getLeadBackgroundUrl(request: Request) {
  const origin = new URL(request.url).origin;
  return new URL("/.netlify/functions/process-lead-background", origin).toString();
}

export async function enqueueLeadBackgroundJob(
  request: Request,
  leadId: string,
): Promise<LeadEnqueueResult> {
  const workerSecret = process.env.LEAD_WORKER_SECRET;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (workerSecret) {
    headers["x-lead-worker-secret"] = workerSecret;
  } else if (process.env.NODE_ENV !== "production") {
    console.warn(
      "LEAD_WORKER_SECRET ausente em desenvolvimento; chamando worker sem segredo.",
    );
  }

  try {
    const response = await withTimeout(
      fetch(getLeadBackgroundUrl(request), {
        method: "POST",
        headers,
        body: JSON.stringify({ leadId }),
      }),
      1200,
      "enqueueLeadBackgroundJob",
    );

    if (!response.ok) {
      return {
        queued: false,
        status: response.status,
        error: await readResponseText(response),
      };
    }

    return {
      queued: true,
      status: response.status,
      error: null,
    };
  } catch (error) {
    const message = getErrorMessage(error);
    console.warn("Falha ao enfileirar processamento do lead:", message);

    return {
      queued: false,
      status: null,
      error: message,
    };
  }
}
