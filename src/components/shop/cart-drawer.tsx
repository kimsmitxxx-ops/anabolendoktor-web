"use client";
import Link from "next/link";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/button";
import { Badge } from "@/components/badge";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Truck, Sparkles } from "lucide-react";
import { useCart } from "./cart-store";
import { formatEUR } from "@/lib/queries";
import { computeShipping } from "@/lib/shipping";
import { unitDiscountPct, calcTotals } from "@/lib/bulk-discount";

export function CartDrawer() {
  const { isOpen, setOpen, items, setQty, remove } = useCart();
  const totals = calcTotals(items);
  const shipping = computeShipping(items);
  const grandTotal = totals.subtotal + shipping.shippingCents;

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 flex flex-col bg-background"
      >
        <header className="px-5 py-4 border-b border-border flex items-center gap-2">
          <ShoppingBag size={18} className="text-accent" />
          <SheetTitle className="font-display text-lg">Winkelmand</SheetTitle>
          <Badge variant="muted" className="ml-2">{items.length} items</Badge>
        </header>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-4">
            <ShoppingBag size={40} className="text-text-subtle" />
            <p className="text-text-muted">Je winkelmand is leeg.</p>
            <Link href="/winkel" onClick={() => setOpen(false)}>
              <Button variant="secondary" trailingIcon={ArrowRight}>
                Bekijk de catalogus
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.map((it) => {
                const discountPct = unitDiscountPct(it.qty);
                const unitDiscountedCents = discountPct > 0
                  ? Math.round(it.price_cents * (1 - discountPct / 100))
                  : it.price_cents;
                const lineSubtotal = unitDiscountedCents * it.qty;
                return (
                <article
                  key={it.id}
                  className="rounded-lg border border-border bg-surface p-3 flex gap-3"
                >
                  {it.image && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <Link
                      href={`/product/winkel/${it.id}`}
                      onClick={() => setOpen(false)}
                      className="shrink-0"
                      aria-label={`Open ${it.name}`}
                    >
                      <img
                        src={it.image}
                        alt={it.name}
                        className="h-16 w-16 rounded object-cover shrink-0 hover:opacity-80 transition"
                      />
                    </Link>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/product/winkel/${it.id}`}
                        onClick={() => setOpen(false)}
                        className="font-medium text-sm text-text leading-snug line-clamp-2 hover:text-accent"
                      >
                        {it.name}
                      </Link>
                      <button
                        onClick={() => remove(it.id)}
                        className="text-text-muted hover:text-danger shrink-0"
                        aria-label="Verwijderen"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    {discountPct > 0 && (
                      <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-accent">
                        <Sparkles size={9} /> Bulk-korting actief −{discountPct}%
                      </span>
                    )}
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="inline-flex items-center rounded border border-border bg-background">
                        <button
                          onClick={() => setQty(it.id, it.qty - 1)}
                          className="h-7 w-7 inline-flex items-center justify-center"
                          aria-label="Minder"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="h-7 w-8 inline-flex items-center justify-center text-sm tabular">
                          {it.qty}
                        </span>
                        <button
                          onClick={() => setQty(it.id, it.qty + 1)}
                          className="h-7 w-7 inline-flex items-center justify-center"
                          aria-label="Meer"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <div className="text-right">
                        {discountPct > 0 ? (
                          <>
                            <p className="text-xs text-text-subtle tabular line-through">
                              {formatEUR(it.price_cents)}/st
                            </p>
                            <p className="text-xs text-accent tabular font-medium">
                              {formatEUR(unitDiscountedCents)}/st
                            </p>
                          </>
                        ) : (
                          <p className="text-xs text-text-muted tabular">{formatEUR(it.price_cents)}/st</p>
                        )}
                        <p className="text-sm font-semibold text-primary tabular">{formatEUR(lineSubtotal)}</p>
                      </div>
                    </div>
                  </div>
                </article>
              );
              })}
            </div>

            <footer
              className="border-t border-border bg-surface px-5 py-4 space-y-3"
              style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
            >
              {/* Verzending-breakdown: per shipping-method een regel */}
              {shipping.lines.length > 0 && (
                <div className="rounded-md border border-border bg-paper-soft p-2.5 space-y-1.5">
                  {shipping.lines.map((line) => (
                    <div key={line.method} className="flex items-baseline justify-between gap-2 text-xs">
                      <span className="inline-flex items-center gap-1.5 text-text-muted">
                        <Truck size={11} className="text-accent shrink-0" />
                        <span className="truncate">{line.label}</span>
                      </span>
                      <span className="font-medium text-text tabular shrink-0">{formatEUR(line.cents)}</span>
                    </div>
                  ))}
                  {shipping.lines.length > 1 && (
                    <p className="text-[10px] text-text-subtle leading-snug pt-1 border-t border-border">
                      Producten uit verschillende magazijnen - twee aparte zendingen, daarom 2× verzendkosten.
                    </p>
                  )}
                </div>
              )}
              <div className="space-y-1.5">
                {totals.savings > 0 && (
                  <div className="flex items-baseline justify-between text-sm text-text-muted">
                    <span>Subtotaal</span>
                    <span className="tabular line-through text-text-subtle">{formatEUR(totals.subtotalRaw)}</span>
                  </div>
                )}
                {totals.savings > 0 && (
                  <div className="flex items-baseline justify-between text-sm text-accent">
                    <span className="inline-flex items-center gap-1">
                      <Sparkles size={11} /> Bulk-korting
                    </span>
                    <span className="tabular">−{formatEUR(totals.savings)}</span>
                  </div>
                )}
                <div className="flex items-baseline justify-between text-sm text-text-muted">
                  <span>{totals.savings > 0 ? "Met korting" : "Subtotaal"}</span>
                  <span className="tabular">{formatEUR(totals.subtotal)}</span>
                </div>
                <div className="flex items-baseline justify-between text-sm text-text-muted">
                  <span>Verzending</span>
                  <span className="tabular">{formatEUR(shipping.shippingCents)}</span>
                </div>
                <div className="flex items-baseline justify-between pt-1 border-t border-border">
                  <span className="font-semibold text-text">Totaal</span>
                  <span className="font-display text-xl text-primary tabular">{formatEUR(grandTotal)}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/winkelmand" onClick={() => setOpen(false)}>
                  <Button variant="secondary" className="w-full">Winkelmand</Button>
                </Link>
                <Link href="/checkout" onClick={() => setOpen(false)}>
                  <Button trailingIcon={ArrowRight} className="w-full">Afrekenen</Button>
                </Link>
              </div>
            </footer>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default CartDrawer;
