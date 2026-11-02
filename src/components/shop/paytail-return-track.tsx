"use client";
import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * Terugkeer van Paytail (?paytail=1) - de browser hier zien is het enige
 * directe signaal dat de betaling daar echt is afgerond, er is geen webhook.
 * Zelfde event-naam als retakopen/kamagrashop voor dezelfde terugkeer, zodat
 * de funnel in shop-dash dit overal hetzelfde kan tellen.
 */
export function PaytailReturnTrack({ orderReference }: { orderReference: string }) {
  useEffect(() => {
    track("order_confirmed", { order_reference: orderReference });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
