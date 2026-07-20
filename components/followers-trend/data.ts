/** ~28 daily bars spanning Feb → Jun, rising trend */
export function buildBars(): { value: number; month: string | null }[] {
  const months = ["Feb", "Mar", "Apr", "May", "Jun"] as const;
  const bars: { value: number; month: string | null }[] = [];
  const n = 28;
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    // Smooth growth ~120 → ~190 with mild noise
    const base = 118 + t * 72;
    const wave = Math.sin(i * 0.9) * 3 + Math.sin(i * 0.35) * 2;
    const value = Math.round(base + wave);
    // Month labels under first bar of each fifth
    const monthIdx = Math.min(months.length - 1, Math.floor((i / n) * months.length));
    const isLabel =
      i === 0 ||
      Math.floor(((i - 1) / n) * months.length) !== monthIdx;
    bars.push({
      value,
      month: isLabel ? months[monthIdx] : null,
    });
  }
  return bars;
}

export const TOTAL_FOLLOWERS = 587;
export const NEW_FOLLOWERS = 116;
