import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(path) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}

test("institutional home follows the approved section order and content", async () => {
  const [page, hero, materials, assessoria, blog, cta] = await Promise.all([
    read("src/app/page.tsx"),
    read("src/app/_components/home-hero.tsx"),
    read("src/app/_components/home-materiais-graficos.tsx"),
    read("src/app/_components/home-assessoria-comercial.tsx"),
    read("src/app/_components/home-blog.tsx"),
    read("src/app/_components/home-cta.tsx"),
  ]);
  const home = `${page}\n${hero}\n${materials}\n${assessoria}\n${blog}\n${cta}`;

  assert.match(
    hero,
    /Grupo Vittore: crescimento, presença e estrutura para empresas que querem vender melhor/,
  );
  assert.match(hero, /Ecossistema Grupo Vittore/);
  assert.match(hero, /Consultoria Empresarial/);
  assert.match(materials, /Produção e entrega para todo o Brasil/);
  assert.match(assessoria, /Diagnóstico e clareza comercial/);
  assert.match(home, /Conhecer nossas frentes/);
  assert.match(home, /Ver Assessoria Comercial/);
  assert.match(materials, /id="servicos"/);
  assert.match(materials, /id="materiais-graficos"/);
  assert.match(assessoria, /id="assessoria-comercial"/);
  assert.match(blog, /id="blog"/);
  assert.match(cta, /id="cta-institucional"/);
  assert.match(page, /overflow-x-clip/);
  assert.match(blog, /overflow-x-auto/);
  assert.match(blog, /shrink-0 snap-start/);
  assert.doesNotMatch(home, /Agendar diagn[óo]stico/i);

  const heroPosition = page.indexOf("<HomeHero />");
  const materialsPosition = page.indexOf("<HomeMateriaisGraficos />");
  const assessoriaPosition = page.indexOf("<HomeAssessoriaComercial />");
  const blogPosition = page.indexOf("<HomeBlog />");
  const ctaPosition = page.indexOf("<HomeCta />");

  assert.ok(heroPosition < materialsPosition);
  assert.ok(materialsPosition < assessoriaPosition);
  assert.ok(assessoriaPosition < blogPosition);
  assert.ok(blogPosition < ctaPosition);

  for (const title of [
    "Como identificar gargalos comerciais antes de investir mais em tráfego",
    "Por que materiais gráficos ainda fortalecem a presença da marca",
    "Marketing, vendas e tecnologia: como conectar as três áreas",
    "O que uma empresa precisa organizar antes de escalar aquisição",
  ]) {
    assert.match(blog, new RegExp(title));
  }
});

test("institutional header uses the official logo and exact navigation", async () => {
  const header = await read("src/app/_components/site-header.tsx");

  assert.match(header, /import Image from "next\/image"/);
  assert.match(header, /\/brand\/logotipo-principal-rodape\.png\.png/);

  for (const [label, href] of [
    ["Início", "/"],
    ["Serviços", "/#servicos"],
    ["Blog", "/blog"],
    ["Sobre", "/sobre"],
    ["Materiais Gráficos Personalizados", "/materiais-impressos"],
  ]) {
    const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const escapedHref = href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.match(
      header,
      new RegExp(`label: "${escapedLabel}",\\s*href: "${escapedHref}"`),
    );
  }

  assert.match(header, />\s*Assessoria Comercial\s*</);
  const navigationBlock = header.match(
    /const navigation = \[(.*?)\];/s,
  )?.[1];
  assert.ok(navigationBlock);
  assert.equal((navigationBlock.match(/label:/g) ?? []).length, 5);
  assert.doesNotMatch(header, /Agendar diagn[óo]stico/i);
  assert.doesNotMatch(header, /Hub de Crescimento Empresarial/);
});

test("institutional footer is complete and placeholder copy is accented", async () => {
  const [footer, placeholder, services, materials, blog, about] =
    await Promise.all([
      read("src/app/_components/site-footer.tsx"),
      read("src/app/_components/placeholder-page.tsx"),
      read("src/app/servicos/page.tsx"),
      read("src/app/materiais-impressos/page.tsx"),
      read("src/app/blog/page.tsx"),
      read("src/app/sobre/page.tsx"),
    ]);

  assert.match(footer, /\/brand\/logotipo-principal-rodape\.png\.png/);
  assert.match(footer, /Grupo Vittore \| Hub de Crescimento Empresarial/);
  assert.match(footer, /Materiais Gráficos Personalizados/);
  assert.match(footer, /Tecnologia e Automações/);
  assert.doesNotMatch(footer, /Agendar diagn[óo]stico/i);
  assert.doesNotMatch(placeholder, /Agendar diagn[óo]stico/i);
  assert.match(services, /Serviços/);
  assert.match(materials, /Materiais Gráficos/);
  assert.match(blog, /Conteúdo estratégico/);
  assert.match(about, /estratégia/);
});
