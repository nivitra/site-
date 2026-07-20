"use client";

import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  buildBars,
  NEW_FOLLOWERS,
  TOTAL_FOLLOWERS,
} from "./data";

/**
 * Interactive bar chart card — hover/drag scrubber with floating value pill.
 * Matches the "Followers Trend" component from the recording.
 */
export function FollowersTrendCard() {
  const bars = useMemo(() => buildBars(), []);
  const max = useMemo(
    () => Math.max(...bars.map((b) => b.value)),
    [bars]
  );
  const chartRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const setFromClientX = useCallback(
    (clientX: number) => {
      const el = chartRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = Math.min(Math.max(clientX - r.left, 0), r.width);
      const idx = Math.min(
        bars.length - 1,
        Math.max(0, Math.floor((x / r.width) * bars.length))
      );
      setActive(idx);
    },
    [bars.length]
  );

  const onPointerMove = (e: ReactPointerEvent) => {
    setFromClientX(e.clientX);
  };

  const activeBar = active !== null ? bars[active] : null;
  const activePct =
    active !== null ? ((active + 0.5) / bars.length) * 100 : 0;

  return (
    <div className="w-[min(100%,320px)] rounded-[1.35rem] bg-[#141414] p-5 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)] ring-1 ring-white/[0.06] sm:p-6">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-[1.35rem] font-semibold leading-tight tracking-tight text-white">
            Followers
          </h2>
          <p className="text-[1.2rem] font-medium leading-tight text-neutral-500">
            Trend
          </p>
        </div>
        <button
          type="button"
          aria-label="Open details"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>

      {/* Chart */}
      <div
        ref={chartRef}
        className="relative h-[140px] cursor-crosshair touch-none select-none"
        onPointerEnter={onPointerMove}
        onPointerMove={onPointerMove}
        onPointerLeave={() => setActive(null)}
        onPointerDown={(e) => {
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          setFromClientX(e.clientX);
        }}
      >
        {/* Bars */}
        <div className="absolute inset-x-0 bottom-7 top-6 flex items-end gap-[3px]">
          {bars.map((b, i) => {
            const h = (b.value / max) * 100;
            const isActive = active === i;
            return (
              <div
                key={i}
                className="relative flex h-full min-w-0 flex-1 items-end justify-center"
              >
                <motion.div
                  className="w-full max-w-[6px] rounded-full"
                  style={{
                    height: `${h}%`,
                    backgroundColor: isActive
                      ? "rgba(255,255,255,0.95)"
                      : "rgba(255,255,255,0.18)",
                  }}
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              </div>
            );
          })}
        </div>

        {/* Scrubber + tooltip */}
        <AnimatePresence>
          {active !== null && activeBar && (
            <motion.div
              key="scrub"
              className="pointer-events-none absolute bottom-7 top-0"
              style={{ left: `${activePct}%` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
            >
              {/* value pill */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold tabular-nums text-black shadow-sm"
                style={{
                  top: `calc(${6 + (1 - activeBar.value / max) * 100}% - 28px)`,
                }}
                initial={{ y: 4, scale: 0.9 }}
                animate={{ y: 0, scale: 1 }}
              >
                {activeBar.value}
              </motion.div>
              {/* vertical guide — double line look from recording */}
              <div className="absolute bottom-0 left-1/2 top-6 flex -translate-x-1/2 gap-px">
                <span className="h-full w-px bg-white" />
                <span className="h-full w-px bg-white/70" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Month labels */}
        <div className="absolute inset-x-0 bottom-0 flex justify-between px-0.5 text-[11px] text-neutral-500">
          {["Feb", "Mar", "Apr", "May", "Jun"].map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>

      {/* Footer stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/[0.06] pt-5">
        <div>
          <p className="text-[10px] font-medium tracking-[0.14em] text-neutral-500 uppercase">
            Total Followers
          </p>
          <p className="mt-1 text-[1.75rem] font-semibold tabular-nums tracking-tight text-white">
            {TOTAL_FOLLOWERS}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-medium tracking-[0.14em] text-neutral-500 uppercase">
            New Followers
          </p>
          <p className="mt-1 text-[1.75rem] font-semibold tabular-nums tracking-tight text-white">
            {NEW_FOLLOWERS}
          </p>
        </div>
      </div>
    </div>
  );
}
