"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ChevronDown } from "lucide-react";
import type { MenuItem } from "./data";

const spring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 24,
};

const itemVariants = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: spring,
  },
};

type Props = {
  item: MenuItem;
  onClick?: () => void;
};

function StatusRight({ status }: { status: MenuItem["status"] }) {
  if (status === "completed") {
    return (
      <CheckCircle2
        className="h-4 w-4 shrink-0 text-emerald-500"
        fill="currentColor"
        strokeWidth={0}
        aria-label="Completed"
      />
    );
  }

  if (status === "optional") {
    return (
      <span className="flex shrink-0 items-center gap-2">
        <span className="text-xs text-neutral-500">Optional</span>
        <ChevronDown className="h-4 w-4 text-neutral-500" aria-hidden />
      </span>
    );
  }

  return (
    <ChevronDown
      className="h-4 w-4 shrink-0 text-neutral-500"
      aria-hidden
    />
  );
}

export function MenuItemRow({ item, onClick }: Props) {
  const Icon = item.icon;

  return (
    <motion.div layout variants={itemVariants} transition={spring}>
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between rounded-[1.25rem] bg-[#121212] px-4 py-3 text-left transition-colors hover:bg-[#1a1a1a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
      >
        <span className="flex min-w-0 items-center">
          <Icon
            className="h-4 w-4 shrink-0 text-neutral-400"
            strokeWidth={1.75}
            aria-hidden
          />
          <span className="ml-3 truncate text-sm font-medium text-neutral-300">
            {item.label}
          </span>
        </span>
        <StatusRight status={item.status} />
      </button>
    </motion.div>
  );
}
