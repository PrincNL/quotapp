import type { Metadata } from "next";
import { VerzekeringenVergelijkenClient } from "./verzekeringen-vergelijken-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Verzekeringen Vergelijken | Zorg, Auto & Inboedel Calculator",
  description: "Vergelijk je verzekeringen en bereken of je voldoende verzekerd bent. Zorgverzekering, autoverzekering en inboedelverzekering vergelijken.",
  keywords: ["verzekeringen vergelijken", "zorgverzekering", "autoverzekering", "inboedelverzekering"],
  openGraph: {
    title: "Verzekeringen Vergelijken",
    description: "Vergelijk zorg, auto en inboedel verzekeringen",
    url: "https://quotapp.nl/tools/verzekeringen-vergelijken",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/verzekeringen-vergelijken",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Verzekeringen Vergelijken",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Vergelijk verzekeringen",
  url: "https://quotapp.nl/tools/verzekeringen-vergelijken",
};

export default function VerzekeringenVergelijkenPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <VerzekeringenVergelijkenClient />
    </>
  );
}
