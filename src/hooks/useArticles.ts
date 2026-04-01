import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Article, Category } from '../types/news';

interface UseArticlesResult {
  articles: Article[];
  loading: boolean;
  error: string | null;
  lastCollectedAt: string | null;
}

export function useArticles(category?: Category): UseArticlesResult {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastCollectedAt, setLastCollectedAt] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchArticles() {
      setLoading(true);
      setError(null);

      const since = new Date(Date.now() - 86400000).toISOString();

      let query = supabase
        .from('articles')
        .select('*')
        .gte('published_at', since)
        .order('published_at', { ascending: false });

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error: sbError } = await query;

      if (cancelled) return;

      if (sbError) {
        setError(sbError.message);
      } else {
        const rows = (data ?? []) as Article[];
        setArticles(rows);

        if (rows.length > 0) {
          const latest = rows.reduce((max, a) =>
            a.collected_at > max ? a.collected_at : max,
            rows[0].collected_at,
          );
          setLastCollectedAt(latest);
        }
      }

      setLoading(false);
    }

    fetchArticles();
    return () => { cancelled = true; };
  }, [category]);

  return { articles, loading, error, lastCollectedAt };
}
