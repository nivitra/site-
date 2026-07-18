"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";

export type FaqItem = { q: string; a: string };

const defaultFaqs: FaqItem[] = [
  {
    q: "How is Speaksy so much cheaper than other voice AI platforms?",
    a: "Three reasons: our speech stack is optimized for Indian telephony (8kHz codecs, regional models) which slashes compute cost; we bill per live-call second — never for ringing, dead air or failed connects; and we're built in India, priced in rupees, without Silicon Valley margins baked in.",
  },
  {
    q: "Will customers know they're talking to an AI?",
    a: "In blind evaluations, over 80% of customers complete calls without realizing it's AI. Speaksy handles interruptions, code-switching (Hinglish, Tanglish), fillers and back-channels naturally. We also support explicit AI disclosure at call start wherever your compliance team requires it.",
  },
  {
    q: "What happens when the AI can't handle a conversation?",
    a: "Speaksy detects complex objections or high-intent moments in real time and bridges the live call to your human agent in under 1.5 seconds — with the full transcript and customer context on their screen. The customer never repeats themselves.",
  },
  {
    q: "Can I use my existing phone numbers and telephony provider?",
    a: "Yes. Speaksy supports bring-your-own-telephony with Twilio, Exotel, Plivo, Airtel IQ or any generic SIP trunk. You can also buy numbers directly through us if you prefer a single bill.",
  },
  {
    q: "Which languages does Speaksy support?",
    a: "14 languages: Hindi, Hinglish, Marathi, Telugu, Tamil, Gujarati, Kannada, Bengali, Malayalam, Punjabi, Odia, Urdu, Assamese and Indian English — with native accents and natural mid-sentence code-switching. Each has its own dedicated page under /languages.",
  },
  {
    q: "Is Speaksy compliant for BFSI use cases?",
    a: "Yes. TRAI calling windows and DND scrubbing are enforced automatically on every campaign, PII like PAN and Aadhaar numbers is masked in real time from transcripts, data stays on Indian servers for DPDP compliance, and everything is encrypted at rest with AES-256.",
  },
  {
    q: "How fast can I go live?",
    a: "With a pre-built industry template, same day. A custom graph agent with your CRM integration typically takes 3–5 days. No setup fees either way.",
  },
];

export default function FAQ({ items = defaultFaqs, heading = true }: { items?: FaqItem[]; heading?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        {heading && (
          <SectionHeading
            eyebrow="FAQ"
            title="Questions, answered straight."
          />
        )}
        <div className="mt-12 flex flex-col gap-3">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`card overflow-hidden rounded-2xl transition-colors ${isOpen ? "border-brand-500/30" : ""}`}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-sm font-semibold sm:text-base">{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-brand-400"
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
