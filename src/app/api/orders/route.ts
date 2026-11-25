import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { haalBetaalgegevens } from "@/lib/paytail";
import { unitDiscountPct } from "@/lib/bulk-discount";

export const dynamic = "force-dynamic";
// De route wacht op Paytail (via shop-dash) en op de mails; zonder dit kapt
// Vercel hem na tien seconden af, midden in dat wachten.
export const maxDuration = 30;
// Hoort bij force-dynamic: de gedeelde Supabase-client cachet sinds de
// TTFB-ronde standaard, en hier moet elke lees juist vers zijn.
export const fetchCache = "force-no-store";

const SHOP_ID = "96b47e49-34fd-4d6c-99d3-d49d912be046"; // anabolendoktor
const SHIPPING_FEE_CENTS = 1000; // EUR 10 per zending

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({} as any));
  const {
    email, name,
    street, house_number,
    postal, city, country = "NL",
    phone, items, discount_code,
    create_account, password,
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
    console.error("order: serverconfiguratie onvolledig", e);
    return NextResponse.json({ error: "Bestellen lukte even niet. Probeer het opnieuw." }, { status: 500 });
  }

  let customerId: string | null = null;
  try {
    const { data } = await supabase.rpc("find_or_create_customer", {
      p_shop_id: SHOP_ID, p_email: email, p_name: name, p_phone: phone || null,
    });
    customerId = typeof data === "string" ? data : null;
  } catch {}

  // Prijs uit de database, niet uit het verzoek.
  //
  // De cart stuurt price_cents mee en dat werd hier klakkeloos overgenomen.
  // Wie het verzoek zelf opstelt kon dus zijn eigen prijs bepalen, en bij
  // betaling per overboeking komt dat bedrag ook zo op de factuur. De
  // typecontrole hierboven ving dat niet af: een getal van 1 cent is ook een
  // geldig getal.
  //
  // Opzoeken op id, want dat is de primaire sleutel en ook wat de mand
  // meestuurt; sku als terugval voor een mand die nog van voor deze wijziging
  // in localStorage staat.
  // Twee losse `in`-queries en geen `.or()` met een zelfgebouwde filterstring:
  // een sku met een komma of een aanhalingsteken erin zou die string breken,
  // en dan komen er stil de verkeerde rijen terug.
  const bestelIds = Array.from(
    new Set(
      items
        .map((it: any) => it.id)
        // Alleen wat een uuid kán zijn: een mand-regel met een zelfverzonnen
        // id maakt er anders een databasefout van, en die zou hieronder de
        // hele bestelling op 503 zetten in plaats van netjes op 400.
        .filter((v: any) => typeof v === "string" && /^[0-9a-f-]{36}$/i.test(v)),
    ),
  );
  const bestelSkus = Array.from(
    new Set(items.map((it: any) => it.sku).filter((v: any) => typeof v === "string" && v)),
  );
  // **De slug is wat de mand in `id` meestuurt**, en een productkaart zet hem
  // ook in `sku`. De kolom products.id is een uuid en products.sku is het
  // echte artikelnummer (slug creatine-monohydraat heeft sku AD-SUP-CREA),
  // dus zonder deze derde ingang vindt de route een regel niet die via een
  // kaart in de mand terechtkwam en krijgt de klant onterecht te horen dat
  // het product niet meer beschikbaar is.
  const sleutels = Array.from(
    new Set(items.flatMap((it: any) => [it.id, it.sku]).filter((v: any) => typeof v === "string" && v)),
  );
  const rijPerId = new Map<string, any>();
  const rijPerSku = new Map<string, any>();
  const rijPerSlug = new Map<string, any>();
  try {
    const kolommen = "id, slug, sku, name, price_cents, is_active";
    const [opId, opSku, opSlug] = await Promise.all([
      bestelIds.length
        ? supabase.from("products").select(kolommen).eq("shop_id", SHOP_ID).in("id", bestelIds)
        : Promise.resolve({ data: [], error: null }),
      bestelSkus.length
        ? supabase.from("products").select(kolommen).eq("shop_id", SHOP_ID).in("sku", bestelSkus)
        : Promise.resolve({ data: [], error: null }),
      sleutels.length
        ? supabase.from("products").select(kolommen).eq("shop_id", SHOP_ID).in("slug", sleutels)
        : Promise.resolve({ data: [], error: null }),
    ]);
    if (opId.error) throw opId.error;
    if (opSku.error) throw opSku.error;
    if (opSlug.error) throw opSlug.error;
    for (const r of [...(opId.data || []), ...(opSku.data || []), ...(opSlug.data || [])] as any[]) {
      // Een rij zonder prijs is hier net zo onbruikbaar als geen rij: zonder
      // deze controle rekende de route verderop met null en kwam er een NaN
      // op de factuur.
      if (typeof r.price_cents !== "number") continue;
      rijPerId.set(r.id, r);
      if (r.sku) rijPerSku.set(r.sku, r);
      if (r.slug) rijPerSlug.set(r.slug, r);
    }
  } catch (e) {
    // Niet doorgaan met de prijs uit de browser: dat is precies het gat dat
    // hier gedicht wordt. Liever een bestelling die niet lukt.
    console.error("bestelling: prijzen ophalen mislukte", e);
    return NextResponse.json({ error: "Bestellen lukte even niet. Probeer het opnieuw of mail ons." }, { status: 503 });
  }

  // Eén plek die de rij bij een mand-regel zoekt, zodat de prijs, de naam en
  // het product_id verderop allemaal dezelfde rij gebruiken.
  const rijVoor = (it: any) =>
    rijPerSlug.get(it.id) ?? rijPerSlug.get(it.sku) ?? rijPerSku.get(it.sku) ?? rijPerId.get(it.id);

  for (const it of items) {
    const rij = rijVoor(it);
    if (!rij || rij.is_active === false) {
      return NextResponse.json(
        // U-vorm, zoals de rest van deze site: de melding gaat over "uw
        // mandje". De aansporing blijft de gebiedende wijs die hier overal
        // staat ("Probeer het opnieuw"), want "probeert u het opnieuw" wringt
        // naast de andere meldingen.
        { error: `Dit product is niet meer beschikbaar: ${it.name || it.sku || it.id}. Verwijder het uit uw mandje en probeer het opnieuw.` },
        { status: 400 },
      );
    }
  }

  // Bulk discount per item-qty applied (shared logic met checkout)
  let subtotal = 0;
  const adjustedItems = items.map((it: any) => {
    const basis = rijVoor(it).price_cents as number;
    const pct = unitDiscountPct(it.qty);
    const unitAdj = Math.round(basis * (1 - pct / 100));
    subtotal += unitAdj * it.qty;
    return { ...it, price_cents: basis, applied_price_cents: unitAdj, discount_pct: pct };
  });

  // Kortingscode: staat sinds 6 november 2026 in de coupons-tabel (shop-dash
  // migratie 093) en wordt in het dashboard beheerd, niet meer als los stukje
  // JSON in shops.settings. De klant krijgt de code CONSULT10 van de consulent
  // na een betaald consult; wat de browser meestuurt is dus een claim, geen
  // waarheid, en alleen de database bepaalt wat hij oplevert.
  //
  // Verzilveren zet in dezelfde statement de gebruiksteller omhoog, met de
  // limiet in de WHERE: twee gelijktijdige checkouts kunnen een code met
  // max_uses = 1 niet samen opmaken.
  let discountCents = 0;
  let couponCode: string | null = null;
  let discountLabel: string | null = null;
  if (typeof discount_code === "string" && discount_code.trim()) {
    const { data: couponRijen, error: couponError } = await supabase.rpc("coupon_verzilver", {
      p_shop_id: SHOP_ID,
      p_code: discount_code.trim().toUpperCase(),
      p_subtotal_cents: subtotal,
    });
    const c = Array.isArray(couponRijen) ? couponRijen[0] : couponRijen;
    if (couponError) {
      // Niet de bestelling laten klappen op een kortingscode: zonder korting
      // verder is beter dan een klant die niet kan afrekenen.
      console.error("bestelling: kortingscode verzilveren mislukte", couponError);
    } else if (c?.ok) {
      discountCents = Math.min(Number(c.discount_cents) || 0, subtotal);
      couponCode = c.code;
      discountLabel = `${c.code} (${c.kind === "percent" ? `-${c.value}%` : `-EUR ${(c.value / 100).toFixed(2)}`})`;
    } else {
      return NextResponse.json(
        { error: c?.melding || "Ongeldige of verlopen kortingscode" },
        { status: 400 },
      );
    }
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
    coupon_code: couponCode, discount_cents: discountCents,
    notes: discountLabel ? `Kortingscode ${discountLabel}: -EUR ${(discountCents / 100).toFixed(2)}` : null,
    // awaiting_payment: de enige wachtstatus die de check-constraint van de
    // orders-tabel toestaat; pending_payment werd geweigerd en brak de checkout.
    status: "awaiting_payment",
    // AD, niet AP: het ordernummer stond nog op het voorvoegsel van anabolenpro,
    // en dat is precies het soort spoor dat de twee sites aan elkaar knoopt.
    reference: `AD-${Date.now().toString(36).toUpperCase()}`,
  }).select().single();

  // Alleen een eigen tekst naar buiten: de melding van de database noemt
  // tabelnamen, constraints en PostgREST-codes, en dat verraadt waar we zitten.
  if (error || !order) {
    console.error("order aanmaken mislukt", error);
    return NextResponse.json({ error: "Order kon niet worden aangemaakt" }, { status: 500 });
  }

  // product_id komt uit dezelfde lookup als de prijs hierboven.
  // Kolomnamen van de echte, gedeelde order_items-tabel (product_name/
  // quantity/unit_price_cents/total_cents) - sku/name/qty/price_cents bestaan
  // hier niet. Deze insert faalde daardoor altijd stil (geen .select(), geen
  // foutafhandeling): elke bestelling stond wel in `orders`, maar zonder een
  // enkele regel in `order_items`, dus zag de admin alleen een totaalbedrag.
  const { error: itemsError } = await supabase.from("order_items").insert(adjustedItems.map((it: any) => ({
    order_id: order.id,
    product_id: rijVoor(it)?.id || null,
    product_name: rijVoor(it)?.name || it.name,
    quantity: it.qty,
    unit_price_cents: it.applied_price_cents,
    total_cents: it.applied_price_cents * it.qty,
  })));
  if (itemsError) {
    console.error("bestelling: order_items opslaan mislukte", itemsError);
  }

  // Paytail wijst per bestelling een rekening toe, en dat is niet altijd
  // dezelfde. Die halen we hier al op en leggen we vast bij de bestelling, nog
  // voor de bevestigingsmail vertrekt: zo staat de juiste rekening meteen in
  // die mail en heeft ook de klant die zijn betaalpagina nooit opent de
  // gegevens binnen. Het ophalen zelf gebeurt centraal in shop-dash.
  type PaytailShopRij = {
    paytail_enabled: boolean | null;
    paytail_eigen_blok: boolean | null;
    paytail_base_url: string | null;
    domain: string | null;
  };
  let paytailShop: PaytailShopRij | null = null;
  try {
    const { data } = await supabase
      .from("shops")
      .select("paytail_enabled, paytail_eigen_blok, paytail_base_url, domain")
      .eq("id", SHOP_ID)
      .single();
    paytailShop = (data as PaytailShopRij | null) ?? null;
    if (paytailShop?.paytail_enabled && paytailShop.paytail_base_url && paytailShop.paytail_eigen_blok !== false) {
      // Acht seconden: de klant wacht hier op zijn bevestiging. Lukt het niet
      // binnen die tijd, dan haalt de betaalpagina de rekening alsnog op.
      await haalBetaalgegevens(order.id, SHOP_ID, 8000);
    }
  } catch (e) {
    console.error("Paytail-gegevens bij de bestelling vastleggen mislukte (niet fataal):", e);
  }

  // Bevestigingsmail, server-side via shop-dash. Ontbrak hier volledig terwijl
  // SMTP en het order_confirmed-sjabloon klaarstonden: dezelfde omissie die bij
  // anabolenpro pas opviel toen een klant erover klaagde. Niet-fataal met
  // timeout, zodat trage SMTP de checkout nooit laat hangen.
  try {
    const dash = process.env.SHOP_DASH_URL || "https://shop-dash-ruby.vercel.app";
    const formatEUR = (c: number) =>
      new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(c / 100);
    await fetch(`${dash}/api/orders/${order.id}/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-shop-dash-key": process.env.SHOP_DASH_API_KEY || "" },
      signal: AbortSignal.timeout(8000),
      body: JSON.stringify({
        shopId: SHOP_ID,
        templateSlug: "order_confirmed",
        toEmail: email,
        vars: { customer_name: name, reference: order.reference, total: formatEUR(total) },
      }),
    });
  } catch (e) {
    console.error("order_confirmed mail (non-fataal):", e);
  }

  // De checkout hoeft alleen te weten of er via Paytail betaald wordt; de
  // bankgegevens staan al bij de bestelling en de betaalpagina toont ze.
  const paytailUrl =
    paytailShop?.paytail_enabled && paytailShop.paytail_base_url ? paytailShop.paytail_base_url : null;

  // Account aanmaken, als de klant dat vinkje bij het afrekenen aanzette.
  //
  // Dit stond er niet, terwijl de checkout het vinkje en een verplicht
  // wachtwoordveld wel toonde: de klant koos een wachtwoord en er gebeurde
  // vervolgens niets mee. Niet fataal voor de bestelling, dus na de order en
  // met een eigen try: een account dat niet lukt mag geen bestelling kosten.
  //
  // shop-dash beheert de accounts (service-role); wij hebben die sleutel
  // bewust niet. Bestaat het adres al, dan maakt shop-dash niets nieuws aan en
  // blijft het bestaande wachtwoord gelden.
  if (create_account === true && typeof password === "string" && password.length >= 8) {
    try {
      const dash = process.env.SHOP_DASH_URL || "https://shop-dash-ruby.vercel.app";
      const res = await fetch(`${dash}/api/storefront/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-shop-dash-key": process.env.SHOP_DASH_API_KEY || "" },
        body: JSON.stringify({ shopId: SHOP_ID, action: "create", email, password, name }),
        signal: AbortSignal.timeout(12_000),
      });
      if (!res.ok) {
        console.error("account aanmaken mislukte:", res.status, await res.text().catch(() => ""));
      }
    } catch (e) {
      console.error("account aanmaken mislukte (niet fataal):", e);
    }
  }

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
