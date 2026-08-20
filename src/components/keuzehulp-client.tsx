"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Stethoscope, AlertTriangle, RotateCcw } from "lucide-react";
import { WizardStep } from "@/components/wizard-step";
import { ContactForm } from "@/components/shop/contact-form";
import { STAPPEN, bepaalAdvies, vatAntwoordenSamen, type Antwoorden } from "@/lib/keuzehulp-logica";
import { track } from "@/lib/analytics";

export function KeuzehulpClient() {
  const [index, setIndex] = useState(0);
  const [antwoorden, setAntwoorden] = useState<Antwoorden>({});
  const [klaar, setKlaar] = useState(false);

  const stap = STAPPEN[index];
  const gekozen = antwoorden[stap?.sleutel];
  const advies = useMemo(() => (klaar ? bepaalAdvies(antwoorden) : null), [klaar, antwoorden]);

  function kies(waarde: string) {
    setAntwoorden((prev) => ({ ...prev, [stap.sleutel]: waarde }));
  }

  function verder() {
    if (!gekozen) return;
    if (index + 1 < STAPPEN.length) {
      setIndex(index + 1);
      return;
    }
    setKlaar(true);
    track("keuzehulp_voltooid", {
      doel: antwoorden.doel,
      ervaring: antwoorden.ervaring,
      trainingsjaren: antwoorden.trainingsjaren,
    });
  }

  function opnieuw() {
    setAntwoorden({});
    setIndex(0);
    setKlaar(false);
  }

  if (!klaar) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <WizardStep
          step={index + 1}
          totalSteps={STAPPEN.length}
          question={stap.vraag}
          description={stap.toelichting}
          tiles={stap.opties}
          value={gekozen}
          onChange={kies}
        />

        <div className="mx-auto mt-6 flex max-w-3xl items-center justify-between">
          <button
            type="button"
            onClick={() => setIndex(Math.max(0, index - 1))}
            disabled={index === 0}
            className="inline-flex items-center gap-2 rounded border border-border px-4 h-10 text-sm text-text-muted disabled:opacity-40 hover:border-border-strong"
          >
            <ArrowLeft size={14} /> Terug
          </button>
          <button
            type="button"
            onClick={verder}
            disabled={!gekozen}
            className="inline-flex items-center gap-2 rounded bg-accent px-6 h-11 text-sm font-medium text-accent-foreground disabled:opacity-40"
          >
            {index + 1 === STAPPEN.length ? "Toon mijn concept-advies" : "Volgende"} <ArrowRight size={14} />
          </button>
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-xs leading-relaxed text-text-subtle">
          Uw antwoorden blijven in uw browser. Er wordt niets opgeslagen zolang u het formulier
          onderaan niet verstuurt.
        </p>
      </div>
    );
  }

  const samenvatting = vatAntwoordenSamen(antwoorden);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="rounded-lg border border-border bg-surface p-6 md:p-10 shadow-card">
        <p className="text-xs uppercase tracking-[0.18em] text-accent font-semibold">Concept-advies</p>
        <h2 className="mt-3 font-display text-2xl md:text-3xl leading-tight text-text">{advies!.kop}</h2>
        <p className="mt-4 leading-relaxed text-text-muted">{advies!.samenvatting}</p>

        <ol className="mt-8 space-y-5">
          {advies!.stappen.map((s, i) => (
            <li key={s.titel} className="flex gap-4">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                {i + 1}
              </span>
              <div>
                <h3 className="font-medium text-text">{s.titel}</h3>
                <p className="mt-1 text-sm leading-relaxed text-text-muted">{s.tekst}</p>
                {s.href && (
                  <Link
                    href={s.href}
                    className="mt-2 inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
                  >
                    {s.hrefLabel} <ArrowRight size={13} />
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ol>

        {advies!.waarschuwing && (
          <p className="mt-8 flex gap-3 rounded border border-warning/40 bg-warning-soft/30 p-4 text-sm leading-relaxed text-text">
            <AlertTriangle size={16} className="mt-0.5 shrink-0 text-warning" />
            <span>{advies!.waarschuwing}</span>
          </p>
        )}

        <div className="mt-8 rounded border border-primary-muted bg-primary p-5 text-primary-foreground">
          <p className="flex items-center gap-2 text-sm font-medium">
            <Stethoscope size={16} className="text-accent-soft" /> Dit is nog geen definitief advies
          </p>
          <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
            Wat u hierboven leest is opgesteld op zes antwoorden. Uw voorgeschiedenis, medicatie en
            uitslagen kunnen het beeld veranderen. Daarom bespreekt u dit eerst met een consulent,
            en pas daarna valt het besluit of er iets volgt en wat dat is.
          </p>
          <Link
            href={advies!.consult.href}
            className="mt-4 inline-flex items-center gap-2 rounded bg-accent px-5 h-10 text-sm font-medium text-accent-foreground"
          >
            {advies!.consult.titel} bekijken <ArrowRight size={14} />
          </Link>
        </div>

        <button
          type="button"
          onClick={opnieuw}
          className="mt-6 inline-flex items-center gap-2 text-sm text-text-muted hover:text-text"
        >
          <RotateCcw size={13} /> Opnieuw invullen
        </button>
      </div>

      <div className="mt-10">
        <h2 className="font-display text-2xl text-text">Leg dit voor aan een consulent</h2>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          Uw antwoorden staan al in het bericht. Vul uw naam en e-mailadres aan en schrijf eronder
          wat er verder speelt. U ontvangt binnen een werkdag een voorstel voor een tijdstip.
        </p>
        <div className="mt-6">
          <ContactForm
            heading="Keuzehulp voorleggen"
            intro="Wij lezen uw antwoorden vooraf door, zodat het gesprek meteen de diepte in kan."
            defaultSubject="Uitkomst keuzehulp bespreken"
            defaultMessage={`Ik heb de keuzehulp ingevuld.\n\n${samenvatting}\n\nUitkomst: ${advies!.kop}\n\nWat er verder speelt:\n`}
          />
        </div>
      </div>
    </div>
  );
}
