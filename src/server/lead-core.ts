import type {
  LeadJourneyEntry,
  LeadPageType,
  LeadTrackingPayload,
} from "../lib/lead-tracking";

export const LEAD_ORIGIN = "Landing Page Assessoria Comercial";
export const NON_QUALIFIED_REVENUE = "At\u00e9 50 mil";
export const RECENT_DUPLICATE_WINDOW_MINUTES = 3;
export const MAX_TRACKING_JOURNEY_ENTRIES = 20;

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
  tracking: LeadTrackingPayload;
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
  validationMs: number;
  supabaseMs: number;
  enqueueMs: number;
  responseMs: number;
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

const TRACKING_PAGE_TYPES = new Set<LeadPageType>([
  "home",
  "sobre",
  "blog",
  "artigo",
  "assessoria-comercial",
  "materiais-impressos",
  "obrigado",
  "outro",
]);

const TRACKING_CATEGORIES = new Set([
  "Vendas",
  "Marketing",
  "Gestão Comercial",
  "Crescimento Empresarial",
  "Tecnologia e Automações",
  "Materiais Gráficos",
  "Institucional",
  "Desconhecido",
]);

function cleanLimitedString(value: unknown, maxLength: number) {
  return cleanString(value).slice(0, maxLength);
}

function cleanTrackingPath(value: unknown) {
  const path = cleanLimitedString(value, 500);
  return path.startsWith("/") ? path : "";
}

function sanitizeJourneyEntry(value: unknown): LeadJourneyEntry | null {
  if (!isRecord(value)) return null;

  const path = cleanTrackingPath(value.path);
  if (!path) return null;

  const rawType = cleanLimitedString(value.type, 40) as LeadPageType;
  const rawCategory = cleanLimitedString(value.category, 80);
  const category = TRACKING_CATEGORIES.has(rawCategory)
    ? rawCategory
    : undefined;
  const slug = cleanLimitedString(value.slug, 200);

  return {
    path,
    type: TRACKING_PAGE_TYPES.has(rawType) ? rawType : "outro",
    title: cleanLimitedString(value.title, 250),
    visitedAt: cleanLimitedString(value.visitedAt, 64),
    ...(category ? { category } : {}),
    ...(slug ? { slug } : {}),
  };
}

function emptyLeadTracking(): LeadTrackingPayload {
  return {
    origemExterna: "Desconhecido",
    primeiraPaginaVisitada: "",
    timestampPrimeiraVisita: "",
    referrerInicial: "",
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
    utmTerm: "",
    utmContent: "",
    gclid: "",
    fbclid: "",
    categoriaDeConteudo: "Desconhecido",
    artigoDeOrigem: "",
    ultimoArtigoLido: "",
    ctaDeConversao: "Desconhecido",
    landingDeConversao: "",
    quantidadeDeArtigosLidos: 0,
    jornadaDoLead: [],
  };
}

export function sanitizeLeadTracking(value: unknown): LeadTrackingPayload {
  if (!isRecord(value)) return emptyLeadTracking();

  const rawJourney = Array.isArray(value.jornadaDoLead)
    ? value.jornadaDoLead
    : [];
  const deduplicatedJourney = rawJourney.reduce<LeadJourneyEntry[]>(
    (journey, rawEntry) => {
      const entry = sanitizeJourneyEntry(rawEntry);
      if (!entry || journey.at(-1)?.path === entry.path) return journey;
      return [...journey, entry];
    },
    [],
  );
  const jornadaDoLead = deduplicatedJourney.slice(
    -MAX_TRACKING_JOURNEY_ENTRIES,
  );
  const uniqueArticleSlugs = new Set(
    jornadaDoLead
      .filter((entry) => entry.type === "artigo" && entry.slug)
      .map((entry) => entry.slug),
  );
  const rawCategory = cleanLimitedString(value.categoriaDeConteudo, 80);

  return {
    origemExterna:
      cleanLimitedString(value.origemExterna, 100) || "Desconhecido",
    primeiraPaginaVisitada: cleanTrackingPath(value.primeiraPaginaVisitada),
    timestampPrimeiraVisita: cleanLimitedString(
      value.timestampPrimeiraVisita,
      64,
    ),
    referrerInicial: cleanLimitedString(value.referrerInicial, 1000),
    utmSource: cleanLimitedString(value.utmSource, 250),
    utmMedium: cleanLimitedString(value.utmMedium, 250),
    utmCampaign: cleanLimitedString(value.utmCampaign, 250),
    utmTerm: cleanLimitedString(value.utmTerm, 250),
    utmContent: cleanLimitedString(value.utmContent, 250),
    gclid: cleanLimitedString(value.gclid, 500),
    fbclid: cleanLimitedString(value.fbclid, 500),
    categoriaDeConteudo: TRACKING_CATEGORIES.has(rawCategory)
      ? rawCategory
      : "Desconhecido",
    artigoDeOrigem: cleanLimitedString(value.artigoDeOrigem, 250),
    ultimoArtigoLido: cleanLimitedString(value.ultimoArtigoLido, 250),
    ctaDeConversao:
      cleanLimitedString(value.ctaDeConversao, 250) || "Desconhecido",
    landingDeConversao: cleanTrackingPath(value.landingDeConversao),
    quantidadeDeArtigosLidos: uniqueArticleSlugs.size,
    jornadaDoLead,
  };
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
    tracking: sanitizeLeadTracking(payload.tracking),
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
  const { tracking, ...leadColumns } = payload;
  const rawPayloadRecord = isRecord(rawPayload) ? rawPayload : {};
  const response = await fetch(`${config.supabaseUrl}/rest/v1/leads_assessoria`, {
    method: "POST",
    headers: {
      ...getSupabaseHeaders(config.serviceRoleKey),
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      ...leadColumns,
      status_qualificacao: qualification.statusQualificacao,
      clickup_status_destino: qualification.clickupStatus,
      enviado_clickup: false,
      erro_clickup: "Processamento em segundo plano pendente.",
      raw_payload: {
        ...rawPayloadRecord,
        tracking,
      },
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

  if (!isRecord(lead)) {
    throw new Error("Lead nao encontrado no Supabase.");
  }

  const rawPayload = isRecord(lead.raw_payload) ? lead.raw_payload : {};
  return sanitizePayload({
    ...lead,
    tracking: rawPayload.tracking,
  });
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
