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
  title: "Solutions — What Speaksy Can Do for Your Business",
  description:
    "150+ ready-to-use calling scenarios across 7 industries — from finance and healthcare to retail and education. Lead follow-ups, appointment booking, order confirmation, collections and more.",
  alternates: { canonical: "/solutions" },
  keywords: [
    "AI calling solutions India",
    "business phone automation",
    "customer call assistant",
    "voice AI for finance healthcare retail",
  ],
};

const totalUseCases = industries.reduce(
  (n, i) => n + i.groups.reduce((m, g) => m + g.items.length, 0),
  0
);

const useCases = [
  {
    icon: "🎯",
    title: "Follow up on every new lead",
    body: "Call every new enquiry within 60 seconds, ask the right qualifying questions, and send only the hot leads to your sales team — with the recording already in your CRM.",
    kpi: "2.7x more qualified meetings",
  },
  {
    icon: "💰",
    title: "Payment reminders & collections",
    body: "EMI dues, renewal notices, fee payments. Capture promises to pay, send payment links during the call, and automatically retry customers who didn't pick up.",
    kpi: "3.2x more payment commitments",
  },
  {
    icon: "📦",
    title: "Order confirmation & delivery",
    body: "Confirm cash-on-delivery orders immediately after checkout, verify addresses on missed deliveries, and win back customers who didn't complete their purchase.",
    kpi: "38% fewer failed deliveries",
  },
  {
    icon: "📅",
    title: "Appointment booking & reminders",
    body: "Book, confirm, and reschedule — synced live with your calendar. Send voice reminders that customers actually answer, because a call feels personal.",
    kpi: "41% fewer no-shows",
  },
  {
    icon: "🎧",
    title: "Inbound customer support",
    body: "Replace press-1-for-billing menus with real conversation. Answer order status, common questions, and routine requests instantly — and transfer anything complex to your team.",
    kpi: "70% of queries handled instantly",
  },
  {
    icon: "📋",
    title: "Customer feedback & surveys",
    body: "Post-delivery satisfaction checks, NPS calls, exit interviews — at a scale and cost no other channel can match, with automatic sentiment analysis on every response.",
    kpi: "5x survey completion rate",
  },
];

const steps = [
  ["01", "Pick your starting point", "Choose from a ready-made template for your industry or start from scratch. Paste in your current telecaller script if you have one."],
  ["02", "Connect your business tools", "Link your phone setup, CRM, and calendar. Upload your contacts via file or connect your system directly."],
  ["03", "Try it yourself first", "Call the assistant yourself. Interrupt it, push back, switch languages. Adjust until it sounds exactly like your business."],
  ["04", "Go live and track results", "Launch in days. See call outcomes, recordings, and quality scores stream into your dashboard in real time."],
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
        title="Every call that moves your business forward."
        subtitle={`${totalUseCases}+ ready-to-use scenarios across 7 industries — built on real Indian business conversations, live within days, always with a human available when needed.`}
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
            eyebrow="By Use Case"
            title="The six calling tasks every business needs handled."
            subtitle="These are the most common scenarios we see across every industry. Pick one and it's ready to use in days."
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
            eyebrow="Why These Work"
            title="Calling tasks where an AI assistant consistently outperforms a team."
            subtitle="Speaksy works best for defined, repeatable conversations where consistency and speed matter more than improvisation. That's where it matches — and often beats — even great human callers."
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
            eyebrow="How to Get Started"
            title="From sign-up to live calls in four steps."
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
