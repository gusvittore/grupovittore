import Image from "next/image";
import Link from "next/link";

const mainLinks = [
  { label: "Início", href: "/" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Assessoria Comercial", href: "/assessoria-comercial" },
  {
    label: "Materiais Gráficos Personalizados",
    href: "/materiais-impressos",
  },
  { label: "Blog", href: "/blog" },
  { label: "Sobre", href: "/sobre" },
];

const fronts = [
  "Assessoria Comercial",
  "Materiais Gráficos Personalizados",
  "Marketing e Geração de Demanda",
  "Vendas e Performance Comercial",
  "Tecnologia e Automações",
];

export function SiteFooter() {
  return (
    <footer className="bg-[#060b18] text-[#f5f0e7]">
      <div className="mx-auto w-full max-w-[1320px] px-6 pb-8 pt-14 sm:px-10 sm:pt-16 lg:px-12">
        <div className="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-[minmax(280px,1.2fr)_minmax(180px,0.7fr)_minmax(260px,1fr)] lg:gap-16">
          <div className="max-w-[440px]">
            <Link href="/" aria-label="Grupo Vittore - início">
              <Image
                src="/brand/logotipo-principal-rodape.png.png"
                alt="Grupo Vittore"
                width={2174}
                height={1080}
                className="h-20 w-auto brightness-0 invert sm:h-24"
              />
            </Link>
            <p className="mt-6 text-base leading-7 text-[#bec3cd]">
              Frentes complementares de assessoria comercial, marketing, vendas,
              tecnologia e materiais gráficos personalizados para empresas que
              querem crescer com mais presença, clareza e estrutura.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d0ad70]">
              Navegação
            </p>
            <div className="mt-6 grid gap-3 text-sm text-[#d8dbe1]">
              {mainLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-fit transition hover:text-[#d0ad70]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d0ad70]">
              Frentes do Grupo Vittore
            </p>
            <div className="mt-6 grid gap-3 text-sm leading-6 text-[#d8dbe1]">
              {fronts.map((front) => (
                <p key={front}>{front}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-xs text-[#9da4b1] sm:flex-row sm:items-center sm:justify-between">
          <p>Grupo Vittore | Hub de Crescimento Empresarial</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/politicas-de-privacidade" className="transition hover:text-white">
              Política de Privacidade
            </Link>
            <Link href="/termos-de-uso" className="transition hover:text-white">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
