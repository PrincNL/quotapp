import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Lees de disclaimer van QuotApp.nl over berekeningen, aannames en verantwoordelijkheid.",
  alternates: {
    canonical: "https://quotapp.nl/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="section-shell p-8 md:p-10">
        <h1 className="text-4xl font-bold tracking-tight">Disclaimer</h1>
        <div className="prose prose-lg mt-6 max-w-none text-muted-foreground">
          <p>
            De informatie en berekeningen op QuotApp.nl zijn bedoeld als algemene hulp en indicatie. We doen ons
            best om de tools actueel en zorgvuldig te houden, maar uitkomsten kunnen afwijken van officiële of
            persoonlijke berekeningen.
          </p>
          <h2>Geen persoonlijk advies</h2>
          <p>
            QuotApp.nl geeft geen persoonlijk financieel, fiscaal, juridisch of hypotheekadvies. Gebruik de site als
            eerste hulpmiddel en controleer belangrijke beslissingen altijd bij een professional.
          </p>
          <h2>Aannames en vereenvoudigingen</h2>
          <p>
            Sommige calculators werken met aannames, afgeronde percentages of vereenvoudigde scenario&apos;s. Daardoor
            kunnen echte uitkomsten anders zijn, bijvoorbeeld door persoonlijke situatie, aanvullende voorwaarden of
            wetswijzigingen.
          </p>
          <h2>Eigen verantwoordelijkheid</h2>
          <p>
            Door QuotApp.nl te gebruiken erken je dat je zelf verantwoordelijk blijft voor keuzes die je maakt op basis
            van de getoonde informatie en berekeningen.
          </p>
        </div>
      </div>
    </div>
  );
}
