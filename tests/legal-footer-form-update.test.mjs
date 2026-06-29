import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../src/app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../src/app/globals.css", import.meta.url), "utf8");
const leadForm = await readFile(
  new URL("../src/app/_components/lead-form.tsx", import.meta.url),
  "utf8",
);
const legalPageComponent = await readFile(
  new URL("../src/app/_components/legal-page.tsx", import.meta.url),
  "utf8",
);

const privacyPagePath = new URL(
  "../src/app/politicas-de-privacidade/page.tsx",
  import.meta.url,
);
const termsPagePath = new URL("../src/app/termos-de-uso/page.tsx", import.meta.url);

test("footer separates institutional content, legal links, rights and top return", () => {
  const footer = page.slice(page.indexOf("<footer"), page.indexOf("</footer>") + 9);

  assert.match(footer, /className="site-footer-main"/);
  assert.match(footer, /className="site-footer-bottom"/);
  assert.match(footer, /Retornar ao topo/);
  assert.match(footer, /href="#topo"/);
  assert.match(footer, /href="\/politicas-de-privacidade"/);
  assert.match(footer, /href="\/termos-de-uso"/);
  assert.match(footer, /2026 © Grupo Vittore\. Todos os direitos reservados\./);
  assert.equal((footer.match(/Todos os direitos reservados/g) ?? []).length, 1);
  assert.match(page, /<section id="topo" className="hero-section">/);
  assert.match(css, /\.site-footer-bottom\s*{[^}]*border-top:\s*1px solid/s);
  assert.match(css, /\.site-footer-top-link\s*{[^}]*justify-self:\s*end;/s);
});

test("lead form select options match the requested segment and revenue lists", () => {
  const expectedSegments = [
    "Serviço",
    "Varejo",
    "Indústria",
    "E-commerce",
    "Food Service",
    "Educação",
    "Imobiliária",
    "SAAS",
    "Finanças",
    "Franquia / Franchising",
    "Energia Solar",
    "Turismo / Viagens",
    "Outro",
  ];
  const expectedRevenues = [
    "Até 50 mil",
    "De 51 mil a 70 mil",
    "De 71 mil a 100 mil",
    "De 101 mil a 200 mil",
    "De 201 mil a 400 mil",
    "De 401 mil a 1 milhão",
    "De 1 a 4 milhões",
    "De 4 a 14 milhões",
    "De 14 a 40 milhões",
    "Mais de 40 milhões",
  ];

  const sectorBlock = leadForm.slice(
    leadForm.indexOf("const sectorOptions"),
    leadForm.indexOf("const revenueOptions"),
  );
  const revenueBlock = leadForm.slice(
    leadForm.indexOf("const revenueOptions"),
    leadForm.indexOf("const NON_QUALIFIED_REVENUE"),
  );

  assert.deepEqual(
    [...sectorBlock.matchAll(/"([^"]+)"/g)].map((match) => match[1]),
    expectedSegments,
  );
  assert.deepEqual(
    [...revenueBlock.matchAll(/"([^"]+)"/g)].map((match) => match[1]),
    expectedRevenues,
  );
});

test("legal pages exist with required institutional content and home navigation", async () => {
  const privacy = await readFile(privacyPagePath, "utf8");
  const terms = await readFile(termsPagePath, "utf8");

  for (const source of [privacy, terms]) {
    const composedSource = `${source}\n${legalPageComponent}`;
    assert.match(composedSource, /#FBF8F4|bg-\[#FBF8F4\]/);
    assert.match(composedSource, /#000717|text-\[#000717\]/);
    assert.match(composedSource, /Voltar para a página inicial/);
    assert.match(composedSource, /Última atualização: junho de 2026/);
    assert.match(source, /contato@grupovittore\.com\.br/);
  }

  assert.match(privacy, /Política de Privacidade/);
  assert.match(privacy, /Cookies e tecnologias de rastreamento/);
  assert.match(privacy, /Direitos do titular dos dados/);
  assert.match(privacy, /Compartilhamento de dados/);
  assert.match(terms, /Termos de Uso/);
  assert.match(terms, /Propriedade intelectual/);
  assert.match(terms, /\/politicas-de-privacidade/);
  assert.match(terms, /Lei aplicável/);
});
