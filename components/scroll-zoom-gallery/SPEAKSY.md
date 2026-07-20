# Scroll Zoom Gallery — Speaksy use guide

**Lab:** `/lab/scroll-zoom`  
**Component:** `ScrollZoomGallery`  
**Vibe:** Sticky stage; 2×2 collage scales with scroll — dive in, pull back, SCROLL/REMIX beats.

---

## What it is

Cinematic storytelling via **scroll-linked scale**. A 2×2 grid of images becomes the universe; scroll dives into one tile then pulls out again. Interstitial labels (SCROLL / REMIX) set rhythm.

---

## Speaksy placements

### 1. Homepage mid-funnel “world of use cases”
Tiles:

1. D2C warehouse / COD  
2. NBFC collections desk  
3. Hospital appointment desk  
4. Multi-language agent UI  

**Labels:** SCROLL · SPEAK · SCALE · CLOSE

### 2. Brand film substitute
When you can’t produce a 30s video, this section *is* the film — 5 viewport heights of emotion.

### 3. Careers “life at Speaksy”
Office, product, customers, city — dive into culture.

### 4. Product launch landers
One tile per pillar: Languages · Pricing · Security · Outcomes.

### 5. Event stage LED / booth loop
Auto-scroll or scrub timeline for non-interactive displays.

---

## How to use

```tsx
import ScrollZoomGallery from "@/components/scroll-zoom-gallery/ScrollZoomGallery";
// Replace IMAGES paths; tune scale keyframes in useTransform
```

1. Use **high-res square-ish** crops (same aspect) so seams stay clean.
2. Bias `transformOrigin` toward the hero tile (device/product shot).
3. Mobile: shorten `h-[500vh]` → `h-[320vh]` and reduce max scale.

---

## Creative Speaksy spins

| Spin | Idea |
|------|------|
| **Audio duck** | Soft ambient call room noise while diving. |
| **Metric overlays** | At peak zoom, flash “+34% connect rate”. |
| **Green pulse** | Brand-color scale flash at REMIX beat. |

---

## Success metric

Scroll completion rate; demo CTA clicks after the section.
