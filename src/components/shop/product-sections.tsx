import { BookOpen, ListChecks, MessageCircleQuestion, Star } from "lucide-react";
import { ReviewForm } from "./review-form";

type Review = {
  id: string;
  rating: number;
  author_name: string;
  title: string | null;
  body: string | null;
  created_at: string;
  published_at: string | null;
};

interface Props {
  productId?: string;
  description: string | null;
  specifications: Record<string, string> | null | undefined;
  faqs: { q: string; a: string }[] | null | undefined;
  reviews?: Review[];
  reviewsCount?: number;
  avgRating?: number | null;
}

function StarRow({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <div className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          className={n <= value ? "fill-amber-400 text-amber-400" : "text-border-strong"}
        />
      ))}
    </div>
  );
}

function SectionHead({ icon: Icon, title, id }: { icon: typeof BookOpen; title: string; id: string }) {
  return (
    <h2
      id={id}
      className="font-display text-2xl text-primary flex items-center gap-2 scroll-mt-20"
    >
      <Icon size={20} className="text-accent" /> {title}
    </h2>
  );
}

/**
 * Sequentiele product-secties (Beschrijving / Specs / FAQ / Reviews) i.p.v. tabs.
 * Voordeel: alle content is direct SSR-zichtbaar voor Google + AI-zoek (geen
 * verborgen tabbed content) en de lezer kan natuurlijk doorscrollen.
 * Anchor-jump menu bovenaan voor snelle navigatie.
 */
export function ProductSections({
  productId,
  description,
  specifications,
  faqs,
  reviews = [],
  reviewsCount,
  avgRating,
}: Props) {
  const count = reviewsCount ?? reviews.length;
  const hasDescription = !!description;
  const hasSpecs = !!specifications && Object.keys(specifications).length > 0;
  const hasFaqs = !!faqs && faqs.length > 0;

  // Reviews-sectie tijdelijk uitgeschakeld - komt terug zodra er voldoende
  // echte reviews binnen zijn.
  const REVIEWS_ENABLED = false;

  const sections = [
    hasDescription && { id: "beschrijving", label: "Beschrijving" },
    hasSpecs && { id: "specs", label: "Specificaties" },
    hasFaqs && { id: "faq", label: "FAQ" },
    REVIEWS_ENABLED && { id: "reviews", label: `Reviews${count ? ` (${count})` : ""}` },
  ].filter(Boolean) as { id: string; label: string }[];

  if (sections.length === 0) return null;

  return (
    <div className="mt-14 space-y-14 max-w-3xl">
      {/* Anchor-jump menu - sticky onder header, scrollt naar de secties */}
      <nav
        aria-label="Spring naar sectie"
        className="sticky top-16 z-20 -mx-4 px-4 py-2 bg-background/95 backdrop-blur border-b border-border flex flex-wrap gap-1"
      >
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-text-muted hover:text-accent rounded-full hover:bg-paper-soft"
          >
            {s.label}
          </a>
        ))}
      </nav>

      {hasDescription && (
        <section>
          <SectionHead icon={BookOpen} title="Beschrijving" id="beschrijving" />
          <div
            className="prose prose-sm max-w-none mt-4 text-text [&>p]:my-3 [&>p]:leading-relaxed [&>h2]:font-display [&>h2]:text-xl [&>h2]:mt-6 [&>h2]:mb-2 [&>h3]:font-display [&>h3]:text-lg [&>h3]:mt-5 [&>h3]:mb-1.5 [&>ul]:my-3 [&>ul]:pl-6 [&>ul]:list-disc [&>ol]:my-3 [&>ol]:pl-6 [&>ol]:list-decimal [&_a]:text-accent [&_a]:underline [&_a:hover]:text-accent-muted"
            dangerouslySetInnerHTML={{ __html: description! }}
          />
        </section>
      )}

      {hasSpecs && (
        <section>
          <SectionHead icon={ListChecks} title="Specificaties" id="specs" />
          <div className="mt-4 rounded-lg border border-border overflow-hidden">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-border">
                {Object.entries(specifications!).map(([key, value]) => (
                  <tr key={key} className="bg-paper-soft hover:bg-surface">
                    <td className="px-4 py-3 font-medium text-text w-1/3">{key}</td>
                    <td className="px-4 py-3 text-text-muted">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {hasFaqs && (
        <section>
          <SectionHead icon={MessageCircleQuestion} title="Veelgestelde vragen" id="faq" />
          <div className="mt-4 space-y-3">
            {faqs!.map((f, i) => (
              <details
                key={i}
                className="group rounded-lg border border-border bg-paper-soft hover:border-accent transition-colors"
              >
                <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-between text-sm font-medium text-text">
                  {f.q}
                  <span className="text-accent text-lg group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-4 pb-4 text-sm text-text-muted leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </section>
      )}

      {REVIEWS_ENABLED && (
      <section>
        <SectionHead icon={Star} title={`Reviews${count ? ` (${count})` : ""}`} id="reviews" />
        <div className="mt-4 space-y-4">
          {reviews.length > 0 ? (
            <>
              {avgRating != null && count > 0 && (
                <div className="flex items-center gap-3 rounded-lg border border-border bg-paper-soft p-4">
                  <div className="text-3xl font-display tabular-nums">{avgRating.toFixed(1)}</div>
                  <div>
                    <StarRow value={Math.round(avgRating)} size={16} />
                    <p className="mt-0.5 text-xs text-text-muted">
                      {count} {count === 1 ? "review" : "reviews"}
                    </p>
                  </div>
                </div>
              )}

              <ul className="space-y-3">
                {reviews.map((r) => (
                  <li key={r.id} className="rounded-lg border border-border bg-paper-soft p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <StarRow value={r.rating} />
                        <span className="text-sm font-medium text-text">{r.author_name}</span>
                      </div>
                      <time className="text-xs text-text-subtle tabular-nums">
                        {new Date(r.created_at).toLocaleDateString("nl-NL", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                    {r.title && <p className="mt-2 text-sm font-semibold text-text">{r.title}</p>}
                    {r.body && (
                      <p className="mt-1 whitespace-pre-line text-sm text-text-muted leading-relaxed">
                        {r.body}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="rounded-lg border border-dashed border-border p-8 text-center">
              <Star className="mx-auto h-8 w-8 text-text-subtle" />
              <p className="mt-3 text-sm text-text-muted">Nog geen reviews voor dit product.</p>
              <p className="mt-1 text-xs text-text-subtle">Wees de eerste die een review achterlaat.</p>
            </div>
          )}

          {productId && <ReviewForm productId={productId} />}
        </div>
      </section>
      )}
    </div>
  );
}
