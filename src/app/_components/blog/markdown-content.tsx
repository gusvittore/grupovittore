import Link from "next/link";
import type { ReactNode } from "react";

type MarkdownListItem = {
  text: string;
  checked?: boolean;
};

type MarkdownBlock =
  | { type: "heading"; level: 2 | 3 | 4; text: string }
  | { type: "paragraph"; text: string }
  | { type: "unordered-list"; items: MarkdownListItem[] }
  | { type: "ordered-list"; items: MarkdownListItem[] }
  | {
      type: "table";
      headers: string[];
      alignments: Array<"left" | "center" | "right">;
      rows: string[][];
    }
  | { type: "blockquote"; text: string }
  | { type: "separator" };

function splitTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isTableDelimiter(line: string) {
  const cells = splitTableRow(line);
  return (
    cells.length > 0 &&
    cells.every((cell) => /^:?-{3,}:?$/.test(cell.replaceAll(" ", "")))
  );
}

function tableAlignment(cell: string): "left" | "center" | "right" {
  const normalized = cell.replaceAll(" ", "");
  if (normalized.startsWith(":") && normalized.endsWith(":")) return "center";
  if (normalized.endsWith(":")) return "right";
  return "left";
}

function parseListItem(value: string): MarkdownListItem {
  const task = value.match(/^\[([ xX])\]\s+(.+)$/);
  if (!task) return { text: value.trim() };
  return { text: task[2].trim(), checked: task[1].toLowerCase() === "x" };
}

function headingSlug(value: string) {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[\*_`]/g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isBlockStart(lines: string[], index: number) {
  const line = lines[index] ?? "";
  if (!line.trim()) return true;
  if (/^#{2,4}\s+/.test(line)) return true;
  if (/^[-*+]\s+/.test(line)) return true;
  if (/^\d+\.\s+/.test(line)) return true;
  if (/^>\s?/.test(line)) return true;
  if (/^(---|\*\*\*|___)\s*$/.test(line)) return true;
  return line.trim().startsWith("|") && isTableDelimiter(lines[index + 1] ?? "");
}

function parseMarkdownBlocks(markdown: string): MarkdownBlock[] {
  const lines = markdown.replaceAll("\r\n", "\n").split("\n");
  const blocks: MarkdownBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }

    const heading = line.match(/^(#{2,4})\s+(.+)$/);
    if (heading) {
      blocks.push({
        type: "heading",
        level: heading[1].length as 2 | 3 | 4,
        text: heading[2].trim(),
      });
      index += 1;
      continue;
    }

    if (
      line.trim().startsWith("|") &&
      isTableDelimiter(lines[index + 1] ?? "")
    ) {
      const headers = splitTableRow(line);
      const alignments = splitTableRow(lines[index + 1]).map(tableAlignment);
      const rows: string[][] = [];
      index += 2;
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        rows.push(splitTableRow(lines[index]));
        index += 1;
      }
      blocks.push({ type: "table", headers, alignments, rows });
      continue;
    }

    if (/^[-*+]\s+/.test(line)) {
      const items: MarkdownListItem[] = [];
      while (index < lines.length) {
        const item = lines[index].match(/^[-*+]\s+(.+)$/);
        if (!item) break;
        items.push(parseListItem(item[1]));
        index += 1;
      }
      blocks.push({ type: "unordered-list", items });
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: MarkdownListItem[] = [];
      while (index < lines.length) {
        const item = lines[index].match(/^\d+\.\s+(.+)$/);
        if (!item) break;
        items.push(parseListItem(item[1]));
        index += 1;
      }
      blocks.push({ type: "ordered-list", items });
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quote: string[] = [];
      while (index < lines.length) {
        const quotedLine = lines[index].match(/^>\s?(.*)$/);
        if (!quotedLine) break;
        quote.push(quotedLine[1]);
        index += 1;
      }
      blocks.push({ type: "blockquote", text: quote.join(" ").trim() });
      continue;
    }

    if (/^(---|\*\*\*|___)\s*$/.test(line)) {
      blocks.push({ type: "separator" });
      index += 1;
      continue;
    }

    const paragraph = [line.trim()];
    index += 1;
    while (index < lines.length && !isBlockStart(lines, index)) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push({ type: "paragraph", text: paragraph.join(" ") });
  }

  return blocks;
}

const INLINE_PATTERN =
  /(\[[^\]]+\]\([^)]+\)|\*\*[^*\n]+\*\*|__[^_\n]+__|`[^`\n]+`|(?<!\*)\*[^*\n]+\*(?!\*)|(?<!_)_[^_\n]+_(?!_))/g;

export function renderInlineMarkdown(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = new RegExp(INLINE_PATTERN.source, INLINE_PATTERN.flags);
  let cursor = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index));
    const token = match[0];

    const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      if (href.startsWith("/")) {
        nodes.push(
          <Link
            key={`inline-${key}`}
            href={href}
            className="font-semibold text-[#8a5b18] underline decoration-[#b29157]/45 underline-offset-4 transition hover:text-[#031126]"
          >
            {renderInlineMarkdown(label)}
          </Link>,
        );
      } else {
        nodes.push(
          <a
            key={`inline-${key}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#8a5b18] underline decoration-[#b29157]/45 underline-offset-4 transition hover:text-[#031126]"
          >
            {renderInlineMarkdown(label)}
          </a>,
        );
      }
    } else if (token.startsWith("**") || token.startsWith("__")) {
      nodes.push(
        <strong key={`inline-${key}`} className="font-bold text-[#17243c]">
          {renderInlineMarkdown(token.slice(2, -2))}
        </strong>,
      );
    } else if (token.startsWith("`")) {
      nodes.push(
        <code
          key={`inline-${key}`}
          className="rounded bg-[#eee6d9] px-1.5 py-0.5 font-mono text-[0.9em] text-[#17243c]"
        >
          {token.slice(1, -1)}
        </code>,
      );
    } else {
      nodes.push(
        <em key={`inline-${key}`}>{token.slice(1, -1)}</em>,
      );
    }

    cursor = match.index + token.length;
    key += 1;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

export function MarkdownContent({ markdown }: { markdown: string }) {
  const blocks = parseMarkdownBlocks(markdown);
  const headingOccurrences = new Map<string, number>();

  return (
    <div className="min-w-0 text-[1.08rem] leading-[1.9] text-[#34435a] sm:text-lg sm:leading-9">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading": {
            const baseId = headingSlug(block.text) || `secao-${index + 1}`;
            const occurrence = (headingOccurrences.get(baseId) ?? 0) + 1;
            headingOccurrences.set(baseId, occurrence);
            const id = occurrence === 1 ? baseId : `${baseId}-${occurrence}`;
            if (block.level === 2) {
              return (
                <h2
                  key={`block-${index}`}
                  id={id}
                  className="mb-5 mt-14 scroll-mt-28 font-serif text-[clamp(1.9rem,5vw,2.7rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-[#07142d] first:mt-0"
                >
                  {renderInlineMarkdown(block.text)}
                </h2>
              );
            }
            return (
              <h3
                key={`block-${index}`}
                id={id}
                className="mb-4 mt-10 scroll-mt-28 font-serif text-[clamp(1.5rem,4vw,2rem)] font-semibold leading-[1.15] text-[#07142d]"
              >
                {renderInlineMarkdown(block.text)}
              </h3>
            );
          }
          case "paragraph":
            return (
              <p key={`block-${index}`} className="my-5">
                {renderInlineMarkdown(block.text)}
              </p>
            );
          case "unordered-list":
            return (
              <ul
                key={`block-${index}`}
                className="my-6 list-disc space-y-2 pl-6 marker:text-[#b29157]"
              >
                {block.items.map((item, itemIndex) => (
                  <li
                    key={`item-${itemIndex}`}
                    className={item.checked === undefined ? undefined : "flex list-none items-start gap-3"}
                  >
                    {item.checked === undefined ? null : (
                      <input
                        type="checkbox"
                        checked={item.checked}
                        readOnly
                        disabled
                        aria-label={item.checked ? "Item concluído" : "Item pendente"}
                        className="mt-2 h-4 w-4 shrink-0 accent-[#8a5b18]"
                      />
                    )}
                    <span>{renderInlineMarkdown(item.text)}</span>
                  </li>
                ))}
              </ul>
            );
          case "ordered-list":
            return (
              <ol
                key={`block-${index}`}
                className="my-6 list-decimal space-y-2 pl-6 marker:font-semibold marker:text-[#8a5b18]"
              >
                {block.items.map((item, itemIndex) => (
                  <li key={`item-${itemIndex}`}>
                    {renderInlineMarkdown(item.text)}
                  </li>
                ))}
              </ol>
            );
          case "table":
            return (
              <div
                key={`block-${index}`}
                className="my-8 max-w-full overflow-x-auto rounded-[16px] border border-[#b29157]/30"
              >
                <table className="w-full min-w-[620px] border-collapse text-left text-base leading-7">
                  <thead className="bg-[#031126] text-[#fbf8f4]">
                    <tr>
                      {block.headers.map((header, cellIndex) => (
                        <th
                          key={`header-${cellIndex}`}
                          scope="col"
                          className={`px-4 py-3 font-semibold ${
                            block.alignments[cellIndex] === "center"
                              ? "text-center"
                              : block.alignments[cellIndex] === "right"
                                ? "text-right"
                                : "text-left"
                          }`}
                        >
                          {renderInlineMarkdown(header)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#b29157]/20 bg-[#fffdf9]">
                    {block.rows.map((row, rowIndex) => (
                      <tr key={`row-${rowIndex}`}>
                        {row.map((cell, cellIndex) => (
                          <td
                            key={`cell-${cellIndex}`}
                            className={`px-4 py-3 align-top ${
                              block.alignments[cellIndex] === "center"
                                ? "text-center"
                                : block.alignments[cellIndex] === "right"
                                  ? "text-right"
                                  : "text-left"
                            }`}
                          >
                            {renderInlineMarkdown(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "blockquote":
            return (
              <blockquote
                key={`block-${index}`}
                className="my-8 border-l-4 border-[#b29157] bg-[#f3eadb]/55 px-5 py-4 font-serif text-xl leading-8 text-[#17243c]"
              >
                {renderInlineMarkdown(block.text)}
              </blockquote>
            );
          case "separator":
            return (
              <hr
                key={`block-${index}`}
                className="my-10 border-0 border-t border-[#b29157]/35"
              />
            );
        }
      })}
    </div>
  );
}
