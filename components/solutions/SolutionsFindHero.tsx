"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  Languages,
  Loader2,
  Mic,
  Phone,
  RotateCcw,
  Search,
  Sparkles,
  ArrowUp,
} from "lucide-react";
import type { SolutionMatchResult } from "@/lib/solution-match/schema";
import SolutionMatchFlow from "./SolutionMatchFlow";

const SUGGESTIONS = [
  {
    label: "EMI reminders that actually convert",
  },
  {
    label: "COD confirmation to cut RTO",
  },
  {
    label: "OPD booking in Hindi & regional languages",
  },
  {
    label: "Angry customers after failed delivery",
  },
];

const QUICK = [
  { id: "industries", label: "Industry Intelligence", Icon: Building2 },
  { id: "calls", label: "Call types", Icon: Phone },
  { id: "languages", label: "Languages", Icon: Languages },
];

/**
 * Solutions hero + DeepSeek-powered match flow (API key stays server-side).
 */
export default function SolutionsFindHero() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [quick, setQuick] = useState("industries");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SolutionMatchResult | null>(null);
  const [matchedProblem, setMatchedProblem] = useState("");

  const runMatch = async (problem: string) => {
    const text = problem.trim();
    if (text.length < 8) {
      setError("Tell us a bit more about the calling problem.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/solutions/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problem: text }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        result?: SolutionMatchResult;
        message?: string;
        error?: string;
      };
      if (!res.ok || !data.result) {
        setError(data.message || "Could not map that problem. Try again.");
        return;
      }
      setMatchedProblem(text);
      setResult(data.result);
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void runMatch(query);
  };

  return (
    <section className="relative overflow-hidden bg-[#f6f7f9] pt-28 pb-10 sm:pt-32 sm:pb-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 20%, rgba(34,197,94,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-center sm:text-left"
        >
          {/* Small iconic top line */}
          <p className="text-[13px] font-medium tracking-wide text-neutral-500 sm:text-[14px]">
            Missed calls. Skipped follow-ups.{" "}
            <span
              className="bg-clip-text font-semibold text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(105deg, #4ade80 0%, #16a34a 55%, #15803d 100%)",
              }}
            >
              Fix it today.
            </span>
          </p>
          <h1 className="mt-3 text-[clamp(1.85rem,4.5vw,2.75rem)] font-semibold leading-[1.12] tracking-tight text-neutral-900">
            What calling bottleneck can{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-emerald-900 bg-clip-text text-transparent">
              Speaksy eliminate today?
            </span>
          </h1>
          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-neutral-500 sm:text-base">
            Tell us your biggest communication challenge. We&apos;ll instantly
            map the right AI agent, language, and capabilities to solve it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-8 sm:mt-10"
        >
          {/* Outer glow bloom */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-3 rounded-[2rem] opacity-70 blur-2xl sm:-inset-4"
            style={{
              background:
                "radial-gradient(ellipse 80% 70% at 50% 40%, rgba(74,222,128,0.35) 0%, rgba(167,243,208,0.18) 40%, transparent 70%)",
            }}
          />
          {/* Gradient border shell — richer, green-forward */}
          <div
            className="relative rounded-[1.75rem] p-[1.5px] shadow-[0_24px_64px_-24px_rgba(22,163,74,0.45)]"
            style={{
              background:
                "linear-gradient(135deg, #4ade80 0%, #86efac 14%, #d9f99d 28%, #e0e7ff 48%, #fbcfe8 64%, #bbf7d0 82%, #22c55e 100%)",
            }}
          >
            <div
              className="rounded-[1.7rem] p-3 sm:p-4"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(240,253,244,0.75) 100%)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="mb-3 flex items-center gap-2 px-1 sm:mb-3.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 text-white shadow-[0_2px_8px_-2px_rgba(22,163,74,0.55)]">
                  <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
                <p className="text-[12px] font-medium text-neutral-600 sm:text-[13px]">
                  <span className="font-semibold text-neutral-800">
                    1L+ calls / month
                  </span>{" "}
                  · understood in 10 Indian languages
                </p>
              </div>

              <form
                onSubmit={onSubmit}
                className="rounded-[1.3rem] border border-white/80 bg-white px-3 py-3 shadow-[0_10px_36px_-20px_rgba(22,163,74,0.25),0_4px_16px_-8px_rgba(0,0,0,0.08)] sm:px-4 sm:py-3.5"
              >
                <div className="flex items-start gap-2">
                  <Search
                    className="mt-2.5 h-4 w-4 shrink-0 text-neutral-400"
                    strokeWidth={1.75}
                  />
                  <textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    rows={2}
                    maxLength={600}
                    placeholder="e.g. high RTO on COD, EMI no-shows, angry patients after discharge…"
                    className="min-w-0 flex-1 resize-none bg-transparent py-1.5 text-[15px] text-neutral-900 outline-none placeholder:text-neutral-400 sm:text-base"
                    aria-label="Describe your calling bottleneck"
                    disabled={loading}
                  />
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {QUICK.map(({ id, label, Icon }) => {
                      const on = quick === id;
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setQuick(id)}
                          disabled={loading}
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium transition-all ${
                            on
                              ? "bg-brand-500/12 text-brand-800 ring-1 ring-brand-500/25"
                              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-800"
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                          {label}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="hidden h-9 w-9 items-center justify-center rounded-full text-neutral-400 sm:inline-flex">
                      <Mic className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <button
                      type="submit"
                      disabled={loading || query.trim().length < 8}
                      className="brand-pill inline-flex h-10 items-center gap-1.5 rounded-full px-5 text-[13px] font-semibold text-white shadow-[0_6px_20px_-6px_rgba(34,197,94,0.55)] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          Mapping…
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
                          Find solution
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16 }}
          className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:justify-start"
        >
          {SUGGESTIONS.map((s) => (
            <button
              key={s.label}
              type="button"
              disabled={loading}
              onClick={() => {
                setQuery(s.label);
                void runMatch(s.label);
              }}
              className="group inline-flex max-w-full items-center gap-2 rounded-full border border-black/[0.06] bg-white/90 px-3.5 py-2 text-left text-[12px] font-medium text-neutral-600 shadow-sm transition hover:border-brand-500/25 hover:text-brand-800 sm:text-[13px]"
            >
              <span className="truncate">{s.label}</span>
              <ArrowUp className="h-3 w-3 shrink-0 rotate-45 text-neutral-400 transition group-hover:text-brand-600" />
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setResult(null);
              setError(null);
            }}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.06] bg-white text-neutral-500 shadow-sm transition hover:text-brand-700"
            aria-label="Reset"
          >
            <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.75} />
          </button>
        </motion.div>

        {/* Errors */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Loading skeleton flow */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 grid gap-3 sm:grid-cols-3"
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-28 animate-pulse rounded-2xl bg-gradient-to-br from-brand-100/80 to-neutral-100"
                  style={{ animationDelay: `${i * 120}ms` }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result flow */}
        <AnimatePresence mode="wait">
          {result && !loading && (
            <SolutionMatchFlow result={result} problem={matchedProblem} />
          )}
        </AnimatePresence>

        {/* Quick jump if empty */}
        {!result && !loading && (
          <p className="mt-8 text-center text-[13px] text-neutral-500 sm:text-left">
            <button
              type="button"
              onClick={() => router.push("/solutions#gender-detection")}
              className="font-semibold text-brand-700 transition hover:text-brand-800 hover:underline"
            >
              Explore pre-built agent workflows
            </button>
          </p>
        )}
      </div>
    </section>
  );
}
