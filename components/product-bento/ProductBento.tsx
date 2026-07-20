"use client";

import Image from "next/image";
import {
  Phone,
  PhoneOff,
  Volume2,
  Sparkles,
  Infinity,
  ArrowRight,
  Headset,
  MessageCircle,
  Mail,
  MessageSquare,
  Shield,
  Activity,
} from "lucide-react";

/**
 * Exact product capabilities bento from the reference screenshot.
 * Layout, hierarchy, and mini-UI mocks preserved.
 * Color: premium light surfaces + Speaksy green accents only.
 */

const tile =
  "relative overflow-hidden rounded-[1.35rem] border border-line bg-white";

export default function ProductBento() {
  return (
    <section className="w-full bg-white px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-muted-2">
          What you get
        </p>
        <h2 className="mt-3 text-center text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Everything your calling team needs
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-[15px] text-muted">
          Human-like conversations, automatic CRM updates, follow-ups, and
          compliance — without hiring more people.
        </p>

        {/* Bento — mirrors screenshot grid */}
        <div className="mt-12 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-6 lg:grid-cols-12 lg:grid-rows-[auto_auto_auto]">
          {/* 1 · Hero — Human-Like Multilingual Calls (tall left) */}
          <div
            className={`${tile} min-h-[320px] md:col-span-3 md:row-span-2 lg:col-span-3 lg:min-h-0`}
          >
            <Image
              src="/lab/bento/agent.jpg"
              alt="AI voice agent"
              fill
              className="object-cover object-top"
              sizes="(max-width:768px) 100vw, 25vw"
              priority
            />
            {/* Soft bottom veil for legible type over photo — not a full-bleed black panel */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.82) 28%, rgba(240,253,244,0.35) 55%, transparent 78%)",
              }}
            />
            {/* Floating glass chips */}
            <div className="absolute right-4 top-6 h-10 w-10 rounded-xl border border-white/50 bg-white/40 shadow-sm backdrop-blur-md" />
            <div className="absolute right-14 top-20 h-8 w-14 rounded-lg border border-white/50 bg-white/40 shadow-sm backdrop-blur-md" />
            <div className="absolute bottom-28 left-5 h-9 w-9 rounded-lg border border-brand-500/25 bg-brand-500/10 shadow-sm backdrop-blur-md" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                Human-Like
                <br />
                Multilingual Calls
              </h3>
              <p className="mt-2 max-w-[240px] text-[13px] leading-relaxed text-muted">
                Deliver natural sales conversations in the language buyers are
                most comfortable with.
              </p>
            </div>
          </div>

          {/* 2 · CRM Automation (wide) */}
          <div
            className={`${tile} p-5 sm:p-6 md:col-span-3 lg:col-span-5`}
            style={{
              background:
                "linear-gradient(145deg, #ffffff 0%, #fafafa 50%, #f0fdf4 100%)",
            }}
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-[220px]">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  CRM Automation
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">
                  Log call notes, dispositions, and next steps in your CRM
                  automatically.
                </p>
              </div>
              {/* Mini CRM panel — light gray with brand green progress */}
              <div className="w-full max-w-[280px] rounded-2xl border border-line bg-surface-2 p-3 shadow-sm">
                <div className="mb-3 flex items-center justify-between rounded-full border border-line bg-white px-2.5 py-1.5">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-brand-500/15 ring-1 ring-brand-500/30">
                      <Activity className="h-3 w-3 text-brand-600" />
                      <span className="absolute bottom-0 right-0 h-1.5 w-1.5 rounded-full bg-brand-500" />
                    </span>
                    <div className="leading-tight">
                      <p className="text-[10px] font-medium text-foreground">
                        Ongoing Call
                      </p>
                      <p className="font-mono text-[9px] text-muted-2">02:04</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-2 ring-1 ring-line">
                      <Volume2 className="h-3 w-3 text-muted" />
                    </span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500">
                      <PhoneOff className="h-3 w-3 text-white" />
                    </span>
                  </div>
                </div>
                <p className="mb-2 flex items-center gap-1 text-[10px] font-medium text-brand-700">
                  AI-Powered Extraction
                  <Sparkles className="h-3 w-3" />
                </p>
                <div className="mb-2 grid grid-cols-2 gap-2">
                  <div className="rounded-lg border border-line bg-white px-2.5 py-2">
                    <p className="text-[10px] text-muted-2">Outcome</p>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-black/5">
                      <div className="h-full w-[72%] rounded-full bg-brand-500" />
                    </div>
                  </div>
                  <div className="rounded-lg border border-line bg-white px-2.5 py-2">
                    <p className="text-[10px] text-muted-2">Next Steps</p>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-black/5">
                      <div className="h-full w-[48%] rounded-full bg-brand-400" />
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-line bg-white px-2.5 py-2">
                  <p className="text-[10px] text-muted-2">Follow-Up Scheduled</p>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-black/5">
                    <div className="h-full w-[88%] rounded-full bg-brand-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 · Quality & Compliance */}
          <div
            className={`${tile} p-5 sm:p-6 md:col-span-3 lg:col-span-4`}
            style={{
              background:
                "linear-gradient(160deg, rgba(34,197,94,0.12) 0%, rgba(34,197,94,0.05) 45%, #ffffff 100%)",
            }}
          >
            <div className="mb-8 flex justify-end opacity-60">
              <Activity className="h-8 w-12 text-brand-500" strokeWidth={1.2} />
              <Shield className="ml-1 h-8 w-8 text-brand-600" strokeWidth={1.2} />
            </div>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              Quality &amp; Compliance
              <br />
              Guardrails
            </h3>
            <p className="mt-2 max-w-[220px] text-[13px] leading-relaxed text-muted">
              Run call audits to ensure compliance and improve conversations.
            </p>
          </div>

          {/* 4 · Omnichannel */}
          <div
            className={`${tile} p-5 sm:p-6 md:col-span-3 lg:col-span-3`}
            style={{
              background:
                "linear-gradient(165deg, rgba(34,197,94,0.1) 0%, rgba(240,253,244,0.6) 50%, #ffffff 100%)",
            }}
          >
            <div className="mb-8 flex justify-center py-2">
              <OmnichannelGraph />
            </div>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              Omnichannel
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">
              Engage buyers across voice, WhatsApp, SMS, email, and in-app.
            </p>
          </div>

          {/* 5 · System-Driven Follow-Ups */}
          <div
            className={`${tile} p-5 sm:p-6 md:col-span-3 lg:col-span-3`}
            style={{
              background:
                "linear-gradient(165deg, #f0fdf4 0%, #ecfdf5 40%, #ffffff 100%)",
            }}
          >
            <div className="mb-5 rounded-xl border border-brand-500/20 bg-white p-3 shadow-sm">
              <div className="mb-2 flex items-center gap-2 border-b border-line pb-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500/15">
                  <Phone className="h-3 w-3 text-brand-600" />
                </span>
                <span className="text-[11px] font-semibold text-brand-800">
                  Connected
                </span>
              </div>
              <div className="space-y-2">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="flex items-center gap-2">
                    <span className="w-3 text-[10px] font-medium text-muted-2">
                      {n}
                    </span>
                    <div className="flex flex-1 gap-1.5">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-500/10 text-brand-700">
                        <Phone className="h-3 w-3" />
                      </span>
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-500/10 text-brand-700">
                        <Headset className="h-3 w-3" />
                      </span>
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-500/10 text-brand-700">
                        <MessageCircle className="h-3 w-3" />
                      </span>
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-500/10 text-brand-700">
                        <Mail className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <h3 className="text-base font-semibold tracking-tight text-foreground">
              System-Driven
              <br />
              Follow-Ups
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">
              Retries, reschedules, and follow-ups handled automatically.
            </p>
          </div>

          {/* 6 · Continuous Learning */}
          <div
            className={`${tile} p-5 sm:p-6 md:col-span-3 lg:col-span-3`}
            style={{
              background:
                "linear-gradient(150deg, rgba(34,197,94,0.14) 0%, rgba(34,197,94,0.05) 50%, #ffffff 100%)",
            }}
          >
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              Continuous
              <br />
              Learning Engine
            </h3>
            <p className="mt-2 max-w-[200px] text-[13px] leading-relaxed text-muted">
              Optimize conversations to drive higher conversion with every call.
            </p>
            <div className="mt-6 flex justify-end">
              <Infinity className="h-10 w-10 text-brand-500/40" strokeWidth={1.5} />
            </div>
          </div>

          {/* 7 · Live Call Transfer */}
          <div
            className={`${tile} p-5 sm:p-6 md:col-span-3 lg:col-span-3`}
            style={{
              background:
                "linear-gradient(165deg, #f7fef9 0%, #f0fdf4 50%, #ffffff 100%)",
            }}
          >
            <div className="mb-6 flex items-center justify-center gap-3 pt-2">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-500/15 ring-1 ring-brand-500/25">
                <Activity className="h-5 w-5 text-brand-600" />
              </span>
              <ArrowRight className="h-4 w-4 text-brand-500/50" />
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-500/10 ring-1 ring-brand-500/20">
                <Headset className="h-5 w-5 text-brand-800" />
              </span>
            </div>
            <h3 className="text-base font-semibold tracking-tight text-foreground">
              Live Call Transfer
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">
              Hand off high-intent leads to human agents with full context.
            </p>
          </div>

          {/* 8 · Insights & Reporting (wide bottom) */}
          <div
            className={`${tile} p-5 sm:p-6 md:col-span-6 lg:col-span-6 lg:col-start-4`}
            style={{
              background:
                "linear-gradient(145deg, #ffffff 0%, #fafafa 55%, #f0fdf4 100%)",
            }}
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-stretch sm:justify-between">
              <div className="max-w-[220px]">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  Insights &amp; Reporting
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">
                  Track lead velocity, conversion by stage, and drop-off reasons.
                </p>
              </div>
              {/* Funnel mock */}
              <div className="w-full max-w-[260px] rounded-xl border border-line bg-surface-2 p-3">
                <p className="mb-3 text-[11px] font-medium text-foreground">
                  Leads Cohort Funnel
                </p>
                <div className="space-y-2">
                  {[
                    { label: "Dialable", pct: 100 },
                    { label: "Attempted", pct: 96.2 },
                    { label: "Connected", pct: 83.8 },
                    { label: "Qualified", pct: 25 },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center gap-2">
                      <div className="h-5 flex-1 overflow-hidden rounded-md bg-black/5">
                        <div
                          className="flex h-full items-center rounded-md bg-gradient-to-r from-brand-600 to-brand-500 px-2"
                          style={{ width: `${row.pct}%` }}
                        >
                          <span className="truncate text-[9px] font-medium text-white">
                            {row.label}: {row.pct}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="mt-3 rounded-md bg-brand-600 px-2.5 py-1 text-[10px] font-semibold text-white"
                >
                  Full Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OmnichannelGraph() {
  const nodes = [
    { Icon: Phone, x: "8%", y: "70%" },
    { Icon: MessageCircle, x: "28%", y: "28%" },
    { Icon: Headset, x: "50%", y: "18%" },
    { Icon: Mail, x: "72%", y: "28%" },
    { Icon: MessageSquare, x: "88%", y: "70%" },
  ];
  return (
    <div className="relative h-24 w-full max-w-[200px]">
      <svg className="absolute inset-0 h-full w-full" aria-hidden>
        <path
          d="M 20 70 Q 50 10 100 20 Q 140 30 170 70"
          fill="none"
          stroke="rgba(34,197,94,0.35)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
      </svg>
      {nodes.map(({ Icon, x, y }, i) => (
        <span
          key={i}
          className="absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-brand-500/25 bg-white text-brand-700 shadow-sm"
          style={{ left: x, top: y }}
        >
          <Icon className="h-4 w-4" strokeWidth={1.75} />
        </span>
      ))}
    </div>
  );
}
