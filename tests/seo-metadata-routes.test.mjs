import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readOptional = (path) =>
  readFile(new URL(`../${path}`, import.meta.url), "utf8").catch(() => "");

const [sitemapSource, robotsSource] = await Promise.all([
  readOptional("src/app/sitemap.ts"),
  readOptional("src/app/robots.ts"),
]);

const publicRoutes = [
  "/",
  "/sobre",
  "/blog",
  "/assessoria-comercial",
  "/materiais-impressos",
  "/politicas-de-privacidade",
  "/termos-de-uso",
];

test("sitemap uses the canonical domain, approved public routes and the real Blog source", () => {
  assert.match(sitemapSource, /import type \{ MetadataRoute \} from "next"/);
  assert.match(sitemapSource, /const SITE_URL = "https:\/\/grupovittore\.com\.br"/);
  assert.match(sitemapSource, /getAllBlogSlugs/);
  assert.match(sitemapSource, /getBlogPostBySlug/);

  for (const route of publicRoutes) {
    assert.ok(
      sitemapSource.includes(`"${route}"`),
      `sitemap should include ${route}`,
    );
  }

  assert.match(sitemapSource, /`\$\{SITE_URL\}\/blog\/\$\{slug\}`/);
  assert.doesNotMatch(sitemapSource, /fastidious-zabaione-12d708/);
  assert.doesNotMatch(sitemapSource, /https:\/\/(?:www\.)?grupovittore\.com(?:[\s/"`]|$)/);
  assert.doesNotMatch(sitemapSource, /"\/obrigado(?:-qualificado)?"/);
  assert.doesNotMatch(sitemapSource, /"\/api\//);
});

test("robots allows public crawling, blocks technical lead routes and points to the canonical sitemap", () => {
  assert.match(robotsSource, /import type \{ MetadataRoute \} from "next"/);
  assert.match(robotsSource, /userAgent: "\*"/);
  assert.match(robotsSource, /allow: "\/"/);

  for (const route of ["/api/", "/obrigado", "/obrigado-qualificado"]) {
    assert.ok(
      robotsSource.includes(`"${route}"`),
      `robots should disallow ${route}`,
    );
  }

  assert.match(
    robotsSource,
    /sitemap: `\$\{SITE_URL\}\/sitemap\.xml`/,
  );
  assert.doesNotMatch(robotsSource, /fastidious-zabaione-12d708/);
  assert.doesNotMatch(robotsSource, /https:\/\/(?:www\.)?grupovittore\.com(?:[\s/"`]|$)/);
});
