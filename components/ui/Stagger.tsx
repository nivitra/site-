"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { animate, stagger } from "animejs";

/**
 * Reveals its `[data-stagger]` children in a smooth cascade the first time they
 * scroll into view. Pure transform + opacity, fires once, then disconnects.
 * Honours prefers-reduced-motion by showing everything instantly.
 */
export default function Stagger({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-stagger]"));
    if (!items.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // set the hidden start state up-front to avoid any flash
    items.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.willChange = "transform, opacity";
    });

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          obs.disconnect();
          animate(items, {
            opacity: [0, 1],
            translateY: [24, 0],
            duration: 640,
            delay: stagger(70),
            ease: "out(3)",
            onComplete: () => items.forEach((el) => (el.style.willChange = "auto")),
          });
        });
      },
      { threshold: 0.12, rootMargin: "-40px" }
    );
    io.observe(root);

    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
