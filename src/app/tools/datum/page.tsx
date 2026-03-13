import type { Metadata } from "next";
import { DatumCalculatorClient } from "./datum-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Datum Berekenen | Dagen Tussen Datums",
  description: "Bereken het verschil tussen twee datums. Werkdagen tellen, weken, maanden en jaren berekenen. Gratis datum calculator.",
  keywords: ["dagen berekenen", "datum verschil", "werkdagen tellen", "datum calculator", "dagen tussen"],
  openGraph: {
    title: "Datum Calculator - Dagen Tussen Twee Datums",
    description: "Bereken het verschil tussen datums",
    url: "https://quotapp.nl/tools/datum",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/datum",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Datum Calculator",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Bereken het verschil tussen twee datums",
  url: "https://quotapp.nl/tools/datum",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Hoeveel werkdagen zitten er in een jaar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In een normaal jaar zijn er 261 werkdagen (exclusief weekenden). In een schrikkeljaar zijn dat er 262.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quotapp.nl" },
    { "@type": "ListItem", position: 2, name: "Datum Calculator", item: "https://quotapp.nl/tools/datum" },
  ],
};

export default function DatumCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <DatumCalculatorClient />
    </>
  );
}
