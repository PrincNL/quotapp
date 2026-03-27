"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Euro, TrendingUp, Users, RotateCcw, BookOpen, Lightbulb, Info, Shield, AlertCircle, CheckCircle, AlertOctagon } from "lucide-react";
import { InlineAd, StickyAd, ToolTopBannerAd, BottomAd, SmartInlineAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import { RelatedTools } from "@/components/related-tools";
import { FeedbackForm } from "@/components/feedback-form";
import { FavoriteButton } from "@/components/favorite-button";

interface Resultaat {
  totaalInkomen: number;
  totaalSchulden: number;
  maandelijkseLasten: number;
  betaalbaarheidsRatio: number;
  status: "gezond" | "aandacht" | "probleem" | "kritiek";
  advies: string;
  resterendBudget: number;
  minimumeisenBuffer: number;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const zorgplichtFAQ = [
  {
    question: "Wat is de zorgplicht?",
    answer: "De zorgplicht is een wettelijke verplichting die stelt dat je als schuldenaar voldoende moet proberen om je schulden te betalen. Dit betekent dat je alle redelijke inspanningen moet leveren om aan je betalingsverplichtingen te voldoen. Als je inkomen ontoereikend is, kun je in de problemen komen.",
  },
  {
    question: "Wanneer heb ik financiële problemen?",
    answer: "Je hebt financiële problemen wanneer je maandelijkse schuldenlast hoger is dan wat je comfortabel kunt dragen. Een indicatie is wanneer meer dan 40% van je inkomen naar schulden gaat. Bij 60% of meer is er sprake van overmatige schulden.",
  },
  {
    question: "Wat is het verschil tussen schuld en krediet?",
    answer: "Schuld is een bredere term die alle geleende geldbedragen omvat. Krediet is een specifieke vorm van schuld, zoals een persoonlijke lening of doorlopend krediet. Beide tellen mee voor de zorgplicht.",
  },
  {
    question: "Kan ik hulp krijgen bij schulden?",
    answer: "Ja, er zijn veel instanties die kunnen helpen bij schulden: de gemeentelijke schuldhulpverlening, Kredietbank Nederland, of het NIBud. Zij kunnen helpen bij het opstellen van een budgetplan en het onderhandelen met schuldeisers.",
  },
  {
    question: "Wat is het verschil tussen beslaglegging en incasso?",
    answer: "Incasso is wanneer een schuldeiser je vraagt te betalen via aanmaningen. Beslaglegging is een juridische maatregel waarbij deurwaarders beslag leggen op je inkomen of bezittingen. Dit gebeurt pas na een vonnis van de rechter.",
  },
  {
    question: "Hoe kan ik mijn schuldenlast verlagen?",
    answer: "Je kunt je schuldenlast verlagen door: 1) Extra aflossen op leningen, 2) Schuldhulpverlening aanvragen, 3) Kosten verlagen, 4) Extra inkomen genereren, of 5) Onderhandelen met schuldeisers over lagere rentetarieven.",
  },
];

export function ZorgplichtCalculatorClient() {
  // Inkomsten
  const [brutoInkomen, setBrutoInkomen] = useState("");
  const [partnerInkomen, setPartnerInkomen] = useState("");
  const [overigeInkomen, setOverigeInkomen] = useState("");

  // Schuldgegevens
  const [hypotheekLasten, setHypotheekLasten] = useState("");
  const [persoonlijkeLening, setPersoonlijkeLening] = useState("");
  const [doorlopendKrediet, setDoorlopendKrediet] = useState("");
  const [creditcardSchuld, setCreditcardSchuld] = useState("");
  const [totaalStudieschuld, setTotaalStudieschuld] = useState("");
  const [overigeSchulden, setOverigeSchulden] = useState("");

  // Maandelijkse lasten
  const [huur, setHuur] = useState("");
  const [energie, setEnergie] = useState("");
  const [verzekeringen, setVerzekeringen] = useState("");
  const [abonnementen, setAbonnementen] = useState("");
  const [overigeMaandelijkseLasten, setOverigeMaandelijkseLasten] = useState("");

  const [resultaat, setResultaat] = useState<Resultaat | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Live calculation
  useEffect(() => {
    const timer = setTimeout(() => {
      bereken();
    }, 300);
    return () => clearTimeout(timer);
  }, [brutoInkomen, partnerInkomen, overigeInkomen, hypotheekLasten, persoonlijkeLening, doorlopendKrediet, creditcardSchuld, totaalStudieschuld, overigeSchulden, huur, energie, verzekeringen, abonnementen, overigeMaandelijkseLasten]);

  const bereken = useCallback(() => {
    // Parse alle waarden
    const ink1 = parseFloat(brutoInkomen) || 0;
    const ink2 = parseFloat(partnerInkomen) || 0;
    const ink3 = parseFloat(overigeInkomen) || 0;
    const totaalInkomen = ink1 + ink2 + ink3;

    // Schuldgegevens (maandelijkse lasten berekenen)
    const hyp = parseFloat(hypotheekLasten) || 0;
    const lening = parseFloat(persoonlijkeLening) || 0;
    const krediet = parseFloat(doorlopendKrediet) || 0;
    const credit = parseFloat(creditcardSchuld) || 0;
    const studie = parseFloat(totaalStudieschuld) || 0;
    const overig = parseFloat(overigeSchulden) || 0;

    // Maandelijkse lasten berekenen (schuldenlast per maand)
    const maandelijkseSchulden = lening + krediet + credit + overig;
    const maandelijkseWoonlasten = hyp + parseFloat(huur || "0");
    const totaleSchulden = maandelijkseSchulden + (studie / 12) + parseFloat(overigeMaandelijkseLasten || "0");

    // Overige vaste lasten
    const vasteLasten = 
      parseFloat(energie || "0") + 
      parseFloat(verzekeringen || "0") + 
      parseFloat(abonnementen || "0");

    // Totale maandelijkse lasten
    const maandelijkseLasten = maandelijkseSchulden + maandelijkseWoonlasten + vasteLasten;

    // Bereken betaalbaarheidsratio (schuldenlast / inkomen)
    const betaalbaarheidsRatio = totaalInkomen > 0 
      ? (maandelijkseLasten / (totaalInkomen / 12)) * 100 
      : 0;

    // Resterend budget berekenen
    const resterendBudget = (totaalInkomen / 12) - maandelijkseLasten;

    // Minimumeisen buffer (3 maanden kosten)
    const minimumeisenBuffer = Math.max(0, maandelijkseLasten * 3);

    // Bepaal status
    let status: "gezond" | "aandacht" | "probleem" | "kritiek";
    let advies: string;

    if (betaalbaarheidsRatio <= 30) {
      status = "gezond";
      advies = "Je financiële situatie ziet er gezond uit. Je schuldenlast is goed te dragen en je houdt voldoende over voor onvoorziene uitgaven.";
    } else if (betaalbaarheidsRatio <= 45) {
      status = "aandacht";
      advies = "Let op: Je schuldenlast neemt een aanzienlijk deel van je inkomen in beslag. Overweeg extra aflossingen of het herfinancieren van leningen.";
    } else if (betaalbaarheidsRatio <= 60) {
      status = "probleem";
      advies = "Je hebt mogelijk problemen met het voldoen aan je zorgplicht. Neem contact op met schuldhulpverlening voor gratis advies.";
    } else {
      status = "kritiek";
      advies = "Kritieke situatie: Je schuldenlast overstijgt wat verantwoord is. Zoek onmiddellijk professionele hulp via gemeentelijke schuldhulpverlening.";
    }

    setResultaat({
      totaalInkomen,
      totaalSchulden: totaleSchulden,
      maandelijkseLasten: Math.round(maandelijkseLasten),
      betaalbaarheidsRatio: Math.round(betaalbaarheidsRatio),
      status,
      advies,
      resterendBudget: Math.round(resterendBudget),
      minimumeisenBuffer: Math.round(minimumeisenBuffer),
    });

    setTimeout(() => setIsCalculating(false), 150);
  }, [brutoInkomen, partnerInkomen, overigeInkomen, hypotheekLasten, persoonlijkeLening, doorlopendKrediet, creditcardSchuld, totaalStudieschuld, overigeSchulden, huur, energie, verzekeringen, abonnementen, overigeMaandelijkseLasten]);

  const reset = () => {
    setBrutoInkomen("");
    setPartnerInkomen("");
    setOverigeInkomen("");
    setHypotheekLasten("");
    setPersoonlijkeLening("");
    setDoorlopendKrediet("");
    setCreditcardSchuld("");
    setTotaalStudieschuld("");
    setOverigeSchulden("");
    setHuur("");
    setEnergie("");
    setVerzekeringen("");
    setAbonnementen("");
    setOverigeMaandelijkseLasten("");
    setResultaat(null);
  };

  const formatBedrag = (value: number) => {
    return value.toLocaleString("nl-NL", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "gezond": return { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-700 dark:text-green-300", border: "border-green-500" };
      case "aandacht": return { bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "text-yellow-700 dark:text-yellow-300", border: "border-yellow-500" };
      case "probleem": return { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-300", border: "border-orange-500" };
      case "kritiek": return { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-300", border: "border-red-500" };
      default: return { bg: "bg-gray-100 dark:bg-gray-800", text: "text-gray-700 dark:text-gray-300", border: "border-gray-500" };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "gezond": return <CheckCircle className="w-8 h-8" />;
      case "aandacht": return <AlertCircle className="w-8 h-8" />;
      case "probleem": return <AlertTriangle className="w-8 h-8" />;
      case "kritiek": return <AlertTriangle className="w-8 h-8" />;
      default: return <Info className="w-8 h-8" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "gezond": return "Gezond";
      case "aandacht": return "Let Op";
      case "probleem": return "Probleem";
      case "kritiek": return "Kritiek";
      default: return "Onbekend";
    }
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
              <div className="p-3 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 text-white shadow-lg">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="Zorgplicht Calculator" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Zorgplicht Calculator
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bereken of je financieel gezond bent en of je voldoet aan je zorgplicht. 
              Ontdek of je in de problemen kunt raken met je schulden.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Inkomsten */}
            <motion.div className="card" variants={fadeInUp}>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Euro className="w-5 h-5" />
                Inkomsten (per maand)
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Jouw netto inkomen
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      type="number"
                      value={brutoInkomen}
                      onChange={(e) => setBrutoInkomen(e.target.value)}
                      placeholder="2500"
                      className="w-full pl-10 pr-4 py-3 input"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Partner netto inkomen <span className="text-muted-foreground">(optioneel)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      type="number"
                      value={partnerInkomen}
                      onChange={(e) => setPartnerInkomen(e.target.value)}
                      placeholder="2000"
                      className="w-full pl-10 pr-4 py-3 input"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Overige inkomsten <span className="text-muted-foreground">(optioneel)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      type="number"
                      value={overigeInkomen}
                      onChange={(e) => setOverigeInkomen(e.target.value)}
                      placeholder="300"
                      className="w-full pl-10 pr-4 py-3 input"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Wonen */}
            <motion.div className="card" variants={fadeInUp}>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Woonlasten (per maand)
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Hypotheek / Huur
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      type="number"
                      value={hypotheekLasten}
                      onChange={(e) => setHypotheekLasten(e.target.value)}
                      placeholder="1200"
                      className="w-full pl-10 pr-4 py-3 input"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Schuldgegevens */}
            <motion.div className="card" variants={fadeInUp}>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Schuldgegevens (per maand)
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Persoonlijke lening
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      type="number"
                      value={persoonlijkeLening}
                      onChange={(e) => setPersoonlijkeLening(e.target.value)}
                      placeholder="200"
                      className="w-full pl-10 pr-4 py-3 input"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Doorlopend krediet
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      type="number"
                      value={doorlopendKrediet}
                      onChange={(e) => setDoorlopendKrediet(e.target.value)}
                      placeholder="150"
                      className="w-full pl-10 pr-4 py-3 input"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Creditcard schuld (maandbedrag)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      type="number"
                      value={creditcardSchuld}
                      onChange={(e) => setCreditcardSchuld(e.target.value)}
                      placeholder="100"
                      className="w-full pl-10 pr-4 py-3 input"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Studieschuld (maandbedrag)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      type="number"
                      value={totaalStudieschuld}
                      onChange={(e) => setTotaalStudieschuld(e.target.value)}
                      placeholder="175"
                      className="w-full pl-10 pr-4 py-3 input"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Overige schulden
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      type="number"
                      value={overigeSchulden}
                      onChange={(e) => setOverigeSchulden(e.target.value)}
                      placeholder="50"
                      className="w-full pl-10 pr-4 py-3 input"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Vaste lasten */}
            <motion.div className="card" variants={fadeInUp}>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Overige vaste lasten (per maand)
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Energie (gas/stroom)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      type="number"
                      value={energie}
                      onChange={(e) => setEnergie(e.target.value)}
                      placeholder="200"
                      className="w-full pl-10 pr-4 py-3 input"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Verzekeringen
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      type="number"
                      value={verzekeringen}
                      onChange={(e) => setVerzekeringen(e.target.value)}
                      placeholder="150"
                      className="w-full pl-10 pr-4 py-3 input"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Abonnementen (tv, internet, telefoon)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      type="number"
                      value={abonnementen}
                      onChange={(e) => setAbonnementen(e.target.value)}
                      placeholder="100"
                      className="w-full pl-10 pr-4 py-3 input"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Overige maandelijkse lasten
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      type="number"
                      value={overigeMaandelijkseLasten}
                      onChange={(e) => setOverigeMaandelijkseLasten(e.target.value)}
                      placeholder="200"
                      className="w-full pl-10 pr-4 py-3 input"
                    />
                  </div>
                </div>

                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset alle velden
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
                className="mt-8"
              >
                {/* Status Card */}
                <div className={`card ${getStatusColor(resultaat.status).border} border-2`}>
                  <div className={`${getStatusColor(resultaat.status).bg} rounded-xl p-6 mb-6`}>
                    <div className="flex items-center gap-4">
                      <div className={`${getStatusColor(resultaat.status).text}`}>
                        {getStatusIcon(resultaat.status)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Status: {getStatusLabel(resultaat.status)}</h3>
                        <p className={`${getStatusColor(resultaat.status).text} text-sm mt-1`}>
                          {resultaat.advies}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Ratio Meter */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Schuldenratio</span>
                      <span className="font-bold">{resultaat.betaalbaarheidsRatio}%</span>
                    </div>
                    <div className="h-4 bg-muted rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full ${
                          resultaat.status === "gezond" ? "bg-green-500" :
                          resultaat.status === "aandacht" ? "bg-yellow-500" :
                          resultaat.status === "probleem" ? "bg-orange-500" : "bg-red-500"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(resultaat.betaalbaarheidsRatio, 100)}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>0%</span>
                      <span>30% (gezond)</span>
                      <span>45% (aandacht)</span>
                      <span>60%+ (probleem)</span>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Totaal inkomen</p>
                      <p className="text-xl font-bold">€ {formatBedrag(resultaat.totaalInkomen)}</p>
                      <p className="text-xs text-muted-foreground">per maand</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Maandelijkse lasten</p>
                      <p className="text-xl font-bold">€ {formatBedrag(resultaat.maandelijkseLasten)}</p>
                      <p className="text-xs text-muted-foreground">totaal</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Resterend budget</p>
                      <p className={`text-xl font-bold ${resultaat.resterendBudget >= 0 ? "text-green-600" : "text-red-600"}`}>
                        € {formatBedrag(resultaat.resterendBudget)}
                      </p>
                      <p className="text-xs text-muted-foreground">per maand</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Min. buffer nodig</p>
                      <p className="text-xl font-bold">€ {formatBedrag(resultaat.minimumeisenBuffer)}</p>
                      <p className="text-xs text-muted-foreground">3 maanden</p>
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
                <h2 className="text-xl font-bold">Wat is de Zorgplicht?</h2>
              </div>
              <div className="prose prose-sm text-muted-foreground max-w-none">
                <p className="mb-4">
                  De <strong>zorgplicht</strong> is een wettelijke verplichting die stelt dat je als schuldenaar 
                  voldoende moet proberen om je schulden te betalen. Dit betekent dat je alle redelijke 
                  inspanningen moet leveren om aan je betalingsverplichtingen te voldoen.
                </p>
                <p>
                  Wanneer je inkomen ontoereikend is om aan alle betalingsverplichtingen te voldoen, 
                  kun je in de problemen komen. De zorgplicht calculator helpt je om tijdig te zien 
                  wanneer je in de problemen zou kunnen raken.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-green-500" />
                </div>
                <h2 className="text-xl font-bold">Hoe Bereken Je Je Schuldenlast?</h2>
              </div>
              <div className="prose prose-sm text-muted-foreground max-w-none">
                <p className="mb-4">
                  Om je financiële situatie te beoordelen, kijk je naar de verhouding tussen je 
                  <strong> schuldenlast en je inkomen</strong>. Als vuistregel geldt:
                </p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li><strong>Onder 30%:</strong> Gezonde situatie</li>
                  <li><strong>30-45%:</strong> Aandacht vereist</li>
                  <li><strong>45-60%:</strong> Problematische schulden</li>
                  <li><strong>Boven 60%:</strong> Overmatige schulden</li>
                </ul>
                <p>
                  Deze verhouding wordt ook wel de "schuldenquote" of "betaalbaarheidsratio" genoemd.
                </p>
              </div>
            </div>
          </motion.div>

          <SmartInlineAd slot={AD_SLOTS.toolInline} afterContent={true} />

          <FAQSection items={zorgplichtFAQ} title="Veelgestelde vragen over zorgplicht" />

          <RelatedTools currentTool="Zorgplicht Calculator" />

          <div className="mt-8 flex justify-center">
            <FeedbackForm toolName="Zorgplicht Calculator" />
          </div>

          <BottomAd slot={AD_SLOTS.toolBottom} />
        </div>

        <StickyAd slot={AD_SLOTS.toolSidebar} />
      </div>
    </div>
  );
}
