/**
 * Leidt de lijst met statische pagina's af uit src/app en schrijft die naar
 * src/lib/static-routes.generated.ts.
 *
 * Waarom: de sitemap had een handmatige STATIC_PATHS-lijst. Wie een pagina
 * toevoegde en die lijst vergat, had een pagina die Google nooit aangeboden
 * kreeg. Nu volgt de lijst uit de bestanden zelf, dus een nieuwe map met een
 * page.tsx staat er automatisch in.
 *
 * Draait via het prebuild-script, dus bij elke deploy opnieuw. Dat is voor
 * statische pagina's ook het juiste moment: eerder dan de deploy bestaat de
 * pagina immers niet. Content uit Supabase (blogs, producten) komt niet hier
 * vandaan maar wordt live in de sitemap opgehaald.
 */
import fs from "fs";
import path from "path";

const APP_DIR = path.join(process.cwd(), "src", "app");
const OUT = path.join(process.cwd(), "src", "lib", "static-routes.generated.ts");

// Pagina's die niet in de sitemap horen: transactiestappen en alles achter een
// login. Een dynamisch segment ([slug]) slaan we altijd over -- die URL's komen
// uit de database en worden in de sitemap zelf opgehaald.
const EXCLUDE = new Set([
  "/checkout",
  "/account",
  "/bedankt",
  "/winkelmand",
  "/cart",
]);

function isExcluded(route) {
  return [...EXCLUDE].some((e) => route === e || route.startsWith(`${e}/`));
}

function walk(dir, segments = [], out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const name = entry.name;
    // Dynamische segmenten en private mappen overslaan.
    if (name.startsWith("[") || name.startsWith("_") || name.startsWith(".")) continue;
    // Route groups (map) tellen niet mee in het pad.
    const isGroup = name.startsWith("(") && name.endsWith(")");
    const nextSegments = isGroup ? segments : [...segments, name];
    const child = path.join(dir, name);
    if (fs.existsSync(path.join(child, "page.tsx")) || fs.existsSync(path.join(child, "page.ts"))) {
      const route = "/" + nextSegments.join("/");
      if (!isExcluded(route)) out.push(route);
    }
    walk(child, nextSegments, out);
  }
  return out;
}

const routes = ["/", ...walk(APP_DIR)].filter((r, i, a) => a.indexOf(r) === i).sort();

const body = `// AUTOMATISCH GEGENEREERD door scripts/gen-routes.mjs -- niet met de hand aanpassen.
// Wordt bij elke build opnieuw afgeleid uit de mappen in src/app, zodat een
// nieuwe pagina vanzelf in de sitemap belandt.
export const STATIC_ROUTES: string[] = ${JSON.stringify(routes, null, 2)};
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, body);
console.log(`gen-routes: ${routes.length} statische pagina's -> ${path.relative(process.cwd(), OUT)}`);
for (const r of routes) console.log("  " + r);
