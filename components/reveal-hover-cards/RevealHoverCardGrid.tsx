"use client";

import { useCallback, useState } from "react";
import {
  Atom,
  Copy,
  Check,
} from "lucide-react";
import { REVEAL_CARDS } from "./data";
import { RevealHoverCard } from "./RevealHoverCard";
import type { RevealHoverCardData } from "./RevealHoverCard";

/**
 * Full-viewport cream scene: dark top bar + 4-card reveal hover grid.
 */
export default function RevealHoverCardGrid() {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(
        "RevealHoverCardGrid — clip-path spring reveal from bottom"
      );
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard may be denied */
    }
  }, []);

  return (
    <div className="fixed inset-0 z-[80] flex min-h-screen flex-col bg-[#f3f2eb]">
      {/* Top navigation */}
      <header className="flex h-14 w-full shrink-0 items-center justify-between bg-neutral-900 px-5 sm:px-8">
        <div className="flex items-center gap-2 text-white">
          <Atom className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          <span className="sr-only">Component logo</span>
        </div>

        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Actions">
          <a
            href="https://www.framer.com/marketplace/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-3 py-1.5 text-sm font-medium text-neutral-300 transition-colors hover:text-white"
          >
            Original
          </a>
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-neutral-300 transition-colors hover:text-white"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" aria-hidden />
            ) : (
              <Copy className="h-3.5 w-3.5" aria-hidden />
            )}
            {copied ? "Copied" : "Copy component"}
          </button>
          <a
            href="/lab"
            className="ml-1 rounded-full bg-[#2f6bff] px-4 py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Remix
          </a>
        </nav>
      </header>

      {/* Centered card row */}
      <main className="flex flex-1 items-center justify-center overflow-x-auto px-6 py-10">
        <div className="flex flex-row gap-5 md:gap-6">
          {REVEAL_CARDS.map((card) => (
            <RevealHoverCard
              key={card.id}
              card={
                {
                  ...card,
                  cta: "Learn more",
                } satisfies RevealHoverCardData
              }
              className="!aspect-auto h-[400px] w-72 shrink-0 rounded-2xl border-0 shadow-sm"
            />
          ))}
        </div>
      </main>

      <a
        href="/lab"
        className="absolute bottom-5 left-5 text-xs text-neutral-500 underline-offset-2 hover:text-neutral-800 hover:underline"
      >
        ← Back to Lab
      </a>
    </div>
  );
}
