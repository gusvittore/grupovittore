import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const MATERIALS_WHATSAPP_NUMBER = "5511966026686";
const DEFAULT_WHATSAPP_MESSAGE =
  "Olá, vim pelo site da empresa e gostaria de mais informações sobre os materiais gráficos.";

const heroBenefits = [
  { label: "Acabamento premium", icon: "diamond" },
  { label: "Atendimento personalizado", icon: "atendimento" },
  { label: "Entrega para todo Brasil", icon: "truck" },
  { label: "Qualidade que transmite confiança", icon: "shield" },
  { label: "Design estratégico para fortalecer sua marca", icon: "design" },
  { label: "Materiais que geram impacto", icon: "star" },
] as const;

const heroPrimaryBenefits = heroBenefits.slice(0, 3);
const heroSecondaryBenefits = heroBenefits.slice(3);

const customMadeItems = [
  {
    title: "Personalizado para cada cliente",
    description:
      "Nada de material genérico. Cada projeto é orientado para comunicar a presença, o posicionamento e o padrão visual da sua marca.",
    icon: "personalizado",
  },
  {
    title: "Pedidos pelo WhatsApp",
    description:
      "Todo atendimento acontece de forma prática pelo WhatsApp, com orientação para entender o que você precisa e qual material faz mais sentido para sua marca.",
    icon: "pedido-whatsapp",
  },
  {
    title: "Entrega para todo o Brasil",
    description:
      "Produzimos materiais personalizados e enviamos para clientes em todo o Brasil, mantendo cuidado na produção, acabamento e entrega.",
    icon: "entrega",
  },
  {
    title: "Design que transmite valor",
    description:
      "Cada material é pensado para comunicar profissionalismo antes mesmo da primeira conversa. A arte, a organização das informações e o cuidado visual ajudam sua marca a parecer mais confiável, sofisticada e preparada.",
    icon: "design-valor",
  },
] as const;

const testimonials = [
  {
    name: "Francielle Vieira",
    quote:
      "Superou minhas expectativas. O Gustavo desde o primeiro atendimento foi super solícito e os cartões chegaram antes do previsto, fora que são de ótima qualidade!",
  },
  {
    name: "Karoliny Machado",
    quote:
      "Fiquei encantada com cada detalhe. Desde o atendimento, sempre atencioso e prestativo, até a qualidade impecável dos produtos. As pastas ficaram maravilhosas, os blocos de anotações são lindíssimos e a agenda superou todas as minhas expectativas. Dá até pena de usar de tão perfeita que ficou!",
  },
  {
    name: "Thaís Ellen Aguiar",
    quote:
      "Se eu pudesse avaliar com mais do que 5 estrelas, daria 1000x, com toda a certeza! O pessoal da Vittore Impressão é excelente no que faz. Além de comunicarem cada etapa do serviço, mantêm a gente sempre atualizado sobre o andamento do trabalho.",
  },
  {
    name: "Carol Almeida",
    quote:
      "Excelente trabalho da equipe! Em menos de 7 dias, entre enviar material, aprovação de arte, etc., todos os materiais solicitados foram entregues! Além de agilidade, transparência, segurança e um trabalho primoroso! Obrigada!",
  },
  {
    name: "Ana Paula Goncalves Coelho",
    quote:
      "Excelente atendimento e serviços de qualidade impecável! Muito satisfeita, só tenho a agradecer!",
  },
  {
    name: "Elenilton P. Pinto",
    quote:
      "Excelente o atendimento e o melhor tudo a distância e uma qualidade do material excelente e chegou no tempo certo até antes, muito satisfeito. Já é a 2 vez que peço e recomendo para os colegas corretores.",
  },
  {
    name: "Brenda Servilher",
    quote:
      "Excelente experiência! Atendimento ágil, entrega rápida e qualidade impecável na impressão. O acabamento ficou de alto padrão, exatamente como esperávamos. Recomendo muito!!",
  },
  {
    name: "André Dieter Kempkens",
    quote: "Estão de parabéns, muito obrigado. Deus abençoe muito essa empresa. Aloha.",
  },
  {
    name: "Luana Divino",
    quote: "Atendimento excelente e serviço de qualidade, ficaram perfeitos. Super recomendo!",
  },
  {
    name: "Matheus Raismann",
    quote: "Atendimento impecável, entregaram conforme o combinado! Baita empresa.",
  },
  {
    name: "Ana Ferraz",
    quote:
      "Bom dia! Fui atendida pelo Gustavo e equipe e obtive um excelente atendimento! Educado e profissional. Cada detalhe do meu pedido que eu havia pensado, o Gustavo e sua equipe deu o seu melhor trabalho, superou as minhas expectativas, as cores e o designer ficaram bem com as características do meu perfil profissional.",
  },
  {
    name: "Flavio Moura Moura",
    quote: "Super recomendo! Trabalho top de vocês, fiz todo material digital e impresso para minha empresa.",
  },
  {
    name: "Stephanie Cristina Lopes",
    quote: "Os cartões são realmente muito bonitos, entrega rápida e estou muito satisfeita com a minha compra.",
  },
  {
    name: "Miguel Cardoso",
    quote: "Recomendo a todos. Ficou muito top o cartão de visita. Parabéns Gustavo, vocês são muito profissionais.",
  },
  {
    name: "Francico Amisterdam",
    quote: "Empresa de confiança, ótimo atendimento e excelente qualidade no produto.",
  },
  {
    name: "Amanda Oliveira Silva",
    quote: "Atendimento ágil e cordial, tempo de entrega antes do esperado, ótimo valor e ótima qualidade. Atendida pelo Gustavo, ótimo profissional.",
  },
  {
    name: "Rafaela Roder",
    quote: "O atendimento é rápido, as informações bem claras e chegou tudo certinho, indico muito.",
  },
  {
    name: "Rosana Pinto Pessoa",
    quote:
      "Excelente atendimento! Meu agradecimento ao Gustavo e a toda a equipe pela atenção, carinho e dedicação na criação do meu cartão de visita. O resultado ficou simplesmente lindo! Super recomendo. Chegou antes do prazo!!!",
  },
  {
    name: "Claudia Carrenho",
    quote:
      "Excelente experiência com a empresa, já compramos anteriormente e recomendo, ótimos produtos, cuidado na qualidade. Desta vez inovamos com as pastas, ficaram lindas, qualidade de impressão excelente! Atendimento diferenciado e entrega rápida, super recomendo.",
  },
  {
    name: "Helen Zadeh",
    quote: "Atendimento muito rápido, tudo muito bem explicadinho. Os flyers chegaram rápido e são de muito boa qualidade.",
  },
  {
    name: "Danilo Pagamisse Michelan",
    quote: "Ótimo atendimento, material de qualidade e muita rapidez na produção e entrega.",
  },
  {
    name: "Ranielly Sousa",
    quote: "Atendimento impecável, desde a conversa no WhatsApp até o serviço pronto. Amei meus cartões, ficaram lindos e o preço é justo!",
  },
  {
    name: "Henrique Matos",
    quote:
      "Pesquisei a empresa aqui no Google, falei com Gustavo que me atendeu super bem, nos ajudou com a arte do cartão e o produto ficou muito bom. Qualidade no atendimento, auxílio e entrega do produto antes do prazo.",
  },
  {
    name: "Mileidy Trovelli",
    quote: "Qualidade maravilhosa dos cartões e atendimento perfeito! Sem comentários. Amei a experiência.",
  },
  {
    name: "Gabriel Nogueira da Rosa",
    quote:
      "Fiz os pedidos dos cartões, top demais, chegou antes do prazo. Vendedor Gustavo super persuasivo, ético e um especialista que entende as necessidades do cliente, oferecendo soluções que agregam valor, em vez de apenas vender um produto. Muito obrigado.",
  },
  {
    name: "Selma Oliveira",
    quote:
      "Atendimento perfeito, digno de nota 10. Amei tudo, desde o atendimento até a entrega. A confecção dos cartões foi super rápida, prática e a qualidade ótima. Super indico. Um agradecimento especial ao Gustavo que foi muito simpático, educado e profissional.",
  },
  {
    name: "Cazzuni Advocacia",
    quote:
      "Qualidade impecável, o trabalho entregue consegue ser ainda melhor do que o esperado. Sempre dão dicas para o material ficar ainda mais bonito! Indico demais, nunca decepcionam, fora que a entrega é super ágil!",
  },
  {
    name: "Evelyn Lopes",
    quote:
      "Simplesmente impecável, desde o atendimento até a entrega. Chegou super rápido, bem antes do previsto, o atendente é muito prestativo e atencioso. Super recomendo!",
  },
  {
    name: "Carolina Schroder",
    quote: "Fiz meus cartões de visita e ficaram do jeito que pedi, ótimo atendimento e entrega rápida.",
  },
  {
    name: "Marcio Tokashiki",
    quote: "Empresa muito atenciosa, são extremamente profissionais. Meus cartões que pedi chegaram dentro do prazo e do jeito que tinha pedido.",
  },
  {
    name: "Vilmar Brasil (Junior)",
    quote: "Trabalho magnífico dessa empresa, desde o primeiro contato até a chegada aqui em casa.",
  },
] as const;

const testimonialRows = [
  testimonials.slice(0, 16),
  testimonials.slice(16),
] as const;

const faqItems = [
  {
    question: "Os pedidos são feitos somente por encomenda?",
    answer:
      "Sim. Todos os materiais são produzidos sob encomenda, porque cada cliente possui uma necessidade diferente. Primeiro, entendemos o que a empresa busca e ajudamos na escolha da opção mais adequada entre os modelos, materiais e acabamentos disponíveis. Depois, nossa equipe de design personaliza a arte de acordo com a identidade visual e as informações do cliente. A produção é iniciada somente após a aprovação final da arte.",
  },
  {
    question: "Vocês entregam para todo o Brasil?",
    answer:
      "Sim. Atendemos clientes de todas as regiões do país e enviamos os materiais personalizados para todo o Brasil. Após a produção, o pedido é preparado com cuidado para o transporte e encaminhado ao endereço informado pelo cliente.",
  },
  {
    question: "O pedido é feito pelo WhatsApp?",
    answer:
      "Sim. Todo o atendimento e a realização do pedido acontecem pelo WhatsApp. Por lá, entendemos o que você precisa, apresentamos as opções disponíveis, esclarecemos suas dúvidas e preparamos o orçamento. Após a confirmação do pedido, seguimos com a personalização da arte, enviamos para sua aprovação e, somente depois, encaminhamos o material para produção.",
  },
  {
    question: "Vocês trabalham para todos os públicos?",
    answer:
      "Sim. Trabalhamos para todos os públicos, desde profissionais autônomos até empresas de diferentes segmentos. Atendemos corretores de imóveis, imobiliárias, advogados, contadores, empresários, prestadores de serviços e empreendedores que desejam se apresentar de forma mais profissional e se destacar no mercado. Nossos materiais são pensados para quem busca impressos personalizados, com mais presença visual, qualidade e uma apresentação que valorize a marca.",
  },
  {
    question: "Quais materiais vocês produzem?",
    answer:
      "Produzimos cartões de visita, pastas, envelopes, panfletos, folders, blocos de anotações e outros materiais gráficos personalizados. Cada produto conta com opções específicas de modelos, materiais e acabamentos, e a arte é desenvolvida de acordo com a identidade visual, as informações e o objetivo de cada cliente.",
  },
  {
    question: "Vocês criam a arte ou preciso enviar pronta?",
    answer:
      "Caso você ainda não tenha a arte pronta, nossa equipe de design realiza a personalização do material com base nas informações, cores, referências e orientações que você nos enviar. Esse serviço não possui custo adicional. O único ponto a considerar é o prazo de desenvolvimento, que normalmente varia entre 24 e 48 horas, conforme a complexidade da criação ou a necessidade de ajustes em um layout já existente. Após a finalização, a arte é enviada para sua aprovação antes de seguir para produção.",
  },
  {
    question: "Existe pedido mínimo?",
    answer:
      "Sim. Cada produto possui uma quantidade mínima de produção, que pode variar conforme o tipo de material escolhido. Durante o atendimento, informamos a quantidade mínima correspondente ao produto de interesse e apresentamos as opções disponíveis para que você escolha a mais adequada à sua necessidade.",
  },
  {
    question: "Quanto tempo demora para produzir?",
    answer:
      "O prazo de produção varia de acordo com o produto solicitado, mas, na maioria dos casos, o material fica pronto em até 48 horas, considerando dois dias úteis de produção. Após a finalização, o prazo de entrega dependerá da região e da modalidade de envio escolhida.",
  },
  {
    question: "Vocês oferecem garantia de satisfação?",
    answer:
      "Sim. Somos uma das poucas empresas com produção gráfica que oferecem garantia incondicional de satisfação. Nosso compromisso não termina na entrega: queremos que você fique realmente satisfeito com o material recebido e com toda a experiência de compra. Esse cuidado é refletido nas mais de 200 avaliações que temos no Google, todas com cinco estrelas.",
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

function WhatsAppIcon() {
  return (
    <Image
      aria-hidden="true"
      src="/assets/materiais-impressos/icons/whatsapp-icon.png.png"
      alt=""
      width={56}
      height={56}
      className="h-7 w-7 flex-none object-contain"
    />
  );
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
      className={`hero-primary-button gap-3 border border-[#4ED06B]/55 shadow-[0_18px_42px_rgba(0,165,61,0.24)] ${className}`}
    >
      <WhatsAppIcon />
      <span>{children}</span>
    </a>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="materials-hero-eyebrow text-sm font-medium leading-5 tracking-[0.02em] text-[#B29157] sm:text-base"
    >
      <span>{children}</span>
    </p>
  );
}

function ControlledMobileTitle({
  children,
  className = "",
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <span className={`materials-mobile-controlled-title ${className}`} aria-label={ariaLabel}>
      {children}
    </span>
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

function HeroBenefitIcon({ icon }: { icon: (typeof heroBenefits)[number]["icon"] }) {
  const commonProps = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.45,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (icon === "diamond") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48" className="h-10 w-10" {...commonProps}>
        <path d="M5 17 13 7h22l8 10-19 24L5 17Z" />
        <path d="m13 7 6 10L24 7l5 10 6-10M5 17h38M19 17l5 24 5-24" />
      </svg>
    );
  }

  if (icon === "atendimento") {
    return (
      <Image
        aria-hidden="true"
        src="/assets/materiais-impressos/icons/atendimento-personalizado.png.png"
        alt=""
        width={56}
        height={56}
        className="h-10 w-10 object-contain"
      />
    );
  }

  if (icon === "truck") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48" className="h-10 w-10" {...commonProps}>
        <path d="M4 12h25v24H4zM29 21h8l7 8v7H29zM10 36a4 4 0 1 0 8 0M34 36a4 4 0 1 0 8 0M9 18h14M9 24h9" />
      </svg>
    );
  }

  if (icon === "shield") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48" className="h-10 w-10" {...commonProps}>
        <path d="M24 4c5 4 11 6 17 7v12c0 10-6 17-17 21C13 40 7 33 7 23V11c6-1 12-3 17-7Z" />
        <path d="m16 24 5 5 11-12" />
      </svg>
    );
  }

  if (icon === "design") {
    return (
      <Image
        aria-hidden="true"
        src="/assets/materiais-impressos/icons/design-estrategico.png.png"
        alt=""
        width={56}
        height={56}
        className="h-10 w-10 object-contain xl:h-[46px] xl:w-[46px]"
      />
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      className="h-11 w-11"
      {...commonProps}
    >
      <path d="m24 4 5.8 11.8L43 17.7l-9.5 9.2 2.2 13L24 33.7 12.3 40l2.2-13L5 17.7l13.2-1.9L24 4Z" />
    </svg>
  );
}

function HeroBenefit({
  benefit,
  className = "",
}: {
  benefit: (typeof heroBenefits)[number];
  className?: string;
}) {
  return (
    <li className={`flex min-w-0 items-center gap-4 text-sm font-medium uppercase leading-5 tracking-[0.04em] text-[#FBF8F4]/90 ${className}`}>
      <span className={`flex flex-none items-center justify-center text-[#B29157] ${benefit.icon === "design" ? "h-11 w-11 xl:h-12 xl:w-12" : "h-11 w-11"}`}>
        <HeroBenefitIcon icon={benefit.icon} />
      </span>
      <span>{benefit.label}</span>
    </li>
  );
}

function HeroSection() {
  return (
    <section
      id="topo"
      className="materials-hero relative overflow-hidden bg-[#000617] text-[#FBF8F4]"
    >
      <div className="materials-hero-artwork-frame absolute left-0 top-0 aspect-[1672/941] w-full xl:inset-y-0 xl:left-auto xl:right-0 xl:h-auto xl:w-[67%] xl:aspect-auto">
        <Image
          src="/assets/materiais-impressos/brand/background-hero.png.png"
          alt="Materiais gráficos premium personalizados com cartões, pastas, folders e papelaria corporativa"
          fill
          preload
          sizes="(max-width: 1279px) 100vw, 67vw"
          className="materials-hero-image object-cover xl:object-fill object-center"
        />
      </div>
      <div className="absolute inset-0 hidden xl:block">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,6,23,0.99)_0%,rgba(0,6,23,0.98)_36%,rgba(0,6,23,0.9)_47%,rgba(0,6,23,0.32)_64%,rgba(0,6,23,0.08)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,6,23,0.02)_55%,rgba(0,6,23,0.9)_100%)]" />
      </div>

      <div className="materials-hero-mobile xl:hidden">
        <div className="materials-hero-mobile-image-spacer relative w-full overflow-hidden">
          <div className="materials-hero-mobile-image-shade absolute inset-0" />
        </div>

        <div className="px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-12">
          <Eyebrow>Materiais Gráficos Personalizados</Eyebrow>
          <h1 className="mt-6 max-w-[24rem] font-serif text-[clamp(2.3rem,9.4vw,2.7rem)] font-medium leading-[0.98] tracking-[-0.035em] sm:max-w-[34rem] sm:text-[clamp(3rem,7vw,4rem)]">
            <ControlledMobileTitle ariaLabel="Autoridade que se toca: impressos premium que materializam sua marca.">
              <span className="block">Autoridade que</span>
              <span className="block">se toca: impressos</span>
              <span className="block"><span className="text-[#B29157]">premium</span> que</span>
              <span className="block">materializam sua</span>
              <span className="block">marca.</span>
            </ControlledMobileTitle>
          </h1>
          <p className="mt-7 max-w-[690px] text-xl leading-9 text-[#FBF8F4]/88 sm:text-2xl sm:leading-10">
            Cartões de visita, pastas, envelopes, folders, panfletos e blocos personalizados para profissionais e empresas que querem transmitir mais confiança, sofisticação e valor em cada detalhe.
          </p>
          <p className="mt-5 text-[1.35rem] font-medium leading-8 text-[#B29157] sm:text-[1.6rem] sm:leading-9">
            Do conceito ao papel, presença que lidera.
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:max-w-[620px] sm:flex-row sm:items-center sm:gap-4">
            <WhatsAppButton className="materials-hero-primary w-full sm:w-auto">Quero mais informações</WhatsAppButton>
          </div>
          <p className="mt-5 max-w-[660px] text-sm font-medium uppercase leading-6 tracking-[0.1em] text-[#FBF8F4]/78 sm:text-base">
            Pedidos sob encomenda pelo WhatsApp. Entregamos para <span className="text-[#B29157]">todo o Brasil.</span>
          </p>

          <ul aria-label="Benefícios dos materiais personalizados" className="mt-8 grid border-t border-[#B29157]/35 pt-4">
            {heroBenefits.map((benefit) => (
              <HeroBenefit key={benefit.label} benefit={benefit} />
            ))}
          </ul>
        </div>
      </div>

      <div className="materials-hero-desktop relative z-10 mx-auto hidden w-full max-w-[1560px] flex-col px-[clamp(3rem,3.8vw,4rem)] pb-8 pt-[clamp(4.4rem,5.7vw,6rem)] xl:flex">
        <div className="w-[min(46vw,700px)]">
          <Eyebrow>Materiais Gráficos Personalizados</Eyebrow>
          <h1 className="materials-hero-title-desktop mt-6 font-serif text-[clamp(3.5rem,4.35vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.015em]">
            <span className="block whitespace-nowrap">Autoridade que se toca:</span>
            <span className="block whitespace-nowrap">impressos <span className="text-[#B29157]">premium</span> que</span>
            <span className="block whitespace-nowrap">materializam sua marca.</span>
          </h1>
          <p className="mt-6 max-w-[680px] text-[clamp(1.12rem,1.26vw,1.36rem)] leading-[1.56] text-[#FBF8F4]/90">
            Cartões de visita, pastas, envelopes, folders, panfletos e blocos personalizados para profissionais e empresas que querem transmitir mais confiança, sofisticação e valor em cada detalhe.
          </p>
          <p className="mt-4 text-[clamp(1.22rem,1.4vw,1.46rem)] font-normal leading-9 text-[#B29157]">
            Do conceito ao papel, presença que lidera.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <WhatsAppButton className="materials-hero-primary">Quero mais informações</WhatsAppButton>
          </div>
          <p className="mt-4 max-w-[680px] text-[0.88rem] font-medium uppercase leading-6 tracking-[0.09em] text-[#FBF8F4]/78">
            Pedidos sob encomenda pelo WhatsApp. Entregamos para <span className="text-[#B29157]">todo o Brasil.</span>
          </p>
        </div>

        <div className="mt-5">
          <ul aria-label="Principais benefícios dos materiais personalizados" className="materials-hero-primary-benefits grid w-[min(53vw,780px)] grid-cols-[1fr_1.08fr_1.14fr] border-t border-[#B29157]/40 pt-4">
            {heroPrimaryBenefits.map((benefit, index) => (
              <HeroBenefit
                key={benefit.label}
                benefit={benefit}
                className={index === 1 ? "border-l border-[#B29157]/35 pl-8" : index === 2 ? "border-l border-[#B29157]/35 pl-10" : ""}
              />
            ))}
          </ul>
          <ul aria-label="Outros benefícios dos materiais personalizados" className="materials-hero-secondary-benefits mt-4 grid w-[min(66vw,1020px)] grid-cols-3 gap-x-12 border-t border-[#B29157]/40 pt-4">
            {heroSecondaryBenefits.map((benefit) => (
              <HeroBenefit key={benefit.label} benefit={benefit} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function SocialProofCard({ testimonial }: { testimonial: (typeof testimonials)[number] }) {
  return (
    <article className="min-h-[232px] w-[300px] flex-none rounded-[18px] border border-[#B29157]/35 bg-white/80 p-6 shadow-[0_16px_40px_rgba(9,14,31,0.07)] sm:w-[370px] sm:p-7">
      <div className="flex items-start justify-between gap-5">
        <p className="text-lg leading-none text-[#B29157]" aria-label="5 estrelas">
          ★★★★★
        </p>
        <Image
          src="/assets/materiais-impressos/icons/google-search-logo-icon-free-png.webp"
          alt="Google"
          width={72}
          height={72}
          className="h-6 w-6 flex-none object-contain opacity-80"
        />
      </div>
      <h3 className="mt-4 text-lg font-extrabold leading-6 text-[#090E1F] sm:text-xl">
        {testimonial.name}
      </h3>
      <p className="mt-3 text-[1.05rem] leading-7 text-[#26344D] sm:text-[1.12rem]">{testimonial.quote}</p>
    </article>
  );
}

function SocialProofSection() {
  return (
    <SectionShell id="prova-social" className="overflow-hidden">
      <div className="mx-auto max-w-[900px] text-center">
        <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-[#B29157] sm:text-sm">
          Confiança comprovada
        </p>
        <h2 className="mt-5 font-serif text-[clamp(2.05rem,5.8vw,4.05rem)] font-medium leading-[1.02] tracking-[-0.035em] text-[#090E1F]">
          Mais de 200 avaliações no Google. Todas com 5 estrelas.
        </h2>
        <p className="mx-auto mt-6 max-w-[790px] text-xl leading-9 text-[#26344D] sm:text-[1.32rem] sm:leading-10">
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
                {duplicated.map((testimonial, quoteIndex) => (
                  <SocialProofCard key={`${testimonial.name}-${quoteIndex}`} testimonial={testimonial} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}

function CustomMadeIcon({ icon }: { icon: (typeof customMadeItems)[number]["icon"] }) {
  const iconSources = {
    personalizado: "/assets/materiais-impressos/icons/personalizado-cada-cliente.png.png",
    "pedido-whatsapp": "/assets/materiais-impressos/icons/pedidos-whatsapp.png.png",
    entrega: "/assets/materiais-impressos/icons/entrega-brasil.png.png",
    "design-valor": "/assets/materiais-impressos/icons/design-valor.png.png",
  } as const;

  return (
    <Image
      aria-hidden="true"
      src={iconSources[icon]}
      alt=""
      width={72}
      height={72}
      className="h-12 w-12 object-contain"
    />
  );
}

function CustomMadeSection() {
  return (
    <section
      id="feito-sob-encomenda"
      className="materials-custom-made-section relative overflow-hidden bg-[#000617] text-[#FBF8F4]"
    >
      <div className="materials-custom-made-shell relative mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-8 sm:py-24 xl:px-0 xl:pb-28 xl:pt-14">
        <div className="mx-auto max-w-[1100px] text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-[#B29157] sm:text-sm">
            Feito sob encomenda
          </p>
          <h2 className="materials-custom-title-mobile mx-auto mt-7 max-w-[720px] font-serif font-medium leading-[1.02] tracking-[-0.03em] xl:hidden">
            <ControlledMobileTitle className="materials-mobile-section-title" ariaLabel="Cada material é pensado para representar o nível da sua marca.">
              <span className="block">Cada material</span>
              <span className="block">é pensado para</span>
              <span className="block">representar o nível</span>
              <span className="block">da sua marca.</span>
            </ControlledMobileTitle>
          </h2>
          <h2 className="materials-custom-title-desktop mx-auto mt-7 hidden max-w-[1040px] font-serif text-[4.05rem] font-medium leading-[1.06] tracking-[-0.018em] xl:block">
            <span className="block whitespace-nowrap">Cada material é pensado</span>
            <span className="block whitespace-nowrap">para representar o nível da sua marca.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[820px] text-xl leading-[1.65] text-[#FBF8F4]/80 sm:text-[1.28rem] xl:text-[1.22rem]">
            No Grupo Vittore, materiais gráficos não são tratados como produtos de prateleira. Cada pedido é feito sob encomenda, considerando o tipo de profissional, o público que ele atende, a imagem que deseja transmitir e o uso real do material.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-[1000px] gap-6 lg:grid-cols-2 xl:mt-9">
          {customMadeItems.map((item, index) => (
            <article
              key={item.title}
              className="group relative grid min-w-0 gap-5 rounded-[12px] border border-[#B29157]/55 bg-[#081323]/72 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition-colors hover:border-[#B29157]/80 sm:grid-cols-[96px_minmax(0,1fr)] xl:h-[285px]"
            >
              <div className="flex h-[90px] w-[90px] self-center items-center justify-center rounded-full border border-[#B29157]/55 text-[#B29157] shadow-[inset_0_0_30px_rgba(178,145,87,0.04)]">
                <CustomMadeIcon icon={item.icon} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold tracking-[0.16em] text-[#B29157]">
                  {String(index + 1).padStart(2, "0")}
                  <span className="mt-2 block h-px w-8 bg-[#B29157]" aria-hidden="true" />
                </p>
                <h3 className="mt-3 text-balance font-serif text-[1.55rem] font-medium leading-[1.08] text-[#FBF8F4]">
                  {item.title}
                </h3>
                <p className="mt-4 text-[1.05rem] leading-[1.58] text-[#FBF8F4]/76">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center xl:mt-9">
          <WhatsAppButton className="materials-custom-cta w-full sm:w-auto">Quero mais informações</WhatsAppButton>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <SectionShell id="faq">
      <div className="mx-auto max-w-[900px] text-center">
        <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-[#B29157] sm:text-sm">
          Dúvidas frequentes
        </p>
        <h2 className="mt-5 font-serif font-medium leading-[1.02] tracking-[-0.035em] text-[#090E1F]">
          <ControlledMobileTitle className="materials-mobile-section-title block sm:hidden" ariaLabel="Antes de pedir seus materiais personalizados">
            <span className="block">Antes de pedir</span>
            <span className="block">seus materiais</span>
            <span className="block">personalizados</span>
          </ControlledMobileTitle>
          <span className="hidden text-[clamp(2.05rem,5.8vw,4.05rem)] sm:block">
            Antes de pedir seus materiais personalizados
          </span>
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
              <p className="text-[1.05rem] leading-8 sm:text-[1.12rem]">{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </SectionShell>
  );
}

function FinalCtaSection() {
  return (
    <section
      id="cta-final"
      className="materials-final-cta-section relative overflow-hidden bg-[#000617] text-[#FBF8F4]"
    >
      <Image
        src="/assets/materiais-impressos/brand/background-sua-marca-no-mundo-referencia3.png.png"
        alt="Materiais gráficos personalizados em mesa premium com agenda, cartões e folder corporativo"
        fill
        sizes="100vw"
        className="materials-final-cta-background object-cover object-center"
      />
      <div className="absolute inset-0 bg-[#000617]/44" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(9,14,31,0.08),rgba(0,6,23,0.5)_74%)]" aria-hidden="true" />

      <div className="materials-final-cta-shell relative mx-auto flex w-full max-w-[1180px] flex-col items-center px-5 py-20 text-center sm:px-8 sm:py-24 xl:px-0 xl:py-0">
        <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-[#B29157] sm:text-sm">
          Sua marca no mundo físico
        </p>
        <h2 className="materials-final-title-mobile mx-auto mt-7 max-w-[920px] font-serif font-medium leading-[1.04] tracking-[-0.028em] xl:hidden">
          <ControlledMobileTitle className="materials-mobile-section-title" ariaLabel="Se a sua apresentação precisa transmitir mais valor, comece pelo material que o cliente vê, toca e guarda.">
            <span className="block">Se a sua apresentação</span>
            <span className="block">precisa transmitir mais</span>
            <span className="block">valor, comece pelo</span>
            <span className="block">material que o cliente</span>
            <span className="block">vê, toca e guarda.</span>
          </ControlledMobileTitle>
        </h2>
        <h2 className="materials-final-title-desktop mx-auto mt-7 hidden max-w-[980px] font-serif text-[4.05rem] font-medium leading-[1.06] tracking-[-0.018em] xl:block">
          <span className="block whitespace-nowrap">Se a sua apresentação</span>
          <span className="block whitespace-nowrap">precisa transmitir mais valor,</span>
          <span className="block whitespace-nowrap">comece pelo material que o</span>
          <span className="block whitespace-nowrap">cliente vê, toca e guarda.</span>
        </h2>
        <p className="mx-auto mt-7 max-w-[900px] text-xl leading-9 text-[#FBF8F4]/90 sm:text-[1.3rem] sm:leading-10 xl:text-[1.25rem] xl:leading-[1.62]">
          Materiais gráficos personalizados ajudam sua marca a sair do comum e a ocupar uma presença mais profissional na mente do cliente. Do cartão à pasta, do folder ao bloco de anotações, cada detalhe pode reforçar autoridade, confiança e sofisticação.
        </p>
        <div className="mt-9 flex w-full justify-center sm:w-auto">
          <WhatsAppButton className="materials-final-cta-button w-full sm:w-auto">Quero mais informações</WhatsAppButton>
        </div>
        <p className="mt-6 text-base font-medium leading-7 tracking-[0.02em] text-[#B29157] sm:text-lg">
          Fale pelo WhatsApp e solicite seu material sob encomenda.
        </p>
      </div>
    </section>
  );
}

function FloatingWhatsAppButton() {
  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir WhatsApp para solicitar informações sobre materiais gráficos"
      className="materials-floating-whatsapp fixed right-5 z-40 flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-[#25D366] text-white shadow-[0_18px_44px_rgba(0,0,0,0.28)] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B29157] sm:right-8 sm:h-[70px] sm:w-[70px]"
    >
      <WhatsAppIcon />
      <span className="sr-only">WhatsApp</span>
    </a>
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
      .materials-hero-primary {
        min-width: 340px;
      }

      .materials-hero-secondary {
        min-width: 278px;
      }

      .materials-custom-cta {
        width: 510px;
        min-height: 80px;
        font-size: 0.98rem;
      }

      .materials-custom-cta svg {
        width: 34px;
        height: 34px;
      }

      .materials-final-cta-button {
        width: 520px;
        min-height: 78px;
        font-size: 1.05rem;
        letter-spacing: 0.12em;
      }

      .materials-final-cta-button svg {
        width: 36px;
        height: 36px;
      }

      .materials-mobile-controlled-title {
        max-width: 100%;
        text-wrap: normal;
        word-break: normal;
        overflow-wrap: normal;
      }

      .materials-mobile-section-title {
        font-size: clamp(2.05rem, 5.8vw, 4.05rem);
        line-height: 1.02;
        letter-spacing: -0.03em;
      }

      .materials-hero-artwork-frame {
        aspect-ratio: 941 / 760;
      }

      .materials-hero-mobile-image-spacer {
        aspect-ratio: 941 / 760;
      }

      @media (max-width: 1279px) {
        .materials-hero-image {
          object-position: 56% 50%;
        }
      }

      .materials-hero-mobile-image-shade {
        background: linear-gradient(180deg, rgba(0, 6, 23, 0) 62%, rgba(0, 6, 23, 0.28) 84%, #000617 100%);
      }

      .materials-hero-mobile ul > li {
        min-height: 64px;
        border-bottom: 1px solid rgba(178, 145, 87, 0.2);
        padding: 10px 0;
      }

      .materials-floating-whatsapp {
        bottom: max(2rem, calc(env(safe-area-inset-bottom) + 1.25rem));
        opacity: 0;
        pointer-events: none;
        transform: translate3d(0, 18px, 0) scale(0.96);
        animation: materials-floating-whatsapp-in 0.5s ease 5s forwards;
      }

      .materials-floating-whatsapp img {
        width: 34px;
        height: 34px;
      }

      @media (min-width: 1280px) {
        .materials-hero {
          min-height: max(790px, 56.28vw);
        }

        .materials-hero-artwork-frame {
          aspect-ratio: auto;
        }

        .materials-custom-made-section {
          aspect-ratio: 9 / 7;
          min-height: 1200px;
        }

        .materials-custom-made-shell {
          position: absolute;
          inset-block: 0;
          left: 0;
          right: auto;
          width: 100vw;
          max-width: none;
          margin-inline: 0;
        }

        .materials-final-cta-section {
          aspect-ratio: 1672 / 941;
          min-height: 810px;
        }

        .materials-final-cta-shell {
          position: absolute;
          inset: 0;
          justify-content: center;
        }
      }

      @media (max-width: 640px) {
        .materials-hero-primary,
        .materials-hero-secondary {
          width: 100%;
          min-width: 0;
        }

        .materials-custom-cta,
        .materials-final-cta-button {
          width: 100%;
          min-width: 0;
          min-height: 58px;
          font-size: 0.78rem;
          letter-spacing: 0.08em;
        }

        .materials-custom-cta svg,
        .materials-final-cta-button svg {
          width: 28px;
          height: 28px;
        }

        .materials-final-cta-section {
          min-height: 760px;
        }

        .materials-final-cta-background {
          object-position: 50% 50%;
        }

        .materials-floating-whatsapp {
          right: 1rem;
          bottom: max(1.5rem, calc(env(safe-area-inset-bottom) + 1rem));
        }

        .materials-floating-whatsapp img {
          width: 30px;
          height: 30px;
        }
      }

      @keyframes materials-floating-whatsapp-in {
        to {
          opacity: 1;
          pointer-events: auto;
          transform: translate3d(0, 0, 0) scale(1);
        }
      }

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
      <HeroSection />
      <SocialProofSection />
      <CustomMadeSection />
      <FaqSection />
      <FinalCtaSection />
      <MaterialsLandingFooter />
      <FloatingWhatsAppButton />
    </main>
  );
}
