"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

/**
 * High-performance count-up via anime.js object tweening.
 * Fires once in-view; formats with optional prefix/suffix/compact.
 */
export default function AnimeCounter({
  to,
  from = 0,
  prefix = "",
  suffix = "",
  duration = 1600,
  decimals = 0,
  compact = false,
  className = "",
}: {
  to: number;
  from?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  compact?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const format = (v: number) => {
      if (compact && to >= 1_000_000) {
        return `${prefix}${(v / 1_000_000).toFixed(decimals || 1)}M${suffix}`;
      }
      // Indian scale: 1L = 1 lakh (100,000)
      if (compact && to >= 100_000) {
        return `${prefix}${(v / 100_000).toFixed(decimals || 0)}L${suffix}`;
      }
      if (compact && to >= 1_000) {
        return `${prefix}${(v / 1_000).toFixed(decimals || 0)}K${suffix}`;
      }
      return `${prefix}${v.toFixed(decimals)}${suffix}`;
    };

    if (reduce) {
      el.textContent = format(to);
      return;
    }

    el.textContent = format(from);
    let anim: ReturnType<typeof animate> | null = null;
    let played = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played) return;
        played = true;
        io.disconnect();

        const obj = { v: from };
        anim = animate(obj, {
          v: to,
          duration,
          ease: "out(3)",
          onUpdate: () => {
            el.textContent = format(obj.v);
          },
        });
      },
      { threshold: 0.35 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      anim?.pause();
    };
  }, [to, from, prefix, suffix, duration, decimals, compact]);

  return <span ref={ref} className={className} />;
}
