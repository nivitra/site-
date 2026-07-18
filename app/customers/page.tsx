import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/ui/Reveal";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Customers & Case Studies",
  description:
    "How Indian NBFCs, D2C brands and EdTechs use Speaksy voice AI: 61% lower cost per payment promise, 38% RTO reduction, 2.7x demo bookings. Full case studies.",
  alternates: { canonical: "/customers" },
};

const cases = [
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

export default function CustomersPage() {
  return (
    <>
      <PageHero
        eyebrow="Customers"
        title="Real operations. Real language. Real numbers."
        subtitle="Three teams that moved their calling to Speaksy — what was broken, what we built, and what the dashboard said afterwards."
      />

      <section className="pb-24 pt-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6">
          {cases.map((c, i) => (
            <Reveal key={c.company} delay={i * 0.05}>
              <article className="card overflow-hidden rounded-3xl">
                <div className="grid lg:grid-cols-[1.5fr_1fr]">
                  <div className="flex flex-col gap-5 p-8 sm:p-10">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="brand-pill rounded-xl px-4 py-1.5 text-sm font-bold text-white">
                        {c.company}
                      </span>
                      <span className="text-xs text-muted">{c.sector}</span>
                      <span className="rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-[11px] font-semibold text-brand-300">
                        🗣 {c.lang}
                      </span>
                    </div>
                    <h2 className="text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
                      {c.headline}
                    </h2>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-400">The problem</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{c.challenge}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-400">What we built</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{c.solution}</p>
                    </div>
                    <blockquote className="mt-2 border-l-2 border-brand-500 pl-4">
                      <p className="text-sm italic leading-relaxed text-foreground/85">&ldquo;{c.quote}&rdquo;</p>
                      <p className="mt-2 text-xs text-muted">— {c.person}, {c.company}</p>
                    </blockquote>
                  </div>
                  <div className="grid grid-cols-2 content-center gap-4 border-t border-line bg-brand-950/40 p-8 lg:border-l lg:border-t-0">
                    {c.results.map(([n, l]) => (
                      <div key={l} className="rounded-2xl bg-white/[0.04] p-5 text-center">
                        <p className="font-mono text-2xl font-bold text-brand-400 sm:text-3xl">{n}</p>
                        <p className="mt-1 text-xs leading-snug text-muted">{l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <Testimonials />
      <CTASection />
    </>
  );
}
