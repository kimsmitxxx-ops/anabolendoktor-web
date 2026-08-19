import Link from "next/link";
import type { Metadata } from "next";
import { Stethoscope, ClipboardCheck, Clock, ArrowRight } from "lucide-react";
import { ContactForm } from "@/components/shop/contact-form";

export const metadata: Metadata = {
  title: "Consult aanvragen - bloedwerk-interpretatie, harm-reduction, trainingsplan",
  description:
    "60-minuten consult via video-call: bespreek bloedwerk-uitslagen, herstelprotocol, doelstellingen. Voor natural trainers, AAS-gebruikers en mensen die overwegen. €120 per sessie.",
  alternates: { canonical: "/consult" },
};

export const revalidate = 3600;

const INCLUDES = [
  "Vooraf: intake-formulier met doelen, medische historie, huidige protocol",
  "Bloedwerk-interpretatie (upload uitslagen vooraf)",
  "60 minuten video-call (Signal / Zoom / Google Meet)",
  "Schriftelijke samenvatting binnen 48u met vervolgstappen",
  "1 opvolgvraag via e-mail binnen 30 dagen",
];

const NOT_INCLUDES = [
  "Voorschrijven of leveren van medicatie - daarvoor een arts",
  "Financieel advies over anabolen aanschaf",
  "Diagnose van medische aandoeningen",
];

export default function ConsultPage() {
  return (
    <>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-5xl px-4 py-16 md:py-20">
          <div className="inline-flex items-center gap-2 rounded-sm border border-primary-foreground/20 bg-primary-foreground/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-accent-soft">
            <Stethoscope size={12} /> Consult
          </div>
          <h1 className="mt-4 font-display text-4xl md:text-5xl leading-tight max-w-2xl">
            Een uur, één gesprek, één keer echt kritisch kijken naar wat je doet.
          </h1>
          <p className="mt-5 max-w-2xl text-primary-foreground/80 text-lg leading-relaxed">
            60 minuten video-call. Vooraf uploadstuur je bloedwerk. Tijdens de call gaan we door
            je huidige protocol, doelen en de wetenschappelijke basis daaronder. Na afloop
            ontvang je een schriftelijke samenvatting en vervolgstappen.
          </p>
          <div className="mt-6 flex items-center gap-6 text-sm text-primary-foreground/70">
            <span className="inline-flex items-center gap-2"><Clock size={14} /> 60 minuten</span>
            <span className="inline-flex items-center gap-2"><ClipboardCheck size={14} /> €120 per sessie</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl text-text">Wat het bevat</h2>
          <ul className="mt-5 space-y-3 text-sm text-text-muted">
            {INCLUDES.map((line) => (
              <li key={line} className="flex items-start gap-2 leading-relaxed">
                <span className="text-accent font-bold mt-0.5">✓</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-2xl text-text">Wat het niet bevat</h2>
          <ul className="mt-5 space-y-3 text-sm text-text-muted">
            {NOT_INCLUDES.map((line) => (
              <li key={line} className="flex items-start gap-2 leading-relaxed">
                <span className="text-danger font-bold mt-0.5">×</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-display text-3xl text-text text-center">Consult aanvragen</h2>
          <p className="mt-3 text-center text-text-muted">
            Vul dit korte formulier in - we plannen binnen 1 werkdag een tijdstip in en sturen je
            een korte intake-vragenlijst.
          </p>
          <div className="mt-8 rounded-lg border border-border bg-background p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 text-center">
        <p className="text-xs uppercase tracking-[0.15em] text-accent font-semibold">Onze rol</p>
        <h2 className="mt-2 font-display text-2xl md:text-3xl">
          Wij zijn geen artsenpraktijk
        </h2>
        <p className="mt-4 text-text-muted max-w-2xl mx-auto leading-relaxed">
          Anabolendoktor is een consultatie- en informatie-dienst - niet een BIG-geregistreerde
          artsenpraktijk. Onze consulenten hebben achtergrond in bewegingswetenschap, biochemie
          en endocrinologie, maar diagnoseren of behandelen niet. Voor medische zorg verwijzen
          wij door naar huisartsen of endocrinologen met kennis van deze problematiek.
        </p>
        <div className="mt-8">
          <Link href="/contact" className="inline-flex items-center gap-2 rounded border border-border-strong px-6 h-11 text-sm text-text hover:border-accent hover:text-accent">
            Overige vragen? Neem contact op <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </>
  );
}
