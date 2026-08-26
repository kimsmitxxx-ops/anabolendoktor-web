import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Manrope, Fraunces } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/shop/cart-store";
import { Header } from "@/components/shop/header";
import { Footer } from "@/components/shop/footer";
import { MobileTabBar } from "@/components/shop/mobile-tabbar";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { GA4 } from "@/components/ga4";

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || "G-54K5B0PBQ5"; // anabolendoktor

// CartDrawer is alleen zichtbaar als gebruiker op cart-icoon klikt -> defer hydratie
const CartDrawer = dynamic(
  () => import("@/components/shop/cart-drawer").then((m) => m.CartDrawer),
  { ssr: false },
);

// Self-hosted fonts via next/font: elimineert render-blocking Google Fonts request
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-manrope",
});
// Fraunces: de serif-koptypografie van het oorspronkelijke doktor-ontwerp.
// Space Grotesk was het lettertype van anabolenpro; juist de koppen bepalen
// of twee sites familie van elkaar lijken.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-fraunces",
});

// Defer chat-widget - niet kritiek voor FCP/LCP; pas hydrateren na main content
const WhatsAppFab = dynamic(
  () => import("@/components/whatsapp-fab").then((m) => m.WhatsAppFab),
  { ssr: false },
);

export const metadata: Metadata = {
  metadataBase: new URL("https://anabolendoktor.com"),
  title: { default: "Anabolendoktor - consult, bloedwerk-interpretatie, legale alternatieven", template: "%s · Anabolendoktor" },
  description: "Formele consultatie voor mensen die anabolen gebruiken of overwegen, én voor natural trainers die evidence-based willen werken. Bloedwerk-interpretatie, legale supplementen, harm-reduction. Wij verkopen géén anabolen.",
  // Live sinds 26 augustus 2026; robots.txt leest de noindex-vlag uit de
  // database, maar deze meta-tag stond hardcoded op noindex en zou anders
  // elke pagina uit de index houden terwijl robots.txt ze juist toelaat.
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
  openGraph: {
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" data-shop="anabolendoktor" className={`${manrope.variable} ${fraunces.variable}`}>
      <head>
        {/* Geen preconnect naar de Supabase-host: afbeeldingen lopen via de
            /img-rewrite over ons eigen domein, dus de browser praat er nooit
            rechtstreeks mee. De hint leverde niets op en zette wel de naam van
            het gedeelde project in de broncode van elke pagina. */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {/* Preload hero image (LCP) - AVIF eerst voor moderne browsers (55KB vs 91KB jpg).
            Browsers die geen AVIF doen, vallen automatisch op de webp/jpg <picture> source. */}
        <link
          rel="preload"
          as="image"
          href="/assets/transform-after.avif"
          type="image/avif"
          fetchPriority="high"
        />
      </head>
      <body>
        <AnalyticsTracker />
        <CartProvider>
          <div className="min-h-screen flex flex-col bg-background text-text overflow-x-hidden">
            <Header />
            <main className="flex-1 pb-16 md:pb-0 min-w-0">{children}</main>
            <Footer />
            <WhatsAppFab />
            <GA4 measurementId={GA4_ID} />
            <CartDrawer />
            <MobileTabBar />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
