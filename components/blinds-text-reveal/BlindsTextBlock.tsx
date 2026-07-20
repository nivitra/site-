"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import {
  BlindsLine,
  type BlindDirection,
  type BlindMode,
} from "./BlindsLine";

type Props = {
  lines: string[];
  color: string;
  /** Base direction, or "alternate" for odd/even opposite */
  direction?: BlindDirection | "alternate";
  mode?: BlindMode;
  className?: string;
  lineClassName?: string;
  stagger?: number;
};

export function BlindsTextBlock({
  lines,
  color,
  direction = "right",
  mode = "out",
  className = "",
  lineClassName = "",
  stagger = 0.08,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { once: true, amount: 0.45, margin: "-8% 0px" });

  const dirFor = (i: number): BlindDirection => {
    if (direction === "alternate") {
      return i % 2 === 0 ? "right" : "left";
    }
    return direction;
  };

  return (
    <div ref={ref} className={`flex flex-col items-center ${className}`}>
      {lines.map((line, i) => (
        <BlindsLine
          key={`${i}-${line.slice(0, 12)}`}
          color={color}
          direction={dirFor(i)}
          mode={mode}
          delay={i * stagger}
          active={active}
          className={`max-w-full text-center ${lineClassName}`}
        >
          {line}
        </BlindsLine>
      ))}
    </div>
  );
}
