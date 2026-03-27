"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, Euro, TrendingUp, TrendingDown, ArrowRight, RotateCcw, 
  Info, PiggyBank, Building, Sparkles, Star, Trophy, ShieldCheck
} from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";
import { ShareResult } from "@/components/share-result";
import { InlineAd, StickyAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import Link from "next/link";

interface SpaarRekening {
  naam: string;
  rente: number;
  type: "regulier" | "deposito" | "kind";
  minimum: number;
  maximum: number;
  info: string;
  kleur: string;
}

interface SpaarResultaat {
  startBedrag: number;
  EindbedragNaarKeuze: number;
  EindbedragBeste: number;
  EindbedragGemiddeld: number;
  VerschilBesteGemiddeld: number;
  renteNaarKeuze: number;
  renteBeste: number;
  renteGemiddeld: number;
}

const banken: SpaarRekening[] = [
  { naam: "Open Spaarrekening", rente: 2.85, type: "regulier", minimum: 0, maximum: 100000, info: "Hoogste rente", kleur: "green" },
  { naam: "Deposito 1 jaar", rente: 3.10, type: "deposito", minimum: 500, maximum: 1000000, info: "Vast voor 1 jaar", kleur: "blue" },
  { naam: "Deposito 2 jaar", rente: 2.95, type: "deposito", minimum: 500, maximum: 1000000, info: "Vast voor 2 jaar", kleur: "indigo" },
  { naam: "Deposito 5 jaar", rente: 2.80, type: "deposito", minimum: 500, maximum: 1000000, info: "Vast voor 5 jaar", kleur: "purple" },
  { naam: "Kinderspaarrekening", rente: 2.50, type: "kind", minimum: 0, maximum: 50000, info: "Voor kinderen t/m 17", kleur: "pink" },
  { naam: "Internet Spaarrekening", rente: 2.70, type: "regulier", minimum: 100, maximum: 250000, info: "Online beheer", kleur: "cyan" },
  { naam: "Vrije Spaarrekening", rente: 2.45, type: "regulier", minimum: 0, maximum: 50000, info: "Direct opneembaar", kleur: "orange" },
  { naam: "Zakelijke Spaarrekening", rente: 2.60, type: "regulier", minimum: 1000, maximum: 1000000, info: "Voor ondernemers", kleur: "yellow" },
];

const spaarFAQ = [
  {
    question: "Wat is het verschil tussen spaarrente en effectief rendement?",
    answer: "De spaarrente is het percentage dat je bank betaalt over je spaargeld. Het effectief rendement is hoger omdat je rente-op-rente krijgt (compounding). Bij 2% spaarrente en maandelijkse renteuitkering is het effectief rendement ongeveer 2,02% per jaar.",
  },
  {
    question: "Wat is de beste spaarrekening van dit moment?",
    answer: "De beste spaarrekening hangt af van je situatie. Voor dagelijks gebruik is een vrij opneembare rekening met hoge rente het beste. Voor langetermijnsparen kan een deposito met vaste looptijd een hogere rente bieden. Vergelijk altijd meerdere aanbieders.",
  },
  {
    question: "Is mijn spaargeld veilig?",
    answer: "Ja, in Nederland is spaargeld tot €100.000 per persoon per bank gegarandeerd via het Depositogarantiestelsel (DGS). Dit wordt uitgevoerd door De Nederlandsche Bank. Controleer of je bank onder Nederlands toezicht staat.",
  },
  {
    question: "Wat is het verschil tussen direct opneembaar en deposito?",
    answer: "Bij direct opneembare spaarrekeningen kun je je geld altijd opnemen zonder kosten. Bij deposito's spaar je voor een vaste periode (bijv. 1, 2 of 5 jaar) tegen een hogere rente, maar opnames zijn niet mogelijk zonder boete.",
  },
  {
    question: "Hoe wordt spaarrente belast in Nederland?",
    answer: "Spaarrente wordt in box 3 belast als vermogensrendementsheffing. Over vermogen boven de heffingsvrije vermogen (2026: €57.000 voor alone) betaal je ongeveer 1,03% vermogensbelasting over je totale vermogen.",
  },
  {
    question: "Wat is rente-op-rente?",
    answer: "Rente-op-rente (compound interest) betekent dat je ook rente ontvangt over de rente die je eerder hebt verdiend. Hierdoor groeit je spaargeld exponentieel. Dit effect wordt sterker naarmate je langer spaart en vaker rente ontvangt (maandelijks vs. jaarlijks).",
  },
  {
    question: "Moet ik belasting betalen over mijn spaarrente?",
    answer: "Ja, in Nederland wordt vermogen (inclusief spaargeld) in box 3 belast. Je betaalt echter geen belasting over de spaarrente direct, maar over je totale vermogen. Het belastingpercentage over vermogen is fors lager dan de spaarrente.",
  },
  {
    question: "Is nu een goed moment om te sparen?",
    answer: "Met de huidige rentestanden is sparen aantrekkelijker dan de afgelopen jaren. De rentes zijn gestegen naar levels die we sinds 2012 niet hebben gezien. Toch is het slim om te kijken of je geld beter besteed kan worden (aflossing schulden, investeringen).",
  },
];

export function SpaarrekeningVergelijkerClient() {
  const [startBedrag, setStartBedrag] = useState("25000");
  const [maandelijkseInleg, setMaandelijkseInleg] = useState("500");
  const [jaren, setJaren] = useState("10");
  const [geselecteerdeBank, setGeselecteerdeBank] = useState<string[]>(["Open Spaarrekening"]);
  const [resultaat, setResultaat] = useState<SpaarResultaat | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const bereken = useCallback(() => {
    const startNum = parseFloat(startBedrag.replace(",", ".")) || 0;
    const inlegNum = parseFloat(maandelijkseInleg.replace(",", ".")) || 0;
    const jarenNum = parseInt(jaren) || 1;

    if (startNum <= 0 && inlegNum <= 0) {
      setResultaat(null);
      return;
    }

    setIsCalculating(true);

    // Bereken voor geselecteerde bank
    const selectedBank = banken.find(b => b.naam === geselecteerdeBank[0]) || banken[0];
    const renteNaarKeuze = berekenEindbedrag(startNum, inlegNum, jarenNum, selectedBank.rente);

    // Bereken voor beste rente
    const besteRente = Math.max(...banken.map(b => b.rente));
    const renteBeste = berekenEindbedrag(startNum, inlegNum, jarenNum, besteRente);

    // Bereken voor gemiddelde rente
    const gemiddeldeRente = banken.reduce((sum, b) => sum + b.rente, 0) / banken.length;
    const renteGemiddeld = berekenEindbedrag(startNum, inlegNum, jarenNum, gemiddeldeRente);

    setResultaat({
      startBedrag: startNum,
      EindbedragNaarKeuze: renteNaarKeuze,
      EindbedragBeste: renteBeste,
      EindbedragGemiddeld: renteGemiddeld,
      VerschilBesteGemiddeld: renteBeste - renteGemiddeld,
      renteNaarKeuze: selectedBank.rente,
      renteBeste: besteRente,
      renteGemiddeld: gemiddeldeRente,
    });

    setTimeout(() => setIsCalculating(false), 150);
  }, [startBedrag, maandelijkseInleg, jaren, geselecteerdeBank]);

  const berekenEindbedrag = (start: number, maandInleg: number, j: number, rente: number): number => {
    const maandRente = rente / 100 / 12;
    const maanden = j * 12;
    
    // Eindbedrag met rente-op-rente voor startbedrag
    const startMetRente = start * Math.pow(1 + maandRente, maanden);
    
    // Toekomstige waarde van maandelijkse inleg
    const inlegMetRente = maandInleg * ((Math.pow(1 + maandRente, maanden) - 1) / maandRente);
    
    return startMetRente + inlegMetRente;
  };

  useEffect(() => {
    const timer = setTimeout(bereken, 300);
    return () => clearTimeout(timer);
  }, [bereken]);

  const reset = () => {
    setStartBedrag("25000");
    setMaandelijkseInleg("500");
    setJaren("10");
    setGeselecteerdeBank(["Open Spaarrekening"]);
    setResultaat(null);
  };

  const formatBedrag = (value: number) => {
    return value.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const resultText = resultaat
    ? `Start: €${startBedrag} | Inleg: €${maandelijkseInleg}/mnd | ${jaren} jaar | Spaarrente: ${resultaat.renteNaarKeuze}% | Eindbedrag: €${formatBedrag(resultaat.EindbedragNaarKeuze)}`
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
              <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
                <PiggyBank className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="Spaarrekening" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Spaarrekening Vergelijker
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Vergelijk de beste spaarrentes van Nederlandse banken. 
              Bereken hoeveel je spaargeld groeit met verschillende rentetarieven.
            </p>
          </motion.div>

          {/* Rentestand Info */}
          <motion.div 
            className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border border-green-200 dark:border-green-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-800 dark:text-green-200">Actuele spaarrentes 2026</p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  Hoogste rente: 3,10% | Gemiddelde: 2,75% | Direct opneembaar: 2,85%
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Input Section */}
            <div className="card space-y-6">
              <h2 className="text-lg font-bold">Spaargegevens</h2>
              
              {/* Startbedrag */}
              <div>
                <label htmlFor="startBedrag" className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    Startbedrag (€)
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">€</span>
                  <input
                    id="startBedrag"
                    type="text"
                    inputMode="decimal"
                    value={startBedrag}
                    onChange={(e) => setStartBedrag(e.target.value.replace(/[^0-9.,]/g, ""))}
                    placeholder="25.000"
                    className="w-full pl-10 pr-4 py-4 text-lg input"
                  />
                </div>
              </div>

              {/* Maandelijkse Inleg */}
              <div>
                <label htmlFor="maandelijkseInleg" className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    Maandelijkse Inleg (€)
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">€</span>
                  <input
                    id="maandelijkseInleg"
                    type="text"
                    inputMode="decimal"
                    value={maandelijkseInleg}
                    onChange={(e) => setMaandelijkseInleg(e.target.value.replace(/[^0-9.,]/g, ""))}
                    placeholder="500"
                    className="w-full pl-10 pr-4 py-4 text-lg input"
                  />
                </div>
              </div>

              {/* Jaren */}
              <div>
                <label htmlFor="jaren" className="block text-sm font-medium mb-2">
                  Spaarperiode (jaren)
                </label>
                <input
                  id="jaren"
                  type="number"
                  value={jaren}
                  onChange={(e) => setJaren(e.target.value)}
                  className="w-full px-4 py-4 text-lg input"
                />
                <div className="flex gap-2 mt-2">
                  {["1", "5", "10", "15", "20", "30"].map((j) => (
                    <button
                      key={j}
                      onClick={() => setJaren(j)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        jaren === j ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      {j === "30" ? "30j" : j === "20" ? "20j" : j === "15" ? "15j" : j === "10" ? "10j" : j === "5" ? "5j" : "1j"}
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-border" />

              {/* Bank Selectie */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  <span className="flex items-center gap-1">
                    Spaarrekening Type
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {banken.slice(0, 4).map((bank) => (
                    <button
                      key={bank.naam}
                      onClick={() => setGeselecteerdeBank([bank.naam])}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${
                        geselecteerdeBank.includes(bank.naam)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm">{bank.naam.split(" ")[0]}</p>
                        {bank.naam === "Open Spaarrekening" && <Star className="w-4 h-4 text-yellow-500" />}
                      </div>
                      <p className="text-lg font-bold text-primary">{bank.rente}%</p>
                      <p className="text-xs text-muted-foreground">{bank.info}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
                
                {resultaat && (
                  <ShareResult 
                    toolName="Spaarrekening Vergelijker" 
                    result={resultText}
                    url="/tools/spaarrekening"
                  />
                )}
              </div>
            </div>

            {/* Results */}
            <div className="card space-y-6">
              <h2 className="text-lg font-bold">Resultaat</h2>
              
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
                      <p className="text-sm text-muted-foreground mb-1">
                        Na {jaren} jaar ({resultaat.renteNaarKeuze}% rente)
                      </p>
                      <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                        € {formatBedrag(resultaat.EindbedragNaarKeuze)}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        + €{formatBedrag(resultaat.EindbedragNaarKeuze - resultaat.startBedrag - (parseFloat(maandelijkseInleg) * parseInt(jaren) * 12))} aan rente
                      </p>
                    </motion.div>

                    {/* Vergelijking */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Vergelijking</p>
                      
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm">Beste rente ({resultaat.renteBeste}%)</span>
                        </div>
                        <span className="font-bold">€ {formatBedrag(resultaat.EindbedragBeste)}</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-blue-500" />
                          <span className="text-sm">Gemiddelde ({resultaat.renteGemiddeld.toFixed(2)}%)</span>
                        </div>
                        <span className="font-medium">€ {formatBedrag(resultaat.EindbedragGemiddeld)}</span>
                      </div>
                    </div>

                    {/* Besparing */}
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl">
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-blue-800 dark:text-blue-200 mb-1">
                            Rente-voordeel vs gemiddelde
                          </p>
                          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            € {formatBedrag(resultaat.VerschilBesteGemiddeld)}
                          </p>
                          <p className="text-sm text-blue-600 dark:text-blue-400">
                            extra rente met de beste spaarrente
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Inleg Overzicht */}
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-muted-foreground">Overzicht</p>
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Totaal ingelegd</span>
                        <span className="font-medium">
                          € {formatBedrag(resultaat.startBedrag + (parseFloat(maandelijkseInleg) * parseInt(jaren) * 12))}
                        </span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Totaal rente verdiend</span>
                        <span className="font-bold text-green-600">
                          € {formatBedrag(resultaat.EindbedragNaarKeuze - resultaat.startBedrag - (parseFloat(maandelijkseInleg) * parseInt(jaren) * 12))}
                        </span>
                      </div>
                    </div>

                    {/* Veiligheid */}
                    <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl">
                      <ShieldCheck className="w-5 h-5 text-green-600" />
                      <div className="text-sm">
                        <p className="font-medium text-green-800 dark:text-green-200">Veilig sparen</p>
                        <p className="text-green-600 dark:text-green-400">
                          Spaargeld is gegarandeerd tot €100.000 via het Depositogarantiestelsel
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-muted-foreground py-12"
                  >
                    <PiggyBank className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Vul je spaargegevens in om te berekenen</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Top Spaarrentes */}
          <div className="mt-8 card">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Beste Spaarrentes 2026
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {banken.slice(0, 4).map((bank, i) => (
                <div 
                  key={bank.naam}
                  className={`p-4 rounded-xl border ${
                    i === 0 
                      ? "border-yellow-400 bg-yellow-50 dark:bg-yellow-950/30" 
                      : "border-border bg-muted/30"
                  }`}
                >
                  {i === 0 && (
                    <div className="flex items-center gap-1 text-yellow-600 text-xs font-bold mb-2">
                      <Star className="w-3 h-3 fill-current" />
                      HOOGSTE RENTE
                    </div>
                  )}
                  <p className="font-medium text-sm mb-1">{bank.naam}</p>
                  <p className="text-2xl font-bold text-primary">{bank.rente}%</p>
                  <p className="text-xs text-muted-foreground mt-1">{bank.info}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Ad */}
          <InlineAd slot={AD_SLOTS.toolInline} />

          {/* SEO Content */}
          <div className="mt-12 card">
            <h2 className="text-xl font-bold mb-4">Alles over Sparen en Spaarrentes in Nederland</h2>
            <div className="prose prose-sm text-muted-foreground max-w-none space-y-4">
              <p>
                Sparen is een van de meest fundamentele manieren om vermogen op te bouwen. In Nederland hebben we 
                een rijke spaartraditie en behoren we tot de koplopers in Europa als het gaat om spaarquote. 
                De <strong>spaarrente</strong> is de vergoeding die je ontvangt voor het uitlenen van je geld aan de bank. 
                Deze rente wordt uitgedrukt als percentage per jaar.
              </p>
              <p>
                De afgelopen jaren heeft de <strong>spaarrente</strong> een flinke opmars gemaakt. Waren we in 2022 
                gewend aan rentestanden dicht bij 0%, inmiddels zijn spaarrentes van 3% en meer weer realistisch. 
                Dit maakt sparen weer aantrekkelijk als alternatief voor beleggen, vooral voor mensen die 
                niet graag risico nemen met hun geld.
              </p>
              <p>
                Er zijn verschillende soorten <strong>spaarrekeningen</strong> beschikbaar in Nederland. De meest 
                bekende is de vrij opneembare spaarrekening, waarbij je altijd bij je geld kunt zonder kosten 
                of boetes. Daarnaast zijn er deposito's waarbij je geld voor een vaste periode vaststaat, 
                maar waarvoor je een hogere rente ontvangt.
              </p>
              <p>
                Onze <strong>spaarrente vergelijker</strong> helpt je om snel te zien welke spaarrekening het 
                beste bij jou past. Vul je startbedrag in, geef aan hoeveel je maandelijks wilt sparen, en 
                kies de spaarperiode. Je ziet direct hoeveel je spaargeld groeit en vergelijkt eenvoudig 
                de verschillende rentetarieven.
              </p>
              <p>
                Het is belangrijk om te begrijpen dat <strong>rente-op-rente</strong> een krachtig effect heeft 
                op je spaargeld. Dit betekent dat je niet alleen rente ontvangt over je oorspronkelijke inleg, 
                maar ook over de rente die je eerder hebt verdiend. Over een langere periode kan dit effect 
                fors zijn. Een bedrag van €10.000 dat 30 jaar lang 3% rente opbrengt, groeit bijvoorbeeld 
                naar ruim €24.000.
              </p>
              <p>
                Let wel op dat <strong>spaarrente belasting</strong> een deel van je rendement weer afsnoept. 
                In Nederland wordt vermogen in box 3 belast met vermogensbelasting. Over het deel boven 
                de heffingsvrije vermogen (€57.000 voor alleenstaanden in 2026) betaal je ongeveer 1,03% 
                over je totale vermogen. Dit betekent dat de netto opbrengst van je spaarrente lager is 
                dan de brutorente.
              </p>
              <p>
                De <strong>veiligheid van spaargeld</strong> is in Nederland goed geregeld via het 
                Depositogarantiestelsel (DGS). Dit stelsel garandeert spaargelden tot €100.000 per persoon 
                per bank. Mocht een bank failliet gaan, dan krijg je je geld binnen 7 werkdagen terug. 
                Dit maakt sparen bij een Nederlandse bank een van de veiligste vormen van vermogensbeheer.
              </p>
              <p>
                Wil je meer uit je spaargeld halen? Overweeg dan ook eens een <strong>deposito</strong> als je 
                je geld voor langere tijd kunt missen. Je sluit dan een contract af voor bijvoorbeeld 1, 2 
                of 5 jaar, waarbij je een hogere rente ontvangt dan bij een vrij opneembare rekening. 
                Houd er wel rekening mee dat je tijdens de looptijd niet bij je geld kunt.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <FAQSection items={spaarFAQ} title="Veelgestelde vragen over sparen" />

          {/* Related Tools */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Gerelateerde Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/tools/rente" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Rente</p>
              </Link>
              <Link href="/tools/lening" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Lening</p>
              </Link>
              <Link href="/tools/jkp-berekening" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">JKP</p>
              </Link>
              <Link href="/tools/procent" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Procent</p>
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
