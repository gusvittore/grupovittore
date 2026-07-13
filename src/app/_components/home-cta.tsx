import Link from "next/link";

export function HomeCta() {
  return (
    <section
      id="cta-institucional"
      className="relative isolate overflow-hidden bg-[#000717] text-[#fbf8f4]"
    >
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_42%_42%,rgba(17,48,82,0.35),transparent_38%),linear-gradient(135deg,#020c20,#000717_62%,#031229)]" />
      <div className="absolute -right-28 -top-32 -z-10 h-[720px] w-[720px] rounded-full opacity-65 [background-image:radial-gradient(circle,#d49a3a_1.3px,transparent_1.5px)] [background-size:15px_15px] [mask-image:radial-gradient(circle,black,transparent_69%)]" />
      <div className="mx-auto grid min-h-[620px] w-full max-w-[1500px] items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,1.18fr)_minmax(410px,0.82fr)] lg:gap-20 lg:px-12 xl:px-16">
        <div className="max-w-[840px]">
          <h2 className="font-serif text-[clamp(3.2rem,5.2vw,5.7rem)] font-medium leading-[1.02] tracking-[-0.025em]">
            Conheça a frente estratégica de crescimento comercial do{" "}
            <span className="text-[#e1ac50]">Grupo Vittore.</span>
          </h2>
          <span className="mt-9 block h-0.5 w-16 bg-[#e1ac50]" />
          <p className="mt-8 max-w-[790px] text-lg leading-9 text-[#e3e5ea] sm:text-xl sm:leading-10">
            A assessoria comercial reúne marketing, vendas e tecnologia para empresas que precisam transformar oportunidades em receita com mais clareza e controle.
          </p>
        </div>
        <div className="grid gap-5">
          <Link
            href="/assessoria-comercial"
            className="inline-flex min-h-24 items-center justify-between gap-6 rounded-xl bg-[linear-gradient(135deg,#f3d38d,#d4a04a)] px-7 py-6 text-sm font-extrabold uppercase tracking-[0.1em] text-[#071026] shadow-[0_20px_45px_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5 sm:px-10 sm:text-lg"
          >
            Ver Assessoria Comercial <span className="text-3xl font-normal" aria-hidden="true">→</span>
          </Link>
          <Link
            href="/materiais-impressos"
            className="inline-flex min-h-24 items-center justify-between gap-6 rounded-xl border-2 border-[#d6a24b] bg-[#041129]/72 px-7 py-6 text-sm font-extrabold uppercase tracking-[0.1em] text-[#e3ae52] transition hover:-translate-y-0.5 hover:bg-[#b29157]/10 sm:px-10 sm:text-lg"
          >
            Conhecer Materiais Gráficos <span className="text-3xl font-normal" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
