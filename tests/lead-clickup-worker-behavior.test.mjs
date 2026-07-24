import assert from "node:assert/strict";
import { readFile, rm, writeFile } from "node:fs/promises";
import test from "node:test";

const tracking = {
  origemExterna: "Direto",
  primeiraPaginaVisitada: "/",
  timestampPrimeiraVisita: "2026-07-24T10:00:00.000Z",
  referrerInicial: "",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  utmTerm: "",
  utmContent: "",
  gclid: "",
  fbclid: "",
  categoriaDeConteudo: "Crescimento Empresarial",
  artigoDeOrigem: "Artigo 1",
  ultimoArtigoLido: "Artigo 2",
  ctaDeConversao: "Banner lateral do artigo para Assessoria Comercial",
  landingDeConversao: "/assessoria-comercial",
  quantidadeDeArtigosLidos: 2,
  jornadaDoLead: [
    { path: "/", type: "home", title: "Grupo Vittore", visitedAt: "2026-07-24T10:00:00.000Z" },
    { path: "/blog", type: "blog", title: "Blog", visitedAt: "2026-07-24T10:01:00.000Z" },
    {
      path: "/blog/artigo-1",
      type: "artigo",
      title: "Artigo 1",
      slug: "artigo-1",
      category: "Crescimento Empresarial",
      visitedAt: "2026-07-24T10:02:00.000Z",
    },
    {
      path: "/blog/artigo-2",
      type: "artigo",
      title: "Artigo 2",
      slug: "artigo-2",
      category: "Crescimento Empresarial",
      visitedAt: "2026-07-24T10:03:00.000Z",
    },
    {
      path: "/assessoria-comercial",
      type: "assessoria-comercial",
      title: "Assessoria Comercial",
      visitedAt: "2026-07-24T10:04:00.000Z",
    },
  ],
};

const fields = [
  { id: "first", name: "Primeira Página Visitada", type: "short_text" },
  {
    id: "category",
    name: "Categoria de Conteúdo",
    type: "drop_down",
    type_config: {
      options: [{ id: "growth", name: "Crescimento Empresarial" }],
    },
  },
  { id: "origin", name: "Artigo de Origem", type: "short_text" },
  { id: "last", name: "Último Artigo Lido", type: "short_text" },
  {
    id: "cta",
    name: "CTA de Conversão",
    type: "labels",
    type_config: {
      options: [
        {
          id: "sidebar-banner",
          name: "Banner lateral do artigo para Assessoria Comercial",
        },
      ],
    },
  },
  { id: "landing", name: "Landing de Conversão", type: "short_text" },
  { id: "journey", name: "Jornada do Lead", type: "text" },
  { id: "count", name: "Quantidade de Artigos Lidos", type: "number" },
];

function json(value, status = 200) {
  return new Response(JSON.stringify(value), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

test("background worker discovers, caches and writes all eight tracking fields by internal ID", async () => {
  const originalFetch = globalThis.fetch;
  const originalEnv = { ...process.env };
  const originalLog = console.log;
  const originalWarn = console.warn;
  const requests = [];
  const logs = [];
  const processorSourceUrl = new URL(
    "../src/server/lead-processing.ts",
    import.meta.url,
  );
  const processorTestUrl = new URL(
    `../src/server/.lead-processing-worker-test-${process.pid}.ts`,
    import.meta.url,
  );

  process.env.SUPABASE_URL = "https://supabase.test";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "supabase-secret";
  process.env.CLICKUP_API_TOKEN = "clickup-secret";
  process.env.CLICKUP_LIST_ID = "list-1";
  delete process.env.SMTP_USER;
  delete process.env.SMTP_PASS;
  delete process.env.LEAD_NOTIFICATION_EMAIL;

  console.log = (...args) => logs.push(["log", ...args]);
  console.warn = (...args) => logs.push(["warn", ...args]);

  globalThis.fetch = async (input, init = {}) => {
    const url = String(input);
    const method = init.method || "GET";
    const body = init.body ? JSON.parse(String(init.body)) : null;
    requests.push({ url, method, body });

    if (url.includes("supabase.test/rest/v1/leads_assessoria?select=*&")) {
      return json([
        {
          id: "lead-1",
          nome_completo: "Lead Teste",
          email: "lead@example.test",
          whatsapp: "11999999999",
          empresa: "Empresa Teste",
          segmento: "Serviço",
          faturamento_mensal: "De 101 mil a 200 mil",
          origem_lead: "Landing Page Assessoria Comercial",
          utm_source: "",
          utm_medium: "",
          utm_campaign: "",
          utm_term: "",
          utm_content: "",
          gclid: "",
          raw_payload: { tracking },
        },
      ]);
    }

    if (url.endsWith("/list/list-1/field")) return json({ fields });
    if (url.endsWith("/list/list-1/task")) {
      return json({ id: "task-1", url: "https://app.clickup.test/task-1" });
    }
    if (url.includes("/task/task-1/field/")) return json({});
    if (url.endsWith("/task/task-1/comment")) return json({});
    if (url.startsWith("https://supabase.test/") && method === "PATCH") {
      return new Response(null, { status: 204 });
    }

    throw new Error(`Unexpected request: ${method} ${url}`);
  };

  try {
    const processorSource = (await readFile(processorSourceUrl, "utf8"))
      .replace('from "./lead-core"', 'from "./lead-core.ts"')
      .replace(
        'from "./lead-tracking-clickup"',
        'from "./lead-tracking-clickup.ts"',
      );
    await writeFile(processorTestUrl, processorSource);
    const { processLeadBackgroundJob } = await import(
      `${processorTestUrl.href}?worker-behavior=${Date.now()}`
    );
    const result = await processLeadBackgroundJob("lead-1");

    assert.equal(result.ok, true);
    assert.equal(
      requests.filter((request) => request.url.endsWith("/list/list-1/field")).length,
      1,
    );

    const createRequest = requests.find((request) =>
      request.url.endsWith("/list/list-1/task"),
    );
    assert.ok(createRequest);
    assert.match(createRequest.body.description, /RASTREAMENTO E JORNADA DO LEAD/);
    assert.deepEqual(createRequest.body.custom_fields, [
      { id: "first", value: "/" },
      { id: "category", value: "growth" },
      { id: "origin", value: "Artigo 1" },
      { id: "last", value: "Artigo 2" },
      { id: "cta", value: ["sidebar-banner"] },
      { id: "landing", value: "/assessoria-comercial" },
      {
        id: "journey",
        value: [
          "1. /",
          "2. /blog",
          "3. /blog/artigo-1",
          "4. /blog/artigo-2",
          "5. /assessoria-comercial",
        ].join("\n"),
      },
      { id: "count", value: 2 },
    ]);
    assert.equal(typeof createRequest.body.custom_fields[7].value, "number");

    const trackingUpdates = requests.filter((request) =>
      request.url.includes("/task/task-1/field/"),
    );
    assert.equal(trackingUpdates.length, 8);
    assert.deepEqual(
      trackingUpdates.map((request) => request.url.split("/").at(-1)),
      fields.map((field) => field.id),
    );
    assert.equal(
      trackingUpdates.find((request) => request.url.endsWith("/field/count")).body.value,
      2,
    );
    assert.deepEqual(
      trackingUpdates.find((request) => request.url.endsWith("/field/cta")).body.value,
      ["sidebar-banner"],
    );

    const inventoryLog = logs.find(
      ([level, message]) =>
        level === "log" && message === "ClickUp custom fields de tracking:",
    );
    assert.ok(inventoryLog);
    assert.deepEqual(inventoryLog[2], {
      totalAvailable: 8,
      found: fields.map(({ name, type }) => ({ name, type })),
      missing: [],
    });

    const successLogs = logs.filter(
      ([level, message]) =>
        level === "log" &&
        message === "Campo de jornada preenchido no ClickUp:",
    );
    assert.deepEqual(
      successLogs.map((entry) => entry[2]),
      fields.map(({ name, type }) => ({ name, type })),
    );
  } finally {
    await rm(processorTestUrl, { force: true });
    globalThis.fetch = originalFetch;
    process.env = originalEnv;
    console.log = originalLog;
    console.warn = originalWarn;
  }
});
