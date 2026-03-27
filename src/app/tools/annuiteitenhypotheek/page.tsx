import { Metadata } from "next";
import { AnnuiteitenHypotheekClient } from "./annuiteitenhypotheek-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Annuïteitenhypotheek Calculator 2026 - Maandlasten Berekenen | QuotApp.nl",
  description: "Bereken de maandlasten van een annuïteitenhypotheek. Gratis annuïteit calculator met vaste maandlasten.",
  keywords: ["annuïteitenhypotheek", "annuïteit calculator", "maandlasten hypotheek", "vaste lasten hypotheek"],
  openGraph: {
    title: "Annuïteitenhypotheek Calculator - Bereken Maandlasten",
    description: "Bereken de maandlasten van een annuïteitenhypotheek",
    url: "https://quotapp.nl/tools/annuiteitenhypotheek",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/annuiteitenhypotheek",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Annuïteitenhypotheek Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Bereken maandlasten van annuïteitenhypotheek",
  url: "https://quotapp.nl/tools/annuiteitenhypotheek",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wat is het verschil tussen annuïteitenhypotheek en lineaire hypotheek?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bij een annuïteitenhypotheek betaal je elke maand hetzelfde bedrag. Bij een lineaire hypotheek betaal je elke maand een vast bedrag aan aflossing, waardoor je lasten dalen over tijd.",
      },
    },
    {
      "@type": "Question",
      name: "Waarom kiezen voor annuïteitenhypotheek?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "De annuïteitenhypotheek biedt zekerheid doordat je maandlasten vast blijven. Aan het begin los je minder af, maar aan het einde meer.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://quotapp.nl" },
    { "@type": "ListItem", position: 2, name: "Annuïteitenhypotheek Calculator", item: "https://quotapp.nl/tools/annuiteitenhypotheek" },
  ],
};

export default function AnnuiteitenhypotheekCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <AnnuiteitenHypotheekClient />
    </>
  );
}
