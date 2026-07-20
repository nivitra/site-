"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { ArcTakeaway } from "@/lib/posts";

/**
 * Compact scroll-arc for long posts — three takeaways ride a green arc.
 * Adapted from lab ScrollArc for light marketing blog.
 */
const CX = 50;
const CY = 125;
const R = 78;

function discTheta(p: number, i: number, n: number) {
  const spacing = (Math.PI * 2) / n;
  const spin = p * Math.PI * 2;
  const start = Math.PI * 0.18;
  return start + spin + i * spacing;
}

function xy(theta: number) {
  return {
    x: CX + R * Math.cos(theta),
    y: CY - R * Math.sin(theta),
  };
}

function Disc({
  progress,
  index,
  n,
  label,
}: {
  progress: MotionValue<number>;
  index: number;
  n: number;
  label: string;
}) {
  const left = useTransform(progress, (p) => `${xy(discTheta(p, index, n)).x}%`);
  const top = useTransform(progress, (p) => `${xy(discTheta(p, index, n)).y}%`);
  const rotate = useTransform(progress, (p) => {
    const t = discTheta(p, index, n);
    return ((Math.PI / 2 - t) * 180) / Math.PI;
  });
  const opacity = useTransform(progress, (p) => {
    const y = xy(discTheta(p, index, n)).y;
    if (y < -8 || y > 105) return 0;
    if (y < 4) return Math.max(0, (y + 8) / 12);
    if (y > 92) return Math.max(0, (105 - y) / 13);
    return 1;
  });

  return (
    <motion.div
      className="pointer-events-none absolute z-20 flex h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-500/20 bg-white shadow-[0_8px_28px_-12px_rgba(6,78,59,0.35)] sm:h-[118px] sm:w-[118px]"
      style={{ left, top, rotate, opacity }}
    >
      <p className="max-w-[5.5rem] text-center text-[10px] font-semibold leading-snug tracking-tight text-foreground sm:text-[11px]">
        {label}
      </p>
    </motion.div>
  );
}

export default function BlogTakeawaysArc({ items }: { items: ArcTakeaway[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.4,
  });

  const n = items.length;
  if (n < 2) return null;

  return (
    <section
      ref={ref}
      className="relative my-14 h-[140vh] sm:my-16 sm:h-[150vh]"
      aria-label="Key takeaways"
    >
      <div className="sticky top-0 flex h-[70vh] flex-col items-center justify-center overflow-hidden sm:h-[75vh]">
        <p className="relative z-30 mb-2 text-[11px] font-semibold tracking-[0.2em] text-brand-600 uppercase">
          On the arc
        </p>
        <p className="relative z-30 mb-6 max-w-xs text-center text-sm text-muted">
          Scroll — the proof points rotate into focus.
        </p>

        <div className="relative h-[min(52vh,420px)] w-full max-w-lg">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
              fill="none"
              stroke="rgba(16,185,129,0.25)"
              strokeWidth="0.6"
            />
          </svg>
          {items.map((item, i) => (
            <Disc
              key={item.id}
              progress={progress}
              index={i}
              n={n}
              label={item.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
