import type { Metadata } from "next";
import { EfficiëntieHypotheekClient } from "./efficiëntie-hypotheek-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Efficiëntie Hypotheek Calculator | Extra Aflossing vs Beleggen",
  description: "Bereken of het voordeliger is om extra af te lossen op je hypotheek of te beleggen. Vergelijk rendementen en bespaar geld.",
  keywords: ["extra aflossing hypotheek", "beleggen vs aflossing", "hypotheek efficiëntie"],
  openGraph: {
    title: "Efficiëntie Hypotheek Calculator",
    description: "Extra aflossing of beleggen?",
    url: "https://quotapp.nl/tools/efficiëntie-hypotheek",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/efficiëntie-hypotheek",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Efficiëntie Hypotheek Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Vergelijk extra aflossing vs beleggen",
  url: "https://quotapp.nl/tools/efficiëntie-hypotheek",
};

export default function EfficientieHypotheekPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <EfficiëntieHypotheekClient />
    </>
  );
}
