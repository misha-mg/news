import { useState } from 'react';
import type { Category } from './types/news';
import { useArticles } from './hooks/useArticles';
import { useDigest } from './hooks/useDigest';
import { Header } from './components/Header';
import { DigestBlock } from './components/DigestBlock';
import { FilterBar } from './components/FilterBar';
import { NewsFeed } from './components/NewsFeed';
import { Footer } from './components/Footer';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category | undefined>(undefined);
  const { articles, loading, error, lastCollectedAt } = useArticles(activeCategory);
  const { digest, loading: digestLoading } = useDigest();

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Header lastCollectedAt={lastCollectedAt} />

      <main className="max-w-7xl mx-auto px-8 pt-12">
        <DigestBlock digest={digest} loading={digestLoading} />
        <FilterBar active={activeCategory} onChange={setActiveCategory} />
        <NewsFeed articles={articles} loading={loading} error={error} />
      </main>

      <Footer />
    </div>
  );
}
