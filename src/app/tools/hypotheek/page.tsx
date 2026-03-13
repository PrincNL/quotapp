import type { Metadata } from "next";
import { HypotheekCalculatorClient } from "./hypotheek-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Hypotheek Berekenen | Maximale Hypotheek & Maandlasten 2025",
  description: "Bereken je maximale hypotheek en maandlasten op basis van je inkomen. Inclusief rente en looptijd. Gratis hypotheek calculator voor Nederland.",
  keywords: ["hypotheek berekenen", "maximale hypotheek", "maandlasten", "hypotheek calculator", "bruto inkomen"],
  openGraph: {
    title: "Hypotheek Calculator - Maximale Hypotheek Berekenen",
    description: "Bereken je maximale hypotheek op basis van je inkomen",
    url: "https://quotapp.nl/tools/hypotheek",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/hypotheek",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Hypotheek Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Bereken je maximale hypotheek en maandlasten",
  url: "https://quotapp.nl/tools/hypotheek",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Hoeveel hypotheek kan ik krijgen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Als vuistregel kun je ongeveer 4.5 tot 5 keer je bruto jaarinkomen lenen. Met een partner worden beide inkomens bij elkaar opgeteld.",
      },
    },
    {
      "@type": "Question",
      name: "Hoe worden maandlasten berekend?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "De maandlasten worden berekend op basis van een annuïteitenhypotheek. Dit betekent dat je elke maand hetzelfde bedrag betaalt, bestaande uit rente en aflossing.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quotapp.nl" },
    { "@type": "ListItem", position: 2, name: "Hypotheek Calculator", item: "https://quotapp.nl/tools/hypotheek" },
  ],
};

export default function HypotheekCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <HypotheekCalculatorClient />
    </>
  );
}
