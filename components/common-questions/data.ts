export type FAQItem = {
  id: string;
  question: string;
  /** Short OUT lead line */
  lead: string;
  /** Body paragraphs */
  body: string[];
};

export type SimpleFAQ = { q: string; a: string };

/** Convert simple q/a pairs (industry, pricing, etc.) into carousel items */
export function toFAQItems(items: SimpleFAQ[]): FAQItem[] {
  return items.map((item, i) => ({
    id: `faq-${i}-${item.q.slice(0, 24).replace(/\s+/g, "-").toLowerCase()}`,
    question: item.q,
    lead: item.a,
    body: [],
  }));
}

/** Default Speaksy homepage FAQs */
export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "ai-detect",
    question: "Will customers know it's AI?",
    lead: "Usually not.",
    body: [
      "Many people finish the full call without realizing. You can also disclose at the start if you prefer — your rules, your choice.",
    ],
  },
  {
    id: "complicated",
    question: "What if the conversation gets complicated?",
    lead: "Speaksy warm-transfers to your team with full context.",
    body: [
      "The customer never has to repeat themselves. Your human agent picks up mid-thread with the transcript and intent already loaded.",
    ],
  },
  {
    id: "languages",
    question: "Which languages are supported?",
    lead:
      "10: Hindi, Hinglish, Marathi, Telugu, Tamil, Gujarati, Kannada, Bengali, Malayalam, and Punjabi.",
    body: [
      "The same first-class set as our language explore gallery — native script, native prosody, same price.",
    ],
  },
  {
    id: "cost",
    question: "How much does it cost?",
    lead: "From ₹3.99 per minute — only when talking.",
    body: [
      "Ringing is free. Much cheaper than a call center, and lower than most overseas AI tools.",
    ],
  },
  {
    id: "numbers",
    question: "Can we use our own number / Exotel / Twilio?",
    lead: "Yes. Whatever number and phone system you already use will work.",
    body: ["Need a new one? We can provide that too."],
  },
  {
    id: "golive",
    question: "How long until we go live?",
    lead: "Simple use cases often go live the same week.",
    body: [
      "You tell us what to say, we set it up, you hear a live call on your number, then go live.",
    ],
  },
  {
    id: "bfsi",
    question: "Is it ready for banking and finance?",
    lead: "Yes. Calling rules, private data handling, and India-hosted servers are built in.",
    body: ["Ready for your compliance team's questions."],
  },
];
