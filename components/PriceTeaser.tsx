"use client";

import Link from "next/link";
import Magnetic from "./ui/Magnetic";
import MorphBar from "./ui/MorphBar";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

const bars = [
  { label: "Traditional call center", price: "₹22–35/min", pct: 100, color: "bg-gray-200", text: "text-muted" },
  { label: "Global AI platforms", price: "₹9–14/min", pct: 42, color: "bg-gray-300", text: "text-muted" },
  { label: "Speaksy", price: "from ₹3.99/min", pct: 15, color: "bg-brand-500", text: "text-brand-700" },
];

export default function PriceTeaser() {
  return (
    <section className="py-28 border-y border-line bg-surface">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Pricing"
          title="Powerful technology. Refreshingly fair price."
          subtitle="Pay only when your assistant is in an active conversation. No hidden charges, no setup costs, no surprises."
        />
        <Reveal delay={0.1}>
          <div className="card mt-14 flex flex-col gap-7 rounded-3xl p-8 sm:p-10">
            {bars.map((b, i) => (
              <div key={b.label} className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between">
                  <span className={`text-sm font-semibold ${b.label === "Speaksy" ? "text-foreground" : "text-muted"}`}>
                    {b.label}
                  </span>
                  <span className={`font-mono text-sm font-semibold ${b.text}`}>{b.price}</span>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-surface-2">
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
                A typical business saves{" "}
                <span className="font-semibold text-brand-700">₹18–25 lakh per year</span> after switching to Speaksy.
              </p>
              <Magnetic strength={0.35} radius={70}>
                <Link
                  href="/pricing"
                  className="text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
                >
                  See how much you'd save →
                </Link>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
