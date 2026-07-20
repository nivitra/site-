import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Speaksy is building India's voice AI — 10 languages, sub-800ms conversations, at prices every Indian business can afford. Built in India, beats the world.",
  alternates: { canonical: "/about" },
};

const values = [
  ["01", "Bharat-first, not Bharat-later", "Hindi and Tamil ship with the same care as Hinglish. The next 50 crore customers speak neither Silicon Valley's language nor its price points."],
  ["02", "The phone call is sacred", "For most of India, the call is still where trust forms and money moves. We treat every second of latency and every mispronounced name as a broken promise."],
  ["03", "Frugal engineering, premium output", "World-class doesn't have to mean dollar-priced. We optimize relentlessly so ₹3.99 buys what others sell for ₹12."],
  ["04", "Radically auditable", "Deterministic graphs, immutable versions, 100% call QA. If you can't show a regulator exactly what your AI said, you shouldn't be dialing."],
];

const timeline = [
  ["2024", "The itch", "Our founders watch a Pune NBFC pay dollar rates for a voice bot that couldn't say 'साडेचार हजार' correctly. The question forms: why is Indian voice AI priced and built for America?"],
  ["Early 2025", "First stack", "Speaksy's streaming pipeline hits sub-second round trips on real Exotel trunks. First Hinglish model trained on consented, PII-scrubbed Indian call audio."],
  ["Mid 2025", "First customers", "A Mumbai collections team and a Hyderabad EdTech go live. The Marathi/Telugu campaigns outperform their human benchmarks in week two."],
  ["Late 2025", "The graph engine", "Prompt spaghetti replaced by versioned dialogue graphs. Human handoff ships — AI does volume, humans close. All 10 gallery languages reach production quality."],
  ["2026", "Scale", "1L+ calls a month across BFSI, D2C, EdTech, healthcare and logistics. Same mission, bigger phone bill: built in India, beats the world."],
];

const team = [
  ["Manav Khanna", "Co-founder & CEO", "Ex-collections ops. Ran 400-seat dialer floors before deciding to automate his old job properly."],
  ["Shruti Nair", "Co-founder & CTO", "Speech systems engineer. Obsessive about the last 100 milliseconds and the first three seconds of a call."],
  ["Aniruddh Rao", "Voice ML Lead", "Trains the models that make 'नमस्कार' sound like home in nine scripts."],
  ["Ketaki Deshmukh", "Head of Linguistics", "Guardian of honorifics, dialects and everything global platforms get wrong about Indian speech."],
  ["Nandini Iyer", "Compliance & Trust", "Makes TRAI windows, DND scrubbing and DPDP residency non-negotiable platform defaults."],
  ["Ravi Teja", "Solutions", "Turns 'our telecallers say this' into graph agents that say it better, in 10 languages."],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Speaksy"
        title="We build the voice India's businesses deserve."
        subtitle="Global voice AI was priced in dollars and trained on American accents. We started Speaksy to flip both — state-of-the-art conversation technology, built in India, priced for India, fluent in India."
      />

      {/* mission strip */}
      <section className="border-y border-line bg-surface/50 py-14">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-6 text-center md:grid-cols-4">
          {[
            ["14", "languages in production"],
            ["1L+", "calls handled monthly"],
            ["<800ms", "conversation latency"],
            ["₹3.99", "per live minute, from"],
          ].map(([n, l], i) => (
            <Reveal key={l} delay={i * 0.08} className="flex flex-col items-center gap-1">
              <span className="font-mono text-3xl font-semibold text-brand-400">{n}</span>
              <span className="text-sm text-muted">{l}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* story timeline */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading eyebrow="The Story" title="From a mispronounced number to a lakh+ calls a month." />
          <div className="relative mt-14 flex flex-col gap-10 border-l border-brand-500/30 pl-8">
            {timeline.map(([year, title, body], i) => (
              <Reveal key={year} delay={i * 0.08}>
                <div className="relative">
                  <span className="absolute -left-[2.45rem] top-1 h-4 w-4 rounded-full border-2 border-brand-400 bg-background" />
                  <p className="font-mono text-sm font-bold text-brand-400">{year}</p>
                  <h3 className="mt-1 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* values */}
      <section className="border-y border-line bg-surface/40 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="What we believe" title="Four convictions we hire, build and price by." />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {values.map(([icon, title, body], i) => (
              <Reveal key={title} delay={(i % 2) * 0.1}>
                <div className="card card-hover h-full rounded-2xl p-7">
                  <span className="inline-flex rounded-md bg-brand-500/10 px-2 py-1 font-mono text-[11px] font-semibold text-brand-700">
                    {icon}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* team */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="The Team"
            title="Operators, linguists and latency obsessives."
            subtitle="A team that has run dialer floors, trained speech models and argued about Marathi honorifics — sometimes in the same meeting."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map(([name, role, bio], i) => (
              <Reveal key={name} delay={(i % 3) * 0.08}>
                <div className="card card-hover flex h-full flex-col gap-3 rounded-2xl p-6">
                  <span className="brand-pill flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold text-white">
                    {name.split(" ").map((w) => w[0]).join("")}
                  </span>
                  <div>
                    <h3 className="font-semibold">{name}</h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-400">{role}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-muted">{bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
