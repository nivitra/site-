"use client";

import Reveal from "./Reveal";
import SplitReveal from "./SplitReveal";
import ScrambleOnView from "./ScrambleOnView";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const alignCls = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";
  return (
    <Reveal className={`flex max-w-3xl flex-col gap-4 ${alignCls}`}>
      <ScrambleOnView
        as="span"
        className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-300"
        duration={650}
        chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      >
        {eyebrow}
      </ScrambleOnView>
      <SplitReveal
        as="h2"
        mode="words"
        onMount={false}
        staggerMs={42}
        className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]"
      >
        {title}
      </SplitReveal>
      {subtitle && (
        <p className="text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p>
      )}
    </Reveal>
  );
}
