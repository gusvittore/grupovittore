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

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: BlogCategory;
  tags: string[];
  readingTime: string;
  image: string;
  featured?: boolean;
  recommended?: boolean;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "gargalos-comerciais-antes-de-investir-em-trafego",
    title: "Como identificar gargalos comerciais antes de investir mais em tráfego",
    description:
      "Antes de aumentar o orçamento, a empresa precisa entender onde perde oportunidades no processo comercial e por que a geração de demanda nem sempre se transforma em receita.",
    category: "Vendas",
    tags: ["Vendas", "Processo Comercial", "Diagnóstico"],
    readingTime: "6 min de leitura",
    image: "/assets/blog/brand/artigo-identificar-gargalos.png.png",
    featured: true,
    recommended: true,
  },
  {
    slug: "materiais-graficos-fortalecem-presenca-da-marca",
    title: "Por que materiais gráficos ainda fortalecem a presença da marca",
    description:
      "Materiais impressos continuam sendo pontos de contato importantes para transmitir profissionalismo, confiança e presença física.",
    category: "Materiais Gráficos",
    tags: ["Materiais Gráficos", "Branding", "Presença de Marca"],
    readingTime: "5 min de leitura",
    image: "/assets/blog/brand/artigo-materiais-fortalecem-presenca.png.png",
    recommended: true,
  },
  {
    slug: "marketing-vendas-tecnologia-conectar-tres-areas",
    title: "Marketing, vendas e tecnologia: como conectar as três áreas",
    description:
      "Quando essas áreas trabalham isoladas, a empresa perde controle. Quando se conectam, o crescimento ganha mais clareza.",
    category: "Marketing",
    tags: ["Marketing", "Vendas", "Tecnologia"],
    readingTime: "7 min de leitura",
    image: "/assets/blog/brand/artigo-marketing-vendas-tecnologia.png.png",
  },
  {
    slug: "organizar-antes-de-escalar-aquisicao",
    title: "O que uma empresa precisa organizar antes de escalar aquisição",
    description:
      "Escalar aquisição sem processo comercial pode aumentar desperdícios. A estrutura precisa vir antes do aumento de demanda.",
    category: "Gestão Comercial",
    tags: ["Gestão Comercial", "Aquisição", "Crescimento"],
    readingTime: "6 min de leitura",
    image: "/assets/blog/brand/artigo-empresa-organizar.png.png",
  },
  {
    slug: "crm-controle-da-operacao-comercial",
    title: "CRM não é só cadastro: é controle da operação comercial",
    description:
      "Um CRM bem utilizado ajuda a acompanhar oportunidades, reduzir improvisos e dar mais previsibilidade ao processo de vendas.",
    category: "Tecnologia",
    tags: ["CRM", "Tecnologia", "Vendas"],
    readingTime: "5 min de leitura",
    image: "/assets/blog/brand/artigo-crm-cadastro.png.png",
    recommended: true,
  },
  {
    slug: "crescimento-previsivel-comeca-com-clareza",
    title: "Crescimento previsível começa com clareza sobre o processo",
    description:
      "Antes de buscar mais volume, a empresa precisa entender como sua operação transforma atenção em oportunidade e oportunidade em receita.",
    category: "Crescimento Empresarial",
    tags: ["Crescimento", "Processo", "Estratégia"],
    readingTime: "6 min de leitura",
    image: "/assets/blog/brand/artigo-crescimento-previsivel.png.png",
  },
];
