"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";

/**
 * Exact scroll choreography from the recording:
 *
 * 0.00–0.08  SCROLL label on black
 * 0.05–0.22  2×2 collage rises & grows into view
 * 0.18–0.40  Scale ramps hard → one cell fills the viewport (dive in)
 * 0.38–0.52  Pull back through the 2×2
 * 0.48–0.58  REMIX label beat
 * 0.55–0.78  Second dive (scale up again)
 * 0.75–0.90  Pull back
 * 0.88–1.00  REMIX end card
 *
 * Sticky stage + tall scroller so wheel/trackpad feel continuous.
 */

const IMAGES = [
  { id: "device", src: "/lab/scroll-zoom/device.jpg", alt: "Metallic device on pink" },
  { id: "cube", src: "/lab/scroll-zoom/cube.jpg", alt: "Red geometric frame" },
  { id: "blocks", src: "/lab/scroll-zoom/blocks.jpg", alt: "Blue abstract blocks" },
  { id: "face", src: "/lab/scroll-zoom/face.jpg", alt: "Portrait with contour lines" },
] as const;

export default function ScrollZoomGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth but still tight to the wheel (recording feels responsive)
  const p = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 32,
    restDelta: 0.0005,
  });

  /*
   * Scale curve — keyframed to match the dive-in / pull-out loop.
   * ~0.22 = collage ~viewport sized; ~4.2 = single tile fills screen.
   */
  const scale = useTransform(
    p,
    [0, 0.05, 0.12, 0.26, 0.38, 0.48, 0.56, 0.7, 0.82, 0.9, 1],
    [0.16, 0.2, 0.62, 4.6, 1.05, 0.38, 0.58, 4.6, 0.95, 0.36, 0.26]
  );

  // Rise from below on first approach (matches strip entering from bottom)
  const y = useTransform(p, [0, 0.06, 0.14], [220, 100, 0]);

  // Bias zoom into top-left tile (device) — recording dives into that image
  const originX = useTransform(p, [0.15, 0.28, 0.4, 0.55, 0.7, 0.82], [50, 28, 25, 50, 28, 50]);
  const originY = useTransform(p, [0.15, 0.28, 0.4, 0.55, 0.7, 0.82], [50, 28, 25, 50, 28, 50]);
  const transformOrigin = useTransform(
    [originX, originY],
    ([ox, oy]: number[]) => `${ox}% ${oy}%`
  );

  // Gap between tiles tightens at peak zoom
  const gap = useTransform(p, [0, 0.18, 0.32, 0.48, 0.68, 1], [12, 8, 2, 12, 2, 14]);

  // Labels
  const scrollOpacity = useTransform(
    p,
    [0, 0.02, 0.07, 0.11, 0.48, 0.52, 0.56, 0.6],
    [1, 1, 1, 0, 0, 1, 1, 0]
  );
  const remixOpacity = useTransform(
    p,
    [0.42, 0.48, 0.54, 0.58, 0.88, 0.94, 1],
    [0, 1, 1, 0, 0, 1, 1]
  );

  // Dim collage under pure text beats
  const gridOpacity = useTransform(
    p,
    [0, 0.05, 0.1, 0.44, 0.48, 0.56, 0.6, 0.9, 0.95],
    [0, 0.4, 1, 1, 0.15, 0.15, 1, 1, 0.25]
  );

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-black">
      {/* Sticky cinematic stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Top chrome — matches Framer bar in the recording */}
        <header className="absolute inset-x-0 top-0 z-40 flex h-12 items-center justify-between border-b border-white/[0.06] bg-[#141414]/90 px-4 backdrop-blur-md sm:px-5">
          <Link
            href="/lab"
            className="flex h-8 w-8 items-center justify-center rounded-md text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Back to Lab"
          >
            {/* Abstract mark like the recording */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M4 6c0-1.1.9-2 2-2h3l2 3H6v11h12V10h-3l2-3h3c1.1 0 2 .9 2 2v11c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V6z" />
            </svg>
          </Link>
          <div className="flex items-center gap-2">
            <a
              href="https://www.framer.com/marketplace/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-3 py-1.5 text-sm text-neutral-300 transition-colors hover:text-white"
            >
              Original
            </a>
            <Link
              href="/lab"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#2f6bff] px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
              Remix
            </Link>
          </div>
        </header>

        {/* Center stage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative grid grid-cols-2 will-change-transform"
            style={{
              scale,
              y,
              gap,
              opacity: gridOpacity,
              width: "min(92vw, 920px)",
              height: "min(78vh, 720px)",
              transformOrigin,
            }}
          >
            {IMAGES.map((img) => (
              <div
                key={img.id}
                className="relative h-full w-full overflow-hidden bg-neutral-900"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  draggable={false}
                  className="pointer-events-none h-full w-full select-none object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* SCROLL label */}
        <motion.p
          style={{ opacity: scrollOpacity }}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
        >
          <span className="text-[13px] font-semibold tracking-[0.35em] text-neutral-300 sm:text-sm">
            SCROLL
          </span>
        </motion.p>

        {/* REMIX label */}
        <motion.p
          style={{ opacity: remixOpacity }}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
        >
          <span className="text-[13px] font-semibold tracking-[0.35em] text-neutral-300 sm:text-sm">
            REMIX
          </span>
        </motion.p>
      </div>
    </div>
  );
}
