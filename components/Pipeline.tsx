"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";

const layers = [
  {
    id: "telephony",
    n: "01",
    name: "Telephony Layer",
    latency: "carrier-grade",
    short: "SIP/RTP bridges to any carrier",
    detail:
      "Twilio, Exotel, Plivo, Airtel IQ or your own SIP trunk terminate into Speaksy's session border controllers. G.711/Opus transcoding, 10,000+ concurrent channels, TRAI window enforcement before a single packet flows.",
    chips: ["BYOT / SIP", "10k+ concurrent", "DND scrub"],
  },
  {
    id: "asr",
    n: "02",
    name: "Streaming Speech Recognition",
    latency: "<200ms",
    short: "Indic ASR tuned on real call audio",
    detail:
      "Audio is packetized into 20ms chunks and streamed to ASR models fine-tuned on millions of minutes of Indian telephone audio — 8kHz, noisy lines, code-switched Hinglish. Voice activity detection fires interrupt signals the instant your customer starts speaking.",
    chips: ["20ms chunks", "Hinglish native", "VAD interrupts"],
  },
  {
    id: "dialogue",
    n: "03",
    name: "Graph Dialogue Engine",
    latency: "<300ms",
    short: "Deterministic state machine + LLM routing",
    detail:
      "Your visual graph is compiled into an immutable versioned state machine. Router nodes call low-latency LLMs to classify intent and pick edges; static nodes serve pre-synthesized audio from cache for zero-cost, zero-latency playback. Variables like {{name}} and {{emi_amount}} resolve per call.",
    chips: ["Versioned graphs", "Intent routing", "Audio cache"],
  },
  {
    id: "tts",
    n: "04",
    name: "Neural Voice Synthesis",
    latency: "<150ms TTFB",
    short: "Human-grade Indic voices",
    detail:
      "Streaming TTS with sub-150ms time-to-first-byte in voices rated 4.8+ MOS for naturalness. Regional accents, emotional prosody, correct number/date reading in every language. Provider fallbacks mean a vendor 503 never drops your call.",
    chips: ["4.8+ MOS", "10+ languages", "Auto fallback"],
  },
  {
    id: "qa",
    n: "05",
    name: "QA & Outcome Analytics",
    latency: "real-time",
    short: "Every call audited, scored, attributed",
    detail:
      "A 23-parameter auto-QA engine scores every conversation: script adherence, sentiment, compliance phrases, interruption handling. PII is masked in real time. Dispositions, costs and outcomes stream to your dashboard and webhooks the moment a call ends.",
    chips: ["23-param QA", "PII masking", "Webhooks"],
  },
];

export default function Pipeline() {
  const [active, setActive] = useState("dialogue");

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="The Speaksy Stack"
          title="Five layers. One round trip under 800 milliseconds."
          subtitle="Hover any layer to see how the pipeline keeps conversations feeling instant — even on a noisy 8kHz phone line in Tier-3 India."
        />
        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col gap-3">
            {layers.map((l) => {
              const isActive = active === l.id;
              return (
                <button
                  key={l.id}
                  onMouseEnter={() => setActive(l.id)}
                  onClick={() => setActive(l.id)}
                  className={`card relative flex items-center gap-4 rounded-2xl p-5 text-left transition-all duration-300 ${
                    isActive ? "border-brand-500/50 shadow-[0_12px_50px_-16px_rgba(34,197,94,0.35)]" : "hover:border-brand-500/25"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="pipeline-indicator"
                      className="absolute left-0 top-1/2 h-10 w-1 -translate-y-1/2 rounded-r-full bg-brand-400"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className={`font-mono text-sm font-bold ${isActive ? "text-brand-400" : "text-muted"}`}>
                    {l.n}
                  </span>
                  <div className="flex-1">
                    <p className={`text-sm font-semibold ${isActive ? "text-foreground" : "text-muted"}`}>{l.name}</p>
                    <p className="text-xs text-muted">{l.short}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 font-mono text-[11px] font-bold ${
                      isActive ? "bg-brand-500/20 text-brand-300" : "bg-white/5 text-muted"
                    }`}
                  >
                    {l.latency}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="card relative min-h-[320px] overflow-hidden rounded-3xl p-8">
            <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />
            <AnimatePresence mode="wait">
              {layers
                .filter((l) => l.id === active)
                .map((l) => (
                  <motion.div
                    key={l.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    className="relative flex h-full flex-col gap-5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-5xl font-bold text-brand-900">{l.n}</span>
                      <span className="rounded-full border border-brand-500/40 bg-brand-500/10 px-4 py-1.5 font-mono text-xs font-bold text-brand-300">
                        {l.latency}
                      </span>
                    </div>
                    <h3 className="text-2xl font-semibold tracking-tight">{l.name}</h3>
                    <p className="leading-relaxed text-muted">{l.detail}</p>
                    <div className="mt-auto flex flex-wrap gap-2 pt-4">
                      {l.chips.map((c) => (
                        <span key={c} className="rounded-full bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium text-foreground">
                          {c}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>

        {/* latency budget bar */}
        <div className="card mt-10 rounded-2xl p-6">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Round-trip latency budget — customer stops speaking → agent replies
          </p>
          <div className="flex h-9 w-full overflow-hidden rounded-full font-mono text-[10px] font-bold">
            <motion.div
              initial={{ flexGrow: 0 }}
              whileInView={{ flexGrow: 200 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex items-center justify-center bg-brand-900 text-brand-300"
            >
              ASR 200ms
            </motion.div>
            <motion.div
              initial={{ flexGrow: 0 }}
              whileInView={{ flexGrow: 300 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center justify-center bg-brand-700 text-white"
            >
              DIALOGUE 300ms
            </motion.div>
            <motion.div
              initial={{ flexGrow: 0 }}
              whileInView={{ flexGrow: 150 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center justify-center bg-brand-500 text-brand-950"
            >
              TTS 150ms
            </motion.div>
            <motion.div
              initial={{ flexGrow: 0 }}
              whileInView={{ flexGrow: 150 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex items-center justify-center bg-brand-300 text-brand-950"
            >
              NETWORK 150ms
            </motion.div>
          </div>
          <p className="mt-4 text-center font-mono text-sm font-semibold text-brand-400">
            = 800ms total · faster than a human picks up a pen
          </p>
        </div>
      </div>
    </section>
  );
}
