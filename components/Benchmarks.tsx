"use client";

import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import SpotlightCard from "./ui/SpotlightCard";

const results = [
  {
    number: "24.5%",
    label: "Leads That Become Customers",
    desc: "Nearly 1 in 4 calls results in a qualified lead or confirmed appointment — without your team lifting a finger.",
  },
  {
    number: "83%",
    label: "Customers Feel They Spoke to a Person",
    desc: "8 out of 10 customers complete their call without realizing they spoke to an AI. That's how natural it sounds.",
  },
  {
    number: "4.8/5",
    label: "Customer Satisfaction Score",
    desc: "Customers consistently rate their experience highly — because fast, friendly service in their own language just feels right.",
  },
  {
    number: "68%",
    label: "Lower Cost Than a Call Centre",
    desc: "Businesses switching to Speaksy save an average of 68% on their calling costs — with better results.",
  },
];

export default function Benchmarks() {
  return (
    <section id="benchmarks" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Proven Results"
          title="Numbers that matter to your bottom line."
          subtitle="Real outcomes measured across real businesses that use Speaksy every day."
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
