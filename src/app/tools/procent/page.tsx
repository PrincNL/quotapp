import { Metadata } from "next";
import { ProcentCalculatorClient } from "./procent-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Procent Calculator 2026 - Percentage Berekenen | QuotApp.nl",
  description: "Bereken percentages eenvoudig: korting, stijging, daling, en meer. Gratis percentage calculator met alle basistechnieken. Snel en accuraat!",
  keywords: ["procent calculator", "percentage berekenen", "korting berekenen", "procent stijging", "procent daling"],
  openGraph: {
    title: "Procent Calculator - Percentage van een Getal Berekenen",
    description: "Reken snel en eenvoudig met percentages",
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
  description: "Bereken percentages, kortingen en procentuele veranderingen",
  url: "https://quotapp.nl/tools/procent",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Hoe bereken je een percentage van een getal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vermenigvuldig het getal met het percentage en deel door 100. Bijvoorbeeld: 20% van €150 = €150 × 0,20 = €30.",
      },
    },
    {
      "@type": "Question",
      name: "Hoe bereken je een procentuele stijging?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Deel het verschil tussen de nieuwe en oude waarde door de oude waarde en vermenigvuldig met 100. Bijvoorbeeld: van €100 naar €125 is een stijging van 25%.",
      },
    },
    {
      "@type": "Question",
      name: "Hoe bereken je een korting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bereken eerst het kortingsbedrag (percentage × prijs) en trek dit af van de oorspronkelijke prijs. Of vermenigvuldig direct met (100% - korting%).",
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
