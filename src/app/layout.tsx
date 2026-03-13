import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuotApp.nl - Gratis Online Rekentools",
  description: "Gratis Nederlandse rekentools: BTW berekenen, hypotheek, procenten, IBAN check, valuta en meer. Snel, eenvoudig en accuraat!",
  keywords: ["btw berekenen", "hypotheek berekenen", "procent berekenen", "iban check", "valuta converter", "nederlandse tools"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4811749024166183"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  );
}
