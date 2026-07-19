import Link from "next/link";
import { languages } from "@/lib/languages";
import { industries } from "@/lib/industries";
import Logo from "./Logo";

const columns = [
  {
    title: "Product",
    links: [
      { label: "How It Works", href: "/platform" },
      { label: "Smart Handoff", href: "/platform#handoff" },
      { label: "Integrations", href: "/integrations" },
      { label: "Security", href: "/security" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "All Industries", href: "/solutions" },
      { label: "E-commerce", href: "/solutions/ecommerce" },
      { label: "Automotive", href: "/solutions/automotive" },
      { label: "Lending & Collections", href: "/solutions/bfsi-lending" },
      { label: "Insurance", href: "/solutions/insurance" },
      { label: "Brokerage & Capital", href: "/solutions/brokerage-capital-markets" },
      { label: "Customer Stories", href: "/customers" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Logo size={36} />
            <p className="max-w-xs text-sm font-semibold tracking-tight text-foreground">
              Built In India, Beats The World
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Your customer calls, handled beautifully — in 14 Indian languages, every hour of the day.
            </p>
            <div className="mt-2 text-xs leading-relaxed text-muted">
              <p>Speak Systems Pvt. Ltd.</p>
              <p>Bengaluru · Mumbai</p>
              <p>
                <a href="mailto:hello@speaksy.in" className="transition-colors hover:text-brand-600">
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
                    <Link href={l.href} className="text-sm text-muted transition-colors hover:text-brand-600">
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
          <h4 className="mb-4 text-sm font-semibold text-foreground">
            Calling solutions for your industry
          </h4>
          <div className="flex flex-wrap gap-x-5 gap-y-2.5">
            {industries.map((i) => (
              <Link
                key={i.slug}
                href={`/solutions/${i.slug}`}
                className="text-sm text-muted transition-colors hover:text-brand-600"
              >
                <span className="mr-1">{i.icon}</span>
                {i.name}
              </Link>
            ))}
          </div>
        </div>

        {/* language index — internal links for SEO */}
        <div className="mt-10 border-t border-line pt-8">
          <h4 className="mb-4 text-sm font-semibold text-foreground">
            Speaks your customer's language
          </h4>
          <div className="flex flex-wrap gap-x-5 gap-y-2.5">
            {languages.map((l) => (
              <Link
                key={l.slug}
                href={`/languages/${l.slug}`}
                className="text-sm text-muted transition-colors hover:text-brand-600"
              >
                <span dir={l.rtl ? "rtl" : "ltr"} className="font-indic">
                  {l.native}
                </span>
                <span className="text-muted/50"> · {l.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Speak Systems Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted">
            <Link href="/privacy" className="transition-colors hover:text-brand-600">Privacy Policy</Link>
            <Link href="/terms" className="transition-colors hover:text-brand-600">Terms of Service</Link>
            <Link href="/security" className="transition-colors hover:text-brand-600">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
