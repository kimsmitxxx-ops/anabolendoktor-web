import type { Metadata } from "next";
import { PakkettenBlok } from "@/components/pakketten-blok";
import Link from "next/link";
import {
  Scale,
  FlaskConical,
  CalendarClock,
  Receipt,
  Stethoscope,
  Package,
  ClipboardCheck,
  Mail,
} from "lucide-react";
import { FaqAccordion } from "@/components/faq-accordion";
import { KortAntwoord } from "@/components/kort-antwoord";
import { alternatesNL } from "@/lib/geo-nl";

/**
 * Hoofdpagina voor de zoekvraag "anabolen kopen".
 *
 * Deze pagina haalde 1246 van de 1554 vertoningen van de hele site en stond
 * toch op positie 80: de pagina weigerde de zoekvraag. Het eerste zichtbare
 * element was een badge "Wij verkopen geen anabolen" en de description opende
 * met dezelfde afwijzing. Wie zoekt waar hij anabolen kan kopen, leest dan in
 * de zoekresultaten dat hij hier niet hoeft te zijn.
 *
 * De opzet is nu omgedraaid: eerst de koopvraag beantwoorden (welke route
 * legaal bestaat, wat er gebeurt als u online bestelt, wat een prijs zegt, en
 * hoe u controleert wat u in handen heeft), daarna de risico's, en pas in een
 * eigen sectie onderaan dat wij zelf niets verkopen. Dat laatste blijft er
 * staan, want het is waar; het is alleen geen openingszin meer.
 *
 * Bewust ook een contactsectie: de eigenaar wil juist in gesprek komen met
 * mensen die met deze vraag zoeken. Reactietijd overal 48 uur, zoals op de
 * rest van de site; nooit een snellere belofte.
 *
 * De praktische controlelijst staat op /anabolen-kopen/waar-op-letten. Die
 * twee pagina's mikken bewust op verschillende zoekvragen (de brede term
 * hier, "waar op letten" en "betrouwbaar" daar) zodat ze elkaar niet
 * verdringen in de zoekresultaten.
 */
export const revalidate = 3600;

const TOC = [
  { id: "legaal", label: "Kunt u anabolen legaal kopen in Nederland" },
  { id: "online", label: "Online bestellen, invoer en de douane" },
  { id: "prijs", label: "Wat een prijs wel en niet zegt" },
  { id: "inhoud", label: "Wat er in de praktijk in zit" },
  { id: "analyse", label: "Labrapporten en hun grenzen" },
  { id: "controle", label: "Hoe u controleert wat u in handen heeft" },
  { id: "leeftijd", label: "Waarom leeftijd zwaarder weegt dan dosering" },
  { id: "kosten", label: "De rekening die vrijwel niemand maakt" },
  { id: "toch", label: "Als u het toch doet" },
  { id: "meten", label: "Wat u laat meten, en wanneer" },
  { id: "arts", label: "Wanneer u een arts nodig heeft" },
  { id: "hulp", label: "Gratis informatie en begeleiding" },
  { id: "wij", label: "Waarom wij geen anabolen verkopen" },
];

/** De legale route, stap voor stap. Geen omweg en geen verkoopverhaal. */
const LEGALE_ROUTE = [
  {
    stap: "1",
    titel: "U gaat met uw klachten naar de huisarts",
    tekst:
      "Vermoeidheid die niet weggaat, een libido dat is weggezakt, slecht slapen of weinig kunnen opbrengen zijn klachten waarmee u bij de huisarts terechtkunt. U hoeft daarvoor niets te verzwijgen en ook niets te overdrijven. Heeft u eerder anabolen gebruikt, vertel dat dan; zonder die informatie leest een arts uw uitslagen verkeerd.",
  },
  {
    stap: "2",
    titel: "Er wordt bloed geprikt, meestal meer dan een keer",
    tekst:
      "Een tekort wordt niet op een enkel getal vastgesteld. Een arts kijkt naar uw klachten in combinatie met herhaalde metingen, en naar meer dan alleen testosteron: ook de hormonen die de aansturing laten zien. Wijst dat beeld op een probleem, dan kan uw huisarts u doorverwijzen naar een internist of endocrinoloog.",
  },
  {
    stap: "3",
    titel: "Bij een vastgesteld tekort kan een arts voorschrijven",
    tekst:
      "Is er een tekort vastgesteld, dan kan een arts testosteron voorschrijven en haalt u het bij de apotheek. Dat is een behandeling van een tekort en geen kuur: de dosering is erop gericht uw waarden normaal te krijgen, niet om er bovenuit te gaan, en u blijft onder controle. Vaak is dat een langdurig traject.",
  },
  {
    stap: "4",
    titel: "Is er geen tekort, dan is er ook geen recept",
    tekst:
      "Geen arts schrijft anabolen voor om sneller spiermassa op te bouwen. Dat is geen onwil van die arts, het is het kader waarbinnen hij mag werken. Dat kader is precies de reden dat de rest van deze pagina bestaat: wie het zonder recept doet, moet zelf regelen wat een arts anders had geregeld.",
  },
];

const MISGAAT = [
  {
    titel: "Een ander gehalte dan op het label",
    tekst:
      "Onderdosering is een veelvoorkomende afwijking: er zit minder in dan er staat. Overdosering komt ook voor en is gevaarlijker, omdat u dan ongemerkt een veelvoud gebruikt van wat u denkt te gebruiken. Beide zijn aan het flesje niet te zien, niet aan de kleur, niet aan de dikte van de olie en niet aan hoe het injecteert.",
  },
  {
    titel: "Een andere stof dan besteld",
    tekst:
      "Vervanging door een goedkoper middel met een vergelijkbaar uiterlijk is gangbaar. Dat is niet alleen bedrog: de bijwerkingen en de hersteltijd verschillen sterk per stof, en een nakuur die bij de ene stof past, past niet bij de andere. U behandelt dan iets anders dan u denkt.",
  },
  {
    titel: "Verontreiniging en niet-steriele productie",
    tekst:
      "Bij middelen die u injecteert is steriliteit het risico dat het snelst acuut wordt. Abcessen, bloedvergiftiging en ontstekingen die operatief open moeten, komen in Nederlandse ziekenhuizen voorbij. Dit is ook het punt waar de meeste verkopers niets over kunnen zeggen, want zij zien hun eigen productie niet.",
  },
  {
    titel: "Een tussenhandel die niets weet",
    tekst:
      "Veel aanbieders zijn doorverkopers die zelf ook niet weten wie er geproduceerd heeft. De informatie die u krijgt is dan doorgegeven, niet vastgesteld. Dat verklaart waarom garanties zo stellig klinken en zo weinig waard zijn.",
  },
];

/** Wat u aan een rapport en een etiket zelf kunt nalopen. */
const CONTROLEPUNTEN = [
  {
    titel: "De batchcode op het etiket en in het rapport",
    tekst:
      "Een labrapport hoort te verwijzen naar een partij met een code, en die code hoort leesbaar op het etiket te staan. Staan er twee verschillende codes, of staat er op het flesje geen code, dan gaat het rapport niet over wat u in handen heeft. Een etiket dat scheef zit, loslaat of met een sticker is overgeplakt, is in dit opzicht hetzelfde signaal.",
  },
  {
    titel: "Datum, laboratorium en monsternummer",
    tekst:
      "Een bruikbaar rapport noemt de datum van analyse, de naam van het laboratorium en een nummer waaronder het monster daar is binnengekomen. Ontbreekt een van die drie, dan is het document niet na te lopen. Een afbeelding zonder die gegevens is geen rapport, hoe officieel het ook is opgemaakt.",
  },
  {
    titel: "Waar een COA over gaat",
    tekst:
      "COA staat voor Certificate of Analysis: een verklaring over een monster dat is opgestuurd. Wie dat monster opstuurt, kiest zelf welk flesje dat is. Een COA zegt dus iets over die ene inzending op die ene datum, niet over de hele voorraad en niet automatisch over uw flesje.",
  },
  {
    titel: "Waar niet op is getest",
    tekst:
      "Een analyse op stof en gehalte zegt niets over steriliteit, resten van oplosmiddelen of zware metalen. Daar moet apart op zijn getest en dat gebeurt zelden. Vraag ernaar, en lees het antwoord als informatie over de verkoper: wie hier stellig ja zegt zonder iets te kunnen laten zien, raadt.",
  },
  {
    titel: "Wat u zelf niet kunt vaststellen",
    tekst:
      "Thuis kunt u aan het middel niets meten. Er bestaat geen kleur, geur of injectiegevoel waaruit iets op te maken valt, en er is geen testje waarmee u gehalte of steriliteit bepaalt. Wat u wel kunt meten, is wat het met u doet: dat is bloedonderzoek, en dat is iets anders dan een rapport over een flesje.",
  },
];

const VRAGEN = [
  {
    q: "Waar kunt u anabolen legaal kopen in Nederland?",
    a: "Alleen bij een apotheek, op recept van een arts. Anabole steroiden zijn in Nederland geneesmiddelen die uitsluitend op recept worden afgeleverd, dus er is geen legale winkel en geen legale webshop voor spieropbouw. Een arts schrijft ze voor bij een vastgesteld tekort, niet om sneller spiermassa op te bouwen. Daarbuiten bestaat er geen legale route, en iedere aanbieder die zich als veilig adres presenteert, werkt buiten de wet om.",
  },
  {
    q: "Kunt u anabolen online bestellen en wat gebeurt er dan?",
    a: "Er zijn websites die het aanbieden, maar u bestelt dan bij een partij buiten de wet en u heeft geen van de bescherming die u bij een gewone webwinkel wel heeft. Komt het pakket uit het buitenland, dan kan de douane het onderscheppen en vernietigen; u ontvangt dan een brief in plaats van uw bestelling, en uw geld bent u kwijt. Terugbetaling kunt u nergens opeisen, want er is geen partij die u kunt aanspreken.",
  },
  {
    q: "Is anabolen kopen in Nederland strafbaar?",
    a: "Bezit van een kleine hoeveelheid voor eigen gebruik wordt in Nederland niet vervolgd. Invoeren, verhandelen, afleveren en in voorraad hebben om te verkopen zijn wel verboden onder de Geneesmiddelenwet, en daar valt een pakket uit het buitenland in de praktijk vaak onder. De douane kan een zending onderscheppen en vernietigen. Wie bestelt neemt dus eerder een financieel en strafrechtelijk risico dan dat hij zeker weet dat hij zijn pakket ontvangt. Dit is algemene uitleg en geen juridisch advies.",
  },
  {
    q: "Wat is de prijs van anabolen?",
    a: "Wij noemen geen prijzen van illegale aanbieders, om twee redenen. De eerste is dat zulke bedragen per aanbieder en per maand verschillen en dat elk getal dat wij hier zouden neerzetten verzonnen nauwkeurigheid is. De tweede is dat de prijs niets zegt over de inhoud: u kunt niet aan een bedrag zien of er in zit wat op het label staat. Wat u wel kunt uitrekenen, zijn de kosten die erbij horen, zoals bloedonderzoek vooraf, tijdens en na, en middelen voor het herstel. Die staan verderop op deze pagina met bedragen erbij.",
  },
  {
    q: "Hoe controleert u of iets echt is?",
    a: "Niet aan het flesje. Wat u wel kunt nalopen is of de batchcode op het etiket overeenkomt met de code in het labrapport, of dat rapport een datum, een laboratoriumnaam en een monsternummer heeft, en of er ook op steriliteit en verontreiniging is getest, wat zelden het geval is. En u kunt laten meten wat het middel met u doet: in bloed is zichtbaar wat op papier niet te controleren valt.",
  },
  {
    q: "Verkoopt Anabolendoktor zelf anabolen?",
    a: "Nee, en dat verandert ook niet. Wij geven consulten, laten bloedwaarden meten en nemen die met u door. Wij schrijven niets voor en leveren niets. Dat betekent dat wij u op deze pagina niets hoeven aan te praten, en dat is precies waarom de informatie hier anders is dan op een pagina van een verkoper.",
  },
  {
    q: "Kunt u mij vertellen waar ik veilig kan kopen?",
    a: "Buiten de apotheek met een recept: nee. Er is in Nederland geen legale verkoper van anabole steroiden voor spieropbouw, dus er bestaat ook geen adres dat wij als veilig kunnen aanwijzen. Wat wij wel kunnen: uitleggen waar het bij de inhoud van zulke producten misgaat, hoe u een rapport naloopt en wat u kunt laten meten om te weten wat het met u doet.",
  },
  {
    q: "Ik ben twintig. Maakt dat echt verschil?",
    a: "Ja, en dat is het belangrijkste wat op deze pagina staat. Tot ongeveer het vijfentwintigste jaar is de hormoonas nog in ontwikkeling. Onderdrukking op die leeftijd herstelt vaker onvolledig, en dat is een gevolg waar u daarna tientallen jaren mee verder leeft. Als u onder de eenentwintig bent, is het eerlijke advies: niet beginnen. Niet omdat het nu moet van ons, maar omdat de kans op blijvende schade in deze groep het grootst is en de winst het kleinst, omdat u natuurlijk nog groeit.",
  },
  {
    q: "Wat kost het als ik het goed wil doen?",
    a: "Reken naast de middelen op bloedonderzoek vooraf, minstens een meting tijdens en een meting enkele maanden na het staken, plus middelen voor het herstel en mogelijk behandeling van bijwerkingen. Bij ons kost een basis bloedonderzoek 125 euro, een uitgebreid onderzoek 195 euro en een herhaalmeting 95 euro. Veel mensen rekenen alleen de ampullen en komen daardoor bedrogen uit, niet in geld maar in wat ze onbedoeld overslaan.",
  },
  {
    q: "Kan ik bij u bloedwaarden laten meten zonder dat u mij afraadt te gebruiken?",
    a: "Ja. Wij kiezen niet voor u en wij weigeren niemand omdat hij gebruikt. Wij zeggen wel wat wij in de uitslag zien, ook als dat ongelegen komt. Een consulent die u alleen vertelt wat u wilt horen, heeft geen nut.",
  },
  {
    q: "Mijn bloedwaarden zijn goed. Betekent dat dat ik veilig bezig ben?",
    a: "Het betekent dat er op het moment van prikken geen afwijking zichtbaar was in wat er gemeten is. Dat is iets anders dan veilig. Een deel van de schade bouwt langzaam op en is pas na jaren meetbaar, en een deel is in bloed helemaal niet te zien. Goede waarden zijn goed nieuws, geen vrijbrief.",
  },
  {
    q: "Wat als ik al gebruik en nu klachten heb?",
    a: "Dan hangt het af van de klacht. Pijn op de borst, kortademigheid bij lichte inspanning, geel worden van huid of oogwit, een zwelling in een been of sombere gedachten die niet wijken, horen vandaag bij een huisarts of de huisartsenpost. Wij zijn geen spoedvoorziening. Bij klachten die minder acuut zijn, zoals slecht slapen, vermoeidheid of een dalend libido, is bloedonderzoek de logische eerste stap.",
  },
  {
    q: "Wat kost het om u een vraag te stellen?",
    a: "Niets. Een vraag stellen via het contactformulier is gratis en u krijgt binnen 48 uur antwoord. Wij wijzen u de weg, leggen uit wat er in uw situatie speelt en zeggen het ook als u bij ons niets hoeft te kopen. Een consult en bloedonderzoek zijn betaalde diensten, maar informatie vooraf rekenen wij niet af.",
  },
];

export const metadata: Metadata = {
  // Oude titel en description openden met de afwijzing ("Wij verkopen geen
  // anabolen en waarschuwen juist"). Dat is waar, maar als eerste regel in de
  // zoekresultaten stuurt het precies de bezoeker weg die hier iets aan heeft.
  title: "Anabolen kopen in Nederland: de legale route en de risico's",
  description:
    "Anabolen kopen in Nederland: legaal loopt het alleen via een arts en de apotheek. Wat er gebeurt als u online bestelt, wat een prijs wel en niet zegt, en hoe u controleert wat u in handen heeft.",
  alternates: alternatesNL("/anabolen-kopen"),
};

export default function AnabolenKopenPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-6 text-xs text-text-muted">
        <Link href="/" className="hover:underline">Home</Link> / <span>Anabolen kopen</span>
      </div>

      <h1 className="font-display text-3xl md:text-4xl">Anabolen kopen</h1>

      {/* Het antwoord op de zoekvraag staat boven de vouw. Hier stond eerder
          een badge met "Wij verkopen geen anabolen" als eerste element. */}
      <KortAntwoord>
        In Nederland kunt u anabolen alleen legaal kopen bij een apotheek, op recept van een arts,
        en een arts schrijft ze voor bij een vastgesteld tekort en niet voor spieropbouw. Er is
        dus geen legale winkel en geen legale webshop. Wie online bestelt, koopt bij een partij
        buiten de wet, loopt het risico dat de douane de zending onderschept en kan niet
        controleren wat er in het flesje zit. Hieronder staat welke route wel bestaat, wat er
        gebeurt als u het buiten die route om doet, en wat u kunt laten meten.
      </KortAntwoord>

      <p className="mt-6 max-w-3xl leading-relaxed text-text-muted">
        Wie zoekt waar hij anabolen kan kopen, komt vrijwel altijd uit bij partijen die iets te
        verkopen hebben. Die vertellen zelden wat er in de praktijk misgaat, wat het werkelijk
        kost en wat u vooraf zou moeten laten meten. Wij hebben dat belang niet, dus staat het
        hier wel. Wij gaan u ook niet vertellen dat het allemaal meevalt, en wij gaan u niet met
        afschrikwekkende verhalen bestoken waarin u uzelf niet herkent. Wat hieronder staat is de
        stand van zaken: wat de wet regelt, wat laboratoria vinden als iemand zulke middelen laat
        onderzoeken, en wat wij zien in bloeduitslagen van mensen die gebruiken.
      </p>

      {/* Compacte contactknop hoog op de pagina. De volledige contactsectie
          staat lager bij #hulp; deze is er voor wie meteen iets wil vragen. */}
      <div className="mt-8 flex flex-col gap-3 rounded-xl border border-accent/40 bg-accent-soft/15 p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-sm leading-relaxed text-text-muted">
          <strong className="font-medium text-text">Heeft u een vraag over uw eigen situatie?</strong>{" "}
          Stel hem. Informatie en een eerste wegwijzer kosten niets en u krijgt binnen 48 uur
          antwoord van een mens.
        </p>
        <Link
          href="/contact"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent-soft"
        >
          <Mail className="h-4 w-4" /> Stel uw vraag
        </Link>
      </div>

      <nav aria-label="Op deze pagina" className="mt-10 rounded-xl border border-paper-border bg-paper-soft p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Op deze pagina</p>
        <ol className="mt-3 space-y-1.5 text-sm">
          {TOC.map((t, i) => (
            <li key={t.id}>
              <a href={`#${t.id}`} className="text-text hover:text-accent hover:underline">
                {i + 1}. {t.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <h2 id="legaal" className="mt-14 flex items-center gap-2 font-display text-2xl">
        <Scale className="h-5 w-5 text-accent" />
        Kunt u anabolen legaal kopen in Nederland
      </h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        Ja, maar niet in een winkel en niet voor spieropbouw. Anabole steroiden zijn in Nederland
        geneesmiddelen. Dat plaatst ze niet onder de Opiumwet, zoals veel mensen denken, maar
        onder de Geneesmiddelenwet, en die bepaalt dat ze uitsluitend op recept worden
        afgeleverd. Er is daarmee precies een legale route: een arts schrijft voor en een
        apotheek levert. Wat er buiten die route wordt aangeboden, hoe professioneel de website
        ook oogt, valt daarbuiten.
      </p>

      <div className="mt-8 space-y-4">
        {LEGALE_ROUTE.map((s) => (
          <div key={s.stap} className="flex gap-4 rounded-xl border border-paper-border bg-paper-soft p-5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 font-display text-sm text-accent">
              {s.stap}
            </span>
            <div>
              <h3 className="font-display text-lg">{s.titel}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{s.tekst}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 max-w-3xl leading-relaxed text-text-muted">
        Een belangrijke uitzondering is de groep die al gebruikt heeft. Blijft uw eigen aanmaak
        na het staken weg, dan is dat geen wens maar een klacht, en daarmee hoort u bij een arts.
        Wat daarbij komt kijken staat in{" "}
        <Link href="/advies/herstel-na-een-kuur" className="text-accent hover:underline">
          herstel na een kuur
        </Link>
        {" "}en in{" "}
        <Link href="/kennisbank/herstelt-testosteron-altijd-na-anabolengebruik" className="text-accent hover:underline">
          herstelt testosteron altijd na anabolengebruik
        </Link>
        . Dit is algemene uitleg en geen medisch of juridisch advies.
      </p>

      <h2 id="online" className="mt-14 flex items-center gap-2 font-display text-2xl">
        <Package className="h-5 w-5 text-accent" />
        Online bestellen, invoer en de douane
      </h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        Er zijn websites die anabolen aanbieden alsof het een gewone webwinkel is, met een
        winkelwagen, een bestelknop en een verzendbelofte. Wat daar ontbreekt is alles wat een
        gewone webwinkel juridisch aan u verplicht is. U heeft geen herroepingsrecht, geen
        garantie, geen klachtenregeling en geen partij die u kunt aanspreken als er niets of iets
        anders aankomt. Dat is geen slechte service, dat is het gevolg van bestellen buiten de
        wet: een handel die niet mag bestaan, kan zich ook niet aan regels houden die ervan
        uitgaan dat ze bestaat.
      </p>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        Bij een zending uit het buitenland komt de douane in beeld. Invoeren is verboden, en een
        pakket kan worden onderschept en vernietigd. U ontvangt dan een brief in plaats van een
        bestelling, en uw geld bent u kwijt. In de meeste gevallen blijft het daarbij, maar het is
        wel het moment waarop uw naam aan een bestelling buiten de wet hangt. Bij grotere
        hoeveelheden wordt de aanname dat het voor de handel is, en dan verandert de zaak van
        karakter. Bezit van een kleine hoeveelheid voor eigen gebruik wordt in Nederland niet
        vervolgd; invoeren, verhandelen, afleveren en op voorraad hebben om te verkopen zijn wel
        verboden, ook zonder winstoogmerk en ook als u het voor een trainingspartner doet.
      </p>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        Daar komt het betalen bij. Wordt u gevraagd te betalen op een manier waarop u het bedrag
        niet kunt terughalen, dan staat u na het overmaken met lege handen als er niets komt. Dat
        risico is bij deze aanbieders de regel en niet de uitzondering, en het is de meest
        voorkomende manier waarop iemand hier geld verliest: niet aan een slecht product, maar aan
        een bestelling die nooit aankomt. Wat er over strafmaten, douanebrieven en de juridische
        details bekend is, hebben wij apart uitgewerkt in{" "}
        <Link href="/kennisbank/anabolen-kopen-strafbaar-nl" className="text-accent hover:underline">
          is anabolen kopen strafbaar in Nederland
        </Link>
        .
      </p>

      <h2 id="prijs" className="mt-14 flex items-center gap-2 font-display text-2xl">
        <Receipt className="h-5 w-5 text-accent" />
        Wat een prijs wel en niet zegt
      </h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        Wij noemen hier geen prijzen van illegale aanbieders. Niet uit terughoudendheid, maar
        omdat elk bedrag dat wij zouden neerzetten verzonnen nauwkeurigheid is: zulke prijzen
        verschillen per aanbieder en per maand, en wij kunnen ze niet nagaan. Wat wij wel kunnen
        uitleggen is wat een prijs over de inhoud zegt, en dat is minder dan u zou hopen.
      </p>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        Een lage prijs is geen bewijs van slechte kwaliteit en een hoge prijs is geen bewijs van
        goede. Omdat onderdosering een veelvoorkomende afwijking is, kunt u aan een bedrag per
        flesje zelfs niet aflezen hoeveel u werkelijk koopt: twee flesjes met hetzelfde getal op
        het label kunnen een heel verschillende inhoud hebben. De enige prijs die iets betekent,
        is de prijs per werkzame hoeveelheid die aantoonbaar in het flesje zat, en dat is precies
        wat u bij een onbekende aanbieder niet weet. Een prijs die ver onder alles ligt wat u
        elders ziet, is daarom eerder een vraag dan een koopje: iemand bespaart ergens, en de
        plekken om op te besparen zijn het gehalte en de productie.
      </p>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        De prijs van de legale route is makkelijker na te gaan. Een huisartsbezoek en het
        bloedonderzoek dat daarbij hoort vallen onder de reguliere zorg; wat u daar zelf aan
        betaalt, hangt af van uw verzekering en kunt u bij uw verzekeraar navragen. Wat een traject
        bij ons kost, staat verderop bij{" "}
        <a href="#kosten" className="text-accent hover:underline">de rekening die vrijwel niemand maakt</a>
        , met bedragen erbij.
      </p>

      <h2 id="inhoud" className="mt-14 flex items-center gap-2 font-display text-2xl">
        <FlaskConical className="h-5 w-5 text-accent" />
        Wat er in de praktijk in zit
      </h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        De vraag die kopers bezighoudt is of een middel echt is. Dat is de verkeerde vraag,
        want hij valt in vier losse vragen uiteen: zit de stof erin die er hoort te zitten,
        zit er evenveel in als op het label staat, zit er niets in dat er niet hoort, en is
        het steriel gemaakt. Een aanbieder die zegt dat zijn product echt is, antwoordt
        doorgaans alleen op de eerste.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {MISGAAT.map((m) => (
          <div key={m.titel} className="rounded-xl border border-paper-border bg-paper-soft p-6">
            <h3 className="font-display text-lg">{m.titel}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{m.tekst}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 max-w-3xl leading-relaxed text-text-muted">
        Wat deze vier gemeen hebben, is dat u ze zelf niet kunt vaststellen. Er is geen
        kleur, geur of injectiegevoel waaruit u iets kunt opmaken. Dat maakt de gebruikelijke
        manieren om vertrouwen te krijgen, zoals ervaringen van anderen in een groep of een
        aanbieder die al jaren meegaat, minder waard dan ze lijken: de vorige partij kan
        prima zijn geweest en de volgende niet, en dat merkt u pas als het misgaat.
      </p>

      <h2 id="analyse" className="mt-14 font-display text-2xl">Labrapporten en hun grenzen</h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        Een laboratoriumanalyse van een middel kan twee dingen behoorlijk betrouwbaar
        vaststellen: welke stof er in het onderzochte monster zat en hoeveel. Dat is echte
        informatie en meer dan een belofte op een website. Maar de grenzen van zo een rapport
        zijn groter dan de meeste mensen aannemen, en juist daar wordt met uw vertrouwen
        gespeeld.
      </p>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        Een analyse gaat over het monster dat is ingestuurd, niet over het flesje dat bij u
        op tafel staat. Wie het monster instuurt, kiest zelf welk flesje dat is. Een rapport
        zegt daarnaast niets over steriliteit of over resten van oplosmiddelen en zware
        metalen, tenzij daar apart op is getest, en dat gebeurt zelden. En een rapport
        verjaart: productie van een half jaar later is een andere productie. Een
        analyseverslag zonder datum, zonder naam van het laboratorium en zonder nummer dat
        terug te leiden is naar het flesje in uw hand, is daarmee niet meer dan een
        afbeelding.
      </p>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        Het nuttige gebruik van zulke analyses ligt dan ook ergens anders dan verkopers
        suggereren. Ze zijn bruikbaar om te ontdekken dat iets niet klopt, bijvoorbeeld dat
        er een heel andere stof in zit of veel meer dan verwacht. Ze zijn niet bruikbaar als
        bewijs dat wat u gebruikt veilig is.
      </p>

      <h2 id="controle" className="mt-14 flex items-center gap-2 font-display text-2xl">
        <ClipboardCheck className="h-5 w-5 text-accent" />
        Hoe u controleert wat u in handen heeft
      </h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        Stel dat er al iets op uw tafel staat. Dan is de vraag niet meer of u het moet kopen,
        maar wat u er nog over kunt vaststellen. Dat is minder dan u wilt en meer dan niets. De
        vijf punten hieronder kunt u zelf nalopen, zonder apparatuur en zonder iemand te
        vertrouwen op zijn woord.
      </p>

      <div className="mt-8 space-y-4">
        {CONTROLEPUNTEN.map((c) => (
          <div key={c.titel} className="rounded-xl border border-paper-border bg-paper-soft p-5">
            <h3 className="font-display text-lg">{c.titel}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{c.tekst}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 max-w-3xl leading-relaxed text-text-muted">
        De punten waar u een aanbieder en zijn rapport verder op kunt nalopen, van de prijs tot
        de manier van betalen, staan uitgewerkt op de{" "}
        <Link href="/anabolen-kopen/waar-op-letten" className="text-accent hover:underline">
          controlelijst waar u op moet letten
        </Link>
        . Hoe bloedonderzoek bij ons verloopt, staat bij{" "}
        <Link href="/lab" className="text-accent hover:underline">
          hoe het bloedonderzoek werkt
        </Link>
        .
      </p>

      <h2 id="leeftijd" className="mt-14 flex items-center gap-2 font-display text-2xl">
        <CalendarClock className="h-5 w-5 text-accent" />
        Waarom leeftijd zwaarder weegt dan dosering
      </h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        In gesprekken gaat het bijna altijd over hoeveel iemand neemt. Over leeftijd gaat het
        zelden, terwijl dat de factor is die het meeste verschil maakt voor wat u eraan
        overhoudt. Tot ongeveer het vijfentwintigste levensjaar is de as tussen hersenen en
        testes nog in ontwikkeling. Onderdrukking in die periode herstelt vaker onvolledig,
        en dat gevolg draagt u daarna tientallen jaren met u mee: een lagere eigen aanmaak,
        verminderde vruchtbaarheid, en in sommige gevallen levenslange afhankelijkheid van
        vervangende hormonen.
      </p>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        Daar komt bij dat de opbrengst in deze groep het kleinst is. Wie onder de vijfentwintig
        is, groeit nog op eigen kracht, en een flink deel van wat in het eerste jaar wordt
        toegeschreven aan een kuur was ook zonder die kuur gekomen. U betaalt dus de hoogste
        prijs voor de kleinste winst. Als u onder de eenentwintig bent, is ons advies
        onomwonden: niet beginnen. Dat is geen moreel standpunt, het is de afweging die uit het
        verschil tussen risico en opbrengst volgt.
      </p>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        Boven de veertig kantelt het beeld. De hormoonas is dan niet meer het grootste
        probleem, maar het hart en de bloedvaten worden dat wel. Een bloeddruk die al aan de
        hoge kant is, hart- en vaatziekten in de familie of een hematocriet die vanzelf al
        oploopt, wegen dan zwaarder dan bij een gebruiker van dertig. In beide gevallen
        verandert leeftijd niet welke risico&apos;s er zijn, wel hoe zwaar ze wegen en wat u
        dus zou moeten laten controleren.
      </p>

      <h2 id="kosten" className="mt-14 flex items-center gap-2 font-display text-2xl">
        <Receipt className="h-5 w-5 text-accent" />
        De rekening die vrijwel niemand maakt
      </h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        Vrijwel iedereen die begint, rekent de middelen. Bijna niemand rekent de rest. Dat is
        de reden dat mensen halverwege keuzes maken die ze niet willen maken: niet omdat ze
        onverstandig zijn, maar omdat het geld voor het bloedonderzoek en het herstel al aan
        de ampullen is opgegaan.
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-text-muted">
        <li>Bloedonderzoek vooraf, zodat u weet wat uw eigen uitgangswaarden zijn. Zonder nulmeting is een latere uitslag nauwelijks te plaatsen.</li>
        <li>Minstens een meting tijdens, op het moment dat de belasting het hoogst is.</li>
        <li>Een meting enkele maanden na het staken, om te zien of de eigen aanmaak terugkomt.</li>
        <li>Middelen voor het herstel na het staken, en de kennis om ze op het juiste moment in te zetten.</li>
        <li>Behandeling van bijwerkingen die kunnen optreden, van acne tot een te hoge bloeddruk.</li>
        <li>De mogelijkheid dat een bestelling niet aankomt en u opnieuw betaalt.</li>
      </ul>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        Bij ons kost een basis bloedonderzoek 125 euro, een uitgebreid onderzoek 195 euro en
        een herhaalmeting 95 euro. Een consult van vijfenveertig minuten waarin wij een
        uitslag met u doornemen kost 50 euro. Wij noemen die bedragen hier niet om u iets te
        verkopen, maar omdat u zonder bedragen geen rekening kunt maken. Reken ze mee voordat
        u begint, niet daarna.
      </p>

      <h2 id="toch" className="mt-14 font-display text-2xl">Als u het toch doet</h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        Een deel van de mensen die dit leest, gebruikt al of gaat het doen. Daar helpt afraden
        niet meer. Wat dan wel helpt, is de schade zo klein mogelijk houden. De punten
        hieronder zijn geen aanmoediging en geen schema. Het is het minimum aan zorgvuldigheid
        waar wij in consulten telkens op terugkomen.
      </p>
      <ul className="mt-4 list-disc space-y-2.5 pl-6 text-text-muted">
        <li>
          <strong className="font-medium text-text">Een middel, niet vijf.</strong> Hoe meer
          stoffen tegelijk, hoe minder u kunt herleiden waar een klacht of een afwijkende
          waarde vandaan komt. Combineren maakt alles tegelijk onzichtbaar.
        </li>
        <li>
          <strong className="font-medium text-text">De laagst werkzame dosering.</strong> De
          relatie tussen dosering en bijwerkingen loopt steiler op dan die tussen dosering en
          resultaat. Verdubbelen levert zelden het dubbele op, maar wel meer dan het dubbele
          aan risico.
        </li>
        <li>
          <strong className="font-medium text-text">Kort, met echte pauzes.</strong> Doorgaand
          gebruik zonder onderbreking is wat de kans op blijvende onderdrukking het sterkst
          vergroot.
        </li>
        <li>
          <strong className="font-medium text-text">Meet uw bloeddruk thuis.</strong> Een
          meter kost ongeveer dertig euro en vangt het risico dat zich het snelst opbouwt en
          het makkelijkst gemist wordt. Meet wekelijks en schrijf het op.
        </li>
        <li>
          <strong className="font-medium text-text">Injecteer hygienisch.</strong> Nieuwe
          naald per injectie, nooit delen, huid en stop desinfecteren, en wisselen van plaats.
          Een abces is de complicatie die het vaakst in een ziekenhuis eindigt.
        </li>
        <li>
          <strong className="font-medium text-text">Houd een logboek bij.</strong> Datum,
          middel, dosering, klachten, bloeddruk. Een uitslag is veel beter te interpreteren
          als er een tijdlijn bij hoort.
        </li>
        <li>
          <strong className="font-medium text-text">Weet wanneer u stopt.</strong> Spreek met
          uzelf af bij welke uitslag of welke klacht u ophoudt, voordat u begint. Dat besluit
          nemen terwijl u midden in een kuur zit, lukt vrijwel niemand.
        </li>
      </ul>

      <h2 id="meten" className="mt-14 font-display text-2xl">Wat u laat meten, en wanneer</h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        Als u een ding uit deze pagina meeneemt, laat het dit zijn: de belangrijkste
        veranderingen geven geen klachten. Een dalend HDL, een oplopend hematocriet en een
        stijgende bloeddruk voelt u niet. Ze zijn alleen zichtbaar in bloed, en op het moment
        dat u er wel iets van merkt, is er meestal al schade. Zich goed voelen is daarom geen
        aanwijzing dat het goed gaat.
      </p>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        Een zinnige meetreeks bestaat uit drie momenten. Vooraf een nulmeting, zodat u weet
        wat voor u normaal is. Tijdens, rond het moment van de hoogste belasting, met in elk
        geval een volledig bloedbeeld, lever- en nierwaarden, een lipidenprofiel en de
        hormoonwaarden. En enkele maanden na het staken, om te zien of de eigen aanmaak
        werkelijk terugkomt in plaats van aan te nemen dat het goed zit. Welke waarden dat
        precies zijn en wat de getallen betekenen, hebben wij uitgewerkt bij{" "}
        <Link href="/advies/bloedwaarden-na-een-kuur" className="text-accent hover:underline">
          bloedwaarden na een kuur
        </Link>
        {" "}en in het artikel over{" "}
        <Link href="/kennisbank/anabolen-bloedwaarden-checken" className="text-accent hover:underline">
          bloedwaarden checken
        </Link>
        .
      </p>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        Een uitslag zonder uitleg heeft weinig waarde. Losse getallen buiten hun
        referentiewaarden zeggen bij iemand die zwaar traint iets anders dan bij iemand die
        dat niet doet, en het patroon van meerdere waarden samen zegt meer dan elk getal
        apart. Dat doornemen is precies wat een consult bij ons is.
      </p>

      <h2 id="arts" className="mt-14 flex items-center gap-2 font-display text-2xl">
        <Stethoscope className="h-5 w-5 text-accent" />
        Wanneer u een arts nodig heeft
      </h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        Bij de volgende klachten gaat u vandaag naar uw huisarts of de huisartsenpost, en
        niet eerst naar ons. Wij zijn geen spoedvoorziening en stellen geen diagnoses.
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-text-muted">
        <li>Pijn op de borst, kortademigheid bij lichte inspanning of hartkloppingen die aanhouden</li>
        <li>Geel worden van de huid of het oogwit, of donkere urine</li>
        <li>Aanhoudende hoofdpijn bij een gemeten bloeddruk boven 160/100</li>
        <li>Zwelling of pijn in een enkel been of kuit, wat op trombose kan wijzen</li>
        <li>Sombere gedachten die langer dan twee weken aanhouden, zeker na het staken</li>
        <li>Een warme, pijnlijke zwelling op een injectieplaats, met of zonder koorts</li>
      </ul>

      {/* De eigenaar wil juist in contact komen met wie met deze vraag zoekt.
          Reactietijd 48 uur, gelijk aan contact- en chatpagina; nooit sneller. */}
      <h2 id="hulp" className="mt-14 flex items-center gap-2 font-display text-2xl">
        <Mail className="h-5 w-5 text-accent" />
        Gratis informatie en begeleiding
      </h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        Deze pagina is algemeen en uw situatie is dat niet. Heeft u een vraag over wat u van
        plan bent, over iets wat u al gebruikt, over een uitslag die u niet begrijpt of over
        een rapport dat u van een aanbieder kreeg: stel hem. Daar hoeft u niets voor af te
        nemen en het kost u niets. Wij lezen mee, leggen uit wat er in uw geval speelt en
        wijzen u de weg, ook als die weg naar uw huisarts loopt of als het antwoord is dat u
        bij ons niets nodig heeft.
      </p>
      <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-6 text-text-muted">
        <li>Een vraag stellen is gratis, zonder account en zonder dat u een bestelling plaatst.</li>
        <li>U krijgt binnen 48 uur antwoord van een mens, niet van een automatisch bericht.</li>
        <li>Wij oordelen niet. Of u gebruikt, overweegt of net gestopt bent, maakt voor het antwoord geen verschil.</li>
        <li>Uw bericht blijft tussen ons. Wij delen uw gegevens met niemand.</li>
        <li>Wij stellen geen diagnoses en schrijven niets voor. Bij medische spoed belt u uw huisarts of de huisartsenpost.</li>
      </ul>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent-soft"
        >
          <Mail className="h-4 w-4" /> Stel uw vraag
        </Link>
        <Link href="/keuzehulp" className="inline-flex rounded-full border border-paper-border px-5 py-3 text-sm hover:border-accent">
          Doe de keuzehulp
        </Link>
      </div>

      <h2 id="wij" className="mt-14 font-display text-2xl">Waarom wij geen anabolen verkopen</h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        Eerlijk is eerlijk: u kunt bij ons geen anabolen kopen. Wij hebben ze niet op voorraad
        en gaan ze ook niet verkopen. Een partij die middelen verkoopt en tegelijk adviseert
        over de risico&apos;s, heeft een belang bij de uitkomst van dat advies. Daarom doen wij
        maar een van de twee. Onze omzet hangt niet af van uw besluit om te gebruiken, en dat is
        de reden dat op deze pagina staat wat er staat.
      </p>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        Wat wij wel doen: bloedwaarden laten meten bij reguliere prikposten, de uitslag met u
        doornemen, en pakketten leveren met supplementen, een schema en een consult voor wie
        hetzelfde doel langs de legale weg wil halen. Wij weigeren niemand omdat hij gebruikt en
        wij houden geen moreel betoog. Wie besluit te gebruiken, is daar zelf verantwoordelijk
        voor. Onze rol is ervoor zorgen dat dat besluit op basis van cijfers wordt genomen in
        plaats van op basis van wat een verkoper beweert.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/winkel/bloedwerk" className="inline-flex rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent-soft">
          Bloedonderzoek bekijken
        </Link>
        <Link href="/consult" className="inline-flex rounded-full border border-paper-border px-5 py-3 text-sm hover:border-accent">
          Hoe een consult verloopt
        </Link>
        <Link href="/anabolen-kopen/waar-op-letten" className="inline-flex rounded-full border border-paper-border px-5 py-3 text-sm hover:border-accent">
          Waar u op moet letten
        </Link>
      </div>

      {/* Deze pagina haalt meer vertoningen dan de rest van de site bij elkaar
          en linkte nergens naar het aanbod. */}
      <PakkettenBlok />

      <h2 className="mt-14 font-display text-2xl">Veelgestelde vragen</h2>
      {/* Uitklapbaar, zodat de lijst te overzien blijft. De antwoorden staan
          ook in de HTML als een vraag dichtgeklapt is, dus zoekmachines en
          taalmodellen lezen ze gewoon mee. */}
      <FaqAccordion items={VRAGEN.map((v) => ({ question: v.q, answer: v.a }))} className="mt-6 max-w-3xl" />

      <h2 className="mt-14 font-display text-2xl">Verder lezen</h2>
      <ul className="mt-4 space-y-2 text-text-muted">
        <li>
          <Link href="/anabolen-kopen/waar-op-letten" className="text-accent hover:underline">Waar u op moet letten</Link>
          : de controlelijst punt voor punt.
        </li>
        <li>
          <Link href="/risicos-en-bijwerkingen" className="text-accent hover:underline">Risico&apos;s en bijwerkingen</Link>
          : wat er per orgaan bekend is.
        </li>
        <li>
          <Link href="/advies/eerste-kuur-overwegen" className="text-accent hover:underline">Een eerste kuur overwegen</Link>
          : de afweging voordat u iets besluit.
        </li>
        <li>
          <Link href="/advies/stoppen-met-anabolen" className="text-accent hover:underline">Stoppen met anabolen</Link>
          : hoe u dat aanpakt en wat u kunt verwachten.
        </li>
        <li>
          <Link href="/kennisbank/legale-alternatieven-anabolen" className="text-accent hover:underline">Legale alternatieven</Link>
          : wat er wel mag en wat dat realistisch oplevert.
        </li>
      </ul>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                headline: "Anabolen kopen in Nederland: de legale route en de risico's",
                description:
                  "Hoe anabolen kopen in Nederland juridisch werkt: alleen op recept via een arts en de apotheek. Wat er gebeurt bij online bestellen en invoer, wat een prijs zegt, hoe u een labrapport en batchcode naloopt, en wat u laat meten.",
                inLanguage: "nl-NL",
                datePublished: "2026-10-01",
                dateModified: "2026-11-17",
                author: { "@type": "Organization", name: "Anabolendoktor" },
                publisher: { "@type": "Organization", name: "Anabolendoktor" },
                mainEntityOfPage: { "@type": "WebPage", "@id": "https://anabolendoktor.com/anabolen-kopen" },
              }
            ],
          }),
        }}
      />

      <p className="mt-12 rounded-xl border border-paper-border bg-paper-soft p-5 text-sm text-text-muted">
        Deze pagina is voorlichting en geen medisch advies, en evenmin juridisch advies. Er
        ontstaat geen behandelrelatie door het lezen ervan. Anabolendoktor verkoopt geen
        anabole steroiden, stelt geen diagnoses en schrijft niets voor. Bij klachten of
        twijfel is uw huisarts het juiste adres.
      </p>
    </div>
  );
}
