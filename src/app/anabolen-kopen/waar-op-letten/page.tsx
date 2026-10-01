import type { Metadata } from "next";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";

/**
 * Tweede pagina van het cluster rond "anabolen kopen". Mikt op de concrete
 * zoekvragen ("waar op letten", "betrouwbaar", "nep herkennen") en blijft
 * daarmee uit de weg van de brede term op /anabolen-kopen.
 *
 * Vorm met opzet een controlelijst: dat is waar bezoekers met deze vraag naar
 * zoeken en het leest ook als zodanig voorbij in de zoekresultaten. Toon
 * blijft die van deze shop: wij verkopen niets, dus de lijst mag punten
 * bevatten waar een verkoper niet aan wil.
 */
export const revalidate = 3600;

const CHECKS = [
  {
    titel: "Een analyseverslag dat ergens naartoe leidt",
    goed:
      "Naam van het laboratorium, een datum, de onderzochte stof, het gevonden gehalte en een nummer dat terugkomt op het flesje dat u in handen heeft.",
    fout:
      "Een afbeelding van een rapport zonder datum of labnaam, hetzelfde verslag onder tien verschillende producten, of een verslag dat ouder is dan een jaar. Zonder herleidbaar nummer gaat het rapport over iets anders dan wat u gekocht heeft.",
  },
  {
    titel: "Het gehalte, niet alleen de stof",
    goed:
      "Een resultaat dat zegt hoeveel milligram er per milliliter of per tablet gevonden is, met de afwijking ten opzichte van het label erbij.",
    fout:
      "De mededeling dat het middel echt is. Dat antwoordt alleen op de vraag welke stof het is. Te weinig is de meest gevonden afwijking, te veel de gevaarlijkste, en beide ziet u niet aan het flesje.",
  },
  {
    titel: "Steriliteit, die nooit zichtbaar is",
    goed:
      "Het besef dat geen enkel analyseverslag over steriliteit gaat, tenzij daar apart op getest is. Dat gebeurt vrijwel nooit.",
    fout:
      "Aannemen dat helder ogende olie schoon is. Een abces of bloedvergiftiging komt van wat u niet kunt zien, en dat is de complicatie die het vaakst in een ziekenhuis eindigt.",
  },
  {
    titel: "Een prijs die uit te leggen valt",
    goed:
      "Prijzen die in de buurt liggen van wat anderen vragen, met een verklaring als ze lager zijn.",
    fout:
      "Flink onder de markt. Verdunnen of een goedkopere stof gebruiken is de makkelijkste manier om die prijs mogelijk te maken, en u merkt het verschil pas als de uitslag of de bijwerking er is.",
  },
  {
    titel: "Beloftes die niemand kan doen",
    goed:
      "Een aanbieder die zegt wat hij niet weet, bijvoorbeeld dat hij zijn producent niet zelf gezien heeft.",
    fout:
      "Zinnen als honderd procent echt, apotheekwaardig, zonder bijwerkingen of veilig bij juist gebruik. Dat zijn geen feiten maar verkoopargumenten. Wie beweert dat er geen bijwerkingen zijn, spreekt de hele medische literatuur tegen.",
  },
  {
    titel: "Een betaling waar u nog op terug kunt komen",
    goed:
      "Begrijpen dat u bij iedere aanbieder buiten de wet geen koopbescherming heeft, en uw inzet daarop afstemmen.",
    fout:
      "Vooruitbetalen in cryptomunt of via een overschrijving naar een privepersoon, zeker een eerste keer. Komt het pakket niet aan, dan is er geen partij die u kunt aanspreken en geen instantie waar u terecht kunt.",
  },
  {
    titel: "Herkomst van merken en etiketten",
    goed:
      "Weten dat een etiket, een hologram en een krasvakje met code na te maken zijn, en dat die dus niets bewijzen.",
    fout:
      "Vertrouwen op het uiterlijk van de verpakking. Nagemaakte verpakkingen van bekende merken zijn gangbaar en vaak nauwelijks van echt te onderscheiden.",
  },
  {
    titel: "Bewaren en vervoer",
    goed:
      "Producten die droog en op kamertemperatuur zijn aangekomen, met de stop onbeschadigd en zonder lekkage of troebeling.",
    fout:
      "Een zending die weken onderweg was in de zomer, of waar vloeistof uit gelekt is. Bij middelen die koel bewaard moeten worden, is een niet gekoelde reis een reden om het niet te gebruiken.",
  },
  {
    titel: "Wat er in het aanbod ontbreekt",
    goed:
      "Uzelf afvragen of de aanbieder ook iets zegt over bloedonderzoek, herstel na het staken en wanneer u moet ophouden.",
    fout:
      "Een aanbod dat alleen uit middelen bestaat. Dat is het teken dat u met een verkoper te maken heeft en niet met iemand die uw uitkomst meeweegt.",
  },
  {
    titel: "Druk om nu te beslissen",
    goed:
      "Rustig de tijd nemen. Een paar weken wachten verandert niets aan uw resultaat.",
    fout:
      "Laatste voorraad, actie tot vanavond of korting bij een grotere order. Haast is een verkooptechniek, en bij dit onderwerp duwt ze u naar een grotere hoeveelheid dan u van plan was, met een groter risico bij de douane.",
  },
];

const VRAGEN = [
  {
    q: "Hoe weet ik of een laboratoriumanalyse echt is?",
    a: "Door te kijken of hij ergens naartoe leidt. Een verslag met de naam van het laboratorium, een datum en een nummer dat terugkomt op het flesje in uw hand is navolgbaar. Mist een van die drie, dan weet u niet waar het rapport over gaat. Let er ook op dat een aanbieder zelf kiest welk monster hij instuurt: een gunstig rapport over dat monster zegt niets over de rest van de productie.",
  },
  {
    q: "Kun je aan een flesje zien of het nep is?",
    a: "Nee. Kleur, dikte van de olie, de geur en hoe het injecteert zeggen niets over de stof of over het gehalte. Etiketten, hologrammen en codes worden nagemaakt. Alles wat u op het oog kunt vaststellen, kan een nagemaakt product ook hebben.",
  },
  {
    q: "Is een bekende leverancier met goede ervaringen betrouwbaar?",
    a: "Ervaringen van anderen gaan over eerdere productie, niet over wat u nu krijgt. Een aanbieder die jarenlang hetzelfde leverde, kan van producent wisselen zonder dat iemand dat merkt. Eerdere ervaringen zijn een zwak signaal, geen garantie.",
  },
  {
    q: "Wat kan ik dan wel met zekerheid vaststellen?",
    a: "Wat het met uw lichaam doet. Dat is in bloed te meten: een volledig bloedbeeld, lever- en nierwaarden, het lipidenprofiel en de hormoonwaarden. Over het product zelf blijft u afhankelijk van wat anderen beweren, maar over uw eigen waarden kunt u harde cijfers krijgen.",
  },
  {
    q: "Verkoopt Anabolendoktor deze middelen zelf?",
    a: "Nee. Wij geven consulten en laten bloedwaarden meten. Daarom kan deze lijst punten bevatten die een verkoper liever niet opschrijft.",
  },
];

export const metadata: Metadata = {
  title: "Anabolen kopen: waar u op moet letten",
  description:
    "Controlelijst van een partij die niets verkoopt: wat een laboratoriumanalyse waard is, waarom nep niet te zien is, welke beloftes onmogelijk zijn en wat u in plaats daarvan kunt laten meten.",
  alternates: { canonical: "/anabolen-kopen/waar-op-letten" },
};

export default function WaarOpLettenPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-6 text-xs text-text-muted">
        <Link href="/" className="hover:underline">Home</Link> /{" "}
        <Link href="/anabolen-kopen" className="hover:underline">Anabolen kopen</Link> /{" "}
        <span>Waar u op moet letten</span>
      </div>

      <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent-soft/20 px-3 py-1 text-xs font-medium text-accent">
        <ShieldAlert className="h-3.5 w-3.5" />
        Controlelijst zonder verkoopbelang
      </div>

      <h1 className="mt-5 font-display text-3xl md:text-4xl">Waar u op moet letten</h1>

      <p className="mt-5 max-w-3xl leading-relaxed text-text-muted">
        Deze lijst gaat over de vraag die iedereen stelt die iets wil bestellen: hoe weet ik
        of dit klopt. Het eerlijke antwoord is dat u dat over het product nooit helemaal
        zeker weet. Wel kunt u de meeste misleiding eruit filteren, en dat is de moeite waard.
        Hieronder staat per punt wat een redelijk teken is en wat een rode vlag, met de reden
        erbij. Wij verkopen zelf geen anabolen, dus deze lijst bevat ook de punten waar een
        verkoper niet graag aan komt.
      </p>

      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        De juridische kant, de leeftijdsgrenzen en wat gebruik met uw bloedwaarden doet, staan
        op de hoofdpagina{" "}
        <Link href="/anabolen-kopen" className="text-accent hover:underline">anabolen kopen</Link>.
      </p>

      <div className="mt-10 space-y-5">
        {CHECKS.map((c, i) => (
          <div key={c.titel} className="rounded-xl border border-paper-border bg-paper-soft p-6">
            <h2 className="font-display text-xl">
              <span className="text-accent">{i + 1}.</span> {c.titel}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              <span className="font-medium text-text">Redelijk teken: </span>
              {c.goed}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              <span className="font-medium text-text">Rode vlag: </span>
              {c.fout}
            </p>
          </div>
        ))}
      </div>

      <h2 className="mt-14 font-display text-2xl">Wat u wel zeker kunt weten</h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        Over het product blijft u afhankelijk van wat een ander beweert. Over uw eigen lichaam
        niet. Een bloedonderzoek vooraf, een meting op het moment van de hoogste belasting en
        een meting enkele maanden na het staken leveren cijfers op die niemand kan
        tegenspreken. Dat is de enige harde informatie in dit hele verhaal, en het is ook de
        informatie waarmee u op tijd kunt bijsturen.
      </p>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        Let daarbij op dat de belangrijkste veranderingen geen klachten geven. Een dalend HDL,
        een oplopend hematocriet en een stijgende bloeddruk voelt u niet. U merkt ze pas als
        er al schade is, en daarom is meten de enige manier om het te weten.
      </p>

      <h2 className="mt-14 font-display text-2xl">Rode vlaggen bij uzelf</h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        Een deel van de signalen hoort niet bij een controlelijst over inkoop, maar bij een
        huisarts of de huisartsenpost, vandaag:
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-text-muted">
        <li>Een warme, pijnlijke zwelling op een injectieplaats, met of zonder koorts</li>
        <li>Pijn op de borst, kortademigheid bij lichte inspanning of hartkloppingen die aanhouden</li>
        <li>Geel worden van huid of oogwit, of donkere urine</li>
        <li>Zwelling of pijn in een enkel been of kuit</li>
        <li>Sombere gedachten die langer dan twee weken aanhouden</li>
      </ul>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/winkel/bloedwerk" className="inline-flex rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent-soft">
          Bloedonderzoek bekijken
        </Link>
        <Link href="/anabolen-kopen" className="inline-flex rounded-full border border-paper-border px-5 py-3 text-sm hover:border-accent">
          Terug naar anabolen kopen
        </Link>
        <Link href="/risicos-en-bijwerkingen" className="inline-flex rounded-full border border-paper-border px-5 py-3 text-sm hover:border-accent">
          Risico&apos;s en bijwerkingen
        </Link>
      </div>

      <h2 className="mt-14 font-display text-2xl">Veelgestelde vragen</h2>
      <dl className="mt-6 max-w-3xl space-y-7">
        {VRAGEN.map((v) => (
          <div key={v.q}>
            <dt className="font-medium text-text">{v.q}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-text-muted">{v.a}</dd>
          </div>
        ))}
      </dl>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                headline: "Anabolen kopen: waar u op moet letten",
                description:
                  "Controlelijst voor wie anabolen wil kopen, opgesteld door een partij die ze niet verkoopt: analyseverslagen, gehalte, steriliteit, prijs, beloftes en bewaring.",
                inLanguage: "nl-NL",
                datePublished: "2026-10-01",
                dateModified: "2026-10-01",
                author: { "@type": "Organization", name: "Anabolendoktor" },
                publisher: { "@type": "Organization", name: "Anabolendoktor" },
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": "https://anabolendoktor.com/anabolen-kopen/waar-op-letten",
                },
              },
              {
                "@type": "FAQPage",
                mainEntity: VRAGEN.map((v) => ({
                  "@type": "Question",
                  name: v.q,
                  acceptedAnswer: { "@type": "Answer", text: v.a },
                })),
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://anabolendoktor.com/" },
                  { "@type": "ListItem", position: 2, name: "Anabolen kopen", item: "https://anabolendoktor.com/anabolen-kopen" },
                  { "@type": "ListItem", position: 3, name: "Waar u op moet letten" },
                ],
              },
            ],
          }),
        }}
      />

      <p className="mt-12 rounded-xl border border-paper-border bg-paper-soft p-5 text-sm text-text-muted">
        Deze pagina is voorlichting en geen medisch of juridisch advies, en geen
        aanmoediging om anabole steroiden te gebruiken of te kopen. Anabolendoktor verkoopt
        ze niet en schrijft niets voor. Bij klachten of twijfel is uw huisarts het juiste
        adres.
      </p>
    </div>
  );
}
