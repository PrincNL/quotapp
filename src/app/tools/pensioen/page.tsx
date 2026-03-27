import { Metadata } from "next";
import { PensioenCalculatorClient } from "./pensioen-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Pensioen Calculator 2026 - Pensioen Opbouw Berekenen | QuotApp.nl",
  description: "Bereken je pensioenopbouw en ontdek hoeveel pensioen je hebt opgebouwd. Online pensioen calculator voor Nederland.",
  keywords: ["pensioen calculator", "pensioen berekenen", "pensioenleeftijd", "pensioenopbouw", "ouderdoms pensioen"],
  openGraph: {
    title: "Pensioen Calculator - Bereken Je Pensioenopbouw",
    description: "Ontdek hoeveel pensioen je hebt opgebouwd",
    url: "https://quotapp.nl/tools/pensioen",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/pensioen",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Pensioen Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Bereken je pensioenopbouw en toekomstig pensioen",
  url: "https://quotapp.nl/tools/pensioen",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Op welke leeftijd ga ik met pensioen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "De AOW-leeftijd in Nederland is momenteel 67 jaar en 3 maanden (kan veranderen). Je kunt vaak vanaf 5 jaar voor je AOW-leeftijd met pensioen gaan.",
      },
    },
    {
      "@type": "Question",
      name: "Wat is het verschil tussen AOW en pensioen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AOW is de basisvoorziening van de overheid. Pensioen is aanvullend inkomen opgebouwd via je werkgever. Beide samen vormen je oudedagsvoorziening.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quotapp.nl" },
    { "@type": "ListItem", position: 2, name: "Pensioen Calculator", item: "https://quotapp.nl/tools/pensioen" },
  ],
};

export default function PensioenCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <PensioenCalculatorClient />
    </>
  );
}
