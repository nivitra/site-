"use client";

import { motion } from "framer-motion";

/** 2×3 white dots — closed-state trigger on the pipeline */
export function SixDotTrigger({ open }: { open: boolean }) {
  return (
    <motion.button
      type="button"
      aria-label={open ? "Close add job menu" : "Open add job menu"}
      aria-expanded={open}
      className="relative z-20 flex h-10 w-10 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="grid grid-cols-2 gap-[5px]"
        animate={{
          opacity: open ? 0 : 1,
          scale: open ? 0.6 : 1,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="h-[5px] w-[5px] rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.35)]"
          />
        ))}
      </motion.div>
    </motion.button>
  );
}
