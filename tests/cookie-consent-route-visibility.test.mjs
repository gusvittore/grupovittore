import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const [cookieConsent, analyticsSource, leadForm] = await Promise.all([
  read("src/app/_components/cookie-consent.tsx"),
  read("src/app/_components/google-analytics.tsx"),
  read("src/app/_components/lead-form.tsx"),
]);

test("cookie banner is visually hidden only on the two exact lead capture routes", () => {
  assert.match(cookieConsent, /usePathname/);
  assert.match(
    cookieConsent,
    /const COOKIE_BANNER_HIDDEN_PATHS = new Set\(\[\s*"\/assessoria-comercial",\s*"\/materiais-impressos",\s*\]\)/,
  );
  assert.match(cookieConsent, /COOKIE_BANNER_HIDDEN_PATHS\.has\(pathname\)/);
  assert.match(cookieConsent, /if \([\s\S]*?isBannerHidden[\s\S]*?\) \{\s*return null;/);

  assert.doesNotMatch(cookieConsent, /startsWith\(/);
  assert.doesNotMatch(cookieConsent, /\/blog|\/sobre|pathname === "\/"/);
});

test("GA4 remains gated only by the existing accepted consent and is not bypassed on capture routes", () => {
  assert.match(analyticsSource, /COOKIE_CONSENT_KEY = "cookie-consent-choice"/);
  assert.match(analyticsSource, /choice === "accepted" \|\| choice === "rejected"/);
  assert.match(analyticsSource, /readConsentChoice\(\) !== "accepted"\) return/);
  assert.match(analyticsSource, /const hasConsent = consentChoice === "accepted"/);
  assert.doesNotMatch(
    analyticsSource,
    /const hasConsent = consentChoice === "accepted"\s*\|\|/,
  );
});

test("lead form keeps the existing UTM, journey, API and redirect flow untouched", () => {
  assert.match(leadForm, /getLeadTrackingSnapshot\("\/assessoria-comercial"\)/);
  assert.match(leadForm, /fetch\("\/api\/leads"/);
  assert.match(leadForm, /params\.get\("utm_source"\) \|\| tracking\.utmSource/);
  assert.match(leadForm, /tracking,/);
  assert.match(leadForm, /completeLeadTrackingConversion\(\)/);
  assert.match(leadForm, /window\.location\.href = redirectTo/);
});
