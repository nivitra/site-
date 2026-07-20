import type { Metadata } from "next";
import LanguageExploreGallery from "@/components/language-gallery/LanguageExploreGallery";

export const metadata: Metadata = {
  title: "Project Bhāratvāṇī — Language Lab",
  description:
    "Enter Project Bhāratvāṇī: 8 months of field listening, 48,000+ hours of real Indian speech, 10 languages. Speaksy’s private research map.",
  alternates: { canonical: "/languages/explore" },
  robots: { index: true, follow: true },
};

export default function LanguagesExplorePage() {
  return <LanguageExploreGallery />;
}
