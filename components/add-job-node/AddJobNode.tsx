"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SixDotTrigger } from "./SixDotTrigger";
import { AddJobPanel } from "./AddJobPanel";

/**
 * Pipeline node: thin horizontal line + 6-dot trigger that expands into
 * an "Add job" action grid (as in the reference screen recording).
 */
export default function AddJobNode() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);

  // Click outside to close
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const onSelect = (id: string) => {
    setSelected(id);
    // Brief highlight then stay open (or close — recording keeps open)
  };

  return (
    <div className="fixed inset-0 z-[80] overflow-hidden bg-black">
      {/* Full-width pipeline line through vertical center */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-1/2 h-px -translate-y-1/2"
      >
        {/* Left segment */}
        <motion.div
          className="absolute left-0 top-0 h-px bg-white/90"
          animate={{
            // Leave a gap for the node / panel
            width: open ? "calc(50% - 148px)" : "calc(50% - 22px)",
          }}
          transition={{ type: "spring", stiffness: 280, damping: 30 }}
          style={{
            boxShadow: "0 0 8px rgba(255,255,255,0.15)",
          }}
        />
        {/* Right segment */}
        <motion.div
          className="absolute right-0 top-0 h-px bg-white/90"
          animate={{
            width: open ? "calc(50% - 148px)" : "calc(50% - 22px)",
          }}
          transition={{ type: "spring", stiffness: 280, damping: 30 }}
          style={{
            boxShadow: "0 0 8px rgba(255,255,255,0.15)",
          }}
        />
      </div>

      {/* Center node */}
      <div
        ref={rootRef}
        className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <AddJobPanel key="panel" onSelect={onSelect} />
          ) : (
            <motion.div
              key="trigger"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ type: "spring", stiffness: 360, damping: 28 }}
              onClick={toggle}
            >
              <SixDotTrigger open={false} />
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Selected toast */}
      <AnimatePresence>
        {selected && (
          <motion.p
            key={selected}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-neutral-300"
          >
            Selected: <span className="text-white">{selected}</span>
          </motion.p>
        )}
      </AnimatePresence>

      <a
        href="/lab"
        className="absolute bottom-5 left-5 z-20 text-xs text-neutral-600 underline-offset-2 hover:text-neutral-400 hover:underline"
      >
        ← Back to Lab
      </a>
    </div>
  );
}
