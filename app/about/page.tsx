import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Speaksy is building India's most trusted calling assistant — 14 languages, instant responses, and pricing every Indian business can afford. Built in India, trusted across India.",
  alternates: { canonical: "/about" },
};

const values = [
  ["🇮🇳", "Built for India, not adapted for it", "Odia and Assamese receive the same quality of care as English. The hundreds of millions of Indians who don't speak English deserve technology that speaks their language — at prices they can actually afford."],
  ["📞", "The phone call is where trust is built", "For most of India, a phone call is still where decisions are made and money moves. Every second of delay and every mispronounced word is a broken promise to your customer."],
  ["🧠", "Brilliant technology, fair pricing", "World-class doesn't have to mean expensive. We work relentlessly so that what global platforms charge ₹12 for, Speaksy delivers for under ₹5."],
  ["🔍", "Complete transparency, always", "Every call is recorded and reviewable. Every decision your assistant makes is traceable. You — and your regulators — can see exactly what was said in every conversation."],
];

const timeline = [
  ["2024", "Where it started", "Our founders watch a Mumbai finance company pay dollar rates for a calling bot that couldn't pronounce Indian names correctly. The question crystallised: why is voice AI built for India still priced and designed for America?"],
  ["Early 2025", "The breakthrough", "Speaksy's calling assistant responds in under a second on real Indian phone lines. Our first model learns to understand the natural way Indians actually speak — not just textbook language."],
  ["Mid 2025", "First real customers", "A Mumbai finance company and a Hyderabad education business go live. Their Marathi and Telugu campaigns outperform every human benchmark within two weeks."],
  ["Late 2025", "A smarter assistant", "We replace rigid scripts with intelligent conversation flows. When a customer needs a human, the transfer is instant. Our 14th language reaches production quality."],
  ["2026", "Growing every day", "Over 2 million customer calls handled every month across finance, retail, education, healthcare, and logistics. Built in India. Trusted across India."],
];

const team = [
  ["Manav Khanna", "Co-founder & CEO", "Spent years running large customer calling operations before deciding to build the technology that should have existed all along."],
  ["Shruti Nair", "Co-founder & CTO", "Voice and speech systems specialist. Obsessed with making every reply feel instant and every word feel natural."],
  ["Aniruddh Rao", "Voice & Language Lead", "Trains the models that make every language sound like home — not a translation."],
  ["Ketaki Deshmukh", "Head of Linguistics", "Ensures every conversation respects the nuances, dialects, and politeness norms that make Indian speech unique."],
  ["Nandini Iyer", "Compliance & Trust", "Makes sure every call Speaksy makes follows every rule — automatically, without anyone having to remember."],
  ["Ravi Teja", "Customer Solutions", "Turns 'this is how our team talks to customers' into a live assistant that does it better, in 14 languages."],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Speaksy"
        title="We built the calling assistant India&apos;s businesses actually needed."
        subtitle="Global AI was built for Silicon Valley and priced in dollars. We started Speaksy to change that — bringing the same quality of technology to Indian businesses, at Indian prices, in Indian languages."
      />

      {/* mission strip */}
      <section className="border-y border-line bg-surface/50 py-14">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-6 text-center md:grid-cols-4">
          {[
            ["14", "languages, all sounding natural"],
            ["2M+", "customer calls every month"],
            ["<1 sec", "to respond to your customer"],
            ["₹4.75", "per live minute, from"],
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
          <SectionHeading eyebrow="The Story" title="From a mispronounced name to two million calls a month." />
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
          <SectionHeading eyebrow="What We Believe" title="Four values we never compromise on." />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {values.map(([icon, title, body], i) => (
              <Reveal key={title} delay={(i % 2) * 0.1}>
                <div className="card card-hover h-full rounded-2xl p-7">
                  <span className="text-2xl">{icon}</span>
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
            title="People who've walked in your shoes."
            subtitle="Our team has run call centres, trained voice models, and argued about Marathi grammar. We built Speaksy because we knew what Indian businesses needed and couldn't find it anywhere."
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
