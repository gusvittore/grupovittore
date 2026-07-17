import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ControlledTitle,
  MOBILE_SECTION_TITLE_CLASS,
} from "../_components/controlled-title";
import { SiteFooter } from "../_components/site-footer";
import { SiteHeader } from "../_components/site-header";

export const metadata: Metadata = {
  title: "Sobre o Grupo Vittore | Hub de Crescimento Empresarial",
  description:
    "Conheça a história do Grupo Vittore e como suas frentes de materiais gráficos personalizados, assessoria comercial, consultoria, marketing, vendas e tecnologia se conectam para gerar crescimento com mais clareza e estrutura.",
};

const ABOUT_HERO_MOBILE_LINES = ["Sobre o", "Grupo Vittore"] as const;
const ABOUT_FRONTS_MOBILE_LINES = [
  "As frentes que",
  "compõem o",
  "Grupo Vittore",
] as const;
const ABOUT_MATERIAIS_MOBILE_LINES = [
  "Materiais Gráficos",
  "Personalizados",
] as const;
const ABOUT_CONSULTORIA_MOBILE_LINES = [
  "Consultoria Empresarial",
  "e Planejamento",
  "Estratégico",
] as const;
const ABOUT_MARKETING_MOBILE_LINES = [
  "Marketing e Geração",
  "de Demanda",
] as const;
const ABOUT_VENDAS_MOBILE_LINES = [
  "Vendas e Performance",
  "Comercial",
] as const;
const ABOUT_TECNOLOGIA_MOBILE_LINES = ["Tecnologia", "e Automações"] as const;
const ABOUT_CONEXAO_MOBILE_LINES = [
  "Como essas frentes",
  "se conectam",
] as const;
const ABOUT_PUBLICO_MOBILE_LINES = [
  "Para quem o Grupo",
  "Vittore é indicado",
] as const;
const ABOUT_CTA_MOBILE_LINES = ["Clareza para", "o próximo passo"] as const;

const ABOUT_STORY_PARAGRAPHS = [
  "O Grupo Vittore nasceu de uma inquietação simples: muitas empresas não perdem crescimento por falta de esforço, mas por falta de clareza.",
  "Durante muito tempo, o mercado ensinou que crescer era fazer mais barulho. Mais anúncios, mais promessas, mais ferramentas, mais pressa. Mas, na prática, muitas empresas continuavam investindo, contratando, tentando vender melhor e ainda assim sem entender exatamente onde a operação perdia força.",
  "Foi dessa leitura que o Grupo Vittore começou a tomar forma. Vittore vem de vitória, em italiano. Mas não falamos de vitória como ego, disputa ou dominação. Para nós, vitória é vencer a confusão, o improviso, a decisão impulsiva e a falta de direção.",
  "A escolha de Marco Aurélio como símbolo nasce da mesma lógica. Não usamos sua imagem por estética romana ou por aparência de poder. O que nos interessa é o que ele representa: liderança com autocontrole, decisão com reflexão e ação guiada por responsabilidade.",
  "No Grupo Vittore, crescimento não começa pelo anúncio, nem por uma promessa rápida. Começa por entender o negócio. Antes de executar, analisamos. Antes de propor, diagnosticamos. Antes de escalar, organizamos.",
  "Por isso, a empresa foi construída como um hub de crescimento empresarial. Unimos marketing, vendas, tecnologia, consultoria e materiais gráficos personalizados para ajudar empresas a ganhar mais presença, clareza e estrutura.",
  "Atendemos empresas que já possuem uma operação em andamento e precisam organizar melhor o próximo passo. Negócios que querem vender melhor, comunicar com mais profissionalismo e transformar oportunidades em receita com mais controle.",
  "Nossa função não é criar movimento sem direção. É ajudar a empresa a enxergar melhor o próprio processo, encontrar gargalos, organizar prioridades e construir uma presença mais consistente no mercado.",
  "A verdadeira vitória, para o Grupo Vittore, não está no espetáculo. Está na clareza que sustenta decisões melhores, processos mais organizados e crescimento com mais consciência.",
] as const;

type TitleTag = "h1" | "h2";

type EditorialTitleProps = {
  as?: TitleTag;
  title: string;
  mobileLines?: readonly string[];
  className: string;
};

function EditorialTitle({
  as: Tag = "h2",
  title,
  mobileLines,
  className,
}: EditorialTitleProps) {
  return (
    <Tag className={className}>
      {mobileLines ? (
        <>
          <ControlledTitle className="sm:hidden" lines={mobileLines} />
          <span className="hidden sm:block">{title}</span>
        </>
      ) : (
        title
      )}
    </Tag>
  );
}

function Section({
  title,
  mobileTitleLines,
  children,
}: {
  title: string;
  mobileTitleLines?: readonly string[];
  children: ReactNode;
}) {
  return (
    <section className="border-t border-[#B29157]/24 py-11 sm:py-14">
      <EditorialTitle
        title={title}
        mobileLines={mobileTitleLines}
        className={`max-w-[780px] ${MOBILE_SECTION_TITLE_CLASS} text-[#000717] sm:text-[clamp(2rem,4.8vw,3.1rem)] sm:tracking-[-0.026em]`}
      />
      <div className="mt-6 max-w-[760px] space-y-5 text-[1.05rem] leading-8 text-[#000717]/82 sm:text-lg sm:leading-9">
        {children}
      </div>
    </section>
  );
}

function Subtopic({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="border-l-2 border-[#B29157]/45 pl-5">
      <h3 className="font-serif text-[1.3rem] font-semibold leading-[1.12] text-[#000717] sm:text-[1.72rem]">
        {title}
      </h3>
      <div className="mt-3 space-y-4 text-[1.02rem] leading-8 text-[#000717]/80 sm:text-[1.08rem] sm:leading-9">
        {children}
      </div>
    </div>
  );
}

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-[#FBF8F4] text-[#000717]">
      <SiteHeader />

      <article className="mx-auto w-full max-w-[980px] px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
        <header className="pb-12 sm:pb-14">
          <EditorialTitle
            as="h1"
            title="Sobre o Grupo Vittore"
            mobileLines={ABOUT_HERO_MOBILE_LINES}
            className="max-w-[820px] font-serif text-[clamp(2.45rem,9.6vw,3.35rem)] font-medium leading-[0.98] tracking-[-0.04em] text-[#000717] sm:text-[clamp(2.8rem,6.2vw,4.8rem)]"
          />
          <div className="mt-8 max-w-[760px] space-y-5 text-left text-[1.05rem] leading-8 text-[#000717]/82 sm:text-lg sm:leading-9">
            {ABOUT_STORY_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </header>

        <Section
          title="As frentes que compõem o Grupo Vittore"
          mobileTitleLines={ABOUT_FRONTS_MOBILE_LINES}
        >
          <p>
            O Grupo Vittore foi organizado para atuar em pontos que se reforçam. Em vez de tratar presença, comunicação, comercial e operação como áreas isoladas, reunimos frentes que ajudam a empresa a se apresentar melhor, vender com mais direção e estruturar melhor o crescimento.
          </p>
          <p>
            Cada frente tem uma função própria, mas o valor do Grupo está justamente na conexão entre elas. Quando materiais, posicionamento, marketing, vendas, tecnologia e clareza estratégica conversam, a operação deixa de depender tanto do improviso e ganha mais consistência.
          </p>
        </Section>

        <Section
          title="Materiais Gráficos Personalizados"
          mobileTitleLines={ABOUT_MATERIAIS_MOBILE_LINES}
        >
          <p>
            Materiais gráficos personalizados são pontos de contato físicos entre a empresa e o cliente. Eles ajudam a fortalecer a marca, transmitir profissionalismo, organizar a comunicação e criar uma presença mais consistente fora da tela.
          </p>
          <p>
            Essa frente apoia empresas que precisam se apresentar melhor em reuniões, prospecções, atendimentos, entregas, eventos e ações comerciais. Quando bem pensados, os materiais impressos deixam de ser apenas peças de apoio e passam a comunicar cuidado, credibilidade e posicionamento.
          </p>

          <div className="mt-8 space-y-7">
            <Subtopic title="Cartão de visita">
              <p>
                O cartão de visita continua relevante porque organiza o contato, reforça credibilidade e deixa uma lembrança física da marca depois de uma conversa importante.
              </p>
            </Subtopic>

            <Subtopic title="Pastas personalizadas">
              <p>
                Pastas personalizadas ajudam a estruturar propostas, contratos, documentos e apresentações com mais profissionalismo, especialmente em reuniões e entregas presenciais.
              </p>
            </Subtopic>

            <Subtopic title="Panfletos e flyers">
              <p>
                Panfletos e flyers conectam a comunicação digital ao ambiente físico, apoiando campanhas locais, eventos, divulgações e ações comerciais com mensagem objetiva.
              </p>
            </Subtopic>

            <Subtopic title="Etiquetas adesivas">
              <p>
                Etiquetas adesivas reforçam acabamento, identidade e cuidado em embalagens, produtos, brindes e materiais promocionais que acompanham a rotina da empresa.
              </p>
            </Subtopic>

            <Subtopic title="Blocos personalizados">
              <p>
                Blocos personalizados mantêm a marca presente em reuniões, atendimentos, anotações e brindes, unindo utilidade prática e presença institucional.
              </p>
            </Subtopic>

            <Subtopic title="Materiais institucionais">
              <p>
                Materiais institucionais apoiam a apresentação da empresa em reuniões, eventos e ações comerciais, ajudando a comunicar serviços, diferenciais e propostas com mais clareza.
              </p>
            </Subtopic>
          </div>
        </Section>

        <Section title="Assessoria Comercial" mobileTitleLines={["Assessoria Comercial"]}>
          <p>
            A assessoria comercial é uma frente estratégica para empresas que precisam transformar oportunidades em receita com mais clareza, processo e acompanhamento. Ela ajuda a organizar a rotina comercial, reduzir improviso e criar uma leitura mais precisa sobre o que acontece entre a geração de demanda e a venda.
          </p>
          <p>
            Muitas empresas geram leads, mas não conseguem acompanhar corretamente. Outras têm vendedores ativos, mas sem processo claro. Algumas investem em marketing, mas não sabem onde as oportunidades se perdem. A assessoria existe para trazer clareza sobre esses pontos e ajudar a estruturar uma operação mais acompanhável.
          </p>
        </Section>

        <Section
          title="Consultoria Empresarial e Planejamento Estratégico"
          mobileTitleLines={ABOUT_CONSULTORIA_MOBILE_LINES}
        >
          <p>
            A consultoria empresarial entra quando a empresa precisa parar, observar melhor o próprio momento e tomar decisões com mais direção. É uma frente voltada para diagnóstico, leitura de cenário, definição de prioridades e organização do próximo passo.
          </p>
          <p>
            Em vez de responder tudo com execução imediata, essa frente ajuda a entender quais movimentos fazem sentido agora, quais gargalos merecem atenção primeiro e como alinhar presença, comercial, tecnologia e operação em torno de uma estratégia mais coerente.
          </p>
        </Section>

        <Section
          title="Marketing e Geração de Demanda"
          mobileTitleLines={ABOUT_MARKETING_MOBILE_LINES}
        >
          <p>
            Marketing e geração de demanda ajudam a empresa a ganhar atenção com mais consistência e coerência. Não se trata apenas de aparecer mais, mas de comunicar melhor, atrair oportunidades mais alinhadas e sustentar um posicionamento que faça sentido para o momento do negócio.
          </p>
          <p>
            Quando essa frente funciona bem, a empresa melhora a forma como se apresenta, reduz ruído na comunicação e cria uma base mais sólida para que o comercial trabalhe com mais clareza sobre quem quer atrair e como quer ser percebida.
          </p>
        </Section>

        <Section
          title="Vendas e Performance Comercial"
          mobileTitleLines={ABOUT_VENDAS_MOBILE_LINES}
        >
          <p>
            Vendas e performance comercial dizem respeito ao processo que transforma atenção em oportunidade e oportunidade em receita. É onde abordagem, acompanhamento, negociação, registro e previsibilidade deixam de depender apenas do esforço individual.
          </p>
          <p>
            Essa frente ajuda a organizar a rotina comercial, criar critérios de acompanhamento e melhorar a leitura sobre o que realmente faz uma operação vender melhor, sem tratar crescimento como simples aumento de volume.
          </p>
        </Section>

        <Section
          title="Tecnologia e Automações"
          mobileTitleLines={ABOUT_TECNOLOGIA_MOBILE_LINES}
        >
          <p>
            Tecnologia e automações sustentam a estrutura que permite acompanhar melhor o negócio. CRM, integrações, automações, organização de dados e recursos de inteligência aplicada deixam a operação menos dependente de improviso e mais capaz de registrar o que realmente acontece.
          </p>
          <p>
            O papel dessa frente não é substituir o critério humano, mas dar suporte para decisões melhores, rotinas mais confiáveis e processos mais claros entre marketing, vendas e operação.
          </p>
        </Section>

        <Section
          title="Como essas frentes se conectam"
          mobileTitleLines={ABOUT_CONEXAO_MOBILE_LINES}
        >
          <p>
            O Grupo Vittore não foi pensado como uma soma de serviços desconectados. As frentes se complementam porque a realidade das empresas também se mistura: a forma como a marca se apresenta influencia confiança; a forma como o comercial opera influencia conversão; a forma como a tecnologia registra dados influencia clareza.
          </p>
          <p>
            Quando essas áreas conversam, a empresa ganha presença mais profissional, processo comercial mais acompanhável e decisões mais bem sustentadas. É essa conexão que transforma esforço disperso em crescimento com mais consciência.
          </p>
        </Section>

        <Section
          title="Para quem o Grupo Vittore é indicado"
          mobileTitleLines={ABOUT_PUBLICO_MOBILE_LINES}
        >
          <p>
            O Grupo Vittore faz sentido para empresas que já têm alguma operação em andamento e perceberam que crescer melhor exige mais do que intensidade. São negócios que precisam organizar prioridades, comunicar com mais profissionalismo, estruturar o comercial e ganhar mais clareza sobre o próprio processo.
          </p>
          <p>
            Isso inclui empresas que usam materiais impressos em reuniões, atendimentos ou prospecções, negócios que recebem demanda mas não acompanham bem as oportunidades, operações que querem conectar marketing, vendas e tecnologia e marcas que desejam sair do improviso sem cair em soluções genéricas.
          </p>
        </Section>

        <section className="border-t border-[#B29157]/24 py-12 sm:py-14">
          <EditorialTitle
            title="Clareza para o próximo passo"
            mobileLines={ABOUT_CTA_MOBILE_LINES}
            className={`max-w-[760px] ${MOBILE_SECTION_TITLE_CLASS} text-[#000717] sm:text-[clamp(2rem,4.8vw,3.15rem)] sm:tracking-[-0.026em]`}
          />
          <div className="mt-6 max-w-[760px] space-y-5 text-[1.05rem] leading-8 text-[#000717]/82 sm:text-lg sm:leading-9">
            <p>
              O Grupo Vittore existe para ajudar empresas a ganhar mais presença, clareza e estrutura. Quando comunicação, processo e direção caminham juntos, o crescimento deixa de depender apenas de urgência e passa a se sustentar melhor no tempo.
            </p>
            <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:flex-wrap">
              <Link
                href="/assessoria-comercial"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#B29157]/55 px-5 text-center text-sm font-extrabold uppercase tracking-[0.11em] text-[#000717] transition hover:bg-[#B29157]/12"
              >
                Conhecer Assessoria Comercial
              </Link>
              <Link
                href="/materiais-impressos"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#B29157]/55 px-5 text-center text-sm font-extrabold uppercase tracking-[0.11em] text-[#000717] transition hover:bg-[#B29157]/12"
              >
                Conhecer Materiais Gráficos
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-[#B29157]/24 py-12 sm:py-14">
          <div className="grid gap-8 rounded-[24px] border border-[#B29157]/25 bg-[#fffdf9] p-5 sm:p-7 lg:grid-cols-[minmax(220px,0.72fr)_minmax(0,1.28fr)] lg:items-center lg:gap-10 lg:p-8">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-[#031126]">
              <Image
                src="/assets/home-institucional/brand/ceo-gustavo-asterio.png.png"
                alt="Gustavo Astério, fundador do Grupo Vittore"
                fill
                sizes="(max-width: 1023px) 100vw, 280px"
                className="object-cover object-top"
              />
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase leading-5 tracking-[0.24em] text-[#B29157] sm:text-sm">
                A visão por trás do Grupo Vittore
              </p>
              <h2 className="mt-4 font-serif text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-[1.02] tracking-[-0.025em] text-[#000717]">
                Gustavo Astério
              </h2>
              <p className="mt-3 text-base font-semibold leading-7 text-[#536074] sm:text-lg sm:leading-8">
                Fundador do Grupo Vittore | Assessor de Crescimento Empresarial
              </p>
              <div className="mt-6 space-y-5 text-[1.05rem] leading-8 text-[#000717]/82 sm:text-lg sm:leading-9">
                <p>
                  Atua nas áreas de Gestão Estratégica Empresarial, Estratégia Comercial e Performance de Vendas, integrando Marketing, Vendas, Processos e Tecnologia para construir operações mais eficientes, previsíveis e escaláveis.
                </p>
                <p>
                  Sua atuação envolve planejamento estratégico, análise de mercado e vantagem competitiva, diagnóstico de gargalos comerciais, estruturação de processos e funis de vendas, gestão de indicadores de desempenho, CRM, automações e Inteligência Artificial aplicada aos negócios.
                </p>
                <p>
                  À frente do Grupo Vittore, desenvolve projetos personalizados para empresas que precisam transformar ações isoladas em uma estrutura comercial organizada, mensurável e orientada para resultados.
                </p>
              </div>
            </div>
          </div>
        </section>
      </article>

      <SiteFooter />
    </main>
  );
}
