"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";

const personas = [
  {
    id: "owner",
    label: "Business Owners",
    icon: "🏪",
    heading: "Think of it as your best employee — times a thousand.",
    points: [
      ["What it does", "Speaksy is an AI agent that makes and answers phone calls for your business. It talks naturally in Hindi, Marathi, Telugu, or whichever language your customers speak."],
      ["What it's for", "Reminding customers to pay, confirming orders, calling every new enquiry within a minute, booking appointments — all the calls your team never has time for."],
      ["What it costs", "About ₹4 for every minute of actual conversation. No salaries, no attrition, no missed calls. It works nights, weekends, and holidays."],
      ["How you start", "Tell us what your team says today. We set it up, you hear it call your own phone, and if you like it — it starts calling customers within days."],
    ],
  },
  {
    id: "ops",
    label: "Operations Leaders",
    icon: "📈",
    heading: "Your entire calling operation — simplified into one dashboard.",
    points: [
      ["Scale", "Handle thousands of calls simultaneously. Every lead gets touched within minutes, every day, without adding headcount."],
      ["Quality", "Every call is automatically reviewed on quality, compliance, and outcomes. No more random sampling — 100% visibility."],
      ["Efficiency", "AI handles the volume; your top performers focus on the conversations that matter most. Your team becomes a closing team."],
      ["ROI", "Businesses typically cut their cost-per-outcome by 50–70% while improving connection and conversion rates."],
    ],
  },
];

export default function Personas() {
  const [active, setActive] = useState(0);
  const p = personas[active];

  return (
    <section className="py-28 border-y border-line bg-surface">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Who It's For"
          title="Built for the people who run businesses."
          subtitle="Whether you're a founder or an operations leader, Speaksy speaks your language."
        />

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {personas.map((per, i) => (
            <button
              key={per.id}
              onClick={() => setActive(i)}
              className={`relative rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
                i === active ? "text-white" : "text-muted hover:text-foreground"
              }`}
            >
              {i === active && (
                <motion.span
                  layoutId="persona-pill"
                  className="absolute inset-0 rounded-full bg-brand-600"
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
              <h3 className="mb-8 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{p.heading}</h3>
              <div className="grid gap-6 sm:grid-cols-2">
                {p.points.map(([t, d]) => (
                  <div key={t} className="rounded-2xl bg-surface p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">{t}</p>
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
