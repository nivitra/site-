import type { Metadata } from "next";
import ExpandFabMenu from "@/components/expand-fab-menu/ExpandFabMenu";

export const metadata: Metadata = {
  title: "Expand FAB Menu · Lab",
  description:
    "Bottom-left plus button expands into action tiles with backdrop blur and stagger morph.",
  robots: { index: false, follow: false },
};

export default function ExpandFabPage() {
  return <ExpandFabMenu />;
}
