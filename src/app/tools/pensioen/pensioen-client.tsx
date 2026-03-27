"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, Euro, Calendar, ArrowRight, RotateCcw, 
  Info, TrendingUp, Clock, PieChart, AlertCircle, Users
} from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";
import { ShareResult } from "@/components/share-result";
import { InlineAd, StickyAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import Link from "next/link";

interface PensioenResultaat {
  huidigPensioen: number;
  verwachtAanvullendPensioen: number;
  totaalPensioenMaand: number;
  totaalPensioenJaar: number;
  aowMaand: number;
  doelPensioen: number;
  verschil: number;
  pensioenOpbouwJaar: number;
  factorVerdubbeling: number;
}

const pensioenFAQ = [
  {
    question: "Hoeveel AOW krijg ik?",
    answer: "De AOW (Algemene Ouderdomswet) is de basispensioenuitkering van de overheid. In 2026 bedraagt de AOW voor alleenstaanden ongeveer €1.700 bruto per maand, en voor gehuwden/samenwonenden ongeveer €1.200 per persoon. De exacte bedragen worden jaarlijks geïndexeerd.",
  },
  {
    question: "Wat is het verschil tussen AOW en aanvullend pensioen?",
    answer: "De AOW is een basispensioen van de overheid dat iedereen opbouwt die in Nederland woont of werkt. Het aanvullend pensioen is wat je via je werkgever opbouwt bij een pensioenfonds of verzekeraar. Samen vormen ze je totale pensioeninkomen.",
  },
  {
    question: "Hoe bouw ik pensioen op?",
    answer: "Je bouwt pensioen op via je werkgever, meestal via een pensioenfonds of verzekeraar. Elke maand wordt een deel van je salaris gestort in een pensioenregeling. Je bouwt recht op pensioen op voor elke gewerkte maand (dienstjaren).",
  },
  {
    question: "Wanneer ga ik met pensioen?",
    answer: "De AOW-leeftijd is in 2026 gestegen naar 67 jaar en 3 maanden. Je kunt vaak wel eerder stoppen met werken door gebruik te maken van prepensioenregelingen of door je pensioen eerder in te laten gaan (met korting). Je kunt ook uitgesteld met pensioen gaan voor een hoger pensioen.",
  },
  {
    question: "Hoeveel pensioen heb ik nodig?",
    answer: "Een vuistregel is dat je ongeveer 70% van je laatste salaris nodig hebt om je levensstandaard te behouden. Dit is inclusief AOW en aanvullend pensioen. Sommigen hebben minder nodig (geen hypotheek meer), anderen meer ( dure hobby's, reizen).",
  },
  {
    question: "Wat is een pensioengat?",
    answer: "Een pensioengat ontstaat wanneer je verwachte pensioeninkomen lager is dan wat je nodig hebt. Dit kan komen door: career breaks, zzp-werk, werkloosheid, of onvoldoende pensioenopbouw. Je kunt een pensioengat dichten door extra te sparen, later met pensioen te gaan, of minder uit te geven.",
  },
  {
    question: "Kan ik mijn pensioen meenemen naar een nieuwe werkgever?",
    answer: "Ja, sinds 2018 is het meeneembaar pensioen verplicht. Wanneer je van baan verandert, kun je je opgebouwde pensioen meenemen naar de nieuwe pensioenuitvoerder (waardeoverdracht). Dit voorkomt dat je kleine pensioentjes achterlaat bij verschillende fondsen.",
  },
  {
    question: "Wat gebeurt er met mijn pensioen als ik overlijd?",
    answer: "Bij overlijden kan je partner een nabestaandenpensioen ontvangen. Dit is vaak 70% van het opgebouwde pensioen. Daarnaast kan er een uitkering zijn voor wezen. Controleer je pensioenregeling voor de exacte voorwaarden.",
  },
];

export function PensioenCalculatorClient() {
  const [huidigeLeeftijd, setHuidigeLeeftijd] = useState("35");
  const [pensioenLeeftijd, setPensioenLeeftijd] = useState("67");
  const [huidigJaarinkomen, setHuidigJaarinkomen] = useState("55000");
  const [opgebouwdPensioen, setOpgebouwdPensioen] = useState("50000");
  const [maandelijkseInleg, setMaandelijkseInleg] = useState("200");
  const [rendement, setRendement] = useState("5");
  const [resultaat, setResultaat] = useState<PensioenResultaat | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const bereken = useCallback(() => {
    const leeftijdNum = parseInt(huidigeLeeftijd) || 35;
    const pensioenLeeftijdNum = parseInt(pensioenLeeftijd) || 67;
    const inkomenNum = parseFloat(huidigJaarinkomen.replace(",", ".")) || 55000;
    const opgebouwdNum = parseFloat(opgebouwdPensioen.replace(",", ".")) || 50000;
    const inlegNum = parseFloat(maandelijkseInleg.replace(",", ".")) || 200;
    const rendementNum = parseFloat(rendement) / 100;

    if (inkomenNum <= 0) {
      setResultaat(null);
      return;
    }

    setIsCalculating(true);

    const jarenTotPensioen = pensioenLeeftijdNum - leeftijdNum;
    const maandenTotPensioen = jarenTotPensioen * 12;

    // AOW (2026 schatting)
    const aowMaand = 1400; // Gemiddeld AOW per persoon
    const aowJaar = aowMaand * 12;

    // Bereken pensioenopbouw vanuit huidig werk
    // Gemiddeld pensioenopbouw is 1,75% per jaar vanuit werkgever
    const pensioenOpbouwJaar = inkomenNum * 0.0175;
    const verwachtePensioenVanWerk = (opgebouwdNum * 0.7) + (pensioenOpbouwJaar * jarenTotPensioen);

    // Bereken extra pensioen via maandelijkse inleg (beleggen)
    let extraPensioen = 0;
    for (let i = 0; i < maandenTotPensioen; i++) {
      extraPensioen += inlegNum * Math.pow(1 + rendementNum / 12, maandenTotPensioen - i);
    }

    // Omzetten naar eeuwigdurende uitkering (annuïteit)
    // Met 4% withdraw rate, €100.000 geeft €4.000/jaar
    const withdrawRate = 0.04;
    const extraPensioenJaar = extraPensioen * withdrawRate;

    // Totaal pensioen
    const totaalPensioenJaar = aowJaar + verwachtePensioenVanWerk * 0.6 + extraPensioenJaar;
    const totaalPensioenMaand = totaalPensioenJaar / 12;

    // Doelpensioen (70% van inkomen)
    const doelPensioen = inkomenNum * 0.70;
    const verschil = doelPensioen - totaalPensioenJaar;

    // Factor verdubbeling
    const factorVerdubbeling = (1 + rendementNum) * jarenTotPensioen;

    setResultaat({
      huidigPensioen: Math.round(verwachtePensioenVanWerk * 0.6 / 12),
      verwachtAanvullendPensioen: Math.round(extraPensioenJaar / 12),
      totaalPensioenMaand: Math.round(totaalPensioenMaand),
      totaalPensioenJaar: Math.round(totaalPensioenJaar),
      aowMaand: Math.round(aowMaand),
      doelPensioen: Math.round(doelPensioen),
      verschil: Math.round(verschil),
      pensioenOpbouwJaar: Math.round(pensioenOpbouwJaar),
      factorVerdubbeling: Math.round(factorVerdubbeling * 100) / 100,
    });

    setTimeout(() => setIsCalculating(false), 150);
  }, [huidigeLeeftijd, pensioenLeeftijd, huidigJaarinkomen, opgebouwdPensioen, maandelijkseInleg, rendement]);

  useEffect(() => {
    const timer = setTimeout(bereken, 300);
    return () => clearTimeout(timer);
  }, [bereken]);

  const reset = () => {
    setHuidigeLeeftijd("35");
    setPensioenLeeftijd("67");
    setHuidigJaarinkomen("55000");
    setOpgebouwdPensioen("50000");
    setMaandelijkseInleg("200");
    setRendement("5");
    setResultaat(null);
  };

  const formatBedrag = (value: number) => {
    return value.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const resultText = resultaat
    ? `Leeftijd: ${huidigeLeeftijd} | Pensioenleeftijd: ${pensioenLeeftijd} | Inkomen: €${huidigJaarinkomen}/jr | Verwacht pensioen: €${formatBedrag(resultaat.totaalPensioenMaand)}/mnd | Doel: €${formatBedrag(resultaat.doelPensioen)}/jr`
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
              <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
                <Calculator className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="Pensioen" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Pensioen Calculator
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bereken hoeveel pensioen je opbouwt en wat je verwachte pensioeninkomen is. 
              Ontdek of je op koers ligt voor je droompensioen.
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
              <h2 className="text-lg font-bold">Jouw Gegevens</h2>
              
              {/* Leeftijd */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="huidigeLeeftijd" className="block text-sm font-medium mb-2">
                    Huidige Leeftijd
                  </label>
                  <input
                    id="huidigeLeeftijd"
                    type="number"
                    value={huidigeLeeftijd}
                    onChange={(e) => setHuidigeLeeftijd(e.target.value)}
                    className="w-full px-4 py-4 text-lg input"
                  />
                </div>
                <div>
                  <label htmlFor="pensioenLeeftijd" className="block text-sm font-medium mb-2">
                    <span className="flex items-center gap-1">
                      Pensioenleeftijd
                      <Info className="w-4 h-4 text-muted-foreground" />
                    </span>
                  </label>
                  <input
                    id="pensioenLeeftijd"
                    type="number"
                    value={pensioenLeeftijd}
                    onChange={(e) => setPensioenLeeftijd(e.target.value)}
                    className="w-full px-4 py-4 text-lg input"
                  />
                </div>
              </div>

              {/* Jaarinkomen */}
              <div>
                <label htmlFor="jaarinkomen" className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    Jaarinkomen (€)
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">€</span>
                  <input
                    id="jaarinkomen"
                    type="text"
                    inputMode="decimal"
                    value={huidigJaarinkomen}
                    onChange={(e) => setHuidigJaarinkomen(e.target.value.replace(/[^0-9.,]/g, ""))}
                    placeholder="55.000"
                    className="w-full pl-10 pr-4 py-4 text-lg input"
                  />
                </div>
              </div>

              {/* Opgebouwd Pensioen */}
              <div>
                <label htmlFor="opgebouwdPensioen" className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    Opgebouwd Pensioen (€)
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">€</span>
                  <input
                    id="opgebouwdPensioen"
                    type="text"
                    inputMode="decimal"
                    value={opgebouwdPensioen}
                    onChange={(e) => setOpgebouwdPensioen(e.target.value.replace(/[^0-9.,]/g, ""))}
                    placeholder="50.000"
                    className="w-full pl-10 pr-4 py-4 text-lg input"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Je totale opgebouwde pensioen bij je huidige werkgever(s)
                </p>
              </div>

              <hr className="border-border" />

              <h3 className="text-sm font-medium">Extra Pensioenopbouw</h3>

              {/* Maandelijkse Inleg */}
              <div>
                <label htmlFor="inleg" className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    Maandelijkse Beleggingsinleg (€)
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">€</span>
                  <input
                    id="inleg"
                    type="text"
                    inputMode="decimal"
                    value={maandelijkseInleg}
                    onChange={(e) => setMaandelijkseInleg(e.target.value.replace(/[^0-9.,]/g, ""))}
                    placeholder="200"
                    className="w-full pl-10 pr-4 py-4 text-lg input"
                  />
                </div>
              </div>

              {/* Rendement */}
              <div>
                <label htmlFor="rendement" className="block text-sm font-medium mb-2">
                  Verwacht Rendement (%)
                </label>
                <input
                  id="rendement"
                  type="number"
                  step="0.5"
                  value={rendement}
                  onChange={(e) => setRendement(e.target.value)}
                  className="w-full px-4 py-4 text-lg input"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Historisch gemiddelde aandelenmarkt: 7% (na inflatie)
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
                    toolName="Pensioen Calculator" 
                    result={resultText}
                    url="/tools/pensioen"
                  />
                )}
              </div>
            </div>

            {/* Results */}
            <div className="card space-y-6">
              <h2 className="text-lg font-bold">Pensioen Prognose</h2>
              
              <AnimatePresence mode="wait">
                {resultaat ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-4"
                  >
                    {/* Totaal Pensioen */}
                    <motion.div 
                      className="p-6 bg-indigo-500/10 border-2 border-indigo-500/30 rounded-xl"
                      animate={isCalculating ? { scale: [1, 1.02, 1] } : {}}
                    >
                      <p className="text-sm text-muted-foreground mb-1">Verwacht Pensioen per Maand</p>
                      <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                        € {formatBedrag(resultaat.totaalPensioenMaand)}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        € {formatBedrag(resultaat.totaalPensioenJaar)} per jaar
                      </p>
                    </motion.div>

                    {/* Doel vs Realiteit */}
                    <div className={`p-4 rounded-xl ${
                      resultaat.verschil <= 0 
                        ? "bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800"
                        : "bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800"
                    }`}>
                      <div className="flex items-center gap-3">
                        {resultaat.verschil <= 0 ? (
                          <TrendingUp className="w-6 h-6 text-green-600" />
                        ) : (
                          <AlertCircle className="w-6 h-6 text-amber-600" />
                        )}
                        <div>
                          <p className="font-medium">
                            {resultaat.verschil <= 0 ? "Je ligt op koers!" : "Pensioengat gedetecteerd"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {resultaat.verschil <= 0 
                              ? `Je hebt €${formatBedrag(Math.abs(resultaat.verschil))}/jr extra`
                              : `Je hebt €${formatBedrag(resultaat.verschil)}/jr extra nodig`
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Pensioen Bronnen */}
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-muted-foreground">Pensioensamenstelling</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-blue-500" />
                            <span className="text-muted-foreground">AOW (overheid)</span>
                          </div>
                          <span className="font-bold">€ {resultaat.aowMaand}/mnd</span>
                        </div>
                        
                        <div className="flex justify-between p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-2">
                            <PieChart className="w-4 h-4 text-green-500" />
                            <span className="text-muted-foreground">Werkgever pensioen</span>
                          </div>
                          <span className="font-medium">€ {formatBedrag(resultaat.huidigPensioen)}/mnd</span>
                        </div>

                        <div className="flex justify-between p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-purple-500" />
                            <span className="text-muted-foreground">Extra beleggingen</span>
                          </div>
                          <span className="font-medium">€ {formatBedrag(resultaat.verwachtAanvullendPensioen)}/mnd</span>
                        </div>
                      </div>
                    </div>

                    {/* Doel */}
                    <div className="p-4 bg-muted rounded-xl">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-muted-foreground" />
                          <span className="text-sm font-medium">Doel (70% van inkomen)</span>
                        </div>
                        <span className="text-xl font-bold">
                          € {formatBedrag(resultaat.doelPensioen / 12)}/mnd
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-blue-800 dark:text-blue-200 mb-1">Let op</p>
                          <p className="text-blue-700 dark:text-blue-300">
                            Dit is een indicatie gebaseerd op gemiddeldes. Je werkelijke pensioen 
                            hangt af van je specifieke pensioenregeling, beleggingsresultaten, 
                            en toekomstige wetgeving.
                          </p>
                        </div>
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
                    <Calculator className="w-12 h-12 mx-auto mb-3 opacity-50" />
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
            <h2 className="text-xl font-bold mb-4">Alles over Pensioen Planning</h2>
            <div className="prose prose-sm text-muted-foreground max-w-none space-y-4">
              <p>
                <strong>Pensioen</strong> is een onderwerp waar veel mensen niet dagelijks bij 
                stilstaan, maar dat van cruciaal belang is voor je financiële toekomst. In Nederland 
                hebben we gelukkig een goed pensioenstelsel met de AOW als basis en aanvullende 
                pensioenopbouw via werkgevers. Toch is het verstandig om zelf actief bezig te zijn 
                met je pensioenplanning.
              </p>
              <p>
                De <strong>AOW (Algemene Ouderdomswet)</strong> is het wettelijke basispensioen dat 
                iedereen ontvangt die in Nederland woont of werkt. De AOW-leeftijd is de afgelopen 
                jaren gestegen en zal in 2026 rond de 67 jaar liggen. De exacte AOW-leeftijd wordt 
                elk jaar opnieuw vastgesteld op basis van de levensverwachting.
              </p>
              <p>
                Naast de AOW bouw je via je werkgever <strong>aanvullend pensioen</strong> op. 
                Dit kan via een pensioenfonds in je bedrijfstak of via een verzekeraar. De 
                pensioenopbouw is meestal een percentage van je salaris per jaar, vaak rond de 
                1,75% tot 2%. Over 40 jaar werk kun je zo'n 70% van je eindloon opbouwen.
              </p>
              <p>
                Onze <strong>pensioen calculator</strong> helpt je om een indicatie te krijgen 
                van je verwachte pensioeninkomen. Vul je leeftijd in, je pensioenleeftijd, je 
                huidige inkomen, en wat je al hebt opgebouwd. Je ziet direct of je op koers ligt 
                voor je gewenste pensioeninkomen.
              </p>
              <p>
                Veel mensen realiseren zich niet dat ze een <strong>pensioengat</strong> hebben. 
                Dit ontstaat wanneer je pensioeninkomen lager is dan wat je nodig hebt om je 
                levensstandaard te behouden. Pensioengaten kunnen ontstaan door carrièreonderbrekingen, 
                werkloosheid, of onvoldoende pensioenopbouw in eerdere functies.
              </p>
              <p>
                Gelukkig zijn er manieren om je pensioen aan te vullen. Je kunt extra gaan beleggen 
                voor je pensioen, bijvoorbeeld via een <strong>pensioenbeleggingsrekening</strong> 
                of ETF's. Ook kun je ervoor kiezen om langer door te werken, wat zowel je AOW als 
                je aanvullend pensioen verhoogt.
              </p>
              <p>
                <strong>De 4% withdraw rate</strong> is een vuistregel die aangeeft hoeveel je 
                jaarlijks uit je pensioenpot kunt opnemen zonder dat deze uitgeput raakt. Als je 
                €200.000 hebt belegd, kun je dus €8.000 per jaar opnemen. Dit geeft een indicatie 
                van hoeveel je moet sparen voor je pensioen.
              </p>
              <p>
                Wil je meer weten over je financiële planning? Gebruik ook onze tools voor 
                <strong>salaris berekening</strong>, <strong>spaarrente vergelijking</strong>, 
                en <strong>hypotheek berekening</strong> om een completer beeld te krijgen van 
                je financiële situatie.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <FAQSection items={pensioenFAQ} title="Veelgestelde vragen over pensioen" />

          {/* Related Tools */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Gerelateerde Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/tools/salaris-netto" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Salaris</p>
              </Link>
              <Link href="/tools/spaarrekening" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Sparen</p>
              </Link>
              <Link href="/tools/afschrijving" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Afschrijving</p>
              </Link>
              <Link href="/tools/procent" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Procent</p>
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
