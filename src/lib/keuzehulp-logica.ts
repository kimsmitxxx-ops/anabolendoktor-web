/**
 * De logica achter de keuzehulp, los van de weergave zodat de redenering te
 * lezen en te controleren is zonder door JSX te hoeven.
 *
 * Belangrijk: hier rolt nooit een kuurschema of dosering uit. Wat er uitkomt is
 * een concept-advies over de volgorde van stappen, dat pas iets waard is nadat
 * het in een consult is besproken. Die volgorde is bewust ingebouwd in de
 * uitkomsten zelf en niet alleen in een zin eronder.
 */

export type AntwoordSleutel = "doel" | "ervaring" | "trainingsjaren" | "leeftijd" | "bloedwaarden" | "gezondheid";
export type Antwoorden = Partial<Record<AntwoordSleutel, string>>;

export interface Stap {
  sleutel: AntwoordSleutel;
  vraag: string;
  toelichting?: string;
  opties: { value: string; label: string; sub?: string }[];
}

export const STAPPEN: Stap[] = [
  {
    sleutel: "doel",
    vraag: "Wat wilt u met dit traject bereiken?",
    toelichting: "Kies wat op dit moment het zwaarst weegt. U kunt later altijd een ander onderwerp aankaarten.",
    opties: [
      { value: "spiermassa", label: "Meer spiermassa", sub: "Groeien in omvang en gewicht" },
      { value: "kracht", label: "Meer kracht", sub: "Zwaarder tillen bij gelijk gewicht" },
      { value: "droger", label: "Droger worden", sub: "Vetpercentage omlaag, spier behouden" },
      { value: "herstel", label: "Herstellen na gebruik", sub: "Eigen aanmaak weer op gang" },
      { value: "stoppen", label: "Stoppen met gebruik", sub: "Afbouwen en eruit komen" },
      { value: "kinderwens", label: "Kinderwens", sub: "Vruchtbaarheid herstellen of behouden" },
      { value: "gezondheid", label: "Weten hoe ik ervoor sta", sub: "Waarden laten meten en duiden" },
      { value: "twijfel", label: "Twijfel over beginnen", sub: "Objectief afwegen of het verstandig is" },
    ],
  },
  {
    sleutel: "ervaring",
    vraag: "Wat is uw ervaring met prestatieverhogende middelen?",
    toelichting: "Dit blijft tussen u en de consulent. Zonder een eerlijk antwoord is het advies waardeloos.",
    opties: [
      { value: "nooit", label: "Nooit gebruikt", sub: "En op dit moment geen plan" },
      { value: "overweegt", label: "Overweeg het", sub: "Nog niets gebruikt" },
      { value: "een-kuur", label: "Eén kuur gedaan", sub: "Inmiddels gestopt" },
      { value: "meerdere", label: "Meerdere kuren", sub: "Met pauzes ertussen" },
      { value: "nu", label: "Gebruik op dit moment", sub: "Of ben net gestopt" },
      { value: "langdurig", label: "Langdurig, vrijwel doorlopend", sub: "Jaren, weinig of geen pauzes" },
    ],
  },
  {
    sleutel: "trainingsjaren",
    vraag: "Hoe lang traint u serieus met gewichten?",
    toelichting: "Serieus betekent: een vast schema, minimaal twee keer per week, zonder maandenlange onderbrekingen.",
    opties: [
      { value: "<1", label: "Korter dan een jaar" },
      { value: "1-3", label: "1 tot 3 jaar" },
      { value: "3-5", label: "3 tot 5 jaar" },
      { value: "5+", label: "Langer dan 5 jaar" },
    ],
  },
  {
    sleutel: "leeftijd",
    vraag: "In welke leeftijdsgroep valt u?",
    toelichting: "Leeftijd verandert zowel het risico als de snelheid waarmee uw eigen aanmaak terugkomt.",
    opties: [
      { value: "<21", label: "Jonger dan 21" },
      { value: "21-25", label: "21 tot 25" },
      { value: "26-35", label: "26 tot 35" },
      { value: "36-45", label: "36 tot 45" },
      { value: "45+", label: "Ouder dan 45" },
    ],
  },
  {
    sleutel: "bloedwaarden",
    vraag: "Wanneer heeft u voor het laatst bloed laten prikken?",
    toelichting: "Hiermee bedoelen wij een uitslag die u zelf heeft ingezien, niet alleen de mededeling dat het goed was.",
    opties: [
      { value: "nooit", label: "Nooit", sub: "Of ik weet het niet" },
      { value: "oud", label: "Langer dan een jaar geleden" },
      { value: "recent-goed", label: "Recent, alles binnen de referentie" },
      { value: "recent-afwijkend", label: "Recent, met afwijkende waarden" },
    ],
  },
  {
    sleutel: "gezondheid",
    vraag: "Speelt een van deze punten bij u?",
    toelichting: "Kies het punt dat het zwaarst weegt. Zijn er meerdere, noteer die dan bij uw aanvraag.",
    opties: [
      { value: "geen", label: "Geen van deze" },
      { value: "bloeddruk", label: "Verhoogde bloeddruk" },
      { value: "cholesterol", label: "Ongunstig cholesterol" },
      { value: "hart-familie", label: "Hart- en vaatziekten in de familie" },
      { value: "stemming", label: "Stemming of slaap uit balans" },
      { value: "medicatie", label: "Ik gebruik medicatie" },
    ],
  },
];

export interface Uitkomst {
  kop: string;
  samenvatting: string;
  stappen: { titel: string; tekst: string; href?: string; hrefLabel?: string }[];
  waarschuwing?: string;
  consult: { titel: string; href: string };
}

const CONSULT = {
  intake: { titel: "Intakeconsult", href: "/product/consult/intakeconsult" },
  bloed: { titel: "Consult bloedwaarden", href: "/product/consult/consult-bloedwaarden" },
  herstel: { titel: "Consult herstel na een kuur", href: "/product/consult/consult-herstel-na-cycle" },
  natural: { titel: "Consult natural opbouw", href: "/product/consult/consult-natural-opbouw" },
};

const METEN = {
  titel: "Laat eerst uw uitgangswaarden meten",
  tekst:
    "Zonder metingen is elk advies een aanname. Het basispakket dekt bloedbeeld, lever, nieren, lipiden, glucose en uw testosteronwaarde. Prik in de ochtend, nuchter, minimaal 48 uur na uw laatste zware training.",
  href: "/product/bloedwerk/bloedonderzoek-basis",
  hrefLabel: "Bloedonderzoek basis",
};

const METEN_UITGEBREID = {
  titel: "Meet ook LH, FSH en oestradiol",
  tekst:
    "Aan uw testosteronwaarde alleen ziet u niet of uw eigen aansturing werkt. Daarvoor heeft u LH en FSH nodig, en oestradiol om de verhouding te kunnen beoordelen.",
  href: "/product/bloedwerk/bloedonderzoek-uitgebreid",
  hrefLabel: "Bloedonderzoek uitgebreid",
};

/**
 * Bepaalt het concept-advies. De volgorde van de regels is de rangorde: het
 * eerste blok dat past, wint. Leeftijd en trainingsjaren staan bovenaan omdat
 * die twee elk ander advies overrulen.
 */
export function bepaalAdvies(a: Antwoorden): Uitkomst {
  const { doel, ervaring, trainingsjaren, leeftijd, bloedwaarden, gezondheid } = a;
  const gebruiktNu = ervaring === "nu" || ervaring === "langdurig";
  const heeftGebruikt = gebruiktNu || ervaring === "een-kuur" || ervaring === "meerdere";
  const metenStap = bloedwaarden === "nooit" || bloedwaarden === "oud" ? [METEN] : [];

  // 1. Te jong. Dit weegt zwaarder dan elk doel.
  if (leeftijd === "<21" && !heeftGebruikt) {
    return {
      kop: "Op uw leeftijd is beginnen de slechtste keuze die u kunt maken",
      samenvatting:
        "Uw eigen hormoonhuishouding is nog volop in ontwikkeling. Ingrijpen voor uw eenentwintigste geeft de grootste kans op blijvende onderdrukking van de eigen aanmaak, en juist in deze jaren valt er zonder middelen nog het meest te winnen.",
      stappen: [
        {
          titel: "Benut eerst de jaren waarin u het snelst groeit",
          tekst:
            "De eerste twee tot drie jaar serieuze training leveren meer op dan welke periode daarna ook. Die winst is er maar één keer, en middelen halen hem niet in.",
          href: "/advies/eerste-kuur-overwegen",
          hrefLabel: "Waarom wachten iets oplevert",
        },
        {
          titel: "Laat uw opbouw doorlichten",
          tekst:
            "Loopt u vast, dan zit dat vrijwel altijd in trainingsvolume, eiwitinname of slaap. Dat is in één gesprek na te lopen.",
          href: CONSULT.natural.href,
          hrefLabel: CONSULT.natural.titel,
        },
      ],
      waarschuwing:
        "Gebruikt u al iets, geef dat dan aan bij uw aanvraag. Dan is het gesprek een ander gesprek en gaat het over afbouwen en meten, niet over wachten.",
      consult: CONSULT.natural,
    };
  }

  // 2. Stoppen of kinderwens: die twee routes lopen anders dan de rest.
  if (doel === "stoppen" || doel === "herstel" || (heeftGebruikt && doel === "kinderwens")) {
    const kinderwens = doel === "kinderwens";
    return {
      kop: kinderwens
        ? "Kinderwens na gebruik loopt via andere waarden dan u waarschijnlijk denkt"
        : "Herstel is te volgen, en dat is precies wat het meestal niet wordt",
      samenvatting: kinderwens
        ? "Vruchtbaarheid herstelt via een andere route en op een ander tempo dan uw testosteronwaarde. Een normale testosteronwaarde zegt weinig over uw zaadproductie; daarvoor kijkt u naar FSH, LH en een semenanalyse."
        : "Na het stoppen ligt de eigen aanmaak stil en moet die weer op gang komen. Hoe lang dat duurt verschilt sterk, en zonder metingen is niet vast te stellen of het de goede kant op gaat.",
      stappen: [
        METEN_UITGEBREID,
        {
          titel: kinderwens ? "Vraag via uw huisarts een semenanalyse aan" : "Bepaal de meetmomenten vooraf",
          tekst: kinderwens
            ? "Bloedwaarden alleen zijn niet genoeg. Een semenanalyse loopt via uw huisarts of een fertiliteitspoli en is de enige manier om te zien wat uw zaadproductie doet."
            : "Meten om de drie maanden zegt meer dan één uitslag. Zonder vaste momenten trekt vrijwel iedereen te vroeg conclusies, in beide richtingen.",
          href: kinderwens ? "/advies/anabolen-en-vruchtbaarheid" : "/advies/herstel-na-een-kuur",
          hrefLabel: kinderwens ? "Anabolen en vruchtbaarheid" : "Herstel na een kuur",
        },
        {
          titel: "Bespreek de uitslagen voordat u iets onderneemt",
          tekst:
            "Middelen die bij herstel worden ingezet zijn receptplichtig en horen bij een arts thuis. In het consult nemen wij door wat uw waarden laten zien en wat een verstandige volgorde is.",
          href: CONSULT.herstel.href,
          hrefLabel: CONSULT.herstel.titel,
        },
      ],
      waarschuwing:
        "Houden somberheid, extreme vermoeidheid of aanhoudende sombere gedachten aan, wacht dan geen meetmoment af en neem contact op met uw huisarts.",
      consult: CONSULT.herstel,
    };
  }

  // 3. Gebruikt nu, met een reden tot zorg.
  if (gebruiktNu) {
    const zorg = bloedwaarden === "recent-afwijkend" || ["bloeddruk", "cholesterol", "hart-familie"].includes(gezondheid || "");
    return {
      kop: zorg
        ? "Er is een concreet aanknopingspunt, en dat vraagt om meten voordat er iets bijkomt"
        : "Gebruik zonder metingen is de meest voorkomende vermijdbare fout",
      samenvatting: zorg
        ? "U gebruikt op dit moment en er ligt al een signaal: een afwijkende waarde of een risico in uw voorgeschiedenis. Dat is geen reden tot paniek, wel de reden om nu te meten in plaats van over een half jaar."
        : "Er is geen manier om aan uw gevoel af te lezen wat uw hematocriet, uw HDL of uw leverwaarden doen. Juist die drie bewegen het eerst, en juist die drie voelt u niet.",
      stappen: [
        bloedwaarden === "recent-afwijkend" ? METEN_UITGEBREID : METEN,
        {
          titel: "Laat de uitslagen uitleggen",
          tekst:
            "Referentiewaarden zijn gebaseerd op de brede bevolking. Bij zwaar trainen en bij gebruik betekent binnen de referentie niet automatisch goed, en net erbuiten niet automatisch fout.",
          href: CONSULT.bloed.href,
          hrefLabel: CONSULT.bloed.titel,
        },
        {
          titel: "Weet welke signalen niet kunnen wachten",
          tekst:
            "Pijn op de borst, kortademigheid bij lichte inspanning, ernstige hoofdpijn, geel worden en aanhoudende sombere gedachten zijn geen dingen om uit te zitten.",
          href: "/advies/gevaren-van-anabolen",
          hrefLabel: "Gevaren van anabolen",
        },
      ],
      waarschuwing:
        "Wij verstrekken geen doseringsadvies en geen schema's. Wat wij doen is uw risico's in kaart brengen en u vertellen wanneer iets bij een arts hoort.",
      consult: CONSULT.bloed,
    };
  }

  // 4. Overweegt te beginnen, of twijfelt.
  if (doel === "twijfel" || ervaring === "overweegt") {
    const weinigJaren = trainingsjaren === "<1" || trainingsjaren === "1-3";
    return {
      kop: weinigJaren
        ? "Er staat nog te veel op tafel om nu al naar middelen te kijken"
        : "De afweging is reëel, en die maakt u beter met cijfers dan met gevoel",
      samenvatting: weinigJaren
        ? "Met minder dan drie jaar serieuze training zit u nog in de periode waarin het meeste vanzelf komt. Een kuur versnelt dat, maar u ruilt er een blijvende ingreep in uw hormoonhuishouding voor in, terwijl de winst er ook zonder was gekomen."
        : "U traint lang genoeg om te merken dat het langzamer gaat. Dat is een reëel punt en het verdient een eerlijk antwoord in plaats van een verkooppraatje. Wat een kuur oplevert, wat het kost en wat het van u vraagt aan controle, is vooraf redelijk in te schatten.",
      stappen: [
        {
          titel: "Lees eerst wat de afweging werkelijk inhoudt",
          tekst:
            "Wat levert het op, wat is er blijvend, wat komt er terug na het stoppen, en hoe groot is de kans dat de eigen aanmaak niet volledig herstelt.",
          href: "/advies/eerste-kuur-overwegen",
          hrefLabel: "Een eerste kuur overwegen",
        },
        METEN,
        {
          titel: "Haal er eerst het gemakkelijke uit",
          tekst:
            "Trainingsvolume, eiwitinname over de hele week, slaapduur en herstel bepalen samen het grootste deel van uw resultaat. In één gesprek is te zien of daar nog winst ligt.",
          href: CONSULT.natural.href,
          hrefLabel: CONSULT.natural.titel,
        },
      ],
      waarschuwing:
        "Komt uit het gesprek dat begeleiding onder medisch toezicht voor u aan de orde is, dan bespreken wij welke route daarvoor bestaat en verwijzen wij u door. Dat besluit valt in het consult, niet in deze keuzehulp.",
      consult: CONSULT.intake,
    };
  }

  // 5. Alles wat overblijft: natural doel, of eerder gebruikt maar nu gestopt.
  const eerderGebruikt = ervaring === "een-kuur" || ervaring === "meerdere";
  return {
    kop: eerderGebruikt
      ? "U bent gestopt, en dan is de vraag vooral wat er is blijven staan"
      : "Uw doel is haalbaar zonder middelen, mits de basis klopt",
    samenvatting: eerderGebruikt
      ? "Na eerder gebruik is het zinvol om vast te stellen waar u nu staat: welke waarden zijn teruggekeerd, welke niet, en wat betekent dat voor de komende jaren."
      : `Uw doel is ${doel === "kracht" ? "meer kracht" : doel === "droger" ? "een lager vetpercentage met behoud van spier" : doel === "gezondheid" ? "inzicht in uw waarden" : "meer spiermassa"}. Dat is met training, voeding en herstel te bereiken, en het knelpunt zit in de praktijk zelden waar mensen het zoeken.`,
    stappen: [
      ...(metenStap.length ? metenStap : [METEN]),
      {
        titel: eerderGebruikt ? "Beoordeel of uw eigen aanmaak volledig terug is" : "Loop uw opbouw langs op de vier punten die tellen",
        tekst: eerderGebruikt
          ? "Een testosteronwaarde binnen de referentie zegt niet alles: de verhouding met SHBG, LH en FSH bepaalt of het herstel werkelijk compleet is."
          : "Progressie in belasting, eiwitinname op drukke dagen, slaapduur en het aantal keren dat u van programma wisselt. Bij bijna iedereen zit het in een van die vier.",
        href: eerderGebruikt ? METEN_UITGEBREID.href : CONSULT.natural.href,
        hrefLabel: eerderGebruikt ? METEN_UITGEBREID.hrefLabel : CONSULT.natural.titel,
      },
      {
        titel: "Kies een pakket bij uw doel, geen losse potten",
        tekst:
          "De pakketten bevatten de supplementen die voor uw doel werkelijk iets doen, plus een schema op uw intake en een consult. Losse supplementen zonder plan is de omgekeerde volgorde.",
        href: "/winkel/pakketten",
        hrefLabel: "Bekijk de pakketten",
      },
    ],
    consult: eerderGebruikt ? CONSULT.bloed : CONSULT.natural,
  };
}

/** Korte, leesbare samenvatting van de antwoorden, mee te sturen met de aanvraag. */
export function vatAntwoordenSamen(a: Antwoorden): string {
  return STAPPEN
    .map((s) => {
      const gekozen = s.opties.find((o) => o.value === a[s.sleutel]);
      return gekozen ? `${s.vraag} ${gekozen.label}` : null;
    })
    .filter(Boolean)
    .join("\n");
}
