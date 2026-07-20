"use client";

import Link from "next/link";
import SectionHeading from "./ui/SectionHeading";
import SpotlightCard from "./ui/SpotlightCard";
import Stagger from "./ui/Stagger";

const cases = [
  {
    title: "EMI / payment reminders",
    body: "Polite calls on every due date. Capture promise-to-pay, send the link. Less load on collections.",
    who: "NBFC · Bank · Loan apps",
  },
  {
    title: "Instant lead callbacks",
    body: "Call within a minute of form fill. Qualify interest and hand serious leads to sales before they go cold.",
    who: "Real estate · EdTech · Insurance",
  },
  {
    title: "COD / order confirmation",
    body: "Confirm before delivery — yes or no. Catch wrong addresses. Lower RTO, save money.",
    who: "D2C · E-commerce · Quick commerce",
  },
  {
    title: "Appointment booking",
    body: "Clinic, salon, site visit, demo slot — book at the customer's preferred time. Speaksy sends reminders too.",
    who: "Healthcare · Clinics · Services",
  },
  {
    title: "Missed-call / support",
    body: "Answer at night too. Simple Q&A and status updates. Escalate hard cases to your agent.",
    who: "Any customer-facing business",
  },
  {
    title: "Feedback / survey",
    body: "After delivery or a visit — short call, capture ratings. Raw data for review teams, not guesswork.",
    who: "Retail · Hospitality · SaaS ops",
  },
];

export default function UseCases() {
  return (
    <section className="section">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="What Speaksy does for you"
          title="The calls your staff never has time for"
          subtitle="The daily phone work you hire people for — Speaksy runs 24×7, tuned to your scripts."
        />
        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <div key={c.title} data-stagger>
              <SpotlightCard className="card card-hover h-full rounded-2xl" maxTilt={3}>
                <div className="flex h-full flex-col gap-3 p-6 sm:p-7">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-brand-600">
                    {c.who}
                  </p>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">{c.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted">{c.body}</p>
                </div>
              </SpotlightCard>
            </div>
          ))}
        </Stagger>
        <p className="mt-10 text-center text-sm text-muted">
          Different vertical?{" "}
          <Link href="/solutions" className="font-semibold text-brand-600 hover:text-brand-700">
            Browse Industry Intelligence →
          </Link>
        </p>
      </div>
    </section>
  );
}
