import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../src/app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../src/app/globals.css", import.meta.url), "utf8");
const leadForm = await readFile(new URL("../src/app/_components/lead-form.tsx", import.meta.url), "utf8");
const serviceCarousel = await readFile(new URL("../src/app/_components/service-carousel.tsx", import.meta.url), "utf8");
const workSectionUrl = new URL("../src/app/_components/work-section.tsx", import.meta.url);

async function readWorkSection() {
  try {
    return await readFile(workSectionUrl, "utf8");
  } catch (error) {
    if (error?.code === "ENOENT") return "";
    throw error;
  }
}

test("section 2 uses a clean off-white background and text-only information cards", () => {
  assert.match(page, /<Section id="formulario" className="form-section clean-off-white">/);
  const formSection = page.slice(
    page.indexOf('<Section id="formulario"'),
    page.indexOf('<Section className="diagnostic-section'),
  );
  assert.doesNotMatch(formSection, /form-info-icon/);
  assert.match(css, /\.clean-off-white\s*{[^}]*background-color:\s*#fbf8f4;[^}]*background-image:\s*none;/s);
  assert.match(css, /\.page-grid\s*{[^}]*background-color:\s*#fbf8f4;[^}]*background-image:\s*none;/s);
  assert.match(css, /\.form-info-card\s*{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\);/s);
  assert.match(css, /\.form-info-card p\s*{[^}]*font-family:\s*var\(--font-geist-sans\)/s);
  assert.doesNotMatch(leadForm, /#F8F4F0/);
});

test("section 3 keeps charts code-native and uses off-white panels", () => {
  assert.match(page, /<Section id="diagnostico" className="diagnostic-section clean-off-white">/);
  assert.match(
    page,
    /<span className="diagnostic-title-line">Você não tem lucro,<\/span>\s*<span className="diagnostic-title-line diagnostic-title-accent">previsibilidade e nem<\/span>\s*<span className="diagnostic-title-line diagnostic-title-accent">escala por esse motivo<\/span>/s,
  );
  assert.match(page, /<h3>Evolução de receita<\/h3>/);
  assert.doesNotMatch(page, /<h3><span aria-hidden="true">↗<\/span> Evolução de receita<\/h3>/);
  assert.match(page, /className="funnel-svg"/);
  assert.match(page, /className="diagnostic-panel diagnostic-small-panel demand-quality-panel"/);
  assert.match(page, /className="diagnostic-panel diagnostic-small-panel bottleneck-panel"/);
  assert.match(page, /className="diagnostic-panel diagnostic-small-panel maturity-panel"/);
  assert.match(css, /\.diagnostic-metric-card,\s*\.diagnostic-panel\s*{[^}]*background:\s*#fbf8f4;/s);
  assert.match(css, /\.donut-legend span\s*{[^}]*white-space:\s*nowrap;/s);
  assert.match(css, /\.radar-label-text\s*{[^}]*font-size:\s*0\.7rem;/s);
  assert.match(
    css,
    /\.journey-step:not\(:last-child\)::after\s*{[^}]*border-top:\s*1px solid #b29157;/s,
  );
  assert.match(css, /\.journey-step:not\(:last-child\)::before\s*{[^}]*transform:\s*rotate\(45deg\);/s);
  assert.doesNotMatch(css, /\.journey-step:not\(:last-child\)::after\s*{[^}]*dashed/s);
  assert.match(
    css,
    /@media \(max-width:\s*640px\)[\s\S]*?\.journey-step::before,\s*\.journey-step::after\s*{[^}]*display:\s*none;/s,
  );
  assert.match(
    css,
    /@media \(max-width:\s*640px\)[\s\S]*?\.diagnostic-title-line\s*{[^}]*white-space:\s*nowrap;/s,
  );
  assert.doesNotMatch(page, /sessao3-(?:evolucao|funil|qualidade|maturidade)/);
});

test("section 4 uses only existing background, copy and statue", () => {
  assert.match(page, /<section id="metodo-receita" className="method-revenue-section">/);
  const methodVisual = page.slice(
    page.indexOf("function MethodRevenueVisual"),
    page.indexOf("function DiagnosticAssetPanel"),
  );
  assert.match(methodVisual, /src="\/brand\/3\/marco-aurelio-sessao4\.png\.png"/);
  assert.doesNotMatch(
    methodVisual,
    /method-mini-card|method-focus-card|method-people-card|method-revenue-axis|method-revenue-line|method-revenue-dot|<svg/,
  );
  assert.match(
    css,
    /\.method-revenue-section\s*{[^}]*background-color:\s*#fbf8f4;[^}]*background-image:\s*url\("\/brand\/3\/background-sessao-4\.png\.png"\);/s,
  );
  assert.match(
    page,
    /<span className="method-title-line">Você não precisa de mais marketing,<\/span>\s*<span className="method-title-line method-title-accent">precisa de vendas acontecendo<\/span>\s*<span className="method-title-line method-title-accent">com método\.<\/span>/s,
  );
  assert.doesNotMatch(page, /className="method-mini-card|className="method-focus-card|className="method-people-card/);
});

test("light sections and footer use the new smooth off-white", () => {
  assert.match(page, /<Section id="clientes-parceiros" className="clients-section">/);
  assert.match(page, /<Section id="assessoria-vendas" className="sales-section">/);
  assert.match(page, /<Section className="faq-section">/);
  assert.match(css, /\.site-footer\s*{[^}]*background:\s*#fbf8f4;/s);
  assert.doesNotMatch(serviceCarousel, /#F8F4F0/);
  assert.match(page, /<main className="min-h-screen bg-\[#FBF8F4\]/);
});

test("section 5 renders all four charts in code without chart images", async () => {
  const workSection = await readWorkSection();

  assert.match(page, /import \{ WorkSection \} from "\.\/_components\/work-section";/);
  assert.match(page, /<WorkSection \/>/);
  assert.match(workSection, /function OpportunitiesLineChart\(\)/);
  assert.match(workSection, /function FunnelDistributionChart\(\)/);
  assert.match(workSection, /function KeyIndicatorsChart\(\)/);
  assert.match(workSection, /function CommercialPerformanceBars\(\)/);
  assert.match(workSection, /className="work-card-grid"/);
  assert.match(workSection, /className="work-chart-grid"/);
  assert.doesNotMatch(
    `${page}\n${workSection}`,
    /sessao5-(?:evolucao-de-oportunidades|distribuicao-de-funil|indicadores-chave|desempenho-comercial)/,
  );
  assert.doesNotMatch(workSection, /<Image|<img/);
  assert.match(css, /\.work-section\s*{[^}]*background-image:\s*url\("\/brand\/3\/background-sessao-5\.png\.png"\);/s);
});
