"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Euro, RotateCcw, BookOpen, Lightbulb, Calculator, ArrowRight, ArrowDown, PiggyBank, LineChart, Target } from "lucide-react";
import { InlineAd, StickyAd, ToolTopBannerAd, BottomAd, SmartInlineAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import { RelatedTools } from "@/components/related-tools";
import { FeedbackForm } from "@/components/feedback-form";
import { FavoriteButton } from "@/components/favorite-button";

interface Resultaat {
  hypotheekRente: number;
  beleggingsRendement: number;
  nettoVoordeelAflossen: number;
  nettoVoordeelBeleggen: number;
  winnaar: "aflossen" | "beleggen" | "gelijk";
  maandlastenVerlaging: number;
  vermogensGroeiBeleggen: number;
  jaarVoordeel: number;
  conclusie: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const efficientieFAQ = [
  {
    question: "Wat is voordeliger: extra aflossen of beleggen?",
    answer: "Over het algemeen is extra aflossen op je hypotheek voordeliger als je hypotheekrente hoger is dan het netto beleggingsrendement. Op dit moment ligt de hypotheekrente vaak rond 3-4%, terwijl het netto beleggingsrendement na kosten rond 5-7% kan liggen. Maar let op: beleggen brengt risico's met zich mee.",
  },
  {
    question: "Waarom is netto rendement belangrijk?",
    answer: "Bij beleggen moet je rekening houden met kosten (beheerskosten, transactiekosten) en belastingen (vermogensrendementsheffing). Het brutorendement kan 7% zijn, maar netto kan dit 5% of minder zijn. Bij hypotheekrente is het voordeel gegarandeerd.",
  },
  {
    question: "Kan ik altijd extra aflossen op mijn hypotheek?",
    answer: "Dit hangt af van je hypotheekvoorwaarden. Veel hypotheken staan een bepaald bedrag per jaar toe (vaak 10-20% van de hoofdsom) zonder boeterente. Check je voorwaarden of vraag je hypotheekadviseur.",
  },
  {
    question: "Wat als mijn hypotheekrente heel laag is?",
    answer: "Bij een zeer lage hypotheekrente (bijv. 1-2%) kan het voordeliger zijn om te beleggen, mits je bereid bent het risico te nemen. Het gegarandeerde rendement van aflossen is dan relatief laag.",
  },
];

export function EfficiëntieHypotheekClient() {
  const [hypotheekRente, setHypotheekRente] = useState("3.8");
  const [beleggingsRendement, setBeleggingsRendement] = useState("6");
  const [belastingDruk, setBelastingDruk] = useState("37");
  const [extraBedrag, setExtraBedrag] = useState("10000");
  const [looptijdJaren, setLooptijdJaren] = useState(10);

  const [resultaat, setResultaat] = useState<Resultaat | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      bereken();
    }, 300);
    return () => clearTimeout(timer);
  }, [hypotheekRente, beleggingsRendement, belastingDruk, extraBedrag, looptijdJaren]);

  const bereken = useCallback(() => {
    const rente = parseFloat(hypotheekRente) / 100;
    const rendement = parseFloat(beleggingsRendement) / 100;
    const belasting = parseFloat(belastingDruk) / 100;
    const bedrag = parseFloat(extraBedrag) || 0;
    const jaren = looptijdJaren;

    if (bedrag <= 0) {
      setResultaat(null);
      return;
    }

    setIsCalculating(true);

    // Hypotheekrente besparing (gegarandeerd)
    // Bij aflossing bespaar je rente over de hele looptijd
    const hypotheekBesparing = bedrag * rente * jaren;

    // Beleggingsrendement berekenen
    // Jaarlijks renderement met samengestelde rente
    const beleggingsGroei = bedrag * (Math.pow(1 + rendement, jaren) - 1);

    // Netto beleggingsrendement (na vermogensrendementsheffing van 0,58%)
    // En na belasting over rendement (box 3)
    const nettoRendement = Math.max(0, rendement - 0.0058);
    const nettoBeleggingsGroei = bedrag * (Math.pow(1 + nettoRendement, jaren) - 1);

    // Jaarlijkse besparing door lagere maandlasten
    const maandlastenVerlaging = (bedrag * rente) / 12;

    // Voordeel berekenen
    const voordeelAflossen = hypotheekBesparing;
    const voordeelBeleggen = nettoBeleggingsGroei;

    // Bepaal winnaar
    let winnaar: "aflossen" | "beleggen" | "gelijk";
    let conclusie: string;

    if (voordeelAflossen > voordeelBeleggen * 1.05) {
      winnaar = "aflossen";
      conclusie = `Extra aflossen is voordeliger! Je bespaart €${(voordeelAflossen - voordeelBeleggen).toLocaleString('nl-NL')} meer dan bij beleggen. Het voordeel van aflossen is gegarandeerd.`;
    } else if (voordeelBeleggen > voordeelAflossen * 1.05) {
      winnaar = "beleggen";
      conclusie = `Beleggen kan voordeliger zijn! Je kunt €${(voordeelBeleggen - voordeelAflossen).toLocaleString('nl-NL')} meer verdienen. Houd wel rekening met het risico dat beleggen met zich meebrengt.`;
    } else {
      winnaar = "gelijk";
      conclusie = `De resultaten zijn nagenoeg gelijk. Beide opties hebben voor- en nadelen. Kies op basis van je risicobereidheid.`;
    }

    setResultaat({
      hypotheekRente: rente * 100,
      beleggingsRendement: nettoRendement * 100,
      nettoVoordeelAflossen: Math.round(voordeelAflossen),
      nettoVoordeelBeleggen: Math.round(voordeelBeleggen),
      winnaar,
      maandlastenVerlaging: Math.round(maandlastenVerlaging),
      vermogensGroeiBeleggen: Math.round(beleggingsGroei),
      jaarVoordeel: Math.round(Math.abs(voordeelAflossen - voordeelBeleggen) / jaren),
      conclusie,
    });

    setTimeout(() => setIsCalculating(false), 150);
  }, [hypotheekRente, beleggingsRendement, belastingDruk, extraBedrag, looptijdJaren]);

  const reset = () => {
    setHypotheekRente("3.8");
    setBeleggingsRendement("6");
    setBelastingDruk("37");
    setExtraBedrag("10000");
    setLooptijdJaren(10);
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
              <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg">
                <Target className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="Efficiëntie Hypotheek" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Efficiëntie Hypotheek Calculator
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bereken of het voordeliger is om extra af te lossen op je hypotheek of te beleggen. 
              Vergelijk gegarandeerd rendement met beleggingsrendement.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Hypotheekgegevens */}
            <motion.div className="card" variants={fadeInUp}>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Euro className="w-5 h-5" />
                Hypotheekgegevens
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Hypotheekrente (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={hypotheekRente}
                      onChange={(e) => setHypotheekRente(e.target.value)}
                      className="w-full pl-4 pr-8 py-3 input"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Extra bedrag
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      type="number"
                      value={extraBedrag}
                      onChange={(e) => setExtraBedrag(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 input"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Looptijd
                  </label>
                  <select
                    value={looptijdJaren}
                    onChange={(e) => setLooptijdJaren(parseInt(e.target.value))}
                    className="w-full px-4 py-3 input"
                  >
                    <option value={5}>5 jaar</option>
                    <option value={10}>10 jaar</option>
                    <option value={15}>15 jaar</option>
                    <option value={20}>20 jaar</option>
                    <option value={30}>30 jaar</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Beleggingsgegevens */}
            <motion.div className="card" variants={fadeInUp}>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <LineChart className="w-5 h-5" />
                Beleggingsgegevens
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Verwacht beleggingsrendement (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.5"
                      value={beleggingsRendement}
                      onChange={(e) => setBeleggingsRendement(e.target.value)}
                      className="w-full pl-4 pr-8 py-3 input"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Gemiddeld 6-7% voor wereldwijde indexfondsen
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Belastingdruk (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={belastingDruk}
                      onChange={(e) => setBelastingDruk(e.target.value)}
                      className="w-full pl-4 pr-8 py-3 input"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    37% of 49,5% afhankelijk van inkomen
                  </p>
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
                {/* Winnaar */}
                <div className={`card ${
                  resultaat.winnaar === "aflossen" ? "bg-green-500/10 border-green-500/30" :
                  resultaat.winnaar === "beleggen" ? "bg-blue-500/10 border-blue-500/30" :
                  "bg-yellow-500/10 border-yellow-500/30"
                } border-2`}>
                  <div className="text-center mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                      resultaat.winnaar === "aflossen" ? "bg-green-500/20 text-green-600" :
                      resultaat.winnaar === "beleggen" ? "bg-blue-500/20 text-blue-600" :
                      "bg-yellow-500/20 text-yellow-600"
                    }`}>
                      {resultaat.winnaar === "aflossen" ? <PiggyBank className="w-8 h-8" /> :
                       resultaat.winnaar === "beleggen" ? <TrendingUp className="w-8 h-8" /> :
                       <Calculator className="w-8 h-8" />}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">
                      {resultaat.winnaar === "aflossen" ? "Aflossen Wint!" :
                       resultaat.winnaar === "beleggen" ? "Beleggen Kan Winstgevender Zijn" :
                       "Nagenoeg Gelijk"}
                    </h3>
                    <p className="text-muted-foreground max-w-lg mx-auto">
                      {resultaat.conclusie}
                    </p>
                  </div>
                </div>

                {/* Vergelijking */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Aflossen */}
                  <div className="card bg-green-500/5 border-green-500/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <PiggyBank className="w-5 h-5 text-green-600" />
                      </div>
                      <h3 className="text-lg font-bold">Extra Aflossen</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Gegarandeerd voordeel</span>
                        <span className="font-bold text-green-600">€ {formatBedrag(resultaat.nettoVoordeelAflossen)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Maandlasten verlaging</span>
                        <span className="font-bold">€ {formatBedrag(resultaat.maandlastenVerlaging)}/mnd</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rendement</span>
                        <span className="font-bold">{resultaat.hypotheekRente.toFixed(1)}%</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-green-500/10 rounded-lg">
                      <p className="text-sm">
                        <strong>Gegarandeerd</strong> - Je weet precies wat je bespaart
                      </p>
                    </div>
                  </div>

                  {/* Beleggen */}
                  <div className="card bg-blue-500/5 border-blue-500/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-bold">Beleggen</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Verwachte opbrengst</span>
                        <span className="font-bold text-blue-600">€ {formatBedrag(resultaat.nettoVoordeelBeleggen)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Vermogensgroei (bruto)</span>
                        <span className="font-bold">€ {formatBedrag(resultaat.vermogensGroeiBeleggen)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Netto rendement</span>
                        <span className="font-bold">{resultaat.beleggingsRendement.toFixed(1)}%</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-blue-500/10 rounded-lg">
                      <p className="text-sm">
                        <strong>Risico's</strong> - Rendement is niet gegarandeerd
                      </p>
                    </div>
                  </div>
                </div>

                {/* Jaarlijks voordeel */}
                <div className="card bg-muted">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Jaarlijks verschil</p>
                      <p className="text-2xl font-bold">€ {formatBedrag(resultaat.jaarVoordeel)}</p>
                    </div>
                    <div className={`p-3 rounded-full ${
                      resultaat.winnaar === "aflossen" ? "bg-green-500/20" :
                      resultaat.winnaar === "beleggen" ? "bg-blue-500/20" :
                      "bg-yellow-500/20"
                    }`}>
                      {resultaat.winnaar === "aflossen" ? <ArrowDown className="w-6 h-6 text-green-600" /> :
                       resultaat.winnaar === "beleggen" ? <ArrowRight className="w-6 h-6 text-blue-600" /> :
                       <Calculator className="w-6 h-6 text-yellow-600" />}
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
                <h2 className="text-xl font-bold">Extra Aflossen of Beleggen?</h2>
              </div>
              <div className="prose prose-sm text-muted-foreground max-w-none">
                <p className="mb-4">
                  Een van de meest gestelde financiële vragen: "Wat doe ik met mijn spaargeld - 
                  aflossen op mijn hypotheek of beleggen?" Het antwoord hangt af van je persoonlijke situatie.
                </p>
                <p>
                  <strong>Extra aflossen</strong> geeft een gegarandeerd rendement gelijk aan je hypotheekrente. 
                  Dit is risicovrij en verlaagt direct je maandlasten.
                </p>
                <p className="mt-4">
                  <strong>Beleggen</strong> kan een hoger rendement opleveren, maar brengt risico's met zich mee. 
                  De beurs kan dalen en je kunt tijdelijk minder waard zijn dan je hebt ingelegd.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-green-500" />
                </div>
                <h2 className="text-xl font-bold">Vuistregels</h2>
              </div>
              <div className="prose prose-sm text-muted-foreground max-w-none">
                <ul className="list-disc list-inside space-y-2">
                  <li>Is je hypotheekrente hoger dan 4%? Extra aflossen is vaak voordeliger.</li>
                  <li>Heb je weinig spaargeld? Bouw eerst een buffer op van 3-6 maanden lasten.</li>
                  <li>Wil je zekerheid? Aflossen geeft gegarandeerd resultaat.</li>
                  <li>Heb je een lange horizon? Beleggen kan lonender zijn bij lage rentes.</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <SmartInlineAd slot={AD_SLOTS.toolInline} afterContent={true} />

          <FAQSection items={efficientieFAQ} title="Veelgestelde vragen over aflossen vs beleggen" />

          <RelatedTools currentTool="Efficiëntie Hypotheek" />

          <div className="mt-8 flex justify-center">
            <FeedbackForm toolName="Efficiëntie Hypotheek Calculator" />
          </div>

          <BottomAd slot={AD_SLOTS.toolBottom} />
        </div>

        <StickyAd slot={AD_SLOTS.toolSidebar} />
      </div>
    </div>
  );
}
