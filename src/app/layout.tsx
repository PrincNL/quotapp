import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "./providers/theme-provider";
import { PageTransition } from "./providers/page-transition";
import { JsonLd } from "@/components/json-ld";
import Script from "next/script";

// Font optimalisatie: preload + display swap voor LCP
const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  fallback: ["system-ui", "Arial", "sans-serif"],
  // Weight voor betere performance
  weight: ["400", "500", "600", "700"],
});

// Website Schema.org structured data
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "QuotApp.nl",
  "url": "https://quotapp.nl",
  "description": "Gratis online rekentools voor Nederland: BTW berekenen, hypotheek, procenten, IBAN check en meer",
  "inLanguage": "nl-NL",
  potentialAction: {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://quotapp.nl/tools?q={search_term_string}"
    },
    "query-input": "required name=search_term_string",
  },
  "sameAs": [
    "https://twitter.com/quotappnl",
    "https://www.linkedin.com/company/quotappnl"
  ],
};

// Organization Schema - Verbeterd met E-E-A-T signals
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "QuotApp.nl",
  "url": "https://quotapp.nl",
  "logo": {
    "@type": "ImageObject",
    "url": "https://quotapp.nl/logo.png",
    "width": 200,
    "height": 60
  },
  "description": "Gratis online rekentools voor Nederlandse consumenten en ondernemers. Accurate berekeningen gebaseerd op officiële Nederlandse regelgeving.",
  "foundingDate": "2024",
  "founder": {
    "@type": "Person",
    "name": "QuotApp Team"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "info@quotapp.nl",
    "availableLanguage": "Dutch"
  },
  "sameAs": [
    "https://twitter.com/quotappnl",
    "https://www.linkedin.com/company/quotappnl",
    "https://www.facebook.com/quotappnl",
    "https://www.instagram.com/quotappnl"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "NL",
    "addressRegion": "Nederland"
  },
  "knowsAbout": [
    "BTW berekening",
    "Hypotheek berekening",
    "Financiële calculators",
    "Nederlandse belastingen",
    "Spaarrente"
  ],
  "areaServed": {
    "@type": "Country",
    "name": "Netherlands"
  }
};

// Person Schema voor E-E-A-T (Expertise signal)
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "QuotApp Team",
  "description": "Het QuotApp team bestaat uit financiële experts en ontwikkelaars die gespecialiseerd zijn in Nederlandse rekenhulpen",
  "url": "https://quotapp.nl",
  "sameAs": [
    "https://www.linkedin.com/company/quotappnl"
  ],
  "knowsAbout": [
    "Nederlandse belastingwetgeving",
    "BTW tarieven",
    "Hypotheekregels",
    "Financiële planning"
  ]
};

// WebPage Schema voor E-E-A-T
const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "QuotApp.nl - Gratis Online Rekentools",
  "description": "Gratis Nederlandse rekentools: BTW berekenen, hypotheek, procenten, IBAN check, valuta converter, BMI calculator en meer. Accurate berekeningen gebaseerd op officiële regelgeving.",
  "url": "https://quotapp.nl",
  "inLanguage": "nl-NL",
  "isPartOf": {
    "@type": "WebSite",
    "name": "QuotApp.nl"
  },
  "about": {
    "@type": "Thing",
    "name": "Online Calculators",
    "description": "Gratis financiële rekenhulpen voor Nederland"
  }
};

// Social Media Profile Links voor E-E-A-T
const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "Over QuotApp.nl",
  "description": "QuotApp.nl biedt gratis online rekentools voor Nederlandse consumenten en ondernemers. Onze tools zijn gebaseerd op officiële Nederlandse regelgeving en worden regelmatig bijgewerkt.",
  "url": "https://quotapp.nl/about",
  "inLanguage": "nl-NL"
};

// LocalBusiness Schema for Dutch SEO
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "QuotApp.nl",
  "description": "Online rekentools en calculators",
  "url": "https://quotapp.nl",
  "telephone": "+31-85-1234567",
  "email": "info@quotapp.nl",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "NL"
  },
  "openingHours": "Mo-Su 00:00-24:00",
  "priceRange": "€",
  "image": "https://quotapp.nl/logo.png"
};

// Critical CSS inline voor above-the-fold content (First Contentful Paint optimalisatie)
const criticalCSS = `
  /* Critical Above-the-fold styles - Inline voor snelle FCP */
  *,*::before,*::after{box-sizing:border-box}
  html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
  body{
    margin:0;
    font-family:var(--font-inter),system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
    text-rendering:optimizeLegibility;
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale;
    line-height:1.5;
  }
  main{min-height:100vh}
  /* Theme fallback - voorkom CLS door fallback kleuren */
  .bg-background{background-color:#fff}
  .text-foreground{color:#000}
  @media (prefers-color-scheme:dark){
    .bg-background{background-color:#09090b}
    .text-foreground{color:#fafafa}
  }
  /* Voorkom CLS door minimale layout stabiliteit */
  nav{position:sticky;top:0;z-index:50}
  img,video{height:auto;max-width:100%}
  /* Ad containers vaste hoogte voorkomen CLS */
  .ad-container{min-height:90px}
`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563eb" },
    { media: "(prefers-color-scheme: dark)", color: "#1e3a5f" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://quotapp.nl"),
  title: {
    template: "%s | QuotApp.nl - Gratis Online Rekentools",
    default: "QuotApp.nl - Gratis Online Rekentools voor Nederland",
  },
  description: "Gratis Nederlandse rekentools: BTW berekenen 21%/9%, hypotheek maandlasten, procenten, IBAN check, valuta converter, BMI calculator en meer. Snel, accuraat en 100% gratis!",
  keywords: [
    "btw berekenen",
    "hypotheek berekenen",
    "procent berekenen",
    "iban check",
    "valuta converter",
    "bmi calculator",
    "nederlandse tools",
    "online rekenmachine",
    "gratis calculator",
    "financieel rekenen"
  ],
  authors: [{ name: "QuotApp.nl", url: "https://quotapp.nl" }],
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
    title: "QuotApp.nl - 25+ Gratis Online Rekentools voor Nederland",
    description: "Handige Nederlandse rekentools voor dagelijks gebruik. BTW, hypotheek, procenten, IBAN, valuta, BMI en meer. Snel, accuraat en gratis!",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "QuotApp.nl - Gratis Online Rekentools voor Nederland",
        type: "image/jpeg",
      },
      {
        url: "/og-image-square.jpg",
        width: 1200,
        height: 1200,
        alt: "QuotApp.nl Logo",
        type: "image/jpeg",
      },
    ],
    videos: [],
    audio: [],
    ttl: 86400,
  },
  twitter: {
    card: "summary_large_image",
    site: "@quotappnl",
    creator: "@quotappnl",
    title: "QuotApp.nl - 25+ Gratis Online Rekentools",
    description: "Handige Nederlandse rekentools voor dagelijks gebruik. BTW, hypotheek, procenten en meer. Snel, accuraat en gratis!",
    images: {
      url: "/og-image.jpg",
      alt: "QuotApp.nl - Gratis Online Rekentools",
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      "nl-NL": "https://quotapp.nl",
      "nl": "https://quotapp.nl",
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  category: "Finance",
  classification: "Online Calculators",
  referrer: "origin-when-cross-origin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        {/* DNS Prefetch voor snellere externe resources - LCP optimalisatie */}
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Preconnect voor snellere TCP handshake */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        
        {/* Critical CSS inline voor First Contentful Paint - LCP optimalisatie */}
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
        
        {/* Resource hints voor lazy loading images */}
        <link rel="preload" as="image" href="/logo.png" />
        
        {/* Google Ads script - lazy loaded met afterInteractive voor FID optimalisatie */}
        <Script
          id="google-adsense"
          strategy="lazyOnload"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4811749024166183"
          crossOrigin="anonymous"
        />
        
        {/* Google Analytics 4 - lazy loaded voor FID optimalisatie */}
        <Script
          id="gtag-init"
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-MEASUREMENT_ID"
        />
        <Script id="google-analytics-config" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MEASUREMENT_ID', {
              page_title: document.title,
              page_location: window.location.href,
              send_page_view: true,
              cookie_flags: 'SameSite=None;Secure',
            });
          `}
        </Script>
        
        {/* Structured Data for Rich Results */}
        <JsonLd data={websiteSchema} />
        <JsonLd data={organizationSchema} />
        <JsonLd data={localBusinessSchema} />
        <JsonLd data={personSchema} />
        <JsonLd data={webpageSchema} />
        <JsonLd data={aboutPageSchema} />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider>
          <Navbar />
          <PageTransition>
            <main className="min-h-screen">
              {children}
            </main>
          </PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
