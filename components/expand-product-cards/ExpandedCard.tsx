"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import type { ProductCardData } from "./data";
import { ProductVisual } from "./ProductVisual";

type Props = {
  card: ProductCardData;
  onClose: () => void;
  layoutNs?: string;
};

const spring = {
  type: "spring" as const,
  stiffness: 95,
  damping: 18,
  mass: 1.05,
};

const easeOut = [0.22, 1, 0.36, 1] as const;

/**
 * Full-viewport morph — solid plain-English story + takeaways for non-tech buyers.
 */
export function ExpandedCard({ card, onClose, layoutNs = "" }: Props) {
  const dark = card.text === "dark";
  const ns = layoutNs ? `${layoutNs}-` : "";
  const headline = card.expandTitle ?? card.title;
  const story = card.expandBody ?? card.body;
  const takeaways = card.takeaways ?? [];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60]">
      <motion.div
        layoutId={`${ns}shell-${card.id}`}
        className="absolute inset-0 flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden"
        style={{ backgroundColor: card.color, borderRadius: 0 }}
        transition={{
          ...spring,
          borderRadius: { duration: 0.45, ease: easeOut },
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`expand-title-${card.id}`}
      >
        <motion.div
          layoutId={`${ns}product-${card.id}`}
          className="pointer-events-none absolute left-1/2 top-[max(1rem,3vh)] w-[min(22vw,150px)] -translate-x-1/2 sm:w-[170px]"
          transition={spring}
        >
          <motion.div
            initial={false}
            animate={{
              opacity: 0.14,
              scale: 0.88,
              rotate: card.restRotate * 0.35,
            }}
            transition={{ duration: 0.55, ease: easeOut }}
          >
            <ProductVisual card={card} active />
          </motion.div>
        </motion.div>

        <div className="relative z-10 mx-auto flex w-full max-w-[36rem] flex-col items-center px-6 py-20 text-center sm:py-24">
          <motion.p
            layoutId={`${ns}eyebrow-${card.id}`}
            className={`text-[13px] font-semibold tracking-[0.14em] uppercase sm:text-[14px] ${
              dark ? "text-black/60" : "text-white/80"
            }`}
            transition={spring}
          >
            {card.eyebrow}
          </motion.p>

          {/* Morphs from collapsed short label */}
          <motion.p
            layoutId={`${ns}title-${card.id}`}
            className={`mt-3 text-[13px] font-semibold tracking-wide sm:text-[14px] ${
              dark ? "text-emerald-900/70" : "text-white/75"
            }`}
            transition={spring}
          >
            {card.title}
          </motion.p>

          <motion.h2
            id={`expand-title-${card.id}`}
            className={`mt-2 max-w-[20ch] text-[clamp(1.75rem,5.5vw,2.65rem)] font-semibold leading-[1.08] tracking-tight sm:max-w-[18ch] ${
              dark ? "text-black" : "text-white"
            }`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease: easeOut }}
          >
            {headline}
          </motion.h2>

          {card.badges && card.badges.length > 0 && (
            <motion.div
              className="mt-4 flex flex-wrap justify-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.12, ease: easeOut }}
            >
              {card.badges.map((b) => (
                <span
                  key={b}
                  className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase ${
                    dark
                      ? "bg-black/10 text-black/80"
                      : "bg-white/20 text-white"
                  }`}
                >
                  {b}
                </span>
              ))}
            </motion.div>
          )}

          <motion.p
            className={`mt-5 max-w-[32rem] text-[15px] leading-relaxed sm:mt-6 sm:text-[17px] ${
              dark ? "text-black/80" : "text-white/92"
            }`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4, delay: 0.14, ease: easeOut }}
          >
            {story}
          </motion.p>

          {takeaways.length > 0 && (
            <motion.ul
              className="mt-6 w-full max-w-[28rem] space-y-2.5 text-left sm:mt-7"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.18, ease: easeOut }}
            >
              {takeaways.map((line) => (
                <li
                  key={line}
                  className={`flex items-start gap-2.5 text-[14px] leading-snug sm:text-[15px] ${
                    dark ? "text-black/85" : "text-white/95"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                      dark ? "bg-emerald-700/15 text-emerald-800" : "bg-white/25 text-white"
                    }`}
                  >
                    <Check className="h-3 w-3" strokeWidth={2.75} />
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </motion.ul>
          )}

          {card.cta && (
            <motion.div
              className="mt-8 sm:mt-9"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.22, ease: easeOut }}
            >
              <Link
                href={card.cta.href}
                className={`inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold transition ${
                  dark
                    ? "bg-emerald-700 text-white shadow-[0_10px_28px_-8px_rgba(6,78,59,0.45)] hover:bg-emerald-800"
                    : "bg-white text-emerald-950 shadow-[0_10px_28px_-8px_rgba(0,0,0,0.25)] hover:bg-white/95"
                }`}
              >
                {card.cta.label}
              </Link>
            </motion.div>
          )}
        </div>

        <motion.button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-[0_8px_30px_-10px_rgba(0,0,0,0.35)] sm:right-8 sm:top-8"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.28, delay: 0.14, ease: easeOut }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
        >
          <X className="h-[18px] w-[18px]" strokeWidth={2.25} />
        </motion.button>
      </motion.div>
    </div>
  );
}
