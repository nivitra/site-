"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { ProductCardData } from "./data";
import { ProductVisual } from "./ProductVisual";

type Props = {
  card: ProductCardData;
  dimmed: boolean;
  onOpen: () => void;
  layoutNs?: string;
};

const springSoft = {
  type: "spring" as const,
  stiffness: 260,
  damping: 28,
  mass: 0.85,
};

/**
 * Compact capability tile — icon sits in the upper band (not floating off
 * a tall empty slab), label tight at the bottom.
 */
export function ProductCard({
  card,
  dimmed,
  onOpen,
  layoutNs = "",
}: Props) {
  const dark = card.text === "dark";
  const ref = useRef<HTMLButtonElement>(null);
  const ns = layoutNs ? `${layoutNs}-` : "";
  const isIcon = !!card.Icon && !card.image;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 180, damping: 22, mass: 0.6 });

  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const rotateZ = useTransform(sx, [-0.5, 0.5], [
    card.restRotate * 0.4 - 3,
    card.restRotate * 0.4 + 4,
  ]);
  const shadowX = useTransform(sx, [-0.5, 0.5], [4, -4]);
  const shadow = useMotionTemplate`drop-shadow(${shadowX}px 10px 16px rgba(6,78,59,0.18))`;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      layoutId={`${ns}shell-${card.id}`}
      onClick={onOpen}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      aria-label={`Open ${card.title}`}
      className="group relative flex h-full w-full cursor-pointer flex-col overflow-hidden text-left outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
      style={{ backgroundColor: card.color, borderRadius: 20 }}
      animate={{
        opacity: dimmed ? 0.38 : 1,
        scale: dimmed ? 0.97 : 1,
        filter: dimmed ? "saturate(0.75)" : "saturate(1)",
      }}
      transition={springSoft}
    >
      {/* Icon band — fills middle so it doesn’t read as empty */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pt-5 pb-1">
        <motion.div
          layoutId={`${ns}product-${card.id}`}
          className="pointer-events-none"
          style={{
            width: isIcon ? Math.min(card.productWidth, 148) : card.productWidth,
            rotateX,
            rotateY,
            rotateZ,
            transformPerspective: 800,
            filter: shadow,
            transformStyle: "preserve-3d",
          }}
          transition={springSoft}
        >
          <ProductVisual card={card} active />
        </motion.div>
      </div>

      {/* Label — tight bottom stack, no huge top padding */}
      <div className="relative z-10 flex shrink-0 flex-col items-center px-3 pb-4 pt-0 text-center sm:px-4 sm:pb-5">
        <motion.p
          layoutId={`${ns}eyebrow-${card.id}`}
          className={`line-clamp-1 text-[10px] font-medium tracking-wide sm:text-[11px] ${
            dark ? "text-black/50" : "text-white/70"
          }`}
          transition={springSoft}
        >
          {card.eyebrow}
        </motion.p>
        <motion.h2
          layoutId={`${ns}title-${card.id}`}
          className={`mt-0.5 line-clamp-2 text-[0.95rem] font-semibold leading-snug tracking-tight sm:text-[1.05rem] ${
            dark ? "text-black" : "text-white"
          }`}
          transition={springSoft}
        >
          {card.title}
        </motion.h2>
      </div>
    </motion.button>
  );
}
