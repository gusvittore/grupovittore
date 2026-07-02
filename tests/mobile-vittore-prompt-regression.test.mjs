import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../src/app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../src/app/globals.css", import.meta.url), "utf8");
const workSection = await readFile(
  new URL("../src/app/_components/work-section.tsx", import.meta.url),
  "utf8",
);

const mobileCss = css.slice(css.indexOf("@media (max-width: 640px)"));

test("mobile hero and method visuals reduce portrait zoom and keep dashboards contained", () => {
  assert.match(
    mobileCss,
    /\.hero-mobile-visual\s*{[^}]*height:\s*clamp\(430px,\s*118vw,\s*540px\);[^}]*background-size:\s*100% 100%,\s*100% auto;/s,
  );
  assert.match(
    mobileCss,
    /\.hero-mobile-statue\s*{[^}]*background-position:\s*center bottom;[^}]*background-size:\s*min\(470px,\s*92vw\) auto;/s,
  );
  assert.match(
    mobileCss,
    /\.method-revenue-mobile-visual \.method-revenue-visual\s*{[^}]*min-height:\s*clamp\(430px,\s*118vw,\s*560px\);[^}]*background-size:\s*100% auto;/s,
  );
  assert.match(
    mobileCss,
    /\.method-revenue-mobile-visual \.method-revenue-statue\s*{(?=[^}]*top:\s*24px;)(?=[^}]*width:\s*min\(720px,\s*154vw\);)[^}]*}/s,
  );
});

test("mobile form and internal section titles use wider controlled compositions", () => {
  assert.match(
    mobileCss,
    /--mobile-section-title:\s*clamp\(30px,\s*7\.2vw,\s*35px\);/,
  );
  assert.match(
    mobileCss,
    /--mobile-long-title:\s*clamp\(28px,\s*6\.8vw,\s*34px\);/,
  );
  assert.match(
    mobileCss,
    /\.form-title-mobile\s*{[^}]*display:\s*block;[^}]*width:\s*100%;[^}]*max-width:\s*calc\(100vw - 40px\);/s,
  );
  assert.match(
    mobileCss,
    /\.method-revenue-title\s*{[^}]*max-width:\s*calc\(100vw - 40px\);[^}]*font-size:\s*var\(--mobile-long-title\);/s,
  );
  assert.match(
    mobileCss,
    /\.sales-title-block > h2\s*{[^}]*max-width:\s*calc\(100vw - 40px\);/s,
  );
});

test("section 5 title casing is normal and mobile card numbers sit in the card corner", () => {
  assert.doesNotMatch(workSection, /NA PR[ÃÁ]TICA, [ÃÉ] ASSIM QUE O NOSSO TRABALHO ACONTECE/);
  assert.match(workSection, /Na pr(?:Ã¡|á)tica, (?:Ã©|é) assim que/);
  assert.match(
    mobileCss,
    /\.work-card\s*{[^}]*position:\s*relative;[^}]*padding:\s*54px 24px 32px;/s,
  );
  assert.match(
    mobileCss,
    /\.work-card-number\s*{[^}]*position:\s*absolute;[^}]*top:\s*20px;[^}]*left:\s*20px;[^}]*z-index:\s*2;/s,
  );
  assert.match(
    mobileCss,
    /\.work-card-heading\s*{[^}]*display:\s*block;[^}]*position:\s*static;/s,
  );
});

test("personalized radar and technology image are enlarged only on mobile without divider lines", () => {
  assert.doesNotMatch(css, /personalized-description-mobile::before|personalized-radar::after/);
  assert.match(
    mobileCss,
    /\.personalized-radar\s*{[^}]*width:\s*min\(calc\(100vw - 16px\),\s*430px\);[^}]*min-height:\s*390px;[^}]*margin:\s*4px auto 0;/s,
  );
  assert.match(
    mobileCss,
    /\.personalized-description-mobile\s*{[^}]*border-top:\s*0;[^}]*padding-top:\s*8px;[^}]*font-size:\s*1\.02rem;/s,
  );
  assert.match(
    mobileCss,
    /\.personalized-close\s*{[^}]*font-size:\s*clamp\(20px,\s*5\.15vw,\s*24px\);[^}]*line-height:\s*1\.22;/s,
  );
  assert.match(
    mobileCss,
    /\.technology-flow-image\s*{[^}]*width:\s*min\(100vw,\s*500px\);[^}]*max-width:\s*calc\(100vw - 16px\);/s,
  );
});

test("protected areas remain untouched by this mobile correction", () => {
  assert.match(page, /<LeadForm \/>/);
  assert.match(page, /<footer id="rodape" className="site-footer">/);
  assert.match(page, /<Section id="diagnostico" className="diagnostic-section clean-off-white">/);
});
