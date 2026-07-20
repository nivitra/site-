import type { Metadata } from "next";
import GradientBars from "@/components/gradient-bars/GradientBars";

export const metadata: Metadata = {
  title: "Gradient Bars · Lab",
  description:
    "Holographic fluid bars — hover wave + click expand to mesh square (exact).",
  robots: { index: false, follow: false },
};

export default function GradientBarsPage() {
  return <GradientBars />;
}
