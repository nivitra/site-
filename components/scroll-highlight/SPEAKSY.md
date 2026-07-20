# Scroll Highlight — Speaksy use guide

**Lab:** `/lab/scroll-highlight`  
**Component:** `ScrollHighlightArticle` / `HighlightMark`  
**Vibe:** Black reading canvas; phrases **paint in** with a diagonal highlighter edge on scroll (blue / yellow / purple).

---

## What it is

Exact recreation of the “Scroll Highlight for Framer” demo (Jhey-style wipe):

- `linear-gradient(120deg, color 50%, transparent 50%)` + `background-position` transition  
- Diagonal leading edge while painting  
- Multi-line marks via `box-decoration-break: clone`  
- Fires once when the mark is fully in view  

---

## Speaksy placements

### 1. Homepage manifesto / why Speaksy
Highlight key phrases: **10 languages**, **₹3.99/min**, **human-like**.

### 2. Platform page — under-the-hood
Paint **low latency**, **barge-in**, **compliance** as the reader scrolls.

### 3. Case study / blog
Mark metrics and quotes so skimmers still get the story.

### 4. Pricing FAQ answers
Highlight the one number that matters in each answer.

---

## How to use

```tsx
import { HighlightMark } from "@/components/scroll-highlight";
import "@/components/scroll-highlight/scroll-highlight.css";

<p className="text-[#909698]">
  Speaksy runs{" "}
  <HighlightMark color="blue">10 Indian languages</HighlightMark>
  {" "}on every call.
</p>
```

Or mount the full demo: `ScrollHighlightScene`.

---

## Creative Speaksy spins

| Spin | Idea |
|------|------|
| **Brand green** | Add `HL.green = "#22c55e"` for product pages |
| **Call transcript** | Highlight agent vs customer turns in different colors |
| **Language showcase** | Same sentence, highlight the local-script phrase |

---

## Success metrics

- Scroll depth on long-form pages  
- Time on page / FAQ  
- CTA clicks after highlighted proof points  
