import Link from "next/link";
import { listProducts, formatEUR } from "@/lib/queries";

/**
 * De pakketten onder een kennisbankartikel, als route naar het aanbod.
 *
 * Aanleiding: /anabolen-kopen haalt 512 vertoningen per 28 dagen binnen, meer
 * dan de rest van de site bij elkaar, en linkte nul keer naar /winkel/pakketten.
 * Het artikel over legale alternatieven linkte naar helemaal niets. Het verkeer
 * dat binnenkwam had dus geen route naar het aanbod, en dat verklaart 505
 * vertoningen met koopintentie die samen 1 klik opleverden.
 *
 * Bewust de echte producten met de echte prijs, uit de database. Een los
 * knopje "bekijk ons aanbod" is precies het soort vulling dat niemand aanklikt.
 *
 * Alleen tonen onder artikelen waar het past. Een blok dat onder elk artikel
 * staat is een banner, en banners worden weggekeken.
 */
export async function PakkettenBlok() {
  const pakketten = (await listProducts({ categorySlug: "pakketten", limit: 3 }))
    .slice()
    .sort((a, b) => a.price_cents - b.price_cents);

  if (!pakketten.length) return null;

  return (
    <section className="mt-16 rounded-xl border border-border bg-surface p-6 md:p-8">
      <h2 className="font-display text-2xl text-text">
        Hetzelfde doel, zonder de schade
      </h2>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-text-muted">
        Wie wil opbouwen of droogtrainen hoeft daar geen kuur voor te doen. Deze
        pakketten mikken op hetzelfde, met supplementen die onderbouwd zijn, een
        schema dat bij uw situatie past en een consult van 45 minuten. Minder
        hard dan een kuur, dat is geen geheim. Wel legaal, en zonder herstel
        achteraf.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {pakketten.map((p) => (
          <Link
            key={p.slug}
            href={`/product/${p.categories?.slug ?? "pakketten"}/${p.slug}`}
            className="group rounded-lg border border-border bg-paper p-4 transition-colors hover:border-accent"
          >
            <p className="font-display text-lg text-text group-hover:text-accent">{p.name}</p>
            {p.subtitle && (
              <p className="mt-1.5 text-xs leading-relaxed text-text-muted">{p.subtitle}</p>
            )}
            <p className="mt-3 text-sm font-medium text-text">{formatEUR(p.price_cents)}</p>
          </Link>
        ))}
      </div>

      <p className="mt-5 text-xs text-text-muted">
        Wij verkopen geen anabolen. Blijkt uit het consult dat bloedonderzoek
        verstandig is, dan regelen we dat.
      </p>
    </section>
  );
}
