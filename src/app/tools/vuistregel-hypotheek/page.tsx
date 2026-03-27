import type { Metadata } from "next";
import { VuistregelHypotheekClient } from "./vuistregel-hypotheek-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Vuistregel Hypotheek Calculator | Snelle Hypotheekcheck 2025",
  description: "Snelle vuistregels om te bepalen wat je kunt lenen. Bereken in seconden je hypotheek indicatie met vuistregels.",
  keywords: ["vuistregel hypotheek", "hypotheek berekenen", "hoeveel hypotheek", "snelle check"],
  openGraph: {
    title: "Vuistregel Hypotheek Calculator",
    description: "Snelle hypotheekcheck met vuistregels",
    url: "https://quotapp.nl/tools/vuistregel-hypotheek",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/vuistregel-hypotheek",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Vuistregel Hypotheek Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Snelle hypotheekcheck met vuistregels",
  url: "https://quotapp.nl/tools/vuistregel-hypotheek",
};

export default function VuistregelHypotheekPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <VuistregelHypotheekClient />
    </>
  );
}
