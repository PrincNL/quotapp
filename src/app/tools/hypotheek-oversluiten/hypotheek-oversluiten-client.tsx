"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, Euro, Calendar, ArrowRight, RotateCcw, 
  Info, Home, TrendingDown, DollarSign, PiggyBank, Clock, CheckCircle2
} from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";
import { ShareResult } from "@/components/share-result";
import { InlineAd, StickyAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import Link from "next/link";

interface OversluitResultaat {
  huidigeMaandlasten: number;
  nieuweMaandlasten: number;
  maandelijkseBesparing: number;
  totaleBesparing: number;
  oversluitKosten: number;
  nettoVoordeel: number;
  terugVerdientijd: number;
  breakEvenMaanden: number;
}

const oversluitenFAQ = [
  {
    question: "Wanneer is hypotheek oversluiten voordelig?",
    answer: "Hypotheek oversluiten is voordelig wanneer de huidige rente een stuk hoger is dan de marktrente. Vuistregel: als je huidige rente meer dan 1% hoger is dan de actuele rente, kan oversluiten de moeite waard zijn. Houd ook rekening met de oversluitkosten (circa 1-2% van de hypotheek).",
  },
  {
    question: "Wat kost hypotheek oversluiten?",
    answer: "De kosten voor oversluiten bestaan uit: advies- en bemiddelingskosten (€1.500-€3.000), taxatiekosten (€300-€600), notariskosten (€500-€1.000), en eventuele boeterente voor je huidige hypotheek. In totaal kun je rekenen op €5.000-€15.000 aan kosten, afhankelijk van je hypotheekbedrag.",
  },
  {
    question: "Wat is boeterente bij hypotheek oversluiten?",
    answer: "Als je je hypotheek tussentijds aflost tijdens de rentevastperiode, kan je bank een boete in rekening brengen. Deze boete compenseert de bank voor het renteverlies. De boete wordt berekend op basis van het verschil tussen je contractrente en de actuele marktrente, vermenigvuldigd met de resterende rentevastperiode.",
  },
  {
    question: "Kan ik zonder boete mijn hypotheek oversluiten?",
    answer: "Ja, in sommige gevallen kun je boetevrij oversluiten: 1) Bij einde rentevastperiode, 2) Bijgedeeltelijke aflossing (vaak tot 10% per jaar), 3) Bij verkoop van je woning, 4) Bij echtscheiding. Check je hypotheekakte voor de exacte voorwaarden.",
  },
  {
    question: "Hoe lang duurt het om een hypotheek over te sluiten?",
    answer: "Het oversluiten van een hypotheek duurt gemiddeld 4 tot 8 weken. Dit omvat de aanvraag, acceptatie, taxatie, notariële overdracht en registratie. Bij sommige geldverstrekkers kan dit sneller, bij complexere situaties kan het langer duren.",
  },
  {
    question: "Moet ik naar de notaris bij hypotheek oversluiten?",
    answer: "Ja, bij het oversluiten van een hypotheek is altijd een notariële akte nodig. De notaris zorgt voor de overschrijving van de hypotheek in het Kadaster. De kosten hiervoor zijn onderdeel van de totale oversluitkosten.",
  },
  {
    question: "Kan ik oversluiten als ik al een deel heb afgelost?",
    answer: "Ja, je kunt je hypotheek oversluiten ongeacht hoeveel je al hebt afgelost. De eventuele boeterente wordt berekend over het resterende hypotheekbedrag. Bij volledig afgeloste hypotheken is er uiteraard geen sprake van boeterente.",
  },
  {
    question: "Is hypotheek oversluiten belastingaftrekbaar?",
    answer: "De kosten voor hypotheek oversluiten (advies, bemiddeling, notariskosten) waren tot 2024 fiscaal aftrekbaar. Vanaf 2024 is deze aftrekpost vervallen voor nieuwe gevallen. Alleen hypotheekrente blijft aftrekbaar, niet de bijkomende kosten.",
  },
];

export function HypotheekOversluitenClient() {
  const [huidigeHypotheek, setHuidigeHypotheek] = useState("300000");
  const [huidigeRente, setHuidigeRente] = useState("3.5");
  const [nieuweRente, setNieuweRente] = useState("2.8");
  const [restantJaren, setRestantJaren] = useState("25");
  const [boeteRente, setBoeteRente] = useState("0");
  const [resultaat, setResultaat] = useState<OversluitResultaat | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const bereken = useCallback(() => {
    const hypotheekNum = parseFloat(huidigeHypotheek.replace(",", ".")) || 0;
    const huidigeRenteNum = parseFloat(huidigeRente) / 100;
    const nieuweRenteNum = parseFloat(nieuweRente) / 100;
    const jarenNum = parseInt(restantJaren) || 25;
    const boeteNum = parseFloat(boeteRente.replace(",", ".")) || 0;

    if (hypotheekNum <= 0) {
      setResultaat(null);
      return;
    }

    setIsCalculating(true);

    // Maandelijkse lasten huidige hypotheek
    const maandRenteHuidig = huidigeRenteNum / 12;
    const maanden = jarenNum * 12;
    const huidigeMaandlasten = hypotheekNum * (maandRenteHuidig * Math.pow(1 + maandRenteHuidig, maanden)) /
                                (Math.pow(1 + maandRenteHuidig, maanden) - 1);

    // Maandelijkse lasten nieuwe hypotheek
    const maandRenteNieuw = nieuweRenteNum / 12;
    const nieuweMaandlasten = hypotheekNum * (maandRenteNieuw * Math.pow(1 + maandRenteNieuw, maanden)) /
                              (Math.pow(1 + maandRenteNieuw, maanden) - 1);

    // Besparingen
    const maandelijkseBesparing = huidigeMaandlasten - nieuweMaandlasten;
    const totaleBesparing = maandelijkseBesparing * maanden;

    // Oversluitkosten (schatting 1% + boete)
    const oversluitKosten = (hypotheekNum * 0.01) + boeteNum;
    
    // Netto voordeel
    const nettoVoordeel = totaleBesparing - oversluitKosten;

    // Terugverdientijd
    const terugVerdientijd = oversluitKosten > 0 && maandelijkseBesparing > 0 
      ? oversluitKosten / maandelijkseBesparing 
      : 0;
    
    const breakEvenMaanden = Math.ceil(terugVerdientijd);

    setResultaat({
      huidigeMaandlasten: Math.round(huidigeMaandlasten * 100) / 100,
      nieuweMaandlasten: Math.round(nieuweMaandlasten * 100) / 100,
      maandelijkseBesparing: Math.round(maandelijkseBesparing * 100) / 100,
      totaleBesparing: Math.round(totaleBesparing * 100) / 100,
      oversluitKosten: Math.round(oversluitKosten * 100) / 100,
      nettoVoordeel: Math.round(nettoVoordeel * 100) / 100,
      terugVerdientijd: Math.round(terugVerdientijd * 10) / 10,
      breakEvenMaanden,
    });

    setTimeout(() => setIsCalculating(false), 150);
  }, [huidigeHypotheek, huidigeRente, nieuweRente, restantJaren, boeteRente]);

  useEffect(() => {
    const timer = setTimeout(bereken, 300);
    return () => clearTimeout(timer);
  }, [bereken]);

  const reset = () => {
    setHuidigeHypotheek("300000");
    setHuidigeRente("3.5");
    setNieuweRente("2.8");
    setRestantJaren("25");
    setBoeteRente("0");
    setResultaat(null);
  };

  const formatBedrag = (value: number) => {
    return value.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const resultText = resultaat
    ? `Hypotheek: €${huidigeHypotheek} | Huidige rente: ${huidigeRente}% | Nieuwe rente: ${nieuweRente}% | Maandelijkse besparing: €${formatBedrag(resultaat.maandelijkseBesparing)} | Totale besparing: €${formatBedrag(resultaat.nettoVoordeel)}`
    : "";

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid lg:grid-cols-[1fr,300px] gap-8">
        <div>
          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg">
                <Home className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="Hypotheek Oversluiten" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Hypotheek Oversluiten Calculator
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bereken of oversluiten van je hypotheek voordelig is. 
              Ontdek de maandelijkse besparing en terugverdientijd.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Input Section */}
            <div className="card space-y-6">
              <h2 className="text-lg font-bold">Huidige Hypotheek</h2>
              
              {/* Huidige Hypotheek */}
              <div>
                <label htmlFor="huidigeHypotheek" className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    Huidige Hypotheekschuld (€)
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">€</span>
                  <input
                    id="huidigeHypotheek"
                    type="text"
                    inputMode="decimal"
                    value={huidigeHypotheek}
                    onChange={(e) => setHuidigeHypotheek(e.target.value.replace(/[^0-9.,]/g, ""))}
                    placeholder="300.000"
                    className="w-full pl-10 pr-4 py-4 text-lg input"
                  />
                </div>
              </div>

              {/* Huidige Rente */}
              <div>
                <label htmlFor="huidigeRente" className="block text-sm font-medium mb-2">
                  Huidige Rentevaste Periode (%)
                </label>
                <input
                  id="huidigeRente"
                  type="number"
                  step="0.1"
                  value={huidigeRente}
                  onChange={(e) => setHuidigeRente(e.target.value)}
                  className="w-full px-4 py-4 text-lg input"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  De rente die je nu betaalt op je hypotheek
                </p>
              </div>

              <hr className="border-border" />

              <h2 className="text-lg font-bold">Nieuwe Hypotheek</h2>

              {/* Nieuwe Rente */}
              <div>
                <label htmlFor="nieuweRente" className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    Nieuwe Rente (%)
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </span>
                </label>
                <input
                  id="nieuweRente"
                  type="number"
                  step="0.1"
                  value={nieuweRente}
                  onChange={(e) => setNieuweRente(e.target.value)}
                  className="w-full px-4 py-4 text-lg input"
                />
                <div className="flex gap-2 mt-2">
                  {["2.3", "2.6", "2.9", "3.2", "3.5"].map((r) => (
                    <button
                      key={r}
                      onClick={() => setNieuweRente(r)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        nieuweRente === r ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      {r}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Restant Jaren */}
              <div>
                <label htmlFor="restantJaren" className="block text-sm font-medium mb-2">
                  Resterende Looptijd (jaren)
                </label>
                <input
                  id="restantJaren"
                  type="number"
                  value={restantJaren}
                  onChange={(e) => setRestantJaren(e.target.value)}
                  className="w-full px-4 py-4 text-lg input"
                />
                <div className="flex gap-2 mt-2">
                  {["10", "15", "20", "25", "30"].map((j) => (
                    <button
                      key={j}
                      onClick={() => setRestantJaren(j)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        restantJaren === j ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      {j}j
                    </button>
                  ))}
                </div>
              </div>

              {/* Boeterente */}
              <div>
                <label htmlFor="boeteRente" className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    Verwachte Boeterente (€)
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">€</span>
                  <input
                    id="boeteRente"
                    type="text"
                    inputMode="decimal"
                    value={boeteRente}
                    onChange={(e) => setBoeteRente(e.target.value.replace(/[^0-9.,]/g, ""))}
                    placeholder="0"
                    className="w-full pl-10 pr-4 py-4 text-lg input"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Laat 0 als je aan het einde van je rentevastperiode zit
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
                
                {resultaat && (
                  <ShareResult 
                    toolName="Hypotheek Oversluiten Calculator" 
                    result={resultText}
                    url="/tools/hypotheek-oversluiten"
                  />
                )}
              </div>
            </div>

            {/* Results */}
            <div className="card space-y-6">
              <h2 className="text-lg font-bold">Resultaat</h2>
              
              <AnimatePresence mode="wait">
                {resultaat ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-4"
                  >
                    {/* Maandelijkse Besparing */}
                    <motion.div 
                      className="p-6 bg-green-500/10 border-2 border-green-500/30 rounded-xl"
                      animate={isCalculating ? { scale: [1, 1.02, 1] } : {}}
                    >
                      <p className="text-sm text-muted-foreground mb-1">Maandelijkse Besparing</p>
                      <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                        € {formatBedrag(resultaat.maandelijkseBesparing)}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="text-muted-foreground">
                          Van €{formatBedrag(resultaat.huidigeMaandlasten)}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                        <span className="font-medium">
                          €{formatBedrag(resultaat.nieuweMaandlasten)}
                        </span>
                      </div>
                    </motion.div>

                    {/* Kosten en Voordeel */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 bg-muted rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">Oversluitkosten</p>
                        </div>
                        <p className="text-xl font-bold">€ {formatBedrag(resultaat.oversluitKosten)}</p>
                      </div>
                      <div className="p-4 bg-muted rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">Terugverdientijd</p>
                        </div>
                        <p className="text-xl font-bold">{resultaat.breakEvenMaanden} mnd</p>
                      </div>
                    </div>

                    {/* Totale Besparing */}
                    <div className="p-5 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                      <div className="flex items-start gap-3">
                        <TrendingDown className="w-6 h-6 text-purple-600 mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Netto Voordeel (na kosten)</p>
                          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                            € {formatBedrag(resultaat.nettoVoordeel)}
                          </p>
                          <p className="text-sm text-purple-600 dark:text-purple-400">
                            over {restantJaren} jaar
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Advies */}
                    <div className={`flex items-start gap-3 p-4 rounded-xl ${
                      resultaat.nettoVoordeel > 0 
                        ? "bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800"
                        : "bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800"
                    }`}>
                      {resultaat.nettoVoordeel > 0 ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-green-800 dark:text-green-200">Oversluiten is voordelig!</p>
                            <p className="text-sm text-green-700 dark:text-green-300">
                              Na {resultaat.breakEvenMaanden} maanden verdien je de kosten terug en begin je te besparen.
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <Info className="w-5 h-5 text-red-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-red-800 dark:text-red-200">Niet voordelig</p>
                            <p className="text-sm text-red-700 dark:text-red-300">
                              De besparing compenseert de kosten niet binnen de looptijd.
                            </p>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Details */}
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-muted-foreground">Details</p>
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Totale besparing (bruto)</span>
                        <span className="font-medium">€ {formatBedrag(resultaat.totaleBesparing)}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Renteverschil</span>
                        <span className="font-medium">
                          {parseFloat(huidigeRente) - parseFloat(nieuweRente)}%
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-muted-foreground py-12"
                  >
                    <Home className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Vul je gegevens in om te berekenen</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Ad */}
          <InlineAd slot={AD_SLOTS.toolInline} />

          {/* SEO Content */}
          <div className="mt-12 card">
            <h2 className="text-xl font-bold mb-4">Alles over Hypotheek Oversluiten</h2>
            <div className="prose prose-sm text-muted-foreground max-w-none space-y-4">
              <p>
                <strong>Hypotheek oversluiten</strong> is het proces waarbij je je huidige hypotheek aflost en 
                een nieuwe hypotheek afsluit, meestal bij een andere geldverstrekker. Dit kan voordelig zijn 
                wanneer de rentestanden zijn gedaald sinds je vorige hypotheekperiode. Door over te sluiten 
                kun je profiteeren van lagere maandelijkse lasten.
              </p>
              <p>
                De afgelopen jaren hebben veel huizenbezitters hun hypotheek overgesloten vanwege de historisch 
                lage rentestanden. Maar ook in 2026 kan oversluiten nog steeds aantrekkelijk zijn. De huidige 
                hypotheekrentes liggen rond de 2,5% tot 3,5% voor 10 jaar rentevast, wat voor veel mensen 
                nog steeds voordelig is ten opzichte van oude contracten.
              </p>
              <p>
                Voordat je besluit om je hypotheek over te sluiten, is het belangrijk om de <strong>kosten 
                van oversluiten</strong> te berekenen. Deze kosten bestaan uit advies- en bemiddelingskosten 
                (vaak €1.500 tot €3.000), taxatiekosten (€300 tot €600), notariskosten (€500 tot €1.000), 
                en eventueel een boeterente als je binnen de rentevastperiode zit.
              </p>
              <p>
                De <strong>boeterente</strong> is een vergoeding die je aan je huidige hypotheekverstrekker 
                betaalt als je tussentijds je hypotheek beëindigt. Deze boete compenseert de bank voor het 
                renteverlies dat zij maken omdat ze jouw geld nu tegen een lagere rente moeten uitlenen. 
                Gelukkig kun je vaak boetevrij oversluiten aan het einde van je rentevastperiode.
              </p>
              <p>
                Onze <strong>hypotheek oversluiten calculator</strong> helpt je om snel te bepalen of 
                oversluiten financieel voordelig is voor jouw situatie. Vul de gegevens van je huidige 
                hypotheek in, de nieuwe rente die je kunt krijgen, en zie direct je maandelijkse besparing 
                en terugverdientijd.
              </p>
              <p>
                De <strong>terugverdientijd</strong> is de periode die nodig is om de oversluitkosten terug 
                te verdienen via de lagere maandlasten. Als deze periode korter is dan de resterende looptijd 
                van je hypotheek, is oversluiten over het algemeen de moeite waard. Een vuistregel is dat 
                oversluiten interessant wordt bij een renteverschil van minimaal 0,5% tot 1%.
              </p>
              <p>
                Bij het oversluiten van je hypotheek zijn er verschillende zaken om rekening mee te houden. 
                Zo kun je te maken krijgen met <strong>hypotheekadvies</strong>, waarbij een adviseur 
                naar je volledige financiële situatie kijkt. Ook zal er een nieuwe <strong>taxatie</strong> 
                van je woning nodig zijn om de actuele marktwaarde te bepalen.
              </p>
              <p>
                Let op: niet iedereen kan zomaar oversluiten. Geldverstrekkers kijken naar je inkomen, 
                je <strong>BKR-registratie</strong>, en de verhouding tussen je hypotheek en de woningwaarde 
                (de Loan-to-Value ratio). Als je inkomen is gedaald of je schulden hebt opgebouwd, kan 
                oversluiten lastiger zijn.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <FAQSection items={oversluitenFAQ} title="Veelgestelde vragen over hypotheek oversluiten" />

          {/* Related Tools */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Gerelateerde Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/tools/hypotheek" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Hypotheek</p>
              </Link>
              <Link href="/tools/annuiteitenhypotheek" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Annuïteit</p>
              </Link>
              <Link href="/tools/lineaire-hypotheek" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Lineair</p>
              </Link>
              <Link href="/tools/lening" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Lening</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <StickyAd slot={AD_SLOTS.toolSidebar} />
      </div>
    </div>
  );
}
