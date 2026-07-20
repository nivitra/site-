import type { Metadata } from "next";
import PricingSliderScene from "@/components/pro-pricing-slider/PricingSliderScene";

export const metadata: Metadata = {
  title: "Pro Pricing Slider · Lab",
  description:
    "Pricing cards with exact stepped credit slider line on Pro and Business.",
  robots: { index: false, follow: false },
};

export default function ProPricingPage() {
  return <PricingSliderScene />;
}
