export type SliderStep = {
  credits: number;
  /** Whole dollars for the big number */
  dollars: number;
  cents: number;
};

/** Pro: 6 stops — matches recording $49.99…$99.99 / 5k…10k */
export const PRO_STEPS: SliderStep[] = [
  { credits: 5_000, dollars: 49, cents: 99 },
  { credits: 6_000, dollars: 59, cents: 99 },
  { credits: 7_000, dollars: 69, cents: 99 },
  { credits: 8_000, dollars: 79, cents: 99 },
  { credits: 9_000, dollars: 89, cents: 99 },
  { credits: 10_000, dollars: 99, cents: 99 },
];

/** Business: 6 stops — $299.99…$349.99 / 30k…35k */
export const BUSINESS_STEPS: SliderStep[] = [
  { credits: 30_000, dollars: 299, cents: 99 },
  { credits: 31_000, dollars: 309, cents: 99 },
  { credits: 32_000, dollars: 319, cents: 99 },
  { credits: 33_000, dollars: 329, cents: 99 },
  { credits: 34_000, dollars: 339, cents: 99 },
  { credits: 35_000, dollars: 349, cents: 99 },
];

export function formatCredits(n: number) {
  return n.toLocaleString("en-US");
}
