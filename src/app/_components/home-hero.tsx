import Image from "next/image";
import Link from "next/link";

export function HomeHero() {
  return (
    <section
      id="home-hero"
      className="relative isolate min-h-[780px] overflow-hidden bg-[#000717] text-[#fbf8f4] lg:min-h-[calc(100svh-96px)]"
    >
      <Image
        src="/assets/home-institucional/brand/hero-background.jpg.png"
        alt="Escritório do Grupo Vittore"
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover object-[66%_center] lg:object-center"
      />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(0,7,23,0.98)_0%,rgba(0,18,42,0.93)_31%,rgba(0,15,35,0.63)_51%,rgba(0,7,23,0.08)_75%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,7,23,0.08)_0%,rgba(0,7,23,0.04)_68%,rgba(0,7,23,0.48)_100%)]" />

      <div className="mx-auto flex min-h-[780px] w-full max-w-[1500px] items-center px-5 py-16 sm:px-8 sm:py-20 lg:min-h-[calc(100svh-96px)] lg:px-12 lg:py-14 xl:px-16">
        <div className="max-w-[700px]">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#e3a83e] sm:text-sm">
            Hub de Crescimento Empresarial
          </p>
          <span className="mt-5 block h-0.5 w-12 bg-[#d99d3d]" />

          <h1 className="mt-8 max-w-[700px] font-serif text-[clamp(2.7rem,11vw,4.1rem)] font-medium leading-[1.02] tracking-[-0.025em] text-[#fbf8f4] lg:text-[clamp(3.6rem,4.2vw,4.8rem)] lg:leading-[1.03]">
            <span className="home-hero-title-line lg:block">Grupo Vittore:</span>{" "}
            <span className="home-hero-title-line lg:block">crescimento, presença e</span>{" "}
            <span className="home-hero-title-line lg:block">estrutura para empresas que</span>{" "}
            <span className="home-hero-title-line lg:block">
              querem <strong className="font-medium text-[#e1aa4c]">vender melhor.</strong>
            </span>
          </h1>

          <span className="mt-8 block h-0.5 w-16 bg-[#d99d3d]" />
          <p className="mt-7 max-w-[680px] text-lg leading-8 text-[#f0eee9] sm:text-xl sm:leading-9 lg:text-[1.2rem] lg:leading-9">
            O Grupo Vittore atua em frentes complementares para ajudar empresas a crescer com mais clareza, presença e controle. Unimos assessoria comercial, consultoria empresarial, materiais gráficos personalizados, produção e entrega para todo o Brasil, além de conteúdo estratégico para fortalecer a operação e a comunicação da marca no mercado.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Link
              href="#servicos"
              className="inline-flex min-h-15 items-center justify-center gap-5 rounded-lg bg-[linear-gradient(135deg,#f2d28c,#d5a04a)] px-7 py-4 text-center text-xs font-extrabold uppercase tracking-[0.11em] text-[#061027] shadow-[0_15px_34px_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5 sm:text-sm"
            >
              Conhecer nossas frentes <span aria-hidden="true">›</span>
            </Link>
            <Link
              href="/assessoria-comercial"
              className="inline-flex min-h-15 items-center justify-center gap-5 rounded-lg border border-[#d99d3d] bg-[#001027]/45 px-7 py-4 text-center text-xs font-extrabold uppercase tracking-[0.1em] text-[#e5ad4b] backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-[#b29157]/12 sm:text-sm"
            >
              Ver Assessoria Comercial <span aria-hidden="true">›</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
