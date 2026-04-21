import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, ArrowRight, User } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { InlineAd, InArticleAd } from "@/components/ad-components";
import { RelatedTools } from "@/components/related-tools";
import { ShareButton } from "@/components/share-button";

// Blog posts content
const blogPosts = {
  "btw-berekenen-2025-complete-gids": {
    title: "BTW Berekenen in 2025: De Complete Gids voor Ondernemers",
    excerpt: "Leer alles over btw berekenen in Nederland. Van 21% tot 9% btw-tarief, inclusief naar exclusief en handige rekentips voor ondernemers.",
    date: "2025-01-15",
    readTime: "8 min",
    category: "Financiën",
    author: "QuotApp.nl",
    keywords: ["btw berekenen", "21 btw", "9 btw", "btw tarieven 2025"],
    content: `
## Wat is BTW en waarom is het belangrijk?

BTW (Belasting Toegevoegde Waarde) is een belasting die wordt geheven op goederen en diensten. 
Als ondernemer in Nederland ben je verplicht om btw in rekening te brengen bij je klanten en 
door te storten naar de Belastingdienst. Het correct berekenen van btw is essentieel voor je 
boekhouding en belastingaangifte.

## De Nederlandse BTW-tarieven in 2025

In Nederland kennen we drie btw-tarieven:

### 21% BTW (hoog tarief)
Dit is het standaardtarief dat geldt voor de meeste producten en diensten. Denk aan:
- Elektronica en apparaten
- Kleding en schoenen
- Meubels en woonaccessoires
- Professionele diensten (advies, consultancy)
- Restaurantmaaltijden (voor hier opeten)

### 9% BTW (laag tarief)
Het verlaagde tarief geldt voor eerste levensbehoeften en specifieke diensten:
- Eten en drinken (niet-alcoholisch)
- Boeken, tijdschriften en kranten
- Arbeid voor woningonderhoud en -renovatie
- Openbaar vervoer
- Kunst en antiek

### 0% BTW (vrijgesteld)
Sommige goederen en diensten zijn vrijgesteld van btw:
- Export van goederen naar landen buiten de EU
- Onderwijs door erkende instellingen
- Gezondheidszorg door erkende zorgverleners
- Financiële diensten (verzekeringen, bankieren)
- Sport door sportverenigingen

## Hoe bereken je BTW? De formules

### Van exclusief naar inclusief (btw optellen)

**Bij 21% btw:**
\`
Bedrag × 1,21 = Totaal inclusief btw
\`

Voorbeeld: €100 × 1,21 = €121 (inclusief €21 btw)

**Bij 9% btw:**
\`
Bedrag × 1,09 = Totaal inclusief btw
\`

Voorbeeld: €100 × 1,09 = €109 (inclusief €9 btw)

### Van inclusief naar exclusief (btw eruit halen)

**Bij 21% btw:**
\`
Bedrag ÷ 1,21 = Bedrag exclusief btw
\`

Voorbeeld: €121 ÷ 1,21 = €100 (exclusief)

**Bij 9% btw:**
\`
Bedrag ÷ 1,09 = Bedrag exclusief btw
\`

Voorbeeld: €109 ÷ 1,09 = €100 (exclusief)

## Praktische voorbeelden

### Voorbeeld 1: Factuur maken
Je levert diensten voor €500 exclusief btw.

**Berekening:**
- Bedrag exclusief: €500,00
- BTW (21%): €500 × 0,21 = €105,00
- Totaal inclusief: €605,00

### Voorbeeld 2: Prijs achterhalen
Je ziet een prijs van €242 inclusief 21% btw. Wat is de prijs exclusief?

**Berekening:**
- Totaal inclusief: €242,00
- Bedrag exclusief: €242 ÷ 1,21 = €200,00
- BTW bedrag: €242 - €200 = €42,00

### Voorbeeld 3: Supermarkt (9% btw)
Je doet boodschappen voor €54,50 inclusief btw.

**Berekening:**
- Totaal inclusief: €54,50
- Bedrag exclusief: €54,50 ÷ 1,09 = €50,00
- BTW (9%): €4,50

## Tips voor btw berekenen

1. **Gebruik een calculator**: Vermijd rekenfouten door onze [BTW Calculator](/tools/btw) te gebruiken.

2. **Controleer het tarief**: Zorg dat je het juiste btw-tarief hanteert. Twijfel je? Check de website van de Belastingdienst.

3. **Houd rekening met afronding**: Btw-bedragen worden vaak afgerond op hele centen.

4. **Documenteer alles**: Bewaar alle facturen en bonnetjes voor je boekhouding.

5. **Controleer periodiek**: Check regelmatig of je btw-aangiftes kloppen.

## Veelgemaakte fouten

- **Verkeerd tarief gebruiken**: 21% toepassen waar 9% van toepassing is (of vice versa)
- **Afrondingsfouten**: Fouten maken bij het afronden van btw-bedragen
- **Vergissingen bij kortingen**: Niet goed rekening houden met kortingen op de btw
- **Vergeten van btw-nummer**: Niet vermelden van je btw-nummer op facturen

## Conclusie

Het correct berekenen van btw is essentieel voor elke ondernemer. Met de juiste kennis en tools 
(hint: onze [BTW Calculator](/tools/btw)) is het een fluitje van een cent. Zorg dat je weet welk 
tarief van toepassing is, en controleer altijd je berekeningen.

Heb je vragen over btw berekenen? Gebruik onze calculator of neem contact op met een boekhouder 
voor specifiek advies.
    `,
  },
  "hypotheek-berekenen-starters-2025": {
    title: "Hypotheek Berekenen voor Starters in 2025: Wat Kan je Lenen?",
    excerpt: "Ben je starter op de woningmarkt? Ontdek hoe je je maximale hypotheek berekent, wat je maandlasten worden en welke regels er gelden in 2025.",
    date: "2025-01-10",
    readTime: "10 min",
    category: "Hypotheek",
    author: "QuotApp.nl",
    keywords: ["hypotheek berekenen", "maximale hypotheek", "starters", "maandlasten"],
    content: `
## Starters op de woningmarkt in 2025

Als starter op de woningmarkt komt er veel op je af. Een van de eerste vragen die je jezelf 
stelt is: "Hoeveel kan ik lenen?" In dit artikel leggen we uit hoe je je maximale hypotheek 
berekent, welke regels er gelden en geven we praktische tips voor starters.

## Hoeveel hypotheek kan je krijgen?

### De vuistregel
Als vuistregel geldt dat je ongeveer 4,5 tot 5 keer je bruto jaarinkomen kunt lenen. 
Met een partner worden beide inkomens opgeteld.

**Voorbeeld:**
- Jouw inkomen: €40.000
- Partner inkomen: €35.000
- Totaal inkomen: €75.000
- Maximale hypotheek: €75.000 × 4,5 = €337.500

### Wat bepaalt je maximale hypotheek?

1. **Bruto jaarinkomen**: Hoe hoger je inkomen, hoe meer je kunt lenen
2. **Partner inkomen**: Wordt volledig meegerekend
3. **Studieschuld**: Verlaagt je leencapaciteit
4. **Financiële verplichtingen**: Andere leningen worden afgetrokken
5. **Rentevaste periode**: Kan invloed hebben op de maximale hypotheek

## De hypotheekberekening stap voor stap

### Stap 1: Bepaal je bruto jaarinkomen
Dit is je jaarloon volgens je arbeidsovereenkomst, inclusief vakantiegeld en eventuele 
fixed bonussen. Variabele inkomsten zoals provisie worden vaak gedeeltelijk meegerekend.

### Stap 2: Bereken je maximale hypotheek
Gebruik onze [Hypotheek Calculator](/tools/hypotheek) of de vuistregel:
\`
Bruto inkomen × 4,5 = Maximale hypotheek
\`

### Stap 3: Bereken je maandlasten
De maandlasten bestaan uit rente en aflossing (bij een annuïteitenhypotheek). 
Gebruik de formule of onze calculator om dit te berekenen.

### Stap 4: Check de NHG-grens
De Nationale Hypotheek Garantie (NHG) biedt extra zekerheid. In 2025 geldt een grens van:
- €435.000 voor normale aankopen
- €465.000 als je energiebesparende maatregelen neemt

## Speciale regelingen voor starters

### Starterslening (in sommige gemeenten)
Sommige gemeenten bieden een starterslening aan. Dit is een extra lening bovenop je 
hypotheek met gunstige voorwaarden. Check bij je gemeente of dit mogelijk is.

### Overdrachtsbelasting
Als starter tussen 18 en 35 jaar betaal je geen overdrachtsbelasting over de eerste 
€510.000 van de aankoopprijs (2025). Dit bespaart je flink wat geld!

### Nationale Hypotheek Garantie (NHG)
Met NHG ben je verzekerd van extra bescherming:
- Lagere rente (meestal)
- Restschuld kwijtschelding bij gedwongen verkoop
- Zekerheid dat je hypotheek verantwoord is

## Rekenvoorbeelden voor starters

### Voorbeeld 1: Alleenstaande starter
- Inkomen: €38.000
- Maximale hypotheek: €171.000
- Rente: 3,5%
- Looptijd: 30 jaar
- Bruto maandlasten: ca. €770

### Voorbeeld 2: Samenwonend stel
- Inkomen 1: €42.000
- Inkomen 2: €36.000
- Totaal: €78.000
- Maximale hypotheek: €351.000
- Rente: 3,5%
- Looptijd: 30 jaar
- Bruto maandlasten: ca. €1.580

## Tips voor starters

1. **Start met sparen**: Hoe meer eigen geld, hoe lager je hypotheek
2. **Check je BKR-registratie**: Een schone BKR helpt bij de aanvraag
3. **Vergelijk rentes**: Verschillen kunnen oplopen tot duizenden euro's
4. **Neem een adviseur**: Een onafhankelijk adviseur helpt je door het proces
5. **Wees realistisch**: Koop niet het maximale dat je kunt lenen

## Veelgestelde vragen van starters

**Kan ik een hypotheek krijgen met een tijdelijk contract?**
Ja, maar er zijn voorwaarden. Vaak moet je kunnen aantonen dat je inkomen structureel is, 
bijvoorbeeld door een intentieverklaring van je werkgever.

**Hoeveel eigen geld heb ik nodig?**
Je kunt tegenwoordig vaak 100% van de waarde financieren met NHG. Zonder NHG is dat meestal 
ook mogelijk, maar je hebt wel geld nodig voor bijkomende kosten (kosten koper).

**Wat zijn kosten koper?**
Dit zijn alle kosten die je moet betalen bij het kopen van een huis:
- Overdrachtsbelasting (2% zonder NHG, 0% voor starters <35 jaar)
- Notariskosten
- Taxatiekosten
- Advies- en afsluitkosten hypotheek
- Bouwkundige inspectie (optioneel)

## Conclusie

Als starter op de woningmarkt is het belangrijk om goed voorbereid te zijn. Bereken je 
maximale hypotheek met onze [Hypotheek Calculator](/tools/hypotheek), check welke 
regelingen voor jou van toepassing zijn, en neem de tijd om alles goed te vergelijken. 
Succes met je zoektocht naar een nieuwe woning!
    `,
  },
  "procenten-berekenen-complete-gids": {
    title: "Procenten Berekenen: De Complete Gids met Voorbeelden",
    excerpt: "Leer alle manieren om procenten te berekenen. Van percentage van een bedrag tot stijging/daling berekenen - met praktische voorbeelden.",
    date: "2025-01-05",
    readTime: "7 min",
    category: "Rekenen",
    author: "QuotApp.nl",
    keywords: ["procent berekenen", "percentage calculator", "stijging berekenen"],
    content: `
## Waarom procenten berekenen?

Procenten komen overal in het dagelijks leven voor: bij kortingen in de winkel, rente op 
je spaarrekening, loonsverhogingen, en statistieken in het nieuws. Het kunnen berekenen 
van procenten is dan ook een essentiële vaardigheid.

In dit artikel behandelen we alle manieren om procenten te berekenen, van basis tot 
gevorderd, met concrete voorbeelden.

## De basis: Wat is een procent?

Een procent (%) betekent "per honderd". 50% betekent 50 van de 100, of de helft. 
1% is dus 1/100 deel van iets.

\`
1% = 1/100 = 0,01
10% = 10/100 = 0,10
50% = 50/100 = 0,50
100% = 100/100 = 1,00
\`

## Manier 1: Percentage van een bedrag

### De formule
\`
Percentage van bedrag = (Percentage ÷ 100) × Bedrag
\`

### Voorbeelden

**Voorbeeld 1:** Wat is 20% van €150?
\`
(20 ÷ 100) × 150 = 0,20 × 150 = €30
\`

**Voorbeeld 2:** Wat is 15% korting op €80?
\`
(15 ÷ 100) × 80 = 0,15 × 80 = €12 korting
\`

**Voorbeeld 3:** Je krijgt 8% loonsverhoging op €2.500 salaris
\`
(8 ÷ 100) × 2.500 = €200 verhoging
\`

## Manier 2: Percentage berekenen van een totaal

### De formule
\`
Percentage = (Deel ÷ Totaal) × 100
\`

### Voorbeelden

**Voorbeeld 1:** 15 van de 60 mensen zijn te laat. Hveel procent is dat?
\`
(15 ÷ 60) × 100 = 25%
\`

**Voorbeeld 2:** Je hebt €45 betaald van €180. Welk percentage is dat?
\`
(45 ÷ 180) × 100 = 25%
\`

## Manier 3: Stijging berekenen

### De formule
\`
Stijging (%) = ((Nieuw - Oud) ÷ Oud) × 100
\`

### Voorbeelden

**Voorbeeld 1:** Je salaris gaat van €2.000 naar €2.200
\`
((2.200 - 2.000) ÷ 2.000) × 100 = 10% stijging
\`

**Voorbeeld 2:** Een aandeel stijgt van €50 naar €65
\`
((65 - 50) ÷ 50) × 100 = 30% stijging
\`

## Manier 4: Daling berekenen

### De formule
\`
Daling (%) = ((Oud - Nieuw) ÷ Oud) × 100
\`

### Voorbeelden

**Voorbeeld 1:** Een jas kostte €120 en is nu €90
\`
((120 - 90) ÷ 120) × 100 = 25% korting
\`

**Voorbeeld 2:** Je weegt nu 80kg, was 90kg
\`
((90 - 80) ÷ 90) × 100 = 11,1% afgevallen
\`

## Manier 5: Nieuw bedrag na percentage

### Bij stijging:
\`
Nieuw bedrag = Oud × (1 + (percentage ÷ 100))
\`

### Bij daling:
\`
Nieuw bedrag = Oud × (1 - (percentage ÷ 100))
\`

### Voorbeelden

**Voorbeeld 1:** Prijs stijgt met 15% van €200
\`
200 × (1 + 0,15) = 200 × 1,15 = €230
\`

**Voorbeeld 2:** Prijs daalt met 25% van €80
\`
80 × (1 - 0,25) = 80 × 0,75 = €60
\`

## Handige trucjes

### 10% berekenen
Verplaats de komma één plaats naar links:
- 10% van €150 = €15,00
- 10% van €2.450 = €245

### 5% berekenen
Neem de helft van 10%:
- 5% van €200 = €10 (de helft van €20)

### 1% berekenen
Verplaats de komma twee plaatsen naar links:
- 1% van €500 = €5,00

### 50% berekenen
De helft:
- 50% van €180 = €90

### 25% berekenen
Een kwart (de helft van de helft):
- 25% van €200 = €50

### 75% berekenen
Driekwart:
- 75% van €200 = €150

## Praktische toepassingen

### Korting berekenen
Je ziet: "30% korting op alles!"

Product kost €85:
- Korting: €85 × 0,30 = €25,50
- Nieuw bedrag: €85 - €25,50 = €59,50

### BTW berekenen
Product kost €100 exclusief 21% btw:
- Btw: €100 × 0,21 = €21
- Totaal: €121

### Fooi berekenen
Rekening is €67,50, je wilt 10% fooi geven:
- Fooi: €67,50 × 0,10 = €6,75

### Spaarrente berekenen
Je hebt €5.000 met 2% rente per jaar:
- Rente: €5.000 × 0,02 = €100

## Veelgemaakte fouten

1. **Procenten optellen/aftrekken**: 20% + 30% is NIET 50% meer van het origineel
2. **Richting verkeerd**: Stijging en daling door elkaar halen
3. **Verkeerde basis**: Percentages berekenen over het verkeerde bedrag
4. **Afrondingsfouten**: Te vroeg afronden in berekeningen

## Gebruik onze Procent Calculator

Wil je snel procenten berekenen zonder zelf te rekenen? Gebruik onze 
[Procent Calculator](/tools/procent)! Deze kan alle bovenstaande berekeningen 
voor je doen.

## Conclusie

Procenten berekenen is niet moeilijk als je de formules kent. Onthoud vooral:
- Percentage van bedrag: (%) × bedrag
- Stijging/daling: ((nieuw-oud) ÷ oud) × 100
- En gebruik onze calculator voor snelle berekeningen!
    `,
  },
  "iban-nummer-controleren": {
    title: "IBAN Nummer Controleren: Hoe Werkt het en Waarom is het Belangrijk?",
    excerpt: "Ontdek hoe IBAN-validatie werkt, waarom het belangrijk is om IBAN-nummers te checken, en hoe je zelf een Nederlands IBAN kunt verifiëren.",
    date: "2024-12-28",
    readTime: "6 min",
    category: "Bankieren",
    author: "QuotApp.nl",
    keywords: ["iban check", "iban validator", "nederlandse iban"],
    content: `
## Wat is een IBAN?

IBAN staat voor International Bank Account Number. Het is een internationale standaard 
voor het identificeren van bankrekeningen. In Nederland bestaat een IBAN uit 18 tekens:

\`
Voorbeeld: NL91 ABNA 0417 1643 00
\`

- **NL**: Landcode (Nederland)
- **91**: Controlegetal (2 cijfers)
- **ABNA**: Bankcode (4 letters)
- **0417 1643 00**: Rekeningnummer (10 cijfers)

## Waarom IBAN controleren?

Het controleren van een IBAN is belangrijk omt:

1. **Fouten voorkomen**: Een verkeerd IBAN kan ertoe leiden dat geld verkeerd overgemaakt wordt
2. **Tijd besparen**: Foute overboekingen terugkrijgen kost tijd en moeite
3. **Fraude voorkomen**: Controleer altijd het IBAN van nieuwe betalingsontvangers
4. **Administratie**: Zorg voor correcte gegevens in je administratie

## Hoe werkt IBAN-validatie?

### Het MOD-97 algoritme

De IBAN-check gebruikt een wiskundig algoritme genaamd MOD-97. Dit is hoe het werkt:

#### Stap 1: Verplaats de eerste 4 tekens
Verplaats de landcode en het controlegetal naar het einde:
- Origineel: NL91 ABNA 0417 1643 00
- Nieuw: ABNA0417164300 NL91

#### Stap 2: Converteer letters naar cijfers
Vervang letters door cijfers (A=10, B=11, C=12, etc.):
- ABNA = 10112310
- NL = 2321

Resultaat: 101123100417164300232191

#### Stap 3: Deel door 97
Deel dit enorme getal door 97:

Als de restwaarde 1 is, is het IBAN geldig!

\`
101123100417164300232191 ÷ 97 = ... rest 1
\`

### Automatische controles

Onze [IBAN Checker](/tools/iban) doet al dit werk automatisch voor je. Je hoeft alleen 
het IBAN in te voeren en de tool controleert:

1. ✅ Lengte (18 tekens voor NL)
2. ✅ Landcode (geldige EU-landcode)
3. ✅ Controlegetal (MOD-97 validatie)
4. ✅ Bankcode (herkende Nederlandse bank)

## Nederlandse bankcodes

Hier zijn enkele veelvoorkomende Nederlandse bankcodes:

| Code | Bank |
|------|------|
| ABNA | ABN AMRO |
| INGB | ING Bank |
| RABO | Rabobank |
| SNSB | SNS Bank |
| TRIO | Triodos Bank |
| KNAB | Knab |
| BUNQ | Bunq |
| RBRB | RegioBank |

## IBAN lengtes per land

Niet elk land heeft een IBAN van 18 tekens. Hier zijn enkele voorbeelden:

- **Nederland**: 18 tekens
- **België**: 16 tekens
- **Duitsland**: 22 tekens
- **Frankrijk**: 27 tekens
- **Spanje**: 24 tekens
- **Verenigd Koninkrijk**: 22 tekens

## Veelvoorkomende IBAN-fouten

### Typfouten
- Verkeerde letters (bijv. 0 in plaats van O)
- Verkeerde cijfers (bijv. 5 in plaats van 6)
- Missende tekens
- Extra spaties of koppeltekens

### Verkeerde landcode
- BE (België) in plaats van NL (Nederland)
- DE (Duitsland) in plaats van NL

### Verkeerde lengte
- Oude rekeningnummers zonder conversie
- Missende nullen aan het begin

## Hoe controleer je een IBAN?

### Manier 1: Handmatig (moeilijk)
Gebruik het MOD-97 algoritme zoals hierboven beschreven.

### Manier 2: Online tool (makkelijk)
Gebruik onze [IBAN Checker](/tools/iban):

1. Ga naar de IBAN Checker
2. Voer het IBAN in (met of zonder spaties)
3. Klik op "Controleer"
4. Zie direct of het IBAN geldig is

### Manier 3: Via je bank
De meeste banken controleren IBAN-nummers automatisch bij het invoeren.

## IBAN en SEPA

SEPA (Single Euro Payments Area) maakt gebruik van IBAN-nummers voor alle 
betalingen binnen Europa. Dit betekent:

- Eenvoudige overschrijvingen binnen Europa
- Dezelfde kosten als binnenlandse betalingen
- Snelle verwerking (meestal binnen 1 werkdag)

## Veilige betalingstips

1. **Controleer altijd het IBAN** bij eerste betalingen
2. **Vraag het IBAN op** via een betrouwbaar kanaal
3. **Check het IBAN** met onze tool voordat je betaalt
4. **Bewaar bevestigingen** van betalingen
5. **Wees alert** op verzoeken om geld over te maken naar onbekende rekeningen

## Conclusie

Het controleren van IBAN-nummers is een simpele maar belangrijke stap om betalingsfouten 
te voorkomen. Gebruik onze [IBAN Checker](/tools/iban) om snel en makkelijk te verifiëren 
of een IBAN geldig is. Het kost maar een seconde en kan je veel problemen besparen!
    `,
  },
  "maximale-hypotheek-2025": {
    title: "Maximale Hypotheek 2025: Rekenregels en Tips",
    excerpt: "Alles over de maximale hypotheek in 2025. Leer hoeveel je kunt lenen, welke factoren meespelen en hoe je je leencapaciteit vergroot.",
    date: "2024-12-20",
    readTime: "9 min",
    category: "Hypotheek",
    author: "QuotApp.nl",
    keywords: ["maximale hypotheek", "leencapaciteit", "hypotheek 2025"],
    content: `
## Maximale hypotheek in 2025

Als je een huis wilt kopen, is het belangrijk om te weten hoeveel je maximaal kunt lenen. 
In dit artikel bespreken we de regels voor 2025 en geven we tips om je leencapaciteit 
te optimaliseren.

## De basisregel: Inkomen × 4,5

De meeste hypotheekverstrekkers hanteren de volgende vuistregel:

\`
Maximale hypotheek = Bruto jaarinkomen × 4,5
\`

**Voorbeeld:**
- Bruto jaarinkomen: €50.000
- Maximale hypotheek: €50.000 × 4,5 = €225.000

Soms kan dit oplopen tot 5x het inkomen, afhankelijk van je persoonlijke situatie.

## Welk inkomen telt mee?

### Volledig meegenomen:
- Vaste salaris uit loondienst
- Vakantiegeld
- Vaste eindejaarsuitkering
- Partner inkomen (100%)

### Gedeeltelijk meegenomen:
- Variabele bonussen (meestal gemiddeld over 2-3 jaar)
- Provisie-inkomsten
- ZZP-inkomen (meestal gemiddeld over 2-3 jaar)
- Overwerk (soms beperkt)

### Niet meegenomen:
- Alimentatie (wordt afgetrokken van lasten)
- Toeslagen
- Uitkeringen (soms wel met voorwaarden)

## Factoren die je leencapaciteit beïnvloeden

### Positieve factoren (hogere hypotheek)

1. **Hoog inkomen**: Hoger salaris = meer leencapaciteit
2. **Partner met inkomen**: Beide inkomens tellen mee
3. **Lage rente**: Lagere maandlasten = meer ruimte
4 **Vaste contract**: Geeft zekerheid aan banken
5. **Geen schulden**: Meer ruimte voor hypotheek

### Negatieve factoren (lagere hypotheek)

1. **Studieschuld**: Verlaagt je leencapaciteit
2. **Andere leningen**: Worden afgetrokken van je inkomen
3. **Alimentatie**: Vermindert je draagkracht
4. **Tijdelijk contract**: Geeft minder zekerheid
5. **Oudere leeftijd**: Kortere looptijd mogelijk

## Studieschuld en hypotheek

Een studieschuld heeft significante invloed op je leencapaciteit. De bank rekent met 
een maandlast voor je studieschuld, wat je maximale hypotheek verlaagt.

**Voorbeeld:**
- Zonder studieschuld: €225.000 hypotheek mogelijk
- Met €20.000 studieschuld: ca. €200.000 hypotheek mogelijk

**Tip:** Je kunt ervoor kiezen om je studieschuld niet te melden, maar dit is niet 
verstandig en kan problemen geven bij betalingsproblemen.

## Andere financiële verplichtingen

Alle maandelijkse verplichtingen worden afgetrokken van je leencapaciteit:

- Doorlopend krediet
- Persoonlijke lening
- Lease-auto (privé)
- Krediet op afbetaling
- Alimentatie

## Maximale hypotheek berekenen: Stappenplan

### Stap 1: Verzamel je inkomensgegevens
- Jaaropgave van werkgever(s)
- Overzicht vaste en variabele inkomsten
- Partner inkomen (indien van toepassing)

### Stap 2: Maak overzicht van schulden
- Studieschuld (bedrag + maandlast)
- Overige leningen (bedrag + maandlast)
- Kredieten en afbetalingen

### Stap 3: Gebruik onze calculator
Vul je gegevens in onze [Hypotheek Calculator](/tools/hypotheek) in voor een eerste indicatie.

### Stap 4: Neem contact op met een adviseur
Een hypotheekadviseur kan een exacte berekening maken op basis van je volledige situatie.

## Tips om je leencapaciteit te vergroten

### 1. Aflossen van schulden
Betaal zoveel mogelijk schulden af voordat je een hypotheek aanvraagt. 
Dit verhoogt je leencapaciteit direct.

### 2. Extra sparen
Hoewel je tegenwoordig 100% kan financieren, helpt eigen geld bij:
- Bijkomende kosten (kosten koper)
- Lagere maandlasten
- Betere onderhandelingspositie

### 3. Partner meenemen
Met twee inkomens kun je aanzienlijk meer lenen dan alleen.

### 4. Tijdelijk contract omzetten
Vraag je werkgever om een vast contract. Dit geeft banken meer zekerheid.

### 5. NHG overwegen
Met de Nationale Hypotheek Garantie krijg je vaak een lagere rente, 
waardoor je maandlasten lager zijn.

## Rekenvoorbeelden 2025

### Voorbeeld 1: Alleenstaande
- Inkomen: €42.000
- Geen schulden
- Rente: 3,5%
- **Maximale hypotheek**: €189.000
- **Bruto maandlasten**: ca. €850

### Voorbeeld 2: Samenwonend stel
- Inkomen 1: €45.000
- Inkomen 2: €38.000
- Totaal: €83.000
- Rente: 3,5%
- **Maximale hypotheek**: €373.500
- **Bruto maandlasten**: ca. €1.680

### Voorbeeld 3: Met studieschuld
- Inkomen: €50.000
- Studieschuld: €25.000
- Rente: 3,5%
- **Maximale hypotheek**: ca. €200.000 (i.p.v. €225.000)

## De NHG-grens 2025

De Nationale Hypotheek Garantie biedt extra zekerheid:

- **Standaard**: €435.000
- **Met energiebesparende maatregelen**: €465.000

Boven deze grenzen is een hypotheek zonder NHG mogelijk, maar vaak 
met een iets hogere rente.

## Belangrijke overwegingen

### Niet het maximum lenen
Het is verstandig om niet het maximale bedrag te lenen. Houd rekening met:
- Toekomstige rentestijgingen
- Wijzigingen in inkomen
- Onverwachte uitgaven
- Kinderwens (hogere lasten)

### Buffer aanhouden
Zorg dat je na de maandlasten genoeg overhoudt voor:
- Vaste lasten (gas, water, licht)
- Boodschappen
- Vrije tijd
- Sparen

## Conclusie

Het berekenen van je maximale hypotheek is de eerste stap naar je eigen woning. 
Gebruik onze [Hypotheek Calculator](/tools/hypotheek) voor een eerste indicatie, 
maar raadpleeg altijd een onafhankelijke hypotheekadviseur voor een exacte berekening.

Onthoud: het maximale bedrag is niet altijd het verstandige bedrag. Kijk naar je 
totale financiële situatie en houd een buffer aan voor onverwachte gebeurtenissen.
    `,
  },

  "hypotheek-berekenen-2026": {
    title: "Hypotheek Berekenen 2026: Alles Wat Je Moet Weten",
    excerpt: "Complete gids over hypotheken in 2026. Leer hoe je je maximale hypotheek berekent, wat je maandlasten worden en alles over NHG en annuïteitenhypotheek.",
    date: "2026-03-27",
    readTime: "12 min",
    category: "Hypotheek",
    author: "QuotApp.nl",
    keywords: ["hypotheek berekenen", "maximale hypotheek", "maandlasten hypotheek", "NHG 2026"],
    content: `
## Wat is een Hypotheek?

Een hypotheek is een lening voor de aankoop van onroerend goed, waarbij de woning als onderpand dient. In Nederland zijn er meerdere hypotheekvormen, elk met eigen kenmerken, maandlasten en fiscale gevolgen.

## Soorten Hypotheken in Nederland

### Annuïteitenhypotheek
Bij een annuïteitenhypotheek betaal je elke maand een vast bedrag dat bestaat uit rente en aflossing. Aan het begin betaal je relatief veel rente en aan het einde vooral aflossing.

### Lineaire Hypotheek
Bij een lineaire hypotheek los je elke maand een vast bedrag af. Daardoor daalt je restschuld sneller en worden je maandlasten in de loop van de tijd lager.

### Aflossingsvrije Hypotheek
Bij een aflossingsvrije hypotheek betaal je alleen rente. Je lost niet tussentijds af, waardoor de maandlasten lager zijn, maar de schuld blijft staan.

## Hoe Bereken Je Je Maximale Hypotheek?

Je maximale hypotheek hangt onder meer af van:
- Je bruto jaarinkomen
- Het inkomen van je partner
- Lopende leningen en andere vaste lasten
- De rentevaste periode
- De marktwaarde van de woning

Gebruik voor een snelle indicatie onze [Hypotheek Calculator](/tools/hypotheek) en vergelijk daarna ook je maandlasten met de [Hypotheek Maandlasten Calculator](/tools/hypotheek-maandlasten).

## Hypotheekrente in 2026

De actuele hypotheekrente verschilt per aanbieder en rentevaste periode. Let daarom niet alleen op de laagste rente, maar ook op voorwaarden zoals boetevrij aflossen, meeneemregelingen en de mogelijkheid om extra af te lossen.

## Bijkomende Kosten

Naast de woningprijs krijg je vaak te maken met extra kosten, zoals:
- Taxatiekosten
- Notariskosten
- Advies- en bemiddelingskosten
- Kosten voor NHG
- Eventuele verbouwingskosten

## Praktische Tips voor Starters

1. Bouw eerst een financiële buffer op.
2. Houd rekening met extra kosten koper.
3. Vergelijk meerdere aanbieders en adviseurs.
4. Kijk niet alleen naar maximaal lenen, maar vooral naar comfortabel wonen.
5. Controleer of NHG in jouw situatie voordeel oplevert.

## Veelgestelde Vragen

### Hoeveel kan ik lenen in 2026?
Dat hangt af van je inkomen, schulden, rente en woningwaarde. Een online berekening is een goede eerste stap, maar een adviseur kan je exacte mogelijkheden bepalen.

### Wat is beter: annuïtair of lineair?
Dat hangt af van je voorkeur. Een annuïteitenhypotheek geeft stabielere maandlasten, terwijl een lineaire hypotheek over de hele looptijd vaak goedkoper is.

## Conclusie

Een hypotheek berekenen is meer dan alleen een maximum bedrag opzoeken. Kijk naar betaalbaarheid, risico en flexibiliteit. Begin met onze [Hypotheek Calculator](/tools/hypotheek), verdiep je daarna in je opties en laat je goed adviseren.
    `,
  },
  "lening-berekenen-2026-complete-gids": {
    title: "Lening Berekenen 2026: Complete Gids",
    excerpt: "Alles over leningen berekenen in 2026. Persoonlijke lening, autofinanciering en kredietrente: leer wat je maandlasten worden.",
    date: "2026-03-27",
    readTime: "10 min",
    category: "Leningen",
    author: "QuotApp.nl",
    keywords: ["lening berekenen", "persoonlijke lening", "maandlasten lening", "kredietrente"],
    content: `
## Wat is een Lening?

Een lening is een bedrag dat je leent van een kredietverstrekker en later terugbetaalt met rente. Er zijn verschillende leenproducten, elk met een eigen looptijd, rente en risico.

## Soorten Leningen in Nederland

### Persoonlijke Lening
Een persoonlijke lening heeft meestal een vaste rente en vaste looptijd. Daardoor weet je vooraf precies wat je maandlasten zijn.

### Doorlopend Krediet
Bij een doorlopend krediet kun je flexibel opnemen tot een afgesproken limiet. Dat klinkt handig, maar het maakt het vaak lastiger om snel schulden af te lossen.

### Autofinanciering
Voor een auto kun je kiezen voor speciale financiering. Vergelijk altijd de totale kosten met onze [Auto Lening Calculator](/tools/auto-lening) en de standaard [Lening Calculator](/tools/lening).

## Hoe Bereken Je Maandlasten?

Bij het berekenen van je lening kijk je naar:
- Het leenbedrag
- De rente
- De looptijd
- Eventuele extra kosten of verzekeringen

Een langere looptijd verlaagt meestal je maandlasten, maar verhoogt vaak de totale kosten van de lening.

## Waar Moet Je Op Letten?

1. Vergelijk niet alleen rente, maar vooral het JKP.
2. Controleer of je boetevrij extra kunt aflossen.
3. Kijk of er verplichte verzekeringen zijn gekoppeld.
4. Leen alleen voor een doel dat past bij je financiële situatie.
5. Houd ruimte over in je maandbudget.

## Slimmer Lenen

Wil je inzicht in wat verantwoord is? Combineer dan deze gids met onze [Persoonlijke Financiën Tool](/tools/persoonlijke-financiën) en [Buffer Calculator](/tools/buffer-calculator) om te zien of je genoeg financiële ruimte hebt.

## Veelgestelde Vragen

### Hoeveel kan ik lenen?
Dat hangt af van je inkomen, woonlasten, andere schulden en kredietverleden. Een rekentool geeft snel een indicatie, maar aanbieders doen altijd een eigen toetsing.

### Is eerder aflossen slim?
Vaak wel, omdat je totale rentekosten dalen. Controleer wel eerst of daar voorwaarden of kosten aan verbonden zijn.

## Conclusie

Een lening moet overzicht geven, geen stress veroorzaken. Bereken vooraf je maandlasten, vergelijk aanbieders kritisch en leen alleen wat past binnen je budget.
    `,
  },
  "sparen-rente-op-rente-2026": {
    title: "Sparen en Rente-op-Rente: De Kracht van Samengestelde Rente",
    excerpt: "Ontdek het effect van rente-op-rente en hoe je spaargeld in 2026 sneller groeit met slim sparen en de juiste spaarrente.",
    date: "2026-03-27",
    readTime: "9 min",
    category: "Sparen",
    author: "QuotApp.nl",
    keywords: ["sparen berekenen", "rente op rente", "spaarrente", "samengestelde rente"],
    content: `
## Wat is Rente-op-Rente?

Rente-op-rente betekent dat je rente ontvangt over je spaargeld én over de eerder opgebouwde rente. Daardoor groeit je vermogen steeds sneller naarmate je langer spaart.

## Waarom is dit zo krachtig?

Het effect zit in tijd en consistentie. Hoe eerder je begint, hoe groter het verschil op lange termijn. Zelfs kleine maandelijkse bedragen kunnen flink groeien.

## Voorbeeld van Samengestelde Rente

Start je met €10.000 tegen 3% rente per jaar, dan groeit dit zonder extra inleg in 20 jaar naar ongeveer €18.061. Het grootste verschil ontstaat in de latere jaren doordat je rente op rente ontvangt.

## Praktische Tips voor Sparen in 2026

### 1. Start vroeg
Wie eerder begint, geeft samengestelde rente meer tijd om zijn werk te doen.

### 2. Spaar automatisch
Met een automatische overboeking bouw je discipline op zonder er steeds over na te denken.

### 3. Vergelijk spaarrentes
Gebruik onze [Spaarrente Vergelijker](/tools/spaarrente-vergelijker) om te zien welke bank of spaarvorm het beste past.

### 4. Bereken je groeipad
Met de [Sparen Calculator](/tools/sparen) en [Rente Calculator](/tools/rente) zie je direct wat extra inleg of een hogere rente doet voor je eindbedrag.

## Eerst sparen of eerst aflossen?

Dat hangt af van de rente op je schulden en je noodbuffer. Heb je dure schulden, dan is extra aflossen vaak slimmer. Heb je nog geen buffer, bouw die eerst op.

## Veelgestelde Vragen

### Hoeveel buffer heb ik nodig?
Meestal is 3 tot 6 maanden vaste lasten een goed uitgangspunt.

### Is sparen nog zinvol bij inflatie?
Ja, want een buffer voorkomt dat je moet lenen bij onverwachte kosten. Voor lange termijn doelen kun je daarnaast andere vormen van vermogensopbouw overwegen.

## Conclusie

Rente-op-rente is een van de sterkste financiële principes voor spaarders. Begin vroeg, spaar consistent en gebruik de juiste tools om je voortgang inzichtelijk te maken.
    `,
  },
};

export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug as keyof typeof blogPosts];
  
  if (!post) {
    return {
      title: "Artikel niet gevonden",
    };
  }

  return {
    title: `${post.title} | QuotApp.nl Blog`,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: {
      canonical: `https://quotapp.nl/blog/${params.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://quotapp.nl/blog/${params.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.keywords,
      images: [
        {
          url: "/og-image.svg",
          width: 1200,
          height: 630,
          alt: `${post.title} | QuotApp.nl`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["/og-image.svg"],
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug as keyof typeof blogPosts];

  if (!post) {
    notFound();
  }

  const relatedPosts = Object.entries(blogPosts)
    .filter(([slug, candidate]) => slug !== params.slug && candidate.category === post.category)
    .slice(0, 3)
    .map(([slug, candidate]) => ({ slug, ...candidate }));

  // Article schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    datePublished: post.date,
    dateModified: post.date,
    url: `https://quotapp.nl/blog/${params.slug}`,
    keywords: post.keywords.join(", "),
    articleSection: post.category,
  };

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://quotapp.nl" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://quotapp.nl/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://quotapp.nl/blog/${params.slug}` },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Back to blog */}
      <Link 
        href="/blog" 
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Terug naar blog
      </Link>

      {/* Article Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
            {post.category}
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(post.date).toLocaleDateString("nl-NL")}
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-lg text-muted-foreground">{post.excerpt}</p>
        
        <div className="flex items-center gap-2 mt-6 pt-6 border-t border-border">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">{post.author}</p>
            <p className="text-sm text-muted-foreground">Gepubliceerd op {new Date(post.date).toLocaleDateString("nl-NL")}</p>
          </div>
        </div>
      </header>

      {/* In-article Ad */}
      <InArticleAd slot="blog-article-top" />

      {/* Article Content */}
      <article className="prose prose-lg max-w-none">
        {post.content.split('\n\n').map((paragraph, index) => {
          // Handle headers
          if (paragraph.startsWith('## ')) {
            return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
          }
          if (paragraph.startsWith('### ')) {
            return <h3 key={index} className="text-xl font-bold mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
          }
          
          // Handle code blocks
          if (paragraph.startsWith('```')) {
            const lines = paragraph.split('\n').filter(line => !line.startsWith('```'));
            return (
              <pre key={index} className="bg-muted p-4 rounded-lg overflow-x-auto my-4">
                <code className="text-sm">{lines.join('\n')}</code>
              </pre>
            );
          }
          
          // Handle lists
          if (paragraph.includes('\n- ')) {
            const items = paragraph.split('\n- ').filter(Boolean);
            return (
              <ul key={index} className="list-disc list-inside space-y-2 my-4">
                {items.map((item, i) => <li key={i}>{item.replace(/^- /, '')}</li>)}
              </ul>
            );
          }
          
          // Handle numbered lists
          if (paragraph.match(/^\d+\./)) {
            const items = paragraph.split('\n').filter(line => line.match(/^\d+\./));
            return (
              <ol key={index} className="list-decimal list-inside space-y-2 my-4">
                {items.map((item, i) => <li key={i}>{item.replace(/^\d+\. /, '')}</li>)}
              </ol>
            );
          }
          
          // Handle tables (simple version)
          if (paragraph.includes('|')) {
            const lines = paragraph.split('\n').filter(line => line.includes('|'));
            if (lines.length >= 3) {
              return (
                <div key={index} className="overflow-x-auto my-4">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        {lines[0].split('|').filter(Boolean).map((cell, i) => (
                          <th key={i} className="border border-border p-2 text-left font-semibold">
                            {cell.trim()}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {lines.slice(2).map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.split('|').filter(Boolean).map((cell, i) => (
                            <td key={i} className="border border-border p-2">
                              {cell.trim()}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }
          }
          
          // Regular paragraphs with link handling
          const content = paragraph
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>');
          
          return (
            <p 
              key={index} 
              className="mb-4 text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          );
        })}
      </article>

      {/* In-article Ad */}
      <InArticleAd slot="blog-article-mid" />

      {/* Share Section */}
      <div className="mt-12 pt-8 border-t border-border">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="font-semibold mb-1">Vond je dit artikel nuttig?</h3>
            <p className="text-sm text-muted-foreground">Deel het met anderen die hier ook wat aan hebben.</p>
          </div>
          <ShareButton 
            title={post.title}
            text={post.excerpt}
            url={`https://quotapp.nl/blog/${params.slug}`}
          />
        </div>
      </div>

      {relatedPosts.length > 0 ? (
        <section className="mt-12 pt-8 border-t border-border">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold">Meer artikelen over {post.category.toLowerCase()}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Verdiep je verder met gerelateerde uitleg en praktische rekentips.
              </p>
            </div>
            <Link href="/blog" className="text-sm font-medium text-primary hover:underline">
              Bekijk alle artikelen
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="group rounded-xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-sm transition-all"
              >
                <p className="text-xs font-medium text-primary mb-2">{relatedPost.category}</p>
                <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                  {relatedPost.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                  {relatedPost.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-4">
                  Lees artikel
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* Related Tools */}
      <div className="mt-12">
        <RelatedTools limit={4} />
      </div>

      {/* Bottom Ad */}
      <div className="mt-8">
        <InlineAd slot="blog-article-bottom" />
      </div>
    </div>
  );
}
