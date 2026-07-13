import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function read(path) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}

async function exists(path) {
  await access(new URL(`../${path}`, import.meta.url));
}

test("institutional site structure preserves assessoria landing and adds the requested routes", async () => {
  await Promise.all([
    exists("src/app/_components/assessoria-comercial-page.tsx"),
    exists("src/app/_components/site-header.tsx"),
    exists("src/app/_components/site-footer.tsx"),
    exists("src/app/assessoria-comercial/page.tsx"),
    exists("src/app/servicos/page.tsx"),
    exists("src/app/sobre/page.tsx"),
    exists("src/app/materiais-impressos/page.tsx"),
    exists("src/app/blog/page.tsx"),
  ]);

  const [
    institutionalHome,
    assessoriaPage,
    assessoriaComponent,
    header,
    footer,
    placeholder,
    servicesPage,
    aboutPage,
    materialsPage,
    blogPage,
    leadRoute,
  ] = await Promise.all([
    read("src/app/page.tsx"),
    read("src/app/assessoria-comercial/page.tsx"),
    read("src/app/_components/assessoria-comercial-page.tsx"),
    read("src/app/_components/site-header.tsx"),
    read("src/app/_components/site-footer.tsx"),
    read("src/app/_components/placeholder-page.tsx"),
    read("src/app/servicos/page.tsx"),
    read("src/app/sobre/page.tsx"),
    read("src/app/materiais-impressos/page.tsx"),
    read("src/app/blog/page.tsx"),
    read("src/app/api/leads/route.ts"),
  ]);

  const homeComponents = await Promise.all([
    read("src/app/_components/home-hero.tsx"),
    read("src/app/_components/home-materiais-graficos.tsx"),
    read("src/app/_components/home-assessoria-comercial.tsx"),
    read("src/app/_components/home-blog.tsx"),
    read("src/app/_components/home-cta.tsx"),
  ]);
  const institutionalHomeSource = [institutionalHome, ...homeComponents].join("\n");

  assert.match(assessoriaComponent, /LeadForm/);
  assert.match(assessoriaComponent, /TechnologySection/);
  assert.match(assessoriaComponent, /Seu comercial n/);
  assert.match(assessoriaPage, /AssessoriaComercialPage/);

  for (const href of [
    'href: "/"',
    'href: "/#servicos"',
    'href: "/materiais-impressos"',
    'href: "/blog"',
    'href: "/sobre"',
  ]) {
    assert.match(header, new RegExp(href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.match(header, /href="\/assessoria-comercial"/);

  assert.doesNotMatch(header, /Agendar diagnostico|Agendar diagn[óo]stico/i);
  assert.match(footer, /Grupo Vittore/);
  assert.match(institutionalHomeSource, /Hub de Crescimento Empresarial/i);
  assert.match(institutionalHomeSource, /Marketing e geração de demanda/i);
  assert.match(institutionalHomeSource, /Vendas e performance comercial/i);
  assert.match(institutionalHomeSource, /Tecnologia e automação empresarial/i);
  assert.match(institutionalHomeSource, /Consultoria Empresarial/i);
  assert.match(institutionalHomeSource, /Assessoria Comercial/);
  assert.match(institutionalHomeSource, /Materiais Gráficos Personalizados/i);
  assert.match(institutionalHomeSource, /id="servicos"/);
  assert.match(institutionalHomeSource, /href="\/assessoria-comercial"/);

  assert.match(servicesPage, /PlaceholderPage/);
  assert.match(aboutPage, /PlaceholderPage/);
  assert.match(materialsPage, /PlaceholderPage/);
  assert.match(blogPage, /PlaceholderPage/);
  assert.match(placeholder, /href="\/"/);
  assert.match(placeholder, /href="\/assessoria-comercial"/);

  assert.match(leadRoute, /export async function POST\(request: Request\)/);
});
