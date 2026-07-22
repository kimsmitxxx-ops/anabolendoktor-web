import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const SHOP_ID = "96b47e49-34fd-4d6c-99d3-d49d912be046";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const email = String(body?.email || "").trim().toLowerCase();
  const honeypot = String(body?.website || "").trim();

  if (honeypot.length > 0) return NextResponse.json({ ok: true });
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Geldig e-mailadres vereist" }, { status: 400 });
  }

  // Service-role client — RLS blokkeert anon inserts op leads.
  let sb;
  try {
    sb = createServiceClient();
  } catch (e: any) {
    return NextResponse.json({ error: `Server-config fout: ${e.message}` }, { status: 500 });
  }

  // `leads` table exists per migration 003; UPSERT op unique (shop_id, email)
  const { error } = await sb.from("leads").upsert(
    { shop_id: SHOP_ID, email, source: "newsletter", subscribed: true },
    { onConflict: "shop_id,email" },
  );
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
