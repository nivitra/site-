"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mouse } from "lucide-react";
import { WaveBackground } from "./WaveBackground";
import { BlindsTextBlock } from "./BlindsTextBlock";

const BLUE = "#3b82f6";
const PURPLE = "#a78bfa";
const MAGENTA = "#e879f9";

function SectionLabel({
  children,
  color,
}: {
  children: string;
  color: string;
}) {
  return (
    <p
      className="mb-8 text-center text-sm font-medium"
      style={{ color }}
    >
      {children}
    </p>
  );
}

/**
 * Exact recreation of the Framer "Blinds Text Reveal" demo:
 * hero + three scroll sections with per-line colored blinds.
 */
export default function BlindsTextRevealPage() {
  return (
    <div className="relative min-h-screen bg-[#f7f7f5] text-neutral-700">
      <WaveBackground />

      {/* Fixed lab nav */}
      <div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-5 py-4">
        <Link
          href="/lab"
          className="text-xs text-neutral-400 transition-colors hover:text-neutral-700"
        >
          ← Lab
        </Link>
        <span className="text-[11px] text-neutral-400">Blinds Text Reveal</span>
      </div>

      {/* ── Hero ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-24 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-w-xl flex-col items-center text-center"
        >
          <h1 className="text-[clamp(2.5rem,6vw,3.75rem)] font-semibold leading-[1.08] tracking-tight text-neutral-800">
            Blinds Text
            <br />
            Reveal
          </h1>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-neutral-500">
            A text effect that hides each line,
            <br />
            then opens to reveal it.
          </p>
          <a
            href="https://www.framer.com/marketplace/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center rounded-full bg-[#6ba4f8] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
          >
            Remix project
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute bottom-10 flex flex-col items-center gap-2 text-neutral-400"
        >
          <Mouse className="h-4 w-4" strokeWidth={1.5} aria-hidden />
          <span className="text-xs">Scroll to explore</span>
        </motion.div>
      </section>

      {/* ── Section 1: out mode, blue ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-28">
        <SectionLabel color={BLUE}>New Framer Component</SectionLabel>
        <BlindsTextBlock
          color={BLUE}
          mode="out"
          direction="right"
          stagger={0.1}
          lineClassName="text-[clamp(1.35rem,3.2vw,2.15rem)] font-medium leading-[1.35] text-neutral-600"
          lines={[
            "Here's a text reveal with blinds. Each",
            "line gets its own strip, pick out mode",
            "for a clean reveal, or in-out for a",
            "two-phase effect.",
          ]}
        />
      </section>

      {/* ── Section 2: in-out + horizontal, purple ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-28">
        <SectionLabel color={PURPLE}>Four directions. One reveal.</SectionLabel>
        <BlindsTextBlock
          color={PURPLE}
          mode="in-out"
          direction="right"
          stagger={0.12}
          lineClassName="text-[clamp(1.35rem,3.2vw,2.15rem)] font-medium leading-[1.35] text-neutral-600"
          lines={[
            "Direction Each line moves in the",
            "direction you set – left, right, up, or",
            "down. Same text, different feel.",
          ]}
        />
      </section>

      {/* ── Section 3: alternate odd/even, magenta ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-28">
        <SectionLabel color={MAGENTA}>Lines that go their own way.</SectionLabel>
        <BlindsTextBlock
          color={MAGENTA}
          mode="out"
          direction="alternate"
          stagger={0.1}
          lineClassName="text-[clamp(1.35rem,3.2vw,2.15rem)] font-medium leading-[1.35] text-neutral-600"
          lines={[
            "Alternate Odd and even lines animate",
            "in opposite directions, giving the reveal",
            "a more dynamic, back-and-forth",
            "rhythm.",
          ]}
        />
      </section>

      {/* Footer spacer */}
      <footer className="relative flex h-40 items-center justify-center">
        <Link
          href="/lab"
          className="text-sm text-neutral-400 transition-colors hover:text-neutral-700"
        >
          ← Back to Lab
        </Link>
      </footer>
    </div>
  );
}
