# Brand Fan — Speaksy use guide

**Lab:** `/lab/brand-fan`  
**Component:** `BrandFanDiagram`  
**Vibe:** Hub icon fans curved paths to logos; blue light travels the wires.

---

## What it is

A “nervous system” diagram: one stack hub → six curved spokes → monochrome logos, with **blue pulses** racing along the paths.

---

## Speaksy placements

### 1. Integrations page (`/integrations`) — primary hero
Hub = Speaksy core. Spokes = CRM, dialer, WhatsApp, payment, helpdesk, warehouse.  
**Line:** “One voice brain. Every system you already run.”

### 2. Homepage “Works with your stack”
Compact fan under TrustedBy. Swap Apple/Nike for **Shopify, Zoho, Salesforce, Exotel, Gupshup, Razorpay** (or India-relevant tools).

### 3. Security story
Hub = encrypted voice fabric. Spokes = “no training on your data”, “region lock”, “SSO”, “audit”.  
Pulse = “live attestation heartbeat”.

### 4. Enterprise pitch decks / sales room
Full-bleed dark section during demos: “Your stack plugs in here.”

### 5. Careers / culture
Hub = platform team. Spokes = product, GTM, support, partners — “everything routes through the mission”.

---

## How to use

```tsx
import { BrandFanDiagram } from "@/components/brand-fan";
// Swap BRAND_ICONS in BrandIcons.tsx for partner SVGs
// Tweak LOGO_XS / curvePath for 4–8 spokes
```

1. Keep **monochrome white** logos on black for that Apple-keynote clarity.
2. Pulse color → Speaksy green (`#22c55e`) for brand fit, or keep electric blue for “data path” metaphor.
3. Optional: hover a logo to freeze pulse on that path + show tooltip “Native WhatsApp BSP”.

---

## Creative Speaksy spins

| Spin | Idea |
|------|------|
| **Call path** | Pulse = a live call flowing from Speaksy → CRM → payment link. |
| **Fail-over** | On click, one path turns red then heals — resilience story. |
| **Language fan** | Logos replaced by language scripts; pulse = “routing to correct voice”. |

---

## Success metric

Integrations page demo requests; time spent on integrations section.
