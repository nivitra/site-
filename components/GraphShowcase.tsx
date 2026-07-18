"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

const edge = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (d: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.9, delay: d, ease: "easeInOut" as const },
  }),
};

const node = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (d: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: d, ease: "easeOut" as const },
  }),
};

function GraphNode({
  x, y, w = 150, h = 64, title, tag, tagColor = "#4ade80", delay,
}: {
  x: number; y: number; w?: number; h?: number;
  title: string; tag: string; tagColor?: string; delay: number;
}) {
  return (
    <motion.g variants={node} custom={delay}>
      <rect x={x} y={y} width={w} height={h} rx={12} fill="#0e1a15" stroke="rgba(134,239,172,0.25)" />
      <text x={x + 14} y={y + 26} fill={tagColor} fontSize="10" fontWeight="700" letterSpacing="1.5">
        {tag}
      </text>
      <text x={x + 14} y={y + 46} fill="#f2f7f4" fontSize="13" fontWeight="600">
        {title}
      </text>
      <circle cx={x} cy={y + h / 2} r={4} fill="#22c55e" />
      <circle cx={x + w} cy={y + h / 2} r={4} fill="#22c55e" />
    </motion.g>
  );
}

export default function GraphShowcase() {
  return (
    <section id="graph" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(34,197,94,0.08),transparent)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Graph Agents"
            title="Design conversations like flowcharts, not 2,000-word prompts."
            subtitle="Every path your customer can take is a node you control. Router nodes classify intent in real time and pick the right branch — deterministic, versioned, and validated before every publish."
          />
          <Reveal delay={0.15}>
            <ul className="mt-8 flex flex-col gap-4">
              {[
                ["Static nodes", "fixed scripts with {{variables}} like name, EMI amount, slot time"],
                ["Router nodes", "LLM intent classification chooses the next edge in milliseconds"],
                ["Action nodes", "book calendars, hit your APIs, send WhatsApp follow-ups mid-call"],
                ["Fallback edges", "no dead ends — unclear answers loop to clarification, never silence"],
              ].map(([t, d]) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-400" />
                  <p className="text-sm leading-relaxed text-muted">
                    <span className="font-semibold text-foreground">{t}</span> — {d}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.25}>
            <Link
              href="/platform"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-400 transition-colors hover:text-brand-300"
            >
              Explore the full platform →
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="card grid-bg relative overflow-hidden rounded-3xl p-4">
            <div className="mb-3 flex items-center justify-between px-2 pt-1">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#2b3d33]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#2b3d33]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#2b3d33]" />
              </div>
              <span className="rounded-md bg-brand-500/15 px-2.5 py-1 font-mono text-[10px] font-semibold text-brand-300">
                loan-qualifier · v12 · PUBLISHED
              </span>
            </div>
            <motion.svg
              viewBox="0 0 640 400"
              className="w-full"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* edges */}
              <motion.path d="M170 200 C 210 200, 210 200, 250 200" fill="none" stroke="#22c55e" strokeWidth="2" variants={edge} custom={0.3} />
              <motion.path d="M400 180 C 440 140, 440 100, 475 92" fill="none" stroke="#4ade80" strokeWidth="2" variants={edge} custom={0.7} />
              <motion.path d="M400 200 C 440 200, 440 200, 475 200" fill="none" stroke="#facc15" strokeWidth="2" strokeDasharray="5 5" variants={edge} custom={0.85} />
              <motion.path d="M400 220 C 440 260, 440 300, 475 308" fill="none" stroke="#9db4a8" strokeWidth="2" strokeDasharray="2 5" variants={edge} custom={1.0} />

              {/* edge labels */}
              <motion.g variants={node} custom={1.1}>
                <text x="415" y="120" fill="#4ade80" fontSize="10" fontWeight="600">interested</text>
                <text x="415" y="192" fill="#facc15" fontSize="10" fontWeight="600">objection</text>
                <text x="415" y="288" fill="#9db4a8" fontSize="10" fontWeight="600">not_now</text>
              </motion.g>

              {/* nodes */}
              <GraphNode x={20} y={168} title="Namaste {{name}} ji…" tag="STATIC · WELCOME" delay={0.1} />
              <GraphNode x={250} y={168} title="Classify intent" tag="ROUTER · LLM" tagColor="#86efac" delay={0.45} />
              <GraphNode x={475} y={60} title="Book sales slot" tag="ACTION · CALENDAR" delay={0.8} />
              <GraphNode x={475} y={168} title="Human handoff" tag="TRANSFER · <1.5s" tagColor="#facc15" delay={0.95} />
              <GraphNode x={475} y={276} title="Retry in 3 days" tag="SCHEDULE · AUTO" tagColor="#9db4a8" delay={1.1} />

              {/* travelling packet on main edge */}
              <circle r="5" fill="#86efac">
                <animateMotion
                  dur="2.4s"
                  repeatCount="indefinite"
                  path="M170 200 C 210 200, 210 200, 250 200 M250 200"
                />
              </circle>
            </motion.svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
