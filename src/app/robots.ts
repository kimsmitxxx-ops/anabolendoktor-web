import { MetadataRoute } from "next";
import { getShop } from "@/lib/queries";

export const revalidate = 600;

export default async function robots(): Promise<MetadataRoute.Robots> {
  const shop = await getShop().catch(() => null);
  const noindex = shop?.noindex ?? true;

  if (noindex) {
  // Account en checkout stonden hier geblokkeerd terwijl ze zelf
  // "index, follow" meegaven. Google nam de URL dan op zonder hem te kunnen
  // lezen. Ze zijn nu crawlbaar met een noindex-laag in hun eigen layout,
  // wat de enige manier is waarop Google ze er echt uit haalt.
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
    ],
    sitemap: "https://anabolendoktor.com/sitemap.xml",
    host: "https://anabolendoktor.com",
  };
}
