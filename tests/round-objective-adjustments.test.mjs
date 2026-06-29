import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../src/app/page.tsx", import.meta.url), "utf8");
const workSection = await readFile(
  new URL("../src/app/_components/work-section.tsx", import.meta.url),
  "utf8",
);
const serviceCarousel = await readFile(
  new URL("../src/app/_components/service-carousel.tsx", import.meta.url),
  "utf8",
);
const css = await readFile(new URL("../src/app/globals.css", import.meta.url), "utf8");

const expectedServices = [
  [
    "Arquitetura de Receita",
    "/brand/2/arquitetura-receita.png.png",
    "Mapeamos como marketing, vendas, tecnologia e atendimento se conectam dentro da sua operação para criar um caminho mais claro entre oportunidade, negociação e faturamento. A ideia é organizar a estrutura que sustenta o crescimento, reduzindo desperdícios e mostrando onde cada área precisa atuar para transformar movimento em receita.",
  ],
  [
    "Processo Comercial Inteligente",
    "/brand/2/processo-comercial-inteligente.png.png",
    "Estruturamos o processo comercial para que cada oportunidade tenha direção, acompanhamento e próximo passo definido. Isso ajuda sua empresa a parar de depender do improviso, da memória do vendedor ou da cobrança constante do dono, criando mais controle sobre cada etapa da venda.",
  ],
  [
    "Demanda Qualificada",
    "/brand/2/demanda-qualificada.png.png",
    "Ajustamos a geração de demanda para atrair contatos com mais intenção de compra, e não apenas volume. O foco é fazer com que marketing deixe de gerar apenas leads soltos e passe a entregar oportunidades que o comercial consiga trabalhar com mais clareza, prioridade e chance real de fechamento.",
  ],
  [
    "Comunicação que Vende",
    "/brand/2/comunicacao-vende.png.png",
    "Aprimoramos oferta, argumentos e mensagens para que o cliente entenda com clareza o valor de escolher sua empresa. Isso envolve transformar sua comunicação em uma ferramenta comercial mais forte, capaz de gerar confiança, reduzir objeções e conduzir melhor o lead até a decisão.",
  ],
  [
    "Gestão de Leads e Follow-up",
    "/brand/2/gestao-de-leads-e-follow-up.png.png",
    "Organizamos a gestão dos leads, os retornos e o follow-up para aumentar as chances de avanço e fechamento. Cada oportunidade precisa ter continuidade, contexto e próximo passo. Sem acompanhamento, vendas boas morrem no caminho antes mesmo de chegarem à proposta.",
  ],
  [
    "Dados e Indicadores Comerciais",
    "/brand/2/dados-indicadores-comerciais.png.png",
    "Criamos uma visão clara dos números que revelam onde as vendas avançam, travam e precisam de correção. Assim, sua empresa deixa de decidir no achismo e passa a enxergar com mais precisão quais canais, etapas, vendedores e oportunidades realmente impactam o faturamento.",
  ],
  [
    "Tecnologia e Automação",
    "/brand/2/tecnologia-automação.png.png",
    "Conectamos CRM, automações e integrações para reduzir tarefas manuais e dar mais controle à operação. A tecnologia entra para organizar informações, acelerar rotinas, evitar perdas de oportunidades e permitir que o time comercial trabalhe com mais eficiência e previsibilidade.",
  ],
  [
    "Rotina de Crescimento",
    "/brand/2/rotina-de-crescimento.png.png",
    "Transformamos estratégia em uma rotina de acompanhamento, execução e melhoria contínua. O crescimento não depende de uma ação isolada, mas de análise constante, ajustes semanais, clareza de prioridades e uma operação comercial que evolui com método.",
  ],
  [
    "Direção Estratégica",
    "/brand/2/direcao-estrategica.png.png",
    "Oferecemos visão externa e direção para decisões melhores sobre marketing, vendas e tecnologia. Você não recebe apenas tarefas soltas, recebe uma leitura estratégica do que precisa ser priorizado para vender mais, desperdiçar menos oportunidades e construir uma operação mais previsível.",
  ],
];

test("section 4 adds the Marco Aurélio narrative without changing title or image references", () => {
  assert.match(page, /className="method-revenue-text"/);
  assert.match(page, /Inspirados pela visão estoica de/);
  assert.match(page, /<strong>Marco Aurélio<\/strong>/);
  assert.match(page, /<em>clareza<\/em>/);
  assert.match(page, /<em>método<\/em>/);
  assert.match(page, /<em>direção<\/em>/);
  assert.match(page, /transformar oportunidades em receita\./);
  assert.match(page, /<MethodRevenueVisual \/>/);
  assert.match(css, /\.method-revenue-complement\s*{[^}]*font-size:\s*clamp\(1\.16rem,\s*1\.42vw,\s*1\.42rem\);/s);
  assert.match(css, /\.method-revenue-complement strong,\s*\.method-revenue-complement em\s*{[^}]*color:\s*#000717;/s);
});

test("section 5 subtitle keeps the same copy but gains a wider two-line desktop measure", () => {
  assert.match(
    workSection,
    /Com uma arquitetura clara entre marketing, vendas e tecnologia,[\s\S]*?de improvisos e comece a vender com mais controle\./,
  );
  assert.match(css, /\.work-heading\s*{[^}]*max-width:\s*1240px;/s);
  assert.match(css, /\.work-heading-subtitle\s*{[^}]*max-width:\s*1160px;/s);
  assert.match(css, /\.work-heading-subtitle\s*{[^}]*line-height:\s*1\.54;/s);
  assert.match(css, /@media \(max-width: 640px\)[\s\S]*?\.work-heading-subtitle\s*{[^}]*font-size:\s*1\.08rem;[^}]*line-height:\s*1\.64;/s);
});

test("section 7 keeps service titles and images while replacing all card descriptions", () => {
  for (const [title, image, body] of expectedServices) {
    assert.match(serviceCarousel, new RegExp(`title: "${title}"`));
    assert.match(serviceCarousel, new RegExp(`image: "${image.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
    assert.match(serviceCarousel, new RegExp(`body: "${body.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
  }

  assert.match(css, /\.service-card\s*{[^}]*min-height:\s*760px;/s);
  assert.match(css, /\.service-card-copy > p:not\(\.service-card-number\)\s*{[^}]*font-size:\s*1\.22rem;/s);
  assert.match(css, /\.service-card-copy > p:not\(\.service-card-number\)\s*{[^}]*line-height:\s*1\.62;/s);
});
