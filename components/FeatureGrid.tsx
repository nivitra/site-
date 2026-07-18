"use client";

import SectionHeading from "./ui/SectionHeading";
import SpotlightCard from "./ui/SpotlightCard";
import Stagger from "./ui/Stagger";

const features = [
  {
    icon: "🗣️",
    title: "Vernacular that fools telecallers",
    body: "Hindi, Hinglish, Tamil, Telugu, Marathi, Bengali & more — with mid-sentence code-switching, natural fillers and regional accents trained on real Indian call audio.",
  },
  {
    icon: "⚡",
    title: "Sub-800ms conversations",
    body: "Streaming ASR under 200ms, LLM inference under 300ms and TTS first-byte under 150ms. Interruptions are handled instantly — talk over the agent and it stops, listens, adapts.",
  },
  {
    icon: "🕸️",
    title: "Visual Graph Agent builder",
    body: "Stop writing 2,000-word prompts. Drag Static, Router and Action nodes into a deterministic dialogue graph with versioning, live validation and one-click publish.",
  },
  {
    icon: "🤝",
    title: "Live human handoff in <1.5s",
    body: "When a customer pushes a complex objection, Speaksy bridges the live call to your human agent with a full screen-pop transcript — the customer never repeats themselves.",
  },
  {
    icon: "📞",
    title: "Bring your own telephony",
    body: "Twilio, Exotel, Plivo, Airtel — or any generic SIP trunk. Keep your numbers, your rates and your carrier relationships. No lock-in, ever.",
  },
  {
    icon: "📊",
    title: "Outcome analytics, not vanity dials",
    body: "Propensity dialing lifts connect rates toward 90%. Every call gets auto-QA'd, intent-classified and cost-attributed. You pay for outcomes, not dead air.",
  },
  {
    icon: "🛡️",
    title: "Compliance built for Bharat",
    body: "TRAI calling windows, DND scrubbing, real-time PII masking of PAN/Aadhaar, DPDP-ready data residency on Indian servers, AES-256 encryption at rest.",
  },
  {
    icon: "🔌",
    title: "Your keys, your models",
    body: "Bring your own OpenAI, Anthropic, Deepgram or ElevenLabs keys — or use Speaksy's bundled stack. Automatic provider fallbacks so a 503 never drops a call.",
  },
  {
    icon: "💸",
    title: "Pricing that makes CFOs smile",
    body: "Billed per live-call second — never for ringing, dead air or failed connects. From ₹3.99/min, roughly a third of what global platforms charge in India.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Why Speaksy"
          title="Everything the expensive platforms do. Nothing they overcharge for."
          subtitle="One platform for outbound campaigns, inbound support and everything between — engineered in India for Indian call economics."
        />
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} data-stagger>
              <SpotlightCard className="card card-hover h-full rounded-2xl" maxTilt={6}>
                <div className="flex h-full flex-col gap-3 p-6">
                  <span className="text-2xl transition-transform duration-300 group-hover:scale-110">
                    {f.icon}
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight">{f.title}</h3>
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
