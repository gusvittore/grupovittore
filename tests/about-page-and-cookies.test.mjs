import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(path) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}

test("sobre institucional apresenta estrutura completa, SEO e CTAs corretos", async () => {
  const aboutPage = await read("src/app/sobre/page.tsx");

  assert.match(
    aboutPage,
    /title:\s*"Sobre o Grupo Vittore \| Hub de Crescimento Empresarial"/,
  );
  assert.match(
    aboutPage,
    /Conheça o Grupo Vittore, um hub de crescimento empresarial/,
  );

  for (const marker of [
    "Sobre o Grupo Vittore",
    "Um hub de crescimento empresarial criado para conectar presença, estratégia e estrutura comercial.",
    "Uma empresa criada para conectar presença, estratégia e crescimento",
    "Um hub de crescimento empresarial",
    "Materiais gráficos personalizados",
    "Assessoria comercial e estrutura de vendas",
    "Consultoria empresarial e clareza estratégica",
    "Marketing, vendas e tecnologia trabalhando juntos",
    "Para quem o Grupo Vittore existe",
    "Como pensamos crescimento empresarial",
    "Uma estrutura para comunicar melhor, vender melhor e crescer com mais clareza",
  ]) {
    assert.match(aboutPage, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.match(aboutPage, /href="\/assessoria-comercial"/);
  assert.match(aboutPage, /href="\/materiais-impressos"/);
  assert.doesNotMatch(aboutPage, /Agendar diagn[óo]stico/i);
  assert.doesNotMatch(aboutPage, /pacotes|planos|Black|Gold|Platinum|ticket|mensalidade|investimento|preço|precos|valores/i);
  assert.match(aboutPage, /Gustavo Astério/);
  assert.match(aboutPage, /Fundador do Grupo Vittore \| Assessor de Crescimento Empresarial/);
  assert.match(aboutPage, /ceo-gustavo-asterio\.png\.png/);
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
