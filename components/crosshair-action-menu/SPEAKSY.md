# Crosshair Action Menu — Speaksy use guide

**Lab:** `/lab/crosshair-action-menu`  
**Component:** `CenteredCrosshairActionMenu`  
**Vibe:** Black canvas, H/V crosshair, 6-dot trigger → “Add job” popover with edge diamonds.

---

## What it is

A precision tool UI: axes appear, center trigger expands into a **command palette of jobs**. Vertical line only when open. Feels like a node editor / ops console, not a brochure.

---

## Speaksy placements

### 1. Platform “start a campaign” moment
Jobs:

- **Outbound batch**  
- **Inbound queue**  
- **COD confirm**  
- **EMI reminder**  
- **Lead qualify**  
- **Custom script**  

Footer: “Or describe it in plain language” → natural language campaign builder.

### 2. Console empty state
When no campaigns exist, this is the first paint — better than “No data”.

### 3. Homepage for technical buyers
One section: “Compose calls like workflows.”

### 4. Partner API story
Jobs map to API endpoints; hover shows method names.

### 5. Internal ops tool
Same component, internal labels.

---

## How to use

```tsx
import CenteredCrosshairActionMenu from "@/components/crosshair-action-menu/CenteredCrosshairActionMenu";
// CROSSHAIR_ACTIONS in data.ts
```

1. Keep diamond markers aligned to axes — that’s the “engineered” detail.
2. Esc + click-outside close (built-in).
3. Vertical axis only when `open` (built-in).

---

## Creative Speaksy spins

| Spin | Idea |
|------|------|
| **Live count** | Badge on tiles: “12k COD/day”. |
| **NL prompt** | Footer input runs LLM → prefilled campaign. |
| **Green diamonds** | Brand-colored edge markers when a job is “recommended”. |

---

## Success metric

Campaign creation starts; time-to-first-campaign.
