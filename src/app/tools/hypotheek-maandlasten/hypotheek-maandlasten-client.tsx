"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Euro, TrendingUp, RotateCcw, BookOpen, Lightbulb, Info, Calculator, Shield, BarChart3, PieChart, Calendar } from "lucide-react";
import { InlineAd, StickyAd, ToolTopBannerAd, BottomAd, SmartInlineAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import { RelatedTools } from "@/components/related-tools";
import { FeedbackForm } from "@/components/feedback-form";
import { FavoriteButton } from "@/components/favorite-button";

interface HypotheekData {
  hypotheekBedrag: number;
  rentePercentage: number;
  looptijdJaren: number;
  typeHypotheek: "annuïteit" | "lineair";
  nhg: boolean;
  overlijdensVerzekering: number;
  opstalVerzekering: number;
  erfpacht: number;
}

interface Resultaat {
  brutoMaandlasten: number;
  nettoMaandlasten: number;
  maandRente: number;
  maandAflossing: number;
  totaalRente: number;
  totaalKosten: number;
  nhgKosten: number;
  totaleVerzekeringen: number;
  kostenPerMaand: number;
  renteSchema: { maand: number; rente: number; aflossing: number; restSchuld: number }[];
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const hypotheekMaandlastenFAQ = [
  {
    question: "Wat is inclusief in hypotheek maandlasten?",
    answer: "Hypotheek maandlasten bestaan uit: rente, aflossing, eventueel premie voor overlijdensverzekering, opstalverzekering, en eventueel erfpacht. Bij NHG komen ook de NHG-premie en advieskosten kijken.",
  },
  {
    question: "Wat is het verschil tussen annuïteiten- en lineaire hypotheek?",
    answer: "Bij een annuïteitenhypotheek betaal je elke maand hetzelfde brutobedrag, maar de verhouding tussen rente en aflossing verandert over tijd. Bij een lineaire hypotheek betaal je elke maand hetzelfde bedrag aan aflossing, waardoor je maandlasten dalen.",
  },
  {
    question: "Hoe werkt hypotheekrenteaftrek?",
    answer: "De hypotheekrente is aftrekbaar van je inkomen. Dit betekent dat je over de betaalde rente minder belasting betaalt. De hoogte van de aftrek hangt af van je belastingschaal (37% of 49,5%).",
  },
  {
    question: "Wat is NHG en wanneer is het voordelig?",
    answer: "De Nationale Hypotheek Garantie (NHG) is een garantie die je restschuld dekt als je huis wordt verkocht voor minder dan de hypotheek. De kosten zijn 0,6% van de hypotheeksom. Het is voordelig bij een hoger risico op restschuld.",
  },
  {
    question: "Moet ik een overlijdensverzekering afsluiten?",
    answer: "Een overlijdensverzekering is niet verplicht, maar wordt vaak geadviseerd. Bij overlijden kan de hypotheek (deels) worden afgelost, zodat de partner niet met schulden blijft zitten.",
  },
  {
    question: "Wat zijn erfpachtkosten?",
    answer: "Erfpacht is een recht om op andermans grond te bouwen. Je betaalt jaarlijks een canon (erfpacht) aan de grondeigenaar. De hoogte varieert sterk per locatie en kan significant zijn voor de maandlasten.",
  },
];

export function HypotheekMaandlastenClient() {
  const [hypotheekBedrag, setHypotheekBedrag] = useState("350000");
  const [rentePercentage, setRentePercentage] = useState("3.8");
  const [looptijdJaren, setLooptijdJaren] = useState(30);
  const [typeHypotheek, setTypeHypotheek] = useState<"annuïteit" | "lineair">("annuïteit");
  const [nhg, setNhg] = useState(true);
  const [overlijdensVerzekering, setOverlijdensVerzekering] = useState("25");
  const [opstalVerzekering, setOpstalVerzekering] = useState("20");
  const [erfpacht, setErfpacht] = useState("0");

  const [resultaat, setResultaat] = useState<Resultaat | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      bereken();
    }, 300);
    return () => clearTimeout(timer);
  }, [hypotheekBedrag, rentePercentage, looptijdJaren, typeHypotheek, nhg, overlijdensVerzekering, opstalVerzekering, erfpacht]);

  const bereken = useCallback(() => {
    const bedrag = parseFloat(hypotheekBedrag) || 0;
    const rente = parseFloat(rentePercentage) / 100;
    const jaren = looptijdJaren;
    const aantalMaanden = jaren * 12;

    if (bedrag <= 0 || rente <= 0) {
      setResultaat(null);
      return;
    }

    setIsCalculating(true);

    // Maandelijkse rente
    const maandRente = rente / 12;

    // NHG kosten berekenen (0,6% van hypotheekbedrag)
    const nhgKosten = nhg ? bedrag * 0.006 : 0;

    // Verzekeringen per maand
    const verzekeringen = (parseFloat(overlijdensVerzekering) || 0) + (parseFloat(opstalVerzekering) || 0);

    // Erfpacht per maand
    const erfpachtMaand = (parseFloat(erfpacht) || 0);

    // Brutomaandlasten berekenen
    let brutoMaandlasten: number;
    let totaalRente: number;
    let totaalKosten: number;
    let renteSchema: Resultaat["renteSchema"] = [];

    if (typeHypotheek === "annuïteit") {
      // Annuïteitenformule
      brutoMaandlasten = bedrag * (maandRente * Math.pow(1 + maandRente, aantalMaanden)) / (Math.pow(1 + maandRente, aantalMaanden) - 1);

      // Simuleer renteschema
      let restSchuld = bedrag;
      totaalRente = 0;
      for (let i = 1; i <= Math.min(aantalMaanden, 360); i++) {
        const renteDeel = restSchuld * maandRente;
        const aflossingDeel = brutoMaandlasten - renteDeel;
        restSchuld -= aflossingDeel;
        totaalRente += renteDeel;
        
        if (i % 12 === 0 || i === 1) {
          renteSchema.push({
            maand: i,
            rente: Math.round(renteDeel),
            aflossing: Math.round(aflossingDeel),
            restSchuld: Math.round(Math.max(0, restSchuld)),
          });
        }
      }
    } else {
      // Lineaire hypotheek
      const maandAflossing = bedrag / aantalMaanden;
      let restSchuld = bedrag;
      totaalRente = 0;
      let somMaandlasten = 0;

      for (let i = 1; i <= Math.min(aantalMaanden, 360); i++) {
        const renteDeel = restSchuld * maandRente;
        const aflossingDeel = maandAflossing;
        restSchuld -= aflossingDeel;
        totaalRente += renteDeel;
        somMaandlasten += renteDeel + aflossingDeel;

        if (i % 12 === 0 || i === 1) {
          renteSchema.push({
            maand: i,
            rente: Math.round(renteDeel),
            aflossing: Math.round(aflossingDeel),
            restSchuld: Math.round(Math.max(0, restSchuld)),
          });
        }
      }
      brutoMaandlasten = somMaandlasten / aantalMaanden;
    }

    totaalKosten = bedrag + totaalRente + nhgKosten;

    // Netto maandlasten (geschat, ca. 37% aftrek)
    const nettoMaandlasten = brutoMaandlasten * 0.63;

    // Eerste maand rente en aflossing
    let maandRenteBedrag: number;
    let maandAflossingBedrag: number;

    if (typeHypotheek === "annuïteit") {
      maandRenteBedrag = bedrag * maandRente;
      maandAflossingBedrag = brutoMaandlasten - maandRenteBedrag;
    } else {
      maandAflossingBedrag = bedrag / aantalMaanden;
      maandRenteBedrag = bedrag * maandRente;
    }

    setResultaat({
      brutoMaandlasten: Math.round(brutoMaandlasten),
      nettoMaandlasten: Math.round(nettoMaandlasten),
      maandRente: Math.round(maandRenteBedrag),
      maandAflossing: Math.round(maandAflossingBedrag),
      totaalRente: Math.round(totaalRente),
      totaalKosten: Math.round(totaalKosten),
      nhgKosten: Math.round(nhgKosten),
      totaleVerzekeringen: Math.round(verzekeringen),
      kostenPerMaand: Math.round(brutoMaandlasten + verzekeringen + erfpachtMaand),
      renteSchema,
    });

    setTimeout(() => setIsCalculating(false), 150);
  }, [hypotheekBedrag, rentePercentage, looptijdJaren, typeHypotheek, nhg, overlijdensVerzekering, opstalVerzekering, erfpacht]);

  const reset = () => {
    setHypotheekBedrag("350000");
    setRentePercentage("3.8");
    setLooptijdJaren(30);
    setTypeHypotheek("annuïteit");
    setNhg(true);
    setOverlijdensVerzekering("25");
    setOpstalVerzekering("20");
    setErfpacht("0");
    setResultaat(null);
  };

  const formatBedrag = (value: number) => {
    return value.toLocaleString("nl-NL");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <ToolTopBannerAd slot={AD_SLOTS.toolTop} />
      
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
              <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
                <Calculator className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="Hypotheek Maandlasten" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Hypotheek Maandlasten Calculator
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bereken exact je hypotheek maandlasten inclusief rente, aflossing, verzekeringen en alle andere kosten.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Basisgegevens */}
            <motion.div className="card" variants={fadeInUp}>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Home className="w-5 h-5" />
                Basisgegevens
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Hypotheekbedrag
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      type="number"
                      value={hypotheekBedrag}
                      onChange={(e) => setHypotheekBedrag(e.target.value)}
                      placeholder="350000"
                      className="w-full pl-10 pr-4 py-3 input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      <TrendingUp className="w-4 h-4 inline mr-1" />
                      Rente (%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        value={rentePercentage}
                        onChange={(e) => setRentePercentage(e.target.value)}
                        className="w-full pl-4 pr-8 py-3 input"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Looptijd
                    </label>
                    <select
                      value={looptijdJaren}
                      onChange={(e) => setLooptijdJaren(parseInt(e.target.value))}
                      className="w-full px-4 py-3 input"
                    >
                      <option value={10}>10 jaar</option>
                      <option value={15}>15 jaar</option>
                      <option value={20}>20 jaar</option>
                      <option value={25}>25 jaar</option>
                      <option value={30}>30 jaar</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Type hypotheek
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setTypeHypotheek("annuïteit")}
                      className={`px-4 py-3 rounded-lg border transition-all ${
                        typeHypotheek === "annuïteit"
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background border-border hover:border-primary"
                      }`}
                    >
                      Annuïteit
                    </button>
                    <button
                      type="button"
                      onClick={() => setTypeHypotheek("lineair")}
                      className={`px-4 py-3 rounded-lg border transition-all ${
                        typeHypotheek === "lineair"
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background border-border hover:border-primary"
                      }`}
                    >
                      Lineair
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <input
                    type="checkbox"
                    id="nhg"
                    checked={nhg}
                    onChange={(e) => setNhg(e.target.checked)}
                    className="w-5 h-5 rounded"
                  />
                  <label htmlFor="nhg" className="text-sm font-medium cursor-pointer">
                    <Shield className="w-4 h-4 inline mr-1" />
                    Nationale Hypotheek Garantie (NHG)
                  </label>
                </div>
              </div>
            </motion.div>

            {/* Bijkomende kosten */}
            <motion.div className="card" variants={fadeInUp}>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Euro className="w-5 h-5" />
                Bijkomende kosten (per maand)
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Overlijdensverzekering
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      type="number"
                      value={overlijdensVerzekering}
                      onChange={(e) => setOverlijdensVerzekering(e.target.value)}
                      placeholder="25"
                      className="w-full pl-10 pr-4 py-3 input"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Opstalverzekering
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      type="number"
                      value={opstalVerzekering}
                      onChange={(e) => setOpstalVerzekering(e.target.value)}
                      placeholder="20"
                      className="w-full pl-10 pr-4 py-3 input"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Erfpacht (maandelijks)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      type="number"
                      value={erfpacht}
                      onChange={(e) => setErfpacht(e.target.value)}
                      placeholder="0"
                      className="w-full pl-10 pr-4 py-3 input"
                    />
                  </div>
                </div>

                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </motion.div>
          </div>

          {/* Results */}
          <AnimatePresence mode="wait">
            {resultaat && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 space-y-6"
              >
                {/* Hoofdresultaat */}
                <div className="card bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
                  <div className="text-center mb-6">
                    <p className="text-sm text-muted-foreground mb-1">Bruto maandlasten</p>
                    <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                      € {formatBedrag(resultaat.brutoMaandlasten)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-background/50 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground mb-1">Netto (geschat)</p>
                      <p className="text-xl font-bold">€ {formatBedrag(resultaat.nettoMaandlasten)}</p>
                    </div>
                    <div className="p-4 bg-background/50 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground mb-1">Rente 1e maand</p>
                      <p className="text-xl font-bold">€ {formatBedrag(resultaat.maandRente)}</p>
                    </div>
                    <div className="p-4 bg-background/50 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground mb-1">Aflossing 1e maand</p>
                      <p className="text-xl font-bold">€ {formatBedrag(resultaat.maandAflossing)}</p>
                    </div>
                    <div className="p-4 bg-background/50 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground mb-1">Totaal per maand</p>
                      <p className="text-xl font-bold">€ {formatBedrag(resultaat.kostenPerMaand)}</p>
                    </div>
                  </div>
                </div>

                {/* Totaaloverzicht */}
                <div className="card">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Totaaloverzicht
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Totaal geleend</span>
                      <span className="font-bold">€ {formatBedrag(parseFloat(hypotheekBedrag) || 0)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Totaal rentekosten</span>
                      <span className="font-bold text-red-600">€ {formatBedrag(resultaat.totaalRente)}</span>
                    </div>
                    {resultaat.nhgKosten > 0 && (
                      <div className="flex justify-between items-center py-2 border-b">
                        <span>NHG kosten (eenmalig)</span>
                        <span className="font-bold">€ {formatBedrag(resultaat.nhgKosten)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Totale kosten hypotheek</span>
                      <span className="font-bold text-green-600">€ {formatBedrag(resultaat.totaalKosten + resultaat.nhgKosten)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">Verzekeringen (p.m.)</span>
                      <span className="font-bold">€ {formatBedrag(resultaat.totaleVerzekeringen)}</span>
                    </div>
                  </div>
                </div>

                {/* Renteschema */}
                {resultaat.renteSchema.length > 0 && (
                  <div className="card">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Aflossingsoverzicht
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Periode</th>
                            <th className="text-right py-2">Rente</th>
                            <th className="text-right py-2">Aflossing</th>
                            <th className="text-right py-2">Restschuld</th>
                          </tr>
                        </thead>
                        <tbody>
                          {resultaat.renteSchema.map((item) => (
                            <tr key={item.maand} className="border-b">
                              <td className="py-2">Jaar {Math.round(item.maand / 12)}</td>
                              <td className="text-right">€ {formatBedrag(item.rente)}</td>
                              <td className="text-right">€ {formatBedrag(item.aflossing)}</td>
                              <td className="text-right font-bold">€ {formatBedrag(item.restSchuld)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <SmartInlineAd slot={AD_SLOTS.toolInline} afterContent={true} />

          {/* SEO Content */}
          <motion.div 
            className="mt-12 space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                </div>
                <h2 className="text-xl font-bold">Wat zijn Hypotheek Maandlasten?</h2>
              </div>
              <div className="prose prose-sm text-muted-foreground max-w-none">
                <p className="mb-4">
                  De <strong>hypotheek maandlasten</strong> zijn de kosten die je maandelijks betaalt voor je hypotheek. 
                  Deze bestaan uit verschillende componenten die bij elkaar je totale woonlasten bepalen.
                </p>
                <p>
                  Het is belangrijk om een nauwkeurige berekening te maken van je maandlasten voordat je een 
                  huis koopt. Zo voorkom je dat je in financiële problemen komt en weet je precies waar je aan toe bent.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-green-500" />
                </div>
                <h2 className="text-xl font-bold">Waarom Alles-Inclusive Berekenen?</h2>
              </div>
              <div className="prose prose-sm text-muted-foreground max-w-none">
                <p className="mb-4">
                  Veel mensen focussen alleen op de bruto maandlasten van hun hypotheek, maar houden geen 
                  rekening met bijkomende kosten zoals verzekeringen en erfpacht.
                </p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li><strong>Bruto maandlasten:</strong> Rente + aflossing</li>
                  <li><strong>Verzekeringen:</strong> Overlijdens- en opstalverzekering</li>
                  <li><strong>Erfpacht:</strong> Jaarlijkse canon voor grondgebruik</li>
                  <li><strong>NHG:</strong> Garantiekosten (eenmalig of maandelijks)</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <SmartInlineAd slot={AD_SLOTS.toolInline} afterContent={true} />

          <FAQSection items={hypotheekMaandlastenFAQ} title="Veelgestelde vragen over hypotheek maandlasten" />

          <RelatedTools currentTool="Hypotheek Maandlasten" />

          <div className="mt-8 flex justify-center">
            <FeedbackForm toolName="Hypotheek Maandlasten Calculator" />
          </div>

          <BottomAd slot={AD_SLOTS.toolBottom} />
        </div>

        <StickyAd slot={AD_SLOTS.toolSidebar} />
      </div>
    </div>
  );
}
