"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { HL, type HighlightColor } from "./data";

/**
 * Scroll-triggered highlighter mark — exact Jhey / Framer wipe:
 * linear-gradient(120deg) background-position paint with diagonal leading edge.
 * Once painted, stays on (does not reverse when leaving the viewport).
 */
export function HighlightMark({
  children,
  color,
}: {
  children: string;
  color: HighlightColor;
}) {
  const ref = useRef<HTMLElement>(null);
  const bg = HL[color];
  const textColor =
    color === "yellow" ? "#121212" : color === "green" ? "#ffffff" : "#ffffff";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.style.setProperty("--highlighted", "1");
      return;
    }

    const paint = () => {
      el.style.setProperty("--highlighted", "1");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const current = el.style.getPropertyValue("--highlighted");
          // Fire once when mostly in view — matches recording threshold behavior
          if (
            entry.isIntersecting &&
            entry.intersectionRatio >= 0.85 &&
            (!current || current === "0")
          ) {
            paint();
            observer.unobserve(el);
          }
        }
      },
      { threshold: [0, 0.5, 0.85, 1], rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <mark
      ref={ref}
      className="scroll-hl-mark"
      style={
        {
          "--highlight": bg,
          "--hl-text": textColor,
        } as CSSProperties
      }
    >
      <span className="scroll-hl-paint">{children}</span>
    </mark>
  );
}
