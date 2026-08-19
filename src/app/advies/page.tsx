import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ADVIES } from "@/lib/advies-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Advies over anabolen, stoppen en bloedwaarden",
  description:
    "Objectieve voorlichting over anabolen: stoppen, gevaren, bloedwaarden na een kuur, vruchtbaarheid en een eerste kuur overwegen. Van een partij die niets verkoopt.",
  alternates: { canonical: "/advies" },
};

export default function AdviesIndex() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-6 text-xs text-text-muted">
        <Link href="/" className="hover:underline">Home</Link> / <span>Advies</span>
      </div>

      <h1 className="font-display text-3xl md:text-4xl">Advies</h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-text-muted">
        Wie anabolen gebruikt of dat overweegt, krijgt zijn informatie meestal van partijen die
        er belang bij hebben. Verkopers bagatelliseren, campagnes moraliseren. Wij verkopen geen
        middelen, dus hieronder staat wat er feitelijk bekend is, inclusief de nuance dat lang
        niet elk risico iedereen treft.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {ADVIES.map((a) => (
          <Link
            key={a.slug}
            href={`/advies/${a.slug}`}
            className="group rounded-xl border border-paper-border bg-paper-soft p-6 transition-colors hover:border-accent"
          >
            <h2 className="font-display text-xl">{a.titel}</h2>
            <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-text-muted">{a.intro}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
              Lees verder
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-paper-border bg-paper-soft p-6">
        <h2 className="font-display text-xl">Liever een persoonlijk gesprek?</h2>
        <p className="mt-2 max-w-2xl text-text-muted">
          Deze pagina&apos;s zijn algemeen. Uw situatie is dat niet. In een consult nemen wij uw
          bloedwaarden en uw omstandigheden door en bespreken wij wat er in uw geval speelt.
        </p>
        <Link
          href="/consult"
          className="mt-4 inline-flex rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent-soft"
        >
          Consult aanvragen
        </Link>
      </div>
    </div>
  );
}
