"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { ExpandedCard } from "./ExpandedCard";
import type { ProductCardData } from "./data";
import {
  allSolutionProductCards,
  solutionCardsByCategory,
} from "./solution-cards";

type Props = {
  /** Prebuilt cards; default = all solution capabilities */
  cards?: ProductCardData[];
  /** Group by solution category with headings */
  groupByCategory?: boolean;
  /** Unique layout namespace (match flow vs full page) */
  layoutNs?: string;
  className?: string;
};

/**
 * Speaksy solutions as expand product cards — iso objects, green theme.
 * Optimized grid; one expanded morph at a time.
 */
export default function SpeaksyExpandCards({
  cards,
  groupByCategory = true,
  layoutNs = "sol",
  className = "",
}: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const open = useCallback((id: string) => setActiveId(id), []);
  const close = useCallback(() => setActiveId(null), []);

  const flat = cards ?? allSolutionProductCards();
  const active = flat.find((c) => c.id === activeId) ?? null;
  const groups = groupByCategory && !cards ? solutionCardsByCategory() : null;

  const renderGrid = (list: ProductCardData[]) => (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
      {list.map((card) => {
        const isOpen = activeId === card.id;
        return (
          <div
            key={card.id}
            id={card.id}
            className="relative aspect-[5/4] w-full scroll-mt-28 sm:aspect-[4/3]"
          >
            {!isOpen ? (
              <ProductCard
                card={card}
                dimmed={activeId !== null}
                onOpen={() => open(card.id)}
                layoutNs={layoutNs}
              />
            ) : (
              <div
                className="h-full w-full rounded-[20px] bg-neutral-100/80"
                aria-hidden
              />
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <LayoutGroup id={layoutNs}>
      <div className={className}>
        {groups
          ? groups.map((g) => (
              <div
                key={g.categoryId}
                id={g.categoryId}
                className="mb-14 last:mb-0 sm:mb-16"
              >
                <div className="mb-8 max-w-xl sm:mb-10">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    {g.name}
                  </h3>
                  <p className="mt-1 text-sm italic text-muted">{g.tagline}</p>
                </div>
                {renderGrid(g.cards)}
              </div>
            ))
          : renderGrid(flat)}
      </div>

      <AnimatePresence>
        {active && (
          <ExpandedCard
            key={active.id}
            card={active}
            onClose={close}
            layoutNs={layoutNs}
          />
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
