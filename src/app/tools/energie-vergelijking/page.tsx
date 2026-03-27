import type { Metadata } from "next";
import { EnergieVergelijkingClient } from "./energie-vergelijking-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Energie Vergelijking Calculator | Gas vs Elektrisch vs Hybride 2025",
  description: "Vergelijk de kosten van gas, elektrisch en hybride verwarming. Bereken wat de goedkoopste optie is voor jouw situatie.",
  keywords: ["energie vergelijking", "gas vs elektrisch", "hybride verwarming", "energiekosten"],
  openGraph: {
    title: "Energie Vergelijking Calculator",
    description: "Vergelijk gas, elektrisch en hybride",
    url: "https://quotapp.nl/tools/energie-vergelijking",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/energie-vergelijking",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Energie Vergelijking Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Vergelijk gas, elektrisch en hybride verwarming",
  url: "https://quotapp.nl/tools/energie-vergelijking",
};

export default function EnergieVergelijkingPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <EnergieVergelijkingClient />
    </>
  );
}
