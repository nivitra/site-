import Link from "next/link";
import { languages } from "@/lib/languages";
import { industries } from "@/lib/industries";
import Logo from "./Logo";

const columns = [
  {
    title: "Platform",
    links: [
      { label: "Voice Agent Stack", href: "/platform" },
      { label: "Graph Builder", href: "/platform#graph" },
      { label: "Human Handoff", href: "/platform#handoff" },
      { label: "Integrations", href: "/integrations" },
      { label: "Security & Trust", href: "/security" },
      { label: "Benchmarks", href: "/#benchmarks" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "All Use Cases", href: "/solutions" },
      { label: "BFSI & Lending", href: "/solutions/bfsi-lending" },
      { label: "Real Estate", href: "/solutions/real-estate" },
      { label: "Healthcare", href: "/solutions/healthcare" },
      { label: "Retail & Auto", href: "/solutions/retail-automotive" },
      { label: "Case Studies", href: "/customers" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Customers", href: "/customers" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Pricing", href: "/pricing" },
      { label: "Book a Demo", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-[radial-gradient(60%_100%_at_50%_100%,rgba(34,197,94,0.12),transparent)]" />
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Logo size={36} />
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Human-grade Voice AI agents in 14 Indian languages, at a price every
              Indian business can afford.
            </p>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-300">
              🇮🇳 Built in India, Beats the World
            </span>
            <div className="mt-2 text-xs leading-relaxed text-muted">
              <p>Speak Systems Pvt. Ltd.</p>
              <p>Bengaluru · Mumbai</p>
              <p>
                <a href="mailto:hello@speaksy.in" className="transition-colors hover:text-brand-300">
                  hello@speaksy.in
                </a>
              </p>
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-semibold text-foreground">{col.title}</h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-muted transition-colors hover:text-brand-300">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* industry index — internal links for SEO */}
        <div className="mt-14 border-t border-line pt-8">
          <h4 className="mb-4 text-sm font-semibold">
            Voice AI for your industry
          </h4>
          <div className="flex flex-wrap gap-x-5 gap-y-2.5">
            {industries.map((i) => (
              <Link
                key={i.slug}
                href={`/solutions/${i.slug}`}
                className="text-sm text-muted transition-colors hover:text-brand-300"
              >
                <span className="mr-1">{i.icon}</span>
                {i.name}
              </Link>
            ))}
          </div>
        </div>

        {/* language index — internal links for SEO */}
        <div className="mt-10 border-t border-line pt-8">
          <h4 className="mb-4 text-sm font-semibold">
            Voice AI in your language
          </h4>
          <div className="flex flex-wrap gap-x-5 gap-y-2.5">
            {languages.map((l) => (
              <Link
                key={l.slug}
                href={`/languages/${l.slug}`}
                className="text-sm text-muted transition-colors hover:text-brand-300"
              >
                <span dir={l.rtl ? "rtl" : "ltr"} className="font-indic">
                  {l.native}
                </span>
                <span className="text-muted/60"> · {l.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Speak Systems Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted">
            <Link href="/privacy" className="transition-colors hover:text-brand-300">Privacy Policy</Link>
            <Link href="/terms" className="transition-colors hover:text-brand-300">Terms of Service</Link>
            <Link href="/security" className="transition-colors hover:text-brand-300">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
