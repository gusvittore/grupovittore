import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function read(path) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}

async function exists(path) {
  await access(new URL(`../${path}`, import.meta.url));
}

test("article card titles use one safe reusable component with an automatic fallback", async () => {
  await exists("src/app/_components/blog/article-card-title.tsx");
  const component = await read("src/app/_components/blog/article-card-title.tsx");

  assert.match(component, /export function ArticleCardTitle/);
  assert.match(component, /title: string/);
  assert.match(component, /visualLines\?: readonly string\[\]/);
  assert.match(component, /variant:/);
  for (const safeClass of [
    "min-w-0",
    "max-w-full",
    "whitespace-normal",
    "break-words",
    "[overflow-wrap:break-word]",
  ]) {
    assert.match(component, new RegExp(safeClass.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.doesNotMatch(component, /whitespace-nowrap|text-nowrap|truncate|line-clamp|overflow-hidden/);
});

test("visual title lines are optional and missing per-slug lines do not block new articles", async () => {
  const [types, content] = await Promise.all([
    read("src/lib/blog/types.ts"),
    read("src/lib/blog/content.ts"),
  ]);

  assert.match(types, /homeCardTitleMobileLines\?: readonly string\[\]/);
  assert.match(types, /blogCardTitleMobileLines\?: readonly string\[\]/);
  assert.match(types, /blogFeaturedTitleMobileLines\?: readonly string\[\]/);
  assert.doesNotMatch(content, /if \(!titleLines \|\| titleLines\.join\(" "\) !== title\)/);
});

test("Home, Blog cards, category cards, and related articles share ArticleCardTitle", async () => {
  const [home, blog, article] = await Promise.all([
    read("src/app/_components/home-blog-client.tsx"),
    read("src/app/_components/blog/blog-home-client.tsx"),
    read("src/app/blog/[slug]/page.tsx"),
  ]);
  const consumers = `${home}\n${blog}\n${article}`;

  assert.equal((consumers.match(/<ArticleCardTitle/g) ?? []).length >= 5, true);
  assert.match(home, /variant="home-carousel"/);
  assert.match(blog, /variant="featured"/);
  assert.match(blog, /variant="archive"/);
  assert.match(blog, /variant="category"/);
  assert.match(article, /variant=\{isSidebar \? "related-sidebar" : "related"\}/);

  assert.doesNotMatch(home, /<ControlledTitle lines=\{article\.homeCardTitleMobileLines\}/);
  assert.doesNotMatch(blog, /<ControlledTitle[\s\S]{0,180}(?:blogCardTitleMobileLines|blogFeaturedTitleMobileLines|homeCardTitleMobileLines)/);
});

test("article card title documentation forbids clipping and requires mobile QA", async () => {
  const docs = await Promise.all([
    read("docs/blog/artigos/06_especificacao_entrega_markdown.md"),
    read("docs/blog/artigos/09_fluxo_publicacao_hermes.md"),
  ]).then((sources) => sources.join("\n"));

  assert.match(docs, /ArticleCardTitle/);
  assert.match(docs, /títulos?[^\n]*dinâmic/i);
  assert.match(docs, /não[^\n]*(?:nowrap|white-space:\s*nowrap)/i);
  assert.match(docs, /não[^\n]*truncate/i);
  assert.match(docs, /fallback[^\n]*seguro/i);
  for (const width of ["360px", "375px", "390px", "430px"]) {
    assert.match(docs, new RegExp(width));
  }
});
