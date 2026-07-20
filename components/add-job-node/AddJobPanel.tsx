"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Plus } from "lucide-react";
import { JOB_ACTIONS } from "./data";
import { JobActionTile } from "./JobActionTile";

const panelVariants = {
  hidden: {
    opacity: 0,
    scale: 0.72,
    y: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 320,
      damping: 26,
      mass: 0.85,
      staggerChildren: 0.035,
      delayChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.78,
    transition: { duration: 0.18, ease: [0.4, 0, 1, 1] as const },
  },
};

const footerVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 320, damping: 26, delay: 0.12 },
  },
};

type Props = {
  onSelect?: (id: string) => void;
};

/** Dark "Add job" popover — 2×3 actions + describe field */
export function AddJobPanel({ onSelect }: Props) {
  const [text, setText] = useState("");

  return (
    <motion.div
      role="dialog"
      aria-label="Add job"
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative z-30 w-[280px] origin-center rounded-2xl border border-white/[0.06] bg-[#141416] p-3 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.04)]"
    >
      {/* Edge connector dots (top / right / bottom / left) */}
      {(
        [
          "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2",
          "right-0 top-1/2 -translate-y-1/2 translate-x-1/2",
          "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
          "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
        ] as const
      ).map((cls) => (
        <span
          key={cls}
          aria-hidden
          className={`pointer-events-none absolute z-40 h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)] ${cls}`}
        />
      ))}

      <div className="mb-2.5 flex items-center justify-between px-1 pt-0.5">
        <h2 className="text-[13px] font-medium text-neutral-200">Add job</h2>
        <button
          type="button"
          className="inline-flex items-center gap-0.5 text-[12px] font-medium text-neutral-500 transition-colors hover:text-neutral-300"
        >
          More
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        {JOB_ACTIONS.map((action) => (
          <JobActionTile key={action.id} action={action} onSelect={onSelect} />
        ))}
      </div>

      <motion.div
        variants={footerVariants}
        className="mt-2.5 flex items-center gap-2 rounded-xl border border-white/[0.06] bg-[#0c0c0e] px-3 py-2"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Or just describe it"
          className="min-w-0 flex-1 bg-transparent text-[12px] text-neutral-300 placeholder:text-neutral-600 outline-none"
          aria-label="Describe a job"
        />
        <button
          type="button"
          aria-label="Add described job"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 text-neutral-400 transition-colors hover:border-white/20 hover:text-white"
          onClick={() => {
            if (text.trim()) onSelect?.(`describe:${text.trim()}`);
          }}
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
      </motion.div>
    </motion.div>
  );
}
