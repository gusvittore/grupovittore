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
    <footer className="border-t border-[#b29157]/18 bg-[#fbf8f4] text-[#071026]">
      <div className="mx-auto w-full max-w-[1500px] px-5 pb-8 pt-16 sm:px-8 sm:pt-20 lg:px-12 xl:px-16">
        <div className="grid gap-12 pb-14 lg:grid-cols-[minmax(300px,1.1fr)_minmax(220px,0.72fr)_minmax(330px,0.9fr)] lg:gap-20">
          <div className="max-w-[500px]">
            <Link href="/" aria-label="Grupo Vittore - início" className="inline-block">
              <Image
                src="/assets/home-institucional/brand/logotipo-principal-rodape.png.png"
                alt="Grupo Vittore"
                width={2174}
                height={1080}
                className="h-auto w-[250px] object-contain sm:w-[310px]"
              />
            </Link>
            <p className="mt-8 text-base leading-8 text-[#24334d] sm:text-lg sm:leading-9">
              Frentes complementares de assessoria comercial, marketing, vendas, tecnologia e materiais gráficos personalizados para empresas que querem crescer com mais presença, clareza e estrutura.
            </p>
          </div>

          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-[#9a671e]">
              Navegação
            </p>
            <nav aria-label="Navegação do rodapé" className="mt-7 grid gap-4 text-base text-[#17243c] sm:text-lg">
              {mainLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-fit transition hover:text-[#8a5b18]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-[#9a671e]">
              Frentes do Grupo Vittore
            </p>
            <div className="mt-7 grid gap-4 text-base leading-7 text-[#17243c] sm:text-lg">
              {fronts.map((front) => (
                <p key={front}>{front}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-[#b29157]/35 py-7 text-sm text-[#26344d] sm:flex-row sm:items-center sm:justify-between sm:text-base">
          <p>Grupo Vittore | Hub de Crescimento Empresarial</p>
          <nav aria-label="Links legais" className="flex flex-wrap gap-x-7 gap-y-3">
            <Link href="/politicas-de-privacidade" className="transition hover:text-[#8a5b18]">
              Política de Privacidade
            </Link>
            <Link href="/termos-de-uso" className="transition hover:text-[#8a5b18]">
              Termos de Uso
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
