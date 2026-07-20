"use client";

import Link from "next/link";
import { GlowTabsDemo } from "./GlowTabs";

export default function GlowTabsScene() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 48%, rgba(255,255,255,0.03), transparent 65%)",
        }}
      />

      <Link
        href="/lab"
        className="absolute left-5 top-5 z-20 text-xs text-neutral-500 transition-colors hover:text-neutral-300"
      >
        ← Lab
      </Link>

      <main className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <GlowTabsDemo defaultTab="attachments" />
      </main>
    </div>
  );
}
