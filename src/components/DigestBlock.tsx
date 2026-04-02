import type { Digest } from '../types/news';

interface DigestBlockProps {
  digest: Digest | null;
  loading: boolean;
}

export function DigestBlock({ digest, loading }: DigestBlockProps) {
  if (loading) {
    return (
      <section className="bg-secondary-container rounded-xl p-12 mb-24 animate-pulse">
        <div className="h-4 bg-on-secondary-container/10 rounded w-48 mb-8" />
        <div className="h-12 bg-on-secondary-container/10 rounded w-3/4 mb-4" />
        <div className="h-12 bg-on-secondary-container/10 rounded w-1/2 mb-12" />
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-3">
            <div className="h-4 bg-on-secondary-container/10 rounded w-full" />
            <div className="h-4 bg-on-secondary-container/10 rounded w-5/6" />
            <div className="h-4 bg-on-secondary-container/10 rounded w-4/6" />
          </div>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 bg-on-secondary-container/10 rounded w-full" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!digest) return null;

  const firstSentenceEnd = digest.summary.indexOf('. ');
  const headline =
    firstSentenceEnd > 0
      ? digest.summary.slice(0, firstSentenceEnd + 1)
      : digest.summary;
  const restOfSummary =
    firstSentenceEnd > 0 ? digest.summary.slice(firstSentenceEnd + 2) : '';

  return (
    <section id="digest" className="bg-secondary-container rounded-xl p-12 mb-24 relative overflow-hidden">
      <div className="max-w-4xl">
        <div className="flex items-baseline gap-4 mb-8">
          <span className="font-body text-sm uppercase tracking-widest text-on-secondary-container opacity-80">
            {digest.date}
          </span>
          <div className="h-px flex-grow bg-on-secondary-container/20" />
        </div>

        <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary mb-12 tracking-tight leading-tight">
          {headline}
        </h1>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-6">
            {restOfSummary && (
              <p className="font-body text-lg leading-relaxed text-on-secondary-container">
                {restOfSummary}
              </p>
            )}
            <div className="pt-4">
              <span className="font-headline italic text-xl text-primary">
                Curated by the Editorial Collective
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-body font-bold text-xs uppercase tracking-[0.2em] text-on-secondary-container opacity-60">
              Top Headlines
            </h3>
            <ol className="space-y-4">
              {digest.top_items.map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="font-headline font-bold text-primary opacity-40 text-xl">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-body font-medium text-on-secondary-container leading-tight">
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
