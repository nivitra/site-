"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { animate, utils, type JSAnimation } from "animejs";
import Magnetic from "./ui/Magnetic";
import Reveal from "./ui/Reveal";
import SplitReveal from "./ui/SplitReveal";
import VoiceWaveform from "./ui/VoiceWaveform";

export default function CTASection() {
  const particleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = particleRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dots = Array.from(root.querySelectorAll<HTMLElement>("[data-dot]"));
    if (reduce) {
      dots.forEach((d) => (d.style.opacity = "0.25"));
      return;
    }

    const anims: JSAnimation[] = dots.map((el, i) =>
      animate(el, {
        translateY: () => [utils.random(10, 30), utils.random(-40, -10)],
        translateX: () => utils.random(-20, 20),
        opacity: [0, 0.6, 0],
        scale: [0.4, 1.2],
        duration: () => utils.random(2800, 5200),
        delay: () => utils.random(0, 2500) + i * 30,
        loop: true,
        ease: "inOutSine",
      })
    );

    const io = new IntersectionObserver(
      ([entry]) => anims.forEach((a) => (entry.isIntersecting ? a.play() : a.pause())),
      { threshold: 0 }
    );
    io.observe(root);

    return () => {
      io.disconnect();
      anims.forEach((a) => a.revert());
    };
  }, []);

  return (
    <section className="relative overflow-hidden py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-600 via-brand-500 to-brand-600 px-8 py-20 text-center sm:px-16">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

            <div
              ref={particleRef}
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden"
            >
              {Array.from({ length: 22 }).map((_, i) => (
                <span
                  key={i}
                  data-dot
                  className="absolute h-1.5 w-1.5 rounded-full bg-white/50"
                  style={{
                    left: `${5 + ((i * 19) % 90)}%`,
                    top: `${20 + ((i * 29) % 60)}%`,
                    opacity: 0,
                    willChange: "transform, opacity",
                  }}
                />
              ))}
            </div>

            <div className="relative flex flex-col items-center gap-6">
              <VoiceWaveform bars={40} className="h-10 w-48 opacity-60" />

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Built In India, Beats The World
              </p>

              <SplitReveal
                as="h2"
                mode="words"
                onMount={false}
                staggerMs={40}
                className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
              >
                Ready to stop losing customers to unanswered calls?
              </SplitReveal>

              <p className="max-w-xl text-white/85">
                Book a free demo. See Speaksy handle a real call for your business — in your language,
                on your use case — within minutes.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Magnetic strength={0.45} radius={100}>
                  <Link
                    href="/contact"
                    className="rounded-xl bg-white px-8 py-4 text-sm font-bold text-brand-700 shadow-xl transition-transform hover:scale-[1.04] active:scale-[0.98]"
                  >
                    Book a Demo →
                  </Link>
                </Magnetic>
                <Magnetic strength={0.3} radius={80}>
                  <Link
                    href="/pricing"
                    className="rounded-xl border border-white/30 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    See what you&apos;d save
                  </Link>
                </Magnetic>
              </div>

              <p className="text-xs text-white/60">
                Start free — 100 minutes included · No credit card needed · No setup fee
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
