# Speaksy Lab Components — Creative Use Index

Interactive experiments under `/lab/*`, documented for **production ideas on the Speaksy AI voice-calling site**.

Each component folder has a **`SPEAKSY.md`** with:

- What it is  
- High-impact placements on Speaksy  
- How to wire it  
- Creative spins  
- Success metrics  

---

## Quick map: component → Speaksy job

| Component | Lab route | Best Speaksy moment | Doc |
|-----------|-----------|---------------------|-----|
| **Scroll Arc** | `/lab/scroll-arc` | Scroll story with disc on arc | [SPEAKSY.md](../../components/scroll-arc/SPEAKSY.md) |
| **Pro Pricing Slider** | `/lab/pro-pricing` | Pricing page volume scrubber | [SPEAKSY.md](../../components/pro-pricing-slider/SPEAKSY.md) |
| **Language Marquee** | `/lab/language-marquee` | Languages hero / 14-language pride | [SPEAKSY.md](../../components/language-marquee/SPEAKSY.md) |
| **Glow Tabs** | `/lab/glow-tabs` | Pricing toggle · channel switcher | [SPEAKSY.md](../../components/glow-tabs/SPEAKSY.md) |
| **Brand Fan** | `/lab/brand-fan` | Integrations “nervous system” | [SPEAKSY.md](../../components/brand-fan/SPEAKSY.md) |
| **Common Questions** | `/lab/common-questions` | FAQ that feels like a product | [SPEAKSY.md](../../components/common-questions/SPEAKSY.md) |
| **Expand FAB** | `/lab/expand-fab` | Global “start something” control | [SPEAKSY.md](../../components/expand-fab-menu/SPEAKSY.md) |
| **Followers Trend** | `/lab/followers-trend` | Calls / outcomes analytics card | [SPEAKSY.md](../../components/followers-trend/SPEAKSY.md) |
| **Stack Articles** | `/lab/stack-articles` | Floating resources dock | [SPEAKSY.md](../../components/stack-article-cards/SPEAKSY.md) |
| **Hover Link Preview** | `/lab/hover-link-preview` | Trust copy with screenshot cards | [SPEAKSY.md](../../components/hover-link-preview/SPEAKSY.md) |
| **Iso Features** | `/lab/iso-features` | Platform / security primitives | [SPEAKSY.md](../../components/iso-features/SPEAKSY.md) |
| **Scroll Zoom** | `/lab/scroll-zoom` | Cinematic use-case film | [SPEAKSY.md](../../components/scroll-zoom-gallery/SPEAKSY.md) |
| **Journey Split** | `/lab/journey-split` | Segment / journey chooser | [SPEAKSY.md](../../components/journey-split/SPEAKSY.md) |
| **Blinds Text** | `/lab/blinds-text-reveal` | Manifesto / launch copy | [SPEAKSY.md](../../components/blinds-text-reveal/SPEAKSY.md) |
| **Drag Gallery** | `/lab/drag-gallery` | Spatial customer universe | [SPEAKSY.md](../../components/drag-gallery/SPEAKSY.md) |
| **Staggered Menu** | `/lab/staggered-menu` | Onboarding checklist | [SPEAKSY.md](../../components/staggered-menu/SPEAKSY.md) |
| **Reveal Hover Cards** | `/lab/reveal-hover-cards` | Light feature island | [SPEAKSY.md](../../components/reveal-hover-cards/SPEAKSY.md) |
| **Crosshair Menu** | `/lab/crosshair-action-menu` | “Compose a campaign” | [SPEAKSY.md](../../components/crosshair-action-menu/SPEAKSY.md) |
| **Add Job Node** | `/lab/add-job-node` | Pipeline node / how-it-works | [SPEAKSY.md](../../components/add-job-node/SPEAKSY.md) |
| **Audio Waveform Player** | `/lab/audio-waveform-player` | Sample call / hear an agent (light) | [SPEAKSY.md](../../components/audio-waveform-player/SPEAKSY.md) |
| **Scroll Highlight** | `/lab/scroll-highlight` | Manifesto / case study paint-in | [SPEAKSY.md](../../components/scroll-highlight/SPEAKSY.md) |
| **Glass Layer Stack** | `/lab/glass-layer-stack` | Solutions / industries stack (light) | [SPEAKSY.md](../../components/glass-layer-stack/SPEAKSY.md) |
| **Expand Product Cards** | `/lab/expand-product-cards` | Two-door chooser / ICP expand | [SPEAKSY.md](../../components/expand-product-cards/SPEAKSY.md) |
| **Data Encrypted** | `/lab/data-encrypted` | Security / privacy hero proof | [SPEAKSY.md](../../components/data-encrypted/SPEAKSY.md) |
| **Gradient Bars** | `/lab/gradient-bars` | Brand / language emotion strip | [SPEAKSY.md](../../components/gradient-bars/SPEAKSY.md) |

---

## Suggested homepage composition (impressive stack)

1. **Hero** — existing Speaksy hero + optional Language Marquee teaser  
2. **Scroll Zoom** — emotional proof of markets  
3. **Journey Split** — who you are (startup / scale / enterprise)  
4. **Glow Tabs** — inbound / outbound  
5. **Brand Fan** — integrations  
6. **Iso Features** — under the hood  
7. **Followers Trend** — call volume social proof  
8. **Common Questions** — objections  
9. **Expand FAB** — always-available demo CTA  

---

## Production checklist

- [ ] Respect `prefers-reduced-motion`  
- [ ] Swap lab stock for Speaksy photography / UI captures  
- [ ] Wire analytics on open/hover/select  
- [ ] Mobile: prefer tap patterns where hover is core  
- [ ] Keep Lighthouse ≥ 90 (lazy heavy canvases, compress images)  
- [ ] Brand color: green accents on Speaksy surfaces; pure B/W only for “tool” moments  

---

## Naming note

Lab components are experiments. Before shipping, rename copy (e.g. “Followers” → “Calls”) and relocate into product sections rather than `/lab`.
