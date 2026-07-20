"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Copy, Check } from "lucide-react";
import { FollowersTrendCard } from "./FollowersTrendCard";

export default function FollowersTrendScene() {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(
        "FollowersTrendCard — interactive bar scrubber with value pill"
      );
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-black">
      <header className="fixed inset-x-0 top-0 z-40 flex h-12 items-center justify-between border-b border-white/[0.06] bg-[#141414]/95 px-4 backdrop-blur-md sm:px-5">
        <Link
          href="/lab"
          className="flex h-8 w-8 items-center justify-center rounded-md text-white/85 transition-colors hover:bg-white/10"
          aria-label="Back to Lab"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M4 6c0-1.1.9-2 2-2h3l2 3H6v11h12V10h-3l2-3h3c1.1 0 2 .9 2 2v11c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V6z" />
          </svg>
        </Link>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href="https://www.framer.com/marketplace/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-3 py-1.5 text-sm text-neutral-300 transition-colors hover:text-white"
          >
            Original
          </a>
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" aria-hidden />
            ) : (
              <Copy className="h-3.5 w-3.5" aria-hidden />
            )}
            <span className="hidden sm:inline">{copied ? "Copied" : "Copy component"}</span>
          </button>
          <Link
            href="/lab"
            className="inline-flex items-center gap-1 rounded-full bg-[#2f6bff] px-3.5 py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Remix
          </Link>
        </div>
      </header>

      <main className="flex min-h-screen items-center justify-center px-6 pb-12 pt-20">
        <FollowersTrendCard />
      </main>
    </div>
  );
}
