import { MetadataRoute } from "next";
import { getShop } from "@/lib/queries";

export const revalidate = 600;

export default async function robots(): Promise<MetadataRoute.Robots> {
  const shop = await getShop().catch(() => null);
  // Fail-open: bij een DB-fout (shop === null) NIET de hele live site
  // de-indexeren met een Disallow: / die 10 minuten blijft staan.
  const noindex = shop?.noindex ?? false;

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
      // Zoekbots van Google en Bing, plus de AI-antwoordbots die een pagina
      // ophalen als een gebruiker er een vraag over stelt.
      { userAgent: ["Googlebot", "Googlebot-Image", "Bingbot"], allow: "/", disallow: ["/api/"] },
      { userAgent: ["OAI-SearchBot", "ChatGPT-User", "Claude-User", "Claude-SearchBot", "PerplexityBot"], allow: "/", disallow: ["/api/"] },
      // AI-trainingscrawlers: bewust toegestaan, anders komen we niet in de
      // modellen en dus niet in de AI-antwoorden terecht. robots.txt is
      // hiervoor niet genoeg: Cloudflare geeft GPTBot, ClaudeBot en CCBot
      // een 403 zolang "Block AI bots" bij Security > Bots aanstaat.
      { userAgent: ["GPTBot", "ClaudeBot", "Google-Extended", "Applebot-Extended", "CCBot"], allow: "/", disallow: ["/api/"] },
    ],
    sitemap: "https://anabolendoktor.com/sitemap.xml",
    host: "https://anabolendoktor.com",
  };
}
