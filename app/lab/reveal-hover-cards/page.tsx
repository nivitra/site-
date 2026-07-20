import type { Metadata } from "next";
import RevealHoverCardGrid from "@/components/reveal-hover-cards/RevealHoverCardGrid";

export const metadata: Metadata = {
  title: "Reveal Hover Cards · Lab",
  description: "Clip-path spring reveal hover card grid.",
  robots: { index: false, follow: false },
};

export default function RevealHoverCardsPage() {
  return <RevealHoverCardGrid />;
}
