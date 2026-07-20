"use client";

import Link from "next/link";
import { ScrollHighlightArticle } from "./ScrollHighlightArticle";

export default function ScrollHighlightScene() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-5 py-4">
        <Link
          href="/lab"
          className="text-xs text-neutral-500 transition-colors hover:text-neutral-200"
        >
          ← Lab
        </Link>
        <span className="text-[11px] tracking-wide text-neutral-500">
          Scroll Highlight
        </span>
      </div>

      <ScrollHighlightArticle />

      <p className="pointer-events-none fixed bottom-6 left-1/2 z-40 -translate-x-1/2 text-[11px] tracking-[0.2em] text-neutral-600 uppercase">
        Scroll
      </p>
    </div>
  );
}
