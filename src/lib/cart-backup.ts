import type { CartItem } from "@/lib/cart-context";

const BACKUP_KEY = "anabolendoktor.cart.backup";
// Even lang houdbaar als de mand zelf (zie cart-context) - een klant die een
// betaling afbreekt komt soms pas dagen later terug.
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

type Backup = { items: CartItem[]; savedAt: number };

/**
 * Snapshot van de winkelmand, weggeschreven vlak vóór het doorsturen naar de
 * betaalpagina. Breekt de klant de betaling af, dan kan de mand hiermee worden
 * teruggezet. Wordt opgeruimd zodra de bestelling is afgerond, zodat een
 * geslaagde betaling nooit een "herstel uw mand"-knop achterlaat.
 */
export function backupCart(items: CartItem[]) {
  if (typeof window === "undefined" || !items.length) return;
  try {
    const payload: Backup = { items, savedAt: Date.now() };
    localStorage.setItem(BACKUP_KEY, JSON.stringify(payload));
  } catch {}
}

export function readCartBackup(): CartItem[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(BACKUP_KEY);
    if (!raw) return null;
    const parsed: Backup = JSON.parse(raw);
    if (!parsed?.items?.length) return null;
    if (Date.now() - (parsed.savedAt || 0) > MAX_AGE_MS) {
      localStorage.removeItem(BACKUP_KEY);
      return null;
    }
    return parsed.items;
  } catch {
    return null;
  }
}

export function clearCartBackup() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(BACKUP_KEY);
  } catch {}
}
