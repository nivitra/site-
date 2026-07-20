# Audio Waveform Player — Speaksy use guide

**Lab:** `/lab/audio-waveform-player`  
**Component:** `AudioWaveformPlayer`  
**Vibe:** Compact **light/white** pill — play/pause + static waveform + red playhead glow.

---

## What it is

A self-contained **voice memo** control: circular play/pause, fixed waveform bars that light up as progress advances, and a red vertical playhead with a triangular tip and soft red ambient glow. Scrubbable. Loops in the lab demo.

---

## Speaksy placements

### 1. Sample call / Hear an agent
Embed on homepage or `/platform` next to a persona: “Listen to a Hindi collections call.” Swap lab silent progress for a real `HTMLAudioElement` duration.

### 2. Blog / case studies
Inline player under a quote block for customer call snippets (with consent).

### 3. Pricing / ROI page
Short success-call montage: “30 seconds of what 10 languages sound like.”

### 4. Demo request confirmation
Thank-you state: play a teaser while the calendar loads.

### 5. Mobile sticky chrome
Bottom-safe compact player during live demo pages.

---

## How to use

```tsx
import { AudioWaveformPlayer } from "@/components/audio-waveform-player";

// Lab-style silent demo (autoplay + loop)
<AudioWaveformPlayer />

// Controlled
<AudioWaveformPlayer duration={12} autoPlay={false} loop={false} />
```

1. Wire real audio by driving `progress` from `audio.currentTime / audio.duration` (extend component with an `src` prop when ready).  
2. Keep waveform heights in `data.ts` — or replace with peaks from actual audio analysis.  
3. Respect `prefers-reduced-motion`: autoplay is off when reduced motion is preferred.

---

## Creative Speaksy spins

| Spin | Idea |
|------|------|
| **Brand green playhead** | Use Speaksy green instead of recording red for product surfaces |
| **Dual channel** | Two stacked waveforms = agent vs customer |
| **Language badge** | Tiny “HI · EN” pill left of play button |
| **Live ring** | Soft pulse on shell while `playing` |

---

## Success metrics

- Play rate on sample-call modules  
- Completion % (scrub to end)  
- Demo CTA conversion after listen  
