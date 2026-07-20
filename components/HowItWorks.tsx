"use client";

import Link from "next/link";
import SectionHeading from "./ui/SectionHeading";
import Stagger from "./ui/Stagger";

const steps = [
  {
    step: "1",
    title: "You tell us",
    body: "What do you say to customers today? Which language? How many calls? That's enough — we figure out the rest.",
  },
  {
    step: "2",
    title: "You listen",
    body: "We place a live call to your number. You decide if it sounds right for your customers.",
  },
  {
    step: "3",
    title: "Go live",
    body: "Like what you hear? Live in a few days. Connect leads, CRM, whatever you already use — and start.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section border-y border-line bg-surface/40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="How to get started"
          title="Three simple steps. No IT team needed."
          subtitle="No app install, coding, or servers. You explain the business — we handle the rest."
        />
        <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.step} data-stagger className="card rounded-2xl p-7 sm:p-8">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/15 text-lg font-bold text-brand-600">
                {s.step}
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </Stagger>
        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="brand-pill inline-flex rounded-xl px-8 py-3.5 text-sm font-semibold text-white"
          >
            Book a free demo now
          </Link>
          <p className="mt-3 text-xs text-muted-2">20 minutes · live call on your number · no card required</p>
        </div>
      </div>
    </section>
  );
}
