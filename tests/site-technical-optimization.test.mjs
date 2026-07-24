import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const exists = (path) => access(new URL(`../${path}`, import.meta.url));

test("conservative security headers are configured without a CSP", async () => {
  const config = await read("next.config.ts");
  for (const value of [
    "X-Content-Type-Options",
    "nosniff",
    "Referrer-Policy",
    "strict-origin-when-cross-origin",
    "X-Frame-Options",
    "SAMEORIGIN",
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  ]) assert.match(config, new RegExp(value.replaceAll(/[()]/g, "\\$&")));
  assert.doesNotMatch(config, /Content-Security-Policy/);
});

test("Home mobile back redirect is route-scoped, one-shot, and loop-safe", async () => {
  const [home, redirect] = await Promise.all([
    read("src/app/page.tsx"),
    read("src/app/_components/home-mobile-back-redirect.tsx"),
  ]);
  assert.match(home, /HomeMobileBackRedirect/);
  assert.match(redirect, /^"use client";/);
  assert.match(redirect, /window\.location\.pathname !== "\/"/);
  assert.match(redirect, /const MOBILE_QUERY = "\(max-width: 767px\)"/);
  assert.match(redirect, /matchMedia\(MOBILE_QUERY\)/);
  assert.match(redirect, /grupoVittoreHomeMobileBackRedirectDone/);
  assert.match(redirect, /history\.pushState/);
  assert.match(redirect, /addEventListener\("popstate"/);
  assert.match(redirect, /removeEventListener\("popstate"/);
  assert.match(redirect, /sessionStorage\.setItem/);
  assert.match(redirect, /const REDIRECT_DESTINATION = "\/materiais-impressos"/);
  assert.match(redirect, /window\.location\.replace\(REDIRECT_DESTINATION\)/);
});

test("shared approved footer has four real social destinations and safe Instagram fallback", async () => {
  const [footer, instagram] = await Promise.all([
    read("src/app/_components/site-footer.tsx"),
    read("src/app/_components/instagram-social-link.tsx"),
  ]);
  for (const url of [
    "https://www.instagram.com/grupovittore/",
    "https://www.instagram.com/vittoreimpressos/",
    "https://www.facebook.com/grupovittore/",
    "https://www.linkedin.com/company/grupovittore",
  ]) assert.match(footer, new RegExp(url.replaceAll("/", "\\/")));
  assert.equal((footer.match(/<InstagramSocialLink/g) ?? []).length, 2);
  assert.match(footer, /Instagram Grupo Vittore/);
  assert.match(footer, /Instagram Vittore Impressos/);
  assert.match(footer, /target="_blank"/);
  assert.match(footer, /rel="noopener noreferrer"/);
  assert.match(instagram, /instagram:\/\/user\?username=/);
  assert.match(instagram, /const MOBILE_QUERY = "\(max-width: 767px\)"/);
  assert.match(instagram, /matchMedia\(MOBILE_QUERY\)/);
  assert.match(instagram, /window\.location\.assign\(href\)/);
  assert.match(instagram, /visibilitychange/);
});

test("large live artwork uses WebP while approved loading strategy stays conservative", async () => {
  const [homeHero, blogHome, materials, assessoriaCss, content, carousel] = await Promise.all([
    read("src/app/_components/home-hero.tsx"),
    read("src/app/_components/blog/blog-home-client.tsx"),
    read("src/app/materiais-impressos/page.tsx"),
    read("src/app/globals.css"),
    read("src/lib/blog/content.ts"),
    read("src/app/_components/service-carousel.tsx"),
  ]);
  assert.match(homeHero, /hero-background\.webp/);
  assert.match(blogHome, /hero-background\.webp/);
  assert.doesNotMatch(blogHome, /loading="eager"/);
  assert.match(materials, /background-hero\.webp/);
  assert.match(materials, /background-sua-marca-no-mundo-referencia3\.webp/);
  assert.match(assessoriaCss, /background-hero\.webp/);
  assert.match(assessoriaCss, /background-sessao-4\.webp/);
  assert.doesNotMatch(content, /\/assets\/blog\/articles\/[^"']+\.png(?:\.png)?/);
  assert.doesNotMatch(carousel, /\.png\.png/);
  await Promise.all([
    exists("public/assets/home-institucional/brand/hero-background.webp"),
    exists("public/assets/blog/brand/hero-background.webp"),
    exists("public/assets/assessoria-comercial/brand/3/background-hero.webp"),
    exists("public/assets/materiais-impressos/brand/background-hero.webp"),
  ]);
});
