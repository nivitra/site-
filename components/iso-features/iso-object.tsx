"use client";

import type { IconProps } from "./icons";

const DEFAULT_IDLE = "#9ca3af";
const DEFAULT_HOT = "#7c3aed";

function stroke(active: boolean, hot?: string, idle?: string) {
  return active ? hot || DEFAULT_HOT : idle || DEFAULT_IDLE;
}

export function seedHash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Unique isometric object — 24 bases × 16 accents × 2 flips = 768 unique.
 * Prefer `index` for guaranteed uniqueness across a page; `seed` is fallback.
 */
export function IsoObject({
  seed,
  index,
  active,
  className,
  hotColor,
  idleColor,
}: IconProps & { seed?: string; index?: number }) {
  let base: number;
  let accent: number;
  let flip: number;

  if (typeof index === "number" && index >= 0) {
    // Sequential assignment → every use case a different object
    base = index % 24;
    accent = Math.floor(index / 24) % 16;
    flip = Math.floor(index / 384) % 2;
  } else {
    const h = seedHash(seed || "default");
    base = h % 24;
    accent = (h >>> 5) % 16;
    flip = (h >>> 9) & 1;
  }

  const s = stroke(active, hotColor, idleColor);

  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <g transform={flip ? "translate(64,0) scale(-1,1)" : undefined}>
        {renderBase(base, s)}
        {renderAccent(accent, s, base)}
      </g>
    </svg>
  );
}

function renderBase(base: number, s: string) {
  switch (base) {
    case 0: // stacked slabs
      return (
        <>
          <path d="M12 40 L32 50 L52 40 L32 30 Z" stroke={s} strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M12 32 L32 42 L52 32 L32 22 Z" stroke={s} strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M12 24 L32 34 L52 24 L32 14 Z" stroke={s} strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M12 24 V40 M52 24 V40 M32 34 V50" stroke={s} strokeWidth="1.2" />
        </>
      );
    case 1: // plus cubes
      return (
        <>
          <path d="M24 30 L32 34 L40 30 L32 26 Z" stroke={s} strokeWidth="1.35" strokeLinejoin="round" />
          <path d="M24 30 V40 L32 44 V34 Z" stroke={s} strokeWidth="1.25" strokeLinejoin="round" />
          <path d="M40 30 V40 L32 44 V34 Z" stroke={s} strokeWidth="1.25" strokeLinejoin="round" />
          <path d="M24 18 L32 22 L40 18 L32 14 Z" stroke={s} strokeWidth="1.35" strokeLinejoin="round" />
          <path d="M24 18 V28 L32 32 V22 Z" stroke={s} strokeWidth="1.25" strokeLinejoin="round" />
          <path d="M40 18 V28 L32 32 V22 Z" stroke={s} strokeWidth="1.25" strokeLinejoin="round" />
          <path d="M10 30 L18 34 L26 30 L18 26 Z" stroke={s} strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M10 30 V40 L18 44 V34 Z" stroke={s} strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M26 30 V40 L18 44 V34 Z" stroke={s} strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M38 30 L46 34 L54 30 L46 26 Z" stroke={s} strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M38 30 V40 L46 44 V34 Z" stroke={s} strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M54 30 V40 L46 44 V34 Z" stroke={s} strokeWidth="1.2" strokeLinejoin="round" />
        </>
      );
    case 2: // gateway arch
      return (
        <>
          <path d="M14 48 V28 C14 16 22 10 32 10 C42 10 50 16 50 28 V48" stroke={s} strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M22 48 V30 C22 22 26 18 32 18 C38 18 42 22 42 30 V48" stroke={s} strokeWidth="1.3" />
          <path d="M10 48 H54" stroke={s} strokeWidth="1.4" strokeLinecap="round" />
          <path d="M28 14 L32 12 L36 14 L32 20 Z" stroke={s} strokeWidth="1.3" strokeLinejoin="round" />
        </>
      );
    case 3: // vault / safe
      return (
        <>
          <path d="M16 24 L32 16 L48 24 L32 32 Z" stroke={s} strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M16 24 V42 L32 50 V32 Z" stroke={s} strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M48 24 V42 L32 50 V32 Z" stroke={s} strokeWidth="1.3" strokeLinejoin="round" />
          <circle cx="32" cy="36" r="6" stroke={s} strokeWidth="1.3" />
          <circle cx="32" cy="36" r="2" stroke={s} strokeWidth="1.2" />
        </>
      );
    case 4: // network mesh
      return (
        <>
          {[[32, 14], [18, 24], [46, 24], [18, 40], [46, 40], [32, 50]].map(
            ([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="3" stroke={s} strokeWidth="1.3" />
            )
          )}
          <path
            d="M32 17 L18 24 M32 17 L46 24 M18 24 L18 40 M46 24 L46 40 M18 40 L32 50 M46 40 L32 50 M18 24 L46 40 M46 24 L18 40"
            stroke={s}
            strokeWidth="1.15"
          />
        </>
      );
    case 5: // cylinder runtime
      return (
        <>
          <ellipse cx="32" cy="18" rx="16" ry="6" stroke={s} strokeWidth="1.4" />
          <path d="M16 18 V42 C16 46 23 50 32 50 C41 50 48 46 48 42 V18" stroke={s} strokeWidth="1.4" />
          <ellipse cx="32" cy="30" rx="16" ry="6" stroke={s} strokeWidth="1.2" />
          <ellipse cx="32" cy="42" rx="16" ry="6" stroke={s} strokeWidth="1.2" />
        </>
      );
    case 6: // globe atlas
      return (
        <>
          <circle cx="32" cy="32" r="18" stroke={s} strokeWidth="1.4" />
          <ellipse cx="32" cy="32" rx="8" ry="18" stroke={s} strokeWidth="1.2" />
          <path d="M14 32 H50 M18 22 H46 M18 42 H46" stroke={s} strokeWidth="1.15" />
        </>
      );
    case 7: // pipeline stages
      return (
        <>
          <rect x="8" y="26" width="14" height="12" rx="2" stroke={s} strokeWidth="1.4" />
          <rect x="28" y="26" width="14" height="12" rx="2" stroke={s} strokeWidth="1.4" />
          <rect x="48" y="26" width="8" height="12" rx="2" stroke={s} strokeWidth="1.4" />
          <path d="M22 32 H28 M42 32 H48" stroke={s} strokeWidth="1.4" />
          <circle cx="15" cy="32" r="2" stroke={s} strokeWidth="1.1" />
          <circle cx="35" cy="32" r="2" stroke={s} strokeWidth="1.1" />
        </>
      );
    case 8: // phone handset iso
      return (
        <>
          <path d="M20 18 L28 14 L36 18 L28 22 Z" stroke={s} strokeWidth="1.35" strokeLinejoin="round" />
          <path d="M20 18 V28 L28 32 V22 Z" stroke={s} strokeWidth="1.25" strokeLinejoin="round" />
          <path d="M36 18 V28 L28 32 V22 Z" stroke={s} strokeWidth="1.25" strokeLinejoin="round" />
          <path d="M18 34 C14 38 14 46 22 50 L28 46 C24 44 24 40 26 38 Z" stroke={s} strokeWidth="1.35" strokeLinejoin="round" />
          <path d="M38 34 C42 38 42 46 34 50 L28 46 C32 44 32 40 30 38 Z" stroke={s} strokeWidth="1.35" strokeLinejoin="round" />
          <path d="M26 38 L30 38" stroke={s} strokeWidth="1.2" />
        </>
      );
    case 9: // calendar block
      return (
        <>
          <path d="M14 22 L32 14 L50 22 L32 30 Z" stroke={s} strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M14 22 V44 L32 52 V30 Z" stroke={s} strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M50 22 V44 L32 52 V30 Z" stroke={s} strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M20 18 V24 M44 18 V24" stroke={s} strokeWidth="1.4" strokeLinecap="round" />
          <path d="M20 36 H28 M20 42 H28 M36 36 H44 M36 42 H40" stroke={s} strokeWidth="1.2" />
        </>
      );
    case 10: // document stack
      return (
        <>
          <path d="M18 20 L36 12 L48 18 L30 26 Z" stroke={s} strokeWidth="1.35" strokeLinejoin="round" />
          <path d="M18 20 V42 L30 50 V26 Z" stroke={s} strokeWidth="1.25" strokeLinejoin="round" />
          <path d="M48 18 V40 L30 48 V26 Z" stroke={s} strokeWidth="1.25" strokeLinejoin="round" />
          <path d="M22 30 H32 M22 36 H30" stroke={s} strokeWidth="1.15" />
          <path d="M14 26 L32 18 L44 24" stroke={s} strokeWidth="1.15" opacity="0.7" />
        </>
      );
    case 11: // cart / package
      return (
        <>
          <path d="M18 28 L32 20 L46 28 L32 36 Z" stroke={s} strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M18 28 V44 L32 52 V36 Z" stroke={s} strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M46 28 V44 L32 52 V36 Z" stroke={s} strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M32 20 V36" stroke={s} strokeWidth="1.2" />
          <path d="M18 28 L32 36 L46 28" stroke={s} strokeWidth="1.15" />
          <circle cx="24" cy="50" r="2.5" stroke={s} strokeWidth="1.2" />
          <circle cx="40" cy="50" r="2.5" stroke={s} strokeWidth="1.2" />
        </>
      );
    case 12: // truck / delivery
      return (
        <>
          <path d="M10 30 L28 22 L40 28 L22 36 Z" stroke={s} strokeWidth="1.35" strokeLinejoin="round" />
          <path d="M10 30 V42 L22 48 V36 Z" stroke={s} strokeWidth="1.25" strokeLinejoin="round" />
          <path d="M40 28 V40 L22 46 V36 Z" stroke={s} strokeWidth="1.25" strokeLinejoin="round" />
          <path d="M40 28 L52 34 L52 44 L40 40" stroke={s} strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M40 34 L52 40" stroke={s} strokeWidth="1.15" />
          <circle cx="18" cy="48" r="3" stroke={s} strokeWidth="1.25" />
          <circle cx="36" cy="50" r="3" stroke={s} strokeWidth="1.25" />
        </>
      );
    case 13: // heart pulse / sentiment
      return (
        <>
          <path
            d="M32 48 L16 32 C12 28 12 20 18 16 C24 12 30 16 32 20 C34 16 40 12 46 16 C52 20 52 28 48 32 Z"
            stroke={s}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M18 30 H26 L30 22 L36 38 L40 28 H46" stroke={s} strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );
    case 14: // shield security
      return (
        <>
          <path d="M32 10 L50 18 V34 C50 44 42 52 32 56 C22 52 14 44 14 34 V18 Z" stroke={s} strokeWidth="1.45" strokeLinejoin="round" />
          <path d="M32 18 L42 22 V34 C42 40 38 46 32 48 C26 46 22 40 22 34 V22 Z" stroke={s} strokeWidth="1.25" strokeLinejoin="round" />
          <path d="M26 32 L30 36 L40 24" stroke={s} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );
    case 15: // chart bars iso
      return (
        <>
          <path d="M12 48 H52" stroke={s} strokeWidth="1.4" strokeLinecap="round" />
          <path d="M16 48 V32 L22 28 V48" stroke={s} strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M28 48 V22 L34 18 V48" stroke={s} strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M40 48 V28 L46 24 V48" stroke={s} strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M16 32 L22 28 M28 22 L34 18 M40 28 L46 24" stroke={s} strokeWidth="1.1" />
        </>
      );
    case 16: // stethoscope / health
      return (
        <>
          <circle cx="22" cy="20" r="6" stroke={s} strokeWidth="1.35" />
          <circle cx="42" cy="20" r="6" stroke={s} strokeWidth="1.35" />
          <path d="M22 26 V34 C22 42 28 48 32 52 C36 48 42 42 42 34 V26" stroke={s} strokeWidth="1.4" />
          <circle cx="32" cy="54" r="4" stroke={s} strokeWidth="1.35" />
          <path d="M16 20 H12 M48 20 H52" stroke={s} strokeWidth="1.3" strokeLinecap="round" />
        </>
      );
    case 17: // house / property
      return (
        <>
          <path d="M12 32 L32 18 L52 32" stroke={s} strokeWidth="1.45" strokeLinejoin="round" />
          <path d="M18 30 V48 H46 V30" stroke={s} strokeWidth="1.35" strokeLinejoin="round" />
          <path d="M28 48 V36 H36 V48" stroke={s} strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M22 28 L32 20 L42 28" stroke={s} strokeWidth="1.2" />
          <rect x="38" y="34" width="6" height="6" stroke={s} strokeWidth="1.15" />
        </>
      );
    case 18: // graduation / education
      return (
        <>
          <path d="M10 28 L32 16 L54 28 L32 40 Z" stroke={s} strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M18 32 V42 C24 48 40 48 46 42 V32" stroke={s} strokeWidth="1.3" />
          <path d="M54 28 V40" stroke={s} strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="54" cy="42" r="3" stroke={s} strokeWidth="1.25" />
          <path d="M32 40 V48" stroke={s} strokeWidth="1.2" />
        </>
      );
    case 19: // plane / travel
      return (
        <>
          <path d="M12 36 L28 30 L52 18 L48 28 L56 32 L48 34 L42 42 L36 34 L20 40 Z" stroke={s} strokeWidth="1.35" strokeLinejoin="round" />
          <path d="M28 30 L36 34" stroke={s} strokeWidth="1.15" />
          <path d="M14 44 H50" stroke={s} strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
        </>
      );
    case 20: // signal / telecom tower
      return (
        <>
          <path d="M32 12 V48" stroke={s} strokeWidth="1.45" strokeLinecap="round" />
          <path d="M32 20 L20 48 M32 20 L44 48" stroke={s} strokeWidth="1.3" />
          <path d="M24 36 H40" stroke={s} strokeWidth="1.2" />
          <path d="M18 20 C12 26 12 34 18 40 M46 20 C52 26 52 34 46 40" stroke={s} strokeWidth="1.25" />
          <path d="M22 24 C18 28 18 34 22 38 M42 24 C46 28 46 34 42 38" stroke={s} strokeWidth="1.15" />
          <circle cx="32" cy="12" r="3" stroke={s} strokeWidth="1.3" />
        </>
      );
    case 21: // key / access
      return (
        <>
          <circle cx="24" cy="28" r="10" stroke={s} strokeWidth="1.4" />
          <circle cx="24" cy="28" r="4" stroke={s} strokeWidth="1.25" />
          <path d="M32 32 L52 44 V50 H46 V46 H42 V50 H36 L32 46" stroke={s} strokeWidth="1.35" strokeLinejoin="round" />
        </>
      );
    case 22: // pin / location
      return (
        <>
          <path d="M32 10 C42 10 48 18 48 26 C48 38 32 54 32 54 C32 54 16 38 16 26 C16 18 22 10 32 10 Z" stroke={s} strokeWidth="1.4" strokeLinejoin="round" />
          <circle cx="32" cy="26" r="6" stroke={s} strokeWidth="1.3" />
        </>
      );
    default: // star / spark burst
      return (
        <>
          <path d="M32 12 L36 26 L50 26 L38 34 L42 48 L32 40 L22 48 L26 34 L14 26 L28 26 Z" stroke={s} strokeWidth="1.35" strokeLinejoin="round" />
          <circle cx="32" cy="32" r="4" stroke={s} strokeWidth="1.2" />
        </>
      );
  }
}

function renderAccent(accent: number, s: string, base: number) {
  // Avoid cluttering dense bases
  if (base === 1 || base === 4) {
    if (accent % 3 === 0) return <circle cx="52" cy="12" r="2" stroke={s} strokeWidth="1.1" />;
    return null;
  }

  switch (accent % 16) {
    case 0:
      return <path d="M50 12 L54 16 M54 12 L50 16" stroke={s} strokeWidth="1.2" strokeLinecap="round" />;
    case 1:
      return <circle cx="50" cy="14" r="3.5" stroke={s} strokeWidth="1.2" />;
    case 2:
      return <path d="M48 10 V20 M43 15 H53" stroke={s} strokeWidth="1.25" strokeLinecap="round" />;
    case 3:
      return <path d="M46 12 L52 12 L52 18" stroke={s} strokeWidth="1.2" strokeLinejoin="round" />;
    case 4:
      return (
        <>
          <circle cx="50" cy="14" r="2" stroke={s} strokeWidth="1.1" />
          <circle cx="56" cy="20" r="2" stroke={s} strokeWidth="1.1" />
        </>
      );
    case 5:
      return <path d="M46 14 C50 10 56 14 52 18" stroke={s} strokeWidth="1.2" />;
    case 6:
      return <rect x="46" y="10" width="8" height="8" rx="1" stroke={s} strokeWidth="1.15" />;
    case 7:
      return <path d="M48 10 L54 14 L48 18 Z" stroke={s} strokeWidth="1.2" strokeLinejoin="round" />;
    case 8:
      return <path d="M46 16 H56 M51 11 V21" stroke={s} strokeWidth="1.15" strokeLinecap="round" />;
    case 9:
      return (
        <path d="M46 12 L50 16 L54 12" stroke={s} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      );
    case 10:
      return <ellipse cx="51" cy="15" rx="5" ry="3" stroke={s} strokeWidth="1.15" />;
    case 11:
      return <path d="M46 18 C48 12 54 12 56 18" stroke={s} strokeWidth="1.2" />;
    case 12:
      return (
        <>
          <path d="M48 10 V18" stroke={s} strokeWidth="1.2" />
          <circle cx="48" cy="20" r="2" stroke={s} strokeWidth="1.1" />
        </>
      );
    case 13:
      return <path d="M46 14 H56 L52 20 H50 Z" stroke={s} strokeWidth="1.15" strokeLinejoin="round" />;
    case 14:
      return (
        <path d="M47 11 L51 15 L55 11 M47 19 L51 15 L55 19" stroke={s} strokeWidth="1.1" strokeLinecap="round" />
      );
    default:
      return <path d="M46 12 L56 12 L51 20 Z" stroke={s} strokeWidth="1.2" strokeLinejoin="round" />;
  }
}
