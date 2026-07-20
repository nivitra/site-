import type { Metadata } from "next";
import GlassLayerStackScene from "@/components/glass-layer-stack/GlassLayerStackScene";

export const metadata: Metadata = {
  title: "Glass Layer Stack · Lab",
  description:
    "Sticky-scroll isometric glass audience slabs — one lit layer, title crossfade (exact from recording).",
  robots: { index: false, follow: false },
};

export default function GlassLayerStackPage() {
  return <GlassLayerStackScene />;
}
