"use client";

/**
 * Soft vertical wavy line field — matches the Framer demo backdrop.
 */
export function WaveBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="wave-lines"
            width="48"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M24 0 C 12 30, 36 60, 24 90 C 12 120, 36 150, 24 180"
              fill="none"
              stroke="rgba(0,0,0,0.07)"
              strokeWidth="1"
              transform="translate(0,-30)"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#wave-lines)" />
      </svg>
      {/* Extra offset layers for denser field */}
      <svg
        className="absolute inset-0 h-full w-full opacity-80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="wave-lines-2"
            width="48"
            height="120"
            patternUnits="userSpaceOnUse"
            patternTransform="translate(24 0)"
          >
            <path
              d="M24 0 C 36 30, 12 60, 24 90 C 36 120, 12 150, 24 180"
              fill="none"
              stroke="rgba(0,0,0,0.055)"
              strokeWidth="1"
              transform="translate(0,-20)"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#wave-lines-2)" />
      </svg>
    </div>
  );
}
