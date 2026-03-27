import { Metadata } from "next";
import { MaximaleHuurprijsCalculatorClient } from "./maximale-huurprijs-client";

export const metadata: Metadata = {
  title: "Maximale Huurprijs Calculator 2026 - Huurprijscheck | QuotApp.nl",
  description: "Bereken de maximale toegestane huurprijs voor je woning op basis van het woningwaarderingsstelsel. Controleer of je huur eerlijk is.",
  keywords: ["maximale huurprijs", "huurprijscheck", "woningwaardering", "huurverhoging", "huurprijs berekenen", "WOZ woning", "huurbelasting"],
};

export default function MaximaleHuurprijsCalculatorPage() {
  return <MaximaleHuurprijsCalculatorClient />;
}
