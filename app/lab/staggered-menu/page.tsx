import type { Metadata } from "next";
import StaggeredAnimatedMenu from "@/components/staggered-menu/StaggeredAnimatedMenu";

export const metadata: Metadata = {
  title: "Staggered Menu · Lab",
  description: "Staggered animated menu list with layout spring physics.",
  robots: { index: false, follow: false },
};

export default function StaggeredMenuPage() {
  return <StaggeredAnimatedMenu />;
}
