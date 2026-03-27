# QuotApp.nl Review #1 - CIJFER: 7.5/10

**Review Agent #1 | Datum: 2026-03-27**

---

## CIJFER: 7.5/10

QuotApp.nl is een goed ontwikkelde Nederlandse rekentools site met solide SEO, uitgebreide content, en professionele ads integratie. De site heeft echter **1 kritieke build fout** die gecorrigeerd moet worden.

---

## BREAKDOWN

### Build: 7/10
**Issues:**
- ❌ **KRITIEK:** `EfficiëntieHypotheekClient is not defined` - Typo in `src/app/tools/efficiëntie-hypotheek/page.tsx`
  - Import: `EfficientieHypotheekClient` (zonder ï)
  - Export: `EfficiëntieHypotheekClient` (met ï)
  - Fix: Wijzig import in `page.tsx` naar `EfficiëntieHypotheekClient`
- ⚠️ `instrumentationHook` en `eslint` config in `next.config.ts` geven warnings
- ⚠️ Lockfile warning (multiple lockfiles gedetecteerd)

### UI/UX: 8/10
**Issues:**
- ✅ Consistente styling met Tailwind CSS
- ✅ Dark mode ondersteuning via `next-themes`
- ✅ Framer Motion animaties
- ✅ Responsive design (sticky ads alleen op desktop)
- ✅ Mobile anchor ads
- ⚠️ Geen lazy loading van images (0 van 48 tools pages gebruiken `next/image` of `next/dynamic`)

### SEO: 8.5/10
**Issues:**
- ✅ Uitgebreide sitemap met 38 tools en 3 blog posts
- ✅ Prioriteiten en changeFrequency correct ingesteld
- ✅ Robots.txt met goede disallow rules
- ✅ Meta descriptions uniek per page
- ✅ Canonical URLs aanwezig
- ✅ OpenGraph tags
- ✅ Schema markup (FAQPage, SoftwareApplication, Organization)
- ✅ Breadcrumb schema op tool pages
- ⚠️ Sommige keywords in sitemap zijn niet consistent met page content

### Ads: 9/10
**Issues:**
- ✅ Professionele ad-component structuur met meerdere varianten:
  - `TopBannerAd`, `InlineAd`, `StickyAd`, `StickyAdLower`, `InFeedAd`, `AnchorAd`, `RectangleAd`
- ✅ AdSense publisher ID: `ca-pub-4811749024166183`
- ✅ Lazy loading met IntersectionObserver
- ✅ Scroll-based ad refresh
- ✅ Ad collapsing (na 3 seconden)
- ✅ Console logging voor tracking
- ✅ Sticky sidebar ads met dismiss button
- ✅ Mobile anchor ads
- ✅ Responsive ad formats

### Content: 8.5/10
**Issues:**
- ✅ 48 tools beschikbaar
- ✅ 34 blog posts (MDX formaat)
- ✅ FAQ sections op alle tools
- ✅ Related tools sectie
- ✅ Tool activity tracking (recent tools, favorites)
- ✅ Share functionality
- ✅ Feedback forms
- ✅ Social proof testimonials
- ⚠️ Sommige blog posts zijn duplicated (bijv. "rente-op-rente" en "spaarrente")

### Performance: 7.5/10
**Issues:**
- ⚠️ **GEEN lazy loading van images** - Geen `next/image` of `next/dynamic` usage
- ✅ Tailwind CSS efficient (tree-shaking)
- ✅ Framer Motion voor animaties
- ✅ Client/server component splitting
- ✅ `output: 'standalone'` voor efficiënte Docker deployments
- ⚠️ Geen image optimization
- ⚠️ Geen code splitting per page (alles in 1 bundle?)

---

## TOP 10 CRITICAL ISSUES

1. **[BUILD] TypeError in efficiëntie-hypotheek** - Import heet `EfficientieHypotheekClient` maar export heet `EfficiëntieHypotheekClient` (met ï)

2. **[BUILD] next.config.ts warnings** - `instrumentationHook` en `eslint` keys niet herkend in Next.js 16

3. **[PERFORMANCE] Geen image lazy loading** - 0 pages gebruiken `next/image` of `next/dynamic`

4. **[UX] Duplicate blog content** - `rente-op-rente-kracht-van-compounding.mdx` en `rente-op-rente-de-kracht-van-compounding.mdx` lijken vergelijkbaar

5. **[UX] Duplicate blog content** - `spaarrente-2026-alle-banken-vergeleken.mdx` en `spaarrente-2026-allerbanken-vergeleken.mdx`

6. **[SEO] Keywords mismatch** - Keywords in sitemap niet altijd consistent met page content

7. **[BUILD] Multiple lockfiles** - `package-lock.json` en mogelijk `pnpm-lock.yaml` in parent directory

8. **[PERFORMANCE] Large JS bundle** - Geen zichtbare code splitting per tool page

9. **[UX] Ad refresh kan scroll triggeren** - Scroll-based ad refresh kan user experience beïnvloeden

10. **[SEO] 2025 dates in content** - Sommige blog posts hebben nog 2025 in de date terwijl het 2026 is

---

## TOP 5 QUICK WINS

1. **Fix de typofout in efficiëntie-hypotheek** (1 regel wijzigen)
   ```tsx
   // page.tsx regel 2, wijzig:
   import { EfficientieHypotheekClient } from "./efficiëntie-hypotheek-client";
   // Naar:
   import { EfficiëntieHypotheekClient } from "./efficiëntie-hypotheek-client";
   ```

2. **Verwijder deprecated config uit next.config.ts**
   ```ts
   // Verwijder experimental.instrumentationHook
   // Verwijder eslint config block
   ```

3. **Voeg next/image toe aan homepage tool icons** - zal Lighthouse score significant verbeteren

4. **Merge duplicate blog posts** - verwijder redundant content

5. **Update blog post dates naar 2026** - consistentie voor SEO

---

## RECOMMENDATION

**8/10 needs:**
- Fix de build error (typofout)
- Voeg image optimization toe
- Merge duplicate content

**Na fix: 8.5/10** - Uitstekende basis met goede SEO en ads integratie. Kleine fixes nodig voor productie.

---

## SPECIFIEKE FILES TE CONTROLEREN

| File | Status | Issue |
|------|--------|-------|
| `src/app/tools/efficiëntie-hypotheek/page.tsx` | ❌ FAIL | Typo import |
| `next.config.ts` | ⚠️ WARN | Deprecated config |
| `src/components/ad-components.tsx` | ✅ OK | Professionele implementatie |
| `src/app/sitemap.ts` | ✅ OK | Uitgebreid |
| `src/app/robots.ts` | ✅ OK | Goed geconfigureerd |
| `src/app/globals.css` | ✅ OK | Proper design tokens |
| `src/app/layout.tsx` | ✅ OK | Complete schema markup |
| `src/app/blog/page.tsx` | ✅ OK | Goede blog structuur |

---

*Review uitgevoerd door Harrie H - 2026-03-27*
