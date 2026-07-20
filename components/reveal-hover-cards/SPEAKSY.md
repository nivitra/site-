# Reveal Hover Cards — Speaksy use guide

**Lab:** `/lab/reveal-hover-cards`  
**Component:** `RevealHoverCardGrid` / `RevealHoverCard`  
**Vibe:** Cream canvas; white cards; hover = **bottom-up clip-path curtain** revealing full-bleed image + white “Learn More”.

---

## What it is

Four feature cards. Default: icon + title + copy. Hover: image unrolls from the bottom with spring clip-path (not a cheap opacity fade). Cinematic and product-worthy.

---

## Speaksy placements

### 1. Homepage feature row (light section break)
On Speaksy’s dark site, use a **cream island** section for contrast — “Human moments”.

Cards:

1. Collections that stay polite  
2. COD that actually confirms  
3. Leads that don’t go cold  
4. Handoff to humans in one tap  

Hover images: real operator / customer moments (with permission).

### 2. Industries (`/solutions`)
One card per industry; hover shows vertical photo + “See playbook”.

### 3. Pricing value props
Light background section mid-page — breaks dark monotony.

### 4. About / culture
Team values with photo reveals.

### 5. Event landing
Speakers or sessions as reveal cards.

---

## How to use

```tsx
import RevealHoverCardGrid from "@/components/reveal-hover-cards/RevealHoverCardGrid";
// REVEAL_CARDS in data.ts — icons, titles, images
```

1. Prefer portrait photos for the reveal layer.
2. Keep spring `{ bounce: 0, duration: 0.5 }` for that Framer curtain.
3. Mobile: tap toggles reveal (add click handler if needed).

---

## Creative Speaksy spins

| Spin | Idea |
|------|------|
| **Waveform reveal** | Image is a still; second layer is animated waveform. |
| **Language card** | Hover reveals native-script dialogue snippet. |
| **Metric stamp** | Corner badge “+18% connect” on image layer. |

---

## Success metric

Hover/tap rate; CTR on Learn More.
