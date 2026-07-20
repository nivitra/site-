# Glow Tabs — Speaksy use guide

**Lab:** `/lab/glow-tabs`  
**Component:** `GlowTabs`  
**Vibe:** Frosted pills, sliding white light bar, soft ambient glow under the active choice.

---

## What it is

A premium segmented control: glass buttons, active state with specular edge, **radial glow** that follows the selection, and a **lit underline** that springs under the active tab.

---

## Speaksy placements

### 1. Homepage — “How you connect”
Tabs: **Inbound** | **Outbound** | **Both**  
Glow underlines the ops model; content panel swaps `CallDemo` / pipeline diagrams.

### 2. Pricing — billing toggle (hero of `/pricing`)
Tabs: **Pay as you go** | **Commitment**  
The glow makes plan choice feel expensive-product, not a dull radio button.  
Sync with existing `PricingCalculator` state.

### 3. Platform page — channel switcher
Tabs: **Voice** | **WhatsApp** | **Handoff**  
Attachments/Emails energy → Speaksy’s multi-channel story.

### 4. Sample call player
Tabs: **Listen** | **Transcript** | **Analytics**  
Underline tracks mode; waveform stays mounted for continuity.

### 5. Security / compliance
Tabs: **India data** | **Encryption** | **Audit logs**  
Dark page + glow = “serious infrastructure” without looking like a bank PDF.

---

## How to use

```tsx
import { GlowTabs } from "@/components/glow-tabs";

// Extend TABS array in GlowTabs.tsx (or pass tabs as props if you generalize):
// { id, label, Icon }
```

**Generalize for Speaksy:**
1. Accept `tabs: { id; label; Icon }[]` and `value` / `onChange`.
2. Keep glow colors on white/neutral (or brand-green tint for Speaksy: soft green radial).
3. Pair with `AnimatePresence` content below (don’t remount heavy audio players if possible).

---

## Creative Speaksy spins

| Spin | Idea |
|------|------|
| **Language glow** | Tabs are scripts (हिं · த · తె) — glow color shifts per script. |
| **Live vs Recorded** | Active “Live demo” tab pulses the ambient glow with call volume. |
| **Risk mode** | Collections vs Support — red-tinted vs green-tinted glow. |

---

## Success metric

Pricing plan toggle engagement; drop-off before calculator.
