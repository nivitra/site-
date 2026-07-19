"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { animate } from "animejs";

/**
 * Interactive card: cursor spotlight + subtle 3D tilt.
 * Transform/perspective only — cheap on GPU. Off on touch / reduced motion.
 */
export default function SpotlightCard({
  children,
  className = "",
  tilt = true,
  maxTilt = 7,
  spotlight = true,
}: {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  maxTilt?: number;
  spotlight?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let raf = 0;
    let leaveAnim: ReturnType<typeof animate> | null = null;

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        const px = (x / r.width) * 2 - 1;
        const py = (y / r.height) * 2 - 1;

        if (spotlight && glow) {
          glow.style.opacity = "1";
          glow.style.background = `radial-gradient(420px circle at ${x}px ${y}px, rgba(34,197,94,0.08), transparent 55%)`;
        }

        if (tilt) {
          card.style.transform = `perspective(900px) rotateX(${(-py * maxTilt).toFixed(2)}deg) rotateY(${(px * maxTilt).toFixed(2)}deg) translateZ(0)`;
        }
      });
    };

    const onEnter = () => {
      leaveAnim?.pause();
      card.style.willChange = "transform";
      if (glow) glow.style.willChange = "opacity, background";
    };

    const onLeave = () => {
      cancelAnimationFrame(raf);
      leaveAnim?.pause();
      leaveAnim = animate(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 500,
        ease: "out(3)",
        onComplete: () => {
          card.style.willChange = "auto";
          card.style.transform = "";
        },
      });
      if (glow) {
        glow.style.opacity = "0";
        glow.style.willChange = "auto";
      }
    };

    card.addEventListener("pointerenter", onEnter);
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      card.removeEventListener("pointerenter", onEnter);
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
      leaveAnim?.pause();
    };
  }, [tilt, maxTilt, spotlight]);

  return (
    <div
      ref={cardRef}
      className={`relative transform-gpu transition-[border-color,box-shadow] duration-300 ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {spotlight && (
        <div
          ref={glowRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
