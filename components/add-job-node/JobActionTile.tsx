"use client";

import { motion } from "framer-motion";
import type { JobAction } from "./data";

const tileVariants = {
  hidden: { opacity: 0, scale: 0.88, y: 6 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 380, damping: 26 },
  },
};

type Props = {
  action: JobAction;
  onSelect?: (id: string) => void;
};

export function JobActionTile({ action, onSelect }: Props) {
  const Icon = action.icon;

  return (
    <motion.button
      type="button"
      variants={tileVariants}
      onClick={() => onSelect?.(action.id)}
      className="group flex flex-col items-center justify-center gap-2 rounded-xl bg-[#1c1c1e] px-3 py-3.5 text-neutral-300 transition-colors hover:bg-[#252528] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
    >
      <Icon
        className="h-[18px] w-[18px] text-neutral-400 transition-colors group-hover:text-neutral-200"
        strokeWidth={1.75}
        aria-hidden
      />
      <span className="text-[12px] font-medium tracking-tight">{action.label}</span>
    </motion.button>
  );
}
