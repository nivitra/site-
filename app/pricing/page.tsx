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
    "Enterprise-grade voice AI from ₹5.2/min. Business down to ₹4.7/min. Enterprise under ₹1.5/min*. Demo POC ₹999. Pay only for live talk-time.",
  alternates: { canonical: "/pricing" },
};

const pricingFaqs = [
  {
    q: "What do I pay for?",
    a: "Only real conversation time. Ringing, busy signals, and silence don't count. Billing is per second — not rounded up.",
  },
  {
    q: "How does volume pricing work?",
    a: "Business rates step down with daily call volume: ₹5.2/min up to 100 calls/day, ₹5.0 up to 200, ₹4.7 up to 300. Past 300 calls/day is Enterprise — custom ladders from under ₹1.5/min depending on committed volume and architecture.",
  },
  {
    q: "Is there a free plan?",
    a: "No free forever plan. The Demo is a paid proof of concept at ₹999, delivered in 48 hours — 80 talk minutes, custom agent setup, WhatsApp included, full dashboard visibility. Prove it, then scale on Business or Enterprise.",
  },
  {
    q: "Are there setup or platform fees?",
    a: "Demo is a flat ₹999 POC. Business has no setup fee — you pay live-minute rates. Enterprise may include a platform component in exchange for lower committed rates and dedicated infrastructure.",
  },
  {
    q: "What about phone charges?",
    a: "Keep your current phone provider and pay them directly, or take numbers through us on one bill. Your choice.",
  },
  {
    q: "Can I cap monthly spend?",
    a: "Yes. Set a budget limit and campaigns pause automatically when you hit it. No surprise invoices.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Enterprise-grade voice AI. Half the industry price."
        subtitle="Most platforms charge ₹8 to ₹11 per minute for standard voice agents. Speaksy delivers the same human-like capabilities starting at just ₹5.2/min — scaling down as your volume grows."
      />
      <PricingTiers />
      <PricingCalculator />
      <CompareTable />
      <FAQ items={pricingFaqs} title="Pricing, answered" />
      <CTASection />
    </>
  );
}
