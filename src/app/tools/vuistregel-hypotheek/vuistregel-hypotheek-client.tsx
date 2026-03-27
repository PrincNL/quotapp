"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Euro, TrendingUp, RotateCcw, BookOpen, Lightbulb, Calculator, CheckCircle, AlertTriangle, Info, ArrowRight } from "lucide-react";
import { InlineAd, StickyAd, ToolTopBannerAd, BottomAd, SmartInlineAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import { RelatedTools } from "@/components/related-tools";
import { FeedbackForm } from "@/components/feedback-form";
import { FavoriteButton } from "@/components/favorite-button";

interface Vuistregel {
  naam: string;
  beschrijving: string;
  formule: string;
  resultaat: number;
  kleur: string;
  betrouwbaarheid: "hoog" | "gemiddeld" | "laag";
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const vuistregelFAQ = [
  {
    question: "Wat is de 4,5x vuistregel voor hypotheken?",
    answer: "De 4,5x vuistregel houdt in dat je maximaal 4,5 keer je bruto jaarinkomen kunt lenen voor een hypotheek. Dit is een conservatieve schatting. Met twee inkomens worden deze bij elkaar opgeteld.",
  },
  {
    question: "Hoeveel procent van je inkomen voor hypotheek?",
    answer: "Een vuistregel is om maximaal 30% van je netto inkomen aan hypotheeklasten te besteden. Dit geeft voldoende ruimte voor andere uitgaven en onvoorziene kosten.",
  },
  {
    question: "Wat is de 30% netto regel?",
    answer: "De 30% netto regel houdt in dat je hypotheeklasten niet meer dan 30% van je netto inkomen should zijn. Dit zorgt voor financiële ruimte en voorkomt dat je in de problemen komt.",
  },
  {
    question: "Kan ik meer lenen dan de vuistregels zeggen?",
    answer: "Soms kun je meer lenen, maar dat betekent niet dat het verstandig is. Banken kunnen tot 5x het inkomen lenen, maar dit kan leiden tot hoge maandlasten en weinig financiële buffers.",
  },
  {
    question: "Wat is de NHG grens?",
    answer: "De NHG (Nationale Hypotheek Garantie) grens is €435.000 in 2024-2025. Met NHG krijg je zekerheid bij verkoop en vaak een lagere rente. Koop je duurder, dan vervalt de NHG.",
  },
];

export function VuistregelHypotheekClient() {
  const [inkomen, setInkomen] = useState("45000");
  const [partnerInkomen, setPartnerInkomen] = useState("35000");
  const [maandlasten, setMaandlasten] = useState("1800");
  const [nettoInkomen, setNettoInkomen] = useState("3200");
  const [leeftijd, setLeeftijd] = useState(30);

  const [resultaten, setResultaten] = useState<Vuistregel[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const bereken = useCallback(() => {
    const ink1 = parseFloat(inkomen) || 0;
    const ink2 = parseFloat(partnerInkomen) || 0;
    const lasten = parseFloat(maandlasten) || 0;
    const netto = parseFloat(nettoInkomen) || 0;
    const totaalInkomen = ink1 + ink2;

    setIsCalculating(true);

    const vuistregels: Vuistregel[] = [];

    // Vuistregel 1: 4,5x inkomens
    vuistregels.push({
      naam: "4,5x Inkomensregel",
      beschrijving: "Je kunt maximaal 4,5 keer je bruto jaarinkomen lenen",
      formule: `${totaalInkomen} × 4,5`,
      resultaat: Math.round(totaalInkomen * 4.5),
      kleur: "bg-green-500",
      betrouwbaarheid: "hoog",
    });

    // Vuistregel 2: 30% netto regel
    if (netto > 0) {
      const maxHypotheek30 = (netto * 0.30 * 12 * 30) / 1.5; // Ruwe schatting
      vuistregels.push({
        naam: "30% Netto Regel",
        beschrijving: "Je hypotheek mag max 30% van netto inkomen kosten",
        formule: `${(netto * 0.30).toFixed(0)}/mnd beschikbaar`,
        resultaat: Math.round(maxHypotheek30),
        kleur: "bg-blue-500",
        betrouwbaarheid: "gemiddeld",
      });
    }

    // Vuistregel 3: 5x inkomens (maximaal)
    vuistregels.push({
      naam: "5x Inkomensregel (Max)",
      beschrijving: "Maximale lening bij 5x inkomen (conservatief voor banken)",
      formule: `${totaalInkomen} × 5`,
      resultaat: Math.round(totaalInkomen * 5),
      kleur: "bg-yellow-500",
      betrouwbaarheid: "gemiddeld",
    });

    // Vuistregel 4: Leeftijd gebaseerd
    const maxLooptijd = Math.min(30, 65 - leeftijd);
    if (maxLooptijd > 0) {
      const leeftijdGebaseerd = totaalInkomen * 4 * (maxLooptijd / 30);
      vuistregels.push({
        naam: "Leeftijd-Gebaseerd",
        beschrijving: `Hypotheek aangepast voor ${leeftijd} jaar (max ${maxLooptijd} jaar)`,
        formule: `${totaalInkomen} × 4 × ${(maxLooptijd / 30).toFixed(1)}`,
        resultaat: Math.round(leeftijdGebaseerd),
        kleur: "bg-purple-500",
        betrouwbaarheid: "laag",
      });
    }

    // Vuistregel 5: Maandlasten check
    if (lasten > 0 && netto > 0) {
      const percentage = (lasten / netto) * 100;
      vuistregels.push({
        naam: "Maandlasten Check",
        beschrijving: `Je huidige lasten zijn ${percentage.toFixed(0)}% van netto inkomen`,
        formule: `${lasten} / ${netto} = ${percentage.toFixed(0)}%`,
        resultaat: percentage,
        kleur: percentage > 35 ? "bg-red-500" : percentage > 25 ? "bg-yellow-500" : "bg-green-500",
        betrouwbaarheid: "hoog",
      });
    }

    // Vuistregel 6: NHG check
    const nhgGrens = 435000;
    vuistregels.push({
      naam: "NHG Grens (2025)",
      beschrijving: "Nationale Hypotheek Garantie grens",
      formule: `€${nhgGrens.toLocaleString('nl-NL')}`,
      resultaat: nhgGrens,
      kleur: "bg-teal-500",
      betrouwbaarheid: "hoog",
    });

    setResultaten(vuistregels);
    setTimeout(() => setIsCalculating(false), 150);
  }, [inkomen, partnerInkomen, maandlasten, nettoInkomen, leeftijd]);

  useEffect(() => {
    const timer = setTimeout(() => {
      bereken();
    }, 300);
    return () => clearTimeout(timer);
  }, [bereken]);

  const reset = () => {
    setInkomen("45000");
    setPartnerInkomen("35000");
    setMaandlasten("1800");
    setNettoInkomen("3200");
    setLeeftijd(30);
    setResultaten([]);
  };

  const formatBedrag = (value: number) => {
    return value.toLocaleString("nl-NL");
  };

  const gemiddelde = resultaten.filter(r => typeof r.resultaat === "number" && r.resultaat > 1000)
    .reduce((sum, r) => sum + (r.resultaat as number), 0) / 
    resultaten.filter(r => typeof r.resultaat === "number" && r.resultaat > 1000).length || 0;

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
              <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg">
                <Calculator className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="Vuistregel Hypotheek" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Vuistregel Hypotheek Calculator
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Snelle vuistregels om te bepalen wat je kunt lenen. 
              Bereken in seconden je hypotheek indicatie.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Inkomensgegevens */}
            <motion.div className="card" variants={fadeInUp}>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Euro className="w-5 h-5" />
                Inkomensgegevens
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Jouw bruto jaarinkomen
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      type="number"
                      value={inkomen}
                      onChange={(e) => setInkomen(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 input"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Partner bruto jaarinkomen <span className="text-muted-foreground">(optioneel)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      type="number"
                      value={partnerInkomen}
                      onChange={(e) => setPartnerInkomen(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 input"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Leeftijd
                  </label>
                  <input
                    type="number"
                    value={leeftijd}
                    onChange={(e) => setLeeftijd(parseInt(e.target.value))}
                    className="w-full px-4 py-3 input"
                  />
                </div>
              </div>
            </motion.div>

            {/* Optionele gegevens */}
            <motion.div className="card" variants={fadeInUp}>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Optionele Gegevens
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Netto maandinkomen
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      type="number"
                      value={nettoInkomen}
                      onChange={(e) => setNettoInkomen(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 input"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Huidige maandlasten (hypotheek)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      type="number"
                      value={maandlasten}
                      onChange={(e) => setMaandlasten(e.target.value)}
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
            {resultaten.length > 0 && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 space-y-6"
              >
                {/* Gemiddelde */}
                {gemiddelde > 0 && (
                  <div className="card bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/30">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Indicatie maximale hypotheek</p>
                      <p className="text-4xl font-bold text-amber-600">
                        € {formatBedrag(Math.round(gemiddelde))}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Gemiddelde van vuistregels (excl. NHG check)
                      </p>
                    </div>
                  </div>
                )}

                {/* Vuistregels */}
                <div className="grid md:grid-cols-2 gap-4">
                  {resultaten.map((regel, index) => {
                    const isPercentage = regel.naam.includes("Maandlasten");
                    return (
                      <motion.div
                        key={regel.naam}
                        className="card"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-3 rounded-xl ${regel.kleur} text-white`}>
                            <Calculator className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold">{regel.naam}</h3>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                regel.betrouwbaarheid === "hoog" ? "bg-green-100 text-green-700" :
                                regel.betrouwbaarheid === "gemiddeld" ? "bg-yellow-100 text-yellow-700" :
                                "bg-red-100 text-red-700"
                              }`}>
                                {regel.betrouwbaarheid}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{regel.beschrijving}</p>
                            <div className="mt-2 p-2 bg-muted rounded-lg">
                              <p className="text-xs text-muted-foreground">{regel.formule}</p>
                              <p className={`text-xl font-bold ${regel.naam.includes("Maandlasten") ? (regel.resultaat > 35 ? "text-red-600" : regel.resultaat > 25 ? "text-yellow-600" : "text-green-600") : ""}`}>
                                {isPercentage ? `${regel.resultaat}%` : `€ ${formatBedrag(regel.resultaat)}`}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Info box */}
                <div className="card bg-blue-500/10 border-blue-500/30">
                  <div className="flex items-start gap-3">
                    <Info className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-blue-600">Belangrijk om te weten</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Deze vuistregels zijn snelle indicaties. Voor een exacte berekening van je 
                        maximale hypotheek neem contact op met een hypotheekadviseur. Zij houden 
                        rekening met je volledige financiële situatie, schulden, en actuele rentestanden.
                      </p>
                    </div>
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
                <h2 className="text-xl font-bold">Hypotheek Vuistregels</h2>
              </div>
              <div className="prose prose-sm text-muted-foreground max-w-none">
                <p className="mb-4">
                  <strong>Hypotheek vuistregels</strong> zijn snelle berekeningen die je een indicatie geven 
                  van wat je kunt lenen. Deze regels zijn gebaseerd op jarenlange ervaring en onderzoek 
                  naar betaalbaarheid van hypotheken.
                </p>
                <p>
                  De meest gebruikte vuistregel is de <strong>4,5x inkomensregel</strong>: je kunt 
                  maximaal 4,5 keer je bruto jaarinkomen lenen. Voor tweeverdieners worden beide 
                  inkomens bij elkaar opgeteld.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-green-500" />
                </div>
                <h2 className="text-xl font-bold">Waarom Vuistregels Gebruiken?</h2>
              </div>
              <div className="prose prose-sm text-muted-foreground max-w-none">
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Snel inzicht:</strong> Binnen seconden weet je wat je ongeveer kunt lenen</li>
                  <li><strong>Voorbereiding:</strong> Ga voorbereid naar een hypotheekadviseur</li>
                  <li><strong>Bewustwording:</strong> Realiseer je wat financieel verantwoord is</li>
                  <li><strong>Vergelijken:</strong> Check of de bank je niet te veel leent</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <SmartInlineAd slot={AD_SLOTS.toolInline} afterContent={true} />

          <FAQSection items={vuistregelFAQ} title="Veelgestelde vragen over hypotheek vuistregels" />

          <RelatedTools currentTool="Vuistregel Hypotheek" />

          <div className="mt-8 flex justify-center">
            <FeedbackForm toolName="Vuistregel Hypotheek Calculator" />
          </div>

          <BottomAd slot={AD_SLOTS.toolBottom} />
        </div>

        <StickyAd slot={AD_SLOTS.toolSidebar} />
      </div>
    </div>
  );
}
