"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

/**
 * Soft brand glow that trails the cursor site-wide.
 * Desktop + fine pointer only; paused while idle; zero cost on mobile.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) {
      el.style.display = "none";
      return;
    }

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let visible = false;
    let idleTimer = 0;
    let anim: ReturnType<typeof animate> | null = null;

    const show = () => {
      if (visible) return;
      visible = true;
      anim?.pause();
      anim = animate(el, { opacity: 0.55, duration: 280, ease: "out(2)" });
    };

    const hide = () => {
      if (!visible) return;
      visible = false;
      anim?.pause();
      anim = animate(el, { opacity: 0, duration: 400, ease: "out(2)" });
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      show();
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(hide, 1800);
    };

    const onLeave = () => hide();

    el.style.opacity = "0";
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.clearTimeout(idleTimer);
      anim?.pause();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-[420px] w-[420px] rounded-full md:block"
      style={{
        background:
          "radial-gradient(closest-side, rgba(34,197,94,0.12), rgba(34,197,94,0.04) 42%, transparent 70%)",
        mixBlendMode: "multiply",
        willChange: "transform, opacity",
      }}
    />
  );
}
