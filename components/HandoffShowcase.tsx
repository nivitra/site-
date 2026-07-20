"use client";

import { motion } from "framer-motion";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: d, ease: "easeOut" as const },
  }),
};

export default function HandoffShowcase() {
  return (
    <section id="handoff" className="section relative overflow-hidden border-y border-line bg-surface/40">
      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <motion.div
            className="card flex flex-col gap-3 rounded-3xl p-6 sm:p-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={item} custom={0.08} className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-medium text-muted">
                <span className="relative flex h-2 w-2 rounded-full bg-brand-400 live-dot" />
                Live call
              </span>
              <span className="font-mono text-xs text-muted-2">02:41</span>
            </motion.div>

            <motion.div
              variants={item}
              custom={0.2}
              className="max-w-[88%] self-start rounded-2xl rounded-bl-sm border border-line bg-white/[0.04] px-4 py-3 text-[13px] leading-snug text-foreground/90"
            >
              Sir, is plan mein aapko 12% assured returns milte hain, aur tax benefit bhi…
            </motion.div>

            <motion.div
              variants={item}
              custom={0.4}
              className="max-w-[88%] self-end rounded-2xl rounded-br-sm bg-white/[0.08] px-4 py-3 text-[13px] leading-snug"
            >
              Dekhiye, mujhe pehle 14% bola tha. Discount ke bina nahi lunga. Manager se baat karao.
            </motion.div>

            <motion.div
              variants={item}
              custom={0.65}
              className="my-1 flex items-center gap-3 self-center rounded-full border border-line bg-white/[0.03] px-4 py-2"
            >
              <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                className="h-1.5 w-1.5 rounded-full bg-foreground/70"
              />
              <span className="text-xs font-medium text-muted">
                Customer wants a specialist — connecting your team
              </span>
            </motion.div>

            <motion.div variants={item} custom={0.9} className="flex items-center gap-3 self-center">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-white/20" />
              <span className="rounded-md border border-brand-500/25 bg-brand-500/10 px-3 py-1 text-[11px] font-semibold text-brand-300">
                Connected · Full context shared
              </span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-white/20" />
            </motion.div>

            <motion.div
              variants={item}
              custom={1.1}
              className="max-w-[88%] self-start rounded-2xl rounded-bl-sm border border-line bg-white/[0.05] px-4 py-3 text-[13px] leading-snug"
            >
              <span className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-muted-2">
                Amit · Your closer
              </span>
              Rohan ji, main Amit. Aapki 14% wali baat main dekh raha hoon — chaliye main aapke liye kuch karta hoon…
            </motion.div>
          </motion.div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            align="left"
            eyebrow="Always backed by people"
            title="AI handles the volume. Your team closes what matters."
            subtitle="When a customer needs a person, Speaksy brings your best people in — with the full story already in front of them. No repeating. No awkward silence."
          />
          <Reveal delay={0.12}>
            <div className="mt-10 grid grid-cols-3 gap-3">
              {[
                ["Instant", "handoff"],
                ["Zero", "repeated questions"],
                ["Full", "context passed on"],
              ].map(([n, l]) => (
                <div key={l} className="card rounded-2xl p-4 text-center">
                  <p className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">{n}</p>
                  <p className="mt-1 text-xs text-muted">{l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
