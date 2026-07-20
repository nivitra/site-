"use client";

import { motion, useReducedMotion } from "framer-motion";

export type BlindDirection = "left" | "right" | "up" | "down";
export type BlindMode = "out" | "in-out";

type Props = {
  children: string;
  /** Accent color of the blind strip */
  color: string;
  direction?: BlindDirection;
  mode?: BlindMode;
  /** Stagger delay in seconds */
  delay?: number;
  className?: string;
  /** Trigger when parent is in view — controlled by parent via `active` */
  active: boolean;
};

/**
 * One text line with a colored blind that covers then reveals.
 * - out: starts covered, blind exits in `direction`
 * - in-out: blind sweeps in, then out (two-phase)
 */
export function BlindsLine({
  children,
  color,
  direction = "right",
  mode = "out",
  delay = 0,
  className = "",
  active,
}: Props) {
  const reduce = useReducedMotion();

  // Transform origin / exit vector
  const isHorizontal = direction === "left" || direction === "right";
  const origin =
    direction === "right"
      ? "left center"
      : direction === "left"
        ? "right center"
        : direction === "down"
          ? "center top"
          : "center bottom";

  // Covered = scale 1 on the exit axis; revealed = 0
  const covered = isHorizontal
    ? { scaleX: 1, scaleY: 1 }
    : { scaleX: 1, scaleY: 1 };
  const open = isHorizontal
    ? { scaleX: 0, scaleY: 1 }
    : { scaleX: 1, scaleY: 0 };

  const duration = 0.55;
  const ease = [0.22, 1, 0.36, 1] as const;

  let animate: Record<string, number | number[]> = open;
  let transition: Record<string, unknown> = {
    duration,
    delay,
    ease,
  };

  if (reduce) {
    animate = open;
  } else if (mode === "in-out") {
    // Phase 1: empty → covered, Phase 2: covered → open
    if (isHorizontal) {
      animate = { scaleX: [0, 1, 1, 0] };
      transition = {
        duration: duration * 1.6,
        delay,
        times: [0, 0.35, 0.5, 1],
        ease,
      };
    } else {
      animate = { scaleY: [0, 1, 1, 0] };
      transition = {
        duration: duration * 1.6,
        delay,
        times: [0, 0.35, 0.5, 1],
        ease,
      };
    }
  } else {
    // out: start covered when active becomes true
    animate = active ? open : covered;
    transition = { duration, delay, ease };
  }

  return (
    <span
      className={`relative inline-block overflow-hidden align-top ${className}`}
    >
      <span className="relative z-0">{children}</span>
      <motion.span
        aria-hidden
        className="absolute inset-y-0 left-0 z-10 block w-full"
        style={{
          backgroundColor: color,
          transformOrigin: origin,
          // slight pad so descenders stay covered
          top: "-4%",
          bottom: "-8%",
          height: "auto",
        }}
        initial={mode === "in-out" ? open : covered}
        animate={active ? animate : mode === "in-out" ? open : covered}
        transition={transition}
      />
    </span>
  );
}
