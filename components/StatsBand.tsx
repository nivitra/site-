"use client";

import AnimeCounter from "./ui/AnimeCounter";
import PulseStat from "./ui/PulseStat";
import Stagger from "./ui/Stagger";

const stats = [
  { to: 100_000, suffix: "+", label: "Calls every month", compact: true },
  { to: 10, suffix: "", label: "Indian languages", compact: false },
  { to: 80, suffix: "%+", label: "Think it's a real person", compact: false },
  { to: 3.99, suffix: "", label: "Starting price · per minute", compact: false, decimals: 2, prefix: "₹" },
];

export default function StatsBand() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-surface/30">
      <Stagger className="relative mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-6 py-12 md:grid-cols-4 md:py-16">
        {stats.map((s) => (
          <div key={s.label} data-stagger>
            <PulseStat className="gap-2 text-center">
              <span className="text-3xl font-semibold tracking-tight text-brand-300 sm:text-4xl">
                {"compact" in s && s.compact ? (
                  <AnimeCounter to={s.to} compact decimals={0} suffix="+" />
                ) : (
                  <AnimeCounter
                    to={s.to}
                    prefix={"prefix" in s ? s.prefix : ""}
                    suffix={s.suffix}
                    decimals={"decimals" in s ? s.decimals : 0}
                  />
                )}
              </span>
              <span className="mx-auto max-w-[170px] text-sm leading-snug text-muted">{s.label}</span>
            </PulseStat>
          </div>
        ))}
      </Stagger>
    </section>
  );
}
