"use client";

import SectionHeading from "./ui/SectionHeading";
import SpotlightCard from "./ui/SpotlightCard";
import Stagger from "./ui/Stagger";

const features = [
  {
    icon: "🗣️",
    title: "Multilingual Conversations",
    body: "Your AI agent speaks to every customer in their own language — Hindi, Tamil, Telugu, Marathi, and 10 more — naturally and fluently.",
  },
  {
    icon: "⏰",
    title: "Always Available",
    body: "Works 24 hours a day, 7 days a week. No holidays, no sick days, no missed calls. Every customer gets answered instantly.",
  },
  {
    icon: "🤝",
    title: "Smart Handoff to Your Team",
    body: "When a customer needs personal attention, Speaksy connects them to your team instantly — with full context, so nothing gets repeated.",
  },
  {
    icon: "📊",
    title: "Real-Time Business Insights",
    body: "See exactly how every call went — who converted, who needs follow-up, and where your biggest opportunities are.",
  },
  {
    icon: "🛡️",
    title: "Fully Compliant",
    body: "Every regulation handled automatically. Calling hours, privacy rules, data protection — so you never have to worry about compliance.",
  },
  {
    icon: "💰",
    title: "Pay Per Minute",
    body: "Only pay for actual conversations. No monthly minimums, no setup fees, no charges for unanswered calls.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Why Speaksy"
          title="Everything your team does. At a fraction of the cost."
          subtitle="One platform to qualify leads, book appointments, follow up on payments, and support customers — automatically."
        />
        <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} data-stagger>
              <SpotlightCard className="card card-hover h-full rounded-2xl" maxTilt={6}>
                <div className="flex h-full flex-col gap-3 p-7">
                  <span className="text-2xl transition-transform duration-300 group-hover:scale-110">
                    {f.icon}
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{f.body}</p>
                </div>
              </SpotlightCard>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
