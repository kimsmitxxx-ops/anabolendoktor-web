/**
 * Supabase server-side client voor data fetching in Next.js server components.
 *
 * Fallback URL + anon key zijn hardcoded - beide PUBLIC. RLS-policies in
 * shop-dash migration 021 scopen alle SELECT-queries naar anabolenpro shop_id.
 * Zonder env vars op Vercel werkt de shop dus alsnog.
 */
import { createClient } from "@supabase/supabase-js";

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://rexqfwibxawqnvrzbdoo.supabase.co";
const SB_ANON =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJleHFmd2lieGF3cW52cnpiZG9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3ODM1NzIsImV4cCI6MjA5MjM1OTU3Mn0.XQGZNdGcnZlALl7truWiPC5_uMYeMhWwIneTMNO8AhI";

/**
 * READ-only client via anon key - voor product/blog/category listings.
 * RLS-policies scopen alles per shop_id.
 */
export const supabase = createClient(SB_URL, SB_ANON, {
  auth: { persistSession: false, autoRefreshToken: false },
});

/**
 * WRITE client - gebruikt SUPABASE_SERVICE_ROLE_KEY (SERVER-only!). Vereist
 * voor writes zoals orders + payment_screenshots + restock_notifications
 * die RLS-policies overslaan. Faalt met duidelijke error als env var mist.
 * Gebruik in Route Handlers, NOOIT in client components.
 */
export function createServiceClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPA_SECRET || "";
  if (!key) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY ontbreekt - server-only writes zullen falen");
  }
  return createClient(SB_URL, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export type Product = {
  id: string;
  sku: string;
  name: string;
  slug: string;
  subtitle: string | null;
  description: string | null;
  long_description: string | null;
  price_cents: number;
  compare_at_cents: number | null;
  image_url: string | null;
  category_id: string | null;
  package_type: string | null;
  tags: string[] | null;
  stof_slugs?: string[] | null;
  availability: string | null;
  is_active: boolean;
  is_featured?: boolean;
  noindex?: boolean;
  specifications?: Record<string, string> | null;
  faqs?: { q: string; a: string }[] | null;
  usps?: string[] | null;
  categories?: { slug: string; name: string } | null;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  intro_html: string | null;
  seo_body_html: string | null;
  faqs: { q: string; a: string }[] | null;
  meta_title: string | null;
  meta_description: string | null;
  hero_image: string | null;
  sort_order: number;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  image_url: string | null;
  image_alt: string | null;
  category: string | null;
  published_at: string;
  author: string | null;
  author_id: string | null;
  meta_title: string | null;
  meta_description: string | null;
};
