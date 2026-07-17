type TitleTag = "h1" | "h2" | "h3" | "h4";

type ControlledTitleProps = {
  lines: readonly string[];
  className?: string;
  lineClassName?: string;
};

export function ControlledTitle({
  lines,
  className,
  lineClassName = "block whitespace-nowrap",
}: ControlledTitleProps) {
  return (
    <span className={className}>
      {lines.map((line, index) => (
        <span className={lineClassName} key={`${index}-${line}`}>
          {line}
        </span>
      ))}
    </span>
  );
}

type ResponsiveControlledTitleProps = ControlledTitleProps & {
  as?: TitleTag;
  desktopLines?: readonly string[];
  desktopTitle?: string;
};

export function ResponsiveControlledTitle({
  as: Tag = "h2",
  lines,
  desktopLines,
  desktopTitle,
  className,
  lineClassName = "block whitespace-nowrap",
}: ResponsiveControlledTitleProps) {
  const desktopContent = desktopLines ?? (desktopTitle ? [desktopTitle] : lines);

  return (
    <Tag className={className}>
      <ControlledTitle lines={lines} lineClassName={lineClassName} className="lg:hidden" />
      <ControlledTitle lines={desktopContent} lineClassName={lineClassName} className="hidden lg:block" />
    </Tag>
  );
}

export function formatDisplayNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function DisplayNumber({ index }: { index: number }) {
  return (
    <span className="inline-flex min-w-[2ch] shrink-0 items-center justify-center whitespace-nowrap font-serif tabular-nums text-2xl leading-none text-[#b29157] [word-break:keep-all]">
      {formatDisplayNumber(index)}
    </span>
  );
}
