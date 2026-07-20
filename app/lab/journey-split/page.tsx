import type { Metadata } from "next";
import JourneyScrollCards from "@/components/journey-split/JourneyScrollCards";

export const metadata: Metadata = {
  title: "Journey Scroll Cards · Lab",
  description:
    "Scroll-driven 3D flip: panoramic image splits into three panels, then flips to UI cards.",
  robots: { index: false, follow: false },
};

export default function JourneySplitPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Slim lab chrome */}
      <div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-5 py-4">
        <a
          href="/lab"
          className="text-xs text-neutral-500 transition-colors hover:text-neutral-300"
        >
          ← Lab
        </a>
        <span className="text-[11px] tracking-wide text-neutral-600">
          Scroll to split & flip
        </span>
      </div>

      <JourneyScrollCards />

      {/* Extra room after sticky section ends */}
      <section className="flex h-[40vh] items-center justify-center bg-black">
        <p className="text-sm text-neutral-600">End of sequence</p>
      </section>
    </div>
  );
}
