import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/ui/CursorGlow";
import AnnouncementBar from "@/components/AnnouncementBar";
import MobileStickyCTA from "@/components/MobileStickyCTA";

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
    default: "Speaksy — Built In India, Beats The World",
    template: "%s · Speaksy",
  },
  description:
    "Speaksy handles your customer calls automatically — speaking 14 Indian languages, answering every enquiry, booking appointments, and following up on payments. Built In India, Beats The World.",
  keywords: [
    "AI calling assistant India",
    "automated customer calls",
    "business call automation",
    "AI phone assistant",
    "customer call service",
    "lead follow-up automation",
    "appointment booking assistant",
    "multilingual calling",
    "Speaksy",
  ],
  authors: [{ name: "Speak Systems Pvt. Ltd." }],
  creator: "Speaksy",
  publisher: "Speak Systems Pvt. Ltd.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Speaksy — Built In India, Beats The World",
    description:
      "Never lose a customer to a missed call. 14 Indian languages, 24/7. Built In India, Beats The World.",
    type: "website",
    locale: "en_IN",
    siteName: "Speaksy",
    url: "https://speaksy.in",
    images: [{ url: "/brand/logo-icon-256.png", width: 256, height: 256, alt: "Speaksy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Speaksy — Built In India, Beats The World",
    description: "Never lose a customer to a missed call. 14 Indian languages, 24/7.",
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
  slogan: "Built In India, Beats The World",
  description:
    "Speaksy handles customer calls for Indian businesses in 14 languages, 24 hours a day. Built In India, Beats The World.",
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
        <div className="fixed inset-x-0 top-0 z-50">
          <AnnouncementBar />
          <Navbar />
        </div>
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileStickyCTA />
      </body>
    </html>
  );
}
