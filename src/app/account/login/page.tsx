"use client";
import { useState } from "react";
import { createBrowserSupabase } from "@/lib/supabase-browser";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setBusy(true); setError(null);
    const sb = createBrowserSupabase();
    const { error } = await sb.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${window.location.origin}/account/callback` },
    });
    if (error) setError(error.message);
    else setSent(true);
    setBusy(false);
  };

  if (sent) {
    return (
      <div className="mx-auto mt-20 max-w-md px-6 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
        <h1 className="mt-4 font-display text-2xl">Check uw inbox</h1>
        <p className="mt-2 text-sm text-text-muted">
          Login-link gestuurd naar <strong>{email}</strong>. Klik 'm aan en u bent binnen.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-20 max-w-md px-6">
      <h1 className="font-display text-3xl">Inloggen</h1>
      <p className="mt-2 text-sm text-text-muted">
        Geen wachtwoord. Vult uw email in en we sturen een login-link.
      </p>
      <form onSubmit={submit} className="mt-6 space-y-3">
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-subtle" />
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="u@email.com"
            className="w-full rounded-lg border border-paper-border bg-paper-soft px-4 py-3 pl-10 text-sm outline-none focus:border-accent"
          />
        </div>
        {error && <p className="text-sm text-danger">{error}</p>}
        <button type="submit" disabled={busy} className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent-soft disabled:opacity-50">
          {busy ? "Versturen…" : "Stuur login-link"} <ArrowRight className="h-4 w-4" />
        </button>
      </form>
      <p className="mt-6 text-center text-xs text-text-subtle">Geen account? Wordt automatisch aangemaakt.</p>
    </div>
  );
}
