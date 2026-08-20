import Link from "next/link";
import { PaymentRow } from "@/components/payment-row";
import { NewsletterForm } from "@/components/newsletter-form";
import { Stethoscope, Mail, MapPin, ClipboardList } from "lucide-react";

/**
 * De footer stond nog volledig in het teken van de andere shop: de merknaam
 * Anabolen Pro, een injectienaald als logo, kolommen met anabolen en PCT, en
 * links naar kennisbank-artikelen die hier niet bestaan. Dat stond op elke
 * pagina van deze site.
 */
export function Footer() {
  return (
    <footer className="mt-20 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 grid gap-12 lg:grid-cols-[1.2fr_3fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 font-display text-2xl">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-accent/15 text-accent ring-1 ring-accent/30">
              <Stethoscope size={18} strokeWidth={2.25} />
            </span>
            <span className="leading-none">
              <span className="text-primary-foreground">Anabolen</span>{" "}
              <span className="text-accent">Doktor</span>
            </span>
          </Link>
          <p className="mt-3 text-sm text-primary-foreground/70 max-w-sm leading-relaxed">
            Consultatie en informatie over anabolen, herstel en bloedwaarden. Wij verkopen geen
            anabolen, stellen geen diagnoses en schrijven niets voor.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-primary-foreground/70">
            <li className="inline-flex items-center gap-2">
              <ClipboardList size={14} className="text-accent" /> Bloedonderzoek via reguliere prikposten
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
            <h4 className="font-display text-base mb-3 text-primary-foreground">Advies</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/keuzehulp" className="text-primary-foreground/70 hover:text-accent">Keuzehulp</Link></li>
              <li><Link href="/advies/stoppen-met-anabolen" className="text-primary-foreground/70 hover:text-accent">Stoppen met anabolen</Link></li>
              <li><Link href="/advies/herstel-na-een-kuur" className="text-primary-foreground/70 hover:text-accent">Herstel na een kuur</Link></li>
              <li><Link href="/advies/gevaren-van-anabolen" className="text-primary-foreground/70 hover:text-accent">Gevaren van anabolen</Link></li>
              <li><Link href="/advies" className="text-accent hover:text-accent-soft">Alle adviespagina&apos;s</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-base mb-3 text-primary-foreground">Consult &amp; onderzoek</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/consult" className="text-primary-foreground/70 hover:text-accent">Hoe een consult verloopt</Link></li>
              <li><Link href="/winkel/consult" className="text-primary-foreground/70 hover:text-accent">Consulten</Link></li>
              <li><Link href="/winkel/bloedwerk" className="text-primary-foreground/70 hover:text-accent">Bloedonderzoek</Link></li>
              <li><Link href="/winkel/supplementen" className="text-primary-foreground/70 hover:text-accent">Legale supplementen</Link></li>
              <li><Link href="/lab" className="text-accent hover:text-accent-soft">Hoe wij met laboratoria werken</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-base mb-3 text-primary-foreground">Kennisbank</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/kennisbank" className="text-primary-foreground/70 hover:text-accent">Alle artikelen</Link></li>
              <li><Link href="/risicos-en-bijwerkingen" className="text-primary-foreground/70 hover:text-accent">Risico&apos;s en bijwerkingen</Link></li>
              <li><Link href="/over-ons" className="text-primary-foreground/70 hover:text-accent">Wie wij zijn</Link></li>
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
          <NewsletterForm variant="footer-mini" heading="Nieuwe artikelen in uw inbox" />
          <div className="lg:justify-self-end">
            <p className="text-xs uppercase tracking-[0.15em] text-primary-foreground/60 mb-2">Betaalmethoden</p>
            <PaymentRow />
          </div>
        </div>
      </div>

      <div className="border-t border-primary-soft bg-primary-soft/40">
        <div className="mx-auto max-w-7xl px-4 py-5 flex flex-wrap items-center justify-between gap-3 text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} anabolendoktor B.V. · KvK + BTW-nummer op de factuur</p>
          <p>Geen medisch advies. Bij klachten neemt u contact op met uw huisarts.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
