"use client";

import { useEffect, useRef } from "react";
import { animate, stagger, type JSAnimation } from "animejs";

/**
 * Expanding sonic rings — the "agent is live" visual language.
 * Pauses when off-screen. scale + opacity only.
 */
export default function SoundRings({
  className = "",
  active = true,
  rings = 4,
}: {
  className?: string;
  active?: boolean;
  rings?: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-ring]"));

    if (reduce || !active) {
      els.forEach((el, i) => {
        el.style.opacity = String(0.15 + i * 0.05);
        el.style.transform = `scale(${0.6 + i * 0.15})`;
      });
      return;
    }

    const anims: JSAnimation[] = [
      animate(els, {
        scale: [0.45, 1.35],
        opacity: [0.55, 0],
        duration: 2400,
        delay: stagger(420),
        loop: true,
        ease: "out(2)",
      }),
    ];

    const io = new IntersectionObserver(
      ([entry]) => anims.forEach((a) => (entry.isIntersecting ? a.play() : a.pause())),
      { threshold: 0 }
    );
    io.observe(root);

    return () => {
      io.disconnect();
      anims.forEach((a) => a.revert());
    };
  }, [active, rings]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 flex items-center justify-center ${className}`}
    >
      {Array.from({ length: rings }).map((_, i) => (
        <span
          key={i}
          data-ring
          className="absolute aspect-square rounded-full border border-brand-400/40"
          style={{
            width: `${55 + i * 18}%`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}
