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
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://speaksy.in"),
  title: {
    default: "Speaksy — AI phone agents that sound human",
    template: "%s · Speaksy",
  },
  description:
    "EMI, COD, lead follow-up, appointments — Speaksy calls your customers in their language. 10 Indian languages. From ₹3.99/min.",
  keywords: [
    "AI calling India",
    "Hindi telecaller AI",
    "EMI reminder call",
    "COD confirmation call",
    "voice bot India business",
    "Speaksy",
  ],
  authors: [{ name: "Speak Systems Pvt. Ltd." }],
  creator: "Speaksy",
  publisher: "Speak Systems Pvt. Ltd.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Speaksy — The telecaller that never tires",
    description:
      "Customer calls in Hindi, Hinglish, Tamil, Marathi & more. From ₹3.99/min. Made for Indian business.",
    type: "website",
    locale: "en_IN",
    siteName: "Speaksy",
    url: "https://speaksy.in",
    images: [{ url: "/brand/logo-icon-256.png", width: 256, height: 256, alt: "Speaksy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Speaksy — AI calling for Indian business",
    description: "Human-like conversations. 10 languages. From ₹3.99/min.",
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
  slogan: "AI that answers every call",
  description:
    "AI voice agents for Indian businesses — natural conversations in 10 languages, from ₹3.99 per minute.",
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
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
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
