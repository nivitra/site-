"use client";

import SplitReveal from "./ui/SplitReveal";
import ScrambleOnView from "./ui/ScrambleOnView";
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
    el.style.transform = "translateY(18px)";
    animate(el, {
      opacity: [0, 1],
      translateY: [18, 0],
      duration: 700,
      delay: 280,
      ease: "out(3)",
    });
  }, []);

  return (
    <section className="grid-bg relative overflow-hidden pb-10 pt-44">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(34,197,94,0.14),transparent)] animate-glow" />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-5 px-6 text-center">
        <ScrambleOnView
          as="span"
          className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-300"
          duration={600}
          chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        >
          {eyebrow}
        </ScrambleOnView>
        <SplitReveal
          as="h1"
          mode="words"
          delay={80}
          staggerMs={40}
          className="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl"
        >
          {title}
        </SplitReveal>
        <p
          ref={subRef}
          className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
}
