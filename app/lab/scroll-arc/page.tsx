import type { Metadata } from "next";
import ScrollArcScene from "@/components/scroll-arc/ScrollArcScene";

export const metadata: Metadata = {
  title: "Scroll Arc · Lab",
  description:
    "Scroll-driven white disc traveling a large arc with crossfading copy — exact path tracking.",
  robots: { index: false, follow: false },
};

export default function ScrollArcPage() {
  return <ScrollArcScene />;
}
