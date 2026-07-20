"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { PreviewLink } from "./data";

type Props = {
  link: PreviewLink;
};

/**
 * Bold white link that shows a floating screenshot card on hover.
 * Preview is portaled to document.body so it never nests a <div> inside <p>.
 */
export function HoverPreviewLink({ link }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const anchorRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const measure = useCallback((clientX?: number) => {
    const el = anchorRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mid = r.left + r.width / 2;
    const offset = clientX !== undefined ? (clientX - mid) * 0.12 : 0;
    setPos({
      x: mid + offset,
      y: r.top,
    });
  }, []);

  const onEnter = (e: MouseEvent) => {
    measure(e.clientX);
    setOpen(true);
  };

  const onMove = (e: MouseEvent) => {
    measure(e.clientX);
  };

  const preview =
    mounted &&
    createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            key={link.id}
            className="pointer-events-none fixed z-[100] w-[min(72vw,320px)]"
            style={{
              left: pos.x,
              top: pos.y,
              translateX: "-50%",
              translateY: "-100%",
            }}
            initial={{ opacity: 0, scale: 0.88, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: -14 }}
            exit={{ opacity: 0, scale: 0.94, y: 8 }}
            transition={{ type: "spring", stiffness: 380, damping: 28, mass: 0.7 }}
          >
            <div className="overflow-hidden rounded-xl border-[3px] border-white bg-neutral-900 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.85)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={link.preview}
                alt={link.previewAlt}
                width={320}
                height={200}
                className="block h-auto w-full object-cover"
                draggable={false}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    );

  return (
    <>
      <a
        ref={anchorRef}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={onEnter}
        onMouseMove={onMove}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => {
          measure();
          setOpen(true);
        }}
        onBlur={() => setOpen(false)}
        className="relative inline font-semibold text-white underline decoration-transparent underline-offset-4 transition-colors hover:decoration-white/40"
      >
        {link.label}
      </a>
      {preview}
    </>
  );
}
