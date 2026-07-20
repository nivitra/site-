# Glass Layer Stack — Speaksy use guide

**Lab:** `/lab/glass-layer-stack`  
**Component:** `GlassLayerStack`  
**Vibe:** Pure black studio — thick isometric glass slabs; one lit cyan/blue layer; sticky-scroll advances; title ghost-crossfades. Exact from the recording.

---

## What it is

Four stacked glass tiles (isometric diamond). One is lit (cyan → blue). Scroll, click, or arrows move the highlight through the stack while title + body crossfade with a soft residual.

---

## Speaksy placements

### 1. Solutions / industries
Swap layers for **Lending · Real estate · Healthcare · Retail** with Speaksy use-case copy.

### 2. Platform primitives
Layers = **Inbound · Outbound · Handoff · Analytics**.

### 3. Pricing personas
**Startup · Growth · Enterprise · Partner**.

### 4. Language tiers
**Hindi · Hinglish · Tamil · Multi** — active plate = “live in that language.”

---

## How to use

```tsx
import { GlassLayerStack } from "@/components/glass-layer-stack";
// Edit LAYERS in data.ts (title, body, color, glow)
```

---

## Creative Speaksy spins

| Spin | Idea |
|------|------|
| **Brand green active** | Speaksy green on active plate only |
| **Autoplay** | `setInterval` next every 4s for trade-show loops |
| **Deep link** | `?layer=telecoms` sets initial index |

---

## Success metrics

- Layer interaction rate  
- Time on solutions section  
- CTA after finishing the stack cycle  
