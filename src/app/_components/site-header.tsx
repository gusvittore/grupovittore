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

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#b29157]/20 bg-[#fbf8f4]/95 shadow-[0_10px_35px_rgba(9,14,31,0.045)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1320px] flex-wrap items-center justify-between gap-x-5 gap-y-4 px-6 py-3 sm:px-10 lg:flex-nowrap lg:px-12">
        <Link href="/" aria-label="Grupo Vittore - início" className="shrink-0">
          <Image
            src="/assets/assessoria-comercial/brand/logotipo-principal-rodape.png.png"
            alt="Grupo Vittore"
            width={2174}
            height={1080}
            priority
            className="h-14 w-auto object-contain sm:h-16"
          />
        </Link>

        <nav
          aria-label="Navegação principal"
          className="order-3 flex w-full items-center gap-x-5 gap-y-3 overflow-x-auto border-t border-[#b29157]/15 pt-3 text-[0.76rem] font-semibold text-[#3f4756] lg:order-none lg:w-auto lg:flex-1 lg:justify-center lg:overflow-visible lg:border-0 lg:pt-0 xl:gap-7 xl:text-sm"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 whitespace-nowrap transition hover:text-[#8a6a34]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/assessoria-comercial"
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-[#090e1f] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#fbf8f4] transition duration-300 hover:-translate-y-0.5 hover:bg-[#192238] sm:px-5 sm:text-xs"
        >
          Assessoria Comercial
        </Link>
      </div>
    </header>
  );
}
