import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shop/page-hero";

export const metadata: Metadata = {
  title: "Cookies - wat we wel en niet bewaren · Anabolendoktor",
  description:
    "Anabolendoktor gebruikt alleen functionele en optionele analytische cookies. Geen tracking voor advertenties. Lees welke cookies wij plaatsen en hoe u ze beheert.",
  alternates: { canonical: "/cookies" },
};

export const revalidate = 86400;

export default function CookiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Cookies"
        title="Wat we wel en niet bewaren"
        intro="Per sleutel staat hieronder wat er in uw browser wordt bewaard, waarvoor, en hoe u het weer kwijtraakt. Advertentienetwerken komen er niet in voor."
      />

      <article className="mx-auto max-w-3xl px-4 py-12 prose prose-sm [&>h2]:font-display [&>h2]:text-2xl [&>h2]:mt-10 [&>h2]:text-primary [&>h3]:font-display [&>h3]:text-lg [&>h3]:mt-6 [&>p]:leading-relaxed [&_a]:text-accent [&_a]:underline">
        <p>
          Deze site bewaart een klein aantal dingen in uw browser: wat nodig is om een
          bestelling af te ronden, en, alleen met uw instemming, een anonieme
          bezoekersteller. Er wordt niets aangelegd waarmee u elders op internet te volgen
          bent, en er gaat niets naar advertentienetwerken.
        </p>

        <h2>1. Noodzakelijke opslag</h2>
        <p>Deze plaatsen wij altijd, anders werkt de site niet:</p>
        <ul>
          <li>
            <strong>anabolendoktor.cart.v2</strong> (localStorage) - onthoudt wat er in uw
            winkelmand zit, ook als u tussendoor weggaat. Verloopt niet automatisch; u kunt de
            sleutel handmatig wissen via uw browser.
          </li>
          <li>
            <strong>anabolendoktor.cart.backup</strong> (localStorage) - een kopie van uw mand op
            het moment dat u naar de betaalpagina gaat, zodat u die kunt herstellen als de
            betaling wordt afgebroken. Wordt gewist zodra u de mand herstelt of de bestelling
            afrondt.
          </li>
          <li>
            <strong>anabolendoktor.cookies.v1</strong> (localStorage) - onthoudt uw keuze in de
            cookiebanner, zodat die niet op elke pagina terugkomt.
          </li>
          <li>
            <strong>shop-dash-token</strong> (httpOnly cookie) - alleen actief als u inlogt op een
            eigen account. Zeven dagen geldig.
          </li>
          <li>
            <strong>adk_chat_id</strong> (localStorage) - alleen als u de chat heeft gebruikt.
            Koppelt u bij een volgend bezoek terug aan hetzelfde gesprek.
          </li>
        </ul>

        <h2>2. Optionele meting</h2>
        <p>
          Alleen actief als u in de banner op <em>Accepteer alle</em> klikt:
        </p>
        <ul>
          <li>
            <strong>an.vid en an.sid</strong> (localStorage) - een willekeurig bezoekers- en
            sessienummer waarmee wij bezoekersaantallen tellen. Geen naam, geen e-mailadres, geen
            IP-adres, en niet te herleiden tot een persoon.
          </li>
        </ul>
        <p>
          Deze meting draait op onze eigen server; er gaan geen gegevens naar een extern
          statistiekenplatform. Weigert u, dan wordt er niets weggeschreven en werkt de site
          verder gewoon.
        </p>

        <h2>3. Wat er bewust ontbreekt</h2>
        <ul>
          <li>Pixels van advertentieplatforms staan niet op deze site</li>
          <li>Er bestaat geen cookie waarmee u na uw bezoek elders herkend wordt</li>
          <li>Bezoekgegevens worden aan niemand verkocht of doorgegeven</li>
          <li>Juist bezoekers van een site over dit onderwerp willen niet dat hun bezoek ergens anders opduikt; dat is hier het uitgangspunt van de hele meting</li>
        </ul>

        <h2>4. Cookie-voorkeur wijzigen</h2>
        <p>
          Wis de sleutel <code>anabolendoktor.cookies.v1</code> uit de localStorage van uw
          browser om de banner opnieuw te zien. Dat kan via de ontwikkelaarstools van uw
          browser, of eenvoudiger: wis de sitegegevens van anabolendoktor.com via de
          privacy-instellingen van uw browser.
        </p>

        <h2>5. Vragen?</h2>
        <p>
          Stel uw vraag via het <Link href="/contact">contactformulier</Link> of bekijk
          ons volledige <Link href="/privacy">privacy-beleid</Link>.
        </p>
      </article>
    </>
  );
}
