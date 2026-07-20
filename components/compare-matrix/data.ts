export type CompareRow = {
  id: string;
  capability: string;
  speaksy: string;
  typical: string;
};

export const COMPARE_ROWS: CompareRow[] = [
  {
    id: "ab",
    capability: "A/B testing",
    speaksy:
      "Controlled experiments on voice, prompt, channel sequence, and timing, built in",
    typical: "Not available",
  },
  {
    id: "memory",
    capability: "Memory",
    speaksy:
      "Persistent across sessions and channels, leads never repeat themselves",
    typical: "Every call starts cold",
  },
  {
    id: "long",
    capability: "Long Conversations",
    speaksy: "No drift on even 30-turn complex sales and collection calls",
    typical: "Loops, contradicts, or breaks after 10+ turns",
  },
  {
    id: "compliance",
    capability: "Compliance",
    speaksy:
      "DPDP-aware, TRAI-aligned calling windows, RBI-style disclosure scripts built into agent prompts",
    typical: "Minimal compliance, no lending-specific regulatory awareness",
  },
  {
    id: "team",
    capability: "Team",
    speaksy:
      "Agile team of product managers, forward-deployed engineers, and voice specialists focused on improving your business metrics",
    typical: "Account managers with limited technical depth",
  },
];
