import type { Metadata } from "next";
import { SiteFooter } from "../_components/site-footer";
import { SiteHeader } from "../_components/site-header";
import { BlogHome } from "../_components/blog/blog-home";

export const metadata: Metadata = {
  title: "Blog Grupo Vittore | Conteúdo sobre Vendas, Marketing e Crescimento Empresarial",
  description:
    "Artigos do Grupo Vittore sobre vendas, marketing, materiais gráficos, tecnologia, automação e crescimento empresarial para empresas que querem crescer com mais clareza e estrutura.",
};

export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <BlogHome />
      <SiteFooter />
    </>
  );
}
