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
    <section className="relative overflow-hidden border-y border-line bg-surface py-28">
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Languages"
          title="Speak to every customer in their own language."
          subtitle="Your AI agent converses naturally in 14 Indian languages — with the right accent, the right courtesy, and the right words."
        />

        {/* language chips */}
        <div className="mt-12 flex flex-wrap justify-center gap-2.5">
          {languages.map((l, i) => (
            <button
              key={l.slug}
              onClick={() => setActive(i)}
              className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                i === active ? "text-white" : "text-muted hover:text-foreground"
              }`}
              dir={l.rtl ? "rtl" : "ltr"}
            >
              {i === active && (
                <motion.span
                  layoutId="lang-pill"
                  className="absolute inset-0 rounded-full bg-brand-600"
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
                  <span className="font-indic text-4xl font-semibold text-brand-600" dir={lang.rtl ? "rtl" : "ltr"}>
                    {lang.native}
                  </span>
                  <span className="text-sm text-muted">{lang.name}</span>
                </div>
                <p className="text-sm leading-relaxed text-muted">{lang.tagline}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="rounded-full bg-surface px-3.5 py-1.5">
                    <span className="font-mono font-semibold text-brand-600">{lang.speakers}</span>{" "}
                    <span className="text-muted">speakers</span>
                  </span>
                  <span className="rounded-full bg-surface px-3.5 py-1.5 text-muted">
                    {lang.scriptName}
                  </span>
                </div>
                <p className="text-xs text-muted">📍 {lang.regions.slice(0, 4).join(" · ")}</p>
                <Link
                  href={`/languages/${lang.slug}`}
                  className="mt-auto inline-flex w-fit items-center gap-2 rounded-xl border border-brand-600/20 bg-brand-600/5 px-5 py-2.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-600/10"
                >
                  Learn more about {lang.name} →
                </Link>
              </div>

              <div className="font-indic flex flex-col gap-2.5" dir={lang.rtl ? "rtl" : "ltr"}>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-600" dir="ltr" style={{ fontFamily: "var(--font-sans)" }}>
                  Sample conversation
                </p>
                <div className={`max-w-[90%] rounded-2xl bg-brand-600/10 px-4 py-3 text-sm leading-relaxed text-foreground ${lang.rtl ? "self-start rounded-br-sm text-right" : "self-start rounded-bl-sm"}`}>
                  {lang.dialogue.agent}
                </div>
                <div className={`max-w-[90%] rounded-2xl bg-surface-2 px-4 py-3 text-sm leading-relaxed text-foreground ${lang.rtl ? "self-end rounded-bl-sm text-right" : "self-end rounded-br-sm"}`}>
                  {lang.dialogue.user}
                </div>
                <div className={`max-w-[90%] rounded-2xl bg-brand-600/10 px-4 py-3 text-sm leading-relaxed text-foreground ${lang.rtl ? "self-start rounded-br-sm text-right" : "self-start rounded-bl-sm"}`}>
                  {lang.dialogue.agent2}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mt-8 text-center text-sm text-muted">
          Every language, same quality, same experience.{" "}
          <Link href="/languages" className="font-semibold text-brand-600 hover:text-brand-700">
            See all 14 languages →
          </Link>
        </p>
      </div>
    </section>
  );
}
