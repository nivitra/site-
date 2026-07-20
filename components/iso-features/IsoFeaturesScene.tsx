"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Copy, Check } from "lucide-react";
import { FEATURES } from "./data";
import { FeatureRow } from "./FeatureRow";

/**
 * Hover-reactive isometric feature list from the recording:
 * - Line icons flip to purple on hover
 * - Corner brackets tighten
 * - Title becomes inverted black pill
 * Expanded with more objects beyond Relay + Enclaves.
 */
export default function IsoFeaturesScene() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(
        "IsoFeatures — hover 3D line icons with inverted title pills"
      );
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Top bar */}
      <header className="sticky top-0 z-40 flex h-12 items-center justify-between border-b border-neutral-200/80 bg-[#141414] px-4 sm:px-5">
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

      {/* Feature stack — vertically centered like the recording */}
      <main className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-2xl flex-col justify-center px-6 py-16 sm:px-10">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-400">
            Platform primitives
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
            Hover an object
          </h1>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-500">
            Isometric line icons light up purple, title pills invert — same interaction
            as Relay &amp; Enclaves, with more objects.
          </p>
        </div>

        <ul className="flex flex-col gap-2">
          {FEATURES.map((f) => (
            <li key={f.id}>
              <FeatureRow
                feature={f}
                active={activeId === f.id}
                onEnter={() => setActiveId(f.id)}
                onLeave={() => setActiveId((id) => (id === f.id ? null : id))}
              />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
