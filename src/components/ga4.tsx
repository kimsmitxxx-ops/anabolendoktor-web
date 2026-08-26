"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Google Analytics 4 -- laadt altijd, zonder cookiebanner of consent-gate.
 * Advertentiesignalen blijven denied; alleen analytics staat aan.
 *
 * De standaard gtag-snippet stuurt alleen bij de eerste render een page_view;
 * in de App Router navigeert de bezoeker client-side, dus die vervolgpagina's
 * melden we zelf.
 *
 * Staat los van onze eigen tracking in lib/analytics.ts: die is cookieloos en
 * meet ook bezoekers met een adblocker -- die blokkeren googletagmanager.com
 * wel en ons eigen /api/track niet. Reken er dus op dat GA4 lager uitkomt.
 */
export function GA4({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || !window.gtag) return;
    window.gtag("event", "page_view", {
      page_path: pathname + window.location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'granted'
          });
          gtag('js', new Date());
          gtag('config', '${measurementId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
