import Link from "next/link";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="grid-bg relative flex min-h-[70vh] flex-col items-center justify-center px-6 py-32 text-center">
      <div className="pointer-events-none absolute -top-20 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(34,197,94,0.14),transparent)]" />
      <div className="relative flex flex-col items-center gap-6">
        <Logo href="/" size={48} />
        <p className="font-mono text-sm font-semibold tracking-widest text-brand-400">404</p>
        <h1 className="max-w-md text-3xl font-semibold tracking-tight sm:text-4xl">
          This number is out of service.
        </h1>
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          The page you dialed doesn&apos;t exist. Maybe the agent hung up — or the link is wrong.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="brand-pill rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_32px_-8px_rgba(34,197,94,0.7)]"
          >
            Go home
          </Link>
          <Link
            href="/contact"
            className="rounded-xl border border-line px-6 py-3 text-sm font-semibold transition-colors hover:border-brand-500/40"
          >
            Book a demo
          </Link>
          <Link
            href="/languages"
            className="rounded-xl border border-line px-6 py-3 text-sm font-semibold transition-colors hover:border-brand-500/40"
          >
            Browse languages
          </Link>
        </div>
      </div>
    </section>
  );
}
