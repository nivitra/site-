# Blinds Text Reveal — Speaksy use guide

**Lab:** `/lab/blinds-text-reveal`  
**Component:** `BlindsTextRevealPage` / `BlindsTextBlock`  
**Vibe:** Light page, wave field, colored blinds that open per line (out / in-out / alternate).

---

## What it is

Editorial motion design: each line of copy is covered by a **blind** that slides away to reveal text. Modes: clean open, two-phase in-out, odd/even opposite directions.

---

## Speaksy placements

### 1. Manifesto section (homepage or about)
Lines about “never miss a call”, “10 languages”, “human when it matters”.  
Brand colors: Speaksy green blinds instead of blue/purple/magenta.

### 2. Launch announcements
Product release notes with blinds — feels like a keynote slide.

### 3. Pricing philosophy
“Transparent. Minute-based. No seat tax.” — one section, one color.

### 4. Language poetry
Native-script lines with blinds matching language brand color.

### 5. Careers landing
Values statements revealed as you scroll into view.

---

## How to use

```tsx
import { BlindsTextBlock } from "@/components/blinds-text-reveal";

<BlindsTextBlock
  color="#22c55e"
  mode="out" // or "in-out"
  direction="alternate" // or left/right/up/down
  lines={["Line one", "Line two"]}
/>
```

1. Trigger via `useInView` (built-in) — one reveal per scroll into section.
2. Prefer **short lines** (recording rhythm).
3. Reduced motion: show text immediately, skip blinds.

---

## Creative Speaksy spins

| Spin | Idea |
|------|------|
| **Call transcript reveal** | Agent/user lines open with different colors. |
| **Compliance stamps** | Blinds are redacted bars that open to full policy. |
| **Multilingual cascade** | Same sentence in 3 scripts, staggered blinds. |

---

## Success metric

Scroll-through rate; brand recall in post-visit surveys.
