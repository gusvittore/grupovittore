import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogArticleCta } from "@/app/_components/blog/blog-article-cta";
import { ArticleCardTitle } from "@/app/_components/blog/article-card-title";
import { BlogAuthorCard } from "@/app/_components/blog/blog-author-card";
import { MarkdownContent } from "@/app/_components/blog/markdown-content";
import { SiteFooter } from "@/app/_components/site-footer";
import { SiteHeader } from "@/app/_components/site-header";
import {
  getAllBlogSlugs,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/lib/blog/content";
import type { BlogPostSummary } from "@/lib/blog/types";

const SITE_URL = "https://grupovittore.com.br";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  const canonical = post.canonical || `${SITE_URL}/blog/${post.slug}`;
  const coverUrl = `${SITE_URL}${post.coverImage}`;

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    authors: [{ name: post.author }],
    alternates: { canonical },
    openGraph: {
      type: "article",
      locale: "pt_BR",
      url: canonical,
      siteName: "Grupo Vittore",
      title: post.seoTitle,
      description: post.seoDescription,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      images: [{ url: coverUrl, alt: post.coverAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.seoDescription,
      images: [{ url: coverUrl, alt: post.coverAlt }],
    },
  };
}

function formatPublicationDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

function RelatedArticlesList({
  relatedPosts,
  variant = "flow",
}: {
  relatedPosts: BlogPostSummary[];
  variant?: "flow" | "sidebar";
}) {
  if (relatedPosts.length === 0) return null;

  const isSidebar = variant === "sidebar";

  return (
    <section
      className={
        isSidebar
          ? "rounded-[18px] border border-[#b29157]/35 bg-[#fffdf9] p-6 sm:p-7"
          : "mt-14 border-t border-[#b29157]/30 pt-10"
      }
    >
      <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#956119]">
        Continue lendo
      </p>
      <h2
        className={
          isSidebar
            ? "mt-3 font-serif text-2xl font-semibold leading-tight text-[#07142d]"
            : "mt-3 font-serif text-[clamp(2rem,5vw,2.8rem)] font-semibold leading-tight text-[#07142d]"
        }
      >
        Artigos relacionados
      </h2>
      <div
        className={
          isSidebar
            ? "mt-4 divide-y divide-[#b29157]/20"
            : "mt-6 divide-y divide-[#b29157]/25 rounded-[18px] border border-[#b29157]/30 bg-[#fffdf9] px-5 sm:px-7"
        }
      >
        {relatedPosts.map((relatedPost) => (
          <Link
            key={relatedPost.slug}
            href={`/blog/${relatedPost.slug}`}
            className={
              isSidebar
                ? "group block py-4 first:pt-0 last:pb-0"
                : "group block py-6 first:pt-6 last:pb-6"
            }
          >
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#956119]">
              {relatedPost.category} · {relatedPost.readingTime}
            </p>
            <ArticleCardTitle
              title={relatedPost.title}
              variant={isSidebar ? "related-sidebar" : "related"}
              className={`${isSidebar ? "mt-2" : "mt-3"} text-[#07142d] transition group-hover:text-[#8a5b18]`}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedBlogPosts(post);
  const canonical = post.canonical || `${SITE_URL}/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription,
    image: [`${SITE_URL}${post.coverImage}`],
    mainEntityOfPage: canonical,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Grupo Vittore",
      url: SITE_URL,
    },
    ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
    ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
  };

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen overflow-x-clip bg-[#fbf8f4] text-[#071026]">
        <article>
          <header className="border-b border-[#b29157]/25 bg-[#031126] text-[#fbf8f4]">
            <div className="mx-auto w-full max-w-[1180px] px-5 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-24">
              <Link
                href="/blog"
                className="inline-flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.18em] text-[#e3ad51] transition hover:text-white sm:text-sm"
              >
                <span aria-hidden="true">←</span> Voltar ao Blog
              </Link>
              <p className="mt-9 text-xs font-extrabold uppercase tracking-[0.22em] text-[#e3ad51] sm:text-sm">
                {post.category}
              </p>
              <h1 className="mt-5 max-w-[1050px] break-words font-serif text-[clamp(2.15rem,8vw,4.4rem)] font-medium leading-[1.02] tracking-[-0.035em]">
                {post.title}
              </h1>
              <p className="mt-7 max-w-[820px] text-lg leading-8 text-[#dce2ea] sm:text-xl sm:leading-9">
                {post.excerpt}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-bold uppercase tracking-[0.12em] text-[#dce2ea]">
                <span>{post.author}</span>
                <span aria-hidden="true" className="text-[#e3ad51]">•</span>
                <span>{post.readingTime}</span>
                {post.publishedAt ? (
                  <>
                    <span aria-hidden="true" className="text-[#e3ad51]">•</span>
                    <time dateTime={post.publishedAt}>
                      {formatPublicationDate(post.publishedAt)}
                    </time>
                  </>
                ) : null}
              </div>
            </div>
          </header>

          <div className="mx-auto w-full max-w-[1180px] px-5 pb-20 pt-8 sm:px-8 sm:pb-24 sm:pt-12 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
              <div className="min-w-0">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[22px] border border-[#b29157]/30 bg-[#0b1d38] shadow-[0_22px_60px_rgba(9,14,31,0.08)]">
                  <Image
                    src={post.coverImage}
                    alt={post.coverAlt}
                    fill
                    priority
                    sizes="(max-width: 767px) 92vw, (max-width: 1023px) 86vw, 760px"
                    className="object-cover"
                  />
                </div>

                <div className="mt-12 max-w-[780px] sm:mt-16">
                  <MarkdownContent markdown={post.content} />
                  <div className="lg:hidden">
                    <BlogArticleCta categorySlug={post.categorySlug} />
                  </div>

                  <div className="mx-auto mt-12 max-w-[520px] lg:hidden">
                    <BlogAuthorCard />
                  </div>

                  <div className="lg:hidden">
                    <RelatedArticlesList relatedPosts={relatedPosts} />
                  </div>
                </div>
              </div>

              <aside className="hidden space-y-5 lg:sticky lg:top-28 lg:block lg:self-start">
                <BlogAuthorCard />
                <div className="hidden lg:block">
                  <BlogArticleCta categorySlug={post.categorySlug} variant="sidebar" />
                </div>
                <RelatedArticlesList relatedPosts={relatedPosts} variant="sidebar" />
              </aside>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replaceAll("<", "\\u003c"),
        }}
      />
    </>
  );
}
