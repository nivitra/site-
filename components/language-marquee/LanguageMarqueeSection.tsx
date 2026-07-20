"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MARQUEE_LANGUAGES, type MarqueeLanguage } from "./data";

/**
 * Light-theme language marquee for industry pages.
 * Explicit dark text on white — never inherits white-on-white.
 */
function LightMarqueeTrack({ lang }: { lang: MarqueeLanguage }) {
  const unit = (
    <>
      <span className="shrink-0 px-4 text-[clamp(1.35rem,3vw,2rem)] font-semibold tracking-[0.12em] text-neutral-900">
        {lang.name}
      </span>
      <span className="mx-1 inline-flex h-11 w-24 shrink-0 overflow-hidden rounded-full ring-1 ring-black/10 sm:h-12 sm:w-32">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={lang.image}
          alt={lang.imageAlt}
          className="h-full w-full object-cover"
          draggable={false}
        />
      </span>
      <span className="shrink-0 px-3 font-indic text-[clamp(1.15rem,2.5vw,1.65rem)] font-medium text-neutral-600">
        {lang.native}
      </span>
      <span className="mx-1 inline-flex h-11 w-24 shrink-0 overflow-hidden rounded-full ring-1 ring-black/10 sm:h-12 sm:w-32">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={lang.image}
          alt=""
          className="h-full w-full object-cover"
          draggable={false}
        />
      </span>
    </>
  );

  return (
    <div className="relative flex h-full w-full items-center overflow-hidden">
      <motion.div
        className="flex w-max items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ x: { duration: 18, ease: "linear", repeat: Infinity } }}
      >
        <div className="flex items-center">{unit}</div>
        <div className="flex items-center">{unit}</div>
        <div className="flex items-center">{unit}</div>
        <div className="flex items-center">{unit}</div>
      </motion.div>
    </div>
  );
}

function LightRow({
  lang,
  active,
  onEnter,
  onLeave,
}: {
  lang: MarqueeLanguage;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      className="relative border-t border-neutral-200 last:border-b last:border-neutral-200"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
    >
      {/* Idle — dark text on light section */}
      <div
        className={`flex h-[4.25rem] items-center justify-center sm:h-[5rem] ${
          active ? "opacity-0" : "opacity-100"
        } transition-opacity duration-150`}
      >
        <span className="text-[clamp(1.35rem,3vw,2rem)] font-semibold tracking-[0.14em] text-neutral-900">
          {lang.name}
        </span>
      </div>

      {/* Hover band — white strip, dark marquee type */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="band"
            className="absolute inset-0 z-10 bg-white text-neutral-900 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] ring-1 ring-black/5"
            initial={{ scaleY: 0.9, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0.94, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            style={{ originY: 0.5 }}
          >
            <LightMarqueeTrack lang={lang} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LanguageMarqueeSection({
  industryName,
}: {
  industryName?: string;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="border-t border-neutral-200 bg-white py-16 text-neutral-900 sm:py-20">
      <div
        className="pointer-events-none absolute inset-x-0 h-0"
        aria-hidden
      />
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
          Language Lab
        </p>
        <h2 className="mt-3 text-center text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          {industryName
            ? `Every language your ${industryName} customers speak`
            : "10 languages. One agent fabric."}
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-sm text-neutral-600">
          Hover a language — see the script and the region. Built from real
          speech research, not generic translation.
        </p>
      </div>

      <div className="mt-12 w-full bg-white text-neutral-900">
        {MARQUEE_LANGUAGES.map((lang) => (
          <LightRow
            key={lang.id}
            lang={lang}
            active={activeId === lang.id}
            onEnter={() => setActiveId(lang.id)}
            onLeave={() =>
              setActiveId((id) => (id === lang.id ? null : id))
            }
          />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/languages/explore"
          className="text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
        >
          Explore languages →
        </Link>
      </div>
    </section>
  );
}
