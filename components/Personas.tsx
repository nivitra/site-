"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";

const personas = [
  {
    id: "owner",
    label: "I run a business",
    icon: "🏪",
    heading: "Think of it as your best telecaller — times a thousand.",
    points: [
      ["What it does", "Speaksy is a computer that makes and answers phone calls for you, and talks exactly like a person — in Hindi, Marathi, Telugu, or whichever language your customers speak."],
      ["What it's for", "Reminding customers to pay, confirming orders before delivery, calling every new enquiry within a minute, booking appointments — all the calls your staff never has time for."],
      ["What it costs", "About ₹4 for every minute it actually talks. No salaries, no attrition, no 'madam abhi busy hai'. It works nights, Sundays and Diwali."],
      ["How you start", "Tell us what your callers say today. We set it up, you hear it call your own phone, and if you like it — it starts calling customers in a few days."],
    ],
  },
  {
    id: "ops",
    label: "I run operations / a call center",
    icon: "📈",
    heading: "Your dialer, agents and QA team — collapsed into one dashboard.",
    points: [
      ["Coverage", "10,000 parallel calls, propensity-sorted queues, TRAI-window and DND compliance enforced automatically. 100% of leads touched within SLA, every day."],
      ["Quality", "Every single call is auto-QA'd on 23 parameters — script adherence, sentiment, compliance phrases. No more sampling 2% of calls and praying."],
      ["The hybrid model", "AI handles the volume; your best closers take live handoffs with full transcripts when a customer negotiates. Your team shrinks to its top performers."],
      ["The math", "You pay per second of live conversation. Typical operations cut cost-per-outcome by 50–70% while connect rates go up, not down."],
    ],
  },
  {
    id: "dev",
    label: "I'm a developer",
    icon: "⚡",
    heading: "One POST request. Sub-800ms round trips. Zero telephony pain.",
    points: [
      ["Integration", "REST APIs for calls, batches and agents. Webhooks fire with dispositions, transcripts and recordings the moment a call ends. Go live in an afternoon."],
      ["Stack freedom", "BYO telephony (Twilio, Exotel, Plivo, raw SIP) and BYO keys (OpenAI, Anthropic, Deepgram, ElevenLabs) — or use our bundled stack. Automatic fallbacks on provider 503s."],
      ["The graph engine", "Deterministic dialogue state machines instead of prompt spaghetti. Versioned, validated, immutable at call-time. Variables resolve per call."],
      ["The pipeline", "Streaming ASR <200ms, LLM routing <300ms, TTS first-byte <150ms, on noisy 8kHz Indian trunks. Interruption handling that actually works."],
    ],
  },
];

export default function Personas() {
  const [active, setActive] = useState(0);
  const p = personas[active];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="For Everyone"
          title="Explained in your language — whatever that is."
          subtitle="A kirana chain owner, a collections head and a CTO all need different answers. Pick yours."
        />

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {personas.map((per, i) => (
            <button
              key={per.id}
              onClick={() => setActive(i)}
              className={`relative rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
                i === active ? "text-brand-950" : "text-muted hover:text-foreground"
              }`}
            >
              {i === active && (
                <motion.span
                  layoutId="persona-pill"
                  className="absolute inset-0 rounded-full bg-brand-400"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">
                {per.icon} {per.label}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="card rounded-3xl p-8 sm:p-10"
            >
              <h3 className="mb-8 text-2xl font-semibold tracking-tight sm:text-3xl">{p.heading}</h3>
              <div className="grid gap-6 sm:grid-cols-2">
                {p.points.map(([t, d]) => (
                  <div key={t} className="rounded-2xl bg-white/[0.03] p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-400">{t}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
