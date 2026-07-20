"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import Link from "next/link";
import { PRODUCT_CARDS } from "./data";
import { ProductCard } from "./ProductCard";
import { ExpandedCard } from "./ExpandedCard";

/**
 * Dual product tiles on pure black → click morphs a card to a full-bleed
 * editorial panel with ghost product + body copy (exact from the recording).
 */
export default function ExpandProductCards() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const open = useCallback((id: string) => setActiveId(id), []);
  const close = useCallback(() => setActiveId(null), []);

  const active = PRODUCT_CARDS.find((c) => c.id === activeId) ?? null;

  return (
    <LayoutGroup>
      <div className="relative min-h-screen overflow-hidden bg-black text-white">
        <Link
          href="/lab"
          className="absolute left-5 top-5 z-40 text-xs text-neutral-500 transition-colors hover:text-neutral-300"
        >
          ← Lab
        </Link>

        <div className="flex min-h-screen items-center justify-center px-4 py-24 sm:px-8">
          <div className="flex flex-col items-center justify-center gap-10 sm:flex-row sm:gap-12 lg:gap-16">
            {PRODUCT_CARDS.map((card) => {
              const isOpen = activeId === card.id;
              return (
                <div
                  key={card.id}
                  className="relative aspect-square w-[min(42vw,400px)] min-w-[260px] max-w-[420px]"
                >
                  {/*
                    When open: unmount the tile (layoutIds move to ExpandedCard)
                    but keep this wrapper so the sibling card does not reflow —
                    matches the recording where the other card stays put.
                  */}
                  {!isOpen ? (
                    <ProductCard
                      card={card}
                      dimmed={activeId !== null}
                      onOpen={() => open(card.id)}
                      layoutNs="lab"
                    />
                  ) : (
                    <div
                      className="h-full w-full rounded-[28px]"
                      style={{ backgroundColor: "transparent" }}
                      aria-hidden
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <AnimatePresence>
          {active && (
            <ExpandedCard
              key={active.id}
              card={active}
              onClose={close}
              layoutNs="lab"
            />
          )}
        </AnimatePresence>

        {/* Soft vignette so floating products pop on pure black */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.45)_100%)]"
          animate={{ opacity: activeId ? 0 : 1 }}
          transition={{ duration: 0.35 }}
        />
      </div>
    </LayoutGroup>
  );
}
