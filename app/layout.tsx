import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/ui/CursorGlow";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Covers Hindi, Marathi, Hinglish mixed, Sanskrit-derived scripts used across the site
const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-indic",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#05080a",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://speaksy.in"),
  title: {
    default: "Speaksy — Voice AI in 14 Indian Languages | Built in India, Beats the World",
    template: "%s · Speaksy",
  },
  description:
    "Speaksy is India's most affordable human-grade Voice AI platform. 14 Indian languages, sub-800ms latency, visual graph agents, live human handoff — from ₹3.99/min.",
  keywords: [
    "Voice AI India",
    "Hindi voice bot",
    "Marathi voice bot",
    "Telugu voice bot",
    "Hinglish voicebot",
    "AI telecalling",
    "outbound AI dialer",
    "vernacular voice AI",
    "Speaksy",
  ],
  authors: [{ name: "Speak Systems Pvt. Ltd." }],
  creator: "Speaksy",
  publisher: "Speak Systems Pvt. Ltd.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Speaksy — Voice AI that sounds human",
    description:
      "Built in India, beats the world. Human-grade voice agents in 14 Indian languages at 1/3rd the cost.",
    type: "website",
    locale: "en_IN",
    siteName: "Speaksy",
    url: "https://speaksy.in",
    images: [{ url: "/brand/logo-icon-256.png", width: 256, height: 256, alt: "Speaksy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Speaksy — Voice AI in 14 Indian Languages",
    description: "Human-grade voice agents from ₹3.99/min. Built in India, beats the world.",
    images: ["/brand/logo-icon-256.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [{ url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/brand/icon-512.png", sizes: "512x512", type: "image/png" }],
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Speaksy",
  legalName: "Speak Systems Pvt. Ltd.",
  url: "https://speaksy.in",
  logo: "https://speaksy.in/brand/logo-icon-256.png",
  slogan: "Built in India, Beats the World",
  description:
    "Human-grade Voice AI platform for Indian businesses — 14 Indian languages, sub-800ms latency, from ₹3.99 per live minute.",
  email: "hello@speaksy.in",
  foundingDate: "2024",
  areaServed: "IN",
  address: { "@type": "PostalAddress", addressCountry: "IN", addressLocality: "Bengaluru" },
  knowsLanguage: [
    "hi", "mr", "te", "ta", "gu", "kn", "bn", "ml", "pa", "or", "ur", "as", "en",
  ],
  sameAs: [],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Speaksy",
  url: "https://speaksy.in",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://speaksy.in/blog?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${geistSans.variable} ${geistMono.variable} ${notoDevanagari.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brand-950"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <CursorGlow />
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
