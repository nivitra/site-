"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { FAQ_ITEMS, type FAQItem } from "./data";

const mono =
  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace";

export type CommonQuestionsProps = {
  /** FAQ carousel items. Defaults to Speaksy homepage FAQs. */
  items?: FAQItem[];
  /**
   * `lab` — full-screen fixed overlay (lab playground, mono).
   * `section` — embedded marketing section (site font + rhythm).
   */
  variant?: "lab" | "section";
  /** Main heading (section) / page title (lab) */
  title?: string;
  /** Small eyebrow above the title — section only */
  eyebrow?: string;
  /** Optional subtitle under the title — section only */
  subtitle?: string;
  /** Show copy button (lab defaults on; section off) */
  showActions?: boolean;
  className?: string;
};

/**
 * Common Questions carousel — stacked Qs, ↑↓, IN/OUT answer card.
 * Section variant matches Speaksy site type + spacing.
 */
export default function CommonQuestions({
  items = FAQ_ITEMS,
  variant = "lab",
  title = "Straight answers",
  eyebrow = "FAQ",
  subtitle,
  showActions,
  className = "",
}: CommonQuestionsProps) {
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const n = Math.max(items.length, 1);
  const safeIndex = ((index % n) + n) % n;
  const current = items[safeIndex] ?? items[0];
  const actions = showActions ?? variant === "lab";

  useEffect(() => {
    setIndex((i) => (i >= n ? 0 : i));
  }, [n]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + n) % n);
  }, [n]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % n);
  }, [n]);

  useEffect(() => {
    if (n < 2) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        prev();
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, n]);

  const onCopy = async () => {
    if (!current) return;
    try {
      await navigator.clipboard.writeText(
        `Q: ${current.question}\nA: ${current.lead}\n${current.body.join("\n\n")}`
      );
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  if (!current) return null;

  const prevQ = items[(safeIndex - 1 + n) % n];
  const nextQ = items[(safeIndex + 1) % n];
  const isSection = variant === "section";

  const carousel = (
    <div
      className={`flex w-full flex-col ${
        isSection ? "mx-auto max-w-xl" : "max-w-[520px]"
      }`}
    >
      {/* Question stack */}
      <div className="relative mb-8 min-h-[7.25rem] sm:mb-9 sm:min-h-[7.5rem]">
        {n > 1 && (
          <button
            type="button"
            onClick={prev}
            className={`absolute left-0 top-0 w-[calc(100%-3.25rem)] truncate text-left transition-colors ${
              isSection
                ? "text-[15px] text-muted/50 hover:text-muted"
                : "text-[15px] text-neutral-300 hover:text-neutral-400"
            }`}
          >
            {prevQ.question}
          </button>
        )}

        <div className="absolute left-0 top-[2.1rem] flex w-full items-start justify-between gap-3 sm:top-[2.15rem]">
          <p
            className={`min-w-0 flex-1 text-[15px] leading-snug sm:text-base ${
              isSection
                ? "font-semibold tracking-tight text-foreground"
                : "font-medium text-neutral-900"
            }`}
          >
            {current.question}
          </p>
          {n > 1 && (
            <div
              className={`flex shrink-0 items-center gap-0.5 pt-0.5 ${
                isSection ? "text-muted" : "text-neutral-400"
              }`}
            >
              <button
                type="button"
                aria-label="Previous question"
                onClick={prev}
                className={`rounded-md p-1 transition-colors ${
                  isSection
                    ? "hover:bg-brand-500/10 hover:text-brand-600"
                    : "hover:text-blue-600"
                }`}
              >
                <span className="text-sm leading-none">↑</span>
              </button>
              <button
                type="button"
                aria-label="Next question"
                onClick={next}
                className={`rounded-md p-1 transition-colors ${
                  isSection
                    ? "hover:bg-brand-500/10 hover:text-brand-600"
                    : "hover:text-blue-600"
                }`}
              >
                <span className="text-sm leading-none">↓</span>
              </button>
            </div>
          )}
        </div>

        {n > 1 && (
          <button
            type="button"
            onClick={next}
            className={`absolute left-0 top-[4.25rem] w-[calc(100%-3.25rem)] truncate text-left transition-colors sm:top-[4.35rem] ${
              isSection
                ? "text-[15px] text-muted/50 hover:text-muted"
                : "text-[15px] text-neutral-300 hover:text-neutral-400"
            }`}
          >
            {nextQ.question}
          </button>
        )}
      </div>

      {/* Answer card */}
      <div
        className={
          isSection
            ? "card overflow-hidden rounded-2xl"
            : "overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
        }
      >
        <div
          className={`flex gap-3 border-b px-5 py-3.5 sm:px-6 ${
            isSection ? "border-line" : "border-neutral-200"
          }`}
        >
          <span
            className={`shrink-0 text-[11px] font-semibold tracking-[0.14em] uppercase ${
              isSection ? "text-muted" : "tracking-wide text-neutral-400"
            }`}
          >
            In
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={`in-${current.id}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.22 }}
              className={`min-w-0 text-[13px] leading-snug sm:text-sm ${
                isSection
                  ? "font-medium text-foreground"
                  : "text-[11px] font-medium tracking-[0.06em] text-neutral-800 uppercase"
              }`}
            >
              {current.question}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="min-h-[11.5rem] px-5 py-5 sm:min-h-[12.5rem] sm:px-6 sm:py-6">
          <div className="flex gap-3">
            <span
              className={`shrink-0 pt-0.5 text-[11px] font-semibold tracking-[0.14em] uppercase ${
                isSection ? "text-brand-500" : "tracking-wide text-neutral-400"
              }`}
            >
              Out
            </span>
            <div className="min-w-0 flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`out-${current.id}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p
                    className={`leading-relaxed ${
                      isSection
                        ? "text-[15px] text-foreground/90 sm:text-base"
                        : "text-[13px] text-neutral-800 sm:text-[14px]"
                    }`}
                  >
                    {current.lead}
                  </p>
                  {current.body.map((p, i) => (
                    <p
                      key={i}
                      className={`mt-3.5 leading-relaxed ${
                        isSection
                          ? "text-[15px] text-muted sm:text-base"
                          : "mt-4 text-[13px] text-neutral-800 sm:text-[14px]"
                      }`}
                    >
                      {p}
                    </p>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {actions && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onCopy}
            className={
              isSection
                ? "rounded-full border border-line bg-background px-5 py-2 text-xs font-semibold tracking-wide text-muted transition-colors hover:border-black/15 hover:text-foreground"
                : "rounded-md border border-neutral-300 bg-white px-4 py-2 text-[10px] font-medium tracking-[0.16em] text-neutral-800 uppercase transition-colors hover:border-neutral-400 hover:bg-neutral-50"
            }
          >
            {copied ? "Copied" : "Copy answer"}
          </button>
        </div>
      )}
    </div>
  );

  if (variant === "lab") {
    return (
      <div
        className={`fixed inset-0 z-[80] overflow-y-auto bg-white text-neutral-900 ${className}`}
        style={{ fontFamily: mono }}
      >
        <div className="flex min-h-full flex-col items-center px-6 pb-16 pt-20">
          <h1 className="mb-14 text-center text-[11px] font-medium tracking-[0.28em] text-neutral-800 uppercase sm:text-xs">
            {title === "Straight answers" ? "Common Questions" : title}
          </h1>
          {carousel}
          <a
            href="/lab"
            className="mt-12 text-[10px] tracking-wide text-neutral-400 uppercase transition-colors hover:text-neutral-600"
          >
            ← Lab
          </a>
        </div>
      </div>
    );
  }

  // Marketing section — same type, spacing, and cards as the rest of the site
  return (
    <section
      className={`section ${className}`}
      aria-label={title}
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
        />
        <div className="mt-12 sm:mt-14">{carousel}</div>
      </div>
    </section>
  );
}
