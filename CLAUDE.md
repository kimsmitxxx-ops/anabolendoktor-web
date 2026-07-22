# CLAUDE.md

Brief voor Claude Code werk in de anabolendoktor-web repo.

## Commands

```bash
npm run dev      # next dev (http://localhost:3000)
npm run build    # next build
npm run lint     # next lint (eslint-config-next 14)
```

Content-management gaat via het shop-dash sister-repo (`../shop-dash`).

## Wat dit is

Publieke site voor **anabolendoktor.com** — een formeel consultatie- en informatie-platform, expliciet **tegenhanger** van anabolenpro. Hier worden **geen anabolen verkocht**. Wél consulten aangeboden voor bloedwerk-interpretatie, harm-reduction advies en trainings-/hersteladvies. Kleine selectie legale supplementen (creatine, vitamine D, magnesium, etc) — evidence-based, geen "T-boosters".

Klant-positionering: professionals 25-45 die evidence-based willen werken. Ex-gebruikers, dokters die informatie zoeken, natural atleten, mensen die overwegen te starten en objectief advies willen.

Data leeft in Supabase (`rexqfwibxawqnvrzbdoo` eu-west-1). Blogs komen uit `blog_posts` waar `shop_id = anabolendoktor`.

Shop-slug: `anabolendoktor` — shop_id = `96b47e49-34fd-4d6c-99d3-d49d912be046`.

## Architectuur

Fork van anabolenpro-nextjs met:
- SHOP_ID vervangen door anabolendoktor id
- Navy-blauw + zacht koraal-goud palette (formeler / medisch, weg van "sales")
- Home page volledig herschreven — geen product-showcase, wél consult-CTA, kennisbank-teasers, harm-reduction copy
- Nieuwe `/consult` pagina — 60min video-call €120, includes/not-includes, aanvraag-formulier
- AAS-specifieke pages verwijderd: `/[stof]`, `/keuzehulp`, `/risicos-en-bijwerkingen`
- Winkel-functionaliteit blijft beschikbaar voor de kleine supplementen-selectie
- `robots.index = false` totdat go-live besluit (site was `maintenance_mode=true` in shops-tabel)

### Routing

- `/` — hero + drie-pijler-uitleg + kennisbank-teasers + FAQ + newsletter
- `/consult` — consultatie-aanbod met aanvraag-formulier
- `/kennisbank` + `/kennisbank/[slug]` — blogs uit Supabase (5 al gepubliceerd op moment van fork)
- `/winkel` + `/winkel/[categorie]` — kleine selectie legale supplementen (nog te seeden)
- Standaard info-pages behouden: `/lab`, `/bezorging`, `/retourneren`, `/contact`, `/over-ons`, `/voorwaarden`, `/privacy`, `/cookies`, `/begrippenlijst`

### Verwijderde routes t.o.v. anabolenpro-basis

- `/[stof]` — AAS-stof pagina's
- `/keuzehulp` — AAS wizard (wij verkopen geen anabolen)
- `/risicos-en-bijwerkingen` — dedicated page (deel van kennisbank artikelen)

## Content-tone

Formeel, empathisch, evidence-based. Geen forum-taal, geen bro-science. Verwijzingen naar PubMed, ClinicalTrials of peer-reviewed publicaties. Verkoop-druk minimaal — de rol is educatief + consultatief.

Voor de Schrijver-agent in shop-dash (bedrijfsprofiel nog in te vullen bij cron_schedules waar `slug=anabolendoktor`).

## Product-catalog (nog te seeden)

Kleine selectie legale supplementen:
- Creatine monohydraat (5g/dag standaard)
- Vitamine D3 + K2 combinatie
- Magnesium bisglycinaat
- Whey isolate protein
- Omega-3 EPA/DHA
- Ashwagandha KSM-66

Bewust géén "T-boosters" of "cycle support" preparaten — die zijn placebo of erger.

## Live-data rules

Zelfde als anabolenpro — `dynamic = "force-dynamic"` + `revalidate = 0` op alle DB-pagina's.

## Env vars

Zelfde als anabolenpro-nextjs — Supabase URL + anon key + service role.

## Git

Identity: `kimsmitxxx-ops <kimsmitxxx@gmail.com>`. Token in `C:\Users\Administrator\Downloads\gh-token.txt`.

Repo: [github.com/kimsmitxxx-ops/anabolendoktor-web](https://github.com/kimsmitxxx-ops/anabolendoktor-web).
