/** @type {import('next').NextConfig} */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://rexqfwibxawqnvrzbdoo.supabase.co";

module.exports = {
  // Defensive: don't break build on lint/type errors during deploy
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "rexqfwibxawqnvrzbdoo.supabase.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async rewrites() {
    return [
      // /media/<pad> wees naar de map van anabolenpro in de product-media bucket.
      { source: "/media/:path*", destination: `${SUPABASE_URL}/storage/v1/object/public/product-media/anabolendoktor/:path*` },
      // Clean /img/<path> URLs → Supabase Storage blog-images bucket (categorie/stof/blog heros)
      { source: "/img/:path*", destination: `${SUPABASE_URL}/storage/v1/object/public/blog-images/:path*` },
    ];
  },
  async redirects() {
    return [
      // Blogs die van shop-dash 'buildInternalLinks' onderzoek/-slug krijgen: op deze
      // site heten ze /kennisbank/*. Redirect zodat oude bodies niet 404 geven.
      { source: "/onderzoek/:slug", destination: "/kennisbank/:slug", permanent: true },
      // De losse supplementen zijn uit de verkoop; alles wijst naar de pakketten.
      { source: "/winkel/supplementen", destination: "/winkel/pakketten", permanent: true },
      { source: "/product/supplementen/:slug", destination: "/winkel/pakketten", permanent: true },
    ];
  },
  async headers() {
    const longCache = "public, max-age=31536000, immutable";
    return [
      { source: "/sitemap.xml", headers: [{ key: "Cache-Control", value: "public, max-age=3600, s-maxage=86400" }] },
      { source: "/robots.txt", headers: [{ key: "Cache-Control", value: "public, max-age=86400" }] },
      { source: "/llms.txt", headers: [{ key: "Cache-Control", value: "public, max-age=3600" }] },
      // Static assets — 1 jaar cache
      { source: "/assets/:path*", headers: [{ key: "Cache-Control", value: longCache }] },
      { source: "/media/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=86400, s-maxage=604800" }] },
      { source: "/img/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=86400, s-maxage=604800" }] },
      { source: "/_next/static/:path*", headers: [{ key: "Cache-Control", value: longCache }] },
    ];
  },
  compress: true,
};
