import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getOrderForConfirmation,
  getShopPaymentInstructions,
  getPaymentLinkConfig,
  formatEUR,
} from "@/lib/queries";
import { PaymentScreenshotForm } from "@/components/shop/payment-screenshot-form";
import { CheckCircle2, Building2, AlertTriangle, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Bestelling geplaatst - betaalinstructies",
  description:
    "Uw bestelling staat klaar. Op deze pagina vindt u de betaalgegevens en kunt u een screenshot van uw betaling versturen om verwerking te bespoedigen.",
  robots: { index: false, follow: false },
};

export default async function BedanktPage({ params }: { params: { orderId: string } }) {
  const [order, payment, betaallink] = await Promise.all([
    getOrderForConfirmation(params.orderId),
    getShopPaymentInstructions(),
    getPaymentLinkConfig(),
  ]);

  if (!order) notFound();

  // Het ordernummer dat de klant hier ziet, moet hetzelfde zijn als het nummer
  // dat met de betaling meegaat. Hier stond een uit de UUID afgeleid
  // ORDER-nummer, terwijl de betaalpagina de reference uit de database krijgt.
  const ref = order.reference || `ORDER-${order.id.slice(0, 8).toUpperCase()}`;

  // De betaalpagina opnieuw opbouwen, zodat de klant die de betaling afbrak of
  // deze pagina later terugzoekt, alsnog bij zijn betaalgegevens komt.
  let betaalUrl: string | null = null;
  if (betaallink?.paytail_enabled && betaallink.paytail_base_url) {
    const params_ = new URLSearchParams({
      order_id: ref,
      amount: (order.total_cents / 100).toFixed(2),
      name: order.customer_name || "",
      email: order.email || "",
      postcode: order.shipping_postal || "",
      country: order.shipping_country || "NL",
      return: `https://${betaallink.domain}/checkout/bedankt/${order.id}`,
    });
    betaalUrl = `${betaallink.paytail_base_url.replace(/[/]$/, "")}?${params_.toString()}`;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="rounded-2xl border border-success/40 bg-success-soft/30 p-6 text-center">
        <CheckCircle2 size={36} className="mx-auto text-success" />
        <h1 className="mt-3 font-display text-3xl text-primary">Bedankt voor uw bestelling!</h1>
        <p className="mt-2 text-text-muted">
          Bestelling <strong className="text-text tabular">{ref}</strong> · totaal{" "}
          <strong className="text-text tabular">{formatEUR(order.total_cents)}</strong>
        </p>
        <p className="mt-1 text-xs text-text-subtle">
          Bevestiging gestuurd naar {order.email}
        </p>
      </div>

      {/* Betaalgegevens staan op de betaalpagina en niet hier: de rekening kan
          per bestelling verschillen, dus een vast IBAN op deze pagina zou de
          klant naar de verkeerde rekening sturen. Crypto stond hier ook, terwijl
          dat op geen enkele shop werkelijk geaccepteerd wordt. */}
      <section className="mt-8 rounded-xl border border-primary-muted bg-primary text-primary-foreground p-6">
        <p className="text-xs uppercase tracking-[0.18em] text-accent-soft font-semibold inline-flex items-center gap-1.5">
          <Building2 size={12} /> Betaling per bankoverschrijving
        </p>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2 text-sm">
          <div>
            <dt className="text-primary-foreground/60 text-xs">Bedrag</dt>
            <dd className="font-display text-2xl tabular">{formatEUR(order.total_cents)}</dd>
          </div>
          <div>
            <dt className="text-primary-foreground/60 text-xs">Onder vermelding van</dt>
            <dd className="font-mono text-base bg-primary-soft rounded px-2 py-1 inline-block mt-0.5">{ref}</dd>
          </div>
        </dl>

        {betaalUrl ? (
          <>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/80">
              De rekeninggegevens voor deze bestelling staan op de betaalpagina. Die rekening kan
              per bestelling verschillen, dus gebruik altijd de gegevens die u daar ziet en niet
              die van een eerdere bestelling.
            </p>
            <a
              href={betaalUrl}
              className="mt-5 inline-flex items-center gap-2 rounded bg-accent px-5 h-11 text-sm font-semibold text-accent-foreground hover:bg-accent-soft"
            >
              Betaalgegevens openen <ArrowRight size={14} />
            </a>
          </>
        ) : (
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/80">
            U ontvangt de rekeninggegevens voor deze bestelling per e-mail op {order.email}. Is er
            binnen een uur niets binnen, neem dan contact op met uw ordernummer erbij.
          </p>
        )}
      </section>

      {/* Algemene instructies HTML uit DB */}
      {payment?.instructions_html && (
        <section className="mt-6 rounded-xl border border-border bg-paper-soft p-6">
          <div
            className="prose prose-sm max-w-none text-text [&>p]:my-2 [&_a]:text-accent [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: payment.instructions_html }}
          />
        </section>
      )}

      {/* Screenshot upload - speed it up */}
      <section className="mt-8 rounded-xl border-2 border-accent/40 bg-accent-soft/20 p-6">
        <div className="flex items-start gap-2.5">
          <AlertTriangle size={18} className="text-accent shrink-0 mt-0.5" />
          <div>
            <h2 className="font-display text-lg text-text">Verzending bespoedigen?</h2>
            <p className="mt-1 text-sm text-text-muted">
              Stuur een screenshot van uw betaling. Zodra wij die zien zetten we uw bestelling al in behandeling - vaak
              uren sneller dan wachten tot de overboeking binnen is.
            </p>
          </div>
        </div>
        <div className="mt-4">
          <PaymentScreenshotForm orderId={order.id} customerEmail={order.email} />
        </div>
      </section>

      <div className="mt-10 text-center text-sm text-text-muted">
        Vragen? <Link href="/contact" className="text-accent hover:underline">Contact opnemen</Link>{" "}
        of stuur ons een chat (rechtsonder).
      </div>
    </div>
  );
}
