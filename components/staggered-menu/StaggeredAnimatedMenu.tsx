"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Atom, Check, Copy, Minimize2, Maximize2 } from "lucide-react";
import { MENU_ITEMS } from "./data";
import { MenuItemRow } from "./MenuItemRow";

const spring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 24,
};

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.08,
    },
  },
};

/**
 * Full-screen black scene with a staggered menu stack.
 * `layout` on each item keeps the stack gliding when collapsed/expanded.
 */
export default function StaggeredAnimatedMenu() {
  const [copied, setCopied] = useState(false);
  /** Demo: collapse to first item so layout springs are visible */
  const [expanded, setExpanded] = useState(true);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(
        "StaggeredAnimatedMenu — Framer Motion staggerChildren + layout spring"
      );
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard may be denied */
    }
  }, []);

  const visibleItems = expanded ? MENU_ITEMS : MENU_ITEMS.slice(0, 1);

  return (
    <div className="fixed inset-0 z-[80] flex min-h-screen flex-col bg-black">
      {/* Top navigation */}
      <header className="absolute inset-x-0 top-0 z-20 flex h-14 w-full items-center justify-between bg-neutral-950 px-5 sm:px-8">
        <div className="flex items-center gap-2 text-white">
          <Atom className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          <span className="sr-only">Component logo</span>
        </div>

        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Actions">
          <a
            href="https://www.framer.com/marketplace/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-3 py-1.5 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
          >
            Original
          </a>
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" aria-hidden />
            ) : (
              <Copy className="h-3.5 w-3.5" aria-hidden />
            )}
            {copied ? "Copied" : "Copy component"}
          </button>
          <a
            href="/lab"
            className="ml-1 rounded-full bg-[#2f6bff] px-3.5 py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Remix
          </a>
        </nav>
      </header>

      {/* Centered menu stack */}
      <main className="relative flex flex-1 items-center justify-center px-4">
        <div className="flex w-full max-w-[360px] flex-col items-stretch gap-3">
          <LayoutGroup>
            <motion.div
              className="flex w-full flex-col gap-1.5"
              variants={listVariants}
              initial="hidden"
              animate="visible"
              key={expanded ? "open" : "closed"}
            >
              <AnimatePresence mode="popLayout">
                {visibleItems.map((item) => (
                  <MenuItemRow
                    key={item.id}
                    item={item}
                    onClick={() => {
                      // Tapping Profile details toggles collapse demo
                      if (item.id === "profile") setExpanded((e) => !e);
                    }}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>

          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="mx-auto mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:text-neutral-400"
          >
            {expanded ? (
              <>
                <Minimize2 className="h-3 w-3" aria-hidden />
                Collapse stack
              </>
            ) : (
              <>
                <Maximize2 className="h-3 w-3" aria-hidden />
                Expand stack
              </>
            )}
          </button>
        </div>
      </main>

      <a
        href="/lab"
        className="absolute bottom-5 left-5 z-20 text-xs text-neutral-600 underline-offset-2 hover:text-neutral-400 hover:underline"
      >
        ← Back to Lab
      </a>
    </div>
  );
}
