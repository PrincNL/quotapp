import { Metadata } from "next";
import { AlimentatieCalculatorClient } from "./alimentatie-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Alimentatie Calculator 2026 - Partner- en Kinderalimentatie Berekenen | QuotApp.nl",
  description: "Bereken indicatief de partneralimentatie en kinderalimentatie. Gratis alimentatie calculator gebaseerd op de Nederlandse richtlijnen.",
  keywords: ["alimentatie calculator", "partneralimentatie", "kinderalimentatie", "echtscheiding", "onderhoudsbijdrage"],
  openGraph: {
    title: "Alimentatie Calculator - Bereken Partner- en Kinderalimentatie",
    description: "Indicatieve berekening van alimentatie na scheiding",
    url: "https://quotapp.nl/tools/alimentatie",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/alimentatie",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Alimentatie Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Bereken indicatief partner- en kinderalimentatie",
  url: "https://quotapp.nl/tools/alimentatie",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wat is het verschil tussen partner- en kinderalimentatie?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Partneralimentatie is voor de ex-partner en dient om levensonderhoud te verzekeren. Kinderalimentatie is voor de kinderen en dient om in hun behoeften te voorzien.",
      },
    },
    {
      "@type": "Question",
      name: "Hoe lang moet ik partneralimentatie betalen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sinds 2020 is de maximale duur van partneralimentatie 5 jaar (of korter afhankelijk van de duur van het huwelijk). Langer betalen is mogelijk maar niet verplicht.",
      },
    },
    {
      "@type": "Question",
      name: "Is de alimentatiecalculator juridisch bindend?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nee, deze calculator geeft een indicatie. De werkelijke alimentatie wordt bepaald door rechterlijke uitspraak of via mediation. Raadpleeg altijd een advocaat.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quotapp.nl" },
    { "@type": "ListItem", position: 2, name: "Alimentatie Calculator", item: "https://quotapp.nl/tools/alimentatie" },
  ],
};

export default function AlimentatieCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <AlimentatieCalculatorClient />
    </>
  );
}
