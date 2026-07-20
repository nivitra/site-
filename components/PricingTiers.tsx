"use client";

import SpeaksyPricingCards from "@/components/pro-pricing-slider/SpeaksyPricingCards";
import { BUSINESS_VOLUME_STEPS, formatRate } from "@/components/pro-pricing-slider/speaksy-data";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

/**
 * Pricing tiers + volume ladder table for /pricing.
 */
export default function PricingTiers() {
  return (
    <section className="pb-8 pt-2 sm:pb-12">
      <div className="mx-auto max-w-6xl px-6">
        {/* No Reveal wrapper around grid — keeps equal-height stretch reliable */}
        <SpeaksyPricingCards />
        <p className="mt-4 text-center text-[12px] leading-relaxed text-muted sm:text-left">
          <span className="font-semibold text-foreground">*</span> Enterprise
          rates from under ₹1.5/min based on committed volume, concurrency, and
          custom architecture. Quoted after scoping.
        </p>

        {/* Clear volume ladder table */}
        <Reveal delay={0.12}>
          <div className="mt-14 sm:mt-16">
            <SectionHeading
              eyebrow="Volume rates"
              title="The more you call, the less you pay per minute."
              subtitle="Business plans step down automatically with daily volume. Past 300 calls a day, we custom-price with you."
            />
            <div className="card mt-10 overflow-hidden rounded-2xl">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[320px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-line bg-neutral-50/80 text-[12px] font-semibold uppercase tracking-wider text-muted">
                      <th className="px-5 py-3.5 sm:px-6">Plan</th>
                      <th className="px-5 py-3.5 sm:px-6">Daily call volume</th>
                      <th className="px-5 py-3.5 text-right sm:px-6">
                        Rate (per minute)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {BUSINESS_VOLUME_STEPS.map((row) => (
                      <tr
                        key={row.id}
                        className="border-b border-line last:border-0"
                      >
                        <td className="px-5 py-4 font-semibold text-foreground sm:px-6">
                          {row.plan}
                        </td>
                        <td className="px-5 py-4 text-muted sm:px-6">
                          {row.range}
                        </td>
                        <td className="px-5 py-4 text-right font-semibold tabular-nums text-emerald-700 sm:px-6">
                          {formatRate(row.rate)}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-emerald-50/60">
                      <td className="px-5 py-4 font-semibold text-foreground sm:px-6">
                        Enterprise
                      </td>
                      <td className="px-5 py-4 text-muted sm:px-6">
                        Beyond 300 calls / day · uncapped
                      </td>
                      <td className="px-5 py-4 text-right font-semibold tabular-nums text-emerald-800 sm:px-6">
                        &lt; ₹1.5*
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
