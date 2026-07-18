"use client";

import Link from "next/link";
import Magnetic from "./ui/Magnetic";
import MorphBar from "./ui/MorphBar";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

const bars = [
  { label: "Traditional call center", price: "₹22–35/min", pct: 100, color: "bg-white/15", text: "text-muted" },
  { label: "Global voice AI platforms", price: "₹9–14/min", pct: 42, color: "bg-yellow-400/50", text: "text-yellow-200" },
  { label: "Speaksy", price: "from ₹3.99/min", pct: 15, color: "brand-pill", text: "text-brand-300" },
];

export default function PriceTeaser() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Pricing"
          title="Same intelligence. A fraction of the bill."
          subtitle="Billed per live-call second. Never for ringing, dead air or failed connects."
        />
        <Reveal delay={0.1}>
          <div className="card mt-12 flex flex-col gap-7 rounded-3xl p-8 sm:p-10">
            {bars.map((b, i) => (
              <div key={b.label} className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between">
                  <span className={`text-sm font-semibold ${b.label === "Speaksy" ? "text-foreground" : "text-muted"}`}>
                    {b.label === "Speaksy" ? "Speaksy ⚡" : b.label}
                  </span>
                  <span className={`font-mono text-sm font-semibold ${b.text}`}>{b.price}</span>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-white/5">
                  <MorphBar
                    pct={b.pct}
                    delay={120 + i * 140}
                    className={`h-full rounded-full ${b.color}`}
                  />
                </div>
              </div>
            ))}
            <div className="mt-2 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
              <p className="text-sm text-muted">
                A 50,000-call/month operation typically saves{" "}
                <span className="font-semibold text-brand-300">₹18–25 lakh per year</span> switching to Speaksy.
              </p>
              <Magnetic strength={0.35} radius={70}>
                <Link
                  href="/pricing"
                  className="text-sm font-semibold text-brand-400 transition-colors hover:text-brand-300"
                >
                  Run your own numbers →
                </Link>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
