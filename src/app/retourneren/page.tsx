import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/shop/page-hero";
import { FaqAccordion } from "@/components/faq-accordion";
import { ShieldCheck, PackageOpen, CalendarClock, Mail, Info } from "lucide-react";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Retour, annuleren en terugbetaling - Anabolendoktor",
  description:
    "14 dagen bedenktijd op ongeopende supplementen, kosteloos annuleren van een consult tot 24 uur vooraf, en opnieuw verzenden als een pakket niet aankomt.",
  alternates: { canonical: "/retourneren" },
};

const cards = [
  {
    icon: PackageOpen,
    title: "14 dagen bedenktijd",
    sub: "Ongeopende, verzegelde supplementen kunt u binnen 14 dagen na ontvangst terugsturen. U krijgt het aankoopbedrag terug.",
  },
  {
    icon: CalendarClock,
    title: "Consult kosteloos verzetten",
    sub: "Tot 24 uur voor de afspraak kunt u kosteloos annuleren of verplaatsen. Daarna brengen wij de gereserveerde tijd in rekening.",
  },
  {
    icon: ShieldCheck,
    title: "Niet aangekomen is opnieuw verzonden",
    sub: "Is uw pakket 14 dagen na verzending nog niet bezorgd, dan versturen wij kosteloos opnieuw.",
  },
];

const faq = [
  {
    question: "Heb ik bedenktijd op wat ik bestel?",
    answer:
      "Ja. Op producten die u online bestelt heeft u wettelijk 14 dagen bedenktijd, gerekend vanaf de dag dat u ze ontvangt. Binnen die termijn kunt u zonder opgaaf van reden laten weten dat u afziet van de koop, waarna u nog eens 14 dagen heeft om terug te sturen. Het aankoopbedrag krijgt u terug, inclusief de standaard verzendkosten die u bij de bestelling heeft betaald. De kosten van het terugsturen zijn voor u.",
  },
  {
    question: "Geldt dat ook voor geopende supplementen?",
    answer:
      "Nee. Supplementen zijn verzegeld om redenen van gezondheidsbescherming en hygiëne. Is die verzegeling verbroken, dan vervalt het herroepingsrecht en kunnen wij het product niet terugnemen. Ongeopend en met de verzegeling intact kunt u wel gewoon retourneren.",
  },
  {
    question: "Kan ik een consult annuleren?",
    answer:
      "Tot 24 uur voor het afgesproken tijdstip kunt u kosteloos annuleren of verplaatsen. Meldt u zich later af of verschijnt u niet, dan brengen wij de gereserveerde tijd in rekening, omdat die dan niet meer aan iemand anders kan worden gegeven. Heeft het consult op uw verzoek al plaatsgevonden, dan is de dienst geleverd en vervalt het herroepingsrecht; dat is de wettelijke uitzondering voor diensten die met uw uitdrukkelijke instemming binnen de bedenktijd zijn uitgevoerd.",
  },
  {
    question: "En een bloedonderzoek dat ik nog niet heb gebruikt?",
    answer:
      "Zolang u het aanvraagformulier nog niet bij een prikpost heeft ingeleverd, kunt u het onderzoek annuleren en krijgt u het bedrag terug. Is er eenmaal bloed afgenomen, dan is het onderzoek in gang gezet en zijn de kosten bij het laboratorium gemaakt. Terugbetaling is dan niet meer mogelijk.",
  },
  {
    question: "Wat als mijn pakket niet aankomt?",
    answer:
      "Is uw pakket 14 dagen na de verzenddatum nog niet bezorgd, dan versturen wij kosteloos opnieuw. Meld het via het contactformulier met uw ordernummer erbij. Wij gaan dan eerst na wat de vervoerder over de zending meldt, en versturen daarna een nieuwe.",
  },
  {
    question: "Hoe stuur ik iets terug?",
    answer:
      "Meld uw retour eerst via het contactformulier, met uw ordernummer en wat u wilt terugsturen. U ontvangt dan het retouradres en een korte instructie. Stuur niets terug zonder die melding: zonder ordernummer kunnen wij een pakket niet aan een bestelling koppelen en duurt de afhandeling onnodig lang.",
  },
  {
    question: "Hoe snel krijg ik mijn geld terug?",
    answer:
      "Binnen 14 dagen nadat wij uw retour of annulering hebben ontvangen, en via dezelfde weg als u heeft betaald. Bij een retourzending mogen wij daarmee wachten tot wij het product terug hebben of u kunt aantonen dat u het heeft verzonden.",
  },
];

export default function RetourPage() {
  return (
    <>
      <PageHero
        eyebrow="Retour & annuleren"
        title="14 dagen bedenktijd, en een consult verzet u kosteloos"
        intro="Op producten die u bij ons bestelt heeft u de wettelijke bedenktijd van 14 dagen, zolang de verzegeling intact is. Een consult kunt u tot 24 uur van tevoren kosteloos annuleren of verplaatsen. Hieronder staat per soort bestelling wat er geldt."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 grid gap-5 md:grid-cols-3">
        {cards.map((c) => (
          <div key={c.title} className="rounded-md border border-border bg-surface p-5">
            <c.icon size={20} className="text-accent" />
            <h3 className="mt-3 font-display text-lg text-text">{c.title}</h3>
            <p className="mt-1.5 text-sm text-text-muted leading-relaxed">{c.sub}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="rounded-xl border border-border bg-surface p-6 text-text">
          <div className="flex items-start gap-3">
            <Info size={20} className="shrink-0 mt-0.5 text-accent" />
            <div>
              <h2 className="font-display text-lg">Waarom dit per soort bestelling verschilt</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
                Een verzegeld product kunt u ongeopend terugsturen. Een consult en een
                bloedonderzoek zijn diensten: zodra die op uw verzoek zijn uitgevoerd, is er niets
                meer terug te draaien. Dat is geen huisregel maar de wettelijke uitzondering op het
                herroepingsrecht, en wij noemen het hier zodat u het weet voordat u bestelt in
                plaats van erna.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-display text-2xl text-text">Veelgestelde vragen</h2>
            <p className="mt-2 text-sm text-text-muted">
              Twijfelt u over uw situatie?{" "}
              <Link href="/contact" className="text-accent hover:underline">
                Neem contact op
              </Link>
              .
            </p>
            <div className="mt-6 rounded-md border border-border bg-surface p-5">
              <Mail size={16} className="text-accent" />
              <p className="mt-2 font-medium text-text">Retour of annulering melden</p>
              <Link href="/contact" className="text-sm text-accent hover:underline">
                Via het contactformulier, met uw ordernummer erbij
              </Link>
              <p className="mt-2 text-xs text-text-subtle">U hoort binnen een werkdag van ons.</p>
            </div>
          </div>
          <FaqAccordion items={faq} />
        </div>
      </section>
    </>
  );
}
