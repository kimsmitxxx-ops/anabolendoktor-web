import { MetadataRoute } from "next";
import { listProducts, listCategories, listBlogPosts } from "@/lib/queries";
import { STATIC_ROUTES } from "@/lib/static-routes.generated";
import { ADVIES } from "@/lib/advies-content";

const BASE = "https://anabolendoktor.com";

// Bij elke aanvraag opbouwen: een nieuw product of een nieuwe blog staat er dan
// meteen in, zonder een uur te wachten of opnieuw te deployen.
export const dynamic = "force-dynamic";
export const revalidate = 0;

const PRIORITY: Record<string, number> = {
  "/": 1.0,
  "/consult": 0.95,
  "/advies": 0.9,
  "/winkel": 0.9,
  "/kennisbank": 0.8,
  "/lab": 0.7,
  "/risicos-en-bijwerkingen": 0.7,
  "/over-ons": 0.4,
  "/bezorging": 0.4,
  "/retourneren": 0.4,
  "/contact": 0.3,
  "/voorwaarden": 0.2,
  "/privacy": 0.2,
  "/cookies": 0.2,
};

const FREQ: Record<string, "daily" | "weekly" | "monthly"> = {
  "/": "daily",
  "/winkel": "daily",
  "/kennisbank": "weekly",
  "/advies": "weekly",
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories, blogs] = await Promise.all([
    listProducts({ limit: 500 }),
    listCategories(),
    listBlogPosts(200),
  ]);

  // Was een handmatige lijst van zeven pagina's; onder meer /consult, /privacy
  // en /voorwaarden ontbraken daardoor in de sitemap. Nu afgeleid uit src/app.
  const staticRoutes = STATIC_ROUTES.map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: FREQ[path] || ("monthly" as const),
    priority: PRIORITY[path] ?? 0.5,
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${BASE}/winkel/${c.slug}`,
    changeFrequency: "daily" as const,
    priority: 0.85,
  }));

  // Alleen index-baar (UT-merk) producten in sitemap. noindex=true wordt
  // expliciet uitgesloten zodat Google ze niet via sitemap ontdekt.
  const productRoutes = products
    .filter((p: any) => p.noindex !== true)
    .map((p) => ({
      url: `${BASE}/product/${p.categories?.slug || "winkel"}/${p.slug || p.sku}`,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    }));

  const blogRoutes = blogs.map((b) => ({
    url: `${BASE}/kennisbank/${b.slug}`,
    lastModified: new Date(b.published_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Adviespagina's staan in code en niet in de database, dus gen-routes pikt ze
  // niet op: dat script slaat dynamische segmenten over. Hier expliciet erbij.
  const adviesRoutes = ADVIES.map((a) => ({
    url: `${BASE}/advies/${a.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...adviesRoutes, ...categoryRoutes, ...productRoutes, ...blogRoutes];
}
