"use client";
import { useState } from "react";
import { Star, PenLine } from "lucide-react";

export function ReviewForm({ productId }: { productId: string }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !body.trim()) {
      setError("Vult uw naam en review in.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          rating,
          author_name: name.trim(),
          body: body.trim(),
          website, // honeypot
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setDone(true);
      setName(""); setBody(""); setRating(5);
    } catch (err: any) {
      setError(err?.message || "Er ging iets mis. Probeer later opnieuw.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-lg border border-accent/30 bg-accent/5 p-4 text-sm text-text">
        Bedankt! Je review staat in de wachtrij. Na controle wordt hij geplaatst.
      </div>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg border border-border bg-paper-soft px-4 py-2 text-sm font-medium text-text hover:border-accent hover:text-accent transition-colors"
      >
        <PenLine size={14} /> Schrijf een review
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3 rounded-lg border border-border bg-paper-soft p-4">
      <h3 className="text-sm font-semibold text-text">Schrijf een review</h3>

      <div>
        <label className="text-xs text-text-muted">Beoordeling</label>
        <div className="mt-1 flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(n)}
              className="rounded p-1"
              aria-label={`${n} ster${n === 1 ? "" : ""}`}
            >
              <Star
                size={22}
                className={n <= (hover || rating) ? "fill-amber-400 text-amber-400" : "text-border-strong"}
              />
            </button>
          ))}
        </div>
      </div>

      <label className="block">
        <span className="text-xs text-text-muted">Uw naam</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={80}
          className="mt-1 w-full rounded-lg border border-border bg-paper px-3 py-2 text-sm outline-none focus:border-accent"
          placeholder="Bijv. Mark V."
        />
      </label>

      <label className="block">
        <span className="text-xs text-text-muted">Je ervaring</span>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          maxLength={2000}
          className="mt-1 w-full rounded-lg border border-border bg-paper px-3 py-2 text-sm outline-none focus:border-accent"
          placeholder="Hoe was het product? Wat viel op?"
        />
      </label>

      {/* Honeypot - verborgen voor mensen, bots vullen het in */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="hidden"
        aria-hidden="true"
      />

      {error && <p className="text-xs text-rose-600">{error}</p>}

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-text-subtle">Reviews worden gecontroleerd voor plaatsing.</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-lg px-3 py-1.5 text-sm text-text-muted hover:text-text"
          >
            Annuleer
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-accent px-4 py-1.5 text-sm font-medium text-white hover:bg-accent-strong disabled:opacity-50"
          >
            {submitting ? "Versturen…" : "Verstuur"}
          </button>
        </div>
      </div>
    </form>
  );
}
