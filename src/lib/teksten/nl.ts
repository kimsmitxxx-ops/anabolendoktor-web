/**
 * De woordenlijst van Anabolendoktor: de losse teksten van de site op één
 * plek.
 *
 * Dit is de bron zolang niemand in shop-dash iets aanpast; wat daar wordt
 * gewijzigd komt er bij het renderen overheen (zie lib/teksten-server.ts uit
 * shop-core). Nieuwe tekst hoort hier en niet in een component.
 *
 * Let op de aanspreekvorm: deze site spreekt de bezoeker met u aan, anders
 * dan de andere shops. Houd dat zo bij het wijzigen.
 */
export const nl = {
  mand: {
    titel: "Winkelmand",
    leeg: "Uw mand is leeg",
    overzicht: "Overzicht",
    subtotaal: "Subtotaal",
    bulkKorting: "Bulk-korting",
    totaal: "Totaal",
    naarCheckout: "Naar checkout",
    verzendkosten: "€10 verzendkosten per bestelling. Consulten en bloedonderzoek worden niet verzonden.",
  },

  afrekenen: {
    titel: "Afrekenen",
    legeMand: "Lege mand.",
    naarWinkel: "Naar winkel",
    overzicht: "Overzicht",
    plaatsBestelling: "Plaats bestelling",
    bezig: "Bezig…",
    naBestellen:
      "Op de volgende pagina staan de bankgegevens voor deze bestelling. Uw pakket gaat weg zodra de betaling binnen is.",
    fout: "Bestelling kon niet worden aangemaakt",
    verbindingsfout: "Verbindingsfout - probeer opnieuw",
  },

  contact: {
    kop: "Snelle antwoorden van ons team",
    intro:
      "Vragen over een consult, een bloedonderzoek of een bestelling: wij streven naar antwoord binnen 48 uur. Voor medische spoed belt u uw huisarts of de huisartsenpost.",
    chatKop: "Online chat",
    berichtKop: "Stuur ons een bericht",
    bereikbaarheidKop: "Bereikbaarheid",
    bezoekKop: "Geen bezoekadres",
  },
};

export type Teksten = typeof nl;
