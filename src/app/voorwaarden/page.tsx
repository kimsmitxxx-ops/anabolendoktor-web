import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shop/page-hero";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
  description:
    "De algemene voorwaarden van anabolendoktor B.V.: bestelproces, betaling, levering, garantie, aansprakelijkheid en herroepingsrecht.",
};

export const revalidate = 86400;

const sections: { id: string; title: string; body: string[] }[] = [
  {
    id: "definities",
    title: "1. Definities",
    body: [
      "anabolendoktor: anabolendoktor B.V. Ons vestigingsadres, KvK- en BTW-nummer staan op de factuur die u na bestelling ontvangt.",
      "Klant: de natuurlijke of rechtspersoon die een overeenkomst aangaat met anabolendoktor.",
      "Producten: de door anabolendoktor aangeboden supplementen en bloedonderzoeken.",
      "Diensten: de door anabolendoktor aangeboden consulten. Anabolendoktor is geen artsenpraktijk, stelt geen diagnoses en schrijft geen medicatie voor.",
    ],
  },
  {
    id: "toepasselijkheid",
    title: "2. Toepasselijkheid",
    body: [
      "Deze voorwaarden zijn van toepassing op elk aanbod van anabolendoktor en op elke tot stand gekomen overeenkomst tussen anabolendoktor en klant.",
      "De tekst van deze voorwaarden is voorafgaand aan het sluiten van een overeenkomst op deze pagina te lezen en op te slaan.",
    ],
  },
  {
    id: "aanbod",
    title: "3. Het aanbod",
    body: [
      "Het aanbod op deze website is vrijblijvend. Supplementen worden geleverd zolang de voorraad strekt; consulten zolang er agenda-ruimte is.",
      "Het aanbod bevat een volledige en nauwkeurige omschrijving van het product of de dienst, inclusief samenstelling, dosering en wat er wel en niet bij inbegrepen is.",
      "Kennelijke vergissingen of fouten in het aanbod binden anabolendoktor niet.",
    ],
  },
  {
    id: "overeenkomst",
    title: "4. Totstandkoming overeenkomst",
    body: [
      "De overeenkomst komt tot stand op het moment dat de klant het aanbod heeft aanvaard via een bestelling en de betaling door anabolendoktor is bevestigd.",
      "anabolendoktor kan zich binnen wettelijke kaders op de hoogte stellen of de klant aan zijn betalingsverplichtingen kan voldoen.",
    ],
  },
  {
    id: "retour-en-terugbetaling",
    title: "5. Retour en terugbetaling",
    body: [
      "De klant heeft een herroepingsrecht van 14 dagen, gerekend vanaf de dag van ontvangst van het product. Binnen die termijn kan de overeenkomst zonder opgaaf van reden worden ontbonden; daarna heeft de klant nog 14 dagen om het product terug te sturen. De kosten van het terugzenden komen voor rekening van de klant.",
      "Het herroepingsrecht vervalt voor verzegelde producten waarvan de verzegeling is verbroken, wanneer die om redenen van gezondheidsbescherming of hygiëne niet geschikt zijn om te worden teruggezonden. Dat geldt voor alle door anabolendoktor geleverde supplementen.",
      "Voor consulten geldt dat het herroepingsrecht vervalt zodra de dienst met uitdrukkelijke instemming van de klant binnen de bedenktijd volledig is uitgevoerd. Tot 24 uur voor het afgesproken tijdstip kan een consult kosteloos worden geannuleerd of verplaatst; daarna wordt de gereserveerde tijd in rekening gebracht.",
      "Voor bloedonderzoek geldt dat annulering kosteloos is zolang het aanvraagformulier nog niet bij een prikpost is ingeleverd. Na afname zijn de kosten bij het laboratorium gemaakt en is terugbetaling niet meer mogelijk.",
      "Terugbetaling vindt plaats binnen 14 dagen na ontvangst van de herroeping, via hetzelfde betaalmiddel als waarmee is betaald.",
      "Is een pakket 14 dagen na de verzenddatum nog niet bezorgd, dan verstuurt anabolendoktor kosteloos een vervangende zending.",
      "Blijkt een product tijdens de verwerking niet leverbaar, dan wordt in overleg met de klant een alternatief geleverd of het betreffende bedrag terugbetaald.",
    ],
  },
  {
    id: "prijzen",
    title: "6. Prijzen en betaling",
    body: [
      "Alle prijzen op deze website zijn in euro's en inclusief BTW; voor supplementen geldt het hoge tarief, voor diensten het tarief dat daarvoor wettelijk van toepassing is.",
      "Betaling verloopt per bankoverboeking. Na het plaatsen van een bestelling ontvangt de klant een betaalpagina met de rekeninggegevens voor die specifieke bestelling; deze gegevens kunnen per bestelling verschillen. De verwerking start zodra de betaling is ontvangen.",
      "anabolendoktor behoudt zich het recht voor prijzen te wijzigen; eenmaal geplaatste orders blijven ongewijzigd.",
    ],
  },
  {
    id: "levering",
    title: "7. Levering",
    body: [
      "anabolendoktor voert bestellingen en consulten met zorg uit en plant consulten in overleg met de klant.",
      "Levering van supplementen vindt plaats op het adres dat de klant bij de bestelling opgeeft. Consulten en uitslagen van bloedonderzoek worden per e-mail geleverd.",
      "Genoemde levertijden zijn een indicatie en geen fatale termijn. Is een pakket 14 dagen na verzending niet bezorgd, dan verstuurt anabolendoktor kosteloos opnieuw.",
      "Het risico voor verzonden producten gaat op de klant over op het moment van bezorging.",
    ],
  },
  {
    id: "garantie",
    title: "8. Conformiteit",
    body: [
      "anabolendoktor staat ervoor in dat de geleverde producten voldoen aan de omschrijving op de productpagina en aan de eisen die daaraan in Nederland worden gesteld.",
      "Beantwoordt een product niet aan de overeenkomst, dan heeft de klant recht op kosteloos herstel, vervanging of terugbetaling volgens de wettelijke regeling.",
      "Op consulten rust een inspanningsverplichting en geen resultaatsverplichting. Er wordt geen uitkomst of gezondheidsresultaat gegarandeerd.",
    ],
  },
  {
    id: "aansprakelijkheid",
    title: "9. Aansprakelijkheid en de aard van onze dienstverlening",
    body: [
      "Anabolendoktor is een consultatie- en informatiedienst en geen BIG-geregistreerde artsenpraktijk. Er worden geen diagnoses gesteld, geen behandelingen ingesteld en geen geneesmiddelen voorgeschreven of geleverd.",
      "De informatie op deze website en in een consult is bedoeld ter ondersteuning van de eigen afweging van de klant en vervangt geen medisch advies van een arts. Bij klachten die directe aandacht vragen dient de klant contact op te nemen met de huisarts of de huisartsenpost.",
      "De aangeboden supplementen zijn voedingssupplementen en geen geneesmiddelen. Zij zijn niet bedoeld om ziekten te voorkomen, te behandelen of te genezen.",
      "Anabolendoktor aanvaardt geen aansprakelijkheid voor schade die voortvloeit uit keuzes die de klant maakt op basis van de verstrekte informatie, behoudens opzet of grove nalatigheid.",
    ],
  },
  {
    id: "klachten",
    title: "10. Klachtenregeling",
    body: [
      "Klachten over de uitvoering van de overeenkomst dienen binnen redelijke termijn, volledig en duidelijk omschreven, te worden ingediend bij anabolendoktor via het contactformulier op de website.",
      "anabolendoktor reageert binnen 14 dagen na ontvangst van de klacht met een inhoudelijke reactie of een indicatie van de termijn waarop dat gebeurt.",
      "Komen klant en anabolendoktor er onderling niet uit, dan kan het geschil worden voorgelegd aan de bevoegde rechter te Rotterdam.",
    ],
  },
  {
    id: "toepasselijk-recht",
    title: "11. Toepasselijk recht",
    body: [
      "Op overeenkomsten tussen anabolendoktor en klant is uitsluitend Nederlands recht van toepassing.",
    ],
  },
];

export default function VoorwaardenPage() {
  return (
    <>
      <PageHero
        eyebrow="Juridisch"
        title="Algemene voorwaarden anabolendoktor B.V."
        intro="Versie 4.0, laatst bijgewerkt op 25 augustus 2026. Deze voorwaarden gelden voor elke bestelling en elk consult dat u via deze website plaatst."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 grid gap-10 lg:grid-cols-[260px_1fr]">
        <nav className="lg:sticky lg:top-28 self-start">
          <p className="text-xs uppercase tracking-[0.15em] text-text-subtle mb-3">Inhoud</p>
          <ul className="space-y-2 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-text-muted hover:text-accent">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <article className="prose-clean max-w-3xl space-y-10">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-28">
              <h2 className="font-display text-2xl text-text">{s.title}</h2>
              <div className="mt-3 space-y-3 text-sm text-text-muted leading-relaxed">
                {s.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>
          ))}

          <div className="rounded-md border border-border bg-surface p-5 text-sm text-text-muted">
            Vragen over deze voorwaarden? Stel ze via het{" "}
            <Link href="/contact" className="text-accent hover:underline">
              contactformulier
            </Link>
            .
          </div>
        </article>
      </section>
    </>
  );
}
