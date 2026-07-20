"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BASE_H,
  BAR_W,
  EXPAND_SIZE,
  GAP,
  GRADIENT_BARS,
  PEAK_H,
  WAVE_SIGMA,
} from "./data";

const spring = {
  type: "spring" as const,
  stiffness: 320,
  damping: 28,
  mass: 0.65,
};

/**
 * Pure holographic gradient bars (exact from recording):
 * rest equal strips → cursor gaussian height wave → click expands
 * a sharp mesh square while siblings blur + soft bloom.
 */
export default function GradientBars() {
  const rowRef = useRef<HTMLDivElement>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [active, setActive] = useState<number | null>(null);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (active !== null) return;
      const row = rowRef.current;
      if (!row) return;
      const rect = row.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const unit = rect.width / GRADIENT_BARS.length;
      setHoverIdx(Math.max(0, Math.min(GRADIENT_BARS.length - 1, x / unit)));
    },
    [active],
  );

  const onLeave = useCallback(() => {
    if (active === null) setHoverIdx(null);
  }, [active]);

  const heights = useMemo(() => {
    return GRADIENT_BARS.map((_, i) => {
      if (active !== null) {
        return active === i ? EXPAND_SIZE : BASE_H * 0.9;
      }
      if (hoverIdx === null) return BASE_H;
      const d = i - hoverIdx;
      const w = Math.exp(-(d * d) / (2 * WAVE_SIGMA * WAVE_SIGMA));
      return BASE_H + (PEAK_H - BASE_H) * w;
    });
  }, [hoverIdx, active]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-3 sm:px-6">
      <Link
        href="/lab"
        className="absolute left-5 top-5 z-40 text-xs text-neutral-500 transition-colors hover:text-neutral-300"
      >
        ← Lab
      </Link>

      {/* Dim stage when expanded */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: active !== null ? 0.25 : 0 }}
        transition={{ duration: 0.35 }}
        style={{ background: "radial-gradient(ellipse at center, transparent 30%, #000 85%)" }}
      />

      <div
        ref={rowRef}
        className="relative z-10 flex items-center justify-center"
        style={{ gap: GAP }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {GRADIENT_BARS.map((bar, i) => {
          const isActive = active === i;
          const isDimmed = active !== null && !isActive;
          const h = heights[i];
          const w = isActive ? EXPAND_SIZE : BAR_W;

          return (
            <motion.button
              key={bar.id}
              type="button"
              aria-label={isActive ? "Collapse gradient" : `Expand bar ${i + 1}`}
              aria-expanded={isActive}
              onClick={() => setActive((cur) => (cur === i ? null : i))}
              className="relative shrink-0 cursor-pointer overflow-hidden p-0 outline-none focus-visible:ring-2 focus-visible:ring-white/25"
              style={{
                borderRadius: isActive ? 2 : 1,
                // slight outer glow on neighbors when expanded (recording bloom)
                boxShadow: isDimmed
                  ? "0 0 28px 2px rgba(255,255,255,0.14)"
                  : isActive
                    ? "0 0 40px -8px rgba(255,255,255,0.2)"
                    : "none",
              }}
              animate={{
                width: w,
                height: h,
                opacity: isDimmed ? 0.85 : 1,
                filter: isDimmed
                  ? "blur(16px) saturate(1.05)"
                  : "blur(0px) saturate(1)",
                zIndex: isActive ? 30 : 1,
              }}
              transition={spring}
            >
              {/* Collapsed: tall strip · Expanded: full square mesh */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={isActive ? bar.mesh : bar.bar}
                alt=""
                draggable={false}
                className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
              />
            </motion.button>
          );
        })}
      </div>

      {active !== null && (
        <button
          type="button"
          aria-label="Close"
          className="absolute inset-0 z-[5] cursor-default"
          onClick={() => setActive(null)}
        />
      )}
    </div>
  );
}
