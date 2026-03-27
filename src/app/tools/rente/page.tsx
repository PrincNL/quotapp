import { Metadata } from "next";
import { RenteCalculatorClient } from "./rente-client";

export const metadata: Metadata = {
  title: "Rente Calculator 2026 - Bereken Rentevoet & Kosten | QuotApp.nl",
  description: "Bereken rentevoeten, rentekosten en rendement. Van kredietrente tot spaarrente. Alle renteberekeningen eenvoudig gemaakt.",
  keywords: ["rente calculator", "rente berekenen", "rentevoet", "kredietrente", "spaarrente", "rendement"],
};

export default function RentePage() {
  return <RenteCalculatorClient />;
}
