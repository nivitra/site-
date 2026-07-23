import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The Speaksy origin story — born at a hackathon in 2024, revived in 2026 by four builders obsessed with making AI voice agents that actually sound human. Built in India, beats the world.",
  alternates: { canonical: "/about" },
};

/* ─── founder data ─── */
const founders = [
  {
    name: "Shashank Thamali",
    role: "Co-Founder & CEO",
    bio: "Stumbled onto the voice agent idea in 2026 and couldn't stop thinking about it. Rebuilt, refined, and pushed it further than a weekend hackathon ever could — then turned it into a company.",
  },
  {
    name: "Sai Chaitanya Kareda",
    role: "Co-Founder & CTO",
    bio: "Heard whispers about 'that voice agent thing' and went all in. The architect behind Speaksy's streaming pipeline, low-latency infrastructure, and everything that makes the tech actually work.",
  },
  {
    name: "Nivas Salla",
    role: "Chief Vision Officer",
    bio: "Walked into a hackathon in 2024 with zero grand plans and built an AI voice agent that didn't sound like a robot. The original spark that refused to die.",
  },
  {
    name: "Ayush Kulkarni",
    role: "Chief Operating Officer",
    bio: "Co-built the original hackathon prototype alongside Nivas. Now ensures Speaksy's operations, partnerships, and go-to-market engine run as smoothly as its voice agents sound.",
  },
];

/* ─── origin story timeline ─── */
const timeline = [
  {
    year: "2024",
    title: "The hackathon",
    body: "<strong>Nivas Salla</strong> and <strong>Ayush Kulkarni</strong> walked into a hackathon with zero grand plans — just an idea and way too much caffeine. Build an AI voice agent that didn't sound like a robot reading a script. In that blur of sleepless coding and vending-machine snacks, they actually pulled it off. It was good. Like, \"wait, this actually works\" good.",
  },
  {
    year: "2024–25",
    title: "The shelf",
    body: "A hackathon project is still just a hackathon project. They shipped it, shelved it, and life moved on. But good ideas don't stay buried.",
  },
  {
    year: "Early 2026",
    title: "The plot twist",
    body: "<strong>Shashank Thamali</strong> and <strong>Sai Chaitanya Kareda</strong> stumbled onto the idea and couldn't stop thinking about it. No permission needed, no roadmap — just two people convinced this thing deserved a second life. They rebuilt, refined, and pushed it further than a weekend hackathon ever could.",
  },
  {
    year: "Mid 2026",
    title: "Full circle",
    body: "The timelines collided. <strong>Shashank</strong> and <strong>Sai Chaitanya</strong>'s momentum met <strong>Nivas</strong> and <strong>Ayush</strong>'s original spark — and instead of two separate stories, it became one. Four builders, one obsession: making AI voice agents that actually sound human.",
  },
  {
    year: "Now",
    title: "Speaksy",
    body: "They gave it a name that says exactly what it does — <strong>Speaksy</strong>, powered by <u><strong><em>SpeakSystems</em></strong></u>. Built by people who don't quit on good ideas. This is just the beginning.",
  },
];

/* ─── values ─── */
const values = [
  {
    num: "01",
    title: "Ideas that refuse to die",
    body: "Speaksy isn't a boardroom idea. It's a hackathon project that got shelved, picked back up by the right people at the right time, and turned into something four founders are now building — full send, no brakes.",
  },
  {
    num: "02",
    title: "Bharat-first, not Bharat-later",
    body: "Hindi and Tamil ship with the same care as Hinglish. The next 50 crore customers speak neither Silicon Valley's language nor its price points.",
  },
  {
    num: "03",
    title: "The phone call is sacred",
    body: "For most of India, the call is still where trust forms and money moves. We treat every second of latency and every mispronounced name as a broken promise.",
  },
  {
    num: "04",
    title: "Builders who show up",
    body: "We didn't plan this timeline. We just kept showing up. That's the whole vibe — built by people who don't quit on good ideas, and who obsess over the last 100 milliseconds.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Speaksy"
        title="An idea that refused to die."
        subtitle="Born at a hackathon in 2024. Shelved. Revived in 2026 by two builders who couldn't stop thinking about it. Four founders, one obsession — AI voice agents that actually sound human."
      />

      {/* ── mission strip ── */}
      <section className="border-y border-line bg-surface/50 py-14">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-6 text-center md:grid-cols-4">
          {([
            ["4", "founders, one mission"],
            ["14", "languages in production"],
            ["<800ms", "conversation latency"],
            ["₹3.99", "per live minute, from"],
          ] as const).map(([n, l], i) => (
            <Reveal key={l} delay={i * 0.08} className="flex flex-col items-center gap-1">
              <span className="font-mono text-3xl font-semibold text-brand-400">{n}</span>
              <span className="text-sm text-muted">{l}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── origin story timeline ── */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading
            eyebrow="The Origin Story"
            title="It started with a hackathon (like most good chaos does)."
          />
          <div className="relative mt-14 flex flex-col gap-10 border-l border-brand-500/30 pl-8">
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.08}>
                <div className="relative">
                  <span className="absolute -left-[2.45rem] top-1 h-4 w-4 rounded-full border-2 border-brand-400 bg-background" />
                  <p className="font-mono text-sm font-bold text-brand-400">{item.year}</p>
                  <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted" dangerouslySetInnerHTML={{ __html: item.body }} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── the founders ── */}
      <section className="border-y border-line bg-surface/40 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="The Team"
            title="Four builders who kept showing up."
            subtitle="A hackathon duo who lit the spark, and two builders who turned it into fire — now building Speaksy full time, no brakes."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {founders.map((f, i) => (
              <Reveal key={f.name} delay={(i % 2) * 0.1}>
                <div className="card card-hover flex h-full flex-col gap-4 rounded-2xl p-7">
                  {/* avatar monogram */}
                  <div className="flex items-center gap-4">
                    <span className="brand-pill flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-bold text-white">
                      {f.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold">{f.name}</h3>
                      <p className="text-xs font-semibold uppercase tracking-wider text-brand-400">
                        {f.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted">{f.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── values ── */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="What we believe"
            title="Four convictions we build by."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 2) * 0.1}>
                <div className="card card-hover h-full rounded-2xl p-7">
                  <span className="inline-flex rounded-md bg-brand-500/10 px-2 py-1 font-mono text-[11px] font-semibold text-brand-700">
                    {v.num}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── the quote ── */}
      <section className="border-t border-line bg-surface/30 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <blockquote className="text-center">
              <p className="text-xl font-medium leading-relaxed tracking-tight text-foreground sm:text-2xl">
                &ldquo;We didn&rsquo;t plan this timeline. We just kept showing up. And honestly?
                That&rsquo;s the whole vibe of Speaksy — built by people who don&rsquo;t quit on
                good ideas.&rdquo;
              </p>
              <footer className="mt-6 text-sm text-muted">
                — The Founding Team, Speaksy
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
