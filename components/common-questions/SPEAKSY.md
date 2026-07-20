# Common Questions — Speaksy use guide

**Lab:** `/lab/common-questions`  
**Component:** `CommonQuestions`  
**Vibe:** Mono FAQ carousel — faded neighbors, ↑↓, IN/OUT answer card with soft fades.

---

## What it is

Not a bloated accordion. A **focused interview**: one question in the spotlight, previous/next ghosted, answer in a terminal-style **IN / OUT** card. Navigation feels like flipping through a notebook.

---

## Speaksy placements

### 1. Replace classic FAQ on homepage & `/pricing`
Rewrite `FAQ_ITEMS` to Speaksy objections:

- “Will customers know it’s AI?”
- “Does it work in Hinglish?”
- “What if the customer is angry?”
- “How fast is go-live?”
- “Is data stored in India?”
- “What does ₹3.99/min include?”

### 2. Security page deep FAQ
Same UI, compliance copy. IN/OUT metaphor maps perfectly to **request/response audit**.

### 3. Sales enablement microsite
Give AEs a “battlecard mode”: each OUT block has a **copy reply** button for WhatsApp follow-ups.

### 4. Post-demo thank-you page
Only 3 questions that unblock close: pricing, languages, timeline.

### 5. Blog / resources
“Founders ask us this every week” — builds trust without salesy FAQ dump.

---

## How to use

```tsx
import CommonQuestions from "@/components/common-questions/CommonQuestions";
// Edit FAQ_ITEMS in data.ts
```

1. Keep answers **short paragraphs** (recording cadence).
2. Wire ↑↓ + keyboard (already built).
3. Optional analytics: `track('faq_view', { id })` on index change.
4. Swap mono to Geist Mono for Speaksy brand consistency.

---

## Creative Speaksy spins

| Spin | Idea |
|------|------|
| **Voice OUT** | OUT section plays TTS of the answer in Hindi when opened. |
| **IN = customer, OUT = Speaksy** | Label as `CUSTOMER:` / `AGENT:` for product education. |
| **Industry packs** | Different FAQ_ITEMS for BFSI vs D2C landers. |

---

## Success metric

Reduced support tickets on pricing/languages; demo form completion after FAQ interaction.
