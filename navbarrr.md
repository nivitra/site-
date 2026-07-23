# Speaksy Navbar Documentation

## File
`components/Navbar.tsx` — client component using Next.js App Router, Framer Motion, and custom icons.

---

## Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│  Logo  │  Product  Industries  Solutions  Pricing  Company  │  Login  │  [Book Demo]  │
└─────────────────────────────────────────────────────────────┘
```

- **Left**: Speaksy logo (wordmark)
- **Center**: 5 navigation items — Product, Industries, Solutions, Pricing, Company
- **Right**: "Login" (border-only button) + "Book Demo" (solid green pill, rounded-full)

---

## Navigation Sections (Left to Right)

### 1. Product
**Type**: Dropdown mega menu (single column, max-w-[420px])
**Links to**: `/platform`

| Heading | Title | Subtitle | Route |
|---|---|---|---|
| Platform | Core Technology | ASR, LLM, TTS Pipeline | `/platform` |
| Platform | Control Tower | Analytics & monitoring | `/platform` |
| Platform | Integrations & SDKs | CRM, dialers, API access | `/integrations` |

**Footer**: "Explore the platform" → `/platform`

---

### 2. Industries
**Type**: Dropdown mega menu (2 columns, max-w-[800px])
**Links to**: `/solutions`
**Data driven** from `lib/industries.ts` — 10 industries auto-generated into 2 columns of 5.

**Column 1 — E-commerce & Retail** (first 5 industries):

| Title | Route |
|---|---|
| E-commerce | `/solutions/ecommerce` |
| Automotive | `/solutions/automotive` |
| Lending & Collections | `/solutions/bfsi-lending` |
| Insurance | `/solutions/insurance` |
| Brokerage & Capital Markets | `/solutions/brokerage-capital-markets` |

**Column 2 — Finance & Services** (next 5 industries):

| Title | Route |
|---|---|
| Real Estate | `/solutions/real-estate` |
| Education | `/solutions/education` |
| Healthcare | `/solutions/healthcare` |
| Telecom & IT | `/solutions/telecom-it` |
| Travel & Hospitality | `/solutions/travel-hospitality` |

**Footer**: "View all industries" → `/solutions`

---

### 3. Solutions
**Type**: Dropdown mega menu (2 columns, max-w-[800px])
**Links to**: `/solutions`

**Column 1 — Workflows**:

| Title | Subtitle | Route |
|---|---|---|
| Outbound Sales & Lead Gen | Automated prospect outreach | `/solutions` |
| Early-Bucket Collections | EMI & payment follow-ups | `/solutions` |
| Multilingual Support | 14-language CS automation | `/solutions` |

**Column 2 — More**:

| Title | Subtitle | Route |
|---|---|---|
| Post-Service Surveys | PSF & satisfaction collection | `/solutions` |
| Appointment Booking | Smart scheduling calls | `/solutions` |
| Customer Stories | Real outcomes, real brands | `/customers` |

**Footer**: "All solutions" → `/solutions`

---

### 4. Pricing
**Type**: Direct link (no dropdown)
**Route**: `/pricing`

---

### 5. Company
**Type**: Dropdown mega menu (single column, max-w-[420px])
**Links to**: `/about`

| Heading | Title | Subtitle | Route |
|---|---|---|---|
| Speaksy | About Speaksy | Founders, vision & mission | `/about` |
| Speaksy | Customer Stories | Case studies & outcomes | `/customers` |
| Speaksy | Careers & Culture | Build the future with us | `/careers` |
| Speaksy | Blog | Insights & playbooks | `/blog` |
| Speaksy | Contact | Talk to the team | `/contact` |

---

## CTA Buttons (Right Side)

| Button | Style | Route | Breakpoints |
|---|---|---|---|
| Login | Border-only (`border border-line`), rounded-lg, text-muted | `/contact` | `md:` and above |
| Book Demo | Green pill (`brand-pill`), rounded-full, shadow, hover scale 1.02 | `/contact` | `md:` and above |

---

## Mobile Nav (< 768px)

- **Hamburger icon** on right, toggles full-screen overlay drawer
- **Accordion** layout: Product, Industries, Solutions, Pricing, Company — all expand/collapse
- Each section reveals the same links as desktop with icon + title + subtitle
- **Bottom of drawer**: Login + Book Demo stacked vertically
- Drawer uses `bg-white/95 backdrop-blur-xl`
- Body scroll locked (`overflow: hidden`) when drawer open

---

## Tablet Nav (768px – 1023px)

- Same 5 items in center, compact labels
- Dropdowns render as compact mega panels (420px max width)
- Same hover interaction with 30ms open / 100ms close delays

---

## Interaction Behavior

| Property | Value |
|---|---|
| Open delay | 30ms |
| Close delay | 100ms |
| Menu animation duration | 0.22s |
| Easing | `cubic-bezier(0.22, 1, 0.36, 1)` (Apple/Stripe-style) |
| Hover trigger | Mouse enter opens, mouse leave schedules close |
| Cancel on re-enter | Close timer cancelled if user hovers back in |
| Keyboard | Escape closes all menus; Tab/Enter triggers open |
| Click outside | Closes all menus |
| Hover bridge | 3.5px padding bridge between trigger and panel prevents gap flicker |

## Scrolled State

- On scroll > 8px: `nav-shell--scrolled` class added
- Adds darker background (`rgba(255,255,255,0.82)`), bottom border, inset shadow

---

## Animations

- **Mega panel entrance**: Fade in + slide up 8px + scale 0.985 → 1, blur(4px) → blur(0px)
- **Mega panel exit**: Fade out + slide up 6px + blur back to 2px
- **Menu items**: Stagger fade + slide up 4px (0.022s stagger, 0.02s delay children)
- **Icons**: Fade + slide up 3px (0.2s)
- **Text**: Fade + slide up 3px, 0.02s delay (0.22s)
- **Active pill**: Framer Motion `layoutId="nav-active-pill"` for smooth crossfade between items
- **Backdrop**: Semi-transparent black gradient when menu open (desktop only)

---

## Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| `< 768px` (mobile) | Hamburger + accordion drawer, no desktop nav |
| `768px – 1023px` (tablet) | Compact mega menus (420px), condensed labels |
| `≥ 1024px` (desktop) | Full mega menus (800px industries, 420px others), hover triggers |
| `≥ 1400px` | Container capped at `max-w-[1400px]` |

---

## Accessibility

- `<nav aria-label="Primary">` for the main nav
- `<button aria-expanded>` + `aria-haspopup="true"` on dropdown triggers
- `<div role="region" aria-label="[Section] menu">` on mega panels
- `aria-controls` links trigger to panel via matching IDs
- `aria-label` on hamburger toggle ("Open menu" / "Close menu")
- Focus-visible ring (`ring-brand-500/25`) on all menu items
- Skip-to-content link in layout wraps nav
- Escape key closes all menus globally

---

## Icons (Inline SVG)

18 custom icons stored in a `icons` object — thin line, rounded, 18×18 viewBox:

`phone`, `spark`, `chart`, `shield`, `rocket`, `building`, `book`, `globe`, `lock`, `users`, `heart`, `briefcase`, `mail`, `tag`, `headset`, `puzzle`, `chevron`

Industry icon mapping:
```ts
ecommerce → tag
automotive → rocket
bfsi-lending → phone
insurance → shield
brokerage-capital-markets → chart
real-estate → building
education → book
healthcare → headset
telecom-it → globe
travel-hospitality → globe
```

---

## Data Dependencies

| Dependency | Purpose |
|---|---|
| `lib/industries.ts` | Auto-generates all 10 industry links + their icons/tags |
| `components/Logo.tsx` | Speaksy wordmark (left side) |
| `components/ui/Magnetic.tsx` | Subtle magnetic hover effect on Book Demo CTA |

---

## State Management

| State | Type | Purpose |
|---|---|---|
| `scrolled` | boolean | Tracks scroll > 8px for scrolled nav styling |
| `activeMenu` | string \| null | Which dropdown is currently open (product/industries/solutions/company) |
| `compact` | boolean | Tablet mode (768–1023px) |
| `isDesktop` | boolean | Desktop mode (≥ 1024px) |
| `mobileOpen` | boolean | Mobile drawer visible |
| `mobileAccordion` | string \| null | Which mobile accordion section is expanded |

---

## Edge Cases Handled

- **Reduced motion**: If `prefers-reduced-motion: reduce`, delays set to 0 (instant open/close)
- **Crossfade panels**: Switching between dropdowns while one is already open — new panel replaces old without closing animation
- **Timer cleanup**: All timers cleared on unmount via `useEffect` cleanup
- **Body scroll lock**: Mobile drawer locks body scroll; restored on close
- **Click outside**: Attaches `mousedown` listener to document when menu/drawer open; detached on close
