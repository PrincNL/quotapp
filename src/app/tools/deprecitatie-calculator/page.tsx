import { Metadata } from "next";
import { DepecitatieCalculatorClient } from "./deprecitatie-calculator-client";

export const metadata: Metadata = {
  title: "Afschrijving Calculator 2026 - Bereken Afschrijving Auto en Apparaten | QuotApp.nl",
  description: "Bereken de afschrijving van auto's, computers, telefoons en andere apparaten. Kies uit lineaire of degressieve afschrijvingsmethode.",
  keywords: ["afschrijving calculator", "afschrijving auto", "depreciatie berekenen", "boekwaarde", "lineaire afschrijving", "degressieve afschrijving", "activa"],
};

export default function DeprecitatieCalculatorPage() {
  return <DepecitatieCalculatorClient />;
}
