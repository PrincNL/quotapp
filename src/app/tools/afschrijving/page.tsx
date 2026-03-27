import { Metadata } from "next";
import { AfschrijvingCalculatorClient } from "./afschrijving-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Afschrijving Calculator 2026 - Lineaire Afschrijving Berekenen | QuotApp.nl",
  description: "Bereken de lineaire afschrijving van bedrijfsmiddelen. Gratis afschrijving calculator voor ondernemers.",
  keywords: ["afschrijving calculator", "lineaire afschrijving", "boekwaarde", "bedrijfsmiddelen afschrijven"],
  openGraph: {
    title: "Afschrijving Calculator - Bereken Lineaire Afschrijving",
    description: "Bereken eenvoudig de afschrijving van bedrijfsmiddelen",
    url: "https://quotapp.nl/tools/afschrijving",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/afschrijving",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Afschrijving Calculator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Bereken lineaire afschrijving van bedrijfsmiddelen",
  url: "https://quotapp.nl/tools/afschrijving",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wat is lineaire afschrijving?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bij lineaire afschrijving schrijf je elk jaar hetzelfde bedrag af. De formule is: (aanschafwaarde - restwaarde) / gebruiksduur.",
      },
    },
    {
      "@type": "Question",
      name: "Wat is de restwaarde?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "De restwaarde is de geschatte waarde van een bedrijfsmiddel aan het einde van de gebruiksduur. Dit wordt afgetrokken van de aanschafwaarde voordat je de jaarlijkse afschrijving berekent.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quotapp.nl" },
    { "@type": "ListItem", position: 2, name: "Afschrijving Calculator", item: "https://quotapp.nl/tools/afschrijving" },
  ],
};

export default function AfschrijvingCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <AfschrijvingCalculatorClient />
    </>
  );
}
