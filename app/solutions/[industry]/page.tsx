import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { industries, getIndustry } from "@/lib/industries";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/CTASection";
import SampleCall from "@/components/SampleCall";
import Stagger from "@/components/ui/Stagger";

export function generateStaticParams() {
  return industries.map((i) => ({ industry: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const { industry } = await params;
  const ind = getIndustry(industry);
  if (!ind) return {};
  return {
    title: `${ind.name} Voice AI — ${ind.fullName}`,
    description: `${ind.tagline} Live in days, in 14 Indian languages, from ₹3.99/min.`,
    keywords: [...ind.keywords, "voice AI India", "Speaksy"],
    alternates: { canonical: `/solutions/${ind.slug}` },
    openGraph: {
      title: `${ind.name} Voice AI Agents — Speaksy`,
      description: ind.tagline,
    },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry } = await params;
  const ind = getIndustry(industry);
  if (!ind) notFound();

  const others = industries.filter((i) => i.slug !== ind.slug);
  const totalUseCases = ind.groups.reduce((n, g) => n + g.items.length, 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `${ind.name} Voice AI Agents`,
        serviceType: "AI voice calling agents",
        provider: { "@type": "Organization", name: "Speaksy", url: "https://speaksy.in" },
        areaServed: "IN",
        description: ind.tagline,
        offers: { "@type": "Offer", price: "3.99", priceCurrency: "INR", description: "per live minute" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Solutions", item: "https://speaksy.in/solutions" },
          { "@type": "ListItem", position: 2, name: ind.name, item: `https://speaksy.in/solutions/${ind.slug}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: ind.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* hero */}
      <section className="grid-bg relative overflow-hidden pb-16 pt-40">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[860px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(34,197,94,0.15),transparent)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.15fr_1fr]">
          <div className="flex flex-col items-start gap-5">
            <Reveal>
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted">
                <Link href="/solutions" className="transition-colors hover:text-brand-300">Solutions</Link>
                <span aria-hidden>/</span>
                <span className="text-brand-300">{ind.name}</span>
              </nav>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-brand-300">
                  {ind.icon} {ind.name}
                </span>
                <span className="rounded-full border border-line px-4 py-1.5 text-xs font-medium text-muted">
                  {totalUseCases} production-ready use cases
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.2rem]">
                {ind.headline}
              </h1>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">{ind.tagline}</p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="brand-pill rounded-xl px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_32px_-8px_rgba(34,197,94,0.8)] transition-transform hover:scale-[1.03]"
                >
                  Book a {ind.name} demo →
                </Link>
                <Link
                  href="/pricing"
                  className="rounded-xl border border-line px-7 py-3.5 text-sm font-semibold transition-colors hover:border-brand-500/40"
                >
                  Pricing — from ₹3.99/min
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-2 flex flex-wrap gap-2">
                {ind.patterns.map((p) => (
                  <span key={p} className="rounded-full bg-white/[0.05] px-3 py-1 text-xs text-muted">
                    {p}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <SampleCall
              label={ind.sample.label}
              agent={ind.sample.agent}
              user={ind.sample.user}
              agent2={ind.sample.agent2}
              outcome={ind.sample.outcome}
              badge={ind.icon}
            />
          </Reveal>
        </div>
      </section>

      {/* outcome stat band */}
      <section className="border-y border-line bg-surface/50">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-y-8 px-6 py-12 sm:grid-cols-3">
          {ind.outcomes.map(([num, label], i) => (
            <Reveal key={label} delay={i * 0.08} className="flex flex-col items-center gap-1 text-center">
              <span className="font-mono text-3xl font-semibold text-brand-400 sm:text-4xl">{num}</span>
              <span className="max-w-[220px] text-sm text-muted">{label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* use cases, grouped */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow={`${ind.name} use cases`}
            title="What a Speaksy agent runs in production today"
            subtitle="Every flow below is structured, bounded and repeatable — with a defined human-escalation path. No improvisation, no deal-closing responsibility."
          />
          <div className="mt-14 flex flex-col gap-16">
            {ind.groups.map((group) => (
              <div key={group.name}>
                <Reveal>
                  <div className="mb-6 flex items-center gap-4">
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-300">{group.name}</h3>
                    <span className="h-px flex-1 bg-line" />
                    <span className="rounded-full bg-white/[0.05] px-3 py-1 font-mono text-xs text-muted">
                      {group.items.length}
                    </span>
                  </div>
                </Reveal>
                <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((u) => (
                    <div key={u.title} data-stagger className="card card-hover flex h-full flex-col gap-2.5 rounded-2xl p-6">
                      <h4 className="font-semibold tracking-tight">{u.title}</h4>
                      <p className="text-sm leading-relaxed text-muted">{u.desc}</p>
                    </div>
                  ))}
                </Stagger>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* where a human takes over */}
      <section className="border-y border-line bg-surface/40 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <div className="card rounded-3xl p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-500/30 bg-brand-500/10 text-lg">
                  🤝
                </span>
                <h3 className="text-xl font-semibold tracking-tight">Where the agent stops — and a human takes over</h3>
              </div>
              <p className="mt-4 leading-relaxed text-muted">{ind.escalation}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {ind.patterns.map((p) => (
                  <span key={p} className="rounded-full border border-brand-500/20 bg-brand-950/50 px-3 py-1.5 text-xs font-semibold text-brand-300">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ — static markup for SEO */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading eyebrow="FAQ" title={`${ind.name} voice AI, common questions`} />
          <div className="mt-10 flex flex-col gap-4">
            {ind.faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.06}>
                <div className="card rounded-2xl p-6">
                  <h3 className="font-semibold">{f.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* other industries — internal links */}
      <section className="border-t border-line py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted">
            Speaksy also works in
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {others.map((i) => (
              <Link
                key={i.slug}
                href={`/solutions/${i.slug}`}
                className="card card-hover rounded-full px-5 py-2.5 text-sm"
              >
                <span className="mr-1">{i.icon}</span>
                <span className="font-semibold text-brand-300">{i.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
