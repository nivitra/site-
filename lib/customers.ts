/** Customer stories already used on the site — single source of truth. */

export type CustomerCase = {
  company: string;
  sector: string;
  lang: string;
  headline: string;
  challenge: string;
  solution: string;
  results: [string, string][];
  quote: string;
  person: string;
};

export const customerCases: CustomerCase[] = [
  {
    company: "LoanKart",
    sector: "Consumer NBFC · Mumbai",
    lang: "Hindi · Marathi · Hinglish",
    headline: "A 40-seat collections floor replaced in three weeks — with better numbers.",
    challenge:
      "1.2 lakh EMI reminders a month through a BPO: 31% connect rates, ₹280 average cost per payment promise, QA coverage on barely 2% of calls, and a compliance near-miss when an agent went off-script with a delinquent borrower.",
    solution:
      "Speaksy graph agents in Hindi and Marathi, pin-code-mapped to regional accents. Propensity dialing re-ordered the queue by historical pick-up patterns. Complex hardship cases bridge live to a retained 6-person human team with full transcript context.",
    results: [
      ["61%", "lower cost per payment promise"],
      ["88%", "connect rate (from 31%)"],
      ["100%", "calls QA'd, zero compliance flags"],
      ["3 weeks", "from kickoff to full migration"],
    ],
    quote:
      "Customers can't tell it's not a person. Our auditors can tell exactly what was said on every call. That combination didn't exist before.",
    person: "Head of Collections",
  },
  {
    company: "GlowKart",
    sector: "D2C Beauty · Delhi",
    lang: "Hinglish · Bengali · Tamil",
    headline: "RTO down from 12% to 7% — the margin line item that paid for everything.",
    challenge:
      "Cash-on-delivery return-to-origin was eating 12% of revenue. Human confirmation calls reached orders 6–8 hours after checkout — long after impulse purchases went cold — and covered only metros in English and broken Hindi.",
    solution:
      "Every COD order gets a confirmation call within 5 minutes of checkout, in the customer's checkout-region language. Address issues trigger an NDR verification flow; hesitant customers get an instant prepaid-discount offer via WhatsApp link, mid-call.",
    results: [
      ["38%", "reduction in RTO on COD"],
      ["5 min", "median order-to-call time"],
      ["22%", "abandoned carts recovered"],
      ["9", "languages live across India"],
    ],
    quote:
      "The platform pays for itself several times over every month, in a line item my CFO can point at: RTO.",
    person: "Founder",
  },
  {
    company: "VidyaPrime",
    sector: "EdTech · Bengaluru & Hyderabad",
    lang: "Telugu · Kannada · Hinglish",
    headline: "Speed-to-lead under 60 seconds, in the parent's language — 2.7x demo bookings.",
    challenge:
      "Counsellors called leads 4–6 hours after form-fill, in English, during office hours. Half the leads arrived at night. Parents — the actual decision-makers — were being qualified in a language they didn't negotiate in.",
    solution:
      "Instant Telugu/Kannada callback on every lead, 24/7. The agent qualifies budget and intent, books the demo slot directly into counsellors' calendars, and sends confirmations on WhatsApp in the same language. Counsellors now speak only to demo-confirmed parents.",
    results: [
      ["<60s", "speed-to-lead, all hours"],
      ["2.7x", "confirmed demo bookings"],
      ["74%", "lower cost per qualified lead"],
      ["41%", "fewer demo no-shows"],
    ],
    quote:
      "Every platform we evaluated quoted us in dollars. Speaksy quoted in rupees and beat them on Telugu naturalness anyway.",
    person: "VP Growth",
  },
];
