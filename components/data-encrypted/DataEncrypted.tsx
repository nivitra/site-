"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EncryptBeam } from "./EncryptBeam";
import { EncryptStream } from "./EncryptStream";
import { BADGE, HEADLINE } from "./data";
import "./data-encrypted.css";

/**
 * Light-theme encryption capsule:
 * soft white glass pill + blue laser beam + plain→cipher marquee,
 * MAXIMUM PRIVACY badge, "Your data. Encrypted."
 */
export default function DataEncrypted() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#F4F6F9] px-4 py-24">
      <Link
        href="/lab"
        className="absolute left-5 top-5 z-40 text-xs text-neutral-400 transition-colors hover:text-neutral-700"
      >
        ← Lab
      </Link>

      {/* Soft ambient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[18%] h-[520px] w-[min(94vw,1000px)] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(100,160,230,0.14) 0%, rgba(140,180,230,0.06) 42%, transparent 70%)",
        }}
      />

      {/* ── Capsule ── */}
      <motion.div
        className="relative w-full max-w-[960px]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="relative w-full overflow-hidden"
          style={{
            height: "clamp(200px, 28vw, 320px)",
            borderRadius: 9999,
            background:
              "radial-gradient(ellipse 88% 95% at 50% 48%, #FFFFFF 0%, #F7FAFD 40%, #EEF3F9 78%, #E8EEF6 100%)",
            boxShadow: `
              0 0 0 1px rgba(120, 160, 210, 0.28),
              0 12px 40px -12px rgba(40, 90, 160, 0.18),
              0 0 60px -16px rgba(80, 150, 230, 0.22),
              inset 0 1px 1px rgba(255, 255, 255, 0.95),
              inset 0 -2px 18px rgba(140, 180, 220, 0.12),
              inset 0 0 48px rgba(160, 200, 240, 0.08)
            `,
          }}
        >
          {/* Top glass highlight */}
          <div
            className="pointer-events-none absolute inset-x-[8%] top-0 z-40 h-[48%] rounded-[999px]"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.9) 0%, transparent 65%)",
            }}
            aria-hidden
          />

          {/* Soft blue edge wash */}
          <div
            className="pointer-events-none absolute inset-0 z-0 rounded-[999px]"
            style={{
              background:
                "radial-gradient(ellipse 70% 80% at 50% 50%, transparent 40%, rgba(120,170,230,0.08) 100%)",
            }}
            aria-hidden
          />

          {/* Inner glass rim */}
          <div
            className="pointer-events-none absolute inset-[2px] z-40 rounded-[999px]"
            style={{
              boxShadow:
                "inset 0 1px 1px rgba(255,255,255,0.9), inset 0 -18px 36px rgba(150,190,230,0.1)",
              border: "1px solid rgba(160, 200, 240, 0.35)",
            }}
            aria-hidden
          />

          <EncryptStream />
          <EncryptBeam />
        </div>

        {/* Soft floor shadow */}
        <div
          aria-hidden
          className="mx-auto -mt-1 h-10 w-[70%] rounded-[100%]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(100,150,210,0.22) 0%, transparent 70%)",
            filter: "blur(10px)",
          }}
        />
      </motion.div>

      {/* ── Copy block ── */}
      <motion.div
        className="relative z-10 mt-8 flex flex-col items-center text-center sm:mt-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-52 w-72 -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(120,170,230,0.14) 0%, transparent 70%)",
          }}
        />

        <span
          className="relative mb-5 inline-flex items-center rounded-full px-3.5 py-1 text-[10px] font-semibold tracking-[0.16em] uppercase"
          style={{
            color: "rgba(50, 100, 160, 0.85)",
            background:
              "linear-gradient(180deg, #FFFFFF 0%, #F0F5FB 100%)",
            boxShadow:
              "0 0 0 1px rgba(120,170,220,0.35), 0 4px 14px -4px rgba(80,140,200,0.25), inset 0 1px 0 rgba(255,255,255,1)",
          }}
        >
          {BADGE}
        </span>

        <h1
          className="relative text-[clamp(2.1rem,5.8vw,3.4rem)] font-semibold leading-[1.1] tracking-[-0.03em]"
          style={{
            color: "rgba(28, 42, 62, 0.92)",
          }}
        >
          {HEADLINE[0]}
          <br />
          {HEADLINE[1]}
        </h1>
      </motion.div>
    </div>
  );
}
