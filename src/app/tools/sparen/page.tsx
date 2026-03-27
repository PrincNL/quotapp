import { Metadata } from "next";
import { SparenCalculatorClient } from "./sparen-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Sparen Calculator 2026 - Bereken Je Spaarrente | QuotApp.nl",
  description: "Bereken hoeveel spaargeld je opbouwt met rente-op-rente. Online sparen calculator met verschillende spaarrentes en looptijden. Ontdek je spaarpotentieel!",
  keywords: ["sparen calculator", "spaarrente berekenen", "rente op rente", "spaargeld berekenen", "spaardoel", "vermogen opbouwen"],
  openGraph: {
    title: "Sparen Calculator - Bereken Je Spaarrente en Vermogen",
    description: "Ontdek hoeveel je spaargeld kan groeien met rente-op-rente effect",
    url: "https://quotapp.nl/tools/sparen",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/sparen",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Sparen Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Bereken je spaarrente en rente-op-rente effect",
  url: "https://quotapp.nl/tools/sparen",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Hoe werkt rente-op-rente?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bij rente-op-rente ontvang je rente over je oorspronkelijke inleg én over de rente die je eerder hebt ontvangen. Hierdoor groeit je spaargeld steeds sneller.",
      },
    },
    {
      "@type": "Question",
      name: "Wat is een goed spaarrente percentage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "De huidige spaarrentes in Nederland variëren van 0,5% tot 3,5% per jaar, afhankelijk van de bank en het type spaarrekening.",
      },
    },
    {
      "@type": "Question",
      name: "Hoe lang moet ik sparen om vermogen op te bouwen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dat hangt af van je spaardoel en het maandelijkse spaarbedrag. Gebruik onze calculator om te zien hoe lang het duurt om je doel te bereiken.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quotapp.nl" },
    { "@type": "ListItem", position: 2, name: "Sparen Calculator", item: "https://quotapp.nl/tools/sparen" },
  ],
};

export default function SparenPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <SparenCalculatorClient />
    </>
  );
}
