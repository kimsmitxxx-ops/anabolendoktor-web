import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const SHOP_ID = "96b47e49-34fd-4d6c-99d3-d49d912be046"; // anabolendoktor

/**
 * Zoeken in de catalogus voor het mobiele zoekscherm.
 *
 * Dat scherm draaide op een import `products` uit components/shop/data.ts die
 * daar niet bestaat. In TypeScript stond die fout er al, maar de build negeert
 * type-fouten, dus op mobiel liep het zoeken stuk zodra iemand een letter typte.
 */
export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") || "").trim();
  if (q.length < 2) return NextResponse.json({ resultaten: [] });

  const { data, error } = await supabase
    .from("products")
    .select("name, slug, subtitle, image_url, price_cents, categories(slug, name)")
    .eq("shop_id", SHOP_ID)
    .eq("is_active", true)
    .or(`name.ilike.%${q}%,subtitle.ilike.%${q}%,search_text.ilike.%${q}%`)
    .limit(12);

  if (error) return NextResponse.json({ resultaten: [] });

  const resultaten = (data || []).map((p: any) => ({
    naam: p.name,
    slug: p.slug,
    subtitel: p.subtitle,
    afbeelding: p.image_url,
    prijs_cent: p.price_cents,
    categorie: p.categories?.name || null,
    categorieSlug: p.categories?.slug || "winkel",
  }));

  return NextResponse.json({ resultaten });
}
