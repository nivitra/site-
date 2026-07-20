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
      { speaker: "agent", text: "Done! Link bhej diya jayega. Aapka din shubh ho, Rohan ji.", ms: 3000 },
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
    label: "తెలుగు",
    scenario: "Order Confirmation · D2C",
    disposition: "COD Confirmed",
    turns: [
      { speaker: "agent", text: "నమస్తే అనన్య గారు! GlowKart తరఫున Speaksy నుంచి. మీ skincare combo order ship చేయడానికి ready — COD confirm చేయవచ్చా?", ms: 4400 },
      { speaker: "user", text: "అవును, confirm చేయండి. ఎప్పుడు వస్తుంది?", ms: 2400 },
      { speaker: "agent", text: "గురువారం లోపు చేరుతుంది. ₹100 loyalty credit కూడా apply అయింది. ఇంకేమైనా సాయం కావాలా?", ms: 3800 },
      { speaker: "user", text: "అంతే, ధన్యవాదాలు!", ms: 1600 },
      { speaker: "agent", text: "బాగుంది — order confirm అయింది. మంచి రోజు, అనన్య గారు!", ms: 2800 },
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
      { speaker: "agent", text: "Nandri sir! Saturday paakalaam.", ms: 2400 },
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
    <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-line bg-white p-5 text-foreground shadow-[0_8px_40px_-24px_rgba(0,0,0,0.1)] ring-1 ring-black/5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo-icon-64.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-full ring-1 ring-black/10"
          />
          <div>
            <p className="text-sm font-semibold tracking-tight text-foreground">Priya · Speaksy</p>
            <p className="text-xs text-muted">{script.scenario}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {(phase === "playing" || phase === "dialing") && (
            <span className="relative flex h-2 w-2 rounded-full bg-brand-400 live-dot" />
          )}
          <span className="font-mono text-xs text-muted-2">
            {phase === "dialing" ? "Calling…" : phase === "idle" ? "Ready" : fmt(elapsed)}
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {SCRIPTS.map((s, i) => (
          <button
            key={s.label}
            onClick={() => switchScript(i)}
            className={`font-indic rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
              i === scriptIdx
                ? "bg-foreground text-background"
                : "border border-line text-muted hover:border-line-strong hover:text-foreground"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex h-64 flex-col gap-3 overflow-hidden">
        {phase === "idle" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
            <VoiceWaveform bars={28} className="h-7 w-40 opacity-40 [&_span]:!bg-brand-500/50" />
            <p className="max-w-[220px] text-sm text-muted">
              Play dabao — aisi baat hoti hai call pe
            </p>
          </div>
        )}
        {phase === "dialing" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <div
              ref={dialRef}
              className="brand-pill flex h-14 w-14 items-center justify-center rounded-full"
              style={{ willChange: "transform" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.57.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.57 1 1 0 01-.25 1.01l-2.2 2.21z" />
              </svg>
            </div>
            <VoiceWaveform bars={20} className="h-5 w-28 opacity-70 [&_span]:!bg-brand-500/60" />
            <p className="text-sm text-muted">Connecting…</p>
          </div>
        )}
        {(phase === "playing" || phase === "done") && (
          <div className="flex flex-1 flex-col justify-end gap-2.5 overflow-hidden">
            <AnimatePresence initial={false}>
              {script.turns.slice(0, phase === "done" ? script.turns.length : turnIdx + 1).map((turn, i) => (
                <motion.div
                  key={`${scriptIdx}-${i}`}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.32, ease: "easeOut" }}
                  className={`font-indic max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-snug ${
                    turn.speaker === "agent"
                      ? "self-start rounded-bl-sm bg-brand-500/10 text-foreground"
                      : "self-end rounded-br-sm bg-surface-2 text-foreground"
                  }`}
                >
                  {turn.text}
                </motion.div>
              ))}
            </AnimatePresence>
            {phase === "done" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-1 flex items-center gap-2 self-center rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-brand-600">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span className="text-xs font-medium text-brand-700">
                  {script.disposition}
                </span>
              </motion.div>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
        <div className="flex items-center gap-3">
          <button
            onClick={phase === "idle" || phase === "done" ? play : reset}
            className="brand-pill flex h-11 w-11 items-center justify-center rounded-full text-white transition-transform hover:scale-105 active:scale-95"
            aria-label={phase === "idle" || phase === "done" ? "Play demo call" : "Stop demo call"}
          >
            {phase === "idle" || phase === "done" ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
            )}
          </button>
          <div className={agentSpeaking ? "opacity-100" : "opacity-25"} style={{ transition: "opacity 0.25s" }}>
            <VoiceWaveform bars={18} className="h-6 w-24 [&_span]:!bg-brand-500/70" />
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className={userSpeaking ? "opacity-100" : "opacity-25"} style={{ transition: "opacity 0.25s" }}>
            <VoiceWaveform bars={14} className="h-5 w-16 [&_span]:!bg-muted" />
          </div>
          <span className="text-[10px] uppercase tracking-wider text-muted-2">
            {agentSpeaking ? "Agent" : userSpeaking ? "Customer" : "Preview"}
          </span>
        </div>
      </div>
    </div>
  );
}
