import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Refresht Supabase sessie-cookie bij elke request → users blijven ingelogd
// zolang refresh-token geldig is. Defensive: crash NOOIT op missende env of
// Supabase fout - geeft altijd NextResponse.next() terug zodat de site
// overeind blijft als auth-laag offline is.
export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return res;
  try {
    const sb = createServerClient(url, anon, {
      cookies: {
        get(name) { return request.cookies.get(name)?.value; },
        set(name, value, options) { res.cookies.set({ name, value, ...options }); },
        remove(name, options) { res.cookies.set({ name, value: "", ...options, maxAge: 0 }); },
      },
    });
    await sb.auth.getUser();
  } catch {}
  return res;
}

export const config = {
  matcher: ["/((?!_next/|api/|favicon|robots.txt|sitemap.xml|llms.txt|media/|.*\\..*).*)"],
};
