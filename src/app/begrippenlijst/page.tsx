import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Begrippenlijst anabolen & AAS - HPLC, PCT, HPTA, aromatisatie | Anabolendoktor",
  description:
    "Uitleg van de begrippen die u tegenkomt op anabolendoktor.com en in de kennisbank: AAS, aromatisatie, HPTA, PCT, bloedwerk, Janoshik, ester, half-life en meer. Voor beginners en ervaren gebruikers.",
  alternates: { canonical: "/begrippenlijst" },
};

type Term = {
  id: string;
  term: string;
  short: string;
  body: string;
  related?: string[];
  link?: string;
};

const TERMS: Term[] = [
  {
    id: "aas",
    term: "AAS",
    short: "Anabole-Androgene Steroïden",
    body: "Verzamelnaam voor synthetische derivaten van testosteron met zowel spierbouwende (anabole) als vermannelijkende (androgene) effecten. Testosteron, Trenbolone, Dianabol, Nandrolon - allemaal AAS. De term is neutraler dan 'steroïden' en wordt gebruikt in de medische en onderzoeksliteratuur.",
    related: ["testosteron", "androgeen"],
  },
  {
    id: "aromatisatie",
    term: "Aromatisatie",
    short: "Omzetting van testosteron naar oestradiol",
    body: "Enzymatische omzetting van testosteron (en sommige andere AAS) naar oestradiol door het aromatase-enzym. Hoge oestradiol tijdens een kuur geeft water-retentie, gynecomastie (borstvorming) en emotionele labiliteit. Wordt gecontroleerd met een aromatase-remmer (AI) zoals Anastrozol of Exemestane wanneer bloedwerk >40 pg/ml E2 toont.",
    related: ["ai", "gynecomastie", "bloedwerk"],
    link: "/kennisbank",
  },
  {
    id: "ai",
    term: "AI (Aromatase-inhibitor)",
    short: "Blokkeert oestrogeen-vorming",
    body: "Middel dat het aromatase-enzym remt en daarmee de omzetting van testosteron naar oestradiol verlaagt. Voorbeelden: Anastrozol (Arimidex), Exemestane (Aromasin), Letrozol (Femara). Gebruik alleen als bloedwerk verhoogd oestradiol aantoont - te agressief doseren crasht E2 en veroorzaakt gewrichts- en libido-klachten.",
    related: ["aromatisatie", "bloedwerk"],
  },
  {
    id: "pct",
    term: "PCT",
    short: "Post-Cycle Therapy / Nakuur",
    body: "Protocol na een AAS-cycle om de natuurlijke testosteronproductie weer op gang te brengen. Standaard: SERM's zoals Clomid (Clomifeen) + Nolvadex (Tamoxifen), 4 weken na de laatste injectie, doseringen 50/50/25/25 mg Clomid + 40/40/20/20 mg Nolva. hCG kan optioneel de weken vóór PCT worden ingezet.",
    related: ["hpta", "clomid", "nolvadex", "hcg"],
    link: "/kennisbank",
  },
  {
    id: "hpta",
    term: "HPTA-as",
    short: "Hypothalamus-Pituitary-Testicular Axis",
    body: "De feedback-loop tussen hypothalamus, hypofyse en testes die de natuurlijke testosteronproductie regelt. Tijdens een AAS-cycle wordt deze onderdrukt (suppressie) omdat het lichaam denkt dat er genoeg testosteron circuleert. Na de cycle moet uw HPTA-as herstellen - dat is precies wat PCT doet.",
    related: ["pct", "suppressie", "lh", "fsh"],
  },
  {
    id: "suppressie",
    term: "Suppressie",
    short: "Onderdrukking natuurlijke productie",
    body: "Tijdelijke shutdown van uw eigen testosteron-productie tijdens een AAS-cycle. LH en FSH dalen naar nul, testes krimpen enigszins, endogene test wordt niet meer aangemaakt. Bij goede PCT herstelt dit in 3-6 maanden. Zonder PCT kan het maanden tot een jaar duren, of blijvend zijn bij lange/hoge-dosis cycles.",
    related: ["hpta", "pct"],
  },
  {
    id: "ester",
    term: "Ester",
    short: "Chemische groep die release-tijd bepaalt",
    body: "Aan een AAS gekoppelde vetzuurketen die bepaalt hoe snel het middel loskomt in het bloed. Korte esters (Propionaat, Acetate) werken snel en zijn snel uit uw systeem; lange esters (Enanthate, Cypionate, Decanoate) hebben stabielere bloedwaardes en minder-frequente injecties nodig. Sustanon is een blend van 4 verschillende esters.",
    related: ["half-life", "testosteron"],
  },
  {
    id: "half-life",
    term: "Half-life (halfwaardetijd)",
    short: "Tijd tot 50% van de dosis is afgebroken",
    body: "De tijd waarin de concentratie van een middel in uw bloed halveert. Test Propionaat: ~2 dagen (om de dag prikken). Test Enanthate: ~7 dagen (2× per week). Trenbolone Enanthate: ~7 dagen. Deca (Nandrolon Decanoate): ~15 dagen. Bepaalt hoe vaak u moet injecteren en hoe lang detectie duurt.",
    related: ["ester"],
  },
  {
    id: "bloedwerk",
    term: "Bloedwerk",
    short: "Labwaardes tijdens/rond een cycle",
    body: "Meet u vóór, halverwege (week 6) en na een cycle. Standaard panel: totaal + vrij testosteron, oestradiol (E2), SHBG, LH, FSH, prolactine, hematocriet + hemoglobine, ALT + AST (lever), lipidenpanel (HDL/LDL/triglyceriden), creatinine + eGFR (nier), TSH. Zonder bloedwerk kuren = blind rijden - u ziet niet wat er mis gaat tot het te laat is.",
    related: ["hematocriet", "shbg", "e2"],
    link: "/lab",
  },
  {
    id: "e2",
    term: "E2 (Oestradiol)",
    short: "Oestrogeen-niveau in het bloed",
    body: "De actieve oestrogeen-vorm. Streefwaarde tijdens een test-cycle: 20-40 pg/ml. Onder de 20 → droge gewrichten, laag libido, depressie. Boven de 40 → water-retentie, gynecomastie-risico. Wordt bijgestuurd met een aromatase-remmer, alleen als de waarde daadwerkelijk verhoogd is.",
    related: ["aromatisatie", "ai", "gynecomastie"],
  },
  {
    id: "shbg",
    term: "SHBG",
    short: "Sex Hormone Binding Globulin",
    body: "Eiwit dat testosteron in uw bloed bindt en 'inactief' maakt. Alleen vrij (niet-gebonden) testosteron heeft biologisch effect. Sommige AAS (Winstrol, Proviron) verlagen SHBG waardoor méér vrij testosteron beschikbaar komt - een van de redenen dat een klein beetje Winstrol een cycle 'harder' kan laten aanvoelen.",
    related: ["testosteron", "bloedwerk"],
  },
  {
    id: "hematocriet",
    term: "Hematocriet (HCT)",
    short: "Percentage rode bloedcellen",
    body: "AAS verhogen de aanmaak van rode bloedcellen (erythropoëse). Normaal 40-50%. Boven de 54% wordt het bloed te dik - verhoogd risico op trombose, hoofdpijn, hoge bloeddruk. Fix: 500 ml bloed doneren bij Sanquin verlaagt het meestal binnen een dag. Trenbolone en EQ verhogen HCT het meest.",
    related: ["bloedwerk"],
  },
  {
    id: "gynecomastie",
    term: "Gynecomastie (gyno)",
    short: "Borstweefselvorming bij mannen",
    body: "Groei van klierweefsel achter de tepels door verhoogd oestradiol of prolactine. Vroege signalen: gevoelige, prikkelende tepels; kleine harde knobbel achter de tepel. Vroeg ingrijpen (AI voor E2-gyno, Cabergoline voor prolactine-gyno) draait het meestal om; te laat = chirurgische verwijdering.",
    related: ["e2", "aromatisatie", "ai"],
  },
  {
    id: "clomid",
    term: "Clomid (Clomifeen)",
    short: "SERM voor nakuur",
    body: "Selectieve oestrogeen-receptor modulator die de hypothalamus 'blind' maakt voor oestrogeen, wat de LH-productie flink omhoog jaagt en daarmee uw testes weer wakker maakt. Standaard PCT-dosering: 50/50/25/25 mg over 4 weken. Bijwerkingen: emotionele labiliteit, visuele klachten bij >100 mg/dag.",
    related: ["pct", "nolvadex", "serm"],
  },
  {
    id: "nolvadex",
    term: "Nolvadex (Tamoxifen)",
    short: "SERM voor nakuur + gyno-behandeling",
    body: "SERM die oestrogeen-receptoren in borstweefsel blokkeert. Gebruikt in PCT (40/40/20/20 mg over 4 weken) en als eerstelijns-behandeling voor beginnende gyno. Milder dan Clomid, minder mentale bijwerkingen.",
    related: ["pct", "clomid", "gynecomastie", "serm"],
  },
  {
    id: "serm",
    term: "SERM",
    short: "Selective Estrogen Receptor Modulator",
    body: "Klasse middelen die op sommige plekken de oestrogeen-receptor blokkeren en op andere activeren. Verlagen geen oestradiol (zoals een AI), maar voorkomen dat oestrogeen op bepaalde weefsels werkt. Clomid en Nolvadex zijn de bekendste voorbeelden.",
    related: ["clomid", "nolvadex"],
  },
  {
    id: "hcg",
    term: "hCG",
    short: "Humaan Choriongonadotrofine",
    body: "Zwangerschapshormoon dat op de LH-receptor van de testes werkt. Gebruikt om testes actief te houden tijdens een lange cycle (250-500 IE 2× per week) of een 'blast' vóór PCT (2000 IE 2× per week voor 2 weken). Voorkomt testes-atrofie en versnelt herstel.",
    related: ["hpta", "pct", "lh"],
  },
  {
    id: "janoshik",
    term: "Janoshik Analytical",
    short: "Onafhankelijk peptide/AAS-lab",
    body: "Tsjechisch analytisch lab dat HPLC- en mass-spec analyses uitvoert op AAS, peptides en SARM's op verzoek van webshops en particulieren. Industrie-referentie voor batch-verificatie. Anabolendoktor test iedere UT-batch bij Janoshik en publiceert het rapport per batchcode op /lab.",
    related: ["hplc", "coa", "batchcode"],
    link: "/lab",
  },
  {
    id: "hplc",
    term: "HPLC",
    short: "High-Performance Liquid Chromatography",
    body: "Analytische techniek om de zuiverheid en identiteit van een AAS te bepalen. De stof wordt onder druk door een kolom geperst; verschillende moleculen komen op verschillende tijden uit de kolom en worden afzonderlijk gedetecteerd. Een HPLC-rapport toont het percentage van de opgegeven werkzame stof plus eventuele verontreinigingen.",
    related: ["janoshik", "coa"],
  },
  {
    id: "coa",
    term: "COA",
    short: "Certificate of Analysis",
    body: "Document dat de meetwaardes van een onafhankelijk labtest vermeldt: identiteit, HPLC-zuiverheid, batchnummer en analysedatum. Iedere UT-batch heeft een openbaar COA doorzoekbaar per batchcode. Zonder COA weet u niet wat u in de fles hebt.",
    related: ["hplc", "janoshik", "batchcode"],
    link: "/lab",
  },
  {
    id: "batchcode",
    term: "Batchcode",
    short: "Unieke code per productie-batch",
    body: "Op iedere flacon of strip staat een code die verwijst naar de specifieke productie-batch en het bijbehorende lab-rapport. Zonder batchcode kunt u een COA niet verifiëren. Kloppende batchcode + COA = u weet wat u hebt.",
    related: ["coa", "janoshik"],
    link: "/lab",
  },
  {
    id: "kickstart",
    term: "Oral kickstart",
    short: "Oral compound eerste 4 weken",
    body: "Strategie waarbij een oral (Dianabol, Anadrol) wordt gebruikt in de eerste 4-6 weken van een cycle. Werkt snel en overbrugt de tijd waarin de langzamere injectie-ester nog moet opbouwen naar volle bloedwaarde. Klassieke stack: Test E + Dianabol kickstart.",
    related: ["dianabol", "ester"],
  },
  {
    id: "recomp",
    term: "Recomp (recompositie)",
    short: "Tegelijk vet kwijt + spier erbij",
    body: "Fysieke recompositie: gelijktijdig vetverlies en spieropbouw. Lastig zonder farmacologische ondersteuning omdat het één spierbouw én caloriedeficit vereist. Typische recomp-stack: TRT-dose test + Anavar of Masteron, met licht caloriedeficit en zwaar krachttrainen.",
    related: ["anavar", "masteron"],
  },
  {
    id: "trt",
    term: "TRT-dose",
    short: "Testosterone Replacement Therapy dosering",
    body: "100-200 mg testosteron per week - de dosering die medische TRT gebruikt om natuurlijke test-niveaus te herstellen bij hypogonadisme. Wordt in recreatief gebruik ingezet als 'basis-dose' waar krachtigere compounds bovenop gestackt worden. Weinig bijwerkingen bij deze dosis, maar wél suppressief op uw HPTA-as.",
    related: ["testosteron", "hpta"],
  },
  {
    id: "stack",
    term: "Stack",
    short: "Combinatie van meerdere compounds",
    body: "Twee of meer AAS die u gelijktijdig gebruikt. Klassieke stacks: Test + Deca (mass), Test + Trenbolone (cutting), Test + Anavar (recomp). Basis is bijna altijd testosteron - pure Deca- of Trenbolone-cycles zonder test crashen uw libido gegarandeerd.",
    related: ["testosteron", "deca", "trenbolone"],
  },
  {
    id: "blend",
    term: "Blend",
    short: "Mix van meerdere esters in één flacon",
    body: "Combinatie van verschillende esters in één flacon. Sustanon 250 is een blend van propionaat, phenylpropionaat, isocaproaat en decanoaat. Voordeel: minder injecties nodig voor stabiele bloedwaardes. Nadeel: iedere ester zit al vast in de dosering - u kunt niet één ester aan- of uitzetten.",
    related: ["ester", "testosteron"],
  },
  {
    id: "kuur",
    term: "Kuur / Cycle",
    short: "Periode waarin AAS gebruikt wordt",
    body: "Blok van een aantal weken waarin uw AAS gebruikt op vast schema. Beginners: 12-16 weken. Advanced: 16-20 weken. Langere cycles = zwaardere HPTA-shutdown en langer PCT-herstel. Tussen cycles minimaal een even lange 'off-time' (time on = time off) om uw systeem te laten recoveren.",
    related: ["pct", "hpta"],
  },
  {
    id: "bulk",
    term: "Bulk",
    short: "Cycle gericht op massa & kracht",
    body: "Cycle in caloriesurplus met AAS gericht op maximaal spier- en krachtaanwinst, meestal met wat vet erbij. Compounds: Test, Deca, Boldenone, Dianabol. 'Lean bulk' = klein surplus voor kwaliteitsspiermassa; 'dirty bulk' = groot surplus voor puur volume.",
    related: ["cutting", "recomp"],
  },
  {
    id: "cutting",
    term: "Cutting",
    short: "Cycle gericht op vetverlies",
    body: "Cycle in caloriedeficit met AAS gericht op vetverlies bij spierbehoud (of licht spierverlies-preventie). Compounds: Test-basis + Trenbolone, Masteron, Anavar, Winstrol. Doel: zo droog en gestriped mogelijk zonder catabole verlies.",
    related: ["bulk", "recomp"],
  },
  {
    id: "androgeen",
    term: "Androgeen",
    short: "Vermannelijkende hormonen",
    body: "Hormonen die mannelijke geslachtskenmerken bevorderen: baardgroei, lichaamsbeharing, diepe stem, prostaat, libido. Testosteron is het belangrijkste natuurlijke androgeen. AAS met hoge androgene score (Trenbolone, Testosteron) geven meer androgene bijwerkingen zoals acne, haaruitval en agressie.",
    related: ["aas", "testosteron"],
  },
  {
    id: "lh",
    term: "LH",
    short: "Luteïniserend Hormoon",
    body: "Hormoon uit de hypofyse dat de Leydig-cellen in de testes aanzet tot testosteron-productie. Tijdens een AAS-cycle wordt LH onderdrukt naar nagenoeg nul; PCT met Clomid/Nolvadex jaagt LH weer omhoog om herstel te starten. Meet LH als onderdeel van uw bloedwerk vóór en na een cycle.",
    related: ["hpta", "pct", "bloedwerk"],
  },
  {
    id: "fsh",
    term: "FSH",
    short: "Follikel Stimulerend Hormoon",
    body: "Hormoon uit de hypofyse dat spermatogenese ondersteunt. Wordt eveneens onderdrukt tijdens een AAS-cycle, hersteld tijdens PCT. Belangrijk als uw vruchtbaarheid wilt houden - een langdurige FSH-suppressie kan blijvend gevolg zijn.",
    related: ["hpta", "lh", "pct"],
  },
];

export default function BegrippenlijstPage() {
  const definedTermSet = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Begrippenlijst anabolen & AAS",
    url: "https://anabolendoktor.com/begrippenlijst",
    hasDefinedTerm: TERMS.map((t) => ({
      "@type": "DefinedTerm",
      "@id": `https://anabolendoktor.com/begrippenlijst#${t.id}`,
      name: t.term,
      description: t.body,
      inDefinedTermSet: "https://anabolendoktor.com/begrippenlijst",
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSet) }}
      />

      <section className="mx-auto max-w-7xl px-4 py-14 md:py-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-paper-soft px-3 py-1 text-xs text-text-muted">
          <BookOpen className="h-3.5 w-3.5" /> Begrippen &middot; anabolen &amp; AAS
        </div>
        <h1 className="mt-5 max-w-3xl font-display text-4xl md:text-5xl">
          Begrippenlijst
        </h1>
        <p className="mt-4 max-w-2xl text-text-muted leading-relaxed">
          Uitleg van de begrippen die u op deze site en in de kennisbank tegenkomt. Hover over
          een term (dotted underline) om de korte definitie te zien, of klik op de volledige
          uitleg hieronder. Geschreven voor beginners en voor gebruikers die hun kennis willen
          checken.
        </p>
      </section>

      <article className="container-x mx-auto max-w-3xl pb-16 md:pb-20">
        <nav aria-label="A-Z navigatie" className="mb-10 flex flex-wrap gap-2 rounded-lg border border-border bg-paper-soft p-4 text-sm">
          {Array.from(new Set(TERMS.map((t) => t.term[0].toUpperCase())))
            .sort()
            .map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="rounded-full bg-background px-3 py-1 font-medium text-text hover:bg-accent hover:text-accent-foreground"
              >
                {letter}
              </a>
            ))}
        </nav>

        <div className="space-y-10">
          {Array.from(new Set(TERMS.map((t) => t.term[0].toUpperCase())))
            .sort()
            .map((letter) => (
              <section key={letter} id={`letter-${letter}`}>
                <h2 className="font-display text-3xl text-accent">{letter}</h2>
                <div className="mt-4 space-y-8">
                  {TERMS.filter((t) => t.term[0].toUpperCase() === letter).map((t) => (
                    <article
                      key={t.id}
                      id={t.id}
                      className="border-b border-border pb-6 last:border-0"
                    >
                      <h3 className="font-display text-xl text-text">{t.term}</h3>
                      <p className="mt-1 text-sm italic text-text-muted">{t.short}</p>
                      <p className="mt-3 text-[15px] leading-relaxed text-text">{t.body}</p>
                      {(t.link || (t.related && t.related.length > 0)) && (
                        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                          {t.link && (
                            <Link
                              href={t.link}
                              className="rounded-full bg-paper-soft px-3 py-1 font-medium text-text hover:bg-accent hover:text-accent-foreground"
                            >
                              → {t.link.slice(1)}
                            </Link>
                          )}
                          {t.related?.map((relId) => {
                            const rel = TERMS.find((x) => x.id === relId);
                            if (!rel) return null;
                            return (
                              <a
                                key={relId}
                                href={`#${relId}`}
                                className="rounded-full border border-border bg-background px-3 py-1 text-text-muted hover:border-accent hover:text-accent"
                              >
                                {rel.term}
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            ))}
        </div>

        <div className="mt-16 rounded-lg border border-border bg-paper-soft p-6 md:p-8">
          <p className="text-xs uppercase tracking-wider text-accent font-semibold">Vraag beantwoord?</p>
          <h3 className="mt-2 font-display text-2xl text-text">
            Term nog niet gevonden of niet duidelijk?
          </h3>
          <p className="mt-2 text-sm text-text-muted">
            Stuur ons een berichtje via{" "}
            <Link href="/contact" className="text-accent underline">/contact</Link> - we vullen de
            begrippenlijst continu aan op basis van vragen die binnenkomen.
          </p>
        </div>
      </article>
    </>
  );
}
