import Link from "next/link";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

/** Compliance claims already documented on /security — no new invents. */
const badges = [
  {
    title: "DPDP ready",
    body: "Voice data processed and stored on Indian servers, with DPAs aligned to the DPDP Act, 2023.",
  },
  {
    title: "TRAI / DND",
    body: "Calling-window enforcement (9 AM–9 PM) and DND registry scrubbing before dial queues.",
  },
  {
    title: "PII masking",
    body: "PAN, Aadhaar and card numbers redacted in real time as transcripts stream.",
  },
  {
    title: "SOC 2 aligned",
    body: "AES-256 at rest, TLS 1.3 in transit, audit logs and SOC 2 / ISO 27001-aligned controls.",
  },
];

export default function SecurityStrip() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Security & compliance"
          title="Built for BFSI scrutiny. Defaults, not add-ons."
          subtitle="Enterprise buyers ask about residency, TRAI, and audit trails first. Here's what Speaksy already ships — full detail on our trust center."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((b, i) => (
            <Reveal key={b.title} delay={(i % 4) * 0.06}>
              <div className="card flex h-full flex-col gap-2 rounded-2xl p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-brand-800 bg-brand-950 text-brand-600">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7l8-4z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold tracking-tight text-foreground">{b.title}</h3>
                <p className="text-[13px] leading-relaxed text-muted">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/security"
            className="text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
          >
            Open the trust center →
          </Link>
        </div>
      </div>
    </section>
  );
}
