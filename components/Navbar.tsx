"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
  type SVGProps,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Logo from "./Logo";
import Magnetic from "./ui/Magnetic";
import { industries } from "@/lib/industries";

/* ─────────────────────────────────────────────
   Motion tokens — Apple / Stripe calm curves
   ───────────────────────────────────────────── */

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;
const OPEN_DELAY_MS = 30;
const CLOSE_DELAY_MS = 100;
const MENU_DURATION = 0.22;

const menuContainerVariants = {
  hidden: {
    opacity: 0,
    y: -8,
    scale: 0.985,
    x: "-50%",
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    x: "-50%",
    filter: "blur(0px)",
    transition: {
      duration: MENU_DURATION,
      ease: EASE_PREMIUM,
      when: "beforeChildren" as const,
      staggerChildren: 0.022,
      delayChildren: 0.02,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.995,
    x: "-50%",
    filter: "blur(2px)",
    transition: { duration: 0.14, ease: EASE_PREMIUM },
  },
};

const menuItemVariants = {
  hidden: { opacity: 0, y: 4 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: EASE_PREMIUM },
  },
};

const iconVariants = {
  hidden: { opacity: 0, y: 3 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: EASE_PREMIUM },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 3 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, delay: 0.02, ease: EASE_PREMIUM },
  },
};

/* ─────────────────────────────────────────────
   Icons — thin line, rounded, premium
   ───────────────────────────────────────────── */

type IconProps = SVGProps<SVGSVGElement>;

function IconBase({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

const icons = {
  phone: (
    <IconBase>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </IconBase>
  ),
  headset: (
    <IconBase>
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </IconBase>
  ),
  message: (
    <IconBase>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </IconBase>
  ),
  instagram: (
    <IconBase>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </IconBase>
  ),
  spark: (
    <IconBase>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
      <circle cx="12" cy="12" r="3" />
    </IconBase>
  ),
  channels: (
    <IconBase>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </IconBase>
  ),
  chart: (
    <IconBase>
      <path d="M3 3v18h18" />
      <path d="M7 14l4-4 3 3 5-6" />
    </IconBase>
  ),
  shield: (
    <IconBase>
      <path d="M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </IconBase>
  ),
  rocket: (
    <IconBase>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </IconBase>
  ),
  building: (
    <IconBase>
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
      <path d="M9 9h.01M15 9h.01M9 13h.01M15 13h.01" />
    </IconBase>
  ),
  book: (
    <IconBase>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </IconBase>
  ),
  puzzle: (
    <IconBase>
      <path d="M19.44 12.99l-2.12 2.12a2 2 0 0 1-2.83 0l-1.41-1.41a2 2 0 0 0-2.83 0L8.12 15.83a2 2 0 0 1-2.83 0L3.17 13.7" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      <circle cx="12" cy="12" r="3" />
    </IconBase>
  ),
  globe: (
    <IconBase>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </IconBase>
  ),
  lock: (
    <IconBase>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </IconBase>
  ),
  users: (
    <IconBase>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </IconBase>
  ),
  heart: (
    <IconBase>
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
    </IconBase>
  ),
  briefcase: (
    <IconBase>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M12 12v4M2 12h20" />
    </IconBase>
  ),
  mail: (
    <IconBase>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-10 7L2 7" />
    </IconBase>
  ),
  tag: (
    <IconBase>
      <path d="M12 2H2v10l9.3 9.3a1 1 0 0 0 1.4 0l8.6-8.6a1 1 0 0 0 0-1.4L12 2z" />
      <circle cx="7" cy="7" r="1.2" fill="currentColor" stroke="none" />
    </IconBase>
  ),
  chevron: (
    <IconBase className="h-3.5 w-3.5">
      <path d="M6 9l6 6 6-6" />
    </IconBase>
  ),
};

/* ─────────────────────────────────────────────
   Nav data
   ───────────────────────────────────────────── */

type MenuLink = {
  href: string;
  title: string;
  subtitle: string;
  icon: keyof typeof icons;
};

type NavSection = {
  id: string;
  label: string;
  href?: string;
  columns: { heading: string; items: MenuLink[] }[];
  footer?: { label: string; href: string };
};

const platformLinks: MenuLink[] = [
  {
    href: "/platform",
    title: "AI Calling Agent",
    subtitle: "Voice AI for lead gen",
    icon: "phone",
  },
  {
    href: "/platform#handoff",
    title: "Customer Care Agent",
    subtitle: "24/7 automated support",
    icon: "headset",
  },
  {
    href: "/integrations",
    title: "WhatsApp Agent",
    subtitle: "Messaging automation",
    icon: "message",
  },
  {
    href: "/platform",
    title: "Instagram Agent",
    subtitle: "Social automation",
    icon: "instagram",
  },
];

const featureLinks: MenuLink[] = [
  {
    href: "/platform",
    title: "Smart Lead Scoring",
    subtitle: "Real-time qualification",
    icon: "spark",
  },
  {
    href: "/integrations",
    title: "Multi-channel Support",
    subtitle: "Phone, WhatsApp & more",
    icon: "channels",
  },
  {
    href: "/platform",
    title: "Analytics",
    subtitle: "Conversation insights",
    icon: "chart",
  },
  {
    href: "/security",
    title: "Enterprise Security",
    subtitle: "SOC2-ready compliance",
    icon: "shield",
  },
  {
    href: "/platform",
    title: "Instant Deployment",
    subtitle: "Live in minutes",
    icon: "rocket",
  },
];

const industryIconMap: Record<string, keyof typeof icons> = {
  ecommerce: "tag",
  automotive: "rocket",
  "bfsi-lending": "phone",
  insurance: "shield",
  "brokerage-capital-markets": "chart",
  "real-estate": "building",
  education: "book",
  healthcare: "headset",
  "telecom-it": "channels",
  "travel-hospitality": "globe",
};

const allIndustryLinks: MenuLink[] = industries.map((ind) => ({
  href: `/solutions/${ind.slug}`,
  title: ind.name,
  subtitle: ind.tag.replace(/\.$/, "").slice(0, 36),
  icon: industryIconMap[ind.slug] || "building",
}));

const industryLinksCol1 = allIndustryLinks.slice(0, 5);
const industryLinksCol2 = allIndustryLinks.slice(5, 10);

const resourceLinks: MenuLink[] = [
  {
    href: "/blog",
    title: "Blog",
    subtitle: "News & playbooks",
    icon: "book",
  },
  {
    href: "/integrations",
    title: "Integrations",
    subtitle: "CRM, dialers & more",
    icon: "puzzle",
  },
  {
    href: "/languages",
    title: "Languages",
    subtitle: "14 Indian languages",
    icon: "globe",
  },
  {
    href: "/security",
    title: "Security",
    subtitle: "Privacy & compliance",
    icon: "lock",
  },
  {
    href: "/pricing",
    title: "Pricing",
    subtitle: "Plans that scale",
    icon: "tag",
  },
];

const companyLinks: MenuLink[] = [
  {
    href: "/about",
    title: "About Us",
    subtitle: "Mission & story",
    icon: "users",
  },
  {
    href: "/customers",
    title: "Customers",
    subtitle: "Stories from the field",
    icon: "heart",
  },
  {
    href: "/careers",
    title: "Careers",
    subtitle: "Build with us",
    icon: "briefcase",
  },
  {
    href: "/contact",
    title: "Contact",
    subtitle: "Talk to the team",
    icon: "mail",
  },
];

const navSections: NavSection[] = [
  {
    id: "platform",
    label: "Platform",
    href: "/platform",
    columns: [
      { heading: "AI Agents", items: platformLinks },
      { heading: "Features", items: featureLinks },
    ],
    footer: { label: "Explore the platform", href: "/platform" },
  },
  {
    id: "industries",
    label: "Industries",
    href: "/solutions",
    columns: [
      {
        heading: "Solutions by industry",
        items: industryLinksCol1,
      },
      {
        heading: "More industries",
        items: industryLinksCol2,
      },
      {
        heading: "Featured",
        items: [
          {
            href: "/solutions",
            title: "All industries",
            subtitle: "Browse every vertical",
            icon: "building",
          },
          {
            href: "/customers",
            title: "Customer stories",
            subtitle: "How teams ship with Speaksy",
            icon: "heart",
          },
        ],
      },
    ],
    footer: { label: "View all solutions", href: "/solutions" },
  },
  {
    id: "resources",
    label: "Resources",
    href: "/blog",
    columns: [{ heading: "Learn & build", items: resourceLinks }],
  },
  {
    id: "company",
    label: "Company",
    href: "/about",
    columns: [{ heading: "Speaksy", items: companyLinks }],
  },
];

function isActive(pathname: string, href?: string) {
  if (!href) return false;
  if (href === "/") return pathname === "/";
  const base = href.split("#")[0];
  return pathname === base || pathname.startsWith(`${base}/`);
}

/* ─────────────────────────────────────────────
   Mega menu item card
   ───────────────────────────────────────────── */

function MenuItemCard({
  item,
  onNavigate,
  compact = false,
}: {
  item: MenuLink;
  onNavigate?: () => void;
  compact?: boolean;
}) {
  return (
    <motion.div variants={menuItemVariants}>
      <Link
        href={item.href}
        onClick={onNavigate}
        className="nav-menu-card group flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-colors duration-250 ease-out hover:bg-surface focus-visible:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/25"
      >
        <motion.span
          variants={iconVariants}
          className="nav-menu-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-brand-800 bg-brand-950 text-brand-600 transition-transform duration-250 ease-out group-hover:-translate-y-px"
        >
          {icons[item.icon]}
        </motion.span>
        <motion.span variants={textVariants} className="min-w-0">
          <span
            className={`block font-semibold leading-tight tracking-tight text-foreground transition-colors duration-250 group-hover:text-brand-600 ${
              compact ? "text-[13.5px]" : "text-[14px]"
            }`}
          >
            {item.title}
          </span>
          <span className="mt-0.5 block text-[12.5px] leading-snug text-muted transition-colors duration-250 group-hover:text-foreground/70">
            {item.subtitle}
          </span>
        </motion.span>
      </Link>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Desktop / tablet mega panel
   ───────────────────────────────────────────── */

function MegaPanel({
  section,
  compact,
  onNavigate,
  id,
}: {
  section: NavSection;
  compact: boolean;
  onNavigate: () => void;
  id: string;
}) {
  const multiCol = section.columns.length > 1 && !compact;
  const isThreeCol = section.columns.length === 3 && !compact;
  const panelMax = isThreeCol
    ? "max-w-[1100px]"
    : multiCol
    ? "max-w-[820px]"
    : "max-w-[360px]";
  const panelPad = compact ? "p-3.5" : multiCol ? "px-5 py-4" : "px-3.5 py-3.5";

  return (
    <motion.div
      id={id}
      role="region"
      aria-label={`${section.label} menu`}
      variants={
        compact
          ? {
              ...menuContainerVariants,
              hidden: { ...menuContainerVariants.hidden, x: 0 },
              visible: { ...menuContainerVariants.visible, x: 0 },
              exit: { ...menuContainerVariants.exit, x: 0 },
            }
          : menuContainerVariants
      }
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`nav-mega z-50 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_16px_48px_-12px_rgba(0,0,0,0.12),0_4px_12px_-4px_rgba(0,0,0,0.04)] ${
        compact
          ? `relative w-full ${panelMax} ${panelPad}`
          : `pointer-events-auto absolute left-1/2 top-3.5 w-full ${panelMax} ${panelPad}`
      }`}
      style={{ transformOrigin: "50% 0%" }}
    >
      <div
        className={
          multiCol
            ? isThreeCol
              ? "grid grid-cols-3 gap-x-5 gap-y-0"
              : "grid grid-cols-2 gap-x-5 gap-y-0"
            : "flex flex-col gap-0"
        }
      >
        {section.columns.map((col) => (
          <div key={col.heading} className="min-w-0">
            <motion.p
              variants={menuItemVariants}
              className="mb-1.5 px-2 text-[11px] font-medium uppercase tracking-[0.12em] text-muted"
            >
              {col.heading}
            </motion.p>
            <div className="flex flex-col gap-0">
              {col.items.map((item) => (
                <MenuItemCard
                  key={`${col.heading}-${item.title}`}
                  item={item}
                  onNavigate={onNavigate}
                  compact={compact}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {section.footer && !compact && (
        <motion.div
          variants={menuItemVariants}
          className="mt-3 border-t border-line pt-2.5"
        >
          <Link
            href={section.footer.href}
            onClick={onNavigate}
            className="nav-mega-footer group inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[13px] font-semibold text-brand-600 transition-colors duration-250 hover:bg-brand-950 hover:text-brand-700"
          >
            {section.footer.label}
            <span
              aria-hidden
              className="inline-block transition-transform duration-250 ease-out group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Mobile accordion section
   ───────────────────────────────────────────── */

function MobileAccordion({
  section,
  open,
  onToggle,
  onNavigate,
}: {
  section: NavSection;
  open: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const panelId = useId();
  const allItems = section.columns.flatMap((c) => c.items);

  return (
    <div className="border-b border-black/[0.05] last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between px-1 py-3.5 text-left text-[15px] font-medium text-foreground transition-colors duration-200 hover:text-brand-600"
      >
        {section.label}
        <span
          className={`text-muted transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "rotate-180" : ""
          }`}
        >
          {icons.chevron}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_PREMIUM }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-0 pb-2 pl-0.5">
              {allItems.map((item) => (
                <Link
                  key={`${section.id}-${item.title}`}
                  href={item.href}
                  onClick={onNavigate}
                  className="group flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-colors duration-250 hover:bg-surface"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-brand-800 bg-brand-950 text-brand-600 transition-transform duration-250 group-hover:-translate-y-px">
                    {icons[item.icon]}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[14px] font-semibold leading-tight text-foreground transition-colors duration-250 group-hover:text-brand-600">
                      {item.title}
                    </span>
                    <span className="mt-0.5 block text-[12.5px] leading-snug text-muted">
                      {item.subtitle}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Navbar
   ───────────────────────────────────────────── */

export default function Navbar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [compact, setCompact] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const clearTimers = useCallback(() => {
    if (openTimer.current) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openMenu = useCallback(
    (id: string) => {
      clearTimers();
      if (reduceMotion || activeMenu) {
        setActiveMenu(id);
        return;
      }
      openTimer.current = setTimeout(() => {
        setActiveMenu(id);
      }, OPEN_DELAY_MS);
    },
    [clearTimers, reduceMotion, activeMenu],
  );

  const scheduleClose = useCallback(() => {
    clearTimers();
    if (reduceMotion) {
      setActiveMenu(null);
      return;
    }
    closeTimer.current = setTimeout(() => {
      setActiveMenu(null);
    }, CLOSE_DELAY_MS);
  }, [clearTimers, reduceMotion]);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const closeAll = useCallback(() => {
    clearTimers();
    setActiveMenu(null);
    setMobileOpen(false);
    setMobileAccordion(null);
  }, [clearTimers]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mqDesktop = window.matchMedia("(min-width: 1024px)");
    const mqTablet = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");

    const sync = () => {
      setIsDesktop(mqDesktop.matches);
      setCompact(mqTablet.matches);
      if (!mqDesktop.matches && !mqTablet.matches) {
        setActiveMenu(null);
      }
      if (mqDesktop.matches || mqTablet.matches) {
        setMobileOpen(false);
      }
    };

    sync();
    mqDesktop.addEventListener("change", sync);
    mqTablet.addEventListener("change", sync);
    return () => {
      mqDesktop.removeEventListener("change", sync);
      mqTablet.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeAll]);

  useEffect(() => {
    if (!activeMenu && !mobileOpen) return;
    const onPointer = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) {
        closeAll();
      }
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [activeMenu, mobileOpen, closeAll]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const showDesktopMenus = isDesktop || compact;

  return (
    <header
      ref={navRef}
      className={`nav-shell relative z-50 transition-[box-shadow,background-color,border-color] duration-300 ease-out ${
        scrolled || activeMenu || mobileOpen ? "nav-shell--scrolled" : ""
      }`}
    >
      <div className="mx-auto flex h-[76px] w-full max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
        {/* Logo */}
        <div className="relative z-10 shrink-0">
          <Logo size={36} priority />
        </div>

        {/* Center nav — desktop & tablet */}
        <nav
          className="absolute left-1/2 top-0 hidden h-full -translate-x-1/2 items-center lg:flex"
          aria-label="Primary"
          onMouseLeave={scheduleClose}
        >
          <ul className="flex h-full items-center gap-0.5">
            {navSections.map((section) => {
              const open = activeMenu === section.id;
              const active = isActive(pathname, section.href) || open;
              return (
                <li
                  key={section.id}
                  className="relative flex h-full items-center"
                  onMouseEnter={() => {
                    cancelClose();
                    openMenu(section.id);
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-haspopup="true"
                    aria-controls={open ? `mega-${section.id}` : undefined}
                    onFocus={() => openMenu(section.id)}
                    className={`relative flex items-center gap-1.5 rounded-lg px-4 py-2 text-[14px] font-medium tracking-[-0.01em] transition-colors duration-200 ${
                      active
                        ? "text-brand-600"
                        : "text-[#374151] hover:text-[#0B1F3A]"
                    }`}
                  >
                    {section.label}
                    <span
                      className={`text-current opacity-50 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        open ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    >
                      {icons.chevron}
                    </span>
                    {open && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 -z-10 rounded-lg bg-black/[0.04]"
                        transition={{ duration: 0.25, ease: EASE_PREMIUM }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Full-width host: pt bridge keeps pointer path open trigger → panel */}
          <div
            className={`absolute left-1/2 top-full w-screen max-w-[100vw] -translate-x-1/2 pt-3.5 ${
              activeMenu ? "pointer-events-auto" : "pointer-events-none"
            }`}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <AnimatePresence>
              {activeMenu && isDesktop && (
                <MegaPanel
                  key={activeMenu}
                  id={`mega-${activeMenu}`}
                  section={navSections.find((s) => s.id === activeMenu)!}
                  compact={false}
                  onNavigate={closeAll}
                />
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Tablet compact nav */}
        <nav
          className="absolute left-1/2 top-0 hidden h-full -translate-x-1/2 items-center md:flex lg:hidden"
          aria-label="Primary"
          onMouseLeave={scheduleClose}
        >
          <ul className="flex h-full items-center gap-0.5">
            {navSections.map((section) => {
              const open = activeMenu === section.id;
              return (
                <li
                  key={section.id}
                  className="relative flex h-full items-center"
                  onMouseEnter={() => {
                    cancelClose();
                    openMenu(section.id);
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    className={`flex items-center gap-1 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors duration-200 ${
                      open || isActive(pathname, section.href)
                        ? "text-brand-600"
                        : "text-[#374151] hover:text-[#0B1F3A]"
                    }`}
                  >
                    {section.label}
                    <span
                      className={`opacity-50 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        open ? "rotate-180" : ""
                      }`}
                    >
                      {icons.chevron}
                    </span>
                  </button>

                  <AnimatePresence>
                    {open && compact && (
                      <div
                        className="absolute left-1/2 top-full z-50 w-[min(420px,calc(100vw-2rem))] -translate-x-1/2 pt-2.5"
                        onMouseEnter={cancelClose}
                        onMouseLeave={scheduleClose}
                      >
                        <MegaPanel
                          id={`mega-tablet-${section.id}`}
                          section={section}
                          compact
                          onNavigate={closeAll}
                        />
                      </div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right actions */}
        <div className="relative z-10 flex items-center gap-2 sm:gap-3">
          <Link
            href="/contact"
            className="hidden rounded-lg px-3 py-2 text-[14px] font-medium text-[#374151] transition-colors duration-200 hover:text-[#0B1F3A] md:inline-flex"
          >
            Login
          </Link>

          <Magnetic strength={0.28} radius={64}>
            <Link
              href="/contact"
              className="brand-pill hidden rounded-xl px-5 py-2.5 text-[14px] font-semibold shadow-[0_4px_20px_-6px_rgba(22,163,74,0.4)] transition-[box-shadow,transform] duration-200 hover:shadow-[0_6px_24px_-4px_rgba(22,163,74,0.45)] active:scale-[0.98] md:inline-flex"
            >
              Book a Demo
            </Link>
          </Magnetic>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-[#0B1F3A] transition-colors duration-200 hover:bg-black/[0.04] md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && !showDesktopMenus && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: EASE_PREMIUM }}
            className="nav-mobile border-t border-black/[0.05] bg-white/95 backdrop-blur-xl md:hidden"
          >
            <div className="mx-auto max-h-[min(80vh,640px)] max-w-[1400px] overflow-y-auto px-5 pb-6 pt-2 sm:px-8">
              {navSections.map((section) => (
                <MobileAccordion
                  key={section.id}
                  section={section}
                  open={mobileAccordion === section.id}
                  onToggle={() =>
                    setMobileAccordion((cur) => (cur === section.id ? null : section.id))
                  }
                  onNavigate={closeAll}
                />
              ))}

              <div className="mt-5 flex flex-col gap-2 border-t border-black/[0.05] pt-5">
                <Link
                  href="/contact"
                  onClick={closeAll}
                  className="rounded-xl px-4 py-3 text-center text-[15px] font-medium text-[#374151] transition-colors hover:bg-black/[0.03]"
                >
                  Login
                </Link>
                <Link
                  href="/contact"
                  onClick={closeAll}
                  className="brand-pill rounded-xl px-4 py-3.5 text-center text-[15px] font-semibold"
                >
                  Book a Demo
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click-away backdrop when mega menu open (desktop) */}
      <AnimatePresence>
        {activeMenu && isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-black/[0.02] to-transparent"
            aria-hidden
          />
        )}
      </AnimatePresence>
    </header>
  );
}
