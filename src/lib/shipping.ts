/**
 * Shipping-methode logica.
 *
 * Anabolendoktor werkt met TWEE verzend-locaties:
 *   - "ut"   = UT (United Tabs) producten - verzonden vanuit UT-magazijn
 *   - "rest" = Alle overige producten - verzonden vanuit hoofdmagazijn Vlaardingen
 *
 * Klanten mogen producten uit beide groepen tegelijk bestellen - dan worden er
 * twee aparte zendingen verstuurd en betaal je 2× de verzendkosten.
 */

import type { CartItem } from "@/lib/cart-context";

export const SHIPPING_FEE_CENTS = 1000; // €10 per zending

export type ShippingMethod = "ut" | "rest";

const METHOD_LABELS: Record<ShippingMethod, string> = {
  ut: "Locatie 01 (Utinon)",
  rest: "Locatie 02 (overige merken)",
};

/** Bepaal shipping-methode op basis van product-tags (UT-getagged -> 'ut'). */
export function shippingMethodForTags(tags: string[] | null | undefined): ShippingMethod {
  return tags?.includes("UT") ? "ut" : "rest";
}

export type ShippingBreakdown = {
  methods: ShippingMethod[];
  shippingCents: number;
  lines: Array<{ method: ShippingMethod; label: string; cents: number; itemCount: number }>;
};

export function computeShipping(items: CartItem[]): ShippingBreakdown {
  if (items.length === 0) {
    return { methods: [], shippingCents: 0, lines: [] };
  }
  const byMethod = new Map<ShippingMethod, number>();
  for (const it of items) {
    const m = (it.shipping_method as ShippingMethod) || "rest";
    byMethod.set(m, (byMethod.get(m) || 0) + it.qty);
  }
  const methods = Array.from(byMethod.keys());
  const shippingCents = methods.length * SHIPPING_FEE_CENTS;
  const lines = methods.map((m) => ({
    method: m,
    label: METHOD_LABELS[m],
    cents: SHIPPING_FEE_CENTS,
    itemCount: byMethod.get(m) || 0,
  }));
  return { methods, shippingCents, lines };
}

export const shippingLabel = (m: ShippingMethod) => METHOD_LABELS[m];
