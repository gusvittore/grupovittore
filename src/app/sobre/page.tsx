import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "../_components/site-footer";
import { SiteHeader } from "../_components/site-header";

export const metadata: Metadata = {
  title: "Sobre o Grupo Vittore | Hub de Crescimento Empresarial",
  description:
    "Conheça o Grupo Vittore, um hub de crescimento empresarial que une materiais gráficos personalizados, assessoria comercial, consultoria, marketing, vendas e tecnologia para empresas que querem crescer com mais presença e estrutura.",
};

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-[#B29157]/24 py-11 sm:py-14">
      {eyebrow ? (
        <p className="mb-4 text-xs font-extrabold uppercase leading-5 tracking-[0.24em] text-[#B29157] sm:text-sm">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="max-w-[780px] font-serif text-[clamp(2rem,4.8vw,3.1rem)] font-medium leading-[1.02] tracking-[-0.026em] text-[#000717]">
        {title}
      </h2>
      <div className="mt-6 space-y-5 text-[1.05rem] leading-8 text-[#000717]/82 sm:text-lg sm:leading-9">
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
  children: React.ReactNode;
}) {
  return (
    <div className="border-l-2 border-[#B29157]/45 pl-5">
      <h3 className="font-serif text-[1.45rem] font-semibold leading-tight text-[#000717] sm:text-[1.72rem]">
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
          <p className="text-sm font-extrabold uppercase leading-5 tracking-[0.24em] text-[#B29157]">
            Grupo Vittore
          </p>
          <h1 className="mt-5 max-w-[820px] font-serif text-[clamp(2.55rem,7vw,4.8rem)] font-medium leading-[0.98] tracking-[-0.04em] text-[#000717]">
            Sobre o Grupo Vittore
          </h1>
          <p className="mt-7 max-w-[820px] text-xl leading-9 text-[#000717]/78 sm:text-[1.38rem] sm:leading-10">
            Um hub de crescimento empresarial criado para conectar presença, estratégia e estrutura comercial.
          </p>
          <p className="mt-7 max-w-[860px] text-[1.06rem] leading-8 text-[#000717]/82 sm:text-lg sm:leading-9">
            O Grupo Vittore nasceu para apoiar empresas que entendem que crescimento não depende apenas de divulgação, apenas de vendas ou apenas de materiais bem produzidos. Crescimento exige presença, clareza, processo, comunicação e estrutura. Por isso, reunimos frentes complementares que ajudam negócios a se apresentarem melhor, venderem com mais direção e construírem uma operação mais organizada.
          </p>
        </header>

        <Section title="Uma empresa criada para conectar presença, estratégia e crescimento">
          <p>
            O Grupo Vittore atua na interseção entre presença de marca, materiais gráficos personalizados, assessoria comercial, consultoria empresarial, marketing, vendas e tecnologia. A proposta é ajudar empresas a construir uma estrutura mais clara para crescer, comunicar melhor e transformar oportunidades em resultado.
          </p>
          <p>
            Essa visão parte de uma ideia simples: empresas crescem melhor quando conseguem alinhar a forma como se apresentam, a maneira como se comunicam, a organização do comercial e as ferramentas que sustentam a operação. Presença, profissionalismo, clareza estratégica e visão de longo prazo não são elementos isolados; juntos, eles constroem uma base mais consistente para o crescimento sustentável.
          </p>
        </Section>

        <Section title="Um hub de crescimento empresarial">
          <p>
            O Grupo Vittore se posiciona como um Hub de Crescimento Empresarial porque não atua como uma agência comum, uma gráfica comum ou uma consultoria isolada. Um hub conecta diferentes frentes para apoiar a empresa em pontos complementares da sua jornada de crescimento.
          </p>
          <p>
            Na prática, isso significa unir materiais gráficos personalizados, presença física e institucional, marketing e geração de demanda, vendas e performance comercial, tecnologia e automações, consultoria e clareza estratégica, além de conteúdo e repertório empresarial. Cada frente tem sua função, mas o valor está na conexão entre elas.
          </p>
          <p>
            Quando essas áreas conversam entre si, a comunicação se torna mais coerente, as oportunidades são melhor acompanhadas e a empresa passa a ter mais controle sobre a própria operação. O hub existe para ajudar negócios a enxergarem o crescimento com mais estrutura, e não como uma sequência de ações soltas.
          </p>
        </Section>

        <Section title="Presença de marca no digital e no mundo físico">
          <p>
            Uma marca não é percebida apenas pelo que publica na internet. Ela também é percebida em uma reunião, em uma proposta, em um material entregue ao cliente, em uma embalagem, em um atendimento presencial e em cada ponto de contato que reforça ou enfraquece sua imagem.
          </p>
          <p>
            Por isso, o Grupo Vittore entende presença como algo mais amplo do que visibilidade. Presença envolve consistência, identidade, clareza de comunicação e profissionalismo. O digital amplia alcance; o mundo físico fortalece confiança, relacionamento e percepção de valor.
          </p>
        </Section>

        <Section title="Materiais gráficos personalizados">
          <p>
            Materiais gráficos personalizados são pontos de contato físicos entre a empresa e o cliente. Eles ajudam a fortalecer a marca, transmitir profissionalismo, organizar a comunicação e criar uma presença mais consistente no mundo físico.
          </p>
          <p>
            Essa frente apoia empresas que precisam se apresentar melhor em reuniões, prospecções, atendimentos, entregas, eventos e ações comerciais. Quando bem pensados, os materiais impressos deixam de ser apenas peças de apoio e passam a comunicar cuidado, credibilidade e posicionamento.
          </p>

          <div className="mt-8 space-y-7">
            <Subtopic title="Cartão de visita">
              <p>
                O cartão de visita é usado em reuniões, visitas, networking, eventos, prospecção presencial e atendimento. Ele reforça credibilidade, facilita o contato posterior e deixa uma lembrança física da marca depois da conversa.
              </p>
            </Subtopic>

            <Subtopic title="Pastas personalizadas">
              <p>
                Pastas personalizadas organizam propostas, contratos, documentos, apresentações e materiais comerciais. Em reuniões, entregas e apresentações, elas ajudam a transmitir profissionalismo e tornam a experiência mais estruturada para quem recebe as informações.
              </p>
            </Subtopic>

            <Subtopic title="Panfletos e flyers">
              <p>
                Panfletos e flyers servem para campanhas locais, divulgação, eventos, ações comerciais e distribuição direcionada. Eles conectam a comunicação digital ao ambiente físico e ajudam a levar uma mensagem objetiva para públicos e contextos específicos.
              </p>
            </Subtopic>

            <Subtopic title="Etiquetas adesivas">
              <p>
                Etiquetas adesivas apoiam embalagens, identificação, produtos, brindes, materiais promocionais e organização interna. Elas reforçam acabamento, cuidado e percepção de marca em pequenos pontos de contato que se repetem no dia a dia.
              </p>
            </Subtopic>

            <Subtopic title="Blocos personalizados">
              <p>
                Blocos personalizados podem ser usados em reuniões, atendimento, anotações, brindes e rotina interna. Além de úteis, mantêm a marca presente no cotidiano da empresa e ajudam a reforçar identidade visual de forma prática.
              </p>
            </Subtopic>

            <Subtopic title="Materiais institucionais">
              <p>
                Materiais institucionais ajudam a apresentar a empresa, seus serviços, diferenciais e propostas em reuniões, eventos e ações comerciais. Eles dão apoio ao discurso comercial e facilitam uma comunicação mais clara sobre o que a empresa faz e como se posiciona.
              </p>
            </Subtopic>
          </div>
        </Section>

        <Section title="Assessoria comercial e estrutura de vendas">
          <p>
            A assessoria comercial é uma frente estratégica para empresas que precisam transformar oportunidades em receita com mais clareza, processo e acompanhamento. Ela ajuda a organizar a rotina comercial, reduzir improviso e criar uma leitura mais precisa sobre o que acontece entre a geração de demanda e a venda.
          </p>
          <p>
            Muitas empresas geram leads, mas não conseguem acompanhar corretamente. Outras têm vendedores ativos, mas sem processo claro. Algumas investem em marketing, mas não sabem onde as oportunidades se perdem. A assessoria comercial existe para trazer clareza sobre esses pontos e ajudar a estruturar uma operação mais acompanhável.
          </p>
          <p>
            Essa frente pode envolver diagnóstico comercial, identificação de gargalos, processo de vendas, acompanhamento de oportunidades, CRM, rotina comercial, conexão entre marketing e vendas, previsibilidade e melhoria de conversão. O objetivo é ajudar a empresa a entender melhor sua operação e vender com mais direção.
          </p>
        </Section>

        <Section title="Consultoria empresarial e clareza estratégica">
          <p>
            A consultoria empresarial atua para trazer diagnóstico, orientação e clareza estratégica. Ela ajuda o empresário a entender problemas, oportunidades, gargalos e prioridades antes de tomar decisões importantes sobre crescimento, comunicação, comercial, tecnologia ou estrutura operacional.
          </p>
          <p>
            Enquanto a assessoria tende a acompanhar a operação com mais proximidade, a consultoria atua com foco em diagnóstico, direção e tomada de decisão. Essa diferença permite olhar para o negócio com profundidade, organizar prioridades e definir caminhos mais coerentes sem transformar cada necessidade em uma ação imediata e desconectada.
          </p>
        </Section>

        <Section title="Marketing, vendas e tecnologia trabalhando juntos">
          <p>
            Marketing gera atenção, posicionamento e demanda. Vendas transforma oportunidades em relacionamento, negociação e receita. Tecnologia organiza dados, processos, automações e acompanhamento. Quando essas áreas trabalham isoladas, a empresa perde controle e passa a depender demais de esforço individual.
          </p>
          <p>
            Quando marketing, vendas e tecnologia se conectam, a operação ganha mais clareza, escala e previsibilidade. A comunicação passa a conversar melhor com o comercial, o comercial acompanha melhor as oportunidades e a tecnologia sustenta dados, rotinas e integrações que reduzem perda de informação.
          </p>
          <div className="mt-7 space-y-5">
            <Subtopic title="Marketing">
              <p>
                Apoia posicionamento, comunicação, campanhas, geração de demanda e atração de oportunidades mais coerentes com o momento e os objetivos da empresa.
              </p>
            </Subtopic>
            <Subtopic title="Vendas">
              <p>
                Organiza abordagem, relacionamento, processo, acompanhamento, negociação e conversão para que cada oportunidade tenha direção e próximo passo.
              </p>
            </Subtopic>
            <Subtopic title="Tecnologia">
              <p>
                Sustenta CRM, automações, inteligência artificial, organização de dados, integrações e eficiência operacional, dando mais visibilidade para a rotina do negócio.
              </p>
            </Subtopic>
          </div>
        </Section>

        <Section title="Para quem o Grupo Vittore existe">
          <p>
            O Grupo Vittore existe para empresas, profissionais liberais e negócios que querem se apresentar melhor, organizar sua comunicação, estruturar processos e crescer com mais clareza. A atuação faz sentido para quem entende que presença de marca, relacionamento comercial e organização interna precisam caminhar juntos.
          </p>
          <p>
            Isso inclui empresas que usam materiais impressos para prospecção, atendimento ou relacionamento; profissionais liberais que precisam transmitir mais profissionalismo; empresas que recebem leads, mas ainda não têm processo claro; negócios que querem fortalecer presença de marca; empresas que desejam conectar marketing, vendas e tecnologia; operações B2B e B2C com alguma estrutura; e negócios que querem sair do improviso.
          </p>
        </Section>

        <Section title="Como pensamos crescimento empresarial">
          <p>
            Para o Grupo Vittore, crescimento empresarial começa pelo entendimento do negócio. Antes de propor uma solução, é preciso compreender o contexto, a necessidade real e o ponto da jornada em que a empresa se encontra.
          </p>
          <p>
            A partir disso, buscamos identificar se a prioridade está na presença de marca, na comunicação impressa, na organização comercial, na clareza estratégica, na geração de demanda, em vendas ou em tecnologia. Depois, a solução é estruturada conforme o contexto da empresa, podendo envolver criação, execução, acompanhamento, ajustes e melhoria contínua.
          </p>
          <p>
            Essa forma de pensar evita soluções genéricas e ajuda a empresa a enxergar crescimento como construção de estrutura: uma combinação entre comunicação, método, presença e capacidade de acompanhar melhor as oportunidades que surgem.
          </p>
        </Section>

        <section className="border-t border-[#B29157]/24 py-12 sm:py-14">
          <h2 className="max-w-[760px] font-serif text-[clamp(2rem,4.8vw,3.15rem)] font-medium leading-[1.02] tracking-[-0.026em] text-[#000717]">
            Uma estrutura para comunicar melhor, vender melhor e crescer com mais clareza
          </h2>
          <div className="mt-6 space-y-5 text-[1.05rem] leading-8 text-[#000717]/82 sm:text-lg sm:leading-9">
            <p>
              O Grupo Vittore existe para ajudar empresas a crescerem com mais presença, clareza e estrutura. Seja por meio de materiais gráficos personalizados, assessoria comercial, consultoria empresarial, marketing, vendas ou tecnologia, a proposta é conectar estratégia e execução para que cada ponto de contato da empresa comunique melhor, venda melhor e sustente uma operação mais organizada.
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
