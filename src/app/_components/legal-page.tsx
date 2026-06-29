import Link from "next/link";
import type { ReactNode } from "react";

type LegalSection = {
  title: string;
  children: ReactNode;
};

export function LegalPage({
  title,
  subtitle,
  sections,
}: {
  title: string;
  subtitle: string;
  sections: LegalSection[];
}) {
  return (
    <main className="min-h-screen bg-[#FBF8F4] text-[#000717]">
      <div className="legal-page-shell mx-auto w-full max-w-[960px] px-5 py-10 sm:px-8 sm:py-14 lg:py-18">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-3 border-b border-[#B29157]/60 pb-1 text-sm font-bold text-[#000717] no-underline transition hover:text-[#960000]"
        >
          <span aria-hidden="true">←</span>
          Voltar para a página inicial
        </Link>

        <header className="mt-14 border-b border-[#B29157]/34 pb-10">
          <p className="text-sm font-bold uppercase leading-5 tracking-[0.24em] text-[#B29157]">
            Grupo Vittore
          </p>
          <h1 className="legal-page-title mt-5 font-serif text-[clamp(2.3rem,7vw,4.7rem)] font-medium leading-[0.98] text-[#000717]">
            {title}
          </h1>
          <p className="legal-page-subtitle mt-7 max-w-[820px] text-lg leading-8 text-[#000717]/78 sm:text-xl">
            {subtitle}
          </p>
        </header>

        <div className="grid gap-10 py-10 sm:gap-12 sm:py-14">
          {sections.map((section, index) => (
            <section key={section.title} className="grid gap-4">
              <h2 className="legal-page-section-title grid grid-cols-[auto_1fr] gap-x-3 font-serif text-[1.72rem] font-semibold leading-tight text-[#000717] sm:text-[2.15rem]">
                <span className="text-[#B29157]">{index + 1}.</span>
                <span>{section.title}</span>
              </h2>
              <div className="legal-page-content grid gap-4 text-base leading-8 text-[#000717]/82 sm:text-lg">
                {section.children}
              </div>
            </section>
          ))}
        </div>

        <footer className="border-t border-[#B29157]/34 py-8">
          <p className="text-base font-semibold text-[#000717]">
            Última atualização: junho de 2026
          </p>
        </footer>
      </div>
    </main>
  );
}
