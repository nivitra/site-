"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { MarqueeLanguage } from "./data";

type Props = {
  lang: MarqueeLanguage;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
};

function MarqueeTrack({ lang }: { lang: MarqueeLanguage }) {
  // Duplicate content for seamless loop
  const unit = (
    <>
      <span className="shrink-0 px-4 text-[clamp(1.5rem,3.5vw,2.25rem)] font-semibold tracking-[0.12em] text-black">
        {lang.name}
      </span>
      <span className="mx-1 inline-flex h-12 w-28 shrink-0 overflow-hidden rounded-full sm:h-14 sm:w-36">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={lang.image}
          alt={lang.imageAlt}
          className="h-full w-full object-cover"
          draggable={false}
        />
      </span>
      <span className="shrink-0 px-3 font-indic text-[clamp(1.25rem,3vw,1.85rem)] font-medium text-black/70">
        {lang.native}
      </span>
      <span className="mx-1 inline-flex h-12 w-28 shrink-0 overflow-hidden rounded-full sm:h-14 sm:w-36">
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
        transition={{
          x: {
            duration: 18,
            ease: "linear",
            repeat: Infinity,
          },
        }}
      >
        <div className="flex items-center">{unit}</div>
        <div className="flex items-center">{unit}</div>
        <div className="flex items-center">{unit}</div>
        <div className="flex items-center">{unit}</div>
      </motion.div>
    </div>
  );
}

export function LanguageMarqueeRow({
  lang,
  active,
  onEnter,
  onLeave,
}: Props) {
  return (
    <div
      className="relative border-t border-white/15 last:border-b"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
    >
      {/* Idle label */}
      <div
        className={`flex h-[4.5rem] items-center justify-center sm:h-[5.25rem] ${
          active ? "opacity-0" : "opacity-100"
        } transition-opacity duration-150`}
      >
        <span className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-semibold tracking-[0.14em] text-white">
          {lang.name}
        </span>
      </div>

      {/* Active white marquee band */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="band"
            className="absolute inset-0 z-10 bg-white"
            initial={{ scaleY: 0.85, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0.92, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            style={{ originY: 0.5 }}
          >
            <MarqueeTrack lang={lang} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
