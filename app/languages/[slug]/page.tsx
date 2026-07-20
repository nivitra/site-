import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { languages, getLanguage } from "@/lib/languages";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/CTASection";

export function generateStaticParams() {
  return languages.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lang = getLanguage(slug);
  if (!lang) return {};
  return {
    title: `${lang.name} Voice AI Agent — AI Calling in ${lang.name}`,
    description: `Deploy human-grade ${lang.name} (${lang.native}) voice AI agents for collections, sales, support and bookings. Native ${lang.scriptName} speech, ${lang.speakers} speakers reachable, from ₹3.99/min. ${lang.tagline}`,
    keywords: [...lang.keywords, "voice AI India", "Speaksy"],
    alternates: { canonical: `/languages/${lang.slug}` },
    openGraph: {
      title: `${lang.name} Voice AI — Speaksy`,
      description: lang.tagline,
    },
  };
}

const langFaqs = (name: string, native: string, dialects: string) => [
  {
    q: `How natural does the ${name} voice sound?`,
    a: `Speaksy's ${name} voices are trained on real Indian call audio, not translated text-to-speech. They handle honorifics, numbers, dates and currency the way a native speaker says them, with correct prosody in ${native}. ${dialects}.`,
  },
  {
    q: `Can the agent switch between ${name} and Hindi or English mid-call?`,
    a: `Yes. Indian customers code-switch constantly, and Speaksy follows them — if a customer drifts from ${name} into Hindi or English mid-sentence, the agent understands and responds in kind without missing a beat.`,
  },
  {
    q: `What does a ${name} voice agent cost?`,
    a: `The same as every Speaksy language: from ₹3.99 per live minute, billed per second of actual talk-time. Regional languages are not a premium add-on — they are the product.`,
  },
  {
    q: `How fast can we launch a ${name} campaign?`,
    a: `With a pre-built template, the same day. A custom flow with your script and CRM integration typically goes live in 3–5 days. You can test the agent on your own phone before dialing a single customer.`,
  },
];

export default async function LanguagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lang = getLanguage(slug);
  if (!lang) notFound();

  const faqs = langFaqs(lang.name, lang.native, lang.dialects);
  const others = languages.filter((l) => l.slug !== lang.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `${lang.name} Voice AI Agent`,
        provider: { "@type": "Organization", name: "Speaksy" },
        areaServed: "IN",
        description: lang.tagline,
        offers: { "@type": "Offer", price: "3.99", priceCurrency: "INR", description: "per live minute" },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
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
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col items-start gap-5">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-brand-300">
                  🇮🇳 Voice AI in {lang.name}
                </span>
                <span className="rounded-full border border-line px-4 py-1.5 text-xs font-medium text-muted">
                  {lang.scriptName} · {lang.speakers} speakers
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.4rem]">
                <span className="font-indic text-gradient">{lang.native}</span>
                {lang.native !== lang.name && (
                  <span className="mt-1 block text-2xl font-medium text-muted sm:text-3xl">
                    {lang.name} voice agents that sound local
                  </span>
                )}
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">{lang.tagline}</p>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="brand-pill rounded-xl px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_32px_-8px_rgba(34,197,94,0.8)] transition-transform hover:scale-[1.03]"
                >
                  Hear a {lang.name} demo call →
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
                {lang.regions.map((r) => (
                  <span key={r} className="rounded-full bg-black/5 px-3 py-1 text-xs text-muted">
                    {r}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* sample conversation */}
          <Reveal delay={0.2}>
            <div
              className="card flex flex-col gap-3 rounded-3xl p-6"
              dir={lang.rtl ? "rtl" : "ltr"}
            >
              <div className="flex items-center justify-between" dir="ltr">
                <span className="flex items-center gap-2 text-xs font-semibold text-muted">
                  <span className="relative flex h-2 w-2 rounded-full bg-brand-400 live-dot" />
                  SAMPLE {lang.name.toUpperCase()} CALL · EMI REMINDER
                </span>
                <span className="brand-pill flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white">
                  Sy
                </span>
              </div>
              <div className={`font-indic max-w-[88%] rounded-2xl bg-brand-900/70 px-4 py-3 text-sm leading-relaxed text-[#d8f5e0] ${lang.rtl ? "self-start rounded-br-sm text-right" : "self-start rounded-bl-sm"}`}>
                {lang.dialogue.agent}
              </div>
              <div className={`font-indic max-w-[88%] rounded-2xl bg-white/10 px-4 py-3 text-sm leading-relaxed ${lang.rtl ? "self-end rounded-bl-sm text-right" : "self-end rounded-br-sm"}`}>
                {lang.dialogue.user}
              </div>
              <div className={`font-indic max-w-[88%] rounded-2xl bg-brand-900/70 px-4 py-3 text-sm leading-relaxed text-[#d8f5e0] ${lang.rtl ? "self-start rounded-br-sm text-right" : "self-start rounded-bl-sm"}`}>
                {lang.dialogue.agent2}
              </div>
              <div className="mt-1 flex items-center justify-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold text-brand-300" dir="ltr">
                Outcome: Payment promised · disposition logged to CRM
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* stat band */}
      <section className="border-y border-line bg-surface/50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-6 py-12 md:grid-cols-4">
          {[
            [lang.speakers, `${lang.name} speakers in India`],
            [String(lang.regions.length), "key regions covered"],
            [String(lang.voices.length) + "+", "production voices"],
            ["<800ms", "response latency"],
          ].map(([n, l], i) => (
            <Reveal key={l} delay={i * 0.08} className="flex flex-col items-center gap-1 text-center">
              <span className="font-mono text-3xl font-semibold text-brand-400">{n}</span>
              <span className="max-w-[170px] text-sm text-muted">{l}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* use cases */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow={`${lang.name} use cases`}
            title={`Where ${lang.name} voice agents win business`}
            subtitle={`Built for the industries that actually run on ${lang.name} conversations — not generic global templates.`}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {lang.useCases.map((u, i) => (
              <Reveal key={u.title} delay={i * 0.1}>
                <div className="card card-hover flex h-full flex-col gap-3 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold">{u.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{u.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* voices & dialects */}
      <section className="border-y border-line bg-surface/40 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2">
          <Reveal>
            <div className="card h-full rounded-3xl p-8">
              <h3 className="text-xl font-semibold">Production voices in {lang.name}</h3>
              <p className="mt-2 text-sm text-muted">
                Every voice is tuned on native speech — honorifics, currency, dates and numbers read the way people actually say them.
              </p>
              <div className="mt-6 flex flex-col gap-4">
                {lang.voices.map((v) => (
                  <div key={v.name} className="flex items-center gap-4 rounded-2xl bg-white/[0.04] p-4">
                    <span className="brand-pill flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white">
                      {v.name[0]}
                    </span>
                    <div>
                      <p className="font-semibold">{v.name}</p>
                      <p className="text-xs text-muted">{v.style}</p>
                    </div>
                    <span className="ml-auto flex h-6 items-end gap-[2px]">
                      {[8, 14, 10, 16, 7, 12].map((h, i) => (
                        <span key={i} className="w-[3px] rounded-full bg-brand-400/70" style={{ height: h }} />
                      ))}
                    </span>
                  </div>
                ))}
                <p className="text-xs text-muted">
                  + custom voice cloning available on Enterprise plans.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="card h-full rounded-3xl p-8">
              <h3 className="text-xl font-semibold">Dialects & code-switching</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{lang.dialects}.</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Customers rarely stay in one language. Speaksy&apos;s speech models follow them across{" "}
                {lang.name}, Hindi and English mid-sentence — and reply in whichever register the
                customer used last.
              </p>
              <div className="mt-6 rounded-2xl border border-brand-500/20 bg-brand-950/60 p-5">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-400">
                  Agent greeting
                </p>
                <p className="font-indic text-lg leading-relaxed text-brand-300" dir={lang.rtl ? "rtl" : "ltr"}>
                  {lang.greeting}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ (static markup for SEO) */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading
            eyebrow="FAQ"
            title={`${lang.name} voice AI, common questions`}
          />
          <div className="mt-10 flex flex-col gap-4">
            {faqs.map((f, i) => (
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

      {/* other languages — internal links */}
      <section className="border-t border-line py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted">
            Speaksy also speaks
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {others.map((l) => (
              <Link
                key={l.slug}
                href={`/languages/${l.slug}`}
                className="card card-hover rounded-full px-5 py-2.5 text-sm"
              >
                <span className="font-indic font-semibold text-brand-300">{l.native}</span>{" "}
                <span className="text-muted">· {l.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
