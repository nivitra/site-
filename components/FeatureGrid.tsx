"use client";

import SectionHeading from "./ui/SectionHeading";
import SpotlightCard from "./ui/SpotlightCard";
import Stagger from "./ui/Stagger";

const features = [
  {
    icon: "🗣️",
    title: "Speaks Every Customer's Language",
    body: "Your customers feel heard when someone speaks to them in their own language. Hindi, Tamil, Telugu, Marathi, and 10 more — naturally and warmly, every time.",
  },
  {
    icon: "⏰",
    title: "Open for Business, Always",
    body: "No holidays, no sick leave, no shifts. Every customer who calls gets answered in seconds — morning, night, Sunday, or public holiday.",
  },
  {
    icon: "🤝",
    title: "Passes Calls to Your Team Seamlessly",
    body: "When a customer needs a human touch, Speaksy connects them to your team in seconds — with the full conversation ready, so no one has to repeat themselves.",
  },
  {
    icon: "📊",
    title: "Know Exactly What's Happening",
    body: "See every call result at a glance — who's ready to buy, who needs a follow-up, and where you're leaving money on the table.",
  },
  {
    icon: "🛡️",
    title: "Worry-Free Compliance",
    body: "All rules followed automatically — calling hours, privacy regulations, data protection. You stay protected without lifting a finger.",
  },
  {
    icon: "💰",
    title: "You Only Pay When It Talks",
    body: "Charged only for real conversations. Zero setup fees, zero monthly minimums, zero charges for calls that don't connect.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="The Speaksy system"
          title="Not a bot. A full conversation stack."
          subtitle="Languages, telephony, handoff, analytics, and compliance — one system that qualifies leads, books appointments, chases payments, and supports customers so your team focuses on what only humans can do."
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
