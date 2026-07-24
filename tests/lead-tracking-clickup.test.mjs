import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const clickup = await import("../src/server/lead-tracking-clickup.ts").catch(
  () => ({}),
);
const processor = await readFile(
  new URL("../src/server/lead-processing.ts", import.meta.url),
  "utf8",
);

function requiredFunction(name) {
  assert.equal(typeof clickup[name], "function", `${name} must be exported`);
  return clickup[name];
}

function trackingPayload(overrides = {}) {
  return {
    origemExterna: "Google Ads",
    primeiraPaginaVisitada: "/blog/artigo-1",
    timestampPrimeiraVisita: "2026-07-24T10:00:00.000Z",
    referrerInicial: "https://www.google.com/",
    utmSource: "google",
    utmMedium: "cpc",
    utmCampaign: "campanha-x",
    utmTerm: "crm",
    utmContent: "anuncio-a",
    gclid: "abc123",
    fbclid: "fb456",
    categoriaDeConteudo: "Gestão Comercial",
    artigoDeOrigem: "Artigo 1",
    ultimoArtigoLido: "Artigo 2",
    ctaDeConversao: "CTA final do artigo para Assessoria Comercial",
    landingDeConversao: "/assessoria-comercial",
    quantidadeDeArtigosLidos: 2,
    jornadaDoLead: [
      {
        path: "/blog/artigo-1",
        type: "artigo",
        title: "Artigo 1",
        slug: "artigo-1",
        category: "Gestão Comercial",
        visitedAt: "2026-07-24T10:00:00.000Z",
      },
      {
        path: "/blog/artigo-2",
        type: "artigo",
        title: "Artigo 2",
        slug: "artigo-2",
        category: "Gestão Comercial",
        visitedAt: "2026-07-24T10:01:00.000Z",
      },
      {
        path: "/assessoria-comercial",
        type: "assessoria-comercial",
        title: "Assessoria Comercial",
        visitedAt: "2026-07-24T10:02:00.000Z",
      },
    ],
    ...overrides,
  };
}

test("ClickUp description always includes readable tracking fallback and numbered journey", () => {
  const buildLeadTrackingDescription = requiredFunction(
    "buildLeadTrackingDescription",
  );
  const description = buildLeadTrackingDescription(trackingPayload());

  assert.match(description, /RASTREAMENTO E JORNADA DO LEAD/);
  assert.match(description, /Origem externa: Google Ads/);
  assert.match(description, /Primeira página visitada: \/blog\/artigo-1/);
  assert.match(description, /Categoria de conteúdo: Gestão Comercial/);
  assert.match(description, /Artigo de origem: Artigo 1/);
  assert.match(description, /Último artigo lido: Artigo 2/);
  assert.match(description, /Quantidade de artigos lidos: 2/);
  assert.match(
    description,
    /CTA de conversão: CTA final do artigo para Assessoria Comercial/,
  );
  assert.match(description, /Landing de conversão: \/assessoria-comercial/);
  assert.match(description, /UTM Source: google/);
  assert.match(description, /GCLID: abc123/);
  assert.match(description, /Referrer inicial: https:\/\/www\.google\.com\//);
  assert.match(
    description,
    /Jornada do lead:\n1\. \/blog\/artigo-1\n2\. \/blog\/artigo-2\n3\. \/assessoria-comercial/,
  );

  const empty = buildLeadTrackingDescription(
    trackingPayload({
      artigoDeOrigem: "",
      ultimoArtigoLido: "",
      jornadaDoLead: [],
    }),
  );
  assert.match(empty, /Artigo de origem: Não informado/);
  assert.match(empty, /Último artigo lido: Não informado/);
  assert.match(empty, /Jornada do lead:\nNão informado/);
});

test("ClickUp exposes exactly eight journey fields with optional configured IDs", () => {
  const getLeadTrackingClickUpCandidates = requiredFunction(
    "getLeadTrackingClickUpCandidates",
  );
  const env = {
    CLICKUP_FIELD_FIRST_PAGE_ID: "field-first-page",
    CLICKUP_FIELD_CONTENT_CATEGORY_ID: "field-category",
    CLICKUP_FIELD_ORIGIN_ARTICLE_ID: "field-origin-article",
    CLICKUP_FIELD_LAST_ARTICLE_ID: "field-last-article",
    CLICKUP_FIELD_CONVERSION_CTA_ID: "field-cta",
    CLICKUP_FIELD_CONVERSION_LANDING_ID: "field-landing",
    CLICKUP_FIELD_LEAD_JOURNEY_ID: "field-journey",
    CLICKUP_FIELD_ARTICLES_READ_COUNT_ID: "field-count",
  };
  const candidates = getLeadTrackingClickUpCandidates(
    trackingPayload(),
    env,
  );

  assert.equal(candidates.length, 8);
  assert.deepEqual(
    candidates.map((candidate) => candidate.names[0]),
    [
      "Primeira Página Visitada",
      "Categoria de Conteúdo",
      "Artigo de Origem",
      "Último Artigo Lido",
      "CTA de Conversão",
      "Landing de Conversão",
      "Jornada do Lead",
      "Quantidade de Artigos Lidos",
    ],
  );
  assert.deepEqual(
    candidates.map((candidate) => candidate.configuredFieldId),
    Object.values(env),
  );
  assert.equal(candidates[0].value, "/blog/artigo-1");
  assert.equal(candidates[6].value, [
    "1. /blog/artigo-1",
    "2. /blog/artigo-2",
    "3. /assessoria-comercial",
  ].join("\n"));
  assert.equal(candidates[7].value, 2);
});

test("processor keeps current mappings and applies journey fields after task creation in background", () => {
  assert.match(processor, /getLeadTrackingClickUpCandidates/);
  assert.match(processor, /buildLeadTrackingDescription/);
  assert.match(
    processor,
    /description:\s*buildClickUpDescription\(payload, qualification\)/,
  );
  assert.match(processor, /configuredFieldId/);
  assert.match(processor, /field\.id === configuredFieldId/);
  assert.match(processor, /findClickUpFieldsByName/);
  assert.match(processor, /getClickUpFields\(config\)/);
  assert.match(processor, /Promise\.allSettled\(postClickupTasks\)/);

  for (const currentField of [
    "Origem do Lead",
    "UTM Source",
    "UTM Medium",
    "UTM Campaign",
    "UTM Term",
    "UTM Content",
    "GCLID",
  ]) {
    assert.match(processor, new RegExp(currentField));
  }
});
