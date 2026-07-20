"use client";

import DragScrollGallery from "@/components/drag-gallery/DragScrollGallery";
import {
  LANGUAGE_GALLERY_CANVAS,
  LANGUAGE_GALLERY_ITEMS,
} from "@/lib/language-gallery";
import DataPointsShimmer from "./DataPointsShimmer";
import RegionMarkers from "./RegionMarkers";

/**
 * Full-viewport language lab — drag map of India research clusters.
 * Feels like proprietary field research, not a feature list.
 */
export default function LanguageExploreGallery() {
  return (
    <DragScrollGallery
      items={LANGUAGE_GALLERY_ITEMS}
      canvas={LANGUAGE_GALLERY_CANVAS}
      backHref="/languages"
      backLabel="← Languages"
      eyebrow="Project Bhāratvāṇī · Language Lab"
      hint="DRAG THE MAP · ENTER THE RESEARCH"
      overlay={<DataPointsShimmer />}
      canvasChrome={<RegionMarkers />}
    />
  );
}
