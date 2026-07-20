"use client";

/**
 * Center laser + scan lines + particles — tuned for light glass capsule.
 */
export function EncryptBeam() {
  return (
    <div
      className="pointer-events-none absolute inset-y-[10%] left-1/2 z-30 w-0 -translate-x-1/2"
      aria-hidden
    >
      {/* Soft oval bloom */}
      <div
        className="absolute left-1/2 top-1/2 h-[150%] w-[280px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(90,160,255,0.22) 0%, rgba(110,170,240,0.1) 38%, transparent 72%)",
        }}
      />

      {/* Circular scan-line mesh */}
      <div
        className="absolute left-1/2 top-1/2 h-[100%] w-[200px] -translate-x-1/2 -translate-y-1/2 opacity-70"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              to bottom,
              rgba(70,140,220,0.2) 0px,
              rgba(70,140,220,0.2) 1px,
              transparent 1px,
              transparent 5px
            )
          `,
          maskImage:
            "radial-gradient(ellipse 55% 70% at center, black 0%, black 25%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 55% 70% at center, black 0%, black 25%, transparent 75%)",
        }}
      />

      {/* Secondary faint lines */}
      <div
        className="absolute left-1/2 top-1/2 h-[85%] w-[120px] -translate-x-1/2 -translate-y-1/2 opacity-45"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(90,150,230,0.14) 0px, rgba(90,150,230,0.14) 1px, transparent 1px, transparent 3px)",
          maskImage:
            "radial-gradient(ellipse at center, black 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 0%, transparent 70%)",
        }}
      />

      {/* Core beam */}
      <div
        className="absolute left-1/2 top-1/2 h-full w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, #4AA3FF 10%, #FFFFFF 48%, #4AA3FF 90%, transparent 100%)",
          boxShadow:
            "0 0 4px 1px rgba(255,255,255,1), 0 0 14px 4px rgba(100,180,255,0.85), 0 0 32px 10px rgba(70,150,255,0.4), 0 0 56px 16px rgba(80,150,240,0.2)",
        }}
      />

      {/* Hot mid core */}
      <div
        className="absolute left-1/2 top-1/2 h-[48%] w-[14px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,1) 0%, rgba(160,210,255,0.55) 35%, transparent 70%)",
          filter: "blur(0.5px)",
        }}
      />

      {/* Particles */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            background: "rgba(90, 150, 230, 0.9)",
            boxShadow: `0 0 ${p.size * 2.5}px rgba(100,170,255,0.85)`,
            animation: `encrypt-float ${p.dur}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

const PARTICLES = [
  { x: -32, y: 18, size: 2, opacity: 0.65, dur: 4.2, delay: 0 },
  { x: 26, y: 26, size: 1.5, opacity: 0.45, dur: 3.8, delay: 0.4 },
  { x: -20, y: 40, size: 2.5, opacity: 0.7, dur: 4.6, delay: 0.2 },
  { x: 34, y: 48, size: 1.5, opacity: 0.4, dur: 3.4, delay: 0.8 },
  { x: -38, y: 58, size: 2, opacity: 0.55, dur: 4.1, delay: 0.1 },
  { x: 18, y: 66, size: 1.5, opacity: 0.4, dur: 3.9, delay: 0.6 },
  { x: -14, y: 32, size: 1, opacity: 0.55, dur: 3.2, delay: 1.1 },
  { x: 28, y: 38, size: 2, opacity: 0.6, dur: 4.4, delay: 0.3 },
  { x: -44, y: 46, size: 1.5, opacity: 0.35, dur: 3.6, delay: 0.9 },
  { x: 42, y: 22, size: 1, opacity: 0.45, dur: 4.0, delay: 0.5 },
  { x: -24, y: 72, size: 2, opacity: 0.5, dur: 3.7, delay: 1.2 },
  { x: 14, y: 16, size: 1.5, opacity: 0.4, dur: 4.3, delay: 0.7 },
  { x: -8, y: 54, size: 1, opacity: 0.65, dur: 3.1, delay: 0.15 },
  { x: 36, y: 62, size: 2, opacity: 0.45, dur: 4.5, delay: 1.0 },
  { x: -30, y: 28, size: 1.5, opacity: 0.55, dur: 3.5, delay: 0.45 },
  { x: 22, y: 78, size: 1.5, opacity: 0.35, dur: 3.8, delay: 0.25 },
  { x: -16, y: 80, size: 1, opacity: 0.4, dur: 4.1, delay: 0.85 },
  { x: 8, y: 44, size: 1.5, opacity: 0.55, dur: 3.3, delay: 0.55 },
];
