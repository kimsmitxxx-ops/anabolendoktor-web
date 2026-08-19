import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { ADVIES, vindAdvies } from "@/lib/advies-content";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return ADVIES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = vindAdvies(params.slug);
  if (!a) return { title: "Niet gevonden" };
  return {
    title: a.metaTitle,
    description: a.metaDescription,
    alternates: { canonical: `/advies/${a.slug}` },
    openGraph: { title: a.metaTitle, description: a.metaDescription, type: "article" },
  };
}

export default function AdviesPagina({ params }: { params: { slug: string } }) {
  const a = vindAdvies(params.slug);
  if (!a) notFound();

  const overige = ADVIES.filter((x) => x.slug !== a.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.titel,
    description: a.metaDescription,
    author: { "@type": "Organization", name: "Anabolendoktor" },
    publisher: { "@type": "Organization", name: "Anabolendoktor" },
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mb-6 text-xs text-text-muted">
        <Link href="/" className="hover:underline">Home</Link> /{" "}
        <Link href="/advies" className="hover:underline">Advies</Link> / <span>{a.titel}</span>
      </div>

      <h1 className="font-display text-3xl md:text-4xl">{a.titel}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-text-muted">{a.intro}</p>

      <div className="mt-10 space-y-10">
        {a.blokken.map((b) => (
          <section key={b.h}>
            <h2 className="font-display text-2xl">{b.h}</h2>
            {b.p.map((tekst, i) => (
              <p key={i} className="mt-3 leading-relaxed text-text-muted">{tekst}</p>
            ))}
          </section>
        ))}
      </div>

      {a.lijst && a.lijst.length > 0 && (
        <div className="mt-12 rounded-xl border border-accent/40 bg-accent-soft/15 p-6">
          <h2 className="inline-flex items-center gap-2 font-display text-xl">
            <AlertTriangle className="h-5 w-5 text-accent" />
            {a.lijstTitel}
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-text-muted">
            {a.lijst.map((l) => <li key={l}>{l}</li>)}
          </ul>
        </div>
      )}

      <div className="mt-12 rounded-xl border border-paper-border bg-paper-soft p-6">
        <p className="text-sm leading-relaxed text-text-muted">
          Deze pagina is voorlichting en geen medisch advies. Er ontstaat geen behandelrelatie
          door het lezen ervan. Wij verkopen geen anabolen; bij klachten of twijfel is uw
          huisarts het juiste adres.
        </p>
        <Link
          href={a.cta.href}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent-soft"
        >
          {a.cta.tekst} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {overige.length > 0 && (
        <section className="mt-14 border-t border-paper-border pt-10">
          <h2 className="font-display text-xl">Andere onderwerpen</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {overige.map((o) => (
              <Link
                key={o.slug}
                href={`/advies/${o.slug}`}
                className="rounded-xl border border-paper-border bg-paper-soft p-5 transition-colors hover:border-accent"
              >
                <h3 className="font-display text-base">{o.titel}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-text-muted">{o.intro}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
