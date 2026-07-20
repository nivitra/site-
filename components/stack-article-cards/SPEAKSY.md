# Stack Article Cards — Speaksy use guide

**Lab:** `/lab/stack-articles`  
**Component:** `StackArticleCards`  
**Vibe:** Bottom-right card deck; hover expands stack; active card goes orange-hot.

---

## What it is

A collapsed **deck of stories**. Expand on hover into a vertical list of article chips (thumb + title + ARTICLE + arrow). Feels like a floating reading queue.

---

## Speaksy placements

### 1. Persistent “Resources” dock on marketing site
Articles:

- “How D2C brands cut COD RTO with voice AI”
- “EMI collections without angry customers”
- “Why Hinglish beats pure Hindi on calls”
- “Go-live checklist for BFSI”

### 2. Blog index floating assistant
Same component, feed latest 4 posts from CMS.

### 3. Homepage after scroll depth 60%
Deck peeks in bottom-right — “Stories operators read”.  
Doesn’t fight the primary CTA; secondary engagement.

### 4. Industry solution pages
Filter stack by industry slug (`/solutions/bfsi` → only BFSI posts).

### 5. Post-demo nurture
Email links deep-link to expanded card id.

---

## How to use

```tsx
import StackArticleCards from "@/components/stack-article-cards/StackArticleCards";
// ARTICLES in data.ts → map from blog frontmatter
```

1. Keep **4 cards** for the stack silhouette.
2. Orange hover = Speaksy energy (or recolor to brand green).
3. Collapse on mouse leave (current behavior) — or pin open on click for mobile.

---

## Creative Speaksy spins

| Spin | Idea |
|------|------|
| **Call stories** | Cards are sample call transcripts, not blogs. |
| **Language chips** | Each card tagged “हिन्दी / தமிழ்”. |
| **Unread pulse** | New post: tiny green dot on collapsed deck. |

---

## Success metric

Blog CTR from marketing pages; return visits from stack.
