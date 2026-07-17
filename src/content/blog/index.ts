export const BLOG_CATEGORIES = [
  "Todos",
  "Vendas",
  "Marketing",
  "Materiais Gráficos",
  "Tecnologia",
  "Gestão Comercial",
  "Crescimento Empresarial",
] as const;

export type BlogCategory = Exclude<(typeof BLOG_CATEGORIES)[number], "Todos">;

export type HomeCardPresentation = {
  category: string;
  description: string;
  image: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  category: BlogCategory;
  tags: string[];
  readingTime: string;
  coverImage: string;
  image: string;
  homeCardTitleMobileLines: readonly string[];
  homeCardTitleDesktopLines?: readonly string[];
  blogCardTitleMobileLines?: readonly string[];
  blogFeaturedTitleMobileLines?: readonly string[];
  homeCard: HomeCardPresentation;
  featured?: boolean;
  recommended?: boolean;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "gargalos-comerciais-antes-de-investir-em-trafego",
    title: "Como identificar gargalos comerciais antes de investir mais em tráfego",
    excerpt:
      "Antes de aumentar o orçamento, a empresa precisa entender onde perde oportunidades no processo comercial e por que a geração de demanda nem sempre se transforma em receita.",
    description:
      "Antes de aumentar o orçamento, a empresa precisa entender onde perde oportunidades no processo comercial e por que a geração de demanda nem sempre se transforma em receita.",
    category: "Vendas",
    tags: ["Vendas", "Processo Comercial", "Diagnóstico"],
    readingTime: "6 min de leitura",
    coverImage: "/assets/blog/brand/artigo-identificar-gargalos.png.png",
    image: "/assets/blog/brand/artigo-identificar-gargalos.png.png",
    homeCardTitleMobileLines: ["Como identificar", "gargalos comerciais", "antes de investir mais", "em tráfego"],
    blogFeaturedTitleMobileLines: ["Como identificar", "gargalos comerciais", "antes de investir mais", "em tráfego"],
    homeCard: {
      category: "Gestão comercial",
      description: "Prévia visual de conteúdo sobre leitura comercial, sinais de ineficiência e tomada de decisão antes de ampliar investimento.",
      image: "/assets/home-institucional/brand/sessao-4-identificar-gargalos.png.png",
    },
    featured: true,
    recommended: true,
  },
  {
    slug: "materiais-graficos-fortalecem-presenca-da-marca",
    title: "Por que materiais gráficos ainda fortalecem a presença da marca",
    excerpt: "Materiais impressos continuam sendo pontos de contato importantes para transmitir profissionalismo, confiança e presença física.",
    description: "Materiais impressos continuam sendo pontos de contato importantes para transmitir profissionalismo, confiança e presença física.",
    category: "Materiais Gráficos",
    tags: ["Materiais Gráficos", "Branding", "Presença de Marca"],
    readingTime: "5 min de leitura",
    coverImage: "/assets/blog/brand/artigo-materiais-fortalecem-presenca.png.png",
    image: "/assets/blog/brand/artigo-materiais-fortalecem-presenca.png.png",
    homeCardTitleMobileLines: ["Por que materiais", "gráficos ainda fortalecem", "a presença da marca"],
    blogFeaturedTitleMobileLines: ["Por que materiais", "gráficos ainda fortalecem", "a presença da marca"],
    homeCard: {
      category: "Marca e presença",
      description: "Prévia visual de conteúdo sobre reconhecimento, percepção de valor e presença física da marca no relacionamento com o mercado.",
      image: "/assets/home-institucional/brand/sessao-4-materiais-fortalecem-presenca.png.png",
    },
    recommended: true,
  },
  {
    slug: "marketing-vendas-tecnologia-conectar-tres-areas",
    title: "Marketing, vendas e tecnologia: como conectar as três áreas",
    excerpt: "Quando essas áreas trabalham isoladas, a empresa perde controle. Quando se conectam, o crescimento ganha mais clareza.",
    description: "Quando essas áreas trabalham isoladas, a empresa perde controle. Quando se conectam, o crescimento ganha mais clareza.",
    category: "Marketing",
    tags: ["Marketing", "Vendas", "Tecnologia"],
    readingTime: "7 min de leitura",
    coverImage: "/assets/blog/brand/artigo-marketing-vendas-tecnologia.png.png",
    image: "/assets/blog/brand/artigo-marketing-vendas-tecnologia.png.png",
    homeCardTitleMobileLines: ["Marketing, vendas", "e tecnologia: como", "conectar as três áreas."],
    blogFeaturedTitleMobileLines: ["Marketing, vendas", "e tecnologia: como", "conectar as três áreas."],
    homeCard: {
      category: "Estratégia integrada",
      description: "Prévia visual de conteúdo sobre alinhamento operacional, clareza de dados e integração entre frentes de crescimento.",
      image: "/assets/home-institucional/brand/sessao-4-marketing-vendas-tecnologia.png.png",
    },
  },
  {
    slug: "organizar-antes-de-escalar-aquisicao",
    title: "O que uma empresa precisa organizar antes de escalar aquisição",
    excerpt: "Escalar aquisição sem processo comercial pode aumentar desperdícios. A estrutura precisa vir antes do aumento de demanda.",
    description: "Escalar aquisição sem processo comercial pode aumentar desperdícios. A estrutura precisa vir antes do aumento de demanda.",
    category: "Gestão Comercial",
    tags: ["Gestão Comercial", "Aquisição", "Crescimento"],
    readingTime: "6 min de leitura",
    coverImage: "/assets/blog/brand/artigo-empresa-organizar.png.png",
    image: "/assets/blog/brand/artigo-empresa-organizar.png.png",
    homeCardTitleMobileLines: ["O que uma empresa", "precisa organizar", "antes de escalar", "aquisição"],
    blogFeaturedTitleMobileLines: ["O que uma empresa", "precisa organizar", "antes de escalar", "aquisição"],
    homeCard: {
      category: "Crescimento",
      description: "Prévia visual de conteúdo sobre processo, estrutura comercial, acompanhamento e eficiência antes de ampliar captação.",
      image: "/assets/home-institucional/brand/sessao-4-empresa-organizar.png.png",
    },
  },
  {
    slug: "crm-controle-da-operacao-comercial",
    title: "CRM não é só cadastro: é controle da operação comercial",
    excerpt: "Um CRM bem utilizado ajuda a acompanhar oportunidades, reduzir improvisos e dar mais previsibilidade ao processo de vendas.",
    description: "Um CRM bem utilizado ajuda a acompanhar oportunidades, reduzir improvisos e dar mais previsibilidade ao processo de vendas.",
    category: "Tecnologia",
    tags: ["CRM", "Tecnologia", "Vendas"],
    readingTime: "5 min de leitura",
    coverImage: "/assets/blog/brand/artigo-crm-cadastro.png.png",
    image: "/assets/blog/brand/artigo-crm-cadastro.png.png",
    homeCardTitleMobileLines: ["CRM não é só", "cadastro: é controle", "da operação comercial"],
    blogFeaturedTitleMobileLines: ["CRM não é só", "cadastro: é controle", "da operação comercial"],
    homeCard: {
      category: "Tecnologia e vendas",
      description: "CRM não é apenas uma lista de contatos. Ele ajuda a acompanhar oportunidades, organizar o processo comercial e dar mais controle à operação de vendas.",
      image: "/assets/home-institucional/brand/sessao-4-crm-cadastro.png.png",
    },
    recommended: true,
  },
  {
    slug: "crescimento-previsivel-comeca-com-clareza",
    title: "Crescimento previsível começa com clareza sobre o processo",
    excerpt: "Antes de buscar mais volume, a empresa precisa entender como sua operação transforma atenção em oportunidade e oportunidade em receita.",
    description: "Antes de buscar mais volume, a empresa precisa entender como sua operação transforma atenção em oportunidade e oportunidade em receita.",
    category: "Crescimento Empresarial",
    tags: ["Crescimento", "Processo", "Estratégia"],
    readingTime: "6 min de leitura",
    coverImage: "/assets/blog/brand/artigo-crescimento-previsivel.png.png",
    image: "/assets/blog/brand/artigo-crescimento-previsivel.png.png",
    homeCardTitleMobileLines: ["Crescimento previsível", "começa com clareza", "sobre o processo."],
    blogFeaturedTitleMobileLines: ["Crescimento previsível", "começa com clareza", "sobre o processo."],
    homeCard: {
      category: "Crescimento empresarial",
      description: "Antes de buscar mais volume, a empresa precisa entender como sua operação transforma atenção em oportunidade e oportunidade em receita.",
      image: "/assets/blog/brand/artigo-crescimento-previsivel.png.png",
    },
  },
];
