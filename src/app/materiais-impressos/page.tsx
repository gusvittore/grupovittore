import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const MATERIALS_WHATSAPP_NUMBER = "5511947035134";
const DEFAULT_WHATSAPP_MESSAGE =
  "Olá, vim pelo site do Grupo Vittore e quero mais informações sobre materiais gráficos personalizados.";
const HERO_TITLE = "Autoridade que se toca: impressos premium que materializam sua marca.";

const productSections = [
  {
    id: "cartoes-de-visita",
    eyebrow: "Primeira impressão",
    title: "Cartões de visita para quem não quer parecer comum.",
    description:
      "O cartão de visita ainda é uma das formas mais diretas de materializar sua presença profissional. Quando o papel, o acabamento e o design estão alinhados, ele deixa de ser apenas um contato e passa a comunicar cuidado, autoridade e percepção de valor.",
    support:
      "Para corretores, advogados, contadores, empresários e profissionais liberais, um cartão bem feito ajuda a reforçar confiança antes mesmo da próxima conversa.",
    bullets: [
      "acabamentos premium",
      "formatos personalizados",
      "papel de alta qualidade",
      "design alinhado à sua marca",
      "produção sob encomenda",
    ],
    cta: "Quero criar meu cartão premium",
    visualTitle: "Cartões premium",
    visualAlt: "Cartões de visita premium personalizados com acabamento sofisticado",
    order: "text-first",
  },
  {
    id: "pastas-e-envelopes",
    eyebrow: "Apresentação profissional",
    title: "Pastas e envelopes que elevam a forma como sua empresa se apresenta.",
    description:
      "Uma proposta, um contrato, um documento ou uma apresentação comercial não precisam chegar ao cliente de qualquer forma. Pastas e envelopes personalizados criam uma experiência mais organizada, elegante e confiável.",
    support:
      "Eles ajudam sua marca a parecer mais estruturada, reforçam o cuidado com o detalhe e tornam cada entrega física mais profissional.",
    bullets: [
      "ideais para propostas e contratos",
      "acabamento sofisticado",
      "apresentação mais organizada",
      "reforço de marca em reuniões",
      "materiais feitos sob encomenda",
    ],
    cta: "Quero uma apresentação mais profissional",
    visualTitle: "Papelaria institucional",
    visualAlt: "Pastas e envelopes personalizados para apresentação profissional",
    order: "visual-first",
  },
  {
    id: "panfletos-e-folders",
    eyebrow: "Comunicação impressa",
    title: "Panfletos e folders com presença, clareza e acabamento profissional.",
    description:
      "Materiais informativos também podem ser sofisticados. Quando bem estruturados, panfletos e folders ajudam a apresentar serviços, imóveis, empresas, eventos e ofertas com mais clareza, sem perder a percepção de valor da marca.",
    support:
      "O objetivo não é apenas entregar informação. É entregar uma mensagem visualmente organizada, bem acabada e coerente com o público que você deseja atrair.",
    bullets: [
      "comunicação clara",
      "design alinhado à identidade da marca",
      "ideal para apresentação de serviços",
      "materiais comerciais e institucionais",
      "produção personalizada",
    ],
    cta: "Quero criar meu folder personalizado",
    visualTitle: "Folders profissionais",
    visualAlt: "Folders e panfletos personalizados com acabamento gráfico profissional",
    order: "text-first",
  },
  {
    id: "blocos-personalizados",
    eyebrow: "Relacionamento e presença",
    title: "Blocos personalizados que mantêm sua marca presente na rotina do cliente.",
    description:
      "Blocos de anotações personalizados são materiais simples na função, mas fortes na presença. Eles acompanham reuniões, atendimentos, mesas de trabalho, recepções e momentos em que sua marca continua visível depois do primeiro contato.",
    support:
      "São ideais para empresas, escritórios, consultores e profissionais que querem reforçar organização, cuidado e lembrança de marca no dia a dia.",
    bullets: [
      "úteis em reuniões e atendimentos",
      "reforçam presença de marca",
      "personalizados com identidade visual",
      "opção profissional para relacionamento",
      "produção sob encomenda",
    ],
    cta: "Quero blocos personalizados",
    visualTitle: "Blocos personalizados",
    visualAlt: "Blocos de anotações personalizados para empresas e profissionais",
    order: "visual-first",
  },
] as const;

const benefits = [
  {
    title: "Personalizado para cada cliente",
    description:
      "Nada de material genérico. Cada projeto é orientado para comunicar a presença, o posicionamento e o padrão visual da sua marca.",
  },
  {
    title: "Pedidos pelo WhatsApp",
    description:
      "Todo atendimento acontece de forma prática pelo WhatsApp, com orientação para entender o que você precisa e qual material faz mais sentido para sua marca.",
  },
  {
    title: "Entrega para todo o Brasil",
    description:
      "Produzimos materiais personalizados e enviamos para clientes em todo o Brasil, mantendo cuidado na produção, acabamento e entrega.",
  },
  {
    title: "Acabamento com intenção",
    description:
      "Papel, textura, formato e acabamento não são detalhes aleatórios. Eles ajudam a construir a percepção que o cliente terá da sua marca.",
  },
] as const;

const testimonials = [
  "Atendimento excelente, material de ótima qualidade e resultado muito profissional. Superou minhas expectativas.",
  "Ficou exatamente como eu queria. O acabamento transmite muito mais profissionalismo para a minha marca.",
  "Equipe muito atenciosa, me orientou em todo o processo e entregou um material impecável.",
  "A qualidade do material fez muita diferença na apresentação da minha empresa. Recomendo muito.",
  "O cartão ficou sofisticado, bem acabado e com uma presença muito superior ao comum.",
  "Pedido feito com segurança pelo WhatsApp, entrega no prazo e resultado excelente.",
  "A apresentação dos meus materiais mudou completamente a percepção dos meus clientes.",
  "Trabalho cuidadoso, bonito e muito profissional. Dá para perceber a diferença nos detalhes.",
] as const;

const testimonialRows = [
  testimonials.slice(0, 4),
  testimonials.slice(4),
] as const;

const faqItems = [
  {
    question: "Os pedidos são feitos somente por encomenda?",
    answer:
      "Sim. Cada material é produzido sob encomenda, considerando o tipo de peça, quantidade, acabamento, identidade visual e objetivo do cliente.",
  },
  {
    question: "Vocês entregam para todo o Brasil?",
    answer:
      "Sim. O Grupo Vittore atende clientes de diferentes regiões e envia materiais personalizados para todo o Brasil.",
  },
  {
    question: "O pedido é feito pelo WhatsApp?",
    answer:
      "Sim. O atendimento inicial acontece pelo WhatsApp para entendermos o que você precisa, orientar as possibilidades e seguir com o orçamento.",
  },
  {
    question: "Vocês trabalham para todos os públicos?",
    answer:
      "Atendemos principalmente profissionais e empresas que querem uma apresentação mais profissional, sofisticada e personalizada. O foco não é material genérico, mas impressos com mais presença e acabamento.",
  },
  {
    question: "Quais materiais vocês produzem?",
    answer:
      "Cartões de visita, pastas, envelopes, panfletos, folders, blocos de anotações e outros materiais gráficos personalizados sob encomenda.",
  },
  {
    question: "Vocês criam a arte ou preciso enviar pronta?",
    answer:
      "O ideal é avaliar cada caso pelo WhatsApp. Podemos orientar sobre o melhor caminho conforme o material, a identidade visual existente e o nível de personalização desejado.",
  },
  {
    question: "Existe pedido mínimo?",
    answer:
      "Pode existir pedido mínimo dependendo do tipo de material, acabamento e fornecedor envolvido na produção. A confirmação acontece durante o atendimento pelo WhatsApp.",
  },
  {
    question: "Quanto tempo demora para produzir?",
    answer:
      "O prazo varia conforme o material, acabamento, quantidade e envio. Durante o atendimento, informamos o prazo estimado de produção e entrega.",
  },
  {
    question: "Posso pedir algo mais premium ou sofisticado?",
    answer:
      "Sim. Essa é justamente uma das propostas da frente de materiais gráficos do Grupo Vittore: criar impressos com mais presença, acabamento e percepção profissional.",
  },
] as const;

export const metadata: Metadata = {
  title: "Materiais Gráficos Personalizados | Grupo Vittore",
  description:
    "Impressos premium sob encomenda para profissionais e empresas que querem transmitir mais autoridade, sofisticação e presença física de marca.",
  openGraph: {
    title: "Materiais Gráficos Personalizados | Grupo Vittore",
    description:
      "Impressos premium sob encomenda para profissionais e empresas que querem transmitir mais autoridade, sofisticação e presença física de marca.",
    type: "website",
    locale: "pt_BR",
  },
};

function buildWhatsAppUrl(message = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${MATERIALS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function WhatsAppButton({
  children,
  className = "",
  message = DEFAULT_WHATSAPP_MESSAGE,
}: {
  children: React.ReactNode;
  className?: string;
  message?: string;
}) {
  return (
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Abrir WhatsApp do Grupo Vittore para ${children}`}
      className={`hero-primary-button ${className}`}
    >
      {children}
    </a>
  );
}

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className={`flex items-center gap-4 text-xs font-extrabold uppercase leading-5 tracking-[0.28em] sm:text-sm ${
        dark ? "text-[#B29157]" : "text-[#9A671E]"
      }`}
    >
      <span className="h-px w-10 bg-current opacity-70" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

function SectionShell({
  id,
  children,
  dark = false,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative overflow-x-clip ${dark ? "bg-[#000617] text-[#FBF8F4]" : "bg-[#FBF8F4] text-[#090E1F]"} ${className}`}
    >
      <div className="mx-auto w-full max-w-[1240px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        {children}
      </div>
    </section>
  );
}

function ProductVisual({ title, alt }: { title: string; alt: string }) {
  return (
    <div
      role="img"
      aria-label={alt}
      className="placeholder visual relative min-h-[360px] overflow-hidden rounded-[28px] border border-[#B29157]/45 bg-[#090E1F] p-5 shadow-[0_24px_70px_rgba(9,14,31,0.16)] sm:min-h-[440px] sm:p-7"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(178,145,87,0.26),transparent_32%),linear-gradient(145deg,rgba(255,255,255,0.10),transparent_46%)]" />
      <div className="absolute right-[-16%] top-[-14%] h-64 w-64 rounded-full border border-[#B29157]/25" />
      <div className="relative flex h-full min-h-[320px] flex-col justify-end rounded-[20px] border border-[#FBF8F4]/12 bg-[#FBF8F4]/6 p-5 sm:min-h-[386px] sm:p-7">
        <div className="absolute left-5 top-5 flex gap-2" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-[#B29157]" />
          <span className="h-2 w-2 rounded-full bg-[#FBF8F4]/45" />
          <span className="h-2 w-2 rounded-full bg-[#FBF8F4]/25" />
        </div>
        <div className="grid gap-4" aria-hidden="true">
          <div className="ml-auto h-24 w-[74%] rotate-[-6deg] rounded-[16px] border border-[#B29157]/55 bg-[#FBF8F4] shadow-[0_18px_45px_rgba(0,0,0,0.24)]" />
          <div className="h-24 w-[84%] rotate-[4deg] rounded-[16px] border border-[#B29157]/45 bg-[#F1E9DA] shadow-[0_18px_45px_rgba(0,0,0,0.2)]" />
          <div className="ml-8 h-20 w-[68%] rounded-[14px] border border-[#B29157]/45 bg-[#CDBA92] shadow-[0_18px_45px_rgba(0,0,0,0.18)]" />
        </div>
        <p className="relative mt-8 text-xs font-bold uppercase tracking-[0.28em] text-[#B29157]">
          Visual preparado para imagem final
        </p>
        <h3 className="relative mt-3 font-serif text-2xl font-semibold leading-tight text-[#FBF8F4] sm:text-3xl">
          {title}
        </h3>
      </div>
    </div>
  );
}

function ProductSection({ item }: { item: (typeof productSections)[number] }) {
  const visual = <ProductVisual title={item.visualTitle} alt={item.visualAlt} />;
  const copy = (
    <div>
      <Eyebrow>{item.eyebrow}</Eyebrow>
      <h2 className="mt-6 max-w-[720px] font-serif text-[clamp(2rem,6vw,4.45rem)] font-medium leading-[0.96] tracking-[-0.045em] text-[#090E1F]">
        {item.title}
      </h2>
      <div className="mt-7 grid gap-5 text-lg leading-8 text-[#26344D] sm:text-xl sm:leading-9">
        <p>{item.description}</p>
        <p>{item.support}</p>
      </div>
      <ul className="mt-8 grid gap-3 text-base font-semibold uppercase tracking-[0.1em] text-[#101D36] sm:grid-cols-2 sm:text-sm">
        {item.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-3">
            <span className="mt-2 h-1.5 w-1.5 flex-none rotate-45 bg-[#B29157]" aria-hidden="true" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      <div className="mt-9">
        <WhatsAppButton>{item.cta}</WhatsAppButton>
      </div>
    </div>
  );

  return (
    <SectionShell id={item.id}>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className={item.order === "visual-first" ? "lg:order-2" : ""}>{copy}</div>
        <div className={item.order === "visual-first" ? "lg:order-1" : ""}>{visual}</div>
      </div>
    </SectionShell>
  );
}

function SocialProofCard({ quote }: { quote: string }) {
  return (
    <article className="min-h-[180px] w-[280px] flex-none rounded-[18px] border border-[#B29157]/35 bg-white/80 p-6 shadow-[0_16px_40px_rgba(9,14,31,0.07)] sm:w-[330px]">
      <p className="text-lg leading-none text-[#B29157]" aria-label="5 estrelas">
        ★★★★★
      </p>
      <p className="mt-5 text-base leading-7 text-[#26344D] sm:text-lg">{quote}</p>
    </article>
  );
}

function SocialProofSection() {
  return (
    <SectionShell id="prova-social" className="overflow-hidden">
      <div className="mx-auto max-w-[900px] text-center">
        <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-[#9A671E] sm:text-sm">
          Confiança comprovada
        </p>
        <h2 className="mt-5 font-serif text-[clamp(2.2rem,7vw,4.8rem)] font-medium leading-[0.96] tracking-[-0.05em] text-[#090E1F]">
          Mais de 200 avaliações no Google. Todas com 5 estrelas.
        </h2>
        <p className="mx-auto mt-6 max-w-[760px] text-lg leading-8 text-[#26344D] sm:text-xl sm:leading-9">
          A confiança construída com nossos clientes aparece nos detalhes: no atendimento, na orientação, na produção e no cuidado com cada entrega.
        </p>
      </div>
      <div className="mt-12 grid gap-5" aria-label="Depoimentos em movimento">
        {testimonialRows.map((row, index) => {
          const duplicated = row.concat(row);
          return (
            <div key={index} className="overflow-hidden py-1">
              <div
                className={`flex w-max gap-5 ${
                  index === 0
                    ? "materials-testimonial-row materials-testimonial-row--left"
                    : "materials-testimonial-row materials-testimonial-row--right"
                }`}
              >
                {duplicated.map((quote, quoteIndex) => (
                  <SocialProofCard key={`${quote}-${quoteIndex}`} quote={quote} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}

function FaqSection() {
  return (
    <SectionShell id="faq">
      <div className="mx-auto max-w-[900px] text-center">
        <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-[#9A671E] sm:text-sm">
          Dúvidas frequentes
        </p>
        <h2 className="mt-5 font-serif text-[clamp(2.2rem,7vw,4.8rem)] font-medium leading-[0.96] tracking-[-0.05em] text-[#090E1F]">
          Antes de pedir seus materiais personalizados
        </h2>
      </div>
      <div className="mx-auto mt-12 grid max-w-[920px] gap-4">
        {faqItems.map((item) => (
          <details key={item.question} className="faq-item bg-white/65">
            <summary>
              {item.question}
              <span aria-hidden="true">+</span>
            </summary>
            <div>
              <p>{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </SectionShell>
  );
}

function MaterialsLandingFooter() {
  return (
      <footer id="rodape" className="site-footer">
        <div className="site-footer-shell">
          <div className="site-footer-main">
            <div className="site-footer-brand">
              <Image
                src="/assets/assessoria-comercial/brand/logotipo-principal-rodape.png.png"
                alt="Grupo Vittore"
                width={2174}
                height={1080}
                className="site-footer-logo"
              />
              <div className="site-footer-copy">
                <p>Grupo Vittore</p>
                <p>Hub de Crescimento Empresarial</p>
                <p>Marketing, Vendas, Tecnologia e IA</p>
              </div>
            </div>
            <a className="site-footer-top-link" href="#topo">
              <span aria-hidden="true" />
              Retornar ao topo
            </a>
          </div>
          <div className="site-footer-bottom">
            <p>2026 © Grupo Vittore. Todos os direitos reservados.</p>
            <nav className="site-footer-links" aria-label="Links legais">
              <Link href="/politicas-de-privacidade">Políticas de privacidade</Link>
              <Link href="/termos-de-uso">Termos de uso</Link>
            </nav>
          </div>
        </div>
      </footer>
  );
}

function MaterialsPageStyles() {
  return (
    <style>{`
      @keyframes materials-marquee-left {
        from { transform: translate3d(0, 0, 0); }
        to { transform: translate3d(-50%, 0, 0); }
      }

      @keyframes materials-marquee-right {
        from { transform: translate3d(-50%, 0, 0); }
        to { transform: translate3d(0, 0, 0); }
      }

      .materials-testimonial-row {
        animation-duration: 44s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }

      .materials-testimonial-row:hover {
        animation-play-state: paused;
      }

      .materials-testimonial-row--left {
        animation-name: materials-marquee-left;
      }

      .materials-testimonial-row--right {
        animation-name: materials-marquee-right;
      }

      @media (max-width: 640px) {
        .materials-testimonial-row {
          animation-duration: 58s;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .materials-testimonial-row {
          animation: none;
          transform: translate3d(0, 0, 0);
        }
      }
    `}</style>
  );
}

export default function MateriaisImpressosPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#FBF8F4] text-[#090E1F]">
      <MaterialsPageStyles />
      <section id="topo" className="relative isolate overflow-x-clip bg-[#000617] text-[#FBF8F4]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(178,145,87,0.22),transparent_34%),linear-gradient(130deg,rgba(251,248,244,0.08),transparent_42%)]" />
        <div className="mx-auto grid min-h-[760px] w-full max-w-[1240px] items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,1.03fr)_minmax(360px,0.74fr)] lg:px-10 lg:py-28">
          <div className="relative z-10">
            <Eyebrow dark>Materiais Gráficos Personalizados</Eyebrow>
            <h1 aria-label={HERO_TITLE} className="mt-7 max-w-[900px] font-serif text-[clamp(2.7rem,10vw,6.75rem)] font-medium leading-[0.9] tracking-[-0.065em]">
              <span className="text-[#B29157]">Autoridade que se toca:</span>{" "}
              impressos premium que materializam sua marca.
            </h1>
            <p className="mt-8 max-w-[760px] text-lg leading-8 text-[#FBF8F4]/84 sm:text-[1.35rem] sm:leading-10">
              Cartões de visita, pastas, envelopes, folders, panfletos e blocos personalizados para profissionais e empresas que querem transmitir mais confiança, sofisticação e valor em cada detalhe.
            </p>
            <p className="mt-5 font-serif text-2xl leading-tight text-[#B29157] sm:text-3xl">
              Do conceito ao papel, presença que lidera.
            </p>
            <div className="mt-9 flex flex-col items-start gap-4">
              <WhatsAppButton>Quero mais informações</WhatsAppButton>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#FBF8F4]/65">
                Pedidos sob encomenda pelo WhatsApp. Entregamos para todo o Brasil.
              </p>
            </div>
          </div>
          <div className="relative z-10 hidden lg:block" aria-hidden="true">
            <div className="rounded-[36px] border border-[#B29157]/35 bg-[#FBF8F4]/8 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.32)]">
              <div className="aspect-[0.82] rounded-[28px] border border-[#FBF8F4]/12 bg-[#000617] p-7">
                <div className="h-full rounded-[22px] border border-[#B29157]/35 bg-[linear-gradient(155deg,#FBF8F4_0%,#E4D8C1_48%,#B29157_100%)] p-6">
                  <div className="flex h-full flex-col justify-between rounded-[18px] border border-[#090E1F]/12 bg-[#FBF8F4]/78 p-6 text-[#090E1F]">
                    <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-[#9A671E]">sob encomenda</p>
                    <div className="space-y-4">
                      <span className="block h-3 w-28 bg-[#090E1F]" />
                      <span className="block h-px w-full bg-[#B29157]" />
                      <span className="block h-3 w-44 bg-[#090E1F]/45" />
                    </div>
                    <p className="font-serif text-4xl leading-none">Presença física de marca</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {productSections.slice(0, 3).map((item) => (
        <ProductSection key={item.id} item={item} />
      ))}

      <SectionShell id="diferenciais" dark>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16">
          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
              <article key={benefit.title} className="rounded-[20px] border border-[#B29157]/34 bg-[#FBF8F4]/7 p-6 shadow-[0_18px_48px_rgba(0,0,0,0.18)]">
                <p className="text-sm font-extrabold text-[#B29157]">0{index + 1}</p>
                <h3 className="mt-4 font-serif text-2xl leading-tight text-[#FBF8F4]">{benefit.title}</h3>
                <p className="mt-4 text-base leading-7 text-[#FBF8F4]/76">{benefit.description}</p>
              </article>
            ))}
          </div>
          <div>
            <Eyebrow dark>Feito sob encomenda</Eyebrow>
            <h2 className="mt-6 max-w-[700px] font-serif text-[clamp(2.35rem,7vw,5.25rem)] font-medium leading-[0.92] tracking-[-0.06em]">
              Cada material é pensado para representar o nível da sua marca.
            </h2>
            <p className="mt-7 max-w-[680px] text-lg leading-8 text-[#FBF8F4]/78 sm:text-xl sm:leading-9">
              No Grupo Vittore, materiais gráficos não são tratados como produtos de prateleira. Cada pedido é feito sob encomenda, considerando o tipo de profissional, o público que ele atende, a imagem que deseja transmitir e o uso real do material.
            </p>
            <div className="mt-9">
              <WhatsAppButton>Falar com o Grupo Vittore</WhatsAppButton>
            </div>
          </div>
        </div>
      </SectionShell>

      <ProductSection item={productSections[3]} />
      <SocialProofSection />
      <FaqSection />

      <SectionShell id="cta-final" dark>
        <div className="mx-auto max-w-[1000px] text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-[#B29157] sm:text-sm">
            Sua marca no mundo físico
          </p>
          <h2 className="mt-6 font-serif text-[clamp(2.35rem,8vw,5.8rem)] font-medium leading-[0.92] tracking-[-0.06em]">
            Se a sua apresentação precisa transmitir mais valor, comece pelo material que o cliente vê, toca e guarda.
          </h2>
          <p className="mx-auto mt-7 max-w-[820px] text-lg leading-8 text-[#FBF8F4]/78 sm:text-xl sm:leading-9">
            Materiais gráficos personalizados ajudam sua marca a sair do comum e a ocupar uma presença mais profissional na mente do cliente. Do cartão à pasta, do folder ao bloco de anotações, cada detalhe pode reforçar autoridade, confiança e sofisticação.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <WhatsAppButton>Quero mais informações</WhatsAppButton>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#FBF8F4]/65">
              Fale pelo WhatsApp e solicite seu material sob encomenda.
            </p>
          </div>
        </div>
      </SectionShell>

      <MaterialsLandingFooter />
    </main>
  );
}
