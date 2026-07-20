# Iso Features — Speaksy use guide

**Lab:** `/lab/iso-features`  
**Component:** `IsoFeaturesScene` / `FeatureRow`  
**Vibe:** Isometric line icons; hover → purple stroke, corner brackets, inverted title pill.

---

## What it is

A product capabilities list that feels **engineered**, not “feature grid #47”. Icons are precise wire sculptures; hover is a selection moment (like picking a node in a design tool).

---

## Speaksy placements

### 1. Platform page core features
Map icons to Speaksy primitives:

| Icon metaphor | Speaksy feature |
|---------------|-----------------|
| Relay | Real-time STT/TTS pipeline |
| Enclaves | Secure execution / PII handling |
| Gateway | Telephony & SIP edge |
| Vault | Consent + recording policies |
| Mesh | Multi-region routing |
| Runtime | Agent runtime / tools |
| Atlas | Conversation analytics map |
| Pipeline | Campaign orchestration |

### 2. Security page
Same UI, compliance vocabulary. Purple → Speaksy green on hover for brand.

### 3. Homepage “Under the hood” (below fold)
4 features only — dense, technical buyers scroll here.

### 4. Developer / API docs marketing shell
Feels right next to code samples.

### 5. Partner enablement
Icons for “what you can white-label”.

---

## How to use

```tsx
import IsoFeaturesScene from "@/components/iso-features/IsoFeaturesScene";
// Edit FEATURES + icons.tsx SVGs
```

1. Keep **one active row** (hover focus).
2. Title pill invert is the hero micro-interaction — don’t remove it.
3. Optional: click opens a side drawer with deeper detail + “See in demo”.

---

## Creative Speaksy spins

| Spin | Idea |
|------|------|
| **Call graph** | Hover Mesh → tiny live edge animation. |
| **Latency badge** | Under description: “p95 < 400ms voice”. |
| **Status** | Green check for GA, amber for beta. |

---

## Success metric

Scroll depth on platform page; clicks into security from feature rows.
