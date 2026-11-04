"use client";
import { useEffect, useRef, useState } from "react";
import { Check, Copy, Loader2, HelpCircle } from "lucide-react";
import { track } from "@/lib/analytics";
import { formatEUR } from "@/lib/format";
import type { PaytailBetaalgegevens } from "@/lib/paytail";

/**
 * De bankgegevens in onze eigen vormgeving, op onze eigen site. Ze komen
 * server-side bij Paytail vandaan (zie lib/paytail.ts); hier staat alleen de
 * weergave, het kopieren en de knop "Ik heb betaald".
 *
 * De stappen en de gegevens staan expres door elkaar: eerst stonden ze apart,
 * en dan moest je op een telefoon langs een half scherm uitleg scrollen voor
 * je de IBAN zag. Nu is elke stap meteen het veld dat je nodig hebt, met de
 * kopieerknop ernaast. Wit vlak met een dikke accentrand, zodat dit het enige
 * blok op de pagina is dat zo opvalt.
 */

/** Alles in één blok tekst, voor wie liever in één keer kopieert en plakt. */
export function betaalregels(gegevens: PaytailBetaalgegevens): string {
  return [
    `Naam: ${gegevens.naam_ontvanger}`,
    `IBAN: ${gegevens.iban}`,
    `Omschrijving: ${gegevens.omschrijving}`,
    `Bedrag: ${gegevens.bedrag}`,
  ].join("\n");
}

async function naarKlembord(tekst: string) {
  try {
    await navigator.clipboard.writeText(tekst);
  } catch {
    // Oudere browsers en pagina's zonder https-context hebben geen
    // clipboard-API. Dan maar de ouderwetse weg, anders doet de knop niets.
    const hulp = document.createElement("textarea");
    hulp.value = tekst;
    hulp.style.position = "fixed";
    hulp.style.opacity = "0";
    document.body.appendChild(hulp);
    hulp.select();
    try {
      document.execCommand("copy");
    } catch {}
    document.body.removeChild(hulp);
  }
}

function KopieerKnop({ tekst, label = "Kopieer", ariaLabel }: { tekst: string; label?: string; ariaLabel?: string }) {
  const [gekopieerd, setGekopieerd] = useState(false);
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={async () => {
        await naarKlembord(tekst);
        setGekopieerd(true);
        setTimeout(() => setGekopieerd(false), 1800);
      }}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-paper-soft px-3 py-2 text-xs text-text transition hover:bg-surface"
    >
      {gekopieerd ? <Check size={14} className="text-success" /> : <Copy size={14} />}
      {gekopieerd ? "Gekopieerd" : label}
    </button>
  );
}

function Nummer({ n }: { n: number }) {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
      {n}
    </span>
  );
}

/** Een stap die tegelijk een in te vullen veld is. */
function Stap({
  n,
  label,
  waarde,
  kopieer,
  mono,
  groot,
  extra,
}: {
  n: number;
  label: string;
  waarde: string;
  kopieer: string;
  mono?: boolean;
  groot?: boolean;
  extra?: string;
}) {
  return (
    <li className="flex gap-3 border-b border-border py-3 last:border-b-0">
      <Nummer n={n} />
      <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-text-muted">{label}</p>
          <p
            className={[
              "mt-0.5 break-words text-text",
              groot ? "font-display text-2xl tabular" : "text-base",
              mono ? "font-mono" : "",
            ].join(" ")}
          >
            {waarde}
          </p>
          {extra && <p className="mt-1 text-xs text-text-muted">{extra}</p>}
        </div>
        <KopieerKnop tekst={kopieer} ariaLabel={`Kopieer ${label}`} />
      </div>
    </li>
  );
}

/** Een stap zonder veld, alleen tekst. */
function StapTekst({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-3 border-b border-border py-3 last:border-b-0">
      <Nummer n={n} />
      <p className="flex-1 text-sm text-text-muted">{children}</p>
    </li>
  );
}

export function Betaalgegevens({
  orderId,
  totaalCenten,
  gegevens,
}: {
  orderId: string;
  totaalCenten: number;
  gegevens: PaytailBetaalgegevens;
}) {
  const [bezig, setBezig] = useState(false);
  const [fout, setFout] = useState<string | null>(null);

  // De klant krijgt deze gegevens ook per mail, zodat hij ze later vanaf zijn
  // bank kan pakken zonder deze pagina terug te hoeven zoeken. Dat gebeurt
  // vanuit de browser en niet tijdens het renderen, want anders wacht de
  // pagina op de mailserver. De route verstuurt hooguit één keer per
  // bestelling; de bewaking daarvoor staat server-side.
  const gemaild = useRef(false);
  useEffect(() => {
    if (gemaild.current) return;
    gemaild.current = true;
    fetch("/api/paytail/mail-gegevens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    }).catch(() => {});
  }, [orderId]);

  const betaald = async () => {
    setBezig(true);
    setFout(null);
    track("payment_reported", { order_reference: gegevens.omschrijving });
    try {
      const res = await fetch("/api/paytail/betaald", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      // Of de melding bij Paytail nu aankwam of niet: het geld is onderweg en
      // de klant hoort de bevestiging te zien. Mislukt de melding, dan staat
      // dat in onze logs en vinden we de betaling alsnog op het kenmerk.
      if (!res.ok && res.status !== 503) {
        const j = await res.json().catch(() => ({}));
        setFout(j.error || "Melden lukte niet. Probeer het nog een keer.");
        setBezig(false);
        return;
      }
      window.location.href = `/checkout/bedankt/${orderId}?paytail=1`;
    } catch {
      setFout("Verbindingsfout. Probeer het nog een keer.");
      setBezig(false);
    }
  };

  const heeftExtra = Boolean(gegevens.land || gegevens.bic || gegevens.bank || gegevens.adres);

  return (
    <>
      <section className="mt-6 rounded-xl border-2 border-accent bg-surface p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs uppercase tracking-[0.18em] text-accent font-semibold">Zo maakt u het over</p>
          <KopieerKnop tekst={betaalregels(gegevens)} label="Kopieer alles" />
        </div>

        <ol className="mt-3">
          <StapTekst n={1}>Open de app van uw bank en kies overboeken.</StapTekst>
          <Stap n={2} label="IBAN" waarde={gegevens.iban} kopieer={gegevens.iban} mono />
          <Stap n={3} label="Naam ontvanger" waarde={gegevens.naam_ontvanger} kopieer={gegevens.naam_ontvanger} />
          <Stap n={4} label="Bedrag" waarde={formatEUR(totaalCenten)} kopieer={gegevens.bedrag} groot />
          <Stap
            n={5}
            label="Omschrijving"
            waarde={gegevens.omschrijving}
            kopieer={gegevens.omschrijving}
            mono
            extra="Zet hier alleen dit nummer. Typ er niets bij, anders weigert de bank de betaling."
          />
          <StapTekst n={6}>Verstuur de overboeking en klik hieronder op &quot;Ik heb betaald&quot;.</StapTekst>
        </ol>
      </section>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={betaald}
          disabled={bezig}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 font-display text-lg text-accent-foreground shadow-sm transition hover:opacity-90 disabled:opacity-60 sm:w-auto sm:px-10"
        >
          {bezig && <Loader2 size={18} className="animate-spin" />}
          {bezig ? "Bezig" : "Ik heb betaald"}
        </button>
        <p className="mt-3 text-xs text-text-subtle">
          Klik hierop als u de overboeking hebt verstuurd. U krijgt deze gegevens ook per mail.
        </p>
        {fout && <p className="mt-2 text-sm text-danger">{fout}</p>}
      </div>

      {heeftExtra && (
        <section className="mt-8 rounded-xl border border-border bg-surface p-6">
          <h2 className="font-display text-lg text-text inline-flex items-center gap-2">
            <HelpCircle size={18} className="text-accent" /> Vraagt uw bank om meer gegevens?
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            U maakt over naar een rekening in het buitenland. Sommige banken vragen dan ook naar het land, de bank of
            het adres van de ontvanger. Alles wat we daarover hebben staat hieronder. Vraagt uw bank er niet om, dan
            hebt u dit niet nodig.
          </p>
          <div className="mt-4">
            {gegevens.land && <Veld label="Land" waarde={gegevens.land} />}
            {gegevens.bic && <Veld label="BIC (SWIFT)" waarde={gegevens.bic} mono />}
            {gegevens.bank && <Veld label="Naam van de bank" waarde={gegevens.bank} />}
            {gegevens.adres && <Veld label="Adres van de ontvanger" waarde={gegevens.adres} />}
            {gegevens.registratienummer && <Veld label="Registratienummer" waarde={gegevens.registratienummer} mono />}
          </div>
        </section>
      )}
    </>
  );
}

function Veld({ label, waarde, mono }: { label: string; waarde: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border py-3 last:border-b-0">
      <div className="min-w-0">
        <p className="text-xs text-text-muted">{label}</p>
        <p className={`mt-0.5 break-words text-text ${mono ? "font-mono text-sm" : "text-base"}`}>{waarde}</p>
      </div>
      <KopieerKnop tekst={waarde} ariaLabel={`Kopieer ${label}`} />
    </div>
  );
}
