"use client";

import SplitReveal from "./ui/SplitReveal";
import { useEffect, useRef } from "react";
import { animate } from "animejs";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = subRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(14px)";
    animate(el, {
      opacity: [0, 1],
      translateY: [14, 0],
      duration: 700,
      delay: 260,
      ease: "out(3)",
    });
  }, []);

  return (
    <section className="relative overflow-hidden pb-12 pt-40">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[380px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.05),transparent)]" />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-5 px-6 text-center">
        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-2">
          {eyebrow}
        </span>
        <SplitReveal
          as="h1"
          mode="words"
          delay={60}
          staggerMs={36}
          className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl"
        >
          {title}
        </SplitReveal>
        <p
          ref={subRef}
          className="max-w-xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
}
