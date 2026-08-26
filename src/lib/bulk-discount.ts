// Geen staffelkorting op deze site: elk pakket bevat een consult, dus vijf
// of tien stuks bestellen is geen bestaand scenario. De matrix is leeg in
// plaats van verwijderd zodat winkelmand, checkout en de orders-API dezelfde
// (nul-)berekening blijven delen. Korting loopt via de code CONSULT10.
export const BULK_TIERS: { qty: number; pct: number }[] = [];

export function unitDiscountPct(qty: number): number {
  for (const t of BULK_TIERS) if (qty >= t.qty) return t.pct;
  return 0;
}

export function lineSubtotalCents(priceCents: number, qty: number): number {
  const pct = unitDiscountPct(qty);
  return Math.round(priceCents * (1 - pct / 100)) * qty;
}

export interface CartLikeItem {
  price_cents: number;
  qty: number;
  /** "ut" / "rest" - bepaalt of dit item via UT-shipping of standaard gaat */
  shipping_method?: "ut" | "rest";
}

const SHIPPING_FEE_CENTS = 1000; // €10 per zending

export function calcTotals(items: CartLikeItem[]) {
  let subtotalRaw = 0;
  let subtotal = 0;
  let savings = 0;
  for (const it of items) {
    subtotalRaw += it.price_cents * it.qty;
    const sub = lineSubtotalCents(it.price_cents, it.qty);
    subtotal += sub;
  }
  savings = subtotalRaw - subtotal;
  // Verzending = aantal unieke shipping-methodes in mand × €10
  const methods = new Set<string>();
  for (const it of items) methods.add(it.shipping_method || "rest");
  const shipping = methods.size * SHIPPING_FEE_CENTS;
  const total = subtotal + shipping;
  return { subtotalRaw, subtotal, savings, shipping, total, shippingMethodCount: methods.size };
}
