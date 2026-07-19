"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";

const personas = [
  {
    id: "owner",
    label: "Business Owners",
    icon: "🏪",
    heading: "Your most dependable employee — and it works every single day.",
    points: [
      ["What it does", "Speaksy is a calling assistant that handles inbound and outbound calls for your business. It speaks naturally in Hindi, Marathi, Telugu, or whichever language your customers prefer."],
      ["What it handles", "Payment reminders, order confirmations, new lead follow-ups, appointment bookings — all the calls your team never has enough time for."],
      ["What it costs", "Around ₹4 for every minute of real conversation. No salaries, no attrition, no sick days. It works nights, weekends, and public holidays without complaint."],
      ["How to begin", "Tell us how your team currently handles calls. We build your assistant, you hear it call your own phone, and if it feels right — it's live and calling customers within days."],
    ],
  },
  {
    id: "ops",
    label: "Operations Leaders",
    icon: "📈",
    heading: "Your entire calling operation, simplified into one clear view.",
    points: [
      ["Scale without limits", "Handle thousands of calls at once. Every new lead is reached within minutes, every day, without adding a single person to your payroll."],
      ["Full quality visibility", "Every call is automatically reviewed for quality, compliance, and outcome. No more random call sampling — 100% of conversations monitored."],
      ["A smarter team", "Your assistant handles the volume; your best people focus on conversations that actually need them. Your team becomes a closing team."],
      ["Real cost savings", "Businesses typically reduce their cost per outcome by 50–70% while seeing higher connection rates and better conversion results."],
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
          title="Designed for the people who drive business."
          subtitle="Whether you run the business or run the operations, Speaksy makes your calling effortless."
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
