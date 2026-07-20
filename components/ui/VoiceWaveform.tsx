"use client";

import { useEffect, useRef } from "react";
import { animate, utils, type JSAnimation } from "animejs";

/**
 * A living audio equalizer — the signature Speaksy touch. Each bar runs its own
 * organic loop so it never looks mechanical. GPU-friendly (transform:scaleY only),
 * pauses when scrolled off-screen, and freezes to a calm static state when the
 * user prefers reduced motion.
 */
export default function VoiceWaveform({
  bars = 32,
  className = "",
}: {
  bars?: number;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(root.querySelectorAll<HTMLSpanElement>("[data-bar]"));

    if (reduce) {
      // calm, static crest — no animation
      els.forEach((el, i) => {
        el.style.transform = `scaleY(${0.35 + 0.4 * Math.abs(Math.sin(i * 0.6))})`;
      });
      return;
    }

    const anims: JSAnimation[] = els.map((el) =>
      animate(el, {
        scaleY: [utils.random(15, 45) / 100, utils.random(70, 100) / 100],
        duration: utils.random(620, 1300),
        delay: utils.random(0, 420),
        loop: true,
        alternate: true,
        ease: "inOutSine",
      })
    );

    // pause the whole rig when it isn't visible — zero cost off-screen
    const io = new IntersectionObserver(
      ([entry]) => anims.forEach((a) => (entry.isIntersecting ? a.play() : a.pause())),
      { threshold: 0 }
    );
    io.observe(root);

    return () => {
      io.disconnect();
      anims.forEach((a) => a.revert());
    };
  }, [bars]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={`flex h-8 items-center gap-[3px] ${className}`}
    >
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          data-bar
          className="w-[3px] flex-1 rounded-full bg-white/45"
          style={{ height: "100%", transformOrigin: "center", willChange: "transform" }}
        />
      ))}
    </div>
  );
}
