"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Baby, Euro, TrendingUp, RotateCcw, BookOpen, Lightbulb, Calculator, Users, GraduationCap, Pizza, Shirt, Gamepad2 } from "lucide-react";
import { InlineAd, StickyAd, ToolTopBannerAd, BottomAd, SmartInlineAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import { RelatedTools } from "@/components/related-tools";
import { FeedbackForm } from "@/components/feedback-form";
import { FavoriteButton } from "@/components/favorite-button";

interface KostenPerFase {
  fase: string;
  jaren: number;
  maandKosten: number;
  totaal: number;
  categorieën: { naam: string; bedrag: number }[];
}

interface Resultaat {
  totaleKosten: number;
  kostenPerFase: KostenPerFase[];
  maandKostenGemiddeld: number;
  duursteFase: string;
  advies: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const kinderkostenFAQ = [
  {
    question: "Wat kost het gemiddeld om een kind op te voeden?",
    answer: "Het NIBUD schat de kosten voor één kind op gemiddeld €600-700 per maand (2024). Dit is exclusief huisvesting en kinderopvang. De kosten zijn afhankelijk van leeftijd, inkomen en levensstijl.",
  },
  {
    question: "Welke kosten zijn er allemaal?",
    answer: "De kosten van een kind zijn onder te verdelen in: voeding, kleding, persoonlijke verzorging, hobby's en sport, vervoer, uitjes, schoolkosten, zakgeld, en vanaf adolescentie vaak hogere uitgaven aan tech en kleding.",
  },
  {
    question: "Hoeveel duurder wordt het als kinderen ouder worden?",
    answer: "Baby's zijn relatief goedkoop (€300-400 p/mnd). Kleuters kosten iets meer. Pubers en tieners zijn het duurst (€700-900 p/mnd) door hogere eisen aan kleding, telefoon, uitgaan en studiekosten.",
  },
  {
    question: "Zijn er subsidies voor kinderopvang?",
    answer: "Ja, er is een kinderopvangtoeslag van de belastingdienst. De hoogte hangt af van je inkomen en of je werkt. De overheid vergoedt 33-96% van de kosten, afhankelijk van je inkomen.",
  },
  {
    question: "Moet ik budgetteren voor studiekosten?",
    answer: "Ja, vanaf 18 jaar kunnen studiekosten flink oplopen. Denk aan collegegeld (€2.300/jaar), studiemateriaal, en leefgeld. Overweeg een studiespaarplan of belegging voor deze kosten.",
  },
];

export function KostenKindCalculatorClient() {
  const [aantalKinderen, setAantalKinderen] = useState(1);
  const [inkomen, setInkomen] = useState("60000");
  const [leeftijdKind1, setLeeftijdKind1] = useState(5);
  const [leeftijdKind2, setLeeftijdKind2] = useState(8);
  const [leeftijdKind3, setLeeftijdKind3] = useState(12);
  const [inclStudie, setInclStudie] = useState(true);
  const [kinderOpvang, setKinderOpvang] = useState(true);
  const [maandOpvang, setMaandOpvang] = useState("800");

  const [resultaat, setResultaat] = useState<Resultaat | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const bereken = useCallback(() => {
    const ink = parseFloat(inkomen) || 0;

    // Bepaal leeftijden van kinderen
    const kinderen = [];
    if (aantalKinderen >= 1) kinderen.push(leeftijdKind1);
    if (aantalKinderen >= 2) kinderen.push(leeftijdKind2);
    if (aantalKinderen >= 3) kinderen.push(leeftijdKind3);

    if (kinderen.length === 0) {
      setResultaat(null);
      return;
    }

    setIsCalculating(true);

    // Basis kosten per leeftijdsfase (per kind, per maand)
    const kostenPerFase = kinderen.map((leeftijd) => {
      let basisKosten = 0;
      let categorieën: { naam: string; bedrag: number }[] = [];

      if (leeftijd <= 4) {
        // Baby/peuter
        basisKosten = 350;
        categorieën = [
          { naam: "Voeding", bedrag: 120 },
          { naam: "Kleding", bedrag: 60 },
          { naam: "Verzorging", bedrag: 50 },
          { naam: "Speelgoed", bedrag: 40 },
          { naam: "Zorgverzekering", bedrag: 80 },
        ];
      } else if (leeftijd <= 11) {
        // Kind
        basisKosten = 500;
        categorieën = [
          { naam: "Voeding", bedrag: 150 },
          { naam: "Kleding", bedrag: 80 },
          { naam: "School/Activiteiten", bedrag: 100 },
          { naam: "Sport/Hobby", bedrag: 70 },
          { naam: "Vervoer", bedrag: 50 },
          { naam: "Overig", bedrag: 50 },
        ];
      } else {
        // Puber/tiener
        basisKosten = 700;
        categorieën = [
          { naam: "Voeding", bedrag: 180 },
          { naam: "Kleding", bedrag: 120 },
          { naam: "Telefoon/Tech", bedrag: 80 },
          { naam: "Uitgaan/Hobby", bedrag: 120 },
          { naam: "School/Materialen", bedrag: 100 },
          { naam: "Zakgeld", bedrag: 100 },
        ];
      }

      const faseNaam = leeftijd <= 4 ? "Baby/Peuter (0-4)" : leeftijd <= 11 ? "Kind (5-11)" : "Puber (12-18)";

      return {
        fase: faseNaam,
        jaren: 18 - leeftijd,
        maandKosten: basisKosten,
        totaal: Math.round(basisKosten * 12 * (18 - leeftijd)),
        categorieën,
      };
    });

    // Kinderopvang toevoegen (tot 12 jaar gemiddeld)
    let opvangKostenTotaal = 0;
    if (kinderOpvang) {
      const opvangMaand = parseFloat(maandOpvang) || 0;
      kinderen.forEach((leeftijd) => {
        if (leeftijd < 12) {
          const maandenOpvang = (12 - leeftijd) * 12;
          opvangKostenTotaal += opvangMaand * maandenOpvang;
        }
      });
    }

    // Studiekosten toevoegen (18-24 jaar gemiddeld)
    let studieKostenTotaal = 0;
    if (inclStudie) {
      kinderen.forEach((leeftijd) => {
        if (leeftijd < 18) {
          // 6 jaar studie gemiddeld
          const studieJaren = 6;
          studieKostenTotaal += (2300 + 600 * 12) * studieJaren; // Collegegeld + leefgeld
        }
      });
    }

    // Kinderbijslag aftrekken (€260/3mnd per kind)
    const kinderbijslag = kinderen.length * (260 / 3) * 12 * 18;

    // Totaal berekenen
    const totaalPerKind = kostenPerFase.reduce((sum, f) => sum + f.totaal, 0);
    const totaleKosten = (totaalPerKind * kinderen.length) + opvangKostenTotaal + studieKostenTotaal - kinderbijslag;

    // Gemiddelde maandkosten
    const totaleJaren = kinderen.length > 0 ? Math.max(...kinderen.map(k => 18)) : 0;
    const maandKostenGemiddeld = totaleJaren > 0 ? Math.round(totaleKosten / (totaleJaren * 12)) : 0;

    // Duurste fase
    const duursteFase = kostenPerFase.reduce((max, f) => f.maandKosten > max.maandKosten ? f : max, kostenPerFase[0]).fase;

    // Advies
    let advies = "";
    if (totaleKosten > ink * 10) {
      advies = "De opvoedkosten zijn aanzienlijk. Begin vroeg met sparen en overweeg budgetteren per categorie.";
    } else if (totaleKosten > ink * 5) {
      advies = "De kosten zijn goed te overzien. Plan financieel voor de duurdere puberfase.";
    } else {
      advies = "Met slim budgetteren zijn de kosten goed te dragen. Gebruik tweedehands en vergelijk aanbieders.";
    }

    setResultaat({
      totaleKosten: Math.round(totaleKosten),
      kostenPerFase,
      maandKostenGemiddeld,
      duursteFase,
      advies,
    });

    setTimeout(() => setIsCalculating(false), 150);
  }, [aantalKinderen, inkomen, leeftijdKind1, leeftijdKind2, leeftijdKind3, inclStudie, kinderOpvang, maandOpvang]);

  useEffect(() => {
    const timer = setTimeout(() => {
      bereken();
    }, 300);
    return () => clearTimeout(timer);
  }, [bereken]);

  const reset = () => {
    setAantalKinderen(1);
    setInkomen("60000");
    setLeeftijdKind1(5);
    setLeeftijdKind2(8);
    setLeeftijdKind3(12);
    setInclStudie(true);
    setKinderOpvang(true);
    setMaandOpvang("800");
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
              <div className="p-3 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-lg">
                <Baby className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="Kosten Kind Calculator" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Kosten Kind Calculator
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bereken de totale kosten voor het opvoeden van je kind(eren). 
              Van baby tot student, krijg inzicht in wat je te wachten staat.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Basisgegevens */}
            <motion.div className="card" variants={fadeInUp}>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Aantal & Leeftijd
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Aantal kinderen
                  </label>
                  <select
                    value={aantalKinderen}
                    onChange={(e) => setAantalKinderen(parseInt(e.target.value))}
                    className="w-full px-4 py-3 input"
                  >
                    <option value={1}>1 kind</option>
                    <option value={2}>2 kinderen</option>
                    <option value={3}>3 kinderen</option>
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Kind 1 leeftijd</label>
                    <input
                      type="number"
                      min="0"
                      max="17"
                      value={leeftijdKind1}
                      onChange={(e) => setLeeftijdKind1(parseInt(e.target.value))}
                      className="w-full px-4 py-2 input"
                    />
                  </div>
                  {aantalKinderen >= 2 && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">Kind 2 leeftijd</label>
                      <input
                        type="number"
                        min="0"
                        max="17"
                        value={leeftijdKind2}
                        onChange={(e) => setLeeftijdKind2(parseInt(e.target.value))}
                        className="w-full px-4 py-2 input"
                      />
                    </div>
                  )}
                  {aantalKinderen >= 3 && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">Kind 3 leeftijd</label>
                      <input
                        type="number"
                        min="0"
                        max="17"
                        value={leeftijdKind3}
                        onChange={(e) => setLeeftijdKind3(parseInt(e.target.value))}
                        className="w-full px-4 py-2 input"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Huishoudinkomen (per jaar)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      type="number"
                      value={inkomen}
                      onChange={(e) => setInkomen(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 input"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Opties */}
            <motion.div className="card" variants={fadeInUp}>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Opties
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <input
                    type="checkbox"
                    id="kinderOpvang"
                    checked={kinderOpvang}
                    onChange={(e) => setKinderOpvang(e.target.checked)}
                    className="w-5 h-5 rounded"
                  />
                  <label htmlFor="kinderOpvang" className="text-sm font-medium cursor-pointer">
                    Inclusief kinderopvang
                  </label>
                </div>

                {kinderOpvang && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Maandelijkse opvangkosten
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                      <input
                        type="number"
                        value={maandOpvang}
                        onChange={(e) => setMaandOpvang(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 input"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <input
                    type="checkbox"
                    id="inclStudie"
                    checked={inclStudie}
                    onChange={(e) => setInclStudie(e.target.checked)}
                    className="w-5 h-5 rounded"
                  />
                  <label htmlFor="inclStudie" className="text-sm font-medium cursor-pointer">
                    Inclusief studiekosten (18-24 jaar)
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
                {/* Hoofdresultaat */}
                <div className="card bg-gradient-to-br from-pink-500/10 to-rose-500/10 border-pink-500/30">
                  <div className="text-center mb-6">
                    <p className="text-sm text-muted-foreground mb-1">
                      Totale opvoedkosten ({aantalKinderen} kind{aantalKinderen > 1 ? "eren" : ""})
                    </p>
                    <p className="text-4xl font-bold text-pink-600">
                      € {formatBedrag(resultaat.totaleKosten)}
                    </p>
                    <p className="text-muted-foreground mt-2">
                      tot 18 jaar (excl. inflatie)
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-background/50 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground mb-1">Gemiddeld p.m.</p>
                      <p className="text-xl font-bold">€ {formatBedrag(resultaat.maandKostenGemiddeld)}</p>
                    </div>
                    <div className="p-4 bg-background/50 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground mb-1">Duurste fase</p>
                      <p className="text-xl font-bold">{resultaat.duursteFase.split(" ")[0]}</p>
                    </div>
                    <div className="p-4 bg-background/50 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground mb-1">Per kind</p>
                      <p className="text-xl font-bold">€ {formatBedrag(Math.round(resultaat.totaleKosten / aantalKinderen))}</p>
                    </div>
                  </div>
                </div>

                {/* Advies */}
                <div className="card bg-blue-500/10 border-blue-500/30">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold">Financieel Advies</h3>
                      <p className="text-muted-foreground mt-1">{resultaat.advies}</p>
                    </div>
                  </div>
                </div>

                {/* Kosten per fase */}
                {resultaat.kostenPerFase.length > 0 && (
                  <div className="card">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Kostenverwachting per kind
                    </h3>
                    <div className="space-y-4">
                      {resultaat.kostenPerFase.map((fase, index) => (
                        <div key={index} className="p-4 bg-muted rounded-lg">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-medium">{fase.fase}</h4>
                            <span className="font-bold">€ {fase.maandKosten}/mnd</span>
                          </div>
                          <div className="space-y-2">
                            {fase.categorieën.map((cat, i) => (
                              <div key={i} className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{cat.naam}</span>
                                <span>€ {cat.bedrag}</span>
                              </div>
                            ))}
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
                <h2 className="text-xl font-bold">Wat Kosten Kinderen Echt?</h2>
              </div>
              <div className="prose prose-sm text-muted-foreground max-w-none">
                <p className="mb-4">
                  De <strong>kosten voor het opvoeden van een kind</strong> worden vaak onderschat. 
                  Volgens het NIBUD kost een kind gemiddeld €200.000 tot €300.000 tot 18 jaar, 
                  exclusief studiekosten en kinderopvang.
                </p>
                <p>
                  De kosten zijn niet lineair: baby&apos;s zijn relatief goedkoop, maar zodra kinderen 
                  ouder worden en meer activiteiten en technologie nodig hebben, lopen de kosten flink op.
                </p>
              </div>
            </div>
          </motion.div>

          <SmartInlineAd slot={AD_SLOTS.toolInline} afterContent={true} />

          <FAQSection items={kinderkostenFAQ} title="Veelgestelde vragen over opvoedkosten" />

          <RelatedTools currentTool="Kosten Kind Calculator" />

          <div className="mt-8 flex justify-center">
            <FeedbackForm toolName="Kosten Kind Calculator" />
          </div>

          <BottomAd slot={AD_SLOTS.toolBottom} />
        </div>

        <StickyAd slot={AD_SLOTS.toolSidebar} />
      </div>
    </div>
  );
}
