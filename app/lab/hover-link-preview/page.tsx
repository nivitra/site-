import type { Metadata } from "next";
import HoverLinkPreviewScene from "@/components/hover-link-preview/HoverLinkPreviewScene";

export const metadata: Metadata = {
  title: "Hover Link Preview · Lab",
  description:
    "Text links that reveal floating website preview cards on hover — exact Framer-style interaction.",
  robots: { index: false, follow: false },
};

export default function HoverLinkPreviewPage() {
  return <HoverLinkPreviewScene />;
}
