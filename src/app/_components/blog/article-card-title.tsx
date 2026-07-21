type ArticleCardTitleTag = "h2" | "h3" | "h4" | "p";

export type ArticleCardTitleVariant =
  | "home-carousel"
  | "featured"
  | "archive"
  | "category"
  | "recommendation"
  | "related"
  | "related-sidebar";

type ArticleCardTitleProps = {
  as?: ArticleCardTitleTag;
  title: string;
  visualLines?: readonly string[];
  variant: ArticleCardTitleVariant;
  className?: string;
};

const VARIANT_CLASSES: Record<ArticleCardTitleVariant, string> = {
  "home-carousel":
    "text-[clamp(1.24rem,5.2vw,1.56rem)] font-semibold leading-[1.1] sm:text-[clamp(1.65rem,2.4vw,2.1rem)] sm:leading-[1.08]",
  featured:
    "text-[clamp(1.6rem,6.5vw,2.05rem)] font-medium leading-[1.08] tracking-[-0.025em] lg:text-[clamp(2rem,4vw,3.45rem)] lg:leading-[1.02]",
  archive:
    "text-[clamp(1.32rem,5.5vw,1.55rem)] font-semibold leading-[1.12] tracking-[-0.018em] sm:text-[1.55rem] sm:leading-[1.08] lg:text-[clamp(1.55rem,2.5vw,2.05rem)]",
  category:
    "text-[clamp(1.32rem,5.3vw,1.5rem)] font-semibold leading-[1.12] sm:text-[1.6rem] sm:leading-[1.1]",
  recommendation:
    "text-base font-semibold leading-[1.25] sm:text-lg",
  related:
    "text-[clamp(1.3rem,5.3vw,1.45rem)] font-semibold leading-[1.16] sm:text-[1.65rem] sm:leading-[1.15]",
  "related-sidebar":
    "text-base font-semibold leading-[1.25] sm:text-lg",
};

const VISUAL_LINE_BREAKPOINT_CLASSES: Record<
  ArticleCardTitleVariant,
  { lines: string; fullTitle: string }
> = {
  "home-carousel": { lines: "sm:hidden", fullTitle: "hidden sm:block" },
  featured: { lines: "lg:hidden", fullTitle: "hidden lg:block" },
  archive: { lines: "lg:hidden", fullTitle: "hidden lg:block" },
  category: { lines: "sm:hidden", fullTitle: "hidden sm:block" },
  recommendation: { lines: "lg:hidden", fullTitle: "hidden lg:block" },
  related: { lines: "lg:hidden", fullTitle: "hidden lg:block" },
  "related-sidebar": { lines: "lg:hidden", fullTitle: "hidden lg:block" },
};

export function ArticleCardTitle({
  as: Tag = "h3",
  title,
  visualLines,
  variant,
  className = "",
}: ArticleCardTitleProps) {
  const hasVisualLines = Boolean(visualLines?.length);
  const visualLineBreakpoints = VISUAL_LINE_BREAKPOINT_CLASSES[variant];

  return (
    <Tag
      aria-label={title}
      data-article-card-title="true"
      data-article-title={title}
      data-title-layout={hasVisualLines ? "optional-lines" : "automatic"}
      data-title-variant={variant}
      className={`min-w-0 max-w-full whitespace-normal break-words [overflow-wrap:break-word] [text-wrap:pretty] font-serif ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {hasVisualLines ? (
        <>
          <span
            className={`block min-w-0 max-w-full whitespace-normal break-words [overflow-wrap:break-word] ${visualLineBreakpoints.lines}`}
          >
            {visualLines?.map((line, index) => (
              <span
                className="block min-w-0 max-w-full whitespace-normal break-words [overflow-wrap:break-word]"
                key={`${index}-${line}`}
              >
                {line}
              </span>
            ))}
          </span>
          <span
            className={`min-w-0 max-w-full whitespace-normal break-words [overflow-wrap:break-word] ${visualLineBreakpoints.fullTitle}`}
          >
            {title}
          </span>
        </>
      ) : (
        <span className="block min-w-0 max-w-full whitespace-normal break-words [overflow-wrap:break-word]">
          {title}
        </span>
      )}
    </Tag>
  );
}
