# QuotApp

QuotApp is een Nederlandse verzameling gratis online rekentools voor geld, wonen, belastingen, salaris en dagelijkse berekeningen.

## Wat je hier vindt

- 46 gratis calculators voor de Nederlandse markt
- Belangrijke categorieën zoals hypotheek, lening, sparen, BTW en salaris
- Mobielvriendelijke toolpagina's met directe berekeningen in de browser
- SEO-landingspagina's en blogcontent rond financiële zoekvragen
- Deel-, favorieten- en feedbackcomponenten voor toolgebruik

## Stack

- Next.js 15
- React 18
- TypeScript
- Tailwind CSS 4
- Framer Motion

## Lokaal starten

```bash
npm install
npm run dev
```

Open daarna `http://localhost:3000`.

## Belangrijke scripts

```bash
npm run dev
npm run build
npm run start
```

## Projectstructuur

- `src/app/page.tsx` – homepage
- `src/app/tools/page.tsx` – overzicht van alle tools
- `src/app/tools/*` – individuele calculatorpagina's
- `src/components/*` – herbruikbare UI-componenten
- `src/lib/*` – hulpfuncties en gedeelde constants

## Opmerking

Deze repository is geen quote-platform meer. Documentatie en copy horen daarom aan te sluiten op de huidige calculator-site van QuotApp.
