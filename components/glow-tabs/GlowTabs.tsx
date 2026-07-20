"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";
import { motion } from "framer-motion";
import { Mail, Paperclip } from "lucide-react";

export type GlowTabItem = {
  id: string;
  label: string;
  Icon?: ComponentType<{ className?: string; strokeWidth?: number }>;
};

type Props = {
  tabs: GlowTabItem[];
  value: string;
  onChange: (id: string) => void;
  /** light = white glass; dark = charcoal pills for premium nav */
  variant?: "light" | "dark";
  size?: "sm" | "md";
  showTrack?: boolean;
  /** Ambient glow under active pill */
  showGlow?: boolean;
  className?: string;
  /** Extra node after each label (e.g. chevron) */
  endAdornment?: (id: string, active: boolean) => ReactNode;
  onTabHover?: (id: string | null) => void;
  /** Expose tab button elements (for anchoring menus under a tab) */
  registerTabRef?: (id: string, el: HTMLButtonElement | null) => void;
};

/**
 * Glass tab switcher — consistent pill buttons, active gets green underglow.
 */
export function GlowTabs({
  tabs,
  value,
  onChange,
  variant = "light",
  size = "md",
  showTrack = true,
  showGlow = true,
  className = "",
  endAdornment,
  onTabHover,
  registerTabRef,
}: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0, center: 0 });

  useLayoutEffect(() => {
    const measure = () => {
      const row = rowRef.current;
      const btn = btnRefs.current[value];
      if (!row || !btn) return;
      const rr = row.getBoundingClientRect();
      const br = btn.getBoundingClientRect();
      const left = br.left - rr.left;
      const width = br.width;
      setIndicator({ left, width, center: left + width / 2 });
    };
    measure();
    const t = window.setTimeout(measure, 50);
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [value, tabs]);

  const light = variant === "light";
  const pad = size === "sm" ? "px-3.5 py-2" : "px-5 py-2.5";
  const text = size === "sm" ? "text-[14px]" : "text-[14px]";
  const iconCls = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {showGlow && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-1/2 z-0 -translate-y-[48%]"
          animate={{ left: indicator.center }}
          transition={{ type: "spring", stiffness: 280, damping: 32, mass: 0.7 }}
          style={{
            x: "-50%",
            width: light ? 200 : 220,
            height: light ? 120 : 100,
            background: light
              ? "radial-gradient(circle, rgba(34,197,94,0.18) 0%, rgba(34,197,94,0.06) 38%, transparent 68%)"
              : "radial-gradient(circle, rgba(34,197,94,0.32) 0%, rgba(34,197,94,0.1) 40%, transparent 70%)",
            filter: "blur(2px)",
          }}
        />
      )}

      <div
        ref={rowRef}
        className="relative z-10 flex items-center gap-1.5 sm:gap-2"
        onMouseLeave={() => onTabHover?.(null)}
      >
        {tabs.map(({ id, label, Icon }) => {
          const isOn = value === id;
          return (
            <button
              key={id}
              type="button"
              ref={(el) => {
                btnRefs.current[id] = el;
                registerTabRef?.(id, el);
              }}
              onClick={() => onChange(id)}
              onMouseEnter={() => onTabHover?.(id)}
              onFocus={() => onTabHover?.(id)}
              className={`relative isolate overflow-hidden rounded-full ${pad} outline-none transition-[color,background,box-shadow,transform] duration-300 hover:scale-[1.02] active:scale-[0.98]`}
              style={
                light
                  ? {
                      background: isOn
                        ? "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(240,253,244,0.95) 100%)"
                        : "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(250,250,250,0.4) 100%)",
                      boxShadow: isOn
                        ? "inset 0 1px 0 rgba(255,255,255,0.95), 0 0 0 1px rgba(34,197,94,0.22), 0 8px 24px -10px rgba(34,197,94,0.35), 0 2px 8px -2px rgba(0,0,0,0.06)"
                        : "inset 0 1px 0 rgba(255,255,255,0.7), 0 0 0 1px rgba(0,0,0,0.06)",
                      color: isOn ? "#14532d" : "#52525b",
                    }
                  : {
                      /* Dark nav: every tab is the same pill family — active lifts to soft white */
                      background: isOn
                        ? "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(236,253,245,0.94) 100%)"
                        : "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.08) 100%)",
                      boxShadow: isOn
                        ? "inset 0 1px 0 rgba(255,255,255,1), 0 0 0 1px rgba(34,197,94,0.28), 0 6px 20px -8px rgba(34,197,94,0.45), 0 2px 6px -2px rgba(0,0,0,0.2)"
                        : "inset 0 1px 0 rgba(255,255,255,0.12), 0 0 0 1px rgba(255,255,255,0.06)",
                      color: isOn ? "#14532d" : "rgba(255,255,255,0.72)",
                    }
              }
            >
              {/* Green underglow on active — sits on the button edge */}
              {isOn && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-2 bottom-0 h-[2px] rounded-full"
                  style={{
                    background: light
                      ? "linear-gradient(90deg, transparent, rgba(34,197,94,0.9), transparent)"
                      : "linear-gradient(90deg, transparent 5%, #4ade80 30%, #22c55e 50%, #4ade80 70%, transparent 95%)",
                    boxShadow: light
                      ? "0 0 10px rgba(34,197,94,0.55), 0 0 18px rgba(34,197,94,0.25)"
                      : "0 0 8px rgba(34,197,94,0.95), 0 0 16px rgba(34,197,94,0.55), 0 4px 14px rgba(34,197,94,0.35)",
                  }}
                />
              )}
              <span
                className={`relative z-10 flex items-center gap-2 font-medium tracking-tight ${text}`}
              >
                {Icon && <Icon className={iconCls} strokeWidth={1.75} />}
                {label}
                {endAdornment?.(id, isOn)}
              </span>
            </button>
          );
        })}
      </div>

      {showTrack && (
        <div className="relative z-10 mt-2.5 h-[3px] w-full max-w-full">
          <div
            aria-hidden
            className={`absolute inset-x-0 top-1/2 h-px -translate-y-1/2 ${
              light ? "bg-black/10" : "bg-white/10"
            }`}
          />
          <motion.div
            aria-hidden
            className="absolute top-0 h-full rounded-full"
            animate={{
              left: indicator.left,
              width: Math.max(indicator.width, 8),
            }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 34,
              mass: 0.65,
            }}
            style={{
              background: light
                ? "linear-gradient(90deg, rgba(34,197,94,0.35), #22c55e 30%, #16a34a 70%, rgba(34,197,94,0.35))"
                : "linear-gradient(90deg, rgba(34,197,94,0.35), #4ade80 30%, #22c55e 70%, rgba(34,197,94,0.35))",
              boxShadow: light
                ? "0 0 8px rgba(34,197,94,0.85), 0 0 18px rgba(34,197,94,0.4), 0 0 28px rgba(34,197,94,0.2)"
                : "0 0 8px rgba(34,197,94,0.95), 0 0 18px rgba(34,197,94,0.55), 0 0 28px rgba(34,197,94,0.3)",
            }}
          />
        </div>
      )}
    </div>
  );
}

/** Lab demo defaults (Emails / Attachments) */
export function GlowTabsDemo({
  defaultTab = "attachments",
}: {
  defaultTab?: "emails" | "attachments";
}) {
  const [active, setActive] = useState(defaultTab);
  return (
    <GlowTabs
      variant="dark"
      value={active}
      onChange={(id) => setActive(id as typeof active)}
      tabs={[
        { id: "emails", label: "Emails", Icon: Mail },
        { id: "attachments", label: "Attachments", Icon: Paperclip },
      ]}
    />
  );
}

// Back-compat export name used by lab scene
export { GlowTabsDemo as default };
