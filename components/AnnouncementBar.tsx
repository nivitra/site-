import Link from "next/link";

export default function AnnouncementBar() {
  return (
    <div className="relative z-[60] border-b border-brand-800/40 bg-brand-950">
      <div className="mx-auto flex max-w-[1400px] items-center justify-center gap-x-3 gap-y-1 px-4 py-2 text-center text-[12px] leading-snug text-brand-700 sm:text-[13px]">
        <span className="font-semibold tracking-tight text-brand-700">
          Built In India, Beats The World
        </span>
        <span className="hidden text-brand-600/50 sm:inline" aria-hidden>
          ·
        </span>
        <Link
          href="/contact"
          className="font-medium text-brand-600 underline underline-offset-2 transition-colors hover:text-brand-700"
        >
          Book your demo!
        </Link>
      </div>
    </div>
  );
}
