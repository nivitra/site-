export type MarqueeLanguage = {
  id: string;
  name: string;
  native: string;
  image: string;
  imageAlt: string;
};

/** Top 10 languages — matches drag gallery / lib/languages */
export const MARQUEE_LANGUAGES: MarqueeLanguage[] = [
  {
    id: "hindi",
    name: "HINDI",
    native: "हिन्दी",
    image: "/lab/lang-marquee/hindi.jpg",
    imageAlt: "India Gate, New Delhi",
  },
  {
    id: "hinglish",
    name: "HINGLISH",
    native: "Hinglish",
    image: "/lab/lang-marquee/hinglish.jpg",
    imageAlt: "Urban India street life",
  },
  {
    id: "bengali",
    name: "BENGALI",
    native: "বাংলা",
    image: "/lab/lang-marquee/bengali.jpg",
    imageAlt: "Kolkata / Bengal landscape",
  },
  {
    id: "marathi",
    name: "MARATHI",
    native: "मराठी",
    image: "/lab/lang-marquee/marathi.jpg",
    imageAlt: "Mumbai skyline",
  },
  {
    id: "telugu",
    name: "TELUGU",
    native: "తెలుగు",
    image: "/lab/lang-marquee/telugu.jpg",
    imageAlt: "Hyderabad Charminar region",
  },
  {
    id: "tamil",
    name: "TAMIL",
    native: "தமிழ்",
    image: "/lab/lang-marquee/tamil.jpg",
    imageAlt: "South India temple architecture",
  },
  {
    id: "gujarati",
    name: "GUJARATI",
    native: "ગુજરાતી",
    image: "/lab/lang-marquee/gujarati.jpg",
    imageAlt: "Gujarat landscape",
  },
  {
    id: "kannada",
    name: "KANNADA",
    native: "ಕನ್ನಡ",
    image: "/lab/lang-marquee/kannada.jpg",
    imageAlt: "Bengaluru / Karnataka",
  },
  {
    id: "malayalam",
    name: "MALAYALAM",
    native: "മലയാളം",
    image: "/lab/lang-marquee/malayalam.jpg",
    imageAlt: "Kerala backwaters",
  },
  {
    id: "punjabi",
    name: "PUNJABI",
    native: "ਪੰਜਾਬੀ",
    image: "/lab/lang-marquee/punjabi.jpg",
    imageAlt: "Punjab fields",
  },
];
