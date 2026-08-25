"use client";
import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import { Check, Tag as TagIcon, Beaker, Truck } from "lucide-react";
import { brandLabel } from "@/lib/brands";

// Bekende stoffen voor de stof-filter chips. Slug = filter-value (matched
// case-insensitive tegen product.name in listProducts).
const STOF_FILTERS: { slug: string; label: string }[] = [
  { slug: "testosteron", label: "Testosteron" },
  { slug: "anavar", label: "Anavar" },
  { slug: "dianabol", label: "Dianabol" },
  { slug: "boldenone", label: "Boldenone" },
  { slug: "trenbolone", label: "Trenbolone" },
  { slug: "nandrolon", label: "Deca/NPP" },
  { slug: "winstrol", label: "Winstrol" },
  { slug: "masteron", label: "Masteron" },
  { slug: "primobolan", label: "Primobolan" },
  { slug: "sustanon", label: "Sustanon" },
  { slug: "clomid", label: "Clomid" },
  { slug: "nolvadex", label: "Nolvadex" },
  { slug: "arimidex", label: "Arimidex" },
  { slug: "hcg", label: "HCG" },
];

interface Props {
  brands: string[];
  stockOnly: boolean;
  activeBrand: string;
  activeStof?: string;
  activeLocatie?: string;
}

export function CatalogFilters({ brands, stockOnly, activeBrand, activeStof = "", activeLocatie = "" }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const setParam = useCallback(
    (key: string, value: string | null) => {
      if (typeof window === "undefined") return;
      const p = new URLSearchParams(window.location.search);
      if (value === null || value === "") p.delete(key);
      else p.set(key, value);
      const qs = p.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname],
  );

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-surface p-4">
        <h4 className="text-xs uppercase tracking-wider text-accent-muted font-semibold mb-3">
          Beschikbaarheid
        </h4>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <button
            type="button"
            onClick={() => setParam("stock", stockOnly ? null : "1")}
            aria-pressed={stockOnly}
            className={`relative h-4 w-4 rounded border ${
              stockOnly ? "border-accent bg-accent" : "border-border-strong bg-background"
            }`}
          >
            {stockOnly && <Check size={12} strokeWidth={3} className="absolute inset-0 m-auto text-accent-foreground" />}
          </button>
          <span>Alleen op voorraad</span>
        </label>
      </div>

      {brands.length > 0 && (
        <div className="rounded-lg border border-border bg-surface p-4">
          <h4 className="text-xs uppercase tracking-wider text-accent-muted font-semibold mb-3 inline-flex items-center gap-1.5">
            <TagIcon size={12} /> Merk
          </h4>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setParam("merk", null)}
              className={`rounded-full px-3 py-1 text-xs font-medium border ${
                !activeBrand
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-background text-text border-border hover:border-accent hover:text-accent"
              }`}
            >
              Alle
            </button>
            {brands.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setParam("merk", b === activeBrand ? null : b)}
                className={`rounded-full px-3 py-1 text-xs font-medium border ${
                  activeBrand === b
                    ? "bg-accent text-accent-foreground border-accent"
                    : "bg-background text-text border-border hover:border-accent hover:text-accent"
                }`}
                title={b}
              >
                {brandLabel(b)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Geen verzendlocatie-filter: dat onderscheid hoort bij het
          twee-magazijnenmodel van anabolenpro. Hier is een verzendlocatie. */}
      {/* Stof-filter - geen aparte pagina, alleen ?stof=... query-param */}
      <div className="rounded-lg border border-border bg-surface p-4">
        <h4 className="text-xs uppercase tracking-wider text-accent-muted font-semibold mb-3 inline-flex items-center gap-1.5">
          <Beaker size={12} /> Stof
        </h4>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setParam("stof", null)}
            className={`rounded-full px-3 py-1 text-xs font-medium border ${
              !activeStof
                ? "bg-accent text-accent-foreground border-accent"
                : "bg-background text-text border-border hover:border-accent hover:text-accent"
            }`}
          >
            Alle
          </button>
          {STOF_FILTERS.map((s) => (
            <button
              key={s.slug}
              type="button"
              onClick={() => setParam("stof", s.slug === activeStof ? null : s.slug)}
              className={`rounded-full px-3 py-1 text-xs font-medium border ${
                activeStof === s.slug
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-background text-text border-border hover:border-accent hover:text-accent"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
