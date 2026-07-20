"use client";

export type IconProps = {
  active: boolean;
  className?: string;
  /** Active stroke (default lab purple) */
  hotColor?: string;
  idleColor?: string;
};

const DEFAULT_IDLE = "#9ca3af";
const DEFAULT_HOT = "#7c3aed";

function stroke(active: boolean, hot?: string, idle?: string) {
  return active ? hot || DEFAULT_HOT : idle || DEFAULT_IDLE;
}

/**
 * Isometric line icons — stroke reacts to hover via FeatureRow accent.
 */

export function IconRelay({ active, className, hotColor, idleColor }: IconProps) {
  const s = stroke(active, hotColor, idleColor);
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <path d="M12 40 L32 50 L52 40 L32 30 Z" stroke={s} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M12 32 L32 42 L52 32 L32 22 Z" stroke={s} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M12 24 L32 34 L52 24 L32 14 Z" stroke={s} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M12 24 V40" stroke={s} strokeWidth="1.2" />
      <path d="M52 24 V40" stroke={s} strokeWidth="1.2" />
      <path d="M32 34 V50" stroke={s} strokeWidth="1.2" />
    </svg>
  );
}

export function IconEnclaves({ active, className, hotColor, idleColor }: IconProps) {
  const s = stroke(active, hotColor, idleColor);
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <path d="M24 30 L32 34 L40 30 L32 26 Z" stroke={s} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M24 30 V40 L32 44 V34 Z" stroke={s} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M40 30 V40 L32 44 V34 Z" stroke={s} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M24 18 L32 22 L40 18 L32 14 Z" stroke={s} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M24 18 V28 L32 32 V22 Z" stroke={s} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M40 18 V28 L32 32 V22 Z" stroke={s} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M10 30 L18 34 L26 30 L18 26 Z" stroke={s} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M10 30 V40 L18 44 V34 Z" stroke={s} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M26 30 V40 L18 44 V34 Z" stroke={s} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M38 30 L46 34 L54 30 L46 26 Z" stroke={s} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M38 30 V40 L46 44 V34 Z" stroke={s} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M54 30 V40 L46 44 V34 Z" stroke={s} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M24 42 L32 46 L40 42 L32 38 Z" stroke={s} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M24 42 V52 L32 56 V46 Z" stroke={s} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M40 42 V52 L32 56 V46 Z" stroke={s} strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

export function IconGateway({ active, className, hotColor, idleColor }: IconProps) {
  const s = stroke(active, hotColor, idleColor);
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <path
        d="M14 48 V28 C14 16 22 10 32 10 C42 10 50 16 50 28 V48"
        stroke={s}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M22 48 V30 C22 22 26 18 32 18 C38 18 42 22 42 30 V48" stroke={s} strokeWidth="1.3" />
      <path d="M10 48 H54" stroke={s} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M18 48 L18 52 M46 48 L46 52" stroke={s} strokeWidth="1.2" />
      <path d="M28 14 L32 12 L36 14 L32 20 Z" stroke={s} strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

export function IconVault({ active, className, hotColor, idleColor }: IconProps) {
  const s = stroke(active, hotColor, idleColor);
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <path d="M16 24 L32 16 L48 24 L32 32 Z" stroke={s} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M16 24 V42 L32 50 V32 Z" stroke={s} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M48 24 V42 L32 50 V32 Z" stroke={s} strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="32" cy="36" r="6" stroke={s} strokeWidth="1.3" />
      <circle cx="32" cy="36" r="2" stroke={s} strokeWidth="1.2" />
      <path d="M32 30 V32 M32 40 V42 M26 36 H28 M36 36 H38" stroke={s} strokeWidth="1.1" />
    </svg>
  );
}

export function IconMesh({ active, className, hotColor, idleColor }: IconProps) {
  const s = stroke(active, hotColor, idleColor);
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      {[
        [32, 14],
        [18, 24],
        [46, 24],
        [18, 40],
        [46, 40],
        [32, 50],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.2" stroke={s} strokeWidth="1.3" />
      ))}
      <path
        d="M32 17 L18 24 M32 17 L46 24 M18 24 L18 40 M46 24 L46 40 M18 40 L32 50 M46 40 L32 50 M18 24 L46 40 M46 24 L18 40"
        stroke={s}
        strokeWidth="1.15"
      />
    </svg>
  );
}

export function IconRuntime({ active, className, hotColor, idleColor }: IconProps) {
  const s = stroke(active, hotColor, idleColor);
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <ellipse cx="32" cy="18" rx="16" ry="6" stroke={s} strokeWidth="1.4" />
      <path d="M16 18 V42 C16 46 23 50 32 50 C41 50 48 46 48 42 V18" stroke={s} strokeWidth="1.4" />
      <ellipse cx="32" cy="30" rx="16" ry="6" stroke={s} strokeWidth="1.2" />
      <ellipse cx="32" cy="42" rx="16" ry="6" stroke={s} strokeWidth="1.2" />
      <path d="M28 26 L38 30 L28 34 Z" stroke={s} strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

export function IconAtlas({ active, className, hotColor, idleColor }: IconProps) {
  const s = stroke(active, hotColor, idleColor);
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <circle cx="32" cy="32" r="18" stroke={s} strokeWidth="1.4" />
      <ellipse cx="32" cy="32" rx="8" ry="18" stroke={s} strokeWidth="1.2" />
      <path d="M14 32 H50 M18 22 H46 M18 42 H46" stroke={s} strokeWidth="1.15" />
      <path d="M32 14 C40 20 40 44 32 50 C24 44 24 20 32 14" stroke={s} strokeWidth="1.15" />
    </svg>
  );
}

export function IconPipeline({ active, className, hotColor, idleColor }: IconProps) {
  const s = stroke(active, hotColor, idleColor);
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <rect x="8" y="26" width="14" height="12" rx="2" stroke={s} strokeWidth="1.4" />
      <rect x="28" y="26" width="14" height="12" rx="2" stroke={s} strokeWidth="1.4" />
      <rect x="48" y="26" width="8" height="12" rx="2" stroke={s} strokeWidth="1.4" />
      <path d="M22 32 H28 M42 32 H48" stroke={s} strokeWidth="1.4" />
      <path d="M11 26 V22 H19 V26 M31 26 V20 H39 V26" stroke={s} strokeWidth="1.2" />
      <circle cx="15" cy="32" r="2" stroke={s} strokeWidth="1.1" />
      <circle cx="35" cy="32" r="2" stroke={s} strokeWidth="1.1" />
    </svg>
  );
}

export const ISO_ICON_MAP = {
  relay: IconRelay,
  enclaves: IconEnclaves,
  gateway: IconGateway,
  vault: IconVault,
  mesh: IconMesh,
  runtime: IconRuntime,
  atlas: IconAtlas,
  pipeline: IconPipeline,
} as const;

export type IsoIconKey = keyof typeof ISO_ICON_MAP;
