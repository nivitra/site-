"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { useReducedMotion } from "framer-motion";
import {
  DEMO_DURATION_S,
  PLAYHEAD_RED,
  WAVEFORM_HEIGHTS,
} from "./data";

/**
 * Light audio waveform player (white version):
 * - Soft white neumorphic pill + circular play/pause
 * - Waveform bars (played = near-black, unplayed = soft gray)
 * - Red playhead line with bottom triangle tip + soft red glow
 * - Autoplay / loop / scrub on track click-drag
 */
export function AudioWaveformPlayer({
  duration = DEMO_DURATION_S,
  autoPlay = true,
  loop = true,
  className = "",
}: {
  duration?: number;
  autoPlay?: boolean;
  loop?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const scrubbingRef = useRef(false);

  const [playing, setPlaying] = useState(Boolean(autoPlay && !reduce));
  const [progress, setProgress] = useState(0); // 0–1

  useEffect(() => {
    if (!playing || reduce) {
      lastTsRef.current = null;
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    const tick = (ts: number) => {
      if (scrubbingRef.current) {
        lastTsRef.current = ts;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const last = lastTsRef.current ?? ts;
      const dt = (ts - last) / 1000;
      lastTsRef.current = ts;

      setProgress((p) => {
        let next = p + dt / duration;
        if (next >= 1) {
          if (loop) return next % 1;
          setPlaying(false);
          return 1;
        }
        return next;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [playing, duration, loop, reduce]);

  const progressFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - r.left, 0), r.width);
    return r.width > 0 ? x / r.width : 0;
  }, []);

  const onTrackPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    scrubbingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setProgress(progressFromClientX(e.clientX));
  };

  const onTrackPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!scrubbingRef.current) return;
    setProgress(progressFromClientX(e.clientX));
  };

  const endScrub = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!scrubbingRef.current) return;
    scrubbingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  const toggle = () => {
    if (progress >= 1 && !playing) setProgress(0);
    setPlaying((v) => !v);
  };

  const bars = WAVEFORM_HEIGHTS;
  const n = bars.length;
  const pct = `${progress * 100}%`;

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-[1.85rem] bg-white p-[7px] pr-2 ${className}`}
      role="group"
      aria-label="Audio waveform player"
      style={{
        boxShadow:
          "0 18px 50px -18px rgba(15,15,20,0.18), 0 1px 0 rgba(255,255,255,0.9) inset, 0 0 0 1px rgba(15,15,20,0.06)",
      }}
    >
      {/* Play / Pause — soft raised white circle */}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause" : "Play"}
        className="relative flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full bg-white transition-transform active:scale-[0.96]"
        style={{
          boxShadow:
            "0 2px 8px rgba(15,15,20,0.08), 0 1px 0 rgba(255,255,255,1) inset, 0 0 0 1px rgba(15,15,20,0.08)",
        }}
      >
        {playing ? (
          <span className="flex items-center gap-[5px]" aria-hidden>
            <span className="h-3.5 w-[3.5px] rounded-[1px] bg-[#1a1a1a]" />
            <span className="h-3.5 w-[3.5px] rounded-[1px] bg-[#1a1a1a]" />
          </span>
        ) : (
          <span
            className="ml-[2px] block h-0 w-0"
            style={{
              borderTop: "7px solid transparent",
              borderBottom: "7px solid transparent",
              borderLeft: "12px solid #1a1a1a",
            }}
            aria-hidden
          />
        )}
      </button>

      {/* Waveform track — soft light well */}
      <div
        ref={trackRef}
        className="relative h-[50px] w-[min(220px,56vw)] cursor-pointer touch-none select-none overflow-visible rounded-[1.25rem] sm:w-[232px]"
        style={{
          background: "linear-gradient(180deg, #f4f4f5 0%, #ececee 100%)",
          boxShadow:
            "inset 0 1px 2px rgba(15,15,20,0.06), inset 0 0 0 1px rgba(15,15,20,0.05)",
        }}
        onPointerDown={onTrackPointerDown}
        onPointerMove={onTrackPointerMove}
        onPointerUp={endScrub}
        onPointerCancel={endScrub}
        role="slider"
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
      >
        {/* Bars */}
        <div className="absolute inset-0 flex items-center justify-between px-3.5">
          {bars.map((h, i) => {
            const barCenter = (i + 0.5) / n;
            const played = barCenter <= progress;
            return (
              <span
                key={i}
                className="w-[2px] shrink-0 rounded-full"
                style={{
                  height: `${Math.max(h * 100, 10)}%`,
                  backgroundColor: played
                    ? "rgba(18,18,20,0.92)"
                    : "rgba(18,18,20,0.16)",
                }}
              />
            );
          })}
        </div>

        {/* Soft red ambient glow */}
        <div
          className="pointer-events-none absolute top-1/2 z-10 h-[130%] w-12 -translate-x-1/2 -translate-y-1/2"
          style={{
            left: pct,
            background: `radial-gradient(ellipse 45% 58% at 50% 50%, ${PLAYHEAD_RED}55 0%, ${PLAYHEAD_RED}22 42%, transparent 70%)`,
            filter: "blur(5px)",
          }}
        />

        {/* Playhead: line + triangular tip */}
        <div
          className="pointer-events-none absolute top-[2px] bottom-0 z-20 -translate-x-1/2"
          style={{ left: pct }}
        >
          <div
            className="absolute left-1/2 top-0 bottom-[3px] w-[1.75px] -translate-x-1/2 rounded-full"
            style={{
              backgroundColor: PLAYHEAD_RED,
              boxShadow: `0 0 7px 1px ${PLAYHEAD_RED}99`,
            }}
          />
          <div
            className="absolute bottom-[-1px] left-1/2 -translate-x-1/2"
            style={{
              width: 0,
              height: 0,
              borderLeft: "4px solid transparent",
              borderRight: "4px solid transparent",
              borderTop: `5.5px solid ${PLAYHEAD_RED}`,
              filter: `drop-shadow(0 0 2px ${PLAYHEAD_RED})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default AudioWaveformPlayer;
