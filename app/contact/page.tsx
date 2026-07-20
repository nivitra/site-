import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Book a Demo",
  description:
    "Book a live Speaksy demo — hear an AI agent handle your use case, in your language, on a real phone call.",
  alternates: { canonical: "/contact" },
};

const expectations = [
  ["01", "A real call", "We dial your number with Speaksy set up for your use case — live, not a recording."],
  ["02", "Your language", "Hindi, Hinglish, Tamil, Marathi, or whichever your customers speak."],
  ["03", "Clear pricing", "Rates in rupees and a simple savings view against how you operate today."],
  ["04", "Pilot in days", "If it fits, start a free 100-minute pilot on real leads the same week."],
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Free demo"
        title="20 minutes. A live call on your number."
        subtitle="Tell us what you want to automate. We'll call you with Speaksy — your language, your use case."
      />
      <section className="pb-24 pt-8">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1.15fr]">
          <div className="flex flex-col gap-6">
            <Reveal>
              <h2 className="text-xl font-semibold">What to expect</h2>
            </Reveal>
            {expectations.map(([n, title, body], i) => (
              <Reveal key={title} delay={0.08 * (i + 1)}>
                <div className="card flex items-start gap-4 rounded-2xl p-5">
                  <span className="font-mono text-xs font-medium tracking-widest text-muted-2">{n}</span>
                  <div>
                    <h3 className="font-medium">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.45}>
              <div className="rounded-2xl border border-line bg-white/[0.02] p-5">
                <p className="text-sm text-muted">
                  Prefer email? Write to{" "}
                  <a href="mailto:hello@speaksy.in" className="font-medium text-foreground transition-opacity hover:opacity-70">
                    hello@speaksy.in
                  </a>{" "}
                  — we reply within a working day.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <LeadForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
