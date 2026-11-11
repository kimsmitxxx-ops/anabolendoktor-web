import { supabase, createServiceClient, type Product, type Category, type BlogPost } from "./supabase";

// Hardcoded shop_id voor anabolendoktor, als terugval voor een scoped JWT.
// RLS-policies in shop-dash migration 021 staan anon SELECT toe op deze shop.
const SHOP_ID = "96b47e49-34fd-4d6c-99d3-d49d912be046";

// Populariteits-volgorde van stoffen (eerst = bovenaan). UT-merk overrules dit.
const STOF_POPULARITY = [
  "test", "sustanon", "winstrol", "winn", "boldenone", "bold", "tren", "trenbolone",
  "anavar", "dianabol", "deca", "nandrolone", "masteron", "primobolan", "parabolan",
  "anadrol", "oxymetholone", "turinabol",
  "clomid", "nolvadex", "arimidex", "aromasin", "proviron", "hcg",
  "clenbuterol", "t3", "t4",
  "hgh", "melanotan", "bpc",
];

function popularityScore(name: string): number {
  const n = name.toLowerCase();
  for (let i = 0; i < STOF_POPULARITY.length; i++) {
    if (n.includes(STOF_POPULARITY[i])) return i;
  }
  return 999;
}

// Sorteer producten: UT eerst → UP daarna → overige merken, daarna op
// stof-populariteit (test > win > bold > tren), daarna sort_order.
function brandRank(tags: string[] | null | undefined): number {
  if (tags?.includes("UT")) return 0;
  if (tags?.includes("UP")) return 1;
  return 2;
}

export function sortProducts<
  T extends { name: string; tags: string[] | null; sort_order?: number | null; availability?: string | null },
>(products: T[]): T[] {
  return [...products].sort((a, b) => {
    // Uitverkocht altijd onderaan, ongeacht merk of populariteit. Stond er niet
    // in, waardoor de categoriepaginas begonnen met producten die je niet kunt
    // bestellen. Binnen elke groep blijft de bestaande volgorde intact.
    const oa = a.availability === "OutOfStock" ? 1 : 0;
    const ob = b.availability === "OutOfStock" ? 1 : 0;
    if (oa !== ob) return oa - ob;

    const ba = brandRank(a.tags);
    const bb = brandRank(b.tags);
    if (ba !== bb) return ba - bb;
    const pa = popularityScore(a.name);
    const pb = popularityScore(b.name);
    if (pa !== pb) return pa - pb;
    return (a.sort_order ?? 999) - (b.sort_order ?? 999);
  });
}

// Alle queries try/catch-safe: returnen lege array/null bij DB-error
// zodat Next.js build niet faalt en pagina's gracefully renderen.

export async function listFeaturedProducts(limit = 8): Promise<Product[]> {
  try {
    const { data } = await supabase.from("products")
      .select("*, categories(slug, name)")
      .eq("shop_id", SHOP_ID)
      .eq("is_active", true)
      .eq("is_featured", true)
      .order("sort_order")
      .limit(limit);
    return (data ?? []) as Product[];
  } catch { return []; }
}

export async function listProducts(opts: { categorySlug?: string; tag?: string; limit?: number } = {}): Promise<Product[]> {
  try {
    let q = supabase.from("products")
      .select(
        // Alleen bij een categoriepagina de koppeltabel erbij halen: met
        // !inner valt een product zonder categorie anders helemaal weg.
        opts.categorySlug ? "*, categories(slug, name)" + ", product_categories!inner(category_id)" : "*, categories(slug, name)",
      )
      .eq("shop_id", SHOP_ID)
      .eq("is_active", true)
      .order("sort_order");
    if (opts.categorySlug) {
      const cat = await supabase.from("categories").select("id").eq("shop_id", SHOP_ID).eq("slug", opts.categorySlug).maybeSingle();
      // Een product kan in meerdere categorieën staan (migratie 103), dus de
      // koppeltabel is leidend. Hiervoor telde ook een oude WooCommerce-tag
      // met dezelfde naam mee, en dat maakte "haal dit product uit de
      // categorie" in het dashboard zinloos: de tag bleef staan.
      if (cat.data) q = q.eq("product_categories.category_id", cat.data.id);
    }
    if (opts.tag) q = q.contains("tags", [opts.tag]);
    if (opts.limit) q = q.limit(opts.limit);
    const { data } = await q;
    return (data ?? []) as Product[];
  } catch { return []; }
}

export async function getProduct(slug: string) {
  try {
    const { data } = await supabase.from("products")
      .select("*, categories(slug, name), product_media(url, alt, sort_order, is_primary)")
      .eq("shop_id", SHOP_ID)
      .eq("slug", slug)
      .eq("is_active", true)
      .maybeSingle();
    return data;
  } catch { return null; }
}

export async function listCategories(): Promise<Category[]> {
  try {
    const { data } = await supabase.from("categories")
      .select("*")
      .eq("shop_id", SHOP_ID)
      .eq("is_published", true)
      .order("sort_order");
    return (data ?? []) as Category[];
  } catch { return []; }
}

export async function getCategory(slug: string): Promise<Category | null> {
  try {
    const { data } = await supabase.from("categories")
      .select("*")
      .eq("shop_id", SHOP_ID)
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();
    return data as Category | null;
  } catch { return null; }
}

export async function listBlogPosts(limit = 50): Promise<BlogPost[]> {
  try {
    const { data } = await supabase.from("blog_posts")
      .select("id, slug, title, excerpt, image_url, category, published_at, updated_at, author, meta_title, meta_description, body")
      .eq("shop_id", SHOP_ID)
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(limit);
    return (data ?? []) as BlogPost[];
  } catch { return []; }
}

export async function getBlogPost(slug: string): Promise<(BlogPost & { author_info?: BlogAuthor | null }) | null> {
  try {
    const { data } = await supabase.from("blog_posts")
      .select("*, blog_authors(id, slug, name, role, bio_short, bio_long, avatar_url, expertise, credentials)")
      .eq("shop_id", SHOP_ID)
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();
    if (!data) return null;
    const { blog_authors, ...post } = data as any;
    return { ...post, author_info: blog_authors || null } as any;
  } catch { return null; }
}

export type BlogAuthor = {
  id: string;
  slug: string;
  name: string;
  role: string | null;
  bio_short: string | null;
  bio_long: string | null;
  avatar_url: string | null;
  expertise: string[] | null;
  credentials: string[] | null;
};

export async function listBlogAuthors(): Promise<BlogAuthor[]> {
  try {
    const { data } = await supabase.from("blog_authors")
      .select("id, slug, name, role, bio_short, bio_long, avatar_url, expertise, credentials, sort_order")
      .eq("shop_id", SHOP_ID)
      .eq("is_active", true)
      .order("sort_order");
    return (data ?? []) as BlogAuthor[];
  } catch { return []; }
}

export type ProductReview = {
  id: string;
  rating: number;
  author_name: string;
  title: string | null;
  body: string | null;
  created_at: string;
  published_at: string | null;
};

export async function listProductReviews(productId: string, limit = 20): Promise<ProductReview[]> {
  try {
    const { data } = await supabase.from("product_reviews")
      .select("id, rating, author_name, title, body, created_at, published_at")
      .eq("product_id", productId)
      .eq("status", "approved")
      .eq("is_spam", false)
      .order("created_at", { ascending: false })
      .limit(limit);
    return (data ?? []) as ProductReview[];
  } catch { return []; }
}

/**
 * Kolommen van `shops` die de anon key mag lezen. Expliciet in plaats van
 * `select("*")`, want sinds shop-dash migratie 054 heeft anon alleen nog
 * kolom-grants: `settings` (met smtp-wachtwoord en kortingscodes) en
 * `paytail_api_key` zijn afgeschermd, en `select("*")` zou dus afketsen op
 * "permission denied for column". Voeg je een publieke kolom toe aan shops,
 * dan moet die hier én in de GRANT van 054 erbij.
 */
const SHOP_PUBLIC_COLUMNS =
  "id, slug, name, domain, email, iban, bank_name, kvk, btw, created_at, updated_at, logo_url, description, phone, address_street, address_postal, address_city, address_country, bic, shipping_free_above_cents, shipping_nl_cents, shipping_be_cents, shipping_de_cents, shipping_eu_cents, payment_instructions, order_prefix, reminder_days, is_active, theme_color, meta_title, meta_description, paytail_enabled, paytail_base_url, paytail_return_path, paytail_btn_label, paytail_btn_color, paytail_btn_text_color, iban_enabled, maintenance_mode, maintenance_message, noindex, product_url_pattern, default_meta_title_template, default_meta_description_template, llms_txt" as const;

export async function getShop() {
  try {
    const { data } = await supabase
      .from("shops")
      .select(SHOP_PUBLIC_COLUMNS)
      .eq("id", SHOP_ID)
      .maybeSingle();
    return data;
  } catch { return null; }
}

export type PaymentInstructions = {
  bank_name?: string;
  iban?: string;
  bic?: string;
  account_holder?: string;
  instructions_html?: string;
};

export async function getShopPaymentInstructions(): Promise<PaymentInstructions | null> {
  try {
    const { data } = await supabase
      .from("shops")
      .select("payment_instructions")
      .eq("id", SHOP_ID)
      .maybeSingle();
    return (data?.payment_instructions as PaymentInstructions) || null;
  } catch {
    return null;
  }
}

/**
 * De bestelling voor de bedankt-pagina.
 *
 * Stond hier "email" in de select, en die kolom bestaat niet: het is
 * customer_email. PostgREST gaf daardoor een fout, de pagina zag null en
 * riep notFound() aan. Iedere klant die na het bestellen op de bedankt-pagina
 * uitkwam, kreeg dus een 404 in plaats van zijn betaalgegevens.
 */
export async function getOrderForConfirmation(orderId: string) {
  try {
    // Bestellingen zijn met opzet niet leesbaar voor de anon-key: RLS laat ze
    // niet door, want dan kon iedereen met een order-id klantgegevens opvragen
    // via de REST-API. Deze functie draait alleen server-side op de
    // bedankt-pagina, dus hier hoort de service-client. Met de anon-client
    // kwam er altijd null terug en gaf de bedankt-pagina een 404.
    const client = (() => { try { return createServiceClient(); } catch { return supabase; } })();
    const { data } = await client
      .from("orders")
      .select(
        "id, reference, customer_email, customer_name, total_cents, subtotal_cents, shipping_cents, shipping_postal, shipping_country, created_at",
      )
      .eq("id", orderId)
      .eq("shop_id", SHOP_ID)
      .maybeSingle();
    if (!data) return null;
    return { ...data, email: data.customer_email as string };
  } catch {
    return null;
  }
}

/**
 * De betaallink van deze shop. De rekeninggegevens staan op die pagina en niet
 * hier, omdat de rekening per bestelling kan verschillen.
 */
export async function getPaymentLinkConfig() {
  try {
    const { data } = await supabase
      .from("shops")
      .select("paytail_enabled, paytail_base_url, domain")
      .eq("id", SHOP_ID)
      .maybeSingle();
    return data as { paytail_enabled: boolean; paytail_base_url: string | null; domain: string | null } | null;
  } catch {
    return null;
  }
}

export { formatEUR } from "./format";

// ---------------------------------------------------------------------------
// Betaalpagina (/checkout/betalen/<orderId>)
//
// De eigen uitlegpagina die tussen de checkout en Paytail stap 2 zit. Die
// pagina post zelf naar Paytail en heeft daarvoor meer van de order nodig dan
// de bedankt-pagina: Paytail wil ook de postcode en het land van de betaler,
// want de bank gebruikt die om de overboeking te verifieren.
// ---------------------------------------------------------------------------

// Eén herkansing bij een netwerk- of databasehapering. Zonder retry wordt zo'n
// hapering een harde 404 op de pagina waar iemand net zijn bestelling heeft
// geplaatst, en dat ziet eruit alsof de bestelling is verdwenen.
async function metHerkansing<T>(wat: string, fn: () => Promise<{ data: T | null; error: unknown }>): Promise<T | null> {
  for (let poging = 1; poging <= 2; poging++) {
    try {
      const { data, error } = await fn();
      if (!error) return data;
      console.error(wat + ": ophalen mislukte (poging " + poging + ")", error);
    } catch (e) {
      console.error(wat + ": ophalen gooide (poging " + poging + ")", e);
    }
    if (poging === 1) await new Promise((r) => setTimeout(r, 250));
  }
  return null;
}

export type OrderForPayment = {
  id: string;
  shop_id: string;
  reference: string | null;
  customer_name: string | null;
  customer_email: string | null;
  shipping_street: string | null;
  shipping_postal: string | null;
  shipping_city: string | null;
  shipping_country: string | null;
  subtotal_cents: number;
  shipping_cents: number;
  total_cents: number;
  status: string | null;
};

export async function getOrderForPayment(orderId: string) {
  return metHerkansing<OrderForPayment>("betaalpagina order", async () => {
    const sb = createServiceClient();
    const res = await sb
      .from("orders")
      .select(
        "id, shop_id, reference, customer_name, customer_email, shipping_street, shipping_postal, shipping_city, shipping_country, subtotal_cents, shipping_cents, total_cents, status"
      )
      .eq("id", orderId)
      .eq("shop_id", SHOP_ID)
      .maybeSingle();
    return { data: res.data as OrderForPayment | null, error: res.error };
  });
}

export type OrderRegelForPayment = {
  product_name: string;
  quantity: number;
  unit_price_cents: number;
  total_cents: number;
};

/** De regels van de bestelling, zodat de klant op de betaalpagina ziet waar hij voor betaalt. */
export async function getOrderItemsForPayment(orderId: string): Promise<OrderRegelForPayment[]> {
  const rijen = await metHerkansing<OrderRegelForPayment[]>("betaalpagina regels", async () => {
    const sb = createServiceClient();
    const res = await sb
      .from("order_items")
      .select("product_name, quantity, unit_price_cents, total_cents")
      .eq("order_id", orderId)
      .order("product_name");
    return { data: res.data as OrderRegelForPayment[] | null, error: res.error };
  });
  return rijen || [];
}

export type PaytailConfig = {
  paytail_enabled: boolean | null;
  paytail_eigen_blok: boolean | null;
  paytail_base_url: string | null;
  paytail_btn_label: string | null;
  paytail_btn_color: string | null;
  paytail_btn_text_color: string | null;
  domain: string | null;
};

/**
 * Let op: dit leest met de shop-sleutel en niet met de anon key. De kolom
 * paytail_eigen_blok zit niet in de anon-grant van shop-dash migratie 054, en
 * één kolom die anon niet mag lezen laat de hele select afketsen.
 */
export async function getPaytailConfig(): Promise<PaytailConfig | null> {
  return metHerkansing<PaytailConfig>("betaalpagina paytail-config", async () => {
    const sb = createServiceClient();
    const res = await sb
      .from("shops")
      .select(
        "paytail_enabled, paytail_eigen_blok, paytail_base_url, paytail_btn_label, paytail_btn_color, paytail_btn_text_color, domain"
      )
      .eq("id", SHOP_ID)
      .maybeSingle();
    return { data: res.data as PaytailConfig | null, error: res.error };
  });
}

/** De bij de bestelling bewaarde Paytail-gegevens, zoals ze naar de klant gingen. */
export async function getPaytailDetails(orderId: string): Promise<Record<string, unknown> | null> {
  const rij = await metHerkansing<{ paytail_details: Record<string, unknown> | null }>(
    "betaalpagina opgeslagen gegevens",
    async () => {
      const sb = createServiceClient();
      const res = await sb
        .from("orders")
        .select("paytail_details")
        .eq("id", orderId)
        .eq("shop_id", SHOP_ID)
        .maybeSingle();
      return { data: res.data as { paytail_details: Record<string, unknown> | null } | null, error: res.error };
    }
  );
  return rij?.paytail_details || null;
}

/**
 * Houdt bij of de bankgegevens naar de klant zijn gemaild.
 *
 * Bij succes komt de datum erin en gaat er nooit meer een mail uit. Bij een
 * mislukking tellen we de poging, want zonder die teller probeerde elke
 * paginalading het opnieuw: een onbezorgbaar adres of een haperende relay gaf
 * zo een rij mislukte mails op dezelfde bestelling.
 */
export async function markeerGegevensMail(orderId: string, gelukt: boolean): Promise<void> {
  try {
    const sb = createServiceClient();
    const huidig = (await getPaytailDetails(orderId)) || {};
    const bij = gelukt
      ? { gegevens_gemaild_op: new Date().toISOString() }
      : { gegevens_mail_pogingen: Number(huidig.gegevens_mail_pogingen || 0) + 1 };
    const { error } = await sb
      .from("orders")
      .update({ paytail_details: { ...huidig, ...bij } })
      .eq("id", orderId)
      .eq("shop_id", SHOP_ID);
    if (error) console.error("betaalpagina: mailmarkering opslaan mislukte", error);
  } catch (e) {
    console.error("betaalpagina: mailmarkering opslaan gooide", e);
  }
}

