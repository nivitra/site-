import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/ui/Reveal";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import { customerCases } from "@/lib/customers";

export const metadata: Metadata = {
  title: "Customers & Case Studies",
  description:
    "How Indian NBFCs, D2C brands and EdTechs use Speaksy voice AI: 61% lower cost per payment promise, 38% RTO reduction, 2.7x demo bookings. Full case studies.",
  alternates: { canonical: "/customers" },
};

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
          {customerCases.map((c, i) => (
            <Reveal key={c.company} delay={i * 0.05}>
              <article className="card overflow-hidden rounded-3xl">
                <div className="grid lg:grid-cols-[1.5fr_1fr]">
                  <div className="flex flex-col gap-5 p-8 sm:p-10">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="brand-pill rounded-xl px-4 py-1.5 text-sm font-bold text-white">
                        {c.company}
                      </span>
                      <span className="text-xs text-muted">{c.sector}</span>
                      <span className="rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-[11px] font-semibold text-brand-600">
                        🗣 {c.lang}
                      </span>
                    </div>
                    <h2 className="text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
                      {c.headline}
                    </h2>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
                        The problem
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{c.challenge}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
                        What we built
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{c.solution}</p>
                    </div>
                    <blockquote className="mt-2 border-l-2 border-brand-500 pl-4">
                      <p className="text-sm italic leading-relaxed text-foreground/85">
                        &ldquo;{c.quote}&rdquo;
                      </p>
                      <p className="mt-2 text-xs text-muted">
                        — {c.person}, {c.company}
                      </p>
                    </blockquote>
                  </div>
                  <div className="grid grid-cols-2 content-center gap-4 border-t border-line bg-brand-950/40 p-8 lg:border-l lg:border-t-0">
                    {c.results.map(([n, l]) => (
                      <div key={l} className="rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-line">
                        <p className="font-mono text-2xl font-bold text-brand-600 sm:text-3xl">{n}</p>
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
