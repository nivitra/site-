"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { languages } from "@/lib/languages";
import SectionHeading from "./ui/SectionHeading";

export default function LanguageShowcase() {
  const [active, setActive] = useState(0);
  const lang = languages[active];

  return (
    <section className="relative overflow-hidden border-y border-line bg-surface/40 py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(34,197,94,0.08),transparent)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="🇮🇳 14 Languages, Native"
          title="Your customer's mother tongue is our first language."
          subtitle="Tap a language to see how Speaksy actually speaks it — native script, native courtesy, regional accents. 120 crore+ Indians reachable, no language ever an 'add-on'."
        />

        {/* language chips */}
        <div className="mt-12 flex flex-wrap justify-center gap-2.5">
          {languages.map((l, i) => (
            <button
              key={l.slug}
              onClick={() => setActive(i)}
              className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                i === active ? "text-brand-950" : "text-muted hover:text-foreground"
              }`}
              dir={l.rtl ? "rtl" : "ltr"}
            >
              {i === active && (
                <motion.span
                  layoutId="lang-pill"
                  className="absolute inset-0 rounded-full bg-brand-400"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="font-indic relative">{l.native}</span>
            </button>
          ))}
        </div>

        {/* active language panel */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={lang.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="card grid gap-8 rounded-3xl p-8 sm:p-10 lg:grid-cols-[1fr_1.2fr]"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-indic text-4xl font-semibold text-brand-300" dir={lang.rtl ? "rtl" : "ltr"}>
                    {lang.native}
                  </span>
                  <span className="text-sm text-muted">{lang.name}</span>
                </div>
                <p className="text-sm leading-relaxed text-muted">{lang.tagline}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="rounded-full bg-white/[0.05] px-3.5 py-1.5">
                    <span className="font-mono font-semibold text-brand-400">{lang.speakers}</span>{" "}
                    <span className="text-muted">speakers</span>
                  </span>
                  <span className="rounded-full bg-white/[0.05] px-3.5 py-1.5 text-muted">
                    {lang.scriptName}
                  </span>
                </div>
                <p className="text-xs text-muted">📍 {lang.regions.slice(0, 4).join(" · ")}</p>
                <Link
                  href={`/languages/${lang.slug}`}
                  className="mt-auto inline-flex w-fit items-center gap-2 rounded-xl border border-brand-500/40 bg-brand-500/10 px-5 py-2.5 text-sm font-semibold text-brand-300 transition-colors hover:bg-brand-500/20"
                >
                  {lang.name} voice agents in detail →
                </Link>
              </div>

              <div className="font-indic flex flex-col gap-2.5" dir={lang.rtl ? "rtl" : "ltr"}>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-400" dir="ltr" style={{ fontFamily: "var(--font-sans)" }}>
                  Live sample · EMI reminder
                </p>
                <div className={`max-w-[90%] rounded-2xl bg-brand-900/70 px-4 py-3 text-sm leading-relaxed text-[#d8f5e0] ${lang.rtl ? "self-start rounded-br-sm text-right" : "self-start rounded-bl-sm"}`}>
                  {lang.dialogue.agent}
                </div>
                <div className={`max-w-[90%] rounded-2xl bg-white/10 px-4 py-3 text-sm leading-relaxed ${lang.rtl ? "self-end rounded-bl-sm text-right" : "self-end rounded-br-sm"}`}>
                  {lang.dialogue.user}
                </div>
                <div className={`max-w-[90%] rounded-2xl bg-brand-900/70 px-4 py-3 text-sm leading-relaxed text-[#d8f5e0] ${lang.rtl ? "self-start rounded-br-sm text-right" : "self-start rounded-bl-sm"}`}>
                  {lang.dialogue.agent2}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mt-8 text-center text-sm text-muted">
          Every language: same latency, same intelligence, same ₹3.99/min.{" "}
          <Link href="/languages" className="font-semibold text-brand-400 hover:text-brand-300">
            See all 14 language pages →
          </Link>
        </p>
      </div>
    </section>
  );
}
