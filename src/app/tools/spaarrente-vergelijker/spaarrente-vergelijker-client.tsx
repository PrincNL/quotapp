"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, PiggyBank, TrendingUp, RotateCcw, Banknote, BarChart3 } from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";
import { ShareResult } from "@/components/share-result";
import { InlineAd, StickyAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import Link from "next/link";

interface BankOptie {
  naam: string;
  rente: number;
  kleur: string;
}

interface SpaarResultaat {
  bank: string;
  rente: number;
  eindbedrag: number;
  totaleRente: number;
}

const banken: BankOptie[] = [
  { naam: "ABN AMRO", rente: 2.35, kleur: "blue" },
  { naam: "ING", rente: 2.20, kleur: "orange" },
  { naam: "Rabobank", rente: 2.40, kleur: "green" },
  { naam: "ASN Bank", rente: 2.55, kleur: "teal" },
  { naam: "Nationale-Nederlanden", rente: 2.80, kleur: "purple" },
  { naam: "Knab", rente: 2.65, kleur: "pink" },
  { naam: "Bigbank", rente: 3.10, kleur: "red" },
  { naam: "Yapi Kredi", rente: 2.95, kleur: "yellow" },
];

const spaarrenteFAQ = [
  {
    question: "Waar kan ik het beste spaargeld stallen?",
    answer: "Vergelijk altijd meerdere banken. Online banken zoals Bigbank en Knab bieden vaak hogere rentes dan traditionele banken. Let ook op eventuele beperkingen zoals minimum- of maximumbedragen.",
  },
  {
    question: "Wat is het verschil tussen vrij opneembaar en depsparen?",
    answer: "Vrij opneembaar spaargeld heeft meestal een lagere rente maar je kunt direct bij je geld. Depspaarrekeningen hebben vaak hogere rentes maar je slot het geld vast voor een bepaalde periode.",
  },
  {
    question: "Is mijn spaargeld veilig?",
    answer: "Ja, tot €100.000 per persoon per bank is gegarandeerd via het depositogarantiestelsel. Nederlandse banken zijn verplicht aangesloten bij DGS.",
  },
  {
    question: "Hoe wordt spaarrente uitbetaald?",
    answer: "De meeste banken betalen spaarrente maandelijks, kwartaallijks of jaarlijks uit. Bij maandelijkse uitbetaling profiteer je van rente-op-rente.",
  },
  {
    question: "Wat is rente-op-rente?",
    answer: "Rente-op-rente (compound interest) betekent dat je over de ontvangen rente ook weer rente ontvangt. Dit zorgt voor een exponentiële groei van je spaargeld.",
  },
  {
    question: "Moet ik belasting betalen over spaarrente?",
    answer: "In Nederland valt spaarrente onder vermogensbelasting. Je betaalt hierover 36% vermogensbelasting over het rendement boven je heffingsvrij vermogen (2026: €57.685 voor alleinstaanden).",
  },
];

export function SpaarrenteVergelijkerClient() {
  const [startBedrag, setStartBedrag] = useState("10000");
  const [maandelijkseInleg, setMaandelijkseInleg] = useState("100");
  const [looptijd, setLooptijd] = useState("5");
  const [resultaat, setResultaat] = useState<SpaarResultaat[] | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const bereken = useCallback(() => {
    const start = parseFloat(startBedrag);
    const maandelijks = parseFloat(maandelijkseInleg);
    const jaren = parseInt(looptijd);

    if (isNaN(start) || isNaN(maandelijks) || isNaN(jaren) || 
        start < 0 || jaren <= 0) {
      setResultaat(null);
      return;
    }

    setIsCalculating(true);
    const maanden = jaren * 12;

    const resultaten: SpaarResultaat[] = banken.map((bank) => {
      const renteMaand = bank.rente / 100 / 12;
      let eindbedrag = start;
      let totaleRente = 0;

      for (let i = 0; i < maanden; i++) {
        totaleRente += eindbedrag * renteMaand;
        eindbedrag += eindbedrag * renteMaand + maandelijks;
      }

      totaleRente += (maandelijks * maanden);

      return {
        bank: bank.naam,
        rente: bank.rente,
        eindbedrag: Math.round(eindbedrag * 100) / 100,
        totaleRente: Math.round((eindbedrag - start - (maandelijks * maanden)) * 100) / 100,
      };
    });

    resultaten.sort((a, b) => b.eindbedrag - a.eindbedrag);
    setResultaat(resultaten);

    setTimeout(() => setIsCalculating(false), 150);
  }, [startBedrag, maandelijkseInleg, looptijd]);

  useEffect(() => {
    const timer = setTimeout(bereken, 300);
    return () => clearTimeout(timer);
  }, [bereken]);

  const reset = () => {
    setStartBedrag("10000");
    setMaandelijkseInleg("100");
    setLooptijd("5");
    setResultaat(null);
  };

  const formatBedrag = (value: number) => {
    return value.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const totaalInleg = parseFloat(startBedrag) + (parseFloat(maandelijkseInleg) * parseInt(looptijd) * 12);

  const resultText = resultaat
    ? `Spaarbedrag: €${startBedrag} + €${maandelijkseInleg}/mnd | ${looptijd} jaar | Beste: ${resultaat[0]?.bank} €${formatBedrag(resultaat[0]?.eindbedrag)}`
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
              <div className="p-3 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 text-white shadow-lg">
                <PiggyBank className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="SpaarrenteVergelijker" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Spaarrente Vergelijker
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Vergelijk spaarrentes van Nederlandse banken en bereken 
              wat jouw geld over een paar jaar waard is.
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
              <h2 className="text-lg font-bold mb-4">Spaar Gegevens</h2>
              
              {/* Startbedrag */}
              <div className="mb-4">
                <label htmlFor="start" className="block text-sm font-medium mb-2">
                  Startbedrag (€)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">€</span>
                  <input
                    id="start"
                    type="text"
                    inputMode="decimal"
                    value={startBedrag}
                    onChange={(e) => setStartBedrag(e.target.value.replace(/[^0-9]/g, ""))}
                    className="w-full pl-10 pr-4 py-4 text-lg input"
                  />
                </div>
              </div>

              {/* Maandelijkse inleg */}
              <div className="mb-4">
                <label htmlFor="maandelijks" className="block text-sm font-medium mb-2">
                  Maandelijkse inleg (€)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">€</span>
                  <input
                    id="maandelijks"
                    type="text"
                    inputMode="decimal"
                    value={maandelijkseInleg}
                    onChange={(e) => setMaandelijkseInleg(e.target.value.replace(/[^0-9]/g, ""))}
                    className="w-full pl-10 pr-4 py-4 text-lg input"
                  />
                </div>
              </div>

              {/* Looptijd */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    <Banknote className="w-4 h-4" />
                    Looptijd (jaren)
                  </span>
                </label>
                <div className="flex gap-2">
                  {["1", "3", "5", "10", "20"].map((l) => (
                    <button
                      key={l}
                      onClick={() => setLooptijd(l)}
                      className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${
                        looptijd === l ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      {l} {l === "1" ? "jaar" : "jaar"}
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
                    toolName="Spaarrente Vergelijker" 
                    result={resultText}
                    url="/tools/spaarrente-vergelijker"
                  />
                )}
              </div>
            </div>

            {/* Results */}
            <div className="card">
              <h2 className="text-lg font-bold mb-4">Resultaat per Bank</h2>
              
              <AnimatePresence mode="wait">
                {resultaat ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between p-2 bg-muted rounded-lg text-sm font-medium">
                      <span>Totaal ingelegd</span>
                      <span>€ {formatBedrag(totaalInleg)}</span>
                    </div>
                    
                    {resultaat.slice(0, 5).map((r, index) => (
                      <motion.div
                        key={r.bank}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-3 rounded-lg border ${
                          index === 0 
                            ? 'bg-green-500/10 border-green-500/30' 
                            : 'bg-muted border-transparent'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium">{r.bank}</span>
                            <span className="text-sm text-muted-foreground ml-2">
                              {r.rente.toFixed(2)}%
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">€ {formatBedrag(r.eindbedrag)}</div>
                            <div className="text-xs text-green-600 dark:text-green-400">
                              +€ {formatBedrag(r.totaleRente)} rente
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {resultaat.length > 5 && (
                      <div className="text-center text-sm text-muted-foreground pt-2">
                        + {resultaat.length - 5} meer banken
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
                    <Calculator className="w-12 h-12 mx-auto mb-3 opacity-50" />
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
            <h2 className="text-xl font-bold mb-4">Alles over Spaarrentes</h2>
            <div className="prose prose-sm text-muted-foreground max-w-none">
              <p className="mb-4">
                Met onze <strong>spaarrente vergelijker</strong> bereken je eenvoudig hoeveel jouw spaargeld 
                kan groeien bij verschillende banken. Vergelijk actuele tarieven van <strong>ABN AMRO</strong>, 
                <strong> ING</strong>, <strong>Rabobank</strong> en andere spaarbanken.
              </p>
              <p className="mb-4">
                De spaarrente is de laatste jaren flink gestegen. Waar je in 2022 nog amper rente kreeg, 
                bieden banken nu wieder 2-3% of meer. Dit maakt sparen weer aantrekkelijker.
              </p>
              <p>
                Houd bij het vergelijken niet alleen rekening met de rente, maar ook met zaken als 
                opzegtermijnen, minimum- en maximumbedragen, en eventuele actievoorwaarden.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <FAQSection items={spaarrenteFAQ} title="Veelgestelde vragen over sparen" />

          {/* Related Tools */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Gerelateerde Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/tools/sparen" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Sparen</p>
              </Link>
              <Link href="/tools/rente" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Rente</p>
              </Link>
              <Link href="/tools/inflatie" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Inflatie</p>
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
