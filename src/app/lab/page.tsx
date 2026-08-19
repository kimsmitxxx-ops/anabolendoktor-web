import type { Metadata } from "next";
import Link from "next/link";
import { FlaskConical, FileText, Clock, ShieldCheck, ClipboardList, Microscope } from "lucide-react";

/**
 * Deze pagina bevatte de batchtest-tekst van anabolenpro: COA's per batch,
 * batchcodes op flacons, partijen retour naar de leverancier. Dat is hier
 * feitelijk onjuist -- anabolendoktor verkoopt geen middelen en heeft dus geen
 * batches. Vervangen door het proces dat hier wel speelt: bloedonderzoek bij
 * een regulier laboratorium en de interpretatie daarvan.
 *
 * Volledig eigen tekst, geen zin gedeeld met de andere shops.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hoe het bloedonderzoek werkt",
  description:
    "Van aanvraagformulier tot schriftelijke interpretatie: hoe bloedonderzoek bij Anabolendoktor verloopt, welke waarden wij lezen en wat u van de uitslag mag verwachten.",
  alternates: { canonical: "/lab" },
};

const STAPPEN = [
  {
    icon: ClipboardList,
    stap: "1",
    titel: "U ontvangt een aanvraagformulier",
    tekst:
      "Na uw bestelling krijgt u een formulier met de aan te vragen bepalingen. Daarmee kunt u terecht bij een reguliere prikpost bij u in de buurt. U hoeft geen verwijzing van uw huisarts te hebben en u hoeft niet te vertellen waarom u het laat doen.",
  },
  {
    icon: Microscope,
    stap: "2",
    titel: "Het laboratorium voert de bepalingen uit",
    tekst:
      "Het bloed wordt geanalyseerd door een geaccrediteerd laboratorium, hetzelfde soort lab waar uw huisarts mee werkt. Wij voeren zelf geen analyses uit. De uitslag komt op uw naam en blijft van u.",
  },
  {
    icon: FileText,
    stap: "3",
    titel: "Wij lezen de uitslag en schrijven de interpretatie",
    tekst:
      "U stuurt het uitslagformulier naar ons toe. Wij lopen per bepaling na wat er staat, of die binnen de referentiewaarden valt en wat een afwijking in uw situatie betekent. Die uitleg krijgt u schriftelijk, zodat u hem kunt teruglezen en desgewenst met uw huisarts kunt bespreken.",
  },
];

const WAARDEN = [
  { groep: "Lever", items: "ALAT, ASAT, gamma-GT, bilirubine" },
  { groep: "Nieren", items: "kreatinine, ureum, eGFR" },
  { groep: "Vetten", items: "totaal cholesterol, HDL, LDL, triglyceriden" },
  { groep: "Bloedbeeld", items: "hemoglobine, hematocriet, trombocyten" },
  { groep: "Hormonaal", items: "totaal en vrij testosteron, LH, FSH, oestradiol, SHBG, prolactine" },
  { groep: "Schildklier", items: "TSH, vrij T4" },
];

export default function LabPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-6 text-xs text-text-muted">
        <Link href="/" className="hover:underline">Home</Link> / <span>Bloedonderzoek</span>
      </div>

      <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent-soft/20 px-3 py-1 text-xs font-medium text-accent">
        <FlaskConical className="h-3.5 w-3.5" />
        Geaccrediteerd laboratorium
      </div>

      <h1 className="mt-5 font-display text-3xl md:text-4xl">Hoe het bloedonderzoek werkt</h1>
      <p className="mt-5 max-w-3xl leading-relaxed text-text-muted">
        Een uitslagformulier is zonder uitleg een rij getallen met referentiewaarden ernaast.
        Of een waarde in uw situatie zorgelijk is, hangt af van wat u doet, wat u eerder deed
        en hoe de andere waarden erbij staan. Die context is precies wat wij toevoegen.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {STAPPEN.map((s) => (
          <div key={s.stap} className="rounded-xl border border-paper-border bg-paper-soft p-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                {s.stap}
              </span>
              <s.icon className="h-5 w-5 text-accent" />
            </div>
            <h2 className="mt-4 font-display text-lg">{s.titel}</h2>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{s.tekst}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-14 font-display text-2xl">Welke waarden wij lezen</h2>
      <p className="mt-3 max-w-3xl text-text-muted">
        Welke bepalingen zinvol zijn hangt af van uw situatie. Het uitgebreide pakket bevat
        naast onderstaande groepen ook het hormonale profiel.
      </p>
      <div className="mt-6 overflow-hidden rounded-xl border border-paper-border">
        <table className="w-full text-sm">
          <tbody>
            {WAARDEN.map((w, i) => (
              <tr key={w.groep} className={i % 2 ? "bg-paper-soft" : ""}>
                <td className="w-40 px-5 py-3 font-medium text-text">{w.groep}</td>
                <td className="px-5 py-3 text-text-muted">{w.items}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        <div className="rounded-xl border border-paper-border bg-paper-soft p-6">
          <Clock className="h-5 w-5 text-accent" />
          <h3 className="mt-3 font-display text-lg">Doorlooptijd</h3>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            Het laboratorium levert de meeste bepalingen binnen twee werkdagen. Onze
            interpretatie volgt binnen een werkdag nadat u de uitslag heeft doorgestuurd.
          </p>
        </div>
        <div className="rounded-xl border border-paper-border bg-paper-soft p-6">
          <ShieldCheck className="h-5 w-5 text-accent" />
          <h3 className="mt-3 font-display text-lg">Wat wij niet doen</h3>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            Wij stellen geen diagnose, schrijven niets voor en delen uw uitslag met niemand.
            Bij waarden die directe medische aandacht vragen verwijzen wij u naar uw huisarts.
          </p>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/winkel/bloedwerk" className="inline-flex rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent-soft">
          Bloedonderzoek bestellen
        </Link>
        <Link href="/consult" className="inline-flex rounded-full border border-paper-border px-5 py-3 text-sm hover:border-accent">
          Eerst een consult
        </Link>
      </div>
    </div>
  );
}
