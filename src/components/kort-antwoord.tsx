/**
 * Het korte antwoord boven aan een inhoudspagina.
 *
 * Bewust een eigen blok met een label en geen gewone introzin: zo ziet een
 * bezoeker het antwoord zonder te scrollen, en kan een taalmodel het als
 * afgebakend antwoord uit de pagina lichten.
 */
export function KortAntwoord({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-8 rounded-lg border border-border border-l-[3px] border-l-accent bg-surface px-5 py-4">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
        Kort antwoord
      </p>
      <p className="mt-2 text-[17px] leading-relaxed text-text">{children}</p>
    </div>
  );
}
