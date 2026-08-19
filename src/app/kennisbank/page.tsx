import Link from "next/link";
import { listBlogPosts } from "@/lib/queries";
import { KennisbankTabs } from "@/components/shop/kennisbank-tabs";
import type { Metadata } from "next";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Kennisbank - legale alternatieven, bloedwerk, PCT-realiteit · Anabolendoktor",
  description:
    "Onderbouwde artikelen over bloedwerk-monitoring bij AAS-gebruik, legale supplementen die aantoonbaar werken, PCT-mogelijkheden en gezondheidsrisico's. Met bronvermelding.",
  alternates: { canonical: "/kennisbank" },
};

export const dynamic = "force-dynamic";

export default async function KennisbankPage({
  searchParams,
}: {
  searchParams: { cat?: string };
}) {
  const articles = await listBlogPosts(50);
  const initialTab = (["kennis", "onderzoek", "nieuws"] as const).find((t) => t === searchParams.cat) || "alle";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6 text-xs text-text-muted">
        <Link href="/" className="hover:underline">Home</Link> / <span>Kennisbank</span>
      </div>

      <h1 className="font-display text-4xl md:text-5xl leading-tight">
        Onderbouwing zonder <span className="text-accent">verkoop-belangen</span>
      </h1>
      <p className="mt-4 max-w-2xl text-text-muted leading-relaxed">
        Onderzoeksgerichte artikelen over bloedwerk-monitoring, legale supplementen, PCT-realiteit,
        gezondheidsrisico's en juridische context. Elke bewering met bronvermelding - PubMed,
        ClinicalTrials of peer-reviewed publicaties.
      </p>

      <KennisbankTabs articles={articles} initialTab={initialTab} />
    </div>
  );
}
