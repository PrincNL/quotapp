"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, Euro, Calendar, ArrowRight, RotateCcw, 
  Info, Home, TrendingUp, PieChart, Download, Eye
} from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";
import { ShareResult } from "@/components/share-result";
import { InlineAd, StickyAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import Link from "next/link";

interface MaandSchema {
  maand: number;
  renteDeel: number;
  aflossingDeel: number;
  maandlasten: number;
  restSchuld: number;
}

interface AnnuiteitResultaat {
  maandlasten: number;
  totaalRente: number;
  totaalAfgelost: number;
  totaalKosten: number;
  schema: MaandSchema[];
}

const annuiteitFAQ = [
  {
    question: "Wat is een annuïteitenhypotheek?",
    answer: "Bij een annuïteitenhypotheek betaal je elke maand een vast bedrag (de annuïteit) dat bestaat uit rente en aflossing. Omdat je schuld daalt, neemt het rente-deel af en het aflossingsdeel toe. Hierdoor blijven je maandlasten gelijk, maar de verhouding rente/aflossing verandert over tijd.",
  },
  {
    question: "Wat is het voordeel van een annuïteitenhypotheek?",
    answer: "Het grootste voordeel is de zekerheid: je weet precies wat je elke maand betaalt gedurende de hele rentevastperiode. Dit maakt budgetteren makkelijk. Daarnaast is aan het begin van de looptijd het rente-aandeel hoog, wat fiscaal voordelig kan zijn.",
  },
  {
    question: "Hoeveel kan ik lenen met een annuïteitenhypotheek?",
    answer: "Je maximale hypotheek hangt af van je inkomen, partnerinkomen, vaste lasten, en de woningwaarde. Met een modaal inkomen kun je ongeveer 4 tot 4,5 keer je bruto jaarinkomen lenen. Voor 2026 gelden nieuwe leennormen van de AFM.",
  },
  {
    question: "Wat is het verschil tussen annuïteit en lineair?",
    answer: "Bij annuïteit zijn je maandlasten constant (bij gelijke rente), maar los je aan het begin langzaam af. Bij lineaire hypotheek los je elke maand hetzelfde bedrag af, waardoor je schuld sneller daalt en je rentekosten dalen. Lineair is over de hele looptijd goedkoper, annuïteit geeft meer zekerheid.",
  },
  {
    question: "Kan ik annuïteitenhypotheek oversluiten?",
    answer: "Ja, je kunt altijd je annuïteitenhypotheek oversluiten naar een andere geldverstrekker of rentetarief. Let op de oversluitkosten en eventuele boeterente als je binnen de rentevastperiode zit. Aan het einde van je rentevastperiode is oversluiten vaak kosteloos.",
  },
  {
    question: "Hoeveel rente betaal ik bij een annuïteitenhypotheek?",
    answer: "De totale rente hangt af van de hoogte van de lening, de rente, en de looptijd. Bij een hypotheek van €300.000 tegen 3% rente over 30 jaar betaal je ongeveer €155.000 aan rente. Dit is meer dan bij lineair, maar je hebt wel lagere maandlasten aan het begin.",
  },
  {
    question: "Is de annuïteitenhypotheek fiscaal voordelig?",
    answer: "Ja, de rente van je annuïteitenhypotheek is fiscaal aftrekbaar in box 1. Hoeveel je terugkrijgt hangt af van je belastingtarief. Bij een tarief van 37% in schijf 1 krijg je dus 37% van de rente die je betaalt terug via je aangifte inkomstenbelasting.",
  },
  {
    question: "Wat gebeurt er na de rentevastperiode?",
    answer: "Aan het einde van je rentevastperiode moet je de rente opnieuw vastleggen. Je kunt kiezen voor een nieuwe vaste periode (1-20 jaar) of variabele rente. Je maandlasten kunnen dan veranderen afhankelijk van de nieuwe rente.",
  },
];

export function AnnuiteitenHypotheekClient() {
  const [hypotheek, setHypotheek] = useState("300000");
  const [rente, setRente] = useState("3.2");
  const [jaren, setJaren] = useState("30");
  const [resultaat, setResultaat] = useState<AnnuiteitResultaat | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [toonSchema, setToonSchema] = useState(false);

  const bereken = useCallback(() => {
    const hypotheekNum = parseFloat(hypotheek.replace(",", ".")) || 0;
    const renteNum = parseFloat(rente) / 100;
    const jarenNum = parseInt(jaren) || 30;

    if (hypotheekNum <= 0) {
      setResultaat(null);
      return;
    }

    setIsCalculating(true);

    // Annuïteit berekening
    const maandRente = renteNum / 12;
    const maanden = jarenNum * 12;
    
    const maandlasten = hypotheekNum * (maandRente * Math.pow(1 + maandRente, maanden)) /
                        (Math.pow(1 + maandRente, maanden) - 1);
    
    // Bouw aflosschema
    const schema: MaandSchema[] = [];
    let restSchuld = hypotheekNum;
    let totaalRente = 0;
    let totaalAfgelost = 0;

    for (let i = 1; i <= maanden; i++) {
      const renteDeel = restSchuld * maandRente;
      const aflossingDeel = maandlasten - renteDeel;
      restSchuld = Math.max(0, restSchuld - aflossingDeel);
      
      totaalRente += renteDeel;
      totaalAfgelost += aflossingDeel;

      // Voeg alleen eerste 12 en jaarlijkse tussenstand toe voor performance
      if (i <= 12 || i % 12 === 0 || i === maanden) {
        schema.push({
          maand: i,
          renteDeel: Math.round(renteDeel * 100) / 100,
          aflossingDeel: Math.round(aflossingDeel * 100) / 100,
          maandlasten: Math.round(maandlasten * 100) / 100,
          restSchuld: Math.round(restSchuld * 100) / 100,
        });
      }
    }

    setResultaat({
      maandlasten: Math.round(maandlasten * 100) / 100,
      totaalRente: Math.round(totaalRente * 100) / 100,
      totaalAfgelost: Math.round(totaalAfgelost * 100) / 100,
      totaalKosten: Math.round((totaalRente + totaalAfgelost) * 100) / 100,
      schema,
    });

    setTimeout(() => setIsCalculating(false), 150);
  }, [hypotheek, rente, jaren]);

  useEffect(() => {
    const timer = setTimeout(bereken, 300);
    return () => clearTimeout(timer);
  }, [bereken]);

  const reset = () => {
    setHypotheek("300000");
    setRente("3.2");
    setJaren("30");
    setResultaat(null);
    setToonSchema(false);
  };

  const formatBedrag = (value: number) => {
    return value.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const resultText = resultaat
    ? `Hypotheek: €${hypotheek} | Rente: ${rente}% | ${jaren} jaar | Maandlasten: €${formatBedrag(resultaat.maandlasten)} | Totale rente: €${formatBedrag(resultaat.totaalRente)}`
    : "";

  const rentePercentage = resultaat ? (resultaat.totaalRente / resultaat.totaalKosten) * 100 : 0;
  const aflossingPercentage = resultaat ? (resultaat.totaalAfgelost / resultaat.totaalKosten) * 100 : 0;

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
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-lg">
                <Home className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="Annuïteitenhypotheek" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Annuïteitenhypotheek Calculator
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bereken je maandlasten voor een annuïteitenhypotheek. 
              Zie hoeveel je maandelijks betaalt aan rente en aflossing.
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
              <h2 className="text-lg font-bold">Hypotheek Gegevens</h2>
              
              {/* Hypotheek */}
              <div>
                <label htmlFor="hypotheek" className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    Hypotheekbedrag (€)
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">€</span>
                  <input
                    id="hypotheek"
                    type="text"
                    inputMode="decimal"
                    value={hypotheek}
                    onChange={(e) => setHypotheek(e.target.value.replace(/[^0-9.,]/g, ""))}
                    placeholder="300.000"
                    className="w-full pl-10 pr-4 py-4 text-lg input"
                  />
                </div>
                <div className="flex gap-2 mt-2">
                  {["200000", "300000", "400000", "500000", "750000"].map((h) => (
                    <button
                      key={h}
                      onClick={() => setHypotheek(h)}
                      className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                        hypotheek === h ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      €{(parseInt(h) / 1000)}k
                    </button>
                  ))}
                </div>
              </div>

              {/* Rente */}
              <div>
                <label htmlFor="rente" className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    Hypotheekrente (%)
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </span>
                </label>
                <input
                  id="rente"
                  type="number"
                  step="0.1"
                  value={rente}
                  onChange={(e) => setRente(e.target.value)}
                  className="w-full px-4 py-4 text-lg input"
                />
                <div className="flex gap-2 mt-2">
                  {["2.3", "2.8", "3.2", "3.8", "4.5"].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRente(r)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        rente === r ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      {r}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Looptijd */}
              <div>
                <label htmlFor="jaren" className="block text-sm font-medium mb-2">
                  Looptijd (jaren)
                </label>
                <input
                  id="jaren"
                  type="number"
                  value={jaren}
                  onChange={(e) => setJaren(e.target.value)}
                  className="w-full px-4 py-4 text-lg input"
                />
                <div className="flex gap-2 mt-2">
                  {["10", "15", "20", "25", "30"].map((j) => (
                    <button
                      key={j}
                      onClick={() => setJaren(j)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        jaren === j ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      {j} jaar
                    </button>
                  ))}
                </div>
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
                    toolName="Annuïteitenhypotheek Calculator" 
                    result={resultText}
                    url="/tools/annuiteitenhypotheek"
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
                    {/* Maandlasten */}
                    <motion.div 
                      className="p-6 bg-blue-500/10 border-2 border-blue-500/30 rounded-xl"
                      animate={isCalculating ? { scale: [1, 1.02, 1] } : {}}
                    >
                      <p className="text-sm text-muted-foreground mb-1">Maandelijkse Lasten</p>
                      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        € {formatBedrag(resultaat.maandlasten)}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        vast bedrag per maand
                      </p>
                    </motion.div>

                    {/* Pie Chart Visualisatie */}
                    <div className="p-4 bg-muted/50 rounded-xl">
                      <p className="text-sm font-medium mb-3 flex items-center gap-2">
                        <PieChart className="w-4 h-4" />
                        Verdeling Totale Kosten
                      </p>
                      <div className="flex gap-1 h-6 rounded-full overflow-hidden">
                        <div 
                          className="bg-blue-500 transition-all" 
                          style={{ width: `${rentePercentage}%` }}
                          title={`Rente: ${rentePercentage.toFixed(1)}%`}
                        />
                        <div 
                          className="bg-green-500 transition-all" 
                          style={{ width: `${aflossingPercentage}%` }}
                          title={`Aflossing: ${aflossingPercentage.toFixed(1)}%`}
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded bg-blue-500"></span>
                          Rente {rentePercentage.toFixed(1)}%
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded bg-green-500"></span>
                          Aflossing {aflossingPercentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Totale Aflossing</span>
                        <span className="font-medium">€ {formatBedrag(resultaat.totaalAfgelost)}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Totale Rente</span>
                        <span className="font-bold text-red-500">€ {formatBedrag(resultaat.totaalRente)}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Totale Kosten</span>
                        <span className="font-bold">€ {formatBedrag(resultaat.totaalKosten)}</span>
                      </div>
                    </div>

                    {/* Schema Toggle */}
                    <button
                      onClick={() => setToonSchema(!toonSchema)}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      {toonSchema ? "Verberg" : "Toon"} Aflosschema
                    </button>

                    {toonSchema && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="max-h-64 overflow-y-auto space-y-1"
                      >
                        <div className="grid grid-cols-5 gap-2 text-xs font-medium text-muted-foreground p-2 bg-muted/50 rounded">
                          <span>Maand</span>
                          <span>Rente</span>
                          <span>Aflossing</span>
                          <span>Lasten</span>
                          <span>Restant</span>
                        </div>
                        {resultaat.schema.map((item) => (
                          <div key={item.maand} className="grid grid-cols-5 gap-2 text-xs p-2 hover:bg-muted/30 rounded">
                            <span className="font-medium">{item.maand}</span>
                            <span className="text-red-500">€{item.renteDeel.toFixed(0)}</span>
                            <span className="text-green-500">€{item.aflossingDeel.toFixed(0)}</span>
                            <span>€{item.maandlasten.toFixed(0)}</span>
                            <span>€{item.restSchuld.toFixed(0)}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
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
            <h2 className="text-xl font-bold mb-4">Alles over Annuïteitenhypotheken</h2>
            <div className="prose prose-sm text-muted-foreground max-w-none space-y-4">
              <p>
                De <strong>annuïteitenhypotheek</strong> is in Nederland de meest gekozen hypotheekvorm. 
                Bij deze vorm betaal je elke maand een vast bedrag dat bestaat uit rente en aflossing. 
                Omdat je tijdens de looptijd steeds meer aflost, neemt het rente-aandeel af en het 
                aflossings-aandeel toe. Hierdoor blijven je bruto maandlasten gelijk.
              </p>
              <p>
                Het grote voordeel van een annuïteitenhypotheek is de <strong>voorspelbaarheid</strong>. 
                Je weet precies wat je elke maand betaalt, waardoor budgetteren makkelijk is. Dit is 
                vooral aantrekkelijk voor mensen die de zekerheid van vaste lasten belangrijk vinden. 
                Aan het begin van de looptijd is het rente-aandeel hoog, wat fiscaal voordelig kan zijn 
                als je in een hoog belastingtarief zit.
              </p>
              <p>
                Bij het afsluiten van een annuïteitenhypotheek is het belangrijk om te kijken naar de 
                <strong> hypotheekrente</strong> en de <strong>rentevastperiode</strong>. Je kunt 
                kiezen voor een rentevastperiode van 1 tot 20 jaar of langer. Hoe langer de rente 
                vaststaat, hoe meer zekerheid je hebt, maar meestal betaal je ook een iets hogere rente.
              </p>
              <p>
                Onze <strong>annuïteitenhypotheek calculator</strong> helpt je om snel te berekenen 
                wat je maandlasten worden. Vul het hypotheekbedrag in, de rente, en de looptijd, en 
                je ziet direct je maandelijkse lasten, totale rente, en de verdeling tussen rente 
                en aflossing over de looptijd.
              </p>
              <p>
                Het <strong>aflosschema</strong> van een annuïteitenhypotheek begint met een hoog 
                rente-aandeel. In de eerste jaren betaal je bijna alleen maar rente en los je 
                relatief weinig af. Naarmate de tijd vordert, verschuift dit naar meer aflossing. 
                Dit noemen we ook wel het 30-70 effect in de beginjaren versus 70-30 in de eindjaren.
              </p>
              <p>
                Een belangrijk aspect van de annuïteitenhypotheek is dat je gedurende de looptijd 
                steeds meer eigenwoningbezitter wordt. Je <strong>eigen vermogen</strong> in de woning 
                groeit terwijl de hypotheekschuld daalt. Dit kan gunstig zijn als de woningwaarde 
                stijgt of als je later wilt verhuizen of oversluiten.
              </p>
              <p>
                De <strong>hypotheekrente aftrek</strong> maakt de annuïteitenhypotheek extra 
                aantrekkelijk in Nederland. Je mag de rente die je betaalt aftrekken van je 
                belastbaar inkomen in box 1. Aflossing is niet aftrekbaar, maar vermindert wel 
                je belastbaar inkomen door verlaging van je vermogen in box 3.
              </p>
              <p>
                Wil je weten welke hypotheekvorm het beste bij je past? Naast de annuïteitenhypotheek 
                kun je ook kiezen voor een <strong>lineaire hypotheek</strong>, waarbij je sneller 
                aflost en over de hele linie minder rente betaalt. De lineaire hypotheek is 
                echter aan het begin duurder en wordt minder vaak gekozen.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <FAQSection items={annuiteitFAQ} title="Veelgestelde vragen over annuïteitenhypotheek" />

          {/* Related Tools */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Gerelateerde Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/tools/lineaire-hypotheek" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Lineaire Hypotheek</p>
              </Link>
              <Link href="/tools/hypotheek-oversluiten" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Oversluiten</p>
              </Link>
              <Link href="/tools/hypotheek" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Hypotheek</p>
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
