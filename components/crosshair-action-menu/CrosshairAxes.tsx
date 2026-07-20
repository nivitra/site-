"use client";

import { AnimatePresence, motion } from "framer-motion";

type Props = {
  open: boolean;
};

/**
 * Horizontal axis always on; vertical axis fades in only when menu is open.
 */
export function CrosshairAxes({ open }: Props) {
  return (
    <>
      {/* Horizontal axis — permanent */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 z-0 h-px w-full -translate-y-1/2 bg-neutral-800"
      />

      {/* Vertical axis — only when open */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="v-axis"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="pointer-events-none absolute left-1/2 top-0 z-0 h-full w-px -translate-x-1/2 bg-neutral-800"
          />
        )}
      </AnimatePresence>
    </>
  );
}
