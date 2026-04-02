import type { Article, Category } from '../types/news';
import { formatDistanceToNow } from '../lib/time';

const CATEGORY_LABELS: Record<Category, string> = {
  'ai-release':  'AI Release',
  'engineering': 'Engineering',
  'tools':       'Tools',
  'industry':    'Industry',
};

function CategoryBadge({ category, textOnly = false }: { category: Category; textOnly?: boolean }) {
  const label = CATEGORY_LABELS[category];
  if (textOnly) {
    return (
      <span className="text-primary font-body text-[10px] font-bold tracking-[0.2em] uppercase">
        {label}
      </span>
    );
  }
  return (
    <span className="bg-secondary-container text-primary font-body text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-sm">
      {label}
    </span>
  );
}

function SourceTime({ source, publishedAt }: { source: string; publishedAt: string }) {
  return (
    <span className="font-body text-xs text-on-surface-variant opacity-60">
      {source} &bull; {formatDistanceToNow(publishedAt)}
    </span>
  );
}

interface ArticleProps {
  article: Article;
}

export function FeaturedArticle({ article }: ArticleProps) {
  return (
    <article className="group">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <CategoryBadge category={article.category} />
          <span className="h-px w-8 bg-outline-variant" />
          <SourceTime source={article.source} publishedAt={article.published_at} />
        </div>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-headline text-4xl md:text-5xl font-bold text-primary group-hover:text-primary-container transition-colors duration-300 leading-tight cursor-pointer"
        >
          {article.title}
        </a>
        {article.summary && (
          <p className="font-body text-lg text-on-surface-variant leading-relaxed max-w-2xl line-clamp-3">
            {article.summary}
          </p>
        )}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body font-bold text-xs uppercase tracking-widest text-primary border-b-2 border-outline-variant pb-1 w-fit hover:border-primary transition-all"
        >
          Read Manuscript
        </a>
      </div>
    </article>
  );
}

export function SidebarArticle({ article }: ArticleProps) {
  return (
    <article className="group">
      <div className="flex flex-col gap-4 p-8 bg-surface-container rounded-xl">
        <CategoryBadge category={article.category} />
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-headline text-2xl font-bold text-on-surface group-hover:text-primary transition-colors cursor-pointer"
        >
          {article.title}
        </a>
        {article.summary && (
          <p className="font-body text-sm text-on-surface-variant leading-relaxed line-clamp-3">
            {article.summary}
          </p>
        )}
        <div className="pt-4 font-body text-xs opacity-60">
          {article.source} &bull; {formatDistanceToNow(article.published_at)}
        </div>
      </div>
    </article>
  );
}

export function MediumArticle({ article }: ArticleProps & { staggered?: boolean }) {
  return (
    <article className="group">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <CategoryBadge category={article.category} />
          <SourceTime source={article.source} publishedAt={article.published_at} />
        </div>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-headline text-3xl font-bold text-on-surface group-hover:text-primary transition-colors cursor-pointer leading-snug"
        >
          {article.title}
        </a>
        {article.summary && (
          <p className="font-body text-base text-on-surface-variant leading-relaxed">
            {article.summary}
          </p>
        )}
      </div>
    </article>
  );
}

export function FullWidthFeature({ article }: ArticleProps) {
  return (
    <article className="bg-surface-container-low p-10 md:p-16 rounded-xl group">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <CategoryBadge category={article.category} />
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block font-headline text-4xl font-bold text-primary group-hover:text-primary-container transition-colors cursor-pointer leading-tight"
          >
            {article.title}
          </a>
        </div>
        <div className="space-y-6">
          {article.summary && (
            <p className="font-body text-lg text-on-surface-variant leading-relaxed italic">
              &ldquo;{article.summary}&rdquo;
            </p>
          )}
          <div className="font-body text-xs opacity-60">
            {article.source} &bull; {formatDistanceToNow(article.published_at)}
          </div>
        </div>
      </div>
    </article>
  );
}

export function SimpleCard({ article }: ArticleProps) {
  return (
    <article className="group">
      <div className="flex flex-col gap-4">
        <CategoryBadge category={article.category} textOnly />
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-headline text-2xl font-bold text-on-surface group-hover:text-primary cursor-pointer"
        >
          {article.title}
        </a>
        {article.summary && (
          <p className="font-body text-sm text-on-surface-variant opacity-80 leading-relaxed line-clamp-2">
            {article.summary}
          </p>
        )}
        <span className="font-body text-[10px] opacity-40 uppercase">
          {article.source} &bull; {formatDistanceToNow(article.published_at)}
        </span>
      </div>
    </article>
  );
}
