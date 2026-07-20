import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/posts";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/ui/Reveal";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Blog — Voice AI for Indian business",
  description:
    "Field notes from Speaksy: real estate leads, RTO, code-switching, healthcare phones, and how voice AI actually works for non-tech founders.",
  alternates: { canonical: "/blog" },
};

const fmtDate = (d: string) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function BlogPage() {
  const [lead, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Field notes from the frontline of Indian voice AI."
        subtitle={`${posts.length} articles on real conversations, real languages, and real ROI — written for founders who answer the phone.`}
      />

      <section className="pb-24 pt-8">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <Link
              href={`/blog/${lead.slug}`}
              className="card card-hover group grid gap-8 rounded-3xl p-8 sm:p-10 lg:grid-cols-[1.4fr_1fr]"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="rounded-full border border-brand-500/40 bg-brand-500/10 px-3 py-1 font-semibold text-brand-700">
                    Featured
                  </span>
                  <span className="text-muted">
                    {lead.category} · {fmtDate(lead.date)} · {lead.readMins} min
                    read
                  </span>
                </div>
                <h2 className="text-2xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-brand-700 sm:text-3xl">
                  {lead.title}
                </h2>
                <p className="leading-relaxed text-muted">{lead.excerpt}</p>
                <span className="mt-auto text-sm font-semibold text-brand-600">
                  Read the full article →
                </span>
              </div>
              <div className="hidden flex-col justify-between rounded-2xl border border-brand-500/15 bg-emerald-50/50 p-6 lg:flex">
                <p className="font-mono text-5xl leading-none text-brand-500/40">
                  &ldquo;
                </p>
                <p className="text-sm italic leading-relaxed text-foreground/80">
                  {lead.highlights[0] || lead.excerpt.slice(0, 120)}
                </p>
                <p className="mt-4 text-xs text-muted">
                  — {lead.author}, {lead.role}
                </p>
              </div>
            </Link>
          </Reveal>

          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.06}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="card card-hover group flex h-full flex-col gap-3 rounded-2xl p-6"
                >
                  <span className="w-fit rounded-full border border-line bg-surface px-3 py-1 text-[11px] font-semibold text-muted">
                    {p.category}
                  </span>
                  <h3 className="text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-brand-700">
                    {p.title}
                  </h3>
                  <p className="line-clamp-3 text-sm leading-relaxed text-muted">
                    {p.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-3 text-xs text-muted">
                    <span>{p.author}</span>
                    <span>
                      {fmtDate(p.date)} · {p.readMins} min
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
