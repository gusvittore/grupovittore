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

test("section 5 removes the final objective block completely", () => {
  assert.doesNotMatch(workSection, /work-close/);
  assert.doesNotMatch(workSection, /O objetivo é simples/i);
  assert.doesNotMatch(workSection, /Fazer sua empresa vender mais/i);

  assert.doesNotMatch(css, /\.work-close/);
  assert.match(workSection, /<CommercialPerformanceBars \/>/);
  assert.match(
    workSection,
    /<CommercialPerformanceBars \/>[\s\S]*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/,
  );
});

test("section 8 keeps the same framed close but uppercases only its copy", () => {
  assert.match(
    page,
    /<span className="personalized-close-line">POR ISSO, O DIAGNÓSTICO, O PLANO E O SERVIÇO<\/span>\s*<span className="personalized-close-line">QUE APRESENTAMOS SÃO <span>EXCLUSIVOS<\/span> PARA O <span>SEU NEGÓCIO\.<\/span><\/span>/,
  );
  assert.doesNotMatch(
    page,
    /<span className="personalized-close-line">Por isso, o diagnóstico, o plano e o serviço<\/span>/,
  );
  assert.match(
    css,
    /\.personalized-close\s*{(?=[^}]*width:\s*100%;)(?=[^}]*max-width:\s*none;)(?=[^}]*min-height:\s*184px;)(?=[^}]*padding:\s*42px 92px 44px;)[^}]*}/s,
  );
  assert.match(
    css,
    /\.personalized-close-line\s*{[^}]*display:\s*block;[^}]*white-space:\s*nowrap;/s,
  );
});
