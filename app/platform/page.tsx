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
    "Inside the Speaksy voice stack: sub-800ms streaming pipeline, visual graph agents, live human handoff, bring-your-own-telephony and enterprise compliance.",
  alternates: { canonical: "/platform" },
};

const devFeatures = [
  {
    title: "REST APIs & webhooks",
    body: "Trigger calls, batches and campaigns with a single POST. Receive dispositions, transcripts and recordings on your webhooks the second a call ends.",
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
    title: "Bring your own keys",
    body: "Plug in your own OpenAI, Anthropic, Deepgram or ElevenLabs credentials and pay providers directly — Speaksy only charges the orchestration layer. Or use our bundled stack for one simple bill.",
    code: `PUT /v1/providers
{
  "stt": "deepgram | sarvam",
  "llm": "your-key | bundled",
  "tts": "elevenlabs | cartesia",
  "fallback": "auto"
}`,
  },
  {
    title: "Batch campaigns",
    body: "Upload 50,000 leads via CSV or API. Propensity dialing sorts them into optimal hour slots, retries follow your rules, and TRAI/DND scrubbing is automatic.",
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
  ["🇮🇳", "Data residency", "All voice data processed and stored on Indian servers — DPDP ready."],
  ["🔐", "AES-256 at rest", "Every recording, transcript and credential encrypted at rest, TLS 1.3 in transit."],
  ["🙈", "Real-time PII masking", "PAN, Aadhaar and card numbers redacted from transcripts as they stream."],
  ["📵", "TRAI & DND enforcement", "Calling windows and DND registry scrubbing enforced at the platform level."],
  ["🧾", "Audit trails", "Immutable logs of every call, config change and data access for your auditors."],
  ["✅", "SOC 2 aligned", "Controls mapped to SOC 2 and ISO 27001; reports available under NDA."],
];

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="Platform"
        title="The full voice AI stack, engineered end to end."
        subtitle="Telephony to transcription to reasoning to synthesis to QA — one pipeline, one dashboard, one very small bill. This is the same architecture global platforms charge 3x for."
      />
      <Pipeline />
      <GraphShowcase />
      <HandoffShowcase />

      {/* developer section */}
      <section id="integrations" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="For Developers"
            title="An API your engineers will actually enjoy."
            subtitle="Everything in the dashboard is available over REST. Go from zero to your first AI call in under ten minutes."
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
            eyebrow="Trust & Compliance"
            title="Enterprise-grade guardrails, on by default."
            subtitle="Built for BFSI-grade scrutiny from day one — not bolted on after your infosec review."
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
