import type { Metadata } from "next";
import { BufferCalculatorClient } from "./buffer-calculator-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Financiële Buffer Calculator | Hoeveel Spaargeld Nodig?",
  description: "Bereken hoeveel spaargeld je als financiële buffer nodig hebt. Ontdek de ideale buffer voor noodsituaties.",
  keywords: ["financiële buffer", "spaargeld nodig", "noodfonds", "spaargeld calculator"],
  openGraph: {
    title: "Financiële Buffer Calculator",
    description: "Hoeveel spaargeld heb je nodig?",
    url: "https://quotapp.nl/tools/buffer-calculator",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/buffer-calculator",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Financiële Buffer Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Hoeveel spaargeld heb je nodig?",
  url: "https://quotapp.nl/tools/buffer-calculator",
};

export default function BufferCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <BufferCalculatorClient />
    </>
  );
}
