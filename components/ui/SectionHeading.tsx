"use client";

import Reveal from "./Reveal";

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
    <Reveal className={`flex max-w-2xl flex-col gap-3 ${alignCls}`}>
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-400">
        {eyebrow}
      </span>
      <h2 className="text-[1.65rem] font-semibold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-[2.15rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-xl text-[15px] leading-relaxed text-muted sm:text-base">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
