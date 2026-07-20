import type { Metadata } from "next";
import CenteredCrosshairActionMenu from "@/components/crosshair-action-menu/CenteredCrosshairActionMenu";

export const metadata: Metadata = {
  title: "Crosshair Action Menu · Lab",
  description:
    "Centered crosshair canvas with expanding Add job action menu and edge diamonds.",
  robots: { index: false, follow: false },
};

export default function CrosshairActionMenuPage() {
  return (
    <div className="fixed inset-0 z-[80]">
      <CenteredCrosshairActionMenu />
    </div>
  );
}
