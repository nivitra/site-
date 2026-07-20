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
    <section className="section relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Languages"
          title="In the language your customer speaks"
          subtitle="English-only AI fails in India. Speaksy talks in the mother tongue — same respect, same feel."
        />

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {languages.map((l, i) => (
            <button
              key={l.slug}
              onClick={() => setActive(i)}
              className={`relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
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

        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={lang.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="card grid gap-8 rounded-3xl p-7 sm:p-10 lg:grid-cols-[1fr_1.2fr]"
            >
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span
                    className="font-indic text-4xl font-semibold text-brand-600"
                    dir={lang.rtl ? "rtl" : "ltr"}
                  >
                    {lang.native}
                  </span>
                  <span className="text-sm text-muted">{lang.name}</span>
                </div>
                <p className="text-[15px] leading-relaxed text-muted">{lang.tagline}</p>
                <p className="text-sm text-muted-2">
                  <span className="font-semibold text-foreground">{lang.speakers}</span> speakers ·{" "}
                  {lang.regions.slice(0, 3).join(", ")}
                </p>
                <Link
                  href={`/languages/${lang.slug}`}
                  className="mt-2 inline-flex w-fit text-sm font-semibold text-brand-600 hover:text-brand-700"
                >
                  About {lang.name} agents →
                </Link>
              </div>

              <div className="font-indic flex flex-col gap-2.5" dir={lang.rtl ? "rtl" : "ltr"}>
                <p
                  className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-2"
                  dir="ltr"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Sample · how a call sounds
                </p>
                <div
                  className={`max-w-[92%] rounded-2xl border border-brand-500/15 bg-brand-500/10 px-4 py-3 text-sm leading-relaxed text-foreground ${
                    lang.rtl ? "self-start text-right" : "self-start"
                  }`}
                >
                  {lang.dialogue.agent}
                </div>
                <div
                  className={`max-w-[92%] rounded-2xl bg-black/5 px-4 py-3 text-sm leading-relaxed text-foreground ${
                    lang.rtl ? "self-end text-right" : "self-end"
                  }`}
                >
                  {lang.dialogue.user}
                </div>
                <div
                  className={`max-w-[92%] rounded-2xl border border-brand-500/15 bg-brand-500/10 px-4 py-3 text-sm leading-relaxed text-foreground ${
                    lang.rtl ? "self-start text-right" : "self-start"
                  }`}
                >
                  {lang.dialogue.agent2}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mt-8 text-center text-sm text-muted">
          Same quality and price in every language.{" "}
          <Link
            href="/languages/explore"
            className="font-semibold text-brand-600 hover:text-brand-700"
          >
            Explore languages →
          </Link>
        </p>
      </div>
    </section>
  );
}
