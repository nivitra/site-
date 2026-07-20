import type { GalleryItem } from "@/components/drag-gallery/data";

/**
 * Language explore gallery — purposeful India map of clusters, not random scatter.
 *
 * Layout (canvas space, left → right, top → bottom):
 *   NW Punjabi · N Hindi · NE Bengali
 *   W Gujarati · C Hinglish hub · E (open)
 *   SW Marathi · S Kannada/Telugu · SE Tamil
 *   Far S-W Malayalam
 *
 * Within each cluster: hero landmark (large) + script/print + street culture.
 */

export const LANGUAGE_GALLERY_CANVAS = {
  width: 4400,
  height: 3600,
} as const;

type Piece = Omit<GalleryItem, "x" | "y" | "w"> & {
  /** relative offset inside cluster */
  dx: number;
  dy: number;
  w: number;
};

function cluster(
  originX: number,
  originY: number,
  pieces: Piece[]
): GalleryItem[] {
  return pieces.map((p) => ({
    id: p.id,
    title: p.title,
    meta: p.meta,
    src: p.src,
    x: originX + p.dx,
    y: originY + p.dy,
    w: p.w,
  }));
}

const src = (file: string) => `/languages/gallery/${file}`;

/** —— Hindi belt (north-center): heartbeat of Indian business —— */
const HINDI = cluster(1680, 120, [
  {
    id: "varanasi-ghats",
    title: "Varanasi · dawn",
    meta: "Hindi · North India\nWhere the day begins in Devanagari",
    src: src("varanasi-ghats-sunrise-ancient-t.jpg"),
    dx: 40,
    dy: 0,
    w: 300,
  },
  {
    id: "hindi-akshar",
    title: "अ · Hindi",
    meta: "Devanagari · primary script\nFirst-class voice, not a translation",
    src: src("hindi-character-typography.jpg"),
    dx: 380,
    dy: 40,
    w: 220,
  },
  {
    id: "chandni-chowk",
    title: "Chandni Chowk",
    meta: "Hindi · Delhi NCR\nMarkets that answer only in the mother tongue",
    src: src("chandni-chowk-market-overflowing.jpg"),
    dx: 0,
    dy: 340,
    w: 280,
  },
  {
    id: "hindi-street",
    title: "Street Devanagari",
    meta: "Hindi signage · everyday India\nWhat customers actually read",
    src: src("hindi-street-sign-devanagari-typ.jpg"),
    dx: 320,
    dy: 300,
    w: 240,
  },
  {
    id: "hindi-paper",
    title: "Morning paper",
    meta: "Hindi press · trust at breakfast\nNews that sounds like home",
    src: src("hindi-newspaper-on-wooden-table.jpg"),
    dx: 580,
    dy: 360,
    w: 210,
  },
  {
    id: "mustard-fields",
    title: "Mustard belt",
    meta: "Hindi heartland\nCollections that convert in the fields",
    src: src("tractor-in-mustard-fields.jpg"),
    dx: 640,
    dy: 40,
    w: 250,
  },
]);

/** —— Hinglish hub (center): metro, memes, startups —— */
const HINGLISH = cluster(1880, 1180, [
  {
    id: "work-chai",
    title: "Work & Chai",
    meta: "Hinglish · metro India\nThe language of the office floor",
    src: src("cafe-neon-sign-work-chai.jpg"),
    dx: 80,
    dy: 0,
    w: 260,
  },
  {
    id: "hinglish-symbol",
    title: "Hinglish mark",
    meta: "Code-switch native\nNot broken English — a full dialect",
    src: src("hinglish-symbol-typography-gallery.jpg"),
    dx: 380,
    dy: 20,
    w: 220,
  },
  {
    id: "startup-billboard",
    title: "Startup skyline",
    meta: "Hindi + English · one board\nHow India actually sells",
    src: src("startup-billboard-hindi-english.jpg"),
    dx: 0,
    dy: 300,
    w: 300,
  },
  {
    id: "hinglish-meme",
    title: "Phone scroll",
    meta: "Hinglish in the wild\nWhat customers type, we speak",
    src: src("smartphone-displaying-hinglish-meme.jpg"),
    dx: 340,
    dy: 320,
    w: 230,
  },
  {
    id: "coworking",
    title: "Founders' table",
    meta: "Hinglish ops\nDemos that sound like the team",
    src: src("coworking-cafe-with-startup-foun.jpg"),
    dx: 600,
    dy: 80,
    w: 270,
  },
]);

/** —— Punjabi (northwest) —— */
const PUNJABI = cluster(160, 100, [
  {
    id: "golden-temple",
    title: "Harmandir Sahib",
    meta: "Punjabi · Amritsar\nDawn over the Golden Temple",
    src: src("golden-temple-reflecting-dawn.jpg"),
    dx: 0,
    dy: 0,
    w: 280,
  },
  {
    id: "punjabi-letter",
    title: "ਉ · Gurmukhi",
    meta: "Punjabi script\nVoice that carries the belt",
    src: src("punjabi-letter-u-typography.jpg"),
    dx: 320,
    dy: 40,
    w: 210,
  },
  {
    id: "punjabi-store",
    title: "Gurmukhi storefront",
    meta: "Punjabi · high street\nSignage customers trust",
    src: src("punjabi-storefront-with-gurmukhi.jpg"),
    dx: 20,
    dy: 340,
    w: 250,
  },
  {
    id: "punjabi-wedding",
    title: "Shaadi invite",
    meta: "Punjabi · ceremony\nWarmth in every syllable",
    src: src("punjabi-wedding-invitation-elega.jpg"),
    dx: 300,
    dy: 320,
    w: 220,
  },
]);

/** —— Gujarati (west) —— */
const GUJARATI = cluster(140, 980, [
  {
    id: "sabarmati",
    title: "Sabarmati",
    meta: "Gujarati · Ahmedabad\nRiverfront that runs on business",
    src: src("sabarmati-riverfront-ahmedabad-s.jpg"),
    dx: 40,
    dy: 0,
    w: 290,
  },
  {
    id: "adalaj",
    title: "Adalaj Stepwell",
    meta: "Gujarati · sandstone craft\nDetail in the language of trade",
    src: src("adalaj-stepwell-sandstone-carvin.jpg"),
    dx: 360,
    dy: 20,
    w: 230,
  },
  {
    id: "gujarati-akshar",
    title: "અ · Gujarati",
    meta: "Gujarati script\nLending & trade, natively",
    src: src("gujarati-character-typography.jpg"),
    dx: 0,
    dy: 340,
    w: 210,
  },
  {
    id: "patola",
    title: "Patola silk",
    meta: "Gujarati craft\nPattern as precise as a script",
    src: src("patola-silk-textile-geometric-pa.jpg"),
    dx: 250,
    dy: 360,
    w: 240,
  },
  {
    id: "gujarati-wedding",
    title: "Lagan card",
    meta: "Gujarati · invite\nCeremony language, spoken well",
    src: src("gujarati-wedding-invitation-card.jpg"),
    dx: 520,
    dy: 300,
    w: 200,
  },
]);

/** —— Marathi / Mumbai (southwest hub) —— */
const MARATHI = cluster(900, 1700, [
  {
    id: "gateway",
    title: "Gateway of India",
    meta: "Marathi · Mumbai\nMonsoon city, business capital",
    src: src("gateway-of-india-monsoon-evening.jpg"),
    dx: 0,
    dy: 0,
    w: 280,
  },
  {
    id: "mumbai-local",
    title: "Local platform",
    meta: "Marathi · rush hour\nCalls that keep pace with the city",
    src: src("mumbai-local-railway-platform-co.jpg"),
    dx: 320,
    dy: 40,
    w: 300,
  },
  {
    id: "marathi-shop",
    title: "Pune board",
    meta: "Marathi · high street\nWhat shoppers actually read",
    src: src("marathi-shop-sign-pune.jpg"),
    dx: 20,
    dy: 360,
    w: 250,
  },
  {
    id: "marathi-letter",
    title: "अ · Marathi",
    meta: "Devanagari · Marathi voice\nCollections that sound local",
    src: src("marathi-letter-a-typography.jpg"),
    dx: 310,
    dy: 380,
    w: 210,
  },
  {
    id: "marathi-paper",
    title: "Marathi headline",
    meta: "Press · Maharashtra\nNews in the customer's language",
    src: src("marathi-newspaper-with-large-hea.jpg"),
    dx: 560,
    dy: 320,
    w: 230,
  },
]);

/** —— Bengali (east) —— */
const BENGALI = cluster(3200, 200, [
  {
    id: "howrah",
    title: "Howrah Bridge",
    meta: "Bengali · Kolkata\nSunset over the Hooghly",
    src: src("howrah-bridge-sunset-kolkata-taxis.jpg"),
    dx: 0,
    dy: 0,
    w: 280,
  },
  {
    id: "durga-puja",
    title: "Durga Puja",
    meta: "Bengali · festival\nEmotion the model must respect",
    src: src("durga-puja-idol-rich-colors.jpg"),
    dx: 320,
    dy: 30,
    w: 250,
  },
  {
    id: "bengali-akshar",
    title: "অ · Bangla",
    meta: "Bengali script\nEast India's first language",
    src: src("bengali-character-typography.jpg"),
    dx: 40,
    dy: 340,
    w: 210,
  },
  {
    id: "kolkata-street",
    title: "Colonial arcades",
    meta: "Bengali · city fabric\nHeritage that still sells",
    src: src("kolkata-street-with-colonial-arc.jpg"),
    dx: 290,
    dy: 320,
    w: 270,
  },
  {
    id: "bengali-bookstore",
    title: "Boipara",
    meta: "Bengali · books\nA culture that reads aloud",
    src: src("vintage-bengali-bookstore-storef.jpg"),
    dx: 600,
    dy: 80,
    w: 230,
  },
]);

/** —— Telugu (Deccan / south-central) —— */
const TELUGU = cluster(2100, 2000, [
  {
    id: "charminar",
    title: "Charminar dusk",
    meta: "Telugu · Hyderabad\nIcon of the Deccan",
    src: src("charminar-illuminated-at-dusk.jpg"),
    dx: 0,
    dy: 0,
    w: 270,
  },
  {
    id: "hyd-bazaars",
    title: "Old City bazaars",
    meta: "Telugu · colour & craft\nMarkets that never sleep",
    src: src("hyderabad-old-city-colorful-bazaars.jpg"),
    dx: 310,
    dy: 20,
    w: 290,
  },
  {
    id: "telugu-akshar",
    title: "అ · Telugu",
    meta: "Telugu script\nSouth's widest reach",
    src: src("telugu-character-typography.jpg"),
    dx: 20,
    dy: 340,
    w: 210,
  },
  {
    id: "telugu-shop",
    title: "Shop letters",
    meta: "Telugu · storefront\nWhat Hyderabad reads first",
    src: src("hyderabad-market-shop-telugu-let.jpg"),
    dx: 270,
    dy: 360,
    w: 240,
  },
  {
    id: "telugu-paper",
    title: "Telugu desk",
    meta: "Press · Andhra / Telangana\nNews that lands at home",
    src: src("telugu-newspaper-on-wooden-desk.jpg"),
    dx: 540,
    dy: 300,
    w: 230,
  },
]);

/** —— Kannada (Bengaluru / south-west) —— */
const KANNADA = cluster(1400, 2300, [
  {
    id: "vidhana",
    title: "Vidhana Soudha",
    meta: "Kannada · Bengaluru\nCivic icon of Karnataka",
    src: src("vidhana-soudha-illuminated-blue.jpg"),
    dx: 0,
    dy: 0,
    w: 280,
  },
  {
    id: "blr-signage",
    title: "Downtown Kannada",
    meta: "Kannada · city boards\nTech capital, local tongue",
    src: src("downtown-bengaluru-kannada-signage.jpg"),
    dx: 320,
    dy: 30,
    w: 300,
  },
  {
    id: "kannada-akshar",
    title: "ಅ · Kannada",
    meta: "Kannada script\nVoice for the garden city",
    src: src("kannada-character-typography.jpg"),
    dx: 20,
    dy: 340,
    w: 210,
  },
  {
    id: "kannada-metro",
    title: "Metro directions",
    meta: "Kannada · transit\nWayfinding customers follow",
    src: src("kannada-metro-station-directiona.jpg"),
    dx: 280,
    dy: 360,
    w: 250,
  },
  {
    id: "kannada-paper",
    title: "Kannada press",
    meta: "News · Karnataka\nHeadlines that convert",
    src: src("kannada-newspaper-across-table.jpg"),
    dx: 560,
    dy: 280,
    w: 220,
  },
]);

/** —— Tamil (far south / east coast) —— */
const TAMIL = cluster(3000, 2000, [
  {
    id: "meenakshi",
    title: "Meenakshi Amman",
    meta: "Tamil · Madurai\nTowering gopuram, living language",
    src: src("meenakshi-amman-temple-towering.jpg"),
    dx: 0,
    dy: 0,
    w: 280,
  },
  {
    id: "marina",
    title: "Marina sunrise",
    meta: "Tamil · Chennai\nCoast that speaks first",
    src: src("fishermen-on-marina-beach-sunrise.jpg"),
    dx: 320,
    dy: 40,
    w: 300,
  },
  {
    id: "tamil-akshar",
    title: "அ · Tamil",
    meta: "Tamil script\nClassical, commercial, current",
    src: src("tamil-character-typography.jpg"),
    dx: 20,
    dy: 360,
    w: 210,
  },
  {
    id: "tamil-street",
    title: "Street Tamil",
    meta: "Tamil · boards\nWhat the city reads at speed",
    src: src("tamil-street-sign-typography.jpg"),
    dx: 280,
    dy: 380,
    w: 240,
  },
  {
    id: "tamil-cinema",
    title: "Kollywood print",
    meta: "Tamil · cinema\nEmotion the voice must carry",
    src: src("tamil-cinema-poster-vintage-aest.jpg"),
    dx: 560,
    dy: 300,
    w: 230,
  },
]);

/** —— Malayalam (far southwest coast) —— */
const MALAYALAM = cluster(200, 2500, [
  {
    id: "backwaters",
    title: "Backwaters",
    meta: "Malayalam · Kerala\nHouseboats, hush, high literacy",
    src: src("kerala-backwaters-with-houseboats.jpg"),
    dx: 0,
    dy: 0,
    w: 300,
  },
  {
    id: "kerala-temple",
    title: "Coconut temple",
    meta: "Malayalam · coast\nRhythm of the south-west",
    src: src("kerala-temple-surrounded-by-coco.jpg"),
    dx: 340,
    dy: 20,
    w: 260,
  },
  {
    id: "malayalam-akshar",
    title: "അ · Malayalam",
    meta: "Malayalam script\nDense, precise, beautiful",
    src: src("malayalam-character-typography-g.jpg"),
    dx: 20,
    dy: 340,
    w: 210,
  },
  {
    id: "kerala-store",
    title: "Shop Malayalam",
    meta: "Malayalam · street\nCommerce in the mother script",
    src: src("kerala-storefront-malayalam-lett.jpg"),
    dx: 280,
    dy: 360,
    w: 240,
  },
  {
    id: "kathakali",
    title: "Kathakali",
    meta: "Malayalam · performance\nExpression the model must hear",
    src: src("kathakali-performer-close-up-por.jpg"),
    dx: 560,
    dy: 280,
    w: 230,
  },
]);

export const LANGUAGE_GALLERY_ITEMS: GalleryItem[] = [
  ...PUNJABI,
  ...HINDI,
  ...BENGALI,
  ...GUJARATI,
  ...HINGLISH,
  ...MARATHI,
  ...KANNADA,
  ...TELUGU,
  ...TAMIL,
  ...MALAYALAM,
];

/** Region labels for optional HUD / future map chrome */
export const LANGUAGE_GALLERY_REGIONS = [
  { id: "punjabi", label: "Punjabi · NW", x: 280, y: 40 },
  { id: "hindi", label: "Hindi · North", x: 1900, y: 40 },
  { id: "bengali", label: "Bengali · East", x: 3400, y: 80 },
  { id: "gujarati", label: "Gujarati · West", x: 260, y: 900 },
  { id: "hinglish", label: "Hinglish · Metro", x: 2100, y: 1100 },
  { id: "marathi", label: "Marathi · Mumbai", x: 1050, y: 1620 },
  { id: "kannada", label: "Kannada · Bengaluru", x: 1550, y: 2220 },
  { id: "telugu", label: "Telugu · Hyderabad", x: 2250, y: 1920 },
  { id: "tamil", label: "Tamil · South", x: 3150, y: 1920 },
  { id: "malayalam", label: "Malayalam · Kerala", x: 320, y: 2420 },
] as const;
