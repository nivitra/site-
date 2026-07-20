"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  CATALOG_TAGS,
  COMPONENT_CATALOG,
  type CatalogItem,
} from "@/lib/components-catalog";
import IndustryGradientBars from "@/components/gradient-bars/IndustryGradientBars";

function matches(item: CatalogItem, q: string, tag: string) {
  if (tag !== "All" && item.tag !== tag) return false;
  if (!q) return true;
  const s = q.toLowerCase();
  return (
    item.title.toLowerCase().includes(s) ||
    item.blurb.toLowerCase().includes(s) ||
    item.href.toLowerCase().includes(s) ||
    item.tag.toLowerCase().includes(s)
  );
}

export default function ComponentsCatalog() {
  const [tag, setTag] = useState("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(
    () => COMPONENT_CATALOG.filter((c) => matches(c, q.trim(), tag)),
    [q, tag]
  );

  const byTag = useMemo(() => {
    const map = new Map<string, CatalogItem[]>();
    for (const c of filtered) {
      const list = map.get(c.tag) ?? [];
      list.push(c);
      map.set(c.tag, list);
    }
    return map;
  }, [filtered]);

  return (
    <div className="mx-auto max-w-6xl px-6">
      {/* Header */}
      <div className="max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.22em] text-muted-2 uppercase">
          Library
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          All components
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          {COMPONENT_CATALOG.length} Speaksy UI experiments — lab demos you can
          open, copy patterns from, and ship on the marketing site.
        </p>
      </div>

      {/* Filters */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {CATALOG_TAGS.map((t) => {
            const on = tag === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTag(t)}
                className={`rounded-full px-3 py-1.5 text-[12px] font-medium transition-all ${
                  on
                    ? "bg-brand-500 text-white shadow-[0_4px_14px_-4px_rgba(34,197,94,0.5)]"
                    : "border border-line bg-white text-muted hover:border-line-strong hover:text-foreground"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
        <label className="relative block w-full sm:max-w-[240px]">
          <span className="sr-only">Search components</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search…"
            className="w-full rounded-full border border-line bg-white py-2 pr-3 pl-9 text-sm text-foreground outline-none transition focus:border-brand-500/40 focus:ring-2 focus:ring-brand-500/15"
          />
          <svg
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3-3" strokeLinecap="round" />
          </svg>
        </label>
      </div>

      <p className="mt-4 text-xs text-muted-2">
        Showing{" "}
        <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
        of {COMPONENT_CATALOG.length}
      </p>

      {/* Live: industry bars */}
      <section className="mt-10 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_12px_40px_-24px_rgba(0,0,0,0.12)]">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand-600 uppercase">
              Live · Homepage
            </p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight text-foreground">
              Industry Gradient Bars
            </h2>
            <p className="mt-0.5 text-sm text-muted">
              Hover wave · click to expand · open playbook
            </p>
          </div>
          <Link
            href="/lab/gradient-bars"
            className="text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            Full demo →
          </Link>
        </div>
        <IndustryGradientBars compact hideHeader className="!border-0" />
      </section>

      {/* Grouped grids */}
      <div className="mt-12 space-y-12">
        {filtered.length === 0 && (
          <p className="rounded-2xl border border-dashed border-line py-16 text-center text-sm text-muted">
            No components match “{q}”
            {tag !== "All" ? ` in ${tag}` : ""}.
          </p>
        )}

        {Array.from(byTag.entries()).map(([group, items]) => (
          <section key={group}>
            <div className="mb-4 flex items-baseline justify-between gap-3">
              <h2 className="text-sm font-semibold tracking-[0.14em] text-muted-2 uppercase">
                {group}
              </h2>
              <span className="font-mono text-[11px] text-muted-2">
                {items.length}
              </span>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((c) => (
                <li key={c.href}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-[0_4px_24px_-16px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-0.5 hover:border-brand-500/25 hover:shadow-[0_16px_40px_-20px_rgba(34,197,94,0.25)]"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[15px] font-semibold tracking-tight text-foreground group-hover:text-brand-700">
                        {c.title}
                      </span>
                      <span className="shrink-0 rounded-md bg-surface-2 px-1.5 py-0.5 text-[10px] font-medium text-muted-2">
                        {c.tag}
                      </span>
                    </div>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {c.blurb}
                    </p>
                    <div className="mt-4 flex items-center justify-between gap-2 border-t border-line pt-3">
                      <span className="truncate font-mono text-[11px] text-muted-2">
                        {c.href}
                      </span>
                      <span className="shrink-0 text-xs font-semibold text-brand-600">
                        Open →
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-muted">
        <Link href="/lab" className="font-medium text-brand-600 hover:text-brand-700">
          Lab index
        </Link>
        <span className="text-muted-2">·</span>
        <Link href="/" className="font-medium text-brand-600 hover:text-brand-700">
          Homepage
        </Link>
        <span className="text-muted-2">·</span>
        <Link
          href="/solutions"
          className="font-medium text-brand-600 hover:text-brand-700"
        >
          Industry Intelligence
        </Link>
      </p>
    </div>
  );
}
