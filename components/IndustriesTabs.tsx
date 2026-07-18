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
    <section className="relative border-y border-line bg-surface/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Solutions"
          title="One agent platform. Every high-volume calling problem."
          subtitle="Pick your industry — Speaksy ships with pre-built, battle-tested agent templates for each, live in days."
        />

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {industries.map((i, idx) => (
            <button
              key={i.slug}
              onClick={() => setActive(idx)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                idx === active ? "text-brand-950" : "text-muted hover:text-foreground"
              }`}
            >
              {idx === active && (
                <motion.span
                  layoutId="industry-pill"
                  className="absolute inset-0 rounded-full bg-brand-400"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">
                {i.icon} {i.name}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={ind.slug}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="card grid gap-10 rounded-3xl p-8 sm:p-10 lg:grid-cols-[1.2fr_1fr]"
            >
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{ind.headline}</h3>
                <p className="leading-relaxed text-muted">{ind.tagline}</p>
                <div className="mt-2 rounded-2xl border border-brand-500/20 bg-brand-950/60 p-5">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-400">
                    Sample agent line · {ind.sample.label}
                  </p>
                  <p className="text-sm italic leading-relaxed text-brand-300/90">
                    &ldquo;{ind.sample.agent}&rdquo;
                  </p>
                </div>
                <Link
                  href={`/solutions/${ind.slug}`}
                  className="mt-1 w-fit text-sm font-semibold text-brand-400 transition-colors hover:text-brand-300"
                >
                  See all {totalUseCases} {ind.name} use cases →
                </Link>
              </div>
              <div className="flex flex-col justify-center gap-4">
                {ind.outcomes.map(([num, label]) => (
                  <div key={label} className="flex items-center gap-5 rounded-2xl bg-white/[0.03] p-5">
                    <span className="min-w-[5rem] font-mono text-3xl font-semibold text-brand-400">{num}</span>
                    <span className="text-sm text-muted">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
