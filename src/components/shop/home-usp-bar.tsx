"use client";
import { Stethoscope, FileText, Lock, CalendarClock } from "lucide-react";
import { UspStrip } from "@/components/usp-strip";

/**
 * Deze balk stond woord voor woord gelijk aan die van anabolenpro
 * (leveringsgarantie, snel verzonden, lab-getest, live chat). Dat is bij twee
 * sites van dezelfde eigenaar het eerste wat opvalt als duplicaat, en het klopt
 * hier inhoudelijk ook niet: anabolendoktor levert geen middelen maar consulten
 * en bloedonderzoek. Deze punten beschrijven wat deze dienst wel doet.
 */
const ITEMS = [
  { icon: Stethoscope, title: "Consult met een vaste begeleider" },
  { icon: FileText, title: "Bloedwaarden schriftelijk uitgelegd" },
  { icon: Lock, title: "Vertrouwelijk, geen registratie bij derden" },
  { icon: CalendarClock, title: "Afspraak doorgaans binnen drie werkdagen" },
];

export function HomeUspBar() {
  return <UspStrip items={ITEMS} variant="compact" className="justify-between text-text" />;
}
