import type { Metadata } from "next";
import LanguageMarqueeScene from "@/components/language-marquee/LanguageMarqueeScene";

export const metadata: Metadata = {
  title: "Language Marquee · Lab",
  description:
    "Hover marquee list of India's top 10 languages with regional photography.",
  robots: { index: false, follow: false },
};

export default function LanguageMarqueePage() {
  return <LanguageMarqueeScene />;
}
