import type { Metadata } from "next";
import BrandFanScene from "@/components/brand-fan/BrandFanScene";

export const metadata: Metadata = {
  title: "Brand Fan · Lab",
  description:
    "Hub-and-spoke brand fan with blue light pulses along curved paths.",
  robots: { index: false, follow: false },
};

export default function BrandFanPage() {
  return <BrandFanScene />;
}
