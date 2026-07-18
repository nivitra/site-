import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Security & Trust",
  description:
    "Speaksy's trust center: Indian data residency (DPDP), AES-256 encryption, real-time PII masking, TRAI/DND enforcement, SOC 2-aligned controls and audit trails.",
  alternates: { canonical: "/security" },
};

const pillars = [
  {
    title: "Data residency & DPDP",
    items: [
      "All voice data — audio, transcripts, metadata — processed and stored on Indian servers",
      "Workspace-level retention policies with automatic purge",
      "Data Processing Agreements aligned to the DPDP Act, 2023",
      "Private VPC and on-premise deployment on Enterprise plans",
    ],
  },
  {
    title: "Encryption & access",
    items: [
      "AES-256 encryption at rest for recordings, transcripts and credentials",
      "TLS 1.3 for every connection; SRTP options on supported trunks",
      "Provider API keys stored in an encrypted vault, never in logs",
      "Role-based access control with SSO/SAML on Enterprise",
    ],
  },
  {
    title: "Call-time protections",
    items: [
      "Real-time PII masking: PAN, Aadhaar and card numbers redacted as transcripts stream",
      "TRAI calling-window enforcement (9 AM – 9 PM) at platform level",
      "DND registry scrubbing before any lead enters a dial queue",
      "Configurable AI-disclosure openings where policy requires",
    ],
  },
  {
    title: "Auditability",
    items: [
      "Immutable versioning of every agent graph — provable script for every historical call",
      "23-parameter automated QA on 100% of conversations",
      "Tamper-evident audit logs for config changes and data access",
      "SOC 2 / ISO 27001-aligned controls; reports available under NDA",
    ],
  },
];

const faqs = [
  ["Do you train models on our call data?", "Not without explicit opt-in. Customer call data is used to serve your calls. Workspaces that opt into model improvement contribute only PII-scrubbed, aggregated audio."],
  ["Can our LLM/STT providers see customer PII?", "Transcripts are PII-masked in-stream before leaving the pipeline boundary, so downstream providers receive redacted text. With BYO-keys you also control exactly which providers are in the path."],
  ["Where exactly is data stored?", "Mumbai and Hyderabad regions by default. Enterprise customers can pin storage to a specific region or their own VPC."],
  ["How do we report a vulnerability?", "security@speaksy.in — we acknowledge within 24 hours, and we don't play games with researchers acting in good faith."],
];

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Security & Trust"
        title="Built for BFSI scrutiny. Defaults, not add-ons."
        subtitle="When your AI talks to lakhs of customers about money, security isn't a checklist for the sales deck — it's platform physics. Here's exactly how Speaksy protects your calls and your customers."
      />

      <section className="pb-8 pt-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-5 md:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 0.1}>
                <div className="card h-full rounded-3xl p-8">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <ul className="mt-5 flex flex-col gap-3">
                    {p.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                        <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading eyebrow="Straight answers" title="What infosec teams ask us first." />
          <div className="mt-10 flex flex-col gap-4">
            {faqs.map(([q, a], i) => (
              <Reveal key={q} delay={i * 0.06}>
                <div className="card rounded-2xl p-6">
                  <h3 className="font-semibold">{q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{a}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <p className="mt-10 text-center text-sm text-muted">
              Security questionnaire or VAPT scope to discuss?{" "}
              <a href="mailto:security@speaksy.in" className="font-semibold text-brand-400 hover:text-brand-300">
                security@speaksy.in
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
