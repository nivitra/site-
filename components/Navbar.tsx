"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type SVGProps,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Logo from "./Logo";
import IndustryGradientBars from "./gradient-bars/IndustryGradientBars";
import { GlowTabs } from "./glow-tabs/GlowTabs";
import { industries } from "@/lib/industries";
import { SOLUTION_NAV_TOP6 } from "@/lib/solutions";

/* ─── Inline icons (18×18, thin stroke) ─────────────────────────── */
type IconProps = SVGProps<SVGSVGElement>;
const iconBase = {
  width: 18,
  height: 18,
  viewBox: "0 0 18 18",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const icons = {
  phone: (p: IconProps) => (
    <svg {...iconBase} {...p}>
      <path d="M3.5 4.5c0-.8.7-1.5 1.5-1.5h1.2c.5 0 1 .3 1.2.8l.6 1.5c.2.5 0 1.1-.4 1.4L7.2 8a8.5 8.5 0 0 0 2.8 2.8l.8-.9c.3-.4.9-.6 1.4-.4l1.5.6c.5.2.8.7.8 1.2V14c0 .8-.7 1.5-1.5 1.5C6.8 15.5 2.5 11.2 2.5 6c0-.8.7-1.5 1-1.5z" />
    </svg>
  ),
  spark: (p: IconProps) => (
    <svg {...iconBase} {...p}>
      <path d="M9 2.5v2M9 13.5v2M2.5 9h2M13.5 9h2M4.2 4.2l1.4 1.4M12.4 12.4l1.4 1.4M13.8 4.2l-1.4 1.4M5.6 12.4l-1.4 1.4" />
      <circle cx="9" cy="9" r="2.2" />
    </svg>
  ),
  chart: (p: IconProps) => (
    <svg {...iconBase} {...p}>
      <path d="M3 14.5V8.5M7.5 14.5V4.5M12 14.5v-4M16 14.5V6.5" />
    </svg>
  ),
  shield: (p: IconProps) => (
    <svg {...iconBase} {...p}>
      <path d="M9 2.5 3.5 5v4.2c0 3.3 2.2 5.8 5.5 6.8 3.3-1 5.5-3.5 5.5-6.8V5L9 2.5z" />
    </svg>
  ),
  rocket: (p: IconProps) => (
    <svg {...iconBase} {...p}>
      <path d="M9 12.5c-1.5 0-3.2-1-4-2.5 1-1.8 2.5-3 4.5-3.5 1.2 2 1.5 4 .8 5.5-.4.3-.8.5-1.3.5z" />
      <path d="M9.5 6.5c1.2-2.2 3.2-3.5 5.5-4-0.5 2.3-1.8 4.3-4 5.5" />
      <path d="M5 13.5 3.5 15M7 14.5l-.5 1.5" />
    </svg>
  ),
  building: (p: IconProps) => (
    <svg {...iconBase} {...p}>
      <path d="M3.5 15.5h11M5 15.5V4.5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v11M7.5 7h1M9.5 7h1M7.5 9.5h1M9.5 9.5h1M7.5 12h1M9.5 12h1" />
    </svg>
  ),
  book: (p: IconProps) => (
    <svg {...iconBase} {...p}>
      <path d="M3.5 4.2A1.7 1.7 0 0 1 5.2 2.5H14v12.5H5.2A1.7 1.7 0 0 0 3.5 16.7V4.2z" />
      <path d="M14 2.5h.8A1.7 1.7 0 0 1 16.5 4.2v12.5a1.7 1.7 0 0 0-1.7-1.7H14" />
    </svg>
  ),
  globe: (p: IconProps) => (
    <svg {...iconBase} {...p}>
      <circle cx="9" cy="9" r="6.5" />
      <path d="M2.5 9h13M9 2.5c1.8 1.8 2.8 4 2.8 6.5S10.8 13.7 9 15.5C7.2 13.7 6.2 11.5 6.2 9S7.2 4.3 9 2.5z" />
    </svg>
  ),
  lock: (p: IconProps) => (
    <svg {...iconBase} {...p}>
      <rect x="4" y="8" width="10" height="7.5" rx="1.5" />
      <path d="M6.5 8V5.5a2.5 2.5 0 0 1 5 0V8" />
    </svg>
  ),
  users: (p: IconProps) => (
    <svg {...iconBase} {...p}>
      <circle cx="7" cy="6.5" r="2.2" />
      <path d="M2.8 14.5c.4-2.2 2.1-3.5 4.2-3.5s3.8 1.3 4.2 3.5" />
      <circle cx="12.5" cy="7" r="1.8" />
      <path d="M12 11.2c1.6.3 2.8 1.4 3.2 3.3" />
    </svg>
  ),
  heart: (p: IconProps) => (
    <svg {...iconBase} {...p}>
      <path d="M9 15s-5.5-3.4-5.5-7A3.2 3.2 0 0 1 9 5.2 3.2 3.2 0 0 1 14.5 8c0 3.6-5.5 7-5.5 7z" />
    </svg>
  ),
  briefcase: (p: IconProps) => (
    <svg {...iconBase} {...p}>
      <rect x="2.5" y="5.5" width="13" height="9.5" rx="1.5" />
      <path d="M6.5 5.5V4a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 11.5 4v1.5M2.5 9.5h13" />
    </svg>
  ),
  mail: (p: IconProps) => (
    <svg {...iconBase} {...p}>
      <rect x="2.5" y="4.5" width="13" height="9.5" rx="1.5" />
      <path d="m3.5 5.5 5.5 4 5.5-4" />
    </svg>
  ),
  tag: (p: IconProps) => (
    <svg {...iconBase} {...p}>
      <path d="M3 9.5V3.8A1.3 1.3 0 0 1 4.3 2.5h5.2L15.5 8.5l-6 6L3 9.5z" />
      <circle cx="6.2" cy="6.2" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  headset: (p: IconProps) => (
    <svg {...iconBase} {...p}>
      <path d="M3.5 10v-1a5.5 5.5 0 0 1 11 0v1" />
      <path d="M3.5 10v2.5A1.5 1.5 0 0 0 5 14h.5M14.5 10v2.5a1.5 1.5 0 0 1-1.5 1.5H12" />
      <path d="M12 15.5c0 1-1.3 1.5-3 1.5" />
    </svg>
  ),
  puzzle: (p: IconProps) => (
    <svg {...iconBase} {...p}>
      <path d="M7 3.5h2a1.5 1.5 0 1 1 0 3H7v2.5H4.5a1.5 1.5 0 1 0 0 3H7V15h4v-2.5h1.5a1.5 1.5 0 1 0 0-3H11V6.5h2a1.5 1.5 0 1 0 0-3h-2V3.5H7z" />
    </svg>
  ),
  chevron: (p: IconProps) => (
    <svg {...iconBase} width={14} height={14} {...p}>
      <path d="m4.5 6.5 4 4 4-4" />
    </svg>
  ),
};

type IconKey = keyof typeof icons;
const Icon = ({ name, className }: { name: IconKey; className?: string }) => {
  const C = icons[name];
  return <C className={className} aria-hidden />;
};

const INDUSTRY_ICON: Record<string, IconKey> = {
  ecommerce: "tag",
  automotive: "rocket",
  "bfsi-lending": "phone",
  insurance: "shield",
  "brokerage-capital-markets": "chart",
  "real-estate": "building",
  education: "book",
  healthcare: "headset",
  "telecom-it": "globe",
  "travel-hospitality": "globe",
};

/* ─── Menu content ──────────────────────────────────────────────── */
type MenuLink = {
  heading?: string;
  title: string;
  subtitle?: string;
  href: string;
  icon?: IconKey;
};

const PRODUCT_LINKS: MenuLink[] = [
  {
    heading: "Platform",
    title: "Core Technology",
    subtitle: "ASR, LLM, TTS Pipeline",
    href: "/platform",
    icon: "spark",
  },
  {
    heading: "Platform",
    title: "Control Tower",
    subtitle: "Analytics & monitoring",
    href: "/platform",
    icon: "chart",
  },
  {
    heading: "Platform",
    title: "Integrations & SDKs",
    subtitle: "CRM, dialers, API access",
    href: "/integrations",
    icon: "puzzle",
  },
];

/** Top 6 solutions for nav hover — AI Intelligence Layer from solutions-section-copy */
const SOLUTION_NAV_LINKS: MenuLink[] = SOLUTION_NAV_TOP6.map((s) => ({
  title: s.title,
  subtitle: s.focus,
  href: `/solutions#${s.id}`,
  icon: "spark" as IconKey,
}));

const COMPANY_LINKS: MenuLink[] = [
  {
    heading: "Speaksy",
    title: "About Speaksy",
    subtitle: "Founders, vision & mission",
    href: "/about",
    icon: "spark",
  },
  {
    heading: "Speaksy",
    title: "Customer Stories",
    subtitle: "Case studies & outcomes",
    href: "/customers",
    icon: "users",
  },
  {
    heading: "Speaksy",
    title: "Careers & Culture",
    subtitle: "Build the future with us",
    href: "/careers",
    icon: "briefcase",
  },
  {
    heading: "Speaksy",
    title: "Blog",
    subtitle: "Industry Intelligence & stories",
    href: "/blog",
    icon: "book",
  },
  {
    heading: "Speaksy",
    title: "Contact",
    subtitle: "Talk to the team",
    href: "/contact",
    icon: "mail",
  },
];

type MenuId = "product" | "industries" | "solutions" | "company";

const NAV_ITEMS: {
  id: MenuId | "pricing";
  label: string;
  href: string;
  hasMenu: boolean;
}[] = [
  { id: "product", label: "Product", href: "/platform", hasMenu: true },
  {
    id: "industries",
    label: "Industry Intelligence",
    href: "/solutions",
    hasMenu: true,
  },
  { id: "solutions", label: "Solutions", href: "/solutions", hasMenu: true },
  { id: "pricing", label: "Pricing", href: "/pricing", hasMenu: false },
  { id: "company", label: "Company", href: "/about", hasMenu: true },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function menuFromPath(pathname: string): string | null {
  if (pathname.startsWith("/platform") || pathname.startsWith("/integrations"))
    return "product";
  if (pathname.startsWith("/solutions/")) return "industries";
  if (pathname === "/solutions") return "solutions";
  if (pathname.startsWith("/pricing")) return "pricing";
  if (
    pathname.startsWith("/about") ||
    pathname.startsWith("/careers") ||
    pathname.startsWith("/blog") ||
    pathname.startsWith("/customers") ||
    pathname.startsWith("/contact")
  )
    return "company";
  return null;
}

/* Green-only icon chips (subtle variety within brand) */
const ICON_TINTS = [
  "from-brand-300 to-brand-600",
  "from-emerald-300 to-brand-700",
  "from-lime-300 to-emerald-600",
  "from-brand-400 to-emerald-700",
  "from-emerald-400 to-brand-800",
  "from-brand-300 to-emerald-600",
];

/**
 * Morph menu — expands from the nav pill like the recording:
 * dark squircle grows open, list rows stagger in, collapses on leave.
 */
function MorphMenuPanel({
  title,
  items,
  footerHref,
  footerLabel,
  onNavigate,
  wide = false,
}: {
  title: string;
  items: MenuLink[];
  footerHref: string;
  footerLabel: string;
  onNavigate: () => void;
  wide?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden bg-[#1c1c1f]/95 text-white shadow-[0_24px_60px_-16px_rgba(0,0,0,0.55)] ring-1 ring-white/10 backdrop-blur-xl ${
        wide ? "w-[min(92vw,420px)]" : "w-[min(92vw,300px)]"
      }`}
      style={{ borderRadius: 28 }}
    >
      <div className="flex items-center justify-between px-4 pt-3.5 pb-1">
        <p className="text-[13px] font-semibold tracking-tight text-white/90">
          {title}
        </p>
        <span className="rounded-full bg-white/8 px-2 py-0.5 text-[10px] font-medium text-white/40">
          {items.length}
        </span>
      </div>

      <ul className="px-2 pb-1">
        {items.map((item, i) => (
          <motion.li
            key={item.title + item.href}
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.06 + i * 0.04,
              duration: 0.28,
              ease: EASE,
            }}
          >
            <Link
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onNavigate}
              className="group flex items-center gap-3 rounded-2xl px-2.5 py-2.5 transition-colors hover:bg-white/[0.06]"
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-inner ${ICON_TINTS[i % ICON_TINTS.length]}`}
              >
                {item.icon ? (
                  <Icon name={item.icon} className="h-4 w-4" />
                ) : (
                  <span className="text-xs font-bold">
                    {item.title.slice(0, 1)}
                  </span>
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-medium tracking-tight text-white/90 group-hover:text-white">
                  {item.title}
                </span>
                {item.subtitle && (
                  <span className="mt-0.5 line-clamp-1 block text-[11px] text-white/40">
                    {item.subtitle}
                  </span>
                )}
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>

      <div className="border-t border-white/8 px-2 py-2">
        <Link
          href={footerHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onNavigate}
          className="flex items-center justify-center rounded-2xl px-3 py-2.5 text-[12px] font-medium text-white/45 transition-colors hover:bg-white/[0.05] hover:text-white/80"
        >
          {footerLabel}
        </Link>
      </div>
    </div>
  );
}

/* ─── Navbar ────────────────────────────────────────────────────── */
export default function Navbar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const openDelay = reduceMotion ? 0 : 30;
  const closeDelay = reduceMotion ? 0 : 100;
  const uid = useId();

  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [compact, setCompact] = useState(false);

  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const tabsWrapRef = useRef<HTMLDivElement>(null);
  const tabEls = useRef<Record<string, HTMLButtonElement | null>>({});
  /** Panel horizontal center relative to tabs wrap (px) */
  const [panelAnchorX, setPanelAnchorX] = useState<number | null>(null);

  const activePath = useMemo(() => menuFromPath(pathname), [pathname]);
  /** GlowTabs active value — open menu wins, else route match */
  const glowValue = activeMenu ?? activePath ?? "";

  const glowTabs = useMemo(
    () => NAV_ITEMS.map(({ id, label }) => ({ id, label })),
    []
  );

  const clearTimers = useCallback(() => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    openTimer.current = null;
    closeTimer.current = null;
  }, []);

  const openMenu = useCallback(
    (id: MenuId) => {
      clearTimers();
      openTimer.current = setTimeout(() => setActiveMenu(id), openDelay);
    },
    [clearTimers, openDelay]
  );

  const scheduleClose = useCallback(() => {
    clearTimers();
    closeTimer.current = setTimeout(() => setActiveMenu(null), closeDelay);
  }, [clearTimers, closeDelay]);

  const closeAll = useCallback(() => {
    clearTimers();
    setActiveMenu(null);
    setMobileOpen(false);
    setMobileAccordion(null);
  }, [clearTimers]);

  const onGlowChange = useCallback(
    (id: string) => {
      const item = NAV_ITEMS.find((t) => t.id === id);
      if (!item) return;
      if (item.hasMenu) {
        setActiveMenu((cur) => (cur === id ? null : (id as MenuId)));
        return;
      }
      setActiveMenu(null);
      window.open(item.href, "_blank", "noopener,noreferrer");
    },
    []
  );

  const onGlowHover = useCallback(
    (id: string | null) => {
      if (id === null) {
        scheduleClose();
        return;
      }
      const item = NAV_ITEMS.find((t) => t.id === id);
      if (item?.hasMenu) openMenu(item.id as MenuId);
      else scheduleClose();
    },
    [openMenu, scheduleClose]
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mqDesk = window.matchMedia("(min-width: 1024px)");
    const mqTab = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");
    const sync = () => {
      setIsDesktop(mqDesk.matches);
      setCompact(mqTab.matches);
    };
    sync();
    mqDesk.addEventListener("change", sync);
    mqTab.addEventListener("change", sync);
    return () => {
      mqDesk.removeEventListener("change", sync);
      mqTab.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    closeAll();
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const lock = mobileOpen || activeMenu === "industries";
    document.body.style.overflow = lock ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, activeMenu]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeAll]);

  useEffect(() => {
    if (!activeMenu && !mobileOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) closeAll();
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [activeMenu, mobileOpen, closeAll]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const industriesOpen = activeMenu === "industries";
  const megaOpen =
    activeMenu !== null && activeMenu !== "industries";

  /** Anchor morph panel under the hovered/active tab, not nav center */
  const measurePanelAnchor = useCallback(() => {
    if (!activeMenu || activeMenu === "industries") {
      setPanelAnchorX(null);
      return;
    }
    const wrap = tabsWrapRef.current;
    const btn = tabEls.current[activeMenu];
    if (!wrap || !btn) return;
    const wr = wrap.getBoundingClientRect();
    const br = btn.getBoundingClientRect();
    setPanelAnchorX(br.left + br.width / 2 - wr.left);
  }, [activeMenu]);

  useLayoutEffect(() => {
    measurePanelAnchor();
    // re-measure after fonts/layout settle
    const t = window.setTimeout(measurePanelAnchor, 16);
    return () => window.clearTimeout(t);
  }, [measurePanelAnchor, megaOpen, activeMenu]);

  useEffect(() => {
    if (!megaOpen) return;
    window.addEventListener("resize", measurePanelAnchor);
    return () => window.removeEventListener("resize", measurePanelAnchor);
  }, [megaOpen, measurePanelAnchor]);

  const registerTabRef = useCallback(
    (id: string, el: HTMLButtonElement | null) => {
      tabEls.current[id] = el;
    },
    []
  );

  const renderMorphPanel = (id: MenuId): ReactNode => {
    if (id === "product") {
      return (
        <MorphMenuPanel
          title="Product"
          items={PRODUCT_LINKS}
          footerHref="/platform"
          footerLabel="Explore the platform"
          onNavigate={closeAll}
        />
      );
    }
    if (id === "solutions") {
      return (
        <MorphMenuPanel
          title="Solutions"
          items={SOLUTION_NAV_LINKS}
          footerHref="/solutions"
          footerLabel="View all solutions"
          onNavigate={closeAll}
          wide
        />
      );
    }
    if (id === "company") {
      return (
        <MorphMenuPanel
          title="Company"
          items={COMPANY_LINKS}
          footerHref="/about"
          footerLabel="About Speaksy"
          onNavigate={closeAll}
        />
      );
    }
    return null;
  };

  const mobileSections: {
    id: string;
    label: string;
    href?: string;
    links?: MenuLink[];
  }[] = [
    { id: "product", label: "Product", links: PRODUCT_LINKS },
    {
      id: "industries",
      label: "Industry Intelligence",
      links: industries.map((ind) => ({
        title: ind.name,
        subtitle: ind.tag,
        href: `/solutions/${ind.slug}`,
        icon: INDUSTRY_ICON[ind.slug] ?? "building",
      })),
    },
    {
      id: "solutions",
      label: "Solutions",
      links: SOLUTION_NAV_LINKS,
    },
    { id: "pricing", label: "Pricing", href: "/pricing" },
    { id: "company", label: "Company", links: COMPANY_LINKS },
  ];

  return (
    <header
      ref={navRef}
      className="fixed inset-x-0 top-0 z-50 flex flex-col items-center px-3 pt-3 sm:px-4 sm:pt-4"
    >
      {/* Full-page blur when Industries is open — no white box */}
      <AnimatePresence>
        {industriesOpen && (
          <motion.div
            key="industries-blur"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="fixed inset-0 z-40 bg-white/50 backdrop-blur-2xl backdrop-saturate-150"
            onClick={closeAll}
          />
        )}
      </AnimatePresence>

      {/* Soft backdrop for other mega menus */}
      <AnimatePresence>
        {megaOpen && isDesktop && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-black/[0.06] via-transparent to-transparent"
          />
        )}
      </AnimatePresence>

      <motion.nav
        aria-label="Primary"
        initial={{ y: -48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className={`nav-shell relative z-[60] flex items-center gap-3 rounded-full px-3 py-2 sm:gap-4 sm:px-3.5 sm:py-2.5 ${
          scrolled || industriesOpen ? "nav-shell--scrolled" : ""
        }`}
      >
        {/* Logo — vertically centered with nav pills */}
        <div className="flex shrink-0 items-center self-center">
          <Logo size={32} priority />
        </div>

        {/* Center — GlowTabs (green underglow + consistent pills) */}
        <div
          ref={tabsWrapRef}
          className="relative hidden min-w-0 flex-1 justify-center lg:flex"
          onMouseLeave={() => {
            /* Industries overlay owns its leave; other menus close here */
            if (activeMenu !== "industries") scheduleClose();
          }}
        >
          <GlowTabs
            variant="dark"
            size="sm"
            value={glowValue}
            onChange={onGlowChange}
            onTabHover={onGlowHover}
            tabs={glowTabs}
            showTrack={false}
            showGlow
            registerTabRef={registerTabRef}
            endAdornment={(id, active) => {
              const item = NAV_ITEMS.find((t) => t.id === id);
              if (!item?.hasMenu) return null;
              return (
                <Icon
                  name="chevron"
                  className={`shrink-0 opacity-50 transition-transform duration-200 ${
                    activeMenu === id || active ? "rotate-180" : ""
                  }`}
                />
              );
            }}
          />

          {/* Morph menu — anchored under the hovered tab */}
          <AnimatePresence mode="wait">
            {megaOpen && activeMenu && panelAnchorX != null && (
              <motion.div
                key={activeMenu}
                id={`${uid}-${activeMenu}-panel`}
                role="region"
                aria-label={`${activeMenu} menu`}
                initial={{
                  opacity: 0,
                  y: -6,
                  scale: 0.35,
                  borderRadius: 999,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  borderRadius: 28,
                }}
                exit={{
                  opacity: 0,
                  y: -4,
                  scale: 0.4,
                  borderRadius: 999,
                }}
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 28,
                  mass: 0.65,
                }}
                style={{
                  left: panelAnchorX,
                  originX: 0.5,
                  originY: 0,
                }}
                onMouseEnter={() => {
                  clearTimers();
                  setActiveMenu(activeMenu);
                }}
                onMouseLeave={scheduleClose}
                className="absolute top-full z-50 -translate-x-1/2 pt-2"
              >
                {renderMorphPanel(activeMenu)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right CTA — static (no magnetic / no cursor follow) */}
        <div className="ml-auto hidden shrink-0 items-center md:flex">
          <Link
            href="/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="brand-pill inline-flex h-9 items-center justify-center whitespace-nowrap rounded-full px-5 text-[14px] font-semibold text-white shadow-[0_4px_18px_-4px_rgba(34,197,94,0.55)]"
          >
            Book Demo
          </Link>
        </div>

        {/* Mobile / tablet hamburger */}
        <button
          type="button"
          className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </motion.nav>

      {/* Industries — floating bars over page blur (no white panel) */}
      <AnimatePresence>
        {industriesOpen && (
          <motion.div
            key="industries-stage"
            role="region"
            aria-label="Industry Intelligence"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-start px-4 pt-24 pb-10 sm:pt-28"
            onClick={closeAll}
            onMouseEnter={() => {
              clearTimers();
              setActiveMenu("industries");
            }}
            onMouseLeave={scheduleClose}
          >
            {/* Bars only — stop click so selecting doesn't close; empty blur area closes */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <IndustryGradientBars
                variant="nav"
                hideHeader
                animateIn
                openInNewTab
                onNavigate={closeAll}
              />
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className="relative z-10 mt-10 flex flex-col items-center gap-3 sm:mt-12"
              >
                <p className="text-[12px] font-medium tracking-wide text-neutral-500">
                  Industry Intelligence — click a bar to open
                </p>
                <Link
                  href="/solutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeAll}
                  className="rounded-full border border-black/10 bg-white/90 px-5 py-2.5 text-[13px] font-semibold text-brand-700 shadow-sm backdrop-blur-md transition hover:bg-white"
                >
                  View all industries →
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col bg-[#141416] lg:hidden"
          >
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
              <Logo size={30} />
              <button
                type="button"
                onClick={closeAll}
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 hover:bg-white/10"
                aria-label="Close menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 pb-6 pt-2">
              {mobileSections.map((sec) => {
                if (sec.href && !sec.links) {
                  return (
                    <Link
                      key={sec.id}
                      href={sec.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeAll}
                      className="flex items-center rounded-xl px-4 py-3.5 text-base font-semibold tracking-tight text-white/90 hover:bg-white/5"
                    >
                      {sec.label}
                    </Link>
                  );
                }
                const open = mobileAccordion === sec.id;
                return (
                  <div key={sec.id} className="border-b border-white/10">
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() =>
                        setMobileAccordion(open ? null : sec.id)
                      }
                      className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-base font-semibold tracking-tight text-white/90 hover:bg-white/5"
                    >
                      {sec.label}
                      <Icon
                        name="chevron"
                        className={`text-white/40 transition-transform ${open ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {open && sec.links && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-0.5 px-2 pb-3">
                            {sec.links.map((item) => (
                              <Link
                                key={item.title + item.href}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={closeAll}
                                className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-white/5"
                              >
                                {item.icon && (
                                  <span className="mega-item-icon mt-0.5">
                                    <Icon name={item.icon} />
                                  </span>
                                )}
                                <span>
                                  <span className="block text-sm font-semibold text-white/90">
                                    {item.title}
                                  </span>
                                  {item.subtitle && (
                                    <span className="mt-0.5 block text-xs text-white/45">
                                      {item.subtitle}
                                    </span>
                                  )}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            <div className="flex flex-col gap-2.5 border-t border-white/10 px-5 py-5">
              <Link
                href="/contact"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeAll}
                className="brand-pill inline-flex h-11 items-center justify-center rounded-full text-sm font-semibold text-white"
              >
                Book Demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
