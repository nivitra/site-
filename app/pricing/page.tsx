import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PricingTiers from "@/components/PricingTiers";
import PricingCalculator from "@/components/PricingCalculator";
import CompareTable from "@/components/CompareTable";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Speaksy pricing: human-grade voice AI from ₹3.99 per live minute. Billed per second of live talk-time — never for ringing or failed connects. No setup fees.",
  alternates: { canonical: "/pricing" },
};

const pricingFaqs = [
  {
    q: "What exactly counts as a 'live minute'?",
    a: "Only the time where the AI agent (or a handed-off human) is actively in conversation with your customer. Ring time, busy signals, dead air, voicemail detections and failed connects cost you nothing. Billing is per second, not rounded up to the minute.",
  },
  {
    q: "Are there any setup, onboarding or platform fees?",
    a: "No. Zero setup fees, zero monthly platform fees on Starter and Growth. You pay only for live minutes consumed. Enterprise plans can include a platform fee in exchange for steep per-minute discounts.",
  },
  {
    q: "Does the price include telephony charges?",
    a: "If you bring your own telephony (Twilio, Exotel, Plivo, SIP), you pay your carrier directly and Speaksy charges only the AI layer. If you'd rather have one bill, we provision numbers and pass telco costs through at cost — no markup.",
  },
  {
    q: "How do volume discounts work?",
    a: "Above ~2 lakh live minutes per month, per-minute rates step down automatically — Enterprise customers routinely land below ₹3/min. Talk to sales with your volumes and we'll quote the exact ladder.",
  },
  {
    q: "Can I put a hard cap on my monthly spend?",
    a: "Yes. Set a workspace-level budget cap and Speaksy pauses campaigns automatically when you hit it. You'll never get a surprise invoice.",
  },
  {
    q: "Is there really a free tier?",
    a: "Yes — 100 live minutes free on signup, with the full graph builder and all languages. Enough to run a genuine pilot on your own leads before paying a rupee.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="World-class voice AI. Indian price tag."
        subtitle="From ₹3.99 per live minute — roughly a third of global platforms and a tenth of a human call center. Billed per second, only when someone is actually talking."
      />
      <PricingTiers />
      <PricingCalculator />
      <CompareTable />
      <FAQ items={pricingFaqs} />
      <CTASection />
    </>
  );
}
