"use client";

import AnimeCounter from "./ui/AnimeCounter";
import PulseStat from "./ui/PulseStat";
import ScrambleOnView from "./ui/ScrambleOnView";
import Stagger from "./ui/Stagger";

const stats = [
  { to: 800, prefix: "<", suffix: "ms", label: "End-to-end voice latency", compact: false },
  { to: 2_000_000, prefix: "", suffix: "+", label: "Calls handled every month", compact: true },
  { to: 14, prefix: "", suffix: "", label: "Indian languages, native accents", compact: false },
  { to: 68, prefix: "", suffix: "%", label: "Cheaper than any alternative", compact: false },
];

export default function StatsBand() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-surface/50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.06),transparent_65%)]" />
      <Stagger className="relative mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-6 py-14 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} data-stagger>
            <PulseStat className="gap-2 text-center">
              <span className="font-mono text-3xl font-semibold text-brand-400 sm:text-4xl">
                {s.compact ? (
                  <AnimeCounter to={s.to} compact decimals={0} suffix="+" />
                ) : (
                  <AnimeCounter to={s.to} prefix={s.prefix} suffix={s.suffix} />
                )}
              </span>
              <ScrambleOnView
                className="max-w-[180px] text-sm text-muted"
                duration={700}
                chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ "
              >
                {s.label}
              </ScrambleOnView>
            </PulseStat>
          </div>
        ))}
      </Stagger>
    </section>
  );
}
