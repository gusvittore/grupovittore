import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const [layout, analyticsSource, leadForm, cookieConsent] = await Promise.all([
  read("src/app/layout.tsx"),
  read("src/app/_components/google-analytics.tsx").catch(() => ""),
  read("src/app/_components/lead-form.tsx"),
  read("src/app/_components/cookie-consent.tsx"),
]);

test("GA4 is mounted globally but only loads after accepted cookie consent", () => {
  assert.match(cookieConsent, /cookie-consent-choice/);
  assert.match(cookieConsent, /gv-cookie-consent-changed/);
  assert.match(layout, /<GoogleAnalytics\s*\/>/);

  assert.match(analyticsSource, /"use client"/);
  assert.match(analyticsSource, /NEXT_PUBLIC_GA_MEASUREMENT_ID/);
  assert.match(analyticsSource, /G-ZCMY8FXL1N/);
  assert.match(analyticsSource, /cookie-consent-choice/);
  assert.match(analyticsSource, /gv-cookie-consent-changed/);
  assert.match(analyticsSource, /readConsentChoice\(\) !== "accepted"\) return/);
  assert.match(analyticsSource, /if \(!measurementId \|\| !hasConsent\) return null/);
  assert.match(analyticsSource, /https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=\$\{measurementId\}/);
  assert.match(analyticsSource, /send_page_view:\s*false/);
  assert.match(
    analyticsSource,
    /function gtag\(\)[\s\S]*?window\.dataLayer\?\.push\(arguments\);/,
  );
  assert.doesNotMatch(analyticsSource, /function gtag\(\.\.\.args/);
});

test("GA4 records SPA page views without using personal data", () => {
  assert.match(analyticsSource, /usePathname\(\)/);
  assert.match(analyticsSource, /useSearchParams\(\)/);
  assert.match(analyticsSource, /event", "page_view"/);
  assert.match(analyticsSource, /page_path/);
  const pageViewBlock =
    analyticsSource.match(/function trackPageView[\s\S]*?\n\}/)?.[0] ?? "";
  assert.ok(pageViewBlock, "page_view helper must exist");
  assert.doesNotMatch(
    pageViewBlock,
    /nome_completo|email|telefone|phone|whatsapp|empresa|company|mensagem|message|faturamento_mensal/iu,
  );
});

test("lead form sends generate_lead only after a successful API response and never sends PII", () => {
  assert.match(leadForm, /trackGenerateLead/);
  assert.match(
    leadForm,
    /if \(!response\.ok \|\| !result\?\.ok\)[\s\S]*?throw new Error[\s\S]*?trackGenerateLead\(/,
  );
  assert.match(leadForm, /form_name: "assessoria_comercial"/);
  assert.match(leadForm, /lead_status: getLeadStatus\(redirectTo\)/);
  assert.match(leadForm, /utm_source: params\.get\("utm_source"\) \|\| tracking\.utmSource/);
  assert.match(leadForm, /utm_medium: params\.get\("utm_medium"\) \|\| tracking\.utmMedium/);
  assert.match(leadForm, /utm_campaign: params\.get\("utm_campaign"\) \|\| tracking\.utmCampaign/);
  assert.match(leadForm, /utm_content: params\.get\("utm_content"\) \|\| tracking\.utmContent/);
  assert.match(leadForm, /utm_term: params\.get\("utm_term"\) \|\| tracking\.utmTerm/);

  const eventCall = leadForm.match(/trackGenerateLead\(\{[\s\S]*?\}\);/)?.[0] ?? "";
  assert.doesNotMatch(eventCall, /nome_completo|email|whatsapp|empresa|segmento|faturamento_mensal/i);
  assert.ok(leadForm.indexOf("trackGenerateLead(") < leadForm.indexOf("window.location.href = redirectTo"));
  assert.equal((leadForm.match(/fetch\(/g) ?? []).length, 1);
});
