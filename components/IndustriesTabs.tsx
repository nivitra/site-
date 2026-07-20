"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { industries } from "@/lib/industries";
import SectionHeading from "./ui/SectionHeading";

export default function IndustriesTabs() {
  const [active, setActive] = useState(0);
  const ind = industries[active];
  const totalUseCases = ind.groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <section className="section relative">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Solutions"
          title="Built for how Indian businesses grow."
          subtitle="Lending, healthcare, real estate, retail — Speaksy ships ready for the calls that move your numbers."
        />

        <div className="mt-14 flex flex-wrap justify-center gap-2">
          {industries.map((i, idx) => (
            <button
              key={i.slug}
              onClick={() => setActive(idx)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                idx === active ? "text-background" : "text-muted hover:text-foreground"
              }`}
            >
              {idx === active && (
                <motion.span
                  layoutId="industry-pill"
                  className="absolute inset-0 rounded-full bg-foreground"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{i.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={ind.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="card grid gap-10 rounded-3xl p-8 sm:p-10 lg:grid-cols-[1.25fr_1fr]"
            >
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">{ind.headline}</h3>
                <p className="leading-relaxed text-muted">{ind.tagline}</p>
                <div className="mt-2 rounded-2xl border border-line bg-white/[0.02] p-5">
                  <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-2">
                    How it sounds · {ind.sample.label}
                  </p>
                  <p className="text-sm leading-relaxed text-foreground/85">
                    &ldquo;{ind.sample.agent}&rdquo;
                  </p>
                </div>
                <Link
                  href={`/solutions/${ind.slug}`}
                  className="mt-1 w-fit text-sm font-medium text-foreground transition-opacity hover:opacity-70"
                >
                  See {ind.name} solutions →
                </Link>
              </div>
              <div className="flex flex-col justify-center gap-3">
                {ind.outcomes.map(([num, label]) => (
                  <div key={label} className="flex items-center gap-5 rounded-2xl border border-line bg-white/[0.02] p-5">
                    <span className="min-w-[5rem] text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      {num}
                    </span>
                    <span className="text-sm text-muted">{label}</span>
                  </div>
                ))}
                <p className="px-1 pt-1 text-xs text-muted-2">{totalUseCases} ready-to-run use cases</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
