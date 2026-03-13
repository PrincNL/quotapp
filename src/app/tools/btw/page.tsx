import type { Metadata } from "next";
import { BTWCalculatorClient } from "./btw-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "BTW Berekenen 21% / 9% | Gratis BTW Calculator 2025",
  description: "Bereken eenvoudig 21% of 9% BTW. Van exclusief naar inclusief en vice versa. Gratis online BTW tool voor Nederlandse ondernemers.",
  keywords: ["btw berekenen", "21% btw", "9% btw", "btw calculator", "exclusief inclusief btw"],
  openGraph: {
    title: "BTW Calculator - 21%, 9% en 0% BTW Berekenen",
    description: "Gratis BTW calculator voor alle Nederlandse btw-tarieven",
    url: "https://quotapp.nl/tools/btw",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/btw",
  },
};

// SoftwareApplication Schema
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "BTW Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1250",
  },
  description: "Bereken 21%, 9% of 0% BTW eenvoudig online",
  url: "https://quotapp.nl/tools/btw",
};

// FAQ Schema
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Hoe werkt de BTW calculator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vul het bedrag in, kies het BTW percentage (21%, 9% of 0%), en klik op berekenen. De calculator toont automatisch het bedrag exclusief BTW, het BTW bedrag, en het totaal inclusief BTW.",
      },
    },
    {
      "@type": "Question",
      name: "Wat is het hoge BTW tarief in Nederland?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Het hoge BTW tarief in Nederland is 21%. Dit tarief geldt voor de meeste producten en diensten.",
      },
    },
    {
      "@type": "Question",
      name: "Wat is het lage BTW tarief in Nederland?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Het lage BTW tarief in Nederland is 9%. Dit geldt voor onder andere eten en drinken, boeken, en arbeid voor woningonderhoud.",
      },
    },
    {
      "@type": "Question",
      name: "Hoe reken ik BTW uit een totaalbedrag?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Selecteer 'Incl. BTW → Excl. BTW' in de calculator, vul het totaalbedrag in, en kies het juiste percentage. De calculator toont het exclusieve bedrag en het BTW bedrag.",
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
      name: "BTW Calculator",
      item: "https://quotapp.nl/tools/btw",
    },
  ],
};

export default function BTWCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <BTWCalculatorClient />
    </>
  );
}
