import { Metadata } from "next";
import { AftrekpostenCalculatorClient } from "./aftrekposten-client";

export const metadata: Metadata = {
  title: "Aftrekposten Calculator 2026 - Belasting Aftrekken | QuotApp.nl",
  description: "Bereken welke aftrekposten je kunt opgeven bij je belastingaangifte. Van hypotheekrente tot giften.",
  keywords: ["aftrekposten calculator", "belasting aftrekken", "inkomstenbelasting", "hypotheekrente aftrekken", "giften aftrekken"],
};

export default function AftrekpostenPage() {
  return <AftrekpostenCalculatorClient />;
}
