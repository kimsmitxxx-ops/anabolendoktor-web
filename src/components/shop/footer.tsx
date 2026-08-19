import Link from "next/link";
import { PaymentRow } from "@/components/payment-row";
import { NewsletterForm } from "@/components/newsletter-form";
import { FlaskConical, Mail, MapPin, Syringe } from "lucide-react";
import { categoriesByGroup } from "./data";

export function Footer() {
  const anabolen = categoriesByGroup("anabolen").slice(0, 6);
  const pct = categoriesByGroup("pct");

  return (
    <footer className="mt-20 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 grid gap-12 lg:grid-cols-[1.2fr_3fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 font-display text-2xl">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-accent/15 text-accent ring-1 ring-accent/30">
              <Syringe size={18} strokeWidth={2.25} className="-rotate-45" />
            </span>
            <span className="leading-none">
              <span className="text-primary-foreground">Anabolen</span>{" "}
              <span className="text-accent">Pro</span>
            </span>
          </Link>
          <p className="mt-3 text-sm text-primary-foreground/70 max-w-sm leading-relaxed">
            Onafhankelijk geteste anabole stoffen, verstuurd vanuit Nederland. Uitsluitend voor
            onderzoeksdoeleinden - niet voor menselijke consumptie.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-primary-foreground/70">
            <li className="inline-flex items-center gap-2">
              <FlaskConical size={14} className="text-accent" /> Eigen lab in Rotterdam · Janoshik &amp; Anabolic Lab
            </li>
            <li>
              <Link href="/contact" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-accent">
                <Mail size={14} className="text-accent" /> Contactformulier
              </Link>
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPin size={14} className="text-accent" /> Westhavenkade 12, 3134 NA Vlaardingen
            </li>
          </ul>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="font-display text-base mb-3 text-primary-foreground">Anabolen</h4>
            <ul className="space-y-2 text-sm">
              {anabolen.map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}`} className="text-primary-foreground/70 hover:text-accent">
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/winkel" className="text-accent hover:text-accent-soft">
                  Alle anabolen →
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-base mb-3 text-primary-foreground">PCT</h4>
            <ul className="space-y-2 text-sm">
              {pct.map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}`} className="text-primary-foreground/70 hover:text-accent">
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/kennisbank/welke-pct-past-bij-een-deca-kuur-nolva-clomid-hcg-timing" className="text-accent hover:text-accent-soft">
                  PCT-protocol →
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-base mb-3 text-primary-foreground">Kennisbank</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/kennisbank/herstel-na-je-eerste-testosteron-kuur-3-6-maanden-realistisch" className="text-primary-foreground/70 hover:text-accent">Eerste kuur opbouwen</Link></li>
              <li><Link href="/kennisbank/welk-bloedwerk-doe-je-voor-tijdens-en-na-een-aas-kuur" className="text-primary-foreground/70 hover:text-accent">Bloedwerk uitgelegd</Link></li>
              <li><Link href="/kennisbank/top-5-fouten-die-beginners-maken-in-hun-eerste-kuur" className="text-primary-foreground/70 hover:text-accent">5 beginnersfouten</Link></li>
              <li><Link href="/begrippenlijst" className="text-primary-foreground/70 hover:text-accent">Begrippenlijst</Link></li>
              <li><Link href="/kennisbank" className="text-accent hover:text-accent-soft">Alle artikelen →</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-base mb-3 text-primary-foreground">Service</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/bezorging" className="text-primary-foreground/70 hover:text-accent">Bezorging</Link></li>
              <li><Link href="/retourneren" className="text-primary-foreground/70 hover:text-accent">Retourneren</Link></li>
              <li><Link href="/contact" className="text-primary-foreground/70 hover:text-accent">Contact</Link></li>
              <li><Link href="/over-ons" className="text-primary-foreground/70 hover:text-accent">Over ons</Link></li>
              <li><Link href="/voorwaarden" className="text-primary-foreground/70 hover:text-accent">Voorwaarden</Link></li>
              <li><Link href="/privacy" className="text-primary-foreground/70 hover:text-accent">Privacy</Link></li>
              <li><a href="/sitemap.xml" className="text-primary-foreground/70 hover:text-accent">Sitemap</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-soft">
        <div className="mx-auto max-w-7xl px-4 py-8 grid gap-6 lg:grid-cols-[1.4fr_1fr] items-start">
          <NewsletterForm variant="footer-mini" heading="Nieuwe COA's in uw inbox" />
          <div className="lg:justify-self-end">
            <p className="text-xs uppercase tracking-[0.15em] text-primary-foreground/60 mb-2">Betaalmethoden</p>
            <PaymentRow />
          </div>
        </div>
      </div>

      <div className="border-t border-primary-soft bg-primary-soft/40">
        <div className="mx-auto max-w-7xl px-4 py-5 flex flex-wrap items-center justify-between gap-3 text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} anabolendoktor B.V. · KvK + BTW-nummer op de factuur</p>
          <p>Producten voor onderzoeksdoeleinden in een laboratoriumomgeving.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
