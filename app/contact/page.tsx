import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Book a Demo",
  description:
    "Book a live Speaksy demo — we'll run a voice AI agent on your actual use case, in your language, on a real phone call.",
  alternates: { canonical: "/contact" },
};

const expectations = [
  ["📞", "A real call, not a slide deck", "We'll dial your number with an agent configured for your use case, live on the demo."],
  ["🗣️", "Your language, your script", "Hindi, Hinglish, Tamil, Marathi — bring your actual telecaller script and hear it come alive."],
  ["🧮", "A pricing sheet in rupees", "Transparent per-minute rates and a savings estimate against your current setup, on the spot."],
  ["⚡", "Pilot in days", "If it's a fit, we'll scope a free 100-minute pilot on your real leads the same week."],
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a Demo"
        title="Twenty minutes. One live call. Zero slides."
        subtitle="Tell us what you're trying to automate and we'll show you Speaksy handling it — on a real phone line, in your customer's language."
      />
      <section className="pb-24 pt-8">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1.15fr]">
          <div className="flex flex-col gap-6">
            <Reveal>
              <h2 className="text-xl font-semibold">What to expect</h2>
            </Reveal>
            {expectations.map(([icon, title, body], i) => (
              <Reveal key={title} delay={0.08 * (i + 1)}>
                <div className="card flex items-start gap-4 rounded-2xl p-5">
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.45}>
              <div className="rounded-2xl border border-brand-500/25 bg-brand-500/5 p-5">
                <p className="text-sm text-muted">
                  Prefer email? Write to{" "}
                  <a href="mailto:hello@speaksy.in" className="font-semibold text-brand-400 hover:text-brand-300">
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
