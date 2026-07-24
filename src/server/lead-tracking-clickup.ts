import type { LeadTrackingPayload } from "../lib/lead-tracking";

type TrackingEnvironment = Record<string, string | undefined>;

export type LeadTrackingClickUpCandidate = {
  names: string[];
  envVar: string;
  configuredFieldId: string;
  value: string | number;
};

function formatTrackingValue(value: string | number | null | undefined) {
  if (value === 0) return "0";
  return value ? String(value) : "Não informado";
}

export function formatLeadJourney(tracking: LeadTrackingPayload) {
  if (!tracking.jornadaDoLead.length) return "Não informado";

  return tracking.jornadaDoLead
    .map((entry, index) => `${index + 1}. ${entry.path}`)
    .join("\n");
}

export function buildLeadTrackingDescription(tracking: LeadTrackingPayload) {
  return [
    "RASTREAMENTO E JORNADA DO LEAD",
    "",
    `Origem externa: ${formatTrackingValue(tracking.origemExterna)}`,
    `Primeira página visitada: ${formatTrackingValue(tracking.primeiraPaginaVisitada)}`,
    `Categoria de conteúdo: ${formatTrackingValue(tracking.categoriaDeConteudo)}`,
    `Artigo de origem: ${formatTrackingValue(tracking.artigoDeOrigem)}`,
    `Último artigo lido: ${formatTrackingValue(tracking.ultimoArtigoLido)}`,
    `Quantidade de artigos lidos: ${formatTrackingValue(tracking.quantidadeDeArtigosLidos)}`,
    `CTA de conversão: ${formatTrackingValue(tracking.ctaDeConversao)}`,
    `Landing de conversão: ${formatTrackingValue(tracking.landingDeConversao)}`,
    `UTM Source: ${formatTrackingValue(tracking.utmSource)}`,
    `UTM Medium: ${formatTrackingValue(tracking.utmMedium)}`,
    `UTM Campaign: ${formatTrackingValue(tracking.utmCampaign)}`,
    `UTM Term: ${formatTrackingValue(tracking.utmTerm)}`,
    `UTM Content: ${formatTrackingValue(tracking.utmContent)}`,
    `GCLID: ${formatTrackingValue(tracking.gclid)}`,
    `FBCLID: ${formatTrackingValue(tracking.fbclid)}`,
    `Referrer inicial: ${formatTrackingValue(tracking.referrerInicial)}`,
    `Timestamp da primeira visita: ${formatTrackingValue(tracking.timestampPrimeiraVisita)}`,
    "",
    "Jornada do lead:",
    formatLeadJourney(tracking),
  ].join("\n");
}

export function getLeadTrackingClickUpCandidates(
  tracking: LeadTrackingPayload,
  env: TrackingEnvironment = process.env,
): LeadTrackingClickUpCandidate[] {
  const definitions = [
    {
      names: ["Primeira Página Visitada"],
      envVar: "CLICKUP_FIELD_FIRST_PAGE_ID",
      value: formatTrackingValue(tracking.primeiraPaginaVisitada),
    },
    {
      names: ["Categoria de Conteúdo"],
      envVar: "CLICKUP_FIELD_CONTENT_CATEGORY_ID",
      value: formatTrackingValue(tracking.categoriaDeConteudo),
    },
    {
      names: ["Artigo de Origem"],
      envVar: "CLICKUP_FIELD_ORIGIN_ARTICLE_ID",
      value: formatTrackingValue(tracking.artigoDeOrigem),
    },
    {
      names: ["Último Artigo Lido"],
      envVar: "CLICKUP_FIELD_LAST_ARTICLE_ID",
      value: formatTrackingValue(tracking.ultimoArtigoLido),
    },
    {
      names: ["CTA de Conversão"],
      envVar: "CLICKUP_FIELD_CONVERSION_CTA_ID",
      value: formatTrackingValue(tracking.ctaDeConversao),
    },
    {
      names: ["Landing de Conversão"],
      envVar: "CLICKUP_FIELD_CONVERSION_LANDING_ID",
      value: formatTrackingValue(tracking.landingDeConversao),
    },
    {
      names: ["Jornada do Lead"],
      envVar: "CLICKUP_FIELD_LEAD_JOURNEY_ID",
      value: formatLeadJourney(tracking),
    },
    {
      names: ["Quantidade de Artigos Lidos"],
      envVar: "CLICKUP_FIELD_ARTICLES_READ_COUNT_ID",
      value: tracking.quantidadeDeArtigosLidos,
    },
  ];

  return definitions.map((definition) => ({
    ...definition,
    configuredFieldId: env[definition.envVar]?.trim() || "",
  }));
}
