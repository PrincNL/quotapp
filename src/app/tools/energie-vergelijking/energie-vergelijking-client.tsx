"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Flame, Wind, BarChart3, RotateCcw, BookOpen, Lightbulb, Info, CheckCircle, TrendingDown, Thermometer } from "lucide-react";
import { InlineAd, StickyAd, ToolTopBannerAd, BottomAd, SmartInlineAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import { RelatedTools } from "@/components/related-tools";
import { FeedbackForm } from "@/components/feedback-form";
import { FavoriteButton } from "@/components/favorite-button";

interface EnergieKosten {
  type: "gas" | "elektrisch" | "hybride";
  label: string;
  icon: any;
  kleur: string;
  installatieKosten: number;
  jaarlijkseKosten: number;
  tienJaarKosten: number;
  co2: number;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const energieFAQ = [
  {
    question: "Wat is voordeliger: gas, elektrisch of hybride?",
    answer: "Dit hangt sterk af van je situatie: isolatie, gebruikspatroon en energieprijzen. Een hybride warmtepomp is vaak het meest voordelig voor bestaande woningen, terwijl volledig elektrisch gunstig kan zijn bij goede isolatie en zonnepanelen.",
  },
  {
    question: "Wat kost een warmtepomp installatie?",
    answer: "Een hybride warmtepomp kost gemiddeld €5.000-€10.000 inclusief installatie. Een volledige elektrische warmtepomp is duurder: €10.000-€18.000. Hier zijn wel subsidies voor beschikbaar via de ISDE.",
  },
  {
    question: "Hoeveel CO2 bespaar je met elektrisch verwarmen?",
    answer: "Een hybride warmtepomp bespaart gemiddeld 30-50% CO2 ten opzichte van gasketel. Een volledige elektrische warmtepomp kan tot 70-80% CO2 besparen, afhankelijk van de groene stroombron.",
  },
  {
    question: "Wat is de terugverdientijd van een warmtepomp?",
    answer: "De terugverdientijd van een hybride warmtepomp is gemiddeld 5-8 jaar. Bij een volledige elektrische warmtepomp kan dit 8-12 jaar zijn, maar dit wordt korter naarmate gasprijzen stijgen.",
  },
];

export function EnergieVergelijkingClient() {
  // Huidige situatie
  const [gasVerbruik, setGasVerbruik] = useState("1500");
  const [gasPrijs, setGasPrijs] = useState("1.20");
  const [stroomPrijs, setStroomPrijs] = useState("0.35");
  const [woningType, setWoningType] = useState<"appartement" | "rijtjeshuis" | "vrijstaand">("rijtjeshuis");

  // Prijzen
  const [hybrideKosten, setHybrideKosten] = useState("7500");
  const [elektrischKosten, setElektrischKosten] = useState("14000");

  // Subsidie
  const [subsidie, setSubsidie] = useState(true);

  const [resultaat, setResultaat] = useState<EnergieKosten[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const bereken = useCallback(() => {
    const gas = parseFloat(gasVerbruik) || 0;
    const gasP = parseFloat(gasPrijs) || 0;
    const stroomP = parseFloat(stroomPrijs) || 0;
    const hybrideI = parseFloat(hybrideKosten) || 0;
    const elektrischI = parseFloat(elektrischKosten) || 0;

    if (gas <= 0 || gasP <= 0 || stroomP <= 0) {
      setResultaat([]);
      return;
    }

    setIsCalculating(true);

    // Basis verbruik
    const gasKostenJaar = gas * gasP;
    const stroomBasis = 200; // Basis stroomverbruik voor verlichting/apparaten

    // Gas ketel
    // Verbruik: gemiddeld 1500 m3 voor rijtjeshuis
    // Jaarlijkse kosten: onderhoud + gas
    const gasOnderhoud = 150;
    const gasJaarlijkseKosten = gasKostenJaar + gasOnderhoud;
    const gasTotaal = gasJaarlijkseKosten * 10 + 3000; // 10 jaar + nieuwe ketel

    // Hybride warmtepomp
    // Bespaart 40-50% gas
    const hybrideBesparing = gas * 0.45;
    const hybrideGas = gas - hybrideBesparing;
    const hybrideStroomExtra = (gas * 8) / 3.5; // ~2300 kWh extra
    const hybrideJaarKosten = (hybrideGas * gasP) + (hybrideStroomExtra * stroomP) + 100; // Onderhoud
    let hybrideInvest = hybrideI;
    if (subsidie) hybrideInvest = hybrideI - 2500; // ISDE subsidie
    const hybrideTotaal = hybrideJaarKosten * 10 + hybrideInvest;

    // Volledig elektrisch
    // Warmtepomp verbruikt ~2500-3500 kWh extra
    const elektrischStroomExtra = (woningType === "appartement" ? 2500 : woningType === "rijtjeshuis" ? 3200 : 4000);
    const elektrischJaarKosten = (stroomBasis + elektrischStroomExtra) * stroomP + 50; // Onderhoud
    let elektrischInvest = elektrischKosten;
    if (subsidie) elektrischInvest = elektrischKosten - 5500; // ISDE subsidie volledig elektrisch
    const elektrischTotaal = elektrischJaarKosten * 10 + elektrischInvest;

    // CO2 berekening (gram per kWh)
    const co2Gas = gas * 1.8; // kg CO2 per m3 gas
    const co2Hybride = (gas - hybrideBesparing) * 1.8;
    const co2Elektrisch = (stroomBasis + elektrischStroomExtra) * 0.4; // 400g/kWh gemiddeld

    setResultaat([
      {
        type: "gas",
        label: "Gas CV",
        icon: Flame,
        kleur: "bg-orange-500",
        installatieKosten: 3000,
        jaarlijkseKosten: Math.round(gasJaarlijkseKosten),
        tienJaarKosten: Math.round(gasTotaal),
        co2: Math.round(co2Gas),
      },
      {
        type: "hybride",
        label: "Hybride Warmtepomp",
        icon: Zap,
        kleur: "bg-blue-500",
        installatieKosten: Math.round(hybrideInvest),
        jaarlijkseKosten: Math.round(hybrideJaarKosten),
        tienJaarKosten: Math.round(hybrideTotaal),
        co2: Math.round(co2Hybride),
      },
      {
        type: "elektrisch",
        label: "Elektrische Warmtepomp",
        icon: Wind,
        kleur: "bg-green-500",
        installatieKosten: Math.round(elektrischInvest),
        jaarlijkseKosten: Math.round(elektrischJaarKosten),
        tienJaarKosten: Math.round(elektrischTotaal),
        co2: Math.round(co2Elektrisch),
      },
    ]);

    setTimeout(() => setIsCalculating(false), 150);
  }, [gasVerbruik, gasPrijs, stroomPrijs, hybrideKosten, elektrischKosten, woningType, subsidie]);

  useEffect(() => {
    const timer = setTimeout(() => {
      bereken();
    }, 300);
    return () => clearTimeout(timer);
  }, [bereken]);

  const reset = () => {
    setGasVerbruik("1500");
    setGasPrijs("1.20");
    setStroomPrijs("0.35");
    setHybrideKosten("7500");
    setElektrischKosten("14000");
    setSubsidie(true);
    setResultaat([]);
  };

  const formatBedrag = (value: number) => {
    return value.toLocaleString("nl-NL");
  };

  const goedkoopste = resultaat.length > 0 ? resultaat.reduce((min, r) => r.tienJaarKosten < min.tienJaarKosten ? r : min, resultaat[0]) : null;

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
              <div className="p-3 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-600 text-white shadow-lg">
                <Thermometer className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="Energie Vergelijking" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Energie Vergelijking Calculator
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Vergelijk de kosten van gas, hybride en volledig elektrische verwarming. 
              Ontdek wat de beste keuze is voor jouw woning.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Huidige situatie */}
            <motion.div className="card" variants={fadeInUp}>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Flame className="w-5 h-5" />
                Huidige Situatie
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Gasverbruik (m³ per jaar)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={gasVerbruik}
                      onChange={(e) => setGasVerbruik(e.target.value)}
                      placeholder="1500"
                      className="w-full pl-4 pr-4 py-3 input"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Gastarief (€ per m³)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      type="number"
                      step="0.01"
                      value={gasPrijs}
                      onChange={(e) => setGasPrijs(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 input"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Stroomtarief (€ per kWh)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      type="number"
                      step="0.01"
                      value={stroomPrijs}
                      onChange={(e) => setStroomPrijs(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 input"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Woningtype
                  </label>
                  <select
                    value={woningType}
                    onChange={(e) => setWoningType(e.target.value as any)}
                    className="w-full px-4 py-3 input"
                  >
                    <option value="appartement">Appartement</option>
                    <option value="rijtjeshuis">Rijtjeshuis</option>
                    <option value="vrijstaand">Vrijstaand</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Investeringen */}
            <motion.div className="card" variants={fadeInUp}>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <TrendingDown className="w-5 h-5" />
                Investeringen
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Hybride warmtepomp (incl. installatie)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      type="number"
                      value={hybrideKosten}
                      onChange={(e) => setHybrideKosten(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 input"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Gemiddeld €5.000-€10.000
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Volledig elektrische warmtepomp
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      type="number"
                      value={elektrischKosten}
                      onChange={(e) => setElektrischKosten(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 input"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Gemiddeld €10.000-€18.000
                  </p>
                </div>

                <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg">
                  <input
                    type="checkbox"
                    id="subsidie"
                    checked={subsidie}
                    onChange={(e) => setSubsidie(e.target.checked)}
                    className="w-5 h-5 rounded"
                  />
                  <label htmlFor="subsidie" className="text-sm font-medium cursor-pointer">
                    <Info className="w-4 h-4 inline mr-1" />
                    ISDE Subsidie meerekenen
                  </label>
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
            {resultaat.length > 0 && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 space-y-6"
              >
                {/* Aanbeveling */}
                {goedkoopste && (
                  <div className="card bg-green-500/10 border-green-500/30">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-green-500/20 rounded-full">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Aanbevolen: {goedkoopste.label}</h3>
                        <p className="text-muted-foreground">
                          {goedkoopste.type === "hybride" && "Beste prijs-kwaliteitverhouding voor de meeste woningen. Relatief lage investering met hoge besparing."}
                          {goedkoopste.type === "elektrisch" && "Hoogste investering maar laagste energiekosten op lange termijn. Ideaal met zonnepanelen."}
                          {goedkoopste.type === "gas" && "Lage investering maar hogere jaarlijkse kosten en afhankelijkheid van gasprijzen."}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Vergelijking */}
                <div className="grid md:grid-cols-3 gap-4">
                  {resultaat.map((optie) => {
                    const Icon = optie.icon;
                    const isGoedkoopst = optie.type === goedkoopste?.type;
                    return (
                      <motion.div
                        key={optie.type}
                        className={`card ${isGoedkoopst ? "border-2 border-green-500 shadow-lg" : ""}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`p-3 rounded-xl ${optie.kleur} text-white`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-bold">{optie.label}</h3>
                            {isGoedkoopst && (
                              <span className="text-xs text-green-600 font-medium">✓ Voordeligst</span>
                            )}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Installatie</span>
                            <span className="font-bold">€ {formatBedrag(optie.installatieKosten)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Jaarlijkse kosten</span>
                            <span className="font-bold">€ {formatBedrag(optie.jaarlijkseKosten)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">10 jaar totaal</span>
                            <span className={`font-bold ${isGoedkoopst ? "text-green-600" : ""}`}>
                              € {formatBedrag(optie.tienJaarKosten)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">CO2 per jaar</span>
                            <span className="font-bold">{optie.co2} kg</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Besparingsgrafiek */}
                <div className="card">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    10-Jaars Kostenverloop
                  </h3>
                  <div className="space-y-3">
                    {resultaat.map((optie) => {
                      const maxKosten = Math.max(...resultaat.map(r => r.tienJaarKosten));
                      const breedte = (optie.tienJaarKosten / maxKosten) * 100;
                      return (
                        <div key={optie.type}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">{optie.label}</span>
                            <span>€ {formatBedrag(optie.tienJaarKosten)}</span>
                          </div>
                          <div className="h-6 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full ${optie.kleur}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${breedte}%` }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
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
                <h2 className="text-xl font-bold">Gas vs Elektrisch vs Hybride</h2>
              </div>
              <div className="prose prose-sm text-muted-foreground max-w-none">
                <p className="mb-4">
                  De overgang van gas naar elektrisch verwarmen is in volle gang. 
                  Met de stijgende gasprijzen en de beschikbaarheid van subsidies wordt 
                  de <strong>energie vergelijking</strong> steeds interessanter.
                </p>
                <p>
                  Een <strong>hybride warmtepomp</strong> combineert het beste van beide werelden: 
                  de efficiëntie van een warmtepomp met de betrouwbaarheid van een gasketel voor koude dagen.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-green-500" />
                </div>
                <h2 className="text-xl font-bold">Waarom Overstappen?</h2>
              </div>
              <div className="prose prose-sm text-muted-foreground max-w-none">
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Lagere energiekosten</strong> op lange termijn</li>
                  <li><strong>CO2-reductie</strong> en bijdragen aan klimaatdoelen</li>
                  <li><strong>ISDE-subsidie</strong> tot €5.500 beschikbaar</li>
                  <li><strong>Toekomstbestendig</strong> bij afbouw gasnet</li>
                  <li><strong>Hoger wooncomfort</strong> door constante temperatuur</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <SmartInlineAd slot={AD_SLOTS.toolInline} afterContent={true} />

          <FAQSection items={energieFAQ} title="Veelgestelde vragen over energie vergelijking" />

          <RelatedTools currentTool="Energie Vergelijking" />

          <div className="mt-8 flex justify-center">
            <FeedbackForm toolName="Energie Vergelijking Calculator" />
          </div>

          <BottomAd slot={AD_SLOTS.toolBottom} />
        </div>

        <StickyAd slot={AD_SLOTS.toolSidebar} />
      </div>
    </div>
  );
}
