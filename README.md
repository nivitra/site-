# Speaksy — Marketing Website

**Voice AI that sounds human. Built in India, beats the world.** 🇮🇳

Production marketing site for Speaksy — **Next.js 16 (App Router) + Tailwind CSS v4 + Framer Motion**. Fully static pages (except the lead API), deploys anywhere (Vercel, Netlify, Node).

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (pages prerendered)
npm start       # serve production build
```

## Pages

| Route | What's on it |
|---|---|
| `/` | Hero + interactive call demo (Hinglish / Hindi / Marathi / English / Tamil), stats, language showcase, features, SOTA benchmarks, graph-agent SVG, human handoff, personas, industries, price teaser, integrations marquee, testimonials, FAQ, CTA |
| `/platform` | 5-layer pipeline explorer, graph & handoff, developer API cards, compliance grid |
| `/pricing` | 3 tiers, live ROI calculator, comparison table, pricing FAQ |
| `/solutions` | Use-case cards, industry explorer, how-it-works |
| `/languages` | Index of all 10 languages |
| `/languages/[slug]` | SEO-first language pages (native script, sample dialogue, use cases, voices, FAQ + JSON-LD) |
| `/customers` | 3 long-form case studies with metrics |
| `/integrations` | Telephony / STT / LLM / TTS / CRM stack |
| `/about` | Story timeline, values, team |
| `/careers` | Perks + open roles (mailto apply) |
| `/blog` + `/blog/[slug]` | 6 long-form posts (locale, engineering, compliance) |
| `/security` | Trust & compliance |
| `/contact` | Demo form → `POST /api/leads` |
| `/privacy`, `/terms` | Legal |
| `/sitemap.xml`, `/robots.txt` | SEO plumbing |

## Design system

- Colors from the Speaksy logo: near-black green (`#05080a`) with brand gradient `#0a1420 → #35b04a` (`.brand-pill`), accents `brand-300`…`brand-950` in `app/globals.css` `@theme`.
- Type: Geist Sans / Geist Mono + **Noto Sans Devanagari** for Hindi/Marathi/Hinglish (`.font-indic`).
- Motion: scroll-reveals, count-ups, layout-animated pills, SVG path-drawing, marquee — all respect `prefers-reduced-motion`.
- Logos: optimized variants in `public/brand/` (not the multi-MB Canva exports).

## Where things live

```
app/              routes, layout, sitemap, robots, api/leads
components/       one file per section; ui/ = Reveal, SectionHeading, CountUp
lib/              languages.ts (10 langs), posts.ts (blog)
public/brand/     web-optimized logo/icon assets
```

## Lead form

`components/LeadForm.tsx` validates client-side, then `POST`s to `/api/leads`.

Wire a real CRM by setting a webhook inside `app/api/leads/route.ts` (HubSpot, LeadSquared, Slack, etc.). Until then, leads are validated and logged server-side.

## Performance notes

- Homepage heavy interactive sections are `next/dynamic` code-split.
- `framer-motion` is tree-shaken via `optimizePackageImports`.
- Images use Next.js Image + AVIF/WebP.
- Brand logos resized to 64–256px (original Canva exports stay in `public/` for print if needed).
