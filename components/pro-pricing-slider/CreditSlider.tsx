"use client";

import { useCallback, useRef } from "react";
import { motion } from "framer-motion";

type Props = {
  steps: number;
  index: number;
  onChange: (index: number) => void;
  /** Accessible name */
  label: string;
  /** Lab dark UI vs marketing light UI */
  theme?: "dark" | "light";
};

/**
 * Stepped line: filled track + dots through current stop,
 * ring thumb on active stop, muted ahead.
 */
export function CreditSlider({
  steps,
  index,
  onChange,
  label,
  theme = "dark",
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const light = theme === "light";

  const setFromClientX = useCallback(
    (clientX: number) => {
      const el = trackRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const t = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
      const i = Math.round(t * (steps - 1));
      onChange(i);
    },
    [onChange, steps]
  );

  const pct = steps <= 1 ? 0 : (index / (steps - 1)) * 100;

  const rail = light ? "bg-neutral-200" : "bg-neutral-600/80";
  const fill = light ? "bg-emerald-500" : "bg-[#2f6bff]";
  const thumbBorder = light ? "border-white" : "border-white";
  const thumbBg = light ? "bg-emerald-500" : "bg-[#2f6bff]";
  const thumbShadow = light
    ? "shadow-[0_0_0_1px_rgba(16,185,129,0.35),0_2px_8px_rgba(0,0,0,0.12)]"
    : "shadow-[0_0_0_1px_rgba(47,107,255,0.35),0_2px_8px_rgba(0,0,0,0.45)]";
  const dotFilled = light ? "bg-emerald-500" : "bg-[#2f6bff]";
  const dotEmpty = light ? "bg-neutral-300" : "bg-neutral-600";

  return (
    <div
      ref={trackRef}
      role="slider"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={steps - 1}
      aria-valuenow={index}
      tabIndex={0}
      className="relative flex h-8 cursor-pointer items-center touch-none select-none"
      onPointerDown={(e) => {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        setFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (e.buttons !== 1) return;
        setFromClientX(e.clientX);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowUp") {
          e.preventDefault();
          onChange(Math.min(steps - 1, index + 1));
        }
        if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
          e.preventDefault();
          onChange(Math.max(0, index - 1));
        }
      }}
    >
      <div
        className={`absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full ${rail}`}
      />

      <motion.div
        className={`absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full ${fill}`}
        animate={{ width: `${pct}%` }}
        transition={{ type: "spring", stiffness: 420, damping: 36 }}
      />

      <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between">
        {Array.from({ length: steps }).map((_, i) => {
          const filled = i <= index;
          const isThumb = i === index;
          return (
            <button
              key={i}
              type="button"
              aria-label={`Step ${i + 1}`}
              onClick={(e) => {
                e.stopPropagation();
                onChange(i);
              }}
              className="relative z-10 flex h-5 w-5 items-center justify-center"
            >
              {isThumb ? (
                <motion.span
                  layoutId={`${label}-thumb`}
                  className={`block h-[14px] w-[14px] rounded-full border-[3px] ${thumbBorder} ${thumbBg} ${thumbShadow}`}
                  transition={{ type: "spring", stiffness: 500, damping: 32 }}
                />
              ) : (
                <span
                  className={`block h-[9px] w-[9px] rounded-full ${
                    filled ? dotFilled : dotEmpty
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
