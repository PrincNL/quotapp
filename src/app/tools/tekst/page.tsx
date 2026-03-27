import { Metadata } from "next";
import { TekstToolsClient } from "./tekst-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Tekst Analyzer 2026 - Woorden Tellen & Karakters Tellen | QuotApp.nl",
  description: "Tel woorden, karakters en bereken leestijd. Gratis tekst analyzer voor writers, studenten en professionals.",
  keywords: ["tekst analyzer", "woorden tellen", "karakters tellen", "leestijd berekenen", "letter teller"],
  openGraph: {
    title: "Tekst Analyzer - Tel Woorden, Karakters en Bereken Leestijd",
    description: "Analyseer je tekst: tel woorden, karakters en meer",
    url: "https://quotapp.nl/tools/tekst",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/tekst",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Tekst Analyzer",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Tel woorden, karakters en bereken leestijd",
  url: "https://quotapp.nl/tools/tekst",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Hoeveel woorden telt een gemiddelde pagina?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Een gemiddelde pagina bevat ongeveer 250-300 woorden bij standaard opmaak (12pt lettertype, dubbele regelafstand voor documenten).",
      },
    },
    {
      "@type": "Question",
      name: "Wat is de gemiddelde leessnelheid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "De gemiddelde leessnelheid voor volwassenen is ongeveer 200-250 woorden per minuut. Dit kan variëren afhankelijk van de complexiteit van de tekst.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quotapp.nl" },
    { "@type": "ListItem", position: 2, name: "Tekst Analyzer", item: "https://quotapp.nl/tools/tekst" },
  ],
};

export default function TekstCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <TekstToolsClient />
    </>
  );
}
