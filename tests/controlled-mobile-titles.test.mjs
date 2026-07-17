import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(path) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}

test("controlled title primitives are available for editorial mobile layouts", async () => {
  const component = await read("src/app/_components/controlled-title.tsx");

  assert.match(component, /export function ControlledTitle/);
  assert.match(component, /lineClassName = "block whitespace-nowrap"/);
  assert.match(component, /export function formatDisplayNumber/);
  assert.match(component, /String\(index \+ 1\)\.padStart\(2, "0"\)/);
  assert.match(component, /white-space|whitespace-nowrap/);
  assert.match(component, /font-variant-numeric|tabular-nums/);
});

test("blog data carries SEO titles separately from controlled card lines", async () => {
  const data = await read("src/content/blog/index.ts");

  assert.match(data, /homeCardTitleMobileLines:/);
  assert.match(data, /blogCardTitleMobileLines\?:/);
  assert.match(data, /blogFeaturedTitleMobileLines:/);
  assert.match(data, /homeCard:/);
  assert.match(data, /title: "Como identificar gargalos comerciais antes de investir mais em tráfego"/);
  assert.match(data, /"Como identificar", "gargalos comerciais", "antes de investir mais", "em tráfego"/);
  assert.match(data, /"Por que materiais", "gráficos ainda fortalecem", "a presença da marca"/);
  assert.match(data, /"Marketing, vendas", "e tecnologia: como", "conectar as três áreas\."/);
  assert.match(data, /"O que uma empresa", "precisa organizar", "antes de escalar", "aquisição"/);
  assert.match(data, /"CRM não é só", "cadastro: é controle", "da operação comercial"/);
  assert.match(data, /"Crescimento previsível", "começa com clareza", "sobre o processo\."/);
});

test("Home renders six data-driven cards with indivisible display numbers", async () => {
  const homeBlog = await read("src/app/_components/home-blog.tsx");

  assert.match(homeBlog, /const articles = BLOG_POSTS/);
  assert.match(homeBlog, /homeCardTitleMobileLines/);
  assert.match(homeBlog, /homeBlogTitleMobileLines/);
  assert.match(homeBlog, /ControlledTitle lines=\{homeBlogTitleMobileLines\}/);
  assert.match(homeBlog, /formatDisplayNumber\(index\)/);
  assert.match(homeBlog, /whitespace-nowrap/);
  assert.match(homeBlog, /tabular-nums/);
  assert.match(homeBlog, /min-w-\[2ch\]/);
});

test("Home and Blog use the shared final CTA action pattern", async () => {
  const [homeCta, blogHome, actions] = await Promise.all([
    read("src/app/_components/home-cta.tsx"),
    read("src/app/_components/blog/blog-home.tsx"),
    read("src/app/_components/cta-actions.tsx"),
  ]);

  assert.match(actions, /Conhecer Assessoria Comercial/);
  assert.match(actions, /Conhecer Materiais Gráficos/);
  assert.match(actions, /min-h-24/);
  assert.match(actions, /rounded-xl/);
  assert.match(homeCta, /InstitutionalCtaActions/);
  assert.match(homeCta, /Conheça a frente/);
  assert.match(homeCta, /ControlledTitle/);
  assert.match(homeCta, /"estratégica de"/);
  assert.doesNotMatch(homeCta, /"estratégia de"/);
  assert.doesNotMatch(homeCta, /Ver Assessoria Comercial/);
  assert.match(blogHome, /InstitutionalCtaActions/);
  assert.match(blogHome, /post\.blogCardTitleMobileLines \?\?/);
  assert.doesNotMatch(blogHome, /Ver Assessoria Comercial/);
});

test("mobile hero and featured titles use exact controlled lines", async () => {
  const [hero, blogHome] = await Promise.all([
    read("src/app/_components/home-hero.tsx"),
    read("src/app/_components/blog/blog-home.tsx"),
  ]);

  for (const line of [
    "Grupo Vittore:",
    "Crescimento, presença e",
    "estrutura para empresas",
    "que querem vender",
    "melhor",
  ]) {
    assert.match(hero, new RegExp(line.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")));
  }
  assert.match(hero, /const heroTitleMobileLines = \[/);
  assert.match(hero, /const heroTitleDesktopLines = \[/);
  assert.match(hero, /lines=\{mobile \? heroTitleMobileLines : heroTitleDesktopLines\}/);
  assert.match(hero, /ControlledTitle/);
  assert.match(blogHome, /blogFeaturedTitleMobileLines/);
  assert.match(blogHome, /ControlledTitle/);
  assert.match(blogHome, /Conteúdo estratégico/);
  assert.match(blogHome, /para empresas que/);
  assert.match(blogHome, /querem crescer com/);
  assert.match(blogHome, /mais clareza/);
});

test("Brazil flag and label stay together as an indivisible inline group", async () => {
  const materials = await read("src/app/_components/home-materiais-graficos.tsx");

  assert.match(materials, /inline-flex items-center gap-2 whitespace-nowrap/);
  assert.match(
    materials,
    /inline-flex items-center gap-2 whitespace-nowrap[\s\S]*?<span>todo o<\/span>[\s\S]*?alt="Bandeira do Brasil"[\s\S]*?<span>Brasil<\/span>/,
  );
  assert.doesNotMatch(materials, /className="block sm:inline">todo o/);
});

test("documentation defines nowrap visual lines and all post title contexts", async () => {
  const [homeDocs, blogDocs] = await Promise.all([
    read("docs/home-institucional/04-direcao-visual.md"),
    read("docs/blog/04-regras-de-artigos.md"),
  ]);
  const docs = `${homeDocs}\n${blogDocs}`;

  assert.match(docs, /homeCardTitleMobileLines/);
  assert.match(docs, /blogCardTitleMobileLines/);
  assert.match(docs, /blogFeaturedTitleMobileLines/);
  assert.match(docs, /white-space: nowrap/);
  assert.match(docs, /reduzir[^\n]*font-size mobile/i);
  assert.match(docs, /375px/);
  assert.match(docs, /que querem vender[\s\S]*melhor/);
  assert.match(docs, /todo o[\s\S]*bandeira[\s\S]*Brasil/i);
  assert.match(docs, /nunca[^\n]*overflow-hidden/i);
});

test("mobile title scales keep the longest controlled lines inside 375px", async () => {
  const [hero, homeBlog, homeCta, blogHome] = await Promise.all([
    read("src/app/_components/home-hero.tsx"),
    read("src/app/_components/home-blog.tsx"),
    read("src/app/_components/home-cta.tsx"),
    read("src/app/_components/blog/blog-home.tsx"),
  ]);

  assert.match(hero, /text-\[clamp\(1\.75rem,7\.2vw,2\.2rem\)\]/);
  assert.match(homeBlog, /text-\[clamp\(1\.28rem,5\.35vw,1\.62rem\)\]/);
  assert.match(homeCta, /text-\[clamp\(1\.9rem,7\.8vw,2\.6rem\)\]/);
  assert.match(blogHome, /blog-hero-mobile-title[^\n]*text-\[clamp\(2rem,8\.8vw,2\.5rem\)\]/);
  assert.match(blogHome, /blog-highlight-title-mobile[^\n]*text-\[clamp\(1\.75rem,7vw,2\.2rem\)\]/);
});

test("equivalent Home section headings share one mobile scale", async () => {
  const [component, materials, assessoria, homeBlog] = await Promise.all([
    read("src/app/_components/controlled-title.tsx"),
    read("src/app/_components/home-materiais-graficos.tsx"),
    read("src/app/_components/home-assessoria-comercial.tsx"),
    read("src/app/_components/home-blog.tsx"),
  ]);

  assert.match(component, /export const MOBILE_SECTION_TITLE_CLASS/);
  assert.match(component, /text-\[clamp\(2rem,7vw,2\.55rem\)\]/);
  for (const source of [materials, assessoria, homeBlog]) {
    assert.match(source, /MOBILE_SECTION_TITLE_CLASS/);
  }
});
