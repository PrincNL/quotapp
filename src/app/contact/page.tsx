import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description: "Neem contact op met QuotApp.nl voor vragen, feedback of verbetersuggesties.",
  alternates: {
    canonical: "https://quotapp.nl/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="section-shell p-8 md:p-10">
        <h1 className="text-4xl font-bold tracking-tight">Contact</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Heb je een fout gevonden, wil je een calculator voorstellen of heb je feedback over de site? Dan horen we
          dat graag. QuotApp.nl wordt stap voor stap verbeterd op basis van praktische feedback.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="card text-card-foreground">
            <h2 className="text-xl font-semibold">Waarvoor kun je contact opnemen?</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Fouten in berekeningen of teksten</li>
              <li>Suggesties voor nieuwe tools</li>
              <li>Verbeteringen voor gebruiksvriendelijkheid</li>
              <li>Zakelijke vragen of samenwerkingen</li>
            </ul>
          </div>

          <div className="card text-card-foreground">
            <h2 className="text-xl font-semibold">Belangrijke notitie</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              QuotApp.nl geeft geen persoonlijk financieel of juridisch advies. Voor besluiten met grote gevolgen raden
              we aan een specialist te raadplegen.
            </p>
            <div className="mt-4 text-sm">
              <Link href="/disclaimer" className="font-medium text-primary hover:underline">
                Lees ook onze disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
