import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(
  new URL("../src/app/_components/assessoria-comercial-page.tsx", import.meta.url),
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

test("section 4 raises the copy and enlarges the statue without changing its background", () => {
  assert.match(
    css,
    /\.method-revenue-copy\s*{[^}]*margin-top:\s*0;/s,
  );
  assert.match(
    css,
    /\.method-revenue-statue\s*{[^}]*bottom:\s*-4px;[^}]*width:\s*min\(78vw,\s*1120px\);/s,
  );
  assert.match(
    css,
    /\.method-revenue-section\s*{[^}]*background-image:\s*url\("\/brand\/3\/background-sessao-4\.png\.png"\);/s,
  );
});

test("section 6 renders every client logo in one continuous original-color marquee", () => {
  const expectedLogos = [
    "cliente-1.png.png",
    "cliente-2.png.png",
    "cliente-3.png.png",
    "cliente-4.png.png",
    "cliente-44.png.png",
    "cliente-5.png.png",
    "cliente-55.png.png",
    "cliente-6.png.png",
    "cliente-7.png.png",
    "cliente-9.png.png",
    "cliente-10.png.png",
    "cliente-11.png.png",
    "cliente-12.png.png",
    "cliente-13.png.png",
  ];

  for (const logo of expectedLogos) {
    assert.match(page, new RegExp(logo.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.match(page, /className="client-logo-viewport"/);
  assert.match(page, /className="client-logo-track"/);
  assert.match(page, /className="client-logo-image"/);
  assert.doesNotMatch(page, /client-logo-image-monochrome|client-logo-image-original/);
  assert.match(
    css,
    /\.client-logo-track\s*{[^}]*animation:\s*client-logo-marquee\s*42s\s*linear\s*infinite;/s,
  );
  assert.match(
    css,
    /\.client-logo-track\s*{[^}]*grid-auto-columns:\s*calc\(\(100%\s*-\s*4px\)\s*\/\s*5\);/s,
  );
  assert.doesNotMatch(css, /\.client-logo-image\s*{[^}]*filter:/s);
});

test("section 7 shows two full desktop cards and advances responsively", () => {
  assert.match(carousel, /const CAROUSEL_DESKTOP_STEP = 2;/);
  assert.match(carousel, /activeIndex \+ direction \* getCarouselStep\(\)/);
  assert.match(carousel, /const CAROUSEL_DESKTOP_STATES = \[0, 2, 4, 6, 7\] as const;/);
  assert.match(carousel, /const CAROUSEL_MOBILE_STATES = \[0, 1, 2, 3, 4, 5, 6, 7, 8\] as const;/);
  assert.match(carousel, /const lastStartIndex = isMobile \? services\.length - 1 : services\.length - 2;/);
  assert.match(
    css,
    /\.service-card\s*{[^}]*width:\s*calc\(\(100% - 44px\) \/ 2\.12\);[^}]*min-width:\s*calc\(\(100% - 44px\) \/ 2\.12\);/s,
  );
});

test("section 8 uses an eight-axis SVG radar with layered polygons and point markers", () => {
  assert.match(page, /className="personalized-radar-svg"/);
  assert.equal(
    (page.match(/className="personalized-radar-axis"/g) ?? []).length,
    8,
  );
  assert.match(page, /className="personalized-radar-series personalized-radar-series-blue"/);
  assert.match(page, /className="personalized-radar-series personalized-radar-series-gold"/);
  assert.match(page, /className="personalized-radar-series personalized-radar-series-red"/);
  assert.match(page, /className="personalized-radar-point"/);
  assert.match(page, /personalized-title-accent/);
  assert.match(page, /personalized-close/);
});
