import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "./_components/site-footer";
import { SiteHeader } from "./_components/site-header";

const materialBenefits = [
  {
    number: "01",
    title: "Presença de marca",
    description:
      "Peças que tornam a identidade da empresa reconhecível e consistente em cada contato presencial.",
  },
  {
    number: "02",
    title: "Comunicação impressa",
    description:
      "Cartões de visita, panfletos, flyers e blocos personalizados que comunicam com clareza e intenção.",
  },
  {
    number: "03",
    title: "Prospecção e relacionamento",
    description:
      "Materiais comerciais que apoiam visitas, apresentações e ações de relacionamento com clientes.",
  },
  {
    number: "04",
    title: "Personalização profissional",
    description:
      "Materiais institucionais e peças sob medida que traduzem o posicionamento da marca no mundo físico.",
  },
];

const commercialPillars = [
  {
    number: "01",
    title: "Marketing e geração de demanda",
    description:
      "Atração de oportunidades qualificadas, campanhas, posicionamento e estrutura para gerar demanda com mais intenção.",
  },
  {
    number: "02",
    title: "Vendas e performance comercial",
    description:
      "Processo, acompanhamento, método comercial, organização da jornada e melhoria contínua da conversão.",
  },
  {
    number: "03",
    title: "Tecnologia e automação empresarial",
    description:
      "CRM, automações, inteligência artificial e dados organizados para dar escala e controle à operação.",
  },
];

const articles = [
  {
    category: "Gestão comercial",
    title:
      "Como identificar gargalos comerciais antes de investir mais em tráfego",
    description:
      "Um olhar prático sobre os sinais que mostram onde as oportunidades estão se perdendo.",
  },
  {
    category: "Marca e presença",
    title: "Por que materiais gráficos ainda fortalecem a presença da marca",
    description:
      "Como o impresso amplia credibilidade e transforma contatos físicos em memória de marca.",
  },
  {
    category: "Estratégia integrada",
    title: "Marketing, vendas e tecnologia: como conectar as três áreas",
    description:
      "Os princípios para fazer demanda, processo e dados trabalharem na mesma direção.",
  },
  {
    category: "Crescimento",
    title: "O que uma empresa precisa organizar antes de escalar a aquisição",
    description:
      "As bases que sustentam uma operação comercial mais previsível antes de ampliar o investimento.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#f8f5ef] text-[#090e1f]">
      <SiteHeader />

      <section className="relative isolate border-b border-[#b29157]/20">
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(135deg,#fbf8f4_0%,#f5efe5_58%,#eee4d3_100%)]" />
        <div className="absolute -right-24 top-12 -z-10 h-[420px] w-[420px] rounded-full border border-[#b29157]/20 sm:h-[620px] sm:w-[620px]" />
        <div className="absolute -right-10 top-36 -z-10 h-[300px] w-[300px] rounded-full border border-[#b29157]/15 sm:h-[460px] sm:w-[460px]" />

        <div className="mx-auto grid w-full max-w-[1320px] gap-12 px-6 pb-20 pt-16 sm:px-10 sm:pb-24 sm:pt-20 lg:grid-cols-[minmax(0,1.3fr)_minmax(340px,0.7fr)] lg:items-center lg:gap-16 lg:px-12 lg:pb-28 lg:pt-24">
          <div className="max-w-[830px]">
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-[#b29157]" />
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#8a6a34] sm:text-sm">
                Hub de crescimento empresarial
              </p>
            </div>
            <h1 className="mt-7 max-w-[820px] font-serif text-[clamp(3rem,7.5vw,6.2rem)] font-medium leading-[0.92] tracking-[-0.025em] text-[#090e1f]">
              Grupo Vittore: crescimento, presença e estrutura para empresas que
              querem vender melhor
            </h1>
            <p className="mt-8 max-w-[750px] text-lg leading-8 text-[#3f4756] sm:text-xl sm:leading-9">
              O Grupo Vittore atua em frentes complementares para ajudar empresas
              a crescer com mais clareza, presença e controle. Unimos assessoria
              comercial, marketing e geração de demanda, vendas, tecnologia e
              automações com IA e materiais gráficos personalizados para
              fortalecer a operação e a comunicação da marca no mercado.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="#servicos"
                className="inline-flex min-h-13 items-center justify-center rounded-full bg-[#090e1f] px-7 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#fbf8f4] transition duration-300 hover:-translate-y-0.5 hover:bg-[#192238]"
              >
                Conhecer nossas frentes
              </Link>
              <Link
                href="/assessoria-comercial"
                className="inline-flex min-h-13 items-center justify-center rounded-full border border-[#9c7a40]/55 bg-white/45 px-7 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#4b3a20] transition duration-300 hover:-translate-y-0.5 hover:border-[#8a6a34] hover:bg-white/80"
              >
                Ver Assessoria Comercial
              </Link>
            </div>
          </div>

          <aside className="relative mx-auto w-full max-w-[470px] lg:mx-0">
            <div className="absolute -inset-4 -z-10 rotate-3 rounded-[42px] border border-[#b29157]/30" />
            <div className="relative overflow-hidden rounded-[36px] bg-[#070d1d] px-7 pb-8 pt-6 text-[#f9f5ed] shadow-[0_35px_90px_rgba(9,14,31,0.22)] sm:px-9 sm:pb-10">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#b29157]/20 blur-3xl" />
              <Image
                src="/brand/logotipo-principal-hero.png.png"
                alt="Símbolo do Grupo Vittore"
                width={1896}
                height={2458}
                priority
                className="relative mx-auto h-36 w-auto object-contain sm:h-44"
              />
              <p className="relative mt-5 border-t border-white/10 pt-6 text-xs font-semibold uppercase tracking-[0.28em] text-[#d8c19a]">
                Frentes complementares
              </p>
              <div className="relative mt-5 grid gap-3 text-sm leading-6 text-[#ece7dd] sm:grid-cols-2 lg:grid-cols-1">
                <p className="border-l border-[#b29157] pl-4">Assessoria Comercial</p>
                <p className="border-l border-[#b29157] pl-4">Marketing e demanda</p>
                <p className="border-l border-[#b29157] pl-4">Vendas e performance</p>
                <p className="border-l border-[#b29157] pl-4">Tecnologia e automações</p>
                <p className="border-l border-[#b29157] pl-4 sm:col-span-2 lg:col-span-1">
                  Materiais Gráficos Personalizados
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="servicos" className="scroll-mt-28 bg-[#f8f5ef] py-20 sm:py-24 lg:py-28">
        <div
          id="materiais-graficos"
          className="mx-auto w-full max-w-[1320px] scroll-mt-28 px-6 sm:px-10 lg:px-12"
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(380px,1.08fr)] lg:items-end lg:gap-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8a6a34]">
                Presença além do digital
              </p>
              <h2 className="mt-5 max-w-[620px] font-serif text-[clamp(2.7rem,5.5vw,5rem)] font-medium leading-[0.95] tracking-[-0.02em]">
                Materiais Gráficos Personalizados
              </h2>
            </div>
            <div className="max-w-[680px] lg:pb-1">
              <p className="text-lg leading-8 text-[#3f4756]">
                Para empresas, profissionais liberais e negócios que precisam
                fortalecer apresentação, presença e comunicação. Materiais
                gráficos personalizados não são apenas impressos: reforçam
                profissionalismo, aumentam credibilidade e apoiam ações
                comerciais no mundo físico.
              </p>
              <p className="mt-4 text-base leading-7 text-[#606776]">
                De cartões de visita, panfletos, flyers e blocos personalizados a
                materiais institucionais, impressos comerciais e peças de
                apresentação, cada item é pensado como uma ferramenta clássica de
                marketing e relacionamento.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-[32px] border border-[#cfbb95]/55 bg-[#cfbb95]/45 sm:grid-cols-2 lg:grid-cols-4">
            {materialBenefits.map((benefit) => (
              <article
                key={benefit.title}
                className="group min-h-[280px] bg-[#fffdf9] p-7 transition duration-300 hover:bg-[#f3eadb] sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-[0.22em] text-[#8a6a34]">
                    {benefit.number}
                  </span>
                  <span className="h-2.5 w-2.5 rotate-45 border border-[#b29157] transition group-hover:bg-[#b29157]" />
                </div>
                <h3 className="mt-14 font-serif text-3xl leading-tight">{benefit.title}</h3>
                <p className="mt-4 text-base leading-7 text-[#555d6b]">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>

          <Link
            href="/materiais-impressos"
            className="mt-9 inline-flex items-center gap-3 border-b border-[#8a6a34]/60 pb-2 text-sm font-bold uppercase tracking-[0.15em] text-[#5b4525] transition hover:border-[#090e1f] hover:text-[#090e1f]"
          >
            Conhecer materiais gráficos <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section
        id="assessoria-comercial"
        className="scroll-mt-28 bg-[#070d1d] py-20 text-[#f8f4ec] sm:py-24 lg:py-28"
      >
        <div className="mx-auto w-full max-w-[1320px] px-6 sm:px-10 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(420px,1.14fr)] lg:gap-20">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d0ad70]">
                Principal frente estratégica
              </p>
              <h2 className="mt-5 font-serif text-[clamp(2.8rem,5.6vw,5.2rem)] font-medium leading-[0.94] tracking-[-0.02em]">
                Assessoria Comercial
              </h2>
              <p className="mt-7 max-w-[570px] text-lg leading-8 text-[#d7d9df]">
                Para empresas que já possuem alguma estrutura, mas ainda sentem
                falta de previsibilidade, clareza sobre gargalos e um método para
                transformar oportunidades em receita.
              </p>
              <Link
                href="/assessoria-comercial"
                className="mt-9 inline-flex min-h-13 items-center justify-center rounded-full bg-[#b29157] px-7 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#090e1f] transition duration-300 hover:-translate-y-0.5 hover:bg-[#c7a66d]"
              >
                Conhecer Assessoria Comercial
              </Link>
            </div>

            <div className="border-l border-[#b29157]/45 pl-6 sm:pl-9">
              <p className="font-serif text-2xl leading-snug text-[#f4efe6] sm:text-3xl">
                Ter demanda sem controle, investir em marketing sem saber onde a
                venda se perde e depender de improviso são sinais de uma operação
                que precisa conectar processo, acompanhamento e tecnologia.
              </p>
              <div className="mt-8 grid gap-3 text-sm leading-6 text-[#bfc4ce] sm:grid-cols-2">
                {[
                  "Processo comercial pouco claro",
                  "Oportunidades sem acompanhamento",
                  "Marketing e vendas desconectados",
                  "Dados dispersos na operação",
                ].map((pain) => (
                  <p key={pain} className="border-t border-white/10 pt-3">{pain}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {commercialPillars.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-[28px] border border-white/10 bg-white/[0.045] p-7 sm:p-8"
              >
                <span className="text-xs font-bold tracking-[0.24em] text-[#d0ad70]">
                  {pillar.number}
                </span>
                <h3 className="mt-8 font-serif text-3xl leading-tight text-white">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-[#bdc2cc]">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="scroll-mt-28 bg-[#eee7dc] py-20 sm:py-24 lg:py-28">
        <div className="mx-auto w-full max-w-[1320px] px-6 sm:px-10 lg:px-12">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[760px]">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8a6a34]">
                Conteúdo e repertório
              </p>
              <h2 className="mt-5 font-serif text-[clamp(2.8rem,5.5vw,5rem)] font-medium leading-[0.94] tracking-[-0.02em]">
                Ideias para decisões empresariais mais claras
              </h2>
            </div>
            <p className="max-w-[430px] text-base leading-7 text-[#555d6b]">
              Conteúdos estratégicos sobre crescimento empresarial, vendas,
              marketing, tecnologia, automação, materiais gráficos e gestão
              comercial.
            </p>
          </div>

          <div className="mt-12 flex snap-x gap-5 overflow-x-auto pb-5 [scrollbar-color:#b29157_transparent] [scrollbar-width:thin]">
            {articles.map((article, index) => (
              <article
                key={article.title}
                className="group flex min-h-[390px] w-[88%] min-w-[88%] snap-start flex-col rounded-[28px] border border-[#cdb88f]/55 bg-[#faf7f1] p-7 shadow-[0_18px_50px_rgba(9,14,31,0.06)] sm:w-[48%] sm:min-w-[48%] sm:p-8 lg:w-[calc((100%_-_40px)/3)] lg:min-w-[calc((100%_-_40px)/3)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8a6a34]">
                    {article.category}
                  </p>
                  <span className="font-serif text-3xl text-[#b29157]/55">0{index + 1}</span>
                </div>
                <h3 className="mt-12 font-serif text-[2rem] leading-[1.08] text-[#090e1f]">
                  {article.title}
                </h3>
                <p className="mt-5 text-base leading-7 text-[#59606e]">
                  {article.description}
                </p>
                <Link
                  href="/blog"
                  className="mt-auto inline-flex items-center gap-3 pt-8 text-sm font-bold uppercase tracking-[0.16em] text-[#5b4525]"
                >
                  Ler artigo
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </article>
            ))}
          </div>

          <Link
            href="/blog"
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full border border-[#8a6a34]/55 px-6 py-3 text-sm font-bold uppercase tracking-[0.15em] text-[#4b3a20] transition hover:bg-[#090e1f] hover:text-white"
          >
            Acessar blog
          </Link>
        </div>
      </section>

      <section id="cta-institucional" className="bg-[#f8f5ef] py-16 sm:py-20">
        <div className="mx-auto w-full max-w-[1320px] px-6 sm:px-10 lg:px-12">
          <div className="rounded-[30px] border border-[#cdb88f]/55 bg-[#fffdf9] px-7 py-9 shadow-[0_20px_60px_rgba(9,14,31,0.07)] sm:px-10 sm:py-11 lg:flex lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-[760px]">
              <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.02]">
                Conheça a frente estratégica de crescimento comercial do Grupo Vittore
              </h2>
              <p className="mt-4 max-w-[700px] text-base leading-7 text-[#555d6b]">
                A assessoria comercial reúne marketing, vendas e tecnologia para
                empresas que precisam transformar oportunidades em receita com
                mais clareza e controle.
              </p>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:flex-col xl:flex-row">
              <Link
                href="/assessoria-comercial"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#090e1f] px-6 py-3 text-sm font-bold uppercase tracking-[0.13em] text-white transition hover:bg-[#192238]"
              >
                Ver Assessoria Comercial
              </Link>
              <Link
                href="/materiais-impressos"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#8a6a34]/50 px-6 py-3 text-sm font-bold uppercase tracking-[0.13em] text-[#4b3a20] transition hover:border-[#090e1f] hover:text-[#090e1f]"
              >
                Conhecer Materiais Gráficos
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
