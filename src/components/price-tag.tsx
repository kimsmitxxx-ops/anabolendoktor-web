import { cn } from "@/lib/utils";
import { formatEUR } from "./lib/format";

export type PriceTagVariant = "single" | "from" | "range" | "bulk";

export interface BulkTier {
  qty: number;
  price: number;
  previousPrice?: number;
}

export interface PriceTagProps {
  variant?: PriceTagVariant;
  price?: number;
  priceFrom?: number;
  priceTo?: number;
  tiers?: BulkTier[];
  className?: string;
}

export function PriceTag({
  variant = "single",
  price,
  priceFrom,
  priceTo,
  tiers,
  className,
}: PriceTagProps) {
  if (variant === "from") {
    return (
      <span className={cn("tabular text-primary font-semibold", className)}>
        <span className="text-text-muted text-sm font-normal mr-1">vanaf</span>
        {formatEUR(priceFrom ?? 0)}
      </span>
    );
  }
  if (variant === "range") {
    return (
      <span className={cn("tabular text-primary font-semibold", className)}>
        {formatEUR(priceFrom ?? 0)}
        <span className="mx-1.5 text-text-subtle">-</span>
        {formatEUR(priceTo ?? 0)}
      </span>
    );
  }
  if (variant === "bulk") {
    return (
      <ul className={cn("space-y-1.5", className)}>
        {(tiers ?? []).map((t) => (
          <li key={t.qty} className="flex items-baseline gap-2 tabular">
            <span className="text-sm text-text-muted w-16">{t.qty}× stuks</span>
            <span className="text-primary font-semibold">{formatEUR(t.price)}</span>
            {t.previousPrice != null && (
              <span className="text-text-subtle line-through text-sm">
                {formatEUR(t.previousPrice)}
              </span>
            )}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <span className={cn("tabular text-primary font-semibold", className)}>
      {formatEUR(price ?? 0)}
    </span>
  );
}

export default PriceTag;
