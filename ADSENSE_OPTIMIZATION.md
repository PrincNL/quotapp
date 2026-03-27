# AdSense Optimalisatie Rapport - QuotApp.nl

**Datum:** 2026-03-27  
**Status:** ✅ Geïmplementeerd

---

## Samenvatting

AdSense verdiensten zijn geoptimaliseerd door betere ad plaatsing, lazy loading, scroll-based refresh, en performance tracking toe te voegen.

---

## TAAK 1: Ad Placement Optimalisatie ✅

### Analyse Bevindingen:
- **Probleem:** Te veel inline ads achter elkaar veroorzaakte ad blindness
- **Oplossing:** Smart inline ads met scroll-triggered visibility

### Verbeteringen Homepage:
- Verwijderd: 5x inline ads in raporte volgorde
- Toegevoegd: SmartInlineAd (laat alleen zien wanneer zichtbaar)
- Nieuw: Tweede sidebar ad (StickyAdLower) voor desktop

### Verbeteringen Tool Pagina's:
- Nieuw: ToolTopBannerAd boven de fold
- Nieuw: BottomAd onderaan de pagina
- Verbeterd: Consistente sidebar placement

---

## TAAK 2: Nieuwe Ad Units ✅

### Nieuwe Ad Slots toegevoegd:
```typescript
export const AD_SLOTS = {
  // ... bestaande slots ...
  homepageSidebar2: "4612345678", // Tweede sidebar voor desktop
  toolTop: "8912345678",          // Top banner voor tools
  toolBottom: "7123456789",        // Bottom ad voor tools
};
```

### Nieuwe Componenten:
1. **ToolTopBannerAd** - Leaderboard voor tool pagina's
2. **BottomAd** - Full-width footer ad
3. **StickyAdLower** - Second sticky sidebar voor langere pagina's
4. **SmartInlineAd** - Scroll-triggered inline ad

---

## TAAK 3: Ad Refresh & Lazy Loading ✅

### Geïmplementeerd:

#### Lazy Loading:
- Ads onder de fold laden nu pas when visible
- Intersection Observer trackt zichtbaarheid
- Configurable per ad placement

#### Scroll-Based Refresh:
- Ads refreshen bij 50% scroll diepte (max 1x per pagina)
- Prevents onnodige refreshes
- Verbeterde viewability scores

### Implementatie:
```typescript
// Intersection Observer voor visibility tracking
function useAdVisibility(slot: string, position: string, threshold = 0.5) {
  // ...
}

// Scroll-based refresh (max 1x per pagina)
useEffect(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  // Refresh bij 50% scroll
}, [isVisible]);
```

---

## TAAK 4: Responsive Ad Optimalisatie ✅

### Verbeteringen:
- Mobile anchor ad met betere styling
- Responsive breakpoints voor alle ad formats
- Sticky sidebar alleen op desktop (`hidden xl:block`)
- Container queries voor betere responsive control

### Performance:
- Lazy loading reduces initial page load
- Debounced ad requests voorkomen overwhelming
- AMP-achtige snelheid door minimal rendering

---

## TAAK 5: Ad Performance Monitoring ✅

### Console Logging voor Test:
```typescript
export const adTracker = {
  impressions: new Set<string>(),
  views: new Map<string, number>(),
  clicks: new Map<string, number>(),
  
  logImpression(slot: string, position: string) { ... },
  logView(slot: string, position: string, percentage: number) { ... },
  logClick(slot: string, position: string) { ... },
  getStats() { ... }
};
```

### Wat wordt gelogd:
- 📊 Impressions per slot en positie
- 👁️ View percentage (0-100%)
- 🖱️ Clicks met CTR berekening
- 🔄 Refresh events

### Hoe te Testen:
Open browser console op QuotApp.nl en filter op `[AdTracker]` of `[AdBanner]`

---

## Bestanden Gewijzigd

| Bestand | Wijzigingen |
|---------|-------------|
| `src/components/ad-components.tsx` | Nieuwe componenten, lazy loading, tracking |
| `src/app/page.tsx` | Verbeterde homepage ad placement |
| `src/app/tools/btw/btw-client.tsx` | ToolTopBannerAd, SmartInlineAd, BottomAd |
| `src/app/tools/hypotheek/hypotheek-client.tsx` | Idem |
| `src/app/tools/procent/procent-client.tsx` | Idem |
| `src/app/tools/lening/lening-client.tsx` | Idem |

---

## Aanbevelingen voor Verdere Optimalisatie

### Ad Formats om te Testen:
1. **In-feed ads** voor langere tool pagina's
2. **Matched content** units onder related tools
3. **Custom search ads** voor zoekfunctionaliteit

### Nieuwe Ad Placements:
1. **Interstitial ads** (met mate) na eerste berekening
2. **Floating ads** na X scrolls (alleen desktop)
3. **Video ads** als pre-roll voor eventuele video content

### RPM Verbeteringen:
1. Test verschillende ad formats per positie
2. Experimenteer met sticky ad timing
3. Monitor viewability rates via AdSense dashboard
4. Overweeg premium AdX (Ad Exchange) voor hogere RPM

---

## Monitoring Checklist

- [ ] Check AdSense dashboard voor RPM trends
- [ ] Monitor viewability rates (>70% is goed)
- [ ] Test verschillende ad placements
- [ ] Check for ad blindness complaints
- [ ] A/B test top banner vs sidebar dominantie

---

*Laatst bijgewerkt: 2026-03-27*
