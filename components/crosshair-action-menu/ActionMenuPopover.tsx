"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { CROSSHAIR_ACTIONS } from "./data";
import { EdgeMarkers } from "./EdgeMarkers";

const spring = {
  type: "spring" as const,
  damping: 22,
  stiffness: 350,
};

const panelMotion = {
  initial: { opacity: 0, scale: 0.95, filter: "blur(4px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.95, filter: "blur(4px)" },
  transition: spring,
};

type Props = {
  onSelect?: (id: string) => void;
  onMore?: () => void;
};

export function ActionMenuPopover({ onSelect, onMore }: Props) {
  return (
    <motion.div
      role="dialog"
      aria-label="Add job"
      {...panelMotion}
      className="absolute left-1/2 top-1/2 z-30 w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-neutral-800 bg-[#111111] p-4 shadow-[0_24px_80px_-16px_rgba(0,0,0,0.9)]"
    >
      <EdgeMarkers />

      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-neutral-200">Add job</h2>
        <button
          type="button"
          onClick={onMore}
          className="cursor-pointer text-xs text-neutral-500 transition-colors hover:text-neutral-300"
        >
          More &gt;
        </button>
      </div>

      {/* 3×2 action grid */}
      <div className="grid grid-cols-3 gap-2">
        {CROSSHAIR_ACTIONS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onSelect?.(id)}
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-transparent bg-[#1a1a1a] p-3 transition-all hover:border-neutral-700 hover:bg-[#252525] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
          >
            <Icon
              className="mb-2 h-4 w-4 text-neutral-400"
              strokeWidth={1.75}
              aria-hidden
            />
            <span className="text-[11px] font-medium text-neutral-300">
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-neutral-800 pt-3">
        <span className="text-xs text-neutral-500">Or just describe it</span>
        <button
          type="button"
          aria-label="Describe a job"
          onClick={() => onSelect?.("describe")}
          className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1a1a1a] text-neutral-400 transition-colors hover:bg-[#252525] hover:text-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
      </div>
    </motion.div>
  );
}
