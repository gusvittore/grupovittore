import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../src/app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../src/app/globals.css", import.meta.url), "utf8");
const leadForm = await readFile(new URL("../src/app/_components/lead-form.tsx", import.meta.url), "utf8");
const workSection = await readFile(new URL("../src/app/_components/work-section.tsx", import.meta.url), "utf8");
const carousel = await readFile(new URL("../src/app/_components/service-carousel.tsx", import.meta.url), "utf8");

test("hero and form buttons render only their requested text", () => {
  assert.doesNotMatch(page, /hero-calendar-icon/);
  assert.doesNotMatch(leadForm, /lead-form-button-icon/);
  assert.doesNotMatch(leadForm, /inset_0_-3px_0/);
  assert.match(page, />\s*QUERO MAIS INFORMAÇÕES\s*<\/a>/);
  assert.match(leadForm, />\s*Receber mais informações\s*<\/button>/);
});

test("form selects use a shared inset arrow control", () => {
  assert.match(leadForm, /className="select-field-control"/);
  assert.match(leadForm, /className="select-field-arrow"/);
  assert.match(leadForm, /appearance-none/);
  assert.match(css, /\.select-field-arrow\s*{[^}]*right:\s*1\.15rem;/s);
});

test("sections 3 and 4 keep the requested title hierarchy", () => {
  assert.match(
    page,
    /<span className="diagnostic-title-line">Você não tem lucro,<\/span>\s*<span className="diagnostic-title-line diagnostic-title-accent">previsibilidade e nem<\/span>\s*<span className="diagnostic-title-line diagnostic-title-accent">escala por esse motivo<\/span>/s,
  );
  assert.match(css, /\.diagnostic-section \.section-title\s*{[^}]*font-size:\s*clamp\(2\.95rem,/s);
  assert.match(css, /\.method-revenue-title\s*{[^}]*font-weight:\s*600;/s);
});

test("section 5 retains code-native charts and gains reference-aligned framing", () => {
  assert.match(workSection, /className="work-eyebrow"/);
  assert.match(workSection, /className="work-heading-line"/);
  assert.match(workSection, /OpportunitiesLineChart/);
  assert.match(workSection, /FunnelDistributionChart/);
  assert.match(workSection, /KeyIndicatorsChart/);
  assert.match(workSection, /CommercialPerformanceBars/);
  assert.doesNotMatch(workSection, /<Image|<img/);
  assert.match(css, /\.work-section\s*{[^}]*background-size:\s*100% auto;/s);
});

test("section 6 uses its reference-specific title and client strip styling", () => {
  assert.match(page, /className="clients-title-block"/);
  assert.match(css, /\.clients-title-block \.section-title/s);
  assert.match(css, /\.client-logo-panel\s*{[^}]*border-radius:\s*28px;/s);
});

test("section 7 maps nine unique local images and advances one indexed card", () => {
  const expectedImages = [
    "arquitetura-receita.png.png",
    "processo-comercial-inteligente.png.png",
    "demanda-qualificada.png.png",
    "comunicacao-vende.png.png",
    "gestao-de-leads-e-follow-up.png.png",
    "dados-indicadores-comerciais.png.png",
    "tecnologia-automação.png.png",
    "rotina-de-crescimento.png.png",
    "direcao-estrategica.png.png",
  ];

  for (const image of expectedImages) {
    assert.match(carousel, new RegExp(image.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.equal((carousel.match(/number:\s*"\d{2}"/g) ?? []).length, 9);
  assert.match(carousel, /useState\(0\)/);
  assert.match(carousel, /activeIndex \+ direction/);
  assert.match(carousel, /target\.offsetLeft/);
  assert.doesNotMatch(carousel, /clientWidth\s*\*\s*0\.86/);
  assert.match(carousel, /className="service-image"/);
});
