/**
 * All Speaksy solution capabilities as Expand Product Cards.
 * Visual “product” = isometric objects (iso-features), Speaksy green theme.
 */
import {
  SOLUTION_CAPABILITIES,
  SOLUTION_CATEGORIES,
  type SolutionCategoryId,
} from "@/lib/solutions";
import { CAPABILITY_ISO_ICON } from "@/components/iso-features/solution-features";
import { ISO_ICON_MAP } from "@/components/iso-features/icons";
import type { ProductCardData } from "./data";

/** Website-aligned palette — emerald / forest / mint rotations */
const THEME_SURFACES: {
  color: string;
  text: "dark" | "light";
  iconHot: string;
  iconIdle: string;
}[] = [
  { color: "#ecfdf5", text: "dark", iconHot: "#059669", iconIdle: "#6ee7b7" },
  { color: "#10B981", text: "light", iconHot: "#ffffff", iconIdle: "#a7f3d0" },
  { color: "#064E3B", text: "light", iconHot: "#6ee7b7", iconIdle: "#34d399" },
  { color: "#d1fae5", text: "dark", iconHot: "#047857", iconIdle: "#6ee7b7" },
  { color: "#059669", text: "light", iconHot: "#ecfdf5", iconIdle: "#a7f3d0" },
  { color: "#f0fdf4", text: "dark", iconHot: "#10B981", iconIdle: "#86efac" },
  { color: "#047857", text: "light", iconHot: "#ffffff", iconIdle: "#6ee7b7" },
  { color: "#bbf7d0", text: "dark", iconHot: "#065f46", iconIdle: "#34d399" },
];

const ROTATIONS = [-12, 10, -8, 14, -14, 8, -6, 12, -10, 6];

export function capabilityToProductCard(
  cap: (typeof SOLUTION_CAPABILITIES)[number],
  index: number
): ProductCardData {
  const theme = THEME_SURFACES[index % THEME_SURFACES.length];
  const iconKey = CAPABILITY_ISO_ICON[cap.id] ?? "relay";
  const Icon = ISO_ICON_MAP[iconKey];
  const cat = SOLUTION_CATEGORIES.find((c) => c.id === cap.category);

  return {
    id: cap.id,
    eyebrow: cat?.name ?? cap.focus,
    /** Collapsed: short capability name */
    title: cap.focus,
    body: cap.description,
    color: theme.color,
    text: theme.text,
    Icon,
    iconHot: theme.iconHot,
    iconIdle: theme.iconIdle,
    restRotate: ROTATIONS[index % ROTATIONS.length],
    productWidth: 136,
    badges: cap.badges,
    cta: { label: "See this on a live call", href: "/contact" },
    /** Expanded: plain-English story for non-tech buyers */
    expandTitle: cap.title,
    expandBody: cap.expand.story,
    takeaways: cap.expand.takeaways,
  };
}

export function allSolutionProductCards(): ProductCardData[] {
  return SOLUTION_CAPABILITIES.map((cap, i) =>
    capabilityToProductCard(cap, i)
  );
}

export function solutionCardsByCategory(): {
  categoryId: SolutionCategoryId;
  name: string;
  tagline: string;
  cards: ProductCardData[];
}[] {
  let idx = 0;
  return SOLUTION_CATEGORIES.map((cat) => {
    const caps = SOLUTION_CAPABILITIES.filter((c) => c.category === cat.id);
    const cards = caps.map((cap) => {
      const card = capabilityToProductCard(cap, idx);
      idx += 1;
      return card;
    });
    return {
      categoryId: cat.id,
      name: cat.name,
      tagline: cat.tagline,
      cards,
    };
  }).filter((g) => g.cards.length > 0);
}

/** Match-flow: only the AI-selected capability cards */
export function matchCapsToProductCards(
  caps: { id: string; reason?: string }[]
): ProductCardData[] {
  return caps
    .map((row, i) => {
      const full = SOLUTION_CAPABILITIES.find((c) => c.id === row.id);
      if (!full) return null;
      const card = capabilityToProductCard(full, i);
      if (row.reason) {
        card.body = row.reason;
        card.expandBody = `${row.reason}\n\n${full.expand.story}`;
      }
      return card;
    })
    .filter(Boolean) as ProductCardData[];
}
