"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { BUSINESS_VOLUME_STEPS, formatRate } from "./speaksy-data";
import { CreditSlider } from "./CreditSlider";

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-[13px] leading-snug text-muted sm:text-sm">
      <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-emerald-100">
        <Check className="h-2.5 w-2.5 text-emerald-800" strokeWidth={3} />
      </span>
      <span>{children}</span>
    </li>
  );
}

const cardBase =
  "relative flex h-full min-h-0 flex-col rounded-[1.35rem] p-6 sm:p-7";
const ctaBase =
  "flex h-12 w-full shrink-0 items-center justify-center rounded-xl text-sm font-semibold transition";

/**
 * Light-theme Speaksy pricing: Demo · Business · Enterprise.
 * Content stacks tight; spacer flexes so CTAs stay level.
 */
export default function SpeaksyPricingCards() {
  const [volIdx, setVolIdx] = useState(0);
  const step = BUSINESS_VOLUME_STEPS[volIdx];

  return (
    <div className="mx-auto grid w-full max-w-6xl items-stretch gap-5 lg:grid-cols-3">
      {/* ——— Demo ——— */}
      <article className={`${cardBase} card`}>
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          Demo
        </h3>
        <p className="mt-1 text-sm leading-snug text-muted">
          Low-risk way to see your custom AI in action before scaling.
        </p>

        <div className="mt-3">
          <p className="text-[2.25rem] font-semibold leading-none tracking-tight text-foreground">
            ₹999
          </p>
          <p className="mt-1 text-sm font-medium text-emerald-700">
            Delivered in 48 hours
          </p>
        </div>

        <ul className="mt-4 flex flex-col gap-2.5 border-t border-line/70 pt-4">
          <Feature>80 minutes of active talk time</Feature>
          <Feature>Custom agent configuration & intelligence training</Feature>
          <Feature>Omnichannel access (WhatsApp agent included)</Feature>
          <Feature>CRM integration, live dashboard & call recordings</Feature>
          <Feature>Clear path to Business or Enterprise next</Feature>
        </ul>

        <div className="min-h-4 flex-1" aria-hidden />

        <Link
          href="/contact"
          className={`${ctaBase} border border-line bg-white text-foreground hover:border-black/15 hover:bg-neutral-50`}
        >
          Start Demo for ₹999
        </Link>
      </article>

      {/* ——— Business ——— */}
      <article
        className={`${cardBase} border-2 border-emerald-500/40 bg-gradient-to-b from-emerald-50/90 to-white shadow-[0_20px_60px_-28px_rgba(16,185,129,0.35)]`}
      >
        <span className="absolute -top-3 left-6 z-10 rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-bold text-white shadow-sm">
          Most popular
        </span>

        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          Business
        </h3>
        <p className="mt-1 text-sm leading-snug text-muted">
          Volume-based rates. More daily calls → lower ₹/min.
        </p>

        <div className="mt-3">
          <div className="flex items-baseline gap-1.5">
            <AnimatePresence mode="wait">
              <motion.span
                key={step.rate}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="text-[2.25rem] font-semibold leading-none tracking-tight text-foreground"
              >
                {formatRate(step.rate)}
              </motion.span>
            </AnimatePresence>
            <span className="text-sm text-muted">/ live minute</span>
          </div>
          <p className="mt-1 text-sm text-muted">Pay only while talking</p>
        </div>

        <div className="mt-3.5 border-t border-emerald-500/15 pt-3.5">
          <div className="mb-1 flex items-center justify-between text-[12px] font-medium">
            <span className="text-muted">Daily call volume</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={step.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-semibold text-emerald-700"
              >
                {step.plan}
              </motion.span>
            </AnimatePresence>
          </div>
          <CreditSlider
            theme="light"
            label="Daily call volume"
            steps={BUSINESS_VOLUME_STEPS.length}
            index={volIdx}
            onChange={setVolIdx}
          />
          <AnimatePresence mode="wait">
            <motion.p
              key={step.range}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-1 text-[13px] font-medium text-foreground"
            >
              {step.range}
            </motion.p>
          </AnimatePresence>
        </div>

        <ul className="mt-4 flex flex-col gap-2.5">
          <Feature>Pay only for live talk-time (ringing free)</Feature>
          <Feature>Unlimited agents · CRM connect</Feature>
          <Feature>Warm human handoff with full context</Feature>
          <Feature>WhatsApp / SMS follow-up</Feature>
          <Feature>All 10 languages · same rate</Feature>
        </ul>

        <div className="min-h-4 flex-1" aria-hidden />

        <Link
          href="/contact"
          className={`${ctaBase} brand-pill text-white shadow-[0_8px_28px_-8px_rgba(16,185,129,0.55)] hover:opacity-95`}
        >
          Get started at {formatRate(step.rate)}/min
        </Link>
      </article>

      {/* ——— Enterprise — tight stack, no dead air in content ——— */}
      <article
        className={`${cardBase} border border-emerald-900/10 bg-gradient-to-b from-white to-emerald-50/40 shadow-[0_16px_48px_-28px_rgba(6,78,59,0.18)]`}
      >
        <span className="absolute -top-3 left-6 z-10 rounded-full bg-emerald-900 px-3 py-1 text-[11px] font-bold tracking-wide text-white">
          300+ / day
        </span>

        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          Enterprise
        </h3>

        <div className="mt-2">
          <p className="text-[2.25rem] font-semibold leading-none tracking-tight sm:text-[2.35rem]">
            <span className="bg-gradient-to-r from-emerald-500 to-emerald-900 bg-clip-text text-transparent">
              &lt; ₹1.5
            </span>
            <sup
              className="ml-0.5 align-super text-[0.95rem] font-semibold text-emerald-800"
              aria-hidden
            >
              *
            </sup>
            <span className="ml-1 text-base font-semibold text-muted">
              / min
            </span>
          </p>
          <p className="mt-1.5 text-sm font-medium leading-snug text-foreground">
            Custom architecture. Unbeatable unit economics.
          </p>
        </div>

        <p className="mt-3 text-[13px] font-medium leading-snug text-foreground/80 sm:text-sm">
          Dedicated multi-agent workflows for ops past 300 calls/day—unfair
          advantage at a fraction of industry cost.
        </p>

        <ul className="mt-3.5 flex flex-col gap-2.5 border-t border-line/70 pt-3.5">
          <Feature>Uncapped volume with custom rate ladders</Feature>
          <Feature>Multi-agent & complex handoff graphs</Feature>
          <Feature>Dedicated infrastructure & success manager</Feature>
          <Feature>SSO, VPC, & security compliance</Feature>
          <Feature>Uptime commitment & priority SLAs</Feature>
        </ul>

        <div className="min-h-4 flex-1" aria-hidden />

        <Link
          href="/contact"
          className={`${ctaBase} bg-gradient-to-r from-emerald-500 to-emerald-900 text-white shadow-[0_10px_32px_-8px_rgba(6,78,59,0.45)] hover:opacity-95`}
        >
          Build my custom plan
        </Link>
      </article>
    </div>
  );
}
