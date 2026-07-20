import type { Metadata } from "next";
import ScrollZoomGallery from "@/components/scroll-zoom-gallery/ScrollZoomGallery";

export const metadata: Metadata = {
  title: "Scroll Zoom Gallery · Lab",
  description:
    "Sticky scroll-driven 2×2 collage that dives in and pulls out — exact motion from the recording.",
  robots: { index: false, follow: false },
};

export default function ScrollZoomPage() {
  return (
    <main className="bg-black">
      <ScrollZoomGallery />
      {/* Tiny end pad so last keyframe can settle */}
      <div className="flex h-[20vh] items-center justify-center bg-black">
        <a
          href="/lab"
          className="text-xs text-neutral-600 transition-colors hover:text-neutral-400"
        >
          ← Back to Lab
        </a>
      </div>
    </main>
  );
}
