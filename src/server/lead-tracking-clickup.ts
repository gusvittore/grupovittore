import type { LeadTrackingPayload } from "../lib/lead-tracking";

type TrackingEnvironment = Record<string, string | undefined>;

export type LeadTrackingClickUpCandidate = {
  names: string[];
  envVar: string;
  configuredFieldId: string;
  value: string | number | null;
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

export type ClickUpCustomFieldResolution = {
  expectedName: string;
  attemptedValue: string | number | null;
  actualName?: string;
  fieldId?: string;
  fieldType?: string;
  resolvedValue?: ClickUpCustomFieldPayload["value"];
  status: "ready" | "not_found" | "invalid_value";
  error?: string;
};

function normalizeClickUpValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/:+$/, "")
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
  tracking: LeadTrackingPayload | undefined,
  env: TrackingEnvironment = process.env,
): LeadTrackingClickUpCandidate[] {
  const definitions = [
    {
      names: ["Primeira Página Visitada"],
      envVar: "CLICKUP_FIELD_FIRST_PAGE_ID",
      value: tracking?.primeiraPaginaVisitada || null,
    },
    {
      names: ["Categoria de Conteúdo"],
      envVar: "CLICKUP_FIELD_CONTENT_CATEGORY_ID",
      value: tracking?.categoriaDeConteudo || null,
    },
    {
      names: ["Artigo de Origem"],
      envVar: "CLICKUP_FIELD_ORIGIN_ARTICLE_ID",
      value: tracking?.artigoDeOrigem || null,
    },
    {
      names: ["Último Artigo Lido"],
      envVar: "CLICKUP_FIELD_LAST_ARTICLE_ID",
      value: tracking?.ultimoArtigoLido || null,
    },
    {
      names: ["CTA de Conversão"],
      envVar: "CLICKUP_FIELD_CONVERSION_CTA_ID",
      value: tracking?.ctaDeConversao || null,
    },
    {
      names: ["Landing de Conversão"],
      envVar: "CLICKUP_FIELD_CONVERSION_LANDING_ID",
      value: tracking?.landingDeConversao || null,
    },
    {
      names: ["Jornada do Lead"],
      envVar: "CLICKUP_FIELD_LEAD_JOURNEY_ID",
      value:
        tracking?.jornadaDoLead.length && tracking.jornadaDoLead.length > 0
          ? formatLeadJourney(tracking)
          : null,
    },
    {
      names: ["Quantidade de Artigos Lidos"],
      envVar: "CLICKUP_FIELD_ARTICLES_READ_COUNT_ID",
      value:
        typeof tracking?.quantidadeDeArtigosLidos === "number"
          ? tracking.quantidadeDeArtigosLidos
          : null,
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
  tracking: LeadTrackingPayload | undefined,
  fields: ClickUpCustomFieldDefinition[],
  env: TrackingEnvironment = process.env,
) {
  const customFields: ClickUpCustomFieldPayload[] = [];
  const errors: string[] = [];
  const foundFields: ClickUpCustomFieldDefinition[] = [];
  const missingFields: string[] = [];
  const resolutions: ClickUpCustomFieldResolution[] = [];

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
      const error = `Campo ClickUp de jornada nao encontrado: ${candidate.names.join(" / ")}.`;
      missingFields.push(candidate.names[0]);
      errors.push(error);
      resolutions.push({
        expectedName: candidate.names[0],
        attemptedValue: candidate.value,
        status: "not_found",
        error,
      });
      continue;
    }

    for (const field of matchedFields) {
      foundFields.push(field);
      if (candidate.value === null) {
        const error = `Campo "${field.name}" encontrado, mas sem valor de tracking para enviar.`;
        errors.push(error);
        resolutions.push({
          expectedName: candidate.names[0],
          attemptedValue: null,
          actualName: field.name,
          fieldId: field.id,
          fieldType: field.type || "desconhecido",
          status: "invalid_value",
          error,
        });
        continue;
      }
      const resolvedValue = resolveCustomFieldValue(field, candidate.value);

      if (typeof resolvedValue === "object" && !Array.isArray(resolvedValue)) {
        errors.push(resolvedValue.error);
        resolutions.push({
          expectedName: candidate.names[0],
          attemptedValue: candidate.value,
          actualName: field.name,
          fieldId: field.id,
          fieldType: field.type || "desconhecido",
          status: "invalid_value",
          error: resolvedValue.error,
        });
        continue;
      }

      customFields.push({ id: field.id, value: resolvedValue });
      resolutions.push({
        expectedName: candidate.names[0],
        attemptedValue: candidate.value,
        actualName: field.name,
        fieldId: field.id,
        fieldType: field.type || "desconhecido",
        resolvedValue,
        status: "ready",
      });
    }
  }

  return {
    customFields,
    errors,
    foundFields,
    missingFields,
    resolutions,
  };
}
