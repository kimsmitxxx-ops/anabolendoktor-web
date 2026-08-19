import { cn } from "@/lib/utils";

export type StarsSize = "sm" | "md" | "lg";

export interface StarsProps {
  value: number; // 0..5, supports halves
  size?: StarsSize;
  count?: number;
  className?: string;
}

const sizes: Record<StarsSize, number> = { sm: 14, md: 18, lg: 22 };

function Star({ fillPct, size }: { fillPct: number; size: number }) {
  const id = `g-${Math.random().toString(36).slice(2, 8)}`;
  // Amber/goud - review-stars zijn cross-cultureel goud, geen brand-green
  const AMBER = "#F59E0B";
  const AMBER_EMPTY = "#E4E2D8";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
          <stop offset={`${fillPct}%`} stopColor={AMBER} />
          <stop offset={`${fillPct}%`} stopColor={AMBER_EMPTY} />
        </linearGradient>
      </defs>
      <path
        d="M12 2.5l2.95 5.98 6.6.96-4.78 4.66 1.13 6.57L12 17.77l-5.9 3.1 1.13-6.57L2.45 9.64l6.6-.96L12 2.5z"
        fill={`url(#${id})`}
        stroke={AMBER}
        strokeWidth="1"
      />
    </svg>
  );
}

export function Stars({ value, size = "md", count, className }: StarsProps) {
  const px = sizes[size];
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)}>
      {[0, 1, 2, 3, 4].map((i) => {
        const diff = value - i;
        const pct = diff >= 1 ? 100 : diff <= 0 ? 0 : Math.round(diff * 100);
        return <Star key={i} fillPct={pct} size={px} />;
      })}
      {count != null && (
        <span className="ml-1.5 text-sm text-text-muted tabular">({count})</span>
      )}
    </span>
  );
}

export default Stars;
