import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const css = await readFile(new URL("../src/app/globals.css", import.meta.url), "utf8");
const page = await readFile(new URL("../src/app/page.tsx", import.meta.url), "utf8");
const carousel = await readFile(
  new URL("../src/app/_components/service-carousel.tsx", import.meta.url),
  "utf8",
);
const technology = await readFile(
  new URL("../src/app/_components/technology-section.tsx", import.meta.url),
  "utf8",
);

const mobileCss = css;

test("mobile headings use the shared mobile sizing pattern without desktop changes", () => {
  assert.match(mobileCss, /--mobile-section-title:\s*clamp\(30px,\s*7\.2vw,\s*35px\);/);
  assert.match(mobileCss, /--mobile-long-title:\s*clamp\(28px,\s*6\.8vw,\s*34px\);/);
  assert.match(mobileCss, /text-wrap:\s*balance;/);
  assert.match(mobileCss, /word-break:\s*normal;/);
  assert.match(mobileCss, /overflow-wrap:\s*normal;/);
});

test("hero and form titles have mobile-specific manual line groupings", () => {
  assert.match(page, /className="hero-title-mobile"[\s\S]*Seu comercial n[\s\S]*perde vendas[\s\S]*para[\s\S]*concorrentes\.[\s\S]*Ele tamb[\s\S]*m perde para[\s\S]*o pr[\s\S]*prio processo\./);
  assert.match(page, /className="hero-title-desktop"/);
  assert.match(page, /className="section-title section-title-left form-title-mobile"[\s\S]*Agende uma reuni[\s\S]*o online,[\s\S]*receba um diagn[\s\S]*stico comercial[\s\S]*e descubra onde sua empresa pode[\s\S]*estar[\s\S]*perdendo vendas[\s\S]*dentro[\s\S]*do pr[\s\S]*prio processo\./);
  assert.match(page, /className="section-title section-title-left form-title-desktop"/);
});

test("customer journey keeps arrows on mobile", () => {
  assert.doesNotMatch(mobileCss, /\.journey-step::before,\s*\.journey-step::after\s*\{[\s\S]*?display:\s*none;/);
  assert.match(mobileCss, /\.journey-step:not\(:last-child\)::after\s*\{[\s\S]*?border-top:\s*0;[\s\S]*?border-left:\s*1px solid #b29157;/);
  assert.match(mobileCss, /\.journey-step:not\(:last-child\)::before\s*\{[\s\S]*?transform:\s*translateX\(-50%\) rotate\(135deg\);/);
});

test("services carousel advances one card at a time on mobile", () => {
  assert.match(carousel, /const getCarouselStep = \(\) =>/);
  assert.match(carousel, /window\.matchMedia\("\(max-width: 640px\)"\)\.matches \? 1 : CAROUSEL_DESKTOP_STEP/);
  assert.match(carousel, /const CAROUSEL_MOBILE_STATES = \[0, 1, 2, 3, 4, 5, 6, 7, 8\] as const;/);
});

test("technology mobile order places the flow image before applications and CTA", () => {
  assert.match(technology, /className=\{`technology-visual \$\{className\}`\}/);
  assert.match(technology, /<TechnologyFlow className="technology-visual-mobile" \/>\s*<h3>/);
  assert.match(technology, /<TechnologyFlow className="technology-visual-desktop" \/>/);
  assert.match(css, /\.technology-visual-mobile\s*\{[\s\S]*?display:\s*none;/);
  assert.match(mobileCss, /\.technology-visual-desktop\s*\{[\s\S]*?display:\s*none;/);
  assert.match(mobileCss, /\.technology-visual-mobile\s*\{[\s\S]*?display:\s*flex;/);
});
