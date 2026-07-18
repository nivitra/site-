"use client";

import VoiceWaveform from "./ui/VoiceWaveform";

export default function SampleCall({
  label,
  agent,
  user,
  agent2,
  outcome,
  badge = "Sy",
}: {
  label: string;
  agent: string;
  user: string;
  agent2: string;
  outcome: string;
  badge?: string;
}) {
  return (
    <div className="card flex flex-col gap-3 rounded-3xl p-6">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-muted">
          <span className="relative flex h-2 w-2 rounded-full bg-brand-400 live-dot" />
          Sample call · {label}
        </span>
        <span className="brand-pill flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-xs font-bold text-white">
          {badge}
        </span>
      </div>

      {/* the signature living waveform */}
      <VoiceWaveform className="my-1 opacity-90" />

      <div className="max-w-[90%] self-start rounded-2xl rounded-bl-sm bg-brand-900/70 px-4 py-3 text-sm leading-relaxed text-[#d8f5e0]">
        {agent}
      </div>
      <div className="max-w-[90%] self-end rounded-2xl rounded-br-sm bg-white/10 px-4 py-3 text-sm leading-relaxed">
        {user}
      </div>
      <div className="max-w-[90%] self-start rounded-2xl rounded-bl-sm bg-brand-900/70 px-4 py-3 text-sm leading-relaxed text-[#d8f5e0]">
        {agent2}
      </div>

      <div className="mt-1 flex items-center justify-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-center text-xs font-semibold text-brand-300">
        ✓ {outcome}
      </div>
    </div>
  );
}
