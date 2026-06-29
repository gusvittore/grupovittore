type ThankYouPageProps = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  variant: "light" | "dark";
  action?: {
    label: string;
    href: string;
    external?: boolean;
  } | null;
};

export function ThankYouPage({
  eyebrow,
  title,
  paragraphs,
  variant,
  action,
}: ThankYouPageProps) {
  const isDark = variant === "dark";

  return (
    <main
      className={`min-h-screen ${
        isDark ? "bg-[#000717] text-[#FBF8F4]" : "bg-[#FBF8F4] text-[#000717]"
      }`}
    >
      <section className="thank-you-shell mx-auto flex min-h-screen w-full max-w-[920px] flex-col justify-center px-6 py-16 sm:px-10">
        <p className="text-sm font-bold uppercase leading-5 tracking-[0.24em] text-[#B29157]">
          {eyebrow}
        </p>
        <h1 className="thank-you-title mt-6 max-w-[760px] font-serif text-[clamp(2.45rem,8vw,4.8rem)] font-medium leading-[0.98]">
          {title}
        </h1>
        <div
          className={`thank-you-content mt-8 grid max-w-[720px] gap-5 border-l-2 border-[#B29157] pl-5 text-lg leading-8 sm:text-xl ${
            isDark ? "text-[#FBF8F4]/82" : "text-[#000717]/78"
          }`}
        >
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {action ? (
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={action.href}
              target={action.external ? "_blank" : undefined}
              rel={action.external ? "noopener noreferrer" : undefined}
              className="inline-flex min-h-14 items-center justify-center rounded-[6px] bg-[#008723] px-6 py-4 text-sm font-bold uppercase leading-snug tracking-[0.12em] text-white shadow-[0_14px_28px_rgba(0,72,20,0.24)] transition hover:brightness-95 focus:outline-none focus:ring-4 focus:ring-[#008723]/25"
            >
              {action.label}
            </a>
          </div>
        ) : null}
      </section>
    </main>
  );
}
