"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";

const layers = [
  {
    id: "telephony",
    n: "01",
    name: "Your Phone Lines",
    latency: "instant",
    short: "Works with any phone provider in India",
    detail:
      "Speaksy connects directly to your existing phone setup — whether that's Exotel, Airtel, or any other provider. Your numbers stay the same. Calls come in or go out exactly as they do today, just answered by your AI assistant.",
    chips: ["Any provider", "No number change", "Do-not-call list enforcement"],
  },
  {
    id: "asr",
    n: "02",
    name: "Listening & Understanding",
    latency: "under 0.2s",
    short: "Hears your customer clearly, in any Indian language",
    detail:
      "The moment your customer speaks, Speaksy begins listening. It understands Hindi, Marathi, Tamil, Telugu, and 10 more — including mixed Hinglish. It even picks up the moment a customer starts talking mid-sentence and responds naturally.",
    chips: ["14 languages", "Understands Hinglish", "Responds to interruptions"],
  },
  {
    id: "dialogue",
    n: "03",
    name: "Understanding What They Need",
    latency: "under 0.3s",
    short: "Knows what to say next, every time",
    detail:
      "Speaksy follows the conversation flow you defined — your words, your logic, your rules. It understands what the customer is asking, picks the right response, and fills in personal details like the customer's name or account balance naturally.",
    chips: ["Follows your script", "Remembers context", "Personalised responses"],
  },
  {
    id: "tts",
    n: "04",
    name: "Speaking Back",
    latency: "under 0.15s",
    short: "Sounds like a real person, in your customer's language",
    detail:
      "Speaksy responds in a warm, natural voice rated 4.8 out of 5 for naturalness. It reads numbers, dates, and amounts correctly in every language — with the right accent and tone. If one provider has a hiccup, it switches to another automatically.",
    chips: ["4.8/5 naturalness", "14+ languages", "Automatic backup"],
  },
  {
    id: "qa",
    n: "05",
    name: "Tracking & Reporting",
    latency: "real-time",
    short: "Every call result, instantly in your dashboard",
    detail:
      "Every call is automatically reviewed: did it follow the right flow, was the customer satisfied, was anything said incorrectly? Results, recordings, and outcomes stream to your dashboard the moment each call ends — 100% of calls, not a sample.",
    chips: ["100% call review", "Private data protected", "Instant results"],
  },
];

export default function Pipeline() {
  const [active, setActive] = useState("dialogue");

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Under the Hood"
          title="What happens in the half-second between 'Hello' and the reply."
          subtitle="Click any stage to see what's happening behind the scenes — it's what makes every conversation feel instant and natural."
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
            From your customer&apos;s last word to Speaksy&apos;s first reply
          </p>
          <div className="flex h-9 w-full overflow-hidden rounded-full font-mono text-[10px] font-bold">
            <motion.div
              initial={{ flexGrow: 0 }}
              whileInView={{ flexGrow: 200 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex items-center justify-center bg-brand-900 text-brand-300"
            >
              Listening 200ms
            </motion.div>
            <motion.div
              initial={{ flexGrow: 0 }}
              whileInView={{ flexGrow: 300 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center justify-center bg-brand-700 text-white"
            >
              Thinking 300ms
            </motion.div>
            <motion.div
              initial={{ flexGrow: 0 }}
              whileInView={{ flexGrow: 150 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center justify-center bg-brand-500 text-brand-950"
            >
              Speaking 150ms
            </motion.div>
            <motion.div
              initial={{ flexGrow: 0 }}
              whileInView={{ flexGrow: 150 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex items-center justify-center bg-brand-300 text-brand-950"
            >
              Delivery 150ms
            </motion.div>
          </div>
          <p className="mt-4 text-center font-mono text-sm font-semibold text-brand-400">
            = 800ms total · your customer barely notices the pause
          </p>
        </div>
      </div>
    </section>
  );
}
