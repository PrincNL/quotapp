"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Euro, Calendar, ArrowRight, RotateCcw, Home, TrendingDown, BarChart3 } from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";
import { ShareResult } from "@/components/share-result";
import { InlineAd, StickyAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import Link from "next/link";

interface HypotheekResultaat {
  type: "annuiteit" | "lineair";
  maandlastenStart: number;
  maandlastenEind: number;
  totaalRente: number;
  totaalKosten: number;
  aflossingPerMaand: number;
  rentePerMaand: number[];
}

const hypotheekVergelijkerFAQ = [
  {
    question: "Wat is het verschil tussen annuïteit en lineair?",
    answer: "Bij een annuïteetenhypotheek betaal je elke maand hetzelfde bedrag (vaste lasten). Bij lineair los je elke maand een vast bedrag af, waardoor je lasten dalen maar start hoger zijn.",
  },
  {
    question: "Wat is voordeliger, annuïteit of lineair?",
    answer: "Over de hele looptijd betaal je bij lineair vaak minder rente omdat je sneller aflost. Annuïteit heeft lagere startlasten maar kost meer rente totaal.",
  },
  {
    question: "Hoeveel kan ik lenen voor een hypotheek?",
    answer: "Dat hangt af van je inkomen, partnerinkomen, en vaste lasten. Met NHG kun je tot €435.000 lenen (2026). Zonder NHG is de max afhankelijk van je inkomen.",
  },
  {
    question: "Wat is NHG?",
    answer: "NHG (Nationale Hypotheek Garantie) is een garantie dat bij gedwongen verkoop eventuele restschuld wordt kwijtgescholden. Dit kost 0.6% van de lening.",
  },
  {
    question: "Kan ik starterslening of andere regelingen gebruiken?",
    answer: "Ja, er zijn diverse regelingen zoals starterslening (gemeente afhankelijk), verbeterde hypotheek voor verduurzaming, en shared equity constructies.",
  },
  {
    question: "Hoe lang is de rente vaste periode?",
    answer: "Populaire keuzes zijn 5, 10, 15, 20 of 30 jaar vast. Hoe langer de rente vast, hoe hoger de rente maar meer zekerheid over je maandlasten.",
  },
];

export function HypotheekVergelijkerClient() {
  const [hypotheekBedrag, setHypotheekBedrag] = useState("300000");
  const [rente, setRente] = useState("3.8");
  const [looptijd, setLooptijd] = useState("360");
  const [resultaat, setResultaat] = useState<{ annuitiet: HypotheekResultaat; lineair: HypotheekResultaat } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const bereken = useCallback(() => {
    const bedrag = parseFloat(hypotheekBedrag);
    const rentePct = parseFloat(rente) / 100;
    const maanden = parseInt(looptijd);

    if (isNaN(bedrag) || isNaN(rentePct) || isNaN(maanden) || 
        bedrag <= 0 || rentePct < 0 || maanden <= 0) {
      setResultaat(null);
      return;
    }

    setIsCalculating(true);
    const rentePerMaand = rentePct / 12;

    // Annuïteit berekening
    const maandlasten = bedrag * (rentePerMaand * Math.pow(1 + rentePerMaand, maanden)) / 
                        (Math.pow(1 + rentePerMaand, maanden) - 1);
    const totaalAnnuiteit = maandlasten * maanden;
    const renteAnnuiteit = totaalAnnuiteit - bedrag;

    // Lineair berekening
    const aflossingPerMaand = bedrag / maanden;
    const rentePerMaandLineair: number[] = [];
    let totaalRenteLineair = 0;
    let resterendBedrag = bedrag;

    for (let i = 0; i < maanden; i++) {
      const renteDezeMaand = resterendBedrag * rentePerMaand;
      rentePerMaandLineair.push(renteDezeMaand);
      totaalRenteLineair += renteDezeMaand;
      resterendBedrag -= aflossingPerMaand;
    }

    const maandlastenLineairStart = aflossingPerMaand + rentePerMaandLineair[0];
    const maandlastenLineairEind = aflossingPerMaand + rentePerMaandLineair[maanden - 1];
    const totaalLineair = bedrag + totaalRenteLineair;

    setResultaat({
      annuitiet: {
        type: "annuiteit",
        maandlastenStart: Math.round(maandlasten * 100) / 100,
        maandlastenEind: Math.round(maandlasten * 100) / 100,
        totaalRente: Math.round(renteAnnuiteit * 100) / 100,
        totaalKosten: Math.round(totaalAnnuiteit * 100) / 100,
        aflossingPerMaand: Math.round((maandlasten - (bedrag * rentePerMaand)) * 100) / 100,
        rentePerMaand: [],
      },
      lineair: {
        type: "lineair",
        maandlastenStart: Math.round(maandlastenLineairStart * 100) / 100,
        maandlastenEind: Math.round(maandlastenLineairEind * 100) / 100,
        totaalRente: Math.round(totaalRenteLineair * 100) / 100,
        totaalKosten: Math.round(totaalLineair * 100) / 100,
        aflossingPerMaand: Math.round(aflossingPerMaand * 100) / 100,
        rentePerMaand: rentePerMaandLineair,
      },
    });

    setTimeout(() => setIsCalculating(false), 150);
  }, [hypotheekBedrag, rente, looptijd]);

  useEffect(() => {
    const timer = setTimeout(bereken, 300);
    return () => clearTimeout(timer);
  }, [bereken]);

  const reset = () => {
    setHypotheekBedrag("300000");
    setRente("3.8");
    setLooptijd("360");
    setResultaat(null);
  };

  const formatBedrag = (value: number) => {
    return value.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const verschil = resultaat ? resultaat.lineair.totaalRente - resultaat.annuitiet.totaalRente : 0;
  const verschilStart = resultaat ? resultaat.annuitiet.maandlastenStart - resultaat.lineair.maandlastenStart : 0;

  const resultText = resultaat
    ? `Annuïteit: €${formatBedrag(resultaat.annuitiet.maandlastenStart)}/mnd | Lineair: €${formatBedrag(resultaat.lineair.maandlastenStart)}/mnd | Rente verschil: €${formatBedrag(Math.abs(verschil))}`
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
              <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg">
                <Home className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="HypotheekVergelijker" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Hypotheek Vergelijker
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Vergelijk annuïteitenhypotheek met lineaire hypotheek en 
              ontdek welke het beste bij jouw situatie past.
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
              <h2 className="text-lg font-bold mb-4">Hypotheek Gegevens</h2>
              
              {/* Bedrag */}
              <div className="mb-4">
                <label htmlFor="bedrag" className="block text-sm font-medium mb-2">
                  Hypotheekbedrag (€)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">€</span>
                  <input
                    id="bedrag"
                    type="text"
                    inputMode="decimal"
                    value={hypotheekBedrag}
                    onChange={(e) => setHypotheekBedrag(e.target.value.replace(/[^0-9]/g, ""))}
                    className="w-full pl-10 pr-4 py-4 text-lg input"
                  />
                </div>
                <div className="flex gap-2 mt-2">
                  {["200000", "300000", "400000", "500000"].map((b) => (
                    <button
                      key={b}
                      onClick={() => setHypotheekBedrag(b)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        hypotheekBedrag === b ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      €{b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rente */}
              <div className="mb-4">
                <label htmlFor="rente" className="block text-sm font-medium mb-2">
                  Hypotheekrente (%)
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
                  {["3.2", "3.8", "4.2", "4.8"].map((r) => (
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
                <label htmlFor="looptijd" className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Looptijd (maanden)
                  </span>
                </label>
                <div className="flex gap-2">
                  {["180", "300", "360"].map((l) => (
                    <button
                      key={l}
                      onClick={() => setLooptijd(l)}
                      className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
                        looptijd === l ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      {l === "180" ? "15 jaar" : l === "300" ? "25 jaar" : "30 jaar"}
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
                    toolName="Hypotheek Vergelijker" 
                    result={resultText}
                    url="/tools/hypotheek-vergelijker"
                  />
                )}
              </div>
            </div>

            {/* Results */}
            <div className="card">
              <h2 className="text-lg font-bold mb-4">Vergelijking</h2>
              
              <AnimatePresence mode="wait">
                {resultaat ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-4"
                  >
                    {/* Annuïteit */}
                    <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                      <h3 className="font-bold mb-2 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Annuïteitenhypotheek
                      </h3>
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        € {formatBedrag(resultaat.annuitiet.maandlastenStart)}
                        <span className="text-sm font-normal text-muted-foreground"> /maand</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Vaste lasten • Rente: €{formatBedrag(resultaat.annuitiet.totaalRente)}
                      </div>
                    </div>

                    {/* Lineair */}
                    <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                      <h3 className="font-bold mb-2 flex items-center gap-2">
                        <TrendingDown className="w-4 h-4" />
                        Lineaire Hypotheek
                      </h3>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        € {formatBedrag(resultaat.lineair.maandlastenStart)}
                        <span className="text-sm font-normal text-muted-foreground"> /maand start</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Dalende lasten • Rente: €{formatBedrag(resultaat.lineair.totaalRente)}
                      </div>
                    </div>

                    {/* Verschil */}
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Totale rente verschil</span>
                        <span className={`text-xl font-bold ${verschil > 0 ? 'text-green-600' : 'text-red-500'}`}>
                          {verschil > 0 ? '-' : '+'}€ {formatBedrag(Math.abs(verschil))}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {verschil > 0 
                          ? 'Lineair is goedkoper over de hele looptijd'
                          : 'Annuïteit is goedkoper over de hele looptijd'}
                      </p>
                    </div>

                    {/* Startlasten verschil */}
                    <div className="flex justify-between p-3 bg-muted rounded-lg">
                      <span className="text-muted-foreground">Startlasten verschil</span>
                      <span className={`font-medium ${verschilStart > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {verschilStart > 0 ? '-' : '+'}€ {formatBedrag(Math.abs(verschilStart))}/mnd
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-muted-foreground py-12"
                  >
                    <Calculator className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Vul de gegevens in om te vergelijken</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Ad */}
          <InlineAd slot={AD_SLOTS.toolInline} />

          {/* SEO Content */}
          <div className="mt-12 card">
            <h2 className="text-xl font-bold mb-4">Annuïteit vs Lineaire Hypotheek</h2>
            <div className="prose prose-sm text-muted-foreground max-w-none">
              <p className="mb-4">
                Bij het kiezen van een hypotheek is de keuze tussen <strong>annuïteitenhypotheek</strong> en 
                <strong> lineaire hypotheek</strong> een belangrijke beslissing. Beide hebben voor- en nadelen.
              </p>
              <p className="mb-4">
                De <strong>annuïteitenhypotheek</strong> kent vaste maandlasten gedurende de hele rentevaste periode. 
                Je betaalt aan het begin meer rente en lost minder af. Naarmate de tijd vordert verschuift dit.
              </p>
              <p>
                De <strong>lineaire hypotheek</strong> heeft dalende maandlasten omdat je elke maand een vast bedrag 
                aflost. Je lost dus sneller af, wat totale rente bespaart, maar start met hogere maandlasten.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <FAQSection items={hypotheekVergelijkerFAQ} title="Veelgestelde vragen over hypotheek" />

          {/* Related Tools */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Gerelateerde Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/tools/hypotheek" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Hypotheek</p>
              </Link>
              <Link href="/tools/lineaire-hypotheek" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Lineair</p>
              </Link>
              <Link href="/tools/annuiteitenhypotheek" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Annuïteit</p>
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
