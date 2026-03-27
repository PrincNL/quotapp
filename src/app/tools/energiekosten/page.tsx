import { Metadata } from "next";
import { EnergiekostenCalculatorClient } from "./energiekosten-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Energiekosten Calculator 2026 - Stroom & Gas Kosten Berekenen | QuotApp.nl",
  description: "Bereken je energiekosten voor stroom en gas. Vergelijk tarieven en ontdek hoe je kunt besparen op energie.",
  keywords: ["energiekosten calculator", "stroom kosten berekenen", "gas kosten", "energieverbruik", "energie besparen"],
  openGraph: {
    title: "Energiekosten Calculator - Bereken Je Energiekosten",
    description: "Bereken eenvoudig je stroom- en gaskosten",
    url: "https://quotapp.nl/tools/energiekosten",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/energiekosten",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Energiekosten Calculator",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Bereken je stroom- en gaskosten",
  url: "https://quotapp.nl/tools/energiekosten",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wat is het gemiddelde energieverbruik?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Een gemiddeld Nederlands huishouden verbruikt ongeveer 2.500 kWh stroom en 1.200 m³ gas per jaar. Dit varieert sterk per huishouden en type woning.",
      },
    },
    {
      "@type": "Question",
      name: "Hoe kan ik mijn energiekosten verlagen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Manieren om energiekosten te verlagen zijn: isoleren, zonnepanelen plaatsen, energiezuinige apparaten kopen, en bewust omgaan met energieverbruik.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quotapp.nl" },
    { "@type": "ListItem", position: 2, name: "Energiekosten Calculator", item: "https://quotapp.nl/tools/energiekosten" },
  ],
};

export default function EnergiekostenCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <EnergiekostenCalculatorClient />
    </>
  );
}
