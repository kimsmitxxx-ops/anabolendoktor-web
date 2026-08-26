"use client";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatEUR } from "@/lib/queries";
import { calcTotals, unitDiscountPct } from "@/lib/bulk-discount";
import { PaymentRow } from "@/components/payment-row";
import { backupCart } from "@/lib/cart-backup";
import { RestoreCartBanner } from "@/components/restore-cart-banner";
import { track } from "@/lib/analytics";
import { Sparkles, UserPlus, Lock } from "lucide-react";
import { useState } from "react";

const EU_COUNTRIES = [
  { code: "NL", name: "Nederland" },
  { code: "BE", name: "België" },
  { code: "DE", name: "Duitsland" },
  { code: "FR", name: "Frankrijk" },
  { code: "ES", name: "Spanje" },
  { code: "IT", name: "Italië" },
  { code: "AT", name: "Oostenrijk" },
  { code: "PT", name: "Portugal" },
  { code: "PL", name: "Polen" },
  { code: "SE", name: "Zweden" },
];

export default function CheckoutPage() {
  const cart = useCart();
  const totals = calcTotals(cart.items);
  const [form, setForm] = useState({
    email: "",
    name: "",
    street: "",
    house_number: "",
    postal: "",
    city: "",
    country: "NL",
    phone: "",
    discount_code: "",
    create_account: false,
    password: "",
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/orders", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, items: cart.items }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || !j.order_id) {
        setErr(j.error || "Bestelling kon niet worden aangemaakt");
        return;
      }
      track("order_placed", {
        order_reference: j.order_id,
        value_cents: j.total_cents,
        items: cart.items.length,
      });

      // Eerst een kopie van de mand wegschrijven, dan pas legen. Wie de
      // betaling afbreekt en terugkomt, vindt zijn mand anders leeg terug.
      backupCart(cart.items);
      cart.clear();

      // Betaallink als die er is, anders de bedankt-pagina met overboeking,
      // en de mogelijkheid een betaalbewijs te uploaden.
      if (j.paytail_url) track("payment_redirect", { order_reference: j.order_id });
      window.location.href = j.paytail_url || `/checkout/bedankt/${j.order_id}`;
    } catch {
      setErr("Verbindingsfout - probeer opnieuw");
    } finally {
      setBusy(false);
    }
  };

  if (cart.items.length === 0) {
    return <div className="mx-auto max-w-md px-4 py-20 text-center text-text-muted">Lege mand. <Link href="/winkel" className="text-accent underline">Naar winkel</Link></div>;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-3xl">Afrekenen</h1>
      <RestoreCartBanner />
      <form onSubmit={submit} className="mt-6 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Field
            k="email"
            label="E-mailadres"
            type="email"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
          />

          {/* Maak account aan - checkbox + password */}
          <div className="rounded-lg border border-accent/30 bg-accent-soft/15 p-4">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={form.create_account}
                onChange={(e) => setForm({ ...form, create_account: e.target.checked })}
                className="mt-0.5 h-4 w-4 rounded border-border accent-accent"
              />
              <div className="text-sm">
                <p className="font-semibold text-text inline-flex items-center gap-1.5">
                  <UserPlus size={14} className="text-accent" /> Maak meteen een account aan
                </p>
                <p className="mt-0.5 text-xs text-text-muted">
                  Bekijk uw bestellingen en eerdere uitslagen terug, en bestel een herhaalmeting
                  met één klik.
                </p>
              </div>
            </label>
            {form.create_account && (
              <div className="mt-3">
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-text inline-flex items-center gap-1.5">
                    <Lock size={12} className="text-accent" /> Wachtwoord (min. 8 tekens)
                  </span>
                  <input
                    type="password"
                    required={form.create_account}
                    minLength={8}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full rounded-lg border border-paper-border bg-paper-soft px-3 py-2 text-sm outline-none focus:border-accent"
                  />
                </label>
              </div>
            )}
          </div>

          <Field
            k="name"
            label="Naam (voor- en achternaam)"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
          />

          {/* Straat + huisnr apart */}
          <div className="grid gap-3 grid-cols-[1fr_120px]">
            <Field
              k="street"
              label="Straatnaam"
              value={form.street}
              onChange={(v) => setForm({ ...form, street: v })}
            />
            <Field
              k="house_number"
              label="Huisnr + toev."
              value={form.house_number}
              onChange={(v) => setForm({ ...form, house_number: v })}
            />
          </div>

          {/* Postcode + stad */}
          <div className="grid gap-3 grid-cols-[160px_1fr]">
            <Field
              k="postal"
              label="Postcode"
              value={form.postal}
              onChange={(v) => setForm({ ...form, postal: v })}
            />
            <Field
              k="city"
              label="Stad"
              value={form.city}
              onChange={(v) => setForm({ ...form, city: v })}
            />
          </div>

          {/* Land dropdown - NL default, BE 2e */}
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Land</span>
            <select
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              className="w-full rounded-lg border border-paper-border bg-paper-soft px-3 py-2 text-sm outline-none focus:border-accent"
            >
              {EU_COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>{c.name}</option>
              ))}
            </select>
          </label>

          <Field
            k="phone"
            label="Telefoon (optioneel)"
            value={form.phone}
            onChange={(v) => setForm({ ...form, phone: v })}
            required={false}
          />

          {/* Kortingscode: klanten krijgen CONSULT10 van de consulent na een
              betaald consult. Validatie gebeurt server-side in /api/orders. */}
          <Field
            k="discount_code"
            label="Kortingscode (optioneel)"
            value={form.discount_code}
            onChange={(v) => setForm({ ...form, discount_code: v })}
            required={false}
          />
          {form.discount_code.trim() !== "" && (
            <p className="-mt-2 text-xs text-text-muted">
              De code wordt gecontroleerd en verrekend bij het plaatsen van de bestelling.
            </p>
          )}

          {/* Betaalopties - zelfde rij als op productpagina + Veilig betalen-blok */}
          <div className="rounded-lg border border-border bg-surface p-4">
            <p className="text-xs uppercase tracking-wider text-accent-muted font-semibold mb-2">
              Veilig &amp; snel betalen
            </p>
            <p className="text-xs text-text-muted mb-3">
              Na bevestigen krijgt u per mail de betaalinstructies. Bestelling gaat direct na binnenkomst betaling de deur uit.
            </p>
            <PaymentRow variant="full" />
          </div>
        </div>

        <div>
          <div className="sticky top-32 rounded-2xl border border-paper-border bg-paper-soft p-6">
            <h2 className="font-display text-xl">Overzicht</h2>
            {cart.items.map((it) => {
              const pct = unitDiscountPct(it.qty);
              const unit = pct > 0 ? Math.round(it.price_cents * (1 - pct / 100)) : it.price_cents;
              return (
                <div key={it.id} className="mt-3 text-sm">
                  <div className="flex justify-between">
                    <span>{it.qty}× {it.name}</span>
                    <span className="tabular">{formatEUR(unit * it.qty)}</span>
                  </div>
                  {pct > 0 && (
                    <span className="inline-flex items-center gap-1 mt-0.5 text-[10px] text-accent font-semibold">
                      <Sparkles size={9} /> Bulk-korting −{pct}%
                    </span>
                  )}
                </div>
              );
            })}
            <div className="mt-4 border-t border-paper-border pt-4 text-sm space-y-1.5">
              {totals.savings > 0 && (
                <div className="flex justify-between text-accent">
                  <span>Bulk-korting</span>
                  <span>−{formatEUR(totals.savings)}</span>
                </div>
              )}
              <div className="flex justify-between text-text-muted">
                <span>Subtotaal</span>
                <span className="tabular">{formatEUR(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between text-text-muted">
                <span>
                  Verzending
                  {totals.shippingMethodCount > 1 && (
                    <span className="block text-[10px] text-text-subtle">
                      {totals.shippingMethodCount}× zending uit verschillende magazijnen
                    </span>
                  )}
                </span>
                <span className="tabular">{formatEUR(totals.shipping)}</span>
              </div>
              <div className="mt-2 flex justify-between font-display text-lg pt-2 border-t border-paper-border">
                <span>Totaal</span>
                <span className="tabular">{formatEUR(totals.total)}</span>
              </div>
            </div>
            <button type="submit" disabled={busy} className="mt-5 w-full rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent-soft disabled:opacity-50">
              {busy ? "Bezig…" : "Plaats bestelling"}
            </button>
            {err && <p className="mt-2 text-center text-xs text-danger">{err}</p>}
            <p className="mt-3 text-center text-[11px] text-text-muted">
              Op de volgende pagina staan de bankgegevens voor deze bestelling. Uw pakket gaat weg zodra de betaling binnen is.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

function Field({
  k,
  label,
  type = "text",
  value,
  onChange,
  required = true,
}: {
  k: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      <input
        name={k}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-paper-border bg-paper-soft px-3 py-2 text-sm outline-none focus:border-accent"
      />
    </label>
  );
}
