import { Metadata } from "next";
import { AlimentatieCalculatorClient } from "./alimentatie-client";

export const metadata: Metadata = {
  title: "Alimentatie Calculator 2026 - Bereken Partner- en Kinderalimentatie | QuotApp.nl",
  description: "Bereken indicatief de partneralimentatie en kinderalimentatie. Online tool gebaseerd op Rechtspraak richtlijnen.",
  keywords: ["alimentatie calculator", "partneralimentatie", "kinderalimentatie", "alimentatie berekenen", "echtscheiding"],
};

export default function AlimentatiePage() {
  return <AlimentatieCalculatorClient />;
}
