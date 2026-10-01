"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, Stethoscope, ChevronDown } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export interface HeaderProps {
  /** Alleen voor compatibiliteit met oudere aanroepen; er is een variant. */
  variant?: "default" | "compact";
}

/**
 * De header in de stijl van het oorspronkelijke doktor-ontwerp: licht creme
 * met backdrop-blur, een rustige linkrij en een gouden consult-knop.
 *
 * De vorige header was die van anabolenpro, tot en met het logo "Anabolen Pro",
 * de zoekbalk met "testosteron, anavar, hgh" als voorbeeld en een balk met
 * "1.206 geverifieerde reviews" die voor deze site nergens op sloeg. Dat was
 * bovendien onvindbaar voor de tekst-sweeps, omdat het logo als twee losse
 * spans in de HTML stond. Een consultatiedienst heeft geen mega-menu en geen
 * productzoekbalk in de kop nodig; wie iets zoekt heeft de winkel met drie
 * pakketten in twee klikken gevonden.
 */
const NAV = [
  { href: "/winkel", label: "Winkel", sub: [
    { href: "/winkel/pakketten", label: "Pakketten" },
    { href: "/winkel/consult", label: "Consulten" },
    { href: "/winkel/bloedwerk", label: "Bloedonderzoek" },
  ] },
  { href: "/keuzehulp", label: "Keuzehulp" },
  { href: "/advies", label: "Advies" },
  // Voorlichting hangt onder Kennisbank, niet onder Advies: Advies gaat over
  // trajecten die wij leveren, Kennisbank over lezen zonder verkoopbelang.
  { href: "/kennisbank", label: "Kennisbank", sub: [
    { href: "/kennisbank", label: "Alle artikelen" },
    { href: "/anabolen-kopen", label: "Anabolen kopen" },
    { href: "/anabolen-kopen/waar-op-letten", label: "Waar u op moet letten" },
    { href: "/risicos-en-bijwerkingen", label: "Risico's en bijwerkingen" },
  ] },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * Het menu-item kleurt ook op als de bezoeker op een onderliggende pagina
 * staat. Dat gaat niet met startsWith op het item zelf: /anabolen-kopen hangt
 * onder Kennisbank maar begint er niet mee.
 */
function isActief(
  pathname: string | null,
  item: { href: string; sub?: ReadonlyArray<{ href: string }> },
): boolean {
  if (!pathname) return false;
  if (pathname === item.href) return true;
  if (item.href !== "/" && pathname.startsWith(`${item.href}/`)) return true;
  return (item.sub || []).some(
    (s) => pathname === s.href || pathname.startsWith(`${s.href}/`),
  );
}

export function Header(_props: HeaderProps = {}) {
  const pathname = usePathname();
  const { count } = useCart();
  const [mobielOpen, setMobielOpen] = useState(false);
  // Welk uitklapmenu openstaat, op href. Was een enkele boolean toen alleen
  // Winkel een submenu had; met twee uitklappers klapten ze dan samen open.
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 text-text">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-accent-soft">
            <Stethoscope size={18} strokeWidth={2.25} />
          </span>
          <span className="font-display text-lg tracking-tight">Anabolen Doktor</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((item) =>
            "sub" in item && item.sub ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.href)}
                onMouseLeave={() => setOpenMenu((h) => (h === item.href ? null : h))}
              >
                <Link
                  href={item.href}
                  className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActief(pathname, item) ? "text-accent" : "text-text-muted hover:text-text hover:bg-primary/5"
                  }`}
                >
                  {item.label} <ChevronDown size={13} />
                </Link>
                {openMenu === item.href && (
                  <div className="absolute left-0 top-full w-60 rounded-xl border border-border bg-background p-2 shadow-lg">
                    {item.sub.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        onClick={() => setOpenMenu(null)}
                        className="block rounded-lg px-3 py-2 text-sm text-text-muted hover:bg-primary/5 hover:text-text"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActief(pathname, item) ? "text-accent" : "text-text-muted hover:text-text hover:bg-primary/5"
                }`}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/consult"
            className="hidden sm:inline-flex items-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-px"
          >
            Consult €50
          </Link>
          <Link
            href="/winkelmand"
            className="relative rounded-lg p-2 text-text-muted transition-colors hover:bg-primary/5 hover:text-text"
            aria-label="Winkelmand"
          >
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                {count}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobielOpen(!mobielOpen)}
            className="rounded-lg p-2 text-text-muted transition-colors hover:bg-primary/5 hover:text-text md:hidden"
            aria-label="Menu"
          >
            {mobielOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobielOpen && (
        <nav className="border-t border-border bg-background/95 px-4 pb-4 pt-2 backdrop-blur-md md:hidden">
          {NAV.flatMap((item): { href: string; label: string; onder?: boolean }[] =>
            "sub" in item && item.sub
              ? [
                  { href: item.href, label: item.label },
                  // Submenu-items krijgen inspringing, anders lezen ze als
                  // hoofdpunten en wordt de lijst op mobiel onnavigeerbaar.
                  ...item.sub
                    .filter((s) => s.href !== item.href)
                    .map((s) => ({ href: s.href, label: s.label, onder: true })),
                ]
              : [item],
          ).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobielOpen(false)}
              className={`block rounded-lg py-2.5 text-sm font-medium ${
                l.onder ? "pl-7 pr-3 text-[13px]" : "px-3"
              } ${
                pathname === l.href ? "text-accent" : "text-text-muted hover:bg-primary/5 hover:text-text"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/consult"
            onClick={() => setMobielOpen(false)}
            className="mt-2 inline-flex items-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
          >
            Consult €50
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
