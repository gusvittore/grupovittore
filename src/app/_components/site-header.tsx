import Image from "next/image";
import Link from "next/link";

const navigation = [
  { label: "Início", href: "/" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Blog", href: "/blog" },
  { label: "Sobre", href: "/sobre" },
  {
    label: "Materiais Gráficos Personalizados",
    href: "/materiais-impressos",
  },
];

function NavigationLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <nav
      aria-label={mobile ? "Navegação mobile" : "Navegação principal"}
      className={
        mobile
          ? "grid gap-1 border-t border-[#b29157]/20 px-5 py-4"
          : "hidden items-center justify-center gap-6 text-[0.98rem] font-semibold text-[#101a31] lg:flex lg:text-[1.05rem] xl:gap-9"
      }
    >
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={
            mobile
              ? "rounded-lg px-3 py-3 text-sm font-semibold text-[#101a31] transition hover:bg-[#b29157]/10 hover:text-[#8a5b18]"
              : "whitespace-nowrap transition hover:text-[#8a5b18]"
          }
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#b29157]/20 bg-[#fbf8f4]/96 shadow-[0_8px_30px_rgba(9,14,31,0.045)] backdrop-blur-xl">
      <div className="mx-auto grid min-h-[96px] w-full max-w-[1500px] grid-cols-[auto_1fr_auto] items-center gap-5 px-5 sm:px-8 lg:px-12 xl:px-16">
        <Link href="/" aria-label="Grupo Vittore - início" className="shrink-0">
          <Image
            src="/assets/home-institucional/brand/logotipo-principal-rodape.png.png"
            alt="Grupo Vittore"
            width={2174}
            height={1080}
            priority
            className="h-auto w-[150px] object-contain sm:w-[180px]"
          />
        </Link>

        <NavigationLinks />

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/assessoria-comercial"
            className="hidden min-h-13 items-center justify-center gap-4 rounded-full bg-[#031126] px-6 py-3 text-xs font-extrabold uppercase tracking-[0.11em] text-[#e3ad51] transition hover:-translate-y-0.5 hover:bg-[#0b1d38] sm:inline-flex xl:px-8 xl:text-sm"
          >
            Assessoria Comercial <span aria-hidden="true">›</span>
          </Link>

          <details className="group relative lg:hidden">
            <summary className="flex min-h-12 cursor-pointer list-none items-center gap-3 rounded-full border border-[#b29157]/45 px-4 text-xs font-extrabold uppercase tracking-[0.12em] text-[#101a31]">
              Menu
              <span className="relative h-3.5 w-4 border-y border-[#8a5b18] before:absolute before:left-0 before:top-1/2 before:h-px before:w-full before:-translate-y-1/2 before:bg-[#8a5b18]" />
            </summary>
            <div className="absolute right-0 top-[calc(100%+12px)] w-[min(340px,calc(100vw-32px))] overflow-hidden rounded-2xl border border-[#b29157]/30 bg-[#fbf8f4] shadow-[0_22px_55px_rgba(9,14,31,0.16)]">
              <NavigationLinks mobile />
              <Link
                href="/assessoria-comercial"
                className="mx-5 mb-5 flex min-h-12 items-center justify-center rounded-full bg-[#031126] px-5 text-center text-xs font-extrabold uppercase tracking-[0.1em] text-[#e3ad51] sm:hidden"
              >
                Assessoria Comercial
              </Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
