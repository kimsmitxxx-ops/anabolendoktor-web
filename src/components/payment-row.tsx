import { cn } from "@/lib/utils";
import { Building2, Smartphone } from "lucide-react";

export type PaymentRowVariant = "full" | "compact";

export interface PaymentRowProps {
  variant?: PaymentRowVariant;
  className?: string;
}

const wrapper =
  "inline-flex h-7 items-center gap-1.5 rounded-sm border border-border bg-surface px-2.5 text-[11px] font-semibold tracking-wide text-text";

function Bank() {
  return (
    <span className={wrapper}>
      <Building2 size={12} className="text-accent" /> Bankoverboeking
    </span>
  );
}
function BankApp() {
  return (
    <span className={wrapper}>
      <Smartphone size={12} className="text-accent" /> Bank-app
    </span>
  );
}

/**
 * Crypto stond hier als betaalmethode, inclusief BTC-, ETH- en USDT-badges,
 * terwijl geen van de shops crypto daadwerkelijk accepteert. Een betaalmethode
 * tonen die niet werkt kost vertrouwen op precies het verkeerde moment.
 */
export function PaymentRow({ variant = "full", className }: PaymentRowProps) {
  const items = variant === "compact" ? [<Bank key="b" />] : [<Bank key="b" />, <BankApp key="a" />];
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)} aria-label="Betaalmethoden">
      {items}
    </div>
  );
}

export default PaymentRow;
