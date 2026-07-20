"use client";

import { LANGUAGE_GALLERY_REGIONS } from "@/lib/language-gallery";

/**
 * Soft region labels on the language canvas — map chrome, not clutter.
 */
export default function RegionMarkers() {
  return (
    <>
      {LANGUAGE_GALLERY_REGIONS.map((r) => (
        <div
          key={r.id}
          className="pointer-events-none absolute z-[1] select-none"
          style={{ left: r.x, top: r.y }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] font-medium tracking-[0.16em] text-white/55 uppercase backdrop-blur-sm">
            <span className="h-1 w-1 rounded-full bg-brand-400/80" aria-hidden />
            {r.label}
          </span>
        </div>
      ))}
    </>
  );
}
