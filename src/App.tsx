import { useState } from 'react';
import type { Category } from './types/news';
import { useArticles } from './hooks/useArticles';
import { useDigest } from './hooks/useDigest';
import { Header } from './components/Header';
import { DigestBlock } from './components/DigestBlock';
import { FilterBar } from './components/FilterBar';
import { NewsFeed } from './components/NewsFeed';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category | undefined>(undefined);
  const { articles, loading, error, lastCollectedAt } = useArticles(activeCategory);
  const { digest, loading: digestLoading } = useDigest();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header lastCollectedAt={lastCollectedAt} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <DigestBlock digest={digest} loading={digestLoading} />

        <div className="space-y-4">
          <FilterBar active={activeCategory} onChange={setActiveCategory} />
          <NewsFeed articles={articles} loading={loading} error={error} />
        </div>
      </main>
    </div>
  );
}
