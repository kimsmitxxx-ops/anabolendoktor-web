import { AlertTriangle, Info } from "lucide-react";

interface Props {
  /**
   * Variant - `inline` voor een neutrale compact block (op product-pages),
   * `prominent` voor een opvallender block (op stof-info-pagina's en risico-pagina).
   */
  variant?: "inline" | "prominent";
  /**
   * Optionele extra zin bovenop de standaard disclaimer. Bv. "Specifiek voor
   * X - overleg met uw arts als je Y gebruikt."
   */
  extra?: string;
}

/**
 * Medische disclaimer-snippet voor E-E-A-T compliance op YMYL-content.
 * Plaats op stof-info-pagina's, risico-pagina, product-pages.
 *
 * Tekst is bewust vrij algemeen - voldoet aan Google Medic update guidelines
 * + Nederlandse warenwetregels voor research-peptiden / niet voor humaan gebruik.
 */
export function MedicalDisclaimer({ variant = "inline", extra }: Props) {
  const isProminent = variant === "prominent";
  return (
    <aside
      role="note"
      aria-label="Medische disclaimer"
      className={
        isProminent
          ? "mt-10 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-5 text-sm text-amber-900"
          : "mt-8 rounded-lg border border-amber-200 bg-amber-50/60 p-4 text-xs text-amber-900"
      }
    >
      <div className="flex items-start gap-2.5">
        {isProminent ? (
          <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
        ) : (
          <Info size={14} className="text-amber-600 shrink-0 mt-0.5" />
        )}
        <div className="space-y-1.5 leading-relaxed">
          <p>
            <strong>Disclaimer.</strong> De informatie op deze pagina is bedoeld voor educatieve
            doeleinden en harm-reduction - niet als medisch advies. Anabolen, peptiden en SERM/AI
            kunnen ernstige bijwerkingen geven (hart, lever, hormonale as) en zijn in Nederland
            niet toegelaten voor humaan gebruik buiten medisch voorschrift.
          </p>
          <p>
            Gebruik je deze stoffen, doe het dan onder bloedwerk-monitoring (voor, tijdens en na)
            en raadpleeg een arts bij twijfel of klachten. Onze producten worden verkocht als
            <em> research-grade materialen</em> - niet als medicatie.
          </p>
          {extra && <p className="mt-2 font-medium">{extra}</p>}
        </div>
      </div>
    </aside>
  );
}

export default MedicalDisclaimer;
