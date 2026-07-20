import type { Metadata } from "next";
import ExpandProductCards from "@/components/expand-product-cards/ExpandProductCards";

export const metadata: Metadata = {
  title: "Expand Product Cards · Lab",
  description:
    "Dual product tiles that morph into full-bleed editorial panels — exact from recording.",
  robots: { index: false, follow: false },
};

export default function ExpandProductCardsPage() {
  return <ExpandProductCards />;
}
