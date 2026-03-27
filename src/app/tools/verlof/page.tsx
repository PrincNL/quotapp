import { Metadata } from "next";
import { VerlofCalculatorClient } from "./verlof-client";

export const metadata: Metadata = {
  title: "Verlof Calculator 2026 - Wettelijke Vakantiedagen Berekenen | QuotApp.nl",
  description: "Bereken hoeveel vakantiedagen je hebt en hoeveel je uitbetaald krijgt bij uitdiensttreding. Online verlof calculator voor werknemers.",
  keywords: ["verlof calculator", "vakantiedagen berekenen", "uitbetaald verlof", "wettelijke verlof", "ADV dagen"],
};

export default function VerlofPage() {
  return <VerlofCalculatorClient />;
}
