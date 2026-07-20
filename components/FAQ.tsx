"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";

export type FaqItem = { q: string; a: string };

const defaultFaqs: FaqItem[] = [
  {
    q: "Will customers know it's AI?",
    a: "Usually not. Many people finish the full call without realizing. You can also disclose at the start if you prefer — your rules, your choice.",
  },
  {
    q: "What if the conversation gets complicated?",
    a: "Speaksy warm-transfers to your team member with the full conversation context. The customer never has to repeat themselves.",
  },
  {
    q: "Which languages are supported?",
    a: "10: Hindi, Hinglish, Marathi, Telugu, Tamil, Gujarati, Kannada, Bengali, Malayalam, and Punjabi.",
  },
  {
    q: "How much does it cost?",
    a: "From ₹5.2 per minute — only when talking. Ringing is free. Business steps down to ₹4.7/min; Enterprise can go under ₹1.5/min at high volume.",
  },
  {
    q: "Can we use our own number / Exotel / Twilio?",
    a: "Yes. Whatever number and phone system you already use will work. Need a new one? We can provide that too.",
  },
  {
    q: "How long until we go live?",
    a: "Simple use cases often go live the same week. You tell us what to say, we set it up, you hear a live call on your number, then go live.",
  },
  {
    q: "Is it ready for banking and finance?",
    a: "Yes. Calling rules, private data handling, and India-hosted servers are built in. Ready for your compliance team's questions.",
  },
];

export default function FAQ({
  items = defaultFaqs,
  heading = true,
  eyebrow = "FAQ",
  title = "Straight answers",
}: {
  items?: FaqItem[];
  heading?: boolean;
  eyebrow?: string;
  title?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section">
      <div className="mx-auto max-w-2xl px-6">
        {heading && <SectionHeading eyebrow={eyebrow} title={title} />}
        <div className="mt-12 flex flex-col gap-2">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  isOpen
                    ? "border-brand-500/30 bg-black/[0.02]"
                    : "border-line bg-background"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                >
                  <span className="text-sm font-semibold text-foreground sm:text-[15px]">
                    {f.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-brand-600"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
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
                      transition={{ duration: 0.25 }}
                    >
                      <p className="px-5 pb-5 text-[15px] leading-relaxed text-muted sm:px-6 sm:pb-6">
                        {f.a}
                      </p>
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
