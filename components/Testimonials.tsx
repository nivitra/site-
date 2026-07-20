"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";

const testimonials = [
  {
    quote:
      "We used to have 40 people on EMI reminders. Speaksy does it now. Costs dropped, collections improved — and customers still think it's a real person.",
    name: "Collections Head",
    org: "NBFC · Mumbai",
    metric: "61% cheaper per outcome",
  },
  {
    quote:
      "Other tools quoted in dollars. Speaksy priced in rupees, and the Hinglish is better. Our ops team runs campaigns themselves.",
    name: "VP Growth",
    org: "EdTech · Bengaluru",
    metric: "2.7× more demos",
  },
  {
    quote:
      "RTO was eating us on COD. Now every order gets a confirmation call in the customer's language. RTO fell, and the platform pays for itself every month.",
    name: "Founder",
    org: "D2C brand · Delhi",
    metric: "38% lower RTO",
  },
  {
    quote:
      "Leads came in and we called late. Now Speaksy calls right after the form. Serious buyers go to sales while interest is hot.",
    name: "Sales Director",
    org: "Real Estate · Pune",
    metric: "Leads don't go cold",
  },
];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 6500);
    return () => clearInterval(t);
  }, []);

  const t = testimonials[idx];

  return (
    <section className="section border-t border-line bg-surface/40">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading
          eyebrow="Customer stories"
          title="Teams that used to run this with staff"
        />
        <div className="relative mt-12 min-h-[300px] sm:min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={idx}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="card flex flex-col gap-6 rounded-3xl p-7 sm:p-10"
            >
              <blockquote className="text-lg leading-relaxed text-foreground sm:text-xl">
                “{t.quote}”
              </blockquote>
              <figcaption className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted">{t.org}</p>
                </div>
                <span className="rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm font-semibold text-brand-700">
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
              aria-label={`Story ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === idx ? "w-7 bg-brand-600" : "w-2 bg-black/15 hover:bg-black/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
