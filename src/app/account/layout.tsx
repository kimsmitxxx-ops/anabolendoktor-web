import type { Metadata } from "next";

/**
 * Het klantaccount hoort niet in de zoekresultaten.
 *
 * Let op de volgorde: deze pagina's moeten juist WEL crawlbaar zijn, anders
 * ziet Google de noindex hieronder nooit. Ze stonden eerder in robots.txt
 * geblokkeerd terwijl de meta-tag "index, follow" zei, en dat leverde de
 * melding "Geindexeerd, maar geblokkeerd door robots.txt" op.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
