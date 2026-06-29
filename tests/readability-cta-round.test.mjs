import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../src/app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../src/app/globals.css", import.meta.url), "utf8");
const technology = await readFile(
  new URL("../src/app/_components/technology-section.tsx", import.meta.url),
  "utf8",
);

test("section 4 gives the Marco Aurelio text equal visual weight and a form CTA", () => {
  assert.match(
    css,
    /\.method-revenue-text\s*{[^}]*font-size:\s*clamp\(1\.16rem,\s*1\.42vw,\s*1\.42rem\);/s,
  );
  assert.match(
    css,
    /\.method-revenue-complement\s*{[^}]*font-size:\s*clamp\(1\.16rem,\s*1\.42vw,\s*1\.42rem\);[^}]*line-height:\s*1\.62;/s,
  );
  assert.match(
    page,
    /<p className="method-revenue-complement">[\s\S]*?<em>método<\/em>, <em>controle<\/em> e <em>direção<\/em>\.[\s\S]*?<\/p>\s*<div className="method-revenue-actions">\s*<HeroPrimaryButton \/>/s,
  );
  assert.match(css, /\.method-revenue-actions\s*{[^}]*margin-top:\s*30px;/s);
});

test("section 7 card descriptions are enlarged without touching card titles", () => {
  assert.match(
    css,
    /\.service-card-copy > p:not\(\.service-card-number\)\s*{[^}]*font-size:\s*1\.22rem;[^}]*line-height:\s*1\.62;/s,
  );
  assert.match(css, /\.service-card\s*{[^}]*min-height:\s*760px;/s);
  assert.doesNotMatch(css, /\.service-card h3\s*{[^}]*font-size:\s*1\.22rem;/s);
});

test("section 9 application texts are larger, wider, and end with the hero CTA", () => {
  assert.match(
    css,
    /\.technology-shell\s*{[^}]*grid-template-columns:\s*minmax\(0,\s*0\.94fr\) minmax\(0,\s*1\.06fr\);/s,
  );
  assert.match(css, /\.technology-applications\s*{[^}]*max-width:\s*760px;/s);
  assert.match(
    css,
    /\.technology-application p\s*{[^}]*font-size:\s*1\.24rem;[^}]*line-height:\s*1\.56;/s,
  );
  assert.match(
    technology,
    /<div className="technology-cta">\s*<a href="#formulario" className="hero-primary-button">\s*QUERO MAIS INFORMAÇÕES\s*<\/a>\s*<\/div>/s,
  );
  assert.match(css, /\.technology-cta\s*{[^}]*margin-top:\s*34px;/s);
});
