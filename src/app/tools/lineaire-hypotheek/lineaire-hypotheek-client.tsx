"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, Euro, Calendar, ArrowRight, RotateCcw, 
  Info, Home, TrendingDown, PieChart, Eye, TrendingUp
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

interface LineairResultaat {
  eersteMaandlasten: number;
  laatsteMaandlasten: number;
  totaalRente: number;
  totaalAfgelost: number;
  totaalKosten: number;
  schema: MaandSchema[];
  maandAflossing: number;
}

const lineairFAQ = [
  {
    question: "Wat is een lineaire hypotheek?",
    answer: "Bij een lineaire hypotheek los je elke maand hetzelfde bedrag af. Je lost dus lineair af, vandaar de naam. Omdat je schuld snel daalt, nemen je rentekosten ook snel af. Hierdoor worden je maandlasten over tijd steeds lager.",
  },
  {
    question: "Wat is het voordeel van een lineaire hypotheek?",
    answer: "Het grootste voordeel is dat je over de hele looptijd minder rente betaalt dan bij een annuïteitenhypotheek. Je bouwt ook sneller eigen vermogen op in je woning. Daarnaast dalen je maandlasten over tijd, wat fijn is als je inkomen later wat zakt.",
  },
  {
    question: "Wat is het nadeel van een lineaire hypotheek?",
    answer: "Het nadeel is dat je aan het begin van de looptijd hogere maandlasten hebt dan bij een annuïteitenhypotheek. Dit kan een probleem zijn als je beperkt budget hebt. Ook is het fiscale voordeel (hypotheekrenteaftrek) aan het begin lager omdat je minder rente betaalt.",
  },
  {
    question: "Lineair of annuïteit - wat is beter?",
    answer: "Dat hangt af van je situatie. Lineair is over de hele linie goedkoper (je betaalt minder rente). Annuïteit geeft meer zekerheid met vaste lasten. Als je verwacht later minder te verdienen, kan lineair fijn zijn. Als je nu elk eurocent nodig hebt, kan annuïteit beter uitkomen.",
  },
  {
    question: "Hoeveel minder rente betaal ik met lineair?",
    answer: "Bij een hypotheek van €300.000 over 30 jaar tegen 3% rente: bij annuïteit betaal je circa €155.000 rente, bij lineair circa €135.000. Het verschil is dus ongeveer €20.000, ofwel zo'n 13% minder rente.",
  },
  {
    question: "Kan ik tussentijds extra aflossen?",
    answer: "Ja, bij de meeste hypotheekverstrekkers mag je jaarlijks tot 10% van het oorspronkelijke hypotheekbedrag boetevrij aflossen. Extra aflossingen verkleinen je restschuld en dus ook je toekomstige rentekosten.",
  },
  {
    question: "Is lineaire hypotheek fiscaal aftrekbaar?",
    answer: "Ja, net als bij andere hypotheekvormen is de rente van een lineaire hypotheek fiscaal aftrekbaar in box 1. Je krijgt dus altijd een deel van de rente terug via je aangifte inkomstenbelasting.",
  },
  {
    question: "Voor wie is een lineaire hypotheek geschikt?",
    answer: "Een lineaire hypotheek is vooral geschikt voor mensen die: 1) Genoeg inkomen hebben om hoge aanvangslasten te dragen, 2) Zo snel mogelijk hun woning willen afbetalen, 3) Verwachten later minder inkomen te hebben (bijv. gepensioneerden), 4) Waarde hechten aan maximaliseren van eigen vermogen.",
  },
];

export function LineaireHypotheekClient() {
  const [hypotheek, setHypotheek] = useState("300000");
  const [rente, setRente] = useState("3.2");
  const [jaren, setJaren] = useState("30");
  const [resultaat, setResultaat] = useState<LineairResultaat | null>(null);
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

    // Lineaire berekening
    const maandRente = renteNum / 12;
    const maanden = jarenNum * 12;
    const maandAflossing = hypotheekNum / maanden;
    
    // Bouw aflosschema
    const schema: MaandSchema[] = [];
    let restSchuld = hypotheekNum;
    let totaalRente = 0;
    let totaalAfgelost = 0;

    for (let i = 1; i <= maanden; i++) {
      const renteDeel = restSchuld * maandRente;
      const aflossingDeel = maandAflossing;
      const maandlasten = renteDeel + aflossingDeel;
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
      eersteMaandlasten: Math.round((schema[0]?.renteDeel + schema[0]?.aflossingDeel) * 100) / 100,
      laatsteMaandlasten: Math.round(schema[schema.length - 1]?.maandlasten * 100) / 100,
      totaalRente: Math.round(totaalRente * 100) / 100,
      totaalAfgelost: Math.round(totaalAfgelost * 100) / 100,
      totaalKosten: Math.round((totaalRente + totaalAfgelost) * 100) / 100,
      schema,
      maandAflossing: Math.round(maandAflossing * 100) / 100,
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
    ? `Hypotheek: €${hypotheek} | Rente: ${rente}% | ${jaren} jaar | Eerste maand: €${formatBedrag(resultaat.eersteMaandlasten)} | Laatste maand: €${formatBedrag(resultaat.laatsteMaandlasten)} | Totale rente: €${formatBedrag(resultaat.totaalRente)}`
    : "";

  const rentePercentage = resultaat ? (resultaat.totaalRente / resultaat.totaalKosten) * 100 : 0;
  const aflossingPercentage = resultaat ? (resultaat.totaalAfgelost / resultaat.totaalKosten) * 100 : 0;
  const dalingMaandlasten = resultaat ? resultaat.eersteMaandlasten - resultaat.laatsteMaandlasten : 0;

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
              <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
                <TrendingDown className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="Lineaire Hypotheek" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Lineaire Hypotheek Calculator
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bereken je maandlasten voor een lineaire hypotheek. 
              Zie hoe je schuld snel afneemt en hoeveel je in totaal rente betaalt.
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
                    toolName="Lineaire Hypotheek Calculator" 
                    result={resultText}
                    url="/tools/lineaire-hypotheek"
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
                    {/* Maandlasten vergelijking */}
                    <div className="grid grid-cols-2 gap-3">
                      <motion.div 
                        className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl"
                        animate={isCalculating ? { scale: [1, 1.02, 1] } : {}}
                      >
                        <p className="text-xs text-muted-foreground mb-1">Eerste Maand</p>
                        <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                          € {formatBedrag(resultaat.eersteMaandlasten)}
                        </p>
                      </motion.div>
                      <motion.div 
                        className="p-4 bg-muted rounded-xl"
                        animate={isCalculating ? { scale: [1, 1.02, 1] } : {}}
                      >
                        <p className="text-xs text-muted-foreground mb-1">Laatste Maand</p>
                        <p className="text-xl font-bold">
                          € {formatBedrag(resultaat.laatsteMaandlasten)}
                        </p>
                      </motion.div>
                    </div>

                    {/* Daling indicator */}
                    <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl">
                      <div className="flex items-center gap-3">
                        <TrendingDown className="w-6 h-6 text-green-600" />
                        <div>
                          <p className="text-sm text-muted-foreground">Maandlasten dalen met</p>
                          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                            € {formatBedrag(dalingMaandlasten)}
                          </p>
                          <p className="text-sm text-green-600 dark:text-green-400">
                            over {jaren} jaar
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Pie Chart Visualisatie */}
                    <div className="p-4 bg-muted/50 rounded-xl">
                      <p className="text-sm font-medium mb-3 flex items-center gap-2">
                        <PieChart className="w-4 h-4" />
                        Verdeling Totale Kosten
                      </p>
                      <div className="flex gap-1 h-6 rounded-full overflow-hidden">
                        <div 
                          className="bg-emerald-500 transition-all" 
                          style={{ width: `${rentePercentage}%` }}
                          title={`Rente: ${rentePercentage.toFixed(1)}%`}
                        />
                        <div 
                          className="bg-blue-500 transition-all" 
                          style={{ width: `${aflossingPercentage}%` }}
                          title={`Aflossing: ${aflossingPercentage.toFixed(1)}%`}
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded bg-emerald-500"></span>
                          Rente {rentePercentage.toFixed(1)}%
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded bg-blue-500"></span>
                          Aflossing {aflossingPercentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Maandelijkse Aflossing</span>
                        <span className="font-medium">€ {formatBedrag(resultaat.maandAflossing)}</span>
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
            <h2 className="text-xl font-bold mb-4">Alles over Lineaire Hypotheken</h2>
            <div className="prose prose-sm text-muted-foreground max-w-none space-y-4">
              <p>
                De <strong>lineaire hypotheek</strong> is een hypotheekvorm waarbij je elke maand een 
                vast bedrag aflost. Omdat je schuld hierdoor snel daalt, nemen ook je rentekosten 
                elke maand af. Je maandlasten worden dus steeds lager gedurende de looptijd. 
                Dit in tegenstelling tot een annuïteitenhypotheek, waar je maandlasten gelijk blijven.
              </p>
              <p>
                Het grote voordeel van een lineaire hypotheek is de <strong>totale rentebesparing</strong>. 
                Omdat je sneller aflost, betaal je minder rente over de hele looptijd. Bij een 
                hypotheek van €300.000 over 30 jaar tegen 3% rente kun je zo'n €20.000 besparen 
                ten opzichte van een annuïteitenhypotheek.
              </p>
              <p>
                Een ander voordeel is dat je <strong>snel eigen vermogen</strong> opbouwt in je woning. 
                Door de snelle aflossing daalt je hypotheekschuld snel, waardoor je meer eigen geld 
                in de woning hebt zitten. Dit is gunstig als de woningwaarde daalt of als je wilt 
                verhuizen naar een duurdere woning.
              </p>
              <p>
                Het nadeel van een lineaire hypotheek zijn de <strong>hoge aanvangslasten</strong>. 
                In de eerste maanden betaal je meer dan bij een annuïteitenhypotheek met dezelfde 
                rente en looptijd. Dit kan een probleem zijn als je budget krap is of als je 
                minder leningsruimte hebt door de hogere maandlasten.
              </p>
              <p>
                Onze <strong>lineaire hypotheek calculator</strong> helpt je om de kosten te 
                vergelijken. Vul het hypotheekbedrag in, de rente, en de looptijd, en je ziet 
                direct je eerste en laatste maandlasten, de daling van je lasten, en de 
                totale kosten over de hele looptijd.
              </p>
              <p>
                De lineaire hypotheek is vooral geschikt voor mensen die: 1) Genoeg inkomen hebben 
                om hoge aanvangslasten te dragen, 2) Zo snel mogelijk hun woning willen afbetalen, 
                3) Verwachten later minder inkomen te hebben, 4) Waarde hechten aan financiële 
                zekerheid en weten waar ze aan toe zijn.
              </p>
              <p>
                Net als bij andere hypotheekvormen is de rente van een lineaire hypotheek 
                <strong> fiscaal aftrekbaar</strong> in box 1. Over de rente die je betaalt 
                krijg je een deel terug via je aangifte inkomstenbelasting. Het percentage 
                dat je terugkrijgt hangt af van je belastingtarief.
              </p>
              <p>
                Wil je de lineaire hypotheek vergelijken met andere vormen? Gebruik ook onze 
                <strong> annuïteitenhypotheek calculator</strong> om te zien welk type het 
                beste bij je past. De keuze hangt af van je inkomen, je verwachte toekomstige 
                situatie, en je persoonlijke voorkeur voor zekerheid versus kostenbesparing.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <FAQSection items={lineairFAQ} title="Veelgestelde vragen over lineaire hypotheek" />

          {/* Related Tools */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Gerelateerde Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/tools/annuiteitenhypotheek" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Annuïteitenhypotheek</p>
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
