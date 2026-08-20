import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shop/page-hero";
import { KeuzehulpClient } from "@/components/keuzehulp-client";

export const metadata: Metadata = {
  title: "Keuzehulp - zes vragen, dan weet u welke stap logisch is",
  description:
    "Beantwoord zes vragen over uw doel, ervaring, leeftijd en gezondheid. U krijgt een concept-advies met de volgorde van stappen, dat u daarna met een consulent bespreekt.",
  alternates: { canonical: "/keuzehulp" },
};

const FAQ = [
  {
    q: "Krijg ik hier een kuurschema uit?",
    a: "Nee, en dat gaat ook niet gebeuren. De keuzehulp geeft een volgorde van stappen: wat u zou moeten meten, wat u zou moeten lezen en welk gesprek daarbij hoort. Doseringen, middelen en schema's staan er niet in en komen ook in een consult niet op papier. Wij schrijven niets voor en leveren niets.",
  },
  {
    q: "Waarom is de uitkomst een concept?",
    a: "Omdat zes vragen nooit genoeg zijn. Uw medicatie, uw voorgeschiedenis, wat u eerder heeft gebruikt en hoe uw bloedwaarden eruitzien kunnen het advies compleet omgooien. De uitkomst is daarom een vertrekpunt voor het gesprek, en het besluit valt pas daarna.",
  },
  {
    q: "Worden mijn antwoorden opgeslagen?",
    a: "Niet zolang u ze niet verstuurt. De keuzehulp draait volledig in uw browser en er gaat niets naar onze servers tot u onderaan zelf het formulier invult en verzendt. Doet u dat wel, dan komen uw antwoorden in dezelfde beveiligde inbox terecht als een gewoon contactbericht en gaan ze niet naar uw huisarts, verzekeraar of werkgever.",
  },
  {
    q: "Wat gebeurt er na het consult?",
    a: "Dan hangt het van de uitkomst af. Bij een deel van de mensen is de conclusie dat er niets hoeft te veranderen behalve training, voeding of slaap. Bij anderen volgt eerst een meting of een herhaalmeting. Blijkt dat begeleiding onder medisch toezicht aan de orde is, dan bespreken wij welke route daarvoor bestaat en verwijzen wij u door naar een arts. Dat besluit nemen wij samen met u, en nooit in deze keuzehulp.",
  },
  {
    q: "Ik gebruik al. Is de keuzehulp dan nog zinvol?",
    a: "Ja. De uitkomst is dan gericht op wat u nu zou moeten meten en welke signalen niet kunnen wachten, in plaats van op de vraag of u zou moeten beginnen. Wees eerlijk bij de vraag over uw ervaring; het advies verandert er ingrijpend door.",
  },
];

export default function KeuzehulpPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <PageHero
        eyebrow="Keuzehulp"
        title="Zes vragen, en daarna weet u welke stap in uw situatie de logische is"
        intro="Uw doel, uw ervaring, uw leeftijd en uw gezondheid bepalen samen wat verstandig is. De keuzehulp zet die vier naast elkaar en geeft u een concept-advies met de volgorde van stappen. Dat concept bespreekt u vervolgens met een consulent, en pas daarna valt een besluit."
      />

      <KeuzehulpClient />

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <h2 className="font-display text-2xl md:text-3xl text-text">Veelgestelde vragen over de keuzehulp</h2>
          <dl className="mt-8 space-y-7">
            {FAQ.map((f) => (
              <div key={f.q}>
                <dt className="font-medium text-text">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-text-muted">{f.a}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/advies"
              className="inline-flex items-center gap-2 rounded border border-border-strong px-5 h-11 text-sm text-text hover:border-accent hover:text-accent"
            >
              Alle adviespagina&apos;s <ArrowRight size={14} />
            </Link>
            <Link
              href="/consult"
              className="inline-flex items-center gap-2 rounded bg-primary px-5 h-11 text-sm text-primary-foreground"
            >
              Hoe een consult verloopt <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
