import type { Article } from '../types/news';
import {
  FeaturedArticle,
  SidebarArticle,
  MediumArticle,
  FullWidthFeature,
  SimpleCard,
} from './NewsCard';

interface NewsFeedProps {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

function renderArticle(article: Article, index: number) {
  const position = index % 8;

  switch (position) {
    case 0:
      return <FeaturedArticle key={article.id} article={article} />;
    case 1:
      return <SidebarArticle key={article.id} article={article} />;
    case 2:
      return <MediumArticle key={article.id} article={article} />;
    case 3:
      return <MediumArticle key={article.id} article={article} staggered />;
    case 4:
      return <FullWidthFeature key={article.id} article={article} />;
    default:
      return <SimpleCard key={article.id} article={article} />;
  }
}

function LoadingSkeleton() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-24 mb-48 animate-pulse">
      {/* Featured placeholder */}
      <div className="md:col-span-8 space-y-6">
        <div className="h-3 bg-surface-container-high rounded w-32" />
        <div className="h-10 bg-surface-container-high rounded w-full" />
        <div className="h-10 bg-surface-container-high rounded w-3/4" />
        <div className="h-4 bg-surface-container-high rounded w-2/3" />
        <div className="h-4 bg-surface-container-high rounded w-1/2" />
      </div>
      {/* Sidebar placeholder */}
      <div className="md:col-span-4 self-start md:mt-12 p-8 bg-surface-container rounded-xl space-y-4">
        <div className="h-3 bg-surface-container-high rounded w-24" />
        <div className="h-6 bg-surface-container-high rounded w-full" />
        <div className="h-6 bg-surface-container-high rounded w-3/4" />
        <div className="h-4 bg-surface-container-high rounded w-full" />
      </div>
      {/* Medium placeholders */}
      <div className="md:col-start-2 md:col-span-5 space-y-4">
        <div className="h-3 bg-surface-container-high rounded w-24" />
        <div className="h-8 bg-surface-container-high rounded w-full" />
        <div className="h-4 bg-surface-container-high rounded w-5/6" />
      </div>
      <div className="md:col-span-5 md:mt-24 space-y-4">
        <div className="h-3 bg-surface-container-high rounded w-24" />
        <div className="h-8 bg-surface-container-high rounded w-full" />
        <div className="h-4 bg-surface-container-high rounded w-5/6" />
      </div>
    </section>
  );
}

export function NewsFeed({ articles, loading, error }: NewsFeedProps) {
  if (error) {
    return (
      <div className="text-center py-16 font-body text-sm text-primary">
        Failed to load articles: {error}
      </div>
    );
  }

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-16 font-body text-sm text-on-surface-variant opacity-60">
        No articles found for the selected filter.
      </div>
    );
  }

  return (
    <section id="feed" className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-24 mb-48">
      {articles.map((article, i) => renderArticle(article, i))}
    </section>
  );
}
