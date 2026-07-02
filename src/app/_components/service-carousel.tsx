"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    number: "01",
    title: "Arquitetura de Receita",
    image: "/brand/2/arquitetura-receita.png.png",
    body: "Mapeamos como marketing, vendas, tecnologia e atendimento se conectam dentro da sua operação para criar um caminho mais claro entre oportunidade, negociação e faturamento. A ideia é organizar a estrutura que sustenta o crescimento, reduzindo desperdícios e mostrando onde cada área precisa atuar para transformar movimento em receita.",
  },
  {
    number: "02",
    title: "Processo Comercial Inteligente",
    image: "/brand/2/processo-comercial-inteligente.png.png",
    body: "Estruturamos o processo comercial para que cada oportunidade tenha direção, acompanhamento e próximo passo definido. Isso ajuda sua empresa a parar de depender do improviso, da memória do vendedor ou da cobrança constante do dono, criando mais controle sobre cada etapa da venda.",
  },
  {
    number: "03",
    title: "Demanda Qualificada",
    image: "/brand/2/demanda-qualificada.png.png",
    body: "Ajustamos a geração de demanda para atrair contatos com mais intenção de compra, e não apenas volume. O foco é fazer com que marketing deixe de gerar apenas leads soltos e passe a entregar oportunidades que o comercial consiga trabalhar com mais clareza, prioridade e chance real de fechamento.",
  },
  {
    number: "04",
    title: "Comunicação que Vende",
    image: "/brand/2/comunicacao-vende.png.png",
    body: "Aprimoramos oferta, argumentos e mensagens para que o cliente entenda com clareza o valor de escolher sua empresa. Isso envolve transformar sua comunicação em uma ferramenta comercial mais forte, capaz de gerar confiança, reduzir objeções e conduzir melhor o lead até a decisão.",
  },
  {
    number: "05",
    title: "Gestão de Leads e Follow-up",
    image: "/brand/2/gestao-de-leads-e-follow-up.png.png",
    body: "Organizamos a gestão dos leads, os retornos e o follow-up para aumentar as chances de avanço e fechamento. Cada oportunidade precisa ter continuidade, contexto e próximo passo. Sem acompanhamento, vendas boas morrem no caminho antes mesmo de chegarem à proposta.",
  },
  {
    number: "06",
    title: "Dados e Indicadores Comerciais",
    image: "/brand/2/dados-indicadores-comerciais.png.png",
    body: "Criamos uma visão clara dos números que revelam onde as vendas avançam, travam e precisam de correção. Assim, sua empresa deixa de decidir no achismo e passa a enxergar com mais precisão quais canais, etapas, vendedores e oportunidades realmente impactam o faturamento.",
  },
  {
    number: "07",
    title: "Tecnologia e Automação",
    image: "/brand/2/tecnologia-automação.png.png",
    body: "Conectamos CRM, automações e integrações para reduzir tarefas manuais e dar mais controle à operação. A tecnologia entra para organizar informações, acelerar rotinas, evitar perdas de oportunidades e permitir que o time comercial trabalhe com mais eficiência e previsibilidade.",
  },
  {
    number: "08",
    title: "Rotina de Crescimento",
    image: "/brand/2/rotina-de-crescimento.png.png",
    body: "Transformamos estratégia em uma rotina de acompanhamento, execução e melhoria contínua. O crescimento não depende de uma ação isolada, mas de análise constante, ajustes semanais, clareza de prioridades e uma operação comercial que evolui com método.",
  },
  {
    number: "09",
    title: "Direção Estratégica",
    image: "/brand/2/direcao-estrategica.png.png",
    body: "Oferecemos visão externa e direção para decisões melhores sobre marketing, vendas e tecnologia. Você não recebe apenas tarefas soltas, recebe uma leitura estratégica do que precisa ser priorizado para vender mais, desperdiçar menos oportunidades e construir uma operação mais previsível.",
  },
] as const;

const CAROUSEL_DESKTOP_STEP = 2;
const CAROUSEL_DESKTOP_STATES = [0, 2, 4, 6, 7] as const;
const CAROUSEL_MOBILE_STATES = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const;

const getCarouselStep = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 640px)").matches ? 1 : CAROUSEL_DESKTOP_STEP;

export function ServiceCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const lastStartIndex = isMobile ? services.length - 1 : services.length - 2;
  const carouselStates = isMobile ? CAROUSEL_MOBILE_STATES : CAROUSEL_DESKTOP_STATES;

  useEffect(() => {
    const query = window.matchMedia("(max-width: 640px)");
    const updateViewport = () => setIsMobile(query.matches);

    updateViewport();
    query.addEventListener("change", updateViewport);

    return () => query.removeEventListener("change", updateViewport);
  }, []);

  function goToState(nextIndex: number) {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const boundedIndex = Math.max(0, Math.min(lastStartIndex, nextIndex));
    const target = scroller.children[boundedIndex] as HTMLElement | undefined;
    if (!target) return;

    setActiveIndex(boundedIndex);
    scroller.scrollTo({
      left: target.offsetLeft,
      behavior: "smooth",
    });
  }

  function move(direction: -1 | 1) {
    const steppedIndex = activeIndex + direction * getCarouselStep();
    const nextIndex = Math.max(
      0,
      Math.min(
        lastStartIndex,
        direction === -1 && activeIndex === lastStartIndex
          ? lastStartIndex - 1
          : steppedIndex,
      ),
    );
    goToState(nextIndex);
  }

  function updateActiveFromScroll() {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const children = Array.from(scroller.children) as HTMLElement[];
    const closest = children.reduce(
      (best, child, index) => {
        const distance = Math.abs(child.offsetLeft - scroller.scrollLeft);
        return distance < best.distance ? { distance, index } : best;
      },
      { distance: Number.POSITIVE_INFINITY, index: activeIndex },
    );

    setActiveIndex(Math.max(0, Math.min(lastStartIndex, closest.index)));
  }

  return (
    <div className="service-carousel">
      <div className="service-carousel-controls">
        <button
          type="button"
          onClick={() => move(-1)}
          disabled={activeIndex === 0}
          aria-label="Ver serviço anterior"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          disabled={activeIndex === lastStartIndex}
          aria-label="Ver próximo serviço"
        >
          ›
        </button>
      </div>

      <div className="service-carousel-viewport">
        <div ref={scrollerRef} className="service-scroll" onScroll={updateActiveFromScroll}>
          {services.map((service) => (
            <article
              id={`servico-${service.number}`}
              key={service.number}
              className="service-card"
            >
              <Image
                src={service.image}
                alt={service.title}
                width={1536}
                height={1024}
                sizes="(max-width: 700px) 88vw, (max-width: 1100px) 46vw, 390px"
                className="service-image"
              />
              <div className="service-card-copy">
                <p className="service-card-number">{service.number}</p>
                <span className="service-card-rule" aria-hidden="true" />
                <h3>{service.title}</h3>
                <p>{service.body}</p>
                <a href="#formulario" className="service-card-link">
                  Quero vender mais <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="service-carousel-dots" aria-label="Estados do carrossel de serviços">
        {carouselStates.map((state, index) => (
          <button
            key={state}
            type="button"
            onClick={() => goToState(state)}
            className={state === activeIndex ? "is-active" : ""}
            aria-label={`Mostrar grupo ${index + 1} de ${carouselStates.length}`}
            aria-current={state === activeIndex ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
