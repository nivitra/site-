"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { industries } from "@/lib/industries";
import {
  BAR_LABELS,
  BASE_H,
  BAR_W,
  EXPAND_SIZE,
  GAP,
  GRADIENT_BARS,
  INDUSTRY_EXPAND_PHOTOS,
  PEAK_H,
  WAVE_SIGMA,
} from "./data";

/**
 * Lab-exact spring — same as GradientBars.tsx (smooth wave, not snappy).
 */
const spring = {
  type: "spring" as const,
  stiffness: 320,
  damping: 28,
  mass: 0.65,
};

const INDUSTRY_BARS = industries.map((ind, i) => {
  const asset = GRADIENT_BARS[i % GRADIENT_BARS.length];
  return {
    ...asset,
    id: ind.slug,
    slug: ind.slug,
    name: ind.name,
    label: BAR_LABELS[ind.slug] ?? ind.name.split(/[\s&/]+/)[0]!,
    tag: ind.tag,
    headline: ind.headline,
    expandPhoto: INDUSTRY_EXPAND_PHOTOS[ind.slug] ?? asset.mesh,
  };
});

type Props = {
  compact?: boolean;
  hideHeader?: boolean;
  /** nav = lighter stage for navbar blur overlay */
  variant?: "default" | "nav";
  hideLegend?: boolean;
  animateIn?: boolean;
  /** Open solution links in a new tab (navbar) */
  openInNewTab?: boolean;
  onNavigate?: () => void;
  className?: string;
};

/**
 * Industry bars — lab GradientBars physics + length, with:
 *  · title-case vertical labels
 *  · industry expand photos (fade/blur from bottom)
 *  · playbook CTA
 */
export default function IndustryGradientBars({
  compact = false,
  hideHeader = false,
  variant = "default",
  hideLegend = false,
  animateIn = false,
  openInNewTab = false,
  onNavigate,
  className = "",
}: Props) {
  const linkProps = openInNewTab
    ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
    : {};
  const isNav = variant === "nav";
  const rowRef = useRef<HTMLDivElement>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const [entranceDone, setEntranceDone] = useState(!animateIn);

  /**
   * Scale lab dimensions — keep PEAK/BASE ratio and bar proportions exact.
   * default: full lab · nav: slightly taller · compact: smaller
   */
  const scale = isNav ? 0.95 : compact ? 0.72 : 1;
  const baseH = Math.round(BASE_H * scale);
  const peakH = Math.round(PEAK_H * scale);
  const barW = Math.round(BAR_W * scale);
  const expand = Math.round(EXPAND_SIZE * scale);
  const gap = Math.round(GAP * scale);
  const labelSize = isNav ? 16 : compact ? 16 : 18;
  const showLegend = !hideLegend && !isNav;
  const isExpanded = active !== null;

  useEffect(() => {
    if (!animateIn) return;
    const t = window.setTimeout(
      () => setEntranceDone(true),
      INDUSTRY_BARS.length * 50 + 400
    );
    return () => window.clearTimeout(t);
  }, [animateIn]);

  /** Lab-exact hover index (float along row width) */
  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (active !== null) return;
      const row = rowRef.current;
      if (!row) return;
      const rect = row.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const unit = rect.width / INDUSTRY_BARS.length;
      setHoverIdx(Math.max(0, Math.min(INDUSTRY_BARS.length - 1, x / unit)));
    },
    [active]
  );

  const onLeave = useCallback(() => {
    if (active === null) setHoverIdx(null);
  }, [active]);

  /**
   * Lab-exact heights:
   *  rest → BASE_H
   *  hover → gaussian peak
   *  expand → active EXPAND_SIZE, siblings BASE_H * 0.9
   */
  const heights = useMemo(() => {
    return INDUSTRY_BARS.map((_, i) => {
      if (active !== null) {
        return active === i ? expand : baseH * 0.9;
      }
      if (hoverIdx === null) return baseH;
      const d = i - hoverIdx;
      const w = Math.exp(-(d * d) / (2 * WAVE_SIGMA * WAVE_SIGMA));
      return baseH + (peakH - baseH) * w;
    });
  }, [hoverIdx, active, baseH, peakH, expand]);

  const activeBar = active !== null ? INDUSTRY_BARS[active] : null;

  const stage = (
    <>
      <div
        className="relative flex w-full items-center justify-center"
        style={{
          /* Room for peak wave so footer never collides with bars */
          minHeight: isNav
            ? peakH + 24
            : compact
              ? peakH + 20
              : peakH + 40,
        }}
      >
        <div
          ref={rowRef}
          className={`relative z-10 flex items-center justify-center ${
            isNav ? "w-full max-w-5xl" : "w-full max-w-6xl"
          }`}
          style={{ gap }}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          {INDUSTRY_BARS.map((bar, i) => {
            const isActive = active === i;
            const isDimmed = isExpanded && !isActive;
            const h = heights[i];
            /** Lab: only width change on expand — not on hover */
            const w = isActive ? expand : barW;

            return (
              <motion.button
                key={bar.id}
                type="button"
                aria-label={
                  isActive ? `Close ${bar.name}` : `Expand ${bar.name}`
                }
                aria-expanded={isActive}
                onClick={() => setActive((cur) => (cur === i ? null : i))}
                className="relative shrink-0 cursor-pointer overflow-hidden border-0 bg-transparent p-0 shadow-none outline-none ring-0 focus:outline-none focus-visible:outline-none"
                style={{
                  borderRadius: isActive ? 14 : 2,
                  border: "none",
                  outline: "none",
                  boxShadow: isActive
                    ? "0 20px 48px -20px rgba(0,0,0,0.32)"
                    : "none",
                  WebkitTapHighlightColor: "transparent",
                }}
                initial={
                  animateIn
                    ? { opacity: 0, y: 40, height: baseH * 0.5 }
                    : false
                }
                animate={{
                  width: w,
                  height: h,
                  opacity: isDimmed ? 0.7 : 1,
                  filter: isDimmed
                    ? "blur(16px) saturate(1.05)"
                    : "blur(0px) saturate(1)",
                  zIndex: isActive ? 30 : 1,
                }}
                transition={{
                  ...spring,
                  delay: entranceDone ? 0 : i * 0.05,
                }}
              >
                {/* Collapsed strip */}
                {!isActive && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={bar.bar}
                    alt=""
                    draggable={false}
                    className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
                  />
                )}

                {/* Expanded industry photo + bottom fade/blur */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      key="photo"
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 overflow-hidden"
                      style={{ borderRadius: "inherit" }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={bar.expandPhoto}
                        alt=""
                        draggable={false}
                        className="absolute inset-0 h-full w-full select-none object-cover"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-[62%]"
                        style={{
                          background:
                            "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.55) 38%, rgba(255,255,255,0.92) 72%, rgba(255,255,255,0.98) 100%)",
                        }}
                      />
                      <span
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-[48%]"
                        style={{
                          backdropFilter: "blur(12px)",
                          WebkitBackdropFilter: "blur(12px)",
                          maskImage:
                            "linear-gradient(180deg, transparent 0%, black 55%, black 100%)",
                          WebkitMaskImage:
                            "linear-gradient(180deg, transparent 0%, black 55%, black 100%)",
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Vertical label — lab bar length, title-case white type */}
                {!isActive && (
                  <span
                    className="pointer-events-none absolute inset-x-0 bottom-0 top-0 z-[2] flex justify-center"
                    style={{
                      paddingTop: 14,
                      paddingBottom: 16,
                    }}
                  >
                    <span
                      className="select-none self-end"
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        whiteSpace: "nowrap",
                        maxHeight: "100%",
                        fontSize: labelSize,
                        fontWeight: 800,
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                        color: "#ffffff",
                        fontFamily:
                          "var(--font-geist-sans), system-ui, sans-serif",
                        opacity: isDimmed ? 0.5 : 0.98,
                        WebkitFontSmoothing: "antialiased",
                      }}
                    >
                      {bar.label}
                    </span>
                  </span>
                )}

                {/* Expanded copy + CTA */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{
                        duration: 0.28,
                        delay: 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`absolute inset-0 z-[3] flex flex-col justify-end text-left ${
                        isNav ? "p-4" : "p-5"
                      }`}
                    >
                      <p className="text-[12px] font-bold tracking-[0.16em] text-brand-700 uppercase sm:text-[13px]">
                        Industry
                      </p>
                      <p
                        className={`mt-1.5 font-semibold tracking-tight text-neutral-900 ${
                          isNav ? "text-base sm:text-lg" : "text-xl"
                        }`}
                      >
                        {bar.name}
                      </p>
                      <p
                        className={`mt-1.5 leading-relaxed text-neutral-700 ${
                          isNav
                            ? "line-clamp-2 text-[12px] sm:text-[13px]"
                            : "line-clamp-3 text-[13px] sm:text-sm"
                        }`}
                      >
                        {bar.tag}
                      </p>
                      <Link
                        href={`/solutions/${bar.slug}`}
                        {...linkProps}
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate?.();
                        }}
                        className={`brand-pill mt-3.5 inline-flex w-fit items-center justify-center rounded-lg px-4 py-2.5 text-[13px] font-semibold text-white ${
                          isNav ? "text-[12px] sm:text-[13px]" : ""
                        }`}
                      >
                        View usecases
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        {isExpanded && (
          <button
            type="button"
            aria-label="Close expansion"
            className="absolute inset-0 z-[5] cursor-default"
            onClick={() => setActive(null)}
          />
        )}
      </div>

      {showLegend && (
        <div className="mx-auto mt-10 flex w-full max-w-5xl flex-wrap items-center justify-center gap-x-1 gap-y-1.5">
          {INDUSTRY_BARS.map((b, i) => (
            <button
              key={b.slug}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => active === null && setHoverIdx(i)}
              onMouseLeave={() => active === null && setHoverIdx(null)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium tracking-tight transition-colors sm:text-xs ${
                active === i
                  ? "bg-brand-500/12 text-brand-700"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>
      )}

      {showLegend && activeBar && (
        <p className="mx-auto mt-4 max-w-md text-center text-sm text-muted">
          {activeBar.headline}{" "}
          <Link
            href={`/solutions/${activeBar.slug}`}
            {...linkProps}
            onClick={() => onNavigate?.()}
            className="font-semibold text-brand-600 hover:text-brand-700"
          >
            Open Industry Intelligence
          </Link>
        </p>
      )}
    </>
  );

  if (hideHeader || isNav) {
    return (
      <div className={`relative overflow-visible ${className}`}>
        <div className={isNav ? "relative px-1 py-1" : "relative px-4 py-6"}>
          {stage}
        </div>
      </div>
    );
  }

  return (
    <section
      className={`relative overflow-hidden border-y border-line py-16 sm:py-24 ${className}`}
      style={{
        background:
          "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(34,197,94,0.07) 0%, transparent 55%), #fafafa",
      }}
    >
      <div className="relative mx-auto max-w-6xl px-6">
        <p className="text-center text-xs font-semibold tracking-[0.22em] text-muted-2 uppercase">
          Industry Intelligence
        </p>
        <h2 className="mt-3 text-center text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Built for the calls your industry runs
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-[15px] text-muted">
          Hover a bar. Click to expand. Drop into Industry Intelligence for the
          full vertical playbook.
        </p>
        <div className="mt-12 sm:mt-14">{stage}</div>
      </div>
    </section>
  );
}
