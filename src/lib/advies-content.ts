/**
 * Adviespagina's: landingspagina's op zoekwoorden waar deze dienst het
 * natuurlijke antwoord op is.
 *
 * Bewust hier en niet als blog: dit zijn stabiele pagina's die niet verouderen
 * en die het aanbod dragen. Blogs zijn actualiteit, dit is de kern.
 *
 * Alle tekst is voor deze site geschreven in de u-vorm. Geen zin komt overeen
 * met anabolenpro; dat is geen stijlkwestie maar noodzaak, want twee sites van
 * dezelfde eigenaar met overlappende teksten lezen als een netwerk.
 */

export type AdviesBlok = { h: string; p: string[] };

export type Advies = {
  slug: string;
  /** Wat mensen intypen. Vormt de h1 en de titel. */
  titel: string;
  metaTitle: string;
  metaDescription: string;
  /** Korte introductie onder de h1. */
  intro: string;
  blokken: AdviesBlok[];
  /** Losse feiten of signalen, als opsomming. */
  lijstTitel?: string;
  lijst?: string[];
  /** Naar welk product deze pagina logisch doorverwijst. */
  cta: { tekst: string; href: string };
};

export const ADVIES: Advies[] = [
  {
    slug: "stoppen-met-anabolen",
    titel: "Stoppen met anabolen",
    metaTitle: "Stoppen met anabolen: wat er gebeurt en hoe u het aanpakt",
    metaDescription:
      "Wat er in uw lichaam gebeurt als u stopt met anabolen, hoe lang herstel duurt, welke klachten normaal zijn en wanneer u een arts moet raadplegen.",
    intro:
      "Stoppen is zelden een kwestie van simpelweg ophouden. Uw lichaam heeft maandenlang testosteron van buitenaf gekregen en de eigen aanmaak grotendeels stilgelegd. Die weer op gang krijgen kost tijd, en in die periode voelt u zich doorgaans slechter dan tijdens het gebruik. Dat is de fase waarin de meeste mensen terugvallen.",
    blokken: [
      {
        h: "Wat er gebeurt zodra u stopt",
        p: [
          "Toediening van androgenen van buitenaf onderdrukt de hypothalamus-hypofyse-gonade-as: het signaal dat uw testes aanzet tot productie valt stil. Stopt u, dan is er een periode waarin het middel is uitgewerkt maar de eigen productie nog niet op gang is. In die tussenperiode is uw testosteron lager dan het ooit natuurlijk was.",
          "Dat verklaart de klachten die vrijwel iedereen in deze fase meldt: weinig energie, somberheid, verminderd libido, slecht slapen en snel kracht- en spiermassaverlies. Het zijn geen tekenen dat er iets misgaat; het zijn tekenen dat u in het dal zit.",
        ],
      },
      {
        h: "Hoe lang het duurt",
        p: [
          "Bij de meeste mensen herstelt de as, maar de termijn loopt sterk uiteen. Wie kort en laag gedoseerd heeft gebruikt is er vaak binnen enkele maanden. Na jarenlang of hooggedoseerd gebruik kan het een jaar of langer duren, en bij een klein deel komt de eigen productie niet volledig terug.",
          "Vooraf is niet te voorspellen in welke groep u valt. Wat wel kan is het volgen: door op vaste momenten te meten ziet u of de waarden de goede kant op bewegen. Die richting zegt meer dan een enkele meting.",
        ],
      },
      {
        h: "Waarom meten hier het verschil maakt",
        p: [
          "Zonder metingen weet u niet of u herstelt of dat u vastzit. Dat onderscheid is belangrijk, want in het eerste geval is geduld het antwoord en in het tweede geval hoort u bij een arts. Veel mensen hervatten het gebruik omdat ze zich beroerd voelen, zonder ooit gekeken te hebben of het herstel al onderweg was.",
          "Wij adviseren een uitgangsmeting kort na het staken en vervolgmetingen na ongeveer drie en zes maanden. Daarbij kijken wij naar LH, FSH, totaal en vrij testosteron, SHBG en oestradiol, plus lever, nieren en het lipidenprofiel.",
        ],
      },
      {
        h: "Wat wij hierin wel en niet doen",
        p: [
          "Wij leveren geen medicatie en schrijven niets voor. Wat wij doen is uw waarden lezen, uitleggen wat er staat en met u een meetschema afspreken zodat u niet in het ongewisse zit. Blijkt uit de metingen dat het herstel uitblijft, dan is dat precies de onderbouwing waarmee u bij uw huisarts terechtkunt.",
        ],
      },
    ],
    lijstTitel: "Wanneer u niet moet wachten maar een arts moet bellen",
    lijst: [
      "Sombere stemming die langer dan twee weken aanhoudt of gedachten aan zelfdoding",
      "Pijn op de borst of kortademigheid bij lichte inspanning",
      "Aanhoudend braken, geel worden van de huid of het oogwit",
      "Een bloeddruk die herhaald boven 160/100 uitkomt",
    ],
    cta: { tekst: "Consult herstel na cycle", href: "/winkel/consult" },
  },
  {
    slug: "gevaren-van-anabolen",
    titel: "De gevaren van anabolen",
    metaTitle: "Gevaren van anabolen: wat de literatuur laat zien",
    metaDescription:
      "Welke risico's anabole steroiden met zich meebrengen voor hart, lever, hormoonhuishouding en psyche, en welke daarvan in bloedonderzoek zichtbaar worden.",
    intro:
      "Over de gevaren van anabolen wordt zelden neutraal gesproken. Verkopers bagatelliseren ze, voorlichtingscampagnes overdrijven ze, en wie het echt wil weten belandt op een forum. Wij verkopen niets, dus hieronder staat wat er in de literatuur bekend is, inclusief de nuance dat lang niet elk risico iedereen treft.",
    blokken: [
      {
        h: "Hart en bloedvaten: het best gedocumenteerd",
        p: [
          "De duidelijkste en meest reproduceerbare bevinding is de verschuiving in het lipidenprofiel. Het HDL daalt vaak fors, het LDL stijgt. Daarnaast komen een verhoogde hematocriet, hogere bloeddruk en op termijn verdikking van de linkerhartkamer voor.",
          "Wat dit bijzonder maakt: het is meetbaar voordat u er iets van merkt. Een verstoord lipidenprofiel geeft geen klachten, maar is wel het mechanisme waarlangs het risico op termijn oploopt.",
        ],
      },
      {
        h: "Lever: vooral bij orale middelen",
        p: [
          "Orale middelen met een 17-alfa-alkylgroep belasten de lever aantoonbaar meer dan geinjecteerde varianten. Dat uit zich in verhoogde leverenzymen en soms in stuwing van gal.",
          "Interpretatie vraagt hier voorzichtigheid: zware training verhoogt sommige leverwaarden ook. Daarom kijkt men naar het patroon van meerdere waarden samen in plaats van naar een enkel verhoogd getal.",
        ],
      },
      {
        h: "Hormoonhuishouding en vruchtbaarheid",
        p: [
          "De eigen aanmaak wordt onderdrukt zolang u gebruikt. Bij de meeste mensen herstelt die na het staken, maar niet bij iedereen en niet altijd volledig. Verminderde vruchtbaarheid tijdens en na gebruik is goed beschreven en is voor veel mensen het argument dat uiteindelijk telt.",
        ],
      },
      {
        h: "Psychisch, en waarom dat wordt onderschat",
        p: [
          "Stemmingswisselingen en prikkelbaarheid tijdens gebruik worden vaak gemeld. De kwetsbaarste periode ligt echter na het staken: het tijdelijk lage testosteron gaat bij een deel van de mensen gepaard met een echte depressieve episode.",
          "Dat is ook precies waarom mensen opnieuw beginnen. Niet omdat ze meer spiermassa willen, maar omdat ze zich beter voelden.",
        ],
      },
    ],
    lijstTitel: "Wat hiervan zichtbaar wordt in bloedonderzoek",
    lijst: [
      "Lipidenprofiel: HDL, LDL en triglyceriden",
      "Hematocriet en hemoglobine, als maat voor de dikte van het bloed",
      "Leverenzymen ALAT, ASAT en gamma-GT",
      "Hormonaal: LH, FSH, totaal en vrij testosteron, oestradiol en SHBG",
      "Nierfunctie via kreatinine en eGFR",
    ],
    cta: { tekst: "Bloedonderzoek bekijken", href: "/winkel/bloedwerk" },
  },
  {
    slug: "bloedwaarden-na-een-kuur",
    titel: "Bloedwaarden na een kuur",
    metaTitle: "Bloedwaarden na een kuur: wat u laat prikken en wanneer",
    metaDescription:
      "Welke bloedwaarden zinvol zijn na een kuur met anabolen, op welke momenten u laat prikken en hoe u de uitslag leest.",
    intro:
      "Een uitslagformulier is zonder context een rij getallen met referentiewaarden ernaast. Of een waarde in uw situatie zorgelijk is, hangt af van wat u heeft gebruikt, hoe lang geleden u bent gestopt en hoe de overige waarden erbij staan.",
    blokken: [
      {
        h: "Wanneer u laat prikken",
        p: [
          "Direct na het staken heeft weinig zin: het middel is dan nog aantoonbaar en de as heeft nog geen kans gehad. Een uitgangsmeting vier tot zes weken na de laatste toediening geeft een bruikbaar startpunt, met vervolgmetingen na ongeveer drie en zes maanden.",
          "Prik nuchter en in de ochtend. Testosteron kent een dagritme en een middagmeting is niet vergelijkbaar met een ochtendmeting. Consistentie in het meetmoment is belangrijker dan het exacte tijdstip.",
        ],
      },
      {
        h: "Welke waarden ertoe doen",
        p: [
          "Voor het herstel van de as: LH en FSH als aansturende hormonen, plus totaal en vrij testosteron, SHBG en oestradiol. Stijgt LH terwijl testosteron nog laag is, dan is de aansturing terug maar de productie nog niet; dat is een ander beeld dan wanneer beide laag blijven.",
          "Daarnaast lever, nieren, volledig bloedbeeld en het lipidenprofiel, omdat dat de waarden zijn waarop gebruik de meeste sporen achterlaat.",
        ],
      },
      {
        h: "Waarom losse getallen misleiden",
        p: [
          "Een testosteronwaarde binnen de referentie zegt weinig als LH tegelijk onderdrukt is. Een licht verhoogd ALAT betekent iets anders bij iemand die drie dagen eerder zwaar heeft getraind dan bij iemand die dat niet deed. De samenhang tussen waarden is waar de informatie zit, en dat is precies wat een uitslagformulier niet geeft.",
        ],
      },
    ],
    lijstTitel: "Praktische punten voor de prikafspraak",
    lijst: [
      "Nuchter, in de ochtend, en houd dat moment bij vervolgmetingen aan",
      "Geen zware training in de 48 uur ervoor, dat vertekent leverwaarden",
      "Vermeld welke middelen u heeft gebruikt en wanneer u bent gestopt",
      "Bewaar elke uitslag: de richting over tijd is informatiever dan een momentopname",
    ],
    cta: { tekst: "Uitgebreid bloedonderzoek", href: "/winkel/bloedwerk" },
  },
  {
    slug: "anabolen-en-vruchtbaarheid",
    titel: "Anabolen en vruchtbaarheid",
    metaTitle: "Anabolen en vruchtbaarheid: gevolgen en herstel",
    metaDescription:
      "Hoe anabolen de zaadproductie beinvloeden, wat er na het staken herstelt en welk onderzoek zinvol is bij een kinderwens.",
    intro:
      "Voor veel mensen is dit uiteindelijk het onderwerp dat de doorslag geeft. Anabolen onderdrukken niet alleen de testosteronproductie maar ook de zaadcelproductie, en dat gaat verder dan de meesten verwachten.",
    blokken: [
      {
        h: "Waarom de zaadproductie stilvalt",
        p: [
          "De aanmaak van zaadcellen wordt aangestuurd door FSH en is bovendien afhankelijk van een hoge testosteronconcentratie in de testis zelf. Toediening van androgenen van buitenaf legt de aansturing stil, waardoor die lokale concentratie wegvalt. Het gevolg is een sterk verminderde of afwezige zaadcelproductie, ook al is uw testosteron in het bloed juist hoog.",
        ],
      },
      {
        h: "Herstelt het weer?",
        p: [
          "Bij de meeste mensen komt de zaadproductie terug na het staken, maar het duurt doorgaans langer dan het herstel van de testosteronwaarde zelf. Termijnen van zes maanden tot ruim een jaar zijn beschreven. Duur en dosering van het gebruik hangen samen met hoe traag dat gaat.",
          "Bij een deel van de gebruikers blijft de zaadkwaliteit achter. Bij een concrete kinderwens is een semenanalyse de enige manier om te weten waar u staat; bloedwaarden zeggen daar maar beperkt iets over.",
        ],
      },
      {
        h: "Wat u kunt doen",
        p: [
          "Heeft u een kinderwens en gebruikt u nu, dan is het gesprek met een arts belangrijker dan welk protocol van internet ook. Wij kunnen uw hormonale waarden lezen en met u bespreken wat die betekenen, en u helpen de juiste vraag te stellen bij uw huisarts of een uroloog.",
        ],
      },
    ],
    cta: { tekst: "Consult aanvragen", href: "/consult" },
  },
  {
    slug: "herstel-na-een-kuur",
    titel: "Herstel na een kuur, ook bij kinderwens",
    metaTitle: "Herstel na een kuur: behandelroute, hCG, SERM's en kinderwens",
    metaDescription:
      "Hoe herstel na een anabolenkuur verloopt, welke middelen een arts inzet zoals hCG en clomifeen, wat er gemonitord wordt en wat realistisch is bij een kinderwens.",
    intro:
      "Dit is de meest gestelde vraag die wij krijgen: ik ben gestopt, mijn waarden komen niet terug, en er is een kinderwens. Hieronder staat hoe het herstel werkt, welke behandelingen bestaan en hoe de route via een arts eruitziet. Wij schrijven niets voor en geven geen doseerschema's; bij kinderwens is dat ook echt niet de plek waar u wilt improviseren.",
    blokken: [
      {
        h: "Waarom het herstel soms uitblijft",
        p: [
          "Zolang u androgenen van buitenaf toediende, viel het signaal vanuit de hypofyse stil: LH en FSH gingen omlaag en de testes kregen geen opdracht meer. Na het staken moet die aansturing weer op gang komen en moeten de testes daarop reageren. Bij de meeste mensen gebeurt dat, maar de as kan traag zijn en soms blijft het langdurig achter.",
          "Voor de zaadcelproductie ligt het lastiger dan voor de testosteronproductie. Zaadcellen ontstaan onder invloed van FSH en van een hoge testosteronconcentratie in de testis zelf. Die lokale concentratie krijgt u niet terug met testosteron uit een flesje; dat onderdrukt de as juist verder. Dat is precies waarom een testosteronkuur en een kinderwens niet samengaan.",
        ],
      },
      {
        h: "Welke middelen een arts kan inzetten",
        p: [
          "hCG bootst LH na en zet de cellen van Leydig direct aan tot productie in de testis zelf. Het wordt daarom gebruikt om de lokale testosteronconcentratie te herstellen, wat voor de zaadcelproductie doorslaggevend is. In Nederland is het receptplichtig.",
          "SERM's zoals clomifeen en tamoxifen werken op een ander punt: zij blokkeren de terugkoppeling van oestrogeen op de hypofyse, waardoor die weer meer LH en FSH afgeeft. Zij zetten dus de eigen as aan in plaats van hem te vervangen.",
          "Bij uitblijvend herstel van de zaadcelproductie wordt soms FSH toegevoegd. Welke combinatie zinvol is en in welke volgorde, hangt af van uw waarden en van hoe lang en hoe zwaar u heeft gebruikt. Daar valt geen algemeen schema voor te geven, en een schema van internet houdt geen rekening met uw uitgangspositie.",
        ],
      },
      {
        h: "Wat er gemonitord wordt",
        p: [
          "Een behandeling zonder metingen is gokken. Wat doorgaans gevolgd wordt: LH en FSH om te zien of de aansturing terugkomt, totaal en vrij testosteron voor de productie, oestradiol omdat dat bij hCG en SERM's kan oplopen, en SHBG voor de interpretatie van het vrije deel.",
          "Bij kinderwens is de semenanalyse de enige maat die er werkelijk toe doet. Bloedwaarden kunnen er goed uitzien terwijl de zaadkwaliteit nog achterblijft; het omgekeerde komt ook voor. Reken op herhaalde metingen, want de aanmaakcyclus van zaadcellen duurt ongeveer drie maanden en elke verandering is pas daarna zichtbaar.",
        ],
      },
      {
        h: "Wat realistisch is qua termijn",
        p: [
          "Voor de testosteronproductie zijn termijnen van enkele maanden tot ruim een jaar beschreven. Voor de zaadcelproductie ligt dat doorgaans langer, en de eerste zichtbare verbetering laat vaak drie tot zes maanden op zich wachten omdat de aanmaakcyclus nu eenmaal die tijd kost.",
          "Duur en dosering van het gebruik hangen samen met hoe traag het gaat. Dat is vervelend nieuws voor wie jarenlang heeft gebruikt, maar het is beter te weten dan te hopen: het bepaalt of u nu al moet beginnen met de route via een arts of dat afwachten verantwoord is.",
        ],
      },
      {
        h: "De route via een arts, en hoe u die ingaat",
        p: [
          "Begin bij uw huisarts en wees eerlijk over wat u heeft gebruikt en hoe lang. Dat voelt ongemakkelijk, maar zonder die informatie wordt u onderzocht op de verkeerde dingen en duurt alles langer. Bij kinderwens is doorverwijzing naar een uroloog of androloog de logische stap; die kan hCG en de overige middelen voorschrijven en de behandeling monitoren.",
          "Wat wij hierin doen is uw waarden lezen en uitleggen, en met u op papier zetten wat er speelt. Met een overzicht van uw metingen over tijd komt u met een concrete vraag binnen in plaats van een vaag verhaal, en dat scheelt in de praktijk maanden.",
        ],
      },
    ],
    lijstTitel: "Wat u meeneemt naar dat gesprek",
    lijst: [
      "Welke middelen u heeft gebruikt, in welke periode en in welke orde van grootte",
      "Wanneer u bent gestopt en of u sindsdien iets heeft gebruikt, ook supplementen",
      "Alle bloeduitslagen die u heeft, op volgorde van datum",
      "Of er een concrete kinderwens is en op welke termijn",
      "Klachten die u ervaart: stemming, libido, energie, slaap",
    ],
    cta: { tekst: "Consult herstel na cycle", href: "/winkel/consult" },
  },
  {
    slug: "eerste-kuur-overwegen",
    titel: "Een eerste kuur overwegen",
    metaTitle: "Eerste kuur overwegen: wat u vooraf zou moeten weten",
    metaDescription:
      "Objectieve informatie voor wie een eerste kuur overweegt: wat het oplevert, wat het kost aan gezondheid en welke vragen u vooraf zou moeten beantwoorden.",
    intro:
      "Wij verkopen geen anabolen en gaan u ook niet vertellen wat u moet doen. Wat wij wel kunnen is de vragen op tafel leggen die zelden gesteld worden voordat iemand begint, en die achteraf het meest blijken uit te maken.",
    blokken: [
      {
        h: "Wat u ervoor terugkrijgt, eerlijk gezegd",
        p: [
          "Het effect op spiermassa en kracht is reeel en groter dan wat met training alleen haalbaar is. Dat is geen omstreden punt. Wat vaak ontbreekt in de afweging is dat een deel van die winst verdwijnt na het staken, en dat het behouden ervan doorgaans betekent dat u blijft doorgaan.",
        ],
      },
      {
        h: "De vragen die er vooraf toe doen",
        p: [
          "Heeft u een kinderwens op termijn? Zijn er hart- en vaatziekten in uw familie? Heeft u een geschiedenis van depressie? Wat is uw uitgangspositie, gemeten en niet geschat? En misschien de belangrijkste: onder welke voorwaarde zou u stoppen, en heeft u dat vooraf vastgelegd?",
          "Wie deze vragen pas beantwoordt nadat er iets misgaat, beantwoordt ze onder de slechtst denkbare omstandigheden.",
        ],
      },
      {
        h: "Begin met meten",
        p: [
          "Een uitgangsmeting voordat u iets doet is het enige moment waarop u een schone referentie heeft. Zonder die referentie is elke latere afwijking niet te duiden: u weet dan niet of een waarde is veranderd of altijd al zo was.",
        ],
      },
    ],
    lijstTitel: "Situaties waarin wij zonder omhaal afraden te beginnen",
    lijst: [
      "Onder de 25, omdat de eigen hormoonhuishouding dan nog in ontwikkeling is",
      "Bestaande hart- en vaatziekten of een sterk belaste familiegeschiedenis",
      "Een actuele of recente depressieve episode",
      "Een kinderwens binnen enkele jaren",
    ],
    cta: { tekst: "Intakeconsult", href: "/winkel/consult" },
  },
];

export function vindAdvies(slug: string) {
  return ADVIES.find((a) => a.slug === slug);
}
