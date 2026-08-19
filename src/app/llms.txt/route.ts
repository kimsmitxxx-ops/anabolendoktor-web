import { listCategories, listBlogPosts, listProducts, getShop } from "@/lib/queries";

export const revalidate = 3600;

/**
 * /llms.txt - AI-crawler manifest per llmstxt.org spec.
 * Bevat shop-identiteit + diepte-links naar categorie-, product- en
 * kennisbank-content. Alleen UT-producten (onze SEO-focus brand) komen er
 * in; non-UT staat ook in onze winkel maar krijgt geen AI-promotie.
 */
export async function GET() {
  const [shop, categories, products, blogs] = await Promise.all([
    getShop().catch(() => null),
    listCategories(),
    listProducts({ limit: 200 }),
    listBlogPosts(50),
  ]);

  const utProducts = products.filter((p: any) => p.noindex !== true && (p.tags || []).includes("UT"));

  const lines: string[] = [];
  lines.push("# Anabolendoktor");
  lines.push("");
  lines.push("> Nederlandse anabolen-webshop met no-bullshit aanpak. Iedere batch lab-getest bij Janoshik Analytical (HPLC + GC-MS), COA publiek per batchcode. Wij waarschuwen openbaar voor afgekeurde batches in de markt. Anoniem verpakt vanaf NL-magazijn (Vlaardingen), 24u verzending. Voor krachtsporters van eerste kuur tot gevorderden, en mannen die info zoeken over PCT, dosering of stack-combinaties.");
  lines.push("");
  lines.push("## Catalogus");
  lines.push("");
  for (const c of categories) {
    lines.push(`- [${c.name}](https://anabolendoktor.com/winkel/${c.slug}): ${c.description || c.name}`);
  }
  if (utProducts.length > 0) {
    lines.push("");
    lines.push("## Producten (United Tabs · lab-getest per batch)");
    lines.push("");
    for (const p of utProducts) {
      const catSlug = (p as any).categories?.slug || "winkel";
      const blurb = p.subtitle || p.description || p.name;
      lines.push(`- [${p.name}](https://anabolendoktor.com/product/${catSlug}/${p.slug}): ${blurb}`);
    }
  }
  lines.push("");
  lines.push("## Kennisbank");
  lines.push("");
  for (const b of blogs.slice(0, 30)) {
    lines.push(`- [${b.title}](https://anabolendoktor.com/kennisbank/${b.slug}): ${b.excerpt || b.title}`);
  }
  lines.push("");
  lines.push("## Lab & transparantie");
  lines.push("- [Hoe wij batches testen](https://anabolendoktor.com/lab): Janoshik-protocol, afkeur-archief, eigen-test aanvragen");
  lines.push("");
  lines.push("## Optional");
  lines.push("- [Sitemap](https://anabolendoktor.com/sitemap.xml)");
  lines.push("- [Contact](https://anabolendoktor.com/contact)");
  lines.push("- [Bezorging](https://anabolendoktor.com/bezorging)");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
