"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { animate } from "animejs";
import VoiceWaveform from "./ui/VoiceWaveform";

type Turn = {
  speaker: "agent" | "user";
  text: string;
  ms: number;
};

type Script = {
  label: string;
  scenario: string;
  disposition: string;
  turns: Turn[];
};

const SCRIPTS: Script[] = [
  {
    label: "Hinglish",
    scenario: "EMI Reminder · Lending",
    disposition: "Payment Promised",
    turns: [
      { speaker: "agent", text: "Namaste Rohan ji! Main Speaksy se Priya bol rahi hoon. Aapki ₹4,500 ki EMI due hai — kya aap aaj payment kar payenge?", ms: 4200 },
      { speaker: "user", text: "Haan, actually thoda busy tha... kal tak kar dunga pakka.", ms: 2800 },
      { speaker: "agent", text: "Koi baat nahi! Main aapko kal subah 11 baje WhatsApp par payment link bhej deti hoon. Theek rahega?", ms: 3600 },
      { speaker: "user", text: "Haan perfect, bhej dijiye.", ms: 1800 },
      { speaker: "agent", text: "Done! Link bhej diya jayega. Aapka din shubh ho, Rohan ji. 😊", ms: 3000 },
    ],
  },
  {
    label: "हिन्दी",
    scenario: "EMI Reminder · Collections",
    disposition: "Payment Promised",
    turns: [
      { speaker: "agent", text: "नमस्ते रोहन जी! मैं स्पीक्सी से प्रिया बोल रही हूँ। आपकी ₹4,500 की EMI कल due है — क्या आप आज payment कर पाएँगे?", ms: 4400 },
      { speaker: "user", text: "हाँ, थोड़ा व्यस्त था… कल तक पक्का कर दूँगा।", ms: 2800 },
      { speaker: "agent", text: "कोई बात नहीं! मैं कल सुबह 11 बजे WhatsApp पर payment link भेज दूँगी। ठीक रहेगा?", ms: 3600 },
      { speaker: "user", text: "हाँ, भेज दीजिए।", ms: 1600 },
      { speaker: "agent", text: "धन्यवाद रोहन जी! लिंक भेज दिया जाएगा। आपका दिन शुभ हो।", ms: 3000 },
    ],
  },
  {
    label: "मराठी",
    scenario: "EMI Reminder · Co-op Bank",
    disposition: "Payment Promised",
    turns: [
      { speaker: "agent", text: "नमस्कार रोहन जी! मी स्पीक्सीकडून माधुरा बोलतेय. तुमची ₹4,500 ची EMI उद्या due आहे — आज payment करू शकाल का?", ms: 4400 },
      { speaker: "user", text: "हो, उद्या नक्की करेन. सकाळी आठवणी दे.", ms: 2600 },
      { speaker: "agent", text: "ठीक आहे! मी उद्या सकाळी 11 वाजता WhatsApp वर payment link पाठवते. चालेल?", ms: 3600 },
      { speaker: "user", text: "चालेल, धन्यवाद.", ms: 1600 },
      { speaker: "agent", text: "धन्यवाद रोहन जी! तुमचा दिवस चांगला जावो.", ms: 2800 },
    ],
  },
  {
    label: "English",
    scenario: "Order Confirmation · D2C",
    disposition: "COD Confirmed",
    turns: [
      { speaker: "agent", text: "Hi Ananya! This is Speaksy calling on behalf of GlowKart. Your order for the skincare combo is ready to ship — shall I confirm the cash-on-delivery?", ms: 4400 },
      { speaker: "user", text: "Oh yes, please confirm it. When will it arrive?", ms: 2400 },
      { speaker: "agent", text: "It'll reach you by Thursday. I've also applied your ₹100 loyalty credit automatically. Anything else I can help with?", ms: 3800 },
      { speaker: "user", text: "No that's all, thank you!", ms: 1600 },
      { speaker: "agent", text: "Wonderful — your order is confirmed. Have a great day, Ananya!", ms: 2800 },
    ],
  },
  {
    label: "தமிழ்",
    scenario: "Appointment Booking · Clinic",
    disposition: "Slot Booked",
    turns: [
      { speaker: "agent", text: "Vanakkam Karthik sir! Naan Speaksy-lerndhu pesuren. Dr. Meena clinic-la ungaluku Friday 5 PM slot available — book pannalaama?", ms: 4400 },
      { speaker: "user", text: "Friday konjam kashtam... Saturday morning irukka?", ms: 2600 },
      { speaker: "agent", text: "Kandippa! Saturday 10:30 AM slot free-ya iruku. Adha confirm pannitten — SMS-la details anupren.", ms: 3800 },
      { speaker: "user", text: "Super, nandri!", ms: 1400 },
      { speaker: "agent", text: "Nandri sir! Saturday paakalaam. 🙏", ms: 2400 },
    ],
  },
];

type Phase = "idle" | "dialing" | "playing" | "done";

export default function CallDemo() {
  const [scriptIdx, setScriptIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [turnIdx, setTurnIdx] = useState(-1);
  const [elapsed, setElapsed] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const dialRef = useRef<HTMLDivElement>(null);
  const script = SCRIPTS[scriptIdx];

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const reset = useCallback(() => {
    clearTimers();
    setPhase("idle");
    setTurnIdx(-1);
    setElapsed(0);
  }, [clearTimers]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  useEffect(() => {
    if (phase !== "playing" && phase !== "dialing") return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [phase]);

  const play = () => {
    reset();
    setPhase("dialing");
    let acc = 1400; // dialing time
    timers.current.push(
      setTimeout(() => {
        setPhase("playing");
        setTurnIdx(0);
      }, acc)
    );
    script.turns.forEach((turn, i) => {
      acc += turn.ms;
      timers.current.push(
        setTimeout(() => {
          if (i < script.turns.length - 1) setTurnIdx(i + 1);
          else setPhase("done");
        }, acc)
      );
    });
  };

  const switchScript = (i: number) => {
    setScriptIdx(i);
    reset();
  };

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const activeTurn = turnIdx >= 0 ? script.turns[Math.min(turnIdx, script.turns.length - 1)] : null;
  const agentSpeaking = phase === "playing" && activeTurn?.speaker === "agent";
  const userSpeaking = phase === "playing" && activeTurn?.speaker === "user";

  useEffect(() => {
    if (phase !== "dialing" || !dialRef.current) return;
    const el = dialRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const a = animate(el, {
      scale: [1, 1.1, 1],
      duration: 900,
      loop: true,
      ease: "inOutSine",
    });
    return () => {
      a.revert();
    };
  }, [phase]);

  return (
    <div className="card relative w-full max-w-md overflow-hidden rounded-3xl p-5 shadow-[0_12px_40px_-12px_rgba(22,163,74,0.08)]">
      {/* header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo-icon-64.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold text-foreground">Speaksy Agent · Priya</p>
            <p className="text-xs text-muted">{script.scenario}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {(phase === "playing" || phase === "dialing") && (
            <span className="relative flex h-2 w-2 rounded-full bg-brand-500 live-dot" />
          )}
          <span className="font-mono text-xs text-muted">
            {phase === "dialing" ? "Dialing…" : phase === "idle" ? "Ready" : fmt(elapsed)}
          </span>
        </div>
      </div>

      {/* language tabs */}
      <div className="mt-4 flex flex-wrap gap-2">
        {SCRIPTS.map((s, i) => (
          <button
            key={s.label}
            onClick={() => switchScript(i)}
            className={`font-indic rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
              i === scriptIdx
                ? "bg-brand-600 text-white"
                : "border border-line text-muted hover:border-brand-600/40 hover:text-foreground"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* transcript */}
      <div className="mt-4 flex h-64 flex-col gap-3 overflow-hidden">
        {phase === "idle" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
            <VoiceWaveform bars={28} className="h-7 w-40 opacity-50" />
            <p className="max-w-[220px] text-sm text-muted">
              Press play to preview a real Speaksy conversation flow.
            </p>
          </div>
        )}
        {phase === "dialing" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <div
              ref={dialRef}
              className="brand-pill flex h-16 w-16 items-center justify-center rounded-full shadow-[0_4px_16px_rgba(22,163,74,0.3)]"
              style={{ willChange: "transform" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.57.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.57 1 1 0 01-.25 1.01l-2.2 2.21z" />
              </svg>
            </div>
            <VoiceWaveform bars={20} className="h-5 w-28" />
            <p className="text-sm text-muted">Connecting call…</p>
          </div>
        )}
        {(phase === "playing" || phase === "done") && (
          <div className="flex flex-1 flex-col justify-end gap-2.5 overflow-hidden">
            <div className="flex flex-col gap-2.5 overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {script.turns.slice(0, phase === "done" ? script.turns.length : turnIdx + 1).map((turn, i) => (
                  <motion.div
                    key={`${scriptIdx}-${i}`}
                    initial={{ opacity: 0, y: 16, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className={`font-indic max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-snug ${
                      turn.speaker === "agent"
                        ? "self-start rounded-bl-sm bg-brand-600/10 text-foreground border border-brand-600/10"
                        : "self-end rounded-br-sm bg-surface-2 text-foreground"
                    }`}
                  >
                    {turn.text}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {phase === "done" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-1 flex items-center gap-2 self-center rounded-full border border-brand-600/20 bg-brand-600/5 px-4 py-1.5"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span className="text-xs font-semibold text-brand-700">
                  Outcome: {script.disposition}
                </span>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* footer controls */}
      <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
        <div className="flex items-center gap-3">
          <button
            onClick={phase === "idle" || phase === "done" ? play : reset}
            className="brand-pill flex h-11 w-11 items-center justify-center rounded-full text-white shadow-[0_4px_16px_rgba(22,163,74,0.3)] transition-transform hover:scale-105 active:scale-95"
            aria-label={phase === "idle" || phase === "done" ? "Play demo call" : "Stop demo call"}
          >
            {phase === "idle" || phase === "done" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
            )}
          </button>
          <div className={agentSpeaking ? "opacity-100" : "opacity-30"} style={{ transition: "opacity 0.25s" }}>
            <VoiceWaveform bars={18} className="h-6 w-24" />
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className={userSpeaking ? "opacity-100" : "opacity-30"} style={{ transition: "opacity 0.25s" }}>
            <VoiceWaveform bars={14} className="h-5 w-16 [&_span]:!bg-muted" />
          </div>
          <span className="text-[10px] uppercase tracking-wider text-muted">
            {agentSpeaking ? "Agent speaking" : userSpeaking ? "Customer speaking" : "Simulated preview"}
          </span>
        </div>
      </div>
    </div>
  );
}
