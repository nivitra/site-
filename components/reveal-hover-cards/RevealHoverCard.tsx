"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export type RevealHoverCardData = {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  badge?: string;
  icon?: LucideIcon;
  cta?: string;
};

type Props = {
  card: RevealHoverCardData;
  className?: string;
};

const spring = {
  type: "spring" as const,
  bounce: 0,
  duration: 0.48,
};

/**
 * Base card + image reveal (clip-path from bottom).
 * Default shape is landscape (~4:3). Override with className for lab portrait.
 */
export function RevealHoverCard({ card, className = "" }: Props) {
  const Icon = card.icon;
  const cta = card.cta ?? "Learn more";

  return (
    <motion.article
      className={`group relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-line bg-background ${className}`}
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      animate="rest"
    >
      <Link
        href={card.href}
        className="absolute inset-0 z-20"
        aria-label={`${card.title} — ${cta}`}
      />

      {/* Default content */}
      <div className="relative z-0 flex h-full flex-col justify-between p-5 sm:p-6">
        <div className="flex items-center gap-2.5">
          {card.badge ? (
            <span className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
              {card.badge}
            </span>
          ) : Icon ? (
            <Icon
              className="h-4 w-4 text-muted"
              strokeWidth={1.5}
              aria-hidden
            />
          ) : null}
        </div>

        <div>
          <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-[17px]">
            {card.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted sm:text-sm">
            {card.description}
          </p>
          <span className="mt-3 inline-block text-[13px] font-medium text-foreground underline underline-offset-[3px]">
            {cta}
          </span>
        </div>
      </div>

      {/* Photo curtain */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        variants={{
          rest: { clipPath: "inset(100% 0 0 0)" },
          hover: { clipPath: "inset(0% 0 0 0)" },
        }}
        transition={spring}
        aria-hidden
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            src={card.image}
            alt=""
            className="h-full w-full object-cover"
            variants={{
              rest: { scale: 1.08 },
              hover: { scale: 1 },
            }}
            transition={spring}
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <p className="text-base font-semibold text-white sm:text-[17px]">
            {card.title}
          </p>
          <span className="mt-2 inline-block text-[13px] font-medium text-white underline underline-offset-[3px]">
            {cta}
          </span>
        </div>
      </motion.div>
    </motion.article>
  );
}
