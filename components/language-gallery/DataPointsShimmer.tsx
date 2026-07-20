/**
 * Static research badge for the drag gallery.
 * Reads like a named field project — not a live dashboard counter.
 */
export default function DataPointsShimmer() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-14 z-40 flex justify-center px-4 sm:top-16">
      <div className="lang-datapoints relative max-w-[min(100%,34rem)] overflow-hidden rounded-2xl border border-white/12 bg-black/50 px-5 py-3 backdrop-blur-md sm:rounded-full sm:px-8 sm:py-3.5">
        <span aria-hidden className="lang-datapoints-shimmer" />
        <div className="relative flex flex-col items-center gap-1 text-center sm:flex-row sm:items-baseline sm:gap-4 sm:text-left">
          <div className="flex flex-col items-center gap-0.5 sm:items-start">
            <span className="text-[9px] font-semibold tracking-[0.22em] text-brand-400 uppercase sm:text-[10px]">
              Project Bhāratvāṇī
            </span>
            <span className="font-mono text-[15px] font-semibold tracking-tight text-white sm:text-lg">
              48,000+ hours
            </span>
          </div>
          <span
            aria-hidden
            className="hidden h-8 w-px bg-white/15 sm:block"
          />
          <p className="max-w-[16rem] text-[10px] font-medium leading-snug tracking-[0.08em] text-white/55 uppercase sm:max-w-none sm:text-[11px]">
            8 months of field listening · real calls across India · private
            speech corpus
          </p>
        </div>
      </div>
    </div>
  );
}
