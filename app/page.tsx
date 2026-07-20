import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import ProductBento from "@/components/product-bento/ProductBento";
import StoriesBento from "@/components/stories-bento/StoriesBento";
import IndustryGradientBars from "@/components/gradient-bars/IndustryGradientBars";
import IntegrationHub from "@/components/integration-hub/IntegrationHub";
import CompareMatrix from "@/components/compare-matrix/CompareMatrix";
import PriceTeaser from "@/components/PriceTeaser";
import CTASection from "@/components/CTASection";

const LanguageShowcase = dynamic(() => import("@/components/LanguageShowcase"), {
  loading: () => <SectionSkeleton />,
});
const HowItWorks = dynamic(() => import("@/components/HowItWorks"), {
  loading: () => <SectionSkeleton />,
});
const UseCases = dynamic(() => import("@/components/UseCases"), {
  loading: () => <SectionSkeleton />,
});
const FAQ = dynamic(() => import("@/components/FAQ"));
const StackIntegration = dynamic(
  () => import("@/components/stack-integration/StackIntegration")
);

function SectionSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20" aria-hidden>
      <div className="mx-auto h-3 w-24 animate-pulse rounded bg-black/5" />
      <div className="mx-auto mt-5 h-9 w-72 max-w-full animate-pulse rounded bg-black/5" />
      <div className="mt-12 h-40 animate-pulse rounded-3xl bg-black/[0.03]" />
    </div>
  );
}

/**
 * Consumer homepage — white theme, blueprint order.
 * Industries use vertical gradient bars (expand → industry page).
 */
export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <StoriesBento />
      <ProductBento />
      <IndustryGradientBars />
      <UseCases />
      <LanguageShowcase />
      <HowItWorks />
      <IntegrationHub />
      <StackIntegration />
      <CompareMatrix />
      <PriceTeaser />
      <FAQ />
      <CTASection />
    </>
  );
}
