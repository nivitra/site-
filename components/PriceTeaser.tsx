"use client";

import Link from "next/link";
import MorphBar from "./ui/MorphBar";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

const bars = [
  { label: "Call center / staff calls", price: "₹22–35 / min", pct: 100, color: "bg-black/15" },
  { label: "Overseas AI tools (USD rates)", price: "₹9–14 / min", pct: 42, color: "bg-black/25" },
  { label: "Speaksy", price: "from ₹3.99 / min", pct: 15, color: "brand-pill" },
];

export default function PriceTeaser() {
  return (
    <section className="section">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Pricing"
          title="Affordable. Effective."
          subtitle="Pay only while talking. No charge for ringing. Clear rupee rates — not a dollar bill."
        />
        <Reveal delay={0.08}>
          <div className="card mt-12 flex flex-col gap-7 rounded-3xl p-7 sm:p-10">
            {bars.map((b, i) => (
              <div key={b.label} className="flex flex-col gap-2">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span
                    className={`text-sm font-medium ${
                      b.label === "Speaksy" ? "text-foreground" : "text-muted"
                    }`}
                  >
                    {b.label}
                  </span>
                  <span
                    className={`text-sm font-semibold tabular-nums ${
                      b.label === "Speaksy" ? "text-brand-600" : "text-muted"
                    }`}
                  >
                    {b.price}
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-black/5">
                  <MorphBar
                    pct={b.pct}
                    delay={100 + i * 120}
                    className={`h-full rounded-full ${b.color}`}
                  />
                </div>
              </div>
            ))}
            <div className="mt-1 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-relaxed text-muted">
                Teams doing 50,000 calls / month often save{" "}
                <span className="font-semibold text-foreground">₹18–25 lakh / year</span>.
              </p>
              <Link
                href="/pricing"
                className="shrink-0 text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                Full rate card →
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
