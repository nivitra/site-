"use client";

import { useEffect, useRef } from "react";
import { animate, onScroll, utils, type JSAnimation } from "animejs";

type Orb = {
  x: number;
  y: number;
  s: number;
  c: string;
  blur: number;
  speed: number;
};

/**
 * Living hero atmosphere: floating orbs + scroll parallax + faint pulse grid.
 * Self-pauses when the host section leaves the viewport.
 */
export default function AmbientField({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const orbs = Array.from(root.querySelectorAll<HTMLElement>("[data-orb]"));
    const rings = Array.from(root.querySelectorAll<HTMLElement>("[data-ring]"));
    const particles = Array.from(root.querySelectorAll<HTMLElement>("[data-p]"));

    if (reduce) {
      orbs.forEach((el) => (el.style.opacity = "0.35"));
      return;
    }

    const anims: JSAnimation[] = [];

    orbs.forEach((el, i) => {
      const a = animate(el, {
        translateX: () => utils.random(-40, 40),
        translateY: () => utils.random(-30, 30),
        scale: [0.92, 1.08],
        duration: () => utils.random(5000, 9000),
        delay: i * 200,
        loop: true,
        alternate: true,
        ease: "inOutSine",
      });
      anims.push(a);
    });

    rings.forEach((el, i) => {
      const a = animate(el, {
        rotate: "1turn",
        duration: 28000 + i * 8000,
        loop: true,
        ease: "linear",
      });
      anims.push(a);
    });

    particles.forEach((el, i) => {
      const a = animate(el, {
        translateY: () => [utils.random(20, 60), utils.random(-80, -20)],
        translateX: () => utils.random(-30, 30),
        opacity: [0, 0.7, 0],
        duration: () => utils.random(3200, 6200),
        delay: () => utils.random(0, 4000) + i * 40,
        loop: true,
        ease: "inOutSine",
      });
      anims.push(a);
    });

    // subtle scroll-linked drift of the whole field
    const scrollLink = animate(root, {
      translateY: [-12, 60],
      autoplay: false,
      ease: "linear",
      duration: 1000,
    });
    anims.push(scrollLink);

    const host = root.parentElement ?? root;
    const scroller = onScroll({
      target: host,
      enter: "top bottom",
      leave: "bottom top",
      sync: 0.08,
      onEnter: () => anims.forEach((a) => a !== scrollLink && a.play()),
      onLeave: () => anims.forEach((a) => a !== scrollLink && a.pause()),
    }).link(scrollLink);

    return () => {
      scroller.revert();
      anims.forEach((a) => a.revert());
    };
  }, []);

  const orbData: Orb[] = [
    { x: 18, y: 22, s: 360, c: "rgba(255,255,255,0.05)", blur: 90, speed: 1 },
    { x: 78, y: 18, s: 280, c: "rgba(255,255,255,0.035)", blur: 80, speed: 1.2 },
    { x: 62, y: 68, s: 300, c: "rgba(34,197,94,0.05)", blur: 100, speed: 0.9 },
    { x: 28, y: 72, s: 200, c: "rgba(255,255,255,0.03)", blur: 60, speed: 1.4 },
  ];

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_10%,rgba(255,255,255,0.04),transparent_50%),radial-gradient(ellipse_at_85%_50%,rgba(34,197,94,0.04),transparent_45%)]" />

      {orbData.map((o, i) => (
        <div
          key={i}
          data-orb
          className="absolute rounded-full"
          style={{
            left: `${o.x}%`,
            top: `${o.y}%`,
            width: o.s,
            height: o.s,
            marginLeft: -o.s / 2,
            marginTop: -o.s / 2,
            background: `radial-gradient(circle, ${o.c}, transparent 70%)`,
            filter: `blur(${o.blur * 0.15}px)`,
            willChange: "transform",
          }}
        />
      ))}

      <div
        data-ring
        className="absolute right-[8%] top-[18%] hidden h-[340px] w-[340px] rounded-full border border-white/[0.04] lg:block"
        style={{ willChange: "transform" }}
      />
      <div
        data-ring
        className="absolute right-[4%] top-[12%] hidden h-[420px] w-[420px] rounded-full border border-dashed border-white/[0.04] lg:block"
        style={{ willChange: "transform" }}
      />
      <div
        data-ring
        className="absolute right-[12%] top-[24%] hidden h-[260px] w-[260px] rounded-full border border-white/[0.03] lg:block"
        style={{ willChange: "transform" }}
      />

      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          data-p
          className="absolute h-0.5 w-0.5 rounded-full bg-white/40"
          style={{
            left: `${6 + ((i * 17) % 88)}%`,
            top: `${40 + ((i * 23) % 50)}%`,
            opacity: 0,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}
