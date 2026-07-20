# Add Job Node — Speaksy use guide

**Lab:** `/lab/add-job-node`  
**Component:** `AddJobNode`  
**Vibe:** Pipeline line + 6-dot node; click expands Add Job panel with connector dots.

---

## What it is

A single **node on a wire** — the atomic unit of a call workflow. Expand to pick job type or describe it. Sibling to Crosshair menu, more “canvas/pipeline” than “radar”.

---

## Speaksy placements

### 1. How it works — interactive pipeline
Horizontal journey: Lead → **(+ node)** → Call → Outcome → CRM.  
User clicks node to see what Speaksy can inject at that stage.

### 2. Visual campaign builder teaser
Marketing version of the real builder; CTA “Open full builder in demo”.

### 3. Docs / developers
Node = webhook or tool call in the agent runtime.

### 4. Sales decks
Animated GIF/export of node opening — explains product faster than slides.

### 5. Onboarding
“Add your first job” empty state on a literal pipeline.

---

## How to use

```tsx
import AddJobNode from "@/components/add-job-node/AddJobNode";
// JOB_ACTIONS in data.ts
```

1. Resize line gap when panel open (built-in spring widths).
2. Hook `onSelect` to analytics + navigation.
3. For multi-node canvases, extract `AddJobPanel` and place many triggers.

---

## Creative Speaksy spins

| Spin | Idea |
|------|------|
| **Language at node** | Panel includes language chips. |
| **Cost estimate** | Selecting a job shows “~₹X per 1k calls”. |
| **Ghost nodes** | Dim future stages on the same line. |

---

## Success metric

Interaction rate on How-it-works; demo bookings from pipeline section.
