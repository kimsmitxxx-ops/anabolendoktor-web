import Link from "next/link";
import type { Metadata } from "next";
import { Stethoscope, ClipboardCheck, Clock, ArrowRight } from "lucide-react";
import { ContactForm } from "@/components/shop/contact-form";

export const metadata: Metadata = {
  title: "Consult aanvragen - bloedwerk-interpretatie, harm-reduction, trainingsplan",
  description:
    "Consult via video-call: bloedwaarden, herstel, natural opbouw of de vraag of beginnen verstandig is. €50 per consult, en daarna 10% korting op de pakketten.",
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
            Een uur, één gesprek, één keer echt kritisch kijken naar wat u doet.
          </h1>
          <p className="mt-5 max-w-2xl text-primary-foreground/80 text-lg leading-relaxed">
            60 minuten video-call. Vooraf stuurt u uw bloedwerk op. Tijdens de call nemen wij uw
            huidige situatie, uw doelen en de wetenschappelijke basis daaronder door. Na afloop
            ontvangt u een schriftelijke samenvatting met vervolgstappen.
          </p>
          <div className="mt-6 flex items-center gap-6 text-sm text-primary-foreground/70">
            <span className="inline-flex items-center gap-2"><Clock size={14} /> 45 tot 60 minuten</span>
            <span className="inline-flex items-center gap-2"><ClipboardCheck size={14} /> €50 per consult</span>
          </div>
          <p className="mt-4 max-w-2xl text-sm text-primary-foreground/70">
            Na een betaald consult ontvangt u van de consulent een persoonlijke kortingscode
            voor 10% op de pakketten. Wie eerst wil praten voordat hij iets koopt, betaalt
            het advies zo niet dubbel.
          </p>
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

      {/* Wat er na het consult gebeurt. Stond er niet, terwijl dat voor veel
          bezoekers juist de vraag is waarmee ze binnenkomen. */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <p className="text-xs uppercase tracking-[0.18em] text-accent font-semibold">Na het consult</p>
          <h2 className="mt-3 font-display text-2xl md:text-3xl text-text">
            Het gesprek eindigt met een besluit, niet met een verkoop
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-text">Vaak: eerst iets anders</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                Bij een groot deel van de gesprekken is de uitkomst dat er niets hoeft te
                veranderen behalve trainingsopbouw, eiwitinname of slaap, of dat er eerst gemeten
                moet worden. Dat is een volwaardige uitkomst en wij brengen er niets extra&apos;s
                voor in rekening.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-text">Soms: een herhaalmeting</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                Waarden die de goede of de verkeerde kant op bewegen zeggen meer dan één uitslag.
                U krijgt in dat geval de meetmomenten mee en kunt de nieuwe uitslag bij uw
                opvolgvraag voorleggen.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-text">Als het aan de orde is: een doorverwijzing</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                Blijkt uit het gesprek dat begeleiding onder medisch toezicht op zijn plaats is,
                dan bespreken wij welke route daarvoor bestaat en verwijzen wij u door naar een
                arts. Wij schrijven zelf niets voor en leveren zelf niets. Dat besluit valt in het
                gesprek, samen met u, en nooit ervoor.
              </p>
            </div>
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-text-subtle">
            Weet u nog niet welke vraag u zou moeten stellen, doe dan eerst de{" "}
            <Link href="/keuzehulp" className="text-accent hover:underline">keuzehulp</Link>. Die
            geeft u op basis van uw doel, ervaring en gezondheid een concept-advies dat u
            vervolgens in dit gesprek voorlegt.
          </p>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-display text-3xl text-text text-center">Consult aanvragen</h2>
          <p className="mt-3 text-center text-text-muted">
            Vul dit korte formulier in - we plannen binnen 1 werkdag een tijdstip in en sturen u een korte intake-vragenlijst.
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
