import type { Article, Category } from '../types/news';
import { formatDistanceToNow } from '../lib/time';

const CATEGORY_LABELS: Record<Category, string> = {
  'ai-release':  'AI Release',
  'engineering': 'Engineering',
  'tools':       'Tools',
  'industry':    'Industry',
};

const CATEGORY_COLORS: Record<Category, { bg: string; text: string; border: string }> = {
  'ai-release':  { bg: 'bg-cat-ai-light',       text: 'text-cat-ai',       border: 'border-cat-ai' },
  'engineering': { bg: 'bg-cat-eng-light',       text: 'text-cat-eng',      border: 'border-cat-eng' },
  'tools':       { bg: 'bg-cat-tools-light',     text: 'text-cat-tools',    border: 'border-cat-tools' },
  'industry':    { bg: 'bg-cat-industry-light',  text: 'text-cat-industry', border: 'border-cat-industry' },
};

function CategoryBadge({ category }: { category: Category }) {
  const label = CATEGORY_LABELS[category];
  const colors = CATEGORY_COLORS[category];
  return (
    <span className={`${colors.bg} ${colors.text} font-body text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-sm`}>
      {label}
    </span>
  );
}

function isRecent(publishedAt: string): boolean {
  return Date.now() - Date.parse(publishedAt) < 2 * 60 * 60 * 1000;
}

function FreshDot({ category }: { category: Category }) {
  const colors = CATEGORY_COLORS[category];
  return (
    <span className={`inline-block w-1.5 h-1.5 rounded-full ${colors.bg.replace('-light', '')} animate-pulse`} />
  );
}

function SourceTime({ source, publishedAt, category }: { source: string; publishedAt: string; category: Category }) {
  return (
    <span className="font-body text-[11px] md:text-xs text-on-surface-variant opacity-60 inline-flex items-center gap-2">
      {isRecent(publishedAt) && <FreshDot category={category} />}
      {source} &bull; {formatDistanceToNow(publishedAt)}
    </span>
  );
}

interface ArticleProps {
  article: Article;
}

/*
 * TopStoryCard — identical design for every Top Story.
 */
export function TopStoryCard({ article }: ArticleProps) {
  const border = `border-l-4 ${CATEGORY_COLORS[article.category].border}`;
  return (
    <article className="group h-full">
      <div className={`flex flex-col gap-4 md:gap-5 ${border} pl-4 md:pl-6 h-full`}>
        <div className="flex items-center gap-3 md:gap-4 flex-wrap">
          <CategoryBadge category={article.category} />
          <span className="h-px w-4 md:w-6 bg-outline-variant hidden sm:block" />
          <SourceTime source={article.source} publishedAt={article.published_at} category={article.category} />
        </div>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-headline text-2xl md:text-4xl font-bold text-primary group-hover:text-primary-container transition-colors duration-300 leading-tight cursor-pointer"
        >
          {article.title}
        </a>
        {article.summary && (
          <p className="font-body text-sm md:text-base text-on-surface-variant leading-relaxed line-clamp-3 max-w-2xl">
            {article.summary}
          </p>
        )}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body font-bold text-[10px] md:text-xs uppercase tracking-widest text-primary border-b-2 border-outline-variant pb-1 w-fit hover:border-primary transition-all"
        >
          Read More
        </a>
      </div>
    </article>
  );
}

/*
 * LeadCard — the ONE main card per category section.
 */
export function LeadCard({ article }: ArticleProps) {
  const border = `border-l-4 ${CATEGORY_COLORS[article.category].border}`;
  return (
    <article className="group">
      <div className={`flex flex-col gap-4 md:gap-5 ${border} pl-4 md:pl-6`}>
        <div className="flex items-center gap-3 md:gap-4 flex-wrap">
          <CategoryBadge category={article.category} />
          <span className="h-px w-4 md:w-6 bg-outline-variant hidden sm:block" />
          <SourceTime source={article.source} publishedAt={article.published_at} category={article.category} />
        </div>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-headline text-2xl md:text-3xl font-bold text-primary group-hover:text-primary-container transition-colors duration-300 leading-tight cursor-pointer"
        >
          {article.title}
        </a>
        {article.summary && (
          <p className="font-body text-sm md:text-base text-on-surface-variant leading-relaxed line-clamp-3 max-w-3xl">
            {article.summary}
          </p>
        )}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body font-bold text-[10px] md:text-xs uppercase tracking-widest text-primary border-b-2 border-outline-variant pb-1 w-fit hover:border-primary transition-all"
        >
          Read More
        </a>
      </div>
    </article>
  );
}

/*
 * CompactCard — all other cards in category sections.
 */
export function CompactCard({ article }: ArticleProps) {
  const border = `border-l-3 ${CATEGORY_COLORS[article.category].border}`;
  return (
    <article className="group h-full">
      <div className={`flex flex-col gap-3 md:gap-4 ${border} pl-4 md:pl-6 h-full`}>
        <SourceTime source={article.source} publishedAt={article.published_at} category={article.category} />
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-headline text-xl md:text-2xl font-bold text-on-surface group-hover:text-primary transition-colors duration-200 cursor-pointer leading-snug"
        >
          {article.title}
        </a>
        {article.summary && (
          <p className="font-body text-sm md:text-base text-on-surface-variant opacity-80 leading-relaxed line-clamp-2">
            {article.summary}
          </p>
        )}
      </div>
    </article>
  );
}
