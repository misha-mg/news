import type { Article, Category } from '../types/news';
import { formatDistanceToNow } from '../lib/time';

const CATEGORY_STYLES: Record<Category, string> = {
  'ai-release':  'bg-purple-100 text-purple-700',
  'engineering': 'bg-blue-100   text-blue-700',
  'tools':       'bg-green-100  text-green-700',
  'industry':    'bg-orange-100 text-orange-700',
};

const CATEGORY_LABELS: Record<Category, string> = {
  'ai-release':  'AI Release',
  'engineering': 'Engineering',
  'tools':       'Tools',
  'industry':    'Industry',
};

interface NewsCardProps {
  article: Article;
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <article className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-900 font-medium text-sm leading-snug hover:text-indigo-600 transition-colors line-clamp-3"
        >
          {article.title}
        </a>
        <span
          className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_STYLES[article.category]}`}
        >
          {CATEGORY_LABELS[article.category]}
        </span>
      </div>

      {article.summary && (
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
          {article.summary}
        </p>
      )}

      <footer className="flex items-center gap-1.5 text-xs text-gray-400 mt-auto">
        <span className="font-medium text-gray-500">{article.source}</span>
        <span>·</span>
        <span>{formatDistanceToNow(article.published_at)}</span>
      </footer>
    </article>
  );
}
