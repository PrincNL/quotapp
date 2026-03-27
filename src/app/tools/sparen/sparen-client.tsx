"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, PiggyBank, ArrowRight, RotateCcw, Info, Calendar } from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";
import { ShareResult } from "@/components/share-result";
import { InlineAd, StickyAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import Link from "next/link";

interface Resultaat {
  totaalBedrag: number;
  totaleRente: number;
  rentePerJaar: number[];
  bedragPerJaar: number[];
}

const sparenFAQ = [
  {
    question: "Hoe werkt rente-op-rente?",
    answer: "Rente-op-rente betekent dat je rente ontvangt over je spaargeld én over de rente die je al hebt gekregen. Dit wordt ook wel samengestelde rente genoemd. Over tijd groeit je vermogen daardoor steeds sneller.",
  },
  {
    question: "Wat is een goede spaarrente in 2026?",
    answer: "In 2026 zijn spaarrentes weer aan het stijgen. Banken bieden gemiddeld 2-3% voor vrij opneembaar spaargeld. Voor vaste deposito's kan dit oplopen tot 3,5-4%. Vergelijk altijd actuele tarieven.",
  },
  {
    question: "Hoe lang moet ik sparen om mijn doel te bereiken?",
    answer: "Met onze calculator kun je eenvoudig zien hoe lang het duurt om je spaardoel te bereiken. Kies 'Bereken looptijd' als je een doelbedrag invult en wilt weten hoeveel tijd je nodig hebt.",
  },
  {
    question: "Is sparen nog wel de moeite waard?",
    answer: "Hoewel inflatie spaargeld kan uithollen, blijft sparen belangrijk voor een financieelBuffer. Richt op een combinatie: een deel inleg voor korte termijn doelen, en beleggen voor lange termijn. Raadpleeg een financieel adviseur voor persoonlijk advies.",
  },
  {
    question: "Wat is het verschil tussen vrij opneembaar en deposito?",
    answer: "Vrij opneembaar spaargeld kun je altijd opnemen zonder kosten. Bij een deposito (termijndepot) zet je geld vast voor een bepaalde periode tegen een hogere rente. Als je het eerder opneemt, betaal je vaak een boete.",
  },
  {
    question: "Moet ik starten met sparen of eerst aflossen?",
    answer: "Als je schulden hebt met hoge rente (zoals creditcard schuld), is aflossen vaak voordeliger dan sparen. Voor hypotheken en andere leningen met lage rente kan sparen verstandig zijn als buffer.",
  },
];

export function SparenCalculatorClient() {
  const [startBedrag, setStartBedrag] = useState("5000");
  const [maandInleg, setMaandInleg] = useState("200");
  const [rente, setRente] = useState("3.0");
  const [jaren, setJaren] = useState("10");
  const [resultaat, setResultaat] = useState<Resultaat | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const bereken = useCallback(() => {
    const start = parseFloat(startBedrag.replace(",", ".")) || 0;
    const maand = parseFloat(maandInleg.replace(",", ".")) || 0;
    const renteJaar = (parseFloat(rente) || 0) / 100;
    const looptijd = parseInt(jaren) || 0;

    if (start < 0 || maand < 0 || looptijd <= 0) {
      setResultaat(null);
      return;
    }

    setIsCalculating(true);

    const rentePerMaand = renteJaar / 12;
    let huidigBedrag = start;
    const rentePerJaar: number[] = [];
    const bedragPerJaar: number[] = [];
    let totaleRente = 0;

    for (let jaar = 1; jaar <= looptijd; jaar++) {
      for (let maand = 0; maand < 12; maand++) {
        const maandRente = huidigBedrag * rentePerMaand;
        totaleRente += maandRente;
        huidigBedrag += maandRente + maand;
      }
      rentePerJaar.push(Math.round(totaleRente * 100) / 100);
      bedragPerJaar.push(Math.round(huidigBedrag * 100) / 100);
    }

    setResultaat({
      totaalBedrag: Math.round(huidigBedrag * 100) / 100,
      totaleRente: Math.round(totaleRente * 100) / 100,
      rentePerJaar,
      bedragPerJaar,
    });

    setTimeout(() => setIsCalculating(false), 150);
  }, [startBedrag, maandInleg, rente, jaren]);

  useEffect(() => {
    const timer = setTimeout(bereken, 300);
    return () => clearTimeout(timer);
  }, [bereken]);

  const reset = () => {
    setStartBedrag("5000");
    setMaandInleg("200");
    setRente("3.0");
    setJaren("10");
    setResultaat(null);
  };

  const formatBedrag = (value: number) => {
    return value.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const resultaatText = resultaat
    ? `Start: €${startBedrag} + €${maandInleg}/maand @ ${rente}% = €${formatBedrag(resultaat.totaalBedrag)} na ${jaren} jaar (€${formatBedrag(resultaat.totaleRente)} rente)`
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
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                <PiggyBank className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="Sparen" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Sparen Calculator
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bereken hoeveel spaargeld je opbouwt met rente-op-rente effect. 
              Ontdek de kracht van samengestelde rente!
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Input Section */}
            <div className="card">
              <h2 className="text-lg font-bold mb-4">Spaar Details</h2>
              
              {/* Startbedrag */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Startbedrag (€)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                  <input
                    type="text"
                    value={startBedrag}
                    onChange={(e) => setStartBedrag(e.target.value.replace(/[^0-9.,]/g, ""))}
                    className="w-full pl-10 pr-4 py-4 text-lg input"
                  />
                </div>
              </div>

              {/* Maandelijkse inleg */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Maandelijkse inleg (€)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                  <input
                    type="text"
                    value={maandInleg}
                    onChange={(e) => setMaandInleg(e.target.value.replace(/[^0-9.,]/g, ""))}
                    className="w-full pl-10 pr-4 py-4 text-lg input"
                  />
                </div>
                <div className="flex gap-2 mt-2">
                  {[50, 100, 200, 500].map((bedrag) => (
                    <button
                      key={bedrag}
                      onClick={() => setMaandInleg(String(bedrag))}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        maandInleg === String(bedrag) ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      €{bedrag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rente */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Spaarrente (% per jaar)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={rente}
                  onChange={(e) => setRente(e.target.value)}
                  className="w-full px-4 py-4 text-lg input"
                />
                <div className="flex gap-2 mt-2">
                  {["2.0", "3.0", "3.5", "4.0"].map((r) => (
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
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    Spaarperiode (jaren)
                    <Calendar className="w-4 h-4" />
                  </span>
                </label>
                <input
                  type="number"
                  value={jaren}
                  onChange={(e) => setJaren(e.target.value)}
                  className="w-full px-4 py-4 text-lg input"
                />
                <div className="flex gap-2 mt-2">
                  {[5, 10, 15, 20, 30].map((j) => (
                    <button
                      key={j}
                      onClick={() => setJaren(String(j))}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        jaren === String(j) ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      {j}j
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
                
                {resultaat && (
                  <ShareResult 
                    toolName="Sparen Calculator" 
                    result={resultaatText}
                    url="/tools/sparen"
                  />
                )}
              </div>
            </div>

            {/* Results */}
            <div className="card">
              <h2 className="text-lg font-bold mb-4">Resultaat</h2>
              
              <AnimatePresence mode="wait">
                {resultaat ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-4"
                  >
                    {/* Eindbedrag */}
                    <motion.div 
                      className="p-6 bg-green-500/10 border-2 border-green-500/30 rounded-xl"
                      animate={isCalculating ? { scale: [1, 1.02, 1] } : {}}
                    >
                      <p className="text-sm text-muted-foreground mb-1">Totaal spaargeld na {jaren} jaar</p>
                      <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                        € {formatBedrag(resultaat.totaalBedrag)}
                      </p>
                    </motion.div>

                    <div className="flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    </div>

                    {/* Details */}
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Totaal ingelegd</span>
                        <span className="font-medium">
                          € {formatBedrag(parseFloat(startBedrag) + parseFloat(maandInleg) * 12 * parseInt(jaren))}
                        </span>
                      </div>
                      <div className="flex justify-between p-3 bg-green-500/10 rounded-lg">
                        <span className="text-muted-foreground">Rente verdiend</span>
                        <span className="font-bold text-green-600">€ {formatBedrag(resultaat.totaleRente)}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Rente % van inleg</span>
                        <span className="font-medium">
                          {Math.round((resultaat.totaleRente / (parseFloat(startBedrag) + parseFloat(maandInleg) * 12 * parseInt(jaren))) * 100)}%
                        </span>
                      </div>
                    </div>

                    {/* Jaar overzicht */}
                    {parseInt(jaren) <= 10 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Verloop per jaar:</p>
                        <div className="space-y-1 max-h-40 overflow-y-auto">
                          {resultaat.bedragPerJaar.map((bedrag, i) => (
                            <div key={i} className="flex justify-between text-sm p-2 bg-muted/50 rounded">
                              <span>Jaar {i + 1}</span>
                              <span className="font-medium">€ {formatBedrag(bedrag)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-muted-foreground py-12"
                  >
                    <PiggyBank className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Vul de gegevens in om te berekenen</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Ad */}
          <InlineAd slot={AD_SLOTS.toolInline} />

          {/* SEO Content */}
          <div className="mt-12 card">
            <h2 className="text-xl font-bold mb-4">Rente-op-Rente: De Kracht van Sparen</h2>
            <div className="prose prose-sm text-muted-foreground max-w-none">
              <p className="mb-4">
                De <strong>sparen calculator</strong> toont je het krachtige effect van rente-op-rente. 
                Wanneer je spaargeld elk jaar rente oplevert, en je die rente laat staan, 
                dan ontvang je in de jaren daarna ook rente over de verdiende rente.
              </p>
              <p className="mb-4">
                Albert Einstein noemde samengestelde rente ooit &quot;het achtste wereldwonder&quot;. 
                Hoe langer je spaart, hoe sterker dit effect wordt. Met onze calculator kun je eenvoudig 
                zien hoeveel je spaargeld kan groeien over 5, 10, 20 of zelfs 30 jaar.
              </p>
              <p>
                <strong>Voorbeeld:</strong> Als je €10.000 start en €200 per maand inlegt tegen 3% rente, 
                dan heb je na 20 jaar meer dan €75.000 opgebouwd - waarvan ruim €15.000 aan rente!
              </p>
            </div>
          </div>

          {/* FAQ */}
          <FAQSection items={sparenFAQ} title="Veelgestelde vragen over sparen" />

          {/* Related Tools */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Gerelateerde Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/tools/rente" className="card hover:border-primary/50 transition-colors text-center">
                <TrendingUp className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Rente Calculator</p>
              </Link>
              <Link href="/tools/lening" className="card hover:border-primary/50 transition-colors text-center">
                <TrendingUp className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Lening Calculator</p>
              </Link>
              <Link href="/tools/hypotheek" className="card hover:border-primary/50 transition-colors text-center">
                <TrendingUp className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Hypotheek</p>
              </Link>
              <Link href="/tools/procent" className="card hover:border-primary/50 transition-colors text-center">
                <TrendingUp className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Procent</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <StickyAd slot={AD_SLOTS.toolInline} />
      </div>
    </div>
  );
}
