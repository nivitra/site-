"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

/**
 * Scroll-triggered width morph for pricing / benchmark bars.
 * Uses transform: scaleX so it stays compositor-friendly.
 */
export default function MorphBar({
  pct,
  className = "",
  delay = 0,
  duration = 1100,
}: {
  pct: number;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.style.transformOrigin = "left center";
    el.style.width = "100%";

    if (reduce) {
      el.style.transform = `scaleX(${pct / 100})`;
      return;
    }

    el.style.transform = "scaleX(0)";
    let anim: ReturnType<typeof animate> | null = null;
    let played = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played) return;
        played = true;
        io.disconnect();
        anim = animate(el, {
          scaleX: [0, pct / 100],
          duration,
          delay,
          ease: "out(4)",
          onComplete: () => {
            el.style.willChange = "auto";
          },
        });
        el.style.willChange = "transform";
      },
      { threshold: 0.25, rootMargin: "-40px" }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      anim?.pause();
    };
  }, [pct, delay, duration]);

  return <div ref={ref} className={className} />;
}
