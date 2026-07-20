"use client";

import { motion } from "framer-motion";

const spring = {
  type: "spring" as const,
  stiffness: 280,
  damping: 30,
  mass: 0.9,
};

const SIZE = 310;
/** Vertical gap between plates in isometric parent space */
export const PLATE_GAP = 62;

/**
 * Flat glossy slab (matches recording material).
 * Thickness = offset under-plate + soft rim, not broken CSS cube faces.
 */
export function GlassPlate({
  index,
  total,
  active,
  color,
  rim,
  glow,
  onSelect,
}: {
  index: number;
  total: number;
  active: boolean;
  color: string;
  rim: string;
  glow: string;
  onSelect: () => void;
}) {
  // Active plate lifts — top-active has the big air gap from the recording
  const y = index * PLATE_GAP + (active ? -14 : 0);

  return (
    <motion.button
      type="button"
      aria-label={`Layer ${index + 1}`}
      aria-pressed={active}
      onClick={onSelect}
      className="absolute left-1/2 top-0 border-0 bg-transparent p-0 outline-none"
      style={{
        width: SIZE,
        height: SIZE,
        marginLeft: -SIZE / 2,
        transformStyle: "preserve-3d",
        zIndex: active ? total + 5 : total - index,
        cursor: "pointer",
      }}
      initial={false}
      animate={{ y, z: active ? 16 : 0 }}
      transition={spring}
    >
      {/* Contact shadow */}
      <div
        className="pointer-events-none absolute inset-[12%] rounded-[1.6rem]"
        style={{
          transform: "translateY(18px) translateZ(-2px)",
          background: active ? glow : "rgba(0,0,0,0.55)",
          filter: "blur(16px)",
          opacity: active ? 0.7 : 0.45,
        }}
      />

      {/* Thickness extrusion — double offset layers for tray edge */}
      <div
        className="absolute inset-0 rounded-[1.65rem]"
        style={{
          transform: "translateY(11px)",
          background: active ? color : "#101010",
          filter: "brightness(0.55)",
        }}
      />
      <div
        className="absolute inset-0 rounded-[1.65rem]"
        style={{
          transform: "translateY(6px)",
          background: active
            ? `linear-gradient(160deg, ${rim} 0%, ${color} 55%, #04304a 100%)`
            : "linear-gradient(160deg, #333 0%, #181818 100%)",
          boxShadow: active ? `0 0 28px ${glow}` : "0 10px 22px rgba(0,0,0,0.5)",
        }}
      />

      {/* Main face */}
      <motion.div
        className="absolute inset-0 rounded-[1.65rem]"
        style={{
          background: active
            ? `linear-gradient(148deg, ${rim} 0%, ${color} 30%, ${color} 70%, color-mix(in srgb, ${color} 70%, #000) 100%)`
            : "linear-gradient(148deg, #2c2c2c 0%, #1b1b1b 42%, #141414 100%)",
          boxShadow: active
            ? `inset 0 1.5px 0 rgba(255,255,255,0.42), inset 0 -1px 0 rgba(0,0,0,0.18)`
            : `inset 0 1px 0 rgba(255,255,255,0.09), inset 0 -1px 0 rgba(0,0,0,0.55)`,
        }}
        animate={{ filter: active ? "brightness(1.05)" : "brightness(1)" }}
        transition={spring}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[1.65rem]"
          style={{
            background: active
              ? "linear-gradient(120deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 26%, transparent 50%)"
              : "linear-gradient(120deg, rgba(255,255,255,0.1) 0%, transparent 38%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-[1px] rounded-[1.6rem]"
          style={{
            boxShadow: active
              ? `inset 0 0 0 1px ${rim}44`
              : "inset 0 0 0 1px rgba(255,255,255,0.05)",
          }}
        />
      </motion.div>
    </motion.button>
  );
}
