import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Book a Demo",
  description:
    "Book a free Speaksy demo. We'll show you exactly how your business would sound with an AI calling assistant — live on a real call, in your language, on your use case.",
  alternates: { canonical: "/contact" },
};

const expectations = [
  ["📞", "A live call, not a presentation", "We'll call your number with an assistant built for your exact business. You'll hear it in action — not watch a screen recording."],
  ["🗣️", "In your language, with your script", "Hindi, Hinglish, Tamil, Marathi — bring the words your team uses today and hear them spoken back, naturally."],
  ["💰", "A clear, honest price estimate", "Transparent per-minute rates and a straightforward savings comparison against what you currently spend."],
  ["⚡", "Live within days, not months", "If it's a good fit, we'll scope a free 100-minute pilot on your real customers the same week."],
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a Demo"
        title="20 minutes. One live call. No slides."
        subtitle="Tell us what you'd like to automate and we'll show Speaksy doing it — on a real call, in your customer's language, while you're on the line."
      />
      <section className="pb-24 pt-8">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1.15fr]">
          <div className="flex flex-col gap-6">
            <Reveal>
              <h2 className="text-xl font-semibold">What happens in the demo</h2>
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
                  Prefer to write first? Email us at{" "}
                  <a href="mailto:hello@speaksy.in" className="font-semibold text-brand-400 hover:text-brand-300">
                    hello@speaksy.in
                  </a>{" "}
                  — we reply within one business day.
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
