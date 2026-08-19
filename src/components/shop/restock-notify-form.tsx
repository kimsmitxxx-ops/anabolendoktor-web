"use client";
import { useState } from "react";
import { Bell, CheckCircle2, Loader2 } from "lucide-react";

export function RestockNotifyForm({ productId, productName }: { productId: string; productName: string }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || busy) return;
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/restock-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          email: email.trim(),
          name: name.trim() || undefined,
          website: honeypot,
        }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(j.error || "Kon u niet aanmelden, probeer opnieuw");
        return;
      }
      setDone(true);
    } catch {
      setErr("Verbindingsfout - probeer het opnieuw");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="mt-4 rounded-lg border border-success/40 bg-success-soft/30 p-4">
        <CheckCircle2 size={18} className="text-success" />
        <p className="mt-2 font-medium text-text">Aangemeld - we mailen je zodra dit product weer beschikbaar is.</p>
        <p className="mt-1 text-xs text-text-muted">
          Geen spam, geen nieuwsbrief - alleen één mail voor {productName} zodra de batch binnen is.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-4 rounded-lg border border-border bg-paper-soft p-4">
      <p className="text-sm font-semibold text-text inline-flex items-center gap-1.5">
        <Bell size={14} className="text-accent" /> Krijg een mail zodra dit weer op voorraad is
      </p>
      <p className="mt-1 text-xs text-text-muted">
        Geen abonnement, geen nieuwsbrief. Eén bericht zodra de batch binnen is en getest.
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto]">
        <input
          type="email"
          required
          placeholder="u@voorbeeld.nl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-10 px-3 rounded border border-border bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
        <button
          type="submit"
          disabled={busy || !email.trim()}
          className="inline-flex items-center justify-center gap-1.5 rounded bg-accent px-4 h-10 text-sm font-semibold text-accent-foreground hover:bg-accent-soft disabled:opacity-50"
        >
          {busy ? <Loader2 size={14} className="animate-spin" /> : <Bell size={14} />}
          Aanmelden
        </button>
      </div>
      <input
        type="text"
        placeholder="Naam (optioneel)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mt-2 h-9 w-full px-3 rounded border border-border bg-background text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      />
      {/* Honeypot - bots vullen dit in, mensen niet (display:none) */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="hidden"
      />
      {err && <p className="mt-2 text-xs text-danger">{err}</p>}
    </form>
  );
}
