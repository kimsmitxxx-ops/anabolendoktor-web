import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

/**
 * Cache leegmaken op afroep.
 *
 * De publieke pagina's draaien op ISR met een venster van een uur. Dat uur is
 * alleen het vangnet: zodra er in shop-dash iets wijzigt aan een product, blog
 * of categorie POST die hierheen en is de pagina meteen weer vers. Zonder die
 * aanroep zou een prijswijziging tot een uur kunnen blijven hangen, en daar is
 * de klant terecht allergisch voor.
 *
 * Body:
 *   { paths: ["/winkel"] }   losse pagina's
 *   { tags: ["products"] }   losse tags
 *   { all: true }            alles, inclusief de layout
 *
 * De wekelijkse cron gebruikt { all: true } als schoonmaak voor het geval een
 * losse purge ooit is misgegaan.
 *
 * Wat hier NOOIT in de cache komt en dus ook niet gepurged hoeft te worden:
 * winkelwagen, checkout, bedankpagina en account. Die staan op force-dynamic.
 */
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const token =
    req.headers.get("x-revalidate-token") || req.nextUrl.searchParams.get("token");
  const expected = process.env.REVALIDATE_TOKEN;
  if (!expected) {
    return NextResponse.json({ error: "REVALIDATE_TOKEN niet geconfigureerd" }, { status: 500 });
  }
  if (token !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const paths: string[] = Array.isArray(body?.paths) ? body.paths : [];
  const tags: string[] = Array.isArray(body?.tags) ? body.tags : [];
  const all = body?.all === true;

  if (all) {
    // "layout" raakt alles eronder, dus dit leegt de hele site in een keer.
    try {
      revalidatePath("/", "layout");
    } catch {}
  }

  for (const p of paths) {
    try {
      revalidatePath(p, "page");
    } catch {}
  }
  for (const t of tags) {
    try {
      revalidateTag(t);
    } catch {}
  }

  return NextResponse.json({ ok: true, revalidated: { all, paths, tags }, at: new Date().toISOString() });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    hint: "POST met header x-revalidate-token en body { all: true } of { paths: [...] }",
  });
}
