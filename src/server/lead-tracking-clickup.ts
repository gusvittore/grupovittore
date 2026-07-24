import type { LeadTrackingPayload } from "../lib/lead-tracking";

type TrackingEnvironment = Record<string, string | undefined>;

export type LeadTrackingClickUpCandidate = {
  names: string[];
  envVar: string;
  configuredFieldId: string;
  value: string | number;
};

export type ClickUpCustomFieldOption = {
  id: string;
  name: string;
};

export type ClickUpCustomFieldDefinition = {
  id: string;
  name: string;
  type?: string;
  type_config?: {
    options?: ClickUpCustomFieldOption[];
  };
};

export type ClickUpCustomFieldPayload = {
  id: string;
  value: string | number | string[];
};

function normalizeClickUpValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

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

function resolveCustomFieldValue(
  field: ClickUpCustomFieldDefinition,
  value: string | number,
) {
  const options = field.type_config?.options;
  const stringValue = String(value);

  if (options?.length) {
    const option = options.find(
      (item) =>
        normalizeClickUpValue(item.name) === normalizeClickUpValue(stringValue),
    );

    if (!option) {
      return {
        error: `Campo "${field.name}" pulado: opcao "${stringValue}" nao encontrada no dropdown.`,
      };
    }

    return normalizeClickUpValue(field.type ?? "").includes("labels")
      ? [option.id]
      : option.id;
  }

  if (normalizeClickUpValue(field.type ?? "").includes("number")) {
    const numericValue = Number(value);

    if (Number.isFinite(numericValue)) return numericValue;
  }

  return stringValue;
}

export function resolveLeadTrackingClickUpCustomFields(
  tracking: LeadTrackingPayload,
  fields: ClickUpCustomFieldDefinition[],
  env: TrackingEnvironment = process.env,
) {
  const customFields: ClickUpCustomFieldPayload[] = [];
  const errors: string[] = [];

  for (const candidate of getLeadTrackingClickUpCandidates(tracking, env)) {
    const configuredField = candidate.configuredFieldId
      ? fields.find((field) => field.id === candidate.configuredFieldId)
      : undefined;
    const matchedFields = configuredField
      ? [configuredField]
      : fields.filter((field) =>
          candidate.names.some(
            (name) =>
              normalizeClickUpValue(field.name) === normalizeClickUpValue(name),
          ),
        );

    if (!matchedFields.length) {
      errors.push(
        `Campo ClickUp de jornada nao encontrado: ${candidate.names.join(" / ")}.`,
      );
      continue;
    }

    for (const field of matchedFields) {
      const resolvedValue = resolveCustomFieldValue(field, candidate.value);

      if (typeof resolvedValue === "object" && !Array.isArray(resolvedValue)) {
        errors.push(resolvedValue.error);
        continue;
      }

      customFields.push({ id: field.id, value: resolvedValue });
    }
  }

  return { customFields, errors };
}
