import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(
  new URL("../src/app/page.tsx", import.meta.url),
  "utf8",
);
const css = await readFile(
  new URL("../src/app/globals.css", import.meta.url),
  "utf8",
);
const radarSource = page.slice(
  page.indexOf("function PersonalizedRadar"),
  page.indexOf("function HeroPrimaryButton"),
);

test("section 7 uses a reference-like multiline premium heading", () => {
  assert.match(page, /sales-title-line/);
  assert.doesNotMatch(page, /sales-title-emphasis/);
  assert.match(
    css,
    /\.sales-title-block > h2\s*{[^}]*font-size:\s*clamp\(3\.65rem,\s*5\.1vw,\s*5\.35rem\);[^}]*line-height:\s*0\.98;/s,
  );
  assert.match(
    css,
    /\.sales-title-block > div\s*{[^}]*max-width:\s*860px[^}]*font-size:\s*1\.38rem/s,
  );
});

test("section 8 keeps its required background and uses an eight-axis radar", () => {
  assert.match(
    css,
    /\.personalized-section\s*{[^}]*background-image:\s*url\("\/brand\/3\/background-sessao-8\.png\.png"\);/s,
  );
  assert.equal(
    (page.match(/className="personalized-radar-axis"/g) ?? []).length,
    8,
  );
  assert.equal(
    (radarSource.match(/className="personalized-radar-label/g) ?? []).length,
    7,
  );
  for (const label of [
    "Treinamento",
    "CRM",
    "Anúncios",
    "Marketing de",
    "Gestão",
    "Processos",
  ]) {
    assert.match(radarSource, new RegExp(label));
  }
  assert.equal((radarSource.match(/Marketing de/g) ?? []).length, 1);
  assert.equal((radarSource.match(/Tecnologia e/g) ?? []).length, 1);
  assert.match(radarSource, /personalized-radar-label-technology/);
  assert.doesNotMatch(radarSource, /Dados e|Automação|Estratégia/);
  assert.match(page, /personalized-title-line/);
  assert.match(css, /\.personalized-close\s*{[^}]*min-height:\s*184px;/s);
  assert.doesNotMatch(css, /\.personalized-close::before/);
  assert.doesNotMatch(css, /\.personalized-close-corner/);
});

test("section 9 is a dedicated component inserted between section 8 and FAQ", () => {
  assert.match(
    page,
    /import \{ TechnologySection \} from "\.\/_components\/technology-section";/,
  );
  const personalizedIndex = page.indexOf('id="assessoria-personalizada"');
  const technologyIndex = page.indexOf("<TechnologySection />");
  const faqIndex = page.indexOf('className="faq-section"');

  assert.ok(personalizedIndex < technologyIndex);
  assert.ok(technologyIndex < faqIndex);
});

test("section 9 contains the approved copy and uses the provided fluxogram image", async () => {
  const technology = await readFile(
    new URL("../src/app/_components/technology-section.tsx", import.meta.url),
    "utf8",
  );

  assert.match(technology, /TECNOLOGIA QUE GERA RESULTADO/);
  assert.match(technology, /Inteligência, Tecnologia/);
  assert.match(technology, /e Automação/);
  assert.match(technology, /Aplicações estratégicas/);
  assert.equal(
    (technology.match(/className="technology-application"/g) ?? []).length,
    1,
  );
  assert.match(technology, /technology-visual/);
  assert.match(technology, /technology-flow-image/);
  assert.match(technology, /src="\/brand\/fluxogram-sessao9-2\.png\.png"/);
  assert.match(
    technology,
    /<p className="technology-eyebrow">\s*TECNOLOGIA QUE GERA RESULTADO\s*<\/p>/,
  );
  assert.doesNotMatch(technology, /TechnologyIcon/);
  assert.doesNotMatch(technology, /technology-core-logo/);
  assert.doesNotMatch(
    technology,
    /secao-09-inteligencia-tecnologia-automacao-referencia/,
  );
});

test("section 9 has desktop and mobile layout rules", () => {
  assert.match(
    css,
    /\.technology-shell\s*{[^}]*grid-template-columns:\s*minmax\(0,\s*0\.94fr\) minmax\(0,\s*1\.06fr\);/s,
  );
  assert.match(
    css,
    /@media \(max-width:\s*1100px\)[\s\S]*?\.technology-shell\s*{[^}]*grid-template-columns:\s*1fr;/s,
  );
  assert.match(
    css,
    /@media \(max-width:\s*640px\)[\s\S]*?\.technology-visual-mobile\s*{[^}]*width:\s*118vw;[\s\S]*?\.technology-flow-image\s*{[^}]*width:\s*100%;/s,
  );
  assert.match(
    css,
    /\.technology-eyebrow\s*{[^}]*display:\s*block;[^}]*text-align:\s*left;/s,
  );
  assert.doesNotMatch(css, /\.technology-eyebrow span/);
});
