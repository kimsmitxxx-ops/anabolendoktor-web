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
  title: "Over Anabolendoktor - consultatie zonder verkoopbelang",
  description:
    "Anabolendoktor biedt consulten, bloedwerk-interpretatie en een kleine selectie legale supplementen. Wij verkopen geen anabolen en hebben daarom geen belang bij het bagatelliseren van risico's.",
  alternates: { canonical: "/over-ons" },
};

export const revalidate = 600;

// Deze pijlers beschreven het batchtest-model van anabolenpro: Janoshik-analyses,
// afkeurgrenzen, partijen retour naar de leverancier. Anabolendoktor verkoopt
// geen middelen en heeft dus geen batches; die claims waren hier feitelijk
// onjuist en tegelijk letterlijk gedeeld met een zustersite.
const pillars = [
  {
    icon: FlaskConical,
    h: "Wij verkopen geen anabolen",
    p: "Dat is geen kanttekening maar het uitgangspunt. Omdat wij geen middelen leveren, hebben wij geen belang bij het bagatelliseren van risico's en evenmin bij bangmakerij. Wat u hier leest is niet gekleurd door wat wij willen verkopen.",
  },
  {
    icon: Microscope,
    h: "Meten in plaats van aannemen",
    p: "Vrijwel elk gesprek begint bij bloedwaarden. Een uitslag laat zien wat er werkelijk gebeurt in plaats van wat iemand vermoedt of op een forum heeft gelezen. Zonder meting is elk advies giswerk.",
  },
  {
    icon: ShieldCheck,
    h: "Wij oordelen niet",
    p: "Een deel van onze bezoekers gebruikt of overweegt dat. Afraden zonder uitleg werkt niet en wegkijken evenmin. Wij bespreken wat er speelt, waar u op moet letten en wanneer u naar een arts moet. Uw gegevens delen wij met niemand.",
  },
  {
    icon: ClipboardList,
    h: "Wij zijn geen arts",
    p: "Wij stellen geen diagnose en schrijven niets voor. Er ontstaat geen behandelrelatie. Wat wij wel doen is uw uitslag begrijpelijk maken en aangeven wanneer uw huisarts aan zet is, zodat u met een concrete vraag komt in plaats van een vage.",
  },
  {
    icon: Users,
    h: "Evidence-based, ook als dat tegenvalt",
    p: "Wij verwijzen naar gepubliceerd onderzoek en zeggen het eerlijk wanneer dat onderzoek dun is of tegenstrijdig. Bij supplementen betekent dat vaak: het effect is kleiner dan de verpakking suggereert.",
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
        title="Voorlichting en consultatie, zonder dat wij iets aan u willen verkopen"
        intro="Anabolendoktor is opgezet vanuit een simpele constatering: wie anabolen gebruikt of dat overweegt, krijgt zijn informatie doorgaans van partijen die er belang bij hebben. Verkopers bagatelliseren, voorlichters moraliseren, en de gebruiker blijft achter met een forum. Wij verkopen geen middelen. Wij bieden consulten, laten bloed prikken en leggen uit wat de uitslag betekent. Wat daaruit volgt is soms dat u beter kunt stoppen, en soms dat er minder aan de hand is dan u dacht."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 grid gap-10 lg:grid-cols-2 items-start">
        <div className="space-y-5 text-text-muted leading-relaxed">
          <p>
            Wij zijn een klein Nederlands team: een medisch consultant die de uitslagen leest,
            begeleiders met jarenlange ervaring in de krachtsport, en iemand die de administratie
            en de bezorging draaiende houdt. Kort genoeg om u steeds dezelfde persoon te laten
            spreken.
          </p>
          <p>
            Ons uitgangspunt is dat een uitslagformulier zonder uitleg weinig waard is. Wat wij
            toevoegen is context: wat betekent deze waarde in uw situatie, past die bij wat u
            doet, en is dit iets om te volgen of om vandaag nog een arts voor te bellen. Die
            uitleg krijgt u schriftelijk, zodat u hem kunt teruglezen en desgewenst met uw
            huisarts kunt bespreken.
          </p>
          <p>
            Wij schrijven ook over wat er misgaat: middelen die anders blijken te zijn dan het
            etiket zegt, supplementen die met claims worden verkocht die het onderzoek niet
            draagt, en adviezen die op fora circuleren zonder enige onderbouwing. Dat levert
            weerstand op bij partijen die daar hun omzet vandaan halen. Dat nemen wij voor lief.
          </p>
        </div>
        <div className="rounded-md border border-border bg-surface p-6 lg:p-8">
          {/* Hier stonden de cijfers van anabolenpro: gemiddelde zuiverheid,
              afgekeurde batches, partner-labs. Die slaan hier nergens op en
              waren bovendien onwaar. Vervangen door wat feitelijk klopt; we
              verzinnen geen prestatiecijfers voor een dienst die net begint. */}
          <p className="text-xs uppercase tracking-[0.15em] text-accent font-semibold">Waar u op kunt rekenen</p>
          <dl className="mt-4 grid grid-cols-2 gap-y-6 gap-x-4">
            {[
              ["0", "Anabolen in ons assortiment"],
              ["1", "Werkdag reactietijd"],
              ["20+", "Bloedwaarden in het uitgebreide pakket"],
              ["45", "Minuten per intakeconsult"],
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
              Wij verkopen geen anabolen. Anabole steroïden zijn in Nederland receptplichtige
              geneesmiddelen en horen bij een arts thuis. Wat wij wel doen is uitleggen wat
              gebruik met een lichaam doet, welke waarden dat zichtbaar maken en wanneer iets bij
              een arts hoort. Wij moedigen gebruik niet aan en veroordelen niemand die het doet.
            </p>
            <p className="mt-3 text-sm text-text-muted leading-relaxed">
              Onze teksten worden geschreven door consulenten met een achtergrond in
              bewegingswetenschap en endocrinologie, met bronvermelding erbij. Bij twijfel of
              klachten raadpleegt u een arts. Weet u niet waar te beginnen, doe dan de <Link href="/keuzehulp" className="text-accent hover:underline">keuzehulp</Link>.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 h-11 px-5 rounded bg-accent text-accent-foreground text-sm font-semibold hover:bg-accent-soft transition-colors"
            >
              <Mail size={15} /> Stel uw vraag
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
