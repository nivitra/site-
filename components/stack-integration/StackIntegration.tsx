"use client";

import Image from "next/image";
import Link from "next/link";

type LogoItem = { name: string; color: string; abbr?: string };

type Group = {
  id: string;
  title: string;
  /** Position in the diagram grid */
  area:
    | "crm"
    | "cdp"
    | "dialers"
    | "data"
    | "custom"
    | "apis";
  logos?: LogoItem[];
  bullets?: string[];
  subtitle?: string;
};

const GROUPS: Group[] = [
  {
    id: "crm",
    title: "CRMs",
    area: "crm",
    logos: [
      { name: "Salesforce", color: "#00A1E0", abbr: "SF" },
      { name: "Zoho", color: "#E42527", abbr: "Z" },
      { name: "HubSpot", color: "#FF7A59", abbr: "H" },
      { name: "Meritto", color: "#6366F1", abbr: "M" },
    ],
  },
  {
    id: "cdp",
    title: "Customer Data Platform",
    area: "cdp",
    logos: [
      { name: "WebEngage", color: "#111827", abbr: "W" },
      { name: "MoEngage", color: "#1D4ED8", abbr: "Mo" },
      { name: "CleverTap", color: "#EF4444", abbr: "C" },
      { name: "Netcore", color: "#F97316", abbr: "N" },
    ],
  },
  {
    id: "dialers",
    title: "Dialers & Communication",
    area: "dialers",
    logos: [
      { name: "Exotel", color: "#22C55E", abbr: "X" },
      { name: "Knowlarity", color: "#8B5CF6", abbr: "K" },
      { name: "Ozonetel", color: "#10B981", abbr: "O" },
      { name: "Gupshup", color: "#3B82F6", abbr: "G" },
    ],
  },
  {
    id: "data",
    title: "Data & Reporting",
    area: "data",
    logos: [
      { name: "BigQuery", color: "#4285F4", abbr: "BQ" },
      { name: "Redshift", color: "#8C4FFF", abbr: "R" },
      { name: "AWS S3", color: "#FF9900", abbr: "S3" },
    ],
  },
  {
    id: "custom",
    title: "Custom",
    area: "custom",
    subtitle: "Add Your Own",
  },
  {
    id: "apis",
    title: "Lead & Workflow APIs",
    area: "apis",
    bullets: [
      "Webhooks",
      "JSON APIs",
      "3rd-Party Connectors",
      "In-House CRM",
    ],
  },
];

function LogoChip({ item }: { item: LogoItem }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white shadow-sm"
        style={{ backgroundColor: item.color }}
        aria-hidden
      >
        {item.abbr ?? item.name.slice(0, 1)}
      </span>
      <span className="text-[12px] font-medium text-foreground sm:text-[13px]">
        {item.name}
      </span>
    </div>
  );
}

function GroupCard({ group }: { group: Group }) {
  return (
    <div className="relative flex h-full flex-col rounded-2xl border border-line bg-white p-3 shadow-sm sm:p-4">
      {/* Title pill */}
      <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-3 py-1 text-[11px] font-semibold text-white shadow-[0_4px_16px_-4px_rgba(34,197,94,0.45)] sm:px-3.5 sm:text-xs">
        {group.title}
      </div>

      <div className="mt-3 flex flex-1 flex-col justify-center gap-2.5 pt-1">
        {group.logos && (
          <div
            className={`grid gap-x-3 gap-y-2.5 ${
              group.logos.length >= 4 ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2"
            }`}
          >
            {group.logos.map((l) => (
              <LogoChip key={l.name} item={l} />
            ))}
          </div>
        )}
        {group.bullets && (
          <ul className="space-y-1.5 pl-1">
            {group.bullets.map((b) => (
              <li
                key={b}
                className="flex items-center gap-2 text-[12px] text-muted sm:text-[13px]"
              >
                <span className="h-1 w-1 shrink-0 rounded-full bg-brand-500" />
                {b}
              </li>
            ))}
          </ul>
        )}
        {group.subtitle && (
          <p className="text-center text-[13px] font-medium text-brand-600">
            {group.subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Stack diagram — Speaksy green theme + logo hub on a premium light surface.
 */
export default function StackIntegration() {
  return (
    <section className="w-full bg-white px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-12">
        {/* Left copy */}
        <div className="lg:pr-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-2">
            Integrations
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Seamless Integration
            <br />
            with Your Existing
            <br />
            Stack
          </h2>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">
            CRMs, CDPs, dialers, WhatsApp BSPs, and data lakes — Speaksy plugs
            into what you already run.
          </p>
          <Link
            href="/contact"
            className="brand-pill mt-8 inline-flex rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_24px_-6px_rgba(34,197,94,0.55)] transition-transform hover:scale-[1.03]"
          >
            Talk integrations
          </Link>
        </div>

        {/* Diagram panel — soft green-tinted light gradient */}
        <div
          className="relative overflow-hidden rounded-3xl border border-line p-4 sm:p-6 md:p-8"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 45%, rgba(34,197,94,0.12) 0%, rgba(240,253,244,0.65) 42%, #fafafa 78%)",
          }}
        >
          {/* Soft green ambient */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(34,197,94,0.08), transparent 55%)",
            }}
          />

          <div className="relative grid grid-cols-3 gap-3 sm:gap-4">
            {/* Row 1 */}
            <div className="pt-2">
              <GroupCard group={GROUPS[0]} />
            </div>
            <div className="pt-2">
              <GroupCard group={GROUPS[1]} />
            </div>
            <div className="pt-2">
              <GroupCard group={GROUPS[2]} />
            </div>

            {/* Row 2 — connectors + hub */}
            <div className="relative flex items-center justify-center py-2">
              {/* connector stub */}
              <div className="absolute right-0 top-1/2 hidden h-px w-1/2 bg-brand-500/35 sm:block" />
              <div className="absolute bottom-0 left-1/2 hidden h-1/2 w-px bg-brand-500/35 sm:block" />
            </div>

            <div className="relative z-10 flex items-center justify-center py-3">
              {/* Speaksy hub */}
              <div className="relative">
                {/* Glow */}
                <div
                  aria-hidden
                  className="absolute -inset-4 rounded-3xl bg-brand-500/15 blur-2xl"
                />
                <div
                  className="relative flex h-[88px] w-[88px] items-center justify-center rounded-2xl border border-brand-500/25 bg-white sm:h-[104px] sm:w-[104px]"
                  style={{
                    boxShadow:
                      "0 0 0 1px rgba(34,197,94,0.12), 0 0 40px -8px rgba(34,197,94,0.35), 0 8px 24px -8px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
                  }}
                >
                  <Image
                    src="/brand/logo-icon-256.png"
                    alt="Speaksy"
                    width={64}
                    height={64}
                    className="h-12 w-12 rounded-xl sm:h-14 sm:w-14"
                    priority
                  />
                </div>
                {/* Dots on connector ends */}
                <span className="absolute -top-3 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-brand-500 shadow-[0_0_10px_rgba(34,197,94,0.55)]" />
                <span className="absolute -bottom-3 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-brand-500 shadow-[0_0_10px_rgba(34,197,94,0.55)]" />
                <span className="absolute top-1/2 -left-3 h-2 w-2 -translate-y-1/2 rounded-full bg-brand-500 shadow-[0_0_10px_rgba(34,197,94,0.55)]" />
                <span className="absolute top-1/2 -right-3 h-2 w-2 -translate-y-1/2 rounded-full bg-brand-500 shadow-[0_0_10px_rgba(34,197,94,0.55)]" />
              </div>
            </div>

            <div className="relative flex items-center justify-center py-2">
              <div className="absolute left-0 top-1/2 hidden h-px w-1/2 bg-brand-500/35 sm:block" />
              <div className="absolute bottom-0 left-1/2 hidden h-1/2 w-px bg-brand-500/35 sm:block" />
            </div>

            {/* Row 3 */}
            <div>
              <GroupCard group={GROUPS[3]} />
            </div>
            <div>
              <GroupCard group={GROUPS[4]} />
            </div>
            <div>
              <GroupCard group={GROUPS[5]} />
            </div>
          </div>

          {/* SVG connector overlay for cleaner elbows */}
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            {/* Top-center down to hub */}
            <path
              d="M 50 28 L 50 38"
              fill="none"
              stroke="rgba(34,197,94,0.4)"
              strokeWidth="0.35"
            />
            {/* Hub left / right / bottom */}
            <path
              d="M 42 50 L 34 50"
              fill="none"
              stroke="rgba(34,197,94,0.4)"
              strokeWidth="0.35"
            />
            <path
              d="M 58 50 L 66 50"
              fill="none"
              stroke="rgba(34,197,94,0.4)"
              strokeWidth="0.35"
            />
            <path
              d="M 50 62 L 50 70"
              fill="none"
              stroke="rgba(34,197,94,0.4)"
              strokeWidth="0.35"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
