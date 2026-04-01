import type { Article } from '../types/news';
import { NewsCard } from './NewsCard';

interface NewsFeedProps {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 animate-pulse">
      <div className="flex gap-3 mb-3">
        <div className="h-4 bg-gray-200 rounded flex-1" />
        <div className="h-4 bg-gray-200 rounded w-20 shrink-0" />
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
        <div className="h-3 bg-gray-200 rounded w-4/6" />
      </div>
      <div className="h-3 bg-gray-200 rounded w-32" />
    </div>
  );
}

export function NewsFeed({ articles, loading, error }: NewsFeedProps) {
  if (error) {
    return (
      <div className="text-center py-16 text-sm text-red-500">
        Failed to load articles: {error}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-16 text-sm text-gray-400">
        No articles found for the selected filter.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map(article => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  );
}
