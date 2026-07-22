"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  OFFICIAL_BLOG_CATEGORIES,
  type BlogCategory,
  type BlogCategoryFilter,
  type BlogPostSummary,
} from "@/lib/blog/types";
import { InstitutionalCtaActions } from "../cta-actions";
import { ControlledTitle } from "../controlled-title";
import { ArticleCardTitle } from "./article-card-title";

const PAGE_SIZE = 10;

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="10.8" cy="10.8" r="6.5" />
      <path d="m16 16 4.5 4.5" strokeLinecap="round" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
      <path d="M6.2 8.4H3.3V20h2.9V8.4ZM4.75 4A1.75 1.75 0 1 0 4.75 7.5 1.75 1.75 0 0 0 4.75 4ZM20.7 13.35c0-3.5-1.86-5.13-4.34-5.13-2 0-2.9 1.1-3.4 1.88V8.4h-2.9V20h2.9v-6.3c0-1.66.31-3.26 2.37-3.26 2.02 0 2.05 1.9 2.05 3.37V20h2.9l.42-6.65Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3.5" y="5" width="17" height="14" rx="2" />
      <path d="m4.5 7 7.5 6 7.5-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return <span aria-hidden="true">→</span>;
}

function PaginationArrow({ direction }: { direction: "left" | "right" }) {
  return <span aria-hidden="true" className="text-[1.08rem] leading-none sm:text-[1.2rem]">{direction === "left" ? "←" : "→"}</span>;
}

function PostMeta({ post }: { post: BlogPostSummary }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-bold uppercase tracking-[0.12em] text-[#6b7482] transition-colors group-hover:text-[#dce2ea]">
      <span className="text-[#956119]">{post.category}</span>
      <span aria-hidden="true" className="text-[#b29157]">•</span>
      <span>{post.readingTime}</span>
    </div>
  );
}

function PostLink({ post }: { post: BlogPostSummary }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="inline-flex items-center gap-3 text-sm font-extrabold uppercase tracking-[0.13em] text-[#8a5b18] transition hover:text-[#031126] group-hover:text-[#e3ad51]"
    >
      Ler artigo <ArrowIcon />
      <span className="sr-only">: {post.title}</span>
    </Link>
  );
}

function ArticleCard({ post }: { post: BlogPostSummary }) {
  return (
    <article className="group flex min-h-[430px] w-full min-w-0 max-w-full flex-col overflow-hidden rounded-[22px] border border-[#b29157]/25 bg-[#fffdf9] shadow-[0_16px_42px_rgba(9,14,31,0.045)] transition hover:-translate-y-0.5 hover:border-[#e3ad51]/60 hover:bg-[#031126] hover:shadow-[0_20px_48px_rgba(9,14,31,0.14)] sm:min-h-[470px]">
      <div className="relative aspect-[16/9] overflow-hidden bg-[#0b1d38]">
        <Image
          src={post.coverImage}
          alt={post.coverAlt}
          fill
          loading="eager"
          sizes="(max-width: 767px) 92vw, (max-width: 1023px) 45vw, 540px"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex min-w-0 max-w-full flex-1 flex-col p-6 sm:p-7">
        <PostMeta post={post} />
        <ArticleCardTitle
          title={post.title}
          variant="archive"
          className="mt-5 text-[#07142d] transition-colors group-hover:text-[#fbf8f4]"
        />
        <p className="mt-4 text-base leading-7 text-[#34435a] transition-colors group-hover:text-[#dce2ea] sm:text-lg sm:leading-8">
          {post.excerpt}
        </p>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-7">
          <div className="flex flex-wrap gap-2" aria-label="Tags do artigo">
            {post.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="rounded-full bg-[#f1eadf] px-3 py-1.5 text-xs font-semibold text-[#536074] transition-colors group-hover:bg-[#0b1d38] group-hover:text-[#e3ad51]">
                {tag}
              </span>
            ))}
          </div>
          <PostLink post={post} />
        </div>
      </div>
    </article>
  );
}

function AuthorCard() {
  return (
    <section className="rounded-[18px] border border-[#b29157]/35 bg-[#fffdf9] p-6 text-center sm:p-7">
      <p className="text-xs font-extrabold uppercase tracking-[0.23em] text-[#956119]">Sobre o Autor</p>
      <div className="mx-auto mt-5 h-24 w-24 overflow-hidden rounded-full border border-[#b29157]/50 bg-[#031126]">
        <Image
          src="/assets/blog/brand/autor-gustavo-asterio.png.png"
          alt="Gustavo Astério"
          width={96}
          height={96}
          className="h-full w-full object-cover object-top"
        />
      </div>
      <h2 className="mt-5 font-serif text-2xl font-semibold leading-tight text-[#07142d]">Gustavo Astério</h2>
      <p className="mt-2 text-base font-semibold leading-7 text-[#536074] sm:text-[1.02rem]">
        Fundador do Grupo Vittore e Assessor de Crescimento Empresarial
      </p>
      <p className="mt-4 text-base leading-7 text-[#536074] sm:text-[1.02rem] sm:leading-7">
        Compartilha análises e estratégias sobre Gestão Empresarial, Marketing, Vendas, Processos e Tecnologia, com foco na construção de operações mais estruturadas, previsíveis e escaláveis.
      </p>
      <div className="mt-5 flex justify-center gap-3">
        <a
          href="https://www.linkedin.com/in/gustavoasterio/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn de Gustavo Astério"
          className="grid h-10 w-10 place-items-center rounded-full border border-[#b29157]/50 text-[#07142d] transition hover:border-[#031126] hover:bg-[#031126] hover:text-[#e3ad51]"
        >
          <LinkedInIcon />
        </a>
        <a
          href="mailto:gustavo@grupovittore.com.br"
          aria-label="Enviar e-mail para Gustavo Astério"
          className="grid h-10 w-10 place-items-center rounded-full border border-[#b29157]/50 text-[#07142d] transition hover:border-[#031126] hover:bg-[#031126] hover:text-[#e3ad51]"
        >
          <MailIcon />
        </a>
      </div>
    </section>
  );
}

function SidebarBanner({ href, src, alt }: { href: string; src: string; alt: string }) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-[18px] border border-[#b29157]/35 bg-[#031126] shadow-[0_14px_34px_rgba(9,14,31,0.09)] transition hover:-translate-y-0.5 hover:border-[#e3ad51]/70 hover:shadow-[0_18px_42px_rgba(9,14,31,0.16)]"
    >
      <Image
        src={src}
        alt={alt}
        width={800}
        height={1000}
        loading="eager"
        sizes="(max-width: 1023px) 100vw, 300px"
        className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.015]"
      />
    </Link>
  );
}

function Sidebar({
  posts,
  onCategory,
}: {
  posts: BlogPostSummary[];
  onCategory: (category: BlogCategory) => void;
}) {
  const recommended = posts.slice(0, 3);

  return (
    <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
      <AuthorCard />

      <section className="rounded-[18px] border border-[#b29157]/35 bg-[#fffdf9] p-6 sm:p-7">
        <p className="text-xs font-extrabold uppercase tracking-[0.23em] text-[#956119]">Categorias</p>
        <div className="mt-4 divide-y divide-[#b29157]/20">
          {OFFICIAL_BLOG_CATEGORIES.map(({ label: category }) => (
            <button
              key={category}
              type="button"
              onClick={() => onCategory(category)}
              className="block w-full py-3 text-left text-base text-[#17243c] transition first:pt-0 last:pb-0 hover:text-[#8a5b18] sm:text-lg"
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <SidebarBanner
        href="/assessoria-comercial"
        src="/assets/blog/brand/banner-sidebar-assessoria.png.png"
        alt="Banner Assessoria Comercial Grupo Vittore"
      />

      <section className="rounded-[18px] border border-[#b29157]/35 bg-[#fffdf9] p-6 sm:p-7">
        <p className="text-xs font-extrabold uppercase tracking-[0.23em] text-[#956119]">Leituras recomendadas</p>
        <div className="mt-4 divide-y divide-[#b29157]/20">
          {recommended.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block py-4 first:pt-0 last:pb-0">
              <ArticleCardTitle
                as="p"
                title={post.title}
                variant="recommendation"
                className="text-[#07142d] transition group-hover:text-[#8a5b18]"
              />
              <p className="mt-2 text-sm leading-6 text-[#667084]">{post.readingTime}</p>
            </Link>
          ))}
        </div>
      </section>

      <SidebarBanner
        href="/materiais-impressos"
        src="/assets/blog/brand/banner-sidebar-materiais-graficos-2.png.png"
        alt="Banner Materiais Gráficos Personalizados Grupo Vittore"
      />
    </aside>
  );
}

const categoryBlocks = OFFICIAL_BLOG_CATEGORIES;

export function BlogHomeClient({ posts }: { posts: BlogPostSummary[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<BlogCategoryFilter>("Todos");
  const [page, setPage] = useState(1);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");

    return posts.filter((post) => {
      const matchesCategory = activeCategory === "Todos" || post.category === activeCategory;
      if (!matchesCategory) return false;
      if (!normalizedQuery) return true;

      return [post.title, post.excerpt, post.category, ...post.tags]
        .join(" ")
        .toLocaleLowerCase("pt-BR")
        .includes(normalizedQuery);
    });
  }, [activeCategory, posts, query]);

  const highlightedPost = filteredPosts[0];
  const latestPosts = filteredPosts;
  const totalPages = Math.max(1, Math.ceil(latestPosts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const paginatedPosts = latestPosts.slice(pageStart, pageStart + PAGE_SIZE);

  function selectCategory(category: BlogCategoryFilter) {
    setActiveCategory(category);
    setPage(1);
  }

  function updateQuery(nextQuery: string) {
    setQuery(nextQuery);
    setPage(1);
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-[#fbf8f4] text-[#071026]">
      <section className="relative isolate overflow-hidden bg-[#031126] text-[#fbf8f4]">
        <div className="lg:hidden">
          <div className="blog-hero-mobile-visual relative aspect-[1.2/1] overflow-hidden bg-[#0b1d38]">
            <Image
              src="/assets/blog/brand/hero-background.jpg.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="blog-hero-mobile-content bg-[#031126]">
            <div className="mx-auto w-full max-w-[1500px] px-6 py-14 sm:px-8 sm:py-16">
              <p className="text-xs font-extrabold uppercase tracking-[0.27em] text-[#e3ad51] sm:text-sm">Blog Grupo Vittore</p>
              <div className="mt-7 h-px w-14 bg-[#e3ad51]" />
              <h1 className="blog-hero-mobile-title mt-9 max-w-full font-serif text-[clamp(2rem,8.8vw,2.5rem)] font-medium leading-[1.04] tracking-[-0.035em]">
                <ControlledTitle
                  lines={[
                    "Conteúdo estratégico",
                    "para empresas que",
                    "querem crescer com",
                    "mais clareza",
                  ]}
                />
              </h1>
              <p className="mt-8 max-w-[720px] text-[1.08rem] leading-[1.62] text-[#f4f1eb] sm:text-xl sm:leading-9">
                Artigos sobre vendas, marketing, materiais gráficos, tecnologia, automação e crescimento empresarial para apoiar decisões mais conscientes e operações mais estruturadas.
              </p>
              <div className="mt-10 h-px w-14 bg-[#e3ad51]" />
            </div>
          </div>
        </div>

        <div className="relative hidden min-h-[min(45.5vw,800px)] lg:block">
          <Image
            src="/assets/blog/brand/hero-background.jpg.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="z-0 object-cover object-center"
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#031126]/[0.98] via-[#031126]/[0.72] to-[#031126]/[0.12]" />
          <div className="relative z-20 mx-auto flex min-h-[min(45.5vw,800px)] w-full max-w-[1500px] items-center px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-16">
            <div className="max-w-[790px]">
              <p className="text-xs font-extrabold uppercase tracking-[0.27em] text-[#e3ad51] sm:text-sm">Blog Grupo Vittore</p>
              <div className="mt-8 h-px w-14 bg-[#e3ad51]" />
              <h1 className="mt-12 max-w-[820px] font-serif text-[clamp(2.65rem,5.8vw,4.7rem)] font-medium leading-[0.98] tracking-[-0.038em]">
                Conteúdo estratégico para empresas que querem crescer com mais clareza.
              </h1>
              <p className="mt-8 max-w-[690px] text-lg leading-8 text-[#f4f1eb] sm:text-xl sm:leading-9">
                Artigos sobre vendas, marketing, materiais gráficos, tecnologia, automação e crescimento empresarial para apoiar decisões mais conscientes e operações mais estruturadas.
              </p>
              <div className="mt-12 h-px w-14 bg-[#e3ad51]" />
            </div>
          </div>
        </div>
      </section>

      <section id="em-destaque" className="mx-auto w-full max-w-[1500px] px-5 pb-14 pt-12 sm:px-8 sm:pb-18 sm:pt-16 lg:px-12 lg:pt-18 xl:px-16">
        <div className="mb-6 flex items-end justify-between gap-5">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#956119] sm:text-sm">Seleção editorial</p>
            <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,3rem)] leading-tight text-[#07142d]">Leitura em destaque</h2>
          </div>
          {filteredPosts.length > 0 ? <p className="hidden text-sm text-[#667084] sm:block">Conteúdo local do Grupo Vittore</p> : null}
        </div>

        {highlightedPost ? (
          <article className="group grid min-w-0 max-w-full overflow-hidden rounded-[28px] border border-[#b29157]/35 bg-[#fffdf9] text-[#071026] shadow-[0_22px_60px_rgba(9,14,31,0.08)] lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.84fr)]">
            <div className="min-w-0 max-w-full p-7 sm:p-10 lg:p-12">
              <PostMeta post={highlightedPost} />
              <ArticleCardTitle
                title={highlightedPost.title}
                variant="featured"
                className="blog-highlight-title-mobile mt-6 text-[#07142d] transition-colors group-hover:text-[#031126] lg:max-w-[760px]"
              />
              <p className="mt-6 max-w-[690px] text-lg leading-8 text-[#34435a] sm:text-xl sm:leading-9">
                {highlightedPost.excerpt}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <PostLink post={highlightedPost} />
              </div>
            </div>
            <div className="relative min-h-[280px] overflow-hidden border-t border-[#b29157]/25 bg-[#0b1d38] lg:border-l lg:border-t-0">
              <Image src={highlightedPost.coverImage} alt={highlightedPost.coverAlt} fill sizes="(max-width: 1023px) 100vw, 560px" className="object-cover transition duration-500 group-hover:scale-[1.02]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#031126]/45 via-transparent to-transparent" />
              <span className="absolute bottom-6 left-6 font-serif text-5xl leading-none text-[#e3ad51]">“</span>
            </div>
          </article>
        ) : (
          <div className="rounded-[22px] border border-[#b29157]/25 bg-[#fffdf9] px-6 py-10 text-lg text-[#536074]">
            Nenhum conteúdo encontrado para essa busca. Tente procurar por vendas, marketing, materiais gráficos ou tecnologia.
          </div>
        )}
      </section>

      <section className="mx-auto w-full max-w-[1500px] px-5 pb-12 sm:px-8 sm:pb-16 lg:px-12 xl:px-16">
        <label className="flex min-h-14 items-center gap-3 rounded-full border border-[#071026]/18 bg-[#fffdf9] px-5 text-[#536074] shadow-[0_10px_30px_rgba(9,14,31,0.035)] sm:px-6">
          <SearchIcon />
          <span className="sr-only">Buscar no blog</span>
          <input value={query} onChange={(event) => updateQuery(event.target.value)} placeholder="Buscar por vendas, marketing, materiais gráficos, CRM..." className="min-w-0 flex-1 bg-transparent text-base text-[#071026] outline-none placeholder:text-[#7d8795] sm:text-lg" />
        </label>
      </section>

      <section id="artigos" className="mx-auto w-full max-w-[1500px] px-5 pb-16 sm:px-8 sm:pb-24 lg:px-12 xl:px-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
          <div>
            <div className="flex items-end justify-between gap-5 border-t border-[#b29157]/35 pt-6">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#956119]">Arquivo editorial</p>
                <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,3rem)] leading-tight text-[#07142d]">Últimos artigos</h2>
              </div>
              <p className="hidden text-sm text-[#667084] sm:block">{latestPosts.length} conteúdos na seleção</p>
            </div>

            {latestPosts.length > 0 ? (
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                {paginatedPosts.map((post) => <ArticleCard key={post.slug} post={post} />)}
              </div>
            ) : (
              <p className="mt-7 rounded-[22px] border border-[#b29157]/25 bg-[#fffdf9] px-6 py-8 text-lg leading-8 text-[#536074]">
                Nenhum conteúdo encontrado para essa busca. Tente procurar por vendas, marketing, materiais gráficos ou tecnologia.
              </p>
            )}

            <nav aria-label="Paginação dos últimos artigos" className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                aria-label="Página anterior"
                disabled={currentPage === 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="grid h-11 w-11 place-items-center rounded-full border border-[#b29157]/45 bg-[#fffdf9] text-[#07142d] shadow-[0_8px_22px_rgba(9,14,31,0.04)] transition hover:border-[#031126] hover:bg-[#031126] hover:text-[#e3ad51] disabled:cursor-not-allowed disabled:border-[#b29157]/20 disabled:text-[#9aa1ad] disabled:hover:bg-[#fffdf9] disabled:hover:text-[#9aa1ad] sm:h-12 sm:w-12"
              >
                <PaginationArrow direction="left" />
              </button>
              <p className="min-w-20 text-center text-base font-extrabold uppercase tracking-[0.15em] text-[#8a5b18] sm:text-[1.05rem]">
                {currentPage} de {totalPages}
              </p>
              <button
                type="button"
                aria-label="Próxima página"
                disabled={currentPage === totalPages}
                onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                className="grid h-11 w-11 place-items-center rounded-full border border-[#b29157]/45 bg-[#fffdf9] text-[#07142d] shadow-[0_8px_22px_rgba(9,14,31,0.04)] transition hover:border-[#031126] hover:bg-[#031126] hover:text-[#e3ad51] disabled:cursor-not-allowed disabled:border-[#b29157]/20 disabled:text-[#9aa1ad] disabled:hover:bg-[#fffdf9] disabled:hover:text-[#9aa1ad] sm:h-12 sm:w-12"
              >
                <PaginationArrow direction="right" />
              </button>
            </nav>
          </div>
          <Sidebar posts={posts} onCategory={selectCategory} />
        </div>
      </section>

      <section id="categorias-editoriais" className="border-t border-[#b29157]/20 bg-[#fffdf9]">
        <div className="mx-auto w-full max-w-[1500px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 xl:px-16">
          <div className="max-w-[700px]">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#956119]">Arquivo editorial</p>
            <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,3rem)] leading-tight text-[#07142d]">Conteúdos por categoria</h2>
          </div>
          <div className="mt-9 space-y-5">
            {categoryBlocks.map((category) => {
              const post = posts.find((post) => post.categorySlug === category.slug);
              if (!post) return null;

              return (
                <section key={category.slug} className="border-t border-[#b29157]/25 py-7 sm:py-8">
                  <div className="grid gap-7 lg:grid-cols-[minmax(230px,0.42fr)_minmax(0,1fr)] lg:items-center lg:gap-12">
                    <div>
                      <h3 className="font-serif text-[1.8rem] font-semibold leading-tight text-[#07142d] sm:text-[2.4rem]">{category.label}</h3>
                      <p className="mt-4 text-[1.1rem] leading-8 text-[#536074] sm:text-[1.15rem] sm:leading-8">{category.description}</p>
                    </div>
                    <article className="grid min-w-0 max-w-full overflow-hidden rounded-[18px] border border-[#b29157]/35 bg-[#fbf8f4] sm:grid-cols-[220px_minmax(0,1fr)]">
                      <div className="relative min-h-[150px] bg-[#0b1d38] sm:min-h-full">
                        <Image src={post.coverImage} alt={post.coverAlt} fill sizes="(max-width: 639px) 100vw, 220px" className="object-cover" />
                      </div>
                      <div className="min-w-0 max-w-full p-5 sm:p-6">
                        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#956119]">{post.readingTime}</p>
                        <ArticleCardTitle
                          as="h4"
                          title={post.title}
                          variant="category"
                          className="mt-3 text-[#07142d]"
                        />
                        <p className="mt-3 text-[1.06rem] leading-7 text-[#536074] sm:text-[1.1rem] sm:leading-7">{post.excerpt}</p>
                        <button type="button" onClick={() => selectCategory(category.label)} className="mt-5 inline-flex items-center gap-3 text-sm font-extrabold uppercase tracking-[0.12em] text-[#8a5b18] transition hover:text-[#031126]">
                          Ver conteúdos <ArrowIcon />
                        </button>
                      </div>
                    </article>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#031126] text-[#fbf8f4]">
        <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-10 px-5 py-24 sm:px-8 sm:py-28 lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:py-32 xl:px-16">
          <div className="max-w-[760px]">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#e3ad51]">Do conteúdo para a operação</p>
            <h2 className="mt-4 font-serif text-[clamp(2.25rem,4.6vw,3.7rem)] leading-[1.02] tracking-[-0.025em]">Transforme leitura em estrutura comercial.</h2>
            <p className="mt-5 text-lg leading-8 text-[#dce2ea] sm:text-xl sm:leading-9">
              Os conteúdos do Grupo Vittore ajudam a entender gargalos, oportunidades e caminhos. A assessoria comercial aprofunda essa clareza e transforma estratégia em processo, acompanhamento e direção.
            </p>
          </div>
          <InstitutionalCtaActions />
        </div>
      </section>
    </main>
  );
}
