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
    "Speaksy pricing: a calling assistant from ₹4.75 per live minute. You only pay when your assistant is actively in conversation — ringing and unanswered calls are always free. No setup fees.",
  alternates: { canonical: "/pricing" },
};

const pricingFaqs = [
  {
    q: "What counts as a 'live minute'?",
    a: "Only the time your assistant is actively speaking with your customer. Ringing, busy signals, voicemail, and calls that don't connect cost you nothing. You're billed per second of real conversation — never rounded up.",
  },
  {
    q: "Are there any setup or monthly fees?",
    a: "No. Zero setup fees and zero monthly platform fees on Starter and Growth plans. You pay only for the conversations that happen. Enterprise plans may include a platform fee in exchange for significantly lower per-minute rates.",
  },
  {
    q: "Does the price include my phone bill?",
    a: "If you use your own phone provider, you pay them directly — Speaksy only charges for the calling assistant itself. If you'd prefer a single bill, we can provision numbers and pass the phone costs through at cost with no markup.",
  },
  {
    q: "Do prices get better as I grow?",
    a: "Yes. Above roughly 2 lakh minutes per month, rates step down automatically. Enterprise customers consistently get rates well below the standard plan. Share your volumes with us and we'll give you an exact quote.",
  },
  {
    q: "Can I set a maximum monthly budget?",
    a: "Yes. Set a spending limit and Speaksy automatically pauses your campaigns when you reach it. You'll never receive an unexpected bill.",
  },
  {
    q: "Is there really a free option?",
    a: "Yes — 100 live minutes on signup, with full access to all features and all 14 languages. Enough to run a genuine trial on real customer conversations before you commit to anything.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Premium quality. Indian pricing."
        subtitle="From ₹4.75 per live minute — a fraction of what a call centre costs, and far less than any global AI platform. You only pay when your assistant is actively in conversation."
      />
      <PricingTiers />
      <PricingCalculator />
      <CompareTable />
      <FAQ items={pricingFaqs} />
      <CTASection />
    </>
  );
}
