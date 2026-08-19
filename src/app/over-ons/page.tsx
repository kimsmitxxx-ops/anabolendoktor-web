import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shop/page-hero";
import { listBlogAuthors } from "@/lib/queries";
import {
  FlaskConical,
  ShieldCheck,
  Microscope,
  Users,
  ClipboardList,
  Mail,
  MapPin,
  BadgeCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Over Anabolendoktor - Team, lab-policy en transparantie",
  description:
    "Anabolendoktor is een Nederlandse research-shop met Janoshik HPLC lab-test per batch. Lees over ons team van pro-atleten + medisch consultant, onze lab-policy en bedrijfsgegevens.",
  alternates: { canonical: "/over-ons" },
};

export const revalidate = 600;

const pillars = [
  {
    icon: FlaskConical,
    h: "Janoshik HPLC per batch",
    p: "Iedere binnenkomende batch wordt naar Janoshik Analytical (TS) gestuurd voor HPLC-UV + GC-MS-analyse. COA wordt gepubliceerd per batchcode op de productpagina.",
  },
  {
    icon: Microscope,
    h: "Afkeur boven 97% - openbaar",
    p: "Batches onder de 97%-zuiverheidsgrens gaan retour naar de leverancier. Reden van afkeur blijft openbaar in ons archief op /lab - incl. geanonimiseerde batchgegevens.",
  },
  {
    icon: ShieldCheck,
    h: "Lab-garantie",
    p: "Wijkt het gemeten gehalte meer dan 5% af van het op het label vermelde gehalte? Geld terug of een batch uit de volgende productie, zonder discussie.",
  },
  {
    icon: ClipboardList,
    h: "Eigen-test op aanvraag",
    p: "Klanten kunnen een product van een ander merk naar ons opsturen - wij regelen de Janoshik-meting (kostprijs, gratis bij vermoeden onveilig product). Aanvraag via /lab.",
  },
  {
    icon: Users,
    h: "Door en voor enhanced atleten",
    p: "Het team bestaat uit een IFBB Pro, een IPF powerlifter, een coach en een medisch consultant. Schrijven en advies komt uit ervaring + lab-data, niet uit marketing-brochures.",
  },
  {
    icon: MapPin,
    h: "NL-magazijn in Vlaardingen",
    p: "Alles verzonden vanaf Westhavenkade 12, 3134 NA Vlaardingen. Anoniem verpakt, betaling voor 11:00 op een werkdag = dezelfde dag verstuurd via PostNL of DPD.",
  },
];

export default async function OverOnsPage() {
  const authors = await listBlogAuthors();

  return (
    <>
      <PageHero
        eyebrow="Over Anabolendoktor"
        title="Lab-data-gedreven, eerlijk over risico - niet zomaar nóg een shop"
        intro="Anabolendoktor is opgericht omdat de NL-markt vol zit met underdosed labels, vage labjes en leveranciers die plots offline gaan. Wij testen iedere batch onafhankelijk via Janoshik, publiceren afkeuringen openbaar en laten enhanced atleten + een medisch consultant onze content schrijven. Geen marketing-brochures, wel echte cijfers."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 grid gap-10 lg:grid-cols-2 items-start">
        <div className="space-y-5 text-text-muted leading-relaxed">
          <p>
            We zijn een klein NL team: schrijvers (atleten + medisch consultant), klantenservice
            via chat en mail, en een logistiek planner. Allemaal mensen die zelf in de scene actief
            zijn of dat lang geweest zijn.
          </p>
          <p>
            Ons doel is helder: ieder product dat onze deur uit gaat, heeft een batchcode op het
            flesje die je publiek kunt opzoeken op de productpagina - daar staat het PDF-rapport
            van Janoshik Analytical: werkzame stof, gemeten zuiverheid, oplosmiddel-residu en
            eventuele isomeren. Onder 97%? Dan komt-ie niet in de shop. Punt.
          </p>
          <p>
            We schrijven óók over de slechte batches die we tegenkomen in de markt - eigen
            metingen of door klanten aangeleverd. Dat zorgt voor wrijving met sommige
            concurrenten, maar dat is wat de community vooruit helpt.
          </p>
        </div>
        <div className="rounded-md border border-border bg-surface p-6 lg:p-8">
          <p className="text-xs uppercase tracking-[0.15em] text-accent font-semibold">In cijfers (2026)</p>
          <dl className="mt-4 grid grid-cols-2 gap-y-6 gap-x-4">
            {[
              ["99,1%", "Gemiddelde zuiverheid"],
              ["186", "Producten online"],
              ["7", "Afgekeurde batches in archief"],
              ["4", "Onafhankelijke partner-labs"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-3xl text-text tabular">{n}</div>
                <div className="text-xs uppercase tracking-[0.12em] text-text-subtle mt-1">{l}</div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Team-schrijvers - kernpunt voor E-E-A-T compliance */}
      {authors.length > 0 && (
        <section className="bg-paper border-y border-border">
          <div className="mx-auto max-w-7xl px-4 py-16">
            <p className="text-xs uppercase tracking-[0.18em] text-accent font-semibold">Onze schrijvers</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl text-primary">
              Wie er achter onze content staat
            </h2>
            <p className="mt-3 max-w-3xl text-primary/70 leading-relaxed">
              Geen anonieme tekstschrijvers - onze blogs zijn geschreven door enhanced atleten met
              competitie-ervaring en een medisch consultant. Iedere schrijver heeft eigen
              specialisaties en publiceert vanuit eigen praktijk-data.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {authors.map((a) => (
                <article
                  key={a.id}
                  id={a.slug}
                  className="rounded-xl border border-primary-muted bg-surface p-6 scroll-mt-20"
                >
                  <header className="flex items-start gap-4">
                    {a.avatar_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={a.avatar_url}
                        alt={`Profielfoto ${a.name}`}
                        className="h-16 w-16 rounded-full object-cover ring-2 ring-paper-border shrink-0"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-full bg-accent/15 flex items-center justify-center text-accent font-display text-xl shrink-0">
                        {a.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="font-display text-lg text-text">{a.name}</h3>
                      {a.role && <p className="text-xs text-text-muted">{a.role}</p>}
                    </div>
                  </header>
                  {a.bio_long && (
                    <p className="mt-4 text-sm text-text-muted leading-relaxed">{a.bio_long}</p>
                  )}
                  {a.credentials && a.credentials.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {a.credentials.map((c) => (
                        <li
                          key={c}
                          className="inline-flex items-center gap-1 rounded-full bg-paper-soft px-2.5 py-0.5 text-[11px] text-text-muted border border-border"
                        >
                          <BadgeCheck size={11} className="text-accent" /> {c}
                        </li>
                      ))}
                    </ul>
                  )}
                  {a.expertise && a.expertise.length > 0 && (
                    <p className="mt-4 text-[11px] text-text-subtle">
                      <span className="font-semibold text-text-muted">Expertise:</span>{" "}
                      {a.expertise.slice(0, 6).join(" · ")}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-surface border-y border-border">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <h2 className="font-display text-3xl text-text max-w-2xl">Zes principes die ons werk sturen</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.h} className="rounded-md border border-border bg-background p-5">
                <p.icon size={20} className="text-accent" />
                <h3 className="mt-3 font-display text-lg text-text">{p.h}</h3>
                <p className="mt-1.5 text-sm text-text-muted leading-relaxed">{p.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bedrijfsgegevens - kritiek voor trust + GDPR */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="rounded-md border border-border bg-surface p-8 lg:p-10 grid gap-8 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-accent font-semibold">Bedrijfsgegevens</p>
            <h2 className="mt-2 font-display text-2xl text-text">Anabolendoktor</h2>
            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex gap-2">
                <dt className="w-28 text-text-muted">Sinds</dt>
                <dd className="text-text">2019</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-28 text-text-muted">Magazijn</dt>
                <dd className="text-text">Westhavenkade 12, 3134 NA Vlaardingen</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-28 text-text-muted">KvK / BTW</dt>
                <dd className="text-text">Staat op de factuur na bestelling.</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-28 text-text-muted">Contact</dt>
                <dd className="text-text">
                  <Link className="text-accent hover:underline" href="/contact">
                    contactformulier op de site
                  </Link>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-28 text-text-muted">Support-uren</dt>
                <dd className="text-text">ma-vr 09:00-21:00 · za-zo 10:00-18:00</dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-text-subtle">
              Bezoek aan het magazijn is niet mogelijk. Voor klacht-, retour- of urgente vragen
              gebruik de chat (rechtsonder) - daar staat een medewerker direct.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-accent font-semibold">Onze positie</p>
            <h2 className="mt-2 font-display text-2xl text-text">Eerlijk, niet pushy</h2>
            <p className="mt-3 text-sm text-text-muted leading-relaxed">
              Wij verkopen <strong>research-grade materialen</strong> voor educatieve en
              onderzoeksdoeleinden - niet als medicatie. Anabolen en peptiden zijn in Nederland
              niet toegelaten voor humaan gebruik buiten medisch voorschrift. Wij promoten geen
              recreatief gebruik. Wat wij wél doen: zorgen dat als iemand deze keuze maakt, hij
              precies weet wat er in het flesje zit en welke risico's eraan vastzitten.
            </p>
            <p className="mt-3 text-sm text-text-muted leading-relaxed">
              Onze content is geschreven door enhanced atleten en een medisch consultant - geen
              copywriters. Bij twijfel of klachten: raadpleeg een arts en stop het gebruik. Bij
              bloedwerk-vragen: lees onze gids in de <Link href="/kennisbank/welk-bloedwerk-doe-je-voor-tijdens-en-na-een-aas-kuur" className="text-accent hover:underline">kennisbank</Link>.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 h-11 px-5 rounded bg-accent text-accent-foreground text-sm font-semibold hover:bg-accent-soft transition-colors"
            >
              <Mail size={15} /> Stel je vraag
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
