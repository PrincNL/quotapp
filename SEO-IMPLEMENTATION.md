# SEO Optimalisatie QuotApp - Implementatie Plan

## ✅ VOLTOOID - Technische SEO

### 1. Core Web Vitals Optimalisaties
- [x] Preconnect/dns-prefetch toegevoegd voor Google Ads
- [x] Font display swap geconfigureerd
- [x] Viewport meta geoptimaliseerd
- [x] Theme color voor mobile browsers

### 2. Meta Tags (Al aanwezig in layout.tsx)
- [x] Title template met default
- [x] Description met keywords
- [x] Keywords array
- [x] Robots meta (index, follow)
- [x] Open Graph tags
- [x] Twitter Cards
- [x] Canonical tags
- [x] Authors/Creator/Publisher
- [x] Icons en manifest

### 3. Structured Data (JSON-LD)
- [x] WebSite schema met SearchAction
- [x] Organization schema
- [x] SoftwareApplication schema per tool
- [x] FAQPage schema per tool
- [x] BreadcrumbList schema per tool

## 📝 NOG TE IMPLEMENTEREN

### 4. Content SEO - Uitbreidingen

#### Homepage (page.tsx)
- [ ] Uitbreiden naar 800-1000 woorden
- [ ] H1, H2, H3 structuur versterken
- [ ] FAQ sectie toevoegen met schema
- [ ] Internal linking sectie

#### Tool Pagina's
- [ ] SEO content uitbreiden naar 500-800 woorden
- [ ] "Wat is [tool]?" sectie
- [ ] "Waarom gebruiken?" sectie
- [ ] Voorbeelden sectie
- [ ] Meer FAQ items

#### Blog Sectie (NIEUW)
- [ ] /blog/ pagina maken
- [ ] 5-10 artikelen schrijven:
  1. "Hoe bereken je BTW in 2025 - Complete Gids"
  2. "Hypotheek berekenen voor starters in 2025"
  3. "Procenten berekenen: de complete gids"
  4. "IBAN nummer controleren: hoe werkt het?"
  5. "Maximale hypotheek 2025: wat kan je lenen?"

### 5. Ad Optimization

#### Homepage Ads
- [x] InlineAd na QuoteOfTheDay
- [x] InlineAd na tools grid
- [ ] Ad boven de fold (na hero) - VERPLAATSEN
- [ ] Sticky ad toevoegen aan sidebar

#### Tool Pagina Ads
- [x] StickyAd sidebar (BTW tool)
- [ ] Alle tools: StickyAd sidebar
- [ ] Ad na resultaat sectie
- [ ] Ad na content sectie
- [ ] Mobile anchor ad (bottom sticky)

### 6. Off-Page SEO Prep
- [ ] Open Graph images genereren (1200x630)
- [ ] Twitter Card images
- [ ] Share buttons functionaliteit versterken

### 7. Analytics & Tracking
- [ ] Google Analytics 4 events per tool
- [ ] Conversion tracking (ad clicks)

### 8. URL Structuur & Redirects
- [x] SEO-friendly URLs (al aanwezig)
- [ ] Eventuele redirects van oude URLs

## 🔧 Technische Implementatie

### Files aan te passen:
1. `/src/app/layout.tsx` - Critical CSS inline, preload fonts
2. `/src/app/page.tsx` - Content uitbreiden, FAQ toevoegen
3. `/src/app/tools/*/page.tsx` - Content uitbreiden
4. `/src/app/tools/*/*-client.tsx` - Ad placements
5. `/src/app/blog/page.tsx` - NIEUW
6. `/src/app/blog/[slug]/page.tsx` - NIEUW
7. `/src/app/sitemap.ts` - Blog posts toevoegen
8. `/src/components/` - SEO components

### Nieuwe Components:
- `SEOContent.tsx` - Uitgebreide SEO tekst sectie
- `FAQSection.tsx` - FAQ met schema markup
- `RelatedTools.tsx` - Internal linking
- `BlogCard.tsx` - Blog preview cards
- `AnchorAd.tsx` - Mobile sticky bottom ad
