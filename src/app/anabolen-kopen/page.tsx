import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Scale, FlaskConical, CalendarClock, Receipt, Stethoscope } from "lucide-react";
import { FaqAccordion } from "@/components/faq-accordion";

/**
 * Hoofdpagina voor de zoekvraag "anabolen kopen".
 *
 * Bewust geen verkooppagina: deze shop verkoopt geen anabolen en kan dus ook
 * niet leveren waar een koper op dat moment naar zoekt. De invalshoek is de
 * enige die bij deze site past en die tegelijk iets toevoegt aan wat er al
 * over dit onderwerp staat: waarschuwen, uitleggen wat er in de praktijk
 * misgaat, en laten zien wat u zou moeten laten meten als u het toch doet.
 *
 * De praktische controlelijst staat op /anabolen-kopen/waar-op-letten. Die
 * twee pagina's mikken bewust op verschillende zoekvragen (de brede term
 * hier, "waar op letten" en "betrouwbaar" daar) zodat ze elkaar niet
 * verdringen in de zoekresultaten.
 */
export const revalidate = 3600;

const TOC = [
  { id: "wet", label: "Wat de wet in Nederland zegt" },
  { id: "inhoud", label: "Wat er in de praktijk in zit" },
  { id: "analyse", label: "Laboratoriumanalyses en hun grenzen" },
  { id: "leeftijd", label: "Waarom leeftijd zwaarder weegt dan dosering" },
  { id: "kosten", label: "De rekening die vrijwel niemand maakt" },
  { id: "toch", label: "Als u het toch doet" },
  { id: "meten", label: "Wat u laat meten, en wanneer" },
  { id: "arts", label: "Wanneer u een arts nodig heeft" },
  { id: "wij", label: "Waarom wij zelf niets verkopen" },
];

const MISGAAT = [
  {
    titel: "Een ander gehalte dan op het label",
    tekst:
      "Onderdosering is de meest gevonden afwijking: er zit minder in dan er staat. Overdosering komt ook voor en is gevaarlijker, omdat u dan ongemerkt een veelvoud gebruikt van wat u denkt te gebruiken. Beide zijn aan het flesje niet te zien, niet aan de kleur, niet aan de dikte van de olie en niet aan hoe het injecteert.",
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

const VRAGEN = [
  {
    q: "Is anabolen kopen in Nederland strafbaar?",
    a: "Bezit van een kleine hoeveelheid voor eigen gebruik wordt in Nederland niet vervolgd. Invoeren, verhandelen, afleveren en in voorraad hebben om te verkopen zijn wel verboden onder de Geneesmiddelenwet, en daar valt een pakket uit het buitenland in de praktijk vaak onder. De douane kan een zending onderscheppen en vernietigen. Wie bestelt neemt dus eerder een financieel en strafrechtelijk risico dan dat hij zeker weet dat hij zijn pakket ontvangt. Dit is algemene uitleg en geen juridisch advies.",
  },
  {
    q: "Verkoopt Anabolendoktor zelf anabolen?",
    a: "Nee, en dat verandert ook niet. Wij geven consulten, laten bloedwaarden meten en nemen die met u door. Wij schrijven niets voor en leveren niets. Dat betekent dat wij u op deze pagina niets hoeven aan te praten, en dat is precies waarom de informatie hier anders is dan op een pagina van een verkoper.",
  },
  {
    q: "Kunt u mij vertellen waar ik veilig kan kopen?",
    a: "Nee. Er is in Nederland geen legale verkoper van anabole steroiden voor spieropbouw, dus er bestaat ook geen adres dat wij als veilig kunnen aanwijzen. Iedere partij die zich zo presenteert, verkoopt buiten de wet om. Wat wij wel kunnen: uitleggen waar het bij de inhoud van zulke producten misgaat en wat u kunt laten meten om te weten wat het met u doet.",
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
];

export const metadata: Metadata = {
  title: "Anabolen kopen: wat u moet weten voordat u begint",
  description:
    "Wij verkopen geen anabolen en waarschuwen juist. Wat de wet zegt, wat er in de praktijk in die flesjes zit, wat een laboratoriumanalyse wel en niet aantoont, en wat u laat meten als u het toch doet.",
  alternates: { canonical: "/anabolen-kopen" },
};

export default function AnabolenKopenPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-6 text-xs text-text-muted">
        <Link href="/" className="hover:underline">Home</Link> / <span>Anabolen kopen</span>
      </div>

      <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent-soft/20 px-3 py-1 text-xs font-medium text-accent">
        <AlertTriangle className="h-3.5 w-3.5" />
        Wij verkopen geen anabolen
      </div>

      <h1 className="mt-5 font-display text-3xl md:text-4xl">Anabolen kopen</h1>

      <p className="mt-5 max-w-3xl leading-relaxed text-text-muted">
        Anabolendoktor heeft geen anabole steroiden op voorraad en verdient niets aan uw
        besluit. Dat is de reden dat deze pagina bestaat. Wie zoekt waar hij anabolen kan
        kopen, komt vrijwel altijd uit bij partijen die iets te verkopen hebben. Die
        vertellen u zelden wat er in de praktijk misgaat, wat het werkelijk kost en wat u
        vooraf zou moeten laten meten. Wij hebben dat belang niet, dus staat het hier wel.
      </p>

      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        Wij gaan u ook niet vertellen dat het allemaal meevalt, en wij gaan u niet met
        afschrikwekkende verhalen bestoken waarin u uzelf niet herkent. Wat hieronder staat
        is wat er bekend is: uit de medische literatuur, uit bloeduitslagen die wij dagelijks
        zien en uit wat laboratoria vinden als iemand zulke middelen laat onderzoeken. Een
        deel daarvan is ongemakkelijk om te lezen. Dat is geen toon die wij kiezen, het is
        de stand van zaken.
      </p>

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

      <h2 id="wet" className="mt-14 flex items-center gap-2 font-display text-2xl">
        <Scale className="h-5 w-5 text-accent" />
        Wat de wet in Nederland zegt
      </h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        Anabole steroiden zijn in Nederland geneesmiddelen. Dat plaatst ze niet onder de
        Opiumwet, zoals veel mensen denken, maar onder de Geneesmiddelenwet. Het verschil is
        belangrijk voor wat er met u kan gebeuren. Bezit van een kleine hoeveelheid voor
        eigen gebruik wordt niet vervolgd. Invoeren, verhandelen, afleveren en op voorraad
        hebben om te verkopen zijn verboden, ook zonder winstoogmerk en ook als u het voor
        een trainingspartner doet.
      </p>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        Voor wie bestelt zit de praktische kant bij de douane. Een zending uit het
        buitenland kan worden onderschept en vernietigd, en u ontvangt dan een brief in
        plaats van een pakket. Uw geld bent u kwijt, want u heeft gekocht bij een partij die
        u nergens op kunt aanspreken. In de meeste gevallen blijft het daarbij, maar het is
        wel het moment waarop uw naam bij een bestelling buiten de wet staat. Bij grotere
        hoeveelheden wordt de aanname dat het voor de handel is, en dan verandert de zaak
        van karakter.
      </p>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        Er bestaat dus geen legale verkoper van anabole steroiden voor spieropbouw in
        Nederland. Iedere aanbieder die zich als betrouwbaar adres presenteert, werkt buiten
        de wet om, hoe professioneel de website ook oogt. Wij kunnen u daarom ook geen veilig
        adres noemen: dat bestaat niet. Wat er over strafmaten, douanebrieven en de
        juridische details bekend is, hebben wij apart uitgewerkt in{" "}
        <Link href="/kennisbank/anabolen-kopen-strafbaar-nl" className="text-accent hover:underline">
          is anabolen kopen strafbaar in Nederland
        </Link>
        . Dit is algemene uitleg en geen juridisch advies.
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

      <h2 id="analyse" className="mt-14 font-display text-2xl">Laboratoriumanalyses en hun grenzen</h2>
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
        bewijs dat wat u gebruikt veilig is. De concrete punten waar u een rapport op kunt
        nalopen, staan op de{" "}
        <Link href="/anabolen-kopen/waar-op-letten" className="text-accent hover:underline">
          controlelijst waar u op moet letten
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
        onomwonden: niet beginnen. Dat is geen moreel standpunt, het is de afweging die uit de
        cijfers volgt.
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
        <li>De mogelijkheid dat een zending niet aankomt en u opnieuw betaalt.</li>
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

      <h2 id="wij" className="mt-14 font-display text-2xl">Waarom wij zelf niets verkopen</h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        Een partij die middelen verkoopt en tegelijk adviseert over de risico&apos;s, heeft
        een belang bij de uitkomst van dat advies. Daarom doen wij maar een van de twee. Wij
        leveren niets, schrijven niets voor en hebben geen omzet die afhangt van uw besluit om
        te gebruiken. Wat wij doen is bloedwaarden laten meten bij reguliere prikposten, de
        uitslag met u doornemen en eerlijk zeggen wat wij zien, ook als dat ongelegen komt.
      </p>
      <p className="mt-4 max-w-3xl leading-relaxed text-text-muted">
        Wij weigeren niemand omdat hij gebruikt en wij houden geen moreel betoog. Wie
        besluit te gebruiken, is daar zelf verantwoordelijk voor. Onze rol is ervoor zorgen
        dat dat besluit op basis van cijfers wordt genomen in plaats van op basis van wat een
        verkoper beweert.
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
                headline: "Anabolen kopen: wat u moet weten voordat u begint",
                description:
                  "Voorlichting zonder verkoopbelang over het kopen van anabole steroiden in Nederland: de wet, wat er in de praktijk in zit, de grenzen van laboratoriumanalyses, leeftijd, kosten en wat u laat meten.",
                inLanguage: "nl-NL",
                datePublished: "2026-10-01",
                dateModified: "2026-10-01",
                author: { "@type": "Organization", name: "Anabolendoktor" },
                publisher: { "@type": "Organization", name: "Anabolendoktor" },
                mainEntityOfPage: { "@type": "WebPage", "@id": "https://anabolendoktor.com/anabolen-kopen" },
              },
              {
                "@type": "FAQPage",
                mainEntity: VRAGEN.map((v) => ({
                  "@type": "Question",
                  name: v.q,
                  acceptedAnswer: { "@type": "Answer", text: v.a },
                })),
              },
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
