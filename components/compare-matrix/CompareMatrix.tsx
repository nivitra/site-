"use client";

import { COMPARE_ROWS } from "./data";

/**
 * Exact capability comparison matrix from the screenshot,
 * restyled for Speaksy (dark surface + brand green hero column).
 */
export default function CompareMatrix() {
  return (
    <section className="w-full border-y border-line bg-surface px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-muted-2">
          Why Speaksy
        </p>
        <h2 className="mt-3 text-center text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Not another call bot
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-[15px] text-muted">
          Built for Indian outbound and inbound — memory, compliance, and long
          conversations that don&apos;t fall apart.
        </p>

        {/* Desktop / tablet table */}
        <div className="mt-12 hidden overflow-hidden rounded-2xl border border-line bg-white shadow-[0_12px_40px_-24px_rgba(0,0,0,0.12)] md:block">
          {/* Header */}
          <div className="grid grid-cols-[minmax(9rem,0.9fr)_minmax(0,1.35fr)_minmax(0,1.15fr)] border-b border-line bg-white">
            <div className="flex items-center px-5 py-5 text-sm font-medium text-muted">
              Capabilities
            </div>
            <div className="relative flex items-center justify-center bg-gradient-to-b from-brand-600 to-brand-700 px-5 py-5">
              <span className="text-base font-semibold tracking-tight text-white">
                Speaksy
              </span>
              {/* Soft top highlight like the purple card */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/25"
              />
            </div>
            <div className="flex items-center px-5 py-5 text-sm font-medium text-muted">
              Typical Voice AI Vendor
            </div>
          </div>

          {/* Rows */}
          {COMPARE_ROWS.map((row, i) => {
            const last = i === COMPARE_ROWS.length - 1;
            return (
              <div
                key={row.id}
                className={`grid grid-cols-[minmax(9rem,0.9fr)_minmax(0,1.35fr)_minmax(0,1.15fr)] ${
                  last ? "" : "border-b border-line"
                }`}
              >
                {/* Capability pill */}
                <div className="flex items-center bg-white px-5 py-5">
                  <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 px-3 py-1.5 text-[13px] font-medium text-foreground">
                    <span
                      className="h-2 w-2 shrink-0 rounded-[3px] bg-brand-500"
                      aria-hidden
                    />
                    {row.capability}
                  </span>
                </div>

                {/* Speaksy column — continuous green panel */}
                <div
                  className={`flex items-center bg-gradient-to-b from-brand-600 to-brand-700 px-5 py-5 text-[14px] leading-relaxed text-white ${
                    last ? "rounded-b-2xl" : ""
                  }`}
                >
                  {row.speaksy}
                </div>

                {/* Typical vendor */}
                <div className="flex items-center bg-white px-5 py-5 text-[14px] leading-relaxed text-muted">
                  {row.typical}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile stacked cards */}
        <div className="mt-10 flex flex-col gap-4 md:hidden">
          {COMPARE_ROWS.map((row) => (
            <div
              key={row.id}
              className="overflow-hidden rounded-2xl border border-line bg-surface"
            >
              <div className="border-b border-line px-4 py-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 px-3 py-1 text-[13px] font-medium">
                  <span className="h-2 w-2 rounded-[3px] bg-brand-500" />
                  {row.capability}
                </span>
              </div>
              <div className="bg-gradient-to-br from-brand-600 to-brand-700 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-white/70">
                  Speaksy
                </p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-white">
                  {row.speaksy}
                </p>
              </div>
              <div className="px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-2">
                  Typical vendor
                </p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-muted">
                  {row.typical}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
