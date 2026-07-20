/** Single source for All Components + Lab indexes */

export type CatalogItem = {
  href: string;
  title: string;
  blurb: string;
  tag: string;
};

export const COMPONENT_CATALOG: CatalogItem[] = [
  {
    href: "/lab/product-bento",
    title: "Product Bento",
    blurb: "Platform capabilities board — CRM mock, omnichannel, funnel.",
    tag: "Homepage",
  },
  {
    href: "/lab/stories-bento",
    title: "Stories Bento",
    blurb: "Customer stories grid — metrics, video, quotes.",
    tag: "Homepage",
  },
  {
    href: "/lab/gradient-bars",
    title: "Industry Gradient Bars",
    blurb: "Holographic vertical bars with bottom labels, hover wave, expand.",
    tag: "Homepage",
  },
  {
    href: "/lab/language-marquee",
    title: "Language Marquee",
    blurb: "10 Indian languages — hover white marquee + photos.",
    tag: "Homepage",
  },
  {
    href: "/lab/stack-integration",
    title: "Stack Integration",
    blurb: "Seamless stack diagram — Speaksy hub + CRM / CDP / dialers.",
    tag: "Integrations",
  },
  {
    href: "/lab/integration-hub",
    title: "Integration Hub",
    blurb: "Partner pills connected to Speaksy logo center.",
    tag: "Integrations",
  },
  {
    href: "/lab/compare-matrix",
    title: "Compare Matrix",
    blurb: "Speaksy vs typical voice AI vendor table.",
    tag: "Trust",
  },
  {
    href: "/lab/data-encrypted",
    title: "Data Encrypted",
    blurb: "Glass capsule + laser beam cipher animation.",
    tag: "Trust",
  },
  {
    href: "/lab/pro-pricing",
    title: "Pro Pricing Slider",
    blurb: "Free / Pro / Business with stepped credit line.",
    tag: "Pricing",
  },
  {
    href: "/lab/scroll-arc",
    title: "Scroll Arc",
    blurb: "White discs on a wheel arc — body copy inside the dome.",
    tag: "Motion",
  },
  {
    href: "/lab/scroll-zoom",
    title: "Scroll Zoom Gallery",
    blurb: "Sticky 2×2 collage dive-in / pull-out on scroll.",
    tag: "Motion",
  },
  {
    href: "/lab/scroll-highlight",
    title: "Scroll Highlight",
    blurb: "Text paints with diagonal highlighter on scroll.",
    tag: "Motion",
  },
  {
    href: "/lab/blinds-text-reveal",
    title: "Blinds Text Reveal",
    blurb: "Colored blinds open per line on scroll.",
    tag: "Motion",
  },
  {
    href: "/lab/journey-split",
    title: "Journey Split Cards",
    blurb: "Panorama splits and 3D-flips into journey cards.",
    tag: "Motion",
  },
  {
    href: "/lab/glass-layer-stack",
    title: "Glass Layer Stack",
    blurb: "Sticky isometric glass slabs, one lit layer at a time.",
    tag: "Motion",
  },
  {
    href: "/lab/drag-gallery",
    title: "Drag Gallery",
    blurb: "Freeform canvas — scroll/drag to pan prints.",
    tag: "Interactive",
  },
  {
    href: "/lab/glow-tabs",
    title: "Glow Tabs",
    blurb: "Glass pills + ambient glow + green shine underline.",
    tag: "Interactive",
  },
  {
    href: "/lab/expand-fab",
    title: "Expand FAB Menu",
    blurb: "Bottom-left + expands into action tiles with blur.",
    tag: "Interactive",
  },
  {
    href: "/lab/common-questions",
    title: "Common Questions",
    blurb: "FAQ carousel with faded neighbors and IN/OUT card.",
    tag: "Interactive",
  },
  {
    href: "/lab/hover-link-preview",
    title: "Hover Link Preview",
    blurb: "Bold text links with floating preview cards.",
    tag: "Interactive",
  },
  {
    href: "/lab/iso-features",
    title: "Iso Features",
    blurb: "Isometric line icons with purple hover + title pills.",
    tag: "Interactive",
  },
  {
    href: "/lab/reveal-hover-cards",
    title: "Reveal Hover Cards",
    blurb: "Bottom-up clip-path curtain reveal on hover.",
    tag: "Interactive",
  },
  {
    href: "/lab/expand-product-cards",
    title: "Expand Product Cards",
    blurb: "Cursor-tilt tiles morph to full editorial panels.",
    tag: "Interactive",
  },
  {
    href: "/lab/followers-trend",
    title: "Followers Trend",
    blurb: "Analytics bar chart with scrubber + value pill.",
    tag: "Charts",
  },
  {
    href: "/lab/brand-fan",
    title: "Brand Fan",
    blurb: "Hub fan with light along curved spokes.",
    tag: "Diagram",
  },
  {
    href: "/lab/crosshair-action-menu",
    title: "Crosshair Action Menu",
    blurb: "Full axes + spring Add Job popover.",
    tag: "Tool UI",
  },
  {
    href: "/lab/add-job-node",
    title: "Add Job Node",
    blurb: "Pipeline node expands into job action grid.",
    tag: "Tool UI",
  },
  {
    href: "/lab/staggered-menu",
    title: "Staggered Animated Menu",
    blurb: "Cascading stack with layout springs.",
    tag: "Tool UI",
  },
  {
    href: "/lab/stack-articles",
    title: "Stack Article Cards",
    blurb: "Bottom-right deck expands on hover.",
    tag: "Content",
  },
  {
    href: "/lab/audio-waveform-player",
    title: "Audio Waveform Player",
    blurb: "White pill play/pause + waveform bars.",
    tag: "Audio",
  },
];

export const CATALOG_TAGS = [
  "All",
  ...Array.from(new Set(COMPONENT_CATALOG.map((c) => c.tag))),
];
