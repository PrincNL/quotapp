import { Metadata } from "next";
import { LineaireHypotheekClient } from "./lineaire-hypotheek-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Lineaire Hypotheek Calculator 2026 - Maandlasten Berekenen | QuotApp.nl",
  description: "Bereken de maandlasten van een lineaire hypotheek. Gratis lineaire hypotheek calculator met dalende lasten.",
  keywords: ["lineaire hypotheek", "lineaire hypotheek calculator", "maandlasten dalend", "hypotheek aflossing"],
  openGraph: {
    title: "Lineaire Hypotheek Calculator - Bereken Maandlasten",
    description: "Bereken de dalende maandlasten van een lineaire hypotheek",
    url: "https://quotapp.nl/tools/lineaire-hypotheek",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/lineaire-hypotheek",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Lineaire Hypotheek Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Bereken maandlasten van lineaire hypotheek",
  url: "https://quotapp.nl/tools/lineaire-hypotheek",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wat is een lineaire hypotheek?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bij een lineaire hypotheek los je elke maand een vast bedrag af. Je rente wordt berekend over de resterende schuld, waardoor je maandlasten dalen gedurende de looptijd.",
      },
    },
    {
      "@type": "Question",
      name: "Wat zijn de voordelen van een lineaire hypotheek?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "De voordelen zijn dat je sneller aflost, minder totale rente betaalt dan bij een annuïteitenhypotheek, en dalende maandlasten hebt.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quotapp.nl" },
    { "@type": "ListItem", position: 2, name: "Lineaire Hypotheek Calculator", item: "https://quotapp.nl/tools/lineaire-hypotheek" },
  ],
};

export default function LineaireHypotheekCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <LineaireHypotheekClient />
    </>
  );
}
