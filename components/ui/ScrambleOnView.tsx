"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { animate, scrambleText } from "animejs";

/**
 * Cyber-ish scramble reveal the first time the element enters the viewport.
 * Great for monospace stats, labels, and "live system" moments.
 */
export default function ScrambleOnView({
  children,
  className = "",
  as: Tag = "span",
  duration = 900,
  chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
}: {
  children: ReactNode;
  className?: string;
  as?: "span" | "p" | "div" | "h2" | "h3";
  duration?: number;
  chars?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let played = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played) return;
        played = true;
        io.disconnect();

        animate(el, {
          // scramble the text content while holding layout
          text: scrambleText({
            chars,
            from: "left",
            ease: "out(3)",
            perturbation: 0.35,
          }),
          duration,
          ease: "linear",
        });
      },
      { threshold: 0.4, rootMargin: "-20px" }
    );
    io.observe(el);

    return () => io.disconnect();
  }, [duration, chars]);

  return (
    // @ts-expect-error polymorphic
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
