import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import IndustriesTabs from "@/components/IndustriesTabs";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { industries, patterns } from "@/lib/industries";

export const metadata: Metadata = {
  title: "Solutions — Voice AI Use Cases by Industry",
  description:
    "150+ production-ready voice AI use cases across 7 industries — BFSI & lending, real estate, EdTech, healthcare, retail & automotive, telecom & IT, and travel & hospitality. Lead qualification, collections, COD confirmation, appointment booking and more.",
  alternates: { canonical: "/solutions" },
  keywords: [
    "voice AI use cases India",
    "AI calling agent solutions",
    "industry voice bot templates",
    "voice AI for BFSI healthcare real estate",
  ],
};

const totalUseCases = industries.reduce(
  (n, i) => n + i.groups.reduce((m, g) => m + g.items.length, 0),
  0
);

const useCases = [
  {
    icon: "🎯",
    title: "Lead qualification",
    body: "Call every inbound lead within 60 seconds, qualify with your exact criteria, and push hot leads to your sales team's calendar — with the recording attached in your CRM.",
    kpi: "2.7x more qualified meetings",
  },
  {
    icon: "💰",
    title: "Collections & reminders",
    body: "EMI dues, policy renewals, fee payments. Capture promises-to-pay, send payment links on WhatsApp mid-call, and auto-schedule retries for non-connects.",
    kpi: "3.2x payment promises",
  },
  {
    icon: "📦",
    title: "COD & order confirmation",
    body: "Confirm cash-on-delivery orders minutes after checkout, verify addresses on NDR, and rescue abandoned carts with a friendly voice nudge.",
    kpi: "38% lower RTO",
  },
  {
    icon: "📅",
    title: "Appointment booking",
    body: "Book, confirm, reschedule — synced live with Google Calendar or your HMS/CRM. Send reminders that actually get picked up, because they're calls.",
    kpi: "41% fewer no-shows",
  },
  {
    icon: "🎧",
    title: "Inbound support automation",
    body: "Replace IVR trees ('press 1 for…') with natural conversation. Resolve order status, KYC steps and FAQs instantly; hand off complex cases to humans with context.",
    kpi: "70% queries deflected",
  },
  {
    icon: "📋",
    title: "Surveys & feedback",
    body: "Post-delivery NPS, CSAT, exit interviews and market research at a scale and cost SMS could never match — with sentiment analysis on every answer.",
    kpi: "5x survey completion",
  },
];

const steps = [
  ["01", "Pick a template", "Start from a battle-tested industry agent or a blank graph. Write your script in any language — or paste your existing telecaller script."],
  ["02", "Connect your stack", "Point your telephony, CRM and calendar at Speaksy. Upload leads via CSV or fire our API from your backend."],
  ["03", "Test with your own phone", "Call the agent yourself, interrupt it, argue with it, switch languages mid-sentence. Tune until it feels right."],
  ["04", "Launch & watch outcomes", "Go live in days, not months. Dispositions, recordings and QA scores stream into your dashboard in real time."],
];

export default function SolutionsPage() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Speaksy Voice AI Solutions by Industry",
    itemListElement: industries.map((i, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: i.fullName,
      url: `https://speaksy.in/solutions/${i.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <PageHero
        eyebrow="Solutions"
        title="Wherever a phone call moves money, Speaksy works."
        subtitle={`${totalUseCases}+ production-ready use cases across 7 industries — tuned on real Indian conversations, live in days, with a human always one warm handoff away.`}
      />

      {/* industry directory — the SEO + navigation backbone */}
      <section className="pb-16 pt-6">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => {
              const count = ind.groups.reduce((m, g) => m + g.items.length, 0);
              return (
                <Reveal key={ind.slug} delay={(i % 3) * 0.08}>
                  <Link
                    href={`/solutions/${ind.slug}`}
                    className="card card-hover group flex h-full flex-col gap-3 rounded-2xl p-6"
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-3xl">{ind.icon}</span>
                      <span className="rounded-full bg-white/[0.06] px-3 py-1 font-mono text-xs text-muted">
                        {count} use cases
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight">{ind.name}</h3>
                    <p className="flex-1 text-sm leading-relaxed text-muted">{ind.tag}</p>
                    <span className="mt-1 text-sm font-semibold text-brand-400 transition-colors group-hover:text-brand-300">
                      Explore {ind.name} agents →
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* cross-industry solution templates */}
      <section className="border-t border-line py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="By use case"
            title="Six calling problems, solved out of the box."
            subtitle="The same battle-tested flows show up in every industry. Start from one and make it yours."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u, i) => (
              <Reveal key={u.title} delay={(i % 3) * 0.1}>
                <div className="card card-hover flex h-full flex-col gap-3 rounded-2xl p-6">
                  <span className="text-2xl">{u.icon}</span>
                  <h3 className="text-lg font-semibold tracking-tight">{u.title}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-muted">{u.body}</p>
                  <span className="mt-1 w-fit rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-300">
                    {u.kpi}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <IndustriesTabs />

      {/* why these work — the cross-industry patterns */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Why these work"
            title="Six proven templates behind every use case."
            subtitle="The agent never improvises beyond its knowledge base, never carries deal-closing responsibility, and always has a defined human-escalation path. That's exactly where 2025–26 voice agents match or beat human consistency."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {patterns.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.09}>
                <div className="card h-full rounded-2xl p-6">
                  <h3 className="font-semibold tracking-tight text-brand-300">{p.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
                  <p className="mt-4 border-t border-line pt-3 text-xs text-muted">{p.examples}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* how it works */}
      <section className="border-t border-line py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="How it works"
            title="From script to live calls in four steps."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map(([n, title, body], i) => (
              <Reveal key={n} delay={i * 0.12}>
                <div className="card relative h-full rounded-2xl p-6 pt-8">
                  <span className="absolute -top-4 left-6 brand-pill rounded-xl px-3 py-1.5 font-mono text-sm font-bold text-white">
                    {n}
                  </span>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <CTASection />
    </>
  );
}
