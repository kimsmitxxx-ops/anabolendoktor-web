import Link from "next/link";
import { listCategories, listProducts, sortProducts } from "@/lib/queries";
import { ProductCard } from "@/components/product-card";
import { CatalogFilters } from "@/components/shop/catalog-filters";
import { KNOWN_BRANDS, sortBrands } from "@/lib/brands";
import type { Metadata } from "next";
import { BookOpen, Truck, ShieldCheck, FlaskConical, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Winkel - alle anabolen, PCT en kuurpakketten",
  description: "Volledig overzicht van anabolenpro: Anavar, Dianabol, Testosteron-esters, Trenbolone, Masteron, Boldenone, PCT en kuurpakketten. Lab-getest per batch.",
  alternates: { canonical: "/winkel" },
};

export default async function WinkelIndexPage({
  searchParams,
}: {
  searchParams: { stock?: string; merk?: string; stof?: string; locatie?: string; q?: string };
}) {
  const [categories, allProducts] = await Promise.all([
    listCategories(),
    listProducts({ limit: 200 }),
  ]);

  const stockOnly = searchParams.stock === "1";
  const merk = searchParams.merk || "";
  const stof = (searchParams.stof || "").toLowerCase();
  const locatie = searchParams.locatie || "";
  const q = (searchParams.q || "").trim().toLowerCase();

  const brandSet = new Set<string>();
  allProducts.forEach((p) => p.tags?.forEach((t) => { if (KNOWN_BRANDS.has(t)) brandSet.add(t); }));
  const brands = sortBrands(Array.from(brandSet));

  const filtered = allProducts.filter((p) => {
    if (stockOnly && p.availability === "OutOfStock") return false;
    if (merk && !(p.tags || []).includes(merk)) return false;
    if (stof && !(p.stof_slugs || []).includes(stof)) return false;
    if (locatie === "01" && !(p.tags || []).includes("UT")) return false;
    if (locatie === "02" && (p.tags || []).includes("UT")) return false;
    if (q) {
      const hay = `${p.name} ${p.slug} ${(p.tags || []).join(" ")} ${(p.stof_slugs || []).join(" ")} ${p.subtitle || ""}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
  const products = sortProducts(filtered as any);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6 text-xs text-text-muted">
        <Link href="/" className="hover:underline">Home</Link> / <span>Winkel</span>
      </div>
      <h1 className="font-display text-3xl md:text-4xl">Volledige catalogus</h1>
      <p className="mt-3 max-w-2xl text-text-muted">
        Alles van anabolenpro op één plek. Klik op een categorie voor diepgaande info of scroll voor het hele aanbod.
      </p>

      <div className="mt-6 rounded-lg border border-accent/30 bg-accent-soft/15 p-4 flex items-start gap-3">
        <Sparkles size={18} className="text-accent shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-semibold text-text">Bulk-korting op alle categorieën</p>
          <p className="text-text-muted">Vanaf 5 items <strong>10% korting</strong> · Vanaf 10 items <strong>15% korting</strong> - automatisch verrekend in de mand.</p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-lg border border-primary-muted bg-primary p-4 text-primary-foreground">
            <h4 className="text-xs uppercase tracking-wider text-accent-soft font-semibold mb-3 inline-flex items-center gap-1.5">
              <BookOpen size={12} /> Categorieën
            </h4>
            <div className="space-y-1 text-sm">
              <Link
                href="/winkel"
                className="block rounded px-2 py-1.5 bg-accent text-accent-foreground font-semibold"
              >
                Alle producten
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/winkel/${c.slug}`}
                  className="block rounded px-2 py-1.5 text-primary-foreground/80 hover:bg-primary-soft hover:text-accent"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
          <CatalogFilters brands={brands} stockOnly={stockOnly} activeBrand={merk} activeStof={stof} activeLocatie={locatie} />
          <div className="rounded-lg border border-border bg-surface p-4 text-text space-y-3 text-sm">
            <h4 className="text-xs uppercase tracking-wider text-accent-muted font-semibold inline-flex items-center gap-1.5">
              <ShieldCheck size={12} /> Onze garanties
            </h4>
            <p className="inline-flex items-start gap-2"><Truck size={14} className="text-accent mt-0.5" /> Snel verzonden · 100% leveringsgarantie</p>
            <p className="inline-flex items-start gap-2"><FlaskConical size={14} className="text-accent mt-0.5" /> Iedere batch lab-getest (COA in product)</p>
            <p className="inline-flex items-start gap-2"><ShieldCheck size={14} className="text-accent mt-0.5" /> 100% anoniem &amp; discreet verpakt</p>
          </div>
        </aside>

        <div className="min-w-0">
          <h2 className="font-display text-xl">{products.length} producten</h2>
          <div className="mt-5 grid gap-5 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <Link key={p.id} href={`/product/${p.categories?.slug || "winkel"}/${p.slug}`} className="block">
                <ProductCard
                  image={p.image_url || "/assets/cat-anabolen.webp"}
                  name={p.name}
                  slug={p.slug}
                  priceFrom={p.price_cents / 100}
                  inStock={p.availability !== "OutOfStock"}
                  tag={p.tags?.[0]}
                  category={p.categories?.name}
                  shortDescription={p.subtitle || undefined}
                  usps={p.usps}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
