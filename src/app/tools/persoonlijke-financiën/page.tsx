import type { Metadata } from "next";
import { PersoonlijkeFinancienClient } from "./persoonlijke-financiën-client";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Persoonlijk Financiën Dashboard | Overzicht Inkomsten & Uitgaven",
  description: "Houd overzicht van je inkomsten en uitgaven. Gratis financieel dashboard voor persoonlijk budgetbeheer in Nederland.",
  keywords: ["persoonlijke financiën", "budget beheer", "inkomsten uitgaven", "financieel overzicht"],
  openGraph: {
    title: "Persoonlijk Financiën Dashboard",
    description: "Overzicht inkomsten en uitgaven",
    url: "https://quotapp.nl/tools/persoonlijke-financiën",
  },
  alternates: {
    canonical: "https://quotapp.nl/tools/persoonlijke-financiën",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Persoonlijk Financiën Dashboard",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: "Overzicht inkomsten en uitgaven",
  url: "https://quotapp.nl/tools/persoonlijke-financiën",
};

export default function PersoonlijkeFinancienPage() {
  return (
    <>
      <JsonLd data={softwareSchema} />
      <PersoonlijkeFinancienClient />
    </>
  );
}
