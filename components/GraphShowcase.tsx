"use client";

import { motion } from "framer-motion";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

const steps = [
  {
    num: "01",
    title: "Tell us how your business talks",
    desc: "Share how your team currently handles calls — what you say, what you ask, what action follows. You don't need to write a single line of code.",
    color: "bg-brand-600",
  },
  {
    num: "02",
    title: "We set everything up for you",
    desc: "Our team builds your calling assistant, sets it up to match your workflow, and tests it until it sounds exactly right.",
    color: "bg-brand-500",
  },
  {
    num: "03",
    title: "Sit back and watch results pour in",
    desc: "Your assistant begins handling calls immediately. Track every outcome live and fine-tune as you grow — with our team beside you.",
    color: "bg-brand-400",
  },
];

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: d, ease: "easeOut" as const },
  }),
};

export default function GraphShowcase() {
  return (
    <section id="how-it-works" className="relative overflow-hidden border-y border-line bg-surface py-28">
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="How It Works"
          title="Up and running in 3 simple steps."
          subtitle="No technical knowledge needed. We handle everything so you can focus entirely on your business."
        />

        <motion.div
          className="mt-16 grid gap-8 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step, i) => (
            <motion.div key={step.num} variants={item} custom={i * 0.15}>
              <div className="card card-hover flex h-full flex-col gap-5 rounded-2xl p-8">
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${step.color} text-lg font-bold text-white`}>
                  {step.num}
                </span>
                <h3 className="text-xl font-semibold tracking-tight text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Connecting line decoration */}
        <div className="mt-8 hidden items-center justify-center gap-0 md:flex">
          <Reveal delay={0.3}>
            <div className="flex items-center gap-4">
              <div className="h-0.5 w-24 bg-gradient-to-r from-transparent to-brand-600/30" />
              <span className="rounded-full bg-brand-600/10 px-4 py-1.5 text-xs font-semibold text-brand-600">
                Most businesses are live and taking calls within 48 hours
              </span>
              <div className="h-0.5 w-24 bg-gradient-to-l from-transparent to-brand-600/30" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
