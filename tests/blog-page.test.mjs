import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function read(path) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}

async function exists(path) {
  await access(new URL(`../${path}`, import.meta.url));
}

async function readBlogHome() {
  const [server, client, types] = await Promise.all([
    read("src/app/_components/blog/blog-home.tsx"),
    read("src/app/_components/blog/blog-home-client.tsx"),
    read("src/lib/blog/types.ts"),
  ]);
  return `${server}\n${client}\n${types}`;
}

async function readBlogData() {
  const [types, content] = await Promise.all([
    read("src/lib/blog/types.ts"),
    read("src/lib/blog/content.ts"),
  ]);
  return `${types}\n${content}`;
}

test("blog home has scalable local content and editorial sections", async () => {
  const [page, blogComponent, data] = await Promise.all([
    read("src/app/blog/page.tsx"),
    readBlogHome(),
    readBlogData(),
  ]);

  assert.match(page, /metadata/);
  assert.match(page, /BlogHome/);
  assert.match(blogComponent, /useState/);
  assert.match(blogComponent, /Buscar por vendas, marketing, materiais gráficos, CRM/);
  assert.match(blogComponent, /Leitura em destaque/);
  assert.match(blogComponent, /Últimos artigos/);
  assert.match(blogComponent, /Leituras recomendadas/);
  assert.match(blogComponent, /Transforme leitura em estrutura comercial/);
  assert.match(blogComponent, /Nenhum conteúdo encontrado/);
  assert.match(data, /export type BlogPost/);
  assert.match(data, /COVER_BY_SLUG/);
  assert.match(data, /Gestão Comercial/);
  assert.match(data, /Crescimento Empresarial/);

  for (const slug of [
    "como-saber-se-a-empresa-esta-pronta-para-crescer-sem-perder-controle",
    "crm-nao-e-cadastro-gestao-comercial",
    "avaliar-qualidade-dos-leads-alem-do-custo-por-lead",
    "cartao-de-visita-com-qr-code",
  ]) {
    assert.match(data, new RegExp(slug));
  }
});

test("blog supports future content routes without creating external infrastructure", async () => {
  await Promise.all([
    exists("src/app/blog/page.tsx"),
    exists("src/content/blog/index.ts"),
    exists("docs/blog/01-brief.md"),
    exists("docs/blog/02-estrutura-blog.md"),
    exists("docs/blog/03-categorias-e-pautas.md"),
    exists("docs/blog/04-regras-de-artigos.md"),
    exists("docs/blog/05-regras-codex-hermes.md"),
  ]);

  const data = await readBlogData();
  assert.match(data, /slug:/);
  assert.doesNotMatch(data, /views|viewCount|visualiza/i);
  assert.doesNotMatch(data, /https?:\/\//);
});

test("institutional refinement keeps the home article preview, founder block, and blog hierarchy scoped", async () => {
  const [aboutPage, blogHome, blogData] = await Promise.all([
    read("src/app/sobre/page.tsx"),
    readBlogHome(),
    readBlogData(),
  ]);

  assert.match(blogData, /crm-nao-e-cadastro-gestao-comercial/);
  assert.match(blogData, /capa-crm-rotina-de-gestao-comercial\.png/);
  assert.match(aboutPage, /ceo-gustavo-asterio\.png\.png/);
  assert.match(aboutPage, /Gustavo Astério/);
  assert.match(aboutPage, /Fundador do Grupo Vittore \| Assessor de Crescimento Empresarial/);
  assert.match(blogHome, /bg-\[#031126\]/);
  assert.match(blogHome, /placeholder="Buscar por vendas, marketing, materiais gráficos, CRM\.\.\."/);
  assert.doesNotMatch(blogHome, /function CategoryPill/);
  assert.match(blogHome, /hover:bg-\[#031126\]/);
  assert.match(blogData, /capa-empresa-pronta-para-crescer-sem-perder-controle\.png/);
  assert.match(blogData, /capa-crm-rotina-de-gestao-comercial\.png/);
});

test("blog refinement keeps the editorial hierarchy and scoped sidebar system", async () => {
  const [blogHome, docs] = await Promise.all([
    readBlogHome(),
    read("docs/blog/02-estrutura-blog.md"),
  ]);

  assert.match(blogHome, /hero-background\.jpg\.png/);
  assert.match(blogHome, /bg-gradient-to-r/);
  assert.match(blogHome, /min-h-\[min\(45\.5vw,800px\)\]/);
  assert.match(blogHome, /h-px w-14 bg-\[#e3ad51\]/);
  assert.match(blogHome, /Sobre o Autor/);
  assert.match(blogHome, /Gustavo Astério/);
  assert.match(blogHome, /Fundador do Grupo Vittore e Assessor de Crescimento Empresarial/);
  assert.match(blogHome, /autor-gustavo-asterio\.png\.png/);
  assert.match(blogHome, /linkedin\.com\/in\/gustavoasterio/);
  assert.match(blogHome, /mailto:gustavo@grupovittore\.com\.br/);
  assert.doesNotMatch(blogHome, /Próximo passo/);
  assert.match(blogHome, /rounded-\[18px\] border border-\[#b29157\]\/35/);
  assert.match(blogHome, /lg:grid-cols-\[minmax\(230px,0\.42fr\)_minmax\(0,1fr\)\]/);
  assert.match(blogHome, /Arquivo editorial/);
  assert.match(blogHome, /categoryBlocks\.map/);
  assert.match(blogHome, /post\.coverImage/);
  assert.match(blogHome, /Processo comercial, acompanhamento de oportunidades/);
  assert.match(blogHome, /InstitutionalCtaActions/);

  assert.match(docs, /Sobre o Autor/);
  assert.match(docs, /2 colunas/);
  for (const reference of [
    "01-home-hero-blog-referencia.png.png",
    "02-leitura-destaque.png.png",
    "03-ultimos-artigos.png.png",
    "04-conteudos-por-categorias.png.png",
    "05-conteudo-para-operacao.png.png",
  ]) {
    assert.match(docs, new RegExp(reference.replaceAll(".", "\\.")));
  }
});

test("blog archive supports ten-post pagination and the complete editorial sidebar", async () => {
  const blogHome = await readBlogHome();
  const blogData = await readBlogData();

  assert.match(blogHome, /const PAGE_SIZE = 10/);
  assert.match(blogHome, /Math\.ceil\(latestPosts\.length \/ PAGE_SIZE\)/);
  assert.match(blogHome, /slice\(pageStart, pageStart \+ PAGE_SIZE\)/);
  assert.match(blogHome, /aria-label="Página anterior"/);
  assert.match(blogHome, /aria-label="Próxima página"/);
  assert.match(blogHome, /\{currentPage\} de \{totalPages\}/);
  assert.match(blogHome, /h-11 w-11/);
  assert.match(blogHome, /text-base font-extrabold uppercase/);
  assert.match(blogHome, /banner-sidebar-assessoria\.png\.png/);
  assert.match(blogHome, /Banner Assessoria Comercial Grupo Vittore/);
  assert.match(blogHome, /href="\/assessoria-comercial"/);
  assert.match(blogHome, /banner-sidebar-materiais-graficos-2\.png\.png/);
  assert.match(blogHome, /Banner Materiais Gráficos Personalizados Grupo Vittore/);
  assert.match(blogHome, /href="\/materiais-impressos"/);
  assert.match(blogHome, /InstitutionalCtaActions/);
  assert.match(blogHome, /h-10 w-10/);
  assert.match(blogHome, /sm:text-\[1\.02rem\]/);
  assert.match(blogHome, /sm:text-\[1\.15rem\]/);
  assert.match(blogHome, /sm:text-\[1\.1rem\]/);
  assert.match(blogData, /"crescer-sem-processo-aumenta-caos-empresa"[\s\S]*capa-crescer-sem-processo-aumenta-caos-na-empresa\.png\.png/);
});

test("blog mobile hero and editorial title composition follow the approved stacked reference", async () => {
  const [blogHome, blogData] = await Promise.all([
    readBlogHome(),
    readBlogData(),
  ]);

  assert.match(blogHome, /className="blog-hero-mobile-visual[^\"]*"/);
  assert.match(blogHome, /className="blog-hero-mobile-content[^\"]*"/);
  assert.match(blogHome, /aspect-\[1\.2\/1\]/);
  assert.match(blogHome, /className="blog-hero-mobile-title[^\"]*"/);
  assert.match(blogHome, /Conteúdo estratégico/);
  assert.match(blogHome, /para empresas que/);
  assert.match(blogHome, /querem crescer com/);
  assert.match(blogHome, /mais clareza\./);
  assert.match(blogHome, /className="blog-highlight-title-mobile[^\"]*"/);
  assert.match(blogHome, /blogFeaturedTitleMobileLines/);
  assert.match(blogData, /"Como escolher acabamento"[\s\S]*"profissional sem exagerar"[\s\S]*"no custo"/);
});
