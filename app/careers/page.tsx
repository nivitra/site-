import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Speaksy — build state-of-the-art voice AI for 14 Indian languages, from Bengaluru & Mumbai. Open roles in ML, engineering, linguistics and go-to-market.",
  alternates: { canonical: "/careers" },
};

const perks = [
  ["🚀", "Real scale, day one", "Your code talks to lakhs of people a day. Latency you shave and accents you fix are heard across India within a sprint."],
  ["🇮🇳", "A mission you can explain to your parents", "We make technology speak their language — literally. Odia and Assamese matter here as much as English."],
  ["📈", "Meaningful ESOPs", "Early team, real ownership. Wealth creation shouldn't be a metro-English-elite privilege either."],
  ["🏥", "Full health cover", "You, spouse, kids and parents. No fine print gymnastics."],
  ["🛠", "Top-of-market tooling", "M-series machines, GPU budget for experiments, and the license to kill any meeting that could've been a webhook."],
  ["🌏", "Bengaluru & Mumbai, flexible", "Offices where the chai is strong; remote weeks when deep work demands it."],
];

const roles = [
  ["Voice ML Engineer — Indic ASR", "Bengaluru", "Own WER on code-switched 8kHz audio. You'll fine-tune streaming ASR on real Indian call data and fight for every millisecond and phoneme."],
  ["Speech Synthesis Engineer — TTS", "Bengaluru", "Make 14 languages sound like home: prosody, honorifics, number reading, sub-150ms first byte."],
  ["Senior Backend Engineer — Real-time", "Bengaluru / Remote", "Go/Python. WebSocket audio pipelines, SIP bridging, 10k concurrent calls without breaking a sweat."],
  ["Computational Linguist — Indic Languages", "Mumbai", "Native fluency in two+ of: Marathi, Telugu, Bengali, Odia, Assamese. Turn cultural register into model behaviour."],
  ["Solutions Architect", "Mumbai", "Sit with a collections head at 9 AM and a CTO at 3 PM. Turn 'our telecallers say this' into production graph agents."],
  ["Enterprise Account Executive — BFSI", "Mumbai", "Sell outcomes to lenders and insurers who've been burned by demos before. Our benchmark numbers are your pitch deck."],
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Help India talk to itself."
        subtitle="We're a small team doing loud work: state-of-the-art speech AI for 120 crore+ speakers who've been an afterthought for every global platform. Come make the phone ring in your mother tongue."
      />

      <section className="pb-8 pt-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map(([icon, title, body], i) => (
              <Reveal key={title} delay={(i % 3) * 0.08}>
                <div className="card card-hover h-full rounded-2xl p-6">
                  <span className="text-2xl">{icon}</span>
                  <h3 className="mt-3 font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading eyebrow="Open Roles" title="Six seats open right now." />
          <div className="mt-12 flex flex-col gap-4">
            {roles.map(([title, loc, desc], i) => (
              <Reveal key={title} delay={i * 0.06}>
                <a
                  href={`mailto:careers@speaksy.in?subject=${encodeURIComponent("Application: " + title)}`}
                  className="card card-hover group flex flex-col gap-2 rounded-2xl p-6 sm:flex-row sm:items-center sm:gap-6"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold transition-colors group-hover:text-brand-300">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{desc}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-4">
                    <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-muted">📍 {loc}</span>
                    <span className="text-sm font-semibold text-brand-400">Apply →</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <p className="mt-10 text-center text-sm text-muted">
              Nothing fits but you&apos;re exceptional at something we&apos;ll need?{" "}
              <a href="mailto:careers@speaksy.in" className="font-semibold text-brand-400 hover:text-brand-300">
                careers@speaksy.in
              </a>{" "}
              — surprise us.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
