import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

function openingLink(source, hrefToken, occurrence = 0) {
  let hrefIndex = -1;
  for (let index = 0; index <= occurrence; index += 1) {
    hrefIndex = source.indexOf(hrefToken, hrefIndex + 1);
  }

  assert.ok(hrefIndex >= 0, `missing ${hrefToken}`);
  const start = source.lastIndexOf("<Link", hrefIndex);
  const end = source.indexOf(">", hrefIndex);
  assert.ok(start >= 0 && end >= 0, `missing Link opening tag for ${hrefToken}`);
  return source.slice(start, end + 1);
}

function assertNewTab(source, hrefToken, occurrence = 0) {
  const link = openingLink(source, hrefToken, occurrence);
  assert.match(link, /target="_blank"/, `${hrefToken} must open a new tab`);
  assert.match(
    link,
    /rel="noopener noreferrer"/,
    `${hrefToken} must isolate the opener and referrer`,
  );
}

test("main header and footer navigation open site areas in safe new tabs but keep same-page and legal links unchanged", async () => {
  const [header, footer] = await Promise.all([
    read("src/app/_components/site-header.tsx"),
    read("src/app/_components/site-footer.tsx"),
  ]);

  for (const source of [header, footer]) {
    assert.match(source, /target=\{item\.newTab \? "_blank" : undefined\}/);
    assert.match(
      source,
      /rel=\{item\.newTab \? "noopener noreferrer" : undefined\}/,
    );
    for (const href of ["/", "/blog", "/sobre", "/materiais-impressos"]) {
      assert.match(
        source,
        new RegExp(`href: "${href.replaceAll("/", "\\/")}"[^}]*newTab: true`),
      );
    }
    assert.match(source, /href: "\/#servicos"[^}]*newTab: false/);
  }

  assertNewTab(header, 'href="/"');
  assertNewTab(header, 'href="/assessoria-comercial"', 0);
  assertNewTab(header, 'href="/assessoria-comercial"', 1);
  assertNewTab(footer, 'href="/"');

  assert.doesNotMatch(
    openingLink(footer, 'href="/politicas-de-privacidade"'),
    /target="_blank"/,
  );
  assert.doesNotMatch(
    openingLink(footer, 'href="/termos-de-uso"'),
    /target="_blank"/,
  );
});

test("Home, Blog, article and About principal internal links use safe new tabs", async () => {
  const [
    homeHero,
    homeMaterials,
    homeAssessoria,
    homeBlog,
    ctaActions,
    blogHome,
    articlePage,
    articleCta,
    aboutPage,
  ] = await Promise.all([
    read("src/app/_components/home-hero.tsx"),
    read("src/app/_components/home-materiais-graficos.tsx"),
    read("src/app/_components/home-assessoria-comercial.tsx"),
    read("src/app/_components/home-blog-client.tsx"),
    read("src/app/_components/cta-actions.tsx"),
    read("src/app/_components/blog/blog-home-client.tsx"),
    read("src/app/blog/[slug]/page.tsx"),
    read("src/app/_components/blog/blog-article-cta.tsx"),
    read("src/app/sobre/page.tsx"),
  ]);

  assertNewTab(homeHero, 'href="/assessoria-comercial"');
  assertNewTab(homeMaterials, 'href="/materiais-impressos"');
  assertNewTab(homeAssessoria, 'href="/assessoria-comercial"');
  assertNewTab(homeBlog, "href={`/blog/${article.slug}`}");
  assertNewTab(homeBlog, 'href="/blog"');

  assertNewTab(ctaActions, 'href="/assessoria-comercial"');
  assertNewTab(ctaActions, 'href="/materiais-impressos"');

  assertNewTab(blogHome, "href={`/blog/${post.slug}`}", 0);
  assertNewTab(blogHome, "href={href}");
  assertNewTab(blogHome, "href={`/blog/${post.slug}`}", 1);

  assertNewTab(articlePage, "href={`/blog/${relatedPost.slug}`}");
  assertNewTab(articlePage, 'href="/blog"');
  assertNewTab(articleCta, "href={href}");

  assertNewTab(aboutPage, 'href="/assessoria-comercial"');
  assertNewTab(aboutPage, 'href="/materiais-impressos"');
});

test("new-tab navigation is handed off through the consent-aware tracking layer", async () => {
  const tracker = await read("src/app/_components/lead-journey-tracker.tsx");
  const tracking = await read("src/lib/lead-tracking.ts");

  assert.match(tracker, /a\[target="_blank"\]/);
  assert.match(tracker, /prepareLeadTrackingNewTab/);
  assert.match(tracking, /gv_tracking_new_tab_handoff/);
  assert.match(tracking, /window\.localStorage/);
  assert.match(tracking, /window\.sessionStorage/);
  assert.match(tracking, /hasLeadTrackingConsent\(\)/);
});
