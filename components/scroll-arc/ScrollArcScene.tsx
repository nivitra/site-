"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Link from "next/link";
import { ARC_CIRCLES } from "./data";

/**
 * Geometry (% of sticky viewport) — shared by SVG stroke + discs.
 * Center below stage; only the upper arc is on-screen.
 */
const CX = 50;
const CY = 118;
const R = 82;
const N = ARC_CIRCLES.length; // 3

/**
 * θ for disc i. Scroll spins the wheel once.
 * θ = π/2 → apex (top). x = CX + R cos θ, y = CY - R sin θ
 */
function discTheta(p: number, i: number) {
  // Start: first disc near lower-left of the visible arc, then climbs over the top
  const spacing = (Math.PI * 2) / N;
  // One full revolution across the sticky scroll
  const spin = p * Math.PI * 2;
  // i=0 begins around θ ≈ 0.15π (rising from left) at p=0 after offset
  const start = Math.PI * 0.15;
  return start + spin + i * spacing;
}

function xy(theta: number) {
  return {
    x: CX + R * Math.cos(theta),
    y: CY - R * Math.sin(theta),
  };
}

/** Normalize angle delta to [-π, π] */
function angDiff(a: number, b: number) {
  let d = ((a - b) % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI;
  return d;
}

function Disc({
  progress,
  index,
  label,
}: {
  progress: MotionValue<number>;
  index: number;
  label: string;
}) {
  const left = useTransform(progress, (p) => `${xy(discTheta(p, index)).x}%`);
  const top = useTransform(progress, (p) => `${xy(discTheta(p, index)).y}%`);
  const rotate = useTransform(progress, (p) => {
    const t = discTheta(p, index);
    // Upright at apex; tilt with the path on the sides (as in the recording)
    return ((Math.PI / 2 - t) * 180) / Math.PI;
  });
  const opacity = useTransform(progress, (p) => {
    const y = xy(discTheta(p, index)).y;
    // Fade when off the sticky stage
    if (y < -12 || y > 108) return 0;
    if (y < 2) return Math.max(0, (y + 12) / 14);
    if (y > 95) return Math.max(0, (108 - y) / 13);
    return 1;
  });

  return (
    <motion.div
      className="pointer-events-none absolute z-20 flex h-[130px] w-[130px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white sm:h-[158px] sm:w-[158px]"
      style={{
        left,
        top,
        rotate,
        opacity,
        boxShadow: "0 16px 50px -18px rgba(0,0,0,0.55)",
      }}
    >
      <span className="whitespace-pre-line px-4 text-center text-[13px] font-semibold leading-snug tracking-tight text-black sm:text-[15px]">
        {label}
      </span>
    </motion.div>
  );
}

function DomeCopy({
  progress,
  index,
  text,
}: {
  progress: MotionValue<number>;
  index: number;
  text: string;
}) {
  // Strongest when this disc is nearest the apex (θ = π/2)
  const opacity = useTransform(progress, (p) => {
    const t = discTheta(p, index);
    const err = Math.abs(angDiff(t, Math.PI / 2));
    // Visible within ~half spacing of apex
    const half = Math.PI / N;
    if (err > half) return 0;
    const s = 1 - err / half;
    return s * s;
  });

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-x-0 whitespace-pre-line text-center text-[14px] leading-relaxed text-neutral-400 sm:text-[15px]"
    >
      {text}
    </motion.div>
  );
}

/**
 * Scroll arc (rebuilt from dense frame analysis):
 * - White arc line
 * - 3 white discs orbiting (left + apex + right can show together)
 * - Body text lives INSIDE the dark dome under the arc
 * - Scroll turns the wheel; copy follows the disc at the apex
 */
export default function ScrollArcScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 28,
    restDelta: 0.0004,
  });

  const hintOpacity = useTransform(progress, [0, 0.05], [0.55, 0]);

  // Arc endpoints for SVG (same circle as discs)
  // y = 70 band: dy = CY-70 = 48, half-width = sqrt(R^2 - 48^2) ≈ 66.4
  const arcY = 70;
  const half = Math.sqrt(R * R - (CY - arcY) * (CY - arcY));
  const x1 = CX - half;
  const x2 = CX + half;

  return (
    <div ref={containerRef} className="relative h-[480vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <Link
          href="/lab"
          className="absolute left-5 top-5 z-40 text-xs text-neutral-500 transition-colors hover:text-neutral-300"
        >
          ← Lab
        </Link>

        {/* Interior of the arc (dark dome) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 130% 100% at 50% 120%, #1c1c1e 0%, #111113 40%, #000 70%)",
          }}
        />

        {/* White arc = upper rim of the same circle */}
        <svg
          className="pointer-events-none absolute inset-0 z-[5] h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d={`M ${x1.toFixed(2)} ${arcY} A ${R} ${R} 0 0 1 ${x2.toFixed(2)} ${arcY}`}
            fill="none"
            stroke="rgba(255,255,255,0.95)"
            strokeWidth="0.28"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* TEXT INSIDE THE ARC (dome) */}
        <div className="pointer-events-none absolute inset-x-0 top-[36%] z-10 mx-auto h-40 max-w-2xl px-10 sm:top-[38%]">
          {ARC_CIRCLES.map((c, i) => (
            <DomeCopy
              key={c.id}
              progress={progress}
              index={i}
              text={c.body}
            />
          ))}
        </div>

        {/* 3 white discs on the wheel */}
        {ARC_CIRCLES.map((c, i) => (
          <Disc key={c.id} progress={progress} index={i} label={c.label} />
        ))}

        <motion.p
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 left-1/2 z-40 -translate-x-1/2 text-[11px] tracking-[0.28em] text-neutral-500 uppercase"
        >
          Scroll
        </motion.p>
      </div>
    </div>
  );
}
