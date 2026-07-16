import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(path) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}

test("controlled title primitives are available for editorial mobile layouts", async () => {
  const component = await read("src/app/_components/controlled-title.tsx");

  assert.match(component, /export function ControlledTitle/);
  assert.match(component, /export function formatDisplayNumber/);
  assert.match(component, /String\(index \+ 1\)\.padStart\(2, "0"\)/);
  assert.match(component, /white-space|whitespace-nowrap/);
  assert.match(component, /font-variant-numeric|tabular-nums/);
});

test("blog data carries SEO titles separately from controlled card lines", async () => {
  const data = await read("src/content/blog/index.ts");

  assert.match(data, /homeCardTitleMobileLines:/);
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
  assert.doesNotMatch(homeCta, /Ver Assessoria Comercial/);
  assert.match(blogHome, /InstitutionalCtaActions/);
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
    "que querem vender melhor",
  ]) {
    assert.match(hero, new RegExp(line.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")));
  }
  assert.match(hero, /ControlledTitle/);
  assert.match(blogHome, /blogFeaturedTitleMobileLines/);
  assert.match(blogHome, /ControlledTitle/);
  assert.match(blogHome, /Conteúdo estratégico/);
  assert.match(blogHome, /para empresas que/);
  assert.match(blogHome, /querem crescer com/);
  assert.match(blogHome, /mais clareza/);
});
