# Data Encrypted — Speaksy use guide

**Lab:** `/lab/data-encrypted`  
**Component:** `DataEncrypted`  
**Vibe:** Glass encryption capsule — plaintext scrolls into a cyan laser and exits as cipher. MAXIMUM PRIVACY.

---

## What it is

A cinematic **privacy proof**: readable phrases (passwords, call audio, transcripts) pass through a center beam and become gibberish. Soft scan lines, particles, and a glass pill edge. Underneath: **MAXIMUM PRIVACY** + **Your data. Encrypted.**

---

## Speaksy placements

### 1. `/security` hero
Drop the capsule under “Bank-grade privacy” — phrases already Speaksy-native (`Customer Call Audio`, `Transcripts Stay Private`).

### 2. Homepage trust band
Between stats and FAQ — one silent 8s loop sells encryption harder than a lock icon grid.

### 3. Pricing enterprise tier
Expand “SOC2 / encryption” into this motion piece on hover/click.

### 4. Sales deck / demo wait screen
Fullscreen black + capsule while the AE joins the call.

### 5. Blog “how we store data”
Hero illustration for the privacy post.

---

## How to use

```tsx
import DataEncrypted from "@/components/data-encrypted/DataEncrypted";
// Edit PLAIN_PHRASES / HEADLINE / BADGE in data.ts
```

1. Keep marquee ~28s loop (feels premium, not frantic).  
2. Prefer short phrases (2–4 words) so characters read at the beam.  
3. Optional: pause marquee on `prefers-reduced-motion` (already slowed).  

---

## Creative Speaksy spins

| Spin | Idea |
|------|------|
| **Live cipher** | Cipher side = real base64 of the plain phrase. |
| **Region badge** | Badge → `DATA IN INDIA` / `AES-256`. |
| **Dual beam** | Two capsules: “In transit” / “At rest”. |
| **Voice line** | Soft “encrypted” whisper when phrase crosses the beam. |

---

## Success metrics

- Dwell time on `/security` +20%  
- “Is data safe?” sales objections down after demo includes this slide  
