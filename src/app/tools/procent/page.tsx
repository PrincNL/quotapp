import type { Metadata } from "next";
import { Metadata as NextMetadata } from "next";

export const metadata: Metadata = {
  title: "Procent Berekenen | Gratis Procent Calculator",
  description: "Bereken percentages eenvoudig: percentage van bedrag, percentage verhoging/verlaging, percentage verschil en meer. Gratis online procent tool.",
  keywords: ["procent berekenen", "percentage calculator", "percentage van", "procenten rekenen", "percentage verhoging", "percentage korting"],
  openGraph: {
    title: "Procent Calculator - Percentages Eenvoudig Berekenen",
    description: "Gratis procent calculator voor alle percentage berekeningen",
    url: "https://quotapp.nl/tools/procent",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/procent",
  },
};

// SoftwareApplication Schema
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Procent Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    ratingCount: "890",
  },
  description: "Bereken percentages eenvoudig online",
  url: "https://quotapp.nl/tools/procent",
};

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Hoe bereken ik een percentage van een bedrag?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Om een percentage van een bedrag te berekenen, vermenigvuldig je het bedrag met het percentage en deel je door 100. Bijvoorbeeld: 21% van €100 = (21 × 100) ÷ 100 = €21.",
      },
    },
    {
      "@type": "Question",
      name: "Hoe bereken ik een percentage verhoging?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Voor een percentage verhoging: nieuwe waarde = oude waarde × (1 + percentage ÷ 100). Bijvoorbeeld: €100 met 20% verhoging = €100 × 1,20 = €120.",
      },
    },
    {
      "@type": "Question",
      name: "Hoe bereken ik het percentage verschil?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Het percentage verschil = ((nieuwe waarde - oude waarde) ÷ oude waarde) × 100. Bijvoorbeeld: van €80 naar €100 = ((100-80) ÷ 80) × 100 = 25%.",
      },
    },
  ],
};

// Breadcrumb Schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://quotapp.nl",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Procent Calculator",
      item: "https://quotapp.nl/tools/procent",
    },
  ],
};

import { ProcentCalculatorClient } from "./procent-client";
import { JsonLd } from "@/components/json-ld";

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
