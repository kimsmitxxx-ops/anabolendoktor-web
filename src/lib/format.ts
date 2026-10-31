/**
 * Opmaak-helpers zonder afhankelijkheden.
 *
 * formatEUR stond in lib/queries.ts, en dat bestand maakt de Supabase-client
 * aan. Vijf client-componenten (winkelmand, checkout, beide winkelmand-drawers,
 * de toevoegknop) importeerden alleen dit ene functietje daaruit, waardoor de
 * hele Supabase-client inclusief URL en sleutel in de JS-bundle van de layout
 * belandde - en dus van elke pagina. Vandaar een eigen bestand: wat de browser
 * nodig heeft, hoort niets van de database te weten.
 *
 * lib/queries.ts exporteert het door, zodat server-code niets hoeft te wijzigen.
 */

export const formatEUR = (cents: number) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(cents / 100);
