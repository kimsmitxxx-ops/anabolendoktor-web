"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Klapt intro_html (boven het product-grid) standaard in zodat producten direct
 * boven-de-vouw zichtbaar zijn. Volledige tekst blijft SSR-aanwezig in de DOM
 * (alleen visueel verborgen via max-height + overflow), dus Google + AI-zoek
 * indexeren het hele blok - geen SEO-verlies.
 */
export function CollapsibleIntro({ html, fadeHeight = 120 }: { html: string; fadeHeight?: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="max-w-3xl mt-5">
      <div
        className="relative"
        style={{
          maxHeight: open ? "none" : `${fadeHeight}px`,
          overflow: open ? "visible" : "hidden",
        }}
      >
        <div
          className="prose prose-sm text-text [&>p]:my-3 [&>p]:leading-relaxed [&_a]:text-accent [&_a]:underline [&_a:hover]:text-accent-muted [&>h2]:font-display [&>h2]:text-xl [&>h2]:mt-6 [&>h2]:mb-2 [&>h3]:font-display [&>h3]:text-base [&>h3]:mt-4 [&>ul]:my-3 [&>ul]:pl-6 [&>ul]:list-disc"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {!open && (
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background to-transparent pointer-events-none"
          />
        )}
      </div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent-muted"
        aria-expanded={open}
      >
        {open ? "Minder lezen" : "Lees meer"}
        <ChevronDown
          size={14}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
}
