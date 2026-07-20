# Expand Product Cards — Speaksy use guide

**Lab:** `/lab/expand-product-cards`  
**Component:** `ExpandProductCards`  
**Vibe:** Dual product tiles on black → spring morph into a full-bleed editorial panel with ghost product watermark.

---

## What it is

Two oversized, rounded product cards. Products float *above* the card edge with live cursor-tilt. Click → the shell, product, eyebrow, and title **layout-morph** into a full-viewport color field; body copy fades in; a white close pill appears top-right. Second card dims in place.

---

## Speaksy placements

### 1. Homepage “two doors” chooser
Left: **Inbound voice**. Right: **Outbound campaigns**. Expand each into a one-paragraph pitch + CTA.

### 2. Industries / solutions pair
Replace fabric/nature copy with **Banking** vs **Healthcare** (or any two ICPs). Product images → UI mock cutouts or language glyphs.

### 3. Pricing philosophy
“Usage” vs “Commitment” — expand reveals what each path is for, without a table wall.

### 4. Languages pride
Two hero languages (e.g. Hindi / Hinglish) expand into sample call scripts.

### 5. Security story
**On-prem feel** vs **Cloud control plane** — expand into compliance bullets.

---

## How to use

```tsx
import ExpandProductCards from "@/components/expand-product-cards/ExpandProductCards";
// or map PRODUCT_CARDS in data.ts and compose ProductCard + ExpandedCard
```

1. Edit `PRODUCT_CARDS` — colors, copy, PNG cutouts with transparent bg.
2. Keep body copy ~2–3 lines (recording cadence).
3. Wire analytics: `track('expand_card', { id })` in `onOpen`.
4. Mobile: stack cards; expand still full-bleed.

---

## Creative Speaksy spins

| Spin | Idea |
|------|------|
| **Voice ghost** | Ghost product is a waveform that plays a 3s sample on expand. |
| **Triple fan** | 3 cards (Sales / Support / Collections) with same morph. |
| **CRM logo product** | Floating Salesforce / HubSpot marks instead of vase/pillow. |
| **Reduced motion** | Skip tilt + use opacity crossfade only when `prefers-reduced-motion`. |

---

## Success metrics

- Expand open rate > 25% of viewport dwellers  
- Avg time in expanded state > 4s (reading body)  
- Close → second card open within same session (comparison intent)
