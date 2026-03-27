"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiggyBank, Euro, Shield, RotateCcw, BookOpen, Lightbulb, Target, TrendingUp, AlertTriangle, CheckCircle, Calendar } from "lucide-react";
import { InlineAd, StickyAd, ToolTopBannerAd, BottomAd, SmartInlineAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import { RelatedTools } from "@/components/related-tools";
import { FeedbackForm } from "@/components/feedback-form";
import { FavoriteButton } from "@/components/favorite-button";

interface BufferOnderdeel {
  naam: string;
  beschrijving: string;
  bedrag: number;
  prioriteit: "essentieel" | "belangrijk" | "optioneel";
}

interface Resultaat {
  minimaleBuffer: number;
  aanbevolenBuffer: number;
  optimaleBuffer: number;
  onderdelen: BufferOnderdeel[];
  maandKosten: number;
  huidigeBuffer: number;
  kloof: number;
  advies: string;
  fases: { fase: string; maand: number; bedrag: number; beschrijving: string }[];
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const bufferFAQ = [
  {
    question: "Hoeveel spaargeld heb ik als financiële buffer nodig?",
    answer: "Een vuistregel is om 3-6 maanden aan vaste lasten als buffer aan te houden. Voor een goede financiële veiligheid wordt 6 maanden aanbevolen. Dit dekt onverwachte uitgaven zoals auto-reparaties of tijdelijk inkomensverlies.",
  },
  {
    question: "Waarom heb ik een financiële buffer nodig?",
    answer: "Een financiële buffer beschermt je tegen onverwachte uitgaven en inkomensdalingen. Zonder buffer kan een onverwachteauto, kapotte wasmachine of ontslag directe financiële problemen veroorzaken.",
  },
  {
    question: "Hoe bouw ik een buffer op?",
    answer: "Begin met 1 maand buffer en bouw dit op. Stel een automatische overboeking in naar je spaarrekening. Zelfs €50-100 per maand helpt om snel een buffer op te bouwen. Richt op 3 maanden als eerste doel.",
  },
  {
    question: "Waar kan ik mijn buffer het beste stallen?",
    answer: "Je buffer moet liquide zijn (snel toegankelijk) maar toch wat rendement geven. Een vrij opneembare spaarrekening met goede rente is ideaal. Vermijd beleggen of vast deposito's voor je noodfonds.",
  },
  {
    question: "Is een buffer hetzelfde als een spaarrekening?",
    answer: "Nee, een buffer is specifiek bedoeld voor noodsituaties. Andere spaardoelen (vakantie, auto, woning) zijn aparte potjes. Je buffer is je financiële veiligheidsnet en moet je niet aanraken voor gewone uitgaven.",
  },
];

export function BufferCalculatorClient() {
  const [maandKosten, setMaandKosten] = useState("3000");
  const [huidigeBuffer, setHuidigeBuffer] = useState("2000");
  const [risicoProfiel, setRisicoProfiel] = useState<"laag" | "middel" | "hoog">("middel");
  const [inkomenszekerheid, setInkomenszekerheid] = useState<"vast" | "variabel" | "onzeker">("vast");
  const [kinderen, setKinderen] = useState(0);
  const [hypotheek, setHypotheek] = useState(true);

  const [resultaat, setResultaat] = useState<Resultaat | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const bereken = useCallback(() => {
    const kosten = parseFloat(maandKosten) || 0;
    const huidig = parseFloat(huidigeBuffer) || 0;

    if (kosten <= 0) {
      setResultaat(null);
      return;
    }

    setIsCalculating(true);

    // Bepaal aantal maanden op basis van risico
    let maandenMinimaal = 3;
    let maandenAanbevolen = 6;
    let maandenOptimaal = 12;

    if (risicoProfiel === "laag") {
      maandenMinimaal = 3;
      maandenAanbevolen = 4;
      maandenOptimaal = 6;
    } else if (risicoProfiel === "hoog") {
      maandenMinimaal = 6;
      maandenAanbevolen = 9;
      maandenOptimaal = 12;
    }

    // Extra aanpassingen
    if (inkomenszekerheid === "variabel") {
      maandenAanbevolen += 2;
      maandenOptimaal += 3;
    } else if (inkomenszekerheid === "onzeker") {
      maandenAanbevolen += 3;
      maandenOptimaal += 6;
    }

    // Kinderen verhogen ook de buffer
    if (kinderen > 0) {
      maandenAanbevolen += kinderen;
      maandenOptimaal += kinderen;
    }

    // Hypotheek maakt het belangrijker
    if (hypotheek) {
      maandenAanbevolen += 1;
    }

    // Bereken bedragen
    const minimaleBuffer = kosten * maandenMinimaal;
    const aanbevolenBuffer = kosten * maandenAanbevolen;
    const optimaleBuffer = kosten * maandenOptimaal;

    // Onderdelen
    const onderdelen: BufferOnderdeel[] = [
      {
        naam: "Noodfonds",
        beschrijving: "Voor onverwachte uitgaven en inkomensdaling",
        bedrag: minimaleBuffer,
        prioriteit: "essentieel",
      },
      {
        naam: "Hypotheekbuffer",
        beschrijving: "Extra voor huiseigenaren bij problemen",
        bedrag: hypotheek ? kosten * 2 : 0,
        prioriteit: "belangrijk",
      },
      {
        naam: "Ziektekosten",
        beschrijving: "Voor eigen risico en onverwachte zorgkosten",
        bedrag: 1000,
        prioriteit: "belangrijk",
      },
      {
        naam: "Autoreparaties",
        beschrijving: "Voor onverwachte autoreparaties",
        bedrag: 1500,
        prioriteit: "optioneel",
      },
    ];

    // Kloof berekenen
    const kloof = Math.max(0, aanbevolenBuffer - huidig);

    // Fases
    const fases = [];
    let opgebouwd = huidig;
    const spaarPerMaand = 200;
    let maandTeller = 0;

    while (opgebouwd < minimaleBuffer && maandTeller < 60) {
      maandTeller++;
      opgebouwd += spaarPerMaand;
      if (maandTeller % 3 === 0 || opgebouwd >= minimaleBuffer) {
        fases.push({
          fase: "Fase 1: Minimum buffer",
          maand: maandTeller,
          bedrag: Math.round(Math.min(opgebouwd, minimaleBuffer)),
          beschrijving: `€${Math.round(Math.min(opgebouwd, minimaleBuffer)).toLocaleString('nl-NL')} bereikt`,
        });
      }
    }

    if (opgebouwd >= minimaleBuffer && opgebouwd < aanbevolenBuffer) {
      while (opgebouwd < aanbevolenBuffer && maandTeller < 60) {
        maandTeller++;
        opgebouwd += spaarPerMaand;
        if (maandTeller % 3 === 0 || opgebouwd >= aanbevolenBuffer) {
          fases.push({
            fase: "Fase 2: Aanbevolen buffer",
            maand: maandTeller,
            bedrag: Math.round(Math.min(opgebouwd, aanbevolenBuffer)),
            beschrijving: `€${Math.round(Math.min(opgebouwd, aanbevolenBuffer)).toLocaleString('nl-NL')} bereikt`,
          });
        }
      }
    }

    // Advies
    let advies = "";
    if (huidig >= optimaleBuffer) {
      advies = "Uitstekend! Je hebt een gezonde financiële buffer. Overweeg nu te investeren of andere financiële doelen na te streven.";
    } else if (huidig >= aanbevolenBuffer) {
      advies = "Goed op weg! Je hebt een solide buffer. Blijf sparen tot de optimale buffer is bereikt.";
    } else if (huidig >= minimaleBuffer) {
      advies = "Je hebt de minimale buffer bereikt. Ga door met sparen om de aanbevolen buffer te bereiken voor meer financiële zekerheid.";
    } else {
      advies = "Bouw zo snel mogelijk een buffer op. Begin met €50-100 per maand en bouw richting de minimale buffer van 3 maanden.";
    }

    setResultaat({
      minimaleBuffer: Math.round(minimaleBuffer),
      aanbevolenBuffer: Math.round(aanbevolenBuffer),
      optimaleBuffer: Math.round(optimaleBuffer),
      onderdelen,
      maandKosten: kosten,
      huidigeBuffer: huidig,
      kloof: Math.round(kloof),
      advies,
      fases,
    });

    setTimeout(() => setIsCalculating(false), 150);
  }, [maandKosten, huidigeBuffer, risicoProfiel, inkomenszekerheid, kinderen, hypotheek]);

  useEffect(() => {
    const timer = setTimeout(() => {
      bereken();
    }, 300);
    return () => clearTimeout(timer);
  }, [bereken]);

  const reset = () => {
    setMaandKosten("3000");
    setHuidigeBuffer("2000");
    setRisicoProfiel("middel");
    setInkomenszekerheid("vast");
    setKinderen(0);
    setHypotheek(true);
    setResultaat(null);
  };

  const formatBedrag = (value: number) => {
    return value.toLocaleString("nl-NL");
  };

  const voortgang = resultaat ? Math.min(100, (resultaat.huidigeBuffer / resultaat.aanbevolenBuffer) * 100) : 0;

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
              <div className="p-3 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-lg">
                <PiggyBank className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="Buffer Calculator" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Financiële Buffer Calculator
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bereken hoeveel spaargeld je als financiële buffer nodig hebt. 
              Ontdek de ideale buffer voor noodsituaties en hoe je deze opbouwt.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Basisgegevens */}
            <motion.div className="card" variants={fadeInUp}>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Euro className="w-5 h-5" />
                Financiële Gegevens
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Maandelijkse vaste lasten
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      type="number"
                      value={maandKosten}
                      onChange={(e) => setMaandKosten(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 input"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Huidige spaargeld / buffer
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      type="number"
                      value={huidigeBuffer}
                      onChange={(e) => setHuidigeBuffer(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 input"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Persoonlijke situatie */}
            <motion.div className="card" variants={fadeInUp}>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Persoonlijke Situatie
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Inkomenszekerheid
                  </label>
                  <select
                    value={inkomenszekerheid}
                    onChange={(e) => setInkomenszekerheid(e.target.value as any)}
                    className="w-full px-4 py-3 input"
                  >
                    <option value="vast">Vast contract</option>
                    <option value="variabel">Variabel inkomen</option>
                    <option value="onzeker">Onzeker inkomen / ZZP</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Risicoprofiel
                  </label>
                  <select
                    value={risicoProfiel}
                    onChange={(e) => setRisicoProfiel(e.target.value as any)}
                    className="w-full px-4 py-3 input"
                  >
                    <option value="laag">Laag risico</option>
                    <option value="middel">Middel risico</option>
                    <option value="hoog">Hoog risico</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Kinderen</label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={kinderen}
                      onChange={(e) => setKinderen(parseInt(e.target.value))}
                      className="w-full px-4 py-2 input"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <input
                      type="checkbox"
                      id="hypotheek"
                      checked={hypotheek}
                      onChange={(e) => setHypotheek(e.target.checked)}
                      className="w-5 h-5 rounded"
                    />
                    <label htmlFor="hypotheek" className="text-sm font-medium cursor-pointer">
                      Hypotheek
                    </label>
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
                {/* Voortgang */}
                <div className="card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Je Buffer Doel
                    </h3>
                    <span className="text-2xl font-bold text-teal-600">
                      € {formatBedrag(resultaat.aanbevolenBuffer)}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Voortgang</span>
                      <span className="font-bold">{voortgang.toFixed(0)}%</span>
                    </div>
                    <div className="h-6 bg-muted rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-teal-500 to-emerald-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${voortgang}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>€ {formatBedrag(resultaat.huidigeBuffer)}</span>
                    <span>€ {formatBedrag(resultaat.aanbevolenBuffer)}</span>
                  </div>
                </div>

                {/* Drie buffers */}
                <div className="grid grid-cols-3 gap-4">
                  <div className={`card text-center ${resultaat.huidigeBuffer >= resultaat.minimaleBuffer ? "bg-green-500/10 border-green-500/30" : "bg-yellow-500/10 border-yellow-500/30"} border-2`}>
                    <p className="text-xs text-muted-foreground mb-1">Minimaal</p>
                    <p className="text-2xl font-bold">€ {formatBedrag(resultaat.minimaleBuffer)}</p>
                    <p className="text-xs text-muted-foreground mt-1">{resultaat.minimaleBuffer / resultaat.maandKosten} maanden</p>
                    {resultaat.huidigeBuffer >= resultaat.minimaleBuffer && (
                      <CheckCircle className="w-6 h-6 text-green-600 mx-auto mt-2" />
                    )}
                  </div>

                  <div className={`card text-center ${resultaat.huidigeBuffer >= resultaat.aanbevolenBuffer ? "bg-green-500/10 border-green-500/30" : ""} border-2 border-teal-500`}>
                    <p className="text-xs text-muted-foreground mb-1">Aanbevolen</p>
                    <p className="text-2xl font-bold text-teal-600">€ {formatBedrag(resultaat.aanbevolenBuffer)}</p>
                    <p className="text-xs text-muted-foreground mt-1">{resultaat.aanbevolenBuffer / resultaat.maandKosten} maanden</p>
                    {resultaat.huidigeBuffer >= resultaat.aanbevolenBuffer && (
                      <CheckCircle className="w-6 h-6 text-green-600 mx-auto mt-2" />
                    )}
                  </div>

                  <div className={`card text-center ${resultaat.huidigeBuffer >= resultaat.optimaleBuffer ? "bg-green-500/10 border-green-500/30" : ""} border-2`}>
                    <p className="text-xs text-muted-foreground mb-1">Optimaal</p>
                    <p className="text-2xl font-bold">€ {formatBedrag(resultaat.optimaleBuffer)}</p>
                    <p className="text-xs text-muted-foreground mt-1">{resultaat.optimaleBuffer / resultaat.maandKosten} maanden</p>
                    {resultaat.huidigeBuffer >= resultaat.optimaleBuffer && (
                      <CheckCircle className="w-6 h-6 text-green-600 mx-auto mt-2" />
                    )}
                  </div>
                </div>

                {/* Advies */}
                <div className={`card ${resultaat.huidigeBuffer >= resultaat.aanbevolenBuffer ? "bg-green-500/10 border-green-500/30" : "bg-blue-500/10 border-blue-500/30"}`}>
                  <div className="flex items-start gap-3">
                    {resultaat.huidigeBuffer >= resultaat.aanbevolenBuffer ? (
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    )}
                    <div>
                      <h3 className="font-bold">Advies</h3>
                      <p className="text-muted-foreground mt-1">{resultaat.advies}</p>
                    </div>
                  </div>
                </div>

                {/* Opbouwfases */}
                {resultaat.kloof > 0 && resultaat.fases.length > 0 && (
                  <div className="card">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Opbouwschema
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Hoe lang duurt het om de buffer op te bouwen (€200/maand)?
                    </p>
                    <div className="space-y-3">
                      {resultaat.fases.map((fase, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                          <div className={`p-2 rounded-full ${index === 0 ? "bg-yellow-500/20 text-yellow-600" : "bg-teal-500/20 text-teal-600"}`}>
                            <CheckCircle className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{fase.fase}</p>
                            <p className="text-sm text-muted-foreground">{fase.beschrijving}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">Maand {fase.maand}</p>
                            <p className="text-xs text-muted-foreground">
                              {Math.round(fase.bedrag / 200)} maanden sparen
                            </p>
                          </div>
                        </div>
                      ))}
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
                <h2 className="text-xl font-bold">Wat is een Financiële Buffer?</h2>
              </div>
              <div className="prose prose-sm text-muted-foreground max-w-none">
                <p className="mb-4">
                  Een <strong>financiële buffer</strong>, ook wel noodfonds genoemd, is geld dat je apart zet 
                  voor noodsituaties. Dit beschermt je tegen onverwachte uitgaven en financiële tegenslagen 
                  zoals tijdelijk inkomensverlies.
                </p>
                <p>
                  Zonder buffer kan een onverwachteauto, kapotte wasmachine, of ontslag directe financiële 
                  problemen veroorzaken. Daarom is een buffer de basis van elk financieel gezond huishouden.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-green-500" />
                </div>
                <h2 className="text-xl font-bold">Hoe Bouw Je een Buffer Op?</h2>
              </div>
              <div className="prose prose-sm text-muted-foreground max-w-none">
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Begin klein:</strong> Start met 1 maand buffer en bouw op naar 3-6 maanden</li>
                  <li><strong>Automatiseer:</strong> Stel een automatische overboeking in naar je spaarrekening</li>
                  <li><strong>Behandel als vaste last:</strong> Spaar elke maand, ook als het maar €50 is</li>
                  <li><strong>Niet aankomen:</strong> Raak je buffer alleen aan voor echte noodsituaties</li>
                  <li><strong>Gescheiden houden:</strong> Houd je buffer op een aparte rekening</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <SmartInlineAd slot={AD_SLOTS.toolInline} afterContent={true} />

          <FAQSection items={bufferFAQ} title="Veelgestelde vragen over financiële buffers" />

          <RelatedTools currentTool="Buffer Calculator" />

          <div className="mt-8 flex justify-center">
            <FeedbackForm toolName="Buffer Calculator" />
          </div>

          <BottomAd slot={AD_SLOTS.toolBottom} />
        </div>

        <StickyAd slot={AD_SLOTS.toolSidebar} />
      </div>
    </div>
  );
}
