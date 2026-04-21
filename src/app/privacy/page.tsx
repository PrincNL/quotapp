import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description: "Lees hoe QuotApp.nl omgaat met privacy, cookies, statistieken en advertentieweergave.",
  alternates: {
    canonical: "https://quotapp.nl/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="section-shell p-8 md:p-10">
        <h1 className="text-4xl font-bold tracking-tight">Privacybeleid</h1>
        <div className="prose prose-lg mt-6 max-w-none text-muted-foreground">
          <p>
            QuotApp.nl is ontworpen om zo min mogelijk persoonsgegevens te verwerken. Veel berekeningen draaien
            direct in je browser en vereisen geen account.
          </p>
          <h2>Wat we wel verwerken</h2>
          <ul>
            <li>anonieme gebruiksstatistieken om te zien welke tools populair zijn;</li>
            <li>technische gegevens die nodig zijn om de site veilig en stabiel te houden;</li>
            <li>cookie- en advertentie-informatie als advertenties actief zijn.</li>
          </ul>
          <h2>Wat we niet doen</h2>
          <ul>
            <li>geen verplichte accountregistratie voor calculators;</li>
            <li>geen verkoop van persoonlijke gegevens;</li>
            <li>geen opslag van berekeningen als dat niet nodig is voor de werking.</li>
          </ul>
          <h2>Cookies en advertenties</h2>
          <p>
            QuotApp.nl kan cookies of vergelijkbare technieken gebruiken voor statistiek, advertentieweergave en
            basisfunctionaliteit. Externe advertentiepartners kunnen eigen cookies plaatsen volgens hun eigen beleid.
          </p>
          <h2>Vragen</h2>
          <p>
            Heb je vragen over privacy of gegevensgebruik, neem dan contact op via de contactpagina.
          </p>
        </div>
      </div>
    </div>
  );
}
