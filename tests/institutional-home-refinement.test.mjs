import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(path) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}

test("institutional home follows the approved section order and content", async () => {
  const home = await read("src/app/page.tsx");

  assert.match(
    home,
    /Grupo Vittore: crescimento, presença e estrutura para empresas\s+que\s+querem vender melhor/,
  );
  assert.match(home, /materiais gráficos personalizados/i);
  assert.match(home, /Conhecer nossas frentes/);
  assert.match(home, /Ver Assessoria Comercial/);
  assert.match(home, /id="servicos"/);
  assert.match(home, /id="materiais-graficos"/);
  assert.match(home, /id="assessoria-comercial"/);
  assert.match(home, /id="blog"/);
  assert.match(home, /id="cta-institucional"/);
  assert.match(
    home,
    /<main className="min-h-screen overflow-x-clip bg-\[#f8f5ef\]/,
  );
  assert.match(home, /lg:w-\[calc\(\(100%_-_40px\)\/3\)\]/);
  assert.match(home, /lg:min-w-\[calc\(\(100%_-_40px\)\/3\)\]/);
  assert.doesNotMatch(home, /Agendar diagn[óo]stico/i);

  const materialsPosition = home.indexOf('id="materiais-graficos"');
  const assessoriaPosition = home.indexOf('id="assessoria-comercial"');
  const blogPosition = home.indexOf('id="blog"');
  const ctaPosition = home.indexOf('id="cta-institucional"');

  assert.ok(materialsPosition < assessoriaPosition);
  assert.ok(assessoriaPosition < blogPosition);
  assert.ok(blogPosition < ctaPosition);

  for (const title of [
    "Como identificar gargalos comerciais antes de investir mais em tráfego",
    "Por que materiais gráficos ainda fortalecem a presença da marca",
    "Marketing, vendas e tecnologia: como conectar as três áreas",
    "O que uma empresa precisa organizar antes de escalar a aquisição",
  ]) {
    assert.match(home, new RegExp(title));
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
