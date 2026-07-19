"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";

const testimonials = [
  {
    quote:
      "We moved our entire payment reminder operation from a 40-person team to Speaksy in three weeks. Costs dropped 61%, and honestly — our customers respond better to the AI agent than they did to our team.",
    name: "Head of Operations",
    org: "Financial Services · Mumbai",
    metric: "61% cost reduction",
  },
  {
    quote:
      "Every platform we looked at was priced in dollars and built for American accents. Speaksy is built for India — it sounds natural in Hindi and books twice as many demos as our previous setup.",
    name: "VP Growth",
    org: "EdTech · Bengaluru",
    metric: "2.7× more demos booked",
  },
  {
    quote:
      "Undelivered orders were eating 12% of our revenue. Speaksy confirms every order within minutes in the customer's language. Failed deliveries dropped to 7% — the savings pay for Speaksy many times over.",
    name: "Founder",
    org: "Retail · Delhi",
    metric: "38% fewer failed deliveries",
  },
  {
    quote:
      "The moment a customer needs personal attention, my sales team gets the live call with complete context. No repeated questions, no wasted time. It's like having the perfect receptionist.",
    name: "Sales Director",
    org: "Real Estate · Pune",
    metric: "Instant team handoff",
  },
];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  const t = testimonials[idx];

  return (
    <section className="relative py-28 border-y border-line bg-surface">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="Customers"
          title="Loved by businesses across India."
        />
        <div className="relative mt-12 min-h-[300px] sm:min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45 }}
              className="card flex flex-col gap-6 rounded-3xl p-8 sm:p-10"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#22c55e" opacity="0.4">
                <path d="M9.6 4C5.9 6.1 3.5 9.6 3.5 13.7c0 3.3 2 5.8 4.8 5.8 2.4 0 4.2-1.8 4.2-4.1 0-2.2-1.6-3.9-3.8-3.9-.4 0-.9.1-1 .1.3-2.3 2.4-4.9 4.5-6L9.6 4zm10 0c-3.6 2.1-6.1 5.6-6.1 9.7 0 3.3 2.1 5.8 4.8 5.8 2.4 0 4.2-1.8 4.2-4.1 0-2.2-1.7-3.9-3.8-3.9-.4 0-.9.1-1 .1.3-2.3 2.4-4.9 4.5-6L19.6 4z" />
              </svg>
              <blockquote className="text-lg leading-relaxed text-foreground sm:text-xl">
                {t.quote}
              </blockquote>
              <figcaption className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted">{t.org}</p>
                </div>
                <span className="rounded-full border border-brand-600/20 bg-brand-600/5 px-4 py-1.5 text-sm font-semibold text-brand-700">
                  {t.metric}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === idx ? "w-8 bg-brand-500" : "w-2 bg-gray-200 hover:bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
