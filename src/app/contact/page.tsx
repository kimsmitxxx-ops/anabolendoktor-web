import type { Metadata } from "next";
import { PageHero } from "@/components/shop/page-hero";
import { MessageCircle, Mail, Clock, MapPin } from "lucide-react";
import { ContactForm } from "@/components/shop/contact-form";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Contact - Anabolendoktor",
  description: "Bereik Anabolendoktor via online chat, e-mail of contactformulier. Antwoord binnen 1 werkdag tussen 09:00 en 21:00, ook in het weekend.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Snelle antwoorden van ons team"
        intro="Vragen over een consult, een bloedonderzoek of een bestelling: wij reageren binnen een werkdag. Voor medische spoed belt u uw huisarts of de huisartsenpost."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-5">
          <div className="rounded-md border border-primary-muted bg-primary p-6 text-primary-foreground">
            <MessageCircle size={20} className="text-accent" />
            <h3 className="mt-3 font-display text-lg text-primary-foreground">Online chat</h3>
            <p className="mt-1 text-sm text-primary-foreground/75">
              Snelste route. Stuur foto&apos;s, batchnummers of een schermafbeelding van uw order.
            </p>
            <button
              type="button"
              className="mt-3 inline-flex items-center text-sm font-medium text-accent hover:underline"
            >
              Start live chat
            </button>
          </div>
          <div className="rounded-md border border-primary-muted bg-primary p-6 text-primary-foreground">
            <Mail size={20} className="text-accent" />
            <h3 className="mt-3 font-display text-lg text-primary-foreground">Stuur ons een bericht</h3>
            <p className="mt-2 text-sm text-primary-foreground/75">
              Gebruik het formulier hieronder. Gaat het over een afspraak of bestelling, vermeld dan uw ordernummer. Deel geen medische gegevens die u liever niet per e-mail verstuurt; bloedwaarden bespreken wij tijdens het consult zelf. Antwoord binnen een werkdag.
            </p>
          </div>
          <div className="rounded-md border border-primary-muted bg-primary p-6 text-primary-foreground">
            <Clock size={20} className="text-accent" />
            <h3 className="mt-3 font-display text-lg text-primary-foreground">Openingstijden support</h3>
            <ul className="mt-2 space-y-1 text-sm text-primary-foreground/75">
              <li>Ma t/m vr · 09:00 - 21:00</li>
              <li>Za &amp; zo · 10:00 - 18:00</li>
            </ul>
          </div>
          <div className="rounded-md border border-primary-muted bg-primary p-6 text-primary-foreground">
            <MapPin size={20} className="text-accent" />
            <h3 className="mt-3 font-display text-lg text-primary-foreground">Magazijn (geen bezoek)</h3>
            <p className="mt-1 text-sm text-primary-foreground/75">
              Westhavenkade 12, 3134 NA Vlaardingen <br />
              KvK + BTW-nummer op de factuur.
            </p>
          </div>
        </div>

        <ContactForm />
      </section>
    </>
  );
}
