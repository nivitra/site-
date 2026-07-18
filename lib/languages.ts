export type Language = {
  slug: string;
  name: string;
  native: string;
  scriptName: string;
  speakers: string;
  rank: number;
  regions: string[];
  tagline: string;
  greeting: string;
  dialogue: { agent: string; user: string; agent2: string };
  useCases: { title: string; desc: string }[];
  voices: { name: string; style: string }[];
  dialects: string;
  keywords: string[];
  rtl?: boolean;
};

export const languages: Language[] = [
  {
    slug: "hindi",
    name: "Hindi",
    native: "हिन्दी",
    scriptName: "Devanagari",
    speakers: "60 Cr+",
    rank: 1,
    regions: ["Uttar Pradesh", "Bihar", "Madhya Pradesh", "Rajasthan", "Delhi NCR", "Haryana", "Jharkhand", "Chhattisgarh", "Uttarakhand"],
    tagline: "The heartbeat of Indian business calling — spoken natively, not translated.",
    greeting: "नमस्ते! मैं स्पीक्सी से बोल रही हूँ।",
    dialogue: {
      agent: "नमस्ते रोहन जी! आपकी ₹4,500 की EMI कल due है — क्या आप आज payment कर पाएँगे?",
      user: "हाँ, कल पक्का कर दूँगा।",
      agent2: "ठीक है! मैं कल सुबह WhatsApp पर payment link भेज दूँगी। धन्यवाद, आपका दिन शुभ हो!",
    },
    useCases: [
      { title: "EMI & collections", desc: "Polite, firm payment reminders across the Hindi belt with promise-to-pay capture." },
      { title: "Lead qualification", desc: "Qualify property, loan and insurance leads in the customer's own boli." },
      { title: "COD confirmation", desc: "Confirm lakhs of cash-on-delivery orders daily in natural Hindi." },
    ],
    voices: [
      { name: "Priya", style: "warm, professional — collections & support" },
      { name: "Arjun", style: "energetic, confident — sales & outreach" },
    ],
    dialects: "Khari Boli, Awadhi-lean, Bhojpuri-lean and Haryanvi-lean accents supported",
    keywords: ["Hindi voice bot", "AI calling in Hindi", "Hindi voice AI agent", "Hindi telecalling automation"],
  },
  {
    slug: "hinglish",
    name: "Hinglish",
    native: "Hinglish",
    scriptName: "Roman + Devanagari mix",
    speakers: "35 Cr+ urban",
    rank: 2,
    regions: ["Delhi NCR", "Mumbai", "Bengaluru", "Pune", "Hyderabad", "every metro & Tier-1 city"],
    tagline: "The language India actually speaks on the phone — code-switching mid-sentence, like a real person.",
    greeting: "Hello ji! Main Speaksy se bol rahi hoon.",
    dialogue: {
      agent: "Namaste Rohan ji! Aapki ₹4,500 ki EMI kal due hai — kya aap aaj payment kar payenge?",
      user: "Haan yaar, thoda busy tha... kal pakka kar dunga.",
      agent2: "No problem! Main kal subah 11 baje WhatsApp par link bhej deti hoon. Thank you, have a great day!",
    },
    useCases: [
      { title: "Urban sales calls", desc: "Metro customers expect Hinglish — pure Hindi or pure English both feel off." },
      { title: "Fintech onboarding", desc: "KYC follow-ups and app-activation nudges in natural code-switched flow." },
      { title: "Cart recovery", desc: "Win back abandoned carts with a friendly 'Sir, aapka cart wait kar raha hai'." },
    ],
    voices: [
      { name: "Sana", style: "friendly metro accent — D2C & fintech" },
      { name: "Kabir", style: "smart casual — sales & upsell" },
    ],
    dialects: "Seamless Hindi↔English switching, tuned on real Indian call-center audio",
    keywords: ["Hinglish voice bot", "Hinglish AI calling", "code-switching voice AI", "Hinglish voicebot sales"],
  },
  {
    slug: "marathi",
    name: "Marathi",
    native: "मराठी",
    scriptName: "Devanagari",
    speakers: "8.3 Cr+",
    rank: 3,
    regions: ["Maharashtra", "Mumbai", "Pune", "Nagpur", "Nashik", "Goa (partial)"],
    tagline: "From Mumbai boardrooms to Vidarbha farms — one agent that sounds gharguti everywhere.",
    greeting: "नमस्कार! मी स्पीक्सीकडून बोलत आहे.",
    dialogue: {
      agent: "नमस्कार रोहन जी! तुमची ₹4,500 ची EMI उद्या due आहे — आज payment करू शकाल का?",
      user: "हो, उद्या नक्की करेन.",
      agent2: "ठीक आहे! मी उद्या सकाळी WhatsApp वर payment link पाठवते. धन्यवाद, तुमचा दिवस चांगला जावो!",
    },
    useCases: [
      { title: "Co-op & MFI collections", desc: "Maharashtra's credit societies and microfinance run on Marathi trust." },
      { title: "Real estate follow-ups", desc: "Pune & Mumbai property leads qualified in the language they think in." },
      { title: "Agri & FPO outreach", desc: "Mandi prices, crop advisories and payment updates for rural Maharashtra." },
    ],
    voices: [
      { name: "Madhura", style: "soft, respectful — collections & service" },
      { name: "Sameer", style: "brisk, clear — sales & logistics" },
    ],
    dialects: "Puneri, Mumbaikar, Varhadi and Konkan-influenced accents supported",
    keywords: ["Marathi voice bot", "AI calling in Marathi", "Marathi voice AI agent", "Marathi telecalling software"],
  },
  {
    slug: "telugu",
    name: "Telugu",
    native: "తెలుగు",
    scriptName: "Telugu script",
    speakers: "8.1 Cr+",
    rank: 4,
    regions: ["Telangana", "Andhra Pradesh", "Hyderabad", "Visakhapatnam", "Vijayawada"],
    tagline: "The Italian of the East, spoken by an agent that never sleeps.",
    greeting: "నమస్తే! నేను స్పీక్సీ నుంచి మాట్లాడుతున్నాను.",
    dialogue: {
      agent: "నమస్తే రోహన్ గారు! మీ ₹4,500 EMI రేపు due — ఈరోజు చెల్లించగలరా?",
      user: "సరే, రేపు తప్పకుండా చేస్తాను.",
      agent2: "సరే! రేపు ఉదయం WhatsApp లో payment link పంపిస్తాను. ధన్యవాదాలు, మీ రోజు బాగుండాలి!",
    },
    useCases: [
      { title: "Chit funds & gold loans", desc: "The Telugu states' favourite credit products, serviced in Telugu." },
      { title: "EdTech counselling", desc: "Hyderabad's coaching economy runs on Telugu parent conversations." },
      { title: "Pharma & clinic bookings", desc: "Appointment scheduling for AP & Telangana's hospital networks." },
    ],
    voices: [
      { name: "Lakshmi", style: "gentle, courteous — healthcare & service" },
      { name: "Ravi", style: "assertive, warm — collections & sales" },
    ],
    dialects: "Telangana and Coastal Andhra accents both supported natively",
    keywords: ["Telugu voice bot", "AI calling in Telugu", "Telugu voice AI agent", "Telugu telecalling automation"],
  },
  {
    slug: "tamil",
    name: "Tamil",
    native: "தமிழ்",
    scriptName: "Tamil script",
    speakers: "6.9 Cr+",
    rank: 5,
    regions: ["Tamil Nadu", "Chennai", "Coimbatore", "Madurai", "Puducherry"],
    tagline: "2,000 years of language pride — respected by an AI that gets the honorifics right.",
    greeting: "வணக்கம்! நான் ஸ்பீக்ஸியிலிருந்து பேசுகிறேன்.",
    dialogue: {
      agent: "வணக்கம் ரோஹன் சார்! உங்க ₹4,500 EMI நாளை due — இன்னைக்கு payment பண்ண முடியுமா?",
      user: "சரி, நாளை கண்டிப்பா பண்றேன்.",
      agent2: "சரி சார்! நாளை காலை WhatsApp-ல payment link அனுப்பறேன். நன்றி, உங்க நாள் நல்லா இருக்கட்டும்!",
    },
    useCases: [
      { title: "NBFC & vehicle finance", desc: "Two-wheeler and commercial vehicle loan servicing across TN." },
      { title: "Textile & MSME B2B", desc: "Order confirmations and payment follow-ups for Tiruppur & Coimbatore." },
      { title: "Hospital front desk", desc: "Chennai's healthcare corridors handled with correct honorifics." },
    ],
    voices: [
      { name: "Meena", style: "polite, precise — service & healthcare" },
      { name: "Karthik", style: "friendly, direct — sales & collections" },
    ],
    dialects: "Chennai, Kongu and Madurai accents; Tanglish code-switching supported",
    keywords: ["Tamil voice bot", "AI calling in Tamil", "Tamil voice AI agent", "Tanglish voicebot"],
  },
  {
    slug: "gujarati",
    name: "Gujarati",
    native: "ગુજરાતી",
    scriptName: "Gujarati script",
    speakers: "5.5 Cr+",
    rank: 6,
    regions: ["Gujarat", "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Mumbai (large diaspora)"],
    tagline: "India's most business-minded language deserves an agent that talks dhandho.",
    greeting: "નમસ્તે! હું સ્પીક્સીથી બોલી રહી છું.",
    dialogue: {
      agent: "નમસ્તે રોહનભાઈ! તમારી ₹4,500 ની EMI કાલે due છે — આજે payment કરી શકશો?",
      user: "હા, કાલે ચોક્કસ કરીશ.",
      agent2: "સરસ! હું કાલે સવારે WhatsApp પર payment link મોકલીશ. આભાર, તમારો દિવસ શુભ રહે!",
    },
    useCases: [
      { title: "Trading & B2B credit", desc: "Payment reminders for Gujarat's massive trading and textile networks." },
      { title: "Diamond & jewellery CRM", desc: "Surat's order coordination in the bhasha of the bazaar." },
      { title: "Co-op banking", desc: "Gujarat's co-operative banks serviced respectfully at scale." },
    ],
    voices: [
      { name: "Hetal", style: "warm, familial — banking & service" },
      { name: "Jay", style: "business-brisk — B2B & trading" },
    ],
    dialects: "Amdavadi, Surti and Kathiawadi accents supported",
    keywords: ["Gujarati voice bot", "AI calling in Gujarati", "Gujarati voice AI agent", "Gujarati telecalling"],
  },
  {
    slug: "kannada",
    name: "Kannada",
    native: "ಕನ್ನಡ",
    scriptName: "Kannada script",
    speakers: "4.4 Cr+",
    rank: 7,
    regions: ["Karnataka", "Bengaluru", "Mysuru", "Hubballi", "Mangaluru"],
    tagline: "In India's tech capital, the smartest voice AI speaks Kannada first.",
    greeting: "ನಮಸ್ಕಾರ! ನಾನು ಸ್ಪೀಕ್ಸಿಯಿಂದ ಮಾತನಾಡುತ್ತಿದ್ದೇನೆ.",
    dialogue: {
      agent: "ನಮಸ್ಕಾರ ರೋಹನ್ ಸರ್! ನಿಮ್ಮ ₹4,500 EMI ನಾಳೆ due — ಇವತ್ತು payment ಮಾಡಲು ಸಾಧ್ಯವೇ?",
      user: "ಸರಿ, ನಾಳೆ ಖಂಡಿತ ಮಾಡ್ತೀನಿ.",
      agent2: "ಸರಿ ಸರ್! ನಾಳೆ ಬೆಳಿಗ್ಗೆ WhatsApp ನಲ್ಲಿ payment link ಕಳುಹಿಸುತ್ತೇನೆ. ಧನ್ಯವಾದಗಳು!",
    },
    useCases: [
      { title: "Startup CX at scale", desc: "Bengaluru startups serving Karnataka customers in their own language." },
      { title: "Housing societies & rentals", desc: "Rent reminders and maintenance coordination across Bengaluru." },
      { title: "Agri-fintech", desc: "Crop loan servicing for North Karnataka's farming belt." },
    ],
    voices: [
      { name: "Ananya", style: "clear, modern — startups & CX" },
      { name: "Sandeep", style: "grounded, respectful — finance & agri" },
    ],
    dialects: "Bengaluru, Mysuru and North Karnataka accents supported",
    keywords: ["Kannada voice bot", "AI calling in Kannada", "Kannada voice AI agent", "Kannada telecalling"],
  },
  {
    slug: "bengali",
    name: "Bengali",
    native: "বাংলা",
    scriptName: "Bengali script",
    speakers: "9.7 Cr+",
    rank: 8,
    regions: ["West Bengal", "Kolkata", "Tripura", "Assam (Barak Valley)"],
    tagline: "The language of poets, now the language of perfectly-timed payment reminders.",
    greeting: "নমস্কার! আমি স্পিক্সি থেকে বলছি।",
    dialogue: {
      agent: "নমস্কার রোহনবাবু! আপনার ₹৪,৫০০ EMI আগামীকাল due — আজ payment করতে পারবেন?",
      user: "হ্যাঁ, কাল নিশ্চয়ই করব।",
      agent2: "ঠিক আছে! কাল সকালে WhatsApp-এ payment link পাঠিয়ে দেব। ধন্যবাদ, ভালো থাকবেন!",
    },
    useCases: [
      { title: "Microfinance JLG groups", desc: "Bengal's MFI sector serviced with bhodrolok courtesy." },
      { title: "E-commerce COD", desc: "Kolkata and district COD confirmations in natural Bangla." },
      { title: "Education & coaching", desc: "Admission counselling for Bengal's coaching ecosystem." },
    ],
    voices: [
      { name: "Riya", style: "soft, cultured — service & education" },
      { name: "Abir", style: "warm, persuasive — sales & collections" },
    ],
    dialects: "Kolkata standard and district accents supported",
    keywords: ["Bengali voice bot", "AI calling in Bengali", "Bangla voice AI agent", "Bengali telecalling"],
  },
  {
    slug: "malayalam",
    name: "Malayalam",
    native: "മലയാളം",
    scriptName: "Malayalam script",
    speakers: "3.5 Cr+",
    rank: 9,
    regions: ["Kerala", "Kochi", "Thiruvananthapuram", "Kozhikode", "Gulf diaspora"],
    tagline: "India's most literate state expects intelligence on every call. We deliver it.",
    greeting: "നമസ്കാരം! ഞാൻ സ്പീക്സിയിൽ നിന്നാണ് വിളിക്കുന്നത്.",
    dialogue: {
      agent: "നമസ്കാരം രോഹൻ സാർ! നിങ്ങളുടെ ₹4,500 EMI നാളെ due ആണ് — ഇന്ന് അടയ്ക്കാൻ കഴിയുമോ?",
      user: "ശരി, നാളെ തീർച്ചയായും ചെയ്യാം.",
      agent2: "ശരി സാർ! നാളെ രാവിലെ WhatsApp-ൽ payment link അയയ്ക്കാം. നന്ദി, നല്ല ദിവസം!",
    },
    useCases: [
      { title: "Gold loan servicing", desc: "Kerala's NBFC gold-loan giants run on Malayalam relationships." },
      { title: "NRI & remittance support", desc: "Gulf-timezone follow-ups for Kerala's diaspora households." },
      { title: "Ayurveda & wellness booking", desc: "Treatment scheduling for Kerala's wellness industry." },
    ],
    voices: [
      { name: "Devika", style: "gentle, articulate — finance & wellness" },
      { name: "Nikhil", style: "energetic, clear — sales & support" },
    ],
    dialects: "Kochi, Malabar and Travancore accents supported",
    keywords: ["Malayalam voice bot", "AI calling in Malayalam", "Malayalam voice AI agent", "Malayalam telecalling"],
  },
  {
    slug: "punjabi",
    name: "Punjabi",
    native: "ਪੰਜਾਬੀ",
    scriptName: "Gurmukhi",
    speakers: "3.3 Cr+",
    rank: 10,
    regions: ["Punjab", "Chandigarh", "Delhi NCR", "Haryana", "global diaspora"],
    tagline: "Josh, warmth and straight talk — an agent with genuine Punjabi spirit.",
    greeting: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਸਪੀਕਸੀ ਤੋਂ ਬੋਲ ਰਹੀ ਹਾਂ।",
    dialogue: {
      agent: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ ਰੋਹਨ ਜੀ! ਤੁਹਾਡੀ ₹4,500 ਦੀ EMI ਕੱਲ੍ਹ due ਹੈ — ਕੀ ਅੱਜ payment ਕਰ ਸਕੋਗੇ?",
      user: "ਹਾਂ ਜੀ, ਕੱਲ੍ਹ ਪੱਕਾ ਕਰ ਦਿਆਂਗਾ।",
      agent2: "ਠੀਕ ਹੈ ਜੀ! ਮੈਂ ਕੱਲ੍ਹ ਸਵੇਰੇ WhatsApp 'ਤੇ payment link ਭੇਜ ਦਿਆਂਗੀ। ਧੰਨਵਾਦ!",
    },
    useCases: [
      { title: "Tractor & agri finance", desc: "Punjab's farm-equipment loans serviced in Punjabi." },
      { title: "Study-abroad counselling", desc: "IELTS and visa-consultancy follow-ups for aspiring students." },
      { title: "Transport & logistics", desc: "Trucking coordination across North India's freight corridors." },
    ],
    voices: [
      { name: "Simran", style: "warm, upbeat — service & counselling" },
      { name: "Harpreet", style: "hearty, direct — finance & logistics" },
    ],
    dialects: "Majhi, Malwai and Doabi accents supported",
    keywords: ["Punjabi voice bot", "AI calling in Punjabi", "Punjabi voice AI agent", "Punjabi telecalling"],
  },
  {
    slug: "odia",
    name: "Odia",
    native: "ଓଡ଼ିଆ",
    scriptName: "Odia script",
    speakers: "3.8 Cr+",
    rank: 11,
    regions: ["Odisha", "Bhubaneswar", "Cuttack", "Rourkela"],
    tagline: "A classical language most platforms ignore. We made it a first-class citizen.",
    greeting: "ନମସ୍କାର! ମୁଁ ସ୍ପିକ୍ସିରୁ କହୁଛି।",
    dialogue: {
      agent: "ନମସ୍କାର ରୋହନ ବାବୁ! ଆପଣଙ୍କ ₹4,500 EMI କାଲି due — ଆଜି payment କରିପାରିବେ କି?",
      user: "ହଁ, କାଲି ନିଶ୍ଚୟ କରିବି।",
      agent2: "ଠିକ୍ ଅଛି! ମୁଁ କାଲି ସକାଳେ WhatsApp ରେ payment link ପଠାଇବି। ଧନ୍ୟବାଦ!",
    },
    useCases: [
      { title: "SHG & rural banking", desc: "Odisha's self-help-group lending serviced in Odia." },
      { title: "Mining & industrial HR", desc: "Shift coordination and payroll queries for industrial belts." },
      { title: "Government scheme outreach", desc: "Yojana awareness and eligibility calls at state scale." },
    ],
    voices: [
      { name: "Subhashree", style: "calm, trustworthy — banking & outreach" },
      { name: "Debasis", style: "clear, formal — industrial & govt" },
    ],
    dialects: "Standard Odia with Sambalpuri-lean accent support",
    keywords: ["Odia voice bot", "AI calling in Odia", "Odia voice AI agent", "Odia telecalling"],
  },
  {
    slug: "urdu",
    name: "Urdu",
    native: "اردو",
    scriptName: "Perso-Arabic (Nastaliq)",
    speakers: "5 Cr+",
    rank: 12,
    regions: ["Uttar Pradesh", "Telangana (Hyderabad)", "Bihar", "Maharashtra", "Delhi"],
    tagline: "Tehzeeb meets technology — courtesy that classical Urdu speakers notice.",
    greeting: "السلام علیکم! میں اسپیکسی سے بات کر رہی ہوں۔",
    dialogue: {
      agent: "السلام علیکم روہن صاحب! آپ کی ₹4,500 کی EMI کل واجب ہے — کیا آج ادائیگی کر سکیں گے؟",
      user: "جی ہاں، کل ضرور کر دوں گا۔",
      agent2: "بہت خوب! میں کل صبح WhatsApp پر پیمنٹ لنک بھیج دوں گی۔ شکریہ، آپ کا دن اچھا گزرے!",
    },
    useCases: [
      { title: "Hyderabad retail & pearls", desc: "The Deccan's trading houses served with proper aadaab." },
      { title: "Education & madrasa admin", desc: "Fee reminders and admission follow-ups with cultural fluency." },
      { title: "Healthcare outreach", desc: "Clinic bookings for Urdu-first neighbourhoods across India." },
    ],
    voices: [
      { name: "Zoya", style: "graceful, courteous — service & education" },
      { name: "Faisal", style: "measured, respectful — trade & healthcare" },
    ],
    dialects: "Dakhini and Lucknowi registers supported",
    keywords: ["Urdu voice bot", "AI calling in Urdu", "Urdu voice AI agent", "Urdu telecalling"],
    rtl: true,
  },
  {
    slug: "assamese",
    name: "Assamese",
    native: "অসমীয়া",
    scriptName: "Assamese script",
    speakers: "1.5 Cr+",
    rank: 13,
    regions: ["Assam", "Guwahati", "Dibrugarh", "Northeast corridor"],
    tagline: "The gateway to the Northeast — a market everyone else's voice AI forgot.",
    greeting: "নমস্কাৰ! মই স্পিক্সিৰ পৰা কৈছোঁ।",
    dialogue: {
      agent: "নমস্কাৰ ৰোহন দা! আপোনাৰ ₹4,500 EMI কাইলৈ due — আজি payment কৰিব পাৰিবনে?",
      user: "হয়, কাইলৈ নিশ্চয় কৰিম।",
      agent2: "ঠিক আছে! মই কাইলৈ ৰাতিপুৱা WhatsApp-ত payment link পঠিয়াম। ধন্যবাদ!",
    },
    useCases: [
      { title: "Tea industry coordination", desc: "Estate payroll and logistics calls across Upper Assam." },
      { title: "MFI & rural credit", desc: "Northeast microfinance serviced in the borrower's language." },
      { title: "Telecom & DTH support", desc: "Regional subscriber support without Hindi-only frustration." },
    ],
    voices: [
      { name: "Junmoni", style: "friendly, homely — rural credit & service" },
      { name: "Pranab", style: "steady, clear — industry & telecom" },
    ],
    dialects: "Standard Assamese with Kamrupi-lean accent support",
    keywords: ["Assamese voice bot", "AI calling in Assamese", "Assamese voice AI agent", "Northeast India voice AI"],
  },
  {
    slug: "english",
    name: "Indian English",
    native: "English",
    scriptName: "Roman",
    speakers: "13 Cr+",
    rank: 14,
    regions: ["Pan-India", "metros", "corporate & B2B", "global customers"],
    tagline: "Indian-accented English that sounds like your best agent — not a foreign IVR.",
    greeting: "Hello! I'm calling from Speaksy.",
    dialogue: {
      agent: "Hi Rohan! This is Priya from Speaksy. Your ₹4,500 EMI is due tomorrow — would you like to pay today?",
      user: "Yes, I'll definitely do it by tomorrow.",
      agent2: "Perfect! I'll send the payment link on WhatsApp tomorrow morning. Thank you, have a great day!",
    },
    useCases: [
      { title: "B2B & SaaS outreach", desc: "Demo scheduling and renewal calls for corporate India." },
      { title: "Premium banking", desc: "Wealth and priority-banking conversations in polished English." },
      { title: "Global support desks", desc: "24/7 India-hosted English support at a fraction of BPO cost." },
    ],
    voices: [
      { name: "Nisha", style: "neutral Indian accent — corporate & banking" },
      { name: "Dev", style: "crisp, confident — B2B sales" },
    ],
    dialects: "Neutral Indian, metro-urban and international-neutral accents",
    keywords: ["Indian English voice AI", "English voice bot India", "AI calling English", "voice AI for B2B India"],
  },
];

export const getLanguage = (slug: string) => languages.find((l) => l.slug === slug);

export const totalSpeakers = "120 Cr+";
