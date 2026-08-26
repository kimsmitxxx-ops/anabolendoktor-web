# CLAUDE.md

Brief voor Claude Code werk in de anabolendoktor-repo's.

## Twee repos, een site

**Deze repo (`anabolendoktor-web`) is de bron.** Het Vercel-project achter
anabolendoktor.com hangt echter aan de repo `kimsmitxxx-ops/anabolen` (het
voormalige prototype). Elke wijziging hier dus direct doorzetten:

```bash
cd ../anabolen
git ls-files -z | xargs -0 rm -f
git -C ../anabolendoktor-web archive HEAD | tar -x
git add -A && git commit && git push
```

Niet laten liggen: twee repos die uiteenlopen was de oorzaak van een dag
verwarring bij de livegang.

## Commands

```bash
npm run dev      # next dev
npm run build    # next build
npx tsc --noEmit # bekende ruis: components/ui/* (ongebruikte shadcn-resten)
```

## Wat dit is

Publieke site voor **anabolendoktor.com**, live en geindexeerd sinds 26
augustus 2026. Consultatie- en informatiedienst, expliciet tegenhanger van
anabolenpro: **verkoopt geen anabolen**, stelt geen diagnoses, schrijft niets
voor, verwijst door naar een arts waar dat hoort. Doelgroep: advieszoekers.
Toon: formeel, u-vorm, eerlijk over wat niet werkt.

Shop-slug `anabolendoktor`, shop_id `96b47e49-34fd-4d6c-99d3-d49d912be046`,
zelfde Supabase als de andere shops (RLS-policies per shop; migratie 048).

## Catalogus (in de database, niet in code)

- **3 pakketten**: Starter (89), Droogtrain (129), Bulk (149). Elk met
  supplementen, een schema op de intake en een consult van 45 min inbegrepen.
- **4 losse consulten**, allemaal 50 euro.
- **3 bloedonderzoeken** via reguliere prikposten.
- Losse supplementen zijn uit de verkoop (`is_active=false`); oude URL's
  301'en naar `/winkel/pakketten`.
- **Kortingscode CONSULT10** (10%) in `shops.settings.discount_codes`: de
  consulent geeft hem na een betaald consult. Validatie uitsluitend
  server-side in `/api/orders`.
- Geen staffelkorting: `BULK_TIERS` in `lib/bulk-discount.ts` is bewust leeg.

## Thema

Het oorspronkelijke doktor-ontwerp, teruggehaald uit de git-historie van het
prototype: **Fraunces serif-koppen** (anabolenpro draait op Space Grotesk),
creme-klinische achtergrond, pil-knoppen, stethoscoop-embleem. Eigen header in
`components/shop/header.tsx` (licht, geen zoekbalk, geen reviewbalk). Favicon
= stethoscoop op navy via `/icon-doktor.png` - versienaam in het pad omdat
Cloudflare `/icon.png` van de oude deployment een jaar heeft vastgezet.

## Uniek t.o.v. anabolenpro - bewaakte grens

Zinsoverlap met anabolenpro.com is 0 en de opleverchecklist bewaakt dit:
titels/descriptions op verboden vocabulaire (COA, Janoshik, kuurpakket...) en
gerenderde tekst op het zustermerk (het logo stond ooit als twee losse spans
in de header en was zo onvindbaar voor tekst-sweeps). Zie
`../shop-dash/docs/PLAN-04-SHOPS-UIT-ELKAAR-HOUDEN.md`.

Geen stof-/merkfilters, geen batchtest-taal, geen fysiek adres op de site,
eigen localStorage-sleutels (`anabolendoktor.*`, `adk_*`), orderprefix `AD-`.

## Betalen

Betaallink per bestelling (Paytail transfer-profiel, config in shops-tabel);
**nergens een vast IBAN en nergens crypto**. Bedankt-pagina leest de order met
de service-client (RLS blokkeert anon op orders) en toont `order.reference`.
Order-status bij aanmaak: `awaiting_payment` (check-constraint).
Bevestigingsmail gaat server-side via shop-dash.

## Meting

Eigen cookieloze tracking naar `/api/track` + GA4 `G-54K5B0PBQ5`. GA4 laadt
**zonder banner** (bewuste keuze: ad_storage denied, IP geanonimiseerd);
cookie- en privacypagina beschrijven die opzet expliciet. Dit wijkt af van de
andere shops.

## Env (Vercel-project van de `anabolen`-repo)

`SUPABASE_SERVICE_ROLE_KEY` is verplicht - zonder falen orders, meting en
screenshot-upload. De rest heeft fallbacks.

## Controle

`cd ../shop-dash && node scripts/oplever-check.mjs anabolendoktor` - en bij
elke visuele wijziging een Playwright-screenshot bekijken; "het zal wel goed
staan" heeft hier twee keer gefaald.
