"use client";

import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import SpotlightCard from "./ui/SpotlightCard";

const results = [
  {
    number: "24.5%",
    label: "Lead Conversion Rate",
    desc: "Percentage of calls that result in a qualified lead or booked appointment.",
  },
  {
    number: "83%",
    label: "Human-Pass Rate",
    desc: "Customers who completed calls without realizing they were speaking to AI.",
  },
  {
    number: "4.8/5",
    label: "Customer Satisfaction",
    desc: "Average post-call satisfaction rating from customers interacting with Speaksy.",
  },
  {
    number: "68%",
    label: "Cost Reduction",
    desc: "Average savings compared to traditional call centers and global AI platforms.",
  },
];

export default function Benchmarks() {
  return (
    <section id="benchmarks" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Results"
          title="The results speak for themselves."
          subtitle="Real outcomes from real businesses using Speaksy every day."
        />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((r, i) => (
            <Reveal key={r.label} delay={(i % 4) * 0.1}>
              <SpotlightCard className="card card-hover h-full rounded-2xl" maxTilt={5}>
                <div className="flex h-full flex-col gap-3 p-7 text-center">
                  <span className="font-mono text-4xl font-bold text-brand-600">{r.number}</span>
                  <h3 className="text-base font-semibold tracking-tight text-foreground">{r.label}</h3>
                  <p className="text-sm leading-relaxed text-muted">{r.desc}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
