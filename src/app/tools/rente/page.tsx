import { Metadata } from "next";
import { RenteCalculatorClient } from "./rente-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Rente Calculator 2026 - Enkelvoudige & Samengestelde Rente | QuotApp.nl",
  description: "Bereken eenvoudig enkelvoudige en samengestelde rente. Online rente calculator voor spaarrente, kredietrente en beleggingsrendement.",
  keywords: ["rente calculator", "samengestelde rente", "enkelvoudige rente", "spaarrente berekenen", "rendement berekenen"],
  openGraph: {
    title: "Rente Calculator - Bereken Enkelvoudige en Samengestelde Rente",
    description: "Online rente calculator voor al je financiële berekeningen",
    url: "https://quotapp.nl/tools/rente",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/rente",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Rente Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Bereken enkelvoudige en samengestelde rente",
  url: "https://quotapp.nl/tools/rente",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wat is het verschil tussen enkelvoudige en samengestelde rente?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bij enkelvoudige rente krijg je alleen rente over de oorspronkelijke inleg. Bij samengestelde rente krijg je ook rente over de opgebouwde rente, wat zorgt voor exponentiële groei.",
      },
    },
    {
      "@type": "Question",
      name: "Welke rente formule moet ik gebruiken?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gebruik de exponentiële formule voor samengestelde rente: K = K₀ × (1 + r/n)^(n×t). Voor enkelvoudige rente: K = K₀ × (1 + r×t).",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quotapp.nl" },
    { "@type": "ListItem", position: 2, name: "Rente Calculator", item: "https://quotapp.nl/tools/rente" },
  ],
};

export default function RenteCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <RenteCalculatorClient />
    </>
  );
}
