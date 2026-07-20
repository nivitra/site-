"use client";

import "./scroll-highlight.css";
import { CONTENT } from "./data";
import { HighlightMark } from "./HighlightMark";

/**
 * Full article with multi-color scroll highlights (exact from recording).
 */
export function ScrollHighlightArticle() {
  return (
    <article className="mx-auto w-full max-w-[36rem] px-6 pb-48 pt-8 sm:px-8">
      {CONTENT.map((block, i) => {
        if (block.type === "hero") {
          return (
            <header
              key={i}
              className="flex min-h-[72vh] flex-col justify-end pb-10 pt-28"
            >
              <h1 className="whitespace-pre-line text-[clamp(2.75rem,7vw,4.1rem)] font-semibold leading-[1.05] tracking-tight text-white">
                {block.title}
              </h1>
            </header>
          );
        }

        if (block.type === "heading") {
          return (
            <h2
              key={i}
              className="mb-7 mt-20 whitespace-pre-line text-[clamp(1.85rem,4.5vw,2.4rem)] font-semibold leading-[1.12] tracking-tight text-white"
            >
              {block.value}
            </h2>
          );
        }

        return (
          <p
            key={i}
            className="mb-3 text-[clamp(1.08rem,2.2vw,1.28rem)] font-normal leading-[1.7] text-[#909698]"
          >
            {block.parts.map((part, j) =>
              part.type === "text" ? (
                <span key={j}>{part.value}</span>
              ) : (
                <HighlightMark key={j} color={part.color}>
                  {part.value}
                </HighlightMark>
              )
            )}
          </p>
        );
      })}
    </article>
  );
}

export default ScrollHighlightArticle;
