"use client";
import { Truck, ShieldCheck, FlaskConical, Headphones } from "lucide-react";
import { UspStrip } from "@/components/usp-strip";

const ITEMS = [
  { icon: ShieldCheck, title: "100% leveringsgarantie" },
  { icon: Truck, title: "Snel verzonden" },
  { icon: FlaskConical, title: "Onafhankelijk lab-getest" },
  { icon: Headphones, title: "Live chat - advies binnen 1 min" },
];

export function HomeUspBar() {
  return <UspStrip items={ITEMS} variant="compact" className="justify-between text-text" />;
}
