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
const carousel = await readFile(
  new URL("../src/app/_components/service-carousel.tsx", import.meta.url),
  "utf8",
);
const technology = await readFile(
  new URL("../src/app/_components/technology-section.tsx", import.meta.url),
  "utf8",
);
const workSection = await readFile(
  new URL("../src/app/_components/work-section.tsx", import.meta.url),
  "utf8",
);

test("section 4 controls the requested two-line description", () => {
  assert.match(
    page,
    /className="method-description-line"[\s\S]*É por isso que o Grupo Vittore concentra estratégia, tempo e[\s\S]*className="method-description-line"[\s\S]*execução no que realmente importa:/,
  );
});

test("section 5 closing objective frame is fully removed", () => {
  assert.doesNotMatch(
    workSection,
    /className="work-close-wrap"[\s\S]*className="work-close"[\s\S]*className="work-close-label"[\s\S]*className="work-close-message"/,
  );
  assert.doesNotMatch(workSection, /O objetivo.*?simples/i);
  assert.doesNotMatch(workSection, /Fazer sua empresa vender mais/i);
  assert.doesNotMatch(css, /\.work-close/);
});

test("sections 5, 6 and 7 use small gold dots instead of side rules", () => {
  assert.equal(
    (workSection.match(/className="work-eyebrow-dot"/g) ?? []).length,
    2,
  );
  assert.match(
    css,
    /\.work-eyebrow-dot\s*{[^}]*width:\s*7px;[^}]*height:\s*7px;[^}]*border-radius:\s*999px;[^}]*background:\s*#d7a34b;/s,
  );
  assert.equal((page.match(/eyebrowVariant="dots"/g) ?? []).length, 2);
  assert.match(page, /<TitleBlock[\s\S]*eyebrow="CLIENTES E PARCEIROS"[\s\S]*eyebrowVariant="dots"/);
  assert.match(page, /<TitleBlock[\s\S]*eyebrow="ASSESSORIA DE VENDAS"[\s\S]*eyebrowVariant="dots"/);
  assert.doesNotMatch(page, /<TitleBlock eyebrow="FAQ"[\s\S]*eyebrowVariant="dots"/);
});

test("section 6 is a single-row five-logo marquee using original assets", () => {
  assert.match(page, /clientLogos\.concat\(clientLogos\)/);
  assert.match(
    css,
    /\.client-logo-track\s*{[^}]*display:\s*grid;[^}]*grid-auto-flow:\s*column;/s,
  );
  assert.match(
    css,
    /\.client-logo-track\s*{[^}]*grid-auto-columns:\s*calc\(\(100%\s*-\s*4px\)\s*\/\s*5\);/s,
  );
  assert.match(css, /@keyframes client-logo-marquee/);
});

test("section 7 final state shows services 8 and 9 completely", () => {
  assert.match(carousel, /const lastStartIndex = 7;/);
  assert.match(carousel, /CAROUSEL_STATES\.map/);
  assert.match(carousel, /goToState/);
  assert.match(carousel, /disabled=\{activeIndex === lastStartIndex\}/);
});

test("section 8 keeps the required background and refined framed close", () => {
  assert.match(
    css,
    /\.personalized-section\s*{[^}]*background-image:\s*url\("\/brand\/3\/background-sessao-8\.png\.png"\);/s,
  );
  assert.match(
    css,
    /\.personalized-close\s*{(?=[^}]*width:\s*100%;)(?=[^}]*max-width:\s*none;)(?=[^}]*min-height:\s*184px;)(?=[^}]*padding:\s*42px 92px 44px;)[^}]*}/s,
  );
  assert.doesNotMatch(css, /\.personalized-close-diamond/);
  assert.equal(
    (page.match(/className="personalized-radar-axis"/g) ?? []).length,
    8,
  );
});

test("section 8 title is reduced and radar exposes the refined reference layers", () => {
  assert.match(
    css,
    /\.personalized-copy h2\s*{[^}]*font-size:\s*clamp\(3\.05rem,\s*3\.85vw,\s*4\.25rem\);/s,
  );
  assert.match(page, /className="personalized-radar-octagon personalized-radar-octagon-major"/);
  assert.match(page, /className="personalized-radar-circle-grid"/);
  assert.match(page, /className="personalized-radar-series personalized-radar-series-blue"/);
  assert.match(page, /className="personalized-radar-series personalized-radar-series-gold"/);
  assert.match(page, /className="personalized-radar-series personalized-radar-series-red"/);
  assert.match(page, /Marketing de[\s\S]*Performance/);
});

test("section 9 uses the provided fluxogram asset on a solid off-white background", () => {
  assert.match(
    technology,
    /<p className="technology-eyebrow">[\s\S]*TECNOLOGIA QUE GERA RESULTADO[\s\S]*<\/p>/,
  );
  assert.match(technology, /src="\/brand\/fluxogram-sessao9-2\.png\.png"/);
  assert.match(technology, /className="technology-flow-image"/);
  assert.doesNotMatch(technology, /TechnologyIcon/);
  assert.doesNotMatch(technology, /technology-flow-layer/);
  assert.match(
    css,
    /\.technology-section\s*{[^}]*background-color:\s*#fbf8f4;[^}]*color:\s*#001a44;/s,
  );
  assert.doesNotMatch(css, /background-sessao-9\.png\.png/);
  assert.match(technology, /technology-title-line/);
  assert.match(technology, /technology-title-accent/);
  assert.match(css, /\.technology-flow-image\s*{[^}]*width:\s*min\(760px,\s*52vw\);/s);
});
