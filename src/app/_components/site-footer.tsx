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

type SocialName = "instagram" | "facebook" | "linkedin";

function SocialIcon({ name }: { name: SocialName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[1.1rem] w-[1.1rem]"
      fill="currentColor"
    >
      {name === "instagram" ? (
        <path
          fillRule="evenodd"
          d="M7.25 2.75h9.5a4.5 4.5 0 0 1 4.5 4.5v9.5a4.5 4.5 0 0 1-4.5 4.5h-9.5a4.5 4.5 0 0 1-4.5-4.5v-9.5a4.5 4.5 0 0 1 4.5-4.5Zm0 1.8a2.7 2.7 0 0 0-2.7 2.7v9.5a2.7 2.7 0 0 0 2.7 2.7h9.5a2.7 2.7 0 0 0 2.7-2.7v-9.5a2.7 2.7 0 0 0-2.7-2.7h-9.5Zm4.75 2.85a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2Zm0 1.85a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5Zm5.05-2.25a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z"
          clipRule="evenodd"
        />
      ) : null}
      {name === "facebook" ? (
        <path d="M13.62 21v-7.16h2.42l.36-2.8h-2.78V9.26c0-.81.22-1.36 1.39-1.36h1.48V5.39c-.72-.08-1.44-.13-2.16-.13-2.14 0-3.61 1.31-3.61 3.73v2.05H8.3v2.8h2.42V21h2.9Z" />
      ) : null}
      {name === "linkedin" ? (
        <path d="M5.76 8.44A1.72 1.72 0 1 0 5.7 5a1.72 1.72 0 0 0 .06 3.44ZM4.3 9.72h2.84V19H4.3V9.72Zm4.62 0h2.72v1.26h.04c.38-.72 1.3-1.48 2.68-1.48 2.86 0 3.39 1.88 3.39 4.33V19h-2.83v-4.58c0-1.09-.02-2.5-1.52-2.5-1.53 0-1.76 1.2-1.76 2.42V19H8.92V9.72Z" />
      ) : null}
    </svg>
  );
}

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
                className="h-auto w-[220px] object-contain sm:w-[265px]"
              />
            </Link>
            <h2 className="mt-7 font-serif text-xl font-semibold text-[#101d36] sm:text-[1.7rem]">
              Hub de Crescimento Empresarial
            </h2>
            <p className="mt-4 text-base leading-8 text-[#24334d] sm:text-lg sm:leading-9">
              Frentes complementares de assessoria comercial, marketing, vendas, tecnologia e materiais gráficos personalizados para empresas que querem crescer com mais presença, clareza e estrutura.
            </p>
            <div className="mt-6 flex items-center gap-3" aria-label="Redes sociais">
              <a href="#" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-[#071026]/25 text-[#071026] transition hover:border-[#9a671e] hover:text-[#9a671e]">
                <SocialIcon name="instagram" />
              </a>
              <a href="#" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-[#071026]/25 text-[#071026] transition hover:border-[#9a671e] hover:text-[#9a671e]">
                <SocialIcon name="instagram" />
              </a>
              <a href="#" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-[#071026]/25 text-[#071026] transition hover:border-[#9a671e] hover:text-[#9a671e]">
                <SocialIcon name="facebook" />
              </a>
              <a href="#" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-full border border-[#071026]/25 text-[#071026] transition hover:border-[#9a671e] hover:text-[#9a671e]">
                <SocialIcon name="linkedin" />
              </a>
            </div>
          </div>

          <div className="lg:pt-16">
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

          <div className="lg:pt-16">
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
