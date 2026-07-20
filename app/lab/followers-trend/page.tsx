import type { Metadata } from "next";
import FollowersTrendScene from "@/components/followers-trend/FollowersTrendScene";

export const metadata: Metadata = {
  title: "Followers Trend · Lab",
  description:
    "Interactive followers bar chart with hover scrubber and value tooltip pill.",
  robots: { index: false, follow: false },
};

export default function FollowersTrendPage() {
  return <FollowersTrendScene />;
}
