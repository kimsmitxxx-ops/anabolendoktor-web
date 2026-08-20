"use client";
import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export type NewsletterFormVariant = "default" | "footer-mini";

export interface NewsletterFormProps {
  variant?: NewsletterFormVariant;
  heading?: string;
  subhead?: string;
  className?: string;
  /** Optionele override van submit-handler. Default = POST naar /api/newsletter. */
  onSubmit?: (email: string) => void;
}

const PRIVACY = "Wij sturen 1 tot 2 mails per maand, uitschrijven kan altijd";

export function NewsletterForm({
  variant = "default",
  heading = "Onderzoek in uw inbox",
  subhead = "Studies en achtergronden over training, herstel en bloedwaarden. Geen verkoop.",
  className,
  onSubmit,
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handle = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || busy) return;
    if (onSubmit) {
      onSubmit(email);
      setDone(true);
      return;
    }
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), website: hp }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(j.error || "Inschrijven mislukt");
        return;
      }
      setDone(true);
    } catch {
      setErr("Verbindingsfout - probeer opnieuw");
    } finally {
      setBusy(false);
    }
  };

  // Honeypot field (invisible) - bots vullen 'website' in, mensen niet
  const Honeypot = (
    <input
      type="text"
      tabIndex={-1}
      aria-hidden
      autoComplete="off"
      value={hp}
      onChange={(e) => setHp(e.target.value)}
      className="hidden"
    />
  );

  if (variant === "footer-mini") {
    return (
      <form onSubmit={handle} className={cn("flex flex-col gap-2 w-full max-w-md", className)}>
        {done ? (
          <p className="text-sm text-accent font-medium">✓ Bedankt, u bent ingeschreven.</p>
        ) : (
          <>
            <div className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="u@voorbeeld.nl"
                className="flex-1 h-11 px-3 rounded border border-border bg-surface text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              />
              {Honeypot}
              <Button type="submit" size="md" disabled={busy}>{busy ? "…" : "Inschrijven"}</Button>
            </div>
            {err && <p className="text-xs text-danger">{err}</p>}
            <p className="text-xs text-text-subtle">{PRIVACY}</p>
          </>
        )}
      </form>
    );
  }

  return (
    <div className={cn("rounded-lg border border-border bg-surface p-6 md:p-8 shadow-card", className)}>
      <h3 className="font-display text-2xl text-text">{heading}</h3>
      <p className="mt-2 text-sm text-text-muted max-w-md">{subhead}</p>
      {done ? (
        <p className="mt-4 text-sm text-accent font-medium">✓ Bedankt, u bent ingeschreven. Eerstvolgende mail komt binnen 2 weken.</p>
      ) : (
        <>
          <form onSubmit={handle} className="mt-5 flex flex-col sm:flex-row gap-2 max-w-md">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="u@voorbeeld.nl"
              className="flex-1 h-11 px-3 rounded border border-border bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            />
            {Honeypot}
            <Button type="submit" size="md" disabled={busy}>{busy ? "Bezig…" : "Inschrijven"}</Button>
          </form>
          {err && <p className="mt-2 text-xs text-danger">{err}</p>}
          <p className="mt-3 text-xs text-text-subtle">{PRIVACY}</p>
        </>
      )}
    </div>
  );
}

export default NewsletterForm;
