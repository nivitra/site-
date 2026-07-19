"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";

export type FaqItem = { q: string; a: string };

const defaultFaqs: FaqItem[] = [
  {
    q: "How is Speaksy so affordable?",
    a: "We built our technology specifically for Indian businesses and phone networks, making it far more efficient than global platforms. You only ever pay for actual conversation time — never for ringing, hold time, or calls that don't connect.",
  },
  {
    q: "Will my customers know they're talking to AI?",
    a: "In independent surveys, over 80% of customers finish their calls without suspecting they spoke to AI. Speaksy handles natural pauses, interruptions, and conversation flow just like a person would. If your industry requires disclosure, we can include it at the start of every call.",
  },
  {
    q: "What happens when a customer has a complex question?",
    a: "Speaksy instantly recognises when a customer needs personal attention and transfers the call directly to your team — with the complete conversation on screen. Your customer never has to repeat themselves.",
  },
  {
    q: "Do I need to change my phone number?",
    a: "Not at all. Speaksy works with your existing phone setup. Keep your current numbers and provider. We can also set up new numbers for you if needed.",
  },
  {
    q: "Which languages can Speaksy speak?",
    a: "14 Indian languages — Hindi, Marathi, Telugu, Tamil, Gujarati, Kannada, Bengali, Malayalam, Punjabi, Odia, Urdu, Assamese, and English — each with natural regional accents your customers will recognise.",
  },
  {
    q: "Is my business data safe?",
    a: "Yes, completely. All data is stored securely on servers in India. Calling regulations, privacy rules, and data protection are built into every call automatically — you never need to manage compliance manually.",
  },
  {
    q: "How quickly can I get started?",
    a: "Most businesses are live within 48 hours. Simply share how your team currently handles calls and we'll build, test, and launch your assistant — you don't need to do any technical work.",
  },
  {
    q: "Is building voice AI in-house cheaper?",
    a: "Rarely. In-house stacks mean stitching telephony, speech models, orchestration, QA, and TRAI/DND compliance — typically many months of engineering before the first production call. Speaksy ships those pieces together, priced from ₹3.99/min of real conversation, so you pay for outcomes instead of a 12–18 month build.",
  },
];

export default function FAQ({ items = defaultFaqs, heading = true }: { items?: FaqItem[]; heading?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-6">
        {heading && (
          <SectionHeading
            eyebrow="FAQ"
            title="Your questions, answered plainly."
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
