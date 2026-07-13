import Link from "next/link";

const ecosystem = [
  {
    title: "Assessoria Comercial",
    description:
      "Estratégia, processos e gestão com foco em previsibilidade e crescimento sustentável.",
    icon: "people",
    badge: null,
  },
  {
    title: "Consultoria Empresarial",
    description:
      "Clareza para decidir, diagnóstico preciso e estrutura para escalar resultados.",
    icon: "insight",
    badge: null,
  },
  {
    title: "Materiais Gráficos Personalizados",
    description:
      "Impressos personalizados com produção própria e entrega para todo o Brasil.",
    icon: "print",
    badge: "Produção e entrega para todo o Brasil",
  },
  {
    title: "Blog & Conteúdo",
    description:
      "Conteúdo estratégico e inteligência de mercado para apoiar decisões e gerar vantagem competitiva.",
    icon: "document",
    badge: null,
  },
] as const;

const proofItems = [
  {
    title: "Atuação nacional e internacional",
    description: "Presença em todo o Brasil e atendimento também para outros países.",
    icon: "globe",
  },
  {
    title: "Foco em resultados",
    description: "Processos que geram valor real e impulsionam o crescimento.",
    icon: "target",
  },
  {
    title: "Excelência e confiança",
    description: "Compromisso com desempenho, qualidade e entrega consistente.",
    icon: "shield",
  },
] as const;

type IconName = (typeof ecosystem)[number]["icon"] | (typeof proofItems)[number]["icon"];

function LineIcon({ name, className = "" }: { name: IconName; className?: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.6,
  };

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className} {...common}>
      {name === "people" ? (
        <>
          <circle cx="24" cy="16" r="6" />
          <path d="M12 36c1.5-7 5.5-11 12-11s10.5 4 12 11M7 30c1-5 4-8 9-8M41 30c-1-5-4-8-9-8" />
        </>
      ) : null}
      {name === "insight" ? (
        <>
          <circle cx="21" cy="21" r="12" />
          <path d="m30 30 10 10M14 25l5-6 4 4 7-9M29 14h4v4" />
        </>
      ) : null}
      {name === "print" ? (
        <>
          <path d="M14 18V7h20v11M13 34H8V18h32v16h-5" />
          <path d="M14 28h20v13H14zM33 23h2" />
        </>
      ) : null}
      {name === "document" ? (
        <>
          <path d="M13 6h15l8 8v28H13zM28 6v9h8M18 23h13M18 29h13M18 35h9" />
        </>
      ) : null}
      {name === "globe" ? (
        <>
          <circle cx="24" cy="24" r="18" />
          <path d="M6 24h36M24 6c6 5 8 11 8 18s-2 13-8 18c-6-5-8-11-8-18s2-13 8-18Z" />
        </>
      ) : null}
      {name === "target" ? (
        <>
          <circle cx="24" cy="24" r="17" />
          <circle cx="24" cy="24" r="8" />
          <circle cx="24" cy="24" r="2" />
          <path d="M24 2v5M24 41v5M2 24h5M41 24h5" />
        </>
      ) : null}
      {name === "shield" ? (
        <>
          <path d="M24 5c5 4 10 5 16 6v11c0 10-5 17-16 22C13 39 8 32 8 22V11c6-1 11-2 16-6Z" />
          <path d="m16 24 5 5 11-12" />
        </>
      ) : null}
    </svg>
  );
}

export function HomeHero() {
  return (
    <section
      id="home-hero"
      className="relative isolate overflow-hidden bg-[#000717] text-[#fbf8f4]"
    >
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_66%_36%,rgba(31,71,116,0.32),transparent_33%),linear-gradient(135deg,#031127_0%,#000717_55%,#020b1d_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-25 [background-image:linear-gradient(135deg,transparent_0%,rgba(178,145,87,0.08)_50%,transparent_50%)] [background-size:15px_15px]" />
      <div className="absolute -bottom-40 -left-36 -z-10 h-[540px] w-[540px] rounded-full border border-[#b29157]/10" />

      <div className="mx-auto grid w-full max-w-[1500px] gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,0.82fr)_minmax(610px,1.18fr)] lg:items-center lg:gap-10 lg:px-12 lg:py-16 xl:px-16">
        <div className="max-w-[650px] lg:py-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d9a94e] sm:text-sm">
            Hub de Crescimento Empresarial
          </p>
          <span className="mt-5 block h-px w-11 bg-[#d9a94e]" />
          <h1 className="mt-8 font-serif text-[clamp(3rem,5.35vw,5.6rem)] font-medium leading-[0.98] tracking-[-0.025em] text-[#fbf8f4]">
            Grupo Vittore: crescimento, presença e estrutura para empresas que querem vender melhor.
          </h1>
          <span className="mt-8 block h-0.5 w-14 bg-[#d9a94e]" />
          <p className="mt-8 max-w-[620px] text-base leading-8 text-[#e2e4e9] sm:text-lg sm:leading-9">
            O Grupo Vittore atua em frentes complementares para ajudar empresas a crescer com mais clareza, presença e controle. Unimos assessoria comercial, consultoria empresarial, materiais gráficos personalizados, produção e entrega para todo o Brasil, além de conteúdo estratégico para fortalecer a operação e a comunicação da marca no mercado.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Link
              href="#servicos"
              className="inline-flex min-h-15 items-center justify-center gap-4 rounded-lg bg-[linear-gradient(135deg,#f4d48e,#d8a64f)] px-7 py-4 text-center text-xs font-extrabold uppercase tracking-[0.12em] text-[#000717] shadow-[0_14px_38px_rgba(178,145,87,0.2)] transition hover:-translate-y-0.5 sm:text-sm"
            >
              Conhecer nossas frentes <span aria-hidden="true">›</span>
            </Link>
            <Link
              href="/assessoria-comercial"
              className="inline-flex min-h-15 items-center justify-center gap-4 rounded-lg border border-[#d9a94e] px-7 py-4 text-center text-xs font-extrabold uppercase tracking-[0.11em] text-[#e6b860] transition hover:-translate-y-0.5 hover:bg-[#b29157]/10 sm:text-sm"
            >
              Ver Assessoria Comercial <span aria-hidden="true">›</span>
            </Link>
          </div>
        </div>

        <aside className="overflow-hidden rounded-[24px] border border-[#c89239] bg-[#05142b]/88 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:p-6">
          <div className="flex items-center gap-4 px-2 pb-5 pt-2 text-center sm:px-5">
            <span className="h-px flex-1 bg-[#b29157]/70" />
            <h2 className="font-serif text-lg uppercase tracking-[0.2em] text-[#e3b55e] sm:text-xl">
              Ecossistema Grupo Vittore
            </h2>
            <span className="h-px flex-1 bg-[#b29157]/70" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {ecosystem.map((item) => (
              <article
                key={item.title}
                className="flex min-h-[255px] flex-col items-center rounded-[18px] border border-[#b29157]/55 bg-[linear-gradient(145deg,rgba(13,38,66,0.88),rgba(2,14,35,0.84))] px-5 py-7 text-center"
              >
                <LineIcon name={item.icon} className="h-14 w-14 text-[#e5ab42]" />
                <h3 className="mt-4 max-w-[280px] text-sm font-bold uppercase leading-6 tracking-[0.16em] text-white sm:text-base">
                  {item.title}
                </h3>
                <span className="mt-4 h-px w-10 bg-[#d9a94e]" />
                <p className="mt-4 max-w-[300px] text-sm leading-6 text-[#d8dce4]">
                  {item.description}
                </p>
                {item.badge ? (
                  <p className="mt-auto rounded-lg border border-[#b29157]/70 px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.13em] text-[#e3ae4e]">
                    {item.badge}
                  </p>
                ) : null}
              </article>
            ))}
          </div>

          <div className="mt-5 grid border-t border-[#b29157]/45 pt-5 md:grid-cols-3">
            {proofItems.map((item, index) => (
              <article
                key={item.title}
                className={`flex gap-4 px-4 py-4 ${index ? "md:border-l md:border-[#b29157]/35" : ""}`}
              >
                <LineIcon name={item.icon} className="h-11 w-11 flex-none text-[#e5ab42]" />
                <div>
                  <h3 className="text-[0.68rem] font-bold uppercase leading-5 tracking-[0.08em] text-[#e6b860]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-[#c9ced8]">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
