# Expand FAB Menu — Speaksy use guide

**Lab:** `/lab/expand-fab`  
**Component:** `ExpandFabMenu`  
**Vibe:** Bottom-left **+** → **×**, backdrop blur, staggered action tiles that morph back into the origin.

---

## What it is

Unusual navigation: one circular FAB. Open and four glass tiles explode out (Send Money energy). Close and they **fold home** with reverse stagger. Blur makes the rest of the page recede.

---

## Speaksy placements

### 1. Global site chrome (power users)
FAB tiles:

| Tile | Action |
|------|--------|
| **Book demo** | `/contact` |
| **Hear a call** | Open `SampleCall` modal |
| **Pricing** | `/pricing` |
| **WhatsApp us** | `wa.me/...` |

**Story:** “Start a conversation from anywhere on the site.”

### 2. Logged-in console (future app shell)
Tiles: New campaign · Upload leads · Test agent · Live calls.  
Perfect for ops people who live on keyboard + mouse.

### 3. Blog / long-form pages
Reader reaches end of article → FAB is the only chrome needed.

### 4. Event microsites
Tiles: Agenda · Speakers · Register · Contact.  
Blur over hero video when open.

### 5. Mobile-first marketing
Thumb zone bottom-left (or bottom-right for RTL/Urdu pages) — primary conversion control.

---

## How to use

```tsx
import ExpandFabMenu from "@/components/expand-fab-menu/ExpandFabMenu";
// Edit FAB_ACTIONS in data.ts (label + Lucide icon + route)
```

1. Keep **4 tiles max** for the morph to stay legible.
2. Use Speaksy green on FAB for brand, or pure white for neutral luxury (as in recording).
3. `prefers-reduced-motion`: open as simple fade grid, skip blur if performance issues on low-end Android.

---

## Creative Speaksy spins

| Spin | Idea |
|------|------|
| **Ring FAB** | Idle FAB shows tiny `SoundRings` pulse — “lines are open”. |
| **Context tiles** | On `/pricing`, first tile becomes “Calculate minutes”. |
| **Language FAB** | Tiles are top 4 languages → jump to sample call. |

---

## Success metric

FAB open rate; conversion from FAB vs main nav “Free demo”.
