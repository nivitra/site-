"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import Reveal from "./ui/Reveal";
import { customerCases } from "@/lib/customers";
import { industries } from "@/lib/industries";

export default function TrustedBy() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = gridRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-brand]"));
    if (!items.length || reduce) return;

    items.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(16px) scale(0.96)";
      el.style.willChange = "transform, opacity";
    });

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        animate(items, {
          opacity: [0, 1],
          translateY: [16, 0],
          scale: [0.96, 1],
          duration: 620,
          delay: stagger(55, { from: "center" }),
          ease: "out(3)",
          onComplete: () => items.forEach((el) => (el.style.willChange = "auto")),
        });
      },
      { threshold: 0.2 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section className="border-b border-line py-12">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted">
            Proven across industries · Built In India, Beats The World
          </p>
        </Reveal>

        {/* Customer stories already on /customers — logos as navigation + proof */}
        <div ref={gridRef} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {customerCases.map((c) => (
            <Link
              key={c.company}
              href="/customers"
              data-brand
              className="group card flex flex-col items-center gap-1 rounded-2xl px-5 py-5 text-center transition-colors hover:border-brand-600/25"
            >
              <span className="text-base font-bold tracking-tight text-foreground/50 transition-colors duration-300 group-hover:text-brand-600">
                {c.company}
              </span>
              <span className="text-[11px] text-muted">{c.sector}</span>
              <span className="mt-1 text-[12px] font-semibold text-brand-600">
                {c.results[0][0]} {c.results[0][1]}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {industries.map((ind) => (
            <Link
              key={ind.slug}
              href={`/solutions/${ind.slug}`}
              className="text-xs text-muted transition-colors hover:text-brand-600"
            >
              <span className="mr-1" aria-hidden>
                {ind.icon}
              </span>
              {ind.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
