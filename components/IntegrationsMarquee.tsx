"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

const integrations = [
  "Twilio", "Exotel", "Plivo", "Airtel IQ", "Acefone", "Deepgram", "Sarvam AI",
  "AssemblyAI", "ElevenLabs", "Cartesia", "Smallest.ai", "OpenAI", "Anthropic",
  "Gemini", "Groq", "HubSpot", "Zoho CRM", "Salesforce", "LeadSquared",
  "WhatsApp Business", "Zapier", "Make.com", "n8n", "Google Calendar",
];

export default function IntegrationsMarquee() {
  const row = [...integrations, ...integrations];
  const labelRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = labelRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        animate(el, {
          opacity: [0, 1],
          letterSpacing: ["0.45em", "0.25em"],
          duration: 900,
          ease: "out(3)",
        });
      },
      { threshold: 0.5 }
    );
    el.style.opacity = "0";
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="py-16">
      <p
        ref={labelRef}
        className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted"
      >
        Plugs into the stack you already use
      </p>
      <div className="marquee-mask overflow-hidden">
        <div className="animate-marquee flex w-max gap-4">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="card whitespace-nowrap rounded-full px-6 py-3 text-sm font-medium text-muted transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/40 hover:text-brand-300 hover:shadow-[0_12px_30px_-16px_rgba(34,197,94,0.5)]"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
