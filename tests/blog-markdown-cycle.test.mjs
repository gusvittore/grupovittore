import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OFFICIAL_CATEGORIES = [
  "crescimento-empresarial",
  "gestao-comercial",
  "marketing",
  "materiais-graficos",
  "tecnologia-automacoes",
  "vendas",
];

async function read(relativePath) {
  return readFile(path.join(ROOT, relativePath), "utf8");
}

async function exists(relativePath) {
  await access(path.join(ROOT, relativePath));
}

async function cycleFiles(root) {
  const files = [];

  for (const category of OFFICIAL_CATEGORIES) {
    const directory = path.join(ROOT, root, category, "07-26");
    for (const name of await readdir(directory)) {
      if (name !== ".gitkeep") files.push(path.join(directory, name));
    }
  }

  return files.sort();
}

function frontmatterValue(source, key) {
  const match = source.match(new RegExp(`^${key}:\\s*(?:"([^"]*)"|'([^']*)'|([^\\n#]*))\\s*$`, "m"));
  return match ? (match[1] ?? match[2] ?? match[3] ?? "").trim() : "";
}

test("the 07-26 editorial cycle has exactly fourteen unique real articles and covers", async () => {
  const markdownFiles = (await cycleFiles("content/blog")).filter((file) => file.endsWith(".md"));
  const coverFiles = (await cycleFiles("public/assets/blog/articles/images")).filter((file) => /\.(png|jpe?g|webp|avif)$/i.test(file));

  assert.equal(markdownFiles.length, 14);
  assert.equal(coverFiles.length, 14);

  const sources = await Promise.all(markdownFiles.map((file) => readFile(file, "utf8")));
  const slugs = sources.map((source) => frontmatterValue(source, "slug"));
  assert.equal(new Set(slugs).size, 14);
  assert.ok(slugs.every(Boolean));
  assert.ok(sources.every((source) => frontmatterValue(source, "title")));
  assert.ok(sources.every((source) => frontmatterValue(source, "coverAlt")));
});

test("the blog uses a server-only Markdown source and serializable client summaries", async () => {
  await Promise.all([
    exists("src/lib/blog/content.ts"),
    exists("src/lib/blog/types.ts"),
    exists("src/app/_components/blog/blog-home-client.tsx"),
    exists("src/app/_components/home-blog-client.tsx"),
  ]);

  const [content, types, blogServer, blogClient, homeServer, homeClient] = await Promise.all([
    read("src/lib/blog/content.ts"),
    read("src/lib/blog/types.ts"),
    read("src/app/_components/blog/blog-home.tsx"),
    read("src/app/_components/blog/blog-home-client.tsx"),
    read("src/app/_components/home-blog.tsx"),
    read("src/app/_components/home-blog-client.tsx"),
  ]);

  assert.match(content, /import "server-only"/);
  assert.match(content, /path\.join\(process\.cwd\(\), "content", "blog"\)/);
  assert.match(content, /07-26/);
  assert.match(content, /getAllBlogPosts/);
  assert.match(content, /getBlogPostBySlug/);
  assert.match(content, /COVER_BY_SLUG/);
  assert.match(types, /export type BlogPostSummary/);
  assert.match(types, /export type BlogPost =/);
  assert.match(blogServer, /getAllBlogPosts/);
  assert.match(blogServer, /<BlogHomeClient posts=\{posts\}/);
  assert.match(blogClient, /"use client"/);
  assert.match(blogClient, /posts: BlogPostSummary\[\]/);
  assert.match(homeServer, /getHomeBlogPosts/);
  assert.match(homeServer, /<HomeBlogClient articles=\{articles\}/);
  assert.match(homeClient, /"use client"/);
  assert.match(homeClient, /articles: BlogPostSummary\[\]/);
});

test("mock articles are replaced by links to the fourteen Markdown article routes", async () => {
  const [content, blogClient, homeClient] = await Promise.all([
    read("src/lib/blog/content.ts"),
    read("src/app/_components/blog/blog-home-client.tsx"),
    read("src/app/_components/home-blog-client.tsx"),
  ]);

  for (const oldSlug of [
    "gargalos-comerciais-antes-de-investir-em-trafego",
    "materiais-graficos-fortalecem-presenca-da-marca",
    "marketing-vendas-tecnologia-conectar-tres-areas",
    "organizar-antes-de-escalar-aquisicao",
    "crm-controle-da-operacao-comercial",
    "crescimento-previsivel-comeca-com-clareza",
  ]) {
    assert.doesNotMatch(content, new RegExp(oldSlug));
    assert.doesNotMatch(blogClient, new RegExp(oldSlug));
    assert.doesNotMatch(homeClient, new RegExp(oldSlug));
  }

  assert.match(blogClient, /href=\{`\/blog\/\$\{post\.slug\}`\}/);
  assert.match(homeClient, /href=\{`\/blog\/\$\{article\.slug\}`\}/);
  assert.doesNotMatch(blogClient, /href="#"/);
  assert.doesNotMatch(blogClient, /preventDefault\(\)/);
});

test("Home keeps six real cards and sends the last right-arrow click to Blog", async () => {
  const [content, homeClient] = await Promise.all([
    read("src/lib/blog/content.ts"),
    read("src/app/_components/home-blog-client.tsx"),
  ]);

  assert.match(content, /slice\(0, HOME_POST_COUNT\)/);
  assert.match(content, /const HOME_POST_COUNT = 6/);
  assert.match(homeClient, /useRouter/);
  assert.match(homeClient, /function goNext/);
  assert.match(homeClient, /activeIndex < articles\.length - 1/);
  assert.match(homeClient, /goTo\(activeIndex \+ 1\)/);
  assert.match(homeClient, /router\.push\("\/blog"\)/);
  assert.match(homeClient, /onClick=\{goNext\}/);
  assert.match(homeClient, /function scheduleActiveIndexUpdate/);
  assert.match(homeClient, /setTimeout\(updateActiveIndex, 120\)/);
  assert.match(homeClient, /onScroll=\{scheduleActiveIndexUpdate\}/);
  assert.doesNotMatch(homeClient, /onScroll=\{updateActiveIndex\}/);
  assert.match(homeClient, /const maxScrollLeft = scroller\.scrollWidth - scroller\.clientWidth/);
  assert.match(homeClient, /maxScrollLeft - scroller\.scrollLeft <= 2/);
  assert.match(homeClient, /setActiveIndex\(cards\.length - 1\)/);
  assert.doesNotMatch(homeClient, /disabled=\{activeIndex === articles\.length - 1\}/);
  assert.match(homeClient, /disabled=\{activeIndex === 0\}/);
  assert.match(homeClient, /href="\/blog"/);
});

test("Blog keeps ten-post pagination and derives all six category blocks from real posts", async () => {
  const blogClient = await read("src/app/_components/blog/blog-home-client.tsx");

  assert.match(blogClient, /const PAGE_SIZE = 10/);
  assert.match(blogClient, /Math\.ceil\(latestPosts\.length \/ PAGE_SIZE\)/);
  assert.match(blogClient, /slice\(pageStart, pageStart \+ PAGE_SIZE\)/);
  assert.match(blogClient, /OFFICIAL_BLOG_CATEGORIES/);
  assert.match(blogClient, /posts\.find\(\(post\) => post\.categorySlug === category\.slug\)/);
  assert.match(blogClient, /Conteúdos por categoria/);
  assert.match(blogClient, /Leituras recomendadas/);
});

test("individual article routes generate metadata, render Markdown, and select CTA by category", async () => {
  await Promise.all([
    exists("src/app/blog/[slug]/page.tsx"),
    exists("src/app/_components/blog/markdown-content.tsx"),
    exists("src/app/_components/blog/blog-article-cta.tsx"),
  ]);

  const [route, markdown, cta] = await Promise.all([
    read("src/app/blog/[slug]/page.tsx"),
    read("src/app/_components/blog/markdown-content.tsx"),
    read("src/app/_components/blog/blog-article-cta.tsx"),
  ]);

  assert.match(route, /generateStaticParams/);
  assert.match(route, /generateMetadata/);
  assert.match(route, /params: Promise<\{ slug: string \}>/);
  assert.match(route, /await params/);
  assert.match(route, /notFound\(\)/);
  assert.match(route, /<h1/);
  assert.match(route, /<MarkdownContent markdown=\{post\.content\}/);
  assert.match(route, /lg:grid-cols-\[minmax\(0,1fr\)_300px\]/);
  assert.match(route, /<aside className="hidden space-y-5 lg:sticky lg:top-28 lg:block lg:self-start">/);
  assert.match(route, /<div className="lg:hidden">\s*<BlogArticleCta categorySlug=\{post\.categorySlug\}/);
  assert.match(route, /<div className="hidden lg:block">\s*<BlogArticleCta categorySlug=\{post\.categorySlug\} variant="sidebar"/);
  assert.ok(route.indexOf("<BlogAuthorCard />") < route.indexOf("variant=\"sidebar\""));
  assert.ok(route.indexOf("variant=\"sidebar\"") < route.indexOf("<RelatedArticlesList relatedPosts={relatedPosts} variant=\"sidebar\" />"));
  assert.match(route, /application\/ld\+json/);
  assert.match(route, /alternates:/);
  assert.match(route, /openGraph:/);

  for (const structure of [
    /case "heading"/,
    /case "paragraph"/,
    /case "unordered-list"/,
    /case "ordered-list"/,
    /case "table"/,
    /case "blockquote"/,
    /renderInlineMarkdown/,
    /parseListItem/,
    /type="checkbox"/,
    /alignments/,
    /headingSlug/,
    /overflow-x-auto/,
    /target="_blank"/,
    /const pattern = new RegExp\(INLINE_PATTERN\.source, INLINE_PATTERN\.flags\)/,
  ]) {
    assert.match(markdown, structure);
  }
  assert.doesNotMatch(markdown, /INLINE_PATTERN\.lastIndex/);

  assert.match(cta, /categorySlug === "materiais-graficos"/);
  assert.match(cta, /variant = "flow"/);
  assert.match(cta, /variant === "sidebar"/);
  assert.match(cta, /banner-sidebar-materiais-graficos-2\.png\.png/);
  assert.match(cta, /"\/materiais-impressos" : "\/assessoria-comercial"/);
  assert.match(cta, /banner-sidebar-assessoria\.png\.png/);
  assert.match(cta, /href=\{href\}/);
});

test("related articles prefer the same category and complete from real posts", async () => {
  const content = await read("src/lib/blog/content.ts");

  assert.match(content, /const sameCategory = posts\.filter/);
  assert.match(content, /candidate\.categorySlug === post\.categorySlug/);
  assert.match(content, /const fallback = posts\.filter/);
  assert.match(content, /candidate\.categorySlug !== post\.categorySlug/);
  assert.match(content, /return \[\.\.\.sameCategory, \.\.\.fallback\]/);
  assert.match(content, /slice\(0, limit\)/);
});
