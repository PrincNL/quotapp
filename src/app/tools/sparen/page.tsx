import { Metadata } from "next";
import { SparenCalculatorClient } from "./sparen-client";

export const metadata: Metadata = {
  title: "Sparen Calculator 2026 - Bereken Je Spaarrente | QuotApp.nl",
  description: "Bereken hoeveel spaargeld je opbouwt met rente-op-rente. Online sparen calculator met verschillende spaarrentes en looptijden. Ontdek je spaarpotentieel!",
  keywords: ["sparen calculator", "spaarrente berekenen", "rente op rente", "spaargeld berekenen", "spaardoel", "vermogen opbouwen"],
};

export default function SparenPage() {
  return <SparenCalculatorClient />;
}
