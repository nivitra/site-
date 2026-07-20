"use client";

import "./brand-fan.css";
import { BRAND_ICONS, IconHub } from "./BrandIcons";

/**
 * Exact hub → brands fan with blue light traveling along curves.
 * Pure SVG + CSS for crisp, neat animation.
 */

const W = 640;
const H = 360;
const HUB = { x: W / 2, y: 280 };
const LOGO_Y = 110;
const LOGO_XS = [140, 230, 320, 410, 500, 560];

function curvePath(i: number) {
  const x2 = LOGO_XS[i];
  const y2 = LOGO_Y + 18;
  const c1x = HUB.x + (x2 - HUB.x) * 0.15;
  const c1y = HUB.y - 70;
  const c2x = x2;
  const c2y = y2 + 90;
  return `M ${HUB.x} ${HUB.y - 22} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`;
}

export function BrandFanDiagram() {
  return (
    <div className="relative mx-auto w-full max-w-[720px]">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full overflow-visible"
        fill="none"
        aria-hidden
      >
        {/* Base grey curves */}
        {BRAND_ICONS.map((_, i) => (
          <path
            key={`base-${i}`}
            d={curvePath(i)}
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="1.25"
            strokeLinecap="round"
            fill="none"
          />
        ))}

        {/* Animated blue pulse */}
        {BRAND_ICONS.map((_, i) => (
          <path
            key={`pulse-${i}`}
            d={curvePath(i)}
            stroke="#3b82f6"
            strokeWidth="1.75"
            strokeLinecap="round"
            fill="none"
            className="brand-fan-pulse"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}

        {LOGO_XS.map((x, i) => (
          <circle
            key={`dot-${i}`}
            cx={x}
            cy={LOGO_Y + 18}
            r="1.5"
            fill="rgba(255,255,255,0.35)"
          />
        ))}
      </svg>

      <div className="pointer-events-none absolute inset-0">
        {BRAND_ICONS.map(({ id, Icon }, i) => {
          const left = (LOGO_XS[i] / W) * 100;
          const top = (LOGO_Y / H) * 100;
          return (
            <div
              key={id}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-white"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
            </div>
          );
        })}

        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 text-white"
          style={{ left: "50%", top: `${(HUB.y / H) * 100}%` }}
        >
          <IconHub className="h-8 w-8 sm:h-9 sm:w-9" />
        </div>
      </div>
    </div>
  );
}
