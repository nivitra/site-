"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import CallDemo from "./CallDemo";
import Magnetic from "./ui/Magnetic";

const ticks = [
  "Sounds like a real person on the line",
  "Hindi, Tamil, Marathi + 7 more languages",
  "From just ₹3.99 / minute",
];

const stats = [
  { value: "10", label: "Indian languages" },
  { value: "24×7", label: "Always on call" },
  { value: "₹3.99", label: "Per live minute" },
  { value: "2 wks", label: "Typical go-live" },
];

/**
 * Consumer white hero — outcomes first, live demo second.
 * Blueprint: prove it before you explain it.
 */
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
      el.style.transform = "translateY(20px)";
    });
    tickItems.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(8px)";
    });

    animate(pieces, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 700,
      delay: stagger(90, { start: 100 }),
      ease: "out(3)",
    });
    animate(tickItems, {
      opacity: [0, 1],
      translateY: [8, 0],
      duration: 480,
      delay: stagger(70, { start: 580 }),
      ease: "out(3)",
    });
  }, []);

  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36">
      {/* Soft green wash — consumer, not sci-fi dark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% -10%, rgba(34,197,94,0.12), transparent 55%), radial-gradient(ellipse 50% 40% at 100% 20%, rgba(34,197,94,0.05), transparent 50%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
        <div ref={metaRef} className="flex flex-col items-start gap-6">
          <span
            data-hero
            className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-3.5 py-1.5 text-xs font-semibold text-brand-700"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500" />
            AI phone agents for Indian businesses
          </span>

          <h1
            data-hero
            className="max-w-xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]"
          >
            Phone calls that{" "}
            <span className="text-accent">sound human</span>
            <span className="text-muted-2"> — </span>
            in every language your customers speak
          </h1>

          <p
            data-hero
            className="max-w-lg text-base leading-relaxed text-muted sm:text-lg"
          >
            Speaksy makes outbound and inbound calls for EMI, COD, leads, and
            appointments — so your team stops chasing numbers and starts closing.
          </p>

          <div data-hero className="flex flex-wrap items-center gap-3">
            <Magnetic strength={0.35} radius={70}>
              <Link
                href="/contact"
                className="brand-pill inline-flex rounded-xl px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                Book a free demo
              </Link>
            </Magnetic>
            <a
              href="#hear-a-call"
              className="inline-flex rounded-xl border border-line bg-white px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-line-strong hover:bg-surface-2"
            >
              Hear a real call
            </a>
          </div>

          <ul
            ref={ticksRef}
            className="mt-1 flex flex-col gap-2 text-sm text-muted"
          >
            {ticks.map((t) => (
              <li key={t} data-tick className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500/15 text-brand-600">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div ref={demoRef} id="hear-a-call" className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand-500/10 via-transparent to-brand-600/5 blur-2xl" />
          <CallDemo />
        </div>
      </div>

      {/* Outcome stats — blueprint: numbers before features */}
      <div className="relative mx-auto mt-16 max-w-6xl px-6 sm:mt-20">
        <div className="grid grid-cols-2 gap-3 rounded-3xl border border-line bg-white p-2 shadow-[0_8px_40px_-20px_rgba(0,0,0,0.12)] sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-line sm:p-0 sm:py-6">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center px-4 py-4 text-center sm:py-0">
              <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs text-muted sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
