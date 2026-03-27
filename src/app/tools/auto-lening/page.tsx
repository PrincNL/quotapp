import { Metadata } from "next";
import { AutoLeningCalculatorClient } from "./auto-lening-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Auto Lening Calculator 2026 - Autofinanciering Berekenen | QuotApp.nl",
  description: "Bereken de maandlasten voor je autofinanciering. Vergelijk autoleningen en kies de beste optie voor je budget.",
  keywords: ["auto lening calculator", "autofinanciering", "autokrediet", "auto kopen", "autofinanciering berekenen"],
  openGraph: {
    title: "Auto Lening Calculator - Bereken Je Autofinanciering",
    description: "Simuleer de maandlasten voor je auto lening",
    url: "https://quotapp.nl/tools/auto-lening",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/auto-lening",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Auto Lening Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Bereken de maandlasten van je autofinanciering",
  url: "https://quotapp.nl/tools/auto-lening",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Hoeveel auto kan ik financieren?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dat hangt af van je inkomen, eventuele andere leningen en de looptijd. Als vuistregel geldt dat je autolening niet hoger moet zijn dan 20-30% van je netto maandinkomen.",
      },
    },
    {
      "@type": "Question",
      name: "Wat is een goed rentetarief voor een autolening?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Autoleningen variëren van ongeveer 4% tot 10% afhankelijk van je kredietwaardigheid, het leenbedrag en of de auto als onderpand dient.",
      },
    },
    {
      "@type": "Question",
      name: "Moet ik kiezen voor lening of private lease?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dat hangt af van je situatie. Bij kopen met lening word je eigenaar en betaal je af. Bij private lease huur je de auto maandelijks. Vergelijk de totale kosten voor je beslissing.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quotapp.nl" },
    { "@type": "ListItem", position: 2, name: "Auto Lening Calculator", item: "https://quotapp.nl/tools/auto-lening" },
  ],
};

export default function AutoLeningCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <AutoLeningCalculatorClient />
    </>
  );
}
