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

export function HomeMateriaisGraficos() {
  return (
    <section id="servicos" className="scroll-mt-24 bg-[#fbf8f4] text-[#071026]">
      <div
        id="materiais-graficos"
        className="mx-auto grid w-full max-w-[1500px] scroll-mt-24 gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[minmax(330px,0.72fr)_minmax(650px,1.28fr)] lg:gap-16 lg:px-12 lg:py-28 xl:px-16"
      >
        <div className="flex max-w-[520px] flex-col lg:py-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#86591b] sm:text-sm">
            Presença além do digital
          </p>
          <h2 className="mt-8 font-serif text-[clamp(2.25rem,9.6vw,3rem)] font-medium leading-[1] tracking-[-0.025em] text-[#06132d] sm:text-[clamp(2.8rem,4vw,4rem)]">
            <span className="block whitespace-nowrap">Materiais Gráficos</span>
            <span className="block whitespace-nowrap">Personalizados</span>
          </h2>
          <span className="mt-9 h-0.5 w-20 bg-[#9a651b]" />
          <p className="mt-9 font-serif text-[1.65rem] font-semibold leading-[1.48] text-[#10203b] sm:text-[1.9rem]">
            Materiais impressos que fortalecem sua marca, comunicam com clareza e geram resultados no mundo físico.
          </p>
          <p className="mt-7 text-lg leading-8 text-[#263752] sm:text-xl sm:leading-9">
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
                  <p className="mt-3 text-[1.05rem] leading-8 text-[#243651] sm:text-[1.18rem] sm:leading-8">
                    {benefit.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-5 rounded-[18px] border border-[#b29157]/20 bg-[#fffdf9] px-6 py-6 shadow-[0_8px_22px_rgba(9,14,31,0.04)] sm:flex-row sm:items-center sm:px-8">
            <Image
              src="/assets/home-institucional/icons/producao-entrega.png.png"
              alt="Produção e entrega"
              width={500}
              height={500}
              className="h-16 w-16 flex-none object-contain"
            />
            <span className="hidden h-14 w-px bg-[#b29157]/45 sm:block" />
            <div className="flex-1">
              <h3
                aria-label="Produção e entrega para todo o Brasil"
                className="text-sm font-extrabold uppercase tracking-[0.13em] text-[#835719] sm:text-base"
              >
                <span className="block sm:inline">Produção e entrega para</span>{" "}
                <span className="block sm:inline">todo o </span>
                <span className="inline-flex items-center gap-2 whitespace-nowrap">
                  <Image
                    src="/assets/home-institucional/icons/bandeira-brasil.png.png"
                    alt="Bandeira do Brasil"
                    width={760}
                    height={500}
                    className="h-5 w-7 rounded-[2px] object-cover"
                  />
                  <span>Brasil</span>
                </span>
              </h3>
              <p className="mt-2 text-lg leading-8 text-[#263752] sm:text-[1.18rem]">
                Estrutura própria de produção, controle de qualidade e logística segura para que seus materiais cheguem com excelência, onde você estiver.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
