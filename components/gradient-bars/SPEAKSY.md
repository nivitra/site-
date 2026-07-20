# Gradient Bars — Speaksy use guide

**Lab:** `/lab/gradient-bars`  
**Component:** `GradientBars`  
**Vibe:** Holographic fluid strips — hover wave, click expands a pure mesh square; siblings blur.

---

## What it is

Eleven vertical **mesh-gradient** bars on black. Cursor pulls a soft gaussian height wave. Click morphs a bar into a sharp square of fluid art; neighbors go soft-focus.

---

## Speaksy placements

### 1. Brand / emotion moment on homepage
Map bars → languages or industries (color = market). Expand shows a short line of copy over the mesh.

### 2. `/languages` hero
11 bars ≈ top language mix — expand reveals “Hindi · 34% of calls” style stats.

### 3. Empty state / loading art
Use the rest wave as a living idle while a demo boots.

### 4. Event / launch page
Full-bleed black section — pure flex, no chrome.

---

## How to use

```tsx
import GradientBars from "@/components/gradient-bars/GradientBars";
// Swap meshes in public/lab/gradient-bars/
```

1. Keep bar count 9–13 for the wave to read.  
2. Prefer square meshes ≥ 600px for expand crispness.  
3. Wire `onExpand(id)` for analytics if mapping to product.

---

## Success metrics

- Hover engagement > 40% of section viewers  
- Expand rate > 15%  
- Time-to-second-expand (comparison)  
