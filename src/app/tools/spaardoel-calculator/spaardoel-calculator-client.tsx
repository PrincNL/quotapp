"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Euro, Calendar, TrendingUp, RotateCcw, BookOpen, Lightbulb, PiggyBank, CheckCircle, Clock, Save } from "lucide-react";
import { InlineAd, StickyAd, ToolTopBannerAd, BottomAd, SmartInlineAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import { RelatedTools } from "@/components/related-tools";
import { FeedbackForm } from "@/components/feedback-form";
import { FavoriteButton } from "@/components/favorite-button";

interface Spaardoel {
  id: string;
  naam: string;
  doelBedrag: number;
  huidigSpaargeld: number;
  maandSpaarBedrag: number;
  rentePercentage: number;
  eindDatum: string;
  maanden: number;
  gehaald: boolean;
}

interface Resultaat {
  benodigdeMaand: number;
  maanden: number;
  maandBedrag: number;
  renteOpbrengst: number;
  haalbaar: boolean;
  milestones: { maand: number; bedrag: number; datum: string }[];
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const spaardoelFAQ = [
  {
    question: "Hoe bereken je hoeveel je moet sparen?",
    answer: "De spaardoel calculator berekent hoeveel je maandelijks moet sparen om je doel te bereiken. Dit hangt af van: je spaardoel, je huidige spaargeld, de rente die je krijgt, en de tijd die je hebt.",
  },
  {
    question: "Wat is een realistische spaardoel?",
    answer: "Een goed spaardoel is specifiek, meetbaar en haalbaar. Bijvoorbeeld: '€5.000 spaargeld voor een vakantie over 2 jaar' of '€10.000 als noodfonds in 18 maanden'. Begin klein en bouw op.",
  },
  {
    question: "Hoeveel rente krijg je op spaargeld?",
    answer: "De spaarrente varieert per bank en hangt af van de marktrente. In 2024-2025 ligt de rente rond 2-3% voor vrij opneembaar spaargeld. Voor langere perioden kun je vaak een hogere rente krijgen.",
  },
  {
    question: "Wat als mijn spaardoel niet haalbaar is?",
    answer: "Als de berekening aangeeft dat je doel niet haalbaar is, kun je: de looptijd verlengen, het doelbedrag verlagen, of kijken of je meer per maand kunt sparen. Soms is het doel herzien nodig.",
  },
];

export function SpaardoelCalculatorClient() {
  const [doelBedrag, setDoelBedrag] = useState("10000");
  const [huidigSpaargeld, setHuidigSpaargeld] = useState("2000");
  const [rentePercentage, setRentePercentage] = useState("2.5");
  const [looptijdJaren, setLooptijdJaren] = useState(3);
  const [looptijdMaanden, setLooptijdMaanden] = useState(0);
  const [toonProgressie, setToonProgressie] = useState(true);

  const [resultaat, setResultaat] = useState<Resultaat | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Maandelijkse spaarbedrag berekenen
  const bereken = useCallback(() => {
    const doel = parseFloat(doelBedrag) || 0;
    const huidig = parseFloat(huidigSpaargeld) || 0;
    const rente = parseFloat(rentePercentage) / 100;
    const renteMaand = rente / 12;

    const totaleMaanden = (looptijdJaren * 12) + looptijdMaanden;

    if (doel <= 0 || totaleMaanden <= 0) {
      setResultaat(null);
      return;
    }

    setIsCalculating(true);

    // Bereken hoeveel je moet sparen
    // Met rente-op-rente
    let maandBedrag: number;
    const nogTeSparen = doel - huidig;

    if (nogTeSparen <= 0) {
      // Doel al bereikt!
      maandBedrag = 0;
    } else if (renteMaand > 0) {
      // Formules voor annuïteit met rente
      // FV = PV(1+r)^n + PMT * ((1+r)^n - 1) / r
      // Los op voor PMT
      const factor = Math.pow(1 + renteMaand, totaleMaanden);
      const pvFactor = huidig * factor;
      maandBedrag = (doel - pvFactor) * renteMaand / (factor - 1);
    } else {
      // Zonder rente
      maandBedrag = nogTeSparen / totaleMaanden;
    }

    maandBedrag = Math.max(0, maandBedrag);

    // Rente opbrengst berekenen
    const totaalIngelegd = huidig + (maandBedrag * totaleMaanden);
    const renteOpbrengst = doel - totaalIngelegd;

    // Milestones berekenen
    const milestones = [];
    if (toonProgressie && totaleMaanden > 0 && totaleMaanden <= 120) {
      const checkpunten = Math.min(10, totaleMaanden);
      for (let i = 1; i <= checkpunten; i++) {
        const m = Math.round((i / checkpunten) * totaleMaanden);
        const d = new Date();
        d.setMonth(d.getMonth() + m);
        
        let bedrag = huidig;
        for (let j = 0; j < m; j++) {
          bedrag = bedrag * (1 + renteMaand) + maandBedrag;
        }
        
        milestones.push({
          maand: m,
          bedrag: Math.round(bedrag),
          datum: d.toLocaleDateString('nl-NL', { month: 'short', year: 'numeric' }),
        });
      }
    }

    // Bepaal of haalbaar
    const haalbaar = maandBedrag <= (parseFloat(huidigSpaargeld) * 2); // Max 2x huidig spaargeld per maand

    setResultaat({
      benodigdeMaand: Math.round(maandBedrag),
      maanden: totaleMaanden,
      maandBedrag: Math.round(maandBedrag),
      renteOpbrengst: Math.round(Math.max(0, renteOpbrengst)),
      haalbaar,
      milestones,
    });

    setTimeout(() => setIsCalculating(false), 150);
  }, [doelBedrag, huidigSpaargeld, rentePercentage, looptijdJaren, looptijdMaanden, toonProgressie]);

  useEffect(() => {
    const timer = setTimeout(() => {
      bereken();
    }, 300);
    return () => clearTimeout(timer);
  }, [bereken]);

  const reset = () => {
    setDoelBedrag("10000");
    setHuidigSpaargeld("2000");
    setRentePercentage("2.5");
    setLooptijdJaren(3);
    setLooptijdMaanden(0);
    setResultaat(null);
  };

  const formatBedrag = (value: number) => {
    return value.toLocaleString("nl-NL");
  };

  const formatDatum = (maanden: number) => {
    const d = new Date();
    d.setMonth(d.getMonth() + maanden);
    return d.toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' });
  };

  const doelAlGehaald = parseFloat(huidigSpaargeld) >= parseFloat(doelBedrag);

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
              <div className="p-3 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-lg">
                <Target className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="Spaardoel Calculator" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Spaardoel Calculator
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bereken hoeveel je moet sparen om je financiële doel te bereiken. 
              Krijg inzicht in je spaarplan en houd je voortgang bij.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Spaardoel */}
            <motion.div className="card" variants={fadeInUp}>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Je Spaardoel
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Spaardoel (€)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      type="number"
                      value={doelBedrag}
                      onChange={(e) => setDoelBedrag(e.target.value)}
                      placeholder="10000"
                      className="w-full pl-10 pr-4 py-3 input"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Huidig spaargeld (€)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      type="number"
                      value={huidigSpaargeld}
                      onChange={(e) => setHuidigSpaargeld(e.target.value)}
                      placeholder="2000"
                      className="w-full pl-10 pr-4 py-3 input"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Spaarrente (%)
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
              </div>
            </motion.div>

            {/* Looptijd */}
            <motion.div className="card" variants={fadeInUp}>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Looptijd
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Jaren
                  </label>
                  <select
                    value={looptijdJaren}
                    onChange={(e) => setLooptijdJaren(parseInt(e.target.value))}
                    className="w-full px-4 py-3 input"
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((j) => (
                      <option key={j} value={j}>{j === 0 ? "Direct" : `${j} jaar`}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Extra maanden
                  </label>
                  <select
                    value={looptijdMaanden}
                    onChange={(e) => setLooptijdMaanden(parseInt(e.target.value))}
                    className="w-full px-4 py-3 input"
                    disabled={looptijdJaren >= 10}
                  >
                    {[0, 3, 6, 9].map((m) => (
                      <option key={m} value={m}>{m} maanden</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <input
                    type="checkbox"
                    id="progressie"
                    checked={toonProgressie}
                    onChange={(e) => setToonProgressie(e.target.checked)}
                    className="w-5 h-5 rounded"
                  />
                  <label htmlFor="progressie" className="text-sm font-medium cursor-pointer">
                    Toon spaarprogressie
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
            {resultaat && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 space-y-6"
              >
                {/* Doel al gehaald */}
                {doelAlGehaald && (
                  <div className="card bg-green-500/10 border-green-500/30">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-green-500/20 rounded-full">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-green-600">Doel Bereikt!</h3>
                        <p className="text-muted-foreground">
                          Gefeliciteerd! Je hebt je spaardoel al bereikt. 
                          Je houdt €{formatBedrag(parseFloat(huidigSpaargeld) - parseFloat(doelBedrag))} over.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Hoofdresultaat */}
                {!doelAlGehaald && (
                  <div className={`card ${resultaat.haalbaar ? "bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30" : "bg-yellow-500/10 border-yellow-500/30"} border-2`}>
                    <div className="text-center mb-6">
                      <p className="text-sm text-muted-foreground mb-1">
                        {resultaat.maandBedrag === 0 ? "Je spaardoel is al bereikt!" : "Spaar elke maand"}
                      </p>
                      <p className={`text-4xl font-bold ${resultaat.haalbaar ? "text-green-600" : "text-yellow-600"}`}>
                        {resultaat.maandBedrag === 0 ? "€ 0" : `€ ${formatBedrag(resultaat.maandBedrag)}`}
                      </p>
                      <p className="text-muted-foreground mt-2">
                        om {formatDatum(resultaat.maanden)} je doel te bereiken
                      </p>
                    </div>

                    {!resultaat.haalbaar && (
                      <div className="p-4 bg-yellow-500/10 rounded-lg text-center">
                        <p className="text-sm">
                          <strong>Let op:</strong> Dit spaarbedrag is hoog. 
                          Overweeg een langere looptijd of een lager spaardoel.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Details */}
                {!doelAlGehaald && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground mb-1">Nog te sparen</p>
                      <p className="text-xl font-bold">€ {formatBedrag(parseFloat(doelBedrag) - parseFloat(huidigSpaargeld))}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground mb-1">Rente opbrengst</p>
                      <p className="text-xl font-bold text-green-600">€ {formatBedrag(resultaat.renteOpbrengst)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground mb-1">Looptijd</p>
                      <p className="text-xl font-bold">
                        {Math.floor(resultaat.maanden / 12)}j {resultaat.maanden % 12}m
                      </p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg text-center">
                      <p className="text-xs text-muted-foreground mb-1">Einddatum</p>
                      <p className="text-xl font-bold">{formatDatum(resultaat.maanden).split(' ')[0]}</p>
                    </div>
                  </div>
                )}

                {/* Milestones */}
                {resultaat.milestones.length > 0 && (
                  <div className="card">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Spaarprogressie
                    </h3>
                    <div className="space-y-3">
                      {resultaat.milestones.map((milestone, index) => {
                        const doel = parseFloat(doelBedrag);
                        const percentage = Math.min(100, (milestone.bedrag / doel) * 100);
                        return (
                          <div key={milestone.maand}>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{milestone.datum}</span>
                              <span className="font-bold">€ {formatBedrag(milestone.bedrag)}</span>
                            </div>
                            <div className="h-3 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-pink-500 to-rose-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                              />
                            </div>
                            <p className="text-xs text-muted-foreground text-right">{percentage.toFixed(0)}%</p>
                          </div>
                        );
                      })}
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
                <h2 className="text-xl font-bold">Hoe Bereken Je Je Spaardoel?</h2>
              </div>
              <div className="prose prose-sm text-muted-foreground max-w-none">
                <p className="mb-4">
                  Een <strong>spaardoel calculator</strong> helpt je om te bepalen hoeveel je maandelijks 
                  moet sparen om jouw financiële doel te bereiken. Door realistische doelen te stellen 
                  en je voortgang bij te houden, wordt sparen een stuk makkelijker.
                </p>
                <p>
                  De calculator houdt rekening met rente-op-rente, zodat je een nauwkeurige schatting krijgt 
                  van hoe snel je spaargeld groeit. Dit motiveert om door te gaan met sparen.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-green-500" />
                </div>
                <h2 className="text-xl font-bold">Tips voor Succesvol Sparen</h2>
              </div>
              <div className="prose prose-sm text-muted-foreground max-w-none">
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Automatiseer:</strong> Stel een automatische overboeking in op de 1e van de maand</li>
                  <li><strong>Begin klein:</strong> Start met een haalbaar bedrag en bouw op</li>
                  <li><strong>Maak het zichtbaar:</strong> Houd je voortgang bij en viert mijlpalen</li>
                  <li><strong>Rente shoppen:</strong> Vergelijk spaarrentes voor het beste rendement</li>
                  <li><strong>Niet aankomen:</strong> Open een separate spaarrekening voor je doel</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <SmartInlineAd slot={AD_SLOTS.toolInline} afterContent={true} />

          <FAQSection items={spaardoelFAQ} title="Veelgestelde vragen over spaardoelen" />

          <RelatedTools currentTool="Spaardoel Calculator" />

          <div className="mt-8 flex justify-center">
            <FeedbackForm toolName="Spaardoel Calculator" />
          </div>

          <BottomAd slot={AD_SLOTS.toolBottom} />
        </div>

        <StickyAd slot={AD_SLOTS.toolSidebar} />
      </div>
    </div>
  );
}
