import assert from "node:assert/strict";
import test from "node:test";

const tracking = await import("../src/lib/lead-tracking.ts").catch(() => ({}));

function requiredFunction(name) {
  assert.equal(typeof tracking[name], "function", `${name} must be exported`);
  return tracking[name];
}

const at = (minute) => `2026-07-24T10:${String(minute).padStart(2, "0")}:00.000Z`;

function article(path, title, slug, category, minute) {
  return {
    path,
    type: "artigo",
    title,
    slug,
    category,
    visitedAt: at(minute),
  };
}

function page(path, type, title, minute) {
  return { path, type, title, visitedAt: at(minute) };
}

function firstTouch(overrides = {}) {
  return {
    path: "/blog/crm-nao-e-so-cadastro-gestao-comercial",
    visitedAt: at(0),
    referrer: "https://www.google.com/search?q=crm",
    inferredOrigin: "Google orgânico",
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
    utmTerm: "",
    utmContent: "",
    gclid: "",
    fbclid: "",
    ...overrides,
  };
}

test("infers external origin without overwriting first-touch meaning", () => {
  const inferExternalOrigin = requiredFunction("inferExternalOrigin");

  assert.equal(
    inferExternalOrigin({
      path: "/blog/artigo-x",
      referrer: "https://www.google.com/search?q=vendas",
      utmSource: "",
      utmMedium: "",
      gclid: "",
    }),
    "Google orgânico",
  );
  assert.equal(
    inferExternalOrigin({
      path: "/blog/artigo-x",
      referrer: "",
      utmSource: "google",
      utmMedium: "cpc",
      gclid: "abc123",
    }),
    "Google Ads",
  );
  assert.equal(
    inferExternalOrigin({
      path: "/blog/artigo-x",
      referrer: "",
      utmSource: "",
      utmMedium: "",
      gclid: "",
    }),
    "Blog",
  );
  assert.equal(
    inferExternalOrigin({
      path: "/assessoria-comercial",
      referrer: "",
      utmSource: "",
      utmMedium: "",
      gclid: "",
    }),
    "Direto",
  );
});

test("deduplicates consecutive pages and caps the journey at twenty records", () => {
  const appendJourneyEntry = requiredFunction("appendJourneyEntry");
  let journey = [];

  journey = appendJourneyEntry(journey, page("/", "home", "Home", 0));
  journey = appendJourneyEntry(journey, page("/", "home", "Home recarregada", 1));
  assert.equal(journey.length, 1);

  for (let index = 1; index <= 24; index += 1) {
    journey = appendJourneyEntry(
      journey,
      page(`/pagina-${index}`, "outro", `Página ${index}`, index),
    );
  }

  assert.equal(journey.length, 20);
  assert.equal(journey[0].path, "/pagina-5");
  assert.equal(journey.at(-1).path, "/pagina-24");
});

test("derives article origin, last article, category, unique count, CTA and landing", () => {
  const deriveLeadTrackingPayload = requiredFunction("deriveLeadTrackingPayload");
  const journey = [
    article(
      "/blog/crm-nao-e-so-cadastro-gestao-comercial",
      "CRM não é cadastro",
      "crm-nao-e-so-cadastro-gestao-comercial",
      "Gestão Comercial",
      0,
    ),
    article(
      "/blog/como-montar-pipeline-comercial",
      "Como montar um pipeline comercial",
      "como-montar-pipeline-comercial",
      "Gestão Comercial",
      1,
    ),
    page("/", "home", "Grupo Vittore", 2),
    page("/assessoria-comercial", "assessoria-comercial", "Assessoria", 3),
  ];

  const payload = deriveLeadTrackingPayload({
    firstTouch: firstTouch(),
    sessionTouch: firstTouch({
      utmSource: "linkedin",
      utmMedium: "social",
      utmCampaign: "julho",
    }),
    journey,
    lastCta: {
      label: "Botão Hero Home para Assessoria Comercial",
      path: "/",
      capturedAt: at(2),
    },
    landingPath: "/assessoria-comercial",
  });

  assert.equal(payload.origemExterna, "Google orgânico");
  assert.equal(
    payload.primeiraPaginaVisitada,
    "/blog/crm-nao-e-so-cadastro-gestao-comercial",
  );
  assert.equal(payload.artigoDeOrigem, "CRM não é cadastro");
  assert.equal(payload.ultimoArtigoLido, "Como montar um pipeline comercial");
  assert.equal(payload.categoriaDeConteudo, "Gestão Comercial");
  assert.equal(payload.quantidadeDeArtigosLidos, 2);
  assert.equal(payload.ctaDeConversao, "Botão Hero Home para Assessoria Comercial");
  assert.equal(payload.landingDeConversao, "/assessoria-comercial");
  assert.equal(payload.utmSource, "linkedin");
  assert.equal(payload.utmMedium, "social");
  assert.equal(payload.utmCampaign, "julho");
  assert.equal(payload.jornadaDoLead.length, 4);
});

test("preserves current campaign metadata with article context", () => {
  const deriveLeadTrackingPayload = requiredFunction("deriveLeadTrackingPayload");
  const touch = firstTouch({
    inferredOrigin: "Google Ads",
    utmSource: "google",
    utmMedium: "cpc",
    utmCampaign: "campanha-x",
    utmTerm: "crm",
    utmContent: "anuncio-a",
    gclid: "abc123",
    fbclid: "fb456",
  });

  const payload = deriveLeadTrackingPayload({
    firstTouch: touch,
    sessionTouch: touch,
    journey: [
      article(
        "/blog/artigo-x",
        "Artigo X",
        "artigo-x",
        "Vendas",
        0,
      ),
    ],
    lastCta: null,
    landingPath: "/assessoria-comercial",
  });

  assert.equal(payload.utmSource, "google");
  assert.equal(payload.utmMedium, "cpc");
  assert.equal(payload.utmCampaign, "campanha-x");
  assert.equal(payload.utmTerm, "crm");
  assert.equal(payload.utmContent, "anuncio-a");
  assert.equal(payload.gclid, "abc123");
  assert.equal(payload.fbclid, "fb456");
  assert.equal(payload.artigoDeOrigem, "Artigo X");
});

test("direct landing conversion remains valid without article history", () => {
  const deriveLeadTrackingPayload = requiredFunction("deriveLeadTrackingPayload");
  const touch = firstTouch({
    path: "/assessoria-comercial",
    referrer: "",
    inferredOrigin: "Direto",
  });

  const payload = deriveLeadTrackingPayload({
    firstTouch: touch,
    sessionTouch: touch,
    journey: [
      page(
        "/assessoria-comercial",
        "assessoria-comercial",
        "Assessoria Comercial",
        0,
      ),
    ],
    lastCta: null,
    landingPath: "/assessoria-comercial",
  });

  assert.equal(payload.origemExterna, "Direto");
  assert.equal(payload.artigoDeOrigem, "");
  assert.equal(payload.ultimoArtigoLido, "");
  assert.equal(payload.categoriaDeConteudo, "Desconhecido");
  assert.equal(payload.quantidadeDeArtigosLidos, 0);
  assert.equal(payload.ctaDeConversao, "Direto para landing");
  assert.equal(payload.landingDeConversao, "/assessoria-comercial");
});
