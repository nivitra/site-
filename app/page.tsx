import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import StatsBand from "@/components/StatsBand";
import FeatureGrid from "@/components/FeatureGrid";
import PriceTeaser from "@/components/PriceTeaser";
import CTASection from "@/components/CTASection";

// Heavy interactive sections — code-split so first paint stays lean
const LanguageShowcase = dynamic(() => import("@/components/LanguageShowcase"), {
  loading: () => <SectionSkeleton />,
});
const IntegrationsMarquee = dynamic(() => import("@/components/IntegrationsMarquee"));
const Benchmarks = dynamic(() => import("@/components/Benchmarks"), {
  loading: () => <SectionSkeleton />,
});
const GraphShowcase = dynamic(() => import("@/components/GraphShowcase"), {
  loading: () => <SectionSkeleton />,
});
const HandoffShowcase = dynamic(() => import("@/components/HandoffShowcase"), {
  loading: () => <SectionSkeleton />,
});
const Personas = dynamic(() => import("@/components/Personas"));
const IndustriesTabs = dynamic(() => import("@/components/IndustriesTabs"), {
  loading: () => <SectionSkeleton />,
});
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const FAQ = dynamic(() => import("@/components/FAQ"));

function SectionSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24" aria-hidden>
      <div className="mx-auto h-4 w-32 animate-pulse rounded bg-gray-100" />
      <div className="mx-auto mt-4 h-10 w-72 max-w-full animate-pulse rounded bg-gray-100" />
      <div className="mt-12 h-48 animate-pulse rounded-3xl bg-gray-50" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <StatsBand />
      <FeatureGrid />
      <GraphShowcase />
      <LanguageShowcase />
      <IndustriesTabs />
      <HandoffShowcase />
      <Benchmarks />
      <PriceTeaser />
      <IntegrationsMarquee />
      <Personas />
      <Testimonials />
      <FAQ />
      <CTASection />
    </>
  );
}
