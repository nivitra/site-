import type { Metadata } from "next";
import ScrollHighlightScene from "@/components/scroll-highlight/ScrollHighlightScene";

export const metadata: Metadata = {
  title: "Scroll Highlight · Lab",
  description:
    "Scroll-triggered text highlighter with diagonal paint wipe — blue, yellow, purple (exact from recording).",
  robots: { index: false, follow: false },
};

export default function ScrollHighlightPage() {
  return <ScrollHighlightScene />;
}
