import type { Metadata } from "next";
import HowItWorks from "@/components/HowItWorks";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import FeatureGrid from "@/components/FeatureGrid";
import UseCases from "@/components/UseCases";
import PriceTeaser from "@/components/PriceTeaser";

export const metadata: Metadata = {
  title: "Product",
  description:
    "Speaksy calls your customers in their language — EMI, COD, leads, appointments. Simple enough for non-tech teams.",
  alternates: { canonical: "/platform" },
};

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="Product"
        title="What your best telecaller does — on every call"
        subtitle="No waiting to hire more staff. Speaksy calls, talks, and delivers results. You run the business."
      />
      <UseCases />
      <FeatureGrid />
      <HowItWorks />
      <PriceTeaser />
      <CTASection />
    </>
  );
}
