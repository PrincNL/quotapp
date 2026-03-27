# QuotApp.nl Google Indexing Guide

> Complete stappenplan om QuotApp.nl volledig te laten indexeren door Google

---

## 📋 Quick Checklist

### Stap 1: Google Search Console Setup (10 min)
- [ ] Ga naar https://search.google.com/search-console
- [ ] Login met Google account
- [ ] Voeg property toe: `quotapp.nl` (kies "Domein" type)
- [ ] Verifieer eigendom via DNS TXT record
- [ ] Check dat sitemap.xml vindbaar is

### Stap 2: Sitemap Indienen (2 min)
- [ ] Navigeer naar Sitemaps in sidebar
- [ ] Voer `sitemap.xml` in
- [ ] Klik "Submit"

### Stap 3: Indexing Aanvragen (5 min)
- [ ] URL Inspect voor homepage
- [ ] "Request Indexing" klikken
- [ ] Herhaal voor belangrijkste tools

---

## 🔍 Google Search Console Setup

### 1. Property Aanmaken

1. **Ga naar Search Console**
   - Open: https://search.google.com/search-console
   - Login met je Google account

2. **Property Toevoegen**
   - Klik "Add Property" (wit property toevoegen knop)
   - Kies **"Domain"** type (niet URL prefix!)
   - Voer in: `quotapp.nl`

3. **Verificatie**
   - Google toont een TXT record
   - Ga naar je DNS provider (bijv. Cloudflare, TransIP, Yourhosting)
   - Voeg TXT record toe:
     ```
     Name: @
     Type: TXT
     Value: google-site-verification=xxxxxxx
     ```
   - Wacht 1-5 minuten
   - Klik "Verify" in Search Console

   **📸 Screenshot beschrijving:**
   ```
   ┌─────────────────────────────────────────────────┐
   │  Search Console - Add Property                   │
   │  ─────────────────────────────────────────────  │
   │  Property type:                                 │
   │    ○ URL prefix                                │
   │    ● Domain ← SELECTEER DEZE                   │
   │                                                  │
   │  Domain: quotapp.nl                            │
   │                                                  │
   │  [ Continue ]                                   │
   └─────────────────────────────────────────────────┘
   ```

### 2. Sitemap Indienen

1. **Open Sitemaps**
   - In sidebar: "Sitemaps" klikken
   - Onder "Add a sitemap": `sitemap.xml` invullen
   - Klik "Submit"

2. **Bevestiging Controleren**
   - Status zou moeten veranderen naar "Success"
   - Check "Discovered URLs" telling

   **📸 Screenshot beschrijving:**
   ```
   ┌─────────────────────────────────────────────────┐
   │  Sitemaps                                        │
   │  ─────────────────────────────────────────────  │
   │  Add a sitemap: sitemap.xml     [ Submit ]      │
   │                                                  │
   │  Submitted    Status      Last Downloaded       │
   │  sitemap.xml  ✓ Success   2026-03-27           │
   │  URLs: 48     Discovered: 48                   │
   └─────────────────────────────────────────────────┘
   ```

---

## 🕷️ URL Inspection Tool

### Homepage Indexing Aanvragen

1. **Open URL Inspector**
   - In sidebar: "URL Inspection" klikken
   - Of druk shortcut: `Ctrl + K` → type "inspect"

2. **Test Homepage**
   - Plak: `https://quotapp.nl`
   - Druk Enter

3. **Request Indexing**
   - Als page "URL is on Google" toont → klik "Request Indexing"
   - Als "Page indexed" with issues → fix issues first
   - Als "Crawled - not indexed" → klik "Request Indexing" anyway

   **📸 Screenshot beschrijving:**
   ```
   ┌─────────────────────────────────────────────────┐
   │  URL Inspection                                  │
   │  ─────────────────────────────────────────────  │
   │  [ Inspect any URL in https://quotapp.nl ]       │
   │                                                  │
   │  URL: https://quotapp.nl                         │
   │                                                  │
   │  ┌─────────────────────────────────────────┐    │
   │  │ ✓ URL is on Google                      │    │
   │  │                                         │    │
   │  │ Last crawled: 2026-03-27                │    │
   │  │ Coverage: Indexed                        │    │
   │  │                                         │    │
   │  │ [ Request Indexing ] ← KLIK DEZE        │    │
   │  └─────────────────────────────────────────┘    │
   └─────────────────────────────────────────────────┘
   ```

### Belangrijkste Tools Indexeren

Doe dit voor de top 10 tools:

| # | Tool | URL |
|---|------|-----|
| 1 | Hypotheek | https://quotapp.nl/tools/hypotheek |
| 2 | BTW | https://quotapp.nl/tools/btw |
| 3 | Procent | https://quotapp.nl/tools/procent |
| 4 | Sparen | https://quotapp.nl/tools/sparen |
| 5 | Lening | https://quotapp.nl/tools/lening |
| 6 | Rente | https://quotapp.nl/tools/rente |
| 7 | Auto Lening | https://quotapp.nl/tools/auto-lening |
| 8 | Bruto/Netto | https://quotapp.nl/tools/bruto-netto |
| 9 | Salaris | https://quotapp.nl/tools/salaris-netto |
| 10 | IBAN | https://quotapp.nl/tools/iban |

---

## 📊 Coverage Rapport Controleren

Na 1-2 dagen:

1. **Open Coverage**
   - Sidebar → "Pages" → "Coverage"
   
2. **Check Status Categories**
   ```
   ✓ Error: 0 (Ideal)
   ⚠ Warning: X (Pages with issues - ok if low)
   ✓ Valid: XX (Indexed pages)
   ⏸ Excluded: X (Intentional exclusions like /api/*)
   ```

3. **Excluded Pages审查**
   - Klik op "Excluded" tab
   - Check "Excluded by page redirects" → OK als redirects correct
   - Check "Blocked by robots.txt" → MOET 0 zijn!

---

## 🔧 robots.txt Analyse (Huidige Status)

### ✅ robots.txt is CORRECT

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /private/
Disallow: /admin/
Disallow: /auth/
Disallow: /*.json$
Disallow: /sitemap.xml

Sitemap: https://quotapp.nl/sitemap.xml
Host: https://quotapp.nl
```

### Wat dit betekent:

| Rule | Status | Uitleg |
|------|--------|--------|
| `Allow: /` | ✅ Goed | Alle publieke pagina's mogen |
| `Disallow: /api/` | ✅ Goed | API endpoints niet indexeren |
| `Disallow: /_next/` | ✅ Goed | Next.js intern niet indexeren |
| `Disallow: /sitemap.xml` | ⚠️ Ok | Sitemap hoeft niet zelf |
| `Sitemap:` | ✅ Goed | Google weet waar sitemap is |

### Check Je Eigen robots.txt
1. Browser: https://quotapp.nl/robots.txt
2. Zorg dat `/api/`, `/_next/` geblokkeerd zijn
3. Zorg dat `/` en `/tools/` ALLOWED zijn

---

## 📋 Sitemap Analyse (Huidige Status)

### ✅ sitemap.xml Bevat:

| Type | Aantal | Status |
|------|--------|--------|
| Homepage | 1 | ✅ |
| /blog | 1 | ✅ |
| /tools | 1 | ✅ |
| Tools | 38 | ✅ |
| Blog Posts | 3 | ✅ |
| **Totaal** | **44** | ✅ |

### ⚠️ Aandachtspunten:

1. **45 tools bestaan, maar sitemap bevat er 38**
   - Mogelijk ontbreken: `energiekosten`, `kosten-kind-calculator`, etc.
   - Check of deze in sitemap.ts moeten

2. **Blog posts: 3 stuks**
   - Dit is prima voor nu
   - Voeg nieuwe blog posts toe aan `blogPosts` array

### Hoe Sitemap Updaten

In `/src/app/sitemap.ts`:

```typescript
// Voeg nieuwe tool toe:
{ 
  path: "/tools/energiekosten", 
  priority: 0.8, 
  changefreq: "monthly",
  keywords: "energiekosten berekenen, stroomkosten, gaskosten"
},

// Voeg nieuwe blog post toe:
{ 
  slug: "nieuwe-blog-post", 
  priority: 0.8, 
  changefreq: "monthly",
  title: "Titel van Blog Post",
  description: "Korte beschrijving"
},
```

---

## 🚀 Indexing Plan voor Nieuwe Content

### Wanneer Nieuwe Content Toevoegen:

1. **Nieuwe tool/pagina toegevoegd**
2. **Blog post gepubliceerd**
3. **Belangrijke content update**

### Stappenplan:

```
1. [OPTIONEEL] Update sitemap.ts met nieuwe URL
   → Next.js doet dit automatisch als je MetadataRoute.Sitemap exporteert

2. Ga naar Google Search Console
   → URL Inspection
   → Plak nieuwe URL
   → Klik "Request Indexing"

3. Wacht 1-2 dagen
   → Check Coverage rapport

4. Als niet geïndexeerd na 1 week:
   → Retry "Request Indexing"
   → Check Coverage voor foutmeldingen
```

---

## ✅ Maandelijkse Onderhoudstaken

### Elke Maand Doen:

1. **Check Coverage Rapport**
   - Errors moeten 0 zijn
   - Warnings onder 10 is acceptabel

2. **Sitemap Herindienen**
   - Na grote updates: `sitemap.xml` opnieuw submitten

3. **Performance Checken**
   - Search Console → Core Web Vitals
   - Fix rode/oranje items

4. **Index Status Monitoren**
   - "Pages" → "Where does your site appear?"
   - Check of aantal stijgt

---

## 🎯 Doelen voor QuotApp.nl

| Metric | Doel | Tijdlijn |
|--------|------|----------|
| Indexed URLs | 48+ | 1 week |
| Coverage Errors | 0 | 1 week |
| Homepage ranking | Top 3 "quotapp" | 1 maand |
| Tool keywords | Top 10 | 3 maanden |
| Core Web Vitals | Groen | 2 weken |

---

## 📞 Troubleshooting

### Probleem: "URL is not on Google"

**Oplossingen:**
1. ✅ Check robots.txt → page mag niet geblokkeerd zijn
2. ✅ Check URL Inspection → "Request Indexing" klikken
3. ✅ Check sitemap.xml → URL moet aanwezig zijn
4. ✅ Check meta robots → `<meta name="robots" content="noindex">` VERWIJDEREN

### Probleem: "Blocked by robots.txt"

**Check:**
1. Ga naar https://quotapp.nl/robots.txt
2. Zorg dat pagina niet in `Disallow:` staat
3. Fix in `/src/app/robots.ts`

### Probleem: "Crawled - not indexed"

**Dit is normaal voor nieuwe sites!**
- Blijf "Request Indexing" doen
- Na 2-4 weken zou het moeten indexeren
- Check Coverage voor specifieke redenen

---

## 📝 Aantekeningen voor Ontwikkelaar

### SEO Checklist voor Nieuwe Pages

Bij elke nieuwe tool/blog post:

```typescript
// 1. metadata exporteren in page.tsx
export const metadata: Metadata = {
  title: "Tool Naam | QuotApp.nl",
  description: "Beschrijving voor Google (max 160 tekens)",
  keywords: ["keyword1", "keyword2", "keyword3"],
  openGraph: {
    title: "Tool Naam",
    description: "OG beschrijving",
    url: "https://quotapp.nl/tools/tool-slug",
    siteName: "QuotApp.nl",
  },
};
```

### Canonical URLs
- Zorg dat elke page `<link rel="canonical">` heeft
- Next.js doet dit standaard voor je

---

*Laatst bijgewerkt: 2026-03-27*
*Door: Harrie H (indexing-agent)*
