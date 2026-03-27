import { Metadata } from "next";
import { LeningCalculatorClient } from "./lening-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Lening Calculator 2026 - Persoonlijke Lening Berekenen | QuotApp.nl",
  description: "Bereken de maandlasten en totale kosten van een persoonlijke lening. Vergelijk rentetarieven en leenbedragen. Gratis lening simulator voor Nederland.",
  keywords: ["lening calculator", "persoonlijke lening", "lening berekenen", "leenbedrag", "maandlasten lening"],
  openGraph: {
    title: "Lening Calculator - Bereken Je Lening en Maandlasten",
    description: "Simuleer een persoonlijke lening en bereken je maandelijkse kosten",
    url: "https://quotapp.nl/tools/lening",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/lening",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Lening Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Bereken maandlasten en kosten van een persoonlijke lening",
  url: "https://quotapp.nl/tools/lening",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wat is het verschil tussen een persoonlijke lening en een doorlopend krediet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bij een persoonlijke lening leen je een vast bedrag met vaste maandlasten. Bij een doorlopend krediet kun je tot een bepaald limiet opnemen en aflossen wanneer je wilt.",
      },
    },
    {
      "@type": "Question",
      name: "Wat is een realistisch rentetarief voor een lening?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "De rente voor persoonlijke leningen varieert van ongeveer 5% tot 15%, afhankelijk van je kredietwaardigheid en het leenbedrag.",
      },
    },
    {
      "@type": "Question",
      name: "Kan ik mijn lening vervroegd aflossen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, bij de meeste leningen mag je vervroegd aflossen. Vaak mag je tot 10% van het oorspronkelijke bedrag per jaar boetevrij aflossen.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quotapp.nl" },
    { "@type": "ListItem", position: 2, name: "Lening Calculator", item: "https://quotapp.nl/tools/lening" },
  ],
};

export default function LeningCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <LeningCalculatorClient />
    </>
  );
}
