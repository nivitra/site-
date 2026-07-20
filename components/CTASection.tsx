"use client";

import Link from "next/link";
import Magnetic from "./ui/Magnetic";
import Reveal from "./ui/Reveal";

export default function CTASection() {
  return (
    <section className="section relative overflow-hidden pb-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="brand-pill relative overflow-hidden rounded-[1.75rem] px-7 py-14 text-center sm:px-14 sm:py-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.18),transparent_55%)]" />

            <div className="relative flex flex-col items-center gap-5">
              <p className="text-sm font-semibold text-white/85">
                Free 100 minutes · No card required · Zero setup fee
              </p>

              <h2 className="max-w-xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                Hear it on your number.
                <br />
                Then decide.
              </h2>

              <p className="max-w-md text-[15px] leading-relaxed text-white/85">
                A 20-minute conversation. Your use case. Your language. A live
                call — not a slide deck.
              </p>

              <div className="mt-2 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
                <Magnetic strength={0.3} radius={80}>
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-brand-900 shadow-lg sm:w-auto"
                  >
                    Book a free demo
                  </Link>
                </Magnetic>
                <Link
                  href="/pricing"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-white/35 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 sm:w-auto"
                >
                  See pricing
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
