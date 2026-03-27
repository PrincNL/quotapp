import type { Metadata } from "next";
import { SpaardoelCalculatorClient } from "./spaardoel-calculator-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Spaardoel Calculator | Hoeveel Spare je voor je Doel?",
  description: "Bereken hoeveel je moet sparen om je spaardoel te bereiken. Stel een spaarplan op voor je financiële doel.",
  keywords: ["spaardoel calculator", "sparen berekenen", "spaarplan", "spaardoelen"],
  openGraph: {
    title: "Spaardoel Calculator",
    description: "Hoeveel moet je sparen voor je doel?",
    url: "https://quotapp.nl/tools/spaardoel-calculator",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/spaardoel-calculator",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Spaardoel Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Bereken hoeveel je moet sparen voor je doel",
  url: "https://quotapp.nl/tools/spaardoel-calculator",
};

export default function SpaardoelCalculatorPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <SpaardoelCalculatorClient />
    </>
  );
}
