import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { listCategories, listProducts, getCategory } from "@/lib/queries";

export const dynamic = "force-dynamic";

/**
 * Diagnose van de datalaag. Stond open voor iedereen en gaf de volledige
 * Supabase-URL plus de eerste 25 tekens van de sleutel terug; op
 * anabolendoktor.com was dat gewoon op te vragen. Nu alleen met het token, en
 * zonder iets van de sleutel: of hij gezet is, is genoeg om een storing te
 * herkennen.
 */
export async function GET(req: NextRequest) {
  const token = process.env.REVALIDATE_TOKEN;
  if (!token || req.nextUrl.searchParams.get("token") !== token) {
    return new NextResponse("Niet gevonden", { status: 404 });
  }

  const env = {
    supabase_url_gezet: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    anon_key_gezet: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    shop_key_gezet: !!process.env.SUPABASE_SHOP_KEY,
  };

  let raw: any = null;
  try {
    const r = await supabase.from("categories").select("slug, name").limit(20);
    raw = { count: r.data?.length, error: r.error?.message, sample: r.data?.slice(0, 3) };
  } catch (e: any) {
    raw = { exception: e.message };
  }

  const cats = await listCategories();
  const kuurpakketten = await getCategory("kuurpakketten");
  const products = await listProducts({ limit: 3 });

  return NextResponse.json({
    env,
    raw_supabase_categories: raw,
    listCategories_count: cats.length,
    listCategories_first: cats.slice(0, 3).map((c) => c.slug),
    getCategory_kuurpakketten_found: !!kuurpakketten,
    getCategory_kuurpakketten_id: kuurpakketten?.id || null,
    listProducts_count: products.length,
    listProducts_first: products.slice(0, 3).map((p) => ({ name: p.name, cat: p.categories?.slug })),
  });
}
