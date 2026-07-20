"use client";

import SpeaksyExpandCards from "@/components/expand-product-cards/SpeaksyExpandCards";
import { SOLUTION_BADGES } from "@/lib/solutions";

/**
 * All solutions as Expand Product Cards — isometric objects, Speaksy green theme.
 */
export default function SolutionsCapabilities() {
  return (
    <section className="border-b border-line bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-[11px] font-semibold tracking-[0.2em] text-brand-600 uppercase">
          The intelligence layer for every conversation
        </p>
        <h2 className="mt-3 text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Every Call, Understood. Every Customer, Known.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[15px] leading-relaxed text-muted">
          Click a capability — the object expands into the full story. Same
          primitives power AI solution matching when you describe a calling
          problem.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {SOLUTION_BADGES.map((b) => (
            <span
              key={b}
              className="rounded-full border border-line bg-surface px-3 py-1 text-[11px] font-semibold tracking-wide text-muted"
            >
              {b}
            </span>
          ))}
        </div>

        <div className="mt-14 sm:mt-16">
          <SpeaksyExpandCards layoutNs="solutions" groupByCategory />
        </div>
      </div>
    </section>
  );
}
