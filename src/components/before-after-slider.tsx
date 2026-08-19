"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ChevronsLeftRight } from "lucide-react";

// Vervang de file-extension van een asset-pad. Gebruikt door <picture> om
// .avif / .webp varianten te serveren naast de originele jpg/png.
function swapExt(src: string, ext: string): string {
  return src.replace(/\.(jpe?g|png)$/i, `.${ext}`);
}

export interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  initial?: number; // 0-100
  autoPlay?: boolean;
  /** Hint dat dit een hero/LCP-image is - fetchpriority + eager loading */
  priority?: boolean;
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "Voor",
  afterLabel = "Na",
  className,
  initial = 50,
  autoPlay = true,
  priority = false,
}: BeforeAfterSliderProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(initial);
  const draggingRef = useRef(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, x)));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      e.preventDefault();
      setFromClientX(e.clientX);
    };
    const up = () => {
      draggingRef.current = false;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [setFromClientX]);

  // Auto demo - defer tot na idle zodat hero-LCP niet vertraagt
  useEffect(() => {
    if (!autoPlay || hasInteracted) return;
    let raf = 0;
    let idle: number | NodeJS.Timeout;
    let cancelled = false;
    const startLoop = () => {
      if (cancelled) return;
      const start = performance.now();
      const loop = (t: number) => {
        const elapsed = (t - start) / 1000;
        const v = 50 + Math.sin(elapsed * 0.9) * 32;
        setPos(v);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    };
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idle = (window as any).requestIdleCallback(startLoop, { timeout: 2000 });
    } else {
      idle = setTimeout(startLoop, 1500);
    }
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      if (typeof window !== "undefined" && "cancelIdleCallback" in window) {
        (window as any).cancelIdleCallback(idle);
      } else {
        clearTimeout(idle as NodeJS.Timeout);
      }
    };
  }, [autoPlay, hasInteracted]);

  return (
    <div
      ref={wrapRef}
      className={cn(
        "relative w-full overflow-hidden rounded-xl select-none touch-none ring-1 ring-primary-soft/40 shadow-lift bg-primary",
        className,
      )}
      onPointerDown={(e) => {
        draggingRef.current = true;
        setHasInteracted(true);
        setFromClientX(e.clientX);
      }}
    >
      {/* After (full) - LCP-candidate op homepage hero. <picture> serveert AVIF/WebP
          waar ondersteund (originele JPG als fallback). */}
      <picture>
        <source srcSet={swapExt(afterSrc, "avif")} type="image/avif" />
        <source srcSet={swapExt(afterSrc, "webp")} type="image/webp" />
        <img
          src={afterSrc}
          alt={afterLabel}
          draggable={false}
          width={800}
          height={1000}
          loading={priority ? "eager" : "lazy"}
          // @ts-expect-error fetchpriority is geldig HTML attribuut maar nog niet in TS types
          fetchpriority={priority ? "high" : "auto"}
          decoding={priority ? "sync" : "async"}
          className="block w-full h-full object-cover"
        />
      </picture>
      {/* Before (clipped) - minder kritiek, lazy + AVIF/WebP fallback */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <picture>
          <source srcSet={swapExt(beforeSrc, "avif")} type="image/avif" />
          <source srcSet={swapExt(beforeSrc, "webp")} type="image/webp" />
          <img
            src={beforeSrc}
            alt={beforeLabel}
            draggable={false}
            width={800}
            height={1000}
            loading="lazy"
            decoding="async"
            className="block h-full object-cover"
            style={{ width: `${(100 / Math.max(pos, 0.0001)) * 100}%`, maxWidth: "none" }}
          />
        </picture>
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute top-3 left-3 rounded bg-primary/80 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute top-3 right-3 rounded bg-accent px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
        {afterLabel}
      </span>

      {/* Divider + handle */}
      <div
        className="absolute top-0 bottom-0 w-px bg-primary-foreground/90 pointer-events-none"
        style={{ left: `${pos}%` }}
      />
      <button
        type="button"
        aria-label="Sleep om voor en na te vergelijken"
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-11 w-11 rounded-full bg-accent text-accent-foreground shadow-lift ring-2 ring-primary-foreground/90 flex items-center justify-center cursor-ew-resize hover:scale-105 transition-transform"
        style={{ left: `${pos}%` }}
        onPointerDown={(e) => {
          e.stopPropagation();
          draggingRef.current = true;
          setHasInteracted(true);
        }}
      >
        <ChevronsLeftRight size={20} strokeWidth={2.5} />
      </button>
    </div>
  );
}

export default BeforeAfterSlider;
