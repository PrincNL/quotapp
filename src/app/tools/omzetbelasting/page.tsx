import { Metadata } from "next";
import { OmzetbelastingCalculatorClient } from "./omzetbelasting-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Omzetbelasting Calculator 2026 - BTW Berekenen | QuotApp.nl",
  description: "Bereken omzetbelasting (BTW) voor je onderneming. Bereken voorbelasting, btw-aangifte en te betalen btw.",
  keywords: ["omzetbelasting calculator", "btw berekenen", "voorbelasting", "btw aangifte", "ondernemer btw"],
  openGraph: {
    title: "Omzetbelasting Calculator - BTW Voor Ondernemers",
    description: "Bereken omzetbelasting en voorbelasting voor ondernemers",
    url: "https://quotapp.nl/tools/omzetbelasting",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/omzetbelasting",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Omzetbelasting Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Bereken omzetbelasting voor ondernemers",
  url: "https://quotapp.nl/tools/omzetbelasting",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wat is voorbelasting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Voorbelasting is de BTW die je zelf hebt betaald over inkopen en kosten. Deze kun je aftrekken van de BTW die je ontvangt van klanten.",
      },
    },
    {
      "@type": "Question",
      name: "Wanneer moet ik btw-aangifte doen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dat hangt af van je omzet. Meestal is dat maandelijks of per kwartaal. Zeer kleine ondernemingen kunnen jaarlijks aangifte doen.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quotapp.nl" },
    { "@type": "ListItem", position: 2, name: "Omzetbelasting Calculator", item: "https://quotapp.nl/tools/omzetbelasting" },
  ],
};

export default function OmzetbelastingCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <OmzetbelastingCalculatorClient />
    </>
  );
}
