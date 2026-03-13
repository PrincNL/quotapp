import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "./providers/theme-provider";
import { PageTransition } from "./providers/page-transition";
import { JsonLd } from "@/components/json-ld";
import Script from "next/script";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563eb" },
    { media: "(prefers-color-scheme: dark)", color: "#1e3a5f" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://quotapp.nl"),
  title: {
    template: "%s | QuotApp.nl",
    default: "QuotApp.nl - Gratis Online Rekentools voor Nederland",
  },
  description: "Gratis Nederlandse rekentools: BTW berekenen 21%/9%, hypotheek maandlasten, procenten, IBAN check, valuta converter, BMI calculator en meer. Snel, accuraat en 100% gratis!",
  keywords: ["btw berekenen", "hypotheek berekenen", "procent berekenen", "iban check", "valuta converter", "bmi calculator", "nederlandse tools", "online rekenmachine"],
  authors: [{ name: "QuotApp.nl" }],
  creator: "QuotApp.nl",
  publisher: "QuotApp.nl",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://quotapp.nl",
    siteName: "QuotApp.nl",
    title: "QuotApp.nl - 8+ Gratis Online Rekentools",
    description: "Handige Nederlandse rekentools voor dagelijks gebruik. BTW, hypotheek, procenten en meer. Snel, accuraat en gratis!",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "QuotApp.nl - Gratis Online Rekentools",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuotApp.nl - Gratis Online Rekentools",
    description: "8+ handige Nederlandse rekentools voor dagelijks gebruik",
    images: ["/og-image.jpg"],
    creator: "@quotappnl",
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

// Website Schema.org structured data
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "QuotApp.nl",
  url: "https://quotapp.nl",
  description: "Gratis online rekentools voor Nederland",
  inLanguage: "nl-NL",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://quotapp.nl/tools?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

// Organization Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "QuotApp.nl",
  url: "https://quotapp.nl",
  logo: "https://quotapp.nl/logo.png",
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4811749024166183"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <JsonLd data={websiteSchema} />
          <JsonLd data={organizationSchema} />
          <Navbar />
          <PageTransition>
            <main className="min-h-screen bg-background">
              {children}
            </main>
          </PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
