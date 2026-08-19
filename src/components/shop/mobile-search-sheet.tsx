"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Search, ArrowRight, X } from "lucide-react";
import { products } from "./data";

export interface MobileSearchSheetProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export function MobileSearchSheet({ open, onOpenChange }: MobileSearchSheetProps) {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(t) ||
          p.category.toLowerCase().includes(t) ||
          p.categorySlug.toLowerCase().includes(t),
      )
      .slice(0, 12);
  }, [q]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="top"
        className="w-full sm:max-w-none h-[55vh] p-0 bg-background flex flex-col rounded-b-2xl"
      >
        <header className="px-4 pt-3 pb-3 pr-12 border-b border-border flex items-center gap-2">
          <SheetTitle className="sr-only">Zoek producten</SheetTitle>
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-accent-muted" />
            <input
              autoFocus
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Zoek producten - bv. testosteron, anavar"
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
              <p className="text-xs uppercase tracking-wider text-text-muted mb-2">Populair</p>
              <div className="flex flex-wrap gap-2">
                {["Testosteron", "Trenbolone", "Anavar", "Dianabol", "Winstrol", "PCT"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setQ(t)}
                    className="px-3 h-8 rounded-full border border-border bg-surface text-sm text-text hover:border-accent"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <p className="text-sm text-text-muted">Geen resultaten voor "{q}".</p>
          ) : (
            <ul className="divide-y divide-border">
              {results.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/product/${p.categorySlug}/${p.slug}`}
                    onClick={() => onOpenChange(false)}
                    className="flex items-center gap-3 py-3 hover:bg-muted/40 rounded px-2"
                  >
                    <img loading="lazy" decoding="async" src={p.image} alt={p.name} className="h-10 w-10 rounded object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-text truncate">{p.name}</p>
                      <p className="text-xs text-text-muted truncate">{p.category}</p>
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

export default MobileSearchSheet;
