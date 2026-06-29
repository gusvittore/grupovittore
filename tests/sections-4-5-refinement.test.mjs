import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const css = await readFile(
  new URL("../src/app/globals.css", import.meta.url),
  "utf8",
);
const page = await readFile(
  new URL("../src/app/page.tsx", import.meta.url),
  "utf8",
);
const workSection = await readFile(
  new URL("../src/app/_components/work-section.tsx", import.meta.url),
  "utf8",
);

test("section 4 uses reference-aligned framing and raises the copy", () => {
  assert.match(
    css,
    /\.method-revenue-section\s*{[^}]*background-position:\s*center top;[^}]*background-size:\s*100% auto;/s,
  );
  assert.match(
    css,
    /\.method-revenue-shell\s*{[^}]*min-height:\s*810px;[^}]*padding:\s*74px 72px 58px;/s,
  );
  assert.match(
    css,
    /\.method-revenue-copy\s*{[^}]*align-self:\s*start;[^}]*margin-top:\s*0;[^}]*padding-bottom:\s*0;/s,
  );
});

test("section 4 keeps only the existing background and statue composition", () => {
  assert.match(
    css,
    /\.method-revenue-statue\s*{[^}]*right:\s*clamp\(-330px,\s*-19vw,\s*-250px\);[^}]*bottom:\s*-4px;[^}]*width:\s*min\(78vw,\s*1120px\);/s,
  );
  assert.match(
    page,
    /src="\/brand\/3\/marco-aurelio-sessao4\.png\.png"/,
  );
  const methodVisual = page.slice(
    page.indexOf("function MethodRevenueVisual"),
    page.indexOf("function DiagnosticAssetPanel"),
  );
  assert.doesNotMatch(methodVisual, /<svg|method-mini-card|method-focus-card/);
});

test("section 5 removes only the upper gold ornament", () => {
  assert.match(
    css,
    /\.work-heading::before\s*{[^}]*top:\s*-28px;[^}]*width:\s*350px;[^}]*height:\s*14px;[^}]*background:\s*linear-gradient/s,
  );
  assert.match(css, /\.work-eyebrow\s*{[^}]*color:\s*#d39a3c;/s);
  assert.match(workSection, /COMO TRABALHAMOS/);
});

test("section 5 objective frame was removed from the section ending", () => {
  assert.doesNotMatch(css, /\.work-close/);
  assert.doesNotMatch(workSection, /work-close/);
  assert.doesNotMatch(workSection, /O objetivo.*?simples/i);
  assert.doesNotMatch(workSection, /Fazer sua empresa vender mais/i);
});
