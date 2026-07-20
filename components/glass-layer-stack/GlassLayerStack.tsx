"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LAYERS, SCROLL_STEP_VH } from "./data";
import { GlassPlate, PLATE_GAP } from "./GlassPlate";

const fade = { duration: 0.48, ease: [0.22, 1, 0.36, 1] as const };

/**
 * Exact glass layer stack from the recording (dark studio).
 * Sticky scroll advances active layer; text ghost-crossfades.
 */
export function GlassLayerStack() {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const n = LAYERS.length;
  const layer = LAYERS[active];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = scrolled / total;
      const idx = Math.min(n - 1, Math.floor(p * n + 0.001));
      setActive(idx);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [n]);

  const select = useCallback(
    (i: number) => {
      const idx = Math.max(0, Math.min(n - 1, i));
      setActive(idx);
      const el = trackRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const top =
        el.getBoundingClientRect().top +
        window.scrollY +
        (idx / n) * total +
        2;
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    },
    [n, reduce]
  );

  const stackH = 300 + (n - 1) * PLATE_GAP + 40;

  return (
    <div
      ref={trackRef}
      className="relative w-full"
      style={{ height: `${n * SCROLL_STEP_VH}vh` }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden bg-black">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 px-6 lg:grid-cols-2 lg:gap-6 lg:px-12 xl:px-16">
          {/* Stack — left, matching recording composition */}
          <div
            className="relative mx-auto flex w-full max-w-[560px] items-center justify-center lg:mx-0 lg:justify-start"
            style={{
              height: Math.min(stackH + 80, 560),
              perspective: "1800px",
              perspectiveOrigin: "45% 35%",
            }}
          >
            <div
              className="relative"
              style={{
                width: 300,
                height: stackH,
                transformStyle: "preserve-3d",
                // Diamond isometric — matches recording camera
                transform:
                  "translateX(4%) rotateX(52deg) rotateZ(45deg) scale(1.18)",
              }}
            >
              {LAYERS.map((l, i) => (
                <GlassPlate
                  key={l.id}
                  index={i}
                  total={n}
                  active={i === active}
                  color={l.color}
                  rim={l.rim}
                  glow={l.glow}
                  onSelect={() => select(i)}
                />
              ))}
            </div>
          </div>

          {/* Copy — right */}
          <div className="relative w-full max-w-md justify-self-center lg:justify-self-end lg:pr-4">
            <div className="relative min-h-[280px]">
              <AnimatePresence mode="sync" initial={false}>
                <motion.div
                  key={layer.id}
                  className="absolute inset-x-0 top-0"
                  initial={
                    reduce
                      ? { opacity: 1 }
                      : { opacity: 0, y: 14, filter: "blur(6px)" }
                  }
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={
                    reduce
                      ? { opacity: 0 }
                      : { opacity: 0, y: -10, filter: "blur(5px)" }
                  }
                  transition={reduce ? { duration: 0 } : fade}
                >
                  <h2 className="whitespace-pre-line text-[clamp(1.9rem,3.6vw,2.6rem)] font-semibold leading-[1.1] tracking-tight text-white">
                    {layer.title}
                  </h2>
                  <div className="mt-6 h-px w-full bg-white/[0.14]" />
                  <p className="mt-6 text-[15px] leading-[1.72] text-[#8a9098] sm:text-[15.5px]">
                    {layer.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-12 flex gap-2">
              {LAYERS.map((l, i) => (
                <button
                  key={l.id}
                  type="button"
                  aria-label={l.title.replace(/\n/g, " ")}
                  onClick={() => select(i)}
                  className="h-1 rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? 28 : 8,
                    background:
                      i === active ? l.color : "rgba(255,255,255,0.14)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GlassLayerStack;
