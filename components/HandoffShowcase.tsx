"use client";

import { motion } from "framer-motion";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: d, ease: "easeOut" as const },
  }),
};

export default function HandoffShowcase() {
  return (
    <section id="handoff" className="relative overflow-hidden py-28">
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <motion.div
            className="card flex flex-col gap-3 rounded-3xl p-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={item} custom={0.1} className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-semibold text-muted">
                <span className="relative flex h-2 w-2 rounded-full bg-brand-500 live-dot" />
                Live call in progress
              </span>
              <span className="font-mono text-xs text-muted">02:41</span>
            </motion.div>

            <motion.div variants={item} custom={0.25} className="max-w-[85%] self-start rounded-2xl rounded-bl-sm bg-brand-600/10 px-4 py-3 text-[13px] leading-snug text-foreground">
              Sir, is plan mein aapko 12% assured returns milte hain, aur tax benefit bhi…
            </motion.div>

            <motion.div variants={item} custom={0.5} className="max-w-[85%] self-end rounded-2xl rounded-br-sm bg-surface-2 px-4 py-3 text-[13px] leading-snug text-foreground">
              Dekhiye, mujhe pehle wale agent ne 14% bola tha. Main discount ke bina nahi lunga. Manager se baat karao.
            </motion.div>

            <motion.div variants={item} custom={0.85} className="my-1 flex items-center gap-3 self-center rounded-full border border-amber-400/30 bg-amber-50 px-4 py-2">
              <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-amber-500"
              />
              <span className="text-xs font-semibold text-amber-700">
                Connecting to your team...
              </span>
            </motion.div>

            <motion.div variants={item} custom={1.15} className="flex items-center gap-3 self-center">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-brand-500/30" />
              <span className="rounded-md bg-brand-600/10 px-3 py-1 text-[11px] font-semibold text-brand-700">
                Connected instantly · Full context shared
              </span>
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-brand-500/30" />
            </motion.div>

            <motion.div variants={item} custom={1.45} className="max-w-[85%] self-start rounded-2xl rounded-bl-sm border border-brand-600/20 bg-brand-600/5 px-4 py-3 text-[13px] leading-snug text-foreground">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-brand-600">
                Amit · Team Lead
              </span>
              Rohan ji, main Amit — team lead. Aapki 14% wali baat main dekh raha hoon, chaliye main aapke liye kuch karta hoon…
            </motion.div>
          </motion.div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            align="left"
            eyebrow="Smart Handoff"
            title="When it matters most, your team takes over."
            subtitle="When a customer needs personal attention, Speaksy instantly connects them to your team — with full context, so they never have to repeat themselves."
          />
          <Reveal delay={0.15}>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                ["Instant", "connection"],
                ["Zero", "repeated questions"],
                ["100%", "context shared"],
              ].map(([n, l]) => (
                <div key={l} className="card rounded-2xl p-4 text-center">
                  <p className="font-mono text-2xl font-semibold text-brand-600">{n}</p>
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
