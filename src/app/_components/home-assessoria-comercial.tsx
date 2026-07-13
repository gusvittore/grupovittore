import Image from "next/image";
import Link from "next/link";

const commercialPillars = [
  {
    title: "Marketing e geração de demanda",
    description:
      "Atração de oportunidades qualificadas, campanhas, posicionamento e estrutura para gerar demanda com mais intenção.",
    image:
      "/assets/home-institucional/brand/sessao-3-marketing-geracao-demanda.png.png",
  },
  {
    title: "Vendas e performance comercial",
    description:
      "Processo, acompanhamento, método comercial, organização da jornada e melhoria contínua da conversão.",
    image:
      "/assets/home-institucional/brand/sessao-3-vendas-perfomance-comercial.png.png",
  },
  {
    title: "Tecnologia e automação empresarial",
    description:
      "CRM, automações, inteligência artificial e dados organizados para dar escala e controle à operação.",
    image:
      "/assets/home-institucional/brand/sessao-3-tecnologia-automacao-empresarial.png.png",
  },
] as const;

export function HomeAssessoriaComercial() {
  return (
    <section
      id="assessoria-comercial"
      className="relative isolate scroll-mt-24 overflow-hidden bg-[#000717] text-[#fbf8f4]"
    >
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_24%,rgba(35,68,105,0.23),transparent_34%),linear-gradient(145deg,#031128,#000717_55%,#020a19)]" />
      <div className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(125deg,transparent_0%,rgba(178,145,87,0.08)_50%,transparent_50%)] [background-size:17px_17px]" />

      <div className="mx-auto w-full max-w-[1500px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28 xl:px-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(330px,0.74fr)_minmax(600px,1.26fr)] lg:items-center lg:gap-16">
          <div className="max-w-[520px]">
            <div className="flex items-center gap-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#e1aa47] sm:text-sm">
                Principal frente estratégica
              </p>
              <span className="h-px flex-1 bg-[#c78a31]/75" />
            </div>
            <h2 className="mt-8 font-serif text-[clamp(3.6rem,5.6vw,5.8rem)] font-medium leading-[0.9] tracking-[-0.02em] text-[#fbf8f4]">
              Assessoria<br />Comercial
            </h2>
            <span className="mt-8 block h-0.5 w-16 bg-[#d79c3f]" />
            <p className="mt-8 text-base leading-8 text-[#e0e3e9] sm:text-lg sm:leading-9">
              Para empresas que já possuem alguma estrutura, mas ainda sentem falta de previsibilidade, clareza sobre gargalos e um método para transformar oportunidades em receita.
            </p>
            <Link
              href="/assessoria-comercial"
              className="mt-9 inline-flex min-h-15 items-center justify-center gap-5 rounded-lg bg-[linear-gradient(135deg,#f2d18b,#d3a04b)] px-7 py-4 text-sm font-extrabold uppercase tracking-[0.13em] text-[#061027] shadow-[0_16px_34px_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5"
            >
              Conhecer Assessoria Comercial <span aria-hidden="true">›</span>
            </Link>
          </div>

          <article className="overflow-hidden rounded-[20px] border border-[#b29157]/70 bg-[#06152d] shadow-[0_30px_70px_rgba(0,0,0,0.28)]">
            <div className="relative aspect-[2.25/1] min-h-[240px] overflow-hidden">
              <Image
                src="/assets/home-institucional/brand/sessao-3-diagnostico.png.png"
                alt="Análise de indicadores e diagnóstico comercial"
                fill
                sizes="(max-width: 1023px) 92vw, 760px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_62%,rgba(0,7,23,0.55))]" />
            </div>
            <div className="px-7 pb-8 pt-6 sm:px-9 sm:pb-9">
              <h3 className="font-serif text-[clamp(2rem,3vw,3rem)] font-medium leading-tight text-[#fbf8f4]">
                Diagnóstico e clareza comercial
              </h3>
              <span className="mt-4 block h-0.5 w-10 bg-[#d99d3f]" />
              <p className="mt-5 text-base leading-8 text-[#d8dce4] sm:text-lg">
                Mapeamento de gargalos, visão do processo e definição de prioridades para decisões mais seguras.
              </p>
            </div>
          </article>
        </div>

        <div className="mx-auto mt-12 max-w-[1080px] text-center">
          <span className="mx-auto block h-px w-10 bg-[#d59a3a]" />
          <p className="mt-5 text-lg leading-8 text-[#e2e4e9] sm:text-xl sm:leading-9">
            A falta de controle, o marketing e as vendas desconectados, o acompanhamento inconsistente e os dados dispersos são sinais de uma operação que precisa de processo, acompanhamento e tecnologia para gerar resultados sustentáveis.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {commercialPillars.map((pillar) => (
            <article
              key={pillar.title}
              className="group overflow-hidden rounded-[18px] border border-[#b29157]/60 bg-[#06142b]"
            >
              <div className="relative aspect-[1.75/1] overflow-hidden">
                <Image
                  src={pillar.image}
                  alt=""
                  fill
                  sizes="(max-width: 1023px) 92vw, 430px"
                  className="object-cover transition duration-500 group-hover:scale-[1.025]"
                />
              </div>
              <div className="px-6 pb-7 pt-5">
                <h3 className="font-serif text-[1.72rem] font-medium leading-tight text-[#fbf8f4] sm:text-[2rem]">
                  {pillar.title}
                </h3>
                <span className="mt-3 block h-0.5 w-10 bg-[#d99d3f]" />
                <p className="mt-4 text-base leading-7 text-[#d1d6df]">
                  {pillar.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
