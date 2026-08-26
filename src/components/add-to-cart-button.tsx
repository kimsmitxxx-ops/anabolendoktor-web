"use client";
import { Plus, Minus, ShoppingCart, Sparkles, ShieldCheck, Smartphone } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { formatEUR } from "@/lib/queries";
import { track } from "@/lib/analytics";
import type { Product } from "@/lib/supabase";


export function AddToCartButton({ product }: { product: Product }) {
  const cart = useCart();
  const [qty, setQty] = useState(1);

  const dec = () => setQty((q) => Math.max(1, q - 1));
  const inc = () => setQty((q) => q + 1);

  function addToCart() {
    // Gebruik slug als cart-id (stabiel tussen productcard + productdetail).
    // Anders zag cart-context dezelfde stof als 2 verschillende items en werd
    // de bulk-korting niet toegepast.
    cart.add(
      {
        id: product.slug,
        sku: product.sku,
        name: product.name,
        price_cents: product.price_cents,
        image: product.image_url,
        shipping_method: product.tags?.includes("UT") ? "ut" : "rest",
      },
      qty,
    );
    track("add_to_cart", {
      product_slug: product.slug,
      sku: product.sku,
      qty,
      value_cents: product.price_cents * qty,
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-stretch gap-2">
        <div className="inline-flex items-center rounded-md border border-border bg-surface">
          <button
            type="button"
            onClick={dec}
            disabled={qty <= 1}
            aria-label="Verminder aantal"
            className="h-12 w-10 inline-flex items-center justify-center text-text disabled:opacity-40"
          >
            <Minus size={16} />
          </button>
          <span className="h-12 w-12 inline-flex items-center justify-center font-display text-lg tabular">{qty}</span>
          <button
            type="button"
            onClick={inc}
            aria-label="Verhoog aantal"
            className="h-12 w-10 inline-flex items-center justify-center text-text"
          >
            <Plus size={16} />
          </button>
        </div>
        <button
          type="button"
          onClick={addToCart}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 h-12 text-sm font-semibold text-accent-foreground hover:bg-accent-soft active:scale-[0.99] transition-all"
        >
          <ShoppingCart size={16} /> Toevoegen aan mand · {formatEUR(product.price_cents * qty)}
        </button>
      </div>

      {/* Geen staffelblok: elk pakket bevat een consult, dus vijf of tien
          stuks bestellen is geen scenario. Korting loopt via CONSULT10. */}

      {/* Veilig betalen blok */}
      <div className="rounded-md border border-border bg-surface p-3">
        <p className="text-xs font-semibold text-text inline-flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-accent" /> Veilig &amp; snel betalen
        </p>
        <p className="mt-1.5 text-[11px] text-text-muted leading-snug">
          U betaalt per bankoverschrijving via uw eigen bank-app. De rekeninggegevens staan op
          de betaalpagina na het bestellen. Zodra de betaling binnen is, wordt uw bestelling
          verwerkt.
        </p>
        <div className="mt-2 flex items-center gap-2 text-[11px]">
          <span className="inline-flex items-center gap-1 rounded border border-border bg-background px-2 py-0.5 text-text">
            <Smartphone size={11} className="text-accent" /> Bank-app
          </span>
          <span className="inline-flex items-center gap-1 rounded border border-border bg-background px-2 py-0.5 text-text">
            IBAN
          </span>
        </div>
      </div>
    </div>
  );
}
