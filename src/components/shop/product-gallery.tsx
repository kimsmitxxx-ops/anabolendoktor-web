"use client";
import { useState } from "react";

interface MediaItem {
  url: string;
  alt?: string | null;
}

export function ProductGallery({ gallery, productName }: { gallery: MediaItem[]; productName: string }) {
  const [active, setActive] = useState(0);
  if (gallery.length === 0) return null;
  const current = gallery[Math.min(active, gallery.length - 1)];

  return (
    <div className="flex gap-3">
      {gallery.length > 1 && (
        <div className="flex flex-col gap-2 w-16 shrink-0">
          {gallery.slice(0, 5).map((m, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              aria-label={`Toon afbeelding ${i + 1}`}
              className={`aspect-square w-full rounded-lg border overflow-hidden transition-colors ${
                i === active ? "border-accent" : "border-paper-border hover:border-accent"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.url}
                alt={m.alt || productName}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
      <div className="flex-1 max-w-[75%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          loading="eager" fetchPriority="high" decoding="async"
          src={current.url}
          alt={current.alt || productName}
          className="aspect-square w-full rounded-2xl border border-paper-border object-cover"
        />
      </div>
    </div>
  );
}
