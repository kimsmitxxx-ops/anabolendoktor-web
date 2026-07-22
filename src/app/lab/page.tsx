import Link from "next/link";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/badge";
import { FaqAccordion } from "@/components/faq-accordion";
import {
  ArrowRight,
  CheckCircle2,
  FlaskConical,
  ShieldCheck,
  XCircle,
  Beaker,
  ScanLine,
  FileCheck2,
  Search,
  Microscope,
  Package,
} from "lucide-react";
import { LabRequestForm } from "@/components/shop/lab-request-form";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Labtesten & COA's — alle batches doorzoekbaar · Anabolendoktor",
  description: "Doorzoek elk HPLC-rapport per batchcode. Iedere flacon is traceerbaar naar een onafhankelijk lab — Janoshik, Anabolic Lab, Eurofins en SIMEC.",
  alternates: { canonical: "/lab" },
};

const labPartners = [
  { name: "Janoshik Analytical", country: "Tsjechië", method: "HPLC-UV" },
  { name: "Anabolic Lab", country: "Verenigde Staten", method: "GC-MS" },
  { name: "Eurofins Scientific", country: "Nederland", method: "HPLC-MS" },
  { name: "SIMEC AG", country: "Zwitserland", method: "HPLC-DAD" },
];

const process = [
  { icon: Beaker, step: "01", title: "Sampling per batch", body: "Van elke binnenkomende batch trekken we 3 willekeurige flacons uit verschillende dozen." },
  { icon: ScanLine, step: "02", title: "HPLC- & GC-MS-analyse", body: "Het lab bepaalt werkzame stof, zuiverheid, onbedoelde isomeren en oplosmiddelresten." },
  { icon: FileCheck2, step: "03", title: "Publicatie of afkeur", body: "Boven 97% komt de batch in de webshop met COA. Daaronder gaat álles retour naar de leverancier." },
];

const faqItems = [
  { question: "Wat is een COA precies?", answer: "Een Certificate of Analysis is het officiële PDF-rapport van het onafhankelijke laboratorium. Het bevat de batchcode, de geanalyseerde stof, de gemeten zuiverheid, de gebruikte methode en de testdatum." },
  { question: "Waarom publiceren jullie ook afkeuringen?", answer: "Omdat transparantie alleen telt als je ook laat zien wat fout ging. Afgekeurde batches blijven zichtbaar in ons archief, inclusief reden van afkeur en wat we met de partij gedaan hebben." },
  { question: "Kan ik mijn flacon zelf laten testen?", answer: "Ja. Op iedere flacon staat een batchcode. Stuur ons het labrapport van bijvoorbeeld Janoshik en je krijgt het verschil met onze meting volledig terug — ook als jouw rapport binnen de tolerantie valt." },
  { question: "Welke tolerantie hanteren jullie?", answer: "We accepteren een batch alleen bij ≥ 97% zuiverheid en een gemeten concentratie binnen ±5% van de gelabelde waarde. Alles daarbuiten wordt geweigerd." },
];

export default function LabPage() {
  const avgPurity = 99.12;
  const totalBatches = 186;

  return (
    <>
      <section className="relative overflow-hidden bg-primary text-primary-foreground border-y border-border">
        <div aria-hidden className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "28px 28px" }} />
        <div className="relative mx-auto max-w-7xl px-4 py-16 lg:py-24 grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center">
          <div>
            <Badge variant="accent">Volledige transparantie</Badge>
            <h1 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
              Elke batch <span className="text-accent-soft">aantoonbaar</span> zuiver.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-primary-foreground/80 leading-relaxed">
              Iedere binnenkomende partij gaat eerst door HPLC- en GC-MS-analyse bij een onafhankelijk lab.
              Pas daarna komt het in de shop. COA-rapporten verschijnen per product zodra ze beschikbaar zijn.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#proces" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent-soft">
                <Search size={16} /> Hoe wij testen
              </Link>
              <Link href="/winkel" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 px-5 py-3 text-sm font-medium hover:bg-primary-soft">
                Naar de shop <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-accent-soft font-semibold">Lab-statistieken 2026</p>
            <dl className="mt-5 grid grid-cols-2 gap-5">
              <div><dt className="text-xs text-primary-foreground/60">Gemiddelde zuiverheid</dt><dd className="mt-1 font-display text-3xl text-accent-soft tabular">{avgPurity.toFixed(2)}%</dd></div>
              <div><dt className="text-xs text-primary-foreground/60">Producten online</dt><dd className="mt-1 font-display text-3xl text-primary-foreground tabular">{totalBatches}</dd></div>
              <div><dt className="text-xs text-primary-foreground/60">Afgekeurde batches</dt><dd className="mt-1 font-display text-3xl text-primary-foreground tabular">7</dd></div>
              <div><dt className="text-xs text-primary-foreground/60">Partner-labs</dt><dd className="mt-1 font-display text-3xl text-primary-foreground tabular">4</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section id="proces" className="bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.18em] text-accent font-semibold">Ons proces</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl text-primary leading-tight">Van flacon tot rapport in drie stappen</h2>
            <p className="mt-4 text-primary/70 leading-relaxed">We werken niet met &ldquo;steekproeven per maand&rdquo;. Iedere batch wordt afzonderlijk getest voordat hij in de webshop verschijnt.</p>
          </div>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {process.map((p) => {
              const Icon = p.icon;
              return (
                <li key={p.step} className="relative rounded-xl border border-paper-border bg-paper-soft p-7 shadow-card">
                  <span className="absolute -top-3 left-7 inline-flex items-center rounded bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground tabular">{p.step}</span>
                  <Icon size={28} className="text-accent" />
                  <h3 className="mt-4 font-display text-xl text-primary leading-tight">{p.title}</h3>
                  <p className="mt-2 text-sm text-primary/70 leading-relaxed">{p.body}</p>
                </li>
              );
            })}
          </ol>
          <div className="mt-12 grid md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-success/20 bg-success-soft/40 p-6">
              <div className="flex items-center gap-2"><CheckCircle2 size={20} className="text-success" /><h4 className="font-display text-lg text-primary">Goedgekeurd ≥ 97%</h4></div>
              <p className="mt-2 text-sm text-primary/70">Batch krijgt een COA, batchcode op het flesje en verschijnt met rapport in de webshop.</p>
            </div>
            <div className="rounded-xl border border-danger/20 bg-danger-soft/40 p-6">
              <div className="flex items-center gap-2"><XCircle size={20} className="text-danger" /><h4 className="font-display text-lg text-primary">Afgekeurd &lt; 97%</h4></div>
              <p className="mt-2 text-sm text-primary/70">Volledige partij retour naar leverancier. Reden van afkeur blijft openbaar in het archief.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background border-y border-border">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <SectionHeading variant="eyebrow-plus-display" eyebrow="Onafhankelijke labs">Met wie wij samenwerken</SectionHeading>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {labPartners.map((p) => (
              <div key={p.name} className="rounded-lg border border-border bg-surface p-5 hover:border-accent transition-colors">
                <FlaskConical size={20} className="text-accent" />
                <h3 className="mt-3 font-display text-lg text-text leading-tight">{p.name}</h3>
                <dl className="mt-3 space-y-1 text-xs">
                  <div className="flex justify-between"><dt className="text-text-subtle">Land</dt><dd className="text-text">{p.country}</dd></div>
                  <div className="flex justify-between"><dt className="text-text-subtle">Methode</dt><dd className="text-text tabular">{p.method}</dd></div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NIEUWE sectie — Eigen test aanvragen */}
      <section className="bg-paper border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="rounded-2xl border border-accent/30 bg-accent-soft/10 p-8 lg:p-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] items-center">
            <div>
              <Badge variant="accent">Op aanvraag</Badge>
              <h2 className="mt-3 font-display text-3xl md:text-4xl text-primary leading-tight">
                Laat je <span className="text-accent">eigen flacon</span> testen bij Janoshik
              </h2>
              <p className="mt-4 text-primary/75 leading-relaxed max-w-xl">
                Twijfel je over een product van een andere shop of leverancier? Wij regelen de
                onafhankelijke Janoshik-test voor je. Opsturen, wij coördineren, jij krijgt het
                originele PDF-rapport in je mailbox. Goed voor jou, goed voor de community.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-primary/80">
                <li className="flex items-start gap-2"><Package size={16} className="text-accent shrink-0 mt-0.5" /> Stuur 1 flacon naar ons NL-magazijn (Vlaardingen)</li>
                <li className="flex items-start gap-2"><FlaskConical size={16} className="text-accent shrink-0 mt-0.5" /> Wij sturen door naar Janoshik (HPLC-UV) — duurt 2-3 weken</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" /> COA per mail, ook publiek als jij dat wil zodat anderen profiteren</li>
              </ul>
              <p className="mt-4 text-xs text-primary/60">
                Tarief: kostprijs van de Janoshik-test (~€60). Gratis bij vermoeden onveilig product.
              </p>
            </div>
            <div>
              <LabRequestForm />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-4xl px-4 py-16 lg:py-20">
          <SectionHeading variant="eyebrow-plus-display" eyebrow="Veelgestelde vragen" className="text-primary [&_*]:text-primary">Over onze labtesten</SectionHeading>
          <div className="mt-8"><FaqAccordion items={faqItems} tone="light" /></div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-start gap-4">
            <ShieldCheck size={32} className="text-accent shrink-0" />
            <div>
              <h3 className="font-display text-2xl text-primary-foreground">Liever eerst de wetenschap lezen?</h3>
              <p className="mt-1 text-primary-foreground/70 max-w-xl">Onze kennisbank bundelt studies over bloedwerk, PCT-protocollen en veiligheid.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/kennisbank" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent-soft">
              <Microscope size={16} /> Naar kennisbank
            </Link>
            <Link href="/winkel" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 px-5 py-3 text-sm font-medium hover:bg-primary-soft">
              Naar de shop <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
