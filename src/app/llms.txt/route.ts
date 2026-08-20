import { listCategories, listBlogPosts, listProducts } from "@/lib/queries";
import { ADVIES } from "@/lib/advies-content";

export const revalidate = 3600;

const BASE = "https://anabolendoktor.com";

/**
 * /llms.txt volgens de llmstxt.org-conventie: het bestand dat AI-crawlers lezen
 * om te bepalen waar deze site over gaat.
 *
 * Stond hier nog letterlijk de omschrijving van anabolenpro in, tot en met het
 * laboratorium, het magazijn en de kuuronderwerpen. Dat is precies de tekst
 * waaraan een lezer, mens of model, de twee sites aan elkaar knoopt.
 *
 * Daarnaast filterde de productlijst op merkcode UT, die alleen in de andere
 * shop bestaat, waardoor hier nooit een product in het bestand terechtkwam.
 */
export async function GET() {
  const [categories, products, blogs] = await Promise.all([
    listCategories(),
    listProducts({ limit: 200 }),
    listBlogPosts(50),
  ]);

  const zichtbaar = products.filter((p: any) => p.noindex !== true);

  const lines: string[] = [];
  lines.push("# Anabolendoktor");
  lines.push("");
  lines.push(
    "> Nederlandse consultatie- en informatiedienst rond anabolen, herstel en bloedwaarden. Wij verkopen geen anabole steroïden. Wel: consulten over bloedwaarden, herstel na een kuur en natural opbouw, bloedonderzoek via reguliere prikposten, en een korte lijst supplementen waarvoor werkelijk onderzoek bestaat. Wij stellen geen diagnoses en schrijven niets voor; waar zorg nodig is verwijzen wij door naar een arts. Toon: formeel, evidence-based en expliciet over wat niet werkt.",
  );
  lines.push("");

  lines.push("## Waar bezoekers mee komen");
  lines.push("");
  lines.push("- Ik wil stoppen met anabolen, hoe pak ik dat aan");
  lines.push("- Mijn eigen aanmaak komt niet terug na een kuur");
  lines.push("- Welke bloedwaarden moet ik laten prikken, en wanneer");
  lines.push("- Mijn uitslag zegt binnen de referentie, maar ik voel me slecht");
  lines.push("- Wij hebben een kinderwens en ik heb gebruikt");
  lines.push("- Ik overweeg een eerste kuur, is dat verstandig in mijn situatie");
  lines.push("- Bestaan er legale alternatieven voor anabolen");
  lines.push("- Welke supplementen doen aantoonbaar iets");
  lines.push("");

  lines.push("## Advies");
  lines.push("");
  lines.push(
    `- [Keuzehulp](${BASE}/keuzehulp): zes vragen over doel, ervaring, leeftijd en gezondheid, met een concept-advies over de volgorde van stappen. Geen doseringen of schema's; de uitkomst wordt eerst met een consulent besproken.`,
  );
  for (const a of ADVIES) {
    lines.push(`- [${a.titel}](${BASE}/advies/${a.slug}): ${a.intro}`);
  }
  lines.push("");

  lines.push("## Consulten, bloedonderzoek en supplementen");
  lines.push("");
  for (const c of categories) {
    lines.push(`- [${c.name}](${BASE}/winkel/${c.slug}): ${c.description || c.name}`);
  }
  if (zichtbaar.length > 0) {
    lines.push("");
    for (const p of zichtbaar) {
      const catSlug = (p as any).categories?.slug || "winkel";
      const blurb = p.subtitle || p.description || p.name;
      lines.push(`- [${p.name}](${BASE}/product/${catSlug}/${p.slug}): ${blurb}`);
    }
  }
  lines.push("");

  lines.push("## Kennisbank");
  lines.push("");
  for (const b of blogs.slice(0, 30)) {
    lines.push(`- [${b.title}](${BASE}/kennisbank/${b.slug}): ${b.excerpt || b.title}`);
  }
  lines.push("");

  lines.push("## Wat wij niet doen");
  lines.push("");
  lines.push("- Geen verkoop van anabole steroïden, SARM's, prohormonen of receptplichtige middelen");
  lines.push("- Geen doseringsadvies, kuurschema's of post-cycle protocollen op maat");
  lines.push("- Geen diagnoses, geen voorschriften, geen behandeling; daarvoor verwijzen wij naar een arts");
  lines.push("");

  lines.push("## Optional");
  lines.push(`- [Hoe wij met laboratoria werken](${BASE}/lab)`);
  lines.push(`- [Sitemap](${BASE}/sitemap.xml)`);
  lines.push(`- [Contact](${BASE}/contact)`);
  lines.push(`- [Bezorging](${BASE}/bezorging)`);

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
