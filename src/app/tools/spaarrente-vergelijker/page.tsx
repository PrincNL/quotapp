import { Metadata } from "next";
import { SpaarrenteVergelijkerClient } from "./spaarrente-vergelijker-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Spaarrente Vergelijker 2026 - Beste Spaarrente Vinden | QuotApp.nl",
  description: "Vergelijk spaarrentes van Nederlandse banken. Vind de hoogste spaarrente voor jouw spaardoel.",
  keywords: ["spaarrente vergelijker", "beste spaarrente", "spaarrekening vergelijken", "hoogste spaarrente"],
  openGraph: {
    title: "Spaarrente Vergelijker - Vind de Beste Spaarrente",
    description: "Vergelijk spaarrentes van Nederlandse banken",
    url: "https://quotapp.nl/tools/spaarrente-vergelijker",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/spaarrente-vergelijker",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Spaarrente Vergelijker",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Vergelijk spaarrentes van Nederlandse banken",
  url: "https://quotapp.nl/tools/spaarrente-vergelijker",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wat is het verschil tussen variabele en vaste spaarrente?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bij een variabele rente kan de bank de rente altijd aanpassen. Bij een vaste rente blijft deze gegarandeerd gedurende de afgesproken periode.",
      },
    },
    {
      "@type": "Question",
      name: "Is mijn spaargeld beschermd?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, spaargeld in Nederland is beschermd tot €100.000 per persoon per bank via het Depositogarantiestelsel (DGS).",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quotapp.nl" },
    { "@type": "ListItem", position: 2, name: "Spaarrente Vergelijker", item: "https://quotapp.nl/tools/spaarrente-vergelijker" },
  ],
};

export default function SpaarrenteVergelijkerCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <SpaarrenteVergelijkerClient />
    </>
  );
}
