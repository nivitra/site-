"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Move } from "lucide-react";
import Link from "next/link";
import { CANVAS, GALLERY_ITEMS, type GalleryItem } from "./data";
import { GalleryItemCard } from "./GalleryItemCard";

export type DragScrollGalleryProps = {
  items?: GalleryItem[];
  canvas?: { width: number; height: number };
  /** Back link */
  backHref?: string;
  backLabel?: string;
  eyebrow?: string;
  /** Overlay above the canvas (e.g. shimmer stats) */
  overlay?: ReactNode;
  /** Content painted inside the canvas (e.g. region markers) */
  canvasChrome?: ReactNode;
  /** Hint copy */
  hint?: string;
  className?: string;
};

/**
 * Freeform drag/scroll gallery. Defaults to lab art set;
 * pass items + canvas for languages explore, etc.
 */
export default function DragScrollGallery({
  items = GALLERY_ITEMS,
  canvas = CANVAS,
  backHref = "/lab",
  backLabel = "← Lab",
  eyebrow = "Freeform gallery",
  overlay,
  canvasChrome,
  hint = "SCROLL/DRAG TO MOVE",
  className = "",
}: DragScrollGalleryProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const [hintVisible, setHintVisible] = useState(true);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 28, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 180, damping: 28, mass: 0.6 });

  const clamp = useCallback(
    (vx: number, vy: number) => {
      const el = viewportRef.current;
      if (!el) return { x: vx, y: vy };
      const maxX = 0;
      const maxY = 0;
      const minX = Math.min(0, -(canvas.width - el.clientWidth));
      const minY = Math.min(0, -(canvas.height - el.clientHeight));
      return {
        x: Math.min(maxX, Math.max(minX, vx)),
        y: Math.min(maxY, Math.max(minY, vy)),
      };
    },
    [canvas.width, canvas.height]
  );

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const cx = -(canvas.width - el.clientWidth) / 2;
    const cy = -(canvas.height - el.clientHeight) / 2;
    const c = clamp(cx, cy);
    x.set(c.x);
    y.set(c.y);
  }, [clamp, x, y, canvas.width, canvas.height]);

  const panBy = useCallback(
    (dx: number, dy: number) => {
      const next = clamp(x.get() + dx, y.get() + dy);
      x.set(next.x);
      y.set(next.y);
      if (hintVisible) setHintVisible(false);
    },
    [clamp, x, y, hintVisible]
  );

  const onPointerDown = (e: ReactPointerEvent) => {
    if (e.button !== 0) return;
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    document.body.style.cursor = "grabbing";
  };

  const onPointerMove = (e: ReactPointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    panBy(dx, dy);
  };

  const onPointerUp = (e: ReactPointerEvent) => {
    dragging.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
    document.body.style.cursor = "";
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const step = 48;
      if (e.key === "ArrowLeft") panBy(step, 0);
      if (e.key === "ArrowRight") panBy(-step, 0);
      if (e.key === "ArrowUp") panBy(0, step);
      if (e.key === "ArrowDown") panBy(0, -step);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panBy]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheelNative = (e: WheelEvent) => {
      e.preventDefault();
      panBy(-e.deltaX, -e.deltaY);
    };
    el.addEventListener("wheel", onWheelNative, { passive: false });
    return () => el.removeEventListener("wheel", onWheelNative);
  }, [panBy]);

  return (
    <div className={`fixed inset-0 z-[80] bg-black ${className}`}>
      <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-4">
        <Link
          href={backHref}
          className="text-xs text-neutral-500 transition-colors hover:text-neutral-300"
        >
          {backLabel}
        </Link>
        <span className="text-[11px] tracking-wide text-neutral-600">
          {eyebrow}
        </span>
      </div>

      {overlay}

      <div
        ref={viewportRef}
        className="absolute inset-0 cursor-grab touch-none overflow-hidden active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="application"
        aria-label="Draggable gallery. Scroll or drag to explore."
      >
        <motion.div
          className="relative will-change-transform"
          style={{
            width: canvas.width,
            height: canvas.height,
            x: springX,
            y: springY,
          }}
        >
          {canvasChrome}
          {items.map((item) => (
            <GalleryItemCard key={item.id} item={item} />
          ))}
        </motion.div>
      </div>

      <div
        className={`pointer-events-none absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-white transition-opacity duration-500 ${
          hintVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <Move className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
        {hint}
      </div>
    </div>
  );
}
