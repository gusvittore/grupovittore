import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const css = await readFile(new URL("../src/app/globals.css", import.meta.url), "utf8");
const page = await readFile(new URL("../src/app/page.tsx", import.meta.url), "utf8");
const workSection = await readFile(
  new URL("../src/app/_components/work-section.tsx", import.meta.url),
  "utf8",
);
const leadForm = await readFile(
  new URL("../src/app/_components/lead-form.tsx", import.meta.url),
  "utf8",
);
const route = await readFile(
  new URL("../src/app/api/leads/route.ts", import.meta.url),
  "utf8",
);

test("requested section titles keep sentence case and exact manual lines", () => {
  assert.match(workSection, /<span className="work-heading-line">Na pr(?:á|Ã¡)tica, (?:é|Ã©) assim que<\/span>/);
  assert.match(workSection, /<span className="work-heading-line">o nosso trabalho acontece<\/span>/);
  assert.doesNotMatch(workSection, /<b>trabalho<\/b>/);

  assert.match(page, /<span className="personalized-title-line">Por que o nosso<\/span>/);
  assert.match(page, /<span className="personalized-title-line">servi(?:ç|Ã§)o n(?:ã|Ã£)o tem<\/span>/);
  assert.match(page, /<span className="personalized-title-line">planos <span className="personalized-title-accent">Black, Gold<\/span><\/span>/);
  assert.match(page, /<span className="personalized-title-line">ou <span className="personalized-title-accent">Platinum<\/span>\?<\/span>/);
  assert.doesNotMatch(page, /“planos|Platinum<\/span>”/);
});

test("only the two requested title selectors stop forcing uppercase", () => {
  const workTitleRule = css.match(/\.work-heading h2\s*{[^}]*}/s)?.[0] ?? "";
  const personalizedTitleRule = css.match(/\.personalized-copy h2\s*{[^}]*}/s)?.[0] ?? "";

  assert.doesNotMatch(workTitleRule, /text-transform:\s*uppercase/);
  assert.doesNotMatch(personalizedTitleRule, /text-transform:\s*uppercase/);
  assert.match(workTitleRule, /font-weight:\s*600;/);
});

test("lead form locks synchronously until redirect or error", () => {
  assert.match(leadForm, /useRef/);
  assert.match(leadForm, /const submitLockedRef = useRef\(false\)/);
  assert.match(leadForm, /if \(submitLockedRef\.current \|\| isSubmitting\)/);
  assert.match(leadForm, /submitLockedRef\.current = true/);
  assert.match(leadForm, /disabled=\{isSubmitting\}/);
  assert.match(leadForm, /\{isSubmitting \? "Enviando\.\.\." : "Receber mais informa(?:ç|Ã§)(?:õ|Ãµ)es"\}/);
  assert.doesNotMatch(leadForm, /finally\s*{[\s\S]*setIsSubmitting\(false\)/);
});

test("lead API checks recent duplicate before saving and before ClickUp", () => {
  assert.match(route, /RECENT_DUPLICATE_WINDOW_MINUTES = [2-5]/);
  assert.match(route, /findRecentDuplicateLead/);
  assert.match(route, /email=eq\.\$\{encodeURIComponent\(payload\.email\)\}/);
  assert.match(route, /whatsapp=eq\.\$\{encodeURIComponent\(payload\.whatsapp\)\}/);
  assert.match(route, /empresa=eq\.\$\{encodeURIComponent\(payload\.empresa\)\}/);
  assert.match(route, /created_at=gte\./);
  assert.match(route, /duplicate: true/);
  assert.match(route, /redirectTo: qualification\.redirectTo/);

  const duplicateCheckIndex = route.indexOf("findRecentDuplicateLead");
  const saveIndex = route.indexOf("saveLeadToSupabase");
  const clickUpIndex = route.indexOf("sendLeadToClickUp");

  assert.ok(duplicateCheckIndex > -1);
  assert.ok(saveIndex > -1);
  assert.ok(clickUpIndex > -1);
  assert.ok(duplicateCheckIndex < saveIndex);
  assert.ok(duplicateCheckIndex < clickUpIndex);
});
