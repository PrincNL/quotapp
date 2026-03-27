# QuotApp.nl Review #2 - CIJFER: 8/10

**Review Agent #2 | Datum: 2026-03-27**

---

## CIJFER: 8/10 (was 7.5) ✅

QuotApp.nl heeft significante vooruitgang geboekt! De build werkt nu met Next.js 15.5.9 en er zijn belangrijke fixes doorgevoerd.

---

## BUILD STATUS: ✅ GESLAAGD

**Build resultaat:** 59 pages generated successfully
- 52 tool pages
- 5 blog posts
- Homepage, sitemap, robots.txt

**Opgeloste issues:**
- ✅ Next.js 16.2.1 → 15.5.9 downgrade (fix voor temp file bug)
- ✅ React 19 → 18.3.1 downgrade (compatibiliteit)
- ✅ `Warning` → `AlertTriangle` in zorgplicht-calculator
- ✅ JsonLd Script id attribute toegevoegd
- ✅ ShareButton client component apart gezet voor blog
- ✅ pnpm in plaats van npm (snellere installs)

---

## FIXES VERIFICATIE

| Fix | Status | Notes |
|-----|--------|-------|
| Typo EfficiëntieHypotheekClient | ✅ GEFIXT | Was al gefixt uit Review #1 |
| Build werkt | ✅ GESLAAGD | Next.js 15.5.9 + React 18.3.1 |
| Zorgplicht Warning component | ✅ GEFIXT | `Warning` → `AlertTriangle` |
| JsonLd inline script | ✅ GEFIXT | `id="json-ld"` toegevoegd |
| Blog ShareButton | ✅ GEFIXT | Client component apart |

---

## UI/UX: 8/10

### Sterke Punten:
- ✅ Consistente Tailwind CSS styling
- ✅ Dark mode via next-themes
- ✅ Framer Motion animaties (met minor warning)
- ✅ Responsive design
- ✅ Sticky ads alleen op desktop
- ✅ Mobile anchor ads

### Issues:
- ⚠️ Geen `next/image` - kan Lighthouse performance verbeteren
- ⚠️ Duplicate blog content (rente-op-rente, spaarrente)

---

## SEO: 8.5/10

### Sterke Punten:
- ✅ Uitgebreide sitemap met 38 tools
- ✅ Robots.txt met goede disallow rules
- ✅ Meta descriptions uniek per page
- ✅ Canonical URLs
- ✅ OpenGraph tags
- ✅ Schema markup (FAQPage, SoftwareApplication, Organization)
- ✅ Breadcrumb schema op tool pages
- ✅ E-E-A-T signals in Organization schema
- ✅ Blog article schema

### Issues:
- ⚠️ Keywords in sitemap niet altijd consistent met content
- ⚠️ Blog post dates 2025 in plaats van 2026

---

## ADS: 9/10

### Sterke Punten:
- ✅ Professionele ad-component structuur
- ✅ AdSense publisher ID: `ca-pub-4811749024166183`
- ✅ Lazy loading met IntersectionObserver
- ✅ Ad collapsing (na 3 seconden)
- ✅ Console logging voor tracking
- ✅ Responsive ad formats
- ✅ 8 verschillende ad slots gedefinieerd

### Issues:
- ⚠️ Ad refresh kan UX beïnvloeden

---

## PERFORMANCE: 7.5/10

### Bundle Sizes (First Load JS):
- Gemiddeld: 155-164 kB per page
- Shared: 102 kB
- Home: 161 kB

### Warnings (geen errors):
- ⚠️ Framer-motion missing `@emotion/is-prop-valid`
- ⚠️ Google Font preconnect ontbreekt in layout
- ⚠️ React Hook dependency warnings (12 files)

### Recommendations:
1. Voeg `next/image` toe voor image optimization
2. Fix React Hook dependency warnings
3. Overweeg `@emotion/is-prop-valid` te installeren

---

## NIEUWE ISSUES

1. **[PERFORMANCE]** Geen image optimization
   - Geen `next/image` gebruikt op tool pages
   - Lighthouse performance score kan ~10 punten stijgen

2. **[UX]** Duplicate blog posts
   - `rente-op-rente-kracht-van-compounding.mdx`
   - `spaarrente-2026-alle-banken-vergeleken.mdx`

3. **[SEO]** Datum inconsistenties
   - Blog posts tonen 2025 data in 2026

4. **[CODE]** React Hook dependency warnings
   - 12 client components hebben `useEffect` dependency issues

---

## QUICK WINS

1. **Fix React Hook warnings** (EASY - 30 min)
   ```tsx
   // In plaats van:
   useEffect(() => { bereken(); }, []);
   
   // Gebruik:
   useEffect(() => { bereken(); }, [bereken]);
   // Of:
   useCallback(() => bereken(), []) + useEffect(..., [bereken])
   ```

2. **Voeg Google Font preconnect toe** (EASY - 5 min)
   ```tsx
   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
   ```

3. **Update blog dates naar 2026** (EASY - 10 min)
   - "btw-berekenen-2025" → "btw-berekenen-2026"
   - Similar voor andere posts

4. **Installeer @emotion/is-prop-valid** (EASY - 1 min)
   ```bash
   pnpm add @emotion/is-prop-valid
   ```

---

## RECOMMENDATION

**8.5/10 bereikbaar met:**
1. Fix React Hook dependency warnings (~30 min)
2. Voeg Google Font preconnect toe (~5 min)
3. Update blog dates naar 2026 (~10 min)
4. Image optimization met `next/image` (~1 uur)

**Huidige status:** Build werkt, SEO is sterk, ads zijn professioneel. Focus nu op performance optimalisatie.

---

## SPECIFIEKE FILES

| File | Status | Issue |
|------|--------|-------|
| `src/app/tools/efficiëntie-hypotheek/page.tsx` | ✅ OK | Typo was al gefixt |
| `src/app/tools/zorgplicht-calculator/zorgplicht-calculator-client.tsx` | ✅ FIXED | Warning → AlertTriangle |
| `src/components/json-ld.tsx` | ✅ FIXED | id="json-ld" toegevoegd |
| `src/components/share-button.tsx` | ✅ NEW | Client component voor blog share |
| `src/app/blog/[slug]/page.tsx` | ✅ FIXED | ShareButton vervangen |
| `src/components/ad-components.tsx` | ✅ OK | Professionele implementatie |
| `src/app/sitemap.ts` | ✅ OK | Uitgebreid, 38 tools |
| `src/app/robots.ts` | ✅ OK | Goede config |
| `src/app/layout.tsx` | ✅ OK | Complete schema markup |
| `next.config.ts` | ✅ OK | Next.js 15.5.9 compatible |

---

## CONCLUSIE

**Positief:**
- ✅ Build werkt nu (was geblokkeerd)
- ✅ Typo fix uit Review #1 succesvol
- ✅ SEO is uitstekend
- ✅ Ads zijn professioneel geïmplementeerd
- ✅ UI is consistent en responsive

**Te Verbeteren:**
- ⚠️ React Hook dependency warnings (12x)
- ⚠️ Geen image optimization
- ⚠️ Duplicate blog content
- ⚠️ Blog dates 2025 i.p.v. 2026

**Volgende stap:** Focus op performance optimalisatie (React Hooks + next/image) om Lighthouse score te verbeteren.

---

*Review uitgevoerd door Harrie H - 2026-03-27*
