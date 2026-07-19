import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(path) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}

async function readHomeBlog() {
  const [server, client] = await Promise.all([
    read("src/app/_components/home-blog.tsx"),
    read("src/app/_components/home-blog-client.tsx"),
  ]);
  return `${server}\n${client}`;
}

async function readBlogData() {
  const [types, content] = await Promise.all([
    read("src/lib/blog/types.ts"),
    read("src/lib/blog/content.ts"),
  ]);
  return `${types}\n${content}`;
}

test("home institucional usa a copy oficial, os assets oficiais e a ordem aprovada", async () => {
  const [page, heroSource, materialsSource, assessoriaSource, blogSource, ctaSource, blogData] =
    await Promise.all([
      read("src/app/page.tsx"),
      read("src/app/_components/home-hero.tsx"),
      read("src/app/_components/home-materiais-graficos.tsx"),
      read("src/app/_components/home-assessoria-comercial.tsx"),
      readHomeBlog(),
      read("src/app/_components/home-cta.tsx"),
      readBlogData(),
    ]);
  const home = [page, heroSource, materialsSource, assessoriaSource, blogSource, ctaSource, blogData].join("\n");

  for (const marker of [
    'id="home-hero"',
    'id="materiais-graficos"',
    'id="assessoria-comercial"',
    'id="blog"',
    'id="cta-institucional"',
  ]) {
    assert.match(home, new RegExp(marker));
  }

  const hero = page.indexOf("<HomeHero />");
  const materials = page.indexOf("<HomeMateriaisGraficos />");
  const assessoria = page.indexOf("<HomeAssessoriaComercial />");
  const blog = page.indexOf("<HomeBlog />");
  const cta = page.indexOf("<HomeCta />");

  assert.ok(hero < materials);
  assert.ok(materials < assessoria);
  assert.ok(assessoria < blog);
  assert.ok(blog < cta);

  for (const copy of [
    "Produção e entrega para todo o Brasil",
    "Diagnóstico e clareza comercial",
    "Grupo Vittore.",
  ]) {
    assert.match(home, new RegExp(copy));
  }

  assert.match(heroSource, /hero-background\.jpg\.png/);
  assert.match(heroSource, /consultoria empresarial/i);
  assert.doesNotMatch(heroSource, /Ecossistema Grupo Vittore/);
  assert.match(ctaSource, /Conheça a frente estratégica/);
  assert.match(ctaSource, /de crescimento comercial/);

  for (const asset of [
    "/assets/home-institucional/brand/sessao-2-presenca-marca.png.png",
    "/assets/home-institucional/brand/sessao-2-comunicacao-impressa.png.png",
    "/assets/home-institucional/brand/sessao-2-prospeccao-relacionamento.png.png",
    "/assets/home-institucional/brand/sessao-2-personalizacao-profissional.png.png",
    "/assets/home-institucional/brand/sessao-3-diagnostico.png.png",
    "/assets/home-institucional/brand/sessao-3-marketing-geracao-demanda.png.png",
    "/assets/home-institucional/brand/sessao-3-vendas-perfomance-comercial.png.png",
    "/assets/home-institucional/brand/sessao-3-tecnologia-automacao-empresarial.png.png",
    "/assets/blog/articles/images/materiais-graficos/07-26/capa-acabamento-cartao-de-visita-profissional.png.png",
    "/assets/blog/articles/images/crescimento-empresarial/07-26/capa-empresa-pronta-para-crescer-sem-perder-controle.png",
    "/assets/blog/articles/images/crescimento-empresarial/07-26/capa-crescer-sem-processo-aumenta-caos-na-empresa.png.png",
    "/assets/blog/articles/images/gestao-comercial/07-26/capa-pipeline-comercial-etapas-que-ajudam-a-vender.png",
  ]) {
    assert.match(home, new RegExp(asset.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.doesNotMatch(home, /Agendar diagn[óo]stico/i);
});

test("header e rodape institucionais usam os logos oficiais da home", async () => {
  const [header, footer] = await Promise.all([
    read("src/app/_components/site-header.tsx"),
    read("src/app/_components/site-footer.tsx"),
  ]);

  assert.match(
    header,
    /\/assets\/home-institucional\/brand\/logotipo-principal-rodape\.png\.png/,
  );
  assert.match(
    footer,
    /\/assets\/home-institucional\/brand\/logotipo-principal-rodape\.png\.png/,
  );
  assert.match(header, /href="\/assessoria-comercial"/);
  assert.match(footer, /Grupo Vittore \| Hub de Crescimento Empresarial/);
  assert.doesNotMatch(`${header}\n${footer}`, /Agendar diagn[óo]stico/i);
});
