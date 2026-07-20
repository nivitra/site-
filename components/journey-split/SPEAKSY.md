# Journey Split (Scroll Cards) — Speaksy use guide

**Lab:** `/lab/journey-split`  
**Component:** `JourneyScrollCards`  
**Vibe:** One landscape splits into three panels, then 3D Y-flips into persona cards.

---

## What it is

A scroll-driven identity chooser: continuous image → gap split → flip to three paths. Perfect for “where are you in your journey?” storytelling.

---

## Speaksy placements

### 1. Homepage segment picker
Three backs:

1. **Starting voice AI** — first automation  
2. **Scaling minutes** — 10k → 1L calls/mo  
3. **Enterprise** — security, SSO, SLAs  

Each card CTA: “See plan” / “Book architecture call”.

### 2. Pricing prelude
Before tiers: choose journey → soft-highlight matching `PricingTiers` card.

### 3. Solutions hub
Industry journeys: D2C · Lending · Healthcare.

### 4. Onboarding (app)
First-run screen: pick use case → configures sample scripts.

### 5. Partner portal
Agency vs ISV vs BSP paths.

---

## How to use

```tsx
import JourneyScrollCards from "@/components/journey-split/JourneyScrollCards";
// Landscape: public/lab/journey-landscape.jpg
// FACES array: colors, titles, icons, copy
```

1. Keep scroll height ~`300vh` for desktop drama.
2. Ensure landscape image is wide and seamless for `background-size: 300%`.
3. Cards should answer a **business identity**, not vague marketing fluff.

---

## Creative Speaksy spins

| Spin | Idea |
|------|------|
| **Voice on flip** | Each card back plays a 2s sample in a matching persona voice. |
| **Price tease** | Flip reveals “From ₹X/min for this path”. |
| **Quiz mode** | Three questions then auto-scroll to recommended card. |

---

## Success metric

Card CTA CTR; correlation between chosen journey and closed plan type.
