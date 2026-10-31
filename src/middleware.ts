import { NextResponse, type NextRequest } from "next/server";
import {
  COOKIE_TOEGANG,
  COOKIE_TOEGANG_OPTIES,
  COOKIE_VERNIEUW,
  COOKIE_VERNIEUW_OPTIES,
  restgeldigheid,
  vernieuwTokens,
} from "@/lib/sessie-kern";

/**
 * Houdt de sessie van een ingelogde klant geldig.
 *
 * Hiervoor ververste @supabase/ssr hier het sessiecookie van Supabase. Dat
 * cookie heette sb-<projectnaam>-auth-token en stond dus in de cookie-jar van
 * elke klant; de browser praatte er zelf voor met de authenticatieserver. Nu
 * zijn het onze eigen cookies en gaat het verversen hier, want een server
 * component mag geen cookies zetten. Faalt het, dan blijft de site staan en
 * moet de klant opnieuw inloggen.
 */
export async function middleware(request: NextRequest) {
  const res = NextResponse.next();

  try {
    const toegang = request.cookies.get(COOKIE_TOEGANG)?.value;
    const vernieuw = request.cookies.get(COOKIE_VERNIEUW)?.value;
    if (vernieuw && (!toegang || restgeldigheid(toegang) < 300)) {
      const tokens = await vernieuwTokens(vernieuw);
      if (tokens) {
        res.cookies.set({ name: COOKIE_TOEGANG, value: tokens.access_token, ...COOKIE_TOEGANG_OPTIES });
        res.cookies.set({ name: COOKIE_VERNIEUW, value: tokens.refresh_token, ...COOKIE_VERNIEUW_OPTIES });
      } else {
        res.cookies.set({ name: COOKIE_TOEGANG, value: "", path: "/", maxAge: 0 });
        res.cookies.set({ name: COOKIE_VERNIEUW, value: "", path: "/", maxAge: 0 });
      }
    }
  } catch {}

  return res;
}

export const config = {
  matcher: ["/((?!_next/|api/|favicon|robots.txt|sitemap.xml|llms.txt|media/|img/|bestand/|.*\\..*).*)"],
};
