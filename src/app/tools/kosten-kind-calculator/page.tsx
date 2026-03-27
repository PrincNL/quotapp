import type { Metadata } from "next";
import { KostenKindCalculatorClient } from "./kosten-kind-calculator-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Kosten Kind Calculator | Opvoedkosten Berekenen 2025",
  description: "Bereken de totale kosten voor het opvoeden van een kind. Van baby tot 18 jaar, inclusief studiekosten en begeleiding.",
  keywords: ["kosten kind", "opvoedkosten", "kinderkosten berekenen", "kind kosten"],
  openGraph: {
    title: "Kosten Kind Calculator",
    description: "Bereken de totale opvoedkosten",
    url: "https://quotapp.nl/tools/kosten-kind-calculator",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/kosten-kind-calculator",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Kosten Kind Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Bereken opvoedkosten",
  url: "https://quotapp.nl/tools/kosten-kind-calculator",
};

export default function KostenKindCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <KostenKindCalculatorClient />
    </>
  );
}
