"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, Euro, Calendar, ArrowRight, RotateCcw, Info, 
  TrendingUp, CreditCard, PiggyBank, AlertCircle, CheckCircle2
} from "lucide-react";
import { FavoriteButton } from "@/components/favorite-button";
import { ShareResult } from "@/components/share-result";
import { InlineAd, StickyAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import Link from "next/link";

interface KredietResultaat {
  maximaleKredietlimiet: number;
  maandlasten: number;
  totaalRente: number;
  totaalKosten: number;
  percentageInkomen: number;
  risicoScore: "laag" | "middel" | "hoog";
}

const kredietFAQ = [
  {
    question: "Hoe wordt mijn kredietlimiet berekend?",
    answer: "Je kredietlimiet wordt berekend op basis van je maandelijkse netto inkomen, vaste lasten, en eventuele schulden. Banken gebruiken meestal de 5/35 regel: je totale schulden mogen niet hoger zijn dan 35% van je inkomen na aftrek van vaste lasten.",
  },
  {
    question: "Wat is een redelijke kredietlimiet?",
    answer: "Een redelijke kredietlimiet ligt tussen de 10% en 30% van je jaarinkomen. Voor een modaal inkomen (ongeveer €45.000 bruto) betekent dit €4.500 tot €13.500. Hogere limieten verhogen het risico op financiële problemen.",
  },
  {
    question: "Wat kost een krediet gemiddeld?",
    answer: "De kosten van een krediet variëren sterk. Persoonlijke leningen liggen vaak tussen 5% en 12% rente, terwijl doorlopend kredieten 7% tot 14% kunnen kosten. Het JKP (jaarlijks kostenpercentage) geeft de werkelijke kosten inclusief alle bijkomende kosten.",
  },
  {
    question: "Wanneer is een krediet verstandig?",
    answer: "Een krediet kan verstandig zijn voor grote aankopen die waarde behouden of toenemen, zoals een huis, auto, of opleiding. Het is minder verstandig voor consumptieve uitgaven of om andere schulden te financieren.",
  },
  {
    question: "Hoe kan ik mijn kredietaanvraag verbeteren?",
    answer: "Verbeter je kredietaanvraag door: 1) Je inkomen te verhogen of te stabiliseren, 2) Bestaande schulden af te lossen, 3) Je betalingsgeschiedenis te verbeteren, 4) Verschillende kredietaanbieders te vergelijken, 5) Eventueel een medeaanvrager toe te voegen.",
  },
  {
    question: "Wat is het verschil tussen doorlopend krediet en persoonlijke lening?",
    answer: "Een persoonlijke lening heeft een vast bedrag, vaste rente, en vaste maandlasten. Bij een doorlopend krediet kun je geld opnemen tot een limiet, betaal je alleen rente over het opgenomen bedrag, en kun je aflossingen doen wanneer je wilt.",
  },
  {
    question: "Kan ik mijn kredietlimiet verhogen?",
    answer: "Ja, de meeste kredietaanbieders staan verhoging van je limiet toe. Je moet hiervoor meestal een nieuwe kredietcheck doorlopen. Kredietverhogingen worden vaak actief aangeboden, maar wees voorzichtig - een hogere limiet betekent meer verleiding om uit te geven.",
  },
  {
    question: "Wat gebeurt er als ik mijn krediet niet kan afbetalen?",
    answer: "Bij betalingsproblemen kun je in een negatieve spiraal terechtkomen met extra kosten, rente-opslagen, en een slechte BKR-registratie. Neem bij financiële problemen tijdig contact op met je kredietaanbieder of schakel schuldhulpverlening in.",
  },
];

export function KredietCalculatorClient() {
  const [inkomen, setInkomen] = useState("");
  const [vasteLasten, setVasteLasten] = useState("");
  const [bestaandeSchulden, setBestaandeSchulden] = useState("");
  const [rente, setRente] = useState("8.9");
  const [looptijd, setLooptijd] = useState("60");
  const [resultaat, setResultaat] = useState<KredietResultaat | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const bereken = useCallback(() => {
    const inkomenNum = parseFloat(inkomen.replace(",", ".")) || 0;
    const lastenNum = parseFloat(vasteLasten.replace(",", ".")) || 0;
    const schuldenNum = parseFloat(bestaandeSchulden.replace(",", ".")) || 0;
    const renteNum = parseFloat(rente) / 100;
    const looptijdNum = parseInt(looptijd) || 60;

    if (inkomenNum <= 0) {
      setResultaat(null);
      return;
    }

    setIsCalculating(true);

    // Bereken maximale kredietlimiet (5/35 regel)
    const beschikbaarInkomen = inkomenNum - lastenNum;
    const maxSchuldenRatio = 0.35;
    const maxTotaleSchulden = beschikbaarInkomen * maxSchuldenRatio;
    const resterendeRuimte = maxTotaleSchulden - schuldenNum;
    const maximaleKredietlimiet = Math.max(0, Math.min(resterendeRuimte * 5, inkomenNum * 2));

    // Bereken maandlasten op basis van maximale kredietlimiet
    const maandRente = renteNum / 12;
    const maandlasten = maximaleKredietlimiet > 0 && renteNum > 0
      ? maximaleKredietlimiet * (maandRente * Math.pow(1 + maandRente, looptijdNum)) /
        (Math.pow(1 + maandRente, looptijdNum) - 1)
      : maximaleKredietlimiet / looptijdNum;
    
    const totaalKosten = maandlasten * looptijdNum;
    const totaalRente = totaalKosten - maximaleKredietlimiet;
    const percentageInkomen = inkomenNum > 0 ? (maandlasten / inkomenNum) * 100 : 0;

    // Bepaal risicoscore
    let risicoScore: "laag" | "middel" | "hoog" = "laag";
    if (percentageInkomen > 25) risicoScore = "hoog";
    else if (percentageInkomen > 15) risicoScore = "middel";

    setResultaat({
      maximaleKredietlimiet: Math.round(maximaleKredietlimiet),
      maandlasten: Math.round(maandlasten * 100) / 100,
      totaalRente: Math.round(totaalRente * 100) / 100,
      totaalKosten: Math.round(totaalKosten * 100) / 100,
      percentageInkomen: Math.round(percentageInkomen * 10) / 10,
      risicoScore,
    });

    setTimeout(() => setIsCalculating(false), 150);
  }, [inkomen, vasteLasten, bestaandeSchulden, rente, looptijd]);

  useEffect(() => {
    const timer = setTimeout(bereken, 300);
    return () => clearTimeout(timer);
  }, [bereken]);

  const reset = () => {
    setInkomen("");
    setVasteLasten("");
    setBestaandeSchulden("");
    setRente("8.9");
    setLooptijd("60");
    setResultaat(null);
  };

  const formatBedrag = (value: number) => {
    return value.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const resultText = resultaat
    ? `Inkomen: €${inkomen}/mnd | Max. kredietlimiet: €${formatBedrag(resultaat.maximaleKredietlimiet)} | Maandlasten: €${formatBedrag(resultaat.maandlasten)}`
    : "";

  const getRisicoColor = (score: string) => {
    switch (score) {
      case "laag": return "text-green-600 bg-green-100 dark:bg-green-900/30";
      case "middel": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30";
      case "hoog": return "text-red-600 bg-red-100 dark:bg-red-900/30";
      default: return "";
    }
  };

  const getRisicoIcon = (score: string) => {
    switch (score) {
      case "laag": return <CheckCircle2 className="w-5 h-5" />;
      case "middel": return <AlertCircle className="w-5 h-5" />;
      case "hoog": return <AlertCircle className="w-5 h-5" />;
      default: return null;
    }
  };

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
                <CreditCard className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="Krediet" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Krediet Calculator
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bereken je maximale kredietlimiet op basis van je inkomen en lasten. 
              Ontdek hoeveel je veilig kunt lenen en wat de maandelijkse kosten zijn.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Input Section */}
            <div className="card space-y-6">
              <h2 className="text-lg font-bold">Jouw Gegevens</h2>
              
              {/* Inkomen */}
              <div>
                <label htmlFor="inkomen" className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    Maandelijks Netto Inkomen (€)
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">€</span>
                  <input
                    id="inkomen"
                    type="text"
                    inputMode="decimal"
                    value={inkomen}
                    onChange={(e) => setInkomen(e.target.value.replace(/[^0-9.,]/g, ""))}
                    placeholder="3.500"
                    className="w-full pl-10 pr-4 py-4 text-lg input"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Dit is je netto inkomen na aftrek van belasting en pensioen
                </p>
              </div>

              {/* Vaste Lasten */}
              <div>
                <label htmlFor="vasteLasten" className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    Vaste Maandelijkse Lasten (€)
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">€</span>
                  <input
                    id="vasteLasten"
                    type="text"
                    inputMode="decimal"
                    value={vasteLasten}
                    onChange={(e) => setVasteLasten(e.target.value.replace(/[^0-9.,]/g, ""))}
                    placeholder="1.200"
                    className="w-full pl-10 pr-4 py-4 text-lg input"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Huur, hypotheek, verzekeringen, abonnementen
                </p>
              </div>

              {/* Bestaande Schulden */}
              <div>
                <label htmlFor="schulden" className="block text-sm font-medium mb-2">
                  <span className="flex items-center gap-1">
                    Bestaande Maandelijkse Schuldlasten (€)
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">€</span>
                  <input
                    id="schulden"
                    type="text"
                    inputMode="decimal"
                    value={bestaandeSchulden}
                    onChange={(e) => setBestaandeSchulden(e.target.value.replace(/[^0-9.,]/g, ""))}
                    placeholder="0"
                    className="w-full pl-10 pr-4 py-4 text-lg input"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Bestaande leningen, kredieten, alimentatie
                </p>
              </div>

              <hr className="border-border" />

              <h2 className="text-lg font-bold pt-2">Krediet Voorwaarden</h2>

              {/* Rente */}
              <div>
                <label htmlFor="rente" className="block text-sm font-medium mb-2">
                  Verwachte Rente (%)
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
                  {["6.9", "8.9", "10.9", "12.9"].map((r) => (
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
              <div>
                <label htmlFor="looptijd" className="block text-sm font-medium mb-2">
                  Gewenste Looptijd (maanden)
                </label>
                <input
                  id="looptijd"
                  type="number"
                  value={looptijd}
                  onChange={(e) => setLooptijd(e.target.value)}
                  className="w-full px-4 py-4 text-lg input"
                />
                <div className="flex gap-2 mt-2">
                  {["24", "36", "48", "60", "84"].map((m) => (
                    <button
                      key={m}
                      onClick={() => setLooptijd(m)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        looptijd === m ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      {m === "84" ? "7j" : m === "60" ? "5j" : m === "48" ? "4j" : m === "36" ? "3j" : "2j"}
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
                    toolName="Krediet Calculator" 
                    result={resultText}
                    url="/tools/krediet"
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
                    {/* Maximale Kredietlimiet */}
                    <motion.div 
                      className="p-6 bg-blue-500/10 border-2 border-blue-500/30 rounded-xl"
                      animate={isCalculating ? { scale: [1, 1.02, 1] } : {}}
                    >
                      <p className="text-sm text-muted-foreground mb-1">Maximale Kredietlimiet</p>
                      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        € {formatBedrag(resultaat.maximaleKredietlimiet)}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        op basis van 5/35 kredietregel
                      </p>
                    </motion.div>

                    <div className="flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-muted-foreground" />
                    </div>

                    {/* Maandlasten */}
                    <div className="p-5 bg-green-500/10 border border-green-500/30 rounded-xl">
                      <p className="text-sm text-muted-foreground mb-1">Geschatte Maandlasten</p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        € {formatBedrag(resultaat.maandlasten)}
                      </p>
                    </div>

                    {/* Risico Score */}
                    <div className={`flex items-center gap-3 p-4 rounded-xl ${getRisicoColor(resultaat.risicoScore)}`}>
                      {getRisicoIcon(resultaat.risicoScore)}
                      <div>
                        <p className="font-medium capitalize">{resultaat.risicoScore} Risico</p>
                        <p className="text-sm opacity-80">
                          {resultaat.percentageInkomen}% van je inkomen
                        </p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Totale Rente</span>
                        <span className="font-medium">€ {formatBedrag(resultaat.totaalRente)}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">Totale Kosten</span>
                        <span className="font-bold">€ {formatBedrag(resultaat.totaalKosten)}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="text-muted-foreground">JKP (indicatie)</span>
                        <span className="font-medium">{rente}%</span>
                      </div>
                    </div>

                    {/* Advies */}
                    <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl">
                      <div className="flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">Tip</p>
                          <p className="text-amber-700 dark:text-amber-300">
                            {resultaat.risicoScore === "laag" 
                              ? "Je hebt ruimte voor verantwoord lenen. Vergelijk altijd meerdere aanbieders voor de beste rente."
                              : resultaat.risicoScore === "middel"
                              ? "Wees voorzichtig met lenen. Overweeg een langere looptijd om maandlasten te verlagen."
                              : "Hoog risico gedetecteerd. Overweeg eerst schulden af te lossen voordat je nieuwe kredieten aangaat."}
                          </p>
                        </div>
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
                    <CreditCard className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Vul je gegevens in om te berekenen</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Ad */}
          <InlineAd slot={AD_SLOTS.toolInline} />

          {/* SEO Content */}
          <div className="mt-12 card">
            <h2 className="text-xl font-bold mb-4">Alles over Krediet en Lenen in Nederland</h2>
            <div className="prose prose-sm text-muted-foreground max-w-none space-y-4">
              <p>
                Een <strong>krediet</strong> is een financieel product waarbij je geld leent van een bank of kredietaanbieder 
                en dit later met rente terugbetaalt. In Nederland zijn er diverse vormen van krediet beschikbaar, elk met 
                eigen kenmerken, voordelen en nadelen. Het is belangrijk om de verschillen te begrijpen voordat je een 
                krediet afsluit.
              </p>
              <p>
                De meest voorkomende vormen van krediet in Nederland zijn de <strong>persoonlijke lening</strong> en het 
                <strong>doorlopend krediet</strong>. Bij een persoonlijke lening leen je een vast bedrag dat je in 
                vaste maandelijkse termijnen terugbetaalt. De rente staat vast, waardoor je precies weet waar je aan 
                toe bent. Bij een doorlopend krediet heb je meer flexibiliteit: je kunt opnemen, aflossen en opnieuw 
                opnemen tot een bepaalde limiet.
              </p>
              <p>
                De <strong>kredietlimiet</strong> die je kunt krijgen hangt af van verschillende factoren. Banken kijken 
                naar je inkomen, vaste lasten, en eventuele bestaande schulden. In Nederland wordt vaak de 5/35-regel 
                gehanteerd: je totale schulden (inclusief de nieuwe lening) mogen niet meer bedragen dan 35% van je 
                besteedbare inkomen. Dit beschermt jou als consument tegen overkreditering.
              </p>
              <p>
                De <strong>rente</strong> die je betaalt op een krediet varieert sterk en is afhankelijk van je 
                kredietaanbieder, het type krediet, de looptijd, en jouw persoonlijke situatie. Het is daarom slim 
                om altijd meerdere aanbieders te vergelijken. Het JKP (Jaarlijks Kostenpercentage) geeft de werkelijke 
                kosten van een krediet aan, inclusief alle bijkomende kosten zoals administratiekosten en verzekeringen.
              </p>
              <p>
                Onze <strong>krediet calculator</strong> helpt je om een indicatie te krijgen van je maximale 
                kredietlimiet. Vul je netto inkomen, vaste lasten en eventuele schulden in, en je ziet direct hoeveel 
                je ongeveer kunt lenen. De calculator gebruikt de standaard 5/35-regel die Nederlandse banken 
                hanteren bij kredietbeoordeling.
              </p>
              <p>
                Let op: deze calculator geeft een indicatie. De werkelijke kredietlimiet wordt bepaald na een 
                kredietcheck bij het BKR (Bureau Krediet Registratie) en een officiële aanvraag bij de kredietaanbieder. 
                Een negatieve BKR-registratie kan ervoor zorgen dat je geen krediet krijgt, of alleen tegen 
                hogere rentetarieven.
              </p>
              <p>
                <strong>Veilig lenen</strong> betekent dat je alleen leent wat je echt kunt missen en wat past 
                binnen je maandelijkse budget. Houd altijd een buffer aan voor onverwachte uitgaven. Als je twijfelt 
                over je financiële situatie, is het verstandig om advies te vragen aan een onafhankelijk 
                financieel adviseur of schuldhulpverleningsorganisatie.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <FAQSection items={kredietFAQ} title="Veelgestelde vragen over krediet" />

          {/* Related Tools */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Gerelateerde Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/tools/lening" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Lening</p>
              </Link>
              <Link href="/tools/jkp-berekening" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">JKP</p>
              </Link>
              <Link href="/tools/sparen" className="card hover:border-primary/50 transition-colors text-center">
                <PiggyBank className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Sparen</p>
              </Link>
              <Link href="/tools/hypotheek" className="card hover:border-primary/50 transition-colors text-center">
                <Calculator className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Hypotheek</p>
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
