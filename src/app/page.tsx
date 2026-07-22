import Link from "next/link";
import { listBlogPosts } from "@/lib/queries";
import { HomeUspBar } from "@/components/shop/home-usp-bar";
import { ArticleCard } from "@/components/article-card";
import { FaqAccordion } from "@/components/faq-accordion";
import { NewsletterForm } from "@/components/newsletter-form";
import {
  Stethoscope,
  BookOpen,
  ShieldCheck,
  ArrowRight,
  ClipboardList,
  Heart,
  Microscope,
  Leaf,
} from "lucide-react";

export const revalidate = 300;
export const dynamic = "force-dynamic";

const HOMEPAGE_FAQ = [
  {
    question: "Waarom bestaat anabolendoktor.com?",
    answer:
      "Er is veel informatie online over anabole steroïden — vaak eenzijdig en gedreven door verkoop. Deze site is opgezet als tegenwicht: een formele bron die de wetenschappelijke onderbouwing van legale alternatieven, bloedwerk-monitoring en gezondheidsrisico's bij AAS-gebruik bespreekt. Wij verkopen géén anabolen. Wél helpen wij mensen die er al mee bezig zijn hun risico's te begrijpen en te beperken.",
  },
  {
    question: "Zijn er echte alternatieven voor anabolen?",
    answer:
      "Volledig vervangen: nee — hormonale effecten van exogene AAS zijn met legale supplementen niet te repliceren. Maar het verschil tussen iemand die geoptimaliseerd traint, eet en supplementeert versus iemand die dat niet doet is aanzienlijk. Creatine (5 g/dag) geeft +10-15% kracht binnen 4 weken. Vitamine D-optimalisatie normaliseert testosteron bij tekorten. Slaap, stress en insulinegevoeligheid hebben groter effect dan de meeste beseffen.",
  },
  {
    question: "Bieden jullie consulten aan?",
    answer:
      "Ja. Een 60-minuten consult bespreekt jouw doelen, bloedwerk-uitslagen (waarden meebrengen), trainingsplan en herstel. Voor mensen die AAS gebruiken of overwegen: harm-reduction advies zonder oordeel. Voor natural trainers: een structureel plan voor de komende 6-12 maanden. Prijs: €120 per consult, via video-call.",
  },
  {
    question: "Wat is jullie standpunt over PCT-preparaten (Clomid, Nolvadex)?",
    answer:
      "Zonder recept SERM's gebruiken is medisch risicovol. Als iemand een cycle heeft afgesloten en herstel-ondersteuning nodig heeft, adviseren wij een huisarts of endocrinoloog te bezoeken en bloedwerk (LH, FSH, totaal testosteron, oestradiol) mee te nemen. Waar mogelijk verwijzen wij door naar artsen die bekend zijn met deze problematiek.",
  },
  {
    question: "Welke supplementen bevelen jullie aan?",
    answer:
      "Een kleine selectie op basis van meta-analyses en klinische studies: creatine monohydraat (5 g/dag), vitamine D3+K2 (afgestemd op bloedwerk-25(OH)D), magnesium bisglycinaat (300 mg voor slaap), whey isolate (bij eiwit-tekort), omega-3 EPA/DHA (2-3 g/dag), ashwagandha KSM-66 (600 mg/dag). Wij verkopen deze niet uit voorraad — links naar leveranciers met COA.",
  },
  {
    question: "Hoe zit het met privacy bij consulten?",
    answer:
      "Consultgegevens vallen onder medische geheimhouding (BIG-register). Wij houden geen dossier bij dan wat noodzakelijk is en delen niets met derden. Betaling via IBAN of factuur, geen creditcard-tracking.",
  },
  {
    question: "Wanneer moet ik écht naar een arts?",
    answer:
      "Bij symptomen van hoge bloeddruk (hoofdpijn, wazig zien), abnormale hartkloppingen, tekenen van leverklachten (geel oog, donkere urine), extreme stemmingswisselingen of langdurige suppressie (>12 maanden zonder herstel). AAS-gebruik is een medisch onderwerp — behandel het zo.",
  },
];

export default async function HomePage() {
  const dbArticles = await listBlogPosts(6);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOMEPAGE_FAQ.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero — bewust formeler, geen "koop nu" energie */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="mx-auto max-w-5xl px-4 py-20 md:py-28 text-center">
          <span className="inline-flex items-center gap-2 rounded-sm border border-primary-foreground/25 bg-primary-foreground/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-accent-soft">
            <Stethoscope size={12} /> Onafhankelijk consult · Evidence-based
          </span>
          <h1 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-3xl mx-auto">
            Legale wegen naar
            <br />
            <span className="text-accent-soft">een sterk lichaam.</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-primary-foreground/80 leading-relaxed">
            Anabolendoktor is een consultatie- en informatie-platform voor mensen die willen
            trainen en presteren zonder anabole steroïden — én voor mensen die er al mee bezig
            zijn en hun risico's willen begrijpen. Wij verkopen geen anabolen. Wel bloedwerk-inzicht,
            begeleiding en een kleine selectie legale supplementen.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/consult" className="inline-flex items-center gap-2 rounded bg-accent px-6 h-12 text-accent-foreground font-medium hover:bg-accent-muted transition-colors">
              Consult aanvragen <ArrowRight size={16} />
            </Link>
            <Link href="/kennisbank" className="inline-flex items-center gap-2 rounded border border-primary-foreground/25 px-6 h-12 text-primary-foreground/90 font-medium hover:bg-primary-foreground/10 transition-colors">
              Naar kennisbank <BookOpen size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Onze aanpak */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <p className="text-xs uppercase tracking-[0.15em] text-accent font-semibold">Onze aanpak</p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl">Drie pijlers, geen shortcuts</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-paper-soft p-6">
            <ClipboardList size={22} className="text-accent" />
            <h3 className="mt-4 font-display text-xl text-text">Bloedwerk als startpunt</h3>
            <p className="mt-2 text-sm text-text-muted leading-relaxed">
              Voor je iets verandert weten we waar je staat: totaal + vrij testosteron, oestradiol,
              SHBG, LH/FSH, lipidenpanel, HbA1c, vitamine D, ferritine, TSH. Zonder deze waardes
              is elk advies giswerk.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-paper-soft p-6">
            <Heart size={22} className="text-accent" />
            <h3 className="mt-4 font-display text-xl text-text">Trainen &amp; herstel eerst</h3>
            <p className="mt-2 text-sm text-text-muted leading-relaxed">
              Progressive overload, 4-6 sessies per week op je individuele MRV, 7-9u slaap,
              stressmanagement en 1.6-2.2 g eiwit per kilo. Deze pijlers doen 80% van het werk —
              elke supplement of interventie erbij is aanvulling.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-paper-soft p-6">
            <Microscope size={22} className="text-accent" />
            <h3 className="mt-4 font-display text-xl text-text">Evidence-based supplementen</h3>
            <p className="mt-2 text-sm text-text-muted leading-relaxed">
              Een korte lijst legale supplementen met sterke meta-analyses: creatine, vitamine D3+K2,
              magnesium, omega-3, ashwagandha, whey. Geen "boosters" of "T-optimizers" — die zijn
              placebo of erger.
            </p>
          </div>
        </div>
      </section>

      {/* Kennisbank */}
      {dbArticles.length > 0 && (
        <section className="bg-surface py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-accent font-semibold">Kennisbank</p>
                <h2 className="mt-2 font-display text-3xl md:text-4xl">Onderbouwing, geen forum-mythes</h2>
              </div>
              <Link href="/kennisbank" className="text-sm text-accent hover:text-accent-muted inline-flex items-center gap-1">
                Alle artikelen <ArrowRight size={14} />
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {dbArticles.slice(0, 3).map((a: any) => (
                <Link key={a.id} href={`/kennisbank/${a.slug}`} className="block group">
                  <ArticleCard
                    title={a.title}
                    image={a.image_url || "/assets/bloodwork.jpg"}
                    excerpt={a.excerpt || ""}
                    kindTag={a.category || "Onderzoek"}
                    publishedAt={new Date(a.published_at).toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" })}
                    author={{ name: a.author || "Dr. Anabolendoktor", credentials: "MD" }}
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trust-strook */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-paper-soft p-6">
            <ShieldCheck size={22} className="text-accent" />
            <h3 className="mt-4 font-display text-xl text-text">Geen verkoop-druk</h3>
            <p className="mt-2 text-sm text-text-muted">
              Wij verkopen geen anabolen. Wat wij aanbieden zijn consulten en verwijzingen — dat
              scheidt onze advies-belangen van commerciële belangen.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-paper-soft p-6">
            <Leaf size={22} className="text-accent" />
            <h3 className="mt-4 font-display text-xl text-text">Harm-reduction zonder oordeel</h3>
            <p className="mt-2 text-sm text-text-muted">
              Gebruik je AAS? Dat blijft jouw keuze. Wij helpen je bij bloedwerk-interpretatie,
              risico-inschatting en verwijzen door naar artsen met kennis.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-paper-soft p-6">
            <Microscope size={22} className="text-accent" />
            <h3 className="mt-4 font-display text-xl text-text">Bronvermelding standaard</h3>
            <p className="mt-2 text-sm text-text-muted">
              Elke bewering in onze kennisbank verwijst naar PubMed, ClinicalTrials of peer-reviewed
              publicaties. Geen anekdotes als bewijs.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <p className="text-xs uppercase tracking-[0.15em] text-accent font-semibold">Veelgestelde vragen</p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl">Wat je waarschijnlijk wilt weten</h2>
        <div className="mt-8">
          <FaqAccordion items={HOMEPAGE_FAQ.map((f) => ({ question: f.question, answer: f.answer }))} />
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary text-primary-foreground py-14">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-xs uppercase tracking-wider text-accent-soft">Nieuwsbrief</p>
          <h2 className="mt-2 font-display text-3xl">Nieuwe artikelen &amp; onderzoek in je inbox</h2>
          <p className="mt-3 text-primary-foreground/70 text-sm">
            Diepgaande stukken over trainings-, herstel- en supplement-onderzoek. Geen sales,
            unsubscribe met één klik.
          </p>
          <div className="mt-6 flex justify-center">
            <NewsletterForm variant="hero-mini" />
          </div>
        </div>
      </section>
    </>
  );
}
