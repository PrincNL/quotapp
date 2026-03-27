"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Percent, RotateCcw, ArrowRight, Info } from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";
import { ShareResult } from "@/components/share-result";
import { InlineAd, StickyAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import Link from "next/link";

type RenteType = "eenvoudig" | "samengesteld" | "krediet";

const renteFAQ = [
  {
    question: "Wat is het verschil tussen enkelvoudige en samengestelde rente?",
    answer: "Bij enkelvoudige rente wordt rente alleen berekend over het oorspronkelijke bedrag. Bij samengestelde rente (rente-op-rente) wordt rente ook berekend over de al verdiende rente. Dit leidt tot exponentiële groei.",
  },
  {
    question: "Wat is een goede rente voor sparen in 2026?",
    answer: "Voor vrij opneembaar spaargeld liggen rentetarieven momenteel tussen 2% en 3,5% per jaar. Voor deposito's met vaste looptijd kan dit oplopen tot 4%. Tarieven wijzigen regelmatig, vergelijk altijd actuele aanbiedingen.",
  },
  {
    question: "Hoe bereken je kredietrente?",
    answer: "Kredietrente wordt meestal uitgedrukt als JKP (Jaarlijks Kosten Percentage). Dit include naast de rente ook eventuele kosten. Onze calculator toont zowel de rente als het totale kostenplaatje.",
  },
  {
    question: "Wat is de formule voor rente berekenen?",
    answer: "Enkelvoudige rente: Rente = Hoofdsom × Rentevoet × Tijd. Samengestelde rente: Eindbedrag = Hoofdsom × (1 + Rentevoet)^Tijd. Onze calculator doet al het rekenwerk voor je!",
  },
  {
    question: "Hoeveel rente krijg ik op mijn spaargeld?",
    answer: "Dat hangt af van de bank, het type spaarrekening en het spaarbedrag. Je kunt spaarrentes vergelijken op vergelijkingssites. Hou ook rekening met inflatie - de echte rente is de nominale rente min de inflatie.",
  },
  {
    question: "Is de rente aftrekbaar?",
    answer: "In sommige gevallen is hypotheekrente aftrekbaar van de belasting. Voor andere leningen is rente in principe niet aftrekbaar. Raadpleeg de belastingdienst of een financieel adviseur voor jouw specifieke situatie.",
  },
];

export function RenteCalculatorClient() {
  const [type, setType] = useState<RenteType>("eenvoudig");
  const [hoofdsom, setHoofdsom] = useState("10000");
  const [rentevoet, setRentevoet] = useState("5");
  const [jaren, setJaren] = useState("5");
  const [resultaat, setResultaat] = useState<{
    rente: number;
    totaal: number;
    perJaar: { jaar: number; rente: number; totaal: number }[];
  } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const bereken = useCallback(() => {
    const hoofdsomNum = parseFloat(hoofdsom.replace(",", ".")) || 0;
    const renteNum = (parseFloat(rentevoet) || 0) / 100;
    const jarenNum = parseInt(jaren) || 0;

    if (hoofdsomNum <= 0 || jarenNum <= 0) {
      setResultaat(null);
      return;
    }

    setIsCalculating(true);

    let rente = 0;
    let totaal = hoofdsomNum;
    const perJaar: { jaar: number; rente: number; totaal: number }[] = [];

    for (let jaar = 1; jaar <= jarenNum; jaar++) {
      let jaarRente: number;

      if (type === "eenvoudig") {
        jaarRente = hoofdsomNum * renteNum;
        totaal = hoofdsomNum + (jaarRente * jaar);
      } else if (type === "samengesteld") {
        jaarRente = totaal * renteNum;
        totaal = totaal + jaarRente;
      } else {
        // Krediet: annuïteit
        const rentePerMaand = renteNum / 12;
        const maanden = jaar * 12;
        const maandlasten = hoofdsomNum * (rentePerMaand * Math.pow(1 + rentePerMaand, maanden)) / 
                            (Math.pow(1 + rentePerMaand, maanden) - 1);
        jaarRente = (maandlasten * maanden) - hoofdsomNum;
        totaal = maandlasten * maanden;
      }

      perJaar.push({
        jaar,
        rente: Math.round(jaarRente * 100) / 100,
        totaal: Math.round(totaal * 100) / 100,
      });

      if (jaar === jarenNum) {
        rente = type === "samengesteld" ? totaal - hoofdsomNum : 
                type === "krediet" ? jaarRente : 
                jaarRente * jaar;
      }
    }

    setResultaat({
      rente: Math.round(rente * 100) / 100,
      totaal: Math.round(totaal * 100) / 100,
      perJaar,
    });

    setTimeout(() => setIsCalculating(false), 150);
  }, [type, hoofdsom, rentevoet, jaren]);

  useEffect(() => {
    const timer = setTimeout(bereken, 300);
    return () => clearTimeout(timer);
  }, [bereken]);

  const reset = () => {
    setHoofdsom("10000");
    setRentevoet("5");
    setJaren("5");
    setResultaat(null);
  };

  const formatBedrag = (value: number) => {
    return value.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const resultaatText = resultaat
    ? `${type === "eenvoudig" ? "Enkelvoudige rente" : type === "samengesteld" ? "Samengestelde rente" : "Kredietaflossing"}: €${hoofdsom} @ ${rentevoet}% = €${formatBedrag(resultaat.totaal)} (€${formatBedrag(resultaat.rente)} rente)`
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
                <Percent className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="Rente" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Rente Calculator
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bereken rente-op-rente, kredietaflossingen en spaarrendement. 
              Kies het type berekening dat je nodig hebt.
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
              {/* Type Toggle */}
              <div className="flex gap-2 mb-6">
                {[
                  { key: "eenvoudig", label: "Enkelvoudig" },
                  { key: "samengesteld", label: "Samengesteld" },
                  { key: "krediet", label: "Krediet" },
                ].map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setType(t.key as RenteType)}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                      type === t.key
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <h2 className="text-lg font-bold mb-4">
                {type === "eenvoudig" && "Enkelvoudige Rente"}
                {type === "samengesteld" && "Samengestelde Rente (Rente-op-Rente)"}
                {type === "krediet" && "Kredietaflossing (Annuïteit)"}
              </h2>

              <p className="text-sm text-muted-foreground mb-6">
                {type === "eenvoudig" && "Rente wordt berekend over de originele hoofdsom."}
                {type === "samengesteld" && "Rente wordt ook berekend over de verdiende rente (rente-op-rente)."}
                {type === "krediet" && "Bereken maandelijkse aflossing en totale kosten van een lening."}
              </p>

              {/* Hoofdsom */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  {type === "krediet" ? "Leenbedrag (€)" : "Startbedrag (€)"}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                  <input
                    type="text"
                    value={hoofdsom}
                    onChange={(e) => setHoofdsom(e.target.value.replace(/[^0-9.,]/g, ""))}
                    className="w-full pl-10 pr-4 py-4 text-lg input"
                  />
                </div>
              </div>

              {/* Rentevoet */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Rentevoet (% per jaar)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={rentevoet}
                  onChange={(e) => setRentevoet(e.target.value)}
                  className="w-full px-4 py-4 text-lg input"
                />
                <div className="flex gap-2 mt-2">
                  {[2, 3, 5, 7, 10].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRentevoet(String(r))}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        rentevoet === String(r) ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      {r}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Jaren */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  {type === "krediet" ? "Looptijd (maanden)" : "Periode (jaren)"}
                </label>
                <input
                  type="number"
                  value={jaren}
                  onChange={(e) => setJaren(e.target.value)}
                  className="w-full px-4 py-4 text-lg input"
                />
                <div className="flex gap-2 mt-2">
                  {[1, 3, 5, 10, 20].map((j) => (
                    <button
                      key={j}
                      onClick={() => setJaren(String(j))}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        jaren === String(j) ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      {j}{type === "krediet" ? "m" : "j"}
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
                    toolName="Rente Calculator" 
                    result={resultaatText}
                    url="/tools/rente"
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
                      className="p-6 bg-purple-500/10 border-2 border-purple-500/30 rounded-xl"
                      animate={isCalculating ? { scale: [1, 1.02, 1] } : {}}
                    >
                      <p className="text-sm text-muted-foreground mb-1">
                        {type === "krediet" ? "Totaal te betalen" : "Eindbedrag na " + jaren + " " + (type === "krediet" ? "maanden" : "jaar")}
                      </p>
                      <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                        € {formatBedrag(resultaat.totaal)}
                      </p>
                    </motion.div>

                    <div className="flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-muted-foreground" />
                    </div>

                    {/* Details */}
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">
                          {type === "krediet" ? "Totaal kredietkosten" : "Totaal verdiende rente"}
                        </span>
                        <span className={`font-bold ${type === "krediet" ? "text-red-500" : "text-green-500"}`}>
                          € {formatBedrag(resultaat.rente)}
                        </span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Originele hoofdsom</span>
                        <span className="font-medium">€ {formatBedrag(parseFloat(hoofdsom))}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Rendement/Ratio</span>
                        <span className="font-medium">
                          {Math.round((resultaat.rente / parseFloat(hoofdsom)) * 100)}%
                        </span>
                      </div>
                    </div>

                    {/* Jaar overzicht */}
                    {parseInt(jaren) <= 10 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Verloop:</p>
                        <div className="space-y-1 max-h-40 overflow-y-auto">
                          {resultaat.perJaar.map((item) => (
                            <div key={item.jaar} className="flex justify-between text-sm p-2 bg-muted/50 rounded">
                              <span>{type === "krediet" ? "Maand " + (item.jaar * 12) : "Jaar " + item.jaar}</span>
                              <span className="font-medium">€ {formatBedrag(item.totaal)}</span>
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
                    <Percent className="w-12 h-12 mx-auto mb-3 opacity-50" />
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
            <h2 className="text-xl font-bold mb-4">Alles over Rente Berekenen</h2>
            <div className="prose prose-sm text-muted-foreground max-w-none">
              <p className="mb-4">
                Met onze <strong>rente calculator</strong> bereken je eenvoudig verschillende soorten renteberekeningen. 
                Of je nu wilt weten hoeveel spaarrente je ontvangt, of de kosten van een lening wilt uitrekenen - 
                onze tool helpt je snel op weg.
              </p>
              <h3 className="text-lg font-semibold mb-2">Enkelvoudige vs Samengestelde Rente</h3>
              <p className="mb-4">
                <strong>Enkelvoudige rente</strong> wordt berekend over alleen de hoofdsom. 
                Bij <strong>samengestelde rente</strong> (rente-op-rente) wordt rente ook berekend over 
                de eerder verdiende rente. Over lange periodes kan dit enorm schelen.
              </p>
              <p>
                <strong>Voorbeeld:</strong> €10.000 tegen 5% rente over 20 jaar:
                <br/>Enkelvoudig: €10.000 + (€500 × 20) = €20.000
                <br/>Samengesteld: €10.000 × (1,05)^20 = €26.532
              </p>
            </div>
          </div>

          {/* FAQ */}
          <FAQSection items={renteFAQ} title="Veelgestelde vragen over rente" />

          {/* Related Tools */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Gerelateerde Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/tools/sparen" className="card hover:border-primary/50 transition-colors text-center">
                <Percent className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Sparen</p>
              </Link>
              <Link href="/tools/lening" className="card hover:border-primary/50 transition-colors text-center">
                <Percent className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Lening</p>
              </Link>
              <Link href="/tools/hypotheek" className="card hover:border-primary/50 transition-colors text-center">
                <Percent className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Hypotheek</p>
              </Link>
              <Link href="/tools/procent" className="card hover:border-primary/50 transition-colors text-center">
                <Percent className="w-6 h-6 mx-auto mb-2 text-primary" />
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
