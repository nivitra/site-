export type GradientBar = {
  id: string;
  /** Tall strip for collapsed / wave states */
  bar: string;
  /** Full mesh for expanded square (lab art fallback) */
  mesh: string;
};

export const GRADIENT_BARS: GradientBar[] = Array.from({ length: 11 }, (_, i) => {
  const n = String(i).padStart(2, "0");
  return {
    id: `bar-${n}`,
    bar: `/lab/gradient-bars/bar_${n}.jpg`,
    mesh: `/lab/gradient-bars/mesh_${n}.jpg`,
  };
});

/**
 * Lab-exact dimensions (from GradientBars recording demo).
 * Keep these as the source of truth for homepage + nav (scaled).
 */
export const BASE_H = 280;
export const PEAK_H = 420;
export const BAR_W = 52;
export const EXPAND_SIZE = 340;
export const GAP = 18;
/** Gaussian falloff — lab uses a soft wide wave */
export const WAVE_SIGMA = 1.85;

/** Title-case vertical labels on bar faces */
export const BAR_LABELS: Record<string, string> = {
  ecommerce: "E-commerce",
  automotive: "Automotive",
  "bfsi-lending": "Lending",
  insurance: "Insurance",
  "brokerage-capital-markets": "Brokerage",
  "real-estate": "Real estate",
  education: "Education",
  healthcare: "Healthcare",
  "telecom-it": "Telecom",
  "travel-hospitality": "Travel",
};

/** Expand-state photos (from `bars click/`) — one per industry slug */
export const INDUSTRY_EXPAND_PHOTOS: Record<string, string> = {
  ecommerce: "/industries/expand/ecommerce.jpg",
  automotive: "/industries/expand/automotive.jpg",
  "bfsi-lending": "/industries/expand/bfsi-lending.jpg",
  insurance: "/industries/expand/insurance.jpg",
  "brokerage-capital-markets": "/industries/expand/brokerage-capital-markets.jpg",
  "real-estate": "/industries/expand/real-estate.jpg",
  education: "/industries/expand/education.jpg",
  healthcare: "/industries/expand/healthcare.jpg",
  "telecom-it": "/industries/expand/telecom-it.jpg",
  "travel-hospitality": "/industries/expand/travel-hospitality.jpg",
};
