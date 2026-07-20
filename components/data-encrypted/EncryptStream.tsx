"use client";

import { useMemo } from "react";
import { buildStream } from "./data";

/**
 * Dual-layer scrolling text (light theme):
 * - Left half = plaintext
 * - Right half = cipher
 */
export function EncryptStream() {
  const { plain, cipher } = useMemo(() => buildStream(5), []);

  const plainLoop = plain + "          " + plain;
  const cipherLoop = cipher + "          " + cipher;

  return (
    <div className="absolute inset-0 z-20 overflow-hidden rounded-[999px]">
      {/* PLAIN — left of beam */}
      <div
        className="absolute inset-0 flex items-center"
        style={{
          clipPath: "inset(0 50% 0 0)",
          WebkitClipPath: "inset(0 50% 0 0)",
        }}
      >
        <div className="encrypt-marquee flex whitespace-nowrap will-change-transform">
          <StreamText text={plainLoop} tone="plain" />
        </div>
      </div>

      {/* CIPHER — right of beam */}
      <div
        className="absolute inset-0 flex items-center"
        style={{
          clipPath: "inset(0 0 0 50%)",
          WebkitClipPath: "inset(0 0 0 50%)",
        }}
      >
        <div className="encrypt-marquee flex whitespace-nowrap will-change-transform">
          <StreamText text={cipherLoop} tone="cipher" />
        </div>
      </div>

      {/* Soft end-fade into capsule walls */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-[999px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(244,248,252,0.95) 0%, transparent 14%, transparent 86%, rgba(244,248,252,0.95) 100%)",
        }}
        aria-hidden
      />
    </div>
  );
}

function StreamText({
  text,
  tone,
}: {
  text: string;
  tone: "plain" | "cipher";
}) {
  const isPlain = tone === "plain";
  return (
    <span
      className="inline-flex px-10"
      style={{
        fontSize: "clamp(1.45rem, 3.4vw, 2.35rem)",
        fontWeight: 500,
        color: isPlain ? "rgba(35, 70, 120, 0.88)" : "rgba(70, 120, 180, 0.55)",
        textShadow: isPlain
          ? "0 0 24px rgba(100,160,230,0.2)"
          : "0 0 16px rgba(100,160,230,0.12)",
      }}
    >
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="inline-block text-center"
          style={{
            width: ch === " " ? "0.38em" : "0.62em",
            letterSpacing: 0,
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}
