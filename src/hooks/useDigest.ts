import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Digest } from '../types/news';

interface UseDigestResult {
  digest: Digest | null;
  loading: boolean;
}

export function useDigest(): UseDigestResult {
  const [digest, setDigest] = useState<Digest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchDigest() {
      const today = new Date().toISOString().slice(0, 10);

      const { data } = await supabase
        .from('digests')
        .select('*')
        .eq('date', today)
        .single();

      if (!cancelled) {
        setDigest(data as Digest | null);
        setLoading(false);
      }
    }

    fetchDigest();
    return () => { cancelled = true; };
  }, []);

  return { digest, loading };
}
