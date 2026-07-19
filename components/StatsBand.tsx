"use client";

import AnimeCounter from "./ui/AnimeCounter";
import PulseStat from "./ui/PulseStat";
import ScrambleOnView from "./ui/ScrambleOnView";
import Stagger from "./ui/Stagger";

const stats = [
  { to: 2_000_000, prefix: "", suffix: "+", label: "Calls handled every month", compact: true },
  { to: 14, prefix: "", suffix: "", label: "Indian languages supported", compact: false },
  { to: 83, prefix: "", suffix: "%", label: "Customers can't tell it's AI", compact: false },
  { to: 48, prefix: "", suffix: "hrs", label: "Average time to go live", compact: false },
];

export default function StatsBand() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-surface">
      <Stagger className="relative mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-6 py-14 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} data-stagger>
            <PulseStat className="gap-2 text-center">
              <span className="font-mono text-3xl font-semibold text-brand-600 sm:text-4xl">
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
