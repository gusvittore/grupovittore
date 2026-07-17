import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(path) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}

test("Home secondary typography follows the approved mobile hierarchy", async () => {
  const [controlled, materials, assessoria, footer] = await Promise.all([
    read("src/app/_components/controlled-title.tsx"),
    read("src/app/_components/home-materiais-graficos.tsx"),
    read("src/app/_components/home-assessoria-comercial.tsx"),
    read("src/app/_components/site-footer.tsx"),
  ]);

  assert.match(controlled, /export const MOBILE_CARD_TITLE_CLASS/);
  assert.match(controlled, /text-\[1\.45rem\]/);

  assert.match(materials, /MOBILE_SECTION_TITLE_CLASS/);
  assert.match(materials, /mt-9 font-serif text-\[1\.4rem\] font-semibold/);
  assert.match(materials, /MOBILE_CARD_TITLE_CLASS/);
  assert.doesNotMatch(materials, /text-\[1\.75rem\] font-semibold leading-tight/);

  assert.match(assessoria, /MOBILE_SECTION_TITLE_CLASS/);
  assert.match(assessoria, /MOBILE_CARD_TITLE_CLASS/);
  assert.doesNotMatch(assessoria, /text-\[clamp\(2rem,3vw,3rem\)\] font-medium/);
  assert.doesNotMatch(assessoria, /text-\[1\.5rem\] font-medium/);

  assert.match(footer, /Hub de Crescimento Empresarial/);
  assert.match(footer, /mt-7 font-serif text-xl font-semibold[^\n]*sm:text-\[1\.7rem\]/);
});

test("Brazil delivery line keeps the label before the flag as one group", async () => {
  const materials = await read("src/app/_components/home-materiais-graficos.tsx");

  assert.match(
    materials,
    /inline-flex items-center gap-2 whitespace-nowrap[\s\S]*?<span>todo o Brasil<\/span>[\s\S]*?alt="Bandeira do Brasil"/,
  );
  assert.doesNotMatch(materials, /<span>todo o<\/span>/);
  assert.doesNotMatch(materials, /alt="Bandeira do Brasil"[\s\S]*?<span>Brasil<\/span>/);
});

test("Blog card and category titles use reduced mobile scales", async () => {
  const blog = await read("src/app/_components/blog/blog-home.tsx");

  assert.match(blog, /MOBILE_CARD_TITLE_CLASS/);
  assert.match(blog, /ArticleCard[\s\S]*?MOBILE_CARD_TITLE_CLASS[\s\S]*?sm:text-\[1\.55rem\]/);
  assert.match(blog, /lg:text-\[clamp\(1\.55rem,2\.5vw,2\.05rem\)\]/);
  assert.match(blog, /<h3 className="font-serif text-\[1\.8rem\] font-semibold[^\n]*sm:text-\[2\.4rem\]">\{category\}<\/h3>/);
  assert.doesNotMatch(blog, /className="mt-5 font-serif text-\[clamp\(1\.55rem,2\.5vw,2\.05rem\)\]/);
  assert.doesNotMatch(blog, /<h3 className="font-serif text-\[2\.1rem\]/);
});

test("approved main mobile titles remain unchanged", async () => {
  const [homeHero, homeBlog, blog] = await Promise.all([
    read("src/app/_components/home-hero.tsx"),
    read("src/app/_components/home-blog.tsx"),
    read("src/app/_components/blog/blog-home.tsx"),
  ]);

  assert.match(homeHero, /text-\[clamp\(1\.75rem,7\.2vw,2\.2rem\)\]/);
  assert.match(homeHero, /"que querem vender",\s*"melhor"/);
  assert.match(homeBlog, /MOBILE_SECTION_TITLE_CLASS/);
  assert.match(blog, /blog-hero-mobile-title[^\n]*text-\[clamp\(2rem,8\.8vw,2\.5rem\)\]/);
  assert.match(blog, />Últimos artigos<\/h2>/);
  assert.match(blog, />Conteúdos por categoria<\/h2>/);
});

test("documentation records the definitive secondary hierarchy", async () => {
  const [homeDocs, blogDocs] = await Promise.all([
    read("docs/home-institucional/04-direcao-visual.md"),
    read("docs/blog/04-regras-de-artigos.md"),
  ]);
  const docs = `${homeDocs}\n${blogDocs}`;

  assert.match(docs, /título principal da seção[\s\S]*subtítulo de apoio[\s\S]*título de card[\s\S]*descrição[\s\S]*texto de rodapé/i);
  assert.match(docs, /todo o Brasil \[bandeira\]/);
  assert.match(docs, /bandeira[^\n]*depois[^\n]*Brasil/i);
  assert.match(docs, /375px[\s\S]*390px[\s\S]*430px/);
});
