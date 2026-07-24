import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const tracking = await import("../src/lib/lead-tracking.ts");
const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

class MemoryStorage {
  #values = new Map();

  get length() {
    return this.#values.size;
  }

  clear() {
    this.#values.clear();
  }

  getItem(key) {
    return this.#values.has(key) ? this.#values.get(key) : null;
  }

  key(index) {
    return [...this.#values.keys()][index] ?? null;
  }

  removeItem(key) {
    this.#values.delete(key);
  }

  setItem(key, value) {
    this.#values.set(key, String(value));
  }
}

function installBrowser(
  consent = "accepted",
  {
    localStorage = new MemoryStorage(),
    sessionStorage = new MemoryStorage(),
  } = {},
) {
  localStorage.setItem("cookie-consent-choice", consent);
  globalThis.window = {
    localStorage,
    sessionStorage,
    location: {
      pathname: "/",
      search: "",
    },
  };
  globalThis.document = { referrer: "" };
  return { localStorage, sessionStorage };
}

function removeBrowser() {
  delete globalThis.window;
  delete globalThis.document;
}

test("a new browser session starts a clean complete journey and counts only its unique articles", () => {
  const firstSession = installBrowser();

  try {
    tracking.recordLeadPageVisit(
      {
        path: "/blog/artigo-antigo",
        type: "artigo",
        title: "Artigo antigo",
        slug: "artigo-antigo",
        category: "Vendas",
      },
      { now: "2026-07-24T09:00:00.000Z" },
    );
  } finally {
    removeBrowser();
  }

  installBrowser("accepted", {
    localStorage: firstSession.localStorage,
    sessionStorage: new MemoryStorage(),
  });

  try {
    const visits = [
      { path: "/", type: "home", title: "Grupo Vittore" },
      { path: "/blog", type: "blog", title: "Blog" },
      {
        path: "/blog/artigo-1",
        type: "artigo",
        title: "Artigo 1",
        slug: "artigo-1",
        category: "Vendas",
      },
      {
        path: "/blog/artigo-2",
        type: "artigo",
        title: "Artigo 2",
        slug: "artigo-2",
        category: "Vendas",
      },
      {
        path: "/assessoria-comercial",
        type: "assessoria-comercial",
        title: "Assessoria Comercial",
      },
    ];

    visits.forEach((visit, index) =>
      tracking.recordLeadPageVisit(visit, {
        now: `2026-07-24T10:0${index}:00.000Z`,
      }),
    );

    const snapshot = tracking.getLeadTrackingSnapshot(
      "/assessoria-comercial",
    );
    assert.deepEqual(
      snapshot.jornadaDoLead.map((entry) => entry.path),
      ["/", "/blog", "/blog/artigo-1", "/blog/artigo-2", "/assessoria-comercial"],
    );
    assert.equal(snapshot.quantidadeDeArtigosLidos, 2);
    assert.equal(snapshot.artigoDeOrigem, "Artigo 1");
    assert.equal(snapshot.ultimoArtigoLido, "Artigo 2");
    assert.equal(snapshot.primeiraPaginaVisitada, "/");
  } finally {
    removeBrowser();
  }
});

test("browser tracker writes only after consent and keeps session first touch immutable", () => {
  assert.equal(typeof tracking.recordLeadPageVisit, "function");
  const { localStorage, sessionStorage } = installBrowser("rejected");

  try {
    tracking.recordLeadPageVisit(
      {
        path: "/blog/artigo-1",
        type: "artigo",
        title: "Artigo 1",
        slug: "artigo-1",
        category: "Vendas",
      },
      {
        search: "?utm_source=google&utm_medium=cpc&gclid=abc123",
        referrer: "https://google.com/",
        now: "2026-07-24T10:00:00.000Z",
      },
    );
    assert.equal(localStorage.getItem("gv_tracking_first_touch"), null);

    localStorage.setItem("cookie-consent-choice", "accepted");
    tracking.recordLeadPageVisit(
      {
        path: "/blog/artigo-1",
        type: "artigo",
        title: "Artigo 1",
        slug: "artigo-1",
        category: "Vendas",
      },
      {
        search: "?utm_source=google&utm_medium=cpc&gclid=abc123",
        referrer: "https://google.com/",
        now: "2026-07-24T10:00:00.000Z",
      },
    );
    tracking.recordLeadPageVisit(
      {
        path: "/blog/artigo-2",
        type: "artigo",
        title: "Artigo 2",
        slug: "artigo-2",
        category: "Gestão Comercial",
      },
      {
        search: "",
        referrer: "",
        now: "2026-07-24T10:01:00.000Z",
      },
    );

    const firstTouch = JSON.parse(
      sessionStorage.getItem("gv_tracking_first_touch"),
    );
    assert.equal(firstTouch.path, "/blog/artigo-1");
    assert.equal(firstTouch.utmSource, "google");
    assert.equal(firstTouch.gclid, "abc123");
    assert.equal(firstTouch.inferredOrigin, "Google Ads");

    const journey = JSON.parse(sessionStorage.getItem("gv_tracking_journey"));
    assert.deepEqual(
      journey.map((entry) => entry.path),
      ["/blog/artigo-1", "/blog/artigo-2"],
    );
    assert.equal(
      JSON.parse(sessionStorage.getItem("gv_tracking_last_article")).slug,
      "artigo-2",
    );
    assert.ok(sessionStorage.getItem("gv_tracking_session_id"));
  } finally {
    removeBrowser();
  }
});

test("CTA and conversion snapshot use session storage and never store form PII", () => {
  assert.equal(typeof tracking.recordLeadCta, "function");
  assert.equal(typeof tracking.getLeadTrackingSnapshot, "function");
  const { localStorage, sessionStorage } = installBrowser();

  try {
    tracking.recordLeadPageVisit(
      { path: "/", type: "home", title: "Grupo Vittore" },
      {
        search: "?utm_source=linkedin&utm_medium=social&utm_campaign=julho",
        referrer: "https://linkedin.com/",
        now: "2026-07-24T10:00:00.000Z",
      },
    );
    tracking.recordLeadCta(
      {
        label: "Botão Hero Home para Assessoria Comercial",
        path: "/",
      },
      "2026-07-24T10:01:00.000Z",
    );
    tracking.recordLeadPageVisit(
      {
        path: "/assessoria-comercial",
        type: "assessoria-comercial",
        title: "Assessoria Comercial",
      },
      {
        search: "",
        referrer: "",
        now: "2026-07-24T10:02:00.000Z",
      },
    );

    const snapshot = tracking.getLeadTrackingSnapshot(
      "/assessoria-comercial",
    );
    assert.equal(snapshot.utmSource, "linkedin");
    assert.equal(snapshot.utmMedium, "social");
    assert.equal(snapshot.ctaDeConversao, "Botão Hero Home para Assessoria Comercial");
    assert.equal(snapshot.landingDeConversao, "/assessoria-comercial");
    assert.equal(snapshot.quantidadeDeArtigosLidos, 0);
    assert.equal(snapshot.categoriaDeConteudo, "Desconhecido");
    assert.ok(sessionStorage.getItem("gv_tracking_last_cta"));
    assert.ok(sessionStorage.getItem("gv_tracking_conversion_context"));

    const allStored = [
      ...Array.from({ length: localStorage.length }, (_, index) =>
        localStorage.getItem(localStorage.key(index)),
      ),
      ...Array.from({ length: sessionStorage.length }, (_, index) =>
        sessionStorage.getItem(sessionStorage.key(index)),
      ),
    ].join("\n");
    assert.doesNotMatch(allStored, /nome_completo|whatsapp|empresa|faturamento_mensal/);
  } finally {
    removeBrowser();
  }
});

test("successful conversion clears active tracking and thank-you does not contaminate the next journey", () => {
  assert.equal(typeof tracking.completeLeadTrackingConversion, "function");
  const { localStorage, sessionStorage } = installBrowser();

  try {
    tracking.recordLeadPageVisit(
      { path: "/", type: "home", title: "Grupo Vittore" },
      { now: "2026-07-24T10:00:00.000Z" },
    );
    tracking.recordLeadPageVisit(
      {
        path: "/blog/artigo-1",
        type: "artigo",
        title: "Artigo 1",
        slug: "artigo-1",
        category: "Vendas",
      },
      { now: "2026-07-24T10:01:00.000Z" },
    );
    tracking.getLeadTrackingSnapshot("/assessoria-comercial");
    const convertedSessionId = sessionStorage.getItem("gv_tracking_session_id");

    tracking.completeLeadTrackingConversion("2026-07-24T10:02:00.000Z");

    for (const key of [
      "gv_tracking_first_touch",
      "gv_tracking_journey",
      "gv_tracking_last_article",
      "gv_tracking_last_cta",
      "gv_tracking_conversion_context",
      "gv_tracking_session_touch",
      "gv_tracking_session_id",
    ]) {
      assert.equal(localStorage.getItem(key), null);
      assert.equal(sessionStorage.getItem(key), null);
    }
    assert.ok(sessionStorage.getItem("gv_tracking_conversion_completed"));

    tracking.recordLeadPageVisit(
      { path: "/obrigado", type: "obrigado", title: "Obrigado" },
      { now: "2026-07-24T10:03:00.000Z" },
    );
    assert.equal(sessionStorage.getItem("gv_tracking_journey"), null);

    tracking.recordLeadPageVisit(
      { path: "/", type: "home", title: "Grupo Vittore" },
      { now: "2026-07-24T10:04:00.000Z" },
    );
    const nextJourney = JSON.parse(
      sessionStorage.getItem("gv_tracking_journey"),
    );
    assert.deepEqual(nextJourney.map((entry) => entry.path), ["/"]);
    assert.notEqual(
      sessionStorage.getItem("gv_tracking_session_id"),
      convertedSessionId,
    );
    assert.equal(
      sessionStorage.getItem("gv_tracking_conversion_completed"),
      null,
    );
  } finally {
    removeBrowser();
  }
});

test("invalid storage JSON never breaks navigation and rejection clears tracking keys", () => {
  assert.equal(typeof tracking.clearLeadTrackingStorage, "function");
  const { localStorage, sessionStorage } = installBrowser();

  try {
    localStorage.setItem("gv_tracking_first_touch", "{invalid");
    localStorage.setItem("gv_tracking_journey", "{invalid");
    sessionStorage.setItem("gv_tracking_last_cta", "{invalid");

    assert.doesNotThrow(() =>
      tracking.getLeadTrackingSnapshot("/assessoria-comercial"),
    );
    assert.doesNotThrow(() => tracking.clearLeadTrackingStorage());
    for (const key of [
      "gv_tracking_first_touch",
      "gv_tracking_journey",
      "gv_tracking_last_article",
      "gv_tracking_last_cta",
      "gv_tracking_conversion_context",
      "gv_tracking_session_touch",
    ]) {
      assert.equal(localStorage.getItem(key), null);
      assert.equal(sessionStorage.getItem(key), null);
    }
  } finally {
    removeBrowser();
  }
});

test("global integration records route/article/CTA metadata and only attaches a snapshot to submit", async () => {
  const [
    layout,
    trackerComponent,
    cookieConsent,
    articlePage,
    leadForm,
    homeHero,
    homeAssessoria,
    siteHeader,
    siteFooter,
    blogHome,
    articleCta,
  ] = await Promise.all([
    read("src/app/layout.tsx"),
    read("src/app/_components/lead-journey-tracker.tsx"),
    read("src/app/_components/cookie-consent.tsx"),
    read("src/app/blog/[slug]/page.tsx"),
    read("src/app/_components/lead-form.tsx"),
    read("src/app/_components/home-hero.tsx"),
    read("src/app/_components/home-assessoria-comercial.tsx"),
    read("src/app/_components/site-header.tsx"),
    read("src/app/_components/site-footer.tsx"),
    read("src/app/_components/blog/blog-home-client.tsx"),
    read("src/app/_components/blog/blog-article-cta.tsx"),
  ]);

  assert.match(layout, /<LeadJourneyTracker\s*\/>/);
  assert.match(trackerComponent, /usePathname\(\)/);
  assert.match(trackerComponent, /recordLeadPageVisit/);
  assert.match(
    trackerComponent,
    /useEffect\(\(\) => \{\s*recordCurrentPage\(pathname\);\s*\}, \[pathname\]\);/,
  );
  assert.doesNotMatch(trackerComponent, /requestAnimationFrame/);
  assert.match(trackerComponent, /data-gv-cta/);
  assert.match(trackerComponent, /addEventListener\("click"/);
  assert.match(trackerComponent, /LEAD_TRACKING_CONSENT_EVENT/);
  assert.match(cookieConsent, /gv-cookie-consent-changed/);

  assert.match(articlePage, /data-gv-page-type="artigo"/);
  assert.match(articlePage, /data-gv-article-title=\{post\.title\}/);
  assert.match(articlePage, /data-gv-article-slug=\{post\.slug\}/);
  assert.match(articlePage, /data-gv-article-category=\{post\.category\}/);

  for (const source of [
    homeHero,
    homeAssessoria,
    siteHeader,
    siteFooter,
    blogHome,
    articleCta,
  ]) {
    assert.match(source, /data-gv-cta/);
  }

  assert.match(leadForm, /getLeadTrackingSnapshot/);
  assert.match(leadForm, /completeLeadTrackingConversion/);
  assert.match(leadForm, /tracking,/);
  assert.match(leadForm, /params\.get\("utm_source"\) \|\| tracking\.utmSource/);
  assert.match(leadForm, /params\.get\("gclid"\) \|\| tracking\.gclid/);
  assert.equal((leadForm.match(/fetch\(/g) ?? []).length, 1);
  assert.match(leadForm, /submitLockedRef\.current \|\| isSubmitting/);
  assert.match(
    leadForm,
    /if \(!response\.ok \|\| !result\?\.ok\)[\s\S]*?throw new Error[\s\S]*?const redirectTo[\s\S]*?completeLeadTrackingConversion\(\);[\s\S]*?window\.location\.href = redirectTo/,
  );
});
