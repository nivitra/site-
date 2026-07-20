"use client";

import { useState } from "react";
import type { Feature } from "./data";
import { FeatureRow, type FeatureAccent } from "./FeatureRow";

type Props = {
  features: Feature[];
  accent?: FeatureAccent;
  compact?: boolean;
  /** Two columns on large screens */
  columns?: 1 | 2;
  className?: string;
  /** Controlled active id (optional) */
  activeId?: string | null;
  onActiveChange?: (id: string | null) => void;
};

/**
 * Reusable iso feature stack — one hover focus, neat object list.
 */
export default function IsoFeatureList({
  features,
  accent = "emerald",
  compact = false,
  columns = 1,
  className = "",
  activeId: controlled,
  onActiveChange,
}: Props) {
  const [internal, setInternal] = useState<string | null>(null);
  const activeId = controlled !== undefined ? controlled : internal;

  const setActive = (id: string | null) => {
    if (controlled === undefined) setInternal(id);
    onActiveChange?.(id);
  };

  return (
    <ul
      className={`${
        columns === 2
          ? "grid gap-1 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-1"
          : "flex flex-col gap-0.5"
      } ${className}`}
    >
      {features.map((f) => (
        <li key={f.id} className="min-w-0">
          <FeatureRow
            feature={f}
            active={activeId === f.id}
            accent={accent}
            compact={compact}
            onEnter={() => setActive(f.id)}
            onLeave={() => setActive(activeId === f.id ? null : activeId)}
          />
        </li>
      ))}
    </ul>
  );
}
