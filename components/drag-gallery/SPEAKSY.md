# Drag Gallery — Speaksy use guide

**Lab:** `/lab/drag-gallery`  
**Component:** `DragScrollGallery`  
**Vibe:** Freeform black canvas of images; pan with drag, wheel, or keys. “SCROLL/DRAG TO MOVE”.

---

## What it is

A **spatial moodboard** — not a grid. Users explore a field of prints like a gallery floor plan. Hint fades after first pan.

---

## Speaksy placements

### 1. “World of customers” (Customers page hero)
Scatter:

- Warehouse COD stations  
- Bank collection floors  
- Clinic front desks  
- Agent headset close-ups  
- City skylines of markets Speaksy serves  

Captions: industry + metric (“−28% RTO”).

### 2. Brand film alternative
Founder office, product UI, whiteboard sessions — culture without a video budget.

### 3. Conference booth interactive
Touch-drag on a large display; more memorable than a looping MP4.

### 4. Case study universe
Each print is a deep-link into a story; drag is the navigation paradigm.

### 5. Language atlas
Photos of regions + native script captions — cousin to Language Marquee, more exploratory.

---

## How to use

```tsx
import DragScrollGallery from "@/components/drag-gallery/DragScrollGallery";
// GALLERY_ITEMS + CANVAS size in data.ts
```

1. Keep canvas larger than viewport (`CANVAS` ~ 2–3×).
2. Compress images; lazy-load offscreen if you grow beyond ~20 items.
3. Mobile: two-finger pan optional; wheel/trackpad primary on desktop.

---

## Creative Speaksy spins

| Spin | Idea |
|------|------|
| **Live pins** | Pulsing green dots on “calls happening now” cities. |
| **Snap to story** | Double-click centers + opens case study drawer. |
| **Day/night** | Time-based photo set. |

---

## Success metric

Interaction rate; case study opens from gallery.
