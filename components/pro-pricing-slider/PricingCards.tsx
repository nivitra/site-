"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Hexagon, Info } from "lucide-react";
import {
  BUSINESS_STEPS,
  formatCredits,
  PRO_STEPS,
  type SliderStep,
} from "./data";
import { CreditSlider } from "./CreditSlider";

function Price({ step }: { step: SliderStep }) {
  return (
    <div className="flex items-baseline gap-0.5">
      <AnimatePresence mode="wait">
        <motion.span
          key={step.dollars}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
          className="text-[2.35rem] font-semibold tracking-tight text-white"
        >
          ${step.dollars}
        </motion.span>
      </AnimatePresence>
      <span className="text-sm text-neutral-400">
        .{String(step.cents).padStart(2, "0")} / mo
      </span>
    </div>
  );
}

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-[13px] leading-snug text-neutral-400">
      <Check
        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-500"
        strokeWidth={2.5}
      />
      <span className="flex-1">{children}</span>
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-600" />
    </li>
  );
}

function CreditsLine({ credits }: { credits: number }) {
  return (
    <div className="mt-3 flex items-center gap-2 text-[13px] font-medium text-white">
      <Hexagon
        className="h-4 w-4 fill-[#2f6bff] text-[#2f6bff]"
        strokeWidth={0}
      />
      <AnimatePresence mode="wait">
        <motion.span
          key={credits}
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 4 }}
          transition={{ duration: 0.12 }}
        >
          {formatCredits(credits)} Credits
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

/**
 * Free + Pro + Business pricing. Pro & Business use the exact stepped credit line.
 */
export function PricingCards() {
  const [proIdx, setProIdx] = useState(5); // 10k / $99 as in first frame
  const [bizIdx, setBizIdx] = useState(0); // 30k / $299 as in first frame

  const pro = PRO_STEPS[proIdx];
  const biz = BUSINESS_STEPS[bizIdx];

  return (
    <div className="mx-auto grid w-full max-w-5xl gap-4 px-4 sm:grid-cols-3 sm:gap-5">
      {/* Free */}
      <article className="flex flex-col rounded-[1.35rem] bg-[#141414] p-6 ring-1 ring-white/[0.06]">
        <h3 className="text-lg font-semibold text-white">Free</h3>
        <p className="mt-3 text-[2.35rem] font-semibold tracking-tight text-white">
          $0
        </p>
        <div className="mt-6 flex items-center gap-2 text-[13px] font-medium text-white">
          <Hexagon
            className="h-4 w-4 fill-[#2f6bff] text-[#2f6bff]"
            strokeWidth={0}
          />
          400 Credits / month
        </div>
        <ul className="mt-5 flex flex-col gap-2.5">
          <Feature>Up to 400 Tasks</Feature>
          <Feature>1M character knowledge base</Feature>
        </ul>
        <button
          type="button"
          className="mt-auto w-full rounded-xl bg-white/10 py-3 text-sm font-medium text-neutral-400"
        >
          Sign up for free
        </button>
      </article>

      {/* Pro — hero slider */}
      <article className="flex flex-col rounded-[1.35rem] bg-[#141414] p-6 ring-1 ring-white/[0.08]">
        <h3 className="text-lg font-semibold text-white">Pro</h3>
        <div className="mt-3">
          <Price step={pro} />
        </div>

        <div className="mt-5 px-0.5">
          <CreditSlider
            label="Pro credits"
            steps={PRO_STEPS.length}
            index={proIdx}
            onChange={setProIdx}
          />
        </div>

        <CreditsLine credits={pro.credits} />

        <ul className="mt-5 flex flex-col gap-2.5">
          <Feature>Tasks: up to {formatCredits(pro.credits)} per month</Feature>
          <Feature>Knowledge Base: up to 20M characters</Feature>
          <Feature>Premium actions</Feature>
          <Feature>Phone call basic features</Feature>
        </ul>

        <button
          type="button"
          className="mt-8 w-full rounded-xl bg-[#2f6bff] py-3 text-sm font-semibold text-white shadow-[0_8px_28px_-8px_rgba(47,107,255,0.7)] transition-opacity hover:opacity-95"
        >
          Get Started (${pro.dollars}/month)
        </button>
      </article>

      {/* Business */}
      <article className="flex flex-col rounded-[1.35rem] bg-[#141414] p-6 ring-1 ring-white/[0.06]">
        <h3 className="text-lg font-semibold text-white">Business</h3>
        <div className="mt-3">
          <Price step={biz} />
        </div>

        <div className="mt-5 px-0.5">
          <CreditSlider
            label="Business credits"
            steps={BUSINESS_STEPS.length}
            index={bizIdx}
            onChange={setBizIdx}
          />
        </div>

        <CreditsLine credits={biz.credits} />

        <ul className="mt-5 flex flex-col gap-2.5">
          <Feature>Tasks: up to {formatCredits(biz.credits)} per month</Feature>
          <Feature>Knowledge Base: up to 20M characters</Feature>
          <Feature>Premium actions</Feature>
          <Feature>Phone call basic features</Feature>
          <Feature>Priority support</Feature>
        </ul>

        <button
          type="button"
          className="mt-8 w-full rounded-xl bg-[#2f6bff] py-3 text-sm font-semibold text-white shadow-[0_8px_28px_-8px_rgba(47,107,255,0.7)] transition-opacity hover:opacity-95"
        >
          Get Started (${biz.dollars}/month)
        </button>
      </article>
    </div>
  );
}
