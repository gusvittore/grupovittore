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
const workSection = await readFile(
  new URL("../src/app/_components/work-section.tsx", import.meta.url),
  "utf8",
);
const radarSource = page.slice(
  page.indexOf("function PersonalizedRadar"),
  page.indexOf("function HeroPrimaryButton"),
);

test("section 5 final objective statement and frame are removed", () => {
  assert.doesNotMatch(css, /\.work-close/);
  assert.doesNotMatch(workSection, /work-close/);
  assert.doesNotMatch(workSection, /O objetivo.*?simples/i);
  assert.doesNotMatch(workSection, /Fazer sua empresa vender mais/i);
  assert.match(
    workSection,
    /<CommercialPerformanceBars \/>[\s\S]*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/,
  );
});

test("section 8 radar follows the reference label set and keeps labels close to the octagon", () => {
  assert.match(radarSource, /viewBox="0 0 720 620"/);
  assert.equal((radarSource.match(/Marketing de/g) ?? []).length, 2);
  assert.doesNotMatch(radarSource, /Dados e/);
  assert.doesNotMatch(radarSource, /Automação/);
  assert.doesNotMatch(radarSource, /Estratégia/);
  assert.match(radarSource, /<text x="520" y="152" className="personalized-radar-label personalized-radar-label-crm">CRM<\/text>/);
  assert.match(radarSource, /<text x="574" y="308" textAnchor="start" className="personalized-radar-label personalized-radar-label-ads"/);
  assert.match(
    css,
    /\.personalized-radar\s*{[^}]*width:\s*min\(100%,\s*720px\);[^}]*min-height:\s*620px;[^}]*margin:\s*0 auto;/s,
  );
});

test("section 8 closing statement is a wide two-line premium block", () => {
  assert.match(
    page,
    /<span className="personalized-close-line">POR ISSO, O DIAGNÓSTICO, O PLANO E O SERVIÇO<\/span>\s*<span className="personalized-close-line">QUE APRESENTAMOS SÃO <span>EXCLUSIVOS<\/span> PARA O <span>SEU NEGÓCIO\.<\/span><\/span>/,
  );
  assert.doesNotMatch(page, /personalized-close[\s\S]{0,220}<br \/>/);
  assert.match(
    css,
    /\.personalized-close\s*{(?=[^}]*width:\s*100%;)(?=[^}]*max-width:\s*none;)(?=[^}]*min-height:\s*184px;)(?=[^}]*padding:\s*42px 92px 44px;)[^}]*}/s,
  );
  assert.match(
    css,
    /\.personalized-close-line\s*{[^}]*display:\s*block;[^}]*white-space:\s*nowrap;/s,
  );
  assert.match(
    css,
    /@media \(max-width:\s*640px\)[\s\S]*?\.personalized-close-line\s*{[^}]*white-space:\s*normal;/s,
  );
  assert.match(
    page,
    /className="personalized-close-copy personalized-close-copy-mobile"[\s\S]*<span className="personalized-close-line">POR ISSO, O DIAGNÓSTICO,<\/span>[\s\S]*<span className="personalized-close-line">O PLANO E O SERVIÇO QUE<\/span>[\s\S]*<span className="personalized-close-line">APRESENTAMOS SÃO<\/span>[\s\S]*<span className="personalized-close-line"><span>EXCLUSIVOS<\/span> PARA O <span>SEU NEGÓCIO\.<\/span><\/span>/,
  );
});
