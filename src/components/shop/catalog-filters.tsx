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

      {/* Geen merk-, stof- of verzendlocatiefilter: die horen bij de
          anabolenpro-catalogus. Het stoffilter bood hier zelfs knoppen als
          Testosteron en Anavar aan, op een site die geen anabolen verkoopt.
          Drie categorieen en een voorraadvinkje zijn genoeg. */}
    </div>
  );
}
