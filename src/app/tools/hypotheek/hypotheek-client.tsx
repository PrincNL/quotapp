"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Euro, TrendingUp, Users, RotateCcw, BookOpen, Lightbulb, Info, ArrowRight } from "lucide-react";
import { InlineAd, StickyAd, ToolTopBannerAd, BottomAd, SmartInlineAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import { RelatedTools } from "@/components/related-tools";
import { FeedbackForm } from "@/components/feedback-form";
import { FavoriteButton } from "@/components/favorite-button";
import { NextStepModule } from "@/components/next-step-module";

interface Resultaat {
  maxHypotheek: number;
  maandlasten: number;
  totaalInkomen: number;
  maandlastenNetto: number;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const hypotheekFAQ = [
  {
    question: "Hoeveel hypotheek kan ik krijgen?",
    answer: "Als vuistregel kun je ongeveer 4.5 tot 5 keer je bruto jaarinkomen lenen. Met een partner worden beide inkomens bij elkaar opgeteld. Voor een exact bedrag is het verstandig om contact op te nemen met een hypotheekadviseur, omdat ook andere factoren zoals studieschuld en financiële verplichtingen meespelen.",
  },
  {
    question: "Hoe worden maandlasten berekend?",
    answer: "De maandlasten worden berekend op basis van een annuïteitenhypotheek. Dit betekent dat je elke maand hetzelfde bruto bedrag betaalt, bestaande uit rente en aflossing. De calculator houdt rekening met de rente en looptijd die je hebt gekozen.",
  },
  {
    question: "Wat is de maximale hypotheekrenteaftrek?",
    answer: "De hypotheekrenteaftrek is afhankelijk van je belastingschijf. Voor de meeste mensen is dit tegenwoordig ongeveer 36-37% van de betaalde rente. Dit betekent dat je netto maandlasten lager zijn dan je bruto maandlasten.",
  },
  {
    question: "Welke rente kan ik verwachten in 2025?",
    answer: "De hypotheekrente fluctueert continu. In deze calculator kun je de actuele rente invoeren. Kijk voor de meest actuele tarieven op vergelijkingssites of neem contact op met een hypotheekadviseur. De rente varieert ook per looptijd en type hypotheek.",
  },
  {
    question: "Kan ik een hypotheek krijgen met een studieschuld?",
    answer: "Ja, dat kan. Echter, je studieschuld wordt meegenomen in de berekening van je maximale hypotheek. Afhankelijk van de hoogte van je schuld en je inkomen, kan dit je maximale leencapaciteit verlagen. Een hypotheekadviseur kan je hier meer over vertellen.",
  },
  {
    question: "Wat is de Nationale Hypotheek Garantie (NHG)?",
    answer: "De NHG is een garantie die ervoor zorgt dat je restschuld kwijtgescholden wordt als je door extreme omstandigheden je huis moet verkopen en de opbrengst lager is dan de hypotheeksom. Er geldt een grens (in 2025 is dit €435.000, of €465.000 met energiebesparende maatregelen).",
  },
];

export function HypotheekCalculatorClient() {
  const [inkomen, setInkomen] = useState("");
  const [partnerInkomen, setPartnerInkomen] = useState("");
  const [rente, setRente] = useState("3.5");
  const [looptijd, setLooptijd] = useState(30);
  const [resultaat, setResultaat] = useState<Resultaat | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Live calculation
  useEffect(() => {
    const timer = setTimeout(() => {
      bereken();
    }, 300);
    return () => clearTimeout(timer);
  }, [inkomen, partnerInkomen, rente, looptijd]);

  const bereken = useCallback(() => {
    const inkomenNum = parseFloat(inkomen) || 0;
    const partnerNum = parseFloat(partnerInkomen) || 0;
    const totaalInkomen = inkomenNum + partnerNum;
    
    if (totaalInkomen <= 0) {
      setResultaat(null);
      return;
    }

    setIsCalculating(true);

    // Max 4.5x jaarinkomen (conservatieve schatting)
    const maxHypotheek = totaalInkomen * 4.5;
    
    // Maandlasten berekenen (annuïteitenhypotheek)
    const maandRente = parseFloat(rente) / 100 / 12;
    const aantalMaanden = looptijd * 12;
    
    let maandlasten = 0;
    if (maandRente > 0) {
      maandlasten = maxHypotheek * (maandRente * Math.pow(1 + maandRente, aantalMaanden)) / (Math.pow(1 + maandRente, aantalMaanden) - 1);
    } else {
      maandlasten = maxHypotheek / aantalMaanden;
    }

    // Geschatte netto maandlasten (ruwe schatting: ~65% van bruto)
    const maandlastenNetto = maandlasten * 0.65;

    setResultaat({
      maxHypotheek: Math.round(maxHypotheek),
      maandlasten: Math.round(maandlasten),
      totaalInkomen: Math.round(totaalInkomen),
      maandlastenNetto: Math.round(maandlastenNetto),
    });

    setTimeout(() => setIsCalculating(false), 150);
  }, [inkomen, partnerInkomen, rente, looptijd]);

  const reset = () => {
    setInkomen("");
    setPartnerInkomen("");
    setRente("3.5");
    setLooptijd(30);
    setResultaat(null);
  };

  const formatBedrag = (value: number) => {
    return value.toLocaleString("nl-NL");
  };

  const hypotheekNextStepTitle = resultaat
    ? `Je indicatie staat rond € ${formatBedrag(resultaat.maxHypotheek)}. Dit zijn de slimste vervolgstappen.`
    : "Start met je hypotheekcheck en werk daarna je woonscenario uit.";

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* TOP BANNER AD - New placement for tool pages */}
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
              <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
                <Home className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="Hypotheek" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Hypotheek Calculator
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bereken je maximale hypotheek en maandlasten op basis van je inkomen.
              Inclusief rente en looptijd voor een realistische indicatie.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/tools/hypotheek-maandlasten"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Bereken nauwkeurige maandlasten
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/tools/hypotheek-vergelijker"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Vergelijk hypotheekvormen
              </Link>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Handig als volgende stap nadat je een eerste indicatie van je leencapaciteit hebt.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {/* Input Section */}
            <motion.div className="card" variants={fadeInUp}>
              <div className="space-y-5">
                <div>
                  <label htmlFor="inkomen" className="flex items-center gap-2 text-sm font-medium mb-2">
                    <Users className="w-4 h-4" />
                    Jouw bruto jaarinkomen
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      id="inkomen"
                      type="number"
                      value={inkomen}
                      onChange={(e) => setInkomen(e.target.value)}
                      placeholder="45000"
                      className="w-full pl-10 pr-4 py-3 input"
                      min="0"
                      step="1000"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="partner" className="flex items-center gap-2 text-sm font-medium mb-2">
                    <Users className="w-4 h-4" />
                    Partner bruto jaarinkomen <span className="text-muted-foreground">(optioneel)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                    <input
                      id="partner"
                      type="number"
                      value={partnerInkomen}
                      onChange={(e) => setPartnerInkomen(e.target.value)}
                      placeholder="35000"
                      className="w-full pl-10 pr-4 py-3 input"
                      min="0"
                      step="1000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="rente" className="flex items-center gap-2 text-sm font-medium mb-2">
                      <TrendingUp className="w-4 h-4" />
                      Rente
                    </label>
                    <div className="relative">
                      <input
                        id="rente"
                        type="number"
                        step="0.1"
                        value={rente}
                        onChange={(e) => setRente(e.target.value)}
                        className="w-full pl-4 pr-8 py-3 input"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="looptijd" className="text-sm font-medium mb-2 block">Looptijd</label>
                    <select
                      id="looptijd"
                      value={looptijd}
                      onChange={(e) => setLooptijd(parseInt(e.target.value))}
                      className="w-full px-4 py-3 input"
                    >
                      {[10, 15, 20, 25, 30].map((jaren) => (
                        <option key={jaren} value={jaren}>{jaren} jaar</option>
                      ))}
                    </select>
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

            {/* Results */}
            <motion.div className="card" variants={fadeInUp}>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Home className="w-5 h-5" />
                Resultaat
              </h2>

              <AnimatePresence mode="wait">
                {resultaat ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-4"
                  >
                    <motion.div
                      className="p-5 bg-[hsl(var(--calc-result-bg))] rounded-xl border-2 border-[hsl(var(--calc-highlight))]"
                      animate={isCalculating ? { scale: [1, 1.02, 1] } : {}}
                    >
                      <p className="text-sm text-muted-foreground mb-1">Maximale hypotheek</p>
                      <p className="text-3xl font-bold text-[hsl(var(--calc-result-text))]">
                        € {formatBedrag(resultaat.maxHypotheek)}
                      </p>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-3">
                      <motion.div
                        className="p-4 bg-[hsl(var(--info-muted))] rounded-lg"
                        animate={isCalculating ? { scale: [1, 1.02, 1] } : {}}
                        transition={{ delay: 0.05 }}
                      >
                        <p className="text-xs text-muted-foreground mb-1">Bruto maandlasten</p>
                        <p className="text-xl font-bold text-[hsl(var(--info))]">
                          € {formatBedrag(resultaat.maandlasten)}
                        </p>
                      </motion.div>

                      <motion.div
                        className="p-4 bg-[hsl(var(--success-muted))] rounded-lg"
                        animate={isCalculating ? { scale: [1, 1.02, 1] } : {}}
                        transition={{ delay: 0.1 }}
                      >
                        <p className="text-xs text-muted-foreground mb-1">Geschat netto per maand</p>
                        <p className="text-xl font-bold text-[hsl(var(--success))]">
                          € {formatBedrag(resultaat.maandlastenNetto)}
                        </p>
                      </motion.div>
                    </div>

                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Totaal inkomen: <strong>€ {formatBedrag(resultaat.totaalInkomen)}</strong>
                      </p>
                    </div>

                    <p className="text-xs text-muted-foreground mt-4">
                      * Dit is een indicatie. Voor een exacte berekening neem contact op met een hypotheekadviseur.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-muted-foreground py-12"
                  >
                    <Home className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Vul je inkomen in om te beginnen</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          <NextStepModule
            context="hypotheek"
            theme="green"
            title={hypotheekNextStepTitle}
            description="Gebruik je eerste indicatie als vertrekpunt: check daarna je echte maandlasten, vergelijk hypotheekroutes en bekijk of kopen beter uitpakt dan huren in jouw situatie."
            primary={{
              label: "Bereken je exacte maandlasten",
              href: "/tools/hypotheek-maandlasten",
            }}
            secondary={{
              label: "Vergelijk huren of kopen",
              href: "/tools/huur-vs-koop",
            }}
            trustPoints={[
              "Snelle indicatie op basis van inkomen, rente en looptijd",
              "Handig voor starters, doorstromers en samenkopers",
              "Gratis, zonder account en direct toepasbaar",
            ]}
            comparisons={[
              {
                label: "Hypotheek vergelijken",
                href: "/tools/hypotheek-vergelijker",
                badge: "Vergelijk",
                description: "Zet meerdere hypotheekopties naast elkaar voordat je verder rekent.",
              },
              {
                label: "Annuïteit vs lineair",
                href: "/tools/annuiteitenhypotheek",
                badge: "Vorm",
                description: "Bekijk welke hypotheekvorm beter past bij je maandbudget en lange termijn.",
              },
              {
                label: "Extra aflossing check",
                href: "/tools/extra-aflossing",
                badge: "Strategie",
                description: "Zie hoeveel sneller je kunt aflossen en hoeveel rente dat kan schelen.",
              },
            ]}
          />

          {/* Ad after result */}
          <InlineAd slot="hypotheek-after-result" />

          {/* SEO Content Section - Uitgebreid */}
          <motion.div 
            className="mt-12 space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Wat is Hypotheek Calculator */}
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <BookOpen className="w-5 h-5 text-green-500" />
                </div>
                <h2 className="text-xl font-bold">Wat is de Hypotheek Calculator?</h2>
              </div>
              <div className="prose prose-sm text-muted-foreground max-w-none">
                <p className="mb-4">
                  De <strong>Hypotheek Calculator</strong> is een handige online tool waarmee je snel een 
                  indicatie krijgt van je <strong>maximale hypotheek</strong> en de bijbehorende 
                  <strong> maandlasten</strong>. Of je nu alleen een huis wilt kopen of met je partner - 
                  onze calculator helpt je bij de eerste stap.
                </p>
                <p>
                  Deze calculator is speciaal ontwikkeld voor de Nederlandse markt en houdt rekening met 
                  de gangbare regels voor hypotheekverstrekking. Je kunt eenvoudig je bruto jaarinkomen 
                  invoeren, de huidige rente aangeven, en de gewenste looptijd selecteren.
                </p>
              </div>
            </div>

            {/* Waarom gebruiken */}
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-blue-500" />
                </div>
                <h2 className="text-xl font-bold">Waarom deze calculator gebruiken?</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-2">✓ Snelle indicatie</h3>
                  <p className="text-sm text-muted-foreground">
                    Krijg binnen seconden een indicatie van wat je maximaal kunt lenen.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-2">✓ Inclusief partner</h3>
                  <p className="text-sm text-muted-foreground">
                    Bereken je hypotheek inclusief het inkomen van je partner.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-2">✓ Bruto én netto</h3>
                  <p className="text-sm text-muted-foreground">
                    Zie zowel je bruto maandlasten als een schatting van je netto lasten.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-2">✓ Verschillende looptijden</h3>
                  <p className="text-sm text-muted-foreground">
                    Vergelijk maandlasten voor verschillende looptijden: 10, 15, 20, 25 of 30 jaar.
                  </p>
                </div>
              </div>
            </div>

            {/* Voorbeelden */}
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Euro className="w-5 h-5 text-purple-500" />
                </div>
                <h2 className="text-xl font-bold">Voorbeelden van hypotheekberekeningen</h2>
              </div>
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">Voorbeeld 1: Alleenstaande</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Je verdient €45.000 bruto per jaar en wilt een hypotheek met 3,5% rente over 30 jaar.
                  </p>
                  <div className="text-sm bg-muted p-3 rounded">
                    <p>Maximale hypotheek: <strong>€202.500</strong></p>
                    <p>Bruto maandlasten: ca. <strong>€910</strong></p>
                    <p>Geschat netto: ca. <strong>€590</strong></p>
                  </div>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">Voorbeeld 2: Samenwonend</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Jij verdient €50.000 en je partner €35.000. Totaal €85.000 met 4% rente over 30 jaar.
                  </p>
                  <div className="text-sm bg-muted p-3 rounded">
                    <p>Maximale hypotheek: <strong>€382.500</strong></p>
                    <p>Bruto maandlasten: ca. <strong>€1.826</strong></p>
                    <p>Geschat netto: ca. <strong>€1.187</strong></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Uitleg */}
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <Info className="w-5 h-5 text-orange-500" />
                </div>
                <h2 className="text-xl font-bold">Hoe werkt hypotheek berekenen?</h2>
              </div>
              <div className="prose prose-sm text-muted-foreground max-w-none">
                <p className="mb-4">
                  Het berekenen van je maximale hypotheek is gebaseerd op een aantal factoren. 
                  De belangrijkste is je bruto jaarinkomen. Banken gebruiken de volgende vuistregel:
                </p>
                
                <div className="bg-muted p-4 rounded-lg mb-4">
                  <p className="font-medium">Maximale hypotheek = Bruto jaarinkomen × 4,5</p>
                </div>

                <p className="mb-4">
                  Dit is een conservatieve schatting. In de praktijk kan dit soms iets hoger uitvallen 
                  (tot 5x je inkomen), afhankelijk van je persoonlijke situatie.
                </p>

                <h3 className="text-lg font-semibold text-foreground mb-2">Wat bepaalt je maximale hypotheek?</h3>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>
                    <strong>Inkomen:</strong> Hoe hoger je inkomen, hoe meer je kunt lenen.
                  </li>
                  <li>
                    <strong>Partner inkomen:</strong> Beide inkomens worden bij elkaar opgeteld.
                  </li>
                  <li>
                    <strong>Studieschuld:</strong> Wordt meegenomen en kan je leencapaciteit verlagen.
                  </li>
                  <li>
                    <strong>Financiële verplichtingen:</strong> Leningen en kredieten worden afgetrokken.
                  </li>
                  <li>
                    <strong>Rente:</strong> Hoe lager de rente, hoe lager je maandlasten.
                  </li>
                </ul>

                <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>Let op:</strong> Dit is een indicatie. Voor een definitieve berekening 
                    en hypotheekaanvraag raden we aan om contact op te nemen met een onafhankelijke 
                    hypotheekadviseur. Zij kunnen je persoonlijke situatie volledig in kaart brengen.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Ad after result - lazy loaded */}
          <SmartInlineAd slot={AD_SLOTS.toolInline} afterContent={true} />

          {/* Ad before FAQ */}
          <SmartInlineAd slot={AD_SLOTS.toolInline} afterContent={true} />

          {/* FAQ Section */}
          <FAQSection items={hypotheekFAQ} title="Veelgestelde vragen over hypotheken" />

          {/* Related Tools */}
          <RelatedTools currentTool="Hypotheek Calculator" />

          {/* Feedback */}
          <div className="mt-8 flex justify-center">
            <FeedbackForm toolName="Hypotheek Calculator" />
          </div>

          {/* BOTTOM AD - New for tool pages */}
          <BottomAd slot={AD_SLOTS.toolBottom} />
        </div>

        {/* Sticky Ad Sidebar */}
        <StickyAd slot={AD_SLOTS.toolSidebar} />
      </div>
    </div>
  );
}
