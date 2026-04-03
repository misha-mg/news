import type { Article, Category } from '../types/news';
import FadeContent from './FadeContent';
import { TopStoryCard, LeadCard, CompactCard } from './NewsCard';

interface NewsFeedProps {
  articles: Article[];
  loading: boolean;
  error: string | null;
  activeCategory?: Category;
}

const SECTION_META: Record<Category, { label: string; dot: string }> = {
  'ai-release':  { label: 'AI & Releases',    dot: 'bg-cat-ai' },
  'engineering': { label: 'Engineering',       dot: 'bg-cat-eng' },
  'tools':       { label: 'Tools & Libraries', dot: 'bg-cat-tools' },
  'industry':    { label: 'Industry',          dot: 'bg-cat-industry' },
};

const HOT_COUNT = 4;

function SectionHeader({ title, count, dot }: { title: string; count: number; dot?: string }) {
  return (
    <div className="flex items-end gap-3 md:gap-6 pt-2 md:pt-4 pb-2 mb-6 md:mb-10">
      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        {dot && <span className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full ${dot} shrink-0`} />}
        <h2 className="font-headline text-xl md:text-3xl font-bold text-primary tracking-tight">
          {title}
        </h2>
      </div>
      <span className="font-body text-[9px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] text-on-surface-variant opacity-40 pb-0.5 md:pb-1 shrink-0">
        {count} {count === 1 ? 'story' : 'stories'}
      </span>
      <div className="h-px flex-grow bg-outline-variant/40 mb-1 md:mb-2" />
    </div>
  );
}

/* ── Top Stories ── */

function TopStoriesSection({ articles }: { articles: Article[] }) {
  return (
    <div className="mb-14 md:mb-24">
      <SectionHeader title="Top Stories" count={articles.length} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-x-16 md:gap-y-16">
        {articles.map((article, i) => (
          <FadeContent key={article.id} blur duration={600} delay={i * 100} className="h-full">
            <TopStoryCard article={article} />
          </FadeContent>
        ))}
      </div>
    </div>
  );
}

/* ── Category sections ── */

function CategorySection({ category, articles }: {
  category: Category;
  articles: Article[];
}) {
  const meta = SECTION_META[category];
  const [lead, ...rest] = articles;

  return (
    <div className="mb-12 md:mb-20">
      <SectionHeader title={meta.label} count={articles.length} dot={meta.dot} />

      <FadeContent blur duration={600} delay={0} className="mb-8 md:mb-14">
        <LeadCard article={lead} />
      </FadeContent>

      {rest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-x-14 md:gap-y-16">
          {rest.map((article, i) => (
            <FadeContent key={article.id} blur duration={600} delay={(i + 1) * 60} className="h-full">
              <CompactCard article={article} />
            </FadeContent>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Filtered view ── */

function FilteredSection({ articles, category }: { articles: Article[]; category: Category }) {
  const meta = SECTION_META[category];
  const [lead, ...rest] = articles;

  return (
    <>
      <SectionHeader title={meta.label} count={articles.length} dot={meta.dot} />

      <FadeContent blur duration={600} delay={0} className="mb-8 md:mb-14">
        <LeadCard article={lead} />
      </FadeContent>

      {rest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-x-14 md:gap-y-16 mb-24 md:mb-48">
          {rest.map((article, i) => (
            <FadeContent key={article.id} blur duration={600} delay={(i + 1) * 60} className="h-full">
              <CompactCard article={article} />
            </FadeContent>
          ))}
        </div>
      )}
    </>
  );
}

/* ── Loading skeleton ── */

function LoadingSkeleton() {
  return (
    <div className="mb-24 md:mb-48 space-y-14 md:space-y-24 animate-pulse">
      <div>
        <div className="flex items-end gap-4 md:gap-6 mb-6 md:mb-10">
          <div className="h-6 md:h-8 bg-surface-container-high rounded w-36 md:w-48" />
          <div className="h-px flex-grow bg-outline-variant/20" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-x-16 md:gap-y-16">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border-l-4 border-surface-container-high pl-4 md:pl-6 space-y-4 md:space-y-5">
              <div className="flex gap-3">
                <div className="h-5 bg-surface-container-high rounded w-16 md:w-20" />
                <div className="h-5 bg-surface-container-high rounded w-24 md:w-28" />
              </div>
              <div className="h-7 md:h-9 bg-surface-container-high rounded w-full" />
              <div className="h-7 md:h-9 bg-surface-container-high rounded w-3/4" />
              <div className="h-4 bg-surface-container-high rounded w-2/3" />
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-end gap-4 md:gap-6 mb-6 md:mb-10">
          <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-surface-container-high" />
          <div className="h-6 md:h-8 bg-surface-container-high rounded w-28 md:w-36" />
          <div className="h-px flex-grow bg-outline-variant/20" />
        </div>
        <div className="border-l-4 border-surface-container-high pl-4 md:pl-6 space-y-3 md:space-y-4 mb-8 md:mb-14">
          <div className="flex gap-3">
            <div className="h-5 bg-surface-container-high rounded w-16 md:w-20" />
            <div className="h-5 bg-surface-container-high rounded w-24 md:w-28" />
          </div>
          <div className="h-7 md:h-8 bg-surface-container-high rounded w-2/3" />
          <div className="h-4 bg-surface-container-high rounded w-1/2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-x-14 md:gap-y-16">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border-l-3 border-surface-container-high pl-4 md:pl-5 space-y-3">
              <div className="h-3 bg-surface-container-high rounded w-24" />
              <div className="h-6 bg-surface-container-high rounded w-full" />
              <div className="h-4 bg-surface-container-high rounded w-5/6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Helpers ── */

function groupByCategory(articles: Article[]): Map<Category, Article[]> {
  const order: Category[] = ['ai-release', 'engineering', 'tools', 'industry'];
  const groups = new Map<Category, Article[]>();
  for (const cat of order) groups.set(cat, []);
  for (const article of articles) {
    groups.get(article.category)?.push(article);
  }
  for (const cat of order) {
    if (groups.get(cat)!.length === 0) groups.delete(cat);
  }
  return groups;
}

/* ── Main component ── */

export function NewsFeed({ articles, loading, error, activeCategory }: NewsFeedProps) {
  if (error) {
    return (
      <div className="text-center py-10 md:py-16 font-body text-sm text-primary">
        Failed to load articles: {error}
      </div>
    );
  }

  if (loading) return <LoadingSkeleton />;

  if (articles.length === 0) {
    return (
      <div className="text-center py-10 md:py-16 font-body text-sm text-on-surface-variant opacity-60">
        No articles found for the selected filter.
      </div>
    );
  }

  if (activeCategory) {
    return (
      <section id="feed" className="mb-24 md:mb-48">
        <FilteredSection articles={articles} category={activeCategory} />
      </section>
    );
  }

  const topStories = articles.slice(0, HOT_COUNT);
  const rest = articles.slice(HOT_COUNT);
  const categoryGroups = groupByCategory(rest);

  return (
    <section id="feed" className="mb-24 md:mb-48">
      <TopStoriesSection articles={topStories} />

      {Array.from(categoryGroups.entries()).map(([category, catArticles]) => (
        <CategorySection key={category} category={category} articles={catArticles} />
      ))}
    </section>
  );
}
