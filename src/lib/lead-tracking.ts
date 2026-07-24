export const MAX_JOURNEY_ENTRIES = 20;

export const LEAD_TRACKING_STORAGE_KEYS = {
  firstTouch: "gv_tracking_first_touch",
  journey: "gv_tracking_journey",
  lastCta: "gv_tracking_last_cta",
  lastArticle: "gv_tracking_last_article",
  conversionContext: "gv_tracking_conversion_context",
  sessionTouch: "gv_tracking_session_touch",
  sessionId: "gv_tracking_session_id",
  conversionCompleted: "gv_tracking_conversion_completed",
} as const;

export const LEAD_TRACKING_CONSENT_EVENT = "gv-cookie-consent-changed";
const COOKIE_CONSENT_KEY = "cookie-consent-choice";

export type LeadPageType =
  | "home"
  | "sobre"
  | "blog"
  | "artigo"
  | "assessoria-comercial"
  | "materiais-impressos"
  | "obrigado"
  | "outro";

export type LeadJourneyEntry = {
  path: string;
  type: LeadPageType;
  title: string;
  visitedAt: string;
  category?: string;
  slug?: string;
};

export type LeadTrackingTouch = {
  path: string;
  visitedAt: string;
  referrer: string;
  inferredOrigin: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  gclid: string;
  fbclid: string;
};

export type LeadTrackingCta = {
  label: string;
  path: string;
  capturedAt: string;
  source?: string;
  category?: string;
  article?: string;
};

export type LeadTrackingPayload = {
  origemExterna: string;
  primeiraPaginaVisitada: string;
  timestampPrimeiraVisita: string;
  referrerInicial: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  gclid: string;
  fbclid: string;
  categoriaDeConteudo: string;
  artigoDeOrigem: string;
  ultimoArtigoLido: string;
  ctaDeConversao: string;
  landingDeConversao: string;
  quantidadeDeArtigosLidos: number;
  jornadaDoLead: LeadJourneyEntry[];
};

type ExternalOriginInput = {
  path: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  gclid: string;
};

type DeriveLeadTrackingInput = {
  firstTouch: LeadTrackingTouch | null;
  sessionTouch: LeadTrackingTouch | null;
  journey: LeadJourneyEntry[];
  lastCta: LeadTrackingCta | null;
  landingPath: string;
};

export type LeadPageVisitInput = Omit<LeadJourneyEntry, "visitedAt">;

type LeadPageVisitContext = {
  search?: string;
  referrer?: string;
  now?: string;
};

function normalized(value: string) {
  return value.trim().toLocaleLowerCase("pt-BR");
}

function includesAny(value: string, candidates: string[]) {
  return candidates.some((candidate) => value.includes(candidate));
}

export function inferExternalOrigin({
  path,
  referrer,
  utmSource,
  utmMedium,
  gclid,
}: ExternalOriginInput) {
  const source = normalized(utmSource);
  const medium = normalized(utmMedium);

  if (
    gclid ||
    (includesAny(source, ["google", "adwords"]) &&
      includesAny(medium, ["cpc", "ppc", "paid", "ads"]))
  ) {
    return "Google Ads";
  }

  if (includesAny(source, ["instagram", "ig"])) return "Instagram";
  if (includesAny(source, ["facebook", "meta", "fb"])) return "Facebook";
  if (source.includes("linkedin")) return "LinkedIn";
  if (includesAny(source, ["whatsapp", "whats", "wa.me"])) return "WhatsApp";
  if (source.includes("google")) return "Google orgânico";

  if (referrer) {
    try {
      const hostname = new URL(referrer).hostname.toLocaleLowerCase("pt-BR");
      if (hostname.includes("google.")) return "Google orgânico";
      if (hostname.includes("instagram.")) return "Instagram";
      if (hostname.includes("facebook.") || hostname.includes("fb.")) {
        return "Facebook";
      }
      if (hostname.includes("linkedin.")) return "LinkedIn";
      if (hostname.includes("whatsapp.") || hostname.includes("wa.me")) {
        return "WhatsApp";
      }
      if (!hostname.includes("grupovittore.")) return "Outro site";
    } catch {
      return "Desconhecido";
    }
  }

  if (path.startsWith("/blog/")) return "Blog";
  return "Direto";
}

export function appendJourneyEntry(
  journey: LeadJourneyEntry[],
  entry: LeadJourneyEntry,
) {
  if (journey.at(-1)?.path === entry.path) {
    return journey.slice(-MAX_JOURNEY_ENTRIES);
  }

  return [...journey, entry].slice(-MAX_JOURNEY_ENTRIES);
}

function campaignValue(
  sessionTouch: LeadTrackingTouch | null,
  firstTouch: LeadTrackingTouch | null,
  key:
    | "utmSource"
    | "utmMedium"
    | "utmCampaign"
    | "utmTerm"
    | "utmContent"
    | "gclid"
    | "fbclid",
) {
  return sessionTouch?.[key] || firstTouch?.[key] || "";
}

export function deriveLeadTrackingPayload({
  firstTouch,
  sessionTouch,
  journey,
  lastCta,
  landingPath,
}: DeriveLeadTrackingInput): LeadTrackingPayload {
  const safeJourney = journey.slice(-MAX_JOURNEY_ENTRIES);
  const articles = safeJourney.filter(
    (entry) => entry.type === "artigo" && Boolean(entry.slug),
  );
  const uniqueArticles = articles.filter(
    (article, index) =>
      articles.findIndex((candidate) => candidate.slug === article.slug) === index,
  );
  const originArticle = uniqueArticles[0];
  const lastArticle = articles.at(-1);

  return {
    origemExterna: firstTouch?.inferredOrigin || "Desconhecido",
    primeiraPaginaVisitada: firstTouch?.path || safeJourney[0]?.path || landingPath,
    timestampPrimeiraVisita: firstTouch?.visitedAt || "",
    referrerInicial: firstTouch?.referrer || "",
    utmSource: campaignValue(sessionTouch, firstTouch, "utmSource"),
    utmMedium: campaignValue(sessionTouch, firstTouch, "utmMedium"),
    utmCampaign: campaignValue(sessionTouch, firstTouch, "utmCampaign"),
    utmTerm: campaignValue(sessionTouch, firstTouch, "utmTerm"),
    utmContent: campaignValue(sessionTouch, firstTouch, "utmContent"),
    gclid: campaignValue(sessionTouch, firstTouch, "gclid"),
    fbclid: campaignValue(sessionTouch, firstTouch, "fbclid"),
    categoriaDeConteudo:
      originArticle?.category || lastArticle?.category || "Desconhecido",
    artigoDeOrigem: originArticle?.title || "",
    ultimoArtigoLido: lastArticle?.title || "",
    ctaDeConversao: lastCta?.label || "Direto para landing",
    landingDeConversao: landingPath,
    quantidadeDeArtigosLidos: uniqueArticles.length,
    jornadaDoLead: safeJourney,
  };
}

function hasBrowserStorage() {
  return typeof window !== "undefined";
}

function readStorageJson<T>(storage: Storage, key: string): T | null {
  try {
    const value = storage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch {
    return null;
  }
}

function writeStorageJson(storage: Storage, key: string, value: unknown) {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch {
    // Tracking is best-effort and must never interrupt navigation or submission.
  }
}

function ensureLeadTrackingSession() {
  try {
    const existing = window.sessionStorage.getItem(
      LEAD_TRACKING_STORAGE_KEYS.sessionId,
    );

    if (existing) return existing;

    const sessionId =
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
    window.sessionStorage.setItem(LEAD_TRACKING_STORAGE_KEYS.sessionId, sessionId);
    return sessionId;
  } catch {
    return "";
  }
}

export function hasLeadTrackingConsent() {
  if (!hasBrowserStorage()) return false;

  try {
    return window.localStorage.getItem(COOKIE_CONSENT_KEY) === "accepted";
  } catch {
    return false;
  }
}

function attributionFromVisit(
  path: string,
  search: string,
  referrer: string,
  visitedAt: string,
): LeadTrackingTouch {
  const params = new URLSearchParams(search);
  const touch = {
    path,
    visitedAt,
    referrer,
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
    utmTerm: params.get("utm_term") || "",
    utmContent: params.get("utm_content") || "",
    gclid: params.get("gclid") || "",
    fbclid: params.get("fbclid") || "",
  };

  return {
    ...touch,
    inferredOrigin: inferExternalOrigin(touch),
  };
}

function hasCampaignAttribution(touch: LeadTrackingTouch) {
  return Boolean(
    touch.utmSource ||
      touch.utmMedium ||
      touch.utmCampaign ||
      touch.utmTerm ||
      touch.utmContent ||
      touch.gclid ||
      touch.fbclid,
  );
}

export function recordLeadPageVisit(
  visit: LeadPageVisitInput,
  context: LeadPageVisitContext = {},
) {
  if (!hasLeadTrackingConsent()) return;

  try {
    const conversionCompleted = window.sessionStorage.getItem(
      LEAD_TRACKING_STORAGE_KEYS.conversionCompleted,
    );
    if (conversionCompleted && visit.type === "obrigado") return;
    if (conversionCompleted) {
      window.sessionStorage.removeItem(
        LEAD_TRACKING_STORAGE_KEYS.conversionCompleted,
      );
    }
  } catch {
    // Tracking remains best-effort when sessionStorage is unavailable.
  }

  ensureLeadTrackingSession();

  const visitedAt = context.now || new Date().toISOString();
  const search = context.search ?? window.location.search;
  const referrer =
    context.referrer ?? (typeof document !== "undefined" ? document.referrer : "");
  const currentTouch = attributionFromVisit(
    visit.path,
    search,
    referrer,
    visitedAt,
  );
  const firstTouch = readStorageJson<LeadTrackingTouch>(
    window.sessionStorage,
    LEAD_TRACKING_STORAGE_KEYS.firstTouch,
  );

  if (!firstTouch) {
    writeStorageJson(
      window.sessionStorage,
      LEAD_TRACKING_STORAGE_KEYS.firstTouch,
      currentTouch,
    );
  }

  const sessionTouch = readStorageJson<LeadTrackingTouch>(
    window.sessionStorage,
    LEAD_TRACKING_STORAGE_KEYS.sessionTouch,
  );
  if (!sessionTouch || hasCampaignAttribution(currentTouch)) {
    writeStorageJson(
      window.sessionStorage,
      LEAD_TRACKING_STORAGE_KEYS.sessionTouch,
      currentTouch,
    );
  }

  const journey =
    readStorageJson<LeadJourneyEntry[]>(
      window.sessionStorage,
      LEAD_TRACKING_STORAGE_KEYS.journey,
    ) ?? [];
  const entry: LeadJourneyEntry = {
    ...visit,
    visitedAt,
  };
  const nextJourney = appendJourneyEntry(journey, entry);
  writeStorageJson(
    window.sessionStorage,
    LEAD_TRACKING_STORAGE_KEYS.journey,
    nextJourney,
  );

  if (entry.type === "artigo") {
    writeStorageJson(
      window.sessionStorage,
      LEAD_TRACKING_STORAGE_KEYS.lastArticle,
      entry,
    );
  }
}

export function recordLeadCta(
  cta: Omit<LeadTrackingCta, "capturedAt">,
  capturedAt = new Date().toISOString(),
) {
  if (!hasLeadTrackingConsent()) return;

  writeStorageJson(
    window.sessionStorage,
    LEAD_TRACKING_STORAGE_KEYS.lastCta,
    { ...cta, capturedAt },
  );
}

export function getLeadTrackingSnapshot(landingPath: string) {
  if (!hasLeadTrackingConsent()) {
    return deriveLeadTrackingPayload({
      firstTouch: null,
      sessionTouch: null,
      journey: [],
      lastCta: null,
      landingPath,
    });
  }

  const snapshot = deriveLeadTrackingPayload({
    firstTouch: readStorageJson<LeadTrackingTouch>(
      window.sessionStorage,
      LEAD_TRACKING_STORAGE_KEYS.firstTouch,
    ),
    sessionTouch: readStorageJson<LeadTrackingTouch>(
      window.sessionStorage,
      LEAD_TRACKING_STORAGE_KEYS.sessionTouch,
    ),
    journey:
      readStorageJson<LeadJourneyEntry[]>(
        window.sessionStorage,
        LEAD_TRACKING_STORAGE_KEYS.journey,
      ) ?? [],
    lastCta: readStorageJson<LeadTrackingCta>(
      window.sessionStorage,
      LEAD_TRACKING_STORAGE_KEYS.lastCta,
    ),
    landingPath,
  });
  writeStorageJson(
    window.sessionStorage,
    LEAD_TRACKING_STORAGE_KEYS.conversionContext,
    snapshot,
  );
  return snapshot;
}

export function clearLeadTrackingStorage() {
  if (!hasBrowserStorage()) return;

  for (const key of Object.values(LEAD_TRACKING_STORAGE_KEYS)) {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Storage may be unavailable; clearing remains best-effort.
    }
    try {
      window.sessionStorage.removeItem(key);
    } catch {
      // Storage may be unavailable; clearing remains best-effort.
    }
  }
}

export function completeLeadTrackingConversion(
  completedAt = new Date().toISOString(),
) {
  if (!hasBrowserStorage()) return;

  let sessionId = "";
  try {
    sessionId =
      window.sessionStorage.getItem(LEAD_TRACKING_STORAGE_KEYS.sessionId) || "";
  } catch {
    // Completion remains best-effort when storage is unavailable.
  }

  clearLeadTrackingStorage();
  writeStorageJson(
    window.sessionStorage,
    LEAD_TRACKING_STORAGE_KEYS.conversionCompleted,
    { sessionId, completedAt },
  );
}
