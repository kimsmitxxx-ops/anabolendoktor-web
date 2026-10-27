/**
 * Retourbeleid voor Google, als schema.org-fragment in elke Offer.
 *
 * Bron: voorwaarden: 14 dagen herroepingsrecht, kosten van terugzenden voor rekening van de klant; retourpagina: ongeopende verzegelde supplementen
 *
 * 14 dagen, per post, en de retourkosten zijn voor de klant. Die drie
 * velden heeft Google nodig bij een eindig retourvenster; laat je er een weg,
 * dan negeert hij het hele blok.
 *
 * Verandert het beleid op de voorwaardenpagina, dan verandert dit bestand mee.
 * Andersom niet.
 */
export const MERCHANT_RETURN_POLICY = {
  "@type": "MerchantReturnPolicy",
  applicableCountry: "NL",
  returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
  merchantReturnDays: 14,
  returnMethod: "https://schema.org/ReturnByMail",
  returnFees: "https://schema.org/ReturnFeesCustomerResponsibility",
  merchantReturnLink: "https://anabolendoktor.com/retourneren",
} as const;
