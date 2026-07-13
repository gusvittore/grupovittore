import Image from "next/image";
import Link from "next/link";

const materialBenefits = [
  {
    title: "Presença de marca",
    description:
      "Peças que tornam a identidade da sua empresa reconhecível e consistente em cada contato presencial.",
    image: "/assets/home-institucional/brand/sessao-2-presenca-marca.png.png",
  },
  {
    title: "Comunicação impressa",
    description:
      "Cartões de visita, panfletos, flyers e blocos personalizados que comunicam com clareza e intenção, reforçando sua mensagem.",
    image: "/assets/home-institucional/brand/sessao-2-comunicacao-impressa.png.png",
  },
  {
    title: "Prospecção e relacionamento",
    description:
      "Materiais comerciais que apoiam visitas, apresentações e ações de relacionamento com clientes e parceiros.",
    image: "/assets/home-institucional/brand/sessao-2-prospeccao-relacionamento.png.png",
  },
  {
    title: "Personalização profissional",
    description:
      "Materiais institucionais e peças sob medida que traduzem o posicionamento da marca no mundo físico.",
    image: "/assets/home-institucional/brand/sessao-2-personalizacao-profissional.png.png",
  },
] as const;

function DeliveryIcon() {
  return (
    <svg
      viewBox="0 0 64 48"
      aria-hidden="true"
      className="h-12 w-16 flex-none text-[#9b651c]"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      <path d="M4 8h34v28H4zM38 18h11l9 10v8H38zM11 15h17M11 22h11" />
      <circle cx="15" cy="38" r="5" />
      <circle cx="49" cy="38" r="5" />
    </svg>
  );
}

export function HomeMateriaisGraficos() {
  return (
    <section id="servicos" className="scroll-mt-24 bg-[#fbf8f4] text-[#071026]">
      <div
        id="materiais-graficos"
        className="mx-auto grid w-full max-w-[1500px] scroll-mt-24 gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[minmax(330px,0.72fr)_minmax(650px,1.28fr)] lg:gap-16 lg:px-12 lg:py-28 xl:px-16"
      >
        <div className="flex max-w-[520px] flex-col lg:py-10">
          <div className="flex items-center gap-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#86591b] sm:text-sm">
              Presença além do digital
            </p>
            <span className="h-px flex-1 bg-[#b29157]/65" />
          </div>
          <h2 className="mt-8 font-serif text-[clamp(3.2rem,5vw,5.4rem)] font-medium leading-[0.95] tracking-[-0.025em] text-[#06132d]">
            Materiais Gráficos Personalizados
          </h2>
          <span className="mt-9 h-0.5 w-20 bg-[#9a651b]" />
          <p className="mt-9 font-serif text-2xl font-semibold leading-[1.5] text-[#10203b] sm:text-[1.75rem]">
            Materiais impressos que fortalecem sua marca, comunicam com clareza e geram resultados no mundo físico.
          </p>
          <p className="mt-7 text-base leading-8 text-[#263752] sm:text-lg sm:leading-9">
            Do cartão de visita ao material institucional completo, cuidamos de cada detalhe: criação estratégica, produção com qualidade e entrega segura para todo o Brasil. Mais do que impressão, oferecemos presença, credibilidade e conexão real com pessoas.
          </p>
          <Link
            href="/materiais-impressos"
            className="mt-10 inline-flex min-h-15 w-fit items-center justify-center gap-5 rounded-lg bg-[linear-gradient(135deg,#f1d18b,#d5a04a)] px-7 py-4 text-sm font-extrabold uppercase tracking-[0.13em] text-[#071026] shadow-[0_12px_28px_rgba(125,82,17,0.18)] transition hover:-translate-y-0.5"
          >
            Conhecer Materiais Gráficos <span aria-hidden="true">›</span>
          </Link>
        </div>

        <div className="rounded-[26px] border border-[#b29157]/25 bg-[#fffdf9]/75 p-3 shadow-[0_22px_65px_rgba(9,14,31,0.055)] sm:p-4">
          <div className="grid gap-4 md:grid-cols-2">
            {materialBenefits.map((benefit) => (
              <article
                key={benefit.title}
                className="group overflow-hidden rounded-[18px] border border-[#b29157]/22 bg-[#fbf8f4] shadow-[0_10px_28px_rgba(9,14,31,0.055)]"
              >
                <div className="relative aspect-[1.85/1] overflow-hidden bg-[#071026]">
                  <Image
                    src={benefit.image}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 92vw, (max-width: 1200px) 44vw, 430px"
                    className="object-cover transition duration-500 group-hover:scale-[1.025]"
                  />
                </div>
                <div className="px-6 pb-6 pt-5">
                  <h3 className="font-serif text-[1.75rem] font-semibold leading-tight text-[#07142d] sm:text-[2rem]">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-[#243651] sm:text-lg sm:leading-8">
                    {benefit.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-5 rounded-[18px] border border-[#b29157]/20 bg-[#fffdf9] px-6 py-6 shadow-[0_8px_22px_rgba(9,14,31,0.04)] sm:flex-row sm:items-center sm:px-8">
            <DeliveryIcon />
            <span className="hidden h-14 w-px bg-[#b29157]/45 sm:block" />
            <div className="flex-1">
              <h3 className="text-sm font-extrabold uppercase tracking-[0.13em] text-[#835719] sm:text-base">
                Produção e entrega para todo o Brasil
              </h3>
              <p className="mt-2 text-base leading-7 text-[#263752] sm:text-lg">
                Estrutura própria de produção, controle de qualidade e logística segura para que seus materiais cheguem com excelência, onde você estiver.
              </p>
            </div>
            <span className="font-serif text-4xl text-[#b29157]/65" aria-hidden="true">◇</span>
          </div>
        </div>
      </div>
    </section>
  );
}
