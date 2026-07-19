"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";

export type FaqItem = { q: string; a: string };

const defaultFaqs: FaqItem[] = [
  {
    q: "How is Speaksy so affordable?",
    a: "We built our technology specifically for Indian phone networks and languages, which makes it significantly more efficient than global platforms. You only pay for actual conversation time — never for ringing, hold time, or unanswered calls.",
  },
  {
    q: "Will my customers know they're talking to AI?",
    a: "In surveys, over 80% of customers complete their calls without realizing they spoke to AI. Speaksy handles pauses, interruptions, and natural conversation flow just like a person would. If your compliance requires disclosure, we can add that at the start of every call.",
  },
  {
    q: "What happens when the AI can't handle something?",
    a: "Speaksy detects when a customer needs personal attention and instantly transfers the call to your team — with the complete conversation history on screen. Your customer never has to repeat themselves.",
  },
  {
    q: "Can I keep my existing phone numbers?",
    a: "Absolutely. Speaksy works with your current phone setup. Keep your numbers, your provider, and your rates. We can also set up new numbers for you if you prefer.",
  },
  {
    q: "Which languages does Speaksy support?",
    a: "14 Indian languages including Hindi, Marathi, Telugu, Tamil, Gujarati, Kannada, Bengali, Malayalam, Punjabi, Odia, Urdu, Assamese, and English — each with natural regional accents.",
  },
  {
    q: "Is my data safe and compliant?",
    a: "Yes. All data is stored securely on Indian servers. We follow all calling regulations automatically — calling hours, privacy rules, and data protection laws are built into every call.",
  },
  {
    q: "How quickly can I get started?",
    a: "Most businesses go live within 48 hours. We set everything up for you — just tell us what your callers say today, and we'll have your AI agent ready to go.",
  },
];

export default function FAQ({ items = defaultFaqs, heading = true }: { items?: FaqItem[]; heading?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-28">
      <div className="mx-auto max-w-3xl px-6">
        {heading && (
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions, straight answers."
          />
        )}
        <div className="mt-12 flex flex-col gap-3">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`card overflow-hidden rounded-2xl transition-colors ${isOpen ? "border-brand-600/20" : ""}`}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-sm font-semibold text-foreground sm:text-base">{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-brand-600"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
