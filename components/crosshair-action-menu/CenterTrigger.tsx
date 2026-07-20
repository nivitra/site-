"use client";

import { motion } from "framer-motion";

type Props = {
  onOpen: () => void;
};

/** Small 2×3 dotted square at axis intersection (closed state) */
export function CenterTrigger({ onOpen }: Props) {
  return (
    <motion.button
      type="button"
      aria-label="Open add job menu"
      onClick={onOpen}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      className="absolute left-1/2 top-1/2 z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-neutral-500 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
    >
      <span className="grid grid-cols-2 gap-[4.5px]" aria-hidden>
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="h-[4.5px] w-[4.5px] rounded-full bg-current shadow-[0_0_6px_rgba(255,255,255,0.2)]"
          />
        ))}
      </span>
    </motion.button>
  );
}
