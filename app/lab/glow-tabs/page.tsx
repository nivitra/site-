import type { Metadata } from "next";
import GlowTabsScene from "@/components/glow-tabs/GlowTabsScene";

export const metadata: Metadata = {
  title: "Glow Tabs · Lab",
  description:
    "Glass Emails / Attachments tabs with ambient glow and sliding light bar.",
  robots: { index: false, follow: false },
};

export default function GlowTabsPage() {
  return <GlowTabsScene />;
}
