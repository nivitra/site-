import type { LucideIcon } from "lucide-react";
import { Settings, Sun, Box, TrendingUp } from "lucide-react";

/** Lab demo cards — also compatible with RevealHoverCardData */
export type RevealCard = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  cta?: string;
  badge?: string;
};

export const REVEAL_CARDS: RevealCard[] = [
  {
    id: "green",
    title: "Green compliance",
    description:
      "Track emissions, audits, and supplier certifications in one living record.",
    href: "#",
    icon: Settings,
    image: "/lab/reveal-1.png",
    imageAlt: "Portrait for green compliance card",
  },
  {
    id: "environment",
    title: "Environment assurance",
    description:
      "Independent assurance for sustainability claims your customers can trust.",
    href: "#",
    icon: Sun,
    image: "/lab/reveal-2.png",
    imageAlt: "Portrait for environment assurance card",
  },
  {
    id: "supply",
    title: "Supply chain clarity",
    description:
      "Map multi-tier suppliers and surface risk before it hits the board pack.",
    href: "#",
    icon: Box,
    image: "/lab/reveal-1.png",
    imageAlt: "Portrait for supply chain card",
  },
  {
    id: "growth",
    title: "Growth with guardrails",
    description:
      "Scale responsibly with live metrics that keep teams honest and aligned.",
    href: "#",
    icon: TrendingUp,
    image: "/lab/reveal-2.png",
    imageAlt: "Portrait for growth card",
  },
];
