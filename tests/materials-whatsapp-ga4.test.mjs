import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const [materialsPage, analyticsSource] = await Promise.all([
  read("src/app/materiais-impressos/page.tsx"),
  read("src/app/_components/google-analytics.tsx"),
]);

test("every materials WhatsApp link carries analytics-only location metadata without changing its destination", () => {
  assert.match(materialsPage, /MATERIALS_WHATSAPP_NUMBER = "5511966026686"/);
  assert.match(
    materialsPage,
    /return `https:\/\/wa\.me\/\$\{MATERIALS_WHATSAPP_NUMBER\}\?text=\$\{encodeURIComponent\(message\)\}`/,
  );

  assert.equal(
    [...materialsPage.matchAll(/buttonLocation="hero"/g)].length,
    2,
    "mobile and desktop hero CTAs must both be tagged",
  );
  assert.match(materialsPage, /buttonLocation="custom_materials"/);
  assert.match(materialsPage, /buttonLocation="final_cta"/);
  assert.match(materialsPage, /data-ga-whatsapp-location="floating_button"/);

  assert.match(materialsPage, /data-ga-whatsapp-click="true"/);
  assert.match(materialsPage, /data-ga-whatsapp-location=\{buttonLocation\}/);
  assert.match(materialsPage, /data-ga-whatsapp-text=\{buttonText\}/);
  assert.match(materialsPage, /data-ga-whatsapp-text="botao_whatsapp_flutuante"/);

  assert.doesNotMatch(materialsPage, /onClick=\{[^}]*whatsapp_click/);
});

test("whatsapp_click is delegated only on materiais-impressos and never blocks navigation", () => {
  assert.match(analyticsSource, /function trackWhatsAppClick/);
  assert.match(analyticsSource, /"event", "whatsapp_click"/);
  assert.match(analyticsSource, /pathname !== "\/materiais-impressos"/);
  assert.match(
    analyticsSource,
    /closest<HTMLAnchorElement>\(\s*"a\[data-ga-whatsapp-click='true'\]",?\s*\)/,
  );
  assert.match(analyticsSource, /document\.addEventListener\("click", handleWhatsAppClick, \{ capture: true \}\)/);
  assert.doesNotMatch(analyticsSource, /preventDefault\(\)/);
  assert.doesNotMatch(analyticsSource, /await trackWhatsAppClick/);
});

test("whatsapp_click requires accepted consent and loaded gtag while sending only allowlisted non-PII parameters", () => {
  assert.match(
    analyticsSource,
    /readConsentChoice\(\) !== "accepted" \|\| typeof window\.gtag !== "function"/,
  );
  assert.match(analyticsSource, /page_path:/);
  assert.match(analyticsSource, /landing_page: "materiais-impressos"/);
  assert.match(analyticsSource, /button_location:/);
  assert.match(analyticsSource, /button_text:/);
  assert.match(analyticsSource, /contact_channel: "whatsapp"/);

  for (const utm of ["source", "medium", "campaign", "content", "term"]) {
    assert.match(analyticsSource, new RegExp(`params\\.get\\(\"utm_${utm}\"\\)`));
    assert.match(analyticsSource, new RegExp(`utm_${utm}:`));
  }

  const eventBlock = analyticsSource.match(
    /function trackWhatsAppClick[\s\S]*?window\.gtag\?\.\("event", "whatsapp_click", event\);[\s\S]*?\n\}/,
  )?.[0] ?? "";
  assert.ok(eventBlock, "whatsapp_click helper must exist");
  assert.doesNotMatch(
    eventBlock,
    /nome|email|telefone|phone|empresa|company|mensagem|message|faturamento|revenue/i,
  );
});

test("existing page_view and generate_lead events remain present and unchanged in scope", () => {
  assert.match(analyticsSource, /"event", "page_view"/);
  assert.match(analyticsSource, /export function trackGenerateLead/);
  assert.match(analyticsSource, /"event", "generate_lead", event/);
  assert.match(analyticsSource, /function gtag\(\)[\s\S]*?push\(arguments\)/);
});
