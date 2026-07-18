"use client";

import { useEffect, useRef, type ReactNode, type ElementType } from "react";
import { createTimeline, splitText, stagger } from "animejs";

/**
 * Cascading word (or character) entrance powered by anime.js splitText.
 * Fires once on mount or when scrolled into view. Accessible mode keeps
 * original text available to screen readers.
 */
export default function SplitReveal({
  children,
  className = "",
  as: Tag = "div",
  mode = "words",
  delay = 0,
  staggerMs = 55,
  y = 28,
  once = true,
  onMount = true,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  mode?: "words" | "chars";
  delay?: number;
  staggerMs?: number;
  y?: number;
  once?: boolean;
  /** If false, waits for intersection instead of animating on mount */
  onMount?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let split: ReturnType<typeof splitText> | null = null;
    let tl: ReturnType<typeof createTimeline> | null = null;
    let played = false;

    const run = () => {
      if (played && once) return;
      played = true;

      try {
        split = splitText(el, {
          words: true,
          chars: mode === "chars",
          accessible: true,
        });
      } catch {
        return;
      }

      const targets = (mode === "chars" ? split.chars : split.words) as HTMLElement[];
      if (!targets?.length) return;

      targets.forEach((t) => {
        t.style.opacity = "0";
        t.style.transform = `translateY(${y}px)`;
        t.style.willChange = "transform, opacity";
        t.style.display = "inline-block";
      });

      tl = createTimeline({
        defaults: { ease: "out(3)" },
        onComplete: () => {
          targets.forEach((t) => {
            t.style.willChange = "auto";
          });
        },
      });

      tl.add(
        targets,
        {
          opacity: [0, 1],
          translateY: [y, 0],
          duration: 720,
          delay: stagger(staggerMs, { start: delay }),
        },
        0
      );
    };

    if (onMount) {
      const id = requestAnimationFrame(() => run());
      return () => {
        cancelAnimationFrame(id);
        tl?.pause();
        split?.revert();
      };
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (once) io.disconnect();
        run();
      },
      { threshold: 0.2, rootMargin: "-40px" }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      tl?.pause();
      split?.revert();
    };
  }, [mode, delay, staggerMs, y, once, onMount]);

  const Component = Tag as ElementType;
  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}
