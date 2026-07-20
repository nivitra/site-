# Hover Link Preview — Speaksy use guide

**Lab:** `/lab/hover-link-preview`  
**Component:** `HoverPreviewLink` / `HoverLinkPreviewScene`  
**Vibe:** Body copy with bold links; hover pops a floating site/screenshot card (portaled to `body`).

---

## What it is

Editorial trust: sentences with **weight words** that reveal a preview card (screenshot of a page, dashboard, or partner). Springy, Apple-smooth, no layout jump (portal).

---

## Speaksy placements

### 1. Homepage manifesto paragraph
> Speaksy runs **collections**, **COD confirms**, and **lead calls** in **Hindi** and **Tamil**…

Hover “collections” → mini pipeline screenshot.  
Hover “Hindi” → language page preview or waveform still.

### 2. Integrations copy
> Connects to your **CRM** and **WhatsApp BSP** without duct tape.

Previews of integration docs or logos-in-UI.

### 3. Security narrative
Hover **“India region”** → architecture diagram crop.  
Hover **“audit logs”** → console screenshot.

### 4. Case study intros
Hover the customer name → photo + metric card.

### 5. Footer legal / trust strip (light use)
One or two previews max — don’t turn legal into a carnival.

---

## How to use

```tsx
import { HoverPreviewLink } from "@/components/hover-link-preview";
import { PREVIEW_LINKS } from "@/components/hover-link-preview";

// In prose:
// <HoverPreviewLink link={PREVIEW_LINKS.university} />
```

1. Always **portal** previews (already done) — never nest `div` in `p`.
2. Prefer **div wrappers** for paragraphs containing links.
3. Capture Speaksy UI screenshots into `/public/lab/link-previews/`.
4. Mobile: use long-press or skip previews (hover-only).

---

## Creative Speaksy spins

| Spin | Idea |
|------|------|
| **Live metric preview** | Card shows “2.4M calls this month” from API. |
| **Audio hover** | Preview card includes mute 3s sample. |
| **Founder note** | Hover “we built this in Bengaluru” → office photo. |

---

## Success metric

Hover rate on key phrases; secondary CTR to linked destinations.
