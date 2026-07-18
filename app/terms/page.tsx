import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing use of the Speaksy voice AI platform.",
  alternates: { canonical: "/terms" },
};

const sections: [string, string][] = [
  [
    "1. The service",
    "Speaksy provides a voice AI orchestration platform: agent building, telephony bridging, speech recognition, synthesis and analytics. Access is provided per your plan (Starter, Growth or Enterprise) and these terms, together with any order form.",
  ],
  [
    "2. Your responsibilities",
    "You warrant that your campaigns comply with applicable law — including TRAI's TCCCPR regulations, DND registry rules, the DPDP Act and, where applicable, RBI fair-practice codes — and that you hold a lawful basis to contact every number you upload. Speaksy's compliance tooling assists but does not replace your legal obligations.",
  ],
  [
    "3. Prohibited use",
    "No harassment, deceptive impersonation of humans where disclosure is required, unlawful robocalling, emergency-services calls, or content promoting illegal activity. We may suspend campaigns that trip abuse detection, with notice where feasible.",
  ],
  [
    "4. Billing",
    "Usage is billed per second of live talk-time at your plan's rate. Ringing, failed connects and dead air are not billed. Invoices are due within 15 days; disputed line items must be raised within 30 days of invoice.",
  ],
  [
    "5. Data",
    "As between the parties, you own your call data. We process it per the Privacy Policy and your workspace configuration. On termination you may export recordings, transcripts and dispositions for 30 days, after which they are purged.",
  ],
  [
    "6. Availability & support",
    "We target 99.9% platform availability (99.99% with an Enterprise SLA). Scheduled maintenance is announced in advance. Support channels and response times depend on plan.",
  ],
  [
    "7. Liability",
    "The service is provided \"as is\" to the maximum extent permitted by law. Our aggregate liability is capped at fees paid in the three months preceding a claim. Neither party is liable for indirect or consequential damages.",
  ],
  [
    "8. General",
    "Governing law: India. Jurisdiction: courts of Mumbai, Maharashtra. We may update these terms with 30 days' notice for material changes. Questions: legal@speaksy.in.",
  ],
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        subtitle="Last updated: July 2026 · The deal, in plain terms."
      />
      <section className="pb-24">
        <div className="mx-auto flex max-w-3xl flex-col gap-8 px-6">
          {sections.map(([h, p]) => (
            <div key={h} className="card rounded-2xl p-7">
              <h2 className="font-semibold">{h}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
