import type { Metadata } from "next";
import Pipeline from "@/components/Pipeline";
import GraphShowcase from "@/components/GraphShowcase";
import HandoffShowcase from "@/components/HandoffShowcase";
import IntegrationsMarquee from "@/components/IntegrationsMarquee";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "See how Speaksy works: an intelligent calling assistant that answers, qualifies, books, and follows up — in 14 Indian languages, 24/7, with full handoff to your team when needed.",
  alternates: { canonical: "/platform" },
};

const devFeatures = [
  {
    title: "Connects to any phone setup",
    body: "Works with your existing phone numbers and provider — no number changes needed. Or we can set up new lines for you. Either way, calls just start going to Speaksy.",
    code: `POST /v1/calls
{
  "agent_id": "loan-qualifier-v12",
  "to": "+919876543210",
  "variables": {
    "name": "Rohan",
    "emi": "₹4,500"
  }
}`,
  },
  {
    title: "Plugs into your CRM and calendar",
    body: "Speaksy sends call results, leads, and booked appointments directly into HubSpot, Zoho, Salesforce, Google Calendar, or any tool your team already uses.",
    code: `PUT /v1/providers
{
  "stt": "deepgram | sarvam",
  "llm": "your-key | bundled",
  "tts": "elevenlabs | cartesia",
  "fallback": "auto"
}`,
  },
  {
    title: "Calls thousands of leads at once",
    body: "Upload your contact list and Speaksy calls every person at the right time, follows your retry rules, and skips anyone on do-not-call lists automatically.",
    code: `POST /v1/batches
{
  "agent_id": "cod-confirm",
  "leads_csv": "s3://...",
  "retry": { "max": 3,
    "delay_s": 600 },
  "window": "09:00-20:00 IST"
}`,
  },
];

const compliance = [
  ["🇮🇳", "Your data stays in India", "All voice data is processed and stored on servers in India. Your customer information never leaves Indian borders."],
  ["🔐", "Bank-grade security", "Every call recording, transcript, and account detail is encrypted and protected at all times, both stored and in transit."],
  ["🙈", "Sensitive information protected", "Personal numbers, financial details, and ID information are automatically removed from call records as conversations happen."],
  ["📵", "Calling rules enforced automatically", "Calling hours and do-not-call registry rules are enforced at the platform level — no manual work required."],
  ["🧭", "Complete audit trail", "A permanent, unalterable record of every call, every change, and every data access — ready for your auditors anytime."],
  ["✅", "Built to the highest standards", "Aligned with SOC 2 and ISO 27001; full compliance documentation available on request."],
];

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="How It Works"
        title="Your calling assistant, from first hello to final outcome."
        subtitle="Speaksy handles every part of the conversation — hearing your customer, understanding what they need, responding naturally, and passing the call to your team when the moment is right."
      />
      <Pipeline />
      <GraphShowcase />
      <HandoffShowcase />

      {/* developer section */}
      <section id="integrations" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Works With Your Stack"
            title="Plugs into the tools you already use."
            subtitle="No need to change how you work. Speaksy connects to your existing phone setup, CRM, and calendar — results flow to wherever you need them."
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {devFeatures.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.12}>
                <div className="card card-hover flex h-full flex-col rounded-2xl p-6">
                  <h3 className="text-lg font-semibold tracking-tight">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
                  <pre className="mt-5 overflow-x-auto rounded-xl border border-line bg-brand-950/80 p-4 font-mono text-[11.5px] leading-relaxed text-brand-300">
                    {f.code}
                  </pre>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <IntegrationsMarquee />

      {/* compliance */}
      <section className="border-t border-line bg-surface/40 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Security & Compliance"
            title="Your business protected. Your customers trusted."
            subtitle="Every call Speaksy makes follows the law automatically — no manual monitoring, no compliance headaches, no risk."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {compliance.map(([icon, title, body], i) => (
              <Reveal key={title} delay={(i % 3) * 0.1}>
                <div className="card card-hover flex h-full flex-col gap-2 rounded-2xl p-6">
                  <span className="text-2xl">{icon}</span>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
