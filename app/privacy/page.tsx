import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Speaksy collects, uses and protects personal data, in line with India's DPDP Act.",
  alternates: { canonical: "/privacy" },
};

const sections: [string, string][] = [
  [
    "1. Who we are",
    "Speaksy (\"Speak Systems Pvt. Ltd.\", \"we\", \"us\") provides a voice AI platform that makes and receives phone calls on behalf of business customers. This policy explains how we handle personal data on our website and platform. For call data processed on behalf of our business customers, we act as a data processor under their instructions.",
  ],
  [
    "2. Data we collect",
    "Website: contact details you submit in forms (name, company, email, phone, use-case notes) and standard analytics data. Platform: account and billing information, agent configurations, and — on behalf of customers — call recordings, transcripts and dispositions generated during campaigns.",
  ],
  [
    "3. How we use it",
    "To respond to demo requests, provide and improve the service, bill usage, meet legal obligations (including TRAI telecom regulations), and secure the platform. We do not sell personal data. We do not train models on customer call data without explicit workspace-level opt-in, and opted-in data is PII-scrubbed and aggregated first.",
  ],
  [
    "4. Where data lives",
    "All voice data is processed and stored on servers located in India, consistent with the Digital Personal Data Protection Act, 2023. Enterprise customers may pin data to specific regions or their own infrastructure.",
  ],
  [
    "5. Protections",
    "Encryption at rest (AES-256) and in transit (TLS 1.3), real-time masking of identifiers such as PAN and Aadhaar numbers in transcripts, role-based access controls, and audit logging of data access.",
  ],
  [
    "6. Retention",
    "Website leads are retained while relevant to a business relationship. Call data retention is configured by the controlling business customer per workspace; expired data is purged automatically.",
  ],
  [
    "7. Your rights",
    "Subject to the DPDP Act, you may request access, correction or erasure of your personal data, and withdraw consent where processing is consent-based. If you received a call from a Speaksy-powered agent, the business that initiated the call is the data fiduciary; we will route requests to them and assist in fulfilment.",
  ],
  [
    "8. Contact",
    "Grievance Officer, Speak Systems Pvt. Ltd. — privacy@speaksy.in. We acknowledge requests within 72 hours. This policy may be updated; material changes will be notified on this page.",
  ],
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="Last updated: July 2026 · Plain-language summary first, lawyer-language kept to a minimum."
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
