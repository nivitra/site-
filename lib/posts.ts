export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readMins: number;
  author: string;
  role: string;
  body: { h?: string; p: string }[];
};

export const posts: Post[] = [
  {
    slug: "marathi-voice-bot-collections-guide",
    title: "Why Marathi-first voice bots collect 3x more than Hindi-only dialers in Maharashtra",
    excerpt:
      "Maharashtra's credit societies and NBFCs lose crores to language mismatch. Here's the data on what happens when your reminder call speaks Puneri instead of textbook Hindi.",
    category: "Language & Locale",
    date: "2026-07-02",
    readMins: 7,
    author: "Ketaki Deshmukh",
    role: "Head of Linguistics",
    body: [
      { p: "When a borrower in Nashik picks up a collections call, the first three seconds decide everything. If the voice opens in corporate Hindi — or worse, English — the mental shutter comes down: this is an outsider, this call can be ignored. If it opens with a proper 'नमस्कार' in a familiar Marathi register, the same borrower stays on the line an average of 47 seconds longer." },
      { h: "The mismatch tax", p: "Most national lenders run Hindi-only dialers across Maharashtra because that's what their BPO offered. Our campaign data across microfinance and co-op society portfolios shows the cost of that shortcut: Hindi-only campaigns in Marathi-dominant pin codes see 22% lower connect-to-conversation rates and 31% fewer promises-to-pay than matched Marathi campaigns." },
      { h: "Register matters as much as language", p: "Marathi isn't one accent. A Puneri customer expects crisp, slightly formal speech; in Vidarbha the same script lands better with Varhadi warmth. Speaksy's Marathi voices carry regional accent variants, and campaigns can be pin-code-mapped so the borrower hears the version of Marathi that sounds like home." },
      { h: "Numbers, dates and rupees", p: "The most common failure in translated TTS is numerics — '₹4,500' read as 'four thousand five hundred rupees' inside an otherwise Marathi sentence. Native models read it as 'साडेचार हजार रुपये', the way a human agent would. Small detail; measurable trust." },
      { p: "If your portfolio has Maharashtra concentration, run the A/B: same script, same window, Marathi voice versus Hindi voice. We'll set it up on a free pilot — the data will make the decision for you." },
    ],
  },
  {
    slug: "telugu-voice-ai-hyderabad-edtech",
    title: "The Telugu parent test: how Hyderabad EdTechs double demo bookings with vernacular AI",
    excerpt:
      "Course counselling in Telangana happens in Telugu, even when the course is in English. A field report from the demo-booking trenches.",
    category: "Language & Locale",
    date: "2026-06-18",
    readMins: 6,
    author: "Ravi Teja",
    role: "Solutions Architect",
    body: [
      { p: "Every Hyderabad EdTech knows the pattern: the student fills the form in English, but the buying decision happens at the dinner table — in Telugu, with a parent asking 'ఎంత ఖర్చు అవుతుంది?' (how much will it cost?). If your follow-up call can't hold that conversation, you're qualifying the wrong person in the wrong language." },
      { h: "Speed plus language", p: "Two levers move demo bookings more than anything else: calling within 60 seconds of form-fill, and speaking the household's language. Human teams can do one or the other. A Telugu-native voice agent does both, on every single lead, at 2 a.m. if that's when the form arrives." },
      { h: "What the numbers said", p: "Across coaching-institute campaigns in Telangana and Andhra Pradesh, Telugu-first agents produced 2.4–2.9x more confirmed demo attendance than English-first calling on identical lead pools. Drop-off between booking and attendance also fell, because the agent sends the WhatsApp confirmation in the same language it spoke." },
      { h: "Honorifics are conversion levers", p: "Telugu conversation runs on respect markers — 'గారు', plural verb forms, the right register for a parent versus a student. Getting these wrong doesn't just sound odd; it reads as disrespect. Our Telugu models were tuned specifically on counselling-style conversations to hold that register." },
      { p: "The playbook is simple: instant Telugu callback on every lead, qualification in the family's language, and human counsellors reserved for the final close. Your best people spend time only on parents who are already leaning yes." },
    ],
  },
  {
    slug: "hinglish-asr-code-switching",
    title: "Why global speech models fail at Hinglish — and what we did about it",
    excerpt:
      "'Sir mera payment ho gaya hai but confirmation nahi aaya' breaks most ASR systems. A technical deep-dive into code-switched speech recognition on 8kHz telephone audio.",
    category: "Engineering",
    date: "2026-05-30",
    readMins: 9,
    author: "Aniruddh Rao",
    role: "Voice ML Lead",
    body: [
      { p: "Take a sentence every Indian call center hears daily: 'Sir mera payment ho gaya hai but confirmation nahi aaya.' Feed it to a leading global speech model and you'll get transcription soup — 'mera' becomes 'mara', 'nahi aaya' becomes 'nay a', and the LLM downstream reasons about garbage. Word Error Rates on code-switched Indian telephone audio run 2–3x higher than the same vendors' English benchmarks." },
      { h: "Why it breaks", p: "Three compounding problems: telephone audio is 8kHz (half the frequency information of the 16kHz these models were trained on), Indian calls are acoustically hostile (traffic, market noise, speakerphone), and code-switching means the language model prior fights the acoustics — the decoder wants to stay in one language while the speaker refuses to." },
      { h: "The fix is data, not architecture", p: "We fine-tuned on millions of minutes of real, consented, PII-scrubbed Indian call audio where code-switching is the norm, not the exception. The tokenizer treats Hinglish as a first-class language rather than an error state between Hindi and English. Result: 7.4% WER on our code-switched benchmark versus 15%+ for the best global alternative." },
      { h: "Latency is part of accuracy", p: "A perfect transcript that arrives 900ms late produces a worse conversation than a good transcript in 180ms, because the agent talks over the customer. Our streaming ASR emits partials continuously and finalizes under 200ms after end-of-speech, which is what lets the whole pipeline stay under 800ms round-trip." },
      { p: "The takeaway for buyers: ask any voice AI vendor for their WER on 8kHz code-switched audio, not their marketing benchmark. If they haven't measured it, your customers will measure it for them." },
    ],
  },
  {
    slug: "trai-dnd-compliance-voice-ai",
    title: "The compliance checklist for AI calling in India: TRAI, DND, DPDP and RBI norms",
    excerpt:
      "Automated calling in India sits inside a real regulatory perimeter. Here's the practical checklist we enforce at platform level so your legal team can sleep.",
    category: "Compliance",
    date: "2026-05-12",
    readMins: 8,
    author: "Nandini Iyer",
    role: "Compliance & Trust",
    body: [
      { p: "Voice AI at Indian scale means lakhs of dials a day, and every one of them sits inside TRAI's telecom regulations, the DPDP Act's data rules, and — for lenders — RBI's fair practice codes. Treating compliance as a spreadsheet your ops team maintains is how companies end up in the newspaper." },
      { h: "Calling windows and DND", p: "Commercial calls are restricted to 9:00 AM – 9:00 PM under TRAI's TCCCPR framework, and numbers on the DND registry must be scrubbed before dialing. Speaksy enforces both at the platform layer: campaigns physically cannot dial outside configured windows, and lead lists are scrubbed against DND before the first call is queued." },
      { h: "DPDP and voice data", p: "Call recordings and transcripts are personal data under the DPDP Act. That means purpose limitation, retention policies and Indian data residency need to be real, auditable configurations — not intentions. All Speaksy processing and storage stays on Indian servers, encrypted at rest, with configurable retention per workspace." },
      { h: "PII in transcripts", p: "Collections and KYC calls surface PAN numbers, Aadhaar digits and card numbers in speech. Our pipeline masks these in real time as the transcript streams, so downstream systems, QA reviewers and LLM providers never see raw identifiers." },
      { h: "RBI's fair practice expectations", p: "For lending use cases, scripts must avoid harassment patterns, respect contact frequency norms, and identify the caller truthfully. Because Speaksy agents follow deterministic graphs, every published script version is auditable — you can show a regulator exactly what was said, on every call, forever." },
      { p: "Ask your current vendor which of these are enforced in software versus promised in a slide. The difference is your risk." },
    ],
  },
  {
    slug: "cost-per-outcome-call-center-math",
    title: "Stop measuring cost per call. Start measuring cost per outcome.",
    excerpt:
      "A ₹5 call that collects nothing is more expensive than a ₹15 call that gets a payment promise. The unit-economics framework for voice operations.",
    category: "Business",
    date: "2026-04-22",
    readMins: 6,
    author: "Manav Khanna",
    role: "Co-founder",
    body: [
      { p: "Call center procurement has trained everyone to ask one question: 'what's your rate per call?' It's the wrong question. The right one is: what does one qualified lead, one payment promise, one confirmed order actually cost me, end to end?" },
      { h: "The hidden denominators", p: "A human dialer at ₹8/call looks cheap until you divide by outcomes. Factor in 30% connect rates, agent attrition, retraining, QA sampling that catches 2% of calls, and leads that go stale waiting in queues — and your real cost per payment promise is often ₹150–₹400." },
      { h: "What changes with AI economics", p: "Per-second billing on live talk-time only means failed connects cost zero. Propensity dialing lifts connect rates toward 90%, so the same lead list produces more conversations. And because every call is QA'd automatically, script drift gets caught the day it starts, not at month-end review." },
      { h: "A worked example", p: "50,000 leads/month, 65% connect, 2.5-minute average conversation: roughly 81,000 live minutes. At Speaksy rates that's about ₹3.2 lakh/month — versus ₹9–12 lakh for the equivalent human operation, with per-call QA coverage going from 2% to 100%. If outcomes hold (in our campaigns they improve), cost per outcome drops 60–70%." },
      { p: "Run your own numbers in the ROI calculator on our pricing page — and then run a 100-minute pilot against your current operation. Outcomes, not rates." },
    ],
  },
  {
    slug: "graph-agents-vs-prompt-bots",
    title: "Graph agents vs. prompt-only bots: why determinism wins on the phone",
    excerpt:
      "A 2,000-word prompt is a prayer, not a process. How dialogue state machines keep AI calls on-script when money is on the line.",
    category: "Engineering",
    date: "2026-04-03",
    readMins: 7,
    author: "Aniruddh Rao",
    role: "Voice ML Lead",
    body: [
      { p: "The demo of a prompt-only voice bot is always impressive. The 40,000th call is where it falls apart: the model improvises a discount that doesn't exist, skips a mandatory disclosure, or wanders into a topic your compliance team never approved. On the phone, with money involved, 'usually correct' is not a spec." },
      { h: "The state machine alternative", p: "Speaksy agents are graphs: static nodes speak controlled scripts, router nodes classify the customer's intent and choose an edge, action nodes hit your APIs. The LLM does what it's genuinely good at — understanding messy human speech — while the flow of the conversation stays deterministic and auditable." },
      { h: "Versioning is the superpower", p: "Every published graph is immutable. Active calls pin to the version they started on; edits become a new version with validation for unreachable nodes and dead ends. When a regulator or a client asks 'what did the bot say to this customer on May 14th?', the answer is exact, not probabilistic." },
      { h: "Latency dividend", p: "Static nodes can be pre-synthesized and cached — the greeting, the disclosure, the payment instructions play with zero synthesis latency and zero token cost. Only genuinely dynamic turns touch the LLM and TTS. Determinism turns out to be a performance optimization too." },
      { p: "Prompt-only bots are fine for demos and low-stakes FAQ lines. For collections, sales and anything a lawyer might read a transcript of, ship a graph." },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
