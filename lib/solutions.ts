/**
 * Solutions capabilities — plain-English expand stories for every card.
 * Nav hover shows top 6; full page shows all by category.
 */

export type SolutionCapability = {
  id: string;
  title: string;
  /** Short label on the collapsed card */
  focus: string;
  /** One-line teaser */
  description: string;
  /**
   * Expanded panel — solid, non-tech, confidence-building.
   */
  expand: {
    story: string;
    takeaways: string[];
  };
  badges: string[];
  icon: string;
  category: SolutionCategoryId;
};

export type SolutionCategoryId =
  | "intelligence"
  | "experience"
  | "integrations"
  | "security"
  | "analytics";

export type SolutionCategory = {
  id: SolutionCategoryId;
  name: string;
  tagline: string;
};

export const SOLUTION_CATEGORIES: SolutionCategory[] = [
  {
    id: "intelligence",
    name: "AI Intelligence Layer",
    tagline: "Every voice tells a story. We listen to all of it.",
  },
  {
    id: "experience",
    name: "Customer Experience",
    tagline: "Conversations that feel human. Speed that feels impossible.",
  },
  {
    id: "integrations",
    name: "Seamless Integrations",
    tagline: "Plugs into the tools you already run your business on.",
  },
  {
    id: "security",
    name: "Enterprise Security & Control",
    tagline: "Bank-grade control, built in from day one.",
  },
  {
    id: "analytics",
    name: "Analytics & Business Intelligence",
    tagline: "See what's really happening on every call.",
  },
];

export const SOLUTION_CAPABILITIES: SolutionCapability[] = [
  {
    id: "gender-detection",
    title: "Personalized From the First Word",
    focus: "Gender Detection",
    description:
      "Responses adapt naturally to who's calling — no scripts that feel one-size-fits-all.",
    expand: {
      story:
        "The agent hears who is on the line and adjusts how it greets and speaks — polite, natural, and respectful. Customers feel spoken to as people, not as a ticket number. You get higher connect rates without writing two scripts.",
      takeaways: [
        "Sounds appropriate for the person calling — from the first sentence",
        "No awkward one-size-fits-all scripts",
        "Works across sales, support, and collections calls",
      ],
    },
    badges: ["AI Powered"],
    icon: "user-circle",
    category: "intelligence",
  },
  {
    id: "age-detection",
    title: "Speaks the Right Way to Every Generation",
    focus: "Age Detection",
    description:
      "Tone and pace adjust on the fly, so a first-time senior caller and a Gen-Z customer both feel at ease.",
    expand: {
      story:
        "A senior caller gets a calmer pace and clearer language. A younger caller gets crisp, modern energy. Same agent, same goal — different delivery so nobody feels rushed or talked down to.",
      takeaways: [
        "Pace and wording adapt to the listener",
        "Fewer “I didn’t understand” moments",
        "One agent works for parents, professionals, and students",
      ],
    },
    badges: ["AI Powered"],
    icon: "user-round",
    category: "intelligence",
  },
  {
    id: "speaker-id",
    title: "Remembers Every Voice, Instantly",
    focus: "Speaker ID",
    description:
      "Returning callers are recognized in seconds — no re-explaining who they are, ever again.",
    expand: {
      story:
        "When someone calls back, Speaksy can recognize them and pick up the thread. No spelling the same name twice. No “who am I speaking to?” loop. It feels like your best agent who actually remembers people.",
      takeaways: [
        "Returning callers skip the identity song-and-dance",
        "Faster resolutions and less frustration",
        "Safer handoffs with the right customer file open",
      ],
    },
    badges: ["Instant", "AI Powered"],
    icon: "fingerprint",
    category: "intelligence",
  },
  {
    id: "customer-recognition",
    title: "Knows a Loyal Customer From a First-Time Caller",
    focus: "Customer Recognition",
    description:
      "Existing customers get VIP treatment; new callers get a flawless first impression — automatically.",
    expand: {
      story:
        "If they’re already your customer, the agent knows and treats them that way. If they’re new, the welcome is clean and confident. Loyalty feels rewarded — without a human checking a screen first.",
      takeaways: [
        "VIPs get priority tone and context",
        "New callers get a polished first impression",
        "Automatic — no agent looking up the account mid-greeting",
      ],
    },
    badges: ["AI Powered"],
    icon: "badge-check",
    category: "intelligence",
  },
  {
    id: "sentiment",
    title: "Feels Frustration Before It Becomes a Complaint",
    focus: "Tone & Sentiment",
    description:
      "Unhappy callers are flagged and escalated to a human before you lose them — not after.",
    expand: {
      story:
        "If a caller sounds angry, anxious, or about to hang up, Speaksy notices. It softens, slows down, or brings in a human with full context. You save relationships that a rigid script would burn.",
      takeaways: [
        "Detects frustration early — not after a 1-star review",
        "Can calm the call or warm-transfer a person",
        "Protects brand trust on your toughest conversations",
      ],
    },
    badges: ["Real-time", "AI Powered"],
    icon: "heart-pulse",
    category: "intelligence",
  },
  {
    id: "emergency",
    title: "Never Miss a Call That Can't Wait",
    focus: "Emergency Routing",
    description:
      "Urgent calls jump straight to the front of the queue — automatically, every time.",
    expand: {
      story:
        "Some calls can’t wait in a queue — medical, safety, fraud, service outage. Speaksy spots urgency in the words and voice, then jumps them to the right place immediately. Ordinary queries stay in the normal flow.",
      takeaways: [
        "True emergencies skip the line",
        "Right team, right now — not “someone will call back”",
        "Routine calls still get handled at scale",
      ],
    },
    badges: ["Real-time", "24/7"],
    icon: "siren",
    category: "intelligence",
  },
  {
    id: "low-latency",
    title: "Answers Before the Silence Feels Awkward",
    focus: "Instant Replies",
    description:
      "Replies land faster than a human can react — no dead air, no dropped momentum.",
    expand: {
      story:
        "Dead air kills trust. Speaksy answers in a fraction of a second so the call feels like talking to a sharp human — not waiting for a computer to think. Conversations stay natural and conversion stays high.",
      takeaways: [
        "No awkward pauses mid-sentence",
        "Feels live — even at peak call volume",
        "Customers stay engaged instead of hanging up",
      ],
    },
    badges: ["<300ms", "Real-time"],
    icon: "zap",
    category: "experience",
  },
  {
    id: "multilingual",
    title: "Speaks Your Customer's Language, Not Just Yours",
    focus: "10 Languages",
    description:
      "One platform, every regional language your customers actually speak.",
    expand: {
      story:
        "India doesn’t speak one language. Speaksy talks Hindi, Hinglish, Tamil, Telugu, and more — the way people actually speak on the phone. Same quality, same price. Your customer never has to “switch to English.”",
      takeaways: [
        "10 languages, mother-tongue quality",
        "Code-switching mid-call (like real India)",
        "One agent fabric for pan-India campaigns",
      ],
    },
    badges: ["AI Powered"],
    icon: "globe",
    category: "experience",
  },
  {
    id: "smart-routing",
    title: "Gets Callers to the Right Place, First Time",
    focus: "Smart Routing",
    description:
      "No transfers, no repeating themselves — just the right department, immediately.",
    expand: {
      story:
        "Callers hate explaining the same problem three times. Speaksy understands what they need and sends them — or a human — to the right desk the first time. Less bounce, less anger, faster resolution.",
      takeaways: [
        "Right team on the first try",
        "Context travels with the caller",
        "Fewer transfers and “please hold” loops",
      ],
    },
    badges: ["Instant"],
    icon: "route",
    category: "experience",
  },
  {
    id: "whatsapp",
    title: "Keeps the Conversation Going, Anywhere",
    focus: "WhatsApp Follow-up",
    description:
      "Calls flow into WhatsApp seamlessly — customers never have to repeat context.",
    expand: {
      story:
        "After a call, Speaksy can send the payment link, appointment card, or summary on WhatsApp — with full context. The customer continues where they left off. You close the loop without another phone tag.",
      takeaways: [
        "Payment links, confirmations, and docs on WhatsApp",
        "No “what was this about?” messages",
        "Phone + chat as one continuous conversation",
      ],
    },
    badges: ["Omnichannel"],
    icon: "message-circle",
    category: "experience",
  },
  {
    id: "crm",
    title: "Every Call Updates Your CRM Automatically",
    focus: "CRM Sync",
    description:
      "No manual data entry — customer records stay accurate without anyone lifting a finger.",
    expand: {
      story:
        "What the customer said, promised, and decided lands in your CRM the moment the call ends. Your team sees the truth without typing notes. Pipelines stay clean; managers stop chasing spreadsheets.",
      takeaways: [
        "Dispositions and notes written automatically",
        "Sales and support work from the same truth",
        "No end-of-day data entry marathon",
      ],
    },
    badges: ["Automated"],
    icon: "refresh-cw",
    category: "integrations",
  },
  {
    id: "api",
    title: "Connects to Anything Your Business Runs On",
    focus: "Your Systems",
    description:
      "Fits into your existing tech stack — instead of forcing you to change it.",
    expand: {
      story:
        "Speaksy plugs into the tools you already pay for — your phone system, CRM, OMS, hospital software, banking stack. You don’t rip out infrastructure. The agent reads and writes where your business already lives.",
      takeaways: [
        "Works with what you have today",
        "No “rip and replace” project",
        "Live data on the call — order status, balance, slots",
      ],
    },
    badges: ["Enterprise"],
    icon: "plug",
    category: "integrations",
  },
  {
    id: "workflows",
    title: "Built Around How You Work, Not a Generic Script",
    focus: "Custom Workflows",
    description:
      "Design call flows unique to your business — no engineers required.",
    expand: {
      story:
        "Your process isn’t a template. Speaksy follows your real steps — what to ask, when to offer, when to hand off — so the agent behaves like your best trained team, not a generic bot from a brochure.",
      takeaways: [
        "Your rules, your language, your handoff points",
        "Change flows without a three-week IT ticket",
        "Consistent quality across every agent minute",
      ],
    },
    badges: ["No-Code"],
    icon: "workflow",
    category: "integrations",
  },
  {
    id: "rbac",
    title: "The Right Access, for the Right People, Always",
    focus: "Access Control",
    description:
      "Your team sees exactly what they need — nothing more, nothing less.",
    expand: {
      story:
        "Not everyone on your team should hear every recording or change every campaign. Speaksy gives roles and permissions so compliance, ops, and sales each see the right slice — and auditors stay happy.",
      takeaways: [
        "Clear roles for ops, managers, and leadership",
        "Sensitive calls stay with the right people",
        "Ready for enterprise security reviews",
      ],
    },
    badges: ["Secure", "Enterprise"],
    icon: "shield-check",
    category: "security",
  },
  {
    id: "analytics",
    title: "Turns Every Call Into a Business Insight",
    focus: "Call Analytics",
    description:
      "Spot trends, gaps, and revenue opportunities without pulling a single manual report.",
    expand: {
      story:
        "Every call becomes data you can use: what customers ask for, where they drop off, which scripts convert. No waiting for a weekly report. You see what’s working this morning — and fix what isn’t by afternoon.",
      takeaways: [
        "Live view of outcomes, not gut feel",
        "Find revenue leaks and script wins fast",
        "Share clear numbers with leadership",
      ],
    },
    badges: ["Real-time"],
    icon: "bar-chart",
    category: "analytics",
  },
  {
    id: "history",
    title: "Full Context, Every Time, for Every Team",
    focus: "Call History",
    description:
      "Anyone on your team can pick up exactly where the last conversation left off.",
    expand: {
      story:
        "When a human takes over — or the customer calls again — the full story is right there. What was promised, what failed, what they prefer. Nobody starts from zero. Customers feel remembered.",
      takeaways: [
        "Complete conversation memory across teams",
        "Warm handoffs with zero “start over”",
        "Better CX without tribal knowledge",
      ],
    },
    badges: ["24/7"],
    icon: "history",
    category: "analytics",
  },
  {
    id: "live-monitor",
    title: "Watch Quality Happen in Real Time",
    focus: "Live Monitoring",
    description:
      "Supervise live conversations and step in the moment it matters.",
    expand: {
      story:
        "Managers can listen live, coach in the moment, and step in when a call turns critical. Quality isn’t a random sample next week — it’s supervision while the conversation is still happening.",
      takeaways: [
        "Live listen / join when it matters",
        "Coach teams without waiting for QA files",
        "Catch issues before they become complaints",
      ],
    },
    badges: ["Real-time", "Enterprise"],
    icon: "radio",
    category: "analytics",
  },
];

/** Top 6 for Solutions nav hover (AI Intelligence Layer) */
export const SOLUTION_NAV_TOP6 = SOLUTION_CAPABILITIES.slice(0, 6);

export const SOLUTION_BADGES = [
  "AI Powered",
  "Real-time",
  "<300ms",
  "24/7",
  "Enterprise Ready",
  "Secure",
] as const;

export function capabilitiesByCategory(categoryId: SolutionCategoryId) {
  return SOLUTION_CAPABILITIES.filter((c) => c.category === categoryId);
}
