import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, HeartPulse, Droplets, Brain, ShieldAlert } from "lucide-react";

/**
 * Deze pagina moet bestaan: buildInternalLinks in shop-dash zet in elke nieuwe
 * blog een verwijzing hiernaartoe. Zonder deze route krijgt elk artikel dat de
 * Schrijver produceert een dode link.
 *
 * Tekst is volledig voor deze shop geschreven, in de u-vorm. Anabolendoktor
 * verkoopt geen anabolen en neemt hier dus een andere positie in dan de
 * verkopende shops: dit is voorlichting, geen bijsluiter bij een product.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Risico's en bijwerkingen van anabolen",
  description:
    "Wat anabole steroiden doen met lever, hart, bloedwaarden en hormoonhuishouding. Feitelijke voorlichting zonder verkoopbelang, met de signalen waarbij u een arts moet raadplegen.",
  alternates: { canonical: "/risicos-en-bijwerkingen" },
};

const ORGAAN = [
  {
    icon: HeartPulse,
    titel: "Hart en bloedvaten",
    tekst:
      "Het duidelijkst meetbare effect is de verschuiving in het lipidenprofiel: het HDL daalt vaak fors terwijl het LDL stijgt. Daarnaast komen een verhoogde hematocriet en een stijging van de bloeddruk regelmatig voor. Bij langdurig gebruik is verdikking van de linkerhartkamer beschreven. Dit zijn geen theoretische risico's; ze zijn zichtbaar in bloedonderzoek en op een echo.",
  },
  {
    icon: Droplets,
    titel: "Lever",
    tekst:
      "Vooral orale middelen met een 17-alfa-alkylgroep belasten de lever. Dat uit zich in verhoogde leverenzymen, soms in cholestase. Verhoogde waarden komen ook voor door zware training zelf, wat interpretatie zonder context lastig maakt: daarvoor kijkt men naar het patroon van meerdere waarden samen en niet naar een enkel getal.",
  },
  {
    icon: Brain,
    titel: "Hormoonhuishouding",
    tekst:
      "Toediening van lichaamsvreemde androgenen onderdrukt de eigen aanmaak via de hypothalamus-hypofyse-gonade-as. Na het staken herstelt die as bij de meeste mensen, maar de termijn varieert sterk en is vooraf niet te voorspellen. Hoe langer en hoger gedoseerd is gebruikt, hoe trager het herstel doorgaans verloopt.",
  },
  {
    icon: ShieldAlert,
    titel: "Psychisch",
    tekst:
      "Stemmingswisselingen, prikkelbaarheid en slaapproblemen worden vaak gemeld. Na het staken komt een periode met somberheid voor, die samenhangt met het tijdelijk lage testosteron tijdens het herstel. Dat maakt de eerste maanden na een cycle de kwetsbaarste periode.",
  },
];

export default function RisicoPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-6 text-xs text-text-muted">
        <Link href="/" className="hover:underline">Home</Link> / <span>Risico&apos;s en bijwerkingen</span>
      </div>

      <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent-soft/20 px-3 py-1 text-xs font-medium text-accent">
        <AlertTriangle className="h-3.5 w-3.5" />
        Voorlichting zonder verkoopbelang
      </div>

      <h1 className="mt-5 font-display text-3xl md:text-4xl">Risico&apos;s en bijwerkingen</h1>

      <p className="mt-5 max-w-3xl leading-relaxed text-text-muted">
        Anabolendoktor verkoopt geen anabole steroiden. Dat is relevant voor hoe u deze
        pagina leest: wij hebben geen belang bij het bagatelliseren van risico&apos;s en
        evenmin bij het overdrijven ervan. Hieronder staat wat er in de medische
        literatuur over bijwerkingen bekend is, en wat daarvan in bloedonderzoek zichtbaar
        wordt.
      </p>

      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        Wij realiseren ons dat een deel van onze bezoekers gebruikt of dat overweegt.
        Afraden zonder uitleg werkt niet. Wat wel werkt is weten waar u op moet letten,
        en dat op tijd meten.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {ORGAAN.map((o) => (
          <div key={o.titel} className="rounded-xl border border-paper-border bg-paper-soft p-6">
            <o.icon className="h-6 w-6 text-accent" />
            <h2 className="mt-4 font-display text-xl">{o.titel}</h2>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{o.tekst}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-14 font-display text-2xl">Wanneer u een arts moet raadplegen</h2>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-text-muted">
        <li>Pijn op de borst, kortademigheid bij lichte inspanning of hartkloppingen die aanhouden</li>
        <li>Geel worden van de huid of het oogwit, of donkere urine bij lichte kleur ontlasting</li>
        <li>Aanhoudende hoofdpijn met een gemeten bloeddruk boven 160/100</li>
        <li>Sombere stemming die langer dan twee weken aanhoudt, zeker na het staken</li>
        <li>Zwelling van een enkel been of kuit, wat op trombose kan wijzen</li>
      </ul>
      <p className="mt-4 text-sm text-text-muted">
        Dit zijn signalen voor uw huisarts of de huisartsenpost, niet voor een consult bij
        ons. Wij zijn geen spoedvoorziening.
      </p>

      <h2 className="mt-14 font-display text-2xl">Wat wij wel kunnen doen</h2>
      <p className="mt-3 max-w-3xl leading-relaxed text-text-muted">
        Bloedwaarden laten meten en die met u doornemen, zodat u weet welke van bovenstaande
        risico&apos;s in uw geval spelen en welke niet. Een afwijking vroeg zien is de enige
        manier om er iets aan te doen voordat er klachten ontstaan.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/winkel/bloedwerk" className="inline-flex rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent-soft">
          Bloedonderzoek bekijken
        </Link>
        <Link href="/consult" className="inline-flex rounded-full border border-paper-border px-5 py-3 text-sm hover:border-accent">
          Consult aanvragen
        </Link>
      </div>

      <p className="mt-12 rounded-xl border border-paper-border bg-paper-soft p-5 text-sm text-text-muted">
        Deze pagina is voorlichting en geen medisch advies. Er ontstaat geen
        behandelrelatie door het lezen ervan. Bij twijfel of klachten is uw huisarts het
        juiste adres.
      </p>
    </div>
  );
}
