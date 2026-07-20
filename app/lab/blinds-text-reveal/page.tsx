import type { Metadata } from "next";
import BlindsTextRevealPage from "@/components/blinds-text-reveal/BlindsTextRevealPage";

export const metadata: Metadata = {
  title: "Blinds Text Reveal · Lab",
  description:
    "Scroll-driven blinds text reveal — each line covered by a colored strip that opens to reveal copy.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <BlindsTextRevealPage />;
}
