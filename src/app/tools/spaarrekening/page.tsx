import { Metadata } from "next";
import { SpaarrekeningVergelijkerClient } from "./spaarrekening-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Spaarrekening Calculator 2026 - Spaargroei Berekenen | QuotApp.nl",
  description: "Bereken de groei van je spaargeld met actuele spaarrentes. Vergelijk spaarrekeningen en bereken je vermogen.",
  keywords: ["spaarrekening calculator", "spaarrente vergelijken", "spaargroei", "spaargeld", "beste spaarrente"],
  openGraph: {
    title: "Spaarrekening Calculator - Bereken Je Spaargroei",
    description: "Bereken hoeveel je spaargeld groeit met rente-op-rente",
    url: "https://quotapp.nl/tools/spaarrekening",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/spaarrekening",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Spaarrekening Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Bereken de groei van je spaargeld",
  url: "https://quotapp.nl/tools/spaarrekening",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wat is het verschil tussen spaarrekening en deposito?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bij een spaarrekening kun je altijd geld opnemen. Bij een deposito zet je geld vast voor een bepaalde periode, maar krijg je meestal een hogere rente.",
      },
    },
    {
      "@type": "Question",
      name: "Waar vind ik de hoogste spaarrente?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "De hoogste spaarrentes vind je meestal bij online banken en in deposito's met langere looptijden. Vergelijk altijd de voorwaarden.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quotapp.nl" },
    { "@type": "ListItem", position: 2, name: "Spaarrekening Calculator", item: "https://quotapp.nl/tools/spaarrekening" },
  ],
};

export default function SpaarrekeningCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <SpaarrekeningVergelijkerClient />
    </>
  );
}
