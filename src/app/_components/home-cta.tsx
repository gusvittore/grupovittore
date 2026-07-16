import { InstitutionalCtaActions } from "./cta-actions";

export function HomeCta() {
  return (
    <section
      id="cta-institucional"
      className="relative isolate overflow-hidden bg-[#000717] text-[#fbf8f4]"
    >
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_42%_42%,rgba(17,48,82,0.35),transparent_38%),linear-gradient(135deg,#020c20,#000717_62%,#031229)]" />
      <div className="absolute -right-28 -top-32 -z-10 hidden h-[720px] w-[720px] rounded-full opacity-65 [background-image:radial-gradient(circle,#d49a3a_1.3px,transparent_1.5px)] [background-size:15px_15px] [mask-image:radial-gradient(circle,black,transparent_69%)] lg:block" />
      <div className="mx-auto grid min-h-[620px] w-full max-w-[1500px] items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,1.18fr)_minmax(410px,0.82fr)] lg:gap-20 lg:px-12 xl:px-16">
        <div className="max-w-[820px]">
          <h2 className="home-cta-title-mobile font-serif text-[clamp(2.3rem,9.6vw,3.2rem)] font-medium leading-[1.04] tracking-[-0.025em] lg:hidden">
            <span className="block">Conheça a frente</span>
            <span className="block text-[#e1ac50]">estratégica de</span>
            <span className="block text-[#e1ac50]">crescimento comercial</span>
            <span className="block text-[#e1ac50]">do Grupo Vittore.</span>
          </h2>
          <h2 className="hidden font-serif text-[clamp(2.8rem,4.2vw,4.45rem)] font-medium leading-[1.04] tracking-[-0.025em] lg:block">
            <span className="home-cta-title-line lg:block">Conheça a frente estratégica</span>{" "}
            <span className="home-cta-title-line lg:block">de crescimento comercial</span>{" "}
            <span className="home-cta-title-line text-[#e1ac50] lg:block">do Grupo Vittore.</span>
          </h2>
          <span className="mt-9 block h-0.5 w-16 bg-[#e1ac50]" />
          <p className="mt-8 max-w-[790px] text-xl leading-9 text-[#e3e5ea] sm:text-2xl sm:leading-10">
            A assessoria comercial reúne marketing, vendas e tecnologia para empresas que precisam transformar oportunidades em receita com mais clareza e controle.
          </p>
        </div>
        <InstitutionalCtaActions />
      </div>
    </section>
  );
}
