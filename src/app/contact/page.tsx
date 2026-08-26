import type { Metadata } from "next";
import { PageHero } from "@/components/shop/page-hero";
import { MessageCircle, Mail, Clock, MapPin } from "lucide-react";
import { ContactForm } from "@/components/shop/contact-form";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Contact",
  description: "Stel uw vraag via het contactformulier of de chat. Wij antwoorden op werkdagen binnen een werkdag; medische spoed hoort bij uw huisarts.",
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
              De snelste route voor korte vragen over een bestelling of afspraak.
            </p>
            <button
              type="button"
              className="mt-3 inline-flex items-center text-sm font-medium text-accent hover:underline"
            >
              Chat openen
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
            <h3 className="mt-3 font-display text-lg text-primary-foreground">Bereikbaarheid</h3>
            <p className="mt-2 text-sm text-primary-foreground/75">
              Op werkdagen beantwoorden wij berichten binnen een werkdag. In het weekend
              lezen wij mee, maar plannen wij geen consulten in. Bij medische spoed belt u
              uw huisarts of de huisartsenpost, niet ons.
            </p>
          </div>
          <div className="rounded-md border border-primary-muted bg-primary p-6 text-primary-foreground">
            <MapPin size={20} className="text-accent" />
            <h3 className="mt-3 font-display text-lg text-primary-foreground">Geen bezoekadres</h3>
            <p className="mt-1 text-sm text-primary-foreground/75">
              Consulten vinden plaats via video-call en verzending gebeurt vanuit Nederland.
              KvK- en BTW-nummer staan op de factuur.
            </p>
          </div>
        </div>

        <ContactForm />
      </section>
    </>
  );
}
