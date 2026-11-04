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
 * De tekst is bewust kort en eenvoudig. Dit is het punt waar iemand met zijn
 * telefoon in de hand in een bankapp zit te typen; alles wat hier uitleg nodig
 * heeft, kost een bestelling.
 *
 * De extra gegevens (land, BIC, bank, adres) staan in een eigen zichtbare
 * sectie en niet weggeklapt: veel banken vragen bij een buitenlandse rekening
 * om het land, en wie dat niet kan vinden maakt niet over.
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

function KopieerKnop({
  tekst,
  label = "Kopieer",
  ariaLabel,
  donker = true,
}: {
  tekst: string;
  label?: string;
  ariaLabel?: string;
  donker?: boolean;
}) {
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
      className={[
        "inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs transition hover:opacity-80",
        donker ? "bg-primary-soft text-primary-foreground" : "border border-border bg-surface text-text",
      ].join(" ")}
    >
      {gekopieerd ? <Check size={14} /> : <Copy size={14} />}
      {gekopieerd ? "Gekopieerd" : label}
    </button>
  );
}

function Regel({
  label,
  waarde,
  kopieer,
  groot,
  mono,
  donker = true,
}: {
  label: string;
  waarde: string;
  kopieer: string;
  groot?: boolean;
  mono?: boolean;
  donker?: boolean;
}) {
  return (
    <div
      className={[
        "flex items-center justify-between gap-3 border-b py-3 last:border-b-0",
        donker ? "border-primary-muted/40" : "border-border",
      ].join(" ")}
    >
      <div className="min-w-0">
        <p className={donker ? "text-xs text-primary-foreground/60" : "text-xs text-text-muted"}>{label}</p>
        <p
          className={[
            "mt-0.5 break-words",
            donker ? "text-primary-foreground" : "text-text",
            groot ? "font-display text-2xl tabular" : "text-base",
            mono ? "font-mono" : "",
          ].join(" ")}
        >
          {waarde}
        </p>
      </div>
      <KopieerKnop tekst={kopieer} ariaLabel={`Kopieer ${label}`} donker={donker} />
    </div>
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
      <section className="mt-8 rounded-xl border border-primary-muted bg-primary p-6 text-primary-foreground">
        <p className="text-xs uppercase tracking-[0.18em] text-accent-soft font-semibold">Maak dit bedrag over</p>

        {/* Alles in één keer, want in de meeste bankapps plak je liever één
            blok dan vier losse velden. De losse regels staan eronder voor wie
            veld voor veld overneemt. */}
        <div className="mt-4 rounded-lg border border-primary-muted bg-primary-soft/40 p-4">
          <div className="flex items-start justify-between gap-3">
            <pre className="min-w-0 whitespace-pre-wrap break-words font-mono text-sm leading-relaxed text-primary-foreground">
              {betaalregels(gegevens)}
            </pre>
            <KopieerKnop tekst={betaalregels(gegevens)} label="Kopieer alles" />
          </div>
        </div>

        <div className="mt-4">
          <Regel label="Naam" waarde={gegevens.naam_ontvanger} kopieer={gegevens.naam_ontvanger} />
          <Regel label="IBAN" waarde={gegevens.iban} kopieer={gegevens.iban} mono />
          <Regel
            label="Omschrijving (alleen dit)"
            waarde={gegevens.omschrijving}
            kopieer={gegevens.omschrijving}
            mono
          />
          <Regel label="Bedrag" waarde={formatEUR(totaalCenten)} kopieer={gegevens.bedrag} groot />
        </div>
      </section>

      {heeftExtra && (
        <section className="mt-6 rounded-xl border border-border bg-surface p-6">
          <h2 className="font-display text-lg text-text inline-flex items-center gap-2">
            <HelpCircle size={18} className="text-accent" /> Vraagt uw bank om meer gegevens?
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            U maakt over naar een rekening in het buitenland. Sommige banken vragen dan ook naar welk land het geld
            gaat, of naar het adres van de ontvanger. Dat staat hieronder. Vraagt uw bank er niet om, dan hebt u dit
            niet nodig.
          </p>
          <div className="mt-4">
            {gegevens.land && <Regel label="Land" waarde={gegevens.land} kopieer={gegevens.land} donker={false} />}
            {gegevens.bic && (
              <Regel label="BIC (SWIFT)" waarde={gegevens.bic} kopieer={gegevens.bic} mono donker={false} />
            )}
            {gegevens.bank && <Regel label="Bank" waarde={gegevens.bank} kopieer={gegevens.bank} donker={false} />}
            {gegevens.adres && (
              <Regel label="Adres van de ontvanger" waarde={gegevens.adres} kopieer={gegevens.adres} donker={false} />
            )}
            {gegevens.registratienummer && (
              <Regel
                label="Registratienummer"
                waarde={gegevens.registratienummer}
                kopieer={gegevens.registratienummer}
                mono
                donker={false}
              />
            )}
          </div>
        </section>
      )}

      <div className="mt-8 text-center">
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
    </>
  );
}
