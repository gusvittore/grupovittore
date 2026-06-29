import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const css = await readFile(
  new URL("../src/app/globals.css", import.meta.url),
  "utf8",
);
const workSection = await readFile(
  new URL("../src/app/_components/work-section.tsx", import.meta.url),
  "utf8",
);

test("section 5 uses the approved background asset with reference-like framing", () => {
  assert.match(
    css,
    /\.work-section\s*{[^}]*background-image:\s*url\("\/brand\/3\/background-sessao-5\.png\.png"\);[^}]*background-position:\s*center top;[^}]*background-size:\s*100% auto;/s,
  );
  assert.match(
    css,
    /\.work-section-shell\s*{[^}]*max-width:\s*1448px;[^}]*padding:\s*76px 56px 96px;/s,
  );
  assert.match(css, /\.work-eyebrow\s*{[^}]*color:\s*#d39a3c;/s);
  assert.match(workSection, /className="work-heading-subtitle"/);
  assert.match(
    css,
    /\.work-heading-subtitle\s*{[^}]*max-width:\s*1160px;[^}]*font-size:\s*1\.36rem;[^}]*line-height:\s*1\.54;/s,
  );
});

test("section 5 main cards mirror the two-column framed composition", () => {
  assert.equal((workSection.match(/className="work-card"/g) ?? []).length, 1);
  assert.match(
    css,
    /\.work-card-grid\s*{[^}]*gap:\s*22px;[^}]*margin-top:\s*48px;/s,
  );
  assert.match(
    css,
    /\.work-card\s*{[^}]*grid-template-columns:\s*116px minmax\(0,\s*1fr\);[^}]*min-height:\s*220px;[^}]*padding:\s*32px 36px;/s,
  );
  assert.match(
    css,
    /\.work-card::before,\s*\.work-card::after\s*{[^}]*clip-path:/s,
  );
  assert.match(
    css,
    /\.work-card:nth-child\(4\) h3\s*{[^}]*font-size:\s*clamp\(1\.25rem,\s*1\.55vw,\s*1\.58rem\);[^}]*white-space:\s*nowrap;/s,
  );
  assert.match(
    css,
    /\.work-card:nth-child\(3\) h3\s*{[^}]*font-size:\s*clamp\(1\.25rem,\s*1\.55vw,\s*1\.58rem\);[^}]*white-space:\s*nowrap;/s,
  );
  assert.match(
    css,
    /\.work-card-content > p:last-child\s*{[^}]*font-size:\s*1\.18rem;[^}]*line-height:\s*1\.64;/s,
  );
});

test("section 5 preserves all code-native charts", () => {
  for (const chart of [
    "OpportunitiesLineChart",
    "FunnelDistributionChart",
    "KeyIndicatorsChart",
    "CommercialPerformanceBars",
  ]) {
    assert.match(workSection, new RegExp(`<${chart} \\/>`));
  }

  assert.doesNotMatch(workSection, /<Image|<img/);
  assert.match(
    css,
    /\.work-chart-grid\s*{[^}]*grid-template-columns:\s*repeat\(4,\s*minmax\(0,\s*1fr\)\);/s,
  );
  assert.match(
    css,
    /\.work-chart-card\s*{[^}]*min-height:\s*205px;[^}]*padding:\s*20px 20px 18px;/s,
  );
  assert.match(
    css,
    /\.work-donut-layout\s*{[^}]*grid-template-columns:\s*112px minmax\(0,\s*1fr\);/s,
  );
  assert.match(
    css,
    /\.work-donut\s*{[^}]*width:\s*108px;[^}]*height:\s*108px;/s,
  );
  assert.match(
    css,
    /\.work-donut-legend p\s*{[^}]*font-size:\s*0\.74rem;/s,
  );
});

test("section 5 ends after the chart grid without the objective frame", () => {
  assert.doesNotMatch(workSection, /work-close/);
  assert.doesNotMatch(workSection, /O objetivo.*?simples/i);
  assert.doesNotMatch(workSection, /Fazer sua empresa vender mais/i);
  assert.doesNotMatch(css, /\.work-close/);
  assert.match(
    workSection,
    /<CommercialPerformanceBars \/>[\s\S]*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/,
  );
});

test("section 5 remains single-column and overflow-safe on mobile", () => {
  assert.match(
    css,
    /@media \(max-width:\s*640px\)[\s\S]*?\.work-card-grid,\s*\.work-chart-grid\s*{[^}]*grid-template-columns:\s*1fr;/s,
  );
  assert.match(
    css,
    /@media \(max-width:\s*640px\)[\s\S]*?\.work-section\s*{[^}]*background-position:\s*center -120px;[^}]*background-size:\s*auto 1086px;/s,
  );
});
