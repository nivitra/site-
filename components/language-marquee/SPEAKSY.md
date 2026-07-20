# Language Marquee — Speaksy use guide

**Lab:** `/lab/language-marquee`  
**Component:** `LanguageMarqueeScene` / `LanguageMarqueeRow`  
**Vibe:** Dark list → hover ignites a white infinite marquee with regional photography.

---

## What it is

A vertical stack of language names. Hover a row and it becomes a **moving light bar**: English label · native script · photo pill · repeat. It feels like switching radio stations across India.

---

## Speaksy placements (high impact)

### 1. Hero co-star (homepage)
Under the main headline (“Every call. Every language.”), replace a static language pill list with this marquee.  
**Story:** “Your customer speaks one of these — Speaksy already does.”  
On hover of **Tamil**, the marquee shows temple-street photography + `தமிழ்` — emotional, not corporate.

### 2. Languages index (`/languages`)
Full-page centerpiece. Each row links to `/languages/[slug]`.  
**CTA on hover:** small “Hear a sample →” appears in the marquee track.

### 3. Pricing “what’s included”
Instead of a bullet “10 languages”, use a compact marquee strip.  
**Conversion trick:** pause marquee when user hovers the language they care about — then show “From ₹3.99/min · included on all plans”.

### 4. Demo booking modal
While the lead form is open, a quiet marquee runs behind the form (low opacity).  
**Message:** the product is already multilingual before they type a word.

### 5. Campaign landers (e.g. “EMI calls in Hindi belt”)
Lock the marquee to 4–5 relevant languages only (Hindi, Hinglish, Marathi, Gujarati…).  
**Ad-to-page consistency:** same language names as Meta/Google ads.

---

## How to wire it

```tsx
import { LanguageMarqueeScene } from "@/components/language-marquee";
// or compose rows:
import { LanguageMarqueeRow, MARQUEE_LANGUAGES } from "@/components/language-marquee";
```

1. Keep **one active row** at a time (`activeId` state).
2. Swap `MARQUEE_LANGUAGES` images for Speaksy brand photography (call centers, Indian cities, agent headsets).
3. On row click → `router.push(/languages/${id})` or open `SampleCall` with that language’s dialogue from `lib/languages.ts`.
4. Respect `prefers-reduced-motion`: disable `x` animation, show static pill + native name.

---

## Creative Speaksy spins

| Spin | Description |
|------|-------------|
| **“Call this language”** | Marquee pause + green pulse + live waveform from `VoiceWaveform`. |
| **Dialect subtitles** | Second line under native script: “Awadhi-lean · Bhojpuri-lean”. |
| **Night ops mode** | After 10pm IST, marquee photos shift to night cityscapes — “We never sleep”. |
| **Enterprise version** | White page / dark marquee inverted for `/security` “languages stay in-region” story. |

---

## Don’t

- Don’t run 14 marquees at once (CPU + chaos).
- Don’t use random stock that could look touristy or stereotypical — prefer modern India + product UI.

---

## Success metric

Time-on-section for `/languages` and CTR from marquee → language page or “Free demo”.
