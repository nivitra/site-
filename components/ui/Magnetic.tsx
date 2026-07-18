"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { animate, utils } from "animejs";

/**
 * Soft magnetic pull toward the pointer. GPU transforms only, spring-settles
 * on leave, disabled for reduced-motion / coarse pointers / small screens.
 */
export default function Magnetic({
  children,
  className = "",
  strength = 0.35,
  radius = 80,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let anim: ReturnType<typeof animate> | null = null;

    const settle = (x: number, y: number) => {
      anim?.pause();
      anim = animate(el, {
        translateX: x,
        translateY: y,
        duration: 450,
        ease: "out(4)",
      });
    };

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        if (dist > radius * 2.2) {
          if (tx !== 0 || ty !== 0) {
            tx = 0;
            ty = 0;
            settle(0, 0);
          }
          return;
        }
        const pull = utils.clamp(1 - dist / (radius * 2.2), 0, 1) * strength;
        tx = dx * pull;
        ty = dy * pull;
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(raf);
      tx = 0;
      ty = 0;
      settle(0, 0);
    };

    el.style.willChange = "transform";
    window.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      anim?.pause();
      el.style.willChange = "auto";
      el.style.transform = "";
    };
  }, [strength, radius]);

  return (
    <div ref={ref} className={`inline-flex ${className}`}>
      {children}
    </div>
  );
}
