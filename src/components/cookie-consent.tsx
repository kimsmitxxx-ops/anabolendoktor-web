"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "anabolendoktor.cookies.v1";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {}
  }, []);

  function setChoice(v: "accept-all" | "essential-only") {
    try {
      localStorage.setItem(STORAGE_KEY, v);
    } catch {}
    setVisible(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("cookie-consent-changed", { detail: { choice: v } }));
    }
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed inset-x-0 bottom-0 z-[100] p-4"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
    >
      <div className="mx-auto max-w-2xl rounded-2xl bg-primary text-primary-foreground shadow-lift ring-1 ring-primary-muted overflow-hidden">
        <div className="p-5 sm:p-6 flex flex-col sm:flex-row items-start gap-4">
          <Cookie size={22} className="text-accent shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <h2 id="cookie-consent-title" className="font-display text-lg text-primary-foreground">
              Cookies & privacy
            </h2>
            <p id="cookie-consent-desc" className="mt-1.5 text-sm text-primary-foreground/80 leading-relaxed">
              Wij gebruiken functionele cookies (winkelmand, sessie) zodat de site werkt. Daarnaast
              optionele analytische cookies om de site te verbeteren - die staan standaard uit.
              Geen tracking voor advertenties.{" "}
              <Link href="/cookies" className="underline hover:text-accent-soft">
                Meer info
              </Link>
              {" · "}
              <Link href="/privacy" className="underline hover:text-accent-soft">
                Privacy-beleid
              </Link>
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setChoice("accept-all")}
                className="inline-flex items-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent-soft"
              >
                Accepteer alle
              </button>
              <button
                type="button"
                onClick={() => setChoice("essential-only")}
                className="inline-flex items-center rounded-full border border-primary-foreground/30 px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-soft"
              >
                Alleen noodzakelijk
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setChoice("essential-only")}
            aria-label="Sluiten"
            className="text-primary-foreground/50 hover:text-primary-foreground shrink-0"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
