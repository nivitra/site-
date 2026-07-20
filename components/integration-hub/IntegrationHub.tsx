"use client";

import Image from "next/image";
import Link from "next/link";

type Partner = {
  id: string;
  name: string;
  side: "left" | "right";
  /** Vertical band: 0 top … 3 bottom */
  row: 0 | 1 | 2 | 3;
  /** 0 = inner (closer to hub), 1 = outer */
  ring: 0 | 1;
  mark: React.ReactNode;
};

/**
 * Partner marks — simplified brand-faithful text/icons (no scraped assets).
 */
function DarwinboxMark() {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="flex h-6 w-6 items-center justify-center rounded-md border-2 border-[#2b6bff] text-[11px] font-bold text-[#2b6bff]">
        d
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-neutral-800">
        darwin<span className="font-bold">box</span>
      </span>
    </span>
  );
}

function ZohoMark() {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="relative flex h-7 w-7 items-center justify-center">
        <span className="absolute inset-0 rounded-full border-[2.5px] border-[#e42527]" />
        <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e42527]" />
      </span>
      <span className="leading-tight">
        <span className="block text-[15px] font-bold text-neutral-900">Zoho</span>
        <span className="block text-[13px] font-semibold text-neutral-800">
          Recruit
        </span>
      </span>
    </span>
  );
}

function GreytMark() {
  return (
    <span className="text-[17px] font-bold tracking-tight">
      <span className="text-[#a855f7]">greyt</span>
      <span className="align-super text-[10px] font-semibold text-[#a855f7]">
        HR
      </span>
    </span>
  );
}

function KekaMark() {
  return (
    <span className="inline-flex items-center gap-1 text-[17px] font-bold tracking-tight text-neutral-800">
      keka
      <span className="inline-flex gap-0.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#fbbf24]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#f472b6]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#60a5fa]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#a3e635]" />
      </span>
    </span>
  );
}

function WorkIndiaMark() {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="text-[18px] font-extrabold tracking-tight text-[#1e3a8a]">
        W<span className="text-[#2563eb]">i</span>
      </span>
      <span className="h-4 w-px bg-neutral-300" />
      <span className="text-[15px] font-semibold text-[#1e3a8a]">WorkIndia</span>
    </span>
  );
}

function ApnaMark() {
  return (
    <span className="flex flex-col items-start gap-1">
      <span className="text-[17px] font-bold tracking-tight text-neutral-800">
        apna
      </span>
      <span className="h-1.5 w-14 rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-amber-300" />
    </span>
  );
}

function QuikrMark() {
  return (
    <span className="text-[16px] font-bold tracking-tight">
      <span className="text-[#16a34a]">Quikr</span>
      <span className="text-[#22c55e]">Jobs</span>
    </span>
  );
}

function CustomMark() {
  return (
    <span className="text-[15px] font-semibold text-neutral-700">Custom</span>
  );
}

const PARTNERS: Partner[] = [
  { id: "darwinbox", name: "darwinbox", side: "left", row: 0, ring: 1, mark: <DarwinboxMark /> },
  { id: "zoho", name: "Zoho Recruit", side: "left", row: 1, ring: 0, mark: <ZohoMark /> },
  { id: "greyt", name: "greytHR", side: "left", row: 2, ring: 0, mark: <GreytMark /> },
  { id: "keka", name: "keka", side: "left", row: 3, ring: 1, mark: <KekaMark /> },
  { id: "workindia", name: "WorkIndia", side: "right", row: 0, ring: 1, mark: <WorkIndiaMark /> },
  { id: "apna", name: "apna", side: "right", row: 1, ring: 0, mark: <ApnaMark /> },
  { id: "quikr", name: "QuikrJobs", side: "right", row: 2, ring: 0, mark: <QuikrMark /> },
  { id: "custom", name: "Custom", side: "right", row: 3, ring: 1, mark: <CustomMark /> },
];

/** Card anchor in % of the diagram box (center of each partner pill) */
function cardPos(p: Partner) {
  const yMap = [14, 38, 62, 86]; // row → %
  const y = yMap[p.row];
  if (p.side === "left") {
    return { x: p.ring === 1 ? 12 : 28, y };
  }
  return { x: p.ring === 1 ? 88 : 72, y };
}

/**
 * Exact hub diagram from the screenshot:
 * title + partner pills + curved connectors into a glowing center with Speaksy logo.
 */
export default function IntegrationHub() {
  const hub = { x: 50, y: 50 };

  return (
    <section className="relative w-full bg-white px-4 py-16 sm:px-8 sm:py-20">
      <h2 className="mx-auto mb-12 max-w-3xl text-center text-[1.65rem] font-semibold tracking-tight text-[#1e1b4b] sm:mb-16 sm:text-3xl md:text-[2rem]">
        Integrates With Everything You Already Use
      </h2>

      <div className="relative mx-auto aspect-[16/9] w-full max-w-5xl sm:aspect-[2/1]">
        {/* Connector lines (SVG) */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          {PARTNERS.map((p) => {
            const c = cardPos(p);
            const isLeft = p.side === "left";
            // Exit from hub toward side, then horizontal into card
            const hx = isLeft ? hub.x - 7 : hub.x + 7;
            const midX = isLeft ? c.x + 8 : c.x - 8;
            // Rounded elbow: hub → vertical-ish → horizontal to card
            const path = isLeft
              ? `M ${hx} ${hub.y}
                 C ${hx - 6} ${hub.y}, ${midX + 4} ${c.y}, ${midX} ${c.y}
                 L ${c.x + 6} ${c.y}`
              : `M ${hx} ${hub.y}
                 C ${hx + 6} ${hub.y}, ${midX - 4} ${c.y}, ${midX} ${c.y}
                 L ${c.x - 6} ${c.y}`;
            return (
              <path
                key={p.id}
                d={path}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="0.45"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>

        {/* Partner cards */}
        {PARTNERS.map((p) => {
          const c = cardPos(p);
          return (
            <div
              key={p.id}
              className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-neutral-200/90 bg-white px-4 py-3 shadow-[0_1px_3px_rgba(15,23,42,0.04)] sm:px-5 sm:py-3.5"
              style={{ left: `${c.x}%`, top: `${c.y}%`, minWidth: "7.5rem" }}
            >
              {p.mark}
            </div>
          );
        })}

        {/* Center hub — Speaksy logo */}
        <div
          className="absolute z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
        >
          <div
            className="relative flex h-[88px] w-[88px] items-center justify-center rounded-[1.35rem] sm:h-[104px] sm:w-[104px]"
            style={{
              background:
                "linear-gradient(145deg, #f5f3ff 0%, #faf5ff 40%, #fff7ed 100%)",
              boxShadow:
                "0 0 0 1px rgba(167,139,250,0.15), 0 12px 40px -12px rgba(139,92,246,0.35), 0 0 60px -10px rgba(251,191,36,0.25)",
            }}
          >
            <Image
              src="/brand/logo-icon-256.png"
              alt="Speaksy"
              width={56}
              height={56}
              className="h-12 w-12 rounded-xl sm:h-14 sm:w-14"
              priority
            />
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/lab"
          className="text-sm text-neutral-400 transition-colors hover:text-neutral-600"
        >
          ← Lab
        </Link>
      </div>
    </section>
  );
}
