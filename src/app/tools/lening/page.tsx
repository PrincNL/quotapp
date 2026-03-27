import { Metadata } from "next";
import { LeningCalculatorClient } from "./lening-client";

export const metadata: Metadata = {
  title: "Lening Calculator 2026 - Bereken Maandlasten | QuotApp.nl",
  description: "Bereken eenvoudig je maandelijkse leninglasten. Online lening calculator voor persoonlijke leningen, autofinanciering en meer. 100% gratis!",
  keywords: ["lening calculator", "lening berekenen", "maandlasten lening", "persoonlijke lening", "autofinanciering", "lening simulatie"],
};

export default function LeningPage() {
  return <LeningCalculatorClient />;
}
