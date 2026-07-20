import type { Metadata } from "next";
import DragScrollGallery from "@/components/drag-gallery/DragScrollGallery";

export const metadata: Metadata = {
  title: "Drag Gallery · Lab",
  description:
    "Freeform art print gallery — scroll or drag to pan across the black canvas.",
  robots: { index: false, follow: false },
};

export default function DragGalleryPage() {
  return <DragScrollGallery />;
}
