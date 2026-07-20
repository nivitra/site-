import type { Metadata } from "next";
import ComponentsCatalog from "@/components/ComponentsCatalog";
import { COMPONENT_CATALOG } from "@/lib/components-catalog";

export const metadata: Metadata = {
  title: "All Components",
  description: `Full Speaksy UI library — ${COMPONENT_CATALOG.length} lab components, demos, and patterns.`,
  robots: { index: false, follow: false },
};

export default function ComponentsIndexPage() {
  return (
    <div className="min-h-screen bg-background pb-24 pt-28">
      <ComponentsCatalog />
    </div>
  );
}
