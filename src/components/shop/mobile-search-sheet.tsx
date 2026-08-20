"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Search, ArrowRight, X, Loader2 } from "lucide-react";

export interface MobileSearchSheetProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

interface Resultaat {
  naam: string;
  slug: string;
  subtitel: string | null;
  afbeelding: string | null;
  prijs_cent: number;
  categorie: string | null;
  categorieSlug: string;
}

/**
 * Dit scherm zocht in een lijst die niet bestond: het importeerde `products`
 * uit components/shop/data.ts, waar die export nooit heeft gestaan. Omdat de
 * build type-fouten negeert, viel dat pas op als een bezoeker op mobiel begon
 * te typen. Nu wordt er in de echte catalogus gezocht via /api/zoek.
 *
 * De suggesties eronder stonden bovendien vol namen van middelen die deze site
 * niet verkoopt.
 */
const SUGGESTIES = ["Consult", "Bloedonderzoek", "Creatine", "Vitamine D", "Magnesium", "Omega 3"];

export function MobileSearchSheet({ open, onOpenChange }: MobileSearchSheetProps) {
  const [q, setQ] = useState("");
  const [resultaten, setResultaten] = useState<Resultaat[]>([]);
  const [bezig, setBezig] = useState(false);

  useEffect(() => {
    const term = q.trim();
    if (term.length < 2) {
      setResultaten([]);
      setBezig(false);
      return;
    }
    setBezig(true);
    // Even wachten met zoeken, anders vuurt elke toetsaanslag een verzoek af.
    const timer = setTimeout(async () => {
      try {
        const r = await fetch(`/api/zoek?q=${encodeURIComponent(term)}`);
        const j = await r.json();
        setResultaten(j.resultaten || []);
      } catch {
        setResultaten([]);
      } finally {
        setBezig(false);
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [q]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="top"
        className="w-full sm:max-w-none h-[55vh] p-0 bg-background flex flex-col rounded-b-2xl"
      >
        <header className="px-4 pt-3 pb-3 pr-12 border-b border-border flex items-center gap-2">
          <SheetTitle className="sr-only">Zoeken in het aanbod</SheetTitle>
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-accent-muted" />
            <input
              autoFocus
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Zoek in het aanbod, bijvoorbeeld consult of creatine"
              className="w-full h-11 pl-10 pr-9 rounded-md border border-accent/40 bg-success-soft text-sm font-medium text-primary placeholder:text-primary/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            />
            {q && (
              <button
                type="button"
                onClick={() => setQ("")}
                aria-label="Wis zoekopdracht"
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-6 w-6 items-center justify-center rounded-full text-primary/70 hover:bg-primary/10"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          {!q.trim() ? (
            <div>
              <p className="text-xs uppercase tracking-wider text-text-muted mb-2">Veel gezocht</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setQ(t)}
                    className="px-3 h-8 rounded-full border border-border bg-surface text-sm text-text hover:border-accent"
                  >
                    {t}
                  </button>
                ))}
              </div>
              <p className="mt-6 text-xs leading-relaxed text-text-subtle">
                Zoekt u informatie in plaats van een product, kijk dan bij{" "}
                <Link href="/advies" onClick={() => onOpenChange(false)} className="text-accent">
                  advies
                </Link>{" "}
                of doe de{" "}
                <Link href="/keuzehulp" onClick={() => onOpenChange(false)} className="text-accent">
                  keuzehulp
                </Link>
                .
              </p>
            </div>
          ) : bezig ? (
            <p className="flex items-center gap-2 text-sm text-text-muted">
              <Loader2 size={14} className="animate-spin" /> Zoeken
            </p>
          ) : resultaten.length === 0 ? (
            <p className="text-sm text-text-muted">Geen resultaten voor {q}.</p>
          ) : (
            <ul className="divide-y divide-border">
              {resultaten.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/product/${p.categorieSlug}/${p.slug}`}
                    onClick={() => onOpenChange(false)}
                    className="flex items-center gap-3 py-3 hover:bg-muted/40 rounded px-2"
                  >
                    {p.afbeelding ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img loading="lazy" decoding="async" src={p.afbeelding} alt={p.naam} className="h-10 w-10 rounded object-cover" />
                    ) : (
                      <span className="flex h-10 w-10 items-center justify-center rounded bg-muted text-xs text-text-subtle">
                        {p.naam.slice(0, 1)}
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-text truncate">{p.naam}</p>
                      <p className="text-xs text-text-muted truncate">{p.categorie || p.subtitel}</p>
                    </div>
                    <ArrowRight size={14} className="text-text-muted shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
