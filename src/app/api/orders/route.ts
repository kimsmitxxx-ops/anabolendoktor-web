import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { unitDiscountPct } from "@/lib/bulk-discount";

export const dynamic = "force-dynamic";

const SHOP_ID = "96b47e49-34fd-4d6c-99d3-d49d912be046"; // anabolendoktor
const SHIPPING_FEE_CENTS = 1000; // EUR 10 per zending

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({} as any));
  const {
    email, name,
    street, house_number,
    postal, city, country = "NL",
    phone, items, discount_code,
  } = body;

  if (!email || !name || !street || !postal || !city || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Missende velden" }, { status: 400 });
  }

  // Validate items shape
  for (const it of items) {
    if (
      typeof it?.sku !== "string" ||
      typeof it?.name !== "string" ||
      typeof it?.price_cents !== "number" ||
      typeof it?.qty !== "number" ||
      it.price_cents < 0 ||
      it.qty <= 0
    ) {
      return NextResponse.json({ error: "Ongeldige cart-item" }, { status: 400 });
    }
  }

  // Service-role client - writes moeten RLS-policies overslaan.
  let supabase;
  try {
    supabase = createServiceClient();
  } catch (e: any) {
    return NextResponse.json({ error: `Server-config fout: ${e.message}` }, { status: 500 });
  }

  let customerId: string | null = null;
  try {
    const { data } = await supabase.rpc("find_or_create_customer", {
      p_shop_id: SHOP_ID, p_email: email, p_name: name, p_phone: phone || null,
    });
    customerId = typeof data === "string" ? data : null;
  } catch {}

  // Bulk discount per item-qty applied (shared logic met checkout)
  let subtotal = 0;
  const adjustedItems = items.map((it: any) => {
    const pct = unitDiscountPct(it.qty);
    const unitAdj = Math.round(it.price_cents * (1 - pct / 100));
    subtotal += unitAdj * it.qty;
    return { ...it, applied_price_cents: unitAdj, discount_pct: pct };
  });

  // Kortingscode: staat per shop in shops.settings.discount_codes en wordt
  // ALLEEN hier gevalideerd. De klant krijgt de code CONSULT10 van de
  // consulent na een betaald consult; wat de browser meestuurt is dus een
  // claim, geen waarheid.
  let discountCents = 0;
  let discountLabel: string | null = null;
  if (typeof discount_code === "string" && discount_code.trim()) {
    const { data: sh } = await supabase.from("shops").select("settings").eq("id", SHOP_ID).single();
    const codes: any[] = sh?.settings?.discount_codes || [];
    const c = codes.find(
      (x) => x && x.active !== false && String(x.code).trim().toLowerCase() === discount_code.trim().toLowerCase(),
    );
    if (!c) {
      return NextResponse.json({ error: "Ongeldige of verlopen kortingscode" }, { status: 400 });
    }
    discountCents = c.type === "percent"
      ? Math.round((subtotal * c.value) / 100)
      : Math.min(c.value, subtotal);
    discountLabel = `${String(c.code).toUpperCase()} (${c.type === "percent" ? `-${c.value}%` : `-EUR ${(c.value / 100).toFixed(2)}`})`;
  }

  // Shipping = EUR 10 per zending; consulten en bloedonderzoek worden niet
  // verzonden, maar zolang er iets fysieks in de mand zit geldt het tarief.
  const methods = new Set<string>();
  for (const it of items) methods.add(it.shipping_method || "rest");
  const shipping = methods.size * SHIPPING_FEE_CENTS;
  const total = subtotal - discountCents + shipping;

  const fullStreet = house_number ? `${street} ${house_number}` : street;

  const { data: order, error } = await supabase.from("orders").insert({
    shop_id: SHOP_ID,
    customer_id: customerId,
    customer_email: email,
    customer_name: name,
    customer_phone: phone || null,
    shipping_street: fullStreet, shipping_postal: postal, shipping_city: city, shipping_country: country,
    subtotal_cents: subtotal, shipping_cents: shipping, total_cents: total,
    notes: discountLabel ? `Kortingscode ${discountLabel}: -EUR ${(discountCents / 100).toFixed(2)}` : null,
    // awaiting_payment: de enige wachtstatus die de check-constraint van de
    // orders-tabel toestaat; pending_payment werd geweigerd en brak de checkout.
    status: "awaiting_payment",
    // AD, niet AP: het ordernummer stond nog op het voorvoegsel van anabolenpro,
    // en dat is precies het soort spoor dat de twee sites aan elkaar knoopt.
    reference: `AD-${Date.now().toString(36).toUpperCase()}`,
  }).select().single();

  if (error || !order) {
    return NextResponse.json({ error: error?.message || "Order kon niet worden aangemaakt" }, { status: 500 });
  }

  // Resolve product_id by sku (cart items van ProductCard hebben slug-as-id)
  const skus = Array.from(new Set(adjustedItems.map((it: any) => it.sku).filter(Boolean)));
  const { data: skuRows } = await supabase.from("products").select("id, sku").eq("shop_id", SHOP_ID).in("sku", skus);
  const skuToId = new Map((skuRows || []).map((r: any) => [r.sku, r.id]));

  await supabase.from("order_items").insert(adjustedItems.map((it: any) => ({
    order_id: order.id,
    product_id: skuToId.get(it.sku) || null,
    sku: it.sku,
    name: it.name,
    qty: it.qty,
    price_cents: it.applied_price_cents,
  })));

  // Betaallink, hetzelfde systeem als de andere shops: de basis-URL staat per
  // shop in de database, zodat een ander profiel geen codewijziging vraagt.
  // Staat paytail_enabled uit of ontbreekt de URL, dan valt de checkout terug
  // op de bedankt-pagina met de betaalgegevens per overboeking.
  let paytailUrl: string | null = null;
  try {
    const { data: sp } = await supabase
      .from("shops")
      .select("paytail_enabled, paytail_base_url, domain")
      .eq("id", SHOP_ID)
      .single();
    if (sp?.paytail_enabled && sp?.paytail_base_url) {
      const params = new URLSearchParams({
        order_id: order.reference,
        amount: (total / 100).toFixed(2),
        name,
        email,
        postcode: postal || "",
        country: country || "NL",
        return: `https://${sp.domain || "anabolendoktor.com"}/checkout/bedankt/${order.id}`,
      });
      paytailUrl = `${sp.paytail_base_url.replace(/\/$/, "")}?${params.toString()}`;
    }
  } catch {}

  return NextResponse.json({
    ok: true,
    order_id: order.id,
    paytail_url: paytailUrl,
    total_cents: total,
    subtotal_cents: subtotal,
    discount_cents: discountCents,
    shipping_cents: shipping,
  });
}
