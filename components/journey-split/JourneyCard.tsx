"use client";

import { motion } from "framer-motion";
import type { JourneyCard as JourneyCardType } from "./data";
import { CardIcon } from "./CardIcon";

const toneStyles: Record<
  JourneyCardType["tone"],
  { bg: string; title: string; body: string; icon: string }
> = {
  silver: {
    bg: "bg-gradient-to-b from-[#e8e8ea] to-[#c8c8cc]",
    title: "text-neutral-900",
    body: "text-neutral-600",
    icon: "text-neutral-700",
  },
  blue: {
    bg: "bg-gradient-to-b from-[#2f5fd0] to-[#1a3fa8]",
    title: "text-white",
    body: "text-blue-100/75",
    icon: "text-white/90",
  },
  charcoal: {
    bg: "bg-gradient-to-b from-[#2a2a2c] to-[#141416]",
    title: "text-neutral-100",
    body: "text-neutral-500",
    icon: "text-neutral-400",
  },
};

type Props = {
  card: JourneyCardType;
  index: number;
  phase: "cards" | "exit";
};

export function JourneyCardFace({ card, index, phase }: Props) {
  const t = toneStyles[card.tone];
  const exiting = phase === "exit";

  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 40,
        rotateY: 0,
        scale: 0.92,
      }}
      animate={{
        opacity: exiting ? 0 : 1,
        y: exiting ? -160 - index * 24 : 0,
        x: card.x,
        rotateY: card.rotateY,
        scale: exiting ? 0.9 : 1,
        z: exiting ? 40 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 24,
        delay: exiting ? index * 0.05 : 0.05 + index * 0.06,
      }}
      style={{
        transformStyle: "preserve-3d",
        transformPerspective: 1200,
      }}
      className={`relative flex h-[340px] w-[220px] flex-col justify-between rounded-2xl p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)] ${t.bg}`}
    >
      <div className={t.icon}>
        <CardIcon kind={card.icon} />
      </div>
      <div>
        <h3
          className={`whitespace-pre-line text-[22px] font-semibold leading-[1.15] tracking-tight ${t.title}`}
        >
          {card.title}
        </h3>
        <p className={`mt-4 text-[12px] leading-relaxed ${t.body}`}>
          {card.body}
        </p>
      </div>
    </motion.article>
  );
}
