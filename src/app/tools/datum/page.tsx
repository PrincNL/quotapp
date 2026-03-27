import { Metadata } from "next";
import { DatumCalculatorClient } from "./datum-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Datum Calculator 2026 - Dagen Tellen & Leeftijd Berekenen | QuotApp.nl",
  description: "Bereken het aantal dagen tussen twee data, je leeftijd, of tel werkdagen. Handige datum calculator voor Nederland.",
  keywords: ["datum calculator", "dagen tellen", "leeftijd berekenen", "werkdagen berekenen", "datumverschil"],
  openGraph: {
    title: "Datum Calculator - Dagen Tellen en Leeftijd Berekenen",
    description: "Bereken eenvoudig datumverschillen en werkdagen",
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
  description: "Bereken dagen tussen data, leeftijd en werkdagen",
  url: "https://quotapp.nl/tools/datum",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Hoe bereken je het aantal dagen tussen twee data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Trek de startdatum van de einddatum af. Tel vervolgens het aantal dagen, waarbij je rekening houdt met de verschillende aantal dagen per maand.",
      },
    },
    {
      "@type": "Question",
      name: "Worden weekends meegeteld in werkdagen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nee, bij werkdagen worden alleen maandag tot en met vrijdag meegeteld. Zaterdag en zondag worden niet als werkdagen beschouwd.",
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
