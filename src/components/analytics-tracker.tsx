"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";

/**
 * Vuurt een pageview bij de eerste render en bij elke route-wissel.
 *
 * Gebruikt bewust alleen usePathname en niet useSearchParams: die laatste
 * dwingt elke pagina die dit component bevat in dynamic rendering (of eist een
 * Suspense-grens). Query-parameters lezen we in lib/analytics rechtstreeks van
 * window.location, wat hetzelfde oplevert zonder die bijwerking.
 */
export function AnalyticsTracker() {
  const pathname = usePathname();
  const last = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || last.current === pathname) return;
    last.current = pathname;
    track("pageview");
  }, [pathname]);

  return null;
}
