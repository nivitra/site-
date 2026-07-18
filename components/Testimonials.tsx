"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";

const testimonials = [
  {
    quote:
      "We moved our entire EMI reminder operation from a 40-seat call center to Speaksy in three weeks. Connect rates went up, cost per promise-to-pay dropped 61%, and honestly — customers can't tell it's not a person.",
    name: "Head of Collections",
    org: "NBFC · Mumbai",
    metric: "61% lower cost per PTP",
  },
  {
    quote:
      "Every platform we evaluated quoted us in dollars. Speaksy quoted us in rupees and still out-performed them on Hinglish naturalness. The graph builder meant our ops team ships new flows without engineering.",
    name: "VP Growth",
    org: "EdTech unicorn · Bengaluru",
    metric: "2.7x demo bookings",
  },
  {
    quote:
      "RTO was eating 12% of our revenue. Speaksy calls every COD order within five minutes in the customer's language. RTO is down to 7% and the platform pays for itself many times over each month.",
    name: "Founder",
    org: "D2C brand · Delhi",
    metric: "38% RTO reduction",
  },
  {
    quote:
      "The human handoff is the killer feature. The AI qualifies, and the moment a customer starts negotiating, my closers get the live call with the entire transcript on screen. Zero context lost, zero repeated questions.",
    name: "Sales Director",
    org: "Real Estate · Pune",
    metric: "<1.5s live handoffs",
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
    <section className="relative py-24">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="Customers"
          title="Teams across India are retiring their dialers."
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
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#22c55e" opacity="0.5">
                <path d="M9.6 4C5.9 6.1 3.5 9.6 3.5 13.7c0 3.3 2 5.8 4.8 5.8 2.4 0 4.2-1.8 4.2-4.1 0-2.2-1.6-3.9-3.8-3.9-.4 0-.9.1-1 .1.3-2.3 2.4-4.9 4.5-6L9.6 4zm10 0c-3.6 2.1-6.1 5.6-6.1 9.7 0 3.3 2.1 5.8 4.8 5.8 2.4 0 4.2-1.8 4.2-4.1 0-2.2-1.7-3.9-3.8-3.9-.4 0-.9.1-1 .1.3-2.3 2.4-4.9 4.5-6L19.6 4z" />
              </svg>
              <blockquote className="text-lg leading-relaxed text-foreground sm:text-xl">
                {t.quote}
              </blockquote>
              <figcaption className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted">{t.org}</p>
                </div>
                <span className="rounded-full border border-brand-500/40 bg-brand-500/10 px-4 py-1.5 text-sm font-semibold text-brand-300">
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
                i === idx ? "w-8 bg-brand-400" : "w-2 bg-white/15 hover:bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
