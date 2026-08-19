/**
 * Shared static data voor anabolendoktor-web.
 * Product-catalog + blogs komen uit Supabase; deze file bevat alleen
 * hero-illustraties en category-tegel fallbacks voor de homepage.
 *
 * Anabolendoktor is een formele consultatie-site + kleine selectie
 * legale supplementen (geen anabolen). De insteek is bewust dr. formeel
 * en raadt AAS-gebruik af - tegenhanger van de anabolenpro-webshop.
 */

const catConsult = "/assets/consult.jpg";
const catNatural = "/assets/natural-supplements.jpg";
const catBloodwork = "/assets/bloodwork.jpg";
const catTraining = "/assets/training.jpg";
const catNutrition = "/assets/nutrition.jpg";

export interface MainCategory {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  to: string;
}

export const mainCategories: MainCategory[] = [
  { slug: "consult", name: "Consult", tagline: "1-op-1 begeleiding - bloedwaarden, trainingsplan, herstel na cycle.", image: catConsult, to: "/consult" },
  { slug: "supplementen", name: "Legale supplementen", tagline: "Creatine, vitamine D3+K2, magnesium, ashwagandha - evidence-based.", image: catNatural, to: "/winkel/supplementen" },
  { slug: "kennisbank", name: "Kennisbank", tagline: "Onderbouwde artikelen over legale opties en gezondheidsrisico's.", image: catBloodwork, to: "/kennisbank" },
];

// Legacy exports voor backwards-compat
export interface CategoryContent {
  slug: string;
  group: "anabolen" | "pct";
  name: string;
  aka: string[];
  tagline: string;
  heroImage: string;
  heroImageAlt: string;
  intro: string;
  longIntro?: string;
  keyFacts: { label: string; value: string }[];
  sections: { heading: string; body: string }[];
  faqs?: { q: string; a: string }[];
  usps?: string[];
  related?: string[];
  knowledge?: string[];
  resultImage?: string;
  resultImageAlt?: string;
}

export const categoryContent: CategoryContent[] = [];

export function findCategoryContent(slug: string): CategoryContent | undefined {
  return categoryContent.find((c) => c.slug === slug);
}

export function findCategoryContentByGroup(group: "anabolen" | "pct") {
  return categoryContent.filter((c) => c.group === group);
}

export function categoriesByGroup(_group: "anabolen" | "pct"): CategoryContent[] {
  return [];
}
