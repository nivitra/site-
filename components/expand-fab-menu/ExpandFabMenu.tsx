"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import Link from "next/link";
import { FAB_ACTIONS } from "./data";

const spring = { type: "spring" as const, stiffness: 420, damping: 28, mass: 0.75 };
const soft = { type: "spring" as const, stiffness: 320, damping: 30 };

/**
 * Bottom-left + FAB → expands into action tiles with backdrop blur.
 * Close staggers tiles back into the origin (matches the recording).
 */
export default function ExpandFabMenu() {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const onAction = (id: string, label: string) => {
    setToast(label.replace("\n", " "));
    window.setTimeout(() => setToast(null), 1600);
    close();
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">
      {/* Demo content (user said ignore fancy MORF bg — simple placeholder) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="select-none text-center">
          <p className="font-mono text-[11px] tracking-[0.28em] text-neutral-500 uppercase">
            The unusual navigation
            <br />
            is located in the bottom left
          </p>
          <div className="mt-5 flex items-center justify-center gap-2">
            <span className="rounded bg-white px-3 py-1.5 font-mono text-[10px] font-bold tracking-wider text-black">
              REMIX THIS
            </span>
            <span className="rounded border border-neutral-600 px-3 py-1.5 font-mono text-[10px] tracking-wider text-neutral-400">
              CHECK THE ORIGINAL
            </span>
          </div>
          <p className="mt-16 font-mono text-6xl font-black tracking-tighter text-neutral-800 sm:text-8xl">
            MORF
          </p>
        </div>
      </div>

      <Link
        href="/lab"
        className="absolute left-5 top-5 z-40 text-xs text-neutral-500 transition-colors hover:text-neutral-300"
      >
        ← Lab
      </Link>

      {/* Backdrop blur when open */}
      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 z-30 cursor-default"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(18px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={close}
            style={{
              backgroundColor: "rgba(0,0,0,0.45)",
              WebkitBackdropFilter: "blur(18px)",
            }}
          />
        )}
      </AnimatePresence>

      {/* FAB dock — bottom left */}
      <div className="absolute bottom-7 left-6 z-40 flex items-end gap-2.5 sm:bottom-8 sm:left-8">
        {/* Toggle: + / × */}
        <motion.button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={toggle}
          className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]"
          whileTap={{ scale: 0.92 }}
          layout
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="x"
                initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                transition={spring}
                className="absolute inset-0 flex items-center justify-center"
              >
                <X className="h-4 w-4" strokeWidth={2.5} />
              </motion.span>
            ) : (
              <motion.span
                key="plus"
                initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
                transition={spring}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Plus className="h-4 w-4" strokeWidth={2.5} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Expanding action tiles */}
        <div className="flex items-end gap-2">
          <AnimatePresence>
            {open &&
              FAB_ACTIONS.map((action, i) => {
                const Icon = action.Icon;
                return (
                  <motion.button
                    key={action.id}
                    type="button"
                    onClick={() => onAction(action.id, action.label)}
                    initial={{
                      opacity: 0,
                      scale: 0.35,
                      x: -28 - i * 12,
                      y: 18,
                      filter: "blur(6px)",
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: 0,
                      y: 0,
                      filter: "blur(0px)",
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.4,
                      x: -20 - i * 10,
                      y: 14,
                      filter: "blur(4px)",
                      transition: {
                        ...soft,
                        delay: (FAB_ACTIONS.length - 1 - i) * 0.04,
                      },
                    }}
                    transition={{
                      ...spring,
                      delay: i * 0.05,
                    }}
                    whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.1)" }}
                    whileTap={{ scale: 0.96 }}
                    className="flex h-[92px] w-[84px] flex-col items-start justify-between rounded-2xl bg-[#1c1c1e] px-3.5 py-3 text-left shadow-[0_12px_40px_-16px_rgba(0,0,0,0.7)] sm:h-[100px] sm:w-[92px]"
                  >
                    <Icon className="h-4 w-4 text-white" strokeWidth={1.75} aria-hidden />
                    <span className="whitespace-pre-line text-[12px] font-medium leading-tight text-white">
                      {action.label}
                    </span>
                  </motion.button>
                );
              })}
          </AnimatePresence>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-28 left-1/2 z-40 -translate-x-1/2 rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-xs text-neutral-200 backdrop-blur-md"
          >
            {toast}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
