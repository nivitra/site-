import type { Metadata } from "next";
import AudioWaveformPlayerScene from "@/components/audio-waveform-player/AudioWaveformPlayerScene";

export const metadata: Metadata = {
  title: "Audio Waveform Player · Lab",
  description:
    "Light white pill play/pause with red playhead waveform scrubber.",
  robots: { index: false, follow: false },
};

export default function AudioWaveformPlayerPage() {
  return <AudioWaveformPlayerScene />;
}
