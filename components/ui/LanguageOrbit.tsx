"use client";

import { useEffect, useRef } from "react";
import { animate, stagger, utils, type JSAnimation } from "animejs";

const CHIPS = [
  { t: "हिन्दी", x: 8, y: 18 },
  { t: "मराठी", x: 86, y: 12 },
  { t: "தமிழ்", x: 4, y: 58 },
  { t: "తెలుగు", x: 90, y: 48 },
  { t: "ગુજરાતી", x: 12, y: 88 },
  { t: "বাংলা", x: 82, y: 82 },
  { t: "Hinglish", x: 48, y: 6 },
  { t: "ಕನ್ನಡ", x: 52, y: 92 },
];

/**
 * Floating vernacular language chips that drift organically around the hero demo.
 * Desktop-only density; pauses off-screen.
 */
export default function LanguageOrbit({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const chips = Array.from(root.querySelectorAll<HTMLElement>("[data-chip]"));

    if (reduce) {
      chips.forEach((c) => (c.style.opacity = "0.5"));
      return;
    }

    // entrance cascade
    animate(chips, {
      opacity: [0, 1],
      scale: [0.6, 1],
      duration: 700,
      delay: stagger(90, { start: 400 }),
      ease: "out(4)",
    });

    const loops: JSAnimation[] = chips.map((el, i) =>
      animate(el, {
        translateX: () => utils.random(-14, 14),
        translateY: () => utils.random(-18, 18),
        rotate: () => utils.random(-6, 6),
        duration: () => utils.random(3200, 5600),
        delay: i * 120,
        loop: true,
        alternate: true,
        ease: "inOutSine",
      })
    );

    const io = new IntersectionObserver(
      ([entry]) => loops.forEach((a) => (entry.isIntersecting ? a.play() : a.pause())),
      { threshold: 0 }
    );
    io.observe(root);

    return () => {
      io.disconnect();
      loops.forEach((a) => a.revert());
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 hidden lg:block ${className}`}
    >
      {CHIPS.map((c) => (
        <span
          key={c.t}
          data-chip
          className="font-indic absolute rounded-full border border-brand-400/25 bg-brand-950/70 px-3 py-1 text-[11px] font-semibold text-brand-300 shadow-[0_8px_24px_-12px_rgba(34,197,94,0.6)] backdrop-blur-md"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            opacity: 0,
            willChange: "transform, opacity",
          }}
        >
          {c.t}
        </span>
      ))}
    </div>
  );
}
