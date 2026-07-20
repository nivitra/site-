import type { Metadata } from "next";
import IsoFeaturesScene from "@/components/iso-features/IsoFeaturesScene";

export const metadata: Metadata = {
  title: "Iso Features · Lab",
  description:
    "Hover isometric feature icons — purple stroke, corner brackets, inverted title pills.",
  robots: { index: false, follow: false },
};

export default function IsoFeaturesPage() {
  return <IsoFeaturesScene />;
}
