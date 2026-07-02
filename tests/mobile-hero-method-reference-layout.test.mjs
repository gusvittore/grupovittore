import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../src/app/page.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../src/app/globals.css", import.meta.url), "utf8");

const mobileCss = css;

test("hero mobile renders a separate visual cover before the text block", () => {
  const visualIndex = page.indexOf('className="hero-mobile-visual"');
  const shellIndex = page.indexOf('className="hero-shell"');

  assert.notEqual(visualIndex, -1);
  assert.notEqual(shellIndex, -1);
  assert.ok(visualIndex < shellIndex);
  assert.match(css, /\.hero-mobile-visual\s*\{[\s\S]*?display:\s*none;/);
  assert.match(mobileCss, /\.hero-mobile-visual\s*\{[\s\S]*?display:\s*block;[\s\S]*?height:\s*clamp\(420px,\s*132vw,\s*520px\);/);
  assert.match(mobileCss, /\.hero-visual\s*\{[\s\S]*?display:\s*none;/);
});

test("hero mobile has the requested label and balanced manual title lines", () => {
  assert.match(page, /className="hero-eyebrow-desktop"[\s\S]*ASSESSORIA DE VENDAS E MARKETING DE PERFORMANCE/);
  assert.match(page, /className="hero-eyebrow-mobile"[\s\S]*ASSESSORIA COMERCIAL E MARKETING DE PERFORMANCE/);
  assert.match(
    page,
    /className="hero-title-mobile"[\s\S]*Seu comercial n(?:ã|Ã£)o[\s\S]*perde vendas[\s\S]*s(?:ó|Ã³) para[\s\S]*concorrentes\.[\s\S]*Ele tamb(?:é|Ã©)m perde para[\s\S]*o pr(?:ó|Ã³)prio processo\./,
  );
});

test("method mobile places the section visual before the copy while preserving desktop visual", () => {
  const visualIndex = page.indexOf('className="method-revenue-mobile-visual"');
  const copyIndex = page.indexOf('className="method-revenue-copy"');

  assert.notEqual(visualIndex, -1);
  assert.notEqual(copyIndex, -1);
  assert.ok(visualIndex < copyIndex);
  assert.match(page, /<MethodRevenueVisual \/>\s*<\/div>\s*<div className="method-revenue-copy">/);
  assert.match(page, /<\/div>\s*<MethodRevenueVisual \/>\s*<\/div>\s*<\/div>\s*<\/section>/);
  assert.match(mobileCss, /\.method-revenue-shell > \.method-revenue-visual\s*\{[\s\S]*?display:\s*none;/);
  assert.match(mobileCss, /\.method-revenue-mobile-visual \.method-revenue-visual\s*\{[\s\S]*?min-height:\s*clamp\(520px,\s*152vw,\s*680px\);/);
});

test("method mobile uses separate title lines for the approved mobile composition", () => {
  assert.match(page, /className="method-title-desktop"[\s\S]*Você não precisa de mais marketing,[\s\S]*precisa de vendas acontecendo[\s\S]*com método\./);
  assert.match(page, /className="method-title-mobile"[\s\S]*Você não precisa de[\s\S]*mais marketing,[\s\S]*precisa de vendas[\s\S]*acontecendo com método\./);
  assert.match(css, /\.method-title-mobile\s*\{[\s\S]*?display:\s*none;/);
  assert.match(mobileCss, /\.method-title-desktop\s*\{[\s\S]*?display:\s*none;/);
  assert.match(mobileCss, /\.method-title-mobile\s*\{[\s\S]*?display:\s*block;/);
});
