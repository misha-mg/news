import type { Digest } from '../types/news';
import SplitText from './SplitText';

interface DigestBlockProps {
  digest: Digest | null;
  loading: boolean;
}

export function DigestBlock({ digest, loading }: DigestBlockProps) {
  if (loading) {
    return (
      <section className="bg-secondary-container rounded-xl p-6 md:p-12 mb-12 md:mb-24 animate-pulse">
        <div className="h-4 bg-on-secondary-container/10 rounded w-48 mb-6 md:mb-8" />
        <div className="h-8 md:h-12 bg-on-secondary-container/10 rounded w-3/4 mb-4" />
        <div className="h-8 md:h-12 bg-on-secondary-container/10 rounded w-1/2 mb-8 md:mb-12" />
        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
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
    <section id="digest" className="bg-secondary-container rounded-xl p-6 md:p-12 mb-12 md:mb-24 relative overflow-hidden">
      <div className="max-w-4xl">
        <div className="flex items-baseline gap-4 mb-5 md:mb-8">
          <SplitText
            text={digest.date}
            tag="span"
            className="font-body text-xs md:text-sm uppercase tracking-widest text-on-secondary-container opacity-80"
            delay={30}
            duration={500}
            startDelay={0}
          />
          <div className="h-px flex-grow bg-on-secondary-container/20" />
        </div>

        <SplitText
          text={headline}
          tag="h1"
          className="font-headline text-3xl md:text-5xl lg:text-7xl font-bold text-primary mb-6 md:mb-12 tracking-tight leading-tight"
          delay={40}
          duration={700}
          startDelay={0}
        />

        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          <div className="space-y-4 md:space-y-6">
            {restOfSummary && (
              <SplitText
                text={restOfSummary}
                tag="p"
                className="font-body text-base md:text-lg leading-relaxed text-on-secondary-container"
                delay={20}
                duration={500}
                startDelay={0}
              />
            )}
            <div className="pt-2 md:pt-4">
              <SplitText
                text="Curated by the Editorial Collective"
                tag="span"
                className="font-headline italic text-lg md:text-xl text-primary"
                delay={30}
                duration={500}
                startDelay={0}
              />
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <SplitText
              text="Top Headlines"
              tag="h3"
              className="font-body font-bold text-xs uppercase tracking-[0.2em] text-on-secondary-container opacity-60"
              delay={30}
              duration={500}
              startDelay={0}
            />
            <ol className="space-y-3 md:space-y-4">
              {digest.top_items.map((item, i) => (
                <li key={i} className="flex gap-3 md:gap-4 items-start">
                  <span className="font-headline font-bold text-primary opacity-40 text-lg md:text-xl shrink-0 whitespace-nowrap">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <SplitText
                    text={item}
                    tag="span"
                    className="font-body text-sm md:text-base font-medium text-on-secondary-container leading-tight"
                    delay={20}
                    duration={500}
                    startDelay={0}
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
