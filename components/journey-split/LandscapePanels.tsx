"use client";

import { motion } from "framer-motion";

const IMG = "/lab/journey-landscape.jpg";

type Props = {
  /** 0 = one piece, 1 = fully gapped split */
  split: number;
  onHoverChange?: (hovering: boolean) => void;
  onActivate?: () => void;
};

/**
 * Continuous blue landscape that splits into three vertical panels.
 * Uses the same image with different object-position per panel.
 */
export function LandscapePanels({ split, onHoverChange, onActivate }: Props) {
  const gap = 6 + split * 18; // px gap grows with split
  const panels = [
    { pos: "0% center", radius: "1.25rem 0 0 1.25rem" },
    { pos: "50% center", radius: "0" },
    { pos: "100% center", radius: "0 1.25rem 1.25rem 0" },
  ];

  // When fully unified, use single outer radius
  const unified = split < 0.05;

  return (
    <motion.div
      className="relative mx-auto flex w-full max-w-[920px] cursor-pointer overflow-hidden"
      style={{
        height: "min(42vh, 360px)",
        gap: unified ? 0 : gap,
        borderRadius: unified ? "1.25rem" : 0,
      }}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      onClick={onActivate}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate?.();
        }
      }}
      aria-label="Explore journey options"
    >
      {panels.map((p, i) => (
        <motion.div
          key={i}
          className="relative h-full min-w-0 flex-1 overflow-hidden"
          animate={{
            borderRadius: unified
              ? i === 0
                ? "1.25rem 0 0 1.25rem"
                : i === 2
                  ? "0 1.25rem 1.25rem 0"
                  : 0
              : "0.85rem",
            scale: 1 + split * 0.01,
          }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          style={{
            // Outer corners when unified handled on container clip
            boxShadow:
              split > 0.2 ? "0 20px 50px -20px rgba(0,0,0,0.5)" : "none",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMG}
            alt=""
            draggable={false}
            className="pointer-events-none h-full w-full select-none object-cover"
            style={{
              objectPosition: p.pos,
              // Slight zoom so panel edges feel continuous when closed
              transform: `scale(${1.02 + split * 0.02})`,
            }}
          />
        </motion.div>
      ))}

      {/* Unified mask so outer corners stay rounded when closed */}
      {unified && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.25rem] ring-1 ring-white/5"
        />
      )}
    </motion.div>
  );
}
