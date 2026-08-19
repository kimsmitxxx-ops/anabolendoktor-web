/**
 * Glossary hover-tooltip helper.
 *
 * Neemt een HTML-string en wrapt de eerste voorkomen van elke bekende term
 * in een <abbr title="korte definitie"> tag. De browser toont dan zijn
 * native tooltip on hover - geen JS-client-component nodig. globals.css
 * styled `abbr[title]` als een dotted-underlined klikbare hint.
 *
 * Wordt gebruikt in blog- en kennis-body's die via dangerouslySetInnerHTML
 * gerenderd worden. Alleen buiten <a>, <h*>, <code> en al bestaande <abbr>
 * tags wrappen zodat we geen dubbele decoratie of nested links krijgen.
 */

type GlossaryEntry = { term: string; short: string; slug: string };

// Volgorde matters - langste eerst zodat "GLP-1" niet als "GLP" gematcht wordt.
export const GLOSSARY: GlossaryEntry[] = [
  { slug: "aas", term: "AAS", short: "Anabole-Androgene Steroïden - synthetische testosteron-derivaten" },
  { slug: "aromatisatie", term: "aromatisatie", short: "Omzetting van testosteron naar oestradiol" },
  { slug: "ai", term: "aromatase-remmer", short: "Middel dat oestrogeen-vorming blokkeert (bijv. Anastrozol)" },
  { slug: "pct", term: "PCT", short: "Post-Cycle Therapy - nakuur om natuurlijke test te herstellen" },
  { slug: "pct", term: "nakuur", short: "Post-Cycle Therapy om HPTA-as te herstellen" },
  { slug: "hpta", term: "HPTA-as", short: "Hypothalamus-hypofyse-testes-feedback-loop" },
  { slug: "hpta", term: "HPTA", short: "Hypothalamus-hypofyse-testes-feedback-loop" },
  { slug: "suppressie", term: "suppressie", short: "Onderdrukking natuurlijke testosteron-productie tijdens cycle" },
  { slug: "ester", term: "ester", short: "Vetzuurketen aan AAS die release-tijd bepaalt" },
  { slug: "half-life", term: "half-life", short: "Tijd tot 50% van dosis is afgebroken" },
  { slug: "half-life", term: "halfwaardetijd", short: "Tijd tot 50% van dosis is afgebroken" },
  { slug: "bloedwerk", term: "bloedwerk", short: "Labwaardes tijdens/rond een cycle" },
  { slug: "e2", term: "oestradiol", short: "Actieve oestrogeen-vorm, streef 20-40 pg/ml tijdens cycle" },
  { slug: "e2", term: "E2", short: "Oestradiol - actieve oestrogeen-vorm" },
  { slug: "shbg", term: "SHBG", short: "Sex Hormone Binding Globulin - bindt testosteron in bloed" },
  { slug: "hematocriet", term: "hematocriet", short: "Percentage rode bloedcellen - max 54%, boven = bloed doneren" },
  { slug: "gynecomastie", term: "gynecomastie", short: "Borstweefselvorming door verhoogd oestradiol of prolactine" },
  { slug: "gynecomastie", term: "gyno", short: "Gynecomastie - borstweefselvorming door E2 of prolactine" },
  { slug: "clomid", term: "Clomid", short: "Clomifeen - SERM voor PCT" },
  { slug: "clomid", term: "Clomifeen", short: "Clomid - SERM voor PCT" },
  { slug: "nolvadex", term: "Nolvadex", short: "Tamoxifen - SERM voor PCT en gyno-behandeling" },
  { slug: "nolvadex", term: "Tamoxifen", short: "Nolvadex - SERM voor PCT en gyno-behandeling" },
  { slug: "serm", term: "SERM", short: "Selectieve oestrogeen-receptor modulator (Clomid, Nolvadex)" },
  { slug: "hcg", term: "hCG", short: "Zwangerschapshormoon dat testes actief houdt tijdens cycle" },
  { slug: "janoshik", term: "Janoshik", short: "Tsjechisch lab voor HPLC-analyse van AAS en peptiden" },
  { slug: "hplc", term: "HPLC", short: "High-Performance Liquid Chromatography - zuiverheids-analyse" },
  { slug: "coa", term: "COA", short: "Certificate of Analysis - batch-labrapport" },
  { slug: "batchcode", term: "batchcode", short: "Unieke code per productie-batch, verwijst naar lab-rapport" },
  { slug: "kickstart", term: "oral kickstart", short: "Oral compound de eerste 4-6 weken van een cycle" },
  { slug: "recomp", term: "recomp", short: "Recompositie - tegelijk vet kwijt en spier erbij" },
  { slug: "trt", term: "TRT-dose", short: "Testosterone Replacement Therapy-dosering (100-200 mg/wk)" },
  { slug: "stack", term: "stack", short: "Combinatie van meerdere AAS-compounds" },
  { slug: "blend", term: "blend", short: "Mix van meerdere esters in één flacon (bijv. Sustanon)" },
  { slug: "kuur", term: "kuur", short: "Cycle - periode waarin AAS gebruikt wordt" },
  { slug: "kuur", term: "cycle", short: "Kuur - periode waarin AAS gebruikt wordt" },
  { slug: "bulk", term: "bulk", short: "Cycle in caloriesurplus gericht op massa & kracht" },
  { slug: "cutting", term: "cutting", short: "Cycle in caloriedeficit gericht op vetverlies met spierbehoud" },
  { slug: "androgeen", term: "androgeen", short: "Vermannelijkende hormonen - o.a. testosteron" },
  { slug: "lh", term: "LH", short: "Luteïniserend Hormoon - triggert Leydig-cellen tot test-productie" },
  { slug: "fsh", term: "FSH", short: "Follikel Stimulerend Hormoon - voor spermatogenese" },
];

// Zorg dat langste term eerst gematcht wordt.
const SORTED = [...GLOSSARY].sort((a, b) => b.term.length - a.term.length);

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const escapeAttr = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/**
 * Wrapt de eerste voorkomen van elke bekende term in <abbr title="...">.
 * Skipt content binnen <a>, <h1-6>, <code>, <abbr>, en attribuut-waardes.
 * Werkt op HTML-string voordat je 'm door dangerouslySetInnerHTML rendert.
 */
export function highlightGlossary(html: string): string {
  if (!html) return html;

  // Splits op tags - alleen tekst-nodes bewerken zodat we geen attrs breken.
  const parts = html.split(/(<[^>]+>)/g);

  const wrapped = new Set<string>();
  // Skip-stack: welke omhullende tags mogen niet gematcht worden
  const skipTags = new Set(["a", "abbr", "h1", "h2", "h3", "h4", "h5", "h6", "code", "pre"]);
  const openStack: string[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (!part) continue;

    if (part.startsWith("<")) {
      // Tag - update stack
      const closing = part.startsWith("</");
      const tagMatch = part.match(/^<\/?([a-zA-Z][a-zA-Z0-9]*)/);
      if (tagMatch) {
        const tag = tagMatch[1].toLowerCase();
        if (skipTags.has(tag)) {
          if (closing) {
            const idx = openStack.lastIndexOf(tag);
            if (idx !== -1) openStack.splice(idx, 1);
          } else if (!part.endsWith("/>")) {
            openStack.push(tag);
          }
        }
      }
      continue;
    }

    // Tekst-node - skip als we in een skip-tag zitten
    if (openStack.length > 0) continue;

    let text = part;
    for (const entry of SORTED) {
      if (wrapped.has(entry.slug)) continue;
      const rx = new RegExp(`(^|[^a-zA-Z0-9À-ÿ])(${escapeRegex(entry.term)})(?=[^a-zA-Z0-9À-ÿ]|$)`, "i");
      const m = rx.exec(text);
      if (!m) continue;
      const before = m[1];
      const matched = m[2];
      const start = m.index + before.length;
      const end = start + matched.length;
      text =
        text.slice(0, start) +
        `<abbr title="${escapeAttr(entry.short)}">${matched}</abbr>` +
        text.slice(end);
      wrapped.add(entry.slug);
    }
    parts[i] = text;
  }

  return parts.join("");
}
