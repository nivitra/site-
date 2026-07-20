"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import type { SolutionMatchResult } from "@/lib/solution-match/schema";
import SpeaksyExpandCards from "@/components/expand-product-cards/SpeaksyExpandCards";
import { matchCapsToProductCards } from "@/components/expand-product-cards/solution-cards";

/**
 * Clear vertical story:
 * 1. Your problem → 2. How Speaksy helps → 3. Industry fit → 4. Use cases → CTA
 */
export default function SolutionMatchFlow({
  result,
  problem,
}: {
  result: SolutionMatchResult;
  problem: string;
}) {
  if (result.refused) {
    return (
      <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-amber-200/80 bg-amber-50 shadow-sm">
        <div className="px-5 py-5 text-sm text-amber-900 sm:px-6">
          {result.summary}
        </div>
      </div>
    );
  }

  const primary = result.industries[0];
  const fit = Math.round(result.confidence * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mt-8 overflow-hidden rounded-[1.75rem] border border-black/[0.07] bg-white shadow-[0_20px_60px_-28px_rgba(22,163,74,0.22),0_8px_32px_-16px_rgba(0,0,0,0.08)]"
    >
      <div className="px-4 py-5 sm:px-6 sm:py-6">
      {/* Answer strip */}
      <div className="rounded-2xl border border-brand-500/15 bg-gradient-to-br from-brand-50/90 to-white px-5 py-5 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-white">
            <Sparkles className="h-4 w-4" />
          </span>
          <p className="text-[11px] font-bold tracking-[0.16em] text-brand-700 uppercase">
            Your solution map
          </p>
          <span className="rounded-full bg-brand-500/15 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-brand-800">
            {fit}% fit
          </span>
        </div>
        <p className="mt-3 text-[15px] leading-relaxed text-neutral-800 sm:text-base">
          {result.summary}
        </p>
      </div>

      {/* Step rail */}
      <ol className="relative mt-1 space-y-0">
        {/* Step 1 — Problem */}
        <Step n={1} title="Your problem" last={false}>
          <div className="rounded-xl border border-black/[0.06] bg-neutral-900 px-4 py-3.5 text-white">
            <p className="text-[14px] leading-relaxed font-medium sm:text-[15px]">
              “{problem}”
            </p>
          </div>
        </Step>

        {/* Step 2 — Capabilities as expand cards (iso objects, same as /solutions) */}
        <Step
          n={2}
          title="How Speaksy helps"
          subtitle="Click an object to expand"
          last={false}
        >
          {result.capabilities.length > 0 ? (
            <div className="rounded-2xl border border-brand-500/15 bg-gradient-to-br from-emerald-50/50 to-white px-3 py-8 sm:px-5 sm:py-10">
              <SpeaksyExpandCards
                cards={matchCapsToProductCards(result.capabilities)}
                groupByCategory={false}
                layoutNs="match"
              />
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-black/10 bg-white px-4 py-3 text-sm text-neutral-500">
              Core voice intelligence — listening, routing, and follow-through.
            </div>
          )}
        </Step>

        {/* Step 3 — Industry */}
        <Step
          n={3}
          title="Industry Intelligence match"
          subtitle={
            result.industries.length > 1
              ? `${result.industries.length} verticals match`
              : "Primary vertical"
          }
          last={false}
        >
          <div className="space-y-2">
            {result.industries.map((ind, i) => (
              <motion.div
                key={ind.slug}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <Link
                  href={ind.href}
                  className={`flex items-start gap-3 rounded-xl border p-4 transition hover:shadow-md ${
                    i === 0
                      ? "border-brand-500/30 bg-gradient-to-br from-brand-50 to-white shadow-sm"
                      : "border-black/[0.06] bg-white"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      i === 0
                        ? "bg-brand-500 text-white"
                        : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    <Building2 className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-[15px] font-semibold text-neutral-900">
                        {ind.name}
                      </span>
                      {i === 0 && (
                        <span className="rounded-full bg-brand-500/15 px-2 py-0.5 text-[10px] font-bold tracking-wide text-brand-800 uppercase">
                          Best match
                        </span>
                      )}
                    </span>
                    <span className="mt-1 block text-[13px] leading-relaxed text-neutral-600">
                      {ind.reason}
                    </span>
                  </span>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-neutral-300" />
                </Link>
              </motion.div>
            ))}
          </div>
        </Step>

        {/* Step 4 — Use cases */}
        <Step
          n={4}
          title="What Speaksy will run"
          subtitle="From Industry Intelligence for this vertical"
          last
        >
          <ul className="space-y-2">
            {(primary?.usecases ?? []).map((u, i) => (
              <motion.li
                key={u.title}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14 + i * 0.05 }}
              >
                <Link
                  href={u.href}
                  className="flex items-start gap-3 rounded-xl border border-black/[0.06] bg-white px-4 py-3.5 transition hover:border-brand-500/30 hover:shadow-sm"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500/12 text-[12px] font-bold text-brand-800">
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="text-[14px] font-semibold text-neutral-900">
                        {u.title}
                      </span>
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-brand-500" />
                    </span>
                    <span className="mt-0.5 block text-[12px] leading-relaxed text-neutral-500">
                      {u.desc}
                    </span>
                  </span>
                </Link>
              </motion.li>
            ))}
            {!primary?.usecases?.length && (
              <li className="rounded-xl border border-dashed border-black/10 px-4 py-3 text-sm text-neutral-500">
                Open Industry Intelligence for the full use-case list.
              </li>
            )}
          </ul>
        </Step>
      </ol>

      {/* CTA */}
      <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-black/[0.06] pt-6">
        <Link
          href={result.cta.href}
          className="brand-pill inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_6px_20px_-6px_rgba(34,197,94,0.5)]"
        >
          {result.cta.label}
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-2.5 text-[13px] font-semibold text-neutral-700 transition hover:border-brand-500/30"
        >
          Book a demo
        </Link>
      </div>
      </div>
    </motion.div>
  );
}

function Step({
  n,
  title,
  subtitle,
  children,
  last,
}: {
  n: number;
  title: string;
  subtitle?: string;
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <li className="relative flex gap-4 pt-6 sm:gap-5">
      {/* Rail */}
      <div className="relative flex w-8 shrink-0 flex-col items-center">
        <span className="relative z-[1] flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-[13px] font-bold text-white shadow-[0_0_0_4px_rgba(34,197,94,0.15)]">
          {n}
        </span>
        {!last && (
          <span
            aria-hidden
            className="absolute top-8 bottom-0 w-px bg-gradient-to-b from-brand-400/50 to-brand-200/30"
          />
        )}
      </div>

      {/* Body */}
      <div className={`min-w-0 flex-1 ${last ? "pb-0" : "pb-2"}`}>
        <div className="mb-3">
          <h3 className="text-[15px] font-semibold tracking-tight text-neutral-900 sm:text-base">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-0.5 text-[12px] text-neutral-500">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </li>
  );
}
