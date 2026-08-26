import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shop/page-hero";

export const metadata: Metadata = {
  title: "Cookies - wat er in uw browser bewaard wordt",
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
            winkelmand zit, ook als u tussendoor weggaat. U kunt de sleutel handmatig wissen
            via uw browser.
          </li>
          <li>
            <strong>anabolendoktor.cart.backup</strong> (localStorage) - een kopie van uw mand
            op het moment dat u naar de betaalpagina gaat, zodat u die kunt herstellen als de
            betaling wordt afgebroken.
          </li>
          <li>
            <strong>shop-dash-token</strong> (httpOnly cookie) - alleen actief als u inlogt op
            een eigen account. Zeven dagen geldig.
          </li>
          <li>
            <strong>adk_chat_id</strong> (localStorage) - alleen als u de chat heeft gebruikt.
          </li>
        </ul>

        <h2>2. Meting</h2>
        <ul>
          <li>
            <strong>an.vid en an.sid</strong> (localStorage) - onze eigen bezoekersteller:
            een willekeurig nummer, zonder naam, e-mailadres of IP-adres, niet te herleiden
            tot een persoon. Draait op onze eigen server.
          </li>
          <li>
            <strong>_ga en _ga_*</strong> (cookies) - Google Analytics 4, waarmee wij
            bezoekersaantallen en paginagebruik meten. Advertentiesignalen staan uit
            (ad_storage denied) en het IP-adres wordt geanonimiseerd. Google gebruikt deze
            meting niet voor advertentieprofielen op deze site.
          </li>
        </ul>
        <p>
          Wilt u de Google-meting niet, dan blokkeert een adblocker of de
          tracking-bescherming van uw browser het domein googletagmanager.com; de site werkt
          daarmee volledig. Onze eigen teller bevat geen persoonsgegevens.
        </p>

        <h2>3. Wat er bewust ontbreekt</h2>
        <ul>
          <li>Pixels van advertentieplatforms staan niet op deze site</li>
          <li>Er bestaat geen cookie waarmee u na uw bezoek elders herkend wordt</li>
          <li>Bezoekgegevens worden aan niemand verkocht of doorgegeven</li>
          <li>Juist bezoekers van een site over dit onderwerp willen niet dat hun bezoek ergens anders opduikt; dat is hier het uitgangspunt van de hele meting</li>
        </ul>

        <h2>4. Opslag wissen</h2>
        <p>
          Alle genoemde sleutels en cookies wist u via de privacy-instellingen van uw
          browser (sitegegevens van anabolendoktor.com verwijderen). Daarna is de winkelmand
          leeg en start de meting met een nieuw willekeurig nummer.
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
