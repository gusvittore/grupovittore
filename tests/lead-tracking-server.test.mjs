import assert from "node:assert/strict";
import test from "node:test";

const core = await import("../src/server/lead-core.ts");

function validLead(overrides = {}) {
  return {
    nome_completo: "Lead Teste",
    email: "lead@example.com",
    whatsapp: "(11) 99999-9999",
    empresa: "Empresa Teste",
    segmento: "Serviço",
    faturamento_mensal: "De 101 mil a 200 mil",
    origem_lead: "Landing Page Assessoria Comercial",
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "campanha-x",
    utm_term: "crm",
    utm_content: "anuncio-a",
    gclid: "abc123",
    ...overrides,
  };
}

function rawTracking() {
  return {
    origemExterna: "Google Ads",
    primeiraPaginaVisitada: "/blog/artigo-0",
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
    artigoDeOrigem: "Artigo 0",
    ultimoArtigoLido: "Artigo 24",
    ctaDeConversao: "CTA final do artigo para Assessoria Comercial",
    landingDeConversao: "/assessoria-comercial",
    quantidadeDeArtigosLidos: 999,
    jornadaDoLead: Array.from({ length: 25 }, (_, index) => ({
      path: `/blog/artigo-${index}`,
      type: "artigo",
      title: `Artigo ${index}`,
      category: "Gestão Comercial",
      slug: `artigo-${index}`,
      visitedAt: `2026-07-24T10:${String(index).padStart(2, "0")}:00.000Z`,
      nome: "PII que deve ser descartado",
    })),
    email: "pii-no-tracking@example.com",
  };
}

test("server sanitizes tracking, strips unknown keys, caps journey and recomputes article count", () => {
  assert.equal(typeof core.sanitizePayload, "function");
  const payload = core.sanitizePayload({
    ...validLead(),
    tracking: rawTracking(),
  });

  assert.equal(payload.tracking.jornadaDoLead.length, 20);
  assert.equal(payload.tracking.jornadaDoLead[0].path, "/blog/artigo-5");
  assert.equal(payload.tracking.jornadaDoLead.at(-1).slug, "artigo-24");
  assert.equal(payload.tracking.quantidadeDeArtigosLidos, 20);
  assert.equal(payload.tracking.landingDeConversao, "/assessoria-comercial");
  assert.equal(payload.tracking.categoriaDeConteudo, "Gestão Comercial");
  assert.equal("email" in payload.tracking, false);
  assert.equal("nome" in payload.tracking.jornadaDoLead[0], false);
});

test("Supabase insert keeps existing columns and stores tracking only in raw_payload JSON", async () => {
  const payload = core.sanitizePayload({
    ...validLead(),
    tracking: rawTracking(),
  });
  let requestBody;
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async (_url, init) => {
    requestBody = JSON.parse(String(init?.body));
    return Response.json([{ id: "lead-123" }]);
  };

  try {
    const leadId = await core.saveLeadToSupabase(
      { supabaseUrl: "https://supabase.example", serviceRoleKey: "test-key" },
      payload,
      core.qualifyLead(payload.faturamento_mensal),
      { ...validLead(), tracking: rawTracking() },
    );

    assert.equal(leadId, "lead-123");
    assert.equal("tracking" in requestBody, false);
    assert.equal(requestBody.raw_payload.tracking.jornadaDoLead.length, 20);
    assert.equal(requestBody.raw_payload.tracking.quantidadeDeArtigosLidos, 20);
    assert.equal(requestBody.utm_source, "google");
    assert.equal(requestBody.gclid, "abc123");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("background read restores sanitized tracking from Supabase raw_payload", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    Response.json([
      {
        ...validLead(),
        raw_payload: {
          ...validLead(),
          tracking: rawTracking(),
        },
      },
    ]);

  try {
    const payload = await core.getLeadFromSupabase(
      { supabaseUrl: "https://supabase.example", serviceRoleKey: "test-key" },
      "lead-123",
    );

    assert.equal(payload.tracking.artigoDeOrigem, "Artigo 0");
    assert.equal(payload.tracking.ultimoArtigoLido, "Artigo 24");
    assert.equal(payload.tracking.jornadaDoLead.length, 20);
    assert.equal(payload.tracking.quantidadeDeArtigosLidos, 20);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
