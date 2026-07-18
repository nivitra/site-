"use client";

import MorphBar from "./ui/MorphBar";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import SpotlightCard from "./ui/SpotlightCard";

type Bench = {
  metric: string;
  desc: string;
  unit: string;
  higherBetter: boolean;
  speaksy: { v: number; label: string };
  global: { v: number; label: string };
  legacy: { v: number; label: string };
  max: number;
};

const benches: Bench[] = [
  {
    metric: "Voice naturalness (MOS)",
    desc: "Mean Opinion Score, blind-rated by native speakers on Hindi & Marathi telephone audio. 5 = indistinguishable from human.",
    unit: "/ 5",
    higherBetter: true,
    speaksy: { v: 4.82, label: "4.82" },
    global: { v: 4.31, label: "4.31" },
    legacy: { v: 3.6, label: "3.60" },
    max: 5,
  },
  {
    metric: "Hinglish speech recognition error",
    desc: "Word Error Rate on code-switched 8kHz call audio — lower is better. Global models stumble the moment Hindi and English mix.",
    unit: "% WER",
    higherBetter: false,
    speaksy: { v: 7.4, label: "7.4%" },
    global: { v: 15.2, label: "15.2%" },
    legacy: { v: 26.8, label: "26.8%" },
    max: 30,
  },
  {
    metric: "Response latency (p50)",
    desc: "Milliseconds from customer finishing a sentence to the agent starting its reply, measured on live Indian SIP trunks.",
    unit: "ms",
    higherBetter: false,
    speaksy: { v: 640, label: "640ms" },
    global: { v: 1180, label: "1,180ms" },
    legacy: { v: 2400, label: "2,400ms" },
    max: 2600,
  },
  {
    metric: "Human-pass rate",
    desc: "Share of completed calls where customers did not identify the agent as AI in post-call surveys.",
    unit: "%",
    higherBetter: true,
    speaksy: { v: 83, label: "83%" },
    global: { v: 61, label: "61%" },
    legacy: { v: 24, label: "24%" },
    max: 100,
  },
];

function Bar({ value, max, label, name, color, delay, higherBetter }: {
  value: number; max: number; label: string; name: string; color: string; delay: number; higherBetter: boolean;
}) {
  const pct = Math.max(8, (value / max) * 100);
  return (
    <div className="flex items-center gap-3">
      <span className="w-24 shrink-0 text-right text-xs text-muted sm:w-28">{name}</span>
      <div className="relative h-6 flex-1 overflow-hidden rounded-full bg-white/[0.04]">
        <MorphBar
          pct={pct}
          delay={delay * 1000}
          duration={1000}
          className={`absolute inset-y-0 left-0 rounded-full ${color}`}
        />
        <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center font-mono text-[10px] font-bold text-white/90">
          {label}
        </span>
      </div>
      <span className="w-10 shrink-0 text-xs font-bold text-brand-400">
        {name === "Speaksy" ? (higherBetter ? "↑" : "↓") : ""}
      </span>
    </div>
  );
}

export default function Benchmarks() {
  return (
    <section id="benchmarks" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="State of the Art"
          title="Don't take our word for it. Take the numbers."
          subtitle="We benchmark against the biggest global voice AI platforms and legacy IVR bots on the metrics that decide whether a customer stays on the line."
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {benches.map((b, i) => (
            <Reveal key={b.metric} delay={(i % 2) * 0.1}>
              <SpotlightCard className="card h-full rounded-3xl" maxTilt={5}>
                <div className="flex h-full flex-col gap-4 p-7">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-lg font-semibold tracking-tight">{b.metric}</h3>
                    <span className="shrink-0 font-mono text-xs text-muted">{b.unit}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted">{b.desc}</p>
                  <div className="mt-2 flex flex-col gap-2.5">
                    <Bar name="Speaksy" value={b.speaksy.v} max={b.max} label={b.speaksy.label} color="brand-pill" delay={0.15} higherBetter={b.higherBetter} />
                    <Bar name="Global platforms" value={b.global.v} max={b.max} label={b.global.label} color="bg-yellow-400/40" delay={0.3} higherBetter={b.higherBetter} />
                    <Bar name="Legacy IVR bots" value={b.legacy.v} max={b.max} label={b.legacy.label} color="bg-white/15" delay={0.45} higherBetter={b.higherBetter} />
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-8 text-center text-xs text-muted">
            Internal benchmark suite, January 2026 · 8kHz telephone audio across Hindi, Hinglish, Marathi, Telugu & Tamil · methodology available on request.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
