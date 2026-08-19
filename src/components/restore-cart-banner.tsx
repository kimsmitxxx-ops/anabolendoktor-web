"use client";

import { useEffect, useState } from "react";
import { RotateCcw, X } from "lucide-react";
import { useCart, type CartItem } from "@/lib/cart-context";
import { readCartBackup, clearCartBackup } from "@/lib/cart-backup";
import { track } from "@/lib/analytics";

/**
 * Verschijnt wanneer de mand leeg is terwijl er nog een snapshot van vóór de
 * betaalpagina ligt - dus na een afgebroken betaling. Eén klik zet de mand
 * terug. Rendert niets als er geen snapshot is of de mand al gevuld is.
 */
export function RestoreCartBanner() {
  const { items, replace } = useCart();
  const [backup, setBackup] = useState<CartItem[] | null>(null);
  const [dismissed, setDismissed] = useState(false);

  // Pas na mount lezen: localStorage bestaat niet tijdens SSR.
  useEffect(() => {
    setBackup(readCartBackup());
  }, []);

  if (!backup || dismissed || items.length > 0) return null;

  const count = backup.reduce((s, x) => s + x.qty, 0);

  function restore() {
    if (!backup) return;
    replace(backup);
    clearCartBackup();
    setBackup(null);
    track("cart_restored", { items: backup.length, units: count });
  }

  function dismiss() {
    clearCartBackup();
    setDismissed(true);
  }

  return (
    <div className="mt-6 flex items-start gap-3 rounded-2xl border border-accent/40 bg-accent-soft/20 p-4 text-left">
      <RotateCcw size={18} className="mt-0.5 shrink-0 text-accent" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">Betaling afgebroken?</p>
        <p className="mt-0.5 text-sm text-text-muted">
          Je vorige winkelmand met {count} {count === 1 ? "product" : "producten"} staat nog klaar.
        </p>
        <button
          type="button"
          onClick={restore}
          className="mt-3 inline-flex rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent-soft"
        >
          Winkelmand herstellen
        </button>
      </div>
      <button
        type="button"
        onClick={dismiss}
        className="shrink-0 text-text-muted hover:text-danger"
        aria-label="Melding sluiten"
      >
        <X size={16} />
      </button>
    </div>
  );
}
