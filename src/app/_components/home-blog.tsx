"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const articles = [
  {
    category: "Gestão comercial",
    title:
      "Como identificar gargalos comerciais antes de investir mais em tráfego",
    mobileTitle: ["Como identificar", "gargalos comerciais", "antes de investir mais", "em tráfego"],
    description:
      "Prévia visual de conteúdo sobre leitura comercial, sinais de ineficiência e tomada de decisão antes de ampliar investimento.",
    image:
      "/assets/home-institucional/brand/sessao-4-identificar-gargalos.png.png",
  },
  {
    category: "Marca e presença",
    title: "Por que materiais gráficos ainda fortalecem a presença da marca",
    mobileTitle: ["Por que materiais gráficos", "ainda fortalecem a", "presença da marca"],
    description:
      "Prévia visual de conteúdo sobre reconhecimento, percepção de valor e presença física da marca no relacionamento com o mercado.",
    image:
      "/assets/home-institucional/brand/sessao-4-materiais-fortalecem-presenca.png.png",
  },
  {
    category: "Estratégia integrada",
    title: "Marketing, vendas e tecnologia: como conectar as três áreas",
    mobileTitle: ["Marketing, vendas e", "tecnologia: como conectar", "as três áreas"],
    description:
      "Prévia visual de conteúdo sobre alinhamento operacional, clareza de dados e integração entre frentes de crescimento.",
    image:
      "/assets/home-institucional/brand/sessao-4-marketing-vendas-tecnologia.png.png",
  },
  {
    category: "Crescimento",
    title: "O que uma empresa precisa organizar antes de escalar aquisição",
    mobileTitle: ["O que uma empresa", "precisa organizar antes", "de escalar aquisição"],
    description:
      "Prévia visual de conteúdo sobre processo, estrutura comercial, acompanhamento e eficiência antes de ampliar captação.",
    image:
      "/assets/home-institucional/brand/sessao-4-empresa-organizar.png.png",
  },
  {
    category: "Tecnologia e vendas",
    title: "CRM não é só cadastro: é controle da operação comercial",
    mobileTitle: ["CRM não é só cadastro:", "é controle da operação", "comercial"],
    description:
      "CRM não é apenas uma lista de contatos. Ele ajuda a acompanhar oportunidades, organizar o processo comercial e dar mais controle à operação de vendas.",
    image:
      "/assets/home-institucional/brand/sessao-4-crm-cadastro.png.png",
  },
  {
    category: "Crescimento empresarial",
    title: "Crescimento previsível começa com clareza sobre o processo",
    mobileTitle: ["Crescimento previsível", "começa com clareza", "sobre o processo"],
    description:
      "Antes de buscar mais volume, a empresa precisa entender como sua operação transforma atenção em oportunidade e oportunidade em receita.",
    image: "/assets/blog/brand/artigo-crescimento-previsivel.png.png",
  },
] as const;

export function HomeBlog() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function goTo(index: number) {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const nextIndex = Math.max(0, Math.min(articles.length - 1, index));
    const target = scroller.children[nextIndex] as HTMLElement | undefined;
    if (!target) return;

    setActiveIndex(nextIndex);
    scroller.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
  }

  function updateActiveIndex() {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.children) as HTMLElement[];
    const closest = cards.reduce(
      (best, card, index) => {
        const distance = Math.abs(card.offsetLeft - scroller.scrollLeft);
        return distance < best.distance ? { index, distance } : best;
      },
      { index: activeIndex, distance: Number.POSITIVE_INFINITY },
    );

    setActiveIndex(closest.index);
  }

  return (
    <section id="blog" className="scroll-mt-24 overflow-hidden bg-[#fbf8f4] text-[#071026]">
      <div className="mx-auto w-full max-w-[1500px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28 xl:px-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.64fr)_auto] lg:items-end lg:gap-12">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.27em] text-[#8a5b18] sm:text-sm">
              Blog estratégico
            </p>
            <h2 className="mt-5 max-w-[720px] font-serif text-[clamp(2.35rem,8vw,3.2rem)] font-medium leading-[1.02] tracking-[-0.025em] text-[#07142d] sm:text-[clamp(2.8rem,4vw,4rem)]">
              <span className="home-blog-title-mobile block sm:inline">Conhecimento para</span>{" "}
              <span className="home-blog-title-mobile block sm:inline">decisões empresariais</span>{" "}
              <span className="home-blog-title-mobile block sm:inline">mais claras</span>
            </h2>
          </div>
          <p className="text-lg leading-8 text-[#263752] sm:text-xl sm:leading-9">
            O blog do Grupo Vittore reúne leitura estratégica, conteúdo prático e visão de mercado para apoiar empresas que querem crescer com mais clareza.
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Ver artigo anterior"
              className="grid h-14 w-14 place-items-center rounded-xl border border-[#b29157]/55 bg-[#fffdf9] text-3xl text-[#986317] transition hover:bg-[#f3eadb] disabled:cursor-default disabled:opacity-35"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              disabled={activeIndex === articles.length - 1}
              aria-label="Ver próximo artigo"
              className="grid h-14 w-14 place-items-center rounded-xl border border-[#b29157]/55 bg-[#fffdf9] text-3xl text-[#986317] transition hover:bg-[#f3eadb] disabled:cursor-default disabled:opacity-35"
            >
              ›
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          onScroll={updateActiveIndex}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 [scrollbar-color:#b29157_transparent] [scrollbar-width:thin]"
        >
          {articles.map((article, index) => (
            <article
              key={article.title}
              className="group flex min-h-[590px] w-[88%] min-w-[88%] shrink-0 snap-start flex-col overflow-hidden rounded-[22px] border border-[#b29157]/25 bg-[#fffdf9] shadow-[0_16px_42px_rgba(9,14,31,0.055)] sm:w-[62%] sm:min-w-[62%] lg:w-[46%] lg:min-w-[46%] xl:w-[40%] xl:min-w-[40%]"
            >
              <div className="relative aspect-[1.86/1] overflow-hidden bg-[#071026]">
                <Image
                  src={article.image}
                  alt=""
                  fill
                  sizes="(max-width: 639px) 88vw, (max-width: 1023px) 62vw, 580px"
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex flex-1 flex-col px-6 pb-7 pt-5 sm:px-7">
                <div className="flex items-start justify-between gap-5">
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#956119]">
                    {article.category}
                  </p>
                  <span className="font-serif text-2xl text-[#b29157]">0{index + 1}</span>
                </div>
                <span className="mt-3 h-0.5 w-8 bg-[#a56a19]" />
                <h3 className="mt-5 font-serif text-[clamp(1.48rem,6.6vw,1.82rem)] font-semibold leading-[1.08] text-[#07142d] sm:text-[clamp(1.7rem,2.5vw,2.2rem)]">
                  <span className="home-blog-article-title-mobile block sm:hidden">
                    {article.mobileTitle.map((line) => <span key={line} className="block">{line}</span>)}
                  </span>
                  <span className="hidden sm:block">{article.title}</span>
                </h3>
                <p className="mt-5 text-lg leading-8 text-[#34435a] sm:text-xl sm:leading-9">
                  {article.description}
                </p>
                <Link
                  href="/blog"
                  className="mt-auto inline-flex items-center gap-4 pt-7 text-sm font-extrabold uppercase tracking-[0.15em] text-[#925e16]"
                >
                  Ler artigo <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-1 flex flex-col items-center gap-7 sm:flex-row sm:justify-between">
          <div className="flex gap-2" aria-label="Posição do carrossel de artigos">
            {articles.map((article, index) => (
              <button
                key={article.title}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Mostrar artigo ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  index === activeIndex ? "bg-[#a66d19]" : "bg-[#b29157]/25"
                }`}
              />
            ))}
          </div>
          <Link
            href="/blog"
            className="inline-flex min-h-13 items-center justify-center gap-4 rounded-lg border border-[#9b651b]/55 px-7 py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-[#744b15] transition hover:bg-[#071026] hover:text-white"
          >
            Acessar Blog <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
