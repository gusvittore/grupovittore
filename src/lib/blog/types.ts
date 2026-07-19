export const BLOG_CYCLE = "07-26" as const;

export const OFFICIAL_BLOG_CATEGORIES = [
  {
    slug: "vendas",
    label: "Vendas",
    description:
      "Processo comercial, acompanhamento de oportunidades, abordagem, negociação, conversão e leitura de gargalos.",
  },
  {
    slug: "marketing",
    label: "Marketing",
    description:
      "Posicionamento, comunicação, campanhas, geração de demanda, aquisição e relação entre marketing e comercial.",
  },
  {
    slug: "materiais-graficos",
    label: "Materiais Gráficos",
    frontmatterLabel: "Materiais Gráficos Personalizados",
    description:
      "Presença física, branding, cartões, pastas, panfletos, etiquetas, blocos e materiais institucionais.",
  },
  {
    slug: "tecnologia-automacoes",
    label: "Tecnologia e Automações",
    description:
      "CRM, automações, inteligência artificial, integração de ferramentas, organização de dados e eficiência operacional.",
  },
  {
    slug: "gestao-comercial",
    label: "Gestão Comercial",
    description:
      "Rotina, indicadores, responsabilidades, processo, previsibilidade e organização para reduzir improvisos.",
  },
  {
    slug: "crescimento-empresarial",
    label: "Crescimento Empresarial",
    description:
      "Clareza estratégica, estrutura, visão de longo prazo, conexão entre frentes e crescimento sustentável.",
  },
] as const;

export type BlogCategorySlug =
  (typeof OFFICIAL_BLOG_CATEGORIES)[number]["slug"];
export type BlogCategory =
  (typeof OFFICIAL_BLOG_CATEGORIES)[number]["label"];
export type BlogCategoryFilter = "Todos" | BlogCategory;

export type HomeCardPresentation = {
  category: string;
  description: string;
  image: string;
};

export type BlogPostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  category: BlogCategory;
  categorySlug: BlogCategorySlug;
  tags: string[];
  readingTime: string;
  coverImage: string;
  coverAlt: string;
  publishedAt?: string;
  period: typeof BLOG_CYCLE;
  homeCardTitleMobileLines: readonly string[];
  blogCardTitleMobileLines: readonly string[];
  blogFeaturedTitleMobileLines: readonly string[];
  homeCard: HomeCardPresentation;
};

export type BlogPost = BlogPostSummary & {
  content: string;
  sourcePath: string;
  seoTitle: string;
  seoDescription: string;
  author: string;
  authorRole: string;
  updatedAt?: string;
  canonical?: string;
  intent?: string;
  draft: boolean;
};
