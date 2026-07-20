import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import IndustryGradientBars from "@/components/gradient-bars/IndustryGradientBars";
import SolutionsCapabilities from "@/components/solutions/SolutionsCapabilities";
import SolutionsFindHero from "@/components/solutions/SolutionsFindHero";
import IndustryPlaybookReveal from "@/components/reveal-hover-cards/IndustryPlaybookReveal";

export const metadata: Metadata = {
  title: "Solutions & Industry Intelligence — Speaksy",
  description:
    "Speaksy Industry Intelligence: vertical playbooks and AI capabilities for every conversation — sentiment, routing, multilingual voice, CRM sync, and more.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <SolutionsFindHero />

      <SolutionsCapabilities />

      <IndustryGradientBars />

      <IndustryPlaybookReveal />

      <CTASection />
    </>
  );
}
