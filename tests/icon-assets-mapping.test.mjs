import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../src/app/_components/assessoria-comercial-page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../src/app/globals.css", import.meta.url), "utf8");
const workSection = await readFile(
  new URL("../src/app/_components/work-section.tsx", import.meta.url),
  "utf8",
);

const heroIcons = [
  "/icons/hero-icon-diagnostico-comercial.png.png",
  "/icons/hero-icon-metodo-comercial.png.png",
  "/icons/hero-icon-clareza-controle.png.png",
  "/icons/hero-icon-empresas-impactadas.png.png",
  "/icons/hero-icon-foco-resultado.png.png",
  "/icons/hero-icon-metodologia-propria.png.png",
  "/icons/hero-icon-sigilo-etica.png.png",
];

const sectionThreeIcons = [
  "/icons/sessao-3-receita-prevista.png.png",
  "/icons/sessao-3-oportunidades.png.png",
  "/icons/sessao-3-taxa-conversao.png.png",
  "/icons/sessao-3-ticket-medio.png.png",
  "/icons/sessao-3-baixa-conversao.png.png",
  "/icons/sessao-3-receita-instavel.png.png",
  "/icons/sessao-3-processo-comercial-reativo.png.png",
];

const customerJourneyIcons = [
  "/icons/Jornada do Cliente/jornada-cliente-descoberta.png.png",
  "/icons/Jornada do Cliente/jornada-cliente-atracao.png.png",
  "/icons/Jornada do Cliente/jornada-cliente-consideracao.png.png",
  "/icons/Jornada do Cliente/jornada-cliente-compra.png.png",
  "/icons/Jornada do Cliente/jornada-cliente-experiencia.png.png",
  "/icons/Jornada do Cliente/jornada-cliente-recompra.png.png",
  "/icons/Jornada do Cliente/jornada-cliente-indicacao.png.png",
];

const sectionFiveIcons = [
  "/icons/sessao-5-processo-comercial.png",
  "/icons/sessao-5-geracao-demanda.png",
  "/icons/sessao-5-atendimento.png.png",
  "/icons/sessao-5-dados-rotina.png.png",
];

test("landing page maps the approved icon assets into hero and section 3", () => {
  for (const icon of [...heroIcons, ...sectionThreeIcons]) {
    assert.match(page, new RegExp(icon.replaceAll(".", "\\.")));
  }
});

test("section 5 maps the approved icon assets into the four work cards", () => {
  for (const icon of sectionFiveIcons) {
    assert.match(workSection, new RegExp(icon.replaceAll(".", "\\.")));
  }
});

test("form section frames the diagnostic as an online meeting", () => {
  assert.match(
    page,
    /<span className="form-title-line">Agende uma reuni\u00e3o online,<\/span>\s*<span className="form-title-line">receba um diagn\u00f3stico comercial<\/span>\s*<span className="form-title-line">e descubra onde a sua empresa<\/span>\s*<span className="form-title-line">pode estar <span className="form-title-highlight">perdendo vendas<\/span><\/span>\s*<span className="form-title-line">dentro do pr\u00f3prio processo\.<\/span>/,
  );
  assert.match(
    css,
    /\.form-copy \.section-title\s*{[^}]*max-width:\s*640px;[^}]*font-size:\s*clamp\(2\.12rem,\s*2\.6vw,\s*2\.88rem\);[^}]*line-height:\s*1\.06;/s,
  );
  assert.doesNotMatch(
    page,
    /form-title-line-contained/,
  );
  assert.doesNotMatch(
    css,
    /\.form-copy \.form-title-line-contained|font-size:\s*0\.88em;/s,
  );
  assert.match(
    css,
    /\.form-copy \.form-title-line:first-child\s*{[^}]*white-space:\s*nowrap;/s,
  );
  assert.match(
    css,
    /@media \(min-width:\s*1024px\)\s*{[^}]*\.form-copy \.form-title-line\s*{[^}]*white-space:\s*nowrap;/s,
  );
  assert.match(
    css,
    /@media \(max-width:\s*640px\)[\s\S]*?\.form-copy \.section-title\s*{[^}]*font-size:\s*clamp\(1\.88rem,\s*7\.45vw,\s*2\.18rem\);[^}]*line-height:\s*1\.1;/s,
  );
  assert.match(
    css,
    /@media \(max-width:\s*640px\)[\s\S]*?\.form-copy \.form-title-line:first-child\s*{[^}]*white-space:\s*normal;/s,
  );
});

test("customer journey uses the new image assets without circular icon chrome", () => {
  for (const icon of customerJourneyIcons) {
    assert.match(page, new RegExp(icon.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.doesNotMatch(page, /"\u2315"|"\u25c9"|"\u25a6"|"\u25b1"|"\u2606"|"\u27f3"|"\u2659"/);

  const match = css.match(/\.journey-step-icon-image\s*{(?<body>[^}]*)}/s);
  assert.ok(match?.groups?.body, "Missing journey step icon image CSS");
  assert.match(match.groups.body, /width:\s*44px;/);
  assert.match(match.groups.body, /height:\s*44px;/);
  assert.match(match.groups.body, /object-fit:\s*contain;/);
  assert.doesNotMatch(match.groups.body, /border\s*:/);
  assert.doesNotMatch(match.groups.body, /border-radius\s*:/);
  assert.doesNotMatch(match.groups.body, /background\s*:/);
  assert.doesNotMatch(match.groups.body, /box-shadow\s*:/);

  assert.doesNotMatch(css, /\.journey-step span\s*{[^}]*border-radius:\s*50%/s);
  assert.match(
    css,
    /@media \(max-width:\s*640px\)[\s\S]*?\.journey-step-icon-image\s*{[^}]*width:\s*38px;[^}]*height:\s*38px;/s,
  );
});

test("added icon wrappers stay transparent without circular decoration", () => {
  for (const selector of [
    ".hero-pillar span,\\s*\\.hero-proof-item span",
    ".diagnostic-metric-icon",
    ".diagnostic-insights span",
    ".work-card-icon",
  ]) {
    const match = css.match(new RegExp(`${selector}\\s*{(?<body>[^}]*)}`, "s"));
    assert.ok(match?.groups?.body, `Missing CSS block for ${selector}`);
    assert.doesNotMatch(match.groups.body, /border\s*:/);
    assert.doesNotMatch(match.groups.body, /border-radius\s*:/);
    assert.doesNotMatch(match.groups.body, /background\s*:/);
    assert.doesNotMatch(match.groups.body, /box-shadow\s*:/);
  }
});

test("icon images use the requested larger responsive sizes", () => {
  assert.match(
    css,
    /\.hero-benefit-icon-image\s*{[^}]*width:\s*50px;[^}]*height:\s*50px;[^}]*object-fit:\s*contain;/s,
  );
  assert.match(
    css,
    /\.diagnostic-metric-icon-image\s*{[^}]*width:\s*30px;[^}]*height:\s*30px;[^}]*object-fit:\s*contain;/s,
  );
  assert.match(
    css,
    /\.diagnostic-insight-icon-image\s*{[^}]*width:\s*36px;[^}]*height:\s*36px;[^}]*object-fit:\s*contain;/s,
  );
  assert.match(
    css,
    /\.work-card-icon-image\s*{[^}]*width:\s*86px;[^}]*height:\s*86px;[^}]*object-fit:\s*contain;/s,
  );
  assert.match(
    css,
    /@media \(max-width:\s*640px\)[\s\S]*?\.hero-benefit-icon-image\s*{[^}]*width:\s*38px;[^}]*height:\s*38px;/s,
  );
  assert.match(
    css,
    /@media \(max-width:\s*640px\)[\s\S]*?\.diagnostic-metric-icon-image\s*{[^}]*width:\s*24px;[^}]*height:\s*24px;/s,
  );
  assert.match(
    css,
    /@media \(max-width:\s*640px\)[\s\S]*?\.diagnostic-insight-icon-image\s*{[^}]*width:\s*30px;[^}]*height:\s*30px;/s,
  );
  assert.match(
    css,
    /@media \(max-width:\s*640px\)[\s\S]*?\.work-card-icon-image\s*{[^}]*width:\s*62px;[^}]*height:\s*62px;/s,
  );
});
