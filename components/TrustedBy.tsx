"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import Reveal from "./ui/Reveal";

const brands = [
  { name: "LoanKart", sector: "NBFC" },
  { name: "GlowKart", sector: "D2C Beauty" },
  { name: "VidyaPrime", sector: "EdTech" },
  { name: "MediBook", sector: "Healthcare" },
  { name: "SwiftShip", sector: "Logistics" },
  { name: "PolicyMitra", sector: "Insurance" },
  { name: "UrbanNest", sector: "Real Estate" },
  { name: "FreshDaily", sector: "Quick Commerce" },
];

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
      { threshold: 0.2 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section className="border-b border-line py-12">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted">
            Powering conversations for teams across India
          </p>
        </Reveal>
        <div ref={gridRef} className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          {brands.map((b) => (
            <div
              key={b.name}
              data-brand
              className="group flex flex-col items-center gap-1"
            >
              <span className="text-lg font-bold tracking-tight text-foreground/60 transition-colors duration-300 group-hover:text-brand-300">
                {b.name}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-muted/60">{b.sector}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
