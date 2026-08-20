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
      "anabolendoktor B.V., gevestigd aan de Westhavenkade 12, 3134 NA Vlaardingen, is verwerkingsverantwoordelijke voor de gegevens die via anabolendoktor.com worden verzameld. Ons KvK- en BTW-nummer staan op de factuur die u na uw bestelling ontvangt.",
    ],
  },
  {
    id: "welke",
    title: "2. Welke gegevens we verwerken",
    body: [
      "NAW-gegevens en e-mailadres - voor het uitvoeren van uw bestelling en correspondentie.",
      "Telefoonnummer, alleen als u dit zelf opgeeft, voor track en trace of om een afspraak af te stemmen.",
      "Bestelhistorie - om garantie- en retourclaims correct af te handelen.",
      "Technische data (IP-adres, browsertype) - uitsluitend voor beveiliging en fraudepreventie.",
    ],
  },
  {
    id: "doel",
    title: "3. Met welk doel",
    body: [
      "Uitvoering van de koopovereenkomst (artikel 6 lid 1 sub b AVG).",
      "Voldoen aan wettelijke verplichtingen, zoals fiscale bewaartermijnen (sub c).",
      "Gerechtvaardigd belang voor beveiliging en fraudepreventie (sub f).",
      "Wij verwerken uw gegevens niet voor marketingdoeleinden zonder expliciete toestemming.",
    ],
  },
  {
    id: "delen",
    title: "4. Met wie we gegevens delen",
    body: [
      "PostNL en DHL - voor de fysieke bezorging van uw pakket.",
      "Onze betaaldienstverlener, die alleen het transactiebedrag en uw e-mailadres ontvangt.",
      "Onze accountant - voor de wettelijke administratie, alleen factuurgegevens.",
      "Wij verkopen of verhuren uw gegevens nooit aan derden.",
    ],
  },
  {
    id: "bewaartermijn",
    title: "5. Bewaartermijnen",
    body: [
      "Factuur- en bestelgegevens: 7 jaar (fiscale bewaarplicht).",
      "Klantaccounts: zolang het account actief is, plus 12 maanden na laatste login.",
      "Supportcorrespondentie: maximaal 24 maanden na laatste contact.",
    ],
  },
  {
    id: "rechten",
    title: "6. Uw rechten",
    body: [
      "U hebt het recht op inzage, correctie, verwijdering, beperking, dataportabiliteit en bezwaar tegen verwerking.",
      "Een verzoek dien u in via het contactformulier op de website. Wij reageren binnen 14 dagen.",
      "Bent u het oneens met onze afhandeling, dan kunt u een klacht indienen bij de Autoriteit Persoonsgegevens.",
    ],
  },
  {
    id: "beveiliging",
    title: "7. Beveiliging",
    body: [
      "Alle verbindingen met onze website lopen via TLS 1.3. Wachtwoorden worden gehasht met bcrypt (kostfactor 12).",
      "Onze servers staan binnen de EU bij een ISO 27001-gecertificeerde provider.",
    ],
  },
  {
    id: "cookies",
    title: "8. Cookies",
    body: [
      "Wij plaatsen alleen functionele en analytische cookies. Analytische cookies zijn anoniem en worden niet gedeeld met derden.",
      "Tracking- of advertentiecookies plaatsen wij niet.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Wat we met uw gegevens doen, in mensentaal"
        intro="Versie 2.1 - laatst bijgewerkt op 12 juni 2026. Wij verwerken zo min mogelijk gegevens en bewaren ze nooit langer dan nodig."
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
