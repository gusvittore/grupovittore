import Link from "next/link";

export function InstitutionalCtaActions() {
  return (
    <div className="grid w-full max-w-[575px] gap-5">
      <Link
        href="/assessoria-comercial"
        className="inline-flex min-h-24 w-full items-center justify-between gap-6 rounded-xl bg-[linear-gradient(135deg,#f3d38d,#d4a04a)] px-7 py-6 text-sm font-extrabold uppercase tracking-[0.1em] text-[#071026] shadow-[0_20px_45px_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5 sm:px-10 sm:text-lg"
      >
        Conhecer Assessoria Comercial <span className="text-3xl font-normal" aria-hidden="true">→</span>
      </Link>
      <Link
        href="/materiais-impressos"
        className="inline-flex min-h-24 w-full items-center justify-between gap-6 rounded-xl border-2 border-[#d6a24b] bg-[#041129]/72 px-7 py-6 text-sm font-extrabold uppercase tracking-[0.1em] text-[#e3ae52] transition hover:-translate-y-0.5 hover:bg-[#b29157]/10 sm:px-10 sm:text-lg"
      >
        Conhecer Materiais Gráficos <span className="text-3xl font-normal" aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
