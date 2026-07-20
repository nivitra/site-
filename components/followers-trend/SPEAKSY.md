# Followers Trend — Speaksy use guide

**Lab:** `/lab/followers-trend`  
**Component:** `FollowersTrendCard`  
**Vibe:** Dark analytics card, rising bars, hover scrubber + value pill.

---

## What it is

A compact “serious dashboard” widget: scrub across bars, see a glowing guide line and a floating number. Footer stats ground the story (totals + deltas).

---

## Speaksy placements

### 1. Homepage social proof (replace static counters)
Rename to **Calls answered** / **Trend**.  
Bars = last 28 days of outbound+inbound.  
Footer: **TOTAL CALLS** · **CONNECT RATE**.

### 2. Customers / case study pages
Per-customer widget: “EMI reminders completed — March → June”.  
Scrubber shows daily volume; builds trust with operators.

### 3. Pricing ROI section
**Minutes used vs human dialer hours saved** — dual story in one card.

### 4. Live ops (console)
Real-time feed: scrub last hour by 2-minute buckets.  
Pair with green brand bars instead of white.

### 5. Investor / press kit
“Growth without headcount” — elegant enough for a screenshot in a deck.

---

## How to use

```tsx
import { FollowersTrendCard } from "@/components/followers-trend";
// Swap buildBars() for API data
// Rename TOTAL_FOLLOWERS / NEW_FOLLOWERS labels
```

1. Feed `bars: { value: number }[]` from analytics API.
2. Keep bar count ~24–32 for the “dense pin” look.
3. On mobile, support touch-drag scrub (pointer events already work).

---

## Creative Speaksy spins

| Spin | Idea |
|------|------|
| **Language breakdown** | Scrub shows “62% Hindi · 18% Hinglish…” tooltip. |
| **Outcome colors** | Bar color = paid / promised / no-answer mix. |
| **Compare mode** | Two scrubbers: Speaksy vs human team. |

---

## Success metric

Section dwell time; demo conversions after social-proof block.
