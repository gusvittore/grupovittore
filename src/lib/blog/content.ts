import "server-only";

import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import {
  BLOG_CYCLE,
  OFFICIAL_BLOG_CATEGORIES,
  type BlogCategorySlug,
  type BlogPost,
  type BlogPostSummary,
} from "./types";

const CONTENT_ROOT = path.join(process.cwd(), "content", "blog");
const PUBLIC_ROOT = path.join(process.cwd(), "public");
const HOME_POST_COUNT = 6;
const WORDS_PER_MINUTE = 220;

export const COVER_BY_SLUG: Record<string, string> = {
  "como-saber-se-a-empresa-esta-pronta-para-crescer-sem-perder-controle":
    "/assets/blog/articles/images/crescimento-empresarial/07-26/capa-empresa-pronta-para-crescer-sem-perder-controle.png",
  "crescer-sem-processo-aumenta-caos-empresa":
    "/assets/blog/articles/images/crescimento-empresarial/07-26/capa-crescer-sem-processo-aumenta-caos-na-empresa.png.png",
  "como-montar-pipeline-comercial":
    "/assets/blog/articles/images/gestao-comercial/07-26/capa-pipeline-comercial-etapas-que-ajudam-a-vender.png",
  "crm-nao-e-cadastro-gestao-comercial":
    "/assets/blog/articles/images/gestao-comercial/07-26/capa-crm-rotina-de-gestao-comercial.png",
  "quais-indicadores-comerciais-mostram-onde-sua-venda-esta-travando":
    "/assets/blog/articles/images/gestao-comercial/07-26/capa-indicadores-comerciais-venda-travando.png",
  "avaliar-qualidade-dos-leads-alem-do-custo-por-lead":
    "/assets/blog/articles/images/marketing/07-26/capa-qualidade-dos-leads-alem-do-custo-por-lead.png.png",
  "mais-trafego-poucas-vendas-marketing-ou-comercial":
    "/assets/blog/articles/images/marketing/07-26/capa-mais-trafego-poucas-vendas-marketing-ou-comercial.png",
  "cartao-de-visita-com-qr-code":
    "/assets/blog/articles/images/materiais-graficos/07-26/capa-cartao-de-visita-com-qr-code.png.png",
  "como-escolher-acabamento-de-cartao-de-visita-profissional-sem-exagerar-no-custo":
    "/assets/blog/articles/images/materiais-graficos/07-26/capa-acabamento-cartao-de-visita-profissional.png.png",
  "o-que-automatizar-primeiro-no-comercial-de-uma-empresa-em-crescimento":
    "/assets/blog/articles/images/tecnologia-automacoes/07-26/capa-o-que-automatizar-primeiro-no-comercial.png.png",
  "por-que-automatizar-um-processo-ruim-pode-piorar-o-problema":
    "/assets/blog/articles/images/tecnologia-automacoes/07-26/capa-automatizar-processo-ruim-pode-piorar-problema.png.png",
  "como-fazer-follow-up-comercial":
    "/assets/blog/articles/images/vendas/07-26/capa-follow-up-comercial-sem-depender-da-memoria-do-vendedor.png.png",
  "por-que-os-leads-somem-depois-de-perguntar-preco":
    "/assets/blog/articles/images/vendas/07-26/capa-por-que-os-leads-somem-depois-de-perguntar-preco.png.png",
  "whatsapp-na-venda-b2b-canal-da-empresa-ou-celular-do-vendedor":
    "/assets/blog/articles/images/vendas/07-26/capa-whatsapp-venda-b2b-canal-empresa-ou-celular-vendedor.png.png",
};

const TITLE_LINES_BY_SLUG: Record<string, readonly string[]> = {
  "como-saber-se-a-empresa-esta-pronta-para-crescer-sem-perder-controle": [
    "Como saber se a empresa",
    "está pronta para crescer",
    "sem perder controle",
  ],
  "crescer-sem-processo-aumenta-caos-empresa": [
    "Por que crescer sem",
    "processo aumenta o caos",
    "dentro da empresa",
  ],
  "como-montar-pipeline-comercial": [
    "Como montar um pipeline",
    "comercial com etapas que",
    "realmente ajudam a vender",
  ],
  "crm-nao-e-cadastro-gestao-comercial": [
    "CRM não é cadastro:",
    "como transformar",
    "a ferramenta em rotina",
    "de gestão comercial",
  ],
  "quais-indicadores-comerciais-mostram-onde-sua-venda-esta-travando": [
    "Quais indicadores",
    "comerciais mostram onde",
    "sua venda está travando",
  ],
  "avaliar-qualidade-dos-leads-alem-do-custo-por-lead": [
    "Como avaliar a qualidade",
    "dos leads além do",
    "custo por lead",
  ],
  "mais-trafego-poucas-vendas-marketing-ou-comercial": [
    "Mais tráfego e",
    "poucas vendas:",
    "como saber se o problema",
    "está no marketing",
    "ou no comercial",
  ],
  "cartao-de-visita-com-qr-code": [
    "Cartão de visita com",
    "QR Code: quando ajuda",
    "e quando atrapalha",
  ],
  "como-escolher-acabamento-de-cartao-de-visita-profissional-sem-exagerar-no-custo": [
    "Como escolher acabamento",
    "de cartão de visita",
    "profissional sem exagerar",
    "no custo",
  ],
  "o-que-automatizar-primeiro-no-comercial-de-uma-empresa-em-crescimento": [
    "O que automatizar",
    "primeiro no comercial",
    "de uma empresa em",
    "crescimento",
  ],
  "por-que-automatizar-um-processo-ruim-pode-piorar-o-problema": [
    "Por que automatizar",
    "um processo ruim pode",
    "piorar o problema",
  ],
  "como-fazer-follow-up-comercial": [
    "Como fazer follow-up",
    "comercial sem depender",
    "da memória do vendedor",
  ],
  "por-que-os-leads-somem-depois-de-perguntar-preco": [
    "Por que os leads somem",
    "depois de perguntar preço",
  ],
  "whatsapp-na-venda-b2b-canal-da-empresa-ou-celular-do-vendedor": [
    "WhatsApp na venda B2B:",
    "canal da empresa ou",
    "celular do vendedor?",
  ],
};

type FrontmatterValue = string | string[] | boolean;
type Frontmatter = Record<string, FrontmatterValue>;

function unquote(value: string) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseFrontmatter(source: string) {
  const lines = source.replaceAll("\r\n", "\n").split("\n");
  if (lines[0] !== "---") {
    throw new Error("Artigo sem frontmatter YAML.");
  }

  const frontmatter: Frontmatter = {};
  let currentListKey: string | null = null;
  let cursor = 1;

  for (; cursor < lines.length; cursor += 1) {
    const line = lines[cursor];
    if (line === "---") break;

    const listItem = line.match(/^\s+-\s+(.+)$/);
    if (listItem && currentListKey) {
      const current = frontmatter[currentListKey];
      if (Array.isArray(current)) current.push(unquote(listItem[1]));
      continue;
    }

    const separator = line.indexOf(":");
    if (separator === -1) continue;

    const key = line.slice(0, separator).trim();
    const rawValue = line.slice(separator + 1).trim();
    currentListKey = null;

    if (!rawValue) {
      frontmatter[key] = [];
      currentListKey = key;
    } else if (rawValue === "true" || rawValue === "false") {
      frontmatter[key] = rawValue === "true";
    } else {
      frontmatter[key] = unquote(rawValue);
    }
  }

  if (cursor === lines.length) {
    throw new Error("Frontmatter sem delimitador de fechamento.");
  }

  return {
    frontmatter,
    content: lines.slice(cursor + 1).join("\n").trim(),
  };
}

function requiredString(frontmatter: Frontmatter, key: string, sourcePath: string) {
  const value = frontmatter[key];
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${sourcePath}: campo obrigatório ${key} ausente.`);
  }
  return value.trim();
}

function optionalString(frontmatter: Frontmatter, key: string) {
  const value = frontmatter[key];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function calculateReadingTime(markdown: string) {
  const plainText = markdown
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/[#>*_`|\[\]()-]/g, " ");
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))} min de leitura`;
}

function categoryForSlug(categorySlug: BlogCategorySlug) {
  const category = OFFICIAL_BLOG_CATEGORIES.find(
    (item) => item.slug === categorySlug,
  );
  if (!category) throw new Error(`Categoria não oficial: ${categorySlug}`);
  return category;
}

function parsePostFile(
  absolutePath: string,
  categorySlug: BlogCategorySlug,
): BlogPost {
  const relativePath = path.relative(process.cwd(), absolutePath).replaceAll("\\", "/");
  const { frontmatter, content } = parseFrontmatter(
    readFileSync(absolutePath, "utf8"),
  );
  const slug = requiredString(frontmatter, "slug", relativePath);
  const title = requiredString(frontmatter, "title", relativePath);
  const excerpt = requiredString(frontmatter, "excerpt", relativePath);
  const coverAlt = requiredString(frontmatter, "coverAlt", relativePath);
  const categoryDefinition = categoryForSlug(categorySlug);
  const expectedCategory =
    "frontmatterLabel" in categoryDefinition
      ? categoryDefinition.frontmatterLabel
      : categoryDefinition.label;
  const frontmatterCategory = requiredString(
    frontmatter,
    "category",
    relativePath,
  );

  if (frontmatterCategory !== expectedCategory) {
    throw new Error(
      `${relativePath}: categoria ${frontmatterCategory} não corresponde a ${expectedCategory}.`,
    );
  }
  if (/^#\s+/m.test(content)) {
    throw new Error(`${relativePath}: o corpo não pode conter H1.`);
  }

  const mappedCover = COVER_BY_SLUG[slug];
  const coverImage = optionalString(frontmatter, "coverImage") ?? mappedCover;
  if (!coverImage) {
    throw new Error(`${relativePath}: nenhuma capa foi mapeada para ${slug}.`);
  }
  if (!existsSync(path.join(PUBLIC_ROOT, coverImage.replace(/^\//, "")))) {
    throw new Error(`${relativePath}: capa inexistente ${coverImage}.`);
  }

  const titleLines = TITLE_LINES_BY_SLUG[slug];
  if (titleLines && titleLines.join(" ") !== title) {
    throw new Error(`${relativePath}: linhas visuais não preservam o título aprovado.`);
  }

  const tags = frontmatter.tags;
  if (!Array.isArray(tags) || tags.some((tag) => typeof tag !== "string")) {
    throw new Error(`${relativePath}: lista de tags inválida.`);
  }

  return {
    slug,
    title,
    excerpt,
    description: excerpt,
    category: categoryDefinition.label,
    categorySlug,
    tags,
    readingTime: calculateReadingTime(content),
    coverImage,
    coverAlt,
    publishedAt: optionalString(frontmatter, "publishedAt"),
    period: BLOG_CYCLE,
    homeCardTitleMobileLines: titleLines,
    blogCardTitleMobileLines: titleLines,
    blogFeaturedTitleMobileLines: titleLines,
    homeCard: {
      category: categoryDefinition.label,
      description: excerpt,
      image: coverImage,
    },
    content,
    sourcePath: relativePath,
    seoTitle: requiredString(frontmatter, "seoTitle", relativePath),
    seoDescription: requiredString(frontmatter, "seoDescription", relativePath),
    author: requiredString(frontmatter, "author", relativePath),
    authorRole: requiredString(frontmatter, "authorRole", relativePath),
    updatedAt: optionalString(frontmatter, "updatedAt"),
    canonical: optionalString(frontmatter, "canonical"),
    intent: optionalString(frontmatter, "intent"),
    draft: frontmatter.draft === true,
  };
}

function sortPosts(left: BlogPost, right: BlogPost) {
  if (left.publishedAt && right.publishedAt) {
    const dateDifference = right.publishedAt.localeCompare(left.publishedAt);
    if (dateDifference !== 0) return dateDifference;
  } else if (left.publishedAt) {
    return -1;
  } else if (right.publishedAt) {
    return 1;
  }

  const categoryDifference = left.categorySlug.localeCompare(right.categorySlug);
  return categoryDifference || left.sourcePath.localeCompare(right.sourcePath);
}

let postCache: BlogPost[] | undefined;

function loadBlogPosts() {
  if (postCache) return postCache;

  const posts = OFFICIAL_BLOG_CATEGORIES.flatMap((category) => {
    const directory = path.join(CONTENT_ROOT, category.slug, BLOG_CYCLE);
    return readdirSync(directory)
      .filter((fileName) => fileName.endsWith(".md"))
      .sort((left, right) => left.localeCompare(right))
      .map((fileName) =>
        parsePostFile(path.join(directory, fileName), category.slug),
      );
  }).sort(sortPosts);

  const slugs = new Set<string>();
  for (const post of posts) {
    if (slugs.has(post.slug)) {
      throw new Error(`Slug duplicado: ${post.slug}`);
    }
    slugs.add(post.slug);
  }

  if (posts.length !== 14) {
    throw new Error(`O ciclo ${BLOG_CYCLE} possui ${posts.length} artigos; esperado: 14.`);
  }
  if (Object.keys(COVER_BY_SLUG).length !== posts.length) {
    throw new Error("A quantidade de capas mapeadas não corresponde aos artigos.");
  }

  postCache = posts;
  return posts;
}

function toSummary(post: BlogPost): BlogPostSummary {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    description: post.description,
    category: post.category,
    categorySlug: post.categorySlug,
    tags: post.tags,
    readingTime: post.readingTime,
    coverImage: post.coverImage,
    coverAlt: post.coverAlt,
    publishedAt: post.publishedAt,
    period: post.period,
    homeCardTitleMobileLines: post.homeCardTitleMobileLines,
    blogCardTitleMobileLines: post.blogCardTitleMobileLines,
    blogFeaturedTitleMobileLines: post.blogFeaturedTitleMobileLines,
    homeCard: post.homeCard,
  };
}

export function getAllBlogPosts(): BlogPostSummary[] {
  return loadBlogPosts().map(toSummary);
}

export function getHomeBlogPosts(): BlogPostSummary[] {
  return getAllBlogPosts().slice(0, HOME_POST_COUNT);
}

export function getBlogPostBySlug(slug: string) {
  return loadBlogPosts().find((post) => post.slug === slug);
}

export function getAllBlogSlugs() {
  return loadBlogPosts().map((post) => post.slug);
}

export function getRelatedBlogPosts(post: BlogPost, limit = 3) {
  const posts = loadBlogPosts().filter((candidate) => candidate.slug !== post.slug);
  const sameCategory = posts.filter(
    (candidate) => candidate.categorySlug === post.categorySlug,
  );
  const fallback = posts.filter(
    (candidate) => candidate.categorySlug !== post.categorySlug,
  );

  return [...sameCategory, ...fallback]
    .slice(0, limit)
    .map(toSummary);
}
