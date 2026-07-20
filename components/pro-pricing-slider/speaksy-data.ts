/** Business volume ladder — rate drops as daily calls grow (hard stop at 300). */
export type VolumeStep = {
  id: string;
  plan: string;
  /** Upper bound of daily call volume for this stop */
  maxDaily: number;
  range: string;
  /** ₹ per live talk minute */
  rate: number;
};

export const BUSINESS_VOLUME_STEPS: VolumeStep[] = [
  {
    id: "starter",
    plan: "Starter",
    maxDaily: 100,
    range: "Up to 100 calls / day",
    rate: 5.2,
  },
  {
    id: "growth",
    plan: "Growth",
    maxDaily: 200,
    range: "101 – 200 calls / day",
    rate: 5.0,
  },
  {
    id: "scale",
    plan: "Scale",
    maxDaily: 300,
    range: "201 – 300 calls / day",
    rate: 4.7,
  },
];

/** Always one decimal so ₹5.0 / ₹5.2 / ₹4.7 read consistently */
export const formatRate = (rate: number) =>
  `₹${rate.toLocaleString("en-IN", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })}`;
