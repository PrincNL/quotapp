import type { Metadata } from "next";
import { ProcentCalculatorClient } from "./procent-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Procent Berekenen | Percentage Calculator Online",
  description: "Alle percentage berekeningen: X% van Y, stijging/daling berekenen, percentage van totaal. Gratis online procent tool.",
  keywords: ["procent berekenen", "percentage calculator", "stijging berekenen", "daling berekenen", "percentage van"],
  openGraph: {
    title: "Procent Calculator - Alle Percentage Berekeningen",
    description: "Percentage berekeningen makkelijk gemaakt",
    url: "https://quotapp.nl/tools/procent",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/procent",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Procent Calculator",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Alle percentage berekeningen in één tool",
  url: "https://quotapp.nl/tools/procent",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Hoe bereken ik een percentage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Om X% van Y te berekenen: (X / 100) × Y. Bijvoorbeeld: 20% van 100 = (20 / 100) × 100 = 20.",
      },
    },
    {
      "@type": "Question",
      name: "Hoe bereken ik percentage stijging?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Percentage stijging = ((nieuwe waarde - oude waarde) / oude waarde) × 100. Bijvoorbeeld: van 80 naar 100 = ((100-80)/80) × 100 = 25% stijging.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quotapp.nl" },
    { "@type": "ListItem", position: 2, name: "Procent Calculator", item: "https://quotapp.nl/tools/procent" },
  ],
};

export default function ProcentCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ProcentCalculatorClient />
    </>
  );
}
