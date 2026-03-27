import { Metadata } from "next";
import { InflatieCalculatorClient } from "./inflatie-calculator-client";

export const metadata: Metadata = {
  title: "Inflatie Calculator 2026 - Bereken Koopkrachtverlies | QuotApp.nl",
  description: "Bereken het effect van inflatie op je spaargeld en koopkracht. Ontdek hoeveel je geld over een paar jaar nog waard is.",
  keywords: ["inflatie calculator", "koopkracht berekenen", "geld waarde inflatie", "koopkrachtverlies", "prijsstijging", "besteedbaar inkomen"],
};

export default function InflatieCalculatorPage() {
  return <InflatieCalculatorClient />;
}
