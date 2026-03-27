import type { Metadata } from "next";
import { HypotheekMaandlastenClient } from "./hypotheek-maandlasten-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Hypotheek Maandlasten Calculator | Exacte Berekening Alle Kosten 2025",
  description: "Bereken exact je hypotheek maandlasten inclusief rente, aflossing, verzekeringen en onderhoudskosten. Alles-inclusive hypotheek calculator voor Nederland.",
  keywords: ["hypotheek maandlasten", "maandlasten berekenen", "hypotheek calculator", "maandlasten hypotheek"],
  openGraph: {
    title: "Hypotheek Maandlasten Calculator",
    description: "Bereken exact je hypotheek maandlasten",
    url: "https://quotapp.nl/tools/hypotheek-maandlasten",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/hypotheek-maandlasten",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Hypotheek Maandlasten Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Bereken exact je hypotheek maandlasten",
  url: "https://quotapp.nl/tools/hypotheek-maandlasten",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wat is inclusief in hypotheek maandlasten?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hypotheek maandlasten bestaan uit: rente, aflossing, eventueel premie voor overlijdensverzekering, opstalverzekering, en eventueel erfpacht.",
      },
    },
  ],
};

export default function HypotheekMaandlastenPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <HypotheekMaandlastenClient />
    </>
  );
}
