import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lab",
  description: "Internal UI experiments and component tests.",
  robots: { index: false, follow: false },
};

const experiments = [
  {
    href: "/lab/product-bento",
    title: "Product Bento",
    blurb:
      "Platform capabilities bento — CRM mock, omnichannel, funnel (exact, Speaksy green).",
  },
  {
    href: "/lab/stories-bento",
    title: "Stories Bento",
    blurb:
      "Customer stories bento — metrics, video, quotes (exact layout, Speaksy theme).",
  },
  {
    href: "/lab/stack-integration",
    title: "Stack Integration",
    blurb:
      "Seamless Integration diagram — Speaksy logo hub + CRM/CDP/dialer/API cards (green theme).",
  },
  {
    href: "/lab/compare-matrix",
    title: "Compare Matrix",
    blurb:
      "Capabilities table: Speaksy green column vs typical voice AI vendor (exact layout).",
  },
  {
    href: "/lab/integration-hub",
    title: "Integration Hub",
    blurb:
      "Integrates With Everything — Speaksy center hub + partner cards (darwinbox, Zoho, keka…).",
  },
  {
    href: "/lab/scroll-arc",
    title: "Scroll Arc",
    blurb:
      "White disc rides a large arc on scroll — bubble + body copy crossfade (exact path).",
  },
  {
    href: "/lab/pro-pricing",
    title: "Pro Pricing Slider",
    blurb:
      "Free / Pro / Business cards — exact blue stepped credit line on Pro & Business.",
  },
  {
    href: "/lab/common-questions",
    title: "Common Questions",
    blurb:
      "FAQ carousel: faded prev/next, ↑↓ nav, IN/OUT answer card with fade (exact).",
  },
  {
    href: "/lab/glow-tabs",
    title: "Glow Tabs",
    blurb:
      "Emails / Attachments glass pills with ambient glow + sliding white light bar.",
  },
  {
    href: "/lab/brand-fan",
    title: "Brand Fan",
    blurb:
      "Hub → brand logos with blue light traveling along curved spokes (exact & neat).",
  },
  {
    href: "/lab/language-marquee",
    title: "Language Marquee (10)",
    blurb:
      "Hover a language row → white infinite marquee with regional photos (India’s top 10).",
  },
  {
    href: "/lab/stack-articles",
    title: "Stack Article Cards",
    blurb:
      "Bottom-right stacked deck expands on hover; active card turns orange-red.",
  },
  {
    href: "/lab/followers-trend",
    title: "Followers Trend",
    blurb:
      "Interactive bar chart scrubber with floating value pill (exact from recording).",
  },
  {
    href: "/lab/expand-fab",
    title: "Expand FAB Menu",
    blurb:
      "Bottom-left + button → action tiles with blur backdrop and morph close (from recording).",
  },
  {
    href: "/lab/hover-link-preview",
    title: "Hover Link Preview",
    blurb:
      "Bold text links with floating site preview cards on hover (exact from recording).",
  },
  {
    href: "/lab/iso-features",
    title: "Iso Features (hover)",
    blurb:
      "3D line icons (Relay, Enclaves + 6 more) — purple hover, brackets, inverted titles.",
  },
  {
    href: "/lab/scroll-zoom",
    title: "Scroll Zoom Gallery",
    blurb:
      "Sticky 2×2 collage — dive in / pull out on scroll with SCROLL → REMIX beats (exact).",
  },
  {
    href: "/lab/drag-gallery",
    title: "Scroll/Drag Gallery",
    blurb:
      "Freeform art prints on a black canvas — scroll or drag to pan (from your recording).",
  },
  {
    href: "/lab/blinds-text-reveal",
    title: "Blinds Text Reveal",
    blurb:
      "Per-line colored blinds open on scroll — out, in-out, and alternate directions (from your recording).",
  },
  {
    href: "/lab/journey-split",
    title: "Journey Split Cards",
    blurb:
      "Scroll-driven 3D flip: panoramic image splits and flips to UI cards.",
  },
  {
    href: "/lab/crosshair-action-menu",
    title: "Centered Crosshair Action Menu",
    blurb:
      "Full crosshair axes, diamond edge markers, spring scale+blur popover — exact Add job grid.",
  },
  {
    href: "/lab/add-job-node",
    title: "Add Job Node",
    blurb:
      "Pipeline line + 6-dot trigger that expands into an Add job action grid (from your recording).",
  },
  {
    href: "/lab/reveal-hover-cards",
    title: "Reveal Hover Card Grid",
    blurb:
      "Bottom-up clip-path curtain reveal with spring motion and image scale.",
  },
  {
    href: "/lab/staggered-menu",
    title: "Staggered Animated Menu",
    blurb:
      "Cascading entry stack with layout springs — collapse/expand to feel the physics.",
  },
  {
    href: "/lab/expand-product-cards",
    title: "Expand Product Cards",
    blurb:
      "Dual product tiles with cursor-tilt → spring morph to full-bleed editorial panel + ghost product (exact).",
  },
  {
    href: "/lab/audio-waveform-player",
    title: "Audio Waveform Player",
    blurb:
      "Light white pill play/pause + waveform bars with red playhead glow (light version).",
  },
  {
    href: "/lab/data-encrypted",
    title: "Data Encrypted",
    blurb:
      "Glass capsule + laser beam: plaintext scrolls into cipher. MAXIMUM PRIVACY / Your data. Encrypted. (exact).",
  },
  {
    href: "/lab/scroll-highlight",
    title: "Scroll Highlight",
    blurb:
      "Text paints with a diagonal highlighter edge on scroll — blue / yellow / purple (exact).",
  },
  {
    href: "/lab/glass-layer-stack",
    title: "Glass Layer Stack",
    blurb:
      "Sticky-scroll isometric glass slabs — one lit layer at a time, title ghost crossfade (exact from recording).",
  },
  {
    href: "/lab/gradient-bars",
    title: "Gradient Bars",
    blurb:
      "Holographic fluid strips — gaussian hover wave, click expands pure mesh square with sibling blur (exact).",
  },
];

export default function LabPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-2">
        Lab
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        Component tests
      </h1>
      <p className="mt-3 max-w-lg text-muted">
        Sandbox pages for UI experiments. Prefer the full list at{" "}
        <Link href="/components" className="font-semibold text-brand-600 hover:text-brand-700">
          /components
        </Link>{" "}
        (opens demos in a new tab).
      </p>

      <ul className="mt-10 flex flex-col gap-3">
        {experiments.map((e) => (
          <li key={e.href}>
            <a
              href={e.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-hover flex flex-col gap-1 rounded-2xl p-6"
            >
              <span className="text-lg font-semibold text-foreground">{e.title}</span>
              <span className="text-sm text-muted">{e.blurb}</span>
              <span className="mt-2 text-sm font-semibold text-brand-600">Open in new tab</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
