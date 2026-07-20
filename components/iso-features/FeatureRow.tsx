"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Feature } from "./data";

export type FeatureAccent = "violet" | "emerald";

type Props = {
  feature: Feature;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
  /** Lab purple vs Speaksy emerald */
  accent?: FeatureAccent;
  /** Compact row for match-flow / dense lists */
  compact?: boolean;
};

const ACCENT = {
  violet: {
    hot: "#7c3aed",
    bracket: "border-violet-600",
    ring: "focus-visible:ring-violet-400/40",
  },
  emerald: {
    hot: "#10B981",
    bracket: "border-emerald-500",
    ring: "focus-visible:ring-emerald-400/40",
  },
} as const;

function CornerBrackets({
  active,
  accent,
}: {
  active: boolean;
  accent: FeatureAccent;
}) {
  const c = active ? ACCENT[accent].bracket : "border-neutral-300";
  const arm = "absolute h-2.5 w-2.5";
  return (
    <>
      <span className={`${arm} ${c} left-0 top-0 border-l border-t`} />
      <span className={`${arm} ${c} right-0 top-0 border-r border-t`} />
      <span className={`${arm} ${c} bottom-0 left-0 border-b border-l`} />
      <span className={`${arm} ${c} bottom-0 right-0 border-b border-r`} />
    </>
  );
}

/**
 * Isometric feature row — corner brackets, stroke icons, inverted title pill.
 */
export function FeatureRow({
  feature,
  active,
  onEnter,
  onLeave,
  accent = "violet",
  compact = false,
}: Props) {
  const { Icon, title, description, focus, badges, href } = feature;
  const hot = ACCENT[accent].hot;
  const iconSize = compact ? "h-11 w-11" : "h-14 w-14";
  const plate = compact ? "h-[56px] w-[56px]" : "h-[72px] w-[72px]";

  const body = (
    <>
      <div className={`relative shrink-0 ${plate}`}>
        <CornerBrackets active={active} accent={accent} />
        <motion.div
          className="flex h-full w-full items-center justify-center p-1.5"
          animate={{
            scale: active ? 1.06 : 1,
            rotate: active ? -2 : 0,
          }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
        >
          <Icon
            active={active}
            className={iconSize}
            hotColor={hot}
            idleColor="#9ca3af"
          />
        </motion.div>
      </div>

      <div className={`min-w-0 ${compact ? "pt-0.5" : "pt-1"}`}>
        <div className="flex flex-wrap items-center gap-2">
          <motion.span
            className={`inline-block rounded-sm px-1.5 py-0.5 font-semibold tracking-tight ${
              compact ? "text-[14px]" : "text-[15px]"
            }`}
            animate={{
              backgroundColor: active ? "#111111" : "rgba(0,0,0,0)",
              color: active ? "#ffffff" : "#111111",
            }}
            transition={{ duration: 0.18 }}
          >
            {title}
          </motion.span>
          {badges?.slice(0, 2).map((b) => (
            <span
              key={b}
              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase ${
                accent === "emerald"
                  ? "bg-emerald-500/10 text-emerald-800"
                  : "bg-violet-500/10 text-violet-700"
              }`}
            >
              {b}
            </span>
          ))}
        </div>
        {focus && (
          <p
            className={`mt-0.5 text-[11px] font-medium ${
              accent === "emerald" ? "text-emerald-700" : "text-violet-600"
            }`}
          >
            {focus}
          </p>
        )}
        <p
          className={`mt-1 max-w-md leading-relaxed text-neutral-500 ${
            compact ? "text-[13px]" : "text-[14px]"
          }`}
        >
          {description}
        </p>
      </div>
    </>
  );

  const className = `group flex w-full items-start gap-4 rounded-lg px-1.5 py-2.5 text-left outline-none transition-colors sm:gap-5 sm:px-2 sm:py-3 ${ACCENT[accent].ring} focus-visible:ring-2 ${
    compact ? "max-w-none" : "max-w-xl"
  }`;

  if (href) {
    return (
      <motion.div
        animate={{ x: active ? 2 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <Link
          href={href}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          onFocus={onEnter}
          onBlur={onLeave}
          className={className}
          id={feature.id}
        >
          {body}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type="button"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      className={className}
      animate={{ x: active ? 2 : 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      id={feature.id}
    >
      {body}
    </motion.button>
  );
}
