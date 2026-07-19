"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

const SPEAKSY_RATE = 4.875; // ₹ per live minute (midpoint of 4.75–5.0 range)
const GLOBAL_AI_RATE = 11; // ₹ per live minute (typical global platform, converted)
const HUMAN_RATE = 28; // ₹ per live minute (loaded telecaller cost)

const inr = (n: number) =>
  "₹" + Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n));

function Slider({
  label, value, min, max, step, format, onChange,
}: {
  label: string; value: number; min: number; max: number; step: number;
  format: (v: number) => string; onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-medium text-muted">{label}</label>
        <span className="font-mono text-base font-semibold text-brand-300">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}

export default function PricingCalculator() {
  const [leads, setLeads] = useState(25000);
  const [duration, setDuration] = useState(2.5);
  const [connect, setConnect] = useState(65);

  const connectedCalls = leads * (connect / 100);
  const liveMinutes = connectedCalls * duration;
  const speaksyCost = liveMinutes * SPEAKSY_RATE;
  const globalCost = liveMinutes * GLOBAL_AI_RATE;
  const humanCost = liveMinutes * HUMAN_RATE;
  const savingsVsHuman = humanCost - speaksyCost;
  const savingsVsGlobal = globalCost - speaksyCost;

  return (
    <section id="calculator" className="border-y border-line bg-surface/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Savings Calculator"
          title="See exactly what you'd save."
          subtitle="Adjust the numbers to match your business. The comparison is based only on actual conversation time — hold time, ringing, and unanswered calls are always free."
        />
        <Reveal delay={0.1}>
          <div className="card mt-12 grid gap-10 rounded-3xl p-8 sm:p-10 lg:grid-cols-[1.1fr_1fr]">
            <div className="flex flex-col gap-8">
              <Slider
                label="Customers you call per month"
                value={leads}
                min={1000}
                max={200000}
                step={1000}
                format={(v) => Intl.NumberFormat("en-IN").format(v)}
                onChange={setLeads}
              />
              <Slider
                label="Average call length"
                value={duration}
                min={0.5}
                max={6}
                step={0.5}
                format={(v) => `${v} min`}
                onChange={setDuration}
              />
              <Slider
                label="How many calls get answered"
                value={connect}
                min={30}
                max={95}
                step={5}
                format={(v) => `${v}%`}
                onChange={setConnect}
              />
              <div className="mt-2 grid grid-cols-2 gap-4 border-t border-line pt-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted">Calls connected per month</p>
                  <p className="mt-1 font-mono text-xl font-semibold">
                    {Intl.NumberFormat("en-IN").format(Math.round(connectedCalls))}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted">Active conversation minutes</p>
                  <p className="mt-1 font-mono text-xl font-semibold">
                    {Intl.NumberFormat("en-IN").format(Math.round(liveMinutes))}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between rounded-2xl bg-white/[0.04] px-6 py-4">
                <div>
                  <p className="text-sm font-medium text-muted">Traditional call centre</p>
                  <p className="text-[11px] text-muted/70">~₹{HUMAN_RATE}/min, full team cost</p>
                </div>
                <p className="font-mono text-lg font-semibold text-muted line-through decoration-red-400/60">
                  {inr(humanCost)}
                </p>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-white/[0.04] px-6 py-4">
                <div>
                  <p className="text-sm font-medium text-muted">International AI platform</p>
                  <p className="text-[11px] text-muted/70">~₹{GLOBAL_AI_RATE}/min, billed in dollars</p>
                </div>
                <p className="font-mono text-lg font-semibold text-yellow-200/80">{inr(globalCost)}</p>
              </div>
              <motion.div
                key={Math.round(speaksyCost)}
                initial={{ scale: 0.985 }}
                animate={{ scale: 1 }}
                className="brand-pill flex items-center justify-between rounded-2xl px-6 py-5 shadow-[0_16px_50px_-16px_rgba(34,197,94,0.6)]"
              >
                <div>
                  <p className="text-sm font-bold text-white">Speaksy</p>
                  <p className="text-[11px] text-white/70">₹{SPEAKSY_RATE}/live min · monthly</p>
                </div>
                <p className="font-mono text-2xl font-bold text-white">{inr(speaksyCost)}</p>
              </motion.div>

              <div className="mt-2 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-6 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">
                  Your estimated annual savings
                </p>
                <p className="mt-2 font-mono text-3xl font-bold text-brand-300 sm:text-4xl">
                  {inr(savingsVsHuman * 12)}
                </p>
                <p className="mt-2 text-xs text-muted">
                  compared to a call centre — or {inr(savingsVsGlobal * 12)} versus an international AI platform
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
