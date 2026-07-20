"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { UseCaseGroup } from "@/lib/industries";
import { FeatureRow } from "./FeatureRow";
import { groupsToIsoFeatures } from "./use-case-features";

type Props = {
  industryName: string;
  industrySlug: string;
  groups: UseCaseGroup[];
  /** Patterns shown as creative chips under heading */
  patterns?: string[];
};

/**
 * Industry use cases as isometric feature objects — neat, hover-reactive,
 * grouped with a creative rail layout (not a flat card grid).
 */
export default function IndustryUseCasesIso({
  industryName,
  industrySlug,
  groups,
  patterns = [],
}: Props) {
  const mapped = groupsToIsoFeatures(groups, industrySlug);
  const [activeId, setActiveId] = useState<string | null>(null);
  /** Which group’s row is “focused” for subtle side accent */
  const [focusGroup, setFocusGroup] = useState<string | null>(
    mapped[0]?.name ?? null
  );

  const total = mapped.reduce((n, g) => n + g.features.length, 0);

  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      {/* Soft brand wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_70%_80%_at_50%_0%,rgba(16,185,129,0.08),transparent)]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-brand-600 uppercase">
            Industry Intelligence · {industryName}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            What Speaksy runs in this vertical
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            Production flows from Industry Intelligence — structured, bounded,
            with a defined human handoff.{" "}
            <span className="font-medium text-foreground/80">
              {total} flows
            </span>{" "}
            ready to deploy.
          </p>
        </div>

        {patterns.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {patterns.map((p) => (
              <span
                key={p}
                className="rounded-full border border-emerald-500/20 bg-emerald-50/80 px-3 py-1 text-[11px] font-semibold tracking-wide text-emerald-900"
              >
                {p}
              </span>
            ))}
          </div>
        )}

        <div className="mt-14 space-y-12 sm:mt-16 sm:space-y-14">
          {mapped.map((group, gi) => {
            const isFocus = focusGroup === group.name;
            return (
              <div
                key={group.name}
                className="relative"
                onMouseEnter={() => setFocusGroup(group.name)}
              >
                {/* Group header rail */}
                <div className="mb-5 flex items-end gap-4 sm:mb-6">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold tabular-nums transition-colors ${
                          isFocus
                            ? "bg-emerald-600 text-white shadow-[0_6px_16px_-6px_rgba(5,150,105,0.55)]"
                            : "bg-emerald-500/10 text-emerald-800"
                        }`}
                      >
                        {String(gi + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                        {group.name}
                      </h3>
                    </div>
                    <p className="mt-1 pl-[2.65rem] text-xs text-muted">
                      {group.features.length} object
                      {group.features.length === 1 ? "" : "s"} · click any to
                      book a walkthrough
                    </p>
                  </div>
                  <span className="mb-2 hidden h-px flex-1 bg-gradient-to-r from-line to-transparent sm:block" />
                </div>

                {/* Iso stack in a soft frame */}
                <div
                  className={`relative overflow-hidden rounded-[1.35rem] border transition-colors duration-300 ${
                    isFocus
                      ? "border-emerald-500/25 bg-gradient-to-br from-emerald-50/70 via-white to-white shadow-[0_20px_50px_-32px_rgba(16,185,129,0.35)]"
                      : "border-line bg-neutral-50/50"
                  }`}
                >
                  {/* Decorative iso grid dots */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.12),transparent_70%)]"
                  />

                  <ul className="relative divide-y divide-line/70 px-2 py-1 sm:px-3 sm:py-2">
                    {group.features.map((f, fi) => (
                      <li key={f.id}>
                        <AnimatePresence mode="popLayout">
                          <motion.div
                            initial={{ opacity: 0, x: -6 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{
                              duration: 0.35,
                              delay: Math.min(fi * 0.04, 0.24),
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          >
                            <FeatureRow
                              feature={f}
                              active={activeId === f.id}
                              accent="emerald"
                              compact={group.features.length > 5}
                              onEnter={() => setActiveId(f.id)}
                              onLeave={() =>
                                setActiveId((id) => (id === f.id ? null : id))
                              }
                            />
                          </motion.div>
                        </AnimatePresence>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 text-center sm:mt-14">
          <p className="max-w-md text-sm text-muted">
            Want these objects live on your number for {industryName}?
          </p>
          <Link
            href="/contact"
            className="brand-pill inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(16,185,129,0.5)]"
          >
            Book a {industryName} demo
          </Link>
        </div>
      </div>
    </section>
  );
}
