"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { JOURNEY_CARDS, type Phase } from "./data";
import { LandscapePanels } from "./LandscapePanels";
import { JourneyCardFace } from "./JourneyCard";

const spring = { type: "spring" as const, stiffness: 280, damping: 26 };

/**
 * From the screen recording:
 * unified landscape → title + split panels → fanned 3D cards → exit → caption
 */
export default function JourneySplitScene() {
  const [phase, setPhase] = useState<Phase>("unified");
  const [split, setSplit] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const autoPlayed = useRef(false);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const go = useCallback(
    (next: Phase) => {
      setPhase(next);
      if (next === "unified") setSplit(0);
      if (next === "split") setSplit(1);
      if (next === "cards" || next === "exit" || next === "caption") setSplit(1);
    },
    []
  );

  /** Auto demo matching the recording cadence */
  const playSequence = useCallback(() => {
    clearTimers();
    go("unified");
    const steps: [number, Phase][] = [
      [600, "split"],
      [1800, "cards"],
      [4200, "exit"],
      [5200, "caption"],
      [7000, "unified"],
      [7800, "split"],
      [9000, "cards"],
      [11200, "exit"],
      [12200, "caption"],
    ];
    steps.forEach(([ms, p]) => {
      timers.current.push(setTimeout(() => go(p), ms));
    });
  }, [clearTimers, go]);

  useEffect(() => {
    if (autoPlayed.current) return;
    autoPlayed.current = true;
    const t = setTimeout(playSequence, 400);
    return () => {
      clearTimeout(t);
      clearTimers();
    };
  }, [playSequence, clearTimers]);

  const onHover = (hovering: boolean) => {
    if (phase === "cards" || phase === "exit" || phase === "caption") return;
    if (hovering) {
      clearTimers();
      go("split");
    } else if (phase === "split") {
      go("unified");
    }
  };

  const onActivate = () => {
    clearTimers();
    if (phase === "unified" || phase === "split") {
      go("cards");
      timers.current.push(setTimeout(() => go("exit"), 2800));
      timers.current.push(setTimeout(() => go("caption"), 3800));
    } else if (phase === "cards") {
      go("exit");
      timers.current.push(setTimeout(() => go("caption"), 900));
    } else {
      playSequence();
    }
  };

  const showLandscape = phase === "unified" || phase === "split";
  const showCards = phase === "cards" || phase === "exit";
  const showTitle =
    phase === "split" || phase === "cards" || phase === "exit";
  const showCaption = phase === "caption" || phase === "exit";

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black">
      {/* Soft frame markers like Framer preview */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-3 rounded-sm border border-dashed border-white/10"
      />
      {(["top", "bottom", "left", "right"] as const).map((edge) => (
        <span
          key={edge}
          aria-hidden
          className={`pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-white/40 ${
            edge === "top"
              ? "left-1/2 top-3 -translate-x-1/2"
              : edge === "bottom"
                ? "bottom-3 left-1/2 -translate-x-1/2"
                : edge === "left"
                  ? "left-3 top-1/2 -translate-y-1/2"
                  : "right-3 top-1/2 -translate-y-1/2"
          }`}
        />
      ))}

      {/* Title */}
      <div className="pointer-events-none absolute left-0 right-0 top-[18%] z-20 flex justify-center px-6">
        <AnimatePresence mode="wait">
          {showTitle && (
            <motion.h1
              key="title"
              initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
              animate={{ opacity: phase === "exit" ? 0.35 : 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={spring}
              className="text-center font-serif text-[clamp(1.5rem,3.2vw,2.15rem)] font-normal italic tracking-tight text-neutral-100"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Where are you{" "}
              <span className="italic text-neutral-300">in</span> your journey?
            </motion.h1>
          )}
        </AnimatePresence>
      </div>

      {/* Main stage */}
      <div
        className="relative z-10 flex w-full items-center justify-center px-6"
        style={{ perspective: 1400 }}
      >
        <AnimatePresence mode="wait">
          {showLandscape && (
            <motion.div
              key="landscape"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <LandscapePanels
                split={split}
                onHoverChange={onHover}
                onActivate={onActivate}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showCards && (
            <motion.div
              key="cards"
              className="absolute inset-0 flex items-center justify-center gap-5"
              style={{ transformStyle: "preserve-3d" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {JOURNEY_CARDS.map((card, i) => (
                <JourneyCardFace
                  key={card.id}
                  card={card}
                  index={i}
                  phase={phase === "exit" ? "exit" : "cards"}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Captions */}
      <div className="pointer-events-none absolute bottom-[22%] left-0 right-0 z-20 flex justify-center">
        <AnimatePresence mode="wait">
          {showCaption && phase === "caption" && (
            <motion.p
              key="cool"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={spring}
              className="font-serif text-xl text-neutral-200 sm:text-2xl"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              So cool, right?
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center">
        <AnimatePresence>
          {phase === "caption" && (
            <motion.p
              key="scroll-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.2, times: [0, 0.2, 0.7, 1], delay: 0.4 }}
              className="font-serif text-3xl text-neutral-200"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Scroll
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 z-30 flex items-center gap-3">
        <button
          type="button"
          onClick={playSequence}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-neutral-400 transition-colors hover:border-white/20 hover:text-white"
        >
          Replay
        </button>
        <button
          type="button"
          onClick={onActivate}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-neutral-400 transition-colors hover:border-white/20 hover:text-white"
        >
          {phase === "cards" ? "Dismiss" : "Advance"}
        </button>
      </div>

      <a
        href="/lab"
        className="absolute bottom-5 left-5 z-30 text-xs text-neutral-600 underline-offset-2 hover:text-neutral-400 hover:underline"
      >
        ← Back to Lab
      </a>
    </div>
  );
}
