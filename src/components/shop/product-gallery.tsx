"use client";
import { useState } from "react";
import { Afbeelding } from "@/components/afbeelding";

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
              <Afbeelding
                src={m.url}
                alt={m.alt || productName}
                width={800}
                height={800}
                sizes="(max-width: 768px) 100vw, 480px"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
      <div className="flex-1 max-w-[75%]">
        <Afbeelding
          src={current.url}
          alt={current.alt || productName}
          width={800}
          height={800}
          sizes="(max-width: 768px) 100vw, 480px"
          boven
          className="aspect-square w-full rounded-2xl border border-paper-border object-cover"
        />
      </div>
    </div>
  );
}
