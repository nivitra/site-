"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import { customerCases } from "@/lib/customers";

export default function ResultsCarousel() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % customerCases.length), 7000);
    return () => clearInterval(t);
  }, []);

  const c = customerCases[idx];

  return (
    <section className="border-y border-line bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Results"
          title="Specific outcomes. Not vague promises."
          subtitle="The same stories we publish on our customers page — measured after go-live, not projected."
        />

        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={c.company}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="card overflow-hidden rounded-3xl"
            >
              <div className="grid lg:grid-cols-[1fr_1.1fr]">
                <div className="flex flex-col justify-center gap-4 border-b border-line p-8 sm:p-10 lg:border-b-0 lg:border-r">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="brand-pill rounded-lg px-3 py-1 text-xs font-bold text-white">
                      {c.company}
                    </span>
                    <span className="text-xs text-muted">{c.sector}</span>
                  </div>
                  <h3 className="text-xl font-semibold leading-snug tracking-tight text-foreground sm:text-2xl">
                    {c.headline}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted line-clamp-3">{c.challenge}</p>
                  <Link
                    href="/customers"
                    className="mt-1 inline-flex text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
                  >
                    Read full case study →
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-3 p-6 sm:gap-4 sm:p-8">
                  {c.results.map(([value, label]) => (
                    <div
                      key={label}
                      className="flex flex-col gap-1 rounded-2xl bg-brand-950/80 px-4 py-4 sm:px-5 sm:py-5"
                    >
                      <span className="font-mono text-2xl font-bold text-brand-600 sm:text-3xl">
                        {value}
                      </span>
                      <span className="text-[12px] leading-snug text-muted sm:text-[13px]">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex justify-center gap-2">
            {customerCases.map((caseItem, i) => (
              <button
                key={caseItem.company}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`Show ${caseItem.company} results`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === idx ? "w-8 bg-brand-500" : "w-2 bg-gray-200 hover:bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
