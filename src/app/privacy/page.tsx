import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shop/page-hero";

export const metadata: Metadata = {
  title: "Privacyverklaring - anabolendoktor",
  description:
    "Hoe anabolendoktor persoonsgegevens verwerkt, opslaat en beschermt onder de AVG. Lees welke data we vastleggen en hoe lang.",
};

export const revalidate = 86400;

const sections = [
  {
    id: "wie",
    title: "1. Wie zijn wij",
    body: [
      "anabolendoktor B.V. is verwerkingsverantwoordelijke voor de gegevens die via anabolendoktor.com worden verzameld. Ons vestigingsadres, KvK- en BTW-nummer staan op de factuur die u na uw bestelling ontvangt.",
    ],
  },
  {
    id: "welke",
    title: "2. Welke gegevens we verwerken",
    body: [
      "Naam, adres en e-mailadres: nodig om uw bestelling uit te voeren en met u te kunnen corresponderen.",
      "Telefoonnummer, alleen als u dat zelf opgeeft, bijvoorbeeld om een consulttijdstip af te stemmen.",
      "Wat u invult in een intake-vragenlijst en wat u tijdens een consult vertelt. Dit zijn gegevens over uw gezondheid; wij verwerken ze uitsluitend met uw toestemming, alleen voor het consult zelf, en ze worden nooit gedeeld met uw huisarts, verzekeraar of werkgever.",
      "Uitslagen van bloedonderzoek dat u via ons bestelt. Ook deze vallen onder gezondheidsgegevens en worden alleen gebruikt om ze aan u te leveren en, als u dat afneemt, met u te bespreken.",
      "Beperkte technische gegevens voor de beveiliging van de website.",
    ],
  },
  {
    id: "doel",
    title: "3. Met welk doel",
    body: [
      "Het uitvoeren van de overeenkomst die u met ons sluit: een bestelling, een consult of een bloedonderzoek (artikel 6 lid 1 sub b AVG).",
      "Voor gezondheidsgegevens: uw uitdrukkelijke toestemming (artikel 9 lid 2 sub a AVG). Die kunt u op elk moment intrekken; dan verwijderen wij de intake en de gespreksaantekeningen.",
      "Het voldoen aan wettelijke plichten, zoals de fiscale bewaartermijn voor facturen.",
      "Zonder aparte toestemming gebruiken wij uw gegevens niet voor marketing.",
    ],
  },
  {
    id: "delen",
    title: "4. Met wie we gegevens delen",
    body: [
      "De vervoerder, alleen bij een supplementenbestelling, en alleen uw naam en adres.",
      "Het laboratorium, alleen bij een bloedonderzoek, en alleen wat nodig is om de afname en de uitslag aan u te koppelen.",
      "Onze betaaldienstverlener, die het transactiebedrag en een referentie ontvangt.",
      "Wat u in een intake of consult deelt, verlaat ons niet. Niet naar uw huisarts, niet naar een verzekeraar, niet naar een werkgever, tenzij u ons daar zelf schriftelijk om vraagt.",
    ],
  },
  {
    id: "bewaartermijn",
    title: "5. Bewaartermijnen",
    body: [
      "Factuurgegevens: zeven jaar, omdat de wet dat voorschrijft.",
      "Intake-vragenlijsten en consultverslagen: twaalf maanden na het laatste consult, zodat een vervolgvraag context heeft. Daarna verwijderen wij ze. Eerder weg? Eén verzoek via het contactformulier volstaat.",
      "Uitslagen van bloedonderzoek: totdat u om verwijdering vraagt, omdat het vergelijken met een eerdere meting juist de waarde ervan is.",
      "Berichten via het contactformulier: maximaal achttien maanden na het laatste contact.",
    ],
  },
  {
    id: "rechten",
    title: "6. Uw rechten",
    body: [
      "U kunt uw gegevens inzien, laten corrigeren of laten verwijderen, de verwerking laten beperken, uw gegevens meenemen en bezwaar maken tegen verwerking.",
      "Een verzoek doet u via het contactformulier; binnen veertien dagen heeft u antwoord. Voor gezondheidsgegevens geldt: intrekken van uw toestemming betekent verwijderen.",
      "Vindt u dat wij een verzoek niet goed afhandelen, dan kunt u terecht bij de Autoriteit Persoonsgegevens.",
    ],
  },
  {
    id: "beveiliging",
    title: "7. Beveiliging",
    body: [
      "Verbindingen met deze website zijn versleuteld en onze gegevens staan bij een Europese verwerker binnen de EU.",
      "Toegang tot intakegegevens en uitslagen is beperkt tot de consulent die uw dossier behandelt.",
    ],
  },
  {
    id: "cookies",
    title: "8. Cookies",
    body: [
      "Deze site meet bezoekersaantallen met een eigen, anonieme teller die pas gaat lopen nadat u daarmee instemt in de cookiebanner. Er gaan geen gegevens naar een advertentieplatform.",
      "Op de cookiepagina staat precies welke sleutels er in uw browser worden gezet en waarvoor.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Wat we met uw gegevens doen, in mensentaal"
        intro="Versie 3.0, laatst bijgewerkt op 25 augustus 2026. Een consultatiedienst verwerkt gevoeliger gegevens dan een gewone webshop; daarom staat hieronder per soort gegeven wat wij ermee doen, hoe lang wij het bewaren en wat er nooit mee gebeurt."
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

        <article className="max-w-3xl space-y-10">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-28">
              <h2 className="font-display text-2xl text-text">{s.title}</h2>
              <div className="mt-3 space-y-3 text-sm text-text-muted leading-relaxed">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          ))}

          <div className="rounded-md border border-border bg-surface p-5 text-sm text-text-muted">
            Vragen? Stuur ze via het{" "}
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
