import Link from "next/link";
import type { Metadata } from "next";
import { CheckCircle2, ShieldCheck, FileText, Calculator } from "lucide-react";

export const metadata: Metadata = {
  title: "Over QuotApp.nl",
  description:
    "Lees wie achter QuotApp.nl zit, hoe de calculators worden opgebouwd en hoe wij kwaliteit, privacy en transparantie borgen.",
  alternates: {
    canonical: "https://quotapp.nl/over-ons",
  },
};

const principles = [
  "Heldere Nederlandse uitleg, niet alleen een kale calculator.",
  "Berekeningen draaien direct in de browser waar mogelijk.",
  "Regelmatige updates bij veranderende percentages, richtlijnen en praktijkregels.",
  "Transparantie over aannames, beperkingen en vervolgstappen.",
];

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="section-shell p-8 md:p-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          <Calculator className="h-4 w-4" /> Over QuotApp.nl
        </span>

        <h1 className="mt-5 text-4xl font-bold tracking-tight">Waarom QuotApp.nl bestaat</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          QuotApp.nl is gebouwd om Nederlandse rekentools bruikbaar, duidelijk en snel te maken. Niet als
          lege advertentiepagina, maar als praktische plek waar je een berekening kunt maken én meteen snapt
          wat de uitkomst betekent.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="card text-card-foreground">
            <div className="mb-3 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold">Onze uitgangspunten</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {principles.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card text-card-foreground">
            <div className="mb-3 inline-flex rounded-xl bg-green-500/10 p-3 text-green-600 dark:text-green-400">
              <FileText className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold">Waar wij op letten</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We combineren calculatorlogica met extra context, zoals uitleg, voorbeelden, vervolgstappen en
              relevante waarschuwingen. Voor onderwerpen zoals belasting, salaris, hypotheek of alimentatie
              blijft professioneel advies belangrijk bij definitieve beslissingen.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Zie QuotApp.nl als snelle en praktische eerste stap, niet als vervanging van maatwerkadvies van
              een accountant, financieel adviseur, jurist of hypotheekverstrekker.
            </p>
          </div>
        </div>

        <div className="mt-8 card text-card-foreground">
          <h2 className="text-xl font-semibold">Belangrijke pagina&apos;s</h2>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link href="/tools" className="rounded-full border border-border px-4 py-2 hover:bg-secondary">
              Alle tools
            </Link>
            <Link href="/privacy" className="rounded-full border border-border px-4 py-2 hover:bg-secondary">
              Privacybeleid
            </Link>
            <Link href="/disclaimer" className="rounded-full border border-border px-4 py-2 hover:bg-secondary">
              Disclaimer
            </Link>
            <Link href="/contact" className="rounded-full border border-border px-4 py-2 hover:bg-secondary">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
