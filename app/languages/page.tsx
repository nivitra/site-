import type { Metadata } from "next";
import Link from "next/link";
import { languages } from "@/lib/languages";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "10 Indian Languages — Voice AI in Hindi, Marathi, Telugu, Tamil & more",
  description:
    "Speaksy speaks 10 Indian languages natively — Hindi, Hinglish, Marathi, Telugu, Tamil, Gujarati, Kannada, Bengali, Malayalam and Punjabi. 120 Cr+ speakers reachable with one voice AI platform.",
  keywords: [
    "Indian language voice AI",
    "vernacular voice bot",
    "multilingual AI calling India",
    "regional language voicebot",
  ],
  alternates: { canonical: "/languages" },
};

export default function LanguagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Languages"
        title="10 languages. 120 crore+ speakers. One agent."
        subtitle="Built on years of listening to how India actually talks — not translated scripts. Every language is first-class: native accent, native courtesy, same price."
      />

      <div className="mx-auto max-w-6xl px-6 pb-4">
        <Link
          href="/languages/explore"
          className="brand-pill inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_18px_-4px_rgba(34,197,94,0.5)]"
        >
          Explore languages →
        </Link>
        <p className="mt-3 max-w-md text-sm text-muted">
          Enter Project Bhāratvāṇī — 8 months of field listening, mapped across
          India.
        </p>
      </div>

      <section className="pb-24 pt-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {languages.map((l, i) => (
              <Reveal key={l.slug} delay={(i % 3) * 0.08}>
                <Link
                  href={`/languages/${l.slug}`}
                  className="card card-hover group flex h-full flex-col gap-3 rounded-2xl p-6"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-3xl font-semibold text-brand-300" dir={l.rtl ? "rtl" : "ltr"}>
                      {l.native}
                    </span>
                    <span className="rounded-full bg-white/[0.06] px-3 py-1 font-mono text-xs text-muted">
                      {l.speakers}
                    </span>
                  </div>
                  <p className="text-sm font-semibold">{l.name}</p>
                  <p className="line-clamp-2 text-sm leading-relaxed text-muted">{l.tagline}</p>
                  <p className="mt-auto text-xs text-muted">
                    {l.regions.slice(0, 3).join(" · ")}
                  </p>
                  <span className="text-sm font-semibold text-brand-400 transition-colors group-hover:text-brand-300">
                    Explore {l.name} agents →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface/40 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Why it matters"
            title="Language is not a feature. In India, it's the funnel."
            subtitle="Customers trust, remember and pay in their mother tongue. English-only automation quietly loses everyone else."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ["88%", "of Indians prefer conversations in their own language over English", "Speaking the customer's language isn't polish — it's the difference between a hang-up and a payment promise."],
              ["1600+", "dialects spoken across India's states and districts", "Speaksy's accent models are tuned regionally, so a Puneri customer and a Varhadi customer both hear 'home'."],
              ["0", "extra rupees charged for regional languages", "Global platforms treat Indic languages as premium add-ons. For us they're the whole point."],
            ].map(([n, l, d], i) => (
              <Reveal key={l} delay={i * 0.1}>
                <div className="card h-full rounded-2xl p-7">
                  <p className="font-mono text-4xl font-bold text-brand-400">{n}</p>
                  <p className="mt-2 text-sm font-semibold">{l}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
