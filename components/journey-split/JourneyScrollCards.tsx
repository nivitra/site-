"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { TrendingUp, Box, Sparkles, type LucideIcon } from "lucide-react";

const LANDSCAPE = "/lab/journey-landscape.jpg";

type FaceConfig = {
  id: string;
  /** Which slice of the panoramic image */
  bgPos: "left center" | "center center" | "right center";
  /** Final fan angle after flip (deg) — applied as extra rotateY on the whole card when flipped */
  fanY: number;
  Icon: LucideIcon;
  title: string;
  body: string;
  backClass: string;
  titleClass: string;
  bodyClass: string;
  iconClass: string;
};

const FACES: FaceConfig[] = [
  {
    id: "zero",
    bgPos: "left center",
    fanY: 12,
    Icon: TrendingUp,
    title: "Going Zero to One",
    body: "If you're navigating a new business unit, or a new venture entirely, or breaking into a new market.",
    backClass: "bg-white",
    titleClass: "text-neutral-900",
    bodyClass: "text-sm text-gray-600",
    iconClass: "text-neutral-800",
  },
  {
    id: "scale",
    bgPos: "center center",
    fanY: 0,
    Icon: Box,
    title: "Scaling from One to N",
    body: "If you've achieved Product/Service Market Fit, and are looking to scale your business to new heights.",
    backClass: "bg-blue-600",
    titleClass: "text-white",
    bodyClass: "text-sm text-blue-100",
    iconClass: "text-white",
  },
  {
    id: "quick",
    bgPos: "right center",
    fanY: -12,
    Icon: Sparkles,
    title: "Need Quick Solutions",
    body: "If you know exactly what you want and need a team that can step in and quickly help you with it.",
    backClass: "bg-neutral-900",
    titleClass: "text-white",
    bodyClass: "text-sm text-gray-400",
    iconClass: "text-neutral-300",
  },
];

function FlipCard({
  face,
  rotateY,
  fan,
}: {
  face: FaceConfig;
  rotateY: MotionValue<number>;
  fan: MotionValue<number>;
}) {
  // Compose flip (0→180) with a small fan after flip
  const combinedRotate = useTransform(
    [rotateY, fan],
    ([ry, f]: number[]) => ry + f * face.fanY
  );

  return (
    <motion.div
      className="relative h-[400px] w-[280px] shrink-0"
      style={{
        rotateY: combinedRotate,
        transformStyle: "preserve-3d",
      }}
    >
      {/* FRONT — sliced landscape */}
      <div
        className="absolute inset-0 overflow-hidden rounded-2xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.55)]"
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          backgroundImage: `url(${LANDSCAPE})`,
          backgroundSize: "300% 100%",
          backgroundPosition: face.bgPos,
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* BACK — UI card (pre-rotated 180 so it faces camera after flip) */}
      <div
        className={`absolute inset-0 flex flex-col justify-between rounded-2xl p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.55)] ${face.backClass}`}
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
        }}
      >
        <face.Icon
          className={`h-5 w-5 ${face.iconClass}`}
          strokeWidth={1.75}
          aria-hidden
        />
        <div>
          <h3
            className={`text-2xl font-bold leading-tight tracking-tight ${face.titleClass}`}
          >
            {face.title}
          </h3>
          <p className={`mt-4 leading-relaxed ${face.bodyClass}`}>{face.body}</p>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Scroll-driven: one widescreen image → gap split → 3D Y-flip → three UI cards.
 */
export default function JourneyScrollCards() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth the raw progress a bit for premium feel
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    restDelta: 0.001,
  });

  // Gap: 0 → 24px over first third of scroll
  const gap = useTransform(progress, [0, 0.3], [0, 24]);

  // Flip: 0 → 180 over mid scroll
  const rotateY = useTransform(progress, [0.3, 0.7], [0, 180]);

  // Fan amount 0→1 as flip completes
  const fan = useTransform(progress, [0.55, 0.75], [0, 1]);

  // Slight overall scale punch when split starts
  const stageScale = useTransform(progress, [0, 0.15, 0.7, 1], [1, 1, 0.98, 0.96]);

  // Title: fade in 0.1–0.3, hold, fade out ~0.75–0.9
  const titleOpacity = useTransform(
    progress,
    [0.08, 0.22, 0.72, 0.88],
    [0, 1, 1, 0]
  );
  const titleY = useTransform(progress, [0.08, 0.3], [16, 0]);

  // Bottom caption at end
  const captionOpacity = useTransform(progress, [0.82, 0.95], [0, 1]);
  const captionY = useTransform(progress, [0.82, 0.95], [12, 0]);

  // Soft dim of stage after flip
  const stageOpacity = useTransform(progress, [0.85, 1], [1, 0.35]);

  // Scroll hint near the start
  const hintOpacity = useTransform(progress, [0, 0.08, 0.15], [0.7, 0.5, 0]);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-black">
      <div
        className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden"
        style={{ perspective: "1000px" }}
      >
        {/* Title */}
        <motion.h1
          style={{ opacity: titleOpacity, y: titleY }}
          className="pointer-events-none absolute top-[16%] z-20 px-6 text-center text-3xl font-normal tracking-tight text-white sm:text-[2rem]"
        >
          <span
            className="font-serif"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Where are you{" "}
            <em className="italic text-neutral-300">in</em> your journey?
          </span>
        </motion.h1>

        {/* 3-card stage */}
        <motion.div
          className="relative z-10 flex flex-row items-center justify-center"
          style={{
            gap,
            scale: stageScale,
            opacity: stageOpacity,
            transformStyle: "preserve-3d",
          }}
        >
          {FACES.map((face) => (
            <FlipCard
              key={face.id}
              face={face}
              rotateY={rotateY}
              fan={fan}
            />
          ))}
        </motion.div>

        {/* End caption */}
        <motion.p
          style={{ opacity: captionOpacity, y: captionY }}
          className="pointer-events-none absolute bottom-[18%] z-20 text-center text-xl text-gray-400 sm:text-2xl"
        >
          <span
            className="font-serif"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            So cool, right?
          </span>
        </motion.p>

        {/* Scroll hint — only near start */}
        <motion.p
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute bottom-10 text-xs font-medium tracking-[0.2em] text-neutral-600 uppercase"
        >
          Scroll
        </motion.p>
      </div>
    </div>
  );
}
