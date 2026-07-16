import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(path) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}

test("hero institucional segue a nova referência com fundo oficial e título controlado", async () => {
  const [hero, blogData] = await Promise.all([
    read("src/app/_components/home-hero.tsx"),
    read("src/content/blog/index.ts"),
  ]);

  assert.match(
    hero,
    /\/assets\/home-institucional\/brand\/hero-background\.jpg\.png/,
  );
  for (const line of [
    "Grupo Vittore:",
    "Crescimento, presença e",
    "estrutura para empresas",
    "que querem vender melhor",
  ]) {
    assert.match(hero, new RegExp(line.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")));
  }
  assert.match(hero, /ControlledTitle/);
  assert.match(hero, /heroTitleLines/);
  assert.match(hero, /lg:text-\[clamp\(3\.6rem,4\.2vw,4\.8rem\)\]/);
  assert.match(hero, /max-w-\[680px\]/);
  assert.match(hero, /sm:text-xl sm:leading-9/);
  assert.match(hero, /lg:text-\[1\.2rem\] lg:leading-9/);
  assert.doesNotMatch(hero, /font-serif text-lg/);
  assert.doesNotMatch(hero, /Ecossistema Grupo Vittore/);
});

test("materiais usa diagramação em duas linhas e os ícones oficiais de entrega", async () => {
  const materials = await read("src/app/_components/home-materiais-graficos.tsx");

  assert.match(materials, />\s*Materiais Gráficos\s*</);
  assert.match(materials, />\s*Personalizados\s*</);
  assert.match(
    materials,
    /\/assets\/home-institucional\/icons\/producao-entrega\.png\.png/,
  );
  assert.match(
    materials,
    /\/assets\/home-institucional\/icons\/bandeira-brasil\.png\.png/,
  );
  assert.doesNotMatch(materials, /function DeliveryIcon/);
  assert.doesNotMatch(materials, />◇</);
  assert.match(materials, /sm:text-xl sm:leading-9/);
  assert.doesNotMatch(materials, /h-px flex-1 bg-\[#b29157\]\/65/);
  assert.match(materials, /className="h-5 w-7 rounded-\[2px\] object-cover"/);
});

test("assessoria apresenta descrições ampliadas e remove apenas os separadores pedidos", async () => {
  const assessoria = await read("src/app/_components/home-assessoria-comercial.tsx");

  assert.match(
    assessoria,
    /Mapeamos os principais gargalos da operação comercial, identificamos onde as oportunidades estão sendo perdidas/,
  );
  assert.match(
    assessoria,
    /Estruturamos campanhas, posicionamento e jornadas para atrair oportunidades com mais intenção/,
  );
  assert.match(
    assessoria,
    /Organizamos processo, acompanhamento e método comercial para que cada oportunidade tenha direção/,
  );
  assert.match(
    assessoria,
    /Aplicamos CRM, automações, inteligência artificial e organização de dados para reduzir improvisos/,
  );
  assert.match(assessoria, /max-w-\[1240px\]/);
  assert.doesNotMatch(assessoria, /mx-auto block h-px w-10/);
  assert.doesNotMatch(assessoria, /h-px flex-1 bg-\[#c78a31\]\/75/);
});

test("blog e CTA final usam títulos controlados e descrições mais legíveis", async () => {
  const [blog, cta, blogData] = await Promise.all([
    read("src/app/_components/home-blog.tsx"),
    read("src/app/_components/home-cta.tsx"),
    read("src/content/blog/index.ts"),
  ]);

  assert.match(blog, /Blog estratégico/);
  assert.match(blog, /Conhecimento para/);
  assert.match(blog, /decisões empresariais/);
  assert.match(blog, /mais claras/);
  assert.match(
    blog,
    /O blog do Grupo Vittore reúne leitura estratégica, conteúdo prático e visão de mercado/,
  );
  assert.match(blog, /sm:text-\[clamp\(2\.8rem,4vw,4rem\)\]/);
  assert.match(blog, /font-semibold/);
  assert.match(blog, /sm:text-xl sm:leading-9/);
  assert.equal((blogData.match(/homeCardTitleMobileLines: \[/g) ?? []).length, 6);

  for (const line of [
    "Conheça a frente estratégica",
    "de crescimento comercial",
    "do Grupo Vittore.",
  ]) {
    assert.match(cta, new RegExp(`home-cta-title-line[^>]*>\\s*${line}`));
  }
  assert.match(cta, /sm:text-2xl/);
});

test("header, rodapé e documentação registram as preferências de legibilidade", async () => {
  const [header, footer, visualDirection] = await Promise.all([
    read("src/app/_components/site-header.tsx"),
    read("src/app/_components/site-footer.tsx"),
    read("docs/home-institucional/04-direcao-visual.md"),
  ]);

  assert.match(header, /lg:text-\[1\.05rem\]/);
  assert.match(footer, /Hub de Crescimento Empresarial/);
  assert.equal((footer.match(/aria-label="Instagram/g) ?? []).length, 2);
  assert.match(footer, /aria-label="Facebook"/);
  assert.match(footer, /aria-label="LinkedIn"/);
  assert.match(footer, /fill="currentColor"/);
  assert.match(footer, /lg:pt-16/);
  assert.match(
    visualDirection,
    /## Preferência de diagramação e tipografia do usuário/,
  );
  assert.match(visualDirection, /Descrições devem ser mais legíveis e um pouco maiores/);
  assert.match(
    visualDirection,
    /A mesma família tipográfica deve ser mantida nas descrições em toda a página/,
  );
  assert.match(visualDirection, /Evitar mistura visual de famílias tipográficas em descrições/);
});
