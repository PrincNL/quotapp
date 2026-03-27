import { Metadata } from "next";
import { ExtraAflossingCalculatorClient } from "./extra-aflossing-client";

export const metadata: Metadata = {
  title: "Extra Aflossing Calculator 2026 - Bespaar Rente | QuotApp.nl",
  description: "Bereken hoeveel je kunt besparen door extra af te lossen op je lening of hypotheek. Zie direct de rentevoordelen en kortere looptijd.",
  keywords: ["extra aflossing calculator", "lening aflossen", "hypotheek aflossen", "rente besparen", "sneller aflossen", "maandlasten verlagen"],
};

export default function ExtraAflossingCalculatorPage() {
  return <ExtraAflossingCalculatorClient />;
}
