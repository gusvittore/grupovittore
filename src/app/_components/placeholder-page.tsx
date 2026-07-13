import Link from "next/link";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  support?: string;
  ctaLabel?: string;
};

export function PlaceholderPage({
  eyebrow,
  title,
  description,
  support,
  ctaLabel = "Conhecer Assessoria Comercial",
}: PlaceholderPageProps) {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f6f2ea_0%,#fbf8f4_100%)] text-[#090e1f]">
      <SiteHeader />
      <section className="mx-auto flex w-full max-w-[1040px] flex-col px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
        <div className="relative overflow-hidden rounded-[36px] border border-[#d9c6a0] bg-white/90 p-8 shadow-[0_24px_70px_rgba(9,14,31,0.08)] sm:p-10 lg:p-14">
          <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full border border-[#b29157]/20" />
          <p className="relative text-xs font-bold uppercase tracking-[0.3em] text-[#8a6a34]">
            {eyebrow}
          </p>
          <h1 className="relative mt-5 max-w-[820px] font-serif text-[clamp(2.7rem,6vw,5rem)] leading-[0.94] text-[#090e1f]">
            {title}
          </h1>
          <p className="relative mt-7 max-w-[740px] text-lg leading-8 text-[#4b5563] sm:text-xl">
            {description}
          </p>
          {support ? (
            <p className="relative mt-4 max-w-[700px] text-base leading-7 text-[#6b7280]">
              {support}
            </p>
          ) : null}

          <div className="relative mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#090e1f] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#fbf8f4] transition hover:bg-[#1f2937]"
            >
              Voltar para a home
            </Link>
            <Link
              href="/assessoria-comercial"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#b29157]/50 px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#4b5563] transition hover:border-[#8a6a34] hover:text-[#090e1f]"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
