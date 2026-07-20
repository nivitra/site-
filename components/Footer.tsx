import Image from "next/image";
import Link from "next/link";
import { languages } from "@/lib/languages";

/** Speak Systems company pill from 51.png — cropped, ~4.5:1 */
const SPEAK_SYSTEMS_LOGO = "/brand/logo-speak-systems-720.png";
const SPEAK_SYSTEMS_ASPECT = 720 / 160;

const columns = [
  {
    title: "Product",
    links: [
      { label: "Platform", href: "/platform" },
      { label: "Pricing", href: "/pricing" },
      { label: "Languages", href: "/languages" },
      { label: "Security", href: "/security" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "E-commerce", href: "/solutions/ecommerce" },
      { label: "Lending & Collections", href: "/solutions/bfsi-lending" },
      { label: "Insurance", href: "/solutions/insurance" },
      { label: "Healthcare", href: "/solutions/healthcare" },
      { label: "Industry Intelligence", href: "/solutions" },
      { label: "Customer stories", href: "/customers" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Lab", href: "/lab" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-white">
      {/* CTA band */}
      <div className="border-b border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 px-6 py-10 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Ready for calls that sound human?
            </h3>
            <p className="mt-1 text-sm text-muted">
              See Speaksy on a real conversation — free, no commitment.
            </p>
          </div>
          <Link
            href="/contact"
            className="brand-pill shrink-0 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_24px_-6px_rgba(34,197,94,0.45)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Book a free demo
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-3.5 sm:col-span-2 lg:col-span-1">
            {/* Company mark (51.png) — not product Speaksy pill */}
            <Link
              href="/"
              className="inline-flex shrink-0 self-start leading-none"
              aria-label="Speak Systems home"
            >
              <Image
                src={SPEAK_SYSTEMS_LOGO}
                alt="Speak Systems"
                width={Math.round(36 * SPEAK_SYSTEMS_ASPECT)}
                height={36}
                className="h-9 w-auto object-contain object-left"
                priority={false}
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              AI phone agents that sound human — in 10 Indian languages, tuned
              to your business.
            </p>
            <div className="flex max-w-sm flex-col gap-1">
              <p className="text-sm font-medium text-foreground">
                Speak Systems Pvt. Ltd.
              </p>
              <p className="text-[12px] leading-relaxed text-zinc-500">
                Bengaluru · Mumbai · Hyderabad · Visakhapatnam · Bhubaneswar
              </p>
              <a
                href="mailto:hello@speaksy.in"
                className="text-[12px] text-zinc-500 transition-colors hover:text-brand-600"
              >
                hello@speaksy.in
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-sm font-semibold text-foreground">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted transition-colors hover:text-brand-600"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Languages strip — simpler */}
        <div className="mt-12 border-t border-line pt-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-2">
            Languages
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {languages.map((l) => (
              <Link
                key={l.slug}
                href={`/languages/${l.slug}`}
                className="text-sm text-muted transition-colors hover:text-brand-600"
              >
                <span className="font-indic" dir={l.rtl ? "rtl" : "ltr"}>
                  {l.native}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-line pt-8 text-xs text-muted-2 sm:flex-row">
          <p>© {new Date().getFullYear()} Speak Systems Pvt. Ltd.</p>
          <div className="flex gap-5">
            <Link
              href="/privacy"
              className="transition-colors hover:text-brand-600"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-brand-600"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
