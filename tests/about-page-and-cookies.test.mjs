import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(path) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}

test("sobre institucional abre com storytelling editorial, sem subtítulos genéricos, e mantém SEO/CTAs corretos", async () => {
  const aboutPage = await read("src/app/sobre/page.tsx");

  assert.match(
    aboutPage,
    /title:\s*"Sobre o Grupo Vittore \| Hub de Crescimento Empresarial"/,
  );
  assert.match(
    aboutPage,
    /Conheça a história do Grupo Vittore e como suas frentes/,
  );

  for (const marker of [
    "Sobre o Grupo Vittore",
    "O Grupo Vittore nasceu de uma inquietação simples: muitas empresas não perdem crescimento por falta de esforço, mas por falta de clareza.",
    "Vittore vem de vitória, em italiano.",
    "A escolha de Marco Aurélio como símbolo nasce da mesma lógica.",
    "Por isso, a empresa foi construída como um hub de crescimento empresarial.",
    "Materiais Gráficos Personalizados",
    "Assessoria Comercial",
    "Consultoria Empresarial e Planejamento Estratégico",
    "Marketing e Geração de Demanda",
    "Vendas e Performance Comercial",
    "Tecnologia e Automações",
    "Para quem o Grupo Vittore é indicado",
    "Como essas frentes se conectam",
  ]) {
    assert.match(aboutPage, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.doesNotMatch(
    aboutPage,
    /Um hub de crescimento empresarial criado para conectar presença, estratégia e estrutura comercial\.|Uma empresa criada para conectar presença, estratégia e crescimento/i,
  );
  assert.doesNotMatch(aboutPage, /arquétipo/i);

  assert.match(aboutPage, /href="\/assessoria-comercial"/);
  assert.match(aboutPage, /href="\/materiais-impressos"/);
  assert.doesNotMatch(aboutPage, /Agendar diagn[óo]stico/i);
  assert.doesNotMatch(aboutPage, /pacotes|planos|Black|Gold|Platinum|ticket|mensalidade|investimento|preço|precos|valores/i);
  assert.match(aboutPage, /Gustavo Astério/);
  assert.match(aboutPage, /Fundador do Grupo Vittore \| Assessor de Crescimento Empresarial/);
  assert.match(aboutPage, /ceo-gustavo-asterio\.png\.png/);
});

test("sobre institucional controla títulos longos no mobile para evitar quebras ruins", async () => {
  const aboutPage = await read("src/app/sobre/page.tsx");

  assert.match(aboutPage, /ControlledTitle/);
  assert.match(
    aboutPage,
    /const ABOUT_HERO_MOBILE_LINES = \[\s*"Sobre o",\s*"Grupo Vittore"\s*,?\s*\] as const/,
  );
  assert.match(
    aboutPage,
    /const ABOUT_CONSULTORIA_MOBILE_LINES = \[\s*"Consultoria Empresarial",\s*"e Planejamento",\s*"Estratégico"\s*,?\s*\] as const/,
  );
  assert.match(
    aboutPage,
    /const ABOUT_MATERIAIS_MOBILE_LINES = \[\s*"Materiais Gráficos",\s*"Personalizados"\s*,?\s*\] as const/,
  );
  assert.match(
    aboutPage,
    /const ABOUT_MARKETING_MOBILE_LINES = \[\s*"Marketing e Geração",\s*"de Demanda"\s*,?\s*\] as const/,
  );
  assert.match(
    aboutPage,
    /const ABOUT_VENDAS_MOBILE_LINES = \[\s*"Vendas e Performance",\s*"Comercial"\s*,?\s*\] as const/,
  );
  assert.match(
    aboutPage,
    /const ABOUT_TECNOLOGIA_MOBILE_LINES = \[\s*"Tecnologia",\s*"e Automações"\s*,?\s*\] as const/,
  );
  assert.match(aboutPage, /<ControlledTitle className="sm:hidden" lines=\{mobileLines\} \/>/);
});

test("cookie consent existe como client component e layout o renderiza uma única vez", async () => {
  const [cookieConsent, layout] = await Promise.all([
    read("src/app/_components/cookie-consent.tsx"),
    read("src/app/layout.tsx"),
  ]);

  assert.match(cookieConsent, /^"use client";/m);
  assert.match(cookieConsent, /localStorage/);
  assert.match(cookieConsent, /useSyncExternalStore|useEffect/);
  assert.match(cookieConsent, /Aceitar/);
  assert.match(cookieConsent, /Recusar/);
  assert.match(cookieConsent, /\/politicas-de-privacidade/);
  assert.match(cookieConsent, /cookie-consent-choice/);
  assert.match(layout, /<CookieConsent \/>/);
});

test("header e rodapé recebem os pequenos ajustes globais sem mudar os links", async () => {
  const [header, footer] = await Promise.all([
    read("src/app/_components/site-header.tsx"),
    read("src/app/_components/site-footer.tsx"),
  ]);

  assert.match(header, /lg:text-\[1\.05rem\]/);
  assert.match(header, /href: "\/"/);
  assert.match(header, /href: "\/#servicos"/);
  assert.match(header, /href: "\/blog"/);
  assert.match(header, /href: "\/sobre"/);
  assert.match(header, /href: "\/materiais-impressos"/);
  assert.match(footer, /lg:pt-16/);
  assert.equal((footer.match(/lg:pt-16/g) ?? []).length, 2);
});
