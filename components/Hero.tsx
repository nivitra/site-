"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import CallDemo from "./CallDemo";
import Magnetic from "./ui/Magnetic";
import SplitReveal from "./ui/SplitReveal";

const ticks = [
  "Works in 14 Indian languages",
  "Sounds indistinguishable from human",
  "Live in under 48 hours",
];

export default function Hero() {
  const metaRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const ticksRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const meta = metaRef.current;
    const demo = demoRef.current;
    const tickItems = ticksRef.current
      ? Array.from(ticksRef.current.querySelectorAll<HTMLElement>("[data-tick]"))
      : [];

    const pieces: HTMLElement[] = [];
    if (meta) pieces.push(...Array.from(meta.querySelectorAll<HTMLElement>("[data-hero]")));
    if (demo) pieces.push(demo);

    pieces.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      el.style.willChange = "transform, opacity";
    });
    tickItems.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateX(-12px)";
      el.style.willChange = "transform, opacity";
    });

    animate(pieces, {
      opacity: [0, 1],
      translateY: [28, 0],
      duration: 780,
      delay: stagger(90, { start: 180 }),
      ease: "out(3)",
      onComplete: () => pieces.forEach((el) => (el.style.willChange = "auto")),
    });

    animate(tickItems, {
      opacity: [0, 1],
      translateX: [-12, 0],
      duration: 560,
      delay: stagger(70, { start: 700 }),
      ease: "out(3)",
      onComplete: () => tickItems.forEach((el) => (el.style.willChange = "auto")),
    });
  }, []);

  return (
    <section className="relative overflow-hidden pb-20 pt-36 sm:pt-44">
      {/* Subtle green gradient accent */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(34,197,94,0.06),transparent)]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.15fr_1fr]">
        <div ref={metaRef} className="flex flex-col items-start gap-6">
          <span
            data-hero
            className="inline-flex items-center gap-2 rounded-full border border-brand-600/20 bg-brand-600/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-brand-700"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-500" />
            </span>
            India&apos;s #1 AI Voice Agent
          </span>

          <SplitReveal
            as="h1"
            mode="words"
            delay={120}
            staggerMs={48}
            className="text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.6rem]"
          >
            Your AI employee that <span className="text-gradient">never misses a call</span>.
          </SplitReveal>

          <p
            data-hero
            className="max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            Speaksy answers, qualifies, and books appointments for your business — in your customer&apos;s language, 24 hours a day, 7 days a week.
          </p>

          <div data-hero className="flex flex-wrap items-center gap-4">
            <Magnetic strength={0.42} radius={90}>
              <Link
                href="/contact"
                className="brand-pill relative inline-flex overflow-hidden rounded-xl px-7 py-3.5 text-sm font-semibold shadow-[0_8px_24px_-6px_rgba(22,163,74,0.4)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                <span className="relative z-10">Book a Live Demo →</span>
              </Link>
            </Magnetic>
            <Magnetic strength={0.28} radius={70}>
              <Link
                href="/pricing"
                className="rounded-xl border border-line px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-brand-600/20 hover:bg-brand-600/5"
              >
                See Pricing
              </Link>
            </Magnetic>
          </div>

          <ul ref={ticksRef} className="mt-2 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {ticks.map((t) => (
              <li key={t} data-tick className="flex items-center gap-2 text-sm text-muted">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div ref={demoRef} className="relative flex justify-center lg:justify-end">
          <div className="relative z-10">
            <CallDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
