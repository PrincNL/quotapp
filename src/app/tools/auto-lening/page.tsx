import { Metadata } from "next";
import { AutoLeningCalculatorClient } from "./auto-lening-client";

export const metadata: Metadata = {
  title: "Auto Lening Calculator 2026 - Financiering Auto Berekenen | QuotApp.nl",
  description: "Bereken de maandlasten voor je autolening. Autofinanciering calculator voor nieuwe en tweedehands auto's. Vergelijk financieringsopties.",
  keywords: ["auto lening", "autofinanciering", "auto financieren", "lening auto", "autokrediet"],
};

export default function AutoLeningPage() {
  return <AutoLeningCalculatorClient />;
}
