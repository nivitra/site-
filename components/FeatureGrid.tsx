"use client";

import SectionHeading from "./ui/SectionHeading";
import SpotlightCard from "./ui/SpotlightCard";
import Stagger from "./ui/Stagger";

const features = [
  {
    title: "Human-like voice",
    body: "Customers often don't realize it's AI. Natural Hinglish, pauses, “haan ji”, “theek hai” — just like a real telecaller.",
  },
  {
    title: "Languages of India",
    body: "10 languages. Speak in the customer's mother tongue — North, South, West, wherever they are.",
  },
  {
    title: "24×7, Sundays, festivals",
    body: "Staff on leave? Festival week? Speaksy keeps running. Every lead, every reminder — on time.",
  },
  {
    title: "Human handoff when needed",
    body: "Customer argues or needs detail — the call transfers instantly to your best person, with full context.",
  },
  {
    title: "Simple pricing",
    body: "Pay only when talking. No charge for ringing or no-answer. From ₹3.99/min — cheaper than a call center.",
  },
  {
    title: "Built for compliance",
    body: "Calling hours, DND, private data — handled for India. Keep the business safe; focus on growth.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="section border-y border-line bg-surface/50">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Why Speaksy"
          title="Simple reasons. Big difference."
          subtitle="No jargon — just what helps your business win."
        />
        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} data-stagger>
              <SpotlightCard className="card card-hover h-full rounded-2xl" maxTilt={3}>
                <div className="flex h-full flex-col gap-3 p-6 sm:p-7">
                  <div className="h-1 w-8 rounded-full bg-brand-500" />
                  <h3 className="text-lg font-semibold tracking-tight">{f.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted">{f.body}</p>
                </div>
              </SpotlightCard>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
