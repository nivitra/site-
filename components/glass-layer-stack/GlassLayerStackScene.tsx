"use client";

import Link from "next/link";
import { GlassLayerStack } from "./GlassLayerStack";

/**
 * Full-page lab scene matching the recording:
 * black void, sticky scroll stack, exact copy.
 */
export default function GlassLayerStackScene() {
  return (
    <div className="relative bg-black text-white">
      {/* Thin top chrome like the Framer preview */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-11 items-center justify-between border-b border-white/[0.06] bg-black/80 px-4 backdrop-blur-md sm:px-5">
        <Link
          href="/lab"
          className="text-xs text-neutral-500 transition-colors hover:text-neutral-200"
        >
          ← Lab
        </Link>
        <span className="text-[11px] text-neutral-500">Glass Layer Stack</span>
      </header>

      {/* Lead-in so sticky can engage */}
      <div className="flex h-[28vh] items-end justify-center pb-10 pt-16">
        <p className="text-[11px] tracking-[0.28em] text-neutral-600 uppercase">
          Scroll
        </p>
      </div>

      <GlassLayerStack />

      {/* Trail space after sticky */}
      <div className="h-[30vh] bg-black" />
    </div>
  );
}
