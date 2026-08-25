import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shop/page-hero";
import { FaqAccordion } from "@/components/faq-accordion";
import { Mail, PackageCheck, Clock, ShieldCheck } from "lucide-react";

export const revalidate = 86400;

/**
 * Deze pagina was overgenomen van anabolenpro, tot en met de twee magazijnen
 * en het Utinon-merk dat hier niet bestaat. Volledig herschreven voor wat deze
 * site werkelijk levert: consulten en bloedonderzoek per e-mail, en een kleine
 * supplementenlijn per post.
 */
export const metadata: Metadata = {
  title: "Levering - per e-mail voor diensten, per post voor supplementen",
  description:
    "Consulten en bloedonderzoek ontvangt u per e-mail; er wordt niets verzonden. Supplementen gaan neutraal verpakt op de post zodra uw betaling binnen is, en zijn normaal binnen 1 tot 3 werkdagen bij u.",
  alternates: { canonical: "/bezorging" },
};

const soorten = [
  {
    icon: Mail,
    title: "Consulten",
    sub: "Niets wordt verzonden. Na uw aanvraag ontvangt u per e-mail een voorstel voor een tijdstip en de intake-vragenlijst. Het gesprek zelf is een video-call.",
  },
  {
    icon: Clock,
    title: "Bloedonderzoek",
    sub: "U ontvangt per e-mail een aanvraagformulier met barcode voor de prikpost. De uitslag volgt binnen enkele werkdagen na afname, ook per e-mail.",
  },
  {
    icon: PackageCheck,
    title: "Supplementen",
    sub: "Gaan op de post zodra uw betaling binnen is, in een neutrale doos zonder logo of inhoudsvermelding. Normaal binnen 1 tot 3 werkdagen bezorgd.",
  },
];

const faq = [
  {
    question: "Wanneer wordt mijn bestelling verstuurd?",
    answer:
      "Zodra uw betaling binnen is. Wij noemen bewust geen vaste verzenddag of tijdstip: de doorlooptijd hangt af van het moment waarop uw overboeking bij ons zichtbaar wordt, en dat verschilt per bank. Na verzending is een pakket in Nederland normaal binnen 1 tot 3 werkdagen bij u, in België binnen 3 tot 5.",
  },
  {
    question: "Wat staat er op de verpakking?",
    answer:
      "Een neutrale doos zonder logo, zonder productnaam en zonder verwijzing naar deze website. Op het verzendlabel staan alleen een bedrijfsnaam en uw adres. Ook de pakbon binnenin noemt geen productcategorie. Wij begrijpen dat bezoekers van deze site op privacy gesteld zijn, ook als de inhoud een pot creatine is.",
  },
  {
    question: "Krijg ik track en trace?",
    answer:
      "Ja, zodra het verzendlabel is aangemaakt ontvangt u de code per e-mail. Houd er rekening mee dat een label soms al actief is voordat het pakket fysiek is opgehaald; de status springt dan pas later op onderweg. Geen beweging na twee werkdagen? Meld het via het contactformulier met uw ordernummer.",
  },
  {
    question: "Wat als mijn pakket niet aankomt?",
    answer:
      "Is uw pakket 14 dagen na de verzenddatum nog niet bezorgd, dan versturen wij kosteloos opnieuw. Wij vragen eerst bij de vervoerder na wat er met de zending is gebeurd en houden u daarvan op de hoogte.",
  },
  {
    question: "Verzenden jullie buiten Nederland en België?",
    answer:
      "Supplementen versturen wij binnen de EU. Buiten Nederland en België duurt bezorging normaal 3 tot 5 werkdagen en gelden de verzendkosten voor EU-zendingen. Consulten en bloedonderzoek zijn niet aan een land gebonden; alleen de prikpost voor bloedafname moet in Nederland liggen.",
  },
  {
    question: "Kan ik mijn bestelling laten bezorgen op een afhaalpunt?",
    answer:
      "Wij versturen naar het adres dat u bij de bestelling opgeeft. Mist u de bezorging, dan geldt de normale procedure van de vervoerder: het pakket wordt nog eens aangeboden of naar een afhaalpunt in de buurt gebracht, waar u het met de kaart of code kunt ophalen.",
  },
];

export default function BezorgingPage() {
  return (
    <>
      <PageHero
        eyebrow="Levering"
        title="Diensten per e-mail, supplementen per post"
        intro="Het grootste deel van ons aanbod wordt niet verzonden: een consult is een video-call en een bloedonderzoek loopt via een prikpost bij u in de buurt. Alleen supplementen gaan op de post, neutraal verpakt, zodra uw betaling binnen is."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 grid gap-5 md:grid-cols-3">
        {soorten.map((u) => (
          <div key={u.title} className="rounded-md border border-border bg-surface p-5">
            <u.icon size={20} className="text-accent" />
            <h3 className="mt-3 font-display text-lg text-text">{u.title}</h3>
            <p className="mt-1.5 text-sm text-text-muted leading-relaxed">{u.sub}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="rounded-md border border-border bg-surface p-6">
          <p className="text-xs uppercase tracking-[0.15em] text-accent font-semibold inline-flex items-center gap-1.5">
            <ShieldCheck size={12} /> Verzendkosten
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-text-muted">
            Voor supplementen rekenen wij €10 verzendkosten per bestelling binnen Nederland en €15
            voor België en de rest van de EU, ongeacht het aantal producten. Consulten en
            bloedonderzoek kennen geen verzendkosten. Wij hanteren bewust geen
            gratis-verzenddrempel: die verleidt tot bijbestellen wat u niet nodig heeft, en dat
            past niet bij een site die u probeert af te raden geld uit te geven aan dingen zonder
            effect.
          </p>
        </div>
      </section>

      <section className="bg-surface border-y border-border">
        <div className="mx-auto max-w-7xl px-4 py-14 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-display text-2xl text-text">Veelgestelde vragen</h2>
            <p className="mt-3 text-sm text-text-muted leading-relaxed">
              Staat uw vraag er niet bij? Stel hem via het{" "}
              <Link href="/contact" className="text-accent hover:underline">contactformulier</Link>,
              wij antwoorden binnen een werkdag.
            </p>
          </div>
          <FaqAccordion items={faq} />
        </div>
      </section>
    </>
  );
}
