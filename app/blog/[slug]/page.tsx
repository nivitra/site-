import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost } from "@/lib/posts";
import Reveal from "@/components/ui/Reveal";
import CTASection from "@/components/CTASection";
import BlogPostBody from "@/components/blog/BlogPostBody";
import BlogTakeawaysArc from "@/components/blog/BlogTakeawaysArc";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

const fmtDate = (d: string) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = posts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);
  const relatedFallback =
    related.length >= 3
      ? related
      : posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  // Split body: intro blocks, then optional arc, then rest
  const mid = Math.min(Math.max(4, Math.floor(post.body.length / 2)), post.body.length - 2);
  const before = post.body.slice(0, mid);
  const after = post.body.slice(mid);
  const showArc = Boolean(post.arc && post.arc.length >= 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: "Speaksy" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="relative bg-white pb-16 pt-36 sm:pt-40">
        <div className="mx-auto max-w-2xl px-6">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <Link
                href="/blog"
                className="font-semibold text-brand-600 hover:text-brand-700"
              >
                ← All articles
              </Link>
              <span className="rounded-full border border-line bg-surface px-3 py-1 font-semibold text-muted">
                {post.category}
              </span>
              <span className="text-muted">
                {fmtDate(post.date)} · {post.readMins} min read
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-6 text-3xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-4xl">
              {post.title}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-6 flex items-center gap-3 border-b border-line pb-8">
              <span className="brand-pill flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white">
                {post.author[0]}
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {post.author}
                </p>
                <p className="text-xs text-muted">{post.role}, Speaksy</p>
              </div>
            </div>
          </Reveal>

          <BlogPostBody blocks={before} highlights={post.highlights} />
        </div>

        {showArc && post.arc && <BlogTakeawaysArc items={post.arc} />}

        <div className="mx-auto max-w-2xl px-6">
          {after.length > 0 && (
            <BlogPostBody blocks={after} highlights={post.highlights} />
          )}
        </div>
      </article>

      <section className="border-t border-line bg-surface/40 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-8 text-xs font-semibold uppercase tracking-[0.25em] text-muted">
            Keep reading
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {relatedFallback.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="card card-hover flex h-full flex-col gap-2 rounded-2xl p-6"
              >
                <span className="text-[11px] font-semibold text-muted">
                  {p.category}
                </span>
                <h3 className="font-semibold leading-snug text-foreground">
                  {p.title}
                </h3>
                <span className="mt-auto pt-2 text-xs text-muted">
                  {p.readMins} min read
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
