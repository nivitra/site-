"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { animate, type JSAnimation } from "animejs";

/**
 * Soft breathing ring behind a stat number — “live metrics” energy.
 */
export default function PulseStat({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ringRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      ring.style.opacity = "0.25";
      return;
    }

    const anim: JSAnimation = animate(ring, {
      scale: [0.85, 1.25],
      opacity: [0.35, 0],
      duration: 2200,
      loop: true,
      ease: "out(2)",
    });

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? anim.play() : anim.pause()),
      { threshold: 0 }
    );
    io.observe(ring);

    return () => {
      io.disconnect();
      anim.revert();
    };
  }, []);

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      <span
        ref={ringRef}
        aria-hidden
        className="pointer-events-none absolute top-1/2 h-20 w-20 -translate-y-[60%] rounded-full border border-brand-400/40"
        style={{ willChange: "transform, opacity" }}
      />
      {children}
    </div>
  );
}
