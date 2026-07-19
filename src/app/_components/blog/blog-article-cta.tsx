import Image from "next/image";
import Link from "next/link";
import type { BlogCategorySlug } from "@/lib/blog/types";

export function BlogArticleCta({
  categorySlug,
}: {
  categorySlug: BlogCategorySlug;
}) {
  const isMaterials = categorySlug === "materiais-graficos";
  const href = isMaterials ? "/materiais-impressos" : "/assessoria-comercial";
  const src = isMaterials
    ? "/assets/blog/brand/banner-sidebar-materiais-graficos-2.png.png"
    : "/assets/blog/brand/banner-sidebar-assessoria.png.png";
  const alt = isMaterials
    ? "Banner Materiais Gráficos Personalizados Grupo Vittore"
    : "Banner Assessoria Comercial Grupo Vittore";

  return (
    <section
      aria-label="Próximo passo"
      className="mt-14 border-t border-[#b29157]/30 pt-10"
    >
      <Link
        href={href}
        className="group mx-auto block max-w-[520px] overflow-hidden rounded-[18px] border border-[#b29157]/35 bg-[#031126] shadow-[0_14px_34px_rgba(9,14,31,0.09)] transition hover:-translate-y-0.5 hover:border-[#e3ad51]/70 hover:shadow-[0_18px_42px_rgba(9,14,31,0.16)]"
      >
        <Image
          src={src}
          alt={alt}
          width={800}
          height={1000}
          sizes="(max-width: 639px) 92vw, 520px"
          className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.015]"
        />
      </Link>
    </section>
  );
}
