"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import CallDemo from "./CallDemo";
import AmbientField from "./ui/AmbientField";
import LanguageOrbit from "./ui/LanguageOrbit";
import Magnetic from "./ui/Magnetic";
import SplitReveal from "./ui/SplitReveal";
import SoundRings from "./ui/SoundRings";

const ticks = [
  "Sub-800ms voice latency",
  "14 Indian languages, native accents",
  "Starts at ₹3.99/min — no setup fee",
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
    <section className="grid-bg relative overflow-hidden pb-20 pt-36 sm:pt-44">
      <AmbientField />
      <LanguageOrbit />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.15fr_1fr]">
        <div ref={metaRef} className="flex flex-col items-start gap-6">
          <span
            data-hero
            className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-brand-300"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-400" />
            </span>
            🇮🇳 Built in India, Beats the World
          </span>

          <SplitReveal
            as="h1"
            mode="words"
            delay={120}
            staggerMs={48}
            className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.6rem]"
          >
            Voice AI that sounds <span className="text-gradient">human</span>.
            Priced like it&apos;s made for India.
          </SplitReveal>

          <p
            data-hero
            className="max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            Speaksy makes and takes thousands of calls a day in Hindi, Marathi, Telugu
            and 14 languages — qualifying leads, collecting payments and booking
            appointments with human-grade conversations, at a fraction of what
            anyone else charges.
          </p>

          <div data-hero className="flex flex-wrap items-center gap-4">
            <Magnetic strength={0.42} radius={90}>
              <Link
                href="/contact"
                className="brand-pill relative inline-flex overflow-hidden rounded-xl px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_32px_-8px_rgba(34,197,94,0.8)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                <span className="relative z-10">Book a Live Demo →</span>
              </Link>
            </Magnetic>
            <Magnetic strength={0.28} radius={70}>
              <Link
                href="/pricing"
                className="rounded-xl border border-line px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-brand-500/40 hover:bg-brand-500/5"
              >
                See Pricing
              </Link>
            </Magnetic>
          </div>

          <ul ref={ticksRef} className="mt-2 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {ticks.map((t) => (
              <li key={t} data-tick className="flex items-center gap-2 text-sm text-muted">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div ref={demoRef} className="relative flex justify-center lg:justify-end">
          <SoundRings className="scale-110 opacity-70" rings={3} />
          <div className="relative z-10">
            <CallDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
