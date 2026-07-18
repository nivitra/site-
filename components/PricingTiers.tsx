import Link from "next/link";
import Reveal from "./ui/Reveal";

const tiers = [
  {
    name: "Starter",
    price: "₹0",
    unit: "to begin",
    tag: "Try it free",
    highlight: false,
    cta: "Start Free",
    blurb: "For testing your first agent on real calls.",
    features: [
      "100 free live minutes",
      "1 voice agent, all languages",
      "Visual graph builder",
      "Bundled STT · LLM · TTS stack",
      "Call logs, recordings & transcripts",
      "Email support",
    ],
  },
  {
    name: "Growth",
    price: "₹3.99",
    unit: "per live minute",
    tag: "Most popular",
    highlight: true,
    cta: "Book a Demo",
    blurb: "For teams running real campaigns at scale.",
    features: [
      "Everything in Starter",
      "Unlimited agents & campaigns",
      "Batch dialing with propensity queue",
      "Live human handoff (<1.5s)",
      "Bring your own telephony & keys",
      "WhatsApp / SMS / email triggers",
      "CRM integrations & webhooks",
      "Priority support on WhatsApp",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    unit: "volume pricing",
    tag: "Best rates",
    highlight: false,
    cta: "Talk to Sales",
    blurb: "For BFSI-scale volumes and strict compliance.",
    features: [
      "Everything in Growth",
      "Volume discounts below ₹3/min",
      "Sub-accounts & reseller markups",
      "Private VPC / on-prem deployment",
      "Custom voice cloning",
      "99.99% uptime SLA",
      "Dedicated success manager",
      "SOC 2 / ISO reports under NDA",
    ],
  },
];

export default function PricingTiers() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.12} className="h-full">
              <div
                className={`relative flex h-full flex-col gap-6 rounded-3xl p-8 ${
                  t.highlight
                    ? "border border-brand-500/60 bg-gradient-to-b from-brand-900/40 to-surface shadow-[0_24px_80px_-24px_rgba(34,197,94,0.4)]"
                    : "card"
                }`}
              >
                <span
                  className={`absolute -top-3 left-8 rounded-full px-3.5 py-1 text-[11px] font-bold ${
                    t.highlight ? "brand-pill text-white" : "border border-line bg-surface text-muted"
                  }`}
                >
                  {t.tag}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{t.name}</h3>
                  <p className="mt-1 text-sm text-muted">{t.blurb}</p>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-4xl font-bold tracking-tight">{t.price}</span>
                  <span className="text-sm text-muted">{t.unit}</span>
                </div>
                <ul className="flex flex-1 flex-col gap-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
                      <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`rounded-xl py-3.5 text-center text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98] ${
                    t.highlight
                      ? "brand-pill text-white shadow-[0_8px_30px_-8px_rgba(34,197,94,0.8)]"
                      : "border border-line text-foreground hover:border-brand-500/40"
                  }`}
                >
                  {t.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-8 text-center text-sm text-muted">
            All plans bill per <span className="font-semibold text-brand-300">live-call second</span> —
            ringing, dead air and failed connects are never charged. No setup fees. No annual lock-in.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
