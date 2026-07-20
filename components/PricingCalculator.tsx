"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

const SPEAKSY_RATE = 5.2; // ₹ per live minute (Business Starter)
const GLOBAL_AI_RATE = 10; // ₹ per live minute (typical ₹8–11 industry)
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
          eyebrow="ROI Calculator"
          title="Move the sliders. Watch your CFO relax."
          subtitle="Estimates based on billed live-call minutes only — ringing, dead air and failed connects are always free on Speaksy."
        />
        <Reveal delay={0.1}>
          <div className="card mt-12 grid gap-10 rounded-3xl p-8 sm:p-10 lg:grid-cols-[1.1fr_1fr]">
            <div className="flex flex-col gap-8">
              <Slider
                label="Monthly leads dialed"
                value={leads}
                min={1000}
                max={200000}
                step={1000}
                format={(v) => Intl.NumberFormat("en-IN").format(v)}
                onChange={setLeads}
              />
              <Slider
                label="Average call duration"
                value={duration}
                min={0.5}
                max={6}
                step={0.5}
                format={(v) => `${v} min`}
                onChange={setDuration}
              />
              <Slider
                label="Connect rate"
                value={connect}
                min={30}
                max={95}
                step={5}
                format={(v) => `${v}%`}
                onChange={setConnect}
              />
              <div className="mt-2 grid grid-cols-2 gap-4 border-t border-line pt-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted">Connected calls / mo</p>
                  <p className="mt-1 font-mono text-xl font-semibold">
                    {Intl.NumberFormat("en-IN").format(Math.round(connectedCalls))}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted">Billed live minutes / mo</p>
                  <p className="mt-1 font-mono text-xl font-semibold">
                    {Intl.NumberFormat("en-IN").format(Math.round(liveMinutes))}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between rounded-2xl border border-line bg-surface-2 px-6 py-4">
                <div>
                  <p className="text-sm font-medium text-muted">Traditional call center</p>
                  <p className="text-[11px] text-muted-2">~₹{HUMAN_RATE}/live min, loaded cost</p>
                </div>
                <p className="font-mono text-lg font-semibold text-muted line-through decoration-red-500/50">
                  {inr(humanCost)}
                </p>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-line bg-surface-2 px-6 py-4">
                <div>
                  <p className="text-sm font-medium text-muted">Global voice AI platform</p>
                  <p className="text-[11px] text-muted-2">~₹{GLOBAL_AI_RATE}/min, billed in USD</p>
                </div>
                <p className="font-mono text-lg font-semibold text-foreground">{inr(globalCost)}</p>
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

              <div className="mt-2 rounded-2xl border border-brand-500/25 bg-brand-500/10 p-6 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
                  You save every year
                </p>
                <p className="mt-2 font-mono text-3xl font-bold text-brand-700 sm:text-4xl">
                  {inr(savingsVsHuman * 12)}
                </p>
                <p className="mt-2 text-xs text-muted">
                  vs a call center — or {inr(savingsVsGlobal * 12)} vs a global AI platform
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
