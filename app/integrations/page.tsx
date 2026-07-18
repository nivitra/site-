import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/ui/Reveal";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "Speaksy plugs into your telephony (Twilio, Exotel, Plivo, Airtel IQ, SIP), CRMs (Salesforce, Zoho, LeadSquared, HubSpot), AI providers and automation tools (Zapier, Make, n8n, WhatsApp).",
  alternates: { canonical: "/integrations" },
};

const groups = [
  {
    title: "Telephony & carriers",
    desc: "Bring your own trunk or buy numbers through us — either way, TRAI compliance is enforced at the platform layer.",
    items: [
      ["Twilio", "Global SIP & numbers"],
      ["Exotel", "India cloud telephony"],
      ["Plivo", "Voice API & trunking"],
      ["Airtel IQ", "Carrier-grade India routes"],
      ["Acefone", "Cloud PBX & trunks"],
      ["Generic SIP", "Any RFC 3261 trunk"],
    ],
  },
  {
    title: "Speech recognition (STT)",
    desc: "Use Speaksy's Indic-tuned models or bring your own keys — automatic fallback keeps calls alive through vendor outages.",
    items: [
      ["Speaksy Indic ASR", "Code-switched 8kHz specialist"],
      ["Deepgram", "Low-latency streaming"],
      ["Sarvam AI", "Indian language models"],
      ["AssemblyAI", "High-accuracy batch & stream"],
    ],
  },
  {
    title: "Intelligence (LLM)",
    desc: "Router nodes call the model you choose, with per-node overrides for cost/quality trade-offs.",
    items: [
      ["Anthropic Claude", "Complex reasoning turns"],
      ["OpenAI", "GPT family"],
      ["Google Gemini", "Multimodal & long context"],
      ["Groq", "Ultra-low-latency inference"],
    ],
  },
  {
    title: "Voice synthesis (TTS)",
    desc: "Human-grade Indic voices by default; premium vendors a config flag away.",
    items: [
      ["Speaksy Voices", "14 languages, native prosody"],
      ["ElevenLabs", "Premium neural voices"],
      ["Cartesia", "Sub-150ms streaming"],
      ["Smallest.ai", "Indian voice specialist"],
    ],
  },
  {
    title: "CRM & sales stack",
    desc: "Dispositions, recordings and transcripts land on the lead record seconds after hang-up.",
    items: [
      ["Salesforce", "Bi-directional sync"],
      ["Zoho CRM", "Native Indian favourite"],
      ["LeadSquared", "Lending & EdTech flows"],
      ["HubSpot", "Marketing-led pipelines"],
    ],
  },
  {
    title: "Messaging & automation",
    desc: "Trigger the next touch mid-call — payment links, confirmations, follow-up sequences.",
    items: [
      ["WhatsApp Business", "Links & confirmations in-call"],
      ["Zapier", "6,000+ app recipes"],
      ["Make.com", "Visual automation"],
      ["n8n", "Self-hosted workflows"],
      ["Google Calendar", "Direct slot booking"],
      ["Webhooks", "Everything, everywhere"],
    ],
  },
];

export default function IntegrationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Integrations"
        title="Your stack stays your stack."
        subtitle="Speaksy is the conversation layer, not a walled garden. Keep your carrier, your CRM and your AI vendor relationships — we orchestrate them into one sub-800ms pipeline."
      />

      <section className="pb-24 pt-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6">
          {groups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 0.04}>
              <div>
                <div className="mb-5 flex flex-col gap-1">
                  <h2 className="text-xl font-semibold tracking-tight">{g.title}</h2>
                  <p className="max-w-2xl text-sm text-muted">{g.desc}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {g.items.map(([name, tag]) => (
                    <div key={name} className="card card-hover flex items-center gap-4 rounded-2xl p-5">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand-500/25 bg-brand-500/10 text-sm font-bold text-brand-300">
                        {name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                      </span>
                      <div>
                        <p className="font-semibold">{name}</p>
                        <p className="text-xs text-muted">{tag}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal>
            <p className="text-center text-sm text-muted">
              Don&apos;t see yours? If it has an API, we&apos;ve probably already bridged it —{" "}
              <a href="mailto:hello@speaksy.in" className="font-semibold text-brand-400 hover:text-brand-300">
                ask us
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
