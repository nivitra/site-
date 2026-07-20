import type { ComponentType } from "react";
import type { IconProps } from "@/components/iso-features/icons";

export type ProductCardData = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  /** Card + expanded surface */
  color: string;
  /** Title / body on expanded (and collapsed title) */
  text: "dark" | "light";
  /** Optional PNG product (lab). Prefer Icon for Speaksy. */
  image?: string;
  /** Isometric object — preferred for Speaksy solutions */
  Icon?: ComponentType<IconProps>;
  /** Active stroke for iso object on this surface */
  iconHot?: string;
  iconIdle?: string;
  /** Collapsed product base rotation (deg) */
  restRotate: number;
  /** Product size in collapsed card (px) */
  productWidth: number;
  badges?: string[];
  cta?: { label: string; href: string };
  /**
   * Expanded panel only — human headline + solid plain-English story.
   * Collapsed card keeps short `title` / `body`.
   */
  expandTitle?: string;
  expandBody?: string;
  takeaways?: string[];
};

/** Lab demo cards (IKEA-style cutouts) */
export const PRODUCT_CARDS: ProductCardData[] = [
  {
    id: "nature",
    eyebrow: "Rustic organic interiors",
    title: "In home nature",
    body: "Nostalgic, rustic styles against layers of nature-inspired shades and textures create a calm cosiness and a welcome respite from colour drenched maximalism. Let's snuggle up, shall we?",
    color: "#B9CBBD",
    text: "dark",
    image: "/lab/expand-cards/vase.png",
    restRotate: -10,
    productWidth: 230,
  },
  {
    id: "fabric",
    eyebrow: "Patterns and prints",
    title: "Fabric favorites",
    body: "Cut fabrics made a comeback in fun new prints and much-loved designs from our archive as the IKEA Museum and the Tyg home fabric collection celebrate IKEA's rich textile history.",
    color: "#6442F0",
    text: "light",
    image: "/lab/expand-cards/pillow.png",
    restRotate: 14,
    productWidth: 270,
  },
];
