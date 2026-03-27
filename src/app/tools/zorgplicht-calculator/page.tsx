import type { Metadata } from "next";
import { ZorgplichtCalculatorClient } from "./zorgplicht-calculator-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Zorgplicht Calculator | Bereken of je in de problemen zit met schulden",
  description: "Bereken of je voldoet aan je zorgplicht en of je in financiële problemen kunt raken met je schulden. Gratis tool voor Nederland.",
  keywords: ["zorgplicht calculator", "schulden berekenen", "financiële problemen", "schuldverplichting"],
  openGraph: {
    title: "Zorgplicht Calculator",
    description: "Bereken of je in de problemen zit met schulden",
    url: "https://quotapp.nl/tools/zorgplicht-calculator",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/zorgplicht-calculator",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Zorgplicht Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Bereken of je in de problemen zit met schulden",
  url: "https://quotapp.nl/tools/zorgplicht-calculator",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wat is de zorgplicht?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "De zorgplicht houdt in dat je voldoende moet proberen om je schulden te betalen. Als je inkomen ontoereikend is om aan alle betalingsverplichtingen te voldoen, kun je in de problemen komen.",
      },
    },
    {
      "@type": "Question",
      name: "Wanneer ben ik overmatig schulden?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Je wordt als overmatig schulden beschouwd wanneer je schulden hoger zijn dan wat redelijkerwijs van je verwacht kan worden te betalen, gegeven je inkomen en vermogen.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quotapp.nl" },
    { "@type": "ListItem", position: 2, name: "Zorgplicht Calculator", item: "https://quotapp.nl/tools/zorgplicht-calculator" },
  ],
};

export default function ZorgplichtCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ZorgplichtCalculatorClient />
    </>
  );
}
