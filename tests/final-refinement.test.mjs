import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const css = await readFile(new URL("../src/app/globals.css", import.meta.url), "utf8");
const page = await readFile(new URL("../src/app/page.tsx", import.meta.url), "utf8");
const leadForm = await readFile(
  new URL("../src/app/_components/lead-form.tsx", import.meta.url),
  "utf8",
);

test("lead form redirects low revenue to non-qualified page and all other revenues to qualified page", () => {
  assert.match(leadForm, /const NON_QUALIFIED_REVENUE = "Até 50 mil";/);
  assert.match(
    leadForm,
    /function getLeadRedirectPath\(revenue: string\)[\s\S]*?revenue === NON_QUALIFIED_REVENUE[\s\S]*?"\/obrigado"[\s\S]*?"\/obrigado-qualificado"/,
  );
  assert.match(leadForm, /new FormData\(form\)/);
  assert.match(leadForm, /window\.location\.assign\(getLeadRedirectPath\(revenue\)\)/);
  assert.doesNotMatch(leadForm, /event\.currentTarget\.reset\(\)/);
});

test("thank-you pages use the requested qualified and non-qualified actions", async () => {
  const thankYou = await readFile(
    new URL("../src/app/obrigado/page.tsx", import.meta.url),
    "utf8",
  );
  const qualified = await readFile(
    new URL("../src/app/obrigado-qualificado/page.tsx", import.meta.url),
    "utf8",
  );
  const component = await readFile(
    new URL("../src/app/_components/thank-you-page.tsx", import.meta.url),
    "utf8",
  );

  assert.match(thankYou, /Recebemos suas informações/);
  assert.match(thankYou, /Obrigado pelo interesse no Grupo Vittore/);
  assert.match(thankYou, /variant="light"/);
  assert.match(thankYou, /action=\{null\}/);
  assert.doesNotMatch(thankYou, /lead qualificado|conversão qualificada/i);
  assert.doesNotMatch(thankYou, /Voltar para o site|wa\.me|WhatsApp/);

  assert.match(qualified, /Diagnóstico solicitado com sucesso/);
  assert.match(qualified, /Pelo perfil informado/);
  assert.match(qualified, /variant="dark"/);
  assert.match(qualified, /Falar com o Consultor/);
  assert.doesNotMatch(qualified, /Falar com o Grupo Vittore no WhatsApp/);
  assert.match(qualified, /https:\/\/wa\.me\/5511947035134/);
  assert.match(
    qualified,
    /text=Ol%C3%A1%2C%20acabei%20de%20solicitar%20um%20diagn%C3%B3stico%20comercial%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es\./,
  );
  assert.match(component, /bg-\[#000717\]/);
  assert.match(component, /bg-\[#FBF8F4\]/);
  assert.match(component, /action\?:/);
  assert.match(component, /target=\{action\.external \? "_blank" : undefined\}/);
  assert.match(component, /rel=\{action\.external \? "noopener noreferrer" : undefined\}/);
  assert.doesNotMatch(component, /Voltar para o site/);
});

test("lead form applies a progressive Brazilian WhatsApp mask without changing redirects", () => {
  assert.match(
    leadForm,
    /function formatWhatsApp\(value: string\)[\s\S]*?replace\(\/\\D\/g, ""\)[\s\S]*?slice\(0, 11\)/,
  );
  assert.match(leadForm, /if \(digits\.length <= 2\)[\s\S]*?"\(\$1"/);
  assert.match(leadForm, /if \(digits\.length <= 7\)[\s\S]*?"\(\$1\) \$2"/);
  assert.match(leadForm, /"\(\$1\) \$2-\$3"/);
  assert.match(leadForm, /value=\{whatsApp\}/);
  assert.match(leadForm, /onChange=\{\(event\) => setWhatsApp\(formatWhatsApp\(event\.target\.value\)\)\}/);
  assert.match(leadForm, /type="tel"/);
  assert.match(leadForm, /inputMode="numeric"/);
  assert.match(leadForm, /maxLength=\{15\}/);
  assert.match(leadForm, /name="whatsapp"/);
  assert.match(leadForm, /window\.location\.assign\(getLeadRedirectPath\(revenue\)\)/);
});

test("description font sizes are lightly increased without targeting titles or charts", () => {
  const expectations = [
    [/\.form-info-card p\s*{[^}]*font-size:\s*1\.2rem;/s, "form info card descriptions"],
    [/\.diagnostic-points,\s*\.diagnostic-support\s*{[^}]*font-size:\s*1\.22rem;/s, "section 3 descriptions"],
    [/\.method-revenue-text\s*{[^}]*font-size:\s*clamp\(1\.16rem,\s*1\.42vw,\s*1\.42rem\);/s, "section 4 main description"],
    [/\.method-revenue-complement\s*{[^}]*font-size:\s*clamp\(1\.16rem,\s*1\.42vw,\s*1\.42rem\);/s, "section 4 complement"],
    [/\.work-heading-subtitle\s*{[^}]*font-size:\s*1\.36rem;/s, "section 5 subtitle"],
    [/\.work-card-content > p:last-child\s*{[^}]*font-size:\s*1\.18rem;/s, "section 5 card descriptions"],
    [/\.clients-title-block > div\s*{[^}]*font-size:\s*1\.32rem !important;/s, "section 6 support"],
    [/\.sales-title-block > div\s*{[^}]*font-size:\s*1\.38rem !important;/s, "section 7 support"],
    [/\.service-card-copy > p:not\(\.service-card-number\)\s*{[^}]*font-size:\s*1\.22rem;/s, "section 7 card descriptions"],
    [/\.personalized-description\s*{[^}]*font-size:\s*1\.26rem;/s, "section 8 paragraphs"],
    [/\.technology-intro\s*{[^}]*font-size:\s*1\.24rem;/s, "section 9 intro"],
    [/\.technology-application p\s*{[^}]*font-size:\s*1\.24rem;/s, "section 9 applications"],
    [/\.faq-item summary\s*{[^}]*font-size:\s*1\.72rem;/s, "FAQ questions"],
    [/\.faq-item > div\s*{[^}]*font-size:\s*1\.16rem;/s, "FAQ answers"],
  ];

  for (const [pattern, label] of expectations) {
    assert.match(css, pattern, label);
  }

  assert.match(
    css,
    /\.method-revenue-complement strong,\s*\.method-revenue-complement em\s*{[^}]*color:\s*#000717;[^}]*font-weight:\s*850;/s,
  );
  assert.match(page, /<em>método<\/em>, <em>controle<\/em> e <em>direção<\/em>\./);
});
