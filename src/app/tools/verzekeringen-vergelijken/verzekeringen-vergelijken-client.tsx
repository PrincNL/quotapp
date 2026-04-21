"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Car, Heart, Home, Euro, BookOpen, CheckCircle, AlertCircle, TrendingDown, PiggyBank } from "lucide-react";
import { InlineAd, StickyAd, ToolTopBannerAd, BottomAd, SmartInlineAd, AD_SLOTS } from "@/components/ad-components";
import { FAQSection } from "@/components/faq-section";
import { RelatedTools } from "@/components/related-tools";
import { FeedbackForm } from "@/components/feedback-form";
import { FavoriteButton } from "@/components/favorite-button";
import { NextStepModule } from "@/components/next-step-module";

interface Verzekering {
  id: string;
  type: "zorg" | "auto" | "inboedel" | "opstal" | "reis" | "aansprakelijkheid";
  naam: string;
  maandPremie: number;
  eigenRisico: number;
  dekking: number;
  kwaliteit: number; // 1-5
}

interface Resultaat {
  totaleMaandKosten: number;
  totaleJaarKosten: number;
  aanbevolenVerzekeringen: string[];
  ontbrekendeVerzekeringen: string[];
  advies: string;
  besparingMogelijk: number;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const verzekeringFAQ = [
  {
    question: "Welke verzekeringen zijn verplicht in Nederland?",
    answer: "De enige verplichte verzekeringen in Nederland zijn: autoverzekering (WA), zorgverzekering, en voor huiseigenaren de opstalverzekering (vaak gecombineerd met inboedel). Overige verzekeringen zijn optioneel maar wel aan te raden.",
  },
  {
    question: "Hoeveel moet ik uitgeven aan verzekeringen?",
    answer: "Een vuistregel is om 2-4% van je bruto inkomen te besteden aan verzekeringen. Te weinig verzekeren kan riskant zijn, maar te veel verzekeren is zonde van geld. Focus op de essentialia: zorg, auto, woonhuis.",
  },
  {
    question: "Wat is het eigen risico?",
    answer: "Het eigen risico is het bedrag dat je zelf betaalt voordat de verzekering uitkeert. Een hoger eigen risico verlaagt je maandpremie. Kies een eigen risico dat je zelf kunt dragen zonder financiële problemen.",
  },
  {
    question: "Wanneer heb ik een aansprakelijkheidsverzekering nodig?",
    answer: "Een aansprakelijkheidsverzekering (AVP) dekt schade die jij aan anderen veroorzaakt. Dit is sterk aan te raden omdat schadeclaims flink kunnen oplopen. De premie is laag (ca. €3-5 per maand) maar de dekking is breed.",
  },
  {
    question: "Moet ik apart sparen of verzekeren?",
    answer: "Voor kleine risico's kan eigen risico nemen en apart sparen voordeliger zijn dan een uitgebreide verzekering. Voor grote, onbetaalbare risico's (brand, diefstal, aansprakelijkheid) is verzekeren verstandig.",
  },
];

export function VerzekeringenVergelijkenClient() {
  const [verzekeringen, setVerzekeringen] = useState<Verzekering[]>([
    { id: "1", type: "zorg", naam: "Zorgverzekering", maandPremie: 140, eigenRisico: 385, dekking: 100, kwaliteit: 4 },
    { id: "2", type: "auto", naam: "WA Autoverzekering", maandPremie: 65, eigenRisico: 0, dekking: 75, kwaliteit: 3 },
    { id: "3", type: "inboedel", naam: "Inboedelverzekering", maandPremie: 15, eigenRisico: 150, dekking: 60, kwaliteit: 3 },
    { id: "4", type: "opstal", naam: "Opstalverzekering", maandPremie: 20, eigenRisico: 200, dekking: 80, kwaliteit: 4 },
  ]);

  const [nieuweVerzekering, setNieuweVerzekering] = useState({
    type: "aansprakelijkheid" as Verzekering["type"],
    naam: "",
    maandPremie: "",
    eigenRisico: "0",
  });

  const brutoInkomen = 50000;

  const resultaat = useMemo((): Resultaat => {
    const totaleMaandKosten = verzekeringen.reduce((sum, v) => sum + v.maandPremie, 0);
    const totaleJaarKosten = totaleMaandKosten * 12;

    const inkomensPercentage = (totaleJaarKosten / brutoInkomen) * 100;

    // Aanbevolen verzekeringen
    const heeftZorg = verzekeringen.some(v => v.type === "zorg");
    const heeftAuto = verzekeringen.some(v => v.type === "auto");
    const heeftInboedel = verzekeringen.some(v => v.type === "inboedel");
    const heeftOpstal = verzekeringen.some(v => v.type === "opstal");
    const heeftAansprakelijkheid = verzekeringen.some(v => v.type === "aansprakelijkheid");

    const ontbrekendeVerzekeringen: string[] = [];
    if (!heeftZorg) ontbrekendeVerzekeringen.push("Zorgverzekering (verplicht)");
    if (!heeftAuto) ontbrekendeVerzekeringen.push("Autoverzekering (WA verplicht)");
    if (!heeftInboedel) ontbrekendeVerzekeringen.push("Inboedelverzekering (bij huur)");
    if (!heeftOpstal) ontbrekendeVerzekeringen.push("Opstalverzekering (bij koop)");
    if (!heeftAansprakelijkheid) ontbrekendeVerzekeringen.push("Aansprakelijkheidsverzekering");

    // Advies bepalen
    let advies = "";
    if (inkomensPercentage < 2) {
      advies = "Je besteedt weinig aan verzekeringen. Zorg dat je basisverzekeringen op orde hebt.";
    } else if (inkomensPercentage <= 4) {
      advies = "Je verzekeringskosten zijn gezond. Overweeg een jaarlijkse review om te besparen.";
    } else {
      advies = "Je verzekeringskosten zijn aan de hoge kant. Vergelijk premies en verhoog eigen risico's waar mogelijk.";
    }

    // Besparingspotentieel (ruwe schatting)
    const besparingMogelijk = Math.round(totaleJaarKosten * 0.15);

    return {
      totaleMaandKosten,
      totaleJaarKosten,
      aanbevolenVerzekeringen: ["Zorg", "Auto WA", "Opstal", "Inboedel", "Aansprakelijkheid"],
      ontbrekendeVerzekeringen,
      advies,
      besparingMogelijk,
    };
  }, [verzekeringen, brutoInkomen]);

  const addVerzekering = () => {
    if (!nieuweVerzekering.naam || !nieuweVerzekering.maandPremie) return;
    setVerzekeringen([
      ...verzekeringen,
      {
        id: Date.now().toString(),
        type: nieuweVerzekering.type,
        naam: nieuweVerzekering.naam,
        maandPremie: parseFloat(nieuweVerzekering.maandPremie),
        eigenRisico: parseFloat(nieuweVerzekering.eigenRisico),
        dekking: 70,
        kwaliteit: 3,
      },
    ]);
    setNieuweVerzekering({ type: "aansprakelijkheid", naam: "", maandPremie: "", eigenRisico: "0" });
  };

  const removeVerzekering = (id: string) => {
    setVerzekeringen(verzekeringen.filter(v => v.id !== id));
  };

  const getTypeIcon = (type: Verzekering["type"]) => {
    switch (type) {
      case "zorg": return Heart;
      case "auto": return Car;
      case "inboedel": return Home;
      case "opstal": return Home;
      case "reis": return Shield;
      case "aansprakelijkheid": return Shield;
      default: return Shield;
    }
  };

  const getTypeColor = (type: Verzekering["type"]) => {
    switch (type) {
      case "zorg": return "bg-red-500";
      case "auto": return "bg-blue-500";
      case "inboedel": return "bg-purple-500";
      case "opstal": return "bg-green-500";
      case "reis": return "bg-yellow-500";
      case "aansprakelijkheid": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const formatBedrag = (value: number) => {
    return value.toLocaleString("nl-NL", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  const verzekeringenNextStepTitle =
    resultaat.besparingMogelijk > 0
      ? `Je hebt potentieel circa € ${formatBedrag(resultaat.besparingMogelijk)} per jaar aan optimalisatie.`
      : "Loop je verzekeringen jaarlijks na en zet ze naast je totale budget.";

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
              <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
                <Shield className="w-8 h-8" />
              </div>
              <FavoriteButton toolName="Verzekeringen Vergelijken" variant="icon" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Verzekeringen Vergelijken
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Vergelijk je verzekeringen, bereken je totale verzekeringskosten en ontdek 
              of je voldoende verzekerd bent.
            </p>
          </motion.div>

          {/* Samenvatting */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="card bg-purple-500/10 border-purple-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-muted-foreground">Verzekeringen</span>
              </div>
              <p className="text-2xl font-bold text-purple-600">{verzekeringen.length}</p>
            </div>

            <div className="card bg-green-500/10 border-green-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Euro className="w-4 h-4 text-green-600" />
                <span className="text-sm text-muted-foreground">Maandkosten</span>
              </div>
              <p className="text-2xl font-bold text-green-600">€ {formatBedrag(resultaat.totaleMaandKosten)}</p>
            </div>

            <div className="card bg-blue-500/10 border-blue-500/30">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-muted-foreground">Jaarkosten</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">€ {formatBedrag(resultaat.totaleJaarKosten)}</p>
            </div>

            <div className="card bg-yellow-500/10 border-yellow-500/30">
              <div className="flex items-center gap-2 mb-2">
                <PiggyBank className="w-4 h-4 text-yellow-600" />
                <span className="text-sm text-muted-foreground">Besparing</span>
              </div>
              <p className="text-2xl font-bold text-yellow-600">€ {formatBedrag(resultaat.besparingMogelijk)}</p>
              <p className="text-xs text-muted-foreground">per jaar mogelijk</p>
            </div>
          </motion.div>

          {/* Verzekeringen Lijst */}
          <motion.div 
            className="card mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Je Verzekeringen
            </h2>

            {verzekeringen.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Shield className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Voeg je verzekeringen toe om te beginnen</p>
              </div>
            ) : (
              <div className="space-y-3">
                {verzekeringen.map((verzekering) => {
                  const Icon = getTypeIcon(verzekering.type);
                  return (
                    <div key={verzekering.id} className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                      <div className={`p-3 rounded-xl ${getTypeColor(verzekering.type)} text-white`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{verzekering.naam}</p>
                        <p className="text-xs text-muted-foreground">
                          Eigen risico: €{verzekering.eigenRisico}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">€ {formatBedrag(verzekering.maandPremie)}</p>
                        <p className="text-xs text-muted-foreground">per maand</p>
                      </div>
                      <button
                        onClick={() => removeVerzekering(verzekering.id)}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-600"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Nieuwe verzekering toevoegen */}
            <div className="border-t pt-4 mt-4">
              <h3 className="text-sm font-medium mb-3">Verzekering toevoegen</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <select
                  value={nieuweVerzekering.type}
                  onChange={(e) => setNieuweVerzekering({ ...nieuweVerzekering, type: e.target.value as any })}
                  className="px-3 py-2 input"
                >
                  <option value="zorg">Zorg</option>
                  <option value="auto">Auto</option>
                  <option value="inboedel">Inboedel</option>
                  <option value="opstal">Opstal</option>
                  <option value="reis">Reis</option>
                  <option value="aansprakelijkheid">Aansprakelijkheid</option>
                </select>
                <input
                  type="text"
                  placeholder="Naam"
                  value={nieuweVerzekering.naam}
                  onChange={(e) => setNieuweVerzekering({ ...nieuweVerzekering, naam: e.target.value })}
                  className="px-3 py-2 input"
                />
                <input
                  type="number"
                  placeholder="Premie/maand"
                  value={nieuweVerzekering.maandPremie}
                  onChange={(e) => setNieuweVerzekering({ ...nieuweVerzekering, maandPremie: e.target.value })}
                  className="px-3 py-2 input"
                />
                <button
                  onClick={addVerzekering}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Toevoegen
                </button>
              </div>
            </div>
          </motion.div>

          {/* Advies */}
          {resultaat.ontbrekendeVerzekeringen.length > 0 && (
            <motion.div 
              className="card mb-6 bg-yellow-500/10 border-yellow-500/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-yellow-600">Ontbrekende Verzekeringen</h3>
                  <ul className="mt-2 space-y-1">
                    {resultaat.ontbrekendeVerzekeringen.map((v) => (
                      <li key={v} className="text-sm">{v}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {/* Advies */}
          {resultaat.advies && (
            <motion.div 
              className="card mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="font-bold">Advies</h3>
                  <p className="text-muted-foreground mt-1">{resultaat.advies}</p>
                </div>
              </div>
            </motion.div>
          )}

          <NextStepModule
            context="verzekeringen"
            theme="indigo"
            title={verzekeringenNextStepTitle}
            description="Gebruik deze inventarisatie als startpunt: check daarna of je premies passen binnen je budget, of je genoeg buffer hebt voor eigen risico en waar je vaste lasten verder omlaag kunnen."
            primary={{
              label: "Zet premies naast je budget",
              href: "/tools/persoonlijke-financiën",
            }}
            secondary={{
              label: "Bereken je buffer",
              href: "/tools/buffer-calculator",
            }}
            trustPoints={[
              "Jaarlijkse review voorkomt onnodig hoge premies",
              "Let op verplichte én aanbevolen verzekeringen",
              "Gebruik dit als inventarisatie en controleer voorwaarden bij je aanbieder",
            ]}
            comparisons={[
              {
                label: "Zorgplicht check",
                href: "/tools/zorgplicht-calculator",
                badge: "Draagkracht",
                description: "Controleer of je totale vaste lasten en schulden nog gezond blijven.",
              },
              {
                label: "Buffer voor eigen risico",
                href: "/tools/sparen",
                badge: "Reserve",
                description: "Bereken hoe snel je een reserve opbouwt voor eigen risico en onverwachte kosten.",
              },
              {
                label: "Vaste lasten overzicht",
                href: "/tools/energiekosten",
                badge: "Besparen",
                description: "Bekijk ook waar je buiten verzekeringen nog op maandlasten kunt besparen.",
              },
            ]}
          />

          <SmartInlineAd slot={AD_SLOTS.toolInline} afterContent={true} />

          {/* SEO Content */}
          <motion.div 
            className="mt-12 card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-500" />
              </div>
              <h2 className="text-xl font-bold">Verzekeringen Vergelijken in Nederland</h2>
            </div>
            <div className="prose prose-sm text-muted-foreground max-w-none">
              <p className="mb-4">
                Het <strong>vergelijken van verzekeringen</strong> kan flink schelen in de maandkosten. 
                In Nederland zijn er veel verschillende verzekeraars met variërende premies en voorwaarden. 
                Een jaarlijkse check kan honderden euro&apos;s per jaar besparen.
              </p>
              <p>
                De belangrijkste verzekeringen zijn de <strong>zorgverzekering</strong>, 
                <strong> autoverzekering</strong> (verplicht WA), en voor huiseigenaren de 
                <strong> opstalverzekering</strong>. Daarnaast zijn inboedel- en 
                aansprakelijkheidsverzekeringen sterk aan te raden.
              </p>
            </div>
          </motion.div>

          <SmartInlineAd slot={AD_SLOTS.toolInline} afterContent={true} />

          <FAQSection items={verzekeringFAQ} title="Veelgestelde vragen over verzekeringen" />

          <RelatedTools currentTool="Verzekeringen Vergelijken" />

          <div className="mt-8 flex justify-center">
            <FeedbackForm toolName="Verzekeringen Vergelijken" />
          </div>

          <BottomAd slot={AD_SLOTS.toolBottom} />
        </div>

        <StickyAd slot={AD_SLOTS.toolSidebar} />
      </div>
    </div>
  );
}
