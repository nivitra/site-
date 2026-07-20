"use client";

import { Fragment, useMemo, type ReactNode } from "react";
import type { BlogBlock } from "@/lib/posts";
import { HighlightMark } from "@/components/scroll-highlight";
import type { HighlightColor } from "@/components/scroll-highlight/data";
import "@/components/scroll-highlight/scroll-highlight.css";

const COLORS: HighlightColor[] = ["green", "blue", "yellow", "purple"];

function stripTags(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Split plain text by highlight phrases (longest first), return React nodes.
 */
function paintText(
  text: string,
  phrases: string[],
  colorOffset: number
): ReactNode[] {
  if (!phrases.length || !text) return [text];

  type Hit = { start: number; end: number; phrase: string; color: HighlightColor };
  const hits: Hit[] = [];
  const lower = text.toLowerCase();

  phrases.forEach((phrase, i) => {
    const p = phrase.trim();
    if (p.length < 4) return;
    const idx = lower.indexOf(p.toLowerCase());
    if (idx === -1) return;
    // skip overlapping
    if (hits.some((h) => idx < h.end && idx + p.length > h.start)) return;
    hits.push({
      start: idx,
      end: idx + p.length,
      phrase: text.slice(idx, idx + p.length),
      color: COLORS[(colorOffset + i) % COLORS.length],
    });
  });

  hits.sort((a, b) => a.start - b.start);
  if (!hits.length) return [text];

  const nodes: ReactNode[] = [];
  let cursor = 0;
  hits.forEach((h, i) => {
    if (h.start > cursor) nodes.push(text.slice(cursor, h.start));
    nodes.push(
      <HighlightMark key={`m-${i}-${h.start}`} color={h.color}>
        {h.phrase}
      </HighlightMark>
    );
    cursor = h.end;
  });
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

/**
 * Light-theme article body with scroll-highlight on proof points.
 */
export default function BlogPostBody({
  blocks,
  highlights,
}: {
  blocks: BlogBlock[];
  highlights: string[];
}) {
  // Prefer shorter, metric-y phrases first for matching
  const phrases = useMemo(
    () =>
      [...highlights].sort(
        (a, b) =>
          Number(/\d|₹|%|x/i.test(b)) - Number(/\d|₹|%|x/i.test(a)) ||
          a.length - b.length
      ),
    [highlights]
  );

  return (
    <div className="mt-8 flex flex-col gap-5 sm:gap-6">
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return (
            <h2
              key={i}
              className="mb-1 mt-6 text-xl font-semibold tracking-tight text-foreground sm:text-[1.35rem]"
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === "ul") {
          return (
            <ul
              key={i}
              className="flex list-none flex-col gap-2.5 border-l-2 border-brand-500/30 pl-4"
            >
              {block.items.map((item, j) => (
                <li
                  key={j}
                  className="text-[15px] leading-relaxed text-foreground/85 sm:text-base"
                >
                  <span className="mr-2 text-brand-600">·</span>
                  {paintText(item, phrases, i + j).map((n, k) => (
                    <Fragment key={k}>{n}</Fragment>
                  ))}
                </li>
              ))}
            </ul>
          );
        }

        // paragraph — render plain text with highlights (strip inline HTML safely)
        const text = stripTags(block.html);
        return (
          <p
            key={i}
            className="text-[15px] leading-[1.75] text-foreground/85 sm:text-base"
          >
            {paintText(text, phrases, i).map((n, k) => (
              <Fragment key={k}>{n}</Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
